import { GoogleGenAI, Type } from "@google/genai";
import * as fs from "fs";
import * as path from "path";
import { RAW_N3_VOCAB } from "../src/data/vocabN3";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const LESSON_THEMES: Record<number, string> = {
  1: "Con người & Tính cách",
  2: "Gia đình & Đời sống",
  3: "Xã hội & Đô thị",
  4: "Công việc & Sự nghiệp",
  5: "Học tập & Nghiên cứu",
  6: "Khoa học & Công nghệ",
  7: "Thiên nhiên & Môi trường",
  8: "Sức khỏe & Thể thao",
  9: "Nghệ thuật & Giải trí",
  10: "Du lịch & Giao thông",
  11: "Mua sắm & Tiêu dùng",
  12: "Thói quen & Hoạt động",
  13: "Cảm xúc & Suy nghĩ",
  14: "Giao tiếp & Ứng xử",
  15: "Thời gian & Kế hoạch",
  16: "Không gian & Phương hướng",
  17: "Quan hệ xã hội",
  18: "Kinh tế & Tài chính",
  19: "Văn hóa & Truyền thống",
  20: "Thời trang & Đời sống",
  21: "Phương tiện truyền thông",
  22: "Luật lệ & Trách nhiệm",
  23: "Ý kiến & Lập luận",
  24: "Thay đổi & Phát triển",
  25: "Tai nạn & Thiên tai",
  26: "Công nghiệp & Sản xuất",
  27: "Đất nước & Địa lý",
  28: "Lịch sử & Thời đại",
  29: "Tương lai & Ước mơ",
  30: "Tổng hợp & Ôn tập"
};

interface VocabInputItem {
  kana: string;
  kanji: string;
  meaning: string;
  collocation: string;
  example: string;
  exampleMeaning: string;
}

async function main() {
  console.log("Bắt đầu bổ sung từ vựng N3 sử dụng chiến lược ghép bài học (3 bài/request)...");

  // Group existing words by lesson
  const wordsByLesson: Record<number, any[]> = {};
  for (let l = 1; l <= 30; l++) {
    wordsByLesson[l] = RAW_N3_VOCAB.filter(w => w.lesson === l);
  }

  // Find lessons that need more words
  const incompleteLessons: number[] = [];
  for (let l = 1; l <= 30; l++) {
    if (wordsByLesson[l].length < 30) {
      incompleteLessons.push(l);
    }
  }

  console.log(`Số bài học chưa đầy đủ từ vựng (cần bổ sung): ${incompleteLessons.length}`);
  console.log(`Các bài học cần bổ sung: ${incompleteLessons.join(", ")}`);

  const finalVocab: any[] = [];
  
  // Keep all lessons that are already full
  for (let l = 1; l <= 30; l++) {
    if (wordsByLesson[l].length >= 30) {
      console.log(`Bài ${l}: Đã đầy đủ ${wordsByLesson[l].length} từ vựng.`);
      finalVocab.push(...wordsByLesson[l]);
    }
  }

  // Group incomplete lessons in chunks of 4
  const CHUNK_SIZE = 4;
  const chunks: number[][] = [];
  for (let i = 0; i < incompleteLessons.length; i += CHUNK_SIZE) {
    chunks.push(incompleteLessons.slice(i, i + CHUNK_SIZE));
  }

  // Let's rewrite the loop safely
  let chunkIndex = 0;
  for (const chunk of chunks) {
    chunkIndex++;
    console.log(`\n--- [Chunk ${chunkIndex}/${chunks.length}] Xử lý các bài: ${chunk.join(", ")} ---`);

    // Prepare information for the prompt
    let promptDetails = "";
    const schemaProperties: Record<string, any> = {};
    const requiredKeys: string[] = [];

    for (const l of chunk) {
      const theme = LESSON_THEMES[l] || "Chủ đề tổng hợp";
      const existing = wordsByLesson[l] || [];
      const needed = 30 - existing.length;
      const existingList = existing.map(w => `${w.kanji} (${w.kana})`).join(", ");

      promptDetails += `- Bài ${l} (Chủ đề: "${theme}"): Cần sinh THÊM CHÍNH XÁC ${needed} từ vựng N3 mới. Các từ đã có (TUYỆT ĐỐI không được lặp lại): [ ${existingList} ]\n`;

      schemaProperties[`lesson_${l}`] = {
        type: Type.ARRAY,
        description: `Danh sách chính xác ${needed} từ vựng mới trình độ N3 cho Bài ${l}`,
        items: {
          type: Type.OBJECT,
          properties: {
            kana: { type: Type.STRING, description: "Cách đọc của từ vựng" },
            kanji: { type: Type.STRING, description: "Chữ Hán của từ vựng nếu có, nếu không ghi Katakana/Hiragana tương ứng" },
            meaning: { type: Type.STRING, description: "Nghĩa tiếng Việt ngắn gọn, súc tích" },
            collocation: { type: Type.STRING, description: "Cụm từ tiếng Nhật tự nhiên hay đi kèm" },
            example: { type: Type.STRING, description: "Câu ví dụ tiếng Nhật tự nhiên sử dụng từ vựng này" },
            exampleMeaning: { type: Type.STRING, description: "Nghĩa tiếng Việt của câu ví dụ" }
          },
          required: ["kana", "kanji", "meaning", "collocation", "example", "exampleMeaning"]
        }
      };
      requiredKeys.push(`lesson_${l}`);
    }

    const prompt = `Bạn là Thầy Sơn, giáo viên tiếng Nhật cực kỳ vui tính và tâm huyết.
Hãy bổ sung từ vựng N3 mới cho các bài học sau đây:
${promptDetails}

Yêu cầu:
1. Mỗi bài học phải được sinh chính xác số lượng từ vựng còn thiếu.
2. Từ vựng phải thuộc chuẩn N3, tự nhiên, hữu ích cho đời sống và đề thi JLPT.
3. Không lặp lại bất kỳ từ vựng nào đã có trong danh sách từ đã có của bài đó.

Hãy trả về phản hồi dưới định dạng JSON khớp chính xác với schema được yêu cầu.`;

    let success = false;
    let retries = 3;

    while (!success && retries > 0) {
      try {
        console.log(`Đang gửi request lên Gemini để sinh từ vựng cho Chunk ${chunkIndex}...`);
        const response = await ai.models.generateContent({
          model: "gemini-3.1-flash-lite",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: schemaProperties,
              required: requiredKeys
            }
          }
        });

        const textResult = response.text;
        if (!textResult) {
          throw new Error("Không nhận được nội dung phản hồi từ Gemini.");
        }

        const generatedData = JSON.parse(textResult.trim());
        
        for (const l of chunk) {
          const key = `lesson_${l}`;
          const list: VocabInputItem[] = generatedData[key];
          if (Array.isArray(list)) {
            console.log(`Bài ${l}: Đã nhận thành công ${list.length} từ vựng mới.`);
            
            // Add existing first
            finalVocab.push(...(wordsByLesson[l] || []));

            // Add generated
            list.forEach(w => {
              finalVocab.push({
                id: 0,
                lesson: l,
                kana: w.kana,
                kanji: w.kanji,
                meaning: w.meaning,
                collocation: w.collocation,
                example: w.example,
                exampleMeaning: w.exampleMeaning
              });
            });
          } else {
            throw new Error(`Dữ liệu nhận được cho bài ${l} không hợp lệ.`);
          }
        }

        success = true;
      } catch (err: any) {
        console.error(`Lỗi ở Chunk ${chunkIndex}:`, err?.message || err);
        retries--;
        if (retries > 0) {
          console.log(`Đang đợi 5 giây trước khi thử lại Chunk ${chunkIndex}...`);
          await new Promise(res => setTimeout(res, 5000));
        }
      }
    }

    if (!success) {
      console.error(`Thất bại hoàn toàn ở Chunk ${chunkIndex}. Giữ lại từ vựng cũ cho các bài này.`);
      for (const l of chunk) {
        finalVocab.push(...(wordsByLesson[l] || []));
      }
    }

    // Luôn ngủ 15 giây giữa các chunk để hoàn toàn tránh vượt hạn mức 5 Requests Per Minute (RPM)
    if (chunkIndex < chunks.length) {
      console.log("Đợi 15 giây để làm sạch Quota Limit (5 RPM)...");
      await new Promise(res => setTimeout(res, 15000));
    }
  }

  // Đánh lại chỉ mục ID cho toàn bộ từ vựng
  console.log("\nĐang gán lại ID cho toàn bộ từ vựng...");
  finalVocab.sort((a, b) => {
    if (a.lesson !== b.lesson) return a.lesson - b.lesson;
    return a.id - b.id;
  });

  const indexedVocab = finalVocab.map((w, index) => ({
    lesson: w.lesson,
    kana: w.kana,
    kanji: w.kanji,
    meaning: w.meaning,
    collocation: w.collocation,
    example: w.example,
    exampleMeaning: w.exampleMeaning,
    id: index + 1
  }));

  // Ghi đè vào file dữ liệu gốc
  const fileContent = `export interface VocabN3Item {
  id: number;
  lesson: number;
  kana: string;
  kanji: string;
  meaning: string;
  collocation: string;
  example?: string;
  exampleMeaning?: string;
}

export const RAW_N3_VOCAB: VocabN3Item[] = ${JSON.stringify(indexedVocab, null, 2)};
`;

  fs.writeFileSync(path.join(process.cwd(), "src/data/vocabN3.ts"), fileContent, "utf-8");
  console.log(`Hoàn thành! Đã ghi ${indexedVocab.length} từ vựng N3 vào file src/data/vocabN3.ts.`);
}

main().catch(err => {
  console.error("Lỗi trong quá trình chạy script:", err);
});
