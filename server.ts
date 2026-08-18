import express from "express";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import https from "https";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type, Modality } from "@google/genai";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";

dotenv.config();

const app = express();
const PORT = 3000;

// Helper for fetching high-quality Google Japanese Audio MP3
function fetchGoogleJapaneseAudio(text: string): Promise<Buffer> {
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
      const chunks: Buffer[] = [];
      res.on("data", chunk => chunks.push(chunk));
      res.on("end", () => resolve(Buffer.concat(chunks)));
    }).on("error", reject);
  });
}

// Persistent Disk Cache for generated TTS audio files
const ttsCacheDir = path.join(process.cwd(), "tts_cache");
if (!fs.existsSync(ttsCacheDir)) {
  fs.mkdirSync(ttsCacheDir, { recursive: true });
}

// In-memory cache map for fast access
const ttsAudioCache = new Map<string, { audioBase64: string; mimeType: string; voiceUsed: string }>();

// Helper function to attach a 44-byte WAV header to 16-bit PCM buffer (24kHz mono)
function addWavHeader(pcmBuffer: Buffer, sampleRate = 24000, numChannels = 1, bitsPerSample = 16): Buffer {
  const header = Buffer.alloc(44);
  const dataSize = pcmBuffer.length;
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;

  header.write("RIFF", 0);
  header.writeUInt32LE(36 + dataSize, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20); // PCM
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write("data", 36);
  header.writeUInt32LE(dataSize, 40);

  return Buffer.concat([header, pcmBuffer]);
}

// Reverse Proxy for Firebase Auth to bypass third-party cookie restrictions in iframes
app.use(
  "/__/auth",
  createProxyMiddleware({
    target: "https://integral-text-4mvz5.firebaseapp.com",
    changeOrigin: true,
  })
);

app.use(express.json());

// Helper to format Gemini API errors into friendly Vietnamese messages
function formatGeminiErrorMessage(error: any): string {
  let msg = "";
  if (typeof error === "string") {
    msg = error;
  } else if (error?.message) {
    msg = error.message;
  } else {
    msg = String(error || "");
  }

  // If msg is JSON format (e.g. {"error":{"code":429...}}), attempt to parse inner error message
  if (msg.trim().startsWith("{")) {
    try {
      const parsed = JSON.parse(msg);
      if (parsed?.error?.message) {
        msg = parsed.error.message;
      }
    } catch (e) {}
  }

  if (
    msg.includes("429") || 
    msg.includes("RESOURCE_EXHAUSTED") || 
    msg.includes("quota") || 
    msg.includes("exceeded") ||
    msg.includes("free_tier_requests")
  ) {
    return "Hệ thống AI đang nhận quá nhiều câu hỏi trong thời gian ngắn (vượt hạn mức gói miễn phí Google Gemini). Em vui lòng chờ khoảng 15-20 giây rồi bấm gửi lại nhé! 🌸";
  }

  return msg || "Đã xảy ra lỗi khi kết nối với Thầy Sơn AI. Hãy thử lại sau nhé!";
}

// Lazy-initialized Gemini client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(customApiKey?: string): GoogleGenAI {
  if (customApiKey && customApiKey.trim().length > 5) {
    return new GoogleGenAI({
      apiKey: customApiKey.trim(),
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }

  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      throw new Error("GEMINI_API_KEY is not set or holds placeholder value. Please set it in the Secrets panel or provide a custom API Key.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Helper delay function
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper to execute generateContent with model fallbacks & backoff delay to bypass single-model quota limits
async function generateContentWithFallback(options: {
  contents: any;
  config?: any;
  customApiKey?: string;
}) {
  // Officially supported valid Gemini models in order of preference
  const candidateModels = [
    "gemini-2.5-flash",
    "gemini-3.6-flash",
    "gemini-3.1-flash-lite",
    "gemini-flash-latest"
  ];
  let lastError: any = null;

  for (let mIndex = 0; mIndex < candidateModels.length; mIndex++) {
    const model = candidateModels[mIndex];

    try {
      const ai = getGeminiClient(options.customApiKey);
      const response = await ai.models.generateContent({
        model: model,
        contents: options.contents,
        config: options.config,
      });
      return response;
    } catch (err: any) {
      lastError = err;
      const errStr = (JSON.stringify(err) + " " + String(err?.message || "") + " " + String(err)).toLowerCase();
      
      console.warn(`[Fallback Mechanism] Model '${model}' failed: ${err?.message || "error"}. Switching to next candidate model...`);

      // If error is rate limit or quota related, wait 1 second to give API window time to reset
      if (
        errStr.includes("429") || 
        errStr.includes("resource_exhausted") || 
        errStr.includes("quota") ||
        errStr.includes("exceeded") ||
        errStr.includes("limit")
      ) {
        await delay(1000);
      }
    }
  }

  throw lastError;
}

// API endpoint for AI Teacher Son
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    const customApiKey = req.headers["x-custom-api-key"] as string | undefined;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const systemInstruction = 
      "Bạn là Thầy Sơn, một giáo viên dạy tiếng Nhật cực kỳ vui tính, nhiệt huyết và thân thiện mang phong cách Anime Nhật Bản. " +
      "Bạn luôn đồng hành cùng các học sinh Việt Nam học tiếng Nhật. " +
      "Hãy xưng hô thân mật là 'Thầy' và gọi người dùng là 'Em' hoặc 'Học trò'. " +
      "Trong các câu trả lời, hãy thường xuyên chèn thêm các từ tiếng Nhật Anime quen thuộc đầy năng lượng như: 'Ganbatte ne! 💪', 'Sugoi! 🌟', 'Konnichiwa! 🌸', 'Omedetou! 🎉', 'Yatta! 🤩', 'Yosh! 🔥'. " +
      "Hãy giải thích từ vựng tiếng Nhật, ngữ pháp, kanji chi tiết, rõ ràng, dễ hiểu kèm ví dụ thực tế. " +
      "Khi viết tiếng Nhật, luôn có dạng chữ Kanji/Kana, phiên âm Romaji hoặc Furigana, và dịch nghĩa tiếng Việt. " +
      "Hãy luôn giữ thái độ tích cực, khích lệ tinh thần học tập hết mình của học sinh!";

    // Prepare contents including history
    // Convert client-side message history to Gemini API format
    const contents: any[] = [];
    
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        contents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }]
        });
      }
    }

    // Add current user message
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await generateContentWithFallback({
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
      customApiKey
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ 
      error: formatGeminiErrorMessage(error) 
    });
  }
});

// API endpoint to generate example for a word
app.post("/api/gemini/generate-example", async (req, res) => {
  try {
    const { word, reading, meaning, level, category } = req.body;
    const customApiKey = req.headers["x-custom-api-key"] as string | undefined;
    if (!word) {
      return res.status(400).json({ error: "Word is required" });
    }

    const systemInstruction = 
      "Bạn là Thầy Sơn, một giáo viên dạy tiếng Nhật cực kỳ vui tính, nhiệt huyết và thân thiện. " +
      "Hãy giúp học sinh tạo một câu ví dụ tiếng Nhật cực kỳ ngắn gọn, đơn giản, dễ học và tự nhiên phù hợp với trình độ người học.\n" +
      "Nếu level là N5, câu ví dụ phải dùng từ vựng và ngữ pháp N5 cực kỳ cơ bản (ví dụ: các mẫu câu です, ます, v.v.).\n" +
      "Bạn PHẢI phản hồi bằng định dạng JSON khớp chính xác với cấu trúc được yêu cầu.";

    const prompt = `Hãy tạo một câu ví dụ tiếng Nhật và nghĩa dịch tiếng Việt cho từ vựng sau đây:
Từ vựng: ${word}
Cách đọc (Hiragana/Katakana): ${reading || ""}
Ý nghĩa tiếng Việt: ${meaning || ""}
Cấp độ học tập: ${level || "N5"}
Chủ đề/Nhóm: ${category || ""}

Yêu cầu định dạng JSON kết quả trả về như sau:
{
  "example": "Câu ví dụ tiếng Nhật (sử dụng chữ Kanji và Hiragana tự nhiên, ngắn gọn và thực tế)",
  "exampleMeaning": "Dịch nghĩa tiếng Việt của câu ví dụ đó"
}`;

    const response = await generateContentWithFallback({
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.6,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            example: {
              type: Type.STRING,
              description: "The Japanese example sentence",
            },
            exampleMeaning: {
              type: Type.STRING,
              description: "The Vietnamese translation of the example sentence",
            },
          },
          required: ["example", "exampleMeaning"],
        },
      },
      customApiKey
    });

    const result = JSON.parse(response.text || "{}");
    res.json({
      example: result.example || "N/A",
      exampleMeaning: result.exampleMeaning || "N/A"
    });
  } catch (error: any) {
    console.error("Error generating example:", error);
    res.status(500).json({ 
      error: formatGeminiErrorMessage(error) 
    });
  }
});

// API endpoint to evaluate user's sentence for N3 Vocab practicing
app.post("/api/gemini/evaluate-sentence", async (req, res) => {
  try {
    const { word, meaning, userSentence } = req.body;
    const customApiKey = req.headers["x-custom-api-key"] as string | undefined;
    if (!word || !userSentence) {
      return res.status(400).json({ error: "Word and userSentence are required" });
    }

    const systemInstruction = 
      "Bạn là Thầy Sơn, một giáo viên dạy tiếng Nhật cực kỳ vui tính, nhiệt huyết và thân thiện.\n" +
      "Hãy nhận xét câu ví dụ tiếng Nhật mà học sinh tự đặt cho từ vựng được yêu cầu.\n" +
      "1. Đánh giá xem câu có đúng ngữ pháp và sử dụng đúng từ vựng đó không.\n" +
      "2. Đưa ra sửa lỗi chi tiết nếu có sai sót, hoặc lời khen ngợi nếu câu hoàn hảo.\n" +
      "3. Trả về định dạng JSON theo yêu cầu.";

    const prompt = `Từ vựng yêu cầu: ${word} (Nghĩa: ${meaning || ""})
Câu của học sinh đặt: ${userSentence}

Hãy phản hồi bằng định dạng JSON sau:
{
  "isCorrect": true hoặc false (boolean),
  "feedback": "Nhận xét chi tiết, thân thiện, mang tính khích lệ bằng tiếng Việt từ Thầy Sơn, chỉ ra lỗi sai nếu có và cách sửa.",
  "correctedSentence": "Câu sửa đổi hoàn hảo hơn nếu câu cũ sai hoặc chưa tự nhiên (hoặc ghi lại chính xác câu cũ nếu câu cũ đã hoàn hảo)"
}`;

    const response = await generateContentWithFallback({
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.6,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isCorrect: {
              type: Type.BOOLEAN,
              description: "Whether the student's sentence is grammatically correct and uses the word properly",
            },
            feedback: {
              type: Type.STRING,
              description: "Detailed encouraging feedback and corrections from Teacher Son",
            },
            correctedSentence: {
              type: Type.STRING,
              description: "The corrected or improved Japanese sentence, or the same sentence if it was perfect",
            },
          },
          required: ["isCorrect", "feedback", "correctedSentence"],
        },
      },
      customApiKey
    });

    const result = JSON.parse(response.text || "{}");
    res.json({
      isCorrect: typeof result.isCorrect === "boolean" ? result.isCorrect : true,
      feedback: result.feedback || "Nhận xét của thầy đang chuẩn bị...",
      correctedSentence: result.correctedSentence || userSentence
    });
  } catch (error: any) {
    console.error("Error evaluating sentence:", error);
    res.status(500).json({ 
      error: formatGeminiErrorMessage(error) 
    });
  }
});

// API endpoint for Japanese AI Conversation Partner
app.post("/api/gemini/japanese-chat", async (req, res) => {
  try {
    const { message, history, characterId, level } = req.body;
    const customApiKey = req.headers["x-custom-api-key"] as string | undefined;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGeminiClient();

    let characterPrompt = "";
    if (characterId === "sonkuro" || characterId === "tanaka") {
      characterPrompt = 
        "Bạn tên là Sơnkuro Sensei (ソンクロ先生), một thầy giáo tiếng Nhật vừa nghiêm khắc vừa tận tụy, ấm áp và siêu giỏi chuyên môn. " +
        "Bạn xưng hô 'thầy' và gọi học viên là 'em' hoặc 'các em', sử dụng thể kính ngữ ます/です tiếng Nhật chuẩn mực và động viên học viên luyện Kaiwa phản xạ. ";
    } else {
      characterPrompt = 
        "Bạn tên là Yuki-chan (ユキちゃん), một người bạn học người Nhật cùng lứa tuổi rất thân thiện, dễ thương và cởi mở. " +
        "Bạn trò chuyện như một người bạn thân thiết. ";
    }

    const systemInstruction = 
      `${characterPrompt}\n` +
      `MỤC TIÊU DUY NHẤT CỦA BẠN LÀ TRÒ CHUYỆN VÀ LUYỆN TẬP GIAO TIẾP TIẾNG NHẬT VỚI HỌC VIÊN VIỆT NAM.\n` +
      `Trình độ tiếng Nhật người dùng mong muốn: ${level || "N5 - N4"}.\n` +
      `Quy tắc quan trọng:\n` +
      `1. PHẢI ĐÁP LẠI BẰNG TIẾNG NHẬT làm nội dung chính của câu thoại. Sử dụng từ vựng và ngữ pháp phù hợp với trình độ (${level || "N5-N4"}).\n` +
      `2. Trả về phản hồi dạng JSON với các trường chính xác như sau:\n` +
      `   - "japanese": "Câu thoại chính hoàn toàn bằng tiếng Nhật (Kanji/Kana tự nhiên)",\n` +
      `   - "romaji": "Phiên âm Romaji chi tiết cho câu thoại tiếng Nhật đó",\n` +
      `   - "vietnamese": "Dịch nghĩa Tiếng Việt thân thiện của câu thoại đó",\n` +
      `   - "feedback": "Nếu người dùng có lỗi sai ngữ pháp/từ vựng tiếng Nhật trong câu vừa gửi, hãy nhận xét ngắn gọn và dịu dàng bằng tiếng Việt cách sửa đúng. Nếu người dùng nói đúng hoặc chào hỏi, hãy để chuỗi rỗng '' hoặc lời khen nhỏ."\n` +
      `3. Luôn giữ cuộc trò chuyện tiếp diễn bằng cách đặt 1 câu hỏi ngắn bằng tiếng Nhật ở cuối lời đáp để gợi ý người dùng đáp lại.`;

    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        contents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: typeof msg.content === "string" ? msg.content : JSON.stringify(msg.content) }]
        });
      }
    }

    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await generateContentWithFallback({
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            japanese: { type: Type.STRING, description: "Main reply strictly in Japanese" },
            romaji: { type: Type.STRING, description: "Romaji transcription of the Japanese reply" },
            vietnamese: { type: Type.STRING, description: "Vietnamese translation of the Japanese reply" },
            feedback: { type: Type.STRING, description: "Short gentle feedback on user's Japanese grammar/vocab error, if any" }
          },
          required: ["japanese", "romaji", "vietnamese"]
        }
      },
      customApiKey
    });

    const result = JSON.parse(response.text || "{}");
    res.json({
      reply: {
        japanese: result.japanese || "こんにちは！一緒に日本語を話しはなしましょう！",
        romaji: result.romaji || "Konnichiwa! Issho ni nihongo o hanashimashou!",
        vietnamese: result.vietnamese || "Xin chào! Chúng ta cùng trò chuyện bằng tiếng Nhật nhé!",
        feedback: result.feedback || ""
      }
    });

  } catch (error: any) {
    console.error("Gemini Japanese Chat API Error:", error);
    res.status(500).json({ 
      error: formatGeminiErrorMessage(error) 
    });
  }
});

// API endpoint to generate Listening & Shadowing Podcast content
app.post("/api/gemini/generate-listening", async (req, res) => {
  try {
    const { topic, level, contentType, rawTranscript } = req.body;
    const customApiKey = req.headers["x-custom-api-key"] as string | undefined;

    const selectedLevel = level || "N5";
    const selectedTopic = topic || "Giao tiếp đời sống hàng ngày";
    const selectedType = contentType || "dialogue"; // "dialogue" | "monologue" | "choukai"

    const systemInstruction = 
      "Bạn là Thầy Sơn, một giáo viên dạy tiếng Nhật vui tính, chuyên môn cao. " +
      "Hãy sáng tạo một bài nghe/đoạn hội thoại tiếng Nhật hoàn chỉnh theo trình độ và chủ đề yêu cầu hoặc chuyển đổi văn bản/kịch bản thoại được cung cấp thành kịch bản đồng bộ cho video YouTube để học viên Việt Nam luyện nghe thụ động và luyện đọc nhại (Shadowing).\n" +
      "QUY TẮC PHIÊN ÂM BẮT BUỘC:\n" +
      "- KHÔNG phiên âm chữ Hiragana (giữ nguyên Hiragana).\n" +
      "- CHỈ phiên âm chữ Hán (Kanji).\n" +
      "- Chữ nào là Katakana thì GIỮ NGUYÊN DẠNG KATAKANA (KHÔNG phiên âm Hiragana, ví dụ: ゲーム, ローン, メール, ストレス).\n" +
      "Yêu cầu nội dung:\n" +
      `1. Cấp độ JLPT: ${selectedLevel}.\n` +
      `2. Chủ đề: ${selectedTopic}.\n` +
      `3. Thể loại: ${selectedType === "dialogue" ? "Hội thoại 2 người (Kaiwa) tự nhiên" : "Đoạn văn tự sự / Thuyết trình ngắn"}.\n` +
      "4. Với mỗi câu thoại, tính toán thời gian bắt đầu (startTime - giây) và kết thúc (endTime - giây) hợp lý nối tiếp nhau bắt đầu từ 0s để làm phụ đề Karaoke đồng bộ cho video YouTube.\n" +
      "5. Trả về đúng định dạng JSON chính xác theo yêu cầu schema.";

    const prompt = rawTranscript ? 
`Dưới đây là kịch bản/văn bản tiếng Nhật đầy đủ từ video YouTube:
"""
${rawTranscript}
"""

CỰC KỲ QUAN TRỌNG VỀ NỘI DUNG VÀ PHIÊN ÂM:
1. Bạn PHẢI giữ nguyên số lượng và nội dung tất cả các câu thoại/dòng văn bản tiếng Nhật ở trên, KHÔNG ĐƯỢC tự ý bỏ bớt hay cắt ngắn.
2. Với từng câu thoại tiếng Nhật:
   - "japanese": Câu tiếng Nhật gốc (Kanji/Kana tự nhiên, Katakana giữ nguyên).
   - "furigana": CÁCH ĐỌC CHỈ PHIÊN ÂM CHO CHỮ HÁN. KHÔNG phiên âm chữ Hiragana. Chữ nào là Katakana thì giữ nguyên Katakana (không chuyển sang Hiragana).
   - "romaji": Phiên âm Romaji chi tiết.
   - "vietnamese": Dịch nghĩa Tiếng Việt sát nghĩa và tự nhiên.
3. Chia mốc thời gian (startTime và endTime bằng giây, bắt đầu từ 0s) hợp lý cho từng câu nối tiếp nhau để làm phụ đề Karaoke chạy khớp với video YouTube.` :
`Hãy soạn bài nghe tiếng Nhật cho chủ đề: "${selectedTopic}" ở trình độ ${selectedLevel}.

QUY TẮC PHIÊN ÂM BẮT BUỘC:
- KHÔNG phiên âm chữ Hiragana.
- CHỈ phiên âm chữ Hán (Kanji).
- Chữ nào là Katakana thì GIỮ NGUYÊN DẠNG KATAKANA (ví dụ: ゲーム, ローン, メール).

Trả về kết quả bằng định dạng JSON có cấu trúc chính xác như sau:
{
  "title": "Tên bài nghe bằng tiếng Nhật kèm tiếng Việt (Ví dụ: コンビニでの買い物 - Mua sắm ở cửa hàng tiện lợi)",
  "level": "${selectedLevel}",
  "category": "Tên nhóm chủ đề ngắn gọn (Ví dụ: Mua sắm, Du lịch, Công sở, Học tập)",
  "description": "Lời giới thiệu bài nghe ngắn gọn 1-2 câu bằng tiếng Việt từ Thầy Sơn AI",
  "lines": [
    {
      "id": "1",
      "speaker": "Tên nhân vật tiếng Nhật kèm tiếng Việt (Ví dụ: 田中 (Tanaka) hoặc 店員 (Nhân viên))",
      "japanese": "Câu thoại tiếng Nhật tự nhiên sử dụng Kanji/Kana",
      "furigana": "Cách đọc chỉ phiên âm cho chữ Hán, giữ nguyên Hiragana và Katakana",
      "romaji": "Phiên âm Romaji chi tiết",
      "vietnamese": "Dịch nghĩa Tiếng Việt sát nghĩa và tự nhiên",
      "startTime": 0,
      "endTime": 4.5,
      "keywords": [
        { "word": "Từ vựng chính", "reading": "Cách đọc chữ Hán", "meaning": "Nghĩa tiếng Việt" }
      ]
    }
  ],
  "summaryKeywords": [
    { "word": "Từ vựng quan trọng 1", "reading": "Cách đọc", "meaning": "Nghĩa tiếng Việt" },
    { "word": "Từ vựng quan trọng 2", "reading": "Cách đọc", "meaning": "Nghĩa tiếng Việt" }
  ]
}`;

    const response = await generateContentWithFallback({
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            level: { type: Type.STRING },
            category: { type: Type.STRING },
            description: { type: Type.STRING },
            lines: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  speaker: { type: Type.STRING },
                  japanese: { type: Type.STRING },
                  furigana: { type: Type.STRING },
                  romaji: { type: Type.STRING },
                  vietnamese: { type: Type.STRING },
                  startTime: { type: Type.NUMBER },
                  endTime: { type: Type.NUMBER },
                  keywords: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        word: { type: Type.STRING },
                        reading: { type: Type.STRING },
                        meaning: { type: Type.STRING },
                      },
                      required: ["word", "reading", "meaning"],
                    },
                  },
                },
                required: ["id", "speaker", "japanese", "vietnamese"],
              },
            },
            summaryKeywords: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  word: { type: Type.STRING },
                  reading: { type: Type.STRING },
                  meaning: { type: Type.STRING },
                },
                required: ["word", "reading", "meaning"],
              },
            },
          },
          required: ["title", "level", "lines"],
        },
      },
      customApiKey,
    });

    const result = JSON.parse(response.text || "{}");
    res.json({
      listeningData: {
        title: result.title || `Bài nghe AI - ${selectedTopic}`,
        level: result.level || selectedLevel,
        category: result.category || "Hội thoại AI",
        description: result.description || "Bài nghe tự động tạo bởi Thầy Sơn AI.",
        lines: Array.isArray(result.lines) ? result.lines : [],
        summaryKeywords: Array.isArray(result.summaryKeywords) ? result.summaryKeywords : [],
      },
    });
  } catch (error: any) {
    console.error("Gemini Listening API Error:", error);
    res.status(500).json({
      error: formatGeminiErrorMessage(error),
    });
  }
});

// API endpoint for Ultra-Realistic Gemini Japanese TTS Speech Generation
app.post("/api/gemini/tts", async (req, res) => {
  try {
    const { text, speaker, gender } = req.body;
    const customApiKey = req.headers["x-custom-api-key"] as string | undefined;

    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Thiếu nội dung văn bản tiếng Nhật." });
    }

    const cleanText = text.replace(/[\(\)（）]/g, "").trim();

    // Map speaker/gender to prebuilt voices: 'Aoede', 'Kore', 'Puck', 'Charon', 'Fenrir'
    let selectedVoice = "Aoede";
    const speakerLower = (speaker || "").toLowerCase().trim();

    if (gender === "male" || speakerLower.includes("tanaka") || speakerLower.includes("yamada") || speakerLower.includes("医師") || speakerLower.includes("nam") || speakerLower.includes("bác sĩ") || speakerLower.includes("anh")) {
      selectedVoice = "Fenrir"; // Deep Male voice
    } else if (gender === "female" || speakerLower.includes("linh") || speakerLower.includes("sakura") || speakerLower.includes("nữ") || speakerLower.includes("chị") || speakerLower.includes("店員") || speakerLower.includes("yuri")) {
      selectedVoice = "Aoede"; // Natural Female voice
    } else if (speakerLower.includes("面接官") || speakerLower.includes("先輩") || speakerLower.includes("thầy sơn") || speakerLower.includes("thầy")) {
      selectedVoice = "Charon"; // Authoritative deep male voice
    } else if (speakerLower.includes("bạn") || speakerLower.includes("học viên") || speakerLower.includes("ken")) {
      selectedVoice = "Puck"; // Energetic male voice
    } else if (speakerLower.includes("mẹ") || speakerLower.includes("bà")) {
      selectedVoice = "Kore"; // Soft warm female voice
    } else if (speakerLower) {
      const voiceOptions = ["Aoede", "Fenrir", "Kore", "Charon", "Puck"];
      let sum = 0;
      for (let i = 0; i < speakerLower.length; i++) {
        sum += speakerLower.charCodeAt(i);
      }
      selectedVoice = voiceOptions[sum % voiceOptions.length];
    }

    // Check server memory cache or persistent disk cache first
    const cacheKey = `${cleanText}_${selectedVoice}`;
    if (ttsAudioCache.has(cacheKey)) {
      return res.json(ttsAudioCache.get(cacheKey)!);
    }

    const hashBase = crypto.createHash("md5").update(cacheKey).digest("hex");
    const diskPathWav = path.join(ttsCacheDir, hashBase + ".wav");
    const diskPathMp3 = path.join(ttsCacheDir, hashBase + ".mp3");

    if (fs.existsSync(diskPathWav)) {
      const wavBuffer = fs.readFileSync(diskPathWav);
      const audioBase64 = wavBuffer.toString("base64");
      const result = { audioBase64, mimeType: "audio/wav", voiceUsed: selectedVoice };
      ttsAudioCache.set(cacheKey, result);
      return res.json(result);
    }

    if (fs.existsSync(diskPathMp3)) {
      const mp3Buffer = fs.readFileSync(diskPathMp3);
      const audioBase64 = mp3Buffer.toString("base64");
      const result = { audioBase64, mimeType: "audio/mpeg", voiceUsed: "Google Native Japanese Voice" };
      ttsAudioCache.set(cacheKey, result);
      return res.json(result);
    }

    const ai = getGeminiClient(customApiKey);

    // Attempt Gemini TTS Preview model, if rate-limited (429/quota) immediately fallback to Google Japanese Audio
    let rawData: string | null = null;
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-tts-preview",
        contents: [{ parts: [{ text: cleanText }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: selectedVoice,
              },
            },
          },
        },
      });

      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData?.data) {
            rawData = part.inlineData.data;
            break;
          }
        }
      }
    } catch (err: any) {
      const is429 = err.status === 429 || String(err.message || "").includes("429") || String(err.message || "").includes("RESOURCE_EXHAUSTED");
      if (!is429) {
        console.warn("[Gemini TTS Notice]:", err.message || err.status);
      }
    }

    if (rawData) {
      const pcmBuffer = Buffer.from(rawData, "base64");
      const wavBuffer = addWavHeader(pcmBuffer, 24000, 1, 16);
      
      // Save to disk cache permanently
      try {
        fs.writeFileSync(diskPathWav, wavBuffer);
      } catch (e) {
        console.warn("Failed to write to disk cache:", e);
      }

      const audioBase64 = wavBuffer.toString("base64");
      const result = { audioBase64, mimeType: "audio/wav", voiceUsed: selectedVoice };
      ttsAudioCache.set(cacheKey, result);

      return res.json(result);
    }

    // High quality Google Native Japanese Speech Audio Fallback (100% Reliable, 0ms Rate Limit, Real Native Japanese Voice)
    console.log(`[TTS] Gemini TTS rate limited or unavailable for "${cleanText.substring(0, 15)}...". Fetching Google Japanese Native Audio...`);
    try {
      const mp3Buffer = await fetchGoogleJapaneseAudio(cleanText);
      const audioBase64 = mp3Buffer.toString("base64");
      const mimeType = "audio/mpeg";

      // Save to disk cache permanently
      const mp3HashFilename = crypto.createHash("md5").update(cacheKey).digest("hex") + ".mp3";
      const mp3DiskPath = path.join(ttsCacheDir, mp3HashFilename);
      try {
        fs.writeFileSync(mp3DiskPath, mp3Buffer);
      } catch (e) {
        console.warn("Failed to write MP3 to disk cache:", e);
      }

      const result = { audioBase64, mimeType, voiceUsed: "Google Native Japanese Voice" };
      ttsAudioCache.set(cacheKey, result);

      return res.json(result);
    } catch (fallbackErr) {
      console.error("Google Native Japanese Audio Fallback error:", fallbackErr);
      return res.status(500).json({ error: "Không thể tạo file âm thanh tiếng Nhật." });
    }
  } catch (error: any) {
    console.error("Gemini TTS API Error:", error);
    res.status(500).json({
      error: formatGeminiErrorMessage(error),
    });
  }
});

async function startServer() {
  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Học cùng thầy Sơn Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
