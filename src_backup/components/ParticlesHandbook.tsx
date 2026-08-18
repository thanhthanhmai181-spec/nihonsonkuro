import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Volume2, 
  Search, 
  ChevronLeft, 
  BookOpen, 
  ArrowRight, 
  RotateCcw, 
  Award, 
  CheckCircle2, 
  XCircle, 
  HelpCircle,
  Eye,
  EyeOff,
  Sparkles,
  Bookmark,
  GraduationCap
} from "lucide-react";
import { playSound } from "../utils/audio";

export interface ParticleUsage {
  desc: string;
  jp: string;
  vi: string;
}

export interface ParticleInfo {
  id: string;
  char: string;
  romaji: string;
  usages: ParticleUsage[];
  quickNote: string;
}

export const PARTICLES_DATA: ParticleInfo[] = [
  {
    id: "wa",
    char: "は",
    romaji: "wa",
    quickNote: "Biểu thị chủ đề chính của câu nói, so sánh đối lập hoặc lượng từ tối thiểu.",
    usages: [
      { desc: "Chủ đề chính của câu (Giới thiệu, khẳng định)", jp: "{私|わたし}[は]{学生|がくせい}です。", vi: "Tôi là học sinh." },
      { desc: "Nêu chủ đề thảo luận về thời tiết, thời gian", jp: "{今日|きょう}[は]いい{天気|てんき}ですね。", vi: "Hôm nay thời tiết đẹp nhỉ." },
      { desc: "Nêu chủ đề thảo luận về một đồ vật cụ thể", jp: "この{本|ほん}[は]とても{面白|おもしろ}いです。", vi: "Quyển sách này rất thú vị." },
      { desc: "So sánh đối lập giữa hai đối tượng, hai sự việc", jp: "ワイン[は]{好|す}きですが、ビール[は]{好|す}きじゃないです。", vi: "Rượu vang thì tôi thích nhưng bia thì tôi không thích." },
      { desc: "Đi kèm lượng từ biểu thị mức tối thiểu (Ít nhất là)", jp: "{東京|とうきょう}での{生活費|せいかつひ}[は]10{万円|まんえん}[は]かかります。", vi: "Chi phí sinh hoạt ở Tokyo tốn ít nhất 10 vạn yên." }
    ]
  },
  {
    id: "mo",
    char: "も",
    romaji: "mo",
    quickNote: "Dùng khi sự vật có tính chất tương tự (cũng), biểu thị lượng từ cực đoan hoặc phủ định hoàn toàn.",
    usages: [
      { desc: "Biểu thị tính chất tương đồng (Cũng giống như thế)", jp: "{私|わたし}[も]{学生|がくせい}です。", vi: "Tôi cũng là học sinh." },
      { desc: "Biểu thị sự đồng nhất về thời tiết hoặc hành động kế tiếp", jp: "{明日|あした}[も]{雨|あめ}が{降|ふ}るでしょう。", vi: "Ngày mai chắc cũng sẽ mưa." },
      { desc: "Lượng từ bé nhất + も + Phủ định (Hoàn toàn không)", jp: "一{円|えん}[も]ないです。", vi: "Một yên cũng không có." },
      { desc: "Lượng từ + も -> Nhấn mạnh số lượng lớn (Đến tận, những)", jp: "ご{飯|はん}を6つ[も]{食|た}べました。", vi: "Ăn đến tận 6 bát cơm." },
      { desc: "Từ để hỏi + も + Phủ định (Phủ định hoàn toàn)", jp: "どこ[へも]{行|い}かないです。{家|いえ}でテレビを{見|み}ます。", vi: "Không đi đâu cả. Ở nhà xem TV." },
      { desc: "Cũng có thể thực hiện khả năng gì đó", jp: "{漢字|かんじ}[も]{書|か}くことができます。", vi: "Tôi cũng có thể viết được chữ Kanji." }
    ]
  },
  {
    id: "no",
    char: "の",
    romaji: "no",
    quickNote: "Dùng để liên kết các danh từ, chỉ sở hữu, thuộc về hoặc nguồn gốc xuất xứ.",
    usages: [
      { desc: "Danh từ 1 bổ nghĩa cho Danh từ 2 (Giải thích, thuộc về)", jp: "{私|わたし}はA{大学|だいがく}[の]{学生|がくせい}です。", vi: "Tôi là sinh viên của trường đại học A." },
      { desc: "Biểu thị sở hữu tài sản, vật chất", jp: "これ[は]{私|わたし}[の]{本|ほん}です。", vi: "Đây là sách của tôi." },
      { desc: "Biểu thị xuất xứ, nguồn gốc xuất xưởng hoặc cửa hàng", jp: "あそこ[の]{店|みせ}は{美味|おい}しいです。", vi: "Cửa hàng đằng kia ngon lắm." },
      { desc: "Quan hệ liên kết hoặc chức năng cụ thể của sự vật", jp: "{車|くるま}[の]{鍵|かぎ}を{探|さが}しています。", vi: "Tôi đang tìm chìa khóa xe." }
    ]
  },
  {
    id: "ni",
    char: "に",
    romaji: "ni",
    quickNote: "Xác định thời điểm cụ thể, điểm đến của di chuyển, địa điểm tồn tại hoặc đối tượng tiếp nhận.",
    usages: [
      { desc: "Thời điểm cụ thể xảy ra hành động (Thời gian có số)", jp: "6{時|じ}[に]{起|お}きました。", vi: "Tôi đã thức dậy lúc 6 giờ." },
      { desc: "Thời điểm xảy ra hành động (Thứ trong tuần hoặc tháng cụ thể)", jp: "{日曜日|にちようび}[に]{友達|ともだち}と{遊|あそ}びます。", vi: "Tôi chơi với bạn vào Chủ Nhật." },
      { desc: "Địa điểm tồn tại của người hoặc động vật", jp: "{公園|こうえん}[に]{子供|こども}が2{人|ふたり}います。", vi: "Ở công viên có 2 đứa trẻ." },
      { desc: "Địa điểm tồn tại của đồ vật, tĩnh vật", jp: "{机|つくえ}の{上|うえ}[に]{本|ほん}があります。", vi: "Có quyển sách ở trên bàn." },
      { desc: "Điểm đến của các động từ di chuyển (Đi, đến, về)", jp: "{日本|にほん}[に]{行|い}きます。", vi: "Tôi đi Nhật Bản." },
      { desc: "Đối tượng tiếp nhận hành động (Cho, tặng, mượn từ ai)", jp: "{私|わたし}は{友達|ともだち}[に]お{金|かね}を{貸|か}します。", vi: "Tôi cho bạn mượn tiền." },
      { desc: "Mục đích chuyển động (Đi đâu để làm gì)", jp: "プールへ{泳|およ}ぎ[に]{行|い}きます。", vi: "Tôi đi đến hồ bơi để bơi." },
      { desc: "Leo lên phương tiện giao thông hoặc đi vào địa điểm", jp: "バス[に]{乗|の}ります。", vi: "Tôi lên xe buýt." },
      { desc: "Nơi đặt, lưu trữ, viết hoặc đính kèm cái gì", jp: "ノート[に]{言葉|ことば}を{書|か}いています。", vi: "Tôi đang viết từ vựng vào vở." },
      { desc: "Chuyển đổi trạng thái, màu sắc, tiền bạc", jp: "{円|えん}をドル[に]{変|か}えます。", vi: "Tôi đổi Yên sang Đô la." }
    ]
  },
  {
    id: "wo",
    char: "を",
    romaji: "wo",
    quickNote: "Đánh dấu đối tượng tác động trực tiếp của tha động từ hoặc nơi đi qua, rời khỏi.",
    usages: [
      { desc: "Đối tượng chịu tác động trực tiếp của hành động (Tha động từ)", jp: "ご{飯|はん}[を]{食|た}べます。", vi: "Tôi ăn cơm." },
      { desc: "Đối tượng chịu tác động trực tiếp của hành động uống", jp: "{水|みず}[を]{飲|の}みます。", vi: "Tôi uống nước." },
      { desc: "Địa điểm di chuyển qua (Đi dạo, chạy, bay qua)", jp: "{公園|こうえん}[を]{散歩|さんぽ}します。", vi: "Tôi đi dạo ở công viên." },
      { desc: "Địa điểm di chuyển qua không gian", jp: "{空|そら}[を]{飛|と}びます。", vi: "Bay trên bầu trời." },
      { desc: "Băng qua, vượt qua một ranh giới (Đường sá, cầu)", jp: "{道|みち}[を]{渡|わた}ります。", vi: "Băng qua đường." }
    ]
  },
  {
    id: "de",
    char: "で",
    romaji: "de",
    quickNote: "Biểu thị địa điểm xảy ra hành động, phương thức/phương tiện, nguyên nhân hoặc phạm vi giới hạn.",
    usages: [
      { desc: "Địa điểm diễn ra hành động, sự việc", jp: "{図書館|としょかん}[で]{本|ほん}を{読|よ}みます。", vi: "Tôi đọc sách ở thư viện." },
      { desc: "Phương tiện đi lại, công cụ hoặc nguyên vật liệu", jp: "{自転車|じてんしゃ}[で]{学校|がっこう}[へ]{行|い}きます。", vi: "Tôi đi học bằng xe đạp." },
      { desc: "Nguyên nhân, lý do (Do bão, do ốm)", jp: "{病気|びょうき}[で]{学校|がっこう}を{休|やす}みます。", vi: "Tôi nghỉ học vì bị ốm." },
      { desc: "Phạm vi giới hạn về thời gian, tiền bạc hoặc số lượng", jp: "3{時間|じかん}[で]{宿題|しゅくだい}を{終|お}わります。", vi: "Tôi làm xong bài tập trong 3 tiếng." }
    ]
  },
  {
    id: "ga",
    char: "が",
    romaji: "ga",
    quickNote: "Biểu thị chủ ngữ tự nhiên, đối tượng của tính từ, khả năng, sở thích hoặc trạng thái của tự động từ.",
    usages: [
      { desc: "Biểu thị sự tồn tại khách quan (Có cái gì đó)", jp: "お{金|かね}[が]あります。", vi: "Tôi có tiền." },
      { desc: "Biểu thị sự tồn tại khách quan của sinh vật (Có ai/con gì)", jp: "{猫|ねこ}[が]います。", vi: "Có con mèo." },
      { desc: "Đối tượng của khả năng, năng lực hoặc hiểu biết", jp: "{日本語|にほんご}[が]わかります。", vi: "Tôi hiểu tiếng Nhật." },
      { desc: "Đối tượng của sở thích, mong muốn, cảm xúc hoặc tính từ", jp: "{私|わたし}は{料理|りょうり}[が]{上手|じょうず}です。", vi: "Tôi nấu ăn giỏi." },
      { desc: "Nhấn mạnh chủ thể hành động trong câu định ngữ", jp: "{妻|つま}が{作|つく}った{料理|りょうり}[が]おいしいです。", vi: "Món ăn vợ làm rất ngon." },
      { desc: "Biểu thị trạng thái tự nhiên của tự động từ", jp: "{服|ふく}[が]{汚|よご}れている。", vi: "Quần áo đang bị bẩn." }
    ]
  },
  {
    id: "e",
    char: "へ",
    romaji: "e",
    quickNote: "Biểu thị hướng di chuyển cụ thể của hành động di chuyển.",
    usages: [
      { desc: "Hướng di chuyển của hành động (Chỉ hướng đi)", jp: "{日本|にほん}[へ]{行|い}きます。", vi: "Tôi đi Nhật Bản." },
      { desc: "Hướng gửi gắm tình cảm, thư từ (Gửi đến ai)", jp: "{友達|ともだち}[へ]の{手紙|てがみ}です。", vi: "Đây là bức thư gửi cho người bạn." }
    ]
  },
  {
    id: "to",
    char: "と",
    romaji: "to",
    quickNote: "Dùng để nối các danh từ (và), biểu thị đối tượng cùng thực hiện hành động, hoặc nội dung trích dẫn.",
    usages: [
      { desc: "Nối các danh từ trọn vẹn (Và)", jp: "{本|ほん}[と]{鉛筆|えんぴつ}があります。", vi: "Có sách và bút chì." },
      { desc: "Đối tượng cùng thực hiện hành động (Cùng với ai)", jp: "{友達|ともだち}[と]{旅行|りょこう}します。", vi: "Tôi đi du lịch cùng bạn bè." },
      { desc: "Nội dung trích dẫn suy nghĩ, lời nói", jp: "{明日|あした}は{雨|あめ}だと{思|お}います。", vi: "Tôi nghĩ ngày mai trời sẽ mưa." }
    ]
  },
  {
    id: "kara",
    char: "から",
    romaji: "kara",
    quickNote: "Biểu thị điểm khởi đầu về không gian/thời gian (từ), hoặc chỉ nguyên nhân/lý do (vì).",
    usages: [
      { desc: "Mốc thời gian bắt đầu của một hoạt động", jp: "{会議|かいぎ}は9{時|じ}[から]です。", vi: "Cuộc họp bắt đầu từ 9 giờ." },
      { desc: "Địa điểm bắt đầu di chuyển (Từ đâu)", jp: "{ベトナム|べとなむ}[から]{来|き}ました。", vi: "Tôi đến từ Việt Nam." },
      { desc: "Biểu thị nguyên nhân, lý do (Vì... nên...)", jp: "{時間|じかん}がない[から]{急|いそ}ぎます。", vi: "Vì không có thời gian nên tôi sẽ khẩn trương." }
    ]
  },
  {
    id: "made",
    char: "まで",
    romaji: "made",
    quickNote: "Biểu thị điểm giới hạn, kết thúc về không gian hoặc thời gian (đến).",
    usages: [
      { desc: "Mốc thời gian kết thúc của một hoạt động, ca làm", jp: "{銀行|ぎんこう}は5{時|じ}[まで]です。", vi: "Ngân hàng mở cửa đến 5 giờ." },
      { desc: "Giới hạn địa điểm dừng chân cuối cùng", jp: "{駅|えき}[まで]いっしょに{歩|ある}きます。", vi: "Chúng tôi cùng đi bộ đến ga." }
    ]
  }
];

interface QuizQuestion {
  jpRaw: string;
  plainJp: string;
  answer: string;
  options: string[];
  vi: string;
  desc: string;
}

interface ParticlesHandbookProps {
  onGoBack: () => void;
}

export default function ParticlesHandbook({ onGoBack }: ParticlesHandbookProps) {
  const [activeTab, setActiveTab] = useState<"learn" | "quiz">("learn");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedParticle, setSelectedParticle] = useState<ParticleInfo | null>(null);
  const [hideFurigana, setHideFurigana] = useState(false);

  // Quiz State
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  // Speak Japanese text via TTS
  const speakJa = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Plain JP generator
  const getPlainJp = (text: string): string => {
    return text
      .replace(/\{([^|]+)\|([^}]+)\}/g, "$1")
      .replace(/\[([^\]]+)\]/g, "$1");
  };

  // Custom JSX parser for Furigana and Target Particles
  const renderFurigana = (text: string, isQuizMode: boolean = false) => {
    const regex = /(\{[^|]+\|[^}]+\}|\[[^\]]+\])/g;
    const parts = text.split(regex);
    
    return (
      <span className="leading-loose inline-flex flex-wrap items-baseline gap-x-0.5">
        {parts.map((part, index) => {
          if (part.startsWith("{") && part.endsWith("}")) {
            const match = part.slice(1, -1).split("|");
            const kanji = match[0];
            const furigana = match[1];
            return (
              <ruby key={index} className="ruby-text relative group/ruby inline-block mx-0.5 select-none">
                <span className="text-gray-900 font-medium text-xl md:text-2xl">{kanji}</span>
                {!hideFurigana && (
                  <rt className="text-[0.55em] text-amber-600 font-bold block text-center transform -translate-y-1 tracking-normal">
                    {furigana}
                  </rt>
                )}
              </ruby>
            );
          } else if (part.startsWith("[") && part.endsWith("]")) {
            const particle = part.slice(1, -1);
            if (isQuizMode) {
              return (
                <span 
                  key={index} 
                  className="inline-block w-14 border-b-4 border-[#8B0000] mx-2 text-center text-transparent font-black text-2xl animate-pulse"
                >
                  _
                </span>
              );
            } else {
              return (
                <span 
                  key={index} 
                  className="mx-1 px-2 py-0.5 bg-amber-100 text-[#8B0000] border-2 border-amber-300 rounded-lg font-black text-2xl shadow-sm"
                >
                  {particle}
                </span>
              );
            }
          }
          return (
            <span key={index} className="text-gray-800 text-xl md:text-2xl font-medium">
              {part}
            </span>
          );
        })}
      </span>
    );
  };

  // Filtered particles for search list
  const filteredParticles = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return PARTICLES_DATA;
    return PARTICLES_DATA.filter(
      p => 
        p.char.includes(q) || 
        p.romaji.toLowerCase().includes(q) || 
        p.quickNote.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Quiz initiation
  const startQuiz = () => {
    playSound.click();
    const questionsPool: QuizQuestion[] = [];

    PARTICLES_DATA.forEach(p => {
      p.usages.forEach(u => {
        // Extract particle
        const match = u.jp.match(/\[(.*?)\]/);
        if (match && match[1]) {
          const correctParticle = match[1];
          // Collect other particles as distractors
          const pool = PARTICLES_DATA.map(item => item.char).filter(c => c !== correctParticle);
          const shuffledPool = [...pool].sort(() => Math.random() - 0.5);
          const distractor1 = shuffledPool[0];
          const distractor2 = shuffledPool[1];
          const distractor3 = shuffledPool[2];

          const options = [correctParticle, distractor1, distractor2, distractor3].sort(() => Math.random() - 0.5);

          questionsPool.push({
            jpRaw: u.jp,
            plainJp: getPlainJp(u.jp),
            answer: correctParticle,
            options,
            vi: u.vi,
            desc: u.desc
          });
        }
      });
    });

    // Select 10 random questions
    const shuffled = questionsPool.sort(() => Math.random() - 0.5);
    setQuizQuestions(shuffled.slice(0, 10));
    setCurrentQuestionIdx(0);
    setQuizScore(0);
    setSelectedAnswer(null);
    setQuizFinished(false);
    setQuizStarted(true);
  };

  // Handle Answer selection
  const handleAnswerSelect = (option: string) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(option);
    const correct = option === quizQuestions[currentQuestionIdx].answer;
    if (correct) {
      playSound.correct();
      setQuizScore(prev => prev + 1);
    } else {
      playSound.wrong();
    }
  };

  // Next question logic
  const handleNextQuestion = () => {
    playSound.click();
    if (currentQuestionIdx < quizQuestions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
      playSound.achievement();
    }
  };

  return (
    <div id="particles-handbook-root" className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row items-center justify-between border-b-4 border-[#1A1A1A] pb-6 gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              playSound.click();
              onGoBack();
            }}
            className="p-3 bg-white border-2 border-[#1A1A1A] hover:bg-gray-100 transition-colors rounded-xl shadow-[4px_4px_0px_#1A1A1A]"
          >
            <ChevronLeft className="w-6 h-6 text-[#1A1A1A]" />
          </button>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] uppercase tracking-tight flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-amber-500 fill-amber-500" />
              Sổ Tay Trợ Từ Toàn Tập
            </h1>
            <p className="text-sm font-semibold text-gray-500 tracking-wider">HỌC TRỰC QUAN · LUYỆN ĐIỀN TỪ PHẢN XẠ</p>
          </div>
        </div>

        {/* Action controls / Tab selection */}
        <div className="flex bg-gray-100 p-1.5 border-2 border-[#1A1A1A] rounded-2xl shadow-[4px_4px_0px_#1A1A1A]">
          <button
            onClick={() => {
              playSound.click();
              setActiveTab("learn");
            }}
            className={`px-5 py-2 rounded-xl font-bold text-sm uppercase transition-all ${
              activeTab === "learn"
                ? "bg-[#8B0000] text-white shadow-md"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              <span>Tra Cứu</span>
            </div>
          </button>
          <button
            onClick={() => {
              playSound.click();
              setActiveTab("quiz");
              if (!quizStarted) {
                startQuiz();
              }
            }}
            className={`px-5 py-2 rounded-xl font-bold text-sm uppercase transition-all ${
              activeTab === "quiz"
                ? "bg-[#8B0000] text-white shadow-md"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              <span>Luyện Trắc Nghiệm</span>
            </div>
          </button>
        </div>
      </div>

      {/* RENDER VIEW: LEARN (SEARCH & TRA CỨU) */}
      {activeTab === "learn" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left panel: Quick Rules and Search List */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick advice box */}
            <div className="bg-[#FAF9F5] border-2 border-[#1A1A1A] p-6 rounded-2xl shadow-[4px_4px_0px_#1A1A1A] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#8B0000] text-white flex items-center justify-center font-black rounded-bl-3xl">
                ★
              </div>
              <h3 className="font-bold text-lg text-[#1A1A1A] mb-2 flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-[#8B0000]" />
                Lưu Ý Thầy Sơn
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed italic">
                "Học trợ từ không chỉ là học công thức suông. Hãy đọc to từng câu ví dụ để tai quen với nhịp điệu của câu nói, trợ từ sẽ tự động thấm vào phản xạ của các ngươi một cách tự nhiên nhất!"
              </p>
            </div>

            {/* Search filter panel */}
            <div className="bg-white border-2 border-[#1A1A1A] p-5 rounded-2xl shadow-[4px_4px_0px_#1A1A1A] space-y-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm trợ từ (ví dụ: wa, を, ni...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border-2 border-[#1A1A1A] rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                />
              </div>

              {/* Quick toggle settings */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-xs font-black text-gray-400 uppercase">Tùy Chọn Hiển Thị:</span>
                <button
                  onClick={() => {
                    playSound.click();
                    setHideFurigana(!hideFurigana);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 border-2 border-[#1A1A1A] rounded-lg text-xs font-bold transition-all shadow-[2px_2px_0px_#1A1A1A] ${
                    hideFurigana ? "bg-amber-100 text-[#8B0000]" : "bg-white text-gray-700"
                  }`}
                >
                  {hideFurigana ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{hideFurigana ? "Hiện Phiên Âm" : "Ẩn Phiên Âm"}</span>
                </button>
              </div>
            </div>

            {/* Particles List */}
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredParticles.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    playSound.click();
                    setSelectedParticle(p);
                  }}
                  className={`w-full p-4 border-2 rounded-2xl transition-all flex items-center justify-between text-left shadow-[4px_4px_0px_#1A1A1A] hover:translate-y-[-2px] ${
                    selectedParticle?.id === p.id
                      ? "bg-amber-50 border-[#8B0000]"
                      : "bg-white border-[#1A1A1A] hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl border-2 border-[#1A1A1A] bg-[#1A1A1E] flex items-center justify-center text-white font-black text-2xl group-hover:scale-110 transition-transform">
                      {p.char}
                    </div>
                    <div>
                      <h4 className="font-black text-[#1A1A1A] text-lg uppercase tracking-wide">
                        Trợ từ {p.char} ({p.romaji})
                      </h4>
                      <p className="text-xs text-gray-500 font-semibold line-clamp-1">{p.quickNote}</p>
                    </div>
                  </div>
                  <ChevronLeft className="w-5 h-5 text-gray-400 transform rotate-180" />
                </button>
              ))}

              {filteredParticles.length === 0 && (
                <div className="text-center py-12 bg-white border-2 border-dashed border-gray-300 rounded-2xl">
                  <HelpCircle className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-bold text-gray-500">Không tìm thấy trợ từ phù hợp!</p>
                </div>
              )}
            </div>

          </div>

          {/* Right panel: Active particle details */}
          <div className="lg:col-span-7">
            {selectedParticle ? (
              <motion.div
                key={selectedParticle.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border-4 border-[#1A1A1A] rounded-2xl shadow-[8px_8px_0px_#8B0000] overflow-hidden"
              >
                {/* Visual Header */}
                <div className="bg-gradient-to-r from-[#1A1A2E] to-[#16213E] p-8 text-white relative overflow-hidden border-b-4 border-[#1A1A1A]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-12 translate-x-12"></div>
                  <div className="relative z-10 flex items-center gap-6">
                    <div className="w-20 h-20 bg-white border-4 border-[#C5A059] text-[#1A1A2E] rounded-2xl flex items-center justify-center text-4xl font-black rotate-2 shadow-xl">
                      {selectedParticle.char}
                    </div>
                    <div>
                      <span className="text-xs font-black tracking-widest text-[#C5A059] uppercase bg-[#C5A059]/10 px-2.5 py-1 rounded-md">TRỢ TỪ THIẾT YẾU</span>
                      <h2 className="text-3xl font-black mt-1">
                        Trợ từ "{selectedParticle.char}" [{selectedParticle.romaji}]
                      </h2>
                    </div>
                  </div>
                </div>

                {/* Info Container */}
                <div className="p-6 md:p-8 space-y-6">
                  {/* General summary block */}
                  <div className="bg-amber-50/50 border-2 border-[#1A1A1A] p-4 rounded-xl flex gap-3">
                    <span className="text-xl">💡</span>
                    <div>
                      <p className="text-xs font-black uppercase text-[#8B0000]">Tóm tắt cách dùng</p>
                      <p className="text-sm font-bold text-gray-700 mt-0.5">{selectedParticle.quickNote}</p>
                    </div>
                  </div>

                  {/* List of usages */}
                  <div className="space-y-6">
                    <h3 className="font-black text-[#1A1A1A] border-b-2 border-gray-100 pb-2 flex items-center gap-2">
                      <span>📌</span> CÁC VÍ DỤ MINH HỌA
                    </h3>

                    {selectedParticle.usages.map((u, idx) => (
                      <div key={idx} className="relative pl-6 border-l-4 border-amber-200 py-1 space-y-3">
                        <div className="absolute left-[-10px] top-1.5 w-4.5 h-4.5 rounded-full bg-white border-4 border-[#8B0000]"></div>
                        
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-xs font-black uppercase bg-gray-100 px-2 py-1 rounded text-gray-700">
                            Cách dùng {idx + 1}: {u.desc}
                          </span>
                        </div>

                        {/* Interactive sentence playboard */}
                        <div className="bg-gray-50 hover:bg-amber-50/20 border-2 border-[#1A1A1A] p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors">
                          <div className="flex-1 space-y-2">
                            {/* Rendered furigana sentence */}
                            <div className="flex flex-wrap items-baseline">
                              {renderFurigana(u.jp, false)}
                            </div>
                            <p className="text-gray-500 font-bold text-sm md:text-base border-t border-dashed border-gray-200 pt-2 italic">
                              👉 {u.vi}
                            </p>
                          </div>

                          <button
                            onClick={() => speakJa(getPlainJp(u.jp))}
                            className="p-3 bg-white hover:bg-amber-50 border-2 border-[#1A1A1A] rounded-xl text-[#8B0000] shadow-[2px_2px_0px_#1A1A1A] hover:translate-y-[-1px] transition-all"
                            title="Nghe phát âm chuẩn"
                          >
                            <Volume2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white border-4 border-dashed border-gray-300 rounded-2xl p-16 text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-4xl text-gray-400">
                  📖
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-700">Khám Phá Sổ Tay</h3>
                  <p className="text-sm font-semibold text-gray-500 mt-1 max-w-sm mx-auto">
                    Chọn một trợ từ trong danh sách bên trái để mở rộng kiến thức chi tiết, cách phát âm và các mẫu câu tiêu biểu từ Thầy Sơn nhé!
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
      )}

      {/* RENDER VIEW: QUIZ PRACTICE */}
      {activeTab === "quiz" && (
        <div className="max-w-3xl mx-auto">
          
          {!quizFinished ? (
            <div className="bg-white border-4 border-[#1A1A1A] rounded-2xl shadow-[8px_8px_0px_#1A1A1A] overflow-hidden">
              
              {/* Progress bar */}
              <div className="h-3 bg-gray-100 border-b-2 border-[#1A1A1A]">
                <div 
                  className="h-full bg-amber-500 transition-all duration-300"
                  style={{ width: `${((currentQuestionIdx) / quizQuestions.length) * 100}%` }}
                ></div>
              </div>

              {quizQuestions.length > 0 && (
                <div className="p-6 md:p-8 space-y-6">
                  {/* Score indicators */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-black rounded-lg border border-gray-300">
                      CÂU HỎI: {currentQuestionIdx + 1} / {quizQuestions.length}
                    </span>
                    <span className="px-3 py-1.5 bg-green-50 text-green-700 text-xs font-black rounded-lg border border-green-300">
                      ĐÚNG: {quizScore}
                    </span>
                  </div>

                  {/* Context note from Teacher Son */}
                  <div className="bg-amber-50 border-2 border-amber-200 p-4 rounded-xl flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-black uppercase text-amber-800">Gợi ý tình huống:</p>
                      <p className="text-sm font-bold text-gray-700 mt-0.5">{quizQuestions[currentQuestionIdx].desc}</p>
                    </div>
                  </div>

                  {/* The actual question display board */}
                  <div className="bg-gray-50 border-2 border-[#1A1A1A] p-6 md:p-8 rounded-2xl text-center space-y-4 relative">
                    <div className="flex flex-wrap items-center justify-center gap-1">
                      {renderFurigana(quizQuestions[currentQuestionIdx].jpRaw, true)}
                    </div>

                    <button
                      onClick={() => speakJa(quizQuestions[currentQuestionIdx].plainJp)}
                      className="absolute right-4 bottom-4 p-2.5 bg-white border-2 border-[#1A1A1A] rounded-xl hover:bg-gray-100 text-[#8B0000] shadow-[2px_2px_0px_#1A1A1A]"
                      title="Nghe phát âm"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Multiple options list */}
                  <div className="grid grid-cols-2 gap-4">
                    {quizQuestions[currentQuestionIdx].options.map((opt, i) => {
                      const isSelected = selectedAnswer === opt;
                      const isCorrectAnswer = opt === quizQuestions[currentQuestionIdx].answer;
                      
                      let optionStyle = "border-[#1A1A1A] bg-white hover:bg-gray-50 text-gray-800 shadow-[4px_4px_0px_#1A1A1A] hover:translate-y-[-1px]";
                      if (selectedAnswer !== null) {
                        if (isCorrectAnswer) {
                          optionStyle = "border-green-600 bg-green-100 text-green-800 shadow-[2px_2px_0px_#16a34a]";
                        } else if (isSelected) {
                          optionStyle = "border-red-600 bg-red-100 text-red-800 shadow-[2px_2px_0px_#dc2626]";
                        } else {
                          optionStyle = "border-gray-200 bg-gray-50 text-gray-300 opacity-60 cursor-not-allowed";
                        }
                      }

                      return (
                        <button
                          key={i}
                          disabled={selectedAnswer !== null}
                          onClick={() => handleAnswerSelect(opt)}
                          className={`p-6 border-2 rounded-2xl text-3xl font-black transition-all flex items-center justify-center gap-2 ${optionStyle}`}
                        >
                          <span>{opt}</span>
                          {selectedAnswer !== null && isCorrectAnswer && <CheckCircle2 className="w-6 h-6 text-green-600 fill-white" />}
                          {selectedAnswer !== null && isSelected && !isCorrectAnswer && <XCircle className="w-6 h-6 text-red-600 fill-white" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanatory explanation card */}
                  <AnimatePresence>
                    {selectedAnswer !== null && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-amber-50/40 border-2 border-[#1A1A1A] p-5 rounded-2xl space-y-3"
                      >
                        <div className="flex items-center gap-2">
                          {selectedAnswer === quizQuestions[currentQuestionIdx].answer ? (
                            <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-black rounded border border-green-300 uppercase">CHÍNH XÁC</span>
                          ) : (
                            <span className="px-2.5 py-1 bg-red-100 text-red-700 text-xs font-black rounded border border-red-300 uppercase">CHƯA CHÍNH XÁC</span>
                          )}
                          <span className="text-xs text-gray-500 font-bold">Đáp án đúng: <strong className="text-xl text-[#8B0000]">{quizQuestions[currentQuestionIdx].answer}</strong></span>
                        </div>

                        <div className="space-y-2">
                          <p className="text-base text-gray-800 font-bold leading-relaxed">
                            {renderFurigana(quizQuestions[currentQuestionIdx].jpRaw, false)}
                          </p>
                          <p className="text-sm font-semibold text-gray-500 border-t border-dashed border-gray-200 pt-2 italic">
                            👉 {quizQuestions[currentQuestionIdx].vi}
                          </p>
                        </div>

                        <button
                          onClick={handleNextQuestion}
                          className="w-full mt-4 py-3 bg-[#8B0000] hover:bg-[#A00000] text-white font-black rounded-xl uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-[4px_4px_0px_#1A1A1A]"
                        >
                          <span>{currentQuestionIdx < quizQuestions.length - 1 ? "Câu Tiếp Theo" : "Xem Kết Quả"}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              )}

            </div>
          ) : (
            /* Result Dashboard card */
            <div className="bg-white border-4 border-[#1A1A1A] p-8 md:p-12 rounded-2xl shadow-[8px_8px_0px_#8B0000] text-center space-y-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
              
              <Award className="w-24 h-24 text-amber-500 fill-amber-100 mx-auto animate-bounce" />
              
              <div className="space-y-2 relative z-10">
                <h2 className="text-3xl font-black text-[#1A1A1A] uppercase tracking-tight">Hoàn Thành Luyện Tập!</h2>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">KẾT QUẢ CỦA NGƯƠI</p>
              </div>

              <div className="inline-block border-4 border-[#1A1A1A] p-6 bg-amber-50 rounded-2xl relative z-10 shadow-[4px_4px_0px_#1A1A1A]">
                <span className="text-5xl font-black text-[#8B0000]">{quizScore}</span>
                <span className="text-2xl font-black text-gray-400"> / {quizQuestions.length}</span>
                <p className="text-xs font-black text-gray-500 mt-2 uppercase tracking-wider">CÂU TRẢ LỜI CHÍNH XÁC</p>
              </div>

              <p className="text-sm text-gray-600 italic max-w-md mx-auto relative z-10">
                {quizScore === quizQuestions.length
                  ? '"Quá xuất sắc! Ngươi đã lĩnh hội trọn vẹn toàn bộ các trợ từ này rồi đó. Thầy Sơn rất tự hào về ngươi!"'
                  : quizScore >= 7
                  ? '"Rất tốt! Khả năng phản xạ trợ từ của ngươi khá ổn định đấy. Chỉ cần ôn tập thêm một chút nữa thôi!"'
                  : '"Đừng nản chí! Trợ từ tiếng Nhật cần thời gian rèn luyện dài lâu. Hãy mở phần Tra cứu đọc kỹ lại ví dụ và làm lại nhé!"'}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <button
                  onClick={startQuiz}
                  className="px-6 py-3.5 bg-[#8B0000] hover:bg-[#A00000] text-white font-black rounded-xl uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-[4px_4px_0px_#1A1A1A] hover:translate-y-[-1px] transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Luyện Tập Lại</span>
                </button>
                <button
                  onClick={() => {
                    playSound.click();
                    setActiveTab("learn");
                  }}
                  className="px-6 py-3.5 bg-white hover:bg-gray-50 text-[#1A1A1A] border-2 border-[#1A1A1A] font-black rounded-xl uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-[4px_4px_0px_#1A1A1A] hover:translate-y-[-1px] transition-all"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Quay Lại Tra Cứu</span>
                </button>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
