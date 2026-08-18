const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const https = require("https");

const ttsCacheDir = path.join(process.cwd(), "tts_cache");
if (!fs.existsSync(ttsCacheDir)) {
  fs.mkdirSync(ttsCacheDir, { recursive: true });
}

function fetchGoogleJapaneseAudio(text) {
  return new Promise((resolve, reject) => {
    const encoded = encodeURIComponent(text);
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=ja&client=tw-ob`;
    const options = {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    };
    https.get(url, options, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Google TTS status code: ${res.statusCode}`));
      }
      const chunks = [];
      res.on("data", chunk => chunks.push(chunk));
      res.on("end", () => resolve(Buffer.concat(chunks)));
    }).on("error", reject);
  });
}

function getSelectedVoice(speaker) {
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
  const dataFile = fs.readFileSync(path.join(process.cwd(), "src/data/listeningData.ts"), "utf-8");
  
  const lineRegex = /speaker:\s*"([^"]+)",\s*japanese:\s*"([^"]+)"/g;
  let match;
  const items = [];

  while ((match = lineRegex.exec(dataFile)) !== null) {
    items.push({ speaker: match[1], text: match[2] });
  }

  console.log(`Found ${items.length} total lines to check/cache.`);

  let cachedCount = 0;
  let fetchedCount = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const cleanText = item.text.replace(/[\(\)（）]/g, "").trim();
    if (!cleanText) continue;

    const selectedVoice = getSelectedVoice(item.speaker);
    const cacheKey = `${cleanText}_${item.speaker}_auto`;
    const cacheKeyShort = `${cleanText}_${selectedVoice}`;

    const hashBase1 = crypto.createHash("md5").update(cacheKey).digest("hex");
    const hashBase2 = crypto.createHash("md5").update(cacheKeyShort).digest("hex");

    const mp3Path1 = path.join(ttsCacheDir, hashBase1 + ".mp3");
    const mp3Path2 = path.join(ttsCacheDir, hashBase2 + ".mp3");
    const wavPath2 = path.join(ttsCacheDir, hashBase2 + ".wav");

    if (fs.existsSync(mp3Path1) || fs.existsSync(mp3Path2) || fs.existsSync(wavPath2)) {
      cachedCount++;
      continue;
    }

    console.log(`[${i + 1}/${items.length}] Fetching MP3 for: "${cleanText.substring(0, 18)}..."`);

    try {
      const mp3Buffer = await fetchGoogleJapaneseAudio(cleanText);
      fs.writeFileSync(mp3Path1, mp3Buffer);
      fs.writeFileSync(mp3Path2, mp3Buffer);
      fetchedCount++;
    } catch (err) {
      console.error(`  Failed for "${cleanText}":`, err.message);
    }

    // Short delay
    await new Promise(r => setTimeout(r, 200));
  }

  console.log(`Finished! Cached existing: ${cachedCount}, Newly fetched: ${fetchedCount}`);
}

run().catch(console.error);
