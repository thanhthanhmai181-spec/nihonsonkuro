import React, { useState, useMemo, useEffect } from "react";
import { motion } from "motion/react";
import { TRANSITIVE_VERBS, VerbPair, VerbInfo } from "../data/transitiveData";
import { playSound } from "../utils/audio";
import { 
  Volume2, 
  Search, 
  ChevronLeft, 
  Info, 
  ClipboardCheck, 
  BookOpen, 
  ArrowRight, 
  RotateCcw, 
  Award, 
  CheckCircle2, 
  XCircle,
  HelpCircle,
  Filter,
  Eye,
  EyeOff
} from "lucide-react";

interface VerbHandbookProps {
  onGoBack: () => void;
}

interface VerbQuizQuestion {
  pair: VerbPair;
  isAuto: boolean; // true if testing intransitive, false if transitive
  prompt: string;
  options: string[];
  correctAnswer: string;
  correctHiragana: string;
  meaning: string;
  example: string;
  exampleVi: string;
}

export default function VerbHandbook({ onGoBack }: VerbHandbookProps) {
  const [activeSubTab, setActiveSubTab] = useState<"overview" | "dictionary" | "quiz">("overview");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [hideReadings, setHideReadings] = useState<boolean>(false);

  // Quiz states
  const [quizQuestions, setQuizQuestions] = useState<VerbQuizQuestion[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Switch tabs with sound
  const handleSwitchTab = (tabId: typeof activeSubTab) => {
    playSound.click();
    setActiveSubTab(tabId);
    if (tabId === "quiz") {
      generateQuiz();
    }
  };

  // Speak Japanese text via TTS
  const speakJa = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const cleanText = text.replace("＿＿＿", "").split("。")[0].trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = "ja-JP";
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Determine the vần rule group of a verb pair for categorization
  const getRuleGroup = (pair: VerbPair): string => {
    const a = pair.auto.k;
    const t = pair.trans.k;
    const ah = pair.auto.h;
    const th = pair.trans.h;

    if (ah.endsWith("まる") && th.endsWith("める")) return "aru-eru";
    if (ah.endsWith("がる") && th.endsWith("げる")) return "aru-eru";
    if (ah.endsWith("まる") && th.endsWith("める")) return "aru-eru";
    if (ah.endsWith("まる") && th.endsWith("める")) return "aru-eru";
    
    // Check by endsWith characters
    if (ah.endsWith("る") && th.endsWith("す")) return "ru-su";
    if (ah.endsWith("える") && th.endsWith("す")) return "eru-asu";
    if (ah.endsWith("える") && th.endsWith("る")) return "eru-u";
    if (ah.endsWith("く") && th.endsWith("ける")) return "u-eru";
    if (ah.endsWith("つ") && th.endsWith("てる")) return "u-eru";
    if (ah.endsWith("む") && th.endsWith("める")) return "u-eru";
    
    return "other";
  };

  const ruleFilters = [
    { id: "all", label: "Tất cả 70 cặp" },
    { id: "aru-eru", label: "Đuôi -aru vs -eru (Tự -eru / Tha -asu)" },
    { id: "eru-asu", label: "Đuôi -eru vs -asu" },
    { id: "eru-u", label: "Đuôi -eru vs -u" },
    { id: "u-eru", label: "Đuôi -u vs -eru" },
    { id: "ru-su", label: "Đuôi -ru vs -su" },
    { id: "other", label: "Nhóm khác / Biến cách" }
  ];

  // Filtering 70 pairs
  const filteredVerbs = useMemo(() => {
    return TRANSITIVE_VERBS.filter(pair => {
      const matchesSearch = 
        pair.mean.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pair.auto.k.includes(searchTerm) ||
        pair.auto.h.includes(searchTerm) ||
        pair.auto.r.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pair.trans.k.includes(searchTerm) ||
        pair.trans.h.includes(searchTerm) ||
        pair.trans.r.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;
      if (selectedFilter === "all") return true;

      const group = getRuleGroup(pair);
      return group === selectedFilter;
    });
  }, [searchTerm, selectedFilter]);

  // Quiz generator: Pick 15 random questions from 140 possible (70 auto, 70 trans)
  const generateQuiz = () => {
    const allQuestions: VerbQuizQuestion[] = [];

    TRANSITIVE_VERBS.forEach(pair => {
      // 1. Question testing Intransitive (Auto)
      allQuestions.push({
        pair,
        isAuto: true,
        prompt: pair.auto.quiz,
        options: [pair.auto.k, pair.trans.k],
        correctAnswer: pair.auto.k,
        correctHiragana: pair.auto.h,
        meaning: pair.auto.exVi,
        example: pair.auto.ex,
        exampleVi: pair.auto.exVi
      });

      // 2. Question testing Transitive (Trans)
      allQuestions.push({
        pair,
        isAuto: false,
        prompt: pair.trans.quiz,
        options: [pair.trans.k, pair.trans.k], // Will random and ensure distinct options below
        correctAnswer: pair.trans.k,
        correctHiragana: pair.trans.h,
        meaning: pair.trans.exVi,
        example: pair.trans.ex,
        exampleVi: pair.trans.exVi
      });
    });

    // Shuffle and pick 15
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 15).map(q => {
      // Options should be [Auto Kanji, Transitive Kanji] or [Auto Hiragana, Transitive Hiragana]
      // Let's offer both Kanji versions as the choices
      const isKanjiCorrect = q.correctAnswer;
      const otherOption = q.isAuto ? q.pair.trans.k : q.pair.auto.k;
      
      return {
        ...q,
        options: [isKanjiCorrect, otherOption].sort(() => Math.random() - 0.5)
      };
    });

    setQuizQuestions(selected);
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizFinished(false);
  };

  const handleQuizAnswer = (option: string) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(option);
    
    const correct = quizQuestions[currentQuizIndex].correctAnswer;
    if (option === correct) {
      playSound.correct();
      setScore(prev => prev + 1);
    } else {
      playSound.wrong();
    }
    speakJa(option);
  };

  const handleNextQuiz = () => {
    playSound.click();
    if (currentQuizIndex < quizQuestions.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Button and Premium Tag */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-rose-100 pb-4">
        <button
          id="btn-back-handbooks"
          onClick={onGoBack}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl transition-all shadow-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          Quay lại danh sách sổ tay
        </button>
        <div className="text-right">
          <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full uppercase tracking-wider border border-amber-200">
            Học độc quyền cùng Thầy Sơn 🌸
          </span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-white border border-rose-100 shadow-sm rounded-3xl p-4 md:p-6 space-y-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-md">
              🔄
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
                Tự - Tha Động Từ Tiếng Nhật <span className="text-[10px] bg-amber-500 text-white font-bold px-2 py-0.5 rounded-full">CORE N3</span>
              </h2>
              <p className="text-xs text-gray-500">Bảng tra 70 cặp động từ kinh điển và bài tập phản xạ thông minh 🇻🇳 🇯🇵</p>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <nav className="flex flex-wrap gap-1 bg-gray-100 p-1 rounded-xl w-full lg:w-auto overflow-x-auto">
            <button
              id="tab-overview"
              onClick={() => handleSwitchTab("overview")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeSubTab === "overview" ? "bg-amber-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-950"}`}
            >
              <Info className="w-3.5 h-3.5" />
              <span>Quy Tắc Vàng</span>
            </button>
            <button
              id="tab-dictionary"
              onClick={() => handleSwitchTab("dictionary")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeSubTab === "dictionary" ? "bg-amber-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-950"}`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>70 Cặp Động Từ</span>
            </button>
            <button
              id="tab-quiz"
              onClick={() => handleSwitchTab("quiz")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeSubTab === "quiz" ? "bg-amber-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-950"}`}
            >
              <ClipboardCheck className="w-3.5 h-3.5" />
              <span>Luyện Phản Xạ</span>
            </button>
          </nav>
        </div>
      </div>

      {/* TAB 1: OVERVIEW & GRAMMAR */}
      {activeSubTab === "overview" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Sensei Advice Banner */}
          <div className="bg-gradient-to-br from-amber-600 to-rose-700 rounded-3xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
            <div className="absolute right-0 bottom-0 translate-y-10 translate-x-10 text-white/5 font-serif text-[12rem] select-none pointer-events-none">
              動
            </div>
            <div className="max-w-2xl space-y-3 relative z-10">
              <span className="bg-white/20 text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider uppercase">
                Khái niệm cốt lõi & Quy tắc nhận diện nhanh
              </span>
              <h2 className="text-xl md:text-3xl font-black leading-tight">
                Phân biệt Tự động từ (自動詞) và Tha động từ (他動詞)
              </h2>
              <p className="text-amber-50 text-xs md:text-sm leading-relaxed">
                "Nhiều học sinh thường bối rối khi gặp các cặp tự - tha động từ trong bài thi JLPT N3. Nhưng đừng lo! Ta đã đúc kết các quy tắc vàng cùng 70 cặp từ kinh điển nhất dưới đây để các em nhớ lâu, phản xạ nhanh và đạt điểm tuyệt đối nhé!"
              </p>
            </div>
          </div>

          {/* Quick Rules Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Intransitive card */}
            <div className="bg-white border-2 border-blue-100 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">
                  Tự Động Từ (自動詞 - Jidoshi)
                </span>
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-lg font-black text-gray-900 font-sans">Hành động xảy ra tự nhiên</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Diễn tả hành động, trạng thái tự bản thân chủ thể xảy ra mà không cần có tác động trực tiếp từ con người hoặc tác nhân ngoài.
              </p>
              
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-white bg-blue-600 px-2 py-0.5 rounded">
                    CÚ PHÁP
                  </span>
                  <span className="text-sm font-bold text-blue-900 font-mono">Chủ ngữ が + Tự động từ</span>
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  Ví dụ: <strong className="text-gray-900">ドアが開く (あく)</strong> - Cửa tự mở (do gió, tự động).
                </div>
              </div>
            </div>

            {/* Transitive card */}
            <div className="bg-white border-2 border-rose-100 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full uppercase tracking-widest">
                  Tha Động Từ (他動詞 - Tadoshi)
                </span>
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-black text-gray-900 font-sans">Hành động có chủ ý tác động</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Diễn tả hành động có chủ ý, có tác nhân (thường là con người) thực hiện và tác động trực tiếp lên một đối tượng khác (tân ngữ).
              </p>

              <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-100 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-white bg-rose-600 px-2 py-0.5 rounded">
                    CÚ PHÁP
                  </span>
                  <span className="text-sm font-bold text-rose-900 font-mono">Tác nhân が + Tân ngữ を + Tha động từ</span>
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  Ví dụ: <strong className="text-gray-900">ドアを開ける (あける)</strong> - Tôi mở cửa (có mục đích).
                </div>
              </div>
            </div>
          </div>

          {/* Suffix Conversion Patterns */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
            <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
              <span>🎯 5 Quy luật ghép vần nhận diện nhanh</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
              <div className="p-4 border border-gray-100 rounded-xl bg-gray-50/50 space-y-2">
                <p className="font-extrabold text-amber-600">1. Đuôi -aru (Tự) vs -eru (Tha)</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Động từ đuôi vần <code className="font-bold">-aru</code> là tự động từ, chuyển sang <code className="font-bold">-eru</code> là tha động từ.
                </p>
                <div className="text-xs bg-white p-2 rounded border border-gray-100 font-mono">
                  閉まる (shimaru) ➔ 閉める (shimeru)
                  <br />
                  上がる (agaru) ➔ 上げる (ageru)
                </div>
              </div>

              <div className="p-4 border border-gray-100 rounded-xl bg-gray-50/50 space-y-2">
                <p className="font-extrabold text-amber-600">2. Đuôi -eru (Tự) vs -asu (Tha)</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Động từ đuôi vần <code className="font-bold">-eru</code> là tự động từ, chuyển sang <code className="font-bold">-asu</code> là tha động từ.
                </p>
                <div className="text-xs bg-white p-2 rounded border border-gray-100 font-mono">
                  増える (fueru) ➔ 増やす (fuyasu)
                  <br />
                  冷める (sameru) ➔ 冷ます (samasu)
                </div>
              </div>

              <div className="p-4 border border-gray-100 rounded-xl bg-gray-50/50 space-y-2">
                <p className="font-extrabold text-amber-600">3. Đuôi -eru (Tự) vs -u (Tha)</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Tự động từ đuôi <code className="font-bold">-eru</code> (thường thuộc nhóm II), tha động từ đuôi <code className="font-bold">-u</code> (nhóm I).
                </p>
                <div className="text-xs bg-white p-2 rounded border border-gray-100 font-mono">
                  割れる (wareru) ➔ 割る (waru)
                  <br />
                  折れる (oreru) ➔ 折る (oru)
                </div>
              </div>

              <div className="p-4 border border-gray-100 rounded-xl bg-gray-50/50 space-y-2">
                <p className="font-extrabold text-amber-600">4. Đuôi -u (Tự) vs -eru (Tha)</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Tự động từ đuôi <code className="font-bold">-u</code> (nhóm I), tha động từ đuôi <code className="font-bold">-eru</code> (nhóm II).
                </p>
                <div className="text-xs bg-white p-2 rounded border border-gray-100 font-mono">
                  開く (aku) ➔ 開ける (akeru)
                  <br />
                  育つ (sodatsu) ➔ 育てる (sodateru)
                </div>
              </div>

              <div className="p-4 border border-gray-100 rounded-xl bg-gray-50/50 space-y-2">
                <p className="font-extrabold text-amber-600">5. Đuôi -ru (Tự) vs -su (Tha)</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Hầu hết các động từ kết thúc bằng đuôi <code className="font-bold">-su</code> đều là tha động từ.
                </p>
                <div className="text-xs bg-white p-2 rounded border border-gray-100 font-mono">
                  直る (naoru) ➔ 直す (naosu)
                  <br />
                  壊れる (kowareru) ➔ 壊す (kowasu)
                </div>
              </div>

              <div className="p-4 border border-gray-100 rounded-xl bg-amber-50/30 border-amber-100 space-y-2">
                <p className="font-extrabold text-amber-700">💡 Mẹo Làm Bài Thi JLPT</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Chú ý quan sát <strong>trợ từ đi kèm</strong>. Nếu đứng trước ô trống là <code className="font-bold text-blue-600">が</code>, ưu tiên chọn Tự động từ. Nếu là <code className="font-bold text-rose-600">を</code>, ưu tiên chọn Tha động từ!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 70 PAIRS LIST */}
      {activeSubTab === "dictionary" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Controls Panel */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="verb-search-input"
                  type="text"
                  placeholder="Tìm động từ (Kanji, Hiragana, Romaji, Ý nghĩa...)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 focus:border-amber-500 rounded-xl text-sm outline-none transition-all"
                />
              </div>

              {/* Toggle hide readings */}
              <button
                id="btn-toggle-readings"
                onClick={() => {
                  playSound.click();
                  setHideReadings(!hideReadings);
                }}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-all"
              >
                {hideReadings ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{hideReadings ? "Hiện âm đọc" : "Ẩn âm đọc để tự kiểm tra"}</span>
              </button>
            </div>

            {/* Sub filter buttons by grammar patterns */}
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100">
              {ruleFilters.map((filter) => (
                <button
                  key={filter.id}
                  id={`filter-btn-${filter.id}`}
                  onClick={() => {
                    playSound.click();
                    setSelectedFilter(filter.id);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${selectedFilter === filter.id ? "bg-amber-100 text-amber-800 border border-amber-200" : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent"}`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Word list counter */}
          <div className="flex items-center justify-between px-2 text-xs text-gray-500 font-bold">
            <span>Hiển thị: {filteredVerbs.length} / 70 cặp động từ</span>
          </div>

          {/* Cards Grid */}
          {filteredVerbs.length > 0 ? (
            <div id="verbs-list-grid" className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {filteredVerbs.map((pair) => (
                <div 
                  key={pair.id} 
                  id={`verb-pair-card-${pair.id}`}
                  className="bg-white border-2 border-gray-100 rounded-2xl p-5 shadow-sm space-y-4 hover:border-amber-200 transition-all flex flex-col justify-between"
                >
                  {/* Top pair header */}
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-50 text-amber-700 text-xs font-black flex items-center justify-center">
                        {pair.id}
                      </span>
                      <h4 className="text-base font-black text-gray-900 tracking-tight uppercase">
                        Cặp: {pair.mean}
                      </h4>
                    </div>
                    <span className="text-[10px] font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                      N3 Ngữ pháp
                    </span>
                  </div>

                  {/* Side-by-side Layout for Intransitive and Transitive */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Intransitive column */}
                    <div className="bg-blue-50/20 border border-blue-100/50 rounded-xl p-4 space-y-3 relative overflow-hidden">
                      <div className="absolute top-0 right-0 translate-x-3 -translate-y-3 opacity-5 text-blue-900 text-6xl font-black font-serif select-none pointer-events-none">
                        自
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                          Tự động từ
                        </span>
                        <button
                          onClick={() => speakJa(pair.auto.k)}
                          className="p-1 hover:bg-blue-100 text-blue-600 rounded transition-all"
                          title="Phát âm"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-1">
                        <div className="text-2xl font-black text-gray-900 font-sans tracking-wide">
                          {pair.auto.k}
                        </div>
                        {!hideReadings && (
                          <div className="text-xs text-blue-700 font-bold space-y-0.5">
                            <div>{pair.auto.h}</div>
                            <div className="text-gray-400 font-mono font-medium">{pair.auto.r}</div>
                          </div>
                        )}
                      </div>

                      <div className="text-xs space-y-1 border-t border-blue-100/50 pt-2 text-gray-600">
                        <div className="font-extrabold flex items-center gap-1">
                          {pair.auto.ex}
                        </div>
                        <div className="italic font-medium text-gray-400">{pair.auto.exVi}</div>
                      </div>
                    </div>

                    {/* Transitive column */}
                    <div className="bg-rose-50/20 border border-rose-100/50 rounded-xl p-4 space-y-3 relative overflow-hidden">
                      <div className="absolute top-0 right-0 translate-x-3 -translate-y-3 opacity-5 text-rose-900 text-6xl font-black font-serif select-none pointer-events-none">
                        他
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                          Tha động từ
                        </span>
                        <button
                          onClick={() => speakJa(pair.trans.k)}
                          className="p-1 hover:bg-rose-100 text-rose-600 rounded transition-all"
                          title="Phát âm"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-1">
                        <div className="text-2xl font-black text-gray-900 font-sans tracking-wide">
                          {pair.trans.k}
                        </div>
                        {!hideReadings && (
                          <div className="text-xs text-rose-700 font-bold space-y-0.5">
                            <div>{pair.trans.h}</div>
                            <div className="text-gray-400 font-mono font-medium">{pair.trans.r}</div>
                          </div>
                        )}
                      </div>

                      <div className="text-xs space-y-1 border-t border-rose-100/50 pt-2 text-gray-600">
                        <div className="font-extrabold flex items-center gap-1">
                          {pair.trans.ex}
                        </div>
                        <div className="italic font-medium text-gray-400">{pair.trans.exVi}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center space-y-4 shadow-sm">
              <p className="text-gray-400 text-lg font-bold">Không tìm thấy cặp động từ nào phù hợp!</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedFilter("all");
                }}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-all"
              >
                Xóa bộ lọc tìm kiếm
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: QUIZ CHALENGE */}
      {activeSubTab === "quiz" && (
        <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
          {/* Active Quiz Screen */}
          {!quizFinished && quizQuestions.length > 0 ? (
            <div id="quiz-active-card" className="bg-white border-2 border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 relative overflow-hidden">
              {/* Question Header */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full uppercase tracking-wider border border-amber-200">
                    Bài tập phản xạ thực tế
                  </span>
                  <div className="text-sm font-black text-gray-500">
                    Câu hỏi {currentQuizIndex + 1} / {quizQuestions.length}
                  </div>
                </div>
                {/* Score badge */}
                <div className="text-right">
                  <span className="text-xs font-black text-white bg-amber-600 px-3 py-1.5 rounded-full shadow-sm">
                    Đúng: {score}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-amber-500 h-full transition-all duration-300" 
                  style={{ width: `${((currentQuizIndex + 1) / quizQuestions.length) * 100}%` }}
                ></div>
              </div>

              {/* Question text */}
              <div className="space-y-4 text-center py-6">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Hãy chọn từ thích hợp điền vào chỗ trống</p>
                <h3 className="text-2xl md:text-3xl font-black text-gray-900 tracking-wide font-sans leading-relaxed select-all">
                  {quizQuestions[currentQuizIndex].prompt}
                </h3>
                <div className="inline-block bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 text-sm font-semibold text-gray-600 italic">
                  Ý nghĩa gợi ý: {quizQuestions[currentQuizIndex].meaning}
                </div>
              </div>

              {/* Multiple Choice Answers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quizQuestions[currentQuizIndex].options.map((option, idx) => {
                  const isCorrectAnswer = option === quizQuestions[currentQuizIndex].correctAnswer;
                  const isSelected = selectedAnswer === option;
                  const showResult = selectedAnswer !== null;

                  let buttonStyle = "border-gray-200 hover:border-amber-300 hover:bg-amber-50/30 text-gray-800";
                  if (showResult) {
                    if (isCorrectAnswer) {
                      buttonStyle = "bg-green-50 border-green-400 text-green-900 shadow-sm";
                    } else if (isSelected) {
                      buttonStyle = "bg-red-50 border-red-400 text-red-900 shadow-sm";
                    } else {
                      buttonStyle = "border-gray-100 text-gray-400 bg-gray-50/50 cursor-not-allowed";
                    }
                  }

                  // Find hiragana reading for buttons
                  const hReading = option === quizQuestions[currentQuizIndex].pair.auto.k 
                    ? quizQuestions[currentQuizIndex].pair.auto.h 
                    : quizQuestions[currentQuizIndex].pair.trans.h;

                  return (
                    <button
                      key={idx}
                      id={`quiz-option-${idx}`}
                      disabled={showResult}
                      onClick={() => handleQuizAnswer(option)}
                      className={`p-5 border-2 rounded-2xl font-bold text-base transition-all text-left flex flex-col justify-center space-y-1 ${buttonStyle}`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xl font-black">{option}</span>
                        {showResult && isCorrectAnswer && <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />}
                        {showResult && isSelected && !isCorrectAnswer && <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />}
                      </div>
                      <span className="text-xs text-gray-400 font-semibold">({hReading})</span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback and explanation section */}
              {selectedAnswer !== null && (
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 space-y-4 animate-slideUp">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-black text-gray-900 uppercase tracking-wider">
                      Giải thích & Dịch nghĩa
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-700 leading-relaxed">
                    <p>
                      Mẫu câu hoàn chỉnh:{" "}
                      <strong className="text-gray-900 font-sans text-base">
                        {quizQuestions[currentQuizIndex].prompt.replace("＿＿＿", quizQuestions[currentQuizIndex].correctAnswer)}
                      </strong>{" "}
                      ({quizQuestions[currentQuizIndex].correctHiragana})
                    </p>
                    <p className="italic text-gray-500 font-medium">
                      Ý nghĩa câu: {quizQuestions[currentQuizIndex].exampleVi}
                    </p>
                    <div className="bg-white p-3 rounded-xl border border-gray-200 text-xs text-gray-600">
                      <strong>💡 Mẹo: </strong>
                      {quizQuestions[currentQuizIndex].isAuto ? (
                        <span>
                          Đây là câu dùng <strong>Tự động từ</strong> vì sự việc diễn ra tự nhiên/khách quan. Hãy chú ý trợ từ{" "}
                          <strong className="text-blue-600 text-sm">が</strong>.
                        </span>
                      ) : (
                        <span>
                          Đây là câu dùng <strong>Tha động từ</strong> vì có tác nhân chủ ý tác động lên tân ngữ. Hãy chú ý trợ từ{" "}
                          <strong className="text-rose-600 text-sm">を</strong>.
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <button
                      onClick={() => speakJa(quizQuestions[currentQuizIndex].example.replace("＿＿＿", quizQuestions[currentQuizIndex].correctAnswer))}
                      className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-900 hover:underline"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      Nghe phát âm cả câu
                    </button>

                    <button
                      id="btn-next-question"
                      onClick={handleNextQuiz}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                    >
                      <span>{currentQuizIndex === quizQuestions.length - 1 ? "Kết thúc" : "Câu tiếp theo"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : null}

          {/* Quiz Finished Screen */}
          {quizFinished && (
            <div id="quiz-finished-card" className="bg-white border-2 border-gray-100 rounded-3xl p-8 text-center shadow-sm space-y-6 animate-fadeIn">
              <div className="w-20 h-20 bg-amber-50 text-amber-600 border-2 border-amber-200 rounded-full flex items-center justify-center text-4xl mx-auto shadow-sm">
                <Award className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-gray-900 font-sans">Chúc mừng em đã hoàn thành bài luyện tập!</h3>
                <p className="text-sm text-gray-500">Hãy cùng xem kết quả phản xạ tự - tha động từ của em nhé</p>
              </div>

              {/* Score Display */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 max-w-sm mx-auto space-y-1">
                <div className="text-sm font-black text-amber-800 uppercase tracking-widest">Tổng Điểm</div>
                <div className="text-5xl font-black text-amber-600">{score} / {quizQuestions.length}</div>
                <div className="text-xs text-gray-400 font-semibold">Trả lời đúng {(score / quizQuestions.length * 100).toFixed(0)}% số câu</div>
              </div>

              {/* Sensei Encouragement Badge */}
              <div className="max-w-md mx-auto p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-600 leading-relaxed italic">
                {score === quizQuestions.length ? (
                  <span>"Quá xuất sắc! Các em đã nắm vững toàn bộ 70 cặp tự - tha động từ rồi đấy. Không gì có thể làm khó các em nữa!"</span>
                ) : score >= 10 ? (
                  <span>"Rất tốt! Khả năng phản xạ tự - tha của em đã đạt mức khá giỏi. Đọc kỹ lại bảng từ để chinh phục điểm tuyệt đối nhé!"</span>
                ) : (
                  <span>"Đừng nản chí nhé! Tự - tha động từ cần rèn luyện nhiều để quen dần. Hãy đọc lại phần lý thuyết và luyện tập lại nhé!"</span>
                )}
                <div className="font-bold text-amber-600 mt-2 text-right">— Thầy Sơn 山</div>
              </div>

              {/* Restart button */}
              <button
                id="btn-restart-quiz"
                onClick={() => {
                  playSound.click();
                  generateQuiz();
                }}
                className="inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold rounded-xl transition-all shadow-sm uppercase tracking-wider"
              >
                <RotateCcw className="w-4 h-4" />
                Luyện tập lại
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
