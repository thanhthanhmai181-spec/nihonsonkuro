import { VOCAB_N2_PART_1 } from "./vocabN2Part1";
import { VOCAB_N2_PART_2 } from "./vocabN2Part2";
import { VOCAB_N2_PART_3 } from "./vocabN2Part3";
import { VOCAB_N2_PART_4 } from "./vocabN2Part4";
import { VOCAB_N2_PART_5 } from "./vocabN2Part5";
import { VOCAB_N2_PART_6 } from "./vocabN2Part6";
import { VOCAB_N2_PART_7 } from "./vocabN2Part7";
import { VOCAB_N2_PART_8 } from "./vocabN2Part8";
import { VOCAB_N2_PART_9 } from "./vocabN2Part9";

export interface VocabN2Item {
  id: number;
  lesson: number;
  lessonTitle: string;
  kanji: string;
  kana: string;
  hanViet: string; // Âm Hán Việt (cực kỳ quan trọng ở N2)
  meaning: string;
  category: "Danh từ" | "Động từ" | "Tính từ" | "Phó từ" | "Quán dụng ngữ" | "Từ láy/Tượng thanh";
  
  // 1. Cụm Collocations chuẩn N2 (bắt buộc)
  collocations: string[]; // Danh sách cụm từ hay đi kèm
  
  // 2. Phân biệt từ đồng nghĩa / gần nghĩa (Mondai 4)
  synonyms?: {
    word: string;
    reading: string;
    note: string;
  }[];

  // 3. Phân biệt từ trái nghĩa (Đối nghĩa)
  antonyms?: {
    word: string;
    reading: string;
    meaning: string;
  }[];

  // 4. Lưu ý ngữ cảnh & Bẫy JLPT N2 (Mondai 5 - 用法)
  nuanceNote: string;

  // 5. Câu ví dụ thực chiến có ngữ cảnh phong phú
  exampleJp: string;
  exampleFurigana?: string;
  exampleVn: string;

  // 6. Câu hỏi trắc nghiệm cách dùng (Mondai 5) để học sinh luyện ngay
  usageQuestion?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

const CORE_N2_VOCAB: VocabN2Item[] = [
  // ==========================================
  // CHUYÊN ĐỀ 1: QUAN HỆ CON NGƯỜI & GIAO TIẾP XÃ HỘI (人間関係・コミュニケーション)
  // ==========================================
  {
    id: 101,
    lesson: 1,
    lessonTitle: "Chuyên đề 1: Quan Hệ Con Người & Xã Hội",
    kanji: "把握",
    kana: "はあく",
    hanViet: "BẢ TRẮC",
    meaning: "Nắm bắt, hiểu thấu đáo (bản chất vấn đề, tình hình)",
    category: "Danh từ",
    collocations: [
      "現状を正確に把握する (Nắm bắt chính xác tình hình hiện tại)",
      "問題の所在を把握する (Hiểu rõ nguyên nhân/nguồn gốc vấn đề)",
      "実態の把握に努める (Nỗ lực nắm rõ thực trạng)"
    ],
    synonyms: [
      {
        word: "理解",
        reading: "りかい",
        note: "Hiểu thông thường (把握 trang trọng và mang tính thấu suốt tổng thể hơn)."
      },
      {
        word: "認識",
        reading: "にんしき",
        note: "Nhận thức, ý thức được."
      }
    ],
    antonyms: [
      {
        word: "無知",
        reading: "むち",
        meaning: "Không biết, mù mờ."
      }
    ],
    nuanceNote: "Dùng khi thấu hiểu tường tận bản chất của một tình huống hoặc vấn đề phức tạp. Không dùng cho việc cầm nắm đồ vật vật lý thông thường.",
    exampleJp: "リーダーたる者は、常にチームメンバーの状況を的確に把握しておかねばならない。",
    exampleVn: "Người làm lãnh đạo phải luôn nắm bắt một cách chính xác tình hình của các thành viên trong đội.",
    usageQuestion: {
      question: "Chọn câu sử dụng đúng từ 「把握」 nhất:",
      options: [
        "犯人の腕を強く把握して逃げられないようにした。",
        "新しいプロジェクトの課題と進捗状況を正確に把握した。",
        "財布を把握したまま電車に乗ってしまった。",
        "先生の手を把握して感謝の気持ちを伝えた。"
      ],
      correctIndex: 1,
      explanation: "「把握」chỉ dùng cho việc thấu hiểu tình hình/vấn đề trừu tượng, không dùng cho hành động cầm nắm tay hay ví tiền vật lý."
    }
  },
  {
    id: 107,
    lesson: 3,
    lessonTitle: "Chuyên đề 3: Cụm Quán Dụng Ngữ N2",
    kanji: "手を打つ",
    kana: "てをうつ",
    hanViet: "THỦ ĐẢ",
    meaning: "Đưa ra biện pháp xử lý, can thiệp kịp thời",
    category: "Quán dụng ngữ",
    collocations: [
      "早めに手を打つ (Kịp thời xử lý sớm)",
      "適切な手を打たねば手遅れになる (Nếu không đưa ra biện pháp thích hợp sẽ muộn mất)"
    ],
    synonyms: [
      {
        word: "対策を講じる",
        reading: "たいさくをこうじる",
        note: "Đưa ra đối sách (văn bản chính thức)."
      },
      {
        word: "処置をとる",
        reading: "しょちをとる",
        note: "Tiến hành xử lý."
      }
    ],
    nuanceNote: "Ngoài nghĩa vỗ tay tán thưởng trong thương thảo (thỏa thuận thành công), nghĩa phổ biến nhất trong đề N2 là 'thực hiện biện pháp đối phó sự cố'.",
    exampleJp: "これ以上の被害拡大を防ぐために、一刻も早く実効性のある手を打つべきだ。",
    exampleVn: "Để ngăn chặn thiệt hại lan rộng hơn nữa, cần phải đưa ra biện pháp xử lý có tính thực thi càng sớm càng tốt.",
    usageQuestion: {
      question: "Ý nghĩa của cụm 「早めに手を打つ」 trong đề thi N2 là gì?",
      options: [
        "Vỗ tay thật to từ sớm để cổ vũ",
        "Đưa ra biện pháp ứng phó, xử lý sớm",
        "Bắt tay chào hỏi người đối diện sớm",
        "Rửa tay sạch sẽ từ trước"
      ],
      correctIndex: 1,
      explanation: "「手を打つ」là quán dụng ngữ mang nghĩa thực hiện biện pháp (対策をとる)."
    }
  },
  {
    id: 108,
    lesson: 3,
    lessonTitle: "Chuyên đề 3: Cụm Quán Dụng Ngữ N2",
    kanji: "拍車をかける",
    kana: "はくしゃをかける",
    hanViet: "PHÁCH XA",
    meaning: "Thúc đẩy mạnh mẽ, thúc ngựa phi nhanh, làm gia tăng tốc độ",
    category: "Quán dụng ngữ",
    collocations: [
      "インフレに拍車をかける (Thúc đẩy lạm phát gia tăng nhanh hơn)",
      "少子高齢化に拍車がかかる (Quá trình già hóa dân số bị đẩy nhanh tốc độ)"
    ],
    synonyms: [
      {
        word: "加速させる",
        reading: "かそくさせる",
        note: "Làm gia tốc, tăng tốc độ."
      },
      {
        word: "勢いを増す",
        reading: "いきおいをます",
        note: "Gia tăng đà phát triển/sức mạnh."
      }
    ],
    nuanceNote: "Bắt nguồn từ việc dùng cựa thúc vào bụng ngựa để phi nhanh hơn. Thường dùng cho cả tiến trình tích cực và hiện tượng tiêu cực đang gia tăng tốc độ.",
    exampleJp: "円安の進行が、原材料費の高騰に拍車をかけている。",
    exampleVn: "Đà giảm giá của đồng Yên đang thúc đẩy chi phí nguyên vật liệu tăng cao nhanh hơn nữa.",
    usageQuestion: {
      question: "Chọn câu sử dụng đúng cụm 「拍車をかける」:",
      options: [
        "車に拍車をかけて安全に運転した。",
        "AI技術の急速な進化が、業務の自動化に拍車をかけている。",
        "自転車のペダルに拍車をかけて漕いだ。",
        "拍車をかけて靴をきれいに磨いた。"
      ],
      correctIndex: 1,
      explanation: "「拍車をかける」nghĩa bóng là thúc đẩy một quá trình diễn ra nhanh và mạnh hơn."
    }
  }
];

// Deduplicate and combine all parts
const allItems = [
  ...VOCAB_N2_PART_1,
  ...VOCAB_N2_PART_2,
  ...VOCAB_N2_PART_3,
  ...VOCAB_N2_PART_4,
  ...VOCAB_N2_PART_5,
  ...VOCAB_N2_PART_6,
  ...VOCAB_N2_PART_7,
  ...VOCAB_N2_PART_8,
  ...VOCAB_N2_PART_9,
  ...CORE_N2_VOCAB
];

const seenIds = new Set<number>();
const seenKanji = new Set<string>();

export const RAW_N2_VOCAB: VocabN2Item[] = allItems.filter(item => {
  if (seenIds.has(item.id)) return false;
  seenIds.add(item.id);
  if (seenKanji.has(item.kanji)) return false;
  seenKanji.add(item.kanji);
  return true;
});
