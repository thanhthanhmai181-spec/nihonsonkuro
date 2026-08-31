export interface GrammarN2Example {
  jp: string;
  kana?: string;
  vn: string;
  context?: string;
}

export interface GrammarN2Comparison {
  targetPattern: string;
  difference: string;
  exampleDiff?: string;
}

export interface GrammarN2QuizFill {
  type: "fill";
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface GrammarN2QuizStar {
  type: "star";
  preText: string;
  postText: string;
  fragments: string[];
  correctOrder: number[];
  starPosition: number;
  fullSentence: string;
  explanation: string;
}

export type GrammarN2Quiz = GrammarN2QuizFill | GrammarN2QuizStar;

export interface GrammarN2Item {
  id: number;
  pattern: string;
  romaji?: string;
  meaning: string;
  topicId: number; // 1 to 26 (tương ứng Bài 1 - Bài 26)
  topicName: string; // e.g. "Bài 1: 〜とき・〜直後に"
  connection: string[];
  nuance: string;
  ruleConstraints: string[];
  comparisons?: GrammarN2Comparison[];
  examTips?: string;
  examples: GrammarN2Example[];
  quizzes: GrammarN2Quiz[];
}

export interface GrammarN2Topic {
  id: number;
  lessonNum: number;
  name: string;
  subTitle: string;
  desc: string;
  icon: string;
  badgeColor: string;
}

export const GRAMMAR_N2_TOPICS: GrammarN2Topic[] = [
  {
    id: 1,
    lessonNum: 1,
    name: "Bài 1: 〜とき・〜直後に",
    subTitle: "Khi... / Vừa mới... thì ngay lập tức",
    desc: "〜際（に）, 〜に際して・〜にあたって, 〜たとたん（に）, 〜（か）と思うと, 〜か〜ないかのうちに",
    icon: "Clock",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200"
  },
  {
    id: 2,
    lessonNum: 2,
    name: "Bài 2: 〜している・進行中",
    subTitle: "Đang diễn ra / Đang trong quá trình",
    desc: "〜最中に, 〜うちに, 〜ばかりだ・〜一方だ, 〜（よう）としている, 〜つつある, 〜つつ",
    icon: "Activity",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    id: 3,
    lessonNum: 3,
    name: "Bài 3: 〜後で",
    subTitle: "Sau khi... / Kể từ sau khi",
    desc: "〜てはじめて, 〜上で, 〜次第, 〜て以来・〜てこのかた, 〜てからでないと",
    icon: "Calendar",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200"
  },
  {
    id: 4,
    lessonNum: 4,
    name: "Bài 4: 範囲の始まりと終わり・その間",
    subTitle: "Phạm vi, bắt đầu & kết thúc",
    desc: "〜をはじめ（として）, 〜からして, 〜にわたって, 〜を通じて・〜を通して, 〜限り, 〜だけ",
    icon: "Target",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200"
  },
  {
    id: 5,
    lessonNum: 5,
    name: "Bài 5: 〜だけ・限定と例外",
    subTitle: "Giới hạn, điều kiện & ngoại lệ",
    desc: "〜に限り, 〜限り（は）, 〜限りでは, 〜に限って",
    icon: "CheckCircle2",
    badgeColor: "bg-red-50 text-red-700 border-red-200"
  },
  {
    id: 6,
    lessonNum: 6,
    name: "Bài 6: 〜だけではなく・それに加えて",
    subTitle: "Không chỉ... mà còn...",
    desc: "〜に限らず, 〜のみならず, 〜ばかりか, 〜はもとより, 〜上に",
    icon: "PlusCircle",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200"
  },
  {
    id: 7,
    lessonNum: 7,
    name: "Bài 7: 〜について・〜を相手にして",
    subTitle: "Về chủ đề... / Đối với...",
    desc: "〜に関して, 〜をめぐって, 〜にかけては, 〜に対して, 〜にこたえて",
    icon: "Compass",
    badgeColor: "bg-teal-50 text-teal-700 border-teal-200"
  },
  {
    id: 8,
    lessonNum: 8,
    name: "Bài 8: 〜を基準にして",
    subTitle: "Dựa trên tiêu chuẩn / Căn cứ",
    desc: "〜をもとに（して）, 〜に基づいて, 〜に沿って, 〜のもとで・〜のもとに, 〜向けだ",
    icon: "Scale",
    badgeColor: "bg-cyan-50 text-cyan-700 border-cyan-200"
  },
  {
    id: 9,
    lessonNum: 9,
    name: "Bài 9: 〜に関連して・〜に対応して",
    subTitle: "Liên quan / Tương ứng tỉ lệ",
    desc: "〜につれて・〜にしたがって, 〜に伴って・〜とともに, 〜次第だ・〜次第で, 〜に応じて, 〜につけて",
    icon: "TrendingUp",
    badgeColor: "bg-orange-50 text-orange-700 border-orange-200"
  },
  {
    id: 10,
    lessonNum: 10,
    name: "Bài 10: 〜や〜など",
    subTitle: "Liệt kê, nêu ví dụ & phỏng đoán",
    desc: "〜やら〜やら, 〜というか〜というか, 〜にしても〜にしても, 〜といった",
    icon: "ListPlus",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200"
  },
  {
    id: 11,
    lessonNum: 11,
    name: "Bài 11: 〜に関係なく・無視して",
    subTitle: "Bất kể... / Tạm gác lại",
    desc: "〜を問わず, 〜にかかわらず, 〜もかまわず, 〜はともかく, 〜はさておき",
    icon: "ShieldAlert",
    badgeColor: "bg-violet-50 text-violet-700 border-violet-200"
  },
  {
    id: 12,
    lessonNum: 12,
    name: "Bài 12: 強く否定する・強く否定しない",
    subTitle: "Phủ định mạnh mẽ / Phủ định 1 phần",
    desc: "〜わけがない, 〜どころではない, 〜ものか, 〜わけではない, 〜というものではない",
    icon: "XCircle",
    badgeColor: "bg-red-50 text-red-700 border-red-200"
  },
  {
    id: 13,
    lessonNum: 13,
    name: "Bài 13: 〜（話題）は",
    subTitle: "Đưa ra chủ đề / Định nghĩa",
    desc: "〜とは, 〜といえば, 〜というと・〜といったら, 〜となると, 〜といったら",
    icon: "MessageSquare",
    badgeColor: "bg-yellow-50 text-yellow-700 border-yellow-200"
  },
  {
    id: 14,
    lessonNum: 14,
    name: "Bài 14: 〜けれど",
    subTitle: "Mặc dù... nhưng / Tuy nói là...",
    desc: "〜にもかかわらず, 〜ものの, 〜ながら（も）, 〜つつ（も）, 〜といっても, 〜からといって",
    icon: "Split",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-200"
  },
  {
    id: 15,
    lessonNum: 15,
    name: "Bài 15: もしそうなら・たとえそうでも",
    subTitle: "Giả định / Cho dù là vậy...",
    desc: "〜としたら, 〜ものなら, 〜（よう）ものなら, 〜ないことには, 〜を抜きにしては, 〜としても",
    icon: "HelpCircle",
    badgeColor: "bg-lime-50 text-lime-700 border-lime-200"
  },
  {
    id: 16,
    lessonNum: 16,
    name: "Bài 16: 〜だから・理由①",
    subTitle: "Lý do, nguyên nhân khách quan",
    desc: "〜によって, 〜ものだから, 〜おかげだ／〜せいだ, 〜あまり, 〜につき",
    icon: "Flame",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200"
  },
  {
    id: 17,
    lessonNum: 17,
    name: "Bài 17: 〜だから・理由②",
    subTitle: "Lý do chủ quan & quyết tâm",
    desc: "〜ことだし, 〜のことだから, 〜だけに, 〜ばかりに, 〜からには・〜以上（は）",
    icon: "Sparkles",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200"
  },
  {
    id: 18,
    lessonNum: 18,
    name: "Bài 18: 〜できない・困難だ・〜できる・易しい",
    subTitle: "Khả năng / Khó khăn & Từ chối",
    desc: "〜がたい, 〜わけにはいかない, 〜かねる, 〜ようがない, 〜どころではない, 〜得る／〜得ない",
    icon: "Lock",
    badgeColor: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200"
  },
  {
    id: 19,
    lessonNum: 19,
    name: "Bài 19: 〜を見て評価すると・〜の場で評価すると",
    subTitle: "Đánh giá, lập trường & góc nhìn",
    desc: "〜わりに（は）, 〜にしては, 〜だけ（のことは）ある, 〜として, 〜にとって, 〜にしたら",
    icon: "Award",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200"
  },
  {
    id: 20,
    lessonNum: 20,
    name: "Bài 20: 結果はどうなったか",
    subTitle: "Kết quả / Rốt cuộc dẫn đến...",
    desc: "〜ところ, 〜きり, 〜あげく, 〜末（に）, 〜ところだった, 〜ずじまいだ",
    icon: "CheckSquare",
    badgeColor: "bg-teal-50 text-teal-700 border-teal-200"
  },
  {
    id: 21,
    lessonNum: 21,
    name: "Bài 21: 〜くらい・〜ほど・程度",
    subTitle: "Mức độ, coi nhẹ & điều kiện tối thiểu",
    desc: "〜くらい, 〜など・〜なんか・〜なんて, 〜まで・〜てまで, 〜として〜ない, 〜さえ, 〜さえ〜ば",
    icon: "Zap",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    id: 22,
    lessonNum: 22,
    name: "Bài 22: 〜だけ・限定・非限定",
    subTitle: "Giới hạn, không chỉ... mà còn...",
    desc: "〜に限る／〜に限り／〜に限って, 〜に限らず, 〜のみならず, 〜ばかりか, 〜はもちろん, 〜上に",
    icon: "PlusCircle",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200"
  },
  {
    id: 23,
    lessonNum: 23,
    name: "Bài 23: 〜について・対象",
    subTitle: "Chủ đề, xoay quanh & đáp lại",
    desc: "〜に関して, 〜をめぐって, 〜にかけては, 〜に対して, 〜に応えて",
    icon: "Compass",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200"
  },
  {
    id: 24,
    lessonNum: 24,
    name: "Bài 24: 〜を最初にして・〜を例にして",
    subTitle: "Tiêu biểu, trải suốt & thông qua",
    desc: "〜をはじめ（として）, 〜からして, 〜にわたって, 〜を通じて・〜を通して, 〜を〜として",
    icon: "ListPlus",
    badgeColor: "bg-green-50 text-green-700 border-green-200"
  },
  {
    id: 25,
    lessonNum: 25,
    name: "Bài 25: 変化・進行・感情の強調",
    subTitle: "Biến đổi liên tục & cảm xúc mãnh liệt",
    desc: "〜ばかりだ・〜一方だ, 〜（よ）うとしている, 〜つつある, 〜つつ, 〜てたまらない・〜てならない",
    icon: "TrendingUp",
    badgeColor: "bg-red-50 text-red-700 border-red-200"
  },
  {
    id: 26,
    lessonNum: 26,
    name: "Bài 26: 確信・判断・当然",
    subTitle: "Khẳng định chắc chắn, đành phải & cảnh báo",
    desc: "〜にほかならない, 〜にすぎない, 〜上, 〜ざるを得ない, 〜かねない, 〜っこない, 〜に決まっている, 〜はずだ・〜わけだ",
    icon: "Star",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200"
  }
];

import { GRAMMAR_N2_PART1 } from "./grammarN2Data_Part1";
import { GRAMMAR_N2_PART2 } from "./grammarN2Data_Part2";
import { GRAMMAR_N2_PART3 } from "./grammarN2Data_Part3";
import { GRAMMAR_N2_PART4 } from "./grammarN2Data_Part4";

export const SAMPLE_GRAMMAR_N2_DATA: GrammarN2Item[] = [
  ...GRAMMAR_N2_PART1,
  ...GRAMMAR_N2_PART2,
  ...GRAMMAR_N2_PART3,
  ...GRAMMAR_N2_PART4
];

