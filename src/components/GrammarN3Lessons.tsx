import React, { useState, useEffect, useMemo, useRef } from "react";
import { playSound } from "../utils/audio";
import { GRAMMAR_N3_DATA, GrammarN3Item } from "../data/grammarN3Data";
import { 
  ArrowLeft, 
  Volume2, 
  Check, 
  Search, 
  RotateCcw, 
  Sparkles, 
  Layers, 
  List, 
  HelpCircle, 
  GraduationCap,
  BookOpen,
  Trophy,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ExternalLink
} from "lucide-react";

interface GrammarN3LessonsProps {
  onGoBack: () => void;
}

export default function GrammarN3Lessons({ onGoBack }: GrammarN3LessonsProps) {
  // Navigation & Screen states
  const [activeTab, setActiveTab] = useState<"library" | "flashcards" | "quiz" | "dashboard">("library");
  const [currentGrammarId, setCurrentGrammarId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Flashcard States
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Quiz States
  const [selectedQuizId, setSelectedQuizId] = useState<number>(1);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [generatedQuizzes, setGeneratedQuizzes] = useState<{
    type: "mcq" | "translate";
    q: string;
    opts?: string[];
    ansIndex?: number;
    ans?: string;
    explain?: string;
  }[]>([]);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [selectedOptIndex, setSelectedOptIndex] = useState<number | null>(null);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [textInput, setTextInput] = useState<string>("");
  const [isSelfAssessed, setIsSelfAssessed] = useState<boolean>(false);

  // User Progress States
  const [userProgress, setUserProgress] = useState<{
    flashcards: Record<number, "learned" | "not_learned">;
    quizzes: Record<number, number>; // best score out of 10
  }>({
    flashcards: {},
    quizzes: {}
  });

  // Load progress on mount
  useEffect(() => {
    const saved = localStorage.getItem("n3_grammar_progress");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUserProgress({
          flashcards: parsed.flashcards || {},
          quizzes: parsed.quizzes || {}
        });
      } catch (e) {
        console.error("Failed to load N3 grammar progress:", e);
      }
    }
  }, []);

  // Save progress helper
  const saveProgress = (updated: typeof userProgress) => {
    setUserProgress(updated);
    localStorage.setItem("n3_grammar_progress", JSON.stringify(updated));
  };

  // Toast State
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" | "info" } | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (msg: string, type: "success" | "error" | "info" = "info") => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast({ msg, type });
    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Pronunciation speaker
  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    } else {
      showToast("Trình duyệt không hỗ trợ phát âm tiếng Nhật", "error");
    }
  };

  // Filtered grammar list based on search
  const filteredGrammars = useMemo(() => {
    const search = searchQuery.trim().toLowerCase();
    if (!search) return GRAMMAR_N3_DATA;
    return GRAMMAR_N3_DATA.filter(g => 
      g.title.toLowerCase().includes(search) || 
      g.vi.toLowerCase().includes(search) || 
      g.form.toLowerCase().includes(search) || 
      g.usage.toLowerCase().includes(search) || 
      g.examples.some(e => e.j.toLowerCase().includes(search) || e.v.toLowerCase().includes(search))
    );
  }, [searchQuery]);

  // Current selected grammar item detail
  const currentDetailItem = useMemo(() => {
    return GRAMMAR_N3_DATA.find(g => g.id === currentGrammarId) || GRAMMAR_N3_DATA[0];
  }, [currentGrammarId]);

  // Sync flashcardIndex if we select a specific grammar to look at in the library
  const jumpToFlashcard = (id: number) => {
    playSound.click();
    const idx = GRAMMAR_N3_DATA.findIndex(g => g.id === id);
    if (idx !== -1) {
      setFlashcardIndex(idx);
      setIsFlipped(false);
      setActiveTab("flashcards");
    }
  };

  // Start a dynamic quiz for a given grammar ID
  const startQuizForId = (id: number) => {
    playSound.click();
    setSelectedQuizId(id);
    const g = GRAMMAR_N3_DATA.find(x => x.id === id) || GRAMMAR_N3_DATA[0];
    
    // Generate 10 questions
    const pool = GRAMMAR_N3_DATA.filter(x => x.id !== g.id);
    const getRandomOptions = (count: number) => {
      const shuffled = [...pool].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, count).map(x => x.title);
    };

    const qs: typeof generatedQuizzes = [];

    // 6 Multiple choice questions
    for (let i = 0; i < 6; i++) {
      const ex = g.examples[i % 2];
      let holeSentence = ex.j.replace(g.title, " ______ ");
      if (holeSentence === ex.j) {
        // If the exact title is not in the text, use fallback helper
        holeSentence = `(Chọn cấu trúc mang ý nghĩa: "${g.vi}")`;
      } else if (i > 1) {
        holeSentence = `Ý nghĩa: "${ex.v}"\nĐiền vào chỗ trống: ${holeSentence}`;
      }

      const opts = [g.title, ...getRandomOptions(3)].sort(() => Math.random() - 0.5);
      qs.push({
        type: "mcq",
        q: holeSentence,
        opts,
        ansIndex: opts.indexOf(g.title),
        explain: `Đáp án đúng là: <strong>${g.title}</strong>.<br>Ý nghĩa: ${g.vi}`
      });
    }

    // 4 open translations / formula matching
    qs.push({
      type: "translate",
      q: `Hãy dịch câu ví dụ sau sang tiếng Việt:\n"${g.examples[0].j}"`,
      ans: g.examples[0].v
    });
    qs.push({
      type: "translate",
      q: `Hãy dịch câu ví dụ sau sang tiếng Việt:\n"${g.examples[1].j}"`,
      ans: g.examples[1].v
    });
    qs.push({
      type: "translate",
      q: `[Lý thuyết] Viết công thức kết nối của ngữ pháp: "${g.title}"`,
      ans: g.form
    });
    qs.push({
      type: "translate",
      q: `[Thử thách] Hãy dịch câu này sang tiếng Nhật:\n"${g.examples[0].v}"`,
      ans: g.examples[0].j
    });

    setGeneratedQuizzes(qs);
    setCurrentQuizIndex(0);
    setQuizScore(0);
    setIsAnswerSubmitted(false);
    setSelectedOptIndex(null);
    setQuizFinished(false);
    setTextInput("");
    setIsSelfAssessed(false);
    setActiveTab("quiz");
  };

  // Submit MCQ option
  const handleMcqSubmit = (optIndex: number, correctIndex: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOptIndex(optIndex);
    setIsAnswerSubmitted(true);
    
    if (optIndex === correctIndex) {
      playSound.correct();
      setQuizScore(prev => prev + 1);
      showToast("Chính xác!", "success");
    } else {
      playSound.flip(); // fallback error sound
      showToast("Chưa đúng rồi!", "error");
    }
  };

  // Submit translation self-assessment
  const handleSelfAssessment = (isCorrect: boolean) => {
    playSound.click();
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
    }
    
    if (currentQuizIndex + 1 >= 10) {
      // Finished all 10 questions
      setQuizFinished(true);
      const oldScore = userProgress.quizzes[selectedQuizId] || 0;
      if (quizScore + (isCorrect ? 1 : 0) > oldScore) {
        const nextProg = {
          ...userProgress,
          quizzes: {
            ...userProgress.quizzes,
            [selectedQuizId]: quizScore + (isCorrect ? 1 : 0)
          }
        };
        saveProgress(nextProg);
      }
    } else {
      // Go to next question
      setCurrentQuizIndex(prev => prev + 1);
      setIsAnswerSubmitted(false);
      setSelectedOptIndex(null);
      setTextInput("");
      setIsSelfAssessed(false);
    }
  };

  // Move to next question for MCQ
  const handleNextQuestion = () => {
    playSound.click();
    if (currentQuizIndex + 1 >= 10) {
      setQuizFinished(true);
      const oldScore = userProgress.quizzes[selectedQuizId] || 0;
      if (quizScore > oldScore) {
        const nextProg = {
          ...userProgress,
          quizzes: {
            ...userProgress.quizzes,
            [selectedQuizId]: quizScore
          }
        };
        saveProgress(nextProg);
      }
    } else {
      setCurrentQuizIndex(prev => prev + 1);
      setIsAnswerSubmitted(false);
      setSelectedOptIndex(null);
      setTextInput("");
      setIsSelfAssessed(false);
    }
  };

  // Flashcard Actions
  const handleFlashcardStatus = (status: "learned" | "not_learned") => {
    const item = GRAMMAR_N3_DATA[flashcardIndex];
    const nextProg = {
      ...userProgress,
      flashcards: {
        ...userProgress.flashcards,
        [item.id]: status
      }
    };
    saveProgress(nextProg);

    if (status === "learned") {
      playSound.correct();
      showToast(`Đã lưu "${item.title}" vào mục đã thuộc`, "success");
      // Autoplay next card with a small delay
      setTimeout(() => {
        handleFlashcardNext();
      }, 500);
    } else {
      playSound.flip();
      showToast(`Đã lưu "${item.title}" vào danh sách cần ôn`, "error");
    }
  };

  const handleFlashcardNext = () => {
    playSound.click();
    setFlashcardIndex(prev => (prev + 1) % GRAMMAR_N3_DATA.length);
    setIsFlipped(false);
  };

  const handleFlashcardPrev = () => {
    playSound.click();
    setFlashcardIndex(prev => (prev - 1 + GRAMMAR_N3_DATA.length) % GRAMMAR_N3_DATA.length);
    setIsFlipped(false);
  };

  // Dashboard Stats Computation
  const dashboardStats = useMemo(() => {
    let learnedCount = 0;
    let needReviewCount = 0;
    const reviewList: GrammarN3Item[] = [];

    GRAMMAR_N3_DATA.forEach(g => {
      const status = userProgress.flashcards[g.id];
      if (status === "learned") {
        learnedCount++;
      } else if (status === "not_learned") {
        needReviewCount++;
        reviewList.push(g);
      }
    });

    const totalQuizzes = Object.keys(userProgress.quizzes).length;
    let sumScore = 0;
    for (const key in userProgress.quizzes) {
      if (Object.prototype.hasOwnProperty.call(userProgress.quizzes, key)) {
        sumScore += userProgress.quizzes[Number(key)] || 0;
      }
    }
    const avgScore = totalQuizzes > 0 ? (sumScore / totalQuizzes).toFixed(1) : "0";

    const unseenCount = GRAMMAR_N3_DATA.length - learnedCount - needReviewCount;

    return {
      learnedCount,
      needReviewCount,
      unseenCount,
      avgScore,
      reviewList
    };
  }, [userProgress]);

  // Custom visual feedback for selected tabs
  const tabClass = (tab: typeof activeTab) => {
    const isActive = activeTab === tab;
    return `px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border-2 ${
      isActive 
        ? "bg-[#8B0000] text-white border-[#8B0000] shadow-[2px_2px_0px_#1A1A1A]" 
        : "bg-white text-[#1A1A1A] border-[#1A1A1A] hover:bg-[#FDFBF7]"
    }`;
  };

  return (
    <div className="washi-pattern min-h-screen p-4 sm:p-8 -mx-4 sm:-mx-8 rounded-[40px] border-2 border-[#1A1A1A] text-[#1A1A1A]" style={{ fontFamily: "'Lora', 'Noto Serif JP', serif" }}>
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b-2 border-[#1A1A1A] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 border-2 border-[#1A1A1A] bg-[#8B0000] rounded flex items-center justify-center text-white font-black text-lg" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            法
          </div>
          <div>
            <h1 className="text-xl font-black tracking-widest text-[#1A1A1A]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              NGỮ PHÁP N3 - SƠNKURO
            </h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Lý thuyết, bài tập & tiến độ offline</p>
          </div>
        </div>
        <button
          onClick={() => {
            playSound.click();
            onGoBack();
          }}
          className="flex items-center gap-2 text-[#1A1A1A] font-bold hover:text-[#8B0000] transition-colors border-2 border-[#1A1A1A] hover:border-[#8B0000] px-4 py-1.5 rounded-xl bg-white shadow-[3px_3px_0px_#1A1A1A] hover:shadow-[3px_3px_0px_#8B0000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại Đạo Tràng</span>
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        <button onClick={() => { playSound.click(); setActiveTab("library"); }} className={tabClass("library")}>
          <BookOpen className="w-3.5 h-3.5" />
          <span>📖 Thư Viện</span>
        </button>
        <button onClick={() => { playSound.click(); setActiveTab("flashcards"); }} className={tabClass("flashcards")}>
          <Layers className="w-3.5 h-3.5" />
          <span>🎴 Flashcard</span>
        </button>
        <button onClick={() => { playSound.click(); startQuizForId(selectedQuizId); }} className={tabClass("quiz")}>
          <HelpCircle className="w-3.5 h-3.5" />
          <span>📝 Bài Tập</span>
        </button>
        <button onClick={() => { playSound.click(); setActiveTab("dashboard"); }} className={tabClass("dashboard")}>
          <Trophy className="w-3.5 h-3.5" />
          <span>📊 Thống Kê</span>
        </button>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-5 right-5 z-[100] animate-bounce pointer-events-none">
          <div className={`px-5 py-3 rounded-xl shadow-lg border-2 border-[#1A1A1A] font-bold text-sm text-white flex items-center gap-2 ${
            toast.type === "success" ? "bg-emerald-700" : toast.type === "error" ? "bg-rose-800" : "bg-[#1A1A1A]"
          }`}>
            <span>{toast.type === "success" ? "✓" : toast.type === "error" ? "✗" : "ℹ"}</span>
            <span>{toast.msg}</span>
          </div>
        </div>
      )}

      {/* Main Content Sections */}
      {activeTab === "library" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left panel: List search */}
          <div className="lg:col-span-5 space-y-4 flex flex-col h-[650px] bg-[#FDFBF7] p-4 border-2 border-[#1A1A1A] rounded-2xl shadow-[4px_4px_0px_#1A1A1A]">
            
            {/* Search Box */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm ngữ pháp, ví dụ, nghĩa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border-2 border-[#1A1A1A] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#8B0000] font-sans"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")} 
                  className="absolute right-3.5 top-2 bg-gray-200 text-gray-700 hover:bg-gray-300 px-1.5 py-0.5 rounded text-[10px] font-bold"
                >
                  Xóa
                </button>
              )}
            </div>

            {/* List count bar */}
            <div className="flex justify-between items-center bg-[#8B0000]/10 border border-[#8B0000]/20 px-3 py-1.5 rounded-lg text-xs font-black">
              <span className="text-[#8B0000]">DANH SÁCH NGỮ PHÁP</span>
              <span className="bg-[#8B0000] text-white px-2 py-0.5 rounded-full font-mono">
                {filteredGrammars.length} / 124
              </span>
            </div>

            {/* List box */}
            <div className="flex-1 overflow-y-auto divide-y-2 divide-gray-100 pr-1 scrollbar-hide">
              {filteredGrammars.length === 0 ? (
                <div className="text-center py-12 text-gray-400 italic text-sm">
                  Không tìm thấy kết quả phù hợp...
                </div>
              ) : (
                filteredGrammars.map((g) => {
                  const isActive = g.id === currentGrammarId;
                  const isLearned = userProgress.flashcards[g.id] === "learned";
                  const isNotLearned = userProgress.flashcards[g.id] === "not_learned";

                  return (
                    <button
                      key={g.id}
                      onClick={() => { playSound.click(); setCurrentGrammarId(g.id); }}
                      className={`w-full text-left p-3.5 transition-all flex flex-col gap-1 text-[#1A1A1A] ${
                        isActive 
                          ? "bg-[#8B0000]/10 border-l-[6px] border-[#8B0000]" 
                          : "hover:bg-amber-50/40 border-l-[6px] border-transparent"
                      }`}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className="text-xs font-mono text-gray-400 font-bold">#{g.id}</span>
                        <div className="flex gap-1">
                          {isLearned && <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold px-1.5 py-0.5 rounded">Thuộc</span>}
                          {isNotLearned && <span className="text-[10px] bg-rose-100 text-rose-800 border border-rose-300 font-bold px-1.5 py-0.5 rounded">Cần ôn</span>}
                        </div>
                      </div>
                      <div className="font-bold text-[15px] tracking-wide" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                        {g.title}
                      </div>
                      <div className="text-xs text-gray-600 line-clamp-1">{g.vi}</div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Right panel: Detail Display */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 border-2 border-[#1A1A1A] rounded-2xl shadow-[4px_4px_0px_#1A1A1A] flex flex-col h-[650px] overflow-y-auto scrollbar-hide">
            <div className="border-b-2 border-dashed border-gray-200 pb-5 mb-5">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-[10px] font-black tracking-widest bg-[#8B0000] text-white px-3 py-1 rounded shadow-sm">
                    BÀI SỐ {currentDetailItem.id} / 124
                  </span>
                  <h2 className="text-3xl font-black mt-3 text-[#1A1A1A] leading-tight" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                    {currentDetailItem.title}
                  </h2>
                  <p className="text-sm font-bold text-gray-700 mt-1">
                    Ý nghĩa: <span className="text-[#8B0000] underline decoration-wavy">{currentDetailItem.vi}</span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => startQuizForId(currentDetailItem.id)}
                    className="flex-1 sm:flex-initial bg-[#8B0000] text-white text-xs font-black px-4 py-2.5 rounded-xl border border-[#1A1A1A] hover:bg-red-800 shadow-[2px_2px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-1.5"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Luyện Tập</span>
                  </button>
                  <button
                    onClick={() => jumpToFlashcard(currentDetailItem.id)}
                    className="flex-1 sm:flex-initial bg-white text-[#1A1A1A] text-xs font-black px-4 py-2.5 rounded-xl border border-[#1A1A1A] hover:bg-gray-50 shadow-[2px_2px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-1.5"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Học Thẻ</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Formula box */}
            <div className="bg-[#FDFBF7] p-5 rounded-xl border-2 border-dashed border-[#8B0000]/40 space-y-2 mb-6">
              <span className="text-[10px] font-black text-[#8B0000] tracking-wider uppercase block">
                ⛓ Cấu trúc ghép nối (接続)
              </span>
              <div className="font-mono text-base font-black text-indigo-950 break-words" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {currentDetailItem.form}
              </div>
            </div>

            {/* Usage box */}
            <div className="space-y-2 mb-6">
              <span className="text-[10px] font-black text-gray-400 tracking-wider uppercase block">
                💡 Giải thích sử dụng (解説)
              </span>
              <p className="text-sm text-gray-700 font-semibold bg-gray-50/80 p-4 rounded-xl leading-relaxed border border-gray-200/50">
                {currentDetailItem.usage}
              </p>
            </div>

            {/* Examples list */}
            <div className="space-y-3 flex-1">
              <span className="text-[10px] font-black text-gray-400 tracking-wider uppercase block">
                🌟 Ví dụ mẫu (例文)
              </span>
              <div className="space-y-4">
                {currentDetailItem.examples.map((ex, i) => (
                  <div key={i} className="p-4 bg-white border-2 border-gray-100 hover:border-gray-200 rounded-xl relative group transition-all">
                    <div className="flex justify-between items-start gap-4">
                      <p className="font-black text-[15px] text-[#1A1A1A] leading-relaxed pr-8" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                        <span className="text-[#8B0000] mr-1.5 font-sans">0{i+1}.</span> {ex.j}
                      </p>
                      <button
                        onClick={() => speakText(ex.j)}
                        className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 hover:text-[#8B0000] transition-colors"
                        title="Nghe phát âm"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 font-bold mt-2 pl-6 italic">
                      Dịch nghĩa: {ex.v}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Flashcard Section */}
      {activeTab === "flashcards" && (
        <div className="max-w-md mx-auto flex flex-col items-center gap-6 py-4">
          <div className="text-center w-full flex justify-between items-end px-2">
            <div className="text-left">
              <span className="text-[10px] font-black tracking-widest bg-[#8B0000]/10 text-[#8B0000] border border-[#8B0000]/20 px-2 py-0.5 rounded">
                CHẾ ĐỘ THẺ NHỚ
              </span>
              <p className="text-xs text-gray-500 mt-1 font-bold">
                Thẻ {flashcardIndex + 1} / 124
              </p>
            </div>
            
            {/* Memory status Badge */}
            {userProgress.flashcards[GRAMMAR_N3_DATA[flashcardIndex].id] && (
              <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border shadow-sm ${
                userProgress.flashcards[GRAMMAR_N3_DATA[flashcardIndex].id] === "learned"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                  : "bg-rose-50 text-rose-700 border-rose-300"
              }`}>
                {userProgress.flashcards[GRAMMAR_N3_DATA[flashcardIndex].id] === "learned" ? "✓ Đã thuộc" : "✗ Chưa thuộc"}
              </div>
            )}
          </div>

          {/* Flashcard Box */}
          <div 
            onClick={() => { playSound.flip(); setIsFlipped(!isFlipped); }}
            className="w-full h-[320px] perspective-1000 cursor-pointer"
          >
            <div className={`relative w-full h-full duration-500 transform-style-3d shadow-xl rounded-3xl border-2 border-[#1A1A1A] transition-all transform ${
              isFlipped ? "rotate-y-180" : ""
            }`}>
              
              {/* Front view (Vietnamese meanings) */}
              <div className="absolute inset-0 backface-hidden bg-white rounded-[22px] p-6 flex flex-col justify-between items-center text-center">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                  Mặt Trước (Ý Nghĩa Tiếng Việt)
                </span>
                
                <div className="my-auto px-4">
                  <p className="text-xs font-bold text-gray-400 mb-2">Đoán xem ngữ pháp nào tương ứng:</p>
                  <p className="text-xl font-black text-[#1A1A1A] leading-relaxed">
                    {GRAMMAR_N3_DATA[flashcardIndex].vi}
                  </p>
                </div>

                <span className="text-xs bg-amber-50 text-amber-800 border border-amber-200 px-4 py-1.5 rounded-full font-bold animate-pulse">
                  Chạm để lật mặt sau 🔄
                </span>
              </div>

              {/* Back view (Japanese Title & connections) */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#1A1A1A] text-white rounded-[22px] p-6 flex flex-col justify-between items-center text-center shadow-inner">
                <div className="w-full flex justify-between items-center">
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">
                    Mặt Sau (Tiếng Nhật)
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); speakText(GRAMMAR_N3_DATA[flashcardIndex].title); }}
                    className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="my-auto space-y-4 w-full px-2">
                  <h3 className="text-4xl font-black tracking-wide text-amber-300 drop-shadow-md" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                    {GRAMMAR_N3_DATA[flashcardIndex].title}
                  </h3>
                  <div className="space-y-1.5 text-left bg-white/5 p-3.5 rounded-xl border border-white/10">
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">
                      Liên kết ghép nối:
                    </span>
                    <p className="text-xs font-mono font-bold text-gray-100 break-all" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {GRAMMAR_N3_DATA[flashcardIndex].form}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] text-gray-400 font-semibold italic">
                  Chạm một lần nữa để lật lại 🔄
                </span>
              </div>

            </div>
          </div>

          {/* Memory feedback rating */}
          <div className="w-full bg-[#FDFBF7] p-5 rounded-2xl border-2 border-[#1A1A1A] space-y-3.5 shadow-[3px_3px_0px_#1A1A1A]">
            <p className="text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Đánh giá mức độ ghi nhớ
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleFlashcardStatus("learned")}
                className="flex-1 py-3 bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-700 text-emerald-800 font-black text-xs rounded-xl shadow-[2px_2px_0px_#064e3b] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                ✓ Đã thuộc
              </button>
              <button
                onClick={() => handleFlashcardStatus("not_learned")}
                className="flex-1 py-3 bg-rose-50 hover:bg-rose-100 border-2 border-rose-700 text-rose-800 font-black text-xs rounded-xl shadow-[2px_2px_0px_#4c0519] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                ✗ Chưa thuộc
              </button>
            </div>
          </div>

          {/* Slide Navigation */}
          <div className="flex justify-between w-full gap-3">
            <button
              onClick={handleFlashcardPrev}
              className="flex-1 py-3 bg-white hover:bg-gray-50 border-2 border-[#1A1A1A] text-[#1A1A1A] font-black text-xs rounded-xl shadow-[2px_2px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
            >
              ◀ Thẻ Trước
            </button>
            <button
              onClick={handleFlashcardNext}
              className="flex-1 py-3 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white font-black text-xs rounded-xl shadow-[2px_2px_0px_#8B0000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
            >
              Thẻ Tiếp ▶
            </button>
          </div>
        </div>
      )}

      {/* Quiz Section */}
      {activeTab === "quiz" && (
        <div className="max-w-2xl mx-auto space-y-6">
          
          {/* Quick Choice Quiz Header */}
          <div className="bg-white p-5 border-2 border-[#1A1A1A] rounded-2xl shadow-[3px_3px_0px_#1A1A1A] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="w-full sm:w-2/3 space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-wide">
                Luyện tập cấu trúc ngữ pháp:
              </label>
              <select
                value={selectedQuizId}
                onChange={(e) => startQuizForId(parseInt(e.target.value))}
                className="block w-full bg-[#FDFBF7] border-2 border-[#1A1A1A] text-sm font-bold px-3 py-2.5 rounded-xl outline-none focus:border-[#8B0000]"
              >
                {GRAMMAR_N3_DATA.map(g => (
                  <option key={g.id} value={g.id}>
                    Bài {g.id}: {g.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-xs font-black bg-[#8B0000]/10 border border-[#8B0000]/20 text-[#8B0000] px-4 py-3 rounded-xl flex gap-2 items-center w-full sm:w-auto justify-center font-mono">
              <span>TIẾN ĐỘ:</span>
              <span className="text-base font-bold bg-[#8B0000] text-white px-2 py-0.5 rounded">
                {quizFinished ? "10/10" : `${currentQuizIndex + 1} / 10`}
              </span>
            </div>
          </div>

          {!quizFinished ? (
            <div className="bg-white border-2 border-[#1A1A1A] rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-[4px_4px_0px_#1A1A1A]">
              
              {/* Question Category Stamp */}
              <div className={`absolute top-0 right-0 text-white text-[9px] font-black px-4 py-1.5 rounded-bl-xl uppercase tracking-wider ${
                generatedQuizzes[currentQuizIndex]?.type === "mcq" ? "bg-indigo-600" : "bg-amber-600"
              }`}>
                {generatedQuizzes[currentQuizIndex]?.type === "mcq" ? "Trắc Nghiệm" : "Tự Luận"}
              </div>

              {/* Question Text */}
              <div className="pt-4 space-y-4">
                <span className="text-[10px] font-black text-gray-400 tracking-wider uppercase block">
                  CÂU HỎI SỐ {currentQuizIndex + 1}
                </span>
                
                {generatedQuizzes[currentQuizIndex]?.type === "mcq" ? (
                  <div className="space-y-4">
                    <h3 className="text-base sm:text-lg font-black text-gray-800 leading-relaxed break-words whitespace-pre-wrap">
                      {generatedQuizzes[currentQuizIndex].q}
                    </h3>

                    {/* MCQ Options */}
                    <div className="grid grid-cols-1 gap-3 mt-6">
                      {generatedQuizzes[currentQuizIndex].opts?.map((opt, oIdx) => {
                        const isCorrectAns = oIdx === generatedQuizzes[currentQuizIndex].ansIndex;
                        const isSelectedAns = oIdx === selectedOptIndex;
                        
                        let optStyle = "border-2 border-[#1A1A1A] hover:bg-amber-50/20";
                        if (isAnswerSubmitted) {
                          if (isCorrectAns) {
                            optStyle = "border-2 border-emerald-600 bg-emerald-50 text-emerald-800";
                          } else if (isSelectedAns) {
                            optStyle = "border-2 border-rose-600 bg-rose-50 text-rose-800";
                          } else {
                            optStyle = "border border-gray-200 text-gray-400 opacity-60";
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            disabled={isAnswerSubmitted}
                            onClick={() => handleMcqSubmit(oIdx, generatedQuizzes[currentQuizIndex].ansIndex!)}
                            className={`text-left p-3.5 rounded-xl font-bold text-sm sm:text-[15px] transition-all flex justify-between items-center ${optStyle}`}
                          >
                            <span>
                              <span className="text-[#8B0000] font-mono mr-2">
                                {String.fromCharCode(65 + oIdx)}.
                              </span>
                              {opt}
                            </span>
                            {isAnswerSubmitted && isCorrectAns && (
                              <Check className="w-4 h-4 text-emerald-600" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {isAnswerSubmitted && (
                      <div className="mt-4 p-4 bg-[#FDFBF7] border-2 border-dashed border-[#8B0000]/30 rounded-xl text-xs sm:text-sm font-semibold text-gray-700 leading-relaxed">
                        <span className="font-black text-[#8B0000] uppercase block mb-1">Giải thích đáp án:</span>
                        <div dangerouslySetInnerHTML={{ __html: generatedQuizzes[currentQuizIndex].explain || "" }} />
                      </div>
                    )}
                  </div>
                ) : (
                  // Translate Question
                  <div className="space-y-4">
                    <h3 className="text-base sm:text-[16px] font-black text-indigo-950 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 leading-relaxed break-words whitespace-pre-wrap">
                      {generatedQuizzes[currentQuizIndex].q}
                    </h3>

                    <div className="space-y-2">
                      <textarea
                        disabled={isSelfAssessed}
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        placeholder="Nhập câu dịch hoặc câu trả lời của bạn tại đây..."
                        className="w-full p-4 border-2 border-[#1A1A1A] rounded-xl h-24 text-sm outline-none focus:border-[#8B0000] bg-[#FDFBF7] font-sans"
                      />
                    </div>

                    {/* Self-Assessment Zone */}
                    {isSelfAssessed ? (
                      <div className="space-y-4 animate-fade-in">
                        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                          <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-widest block mb-1">
                            Đáp án mẫu để đối chiếu:
                          </span>
                          <p className="font-black text-base text-emerald-950" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                            {generatedQuizzes[currentQuizIndex].ans}
                          </p>
                        </div>
                        
                        <div className="bg-[#FDFBF7] p-4 border border-dashed border-gray-300 rounded-xl space-y-3">
                          <p className="text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                            Hãy tự đánh giá câu dịch của bạn:
                          </p>
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              onClick={() => handleSelfAssessment(true)}
                              className="py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Đúng / Giống</span>
                            </button>
                            <button
                              onClick={() => handleSelfAssessment(false)}
                              className="py-2.5 bg-rose-700 hover:bg-rose-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Sai / Chưa sát</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => { playSound.click(); setIsSelfAssessed(true); }}
                        className="w-full py-3 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white font-black rounded-xl text-xs tracking-wider uppercase shadow-[3px_3px_0px_#8B0000]"
                      >
                        Xem Đáp Án & Đối Chiếu
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Next Question Navigation */}
              {isAnswerSubmitted && generatedQuizzes[currentQuizIndex]?.type === "mcq" && (
                <div className="flex justify-end pt-4 border-t-2 border-gray-100">
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 bg-[#8B0000] text-white font-black rounded-xl border border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1.5 text-xs uppercase tracking-wider"
                  >
                    <span>Tiếp Theo</span>
                    <span>▶</span>
                  </button>
                </div>
              )}

            </div>
          ) : (
            // Quiz Results Display
            <div className="bg-white rounded-3xl border-2 border-[#1A1A1A] p-8 text-center space-y-6 shadow-[4px_4px_0px_#1A1A1A] animate-fade-in">
              <div className="text-6xl">🏆</div>
              <div>
                <h3 className="text-2xl font-black text-[#1A1A1A]">Hoàn Thành Đánh Giá!</h3>
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest font-bold">
                  Chủ đề: <span className="font-bold text-[#8B0000]">
                    {(GRAMMAR_N3_DATA.find(x => x.id === selectedQuizId) || GRAMMAR_N3_DATA[0]).title}
                  </span>
                </p>
              </div>

              <div className="bg-amber-50/50 border-2 border-dashed border-amber-300 p-6 rounded-2xl max-w-xs mx-auto">
                <div className="text-[10px] font-black text-amber-800 uppercase tracking-widest">
                  Điểm số đạt được
                </div>
                <div className="text-5xl font-black text-[#1A1A1A] mt-2 font-mono">
                  {quizScore} <span className="text-lg text-gray-400 font-sans">/ 10</span>
                </div>
              </div>

              <p className={`text-sm font-black max-w-md mx-auto ${
                quizScore >= 8 ? "text-emerald-700" : quizScore >= 5 ? "text-amber-700" : "text-rose-700"
              }`}>
                {quizScore >= 8 
                  ? "Xuất sắc! Bạn đã lĩnh ngộ hoàn hảo trận pháp này." 
                  : quizScore >= 5 
                    ? "Khá tốt! Hãy chú ý luyện tập thêm phần dịch tự luận." 
                    : "Chưa đạt! Bạn hãy quay lại ôn luyện lý thuyết kỹ hơn nhé."
                }
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
                <button
                  onClick={() => startQuizForId(selectedQuizId)}
                  className="px-6 py-3 bg-[#8B0000] text-white font-black rounded-xl border border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all text-xs uppercase"
                >
                  🔄 Luyện Tập Lại
                </button>
                <button
                  onClick={() => { playSound.click(); setActiveTab("library"); }}
                  className="px-6 py-3 bg-white text-gray-700 font-black rounded-xl border-2 border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all text-xs uppercase"
                >
                  📖 Ôn Lại Lý Thuyết
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* Dashboard Statistics Section */}
      {activeTab === "dashboard" && (
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Summary widgets */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border-2 border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A] flex flex-col justify-center items-center text-center">
              <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">TỔNG MẪU N3</div>
              <div className="text-3xl font-black text-[#1A1A1A] font-mono">124</div>
            </div>
            
            <div className="bg-emerald-50/50 p-5 rounded-2xl border-2 border-emerald-700 shadow-[2px_2px_0px_#064e3b] flex flex-col justify-center items-center text-center">
              <div className="text-[9px] font-black text-emerald-800 uppercase tracking-widest mb-1">ĐÃ THUỘC</div>
              <div className="text-3xl font-black text-emerald-900 font-mono">{dashboardStats.learnedCount}</div>
            </div>
            
            <div className="bg-rose-50/50 p-5 rounded-2xl border-2 border-rose-700 shadow-[2px_2px_0px_#4c0519] flex flex-col justify-center items-center text-center">
              <div className="text-[9px] font-black text-rose-800 uppercase tracking-widest mb-1">CẦN ÔN LẠI</div>
              <div className="text-3xl font-black text-rose-900 font-mono">{dashboardStats.needReviewCount}</div>
            </div>
            
            <div className="bg-amber-50/50 p-5 rounded-2xl border-2 border-amber-700 shadow-[2px_2px_0px_#78350f] flex flex-col justify-center items-center text-center">
              <div className="text-[9px] font-black text-amber-800 uppercase tracking-widest mb-1">ĐIỂM QUIZ TB</div>
              <div className="text-3xl font-black text-amber-900 font-mono">
                {dashboardStats.avgScore} <span className="text-xs text-gray-500">/10</span>
              </div>
            </div>
          </div>

          {/* Graphics progress & priority listing */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* SVG custom animated doughnut chart */}
            <div className="md:col-span-5 bg-white p-6 rounded-2xl border-2 border-[#1A1A1A] shadow-[3px_3px_0px_#1A1A1A] flex flex-col items-center justify-center">
              <h3 className="text-xs font-black text-gray-500 uppercase tracking-wider text-center mb-4">Tỉ lệ hoàn thành Flashcard</h3>
              
              <div className="relative w-48 h-48 flex items-center justify-center">
                {/* Custom SVG circle progress */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-gray-100"
                    strokeWidth="12"
                    fill="transparent"
                  />
                  {dashboardStats.learnedCount > 0 && (
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      className="stroke-emerald-600 transition-all duration-500"
                      strokeWidth="12"
                      fill="transparent"
                      strokeDasharray={`${(dashboardStats.learnedCount / 124) * 251.2} 251.2`}
                    />
                  )}
                  {dashboardStats.needReviewCount > 0 && (
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      className="stroke-rose-600 transition-all duration-500"
                      strokeWidth="12"
                      fill="transparent"
                      strokeDasharray={`${(dashboardStats.needReviewCount / 124) * 251.2} 251.2`}
                      strokeDashoffset={`-${(dashboardStats.learnedCount / 124) * 251.2}`}
                    />
                  )}
                </svg>

                {/* Inner percentage metrics */}
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-black text-[#1A1A1A] font-mono">
                    {Math.round((dashboardStats.learnedCount / 124) * 100)}%
                  </span>
                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Đã thuộc</span>
                </div>
              </div>

              {/* Legend references */}
              <div className="flex gap-4 mt-4 text-xs font-bold">
                <div className="flex items-center gap-1.5 text-emerald-800">
                  <span className="w-3 h-3 rounded-full bg-emerald-600 block"></span>
                  <span>Đã thuộc ({dashboardStats.learnedCount})</span>
                </div>
                <div className="flex items-center gap-1.5 text-rose-800">
                  <span className="w-3 h-3 rounded-full bg-rose-600 block"></span>
                  <span>Cần ôn ({dashboardStats.needReviewCount})</span>
                </div>
              </div>
            </div>

            {/* List of priority review items */}
            <div className="md:col-span-7 bg-white p-6 rounded-2xl border-2 border-[#1A1A1A] shadow-[3px_3px_0px_#1A1A1A] flex flex-col h-[320px]">
              <div className="border-b-2 border-gray-100 pb-3 mb-3 flex justify-between items-center">
                <h3 className="text-xs font-black text-gray-500 uppercase tracking-wide flex items-center gap-1">
                  <span>❌</span>
                  <span>Danh sách ưu tiên ôn tập</span>
                </h3>
                <span className="text-[9px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded font-black uppercase">
                  Chưa Thuộc
                </span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-hide">
                {dashboardStats.reviewList.length === 0 ? (
                  <p className="text-xs text-gray-400 italic text-center mt-12 leading-relaxed">
                    Tuyệt vời! Hiện tại không có mẫu ngữ pháp nào nằm trong danh sách ưu tiên ôn tập. Hãy luyện tập Flashcard để phân loại nhé!
                  </p>
                ) : (
                  dashboardStats.reviewList.map((g) => (
                    <div 
                      key={g.id} 
                      className="bg-rose-50/50 p-3 rounded-xl border border-rose-100 flex justify-between items-center transition-all hover:bg-rose-50"
                    >
                      <div>
                        <span className="font-black text-rose-900 text-sm block" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                          #{g.id}. {g.title}
                        </span>
                        <p className="text-xs text-rose-600 font-bold line-clamp-1">{g.vi}</p>
                      </div>
                      <button
                        onClick={() => startQuizForId(g.id)}
                        className="text-[10px] bg-white text-rose-700 font-black px-3 py-1.5 rounded-lg border border-rose-200 shadow-sm hover:bg-rose-700 hover:text-white hover:border-rose-700 transition"
                      >
                        Luyện Tập
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
