import fs from "fs";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Global crash protection
process.on('unhandledRejection', (reason, promise) => {
  log(`CRITICAL: Unhandled Rejection at: ${promise} reason: ${reason}`);
});
process.on('uncaughtException', (err) => {
  log(`CRITICAL: Uncaught Exception thrown: ${err} \nStack: ${err.stack}`);
});

const logFile = "./tmp_process.log";
function log(...args) {
  const msg = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg).join(" ");
  console.log(msg);
  fs.appendFileSync(logFile, `[${new Date().toISOString()}] ${msg}\n`, "utf8");
}

log("Processor started.");

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  log("CRITICAL: GEMINI_API_KEY not found in process.env!");
  process.exit(1);
}

const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build'
    }
  }
});

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function cleanHTML(html) {
  if (!html) return "";
  return html.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "").trim();
}

function parseLocalExplanation(originalExplanation) {
  let script = "";
  let explanation = "";

  if (originalExplanation.includes("Script (Nội dung nghe):")) {
    const scriptMatch = originalExplanation.match(/leading-relaxed">([\s\S]*?)<\/p>/);
    const explMatch = originalExplanation.match(/<p class="text-gray-700">([\s\S]*?)<\/p>/);
    if (scriptMatch && explMatch) {
      script = cleanHTML(scriptMatch[1]);
      explanation = explMatch[1].trim();
      return { script, explanation };
    }
  }

  if (originalExplanation.includes("Nội dung nghe:") || originalExplanation.includes("Script:")) {
    const divMatch = originalExplanation.match(/<b>(?:Nội dung nghe|Script):<\/b>[\s\S]*?<p>([\s\S]*?)<\/p>\s*<\/div>([\s\S]*)/i);
    if (divMatch) {
      script = cleanHTML(divMatch[1]);
      explanation = divMatch[2].trim();
      return { script, explanation };
    }
    
    const divMatchBold = originalExplanation.match(/<b>(?:Nội dung nghe|Script):<\/b>\s*([\s\S]*?)<\/div>([\s\S]*)/i);
    if (divMatchBold) {
      script = cleanHTML(divMatchBold[1]);
      explanation = divMatchBold[2].trim();
      return { script, explanation };
    }
    
    const divMatch2 = originalExplanation.match(/(?:Nội dung nghe|Script):[\s\S]*?<\/p>([\s\S]*?)<\/div>([\s\S]*)/i);
    if (divMatch2) {
      script = cleanHTML(divMatch2[1]);
      explanation = divMatch2[2].trim();
      return { script, explanation };
    }
  }

  return null;
}

async function callGeminiWithRetry(prompt, retries = 4, backoff = 10000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await delay(5000); // 5 seconds delay to stay safe under 15 RPM
      
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              script: { type: "STRING" },
              explanation: { type: "STRING" }
            },
            required: ["script", "explanation"]
          }
        }
      });
      
      return JSON.parse(response.text.trim());
    } catch (error) {
      const errStr = error.toString();
      const isRateLimit = errStr.includes("429") || errStr.includes("RESOURCE_EXHAUSTED") || errStr.includes("quota");
      const isServiceUnavailable = errStr.includes("503") || errStr.includes("UNAVAILABLE");
      
      if ((isRateLimit || isServiceUnavailable) && attempt < retries) {
        const waitTime = isRateLimit ? 45000 : 6000;
        log(`[Gemini] Attempt ${attempt} failed. Retrying in ${waitTime / 1000}s... Error: ${error.message || error}`);
        await delay(waitTime);
      } else {
        throw error;
      }
    }
  }
}

async function processQuestion(file, id, question, options, correct, originalExplanation) {
  const localResult = parseLocalExplanation(originalExplanation);
  if (localResult) {
    log(`[Local] Parsed ${id} successfully.`);
    return localResult;
  }

  let examName = "JLPT N3 Past Exam";
  if (file.includes("2021_07")) examName = "JLPT N3 2021-07 (Tháng 7 năm 2021)";
  else if (file.includes("2022_07")) examName = "JLPT N3 2022-07 (Tháng 7 năm 2022)";
  else if (file.includes("2022_12")) examName = "JLPT N3 2022-12 (Tháng 12 năm 2022)";
  else if (file.includes("2023")) {
    if (file.includes("2023_12")) examName = "JLPT N3 2023-12 (Tháng 12 năm 2023)";
    else examName = "JLPT N3 2023 (Tháng 7 năm 2023)";
  }
  else if (file.includes("2024")) examName = "JLPT N3 2024 (Năm 2024)";

  log(`[Gemini] Generating script for ${id}...`);
  
  const prompt = `
You are an expert bilingual Japanese-Vietnamese JLPT N3 teacher.
We are building a JLPT study application.
For the exam: ${examName}, listening section (Choukai / 聴解), question ID: ${id}.
We have the following question details:
Question: ${question}
Options: ${JSON.stringify(options)}
Correct option index: ${correct} (0-based)
Current Vietnamese Explanation: ${originalExplanation}

Your job is to retrieve or reconstruct the EXACT Japanese listening script (dialogue transcript) for this official JLPT N3 past exam question.
Since this is an official JLPT N3 past exam question, please retrieve and provide the exact or highly accurate spoken Japanese script.
Keep it in natural Japanese dialogue with clear speaker labels (like '男:', '女:', '男の学生:', '女の学生:', etc.). Separate dialogue lines with a newline (\\n).

Please also provide the Vietnamese explanation (use our current explanation, clean it up, or enhance it if needed, but make sure to keep the exact correct answer indication like '=> Đáp án...').

Return your response strictly as a JSON object with this schema:
{
  "script": "accurate Japanese script",
  "explanation": "Vietnamese explanation"
}
`;

  try {
    const result = await callGeminiWithRetry(prompt);
    if (result.script) {
      result.script = result.script
        .replace(/\*\*([^*]+)\*\*/g, "$1")
        .replace(/\*([^*]+)\*/g, "$1")
        .trim();
    }
    return result;
  } catch (error) {
    log(`Error generating script via Gemini for ${file} ${id}: ${error.message || error}`);
    return {
      script: "",
      explanation: originalExplanation
    };
  }
}

async function processFile(filePath) {
  log(`\n========================================`);
  log(`Processing file: ${filePath}`);
  log(`========================================`);
  
  if (!fs.existsSync(filePath)) {
    log(`File does not exist: ${filePath}`);
    return;
  }
  
  const fileContent = fs.readFileSync(filePath, "utf8");
  const choukaiStart = fileContent.indexOf("choukai: [");
  if (choukaiStart === -1) {
    log(`No choukai section found in ${filePath}`);
    return;
  }
  
  let bracketCount = 1;
  let index = choukaiStart + "choukai: [".length;
  while (bracketCount > 0 && index < fileContent.length) {
    if (fileContent[index] === '[') bracketCount++;
    else if (fileContent[index] === ']') bracketCount--;
    index++;
  }
  const choukaiBlock = fileContent.substring(choukaiStart, index);
  
  let objects = [];
  let braceCount = 0;
  let startPos = -1;
  for (let i = 0; i < choukaiBlock.length; i++) {
    if (choukaiBlock[i] === '{') {
      if (braceCount === 0) {
        startPos = i;
      }
      braceCount++;
    } else if (choukaiBlock[i] === '}') {
      braceCount--;
      if (braceCount === 0 && startPos !== -1) {
        objects.push({
          start: startPos,
          end: i + 1,
          text: choukaiBlock.substring(startPos, i + 1)
        });
      }
    }
  }
  
  log(`Found ${objects.length} elements in choukai array.`);
  
  fs.copyFileSync(filePath, filePath + ".bak");
  
  const resultsMap = {};
  
  for (const obj of objects) {
    const text = obj.text;
    const idMatch = text.match(/id:\s*['"]([^'"]+)['"]/);
    const typeMatch = text.match(/type:\s*['"]([^'"]+)['"]/);
    
    if (!idMatch) continue;
    const id = idMatch[1];
    
    if (typeMatch && typeMatch[1] === "audio_player") {
      continue;
    }
    
    const qMatch = text.match(/question:\s*['"`]([\s\S]*?)['"`]\s*,/);
    const explMatch = text.match(/explanation:\s*['"`]([\s\S]*?)['"`]\s*(?:,|\s*})/);
    const correctMatch = text.match(/correct:\s*(\d+)/);
    
    let options = [];
    const optionsMatch = text.match(/options:\s*\[([\s\S]*?)\]/);
    if (optionsMatch) {
      options = optionsMatch[1]
        .split(",")
        .map(opt => opt.replace(/['"\s]/g, ""))
        .filter(opt => opt.length > 0);
    }
    
    const question = qMatch ? qMatch[1] : "";
    const originalExplanation = explMatch ? explMatch[1] : "";
    const correct = correctMatch ? parseInt(correctMatch[1]) : 0;
    
    log(`Processing ${id}...`);
    const result = await processQuestion(filePath, id, question, options, correct, originalExplanation);
    resultsMap[id] = result;
  }
  
  let lastIndex = 0;
  let newChoukaiBlock = "";
  
  for (const obj of objects) {
    newChoukaiBlock += choukaiBlock.substring(lastIndex, obj.start);
    
    const text = obj.text;
    const idMatch = text.match(/id:\s*['"]([^'"]+)['"]/);
    const typeMatch = text.match(/type:\s*['"]([^'"]+)['"]/);
    
    if (idMatch && (!typeMatch || typeMatch[1] !== "audio_player")) {
      const id = idMatch[1];
      const res = resultsMap[id];
      if (res && res.script) {
        const htmlExplanation = `<div class="space-y-4">\\n  <div class="space-y-2">\\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\\n      <span>📄 Script (Nội dung nghe):</span>\\n    </div>\\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\\n      ${res.script.replace(/\n/g, '\\n').replace(/'/g, "\\'")}\\n    </div>\\n  </div>\\n  <div class="border-t border-white/10 pt-4 space-y-2">\\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\\n      <span>💡 Giải thích tiếng Việt:</span>\\n    </div>\\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\\n      ${res.explanation.replace(/'/g, "\\'")}\\n    </div>\\n  </div>\\n</div>`;
        const regex = /explanation:\s*(['"`])([\s\S]*?)\1/s;
        const newText = text.replace(regex, `explanation: '${htmlExplanation}'`);
        newChoukaiBlock += newText;
      } else if (res) {
        const htmlExplanation = `<div class="space-y-4">\\n  <div class="space-y-2">\\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\\n      <span>💡 Giải thích tiếng Việt:</span>\\n    </div>\\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\\n      ${res.explanation.replace(/'/g, "\\'")}\\n    </div>\\n  </div>\\n</div>`;
        const regex = /explanation:\s*(['"`])([\s\S]*?)\1/s;
        const newText = text.replace(regex, `explanation: '${htmlExplanation}'`);
        newChoukaiBlock += newText;
      } else {
        newChoukaiBlock += text;
      }
    } else {
      newChoukaiBlock += text;
    }
    
    lastIndex = obj.end;
  }
  newChoukaiBlock += choukaiBlock.substring(lastIndex);
  
  const newFileContent = fileContent.substring(0, choukaiStart) + newChoukaiBlock + fileContent.substring(choukaiStart + choukaiBlock.length);
  fs.writeFileSync(filePath, newFileContent, "utf8");
  log(`Successfully completed and wrote back ${filePath}!`);
}

async function main() {
  const args = process.argv.slice(2);
  const targetFile = args[0];
  
  if (targetFile) {
    await processFile(targetFile);
  } else {
    const files = [
      "src/data/examN3_2021_07.ts",
      "src/data/examN3_2022_07.ts",
      "src/data/examN3_2022_12.ts",
      "src/data/examN3_2023.ts",
      "src/data/examN3_2023_12.ts",
      "src/data/examN3_2024.ts"
    ];
    for (const file of files) {
      await processFile(file);
    }
  }
}

main().catch(err => {
  log("FATAL ERROR in main loop:", err);
});
