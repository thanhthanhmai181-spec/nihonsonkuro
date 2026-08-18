import { Vocabulary } from "../types";
import { RAW_N5_VOCAB } from "./vocabN5";
import { kanaToRomaji } from "../utils/kanaToRomaji";

// Convert raw N5 items to full Vocabulary objects
const mappedN5: Vocabulary[] = RAW_N5_VOCAB.map((item, idx) => {
  const [reading, word, meaning, category] = item;
  return {
    id: `n5_${idx + 1}`,
    word: word || reading,
    reading,
    romaji: kanaToRomaji(reading),
    meaning,
    example: "N/A",
    exampleMeaning: "N/A",
    level: "N5",
    category
  };
});

const N4_VOCABULARY: Vocabulary[] = [
  {
    id: "n4_1",
    word: "準備",
    reading: "じゅんび",
    romaji: "junbi",
    meaning: "Chuẩn bị",
    example: "試験の準備をしています。",
    exampleMeaning: "Tôi đang chuẩn bị cho kỳ thi.",
    level: "N4",
    category: "Học tập"
  },
  {
    id: "n4_2",
    word: "連絡",
    reading: "れんらく",
    romaji: "renraku",
    meaning: "Liên lạc",
    example: "着いたら、私に連絡してください。",
    exampleMeaning: "Khi nào đến nơi, hãy liên lạc cho tôi nhé.",
    level: "N4",
    category: "Đời sống"
  },
  {
    id: "n4_3",
    word: "運転",
    reading: "うんてん",
    romaji: "unten",
    meaning: "Lái xe",
    example: "父は車の運転が上手です。",
    exampleMeaning: "Bố tôi lái xe ô tô rất giỏi.",
    level: "N4",
    category: "Đời sống"
  },
  {
    id: "n4_4",
    word: "非常に",
    reading: "ひじょうに",
    romaji: "hijou ni",
    meaning: "Rất, khẩn cấp, cực kỳ",
    example: "日本語の漢字は非常に難しいです。",
    exampleMeaning: "Chữ Kanji tiếng Nhật cực kỳ khó.",
    level: "N4",
    category: "Học tập"
  },
  {
    id: "n4_5",
    word: "約束",
    reading: "やくそく",
    romaji: "yakusoku",
    meaning: "Hứa, hẹn gặp",
    example: "友達と映画を見る約束があります。",
    exampleMeaning: "Tôi có hẹn xem phim với bạn bè.",
    level: "N4",
    category: "Đời sống"
  }
];

const N3_VOCABULARY: Vocabulary[] = [
  {
    id: "n3_1",
    word: "興味",
    reading: "きょうみ",
    romaji: "kyoumi",
    meaning: "Hứng thú, quan tâm",
    example: "日本の文化に深い興味を持っています。",
    exampleMeaning: "Tôi có sự quan tâm sâu sắc đến văn hóa Nhật Bản.",
    level: "N3",
    category: "Cảm xúc"
  },
  {
    id: "n3_2",
    word: "解決",
    reading: "かいけつ",
    romaji: "kaiketsu",
    meaning: "Giải quyết",
    example: "この問題はもう解決しました。",
    exampleMeaning: "Vấn đề này đã được giải quyết rồi.",
    level: "N3",
    category: "Xã hội"
  },
  {
    id: "n3_3",
    word: "素晴らしい",
    reading: "すばらしい",
    romaji: "subarashii",
    meaning: "Tuyệt vời, tráng lệ",
    example: "富士山からの日の出は素晴らしい眺めです。",
    exampleMeaning: "Bình minh nhìn từ núi Phú Sĩ là một cảnh tượng tuyệt vời.",
    level: "N3",
    category: "Cảm xúc"
  },
  {
    id: "n3_4",
    word: "影響",
    reading: "えいきょう",
    romaji: "eikyou",
    meaning: "Ảnh hưởng",
    example: "アニメは世界中の若者に影響を与えています。",
    exampleMeaning: "Anime đang gây ảnh hưởng lớn tới giới trẻ toàn thế giới.",
    level: "N3",
    category: "Xã hội"
  },
  {
    id: "n3_5",
    word: "積極的",
    reading: "せっきょくてき",
    romaji: "sekkyokuteki",
    meaning: "Tích cực, chủ động",
    example: "授業で積極的に発言しましょう！",
    exampleMeaning: "Hãy tích cực phát biểu trong lớp học nhé!",
    level: "N3",
    category: "Tính cách"
  }
];

const ANIME_VOCABULARY: Vocabulary[] = [
  {
    id: "anime_1",
    word: "仲間",
    reading: "なかま",
    romaji: "nakama",
    meaning: "Đồng đội, chiến hữu, tri kỷ",
    example: "俺たちは一生の仲間だ！",
    exampleMeaning: "Chúng ta là đồng đội suốt đời!",
    level: "Anime",
    category: "Anime Cổ điển"
  },
  {
    id: "anime_2",
    word: "先輩",
    reading: "せんぱい",
    romaji: "senpai",
    meaning: "Tiền bối, đàn anh/đàn chị",
    example: "先輩、私のことを見てくれましたか？",
    exampleMeaning: "Senpai, anh có nhìn thấy em vừa rồi không?",
    level: "Anime",
    category: "Đời sống Học đường"
  },
  {
    id: "anime_3",
    word: "可愛い",
    reading: "かわいい",
    romaji: "kawaii",
    meaning: "Dễ thương, đáng yêu",
    example: "あの猫、本当に可愛いすぎる！",
    exampleMeaning: "Chú mèo kia thực sự là quá dễ thương luôn!",
    level: "Anime",
    category: "Đời sống Học đường"
  },
  {
    id: "anime_4",
    word: "諦めない",
    reading: "あきらめない",
    romaji: "akiramenai",
    meaning: "Không bao giờ bỏ cuộc",
    example: "最後まで絶対に諦めない！それが俺 của đạo!",
    exampleMeaning: "Tuyệt đối không bỏ cuộc đến giây phút cuối! Đó là con đường của ta!",
    level: "Anime",
    category: "Shonen Nhiệt huyết"
  },
  {
    id: "anime_5",
    word: "絆",
    reading: "きずな",
    romaji: "kizuna",
    meaning: "Mối liên kết, sợi dây gắn kết",
    example: "私たちの絆は誰にも壊せない。",
    exampleMeaning: "Mối liên kết giữa chúng ta không ai có thể phá vỡ.",
    level: "Anime",
    category: "Shonen Nhiệt huyết"
  }
];

const TRAVEL_VOCABULARY: Vocabulary[] = [
  {
    id: "travel_1",
    word: "すみません",
    reading: "すみません",
    romaji: "sumimasen",
    meaning: "Xin lỗi / Cho tôi hỏi...",
    example: "すみません、駅はどこですか？",
    exampleMeaning: "Xin hỏi, nhà ga ở đâu ạ?",
    level: "Travel",
    category: "Giao tiếp"
  },
  {
    id: "travel_2",
    word: "いくら",
    reading: "いくら",
    romaji: "ikura",
    meaning: "Bao nhiêu tiền?",
    example: "このお守りはいくらですか？",
    exampleMeaning: "Cái bùa may mắn này bao nhiêu tiền vậy ạ?",
    level: "Travel",
    category: "Mua sắm"
  },
  {
    id: "travel_3",
    word: "おすすめ",
    reading: "おすすめ",
    romaji: "osusume",
    meaning: "Gợi ý, món được khuyên dùng",
    example: "この店の一番のおすすめは何ですか？",
    exampleMeaning: "Món gợi ý ngon nhất của quán này là gì vậy ạ?",
    level: "Travel",
    category: "Ăn uống"
  },
  {
    id: "travel_4",
    word: "クレジットカード",
    reading: "クレジットカード",
    romaji: "kurejitto kaado",
    meaning: "Thẻ tín dụng",
    example: "クレジットカードは使えますか？",
    exampleMeaning: "Tôi có thể sử dụng thẻ tín dụng được không?",
    level: "Travel",
    category: "Mua sắm"
  },
  {
    id: "travel_5",
    word: "切符",
    reading: "きっぷ",
    romaji: "kippu",
    meaning: "Vé (tàu, xe)",
    example: "新幹線の切符を買いたいです。",
    exampleMeaning: "Tôi muốn mua vé tàu siêu tốc Shinkansen.",
    level: "Travel",
    category: "Di chuyển"
  }
];

export const PRESET_VOCABULARY: Vocabulary[] = [
  ...mappedN5,
  ...N4_VOCABULARY,
  ...N3_VOCABULARY,
  ...ANIME_VOCABULARY,
  ...TRAVEL_VOCABULARY
];

// Dynamically extract unique N5 categories to maintain a clean filter in the UI
const N5_CATEGORIES = Array.from(new Set(mappedN5.map(v => v.category))).sort();

export const CATEGORIES_BY_LEVEL: Record<string, string[]> = {
  N5: N5_CATEGORIES,
  N4: ["Học tập", "Đời sống"],
  N3: ["Cảm xúc", "Xã hội", "Tính cách"],
  Anime: ["Anime Cổ điển", "Đời sống Học đường", "Shonen Nhiệt huyết"],
  Travel: ["Giao tiếp", "Mua sắm", "Ăn uống", "Di chuyển"]
};
