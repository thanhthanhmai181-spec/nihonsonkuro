import fs from "fs";

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
    // Try matching the 2023 format: <div ...><b>Nội dung nghe:</b>...<p>...</p></div> => Đáp án...
    const divMatch = originalExplanation.match(/<b>(?:Nội dung nghe|Script):<\/b>[\s\S]*?<p>([\s\S]*?)<\/p>\s*<\/div>([\s\S]*)/i);
    if (divMatch) {
      script = cleanHTML(divMatch[1]);
      explanation = divMatch[2].trim();
      return { script, explanation };
    }
    
    // Alternative match with bold tags but no internal paragraph tags
    const divMatchBold = originalExplanation.match(/<b>(?:Nội dung nghe|Script):<\/b>\s*([\s\S]*?)<\/div>([\s\S]*)/i);
    if (divMatchBold) {
      script = cleanHTML(divMatchBold[1]);
      explanation = divMatchBold[2].trim();
      return { script, explanation };
    }
    
    // Alternative match without <p> around the script
    const divMatch2 = originalExplanation.match(/(?:Nội dung nghe|Script):[\s\S]*?<\/p>([\s\S]*?)<\/div>([\s\S]*)/i);
    if (divMatch2) {
      script = cleanHTML(divMatch2[1]);
      explanation = divMatch2[2].trim();
      return { script, explanation };
    }
  }

  return null;
}

function testLocalParse(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const choukaiMatch = content.match(/choukai:\s*\[([\s\S]*?)\]\s*\n\s*\}/);
  if (!choukaiMatch) return;
  const qMatches = choukaiMatch[1].match(/\{\s*id:[\s\S]*?\}/g) || [];
  
  let successCount = 0;
  let totalCount = 0;
  
  for (const q of qMatches) {
    if (q.includes("type: 'audio_player'") || q.includes('type: "audio_player"')) continue;
    totalCount++;
    const idM = q.match(/id:\s*['"]([^'"]+)['"]/);
    const explM = q.match(/explanation:\s*['"`]([\s\S]*?)['"`]\s*(?:,|\s*})/);
    
    if (explM) {
      const origExpl = explM[1];
      const parsed = parseLocalExplanation(origExpl);
      if (parsed) {
        successCount++;
      } else {
        console.log(`Failed local parse in ${filePath} for ID ${idM ? idM[1] : "?"}`);
      }
    }
  }
  
  console.log(`${filePath}: parsed ${successCount} out of ${totalCount} successfully.`);
}

testLocalParse("src/data/examN3_2022_07.ts");
testLocalParse("src/data/examN3_2023.ts");
testLocalParse("src/data/examN3_2023_12.ts");
