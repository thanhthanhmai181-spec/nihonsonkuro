import fs from "fs";
import path from "path";
import crypto from "crypto";
import { GoogleGenAI, Modality } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ttsCacheDir = path.join(process.cwd(), "tts_cache");
if (!fs.existsSync(ttsCacheDir)) {
  fs.mkdirSync(ttsCacheDir, { recursive: true });
}

function addWavHeader(pcmBuffer: Buffer, sampleRate = 24000, numChannels = 1, bitDepth = 16): Buffer {
  const dataSize = pcmBuffer.length;
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + dataSize, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * numChannels * (bitDepth / 8), 28);
  header.writeUInt16LE(numChannels * (bitDepth / 8), 32);
  header.writeUInt16LE(bitDepth, 34);
  header.write("data", 36);
  header.writeUInt32LE(dataSize, 40);
  return Buffer.concat([header, pcmBuffer]);
}

function getSelectedVoice(speaker: string): string {
  const speakerLower = (speaker || "").toLowerCase().trim();
  if (speakerLower.includes("tanaka") || speakerLower.includes("yamada") || speakerLower.includes("医師") || speakerLower.includes("nam") || speakerLower.includes("bác sĩ") || speakerLower.includes("anh")) {
    return "Fenrir";
  } else if (speakerLower.includes("linh") || speakerLower.includes("sakura") || speakerLower.includes("nữ") || speakerLower.includes("chị") || speakerLower.includes("店員") || speakerLower.includes("yuri")) {
    return "Aoede";
  } else if (speakerLower.includes("面接官") || speakerLower.includes("先輩") || speakerLower.includes("thầy sơn") || speakerLower.includes("thầy")) {
    return "Charon";
  } else if (speakerLower.includes("bạn") || speakerLower.includes("học viên") || speakerLower.includes("ken")) {
    return "Puck";
  } else if (speakerLower.includes("mẹ") || speakerLower.includes("bà")) {
    return "Kore";
  } else if (speakerLower) {
    const voiceOptions = ["Aoede", "Fenrir", "Kore", "Charon", "Puck"];
    let sum = 0;
    for (let i = 0; i < speakerLower.length; i++) {
      sum += speakerLower.charCodeAt(i);
    }
    return voiceOptions[sum % voiceOptions.length];
  }
  return "Aoede";
}

async function run() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const dataFile = fs.readFileSync(path.join(process.cwd(), "src/data/listeningData.ts"), "utf-8");
  
  // Extract all lines
  const lineRegex = /speaker:\s*"([^"]+)",\s*japanese:\s*"([^"]+)"/g;
  let match;
  const items: { speaker: string; text: string }[] = [];

  while ((match = lineRegex.exec(dataFile)) !== null) {
    items.push({ speaker: match[1], text: match[2] });
  }

  console.log(`Found ${items.length} lines to check/generate.`);

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const cleanText = item.text.replace(/[\(\)（）]/g, "").trim();
    if (!cleanText) continue;

    const selectedVoice = getSelectedVoice(item.speaker);
    const cacheKey = `${cleanText}_${selectedVoice}`;
    const hashFilename = crypto.createHash("md5").update(cacheKey).digest("hex") + ".wav";
    const diskPath = path.join(ttsCacheDir, hashFilename);

    if (fs.existsSync(diskPath)) {
      console.log(`[${i + 1}/${items.length}] Already cached: "${cleanText}" (${selectedVoice})`);
      continue;
    }

    console.log(`[${i + 1}/${items.length}] Generating AI Studio audio: "${cleanText}" (${selectedVoice})...`);

    let rawData: string | null = null;
    for (let attempt = 1; attempt <= 4; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.1-flash-tts-preview",
          contents: [{ parts: [{ text: cleanText }] }],
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: selectedVoice }
              }
            }
          }
        });

        if (response.candidates?.[0]?.content?.parts) {
          for (const part of response.candidates[0].content.parts) {
            if (part.inlineData?.data) {
              rawData = part.inlineData.data;
              break;
            }
          }
        }
        if (rawData) break;
      } catch (err: any) {
        console.warn(`  Attempt ${attempt} failed: ${err.status || err.message}. Waiting...`);
        await new Promise(r => setTimeout(r, 2000 * attempt));
      }
    }

    if (rawData) {
      const pcmBuffer = Buffer.from(rawData, "base64");
      const wavBuffer = addWavHeader(pcmBuffer, 24000, 1, 16);
      fs.writeFileSync(diskPath, wavBuffer);
      console.log(`  Saved to ${hashFilename}`);
    } else {
      console.error(`  FAILED to generate audio for: "${cleanText}"`);
    }

    // Wait 2.5s between API calls to strictly respect free tier rate limit
    await new Promise(r => setTimeout(r, 2500));
  }

  console.log("Pre-generation complete!");
}

run().catch(console.error);
