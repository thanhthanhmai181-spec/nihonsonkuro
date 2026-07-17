import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";

dotenv.config();

const app = express();
const PORT = 3000;

// Reverse Proxy for Firebase Auth to bypass third-party cookie restrictions in iframes
app.use(
  "/__/auth",
  createProxyMiddleware({
    target: "https://integral-text-4mvz5.firebaseapp.com",
    changeOrigin: true,
  })
);

app.use(express.json());

// Lazy-initialized Gemini client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      throw new Error("GEMINI_API_KEY is not set or holds placeholder value. Please set it in the Secrets panel.");
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

// API endpoint for AI Teacher Son
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGeminiClient();

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

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ 
      error: error.message || "Đã xảy ra lỗi khi kết nối với Thầy Sơn AI. Hãy thử lại sau nhé!" 
    });
  }
});

// API endpoint to generate example for a word
app.post("/api/gemini/generate-example", async (req, res) => {
  try {
    const { word, reading, meaning, level, category } = req.body;
    if (!word) {
      return res.status(400).json({ error: "Word is required" });
    }

    const ai = getGeminiClient();

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

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
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
      }
    });

    const result = JSON.parse(response.text || "{}");
    res.json({
      example: result.example || "N/A",
      exampleMeaning: result.exampleMeaning || "N/A"
    });
  } catch (error: any) {
    console.error("Error generating example:", error);
    res.status(500).json({ 
      error: error.message || "Không thể tạo ví dụ tự động bằng AI." 
    });
  }
});

// API endpoint to evaluate user's sentence for N3 Vocab practicing
app.post("/api/gemini/evaluate-sentence", async (req, res) => {
  try {
    const { word, meaning, userSentence } = req.body;
    if (!word || !userSentence) {
      return res.status(400).json({ error: "Word and userSentence are required" });
    }

    const ai = getGeminiClient();

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

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
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
      }
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
      error: error.message || "Không thể đánh giá câu bằng AI Thầy Sơn." 
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
