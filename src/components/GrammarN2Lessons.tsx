import React, { useState, useEffect, useMemo } from "react";
import { playSound } from "../utils/audio";
import { 
  GRAMMAR_N2_TOPICS, 
  SAMPLE_GRAMMAR_N2_DATA, 
  GrammarN2Item, 
  GrammarN2Topic,
  GrammarN2QuizFill,
  GrammarN2QuizStar 
} from "../data/grammarN2Data";
import { GRAMMAR_N2_COMPARISON_SECTIONS } from "../data/grammarN2ComparisonData";
import {
  ALL_GRAMMAR_N2_EXERCISES,
  LESSONS_EXERCISES_SUMMARY,
  LESSON_TITLES_MAP,
  GrammarN2ExerciseQuestion
} from "../data/grammarN2Exercises";
import { 
  ArrowLeft, 
  Volume2, 
  BookOpen, 
  Search, 
  RotateCcw, 
  Sparkles, 
  Layers, 
  GraduationCap, 
  Trophy, 
  CheckCircle2, 
  Bookmark, 
  HelpCircle, 
  ChevronLeft, 
  ChevronRight, 
  Info,
  Brain,
  X,
  Plus,
  Star,
  Target,
  Flame,
  Check,
  Filter,
  Lightbulb,
  AlertTriangle,
  ArrowRight,
  Split,
  Eye,
  CheckCheck,
  Shuffle,
  RefreshCw,
  SlidersHorizontal,
  Languages,
  CheckCircle,
  Zap
} from "lucide-react";

interface GrammarN2LessonsProps {
  onGoBack: () => void;
}

export default function GrammarN2Lessons({ onGoBack }: GrammarN2LessonsProps) {
  const [activeTab, setActiveTab] = useState<"library" | "comparison" | "quiz" | "flashcard">("library");
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedGrammar, setSelectedGrammar] = useState<GrammarN2Item | null>(null);

  // Comparison Tab state
  const [compActiveTopic, setCompActiveTopic] = useState<string>("all");
  const [compSearchQuery, setCompSearchQuery] = useState<string>("");
  
  // Mastered IDs in local storage
  const [masteredIds, setMasteredIds] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem("sk_n2_grammar_mastered_ids");
      return saved ? new Set(JSON.parse(saved).map(Number)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Bookmarked IDs
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem("sk_n2_grammar_bookmarks");
      return saved ? new Set(JSON.parse(saved).map(Number)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("sk_n2_grammar_mastered_ids", JSON.stringify(Array.from(masteredIds)));
    } catch (e) {
      console.error(e);
    }
  }, [masteredIds]);

  useEffect(() => {
    try {
      localStorage.setItem("sk_n2_grammar_bookmarks", JSON.stringify(Array.from(bookmarkedIds)));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarkedIds]);

  const toggleMastered = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playSound.click();
    setMasteredIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleBookmark = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playSound.click();
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Text-to-speech speaker
  const speakText = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Filtered grammar list
  const filteredGrammar = useMemo(() => {
    return SAMPLE_GRAMMAR_N2_DATA.filter(item => {
      const matchTopic = selectedTopicId === null || item.topicId === selectedTopicId;
      const q = searchQuery.trim().toLowerCase();
      const matchSearch = !q || 
        item.pattern.toLowerCase().includes(q) || 
        item.meaning.toLowerCase().includes(q) ||
        item.nuance.toLowerCase().includes(q);
      return matchTopic && matchSearch;
    });
  }, [selectedTopicId, searchQuery]);

  // Quiz state with 26 lessons support
  const [quizSelectedLesson, setQuizSelectedLesson] = useState<number | "all">(1);
  const [quizSearchQuery, setQuizSearchQuery] = useState<string>("");
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [checkedQuestionIds, setCheckedQuestionIds] = useState<Set<string>>(new Set());
  const [isAllSubmitted, setIsAllSubmitted] = useState<boolean>(false);

  // Active quiz questions filtered by selected lesson & search query
  const activeQuizQuestions = useMemo(() => {
    let list = ALL_GRAMMAR_N2_EXERCISES;
    if (quizSelectedLesson !== "all") {
      list = list.filter(q => q.lessonId === quizSelectedLesson);
    }
    if (quizSearchQuery.trim()) {
      const q = quizSearchQuery.trim().toLowerCase();
      list = list.filter(item => 
        item.grammarTarget.toLowerCase().includes(q) ||
        item.question.toLowerCase().includes(q) ||
        item.explanation.toLowerCase().includes(q) ||
        item.lessonTitle.toLowerCase().includes(q)
      );
    }
    return list;
  }, [quizSelectedLesson, quizSearchQuery]);

  // Flashcard state
  const [fcIndex, setFcIndex] = useState<number>(0);
  const [fcFlipped, setFcFlipped] = useState<boolean>(false);
  const [fcSelectedLesson, setFcSelectedLesson] = useState<number | "all">("all");
  const [fcStatusFilter, setFcStatusFilter] = useState<"all" | "unmastered" | "mastered">("all");
  const [fcDisplayMode, setFcDisplayMode] = useState<"jp_to_vn" | "vn_to_structure">("vn_to_structure");
  const [fcShuffledItems, setFcShuffledItems] = useState<GrammarN2Item[] | null>(null);

  // Compute active flashcard deck
  const activeFlashcardDeck = useMemo(() => {
    let pool = SAMPLE_GRAMMAR_N2_DATA;

    // Filter by Lesson
    if (fcSelectedLesson !== "all") {
      pool = pool.filter(g => g.topicId === fcSelectedLesson);
    }

    // Filter by Status (Mastered / Unmastered)
    if (fcStatusFilter === "mastered") {
      pool = pool.filter(g => masteredIds.has(g.id));
    } else if (fcStatusFilter === "unmastered") {
      pool = pool.filter(g => !masteredIds.has(g.id));
    }

    // Shuffled pool if active
    if (fcShuffledItems !== null) {
      const validIds = new Set(pool.map(p => p.id));
      const filteredShuffled = fcShuffledItems.filter(p => validIds.has(p.id));
      return filteredShuffled.length > 0 ? filteredShuffled : pool;
    }

    return pool;
  }, [fcSelectedLesson, fcStatusFilter, fcShuffledItems, masteredIds]);

  // Handle shuffle
  const handleShuffleDeck = () => {
    playSound.click();
    const shuffled = [...activeFlashcardDeck].sort(() => Math.random() - 0.5);
    setFcShuffledItems(shuffled);
    setFcIndex(0);
    setFcFlipped(false);
  };

  // Reset shuffle order
  const handleResetOrder = () => {
    playSound.click();
    setFcShuffledItems(null);
    setFcIndex(0);
    setFcFlipped(false);
  };

  // Keyboard navigation for flashcard
  useEffect(() => {
    if (activeTab !== "flashcard") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.code === "Space" || e.key === " " || e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
        playSound.click();
        setFcFlipped(prev => !prev);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (activeFlashcardDeck.length > 0) {
          playSound.click();
          setFcFlipped(false);
          setFcIndex(prev => (prev > 0 ? prev - 1 : activeFlashcardDeck.length - 1));
        }
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (activeFlashcardDeck.length > 0) {
          playSound.click();
          setFcFlipped(false);
          setFcIndex(prev => (prev < activeFlashcardDeck.length - 1 ? prev + 1 : 0));
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTab, activeFlashcardDeck.length]);

  return (
    <div id="grammar-n2-container" className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6 animate-fade-in text-natural-deep pb-20">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-6 rounded-3xl shadow-xl border border-purple-800/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 bg-purple-500/20 text-purple-200 border border-purple-400/30 rounded-full font-black text-xs uppercase tracking-wider">
              JLPT N2 GRAMMAR MASTER
            </span>
            <span className="text-xs font-bold text-purple-300/80">• ĐỊNH DẠNG CHUẨN THỰC CHIẾN</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <span>Ngữ Pháp JLPT N2</span>
            <span className="text-xs bg-amber-400 text-black px-2.5 py-1 rounded-full font-black">
              Quyển II
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/80 max-w-2xl">
            Hệ thống 150+ mẫu câu N2 cốt lõi, so sánh sắc thái đối chiếu, phân tích bẫy đề thi & luyện Bài tập chuyên sâu.
          </p>
        </div>

        <button
          onClick={() => {
            playSound.click();
            onGoBack();
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs shadow-sm transition-all cursor-pointer z-10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về Khóa N2</span>
        </button>
      </div>

      {/* Interactive Main Navigation Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Card 1: Thư viện ngữ pháp */}
        <button
          onClick={() => {
            playSound.click();
            setActiveTab("library");
          }}
          className={`p-4 rounded-2xl transition-all flex items-center gap-3 text-left cursor-pointer ${
            activeTab === "library"
              ? "bg-purple-50/90 dark:bg-purple-950/60 border-2 border-purple-600 shadow-md ring-2 ring-purple-500/20"
              : "bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-sm"
          }`}
        >
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-black shrink-0 transition-colors ${
            activeTab === "library"
              ? "bg-purple-600 text-white"
              : "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300"
          }`}>
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xs text-zinc-600 dark:text-zinc-400 font-bold truncate">Thư viện ngữ pháp</div>
            <div className={`text-base sm:text-lg font-black truncate ${
              activeTab === "library" ? "text-purple-800 dark:text-purple-300" : "text-zinc-900 dark:text-zinc-100"
            }`}>
              {SAMPLE_GRAMMAR_N2_DATA.length} mẫu ({masteredIds.size} thuộc)
            </div>
          </div>
        </button>

        {/* Card 2: Flashcard */}
        <button
          onClick={() => {
            playSound.click();
            setActiveTab("flashcard");
          }}
          className={`p-4 rounded-2xl transition-all flex items-center gap-3 text-left cursor-pointer ${
            activeTab === "flashcard"
              ? "bg-purple-50/90 dark:bg-purple-950/60 border-2 border-purple-600 shadow-md ring-2 ring-purple-500/20"
              : "bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-sm"
          }`}
        >
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-black shrink-0 transition-colors ${
            activeTab === "flashcard"
              ? "bg-purple-600 text-white"
              : "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300"
          }`}>
            <Layers className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xs text-zinc-600 dark:text-zinc-400 font-bold truncate">Ôn tập nhanh</div>
            <div className={`text-base sm:text-lg font-black truncate ${
              activeTab === "flashcard" ? "text-purple-800 dark:text-purple-300" : "text-emerald-700 dark:text-emerald-400"
            }`}>
              Flashcard
            </div>
          </div>
        </button>

        {/* Card 3: Bài tập */}
        <button
          onClick={() => {
            playSound.click();
            setActiveTab("quiz");
          }}
          className={`p-4 rounded-2xl transition-all flex items-center gap-3 text-left cursor-pointer ${
            activeTab === "quiz"
              ? "bg-purple-50/90 dark:bg-purple-950/60 border-2 border-purple-600 shadow-md ring-2 ring-purple-500/20"
              : "bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-sm"
          }`}
        >
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-black shrink-0 transition-colors ${
            activeTab === "quiz"
              ? "bg-purple-600 text-white"
              : "bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300"
          }`}>
            <Trophy className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xs text-zinc-600 dark:text-zinc-400 font-bold truncate">Luyện tập</div>
            <div className={`text-base sm:text-lg font-black truncate ${
              activeTab === "quiz" ? "text-purple-800 dark:text-purple-300" : "text-amber-700 dark:text-amber-400"
            }`}>
              Bài tập
            </div>
          </div>
        </button>

        {/* Card 4: Sắc thái Nuance */}
        <button
          onClick={() => {
            playSound.click();
            setActiveTab("comparison");
          }}
          className={`p-4 rounded-2xl transition-all flex items-center gap-3 text-left cursor-pointer ${
            activeTab === "comparison"
              ? "bg-purple-50/90 dark:bg-purple-950/60 border-2 border-purple-600 shadow-md ring-2 ring-purple-500/20"
              : "bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-sm"
          }`}
        >
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-black shrink-0 transition-colors ${
            activeTab === "comparison"
              ? "bg-purple-600 text-white"
              : "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300"
          }`}>
            <Split className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xs text-zinc-600 dark:text-zinc-400 font-bold truncate">Cặp đối chiếu</div>
            <div className={`text-base sm:text-lg font-black truncate ${
              activeTab === "comparison" ? "text-purple-800 dark:text-purple-300" : "text-indigo-700 dark:text-indigo-400"
            }`}>
              Đối chiếu
            </div>
          </div>
        </button>
      </div>

      {/* TAB 1: THƯ VIỆN NGỮ PHÁP 3 TẦNG */}
      {activeTab === "library" && (
        <div className="space-y-6">
          {/* Search & Topic Filters */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm mẫu câu (ví dụ: はじめ, かねない, 反面, からには...)..."
                  className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Topic Selector Button Group */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                <button
                  onClick={() => setSelectedTopicId(null)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedTopicId === null
                      ? "bg-purple-700 text-white shadow-xs"
                      : "bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                  }`}
                >
                  Tất cả ({SAMPLE_GRAMMAR_N2_DATA.length})
                </button>
                {GRAMMAR_N2_TOPICS.map(t => {
                  const count = SAMPLE_GRAMMAR_N2_DATA.filter(g => g.topicId === t.id).length;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTopicId(t.id === selectedTopicId ? null : t.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                        selectedTopicId === t.id
                          ? "bg-purple-700 text-white shadow-xs"
                          : "bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                      }`}
                    >
                      <span>{t.name.split(":")[0]}</span>
                      {count > 0 && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-black">{count}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Grammar Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGrammar.map((item) => {
              const isMastered = masteredIds.has(item.id);
              const isBookmarked = bookmarkedIds.has(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    playSound.click();
                    setSelectedGrammar(item);
                  }}
                  className={`p-5 sm:p-6 rounded-3xl border-2 transition-all cursor-pointer bg-white dark:bg-zinc-900 flex flex-col justify-between space-y-4 hover:shadow-lg group relative overflow-hidden ${
                    isMastered 
                      ? "border-emerald-500 dark:border-emerald-600 shadow-xs" 
                      : "border-slate-300 dark:border-zinc-700 hover:border-purple-600 dark:hover:border-purple-500 shadow-sm"
                  }`}
                >
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-[11px] font-black uppercase px-3 py-1 rounded-lg bg-purple-700 text-white shadow-xs">
                          #{item.id} • {item.topicName}
                        </span>
                        {isMastered && (
                          <span className="text-[11px] font-black px-2.5 py-1 rounded-lg bg-emerald-600 text-white flex items-center gap-1 shadow-xs">
                            <Check className="w-3.5 h-3.5" /> Đã thuộc
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-2xl font-black text-slate-950 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors tracking-tight">
                          {item.pattern}
                        </h3>
                        <button
                          onClick={(e) => speakText(item.pattern.replace(/[〜~]/g, ""), e)}
                          className="p-1.5 rounded-full text-slate-600 hover:text-purple-700 hover:bg-purple-100 dark:text-zinc-300 dark:hover:text-purple-300 dark:hover:bg-zinc-800 transition-colors"
                          title="Phát âm"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => toggleBookmark(item.id, e)}
                        className={`p-2 rounded-xl transition-all cursor-pointer border ${
                          isBookmarked 
                            ? "text-amber-700 bg-amber-100 border-amber-300 dark:bg-amber-950/70 dark:border-amber-700 dark:text-amber-300" 
                            : "text-slate-400 border-slate-200 dark:border-zinc-700 hover:text-slate-800 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800"
                        }`}
                        title="Ghim ôn tập"
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>

                      <button
                        onClick={(e) => toggleMastered(item.id, e)}
                        className={`p-2 rounded-xl transition-all cursor-pointer border ${
                          isMastered 
                            ? "text-white bg-emerald-600 border-emerald-600" 
                            : "text-slate-400 border-slate-200 dark:border-zinc-700 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-zinc-800"
                        }`}
                        title="Đánh dấu đã thuộc"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Meaning & Connection snippet */}
                  <div className="space-y-3">
                    <p className="text-base font-black text-slate-950 dark:text-slate-50 leading-snug">
                      {item.meaning}
                    </p>
                    
                    <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border-2 border-purple-300 dark:border-purple-800 flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded-md bg-purple-200/90 dark:bg-purple-900 text-purple-950 dark:text-purple-100 font-black text-xs">
                        ⚡ 接続
                      </span>
                      <span className="text-xs font-mono font-black text-slate-900 dark:text-slate-100">
                        {item.connection[0]}
                      </span>
                    </div>
                  </div>

                  {/* Example Snippet */}
                  {item.examples[0] && (
                    <div className="border-t-2 border-slate-200 dark:border-zinc-800 pt-3 text-xs space-y-2">
                      <div className="text-slate-700 dark:text-slate-300 font-black flex items-center justify-between">
                        <span>Ví dụ tiêu biểu:</span>
                        <span className="text-xs text-purple-700 dark:text-purple-300 font-black group-hover:underline flex items-center gap-1">
                          Xem chi tiết 3 tầng <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                      <p className="font-bold text-slate-950 dark:text-white text-sm leading-relaxed">{item.examples[0].jp}</p>
                      <p className="text-slate-800 dark:text-slate-300 text-xs font-semibold leading-relaxed">{item.examples[0].vn}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: SO SÁNH SẮC THÁI (NUANCE ARENA & ĐỐI CHIẾU 6 CHUYÊN ĐỀ N2) */}
      {activeTab === "comparison" && (
        <div className="space-y-6">
          
          {/* Header Banner */}
          <div className="p-5 bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 text-white rounded-3xl shadow-md space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-purple-500/30 text-purple-200 border border-purple-400/30 font-black text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Split className="w-3.5 h-3.5 text-purple-300" />
                  <span>Phần IV: 文法形式の整理 • Shin Kanzen Master N2</span>
                </span>
                <span className="text-xs text-purple-200/80 font-bold hidden sm:inline">
                  (Trang 122 – 135)
                </span>
              </div>
              <span className="text-xs bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2.5 py-0.5 rounded-full font-black">
                🎯 6 Chuyên đề cốt lõi & 107+ Mẫu đối chiếu
              </span>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Cặp Đối Chiếu & Bảng Tổng Hợp Phân Biệt Sắc Thái Ngữ Pháp N2
              </h2>
              <p className="text-xs sm:text-sm text-purple-200/90 font-medium mt-1 leading-relaxed">
                Nắm trọn bản chất ngữ pháp từ <strong>Từ gốc</strong>, <strong>Từ cổ (文語)</strong>, <strong>Phát ngôn vs Nội tâm (言う・する)</strong>, <strong>Bản chất vs Sự việc (もの・こと)</strong>, và <strong>Lý lẽ vs Hoàn cảnh (わけ・ところ)</strong> để không bao giờ bị bẫy trong đề thi JLPT N2.
              </p>
            </div>

            {/* Quick Search & Topic Filter bar */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <div className="sm:col-span-8 relative">
                <Search className="w-4 h-4 text-purple-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={compSearchQuery}
                  onChange={(e) => setCompSearchQuery(e.target.value)}
                  placeholder="Tra nhanh mẫu câu, từ gốc, ý nghĩa hoặc bài học (ví dụ: 〜もの, わけ, 関する, 7課)..."
                  className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-purple-200/60 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
                />
                {compSearchQuery && (
                  <button
                    onClick={() => setCompSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-200 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="sm:col-span-4 flex items-center justify-end gap-2 text-xs text-purple-200">
                <span className="text-[11px] font-bold">
                  {compSearchQuery ? `Đang tìm: "${compSearchQuery}"` : "Chọn chuyên đề bên dưới để lọc nhanh"}
                </span>
              </div>
            </div>
          </div>

          {/* Topic Navigation Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => {
                playSound.click();
                setCompActiveTopic("all");
              }}
              className={`px-4 py-2.5 rounded-2xl font-black text-xs shrink-0 transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
                compActiveTopic === "all"
                  ? "bg-purple-700 text-white shadow-sm ring-2 ring-purple-500/30"
                  : "bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Tất cả 6 Chuyên đề (107+ mẫu)</span>
            </button>

            {GRAMMAR_N2_COMPARISON_SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => {
                  playSound.click();
                  setCompActiveTopic(sec.id);
                }}
                className={`px-3.5 py-2.5 rounded-2xl font-black text-xs shrink-0 transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
                  compActiveTopic === sec.id
                    ? "bg-purple-700 text-white shadow-sm ring-2 ring-purple-500/30"
                    : "bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                }`}
              >
                <span className="w-5 h-5 rounded-lg bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-200 text-[11px] font-black flex items-center justify-center">
                  {sec.code}
                </span>
                <span>{sec.title.split(":")[1]?.trim() || sec.title}</span>
              </button>
            ))}

            <button
              onClick={() => {
                playSound.click();
                setCompActiveTopic("classic-pairs");
              }}
              className={`px-4 py-2.5 rounded-2xl font-black text-xs shrink-0 transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
                compActiveTopic === "classic-pairs"
                  ? "bg-purple-700 text-white shadow-sm ring-2 ring-purple-500/30"
                  : "bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700"
              }`}
            >
              <Target className="w-4 h-4 text-amber-500" />
              <span>Bẫy Kinh Điển Khác</span>
            </button>
          </div>

          {/* Render Sections */}
          <div className="space-y-8">
            {GRAMMAR_N2_COMPARISON_SECTIONS.filter(sec => compActiveTopic === "all" || compActiveTopic === sec.id).map((section) => {
              // Apply search filter if query is set
              const query = compSearchQuery.trim().toLowerCase();
              const filteredGroups = section.groups.map(group => {
                if (!query) return group;
                const matchedRows = group.rows.filter(r => 
                  r.pattern.toLowerCase().includes(query) ||
                  (r.rootWord && r.rootWord.toLowerCase().includes(query)) ||
                  r.meaning.toLowerCase().includes(query) ||
                  r.explanation.toLowerCase().includes(query) ||
                  r.exampleJp.toLowerCase().includes(query) ||
                  (r.lesson && r.lesson.toLowerCase().includes(query))
                );
                return { ...group, rows: matchedRows };
              }).filter(group => group.rows.length > 0 || !query);

              // If searching and nothing matches in this section, skip
              if (query && filteredGroups.every(g => g.rows.length === 0)) {
                return null;
              }

              return (
                <div
                  key={section.id}
                  className="bg-white dark:bg-zinc-850 rounded-3xl border border-zinc-200 dark:border-zinc-750 p-6 sm:p-8 shadow-sm space-y-6"
                >
                  {/* Section Title Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-700 pb-5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="w-8 h-8 rounded-xl bg-purple-700 text-white font-black text-sm flex items-center justify-center shadow-xs">
                          {section.code}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">
                          {section.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-purple-800 dark:text-purple-300 font-bold">
                        {section.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      {section.coreBadges.map((badge, bIdx) => (
                        <span
                          key={bIdx}
                          className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/70 border border-purple-300 dark:border-purple-800 text-purple-900 dark:text-purple-200 font-black text-[11px]"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Essence Summary Box */}
                  {section.essenceSummary.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.essenceSummary.map((ess, eIdx) => (
                        <div
                          key={eIdx}
                          className="p-4 rounded-2xl bg-purple-50/90 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/70 space-y-1.5"
                        >
                          <div className="font-black text-purple-950 dark:text-purple-200 text-xs flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-purple-700 dark:text-purple-300" />
                            <span>{ess.title}</span>
                          </div>
                          <p className="text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
                            {ess.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Group Items */}
                  <div className="space-y-6">
                    {filteredGroups.map((group, gIdx) => (
                      <div
                        key={gIdx}
                        className="space-y-4 pt-2"
                      >
                        {/* Group Header */}
                        <div className="flex items-center justify-between flex-wrap gap-2 border-l-4 border-purple-600 pl-3 py-0.5">
                          <div>
                            <h4 className="text-base font-black text-zinc-950 dark:text-zinc-50">
                              {group.groupTitle}
                            </h4>
                            {group.groupSubtitle && (
                              <p className="text-xs font-bold text-zinc-600 dark:text-zinc-400">
                                {group.groupSubtitle}
                              </p>
                            )}
                          </div>
                          <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                            {group.rows.length} mẫu câu
                          </span>
                        </div>

                        {/* Group Rows Table / Cards */}
                        <div className="grid grid-cols-1 gap-3.5">
                          {group.rows.map((row, rIdx) => (
                            <div
                              key={rIdx}
                              className="p-4 sm:p-5 rounded-2xl border border-zinc-200 dark:border-zinc-700/80 hover:border-purple-400 dark:hover:border-purple-600 bg-zinc-50/70 dark:bg-zinc-800/60 transition-all space-y-3"
                            >
                              {/* Top Bar */}
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-700 pb-2.5">
                                <div className="flex items-center gap-2.5 flex-wrap">
                                  {row.stt && (
                                    <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-900 dark:bg-purple-900/60 dark:text-purple-200 text-xs font-black flex items-center justify-center">
                                      {row.stt}
                                    </span>
                                  )}
                                  
                                  {row.rootWord && (
                                    <span className="px-2.5 py-1 rounded-xl bg-purple-100/90 text-purple-950 dark:bg-purple-900/50 dark:text-purple-100 text-xs font-black font-mono">
                                      🌱 Từ gốc: {row.rootWord} {row.rootWordMeaning ? `(${row.rootWordMeaning})` : ""}
                                    </span>
                                  )}

                                  <div className="flex items-center gap-1.5">
                                    <span className="text-base sm:text-lg font-black text-purple-950 dark:text-purple-100">
                                      {row.pattern}
                                    </span>
                                    <button
                                      onClick={(e) => speakText(row.pattern.replace(/[〜~]/g, ""), e)}
                                      className="p-1 text-purple-700 hover:text-purple-900 dark:text-purple-300 dark:hover:text-purple-100 transition-transform active:scale-95 cursor-pointer"
                                      title="Phát âm mẫu câu"
                                    >
                                      <Volume2 className="w-4 h-4" />
                                    </button>
                                  </div>

                                  {row.isNew && (
                                    <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white font-black text-[10px] animate-pulse">
                                      MẪU MỚI *
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center gap-2 self-start sm:self-auto">
                                  {row.lesson && (
                                    <span className="px-2.5 py-0.5 rounded-lg bg-indigo-100 text-indigo-900 dark:bg-indigo-900/60 dark:text-indigo-200 font-black text-xs">
                                      {row.lesson}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Formats & Meaning Grid */}
                              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 text-xs">
                                
                                {/* Meaning */}
                                <div className="md:col-span-5 space-y-1">
                                  <div className="text-[10px] font-black uppercase text-purple-700 dark:text-purple-400">
                                    Ý NGHĨA TIẾNG VIỆT
                                  </div>
                                  <div className="text-sm font-black text-zinc-950 dark:text-zinc-100 leading-snug">
                                    {row.meaning}
                                  </div>

                                  {row.nounForm && (
                                    <div className="mt-2 p-2 rounded-xl bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800/80 text-[11px] font-mono text-purple-950 dark:text-purple-200 font-bold">
                                      📖 <strong>Bổ nghĩa N:</strong> {row.nounForm}
                                    </div>
                                  )}

                                  {row.connection && (
                                    <div className="mt-2 p-2 rounded-xl bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800/80 text-[11px] font-mono text-purple-950 dark:text-purple-200 font-bold">
                                      ⚡ <strong>Kết hợp:</strong> {row.connection}
                                    </div>
                                  )}
                                </div>

                                {/* Explanation & Nuance */}
                                <div className="md:col-span-7 space-y-1.5">
                                  <div className="text-[10px] font-black uppercase text-purple-700 dark:text-purple-400">
                                    BẢN CHẤT NGỮ PHÁP & NUANCE
                                  </div>
                                  <p className="text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
                                    {row.explanation}
                                  </p>

                                  {/* Example */}
                                  {row.exampleJp && (
                                    <div className="mt-2 p-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs space-y-1">
                                      <div className="flex items-center justify-between gap-1">
                                        <p className="font-bold text-zinc-950 dark:text-zinc-100">{row.exampleJp}</p>
                                        <button
                                          onClick={(e) => speakText(row.exampleJp, e)}
                                          className="p-1 text-purple-700 hover:text-purple-900 dark:text-purple-300 dark:hover:text-purple-100 shrink-0 cursor-pointer"
                                          title="Phát âm câu ví dụ"
                                        >
                                          <Volume2 className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                      <p className="text-zinc-600 dark:text-zinc-400 italic text-[11px] font-medium">{row.exampleVn}</p>
                                    </div>
                                  )}
                                </div>

                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Group Essence & Distinctions (if any) */}
                        {group.groupEssence && (
                          <div className="p-4 rounded-2xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 space-y-2 text-xs">
                            <div className="font-black text-amber-950 dark:text-amber-200 flex items-center gap-1.5">
                              <Lightbulb className="w-4 h-4 text-amber-600 fill-amber-400" />
                              <span>💡 {group.groupEssence.title}</span>
                            </div>
                            <p className="text-zinc-900 dark:text-zinc-100 leading-relaxed font-medium">
                              {group.groupEssence.content}
                            </p>
                            {group.groupEssence.distinctions && (
                              <div className="space-y-1.5 pt-1">
                                {group.groupEssence.distinctions.map((d, dIdx) => (
                                  <div key={dIdx} className="p-2.5 bg-white dark:bg-zinc-800 rounded-xl border border-amber-200 dark:border-amber-900 font-bold text-zinc-900 dark:text-zinc-100">
                                    • <span className="text-purple-800 dark:text-purple-300 font-black">{d.pair}:</span> {d.diff}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                      </div>
                    ))}
                  </div>

                  {/* Cheat Sheet Table (e.g. for Classical Japanese) */}
                  {section.cheatSheet && (
                    <div className="space-y-3 pt-4 border-t border-zinc-200 dark:border-zinc-700">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-500 fill-amber-400" />
                        <h4 className="text-sm font-black text-zinc-950 dark:text-zinc-100 uppercase tracking-wider">
                          {section.cheatSheet.title}
                        </h4>
                      </div>

                      <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-700">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead className="bg-purple-100 dark:bg-purple-950/70 text-purple-950 dark:text-purple-200 font-black">
                            <tr>
                              {section.cheatSheet.headers.map((h, hIdx) => (
                                <th key={hIdx} className="p-3 border-b border-zinc-200 dark:border-zinc-700">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                            {section.cheatSheet.rows.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-zinc-100/70 dark:hover:bg-zinc-800/70">
                                <td className="p-3 font-black text-purple-800 dark:text-purple-300 whitespace-nowrap font-mono">{row.rootWord}</td>
                                <td className="p-3 font-black text-zinc-900 dark:text-zinc-100">{row.patternList}</td>
                                <td className="p-3 font-mono font-bold text-purple-950 dark:text-purple-200">{row.conjugationRule}</td>
                                <td className="p-3 font-medium text-zinc-800 dark:text-zinc-200">{row.modernMeaning}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Distinctive Pair Analysis */}
                  {section.distinctions && (
                    <div className="space-y-3 pt-4 border-t border-zinc-200 dark:border-zinc-700">
                      {section.distinctions.map((dist, dIdx) => (
                        <div key={dIdx} className="p-4 sm:p-5 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-3">
                          <div className="font-black text-indigo-950 dark:text-indigo-200 text-sm flex items-center gap-2">
                            <Target className="w-4 h-4 text-indigo-700 dark:text-indigo-400" />
                            <span>{dist.title}</span>
                          </div>
                          {dist.summary && (
                            <p className="text-xs text-zinc-700 dark:text-zinc-300 font-bold">{dist.summary}</p>
                          )}
                          <div className="grid grid-cols-1 gap-2.5">
                            {dist.items.map((it, itIdx) => (
                              <div key={itIdx} className="p-3 rounded-xl bg-white dark:bg-zinc-800 border border-indigo-100 dark:border-indigo-900 space-y-1 text-xs">
                                <div className="flex items-center justify-between">
                                  <span className="font-black text-purple-950 dark:text-purple-200">{it.pattern}</span>
                                  {it.tag && (
                                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-purple-100 text-purple-900 dark:bg-purple-900/60 dark:text-purple-200 font-bold">
                                      {it.tag}
                                    </span>
                                  )}
                                </div>
                                <p className="text-zinc-800 dark:text-zinc-200 whitespace-pre-line leading-relaxed font-medium">{it.nuance}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Exam Tips Box */}
                  {section.examTips && (
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border-2 border-emerald-300 dark:border-emerald-800 space-y-3">
                      <div className="font-black text-emerald-950 dark:text-emerald-200 text-sm flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-500 fill-amber-400" />
                        <span>💡 {section.examTips.title}</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {section.examTips.tips.map((tip, tIdx) => (
                          <div key={tIdx} className="p-3.5 bg-white dark:bg-zinc-800 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-1 text-xs">
                            <div className="font-black text-emerald-800 dark:text-emerald-300">{tip.title}</div>
                            <p className="text-zinc-800 dark:text-zinc-200 whitespace-pre-line leading-relaxed font-medium">{tip.content}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              );
            })}

            {/* Classic Comparison Pairs (Keep Previous Handpicked Pearls) */}
            {(compActiveTopic === "all" || compActiveTopic === "classic-pairs") && (
              <div className="bg-white dark:bg-zinc-850 rounded-3xl border border-zinc-200 dark:border-zinc-750 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-700 pb-4">
                  <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-black text-sm flex items-center justify-center shadow-xs">
                    ★
                  </span>
                  <div>
                    <h3 className="text-xl font-black text-zinc-950 dark:text-zinc-50">
                      Các Cặp Bẫy Sắc Thái Kinh Điển Khác
                    </h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 font-bold">
                      Tổng hợp các cặp đối chiếu thường xuyên xuất hiện trong phần bài tập dấu sao (★) và đọc hiểu
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {/* Compare Card 1: 〜かねる vs 〜かねない */}
                  <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200 font-black text-xs uppercase">
                        BẪY KINH ĐIỂN #1
                      </span>
                      <h4 className="text-base font-black text-zinc-950 dark:text-zinc-50">
                        〜かねる (Không thể) vs 〜かねない (Có nguy cơ)
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="p-4 rounded-2xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-2">
                        <div className="font-black text-amber-900 dark:text-amber-200 text-sm flex items-center justify-between">
                          <span>〜かねる</span>
                          <span className="text-[10px] px-2 py-0.5 bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 rounded-full font-bold">Nghĩa Phủ Định</span>
                        </div>
                        <p className="text-zinc-900 dark:text-zinc-100 font-medium"><strong>Nghĩa:</strong> Khó lòng / E rằng không thể làm được.</p>
                        <p className="text-zinc-800 dark:text-zinc-200 font-medium"><strong>Bản chất:</strong> Về mặt tâm lý, lập trường, đạo đức thì muốn giúp nhưng không thể nhận lời. Dùng để từ chối lịch sự trong kinh doanh.</p>
                        <div className="p-2.5 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 font-mono text-[11px]">
                          <span className="font-bold text-zinc-900 dark:text-zinc-100">ご希望には沿いかねます。</span><br />
                          <span className="text-zinc-600 dark:text-zinc-400 font-medium">(Tôi e rằng khó lòng đáp ứng nguyện vọng của quý khách).</span>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-red-50/90 dark:bg-red-950/40 border border-red-200 dark:border-red-800 space-y-2">
                        <div className="font-black text-red-900 dark:text-red-200 text-sm flex items-center justify-between">
                          <span>〜かねない</span>
                          <span className="text-[10px] px-2 py-0.5 bg-red-200 dark:bg-red-900 text-red-900 dark:text-red-200 rounded-full font-bold">Nghĩa Khẳng Định</span>
                        </div>
                        <p className="text-zinc-900 dark:text-zinc-100 font-medium"><strong>Nghĩa:</strong> Hoàn toàn có nguy cơ dẫn đến hậu quả xấu.</p>
                        <p className="text-zinc-800 dark:text-zinc-200 font-medium"><strong>Bản chất:</strong> Dù có đuôi "ない" nhưng mang nghĩa khẳng định nguy cơ tiêu cực sẽ ập đến nếu tiếp tục hành vi hiện tại.</p>
                        <div className="p-2.5 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 font-mono text-[11px]">
                          <span className="font-bold text-zinc-900 dark:text-zinc-100">大事故を起こしかねない。</span><br />
                          <span className="text-zinc-600 dark:text-zinc-400 font-medium">(Có nguy cơ gây ra tai nạn nghiêm trọng đấy).</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Compare Card 2: 〜を契機に vs 〜をきっかけに */}
                  <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-200 font-black text-xs uppercase">
                        BẪY VĂN PHONG #2
                      </span>
                      <h4 className="text-base font-black text-zinc-950 dark:text-zinc-50">
                        〜を契機に (Trang Trọng / Xã Hội) vs 〜をきっかけに (Đời Thường / Cá Nhân)
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="p-4 rounded-2xl bg-purple-50/90 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-2">
                        <div className="font-black text-purple-950 dark:text-purple-200 text-sm">
                          〜を契機に (Khế cơ)
                        </div>
                        <p className="text-zinc-900 dark:text-zinc-100 font-medium"><strong>Ngữ cảnh:</strong> Văn viết, diễn văn, sự kiện lịch sử, chính sách phát triển kinh tế xã hội.</p>
                        <p className="text-zinc-800 dark:text-zinc-200 font-medium"><strong>Ví dụ:</strong> オリンピックを契機として都市開発が進んだ (Lấy thế vận hội làm bước ngoặt phát triển đô thị).</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-emerald-50/90 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2">
                        <div className="font-black text-emerald-900 dark:text-emerald-200 text-sm">
                          〜をきっかけに
                        </div>
                        <p className="text-zinc-900 dark:text-zinc-100 font-medium"><strong>Ngữ cảnh:</strong> Cơ duyên, dịp tình cờ trong đời sống cá nhân (bắt đầu học ngoại ngữ, quen bạn mới...).</p>
                        <p className="text-zinc-800 dark:text-zinc-200 font-medium"><strong>Ví dụ:</strong> アニメを見たのをきっかけに日本語を勉強し始めた (Cơ duyên từ xem anime mà bắt đầu học tiếng Nhật).</p>
                      </div>
                    </div>
                  </div>

                  {/* Compare Card 3: 〜反面 vs 〜に対して */}
                  <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-200 font-black text-xs uppercase">
                        BẪY CHỦ THỂ #3
                      </span>
                      <h4 className="text-base font-black text-zinc-950 dark:text-zinc-50">
                        〜反面 (Cùng 1 đối tượng) vs 〜に対して (2 đối tượng khác nhau)
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="p-4 rounded-2xl bg-blue-50/90 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-2">
                        <div className="font-black text-blue-950 dark:text-blue-200 text-sm">
                          〜反面 (Mặt khác)
                        </div>
                        <p className="text-zinc-900 dark:text-zinc-100 font-medium"><strong>Quy tắc vàng:</strong> Chỉ dùng cho <strong>CÙNG MỘT ĐỐI TƯỢNG</strong> có 2 mặt song song (vừa tốt vừa xấu).</p>
                        <p className="text-zinc-800 dark:text-zinc-200 font-medium"><strong>Ví dụ:</strong> 都会は便利な反面、物価が高い (Thành phố tiện lợi nhưng mặt khác vật giá đắt).</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-indigo-50/90 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-2">
                        <div className="font-black text-indigo-950 dark:text-indigo-200 text-sm">
                          〜に対して (Đối lập)
                        </div>
                        <p className="text-zinc-900 dark:text-zinc-100 font-medium"><strong>Quy tắc vàng:</strong> Dùng để đối chiếu so sánh <strong>HAI ĐỐI TƯỢNG ĐỘC LẬP</strong> (người A vs người B).</p>
                        <p className="text-zinc-800 dark:text-zinc-200 font-medium"><strong>Ví dụ:</strong> 兄が活発なのに対して、弟は物静かだ (Anh trai hoạt bát đối lập với em trai trầm tính).</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>

        </div>
      )}

      {/* TAB 3: BÀI TẬP TRẮC NGHIỆM */}
      {activeTab === "quiz" && (
        <div className="space-y-6">
          {/* Header & Lesson Selection Controller */}
          <div className="bg-white dark:bg-zinc-850 rounded-3xl border border-zinc-200 dark:border-zinc-750 p-5 sm:p-6 shadow-sm space-y-5">
            
            {/* Top Row: Title & Action Buttons */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1.5">
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-200 rounded-full font-black text-xs">
                    BÀI TẬP TRẮC NGHIỆM N2
                  </span>
                  <span className="px-2.5 py-0.5 bg-zinc-100 dark:bg-zinc-750 text-zinc-700 dark:text-zinc-300 rounded-full font-bold text-xs">
                    {quizSelectedLesson === "all" 
                      ? `Toàn bộ 26 bài (${activeQuizQuestions.length} câu)` 
                      : `Bài ${quizSelectedLesson} (${activeQuizQuestions.length} câu)`}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                  Luyện tập trắc nghiệm theo từng bài học hoặc ôn tập tổng hợp. Bạn có thể kiểm tra từng câu hoặc làm hết rồi bấm <strong className="text-purple-800 dark:text-purple-300">Nộp bài & Chấm điểm</strong>.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
                <button
                  onClick={() => {
                    playSound.click();
                    setUserAnswers(prev => {
                      const next = { ...prev };
                      activeQuizQuestions.forEach(q => {
                        delete next[q.id];
                      });
                      return next;
                    });
                    setCheckedQuestionIds(prev => {
                      const next = new Set(prev);
                      activeQuizQuestions.forEach(q => {
                        next.delete(q.id);
                      });
                      return next;
                    });
                    setIsAllSubmitted(false);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-750 text-zinc-800 dark:text-zinc-200 font-bold text-xs cursor-pointer transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Làm lại bài này</span>
                </button>

                <button
                  onClick={() => {
                    playSound.click();
                    const currentAnswered = activeQuizQuestions.filter(q => userAnswers[q.id] !== undefined).length;
                    if (currentAnswered === 0) {
                      alert("Vui lòng chọn ít nhất 1 đáp án trước khi nộp bài!");
                      return;
                    }
                    
                    // Compute score for current active questions
                    let correctCount = 0;
                    activeQuizQuestions.forEach(q => {
                      if (userAnswers[q.id] === q.correctIndex) {
                        correctCount++;
                      }
                    });

                    if (correctCount >= Math.ceil(activeQuizQuestions.length * 0.7)) {
                      playSound.correct();
                    } else {
                      playSound.wrong();
                    }

                    // Mark current questions checked & submit
                    setCheckedQuestionIds(prev => {
                      const next = new Set(prev);
                      activeQuizQuestions.forEach(q => next.add(q.id));
                      return next;
                    });
                    setIsAllSubmitted(true);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-black text-xs shadow-md cursor-pointer transition-all"
                >
                  <Trophy className="w-4 h-4 text-amber-300" />
                  <span>Nộp bài & Chấm điểm</span>
                </button>
              </div>
            </div>

            {/* Filter Controls: Lesson Dropdown + Search Input */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
              {/* Lesson Select Dropdown */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1.5 flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  <span>Chọn bài học trắc nghiệm (26 bài):</span>
                </label>
                <select
                  value={quizSelectedLesson}
                  onChange={(e) => {
                    playSound.click();
                    const val = e.target.value === "all" ? "all" : Number(e.target.value);
                    setQuizSelectedLesson(val);
                    setIsAllSubmitted(false);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                >
                  <option value="all">🌟 Tất cả 26 bài học (520 câu trắc nghiệm tổng hợp)</option>
                  {LESSONS_EXERCISES_SUMMARY.map(item => (
                    <option key={item.lessonId} value={item.lessonId}>
                      {item.lessonTitle} ({item.questionCount} câu)
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Bar in Quizzes */}
              <div>
                <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1.5 flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  <span>Tìm kiếm câu hỏi:</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={quizSearchQuery}
                    onChange={(e) => setQuizSearchQuery(e.target.value)}
                    placeholder="Mẫu ngữ pháp, từ khóa..."
                    className="w-full pl-8 pr-7 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  {quizSearchQuery && (
                    <button
                      onClick={() => setQuizSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Quick 26 Lesson Buttons Ribbon */}
            <div>
              <div className="text-[11px] font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                Chọn nhanh bài học:
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
                <button
                  onClick={() => {
                    playSound.click();
                    setQuizSelectedLesson("all");
                    setIsAllSubmitted(false);
                  }}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs shrink-0 transition-all cursor-pointer ${
                    quizSelectedLesson === "all"
                      ? "bg-purple-700 text-white shadow-sm font-black"
                      : "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                  }`}
                >
                  Tất cả (520 câu)
                </button>
                {Array.from({ length: 26 }, (_, i) => i + 1).map(num => (
                  <button
                    key={num}
                    onClick={() => {
                      playSound.click();
                      setQuizSelectedLesson(num);
                      setIsAllSubmitted(false);
                    }}
                    className={`px-2.5 py-1.5 rounded-xl font-bold text-xs shrink-0 transition-all cursor-pointer ${
                      quizSelectedLesson === num
                        ? "bg-purple-700 text-white shadow-sm font-black ring-2 ring-purple-400"
                        : "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                    }`}
                  >
                    Bài {num}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary Box when submitted */}
          {isAllSubmitted && (() => {
            let correct = 0;
            activeQuizQuestions.forEach(item => {
              if (userAnswers[item.id] === item.correctIndex) correct++;
            });
            const total = activeQuizQuestions.length || 1;
            const percentVal = Math.round((correct / total) * 100);
            let evalText = "";
            let evalColor = "";

            if (percentVal >= 90) {
              evalText = "Xuất sắc! Bạn đã nắm rất vững ngữ pháp của phần bài tập này và hoàn toàn tự tin làm chủ đề thi N2.";
              evalColor = "text-emerald-950 dark:text-emerald-100 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 dark:border-emerald-700";
            } else if (percentVal >= 70) {
              evalText = "Khá tốt! Bạn đã đạt mức điểm an toàn. Hãy xem kỹ lời giải thích bên dưới của các câu sai để ghi nhớ bẫy đề thi.";
              evalColor = "text-blue-950 dark:text-blue-100 bg-blue-50 dark:bg-blue-950/60 border-blue-400 dark:border-blue-700";
            } else {
              evalText = "Cần cố gắng ôn luyện thêm! Hãy quay lại Thư viện và Flashcard của bài học này để củng cố các cấu trúc còn nhầm lẫn.";
              evalColor = "text-amber-950 dark:text-amber-100 bg-amber-50 dark:bg-amber-950/60 border-amber-400 dark:border-amber-700";
            }

            return (
              <div className={`p-6 rounded-3xl border-2 space-y-4 shadow-sm animate-fade-in ${evalColor}`}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-zinc-800 shadow-sm flex items-center justify-center font-black text-2xl text-purple-700 dark:text-purple-300">
                      {percentVal}%
                    </div>
                    <div>
                      <h3 className="text-lg font-black">
                        Kết Quả {quizSelectedLesson === "all" ? "Tổng Hợp 26 Bài Ngữ Pháp N2" : `Bài Tập Bài ${quizSelectedLesson}`}
                      </h3>
                      <p className="text-xs font-bold opacity-90">
                        Đúng <strong>{correct}</strong> / <strong>{activeQuizQuestions.length}</strong> câu ({percentVal}%)
                      </p>
                    </div>
                  </div>

                  <div className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-white dark:bg-zinc-800 shadow-sm border border-current/20">
                    {percentVal >= 70 ? "🎉 ĐẠT CHỈ TIÊU" : "⚠️ CẦN ÔN LẠI"}
                  </div>
                </div>

                <div className="text-xs sm:text-sm font-medium border-t pt-3 border-current/20 leading-relaxed">
                  <strong>Đánh giá của Thầy Sơn:</strong> {evalText}
                </div>
              </div>
            );
          })()}

          {/* No Questions Found */}
          {activeQuizQuestions.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-zinc-850 rounded-3xl border border-zinc-200 dark:border-zinc-750 p-6">
              <p className="text-sm font-bold text-zinc-600 dark:text-zinc-400">
                Không tìm thấy câu hỏi bài tập nào phù hợp với bộ lọc hiện tại.
              </p>
            </div>
          )}

          {/* All Questions List */}
          <div className="space-y-6">
            {activeQuizQuestions.map((item, qIndex) => {
              const selectedOpt = userAnswers[item.id];
              const isChecked = checkedQuestionIds.has(item.id) || isAllSubmitted;
              const isCorrect = selectedOpt === item.correctIndex;
              const hasAnswered = selectedOpt !== undefined;

              return (
                <div
                  key={item.id}
                  id={`quiz-item-${item.id}`}
                  className={`bg-white dark:bg-zinc-850 rounded-3xl border-2 transition-all p-6 sm:p-7 space-y-5 shadow-sm ${
                    isChecked
                      ? isCorrect
                        ? "border-emerald-400 dark:border-emerald-700"
                        : "border-red-400 dark:border-red-700"
                      : "border-zinc-200 dark:border-zinc-750"
                  }`}
                >
                  {/* Question Header */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-200 font-black text-xs">
                        Câu {qIndex + 1}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-750 text-zinc-700 dark:text-zinc-300 font-bold text-xs">
                        Bài {item.lessonId}
                      </span>
                      <span className="text-xs font-mono font-black text-purple-800 dark:text-purple-300">
                        {item.grammarTarget}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => speakText(item.question.replace(/[（）()]/g, ""))}
                        className="p-1.5 rounded-xl text-zinc-500 hover:text-purple-700 hover:bg-purple-50 dark:text-zinc-400 dark:hover:text-purple-300 dark:hover:bg-zinc-700 cursor-pointer"
                        title="Nghe câu hỏi"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      {isChecked && (
                        <span className={`px-2.5 py-1 rounded-full text-xs font-black flex items-center gap-1 ${
                          isCorrect 
                            ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/70 dark:text-emerald-100"
                            : "bg-red-100 text-red-900 dark:bg-red-900/70 dark:text-red-100"
                        }`}>
                          {isCorrect ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                          {isCorrect ? "Đúng" : "Chưa đúng"}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Question Text */}
                  <div className="text-base sm:text-lg font-black text-zinc-950 dark:text-zinc-50 leading-relaxed p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                    {item.question}
                  </div>

                  {/* Options Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {item.options.map((opt, optIdx) => {
                      const isOptionSelected = selectedOpt === optIdx;
                      const isOptionCorrect = optIdx === item.correctIndex;
                      const letterLabel = String.fromCharCode(65 + optIdx); // A, B, C

                      const finalStyle = isChecked
                        ? isOptionCorrect
                          ? "bg-emerald-50 dark:bg-emerald-950/70 border-emerald-500 text-emerald-950 dark:text-emerald-100 font-black ring-2 ring-emerald-500/20"
                          : isOptionSelected
                            ? "bg-red-50 dark:bg-red-950/70 border-red-500 text-red-950 dark:text-red-100 font-bold"
                            : "bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 opacity-60 text-zinc-500"
                        : isOptionSelected
                          ? "bg-purple-50 dark:bg-purple-950/80 border-purple-600 text-purple-950 dark:text-purple-100 font-black ring-2 ring-purple-500/20"
                          : "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-purple-400 text-zinc-900 dark:text-zinc-100";

                      return (
                        <button
                          key={optIdx}
                          disabled={isChecked}
                          onClick={() => {
                            playSound.click();
                            setUserAnswers(prev => ({ ...prev, [item.id]: optIdx }));
                          }}
                          className={`p-3.5 rounded-2xl border-2 text-left text-xs sm:text-sm font-bold transition-all flex items-center justify-between cursor-pointer ${finalStyle}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center text-xs font-black shrink-0 text-zinc-700 dark:text-zinc-300">
                              {letterLabel}
                            </span>
                            <span className="font-semibold">{opt}</span>
                          </div>
                          {isChecked && isOptionCorrect && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                          {isChecked && isOptionSelected && !isOptionCorrect && <X className="w-4 h-4 text-red-500 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Actions & Explanations */}
                  <div className="pt-3 border-t border-zinc-200 dark:border-zinc-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    {!isChecked ? (
                      <button
                        disabled={!hasAnswered}
                        onClick={() => {
                          if (!hasAnswered) return;
                          playSound.click();
                          if (isCorrect) playSound.correct();
                          else playSound.wrong();
                          setCheckedQuestionIds(prev => new Set(prev).add(item.id));
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                          hasAnswered
                            ? "bg-purple-700 hover:bg-purple-800 text-white shadow-sm"
                            : "bg-zinc-200 dark:bg-zinc-700 text-zinc-400 cursor-not-allowed"
                        }`}
                      >
                        Kiểm Tra Câu Này
                      </button>
                    ) : (
                      <div className="w-full space-y-2">
                        <div className="p-4 rounded-2xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/70 text-xs space-y-2">
                          <div className="font-black text-purple-900 dark:text-purple-200 flex items-center gap-1.5">
                            <Lightbulb className="w-4 h-4 text-amber-500 fill-amber-400" />
                            <span>Giải thích chi tiết & Bẫy đề thi từ Thầy Sơn:</span>
                          </div>
                          <div className="text-zinc-900 dark:text-zinc-100 font-medium leading-relaxed whitespace-pre-line">
                            {item.explanation}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Sticky Submit Button */}
          {!isAllSubmitted && activeQuizQuestions.length > 0 && (
            <div className="sticky bottom-6 flex justify-center z-20">
              <button
                onClick={() => {
                  playSound.click();
                  const answeredCount = activeQuizQuestions.filter(q => userAnswers[q.id] !== undefined).length;
                  if (answeredCount === 0) {
                    alert("Vui lòng chọn ít nhất 1 đáp án trước khi nộp bài!");
                    return;
                  }
                  
                  let correctCount = 0;
                  activeQuizQuestions.forEach(item => {
                    if (userAnswers[item.id] === item.correctIndex) {
                      correctCount++;
                    }
                  });

                  if (correctCount >= Math.ceil(activeQuizQuestions.length * 0.7)) {
                    playSound.correct();
                  } else {
                    playSound.wrong();
                  }

                  setCheckedQuestionIds(prev => {
                    const next = new Set(prev);
                    activeQuizQuestions.forEach(q => next.add(q.id));
                    return next;
                  });
                  setIsAllSubmitted(true);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-black text-sm shadow-xl flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
              >
                <Trophy className="w-5 h-5 text-amber-300" />
                <span>
                  Nộp Bài Tập {quizSelectedLesson === "all" ? "26 Bài" : `Bài ${quizSelectedLesson}`} & Chấm Điểm ({activeQuizQuestions.filter(q => userAnswers[q.id] !== undefined).length}/{activeQuizQuestions.length})
                </span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: FLASHCARD LẶP LẠI NGẮT QUÃNG & PHẢN XẠ */}
      {activeTab === "flashcard" && (
        <div className="max-w-3xl mx-auto space-y-6">
          
          {/* Flashcard Settings & Filter Control Box */}
          <div className="bg-white dark:bg-zinc-850 rounded-3xl border border-zinc-200 dark:border-zinc-750 p-5 shadow-sm space-y-4">
            
            {/* Mode Switcher: VN->Structure vs JP->Meaning */}
            <div>
              <div className="text-xs font-black text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-purple-600" />
                <span>Chế độ hiển thị Flashcard</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={() => {
                    playSound.click();
                    setFcDisplayMode("vn_to_structure");
                    setFcFlipped(false);
                  }}
                  className={`p-3 rounded-2xl border-2 text-left transition-all flex items-center justify-between cursor-pointer ${
                    fcDisplayMode === "vn_to_structure"
                      ? "bg-purple-50 dark:bg-purple-950/60 border-purple-600 text-purple-950 dark:text-purple-100 ring-2 ring-purple-500/20 shadow-sm"
                      : "bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:border-purple-300"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                      🇻🇳
                    </span>
                    <div>
                      <div className="text-xs font-black text-zinc-950 dark:text-zinc-50">Mặt trước TV ➔ Mặt sau Cấu trúc</div>
                      <div className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium">Luyện phản xạ cấu trúc từ tiếng Việt</div>
                    </div>
                  </div>
                  {fcDisplayMode === "vn_to_structure" && (
                    <CheckCircle className="w-4 h-4 text-purple-600 shrink-0" />
                  )}
                </button>

                <button
                  onClick={() => {
                    playSound.click();
                    setFcDisplayMode("jp_to_vn");
                    setFcFlipped(false);
                  }}
                  className={`p-3 rounded-2xl border-2 text-left transition-all flex items-center justify-between cursor-pointer ${
                    fcDisplayMode === "jp_to_vn"
                      ? "bg-purple-50 dark:bg-purple-950/60 border-purple-600 text-purple-950 dark:text-purple-100 ring-2 ring-purple-500/20 shadow-sm"
                      : "bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:border-purple-300"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                      🇯🇵
                    </span>
                    <div>
                      <div className="text-xs font-black text-zinc-950 dark:text-zinc-50">Mặt trước Mẫu câu ➔ Mặt sau Ý nghĩa</div>
                      <div className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium">Luyện nhớ ý nghĩa từ mẫu câu Nhật</div>
                    </div>
                  </div>
                  {fcDisplayMode === "jp_to_vn" && (
                    <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0" />
                  )}
                </button>
              </div>
            </div>

            {/* Select Lesson (Chọn bài) & Status & Shuffle Filters */}
            <div className="pt-3 border-t border-zinc-200 dark:border-zinc-700 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              
              {/* Dropdown Chọn Bài */}
              <div className="sm:col-span-6 space-y-1">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-purple-600" />
                  <span>Chọn bài ôn tập:</span>
                </label>
                <select
                  value={fcSelectedLesson}
                  onChange={(e) => {
                    playSound.click();
                    const val = e.target.value === "all" ? "all" : Number(e.target.value);
                    setFcSelectedLesson(val);
                    setFcIndex(0);
                    setFcFlipped(false);
                    setFcShuffledItems(null);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-bold text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer shadow-xs"
                >
                  <option value="all">
                    📚 Tất cả 26 bài học ({SAMPLE_GRAMMAR_N2_DATA.length} mẫu câu)
                  </option>
                  {GRAMMAR_N2_TOPICS.map((topic) => {
                    const count = SAMPLE_GRAMMAR_N2_DATA.filter(g => g.topicId === topic.id).length;
                    return (
                      <option key={topic.id} value={topic.id}>
                        {topic.name} ({count} mẫu)
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Bộ lọc tình trạng thuộc */}
              <div className="sm:col-span-3 space-y-1">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-purple-600" />
                  <span>Tình trạng:</span>
                </label>
                <select
                  value={fcStatusFilter}
                  onChange={(e) => {
                    playSound.click();
                    setFcStatusFilter(e.target.value as any);
                    setFcIndex(0);
                    setFcFlipped(false);
                  }}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-bold text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer shadow-xs"
                >
                  <option value="all">Tất cả ({SAMPLE_GRAMMAR_N2_DATA.length})</option>
                  <option value="unmastered">Chưa thuộc ({SAMPLE_GRAMMAR_N2_DATA.length - masteredIds.size})</option>
                  <option value="mastered">Đã thuộc ({masteredIds.size})</option>
                </select>
              </div>

              {/* Nút Shuffle (Xáo trộn) */}
              <div className="sm:col-span-3 flex items-end gap-2 pt-1 sm:pt-5">
                <button
                  onClick={handleShuffleDeck}
                  title="Xáo trộn ngẫu nhiên thứ tự thẻ"
                  className="flex-1 px-3 py-2.5 rounded-xl bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/60 dark:hover:bg-purple-900 text-purple-900 dark:text-purple-200 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-xs"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>Xáo bài</span>
                </button>
                {fcShuffledItems !== null && (
                  <button
                    onClick={handleResetOrder}
                    title="Đặt lại thứ tự ban đầu"
                    className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

            </div>

          </div>

          {/* Flashcard Header Stats Bar */}
          <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400 font-bold px-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-900 dark:bg-purple-900/60 dark:text-purple-200 font-black">
                {activeFlashcardDeck.length > 0 ? `Thẻ ${fcIndex + 1} / ${activeFlashcardDeck.length}` : "0 thẻ"}
              </span>
              {fcSelectedLesson !== "all" && (
                <span className="hidden sm:inline-block text-purple-700 dark:text-purple-300">
                  • {GRAMMAR_N2_TOPICS.find(t => t.id === fcSelectedLesson)?.name}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] opacity-90">
                Nhấp thẻ hoặc ấn <strong>Space</strong> để lật
              </span>
            </div>
          </div>

          {/* Main Flashcard Card */}
          {activeFlashcardDeck.length > 0 && activeFlashcardDeck[fcIndex] ? (
            (() => {
              const currentItem = activeFlashcardDeck[fcIndex];
              const isMastered = masteredIds.has(currentItem.id);

              return (
                <div
                  onClick={() => {
                    playSound.click();
                    setFcFlipped(!fcFlipped);
                  }}
                  className="w-full min-h-[380px] p-6 sm:p-9 rounded-3xl border-2 border-purple-300 dark:border-purple-800/80 bg-white dark:bg-zinc-850 shadow-xl flex flex-col justify-between items-center text-center cursor-pointer transition-all hover:scale-[1.008] relative overflow-hidden select-none"
                >
                  {/* Background ambient decoration */}
                  <div className="absolute -top-16 -right-16 w-44 h-44 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

                  {/* Card Header tag */}
                  <div className="w-full flex items-center justify-between text-xs gap-2 flex-wrap z-10">
                    <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 dark:bg-purple-900/60 dark:text-purple-200 font-black text-xs">
                      #{currentItem.id} • {currentItem.topicName}
                    </span>

                    <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold text-[11px] border border-zinc-200 dark:border-zinc-700 flex items-center gap-1.5">
                      <RefreshCw className={`w-3 h-3 text-purple-600 transition-transform ${fcFlipped ? "rotate-180" : ""}`} />
                      {fcDisplayMode === "vn_to_structure"
                        ? fcFlipped
                          ? "Mặt sau: Cấu trúc tiếng Nhật (JP)"
                          : "Mặt trước: Ý nghĩa tiếng Việt (VN)"
                        : fcFlipped
                          ? "Mặt sau: Ý nghĩa tiếng Việt (VN)"
                          : "Mặt trước: Mẫu câu tiếng Nhật (JP)"}
                    </span>
                  </div>

                  {/* ========================================================================= */}
                  {/* MODE 1: MẶT TRƯỚC TIẾNG VIỆT, MẶT SAU CẤU TRÚC (VN ➔ STRUCTURE JP) */}
                  {/* ========================================================================= */}
                  {fcDisplayMode === "vn_to_structure" && (
                    <>
                      {/* FRONT SIDE (MẶT TRƯỚC: TIẾNG VIỆT) */}
                      {!fcFlipped ? (
                        <div className="space-y-5 my-auto py-6 max-w-xl z-10 animate-fade-in">
                          <div className="text-xs font-black tracking-wider uppercase text-purple-800 dark:text-purple-300">
                            Ý NGHĨA & BẢN CHẤT NGỮ PHÁP
                          </div>
                          
                          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white leading-tight">
                            {currentItem.meaning}
                          </h2>

                          {currentItem.nuance && (
                            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border-2 border-purple-300 dark:border-purple-800 text-xs text-slate-950 dark:text-slate-100 text-left space-y-1.5 shadow-xs">
                              <div className="font-black text-purple-950 dark:text-purple-200 flex items-center gap-1.5 text-xs">
                                <Sparkles className="w-4 h-4 text-purple-700 dark:text-purple-300" /> Gợi ý sắc thái & Ngữ cảnh:
                              </div>
                              <p className="leading-relaxed font-semibold">{currentItem.nuance}</p>
                            </div>
                          )}

                          <p className="text-xs text-slate-700 dark:text-slate-300 font-black pt-2">
                            💡 Hãy thử nhớ lại: <strong>Mẫu câu tiếng Nhật</strong> và <strong>Công thức kết hợp (接続)</strong> là gì?
                          </p>
                        </div>
                      ) : (
                        /* BACK SIDE (MẶT SAU: CẤU TRÚC & CÔNG THỨC CHIA JP) */
                        <div className="space-y-5 my-auto text-left w-full max-w-xl z-10 animate-fade-in">
                          <div className="flex items-center justify-between border-b-2 pb-3 border-slate-200 dark:border-zinc-700">
                            <div>
                              <div className="text-[11px] font-black uppercase text-purple-800 dark:text-purple-300">
                                MẪU CÂU CHUẨN N2
                              </div>
                              <div className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
                                {currentItem.pattern}
                              </div>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                speakText(currentItem.pattern.replace(/[〜~]/g, ""), e);
                              }}
                              className="p-3 rounded-2xl bg-purple-700 text-white hover:bg-purple-800 cursor-pointer transition-all shadow-sm"
                              title="Phát âm mẫu câu"
                            >
                              <Volume2 className="w-5 h-5" />
                            </button>
                          </div>

                          {/* Cấu trúc kết hợp (接続) - NỔI BẬT */}
                          <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border-2 border-purple-300 dark:border-purple-800 space-y-2.5 shadow-xs">
                            <div className="font-black text-purple-950 dark:text-purple-100 text-xs flex items-center gap-1.5">
                              <Zap className="w-4 h-4 text-amber-600 fill-amber-500" />
                              <span>CÔNG THỨC KẾT HỢP (接続):</span>
                            </div>
                            <div className="space-y-1.5">
                              {currentItem.connection.map((form, fIdx) => (
                                <div
                                  key={fIdx}
                                  className="px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-800 border-2 border-purple-300 dark:border-purple-700 text-xs sm:text-sm font-black font-mono text-slate-950 dark:text-slate-50 shadow-xs"
                                >
                                  {form}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Mẹo thi N2 nếu có */}
                          {currentItem.examTips && (
                            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border-2 border-emerald-400 dark:border-emerald-700 text-xs text-emerald-950 dark:text-emerald-100 space-y-1 font-semibold shadow-xs">
                              <div className="font-black flex items-center gap-1 text-emerald-900 dark:text-emerald-200">
                                <Lightbulb className="w-4 h-4 text-amber-600" /> Mẹo thi JLPT N2 của Thầy Sơn:
                              </div>
                              <p className="leading-relaxed">{currentItem.examTips}</p>
                            </div>
                          )}

                          {/* Ví dụ mẫu */}
                          {currentItem.examples[0] && (
                            <div className="p-3 rounded-2xl bg-slate-100 dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 text-xs space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="font-black text-slate-950 dark:text-white text-sm">{currentItem.examples[0].jp}</p>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    speakText(currentItem.examples[0].jp, e);
                                  }}
                                  className="p-1 text-purple-700 hover:text-purple-900 dark:text-purple-300 dark:hover:text-purple-100"
                                  title="Phát âm ví dụ"
                                >
                                  <Volume2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <p className="text-slate-700 dark:text-slate-300 font-bold">{currentItem.examples[0].vn}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}

                  {/* ========================================================================= */}
                  {/* MODE 2: MẶT TRƯỚC MẪU CÂU, MẶT SAU Ý NGHĨA (JP ➔ MEANING VN) */}
                  {/* ========================================================================= */}
                  {fcDisplayMode === "jp_to_vn" && (
                    <>
                      {/* FRONT SIDE (MẶT TRƯỚC: MẪU CÂU JP) */}
                      {!fcFlipped ? (
                        <div className="space-y-5 my-auto py-6 max-w-xl z-10 animate-fade-in">
                          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
                            {currentItem.pattern}
                          </h2>
                          <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border-2 border-purple-300 dark:border-purple-800 text-xs font-mono text-purple-950 dark:text-purple-100 font-black shadow-xs">
                            {currentItem.connection[0]}
                          </div>
                          <p className="text-xs text-slate-700 dark:text-slate-300 font-black">
                            💡 Hãy thử nhớ lại nghĩa tiếng Việt và bối cảnh sử dụng trước khi lật thẻ!
                          </p>
                        </div>
                      ) : (
                        /* BACK SIDE (MẶT SAU: Ý NGHĨA VN) */
                        <div className="space-y-4 my-auto text-left w-full max-w-xl z-10 animate-fade-in">
                          <div className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white border-b-2 pb-2 border-slate-200 dark:border-zinc-700">
                            {currentItem.meaning}
                          </div>
                          <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-semibold">
                            {currentItem.nuance}
                          </p>
                          {currentItem.examTips && (
                            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border-2 border-emerald-400 dark:border-emerald-700 text-xs text-emerald-950 dark:text-emerald-100 space-y-1 font-semibold shadow-xs">
                              <div className="font-black flex items-center gap-1 text-emerald-900 dark:text-emerald-200">
                                <Lightbulb className="w-4 h-4 text-amber-600" /> Mẹo thi của Thầy Sơn:
                              </div>
                              <p>{currentItem.examTips}</p>
                            </div>
                          )}
                          {currentItem.examples[0] && (
                            <div className="p-3 rounded-2xl bg-slate-100 dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 text-xs space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="font-black text-slate-950 dark:text-white text-sm">{currentItem.examples[0].jp}</p>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    speakText(currentItem.examples[0].jp, e);
                                  }}
                                  className="p-1 text-purple-700 hover:text-purple-900 dark:text-purple-300 dark:hover:text-purple-100"
                                >
                                  <Volume2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <p className="text-slate-700 dark:text-slate-300 font-bold">{currentItem.examples[0].vn}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}

                  {/* Card Footer */}
                  <div className="w-full flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400 pt-4 border-t border-zinc-200 dark:border-zinc-700 z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakText(currentItem.pattern.replace(/[〜~]/g, ""), e);
                      }}
                      className="flex items-center gap-1.5 font-bold text-purple-700 hover:text-purple-900 dark:text-purple-300 dark:hover:text-purple-100 cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" /> Phát âm mẫu câu
                    </button>

                    <button
                      onClick={(e) => toggleMastered(currentItem.id, e)}
                      className={`flex items-center gap-1.5 font-black px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                        isMastered
                          ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/70 dark:text-emerald-100 shadow-2xs"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-zinc-700"
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" /> 
                      {isMastered ? "Đã thuộc" : "Đánh dấu đã thuộc"}
                    </button>
                  </div>

                </div>
              );
            })()
          ) : (
            /* Empty State */
            <div className="p-12 text-center bg-white dark:bg-zinc-850 rounded-3xl border border-zinc-200 dark:border-zinc-750 space-y-4">
              <Layers className="w-12 h-12 text-zinc-400 mx-auto opacity-50" />
              <div className="space-y-1">
                <h3 className="text-base font-black text-zinc-950 dark:text-zinc-50">
                  Không tìm thấy thẻ nào phù hợp
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Vui lòng thử chọn bài học khác hoặc đặt lại bộ lọc tình trạng.
                </p>
              </div>
              <button
                onClick={() => {
                  playSound.click();
                  setFcSelectedLesson("all");
                  setFcStatusFilter("all");
                  setFcShuffledItems(null);
                  setFcIndex(0);
                }}
                className="px-5 py-2 rounded-xl bg-purple-700 text-white font-bold text-xs hover:bg-purple-800 cursor-pointer"
              >
                Xem tất cả các thẻ ({SAMPLE_GRAMMAR_N2_DATA.length})
              </button>
            </div>
          )}

          {/* Bottom Navigation Buttons */}
          {activeFlashcardDeck.length > 0 && (
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  playSound.click();
                  setFcFlipped(false);
                  setFcIndex(prev => (prev > 0 ? prev - 1 : activeFlashcardDeck.length - 1));
                }}
                className="px-5 py-3 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold text-xs flex items-center gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" /> Thẻ Trước (←)
              </button>

              <button
                onClick={() => {
                  playSound.click();
                  setFcFlipped(prev => !prev);
                }}
                className="px-5 py-3 rounded-2xl bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/60 text-purple-900 dark:text-purple-200 font-black text-xs flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <RefreshCw className="w-4 h-4" /> Lật Thẻ (Space)
              </button>

              <button
                onClick={() => {
                  playSound.click();
                  setFcFlipped(false);
                  setFcIndex(prev => (prev < activeFlashcardDeck.length - 1 ? prev + 1 : 0));
                }}
                className="px-5 py-3 rounded-2xl bg-purple-700 text-white font-bold text-xs flex items-center gap-2 hover:bg-purple-800 shadow-md cursor-pointer"
              >
                Thẻ Tiếp (→) <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      )}

      {/* DETAIL MODAL (Khi người dùng nhấp vào xem 1 mẫu ngữ pháp cụ thể) */}
      {selectedGrammar && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-zinc-200 dark:border-zinc-700 shadow-2xl p-6 sm:p-8 space-y-6 relative">
            
            {/* Close button */}
            <button
              onClick={() => setSelectedGrammar(null)}
              className="absolute right-5 top-5 p-2 rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-3 border-b-2 border-slate-200 dark:border-zinc-700 pb-5">
              <span className="text-[11px] font-black uppercase px-3 py-1 rounded-lg bg-purple-700 text-white shadow-xs">
                #{selectedGrammar.id} • {selectedGrammar.topicName}
              </span>
              <div className="flex items-center gap-3">
                <h2 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
                  {selectedGrammar.pattern}
                </h2>
                <button
                  onClick={() => speakText(selectedGrammar.pattern.replace(/[〜~]/g, ""))}
                  className="p-2 rounded-2xl bg-purple-700 text-white hover:bg-purple-800 cursor-pointer shadow-xs transition-all"
                  title="Phát âm"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
              <p className="text-lg font-black text-slate-950 dark:text-slate-100 leading-snug">{selectedGrammar.meaning}</p>
            </div>

            {/* Modal Body: 3 Layers */}
            <div className="space-y-6 text-xs">
              {/* Layer 1: Connection */}
              <div className="space-y-2.5">
                <h4 className="font-black text-purple-900 dark:text-purple-300 uppercase tracking-wider flex items-center gap-1.5 text-xs">
                  <Layers className="w-4 h-4" /> 1. Công Thức Kết Hợp (接続)
                </h4>
                <div className="space-y-1.5">
                  {selectedGrammar.connection.map((c, i) => (
                    <div key={i} className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border-2 border-purple-300 dark:border-purple-800 font-mono text-slate-950 dark:text-purple-100 font-black text-xs sm:text-sm shadow-xs">
                      {c}
                    </div>
                  ))}
                </div>
              </div>

              {/* Layer 2: Nuance & Rules */}
              <div className="space-y-2.5">
                <h4 className="font-black text-purple-900 dark:text-purple-300 uppercase tracking-wider flex items-center gap-1.5 text-xs">
                  <Brain className="w-4 h-4" /> 2. Phân Tích Sắc Thái & Điều Kiện Vế Sau
                </h4>
                <p className="text-slate-900 dark:text-slate-100 font-semibold text-xs leading-relaxed p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700">
                  {selectedGrammar.nuance}
                </p>
                
                {selectedGrammar.ruleConstraints.length > 0 && (
                  <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border-2 border-amber-400 dark:border-amber-700 space-y-1.5 shadow-xs">
                    <div className="font-black text-amber-950 dark:text-amber-200 flex items-center gap-1.5 text-xs">
                      <AlertTriangle className="w-4 h-4 text-amber-600" /> Điều kiện bắt buộc & Cấm kỵ:
                    </div>
                    <ul className="list-disc pl-5 space-y-1 text-slate-950 dark:text-slate-100 font-semibold text-xs leading-relaxed">
                      {selectedGrammar.ruleConstraints.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Layer 3: Exam Tips */}
              {selectedGrammar.examTips && (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border-2 border-emerald-400 dark:border-emerald-700 space-y-1.5 shadow-xs">
                  <div className="font-black text-emerald-950 dark:text-emerald-200 flex items-center gap-1.5 text-xs">
                    <Lightbulb className="w-4 h-4 text-amber-600" /> Mẹo thi JLPT N2 của Thầy Sơn:
                  </div>
                  <p className="text-slate-950 dark:text-slate-100 font-semibold text-xs leading-relaxed">{selectedGrammar.examTips}</p>
                </div>
              )}

              {/* Layer 4: Examples */}
              <div className="space-y-2.5">
                <h4 className="font-black text-purple-900 dark:text-purple-300 uppercase tracking-wider flex items-center gap-1.5 text-xs">
                  <BookOpen className="w-4 h-4" /> 3. Câu Ví Dụ Thực Chiến
                </h4>
                <div className="space-y-2.5">
                  {selectedGrammar.examples.map((ex, i) => (
                    <div key={i} className="p-3.5 rounded-2xl bg-slate-100 dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black text-slate-700 dark:text-slate-300">{ex.context || `Ví dụ ${i + 1}`}</span>
                        <button
                          onClick={() => speakText(ex.jp)}
                          className="p-1 text-purple-700 hover:text-purple-900 dark:text-purple-300 dark:hover:text-purple-100 cursor-pointer"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="font-black text-slate-950 dark:text-white text-sm sm:text-base leading-relaxed">{ex.jp}</p>
                      <p className="text-slate-800 dark:text-slate-300 font-semibold text-xs leading-relaxed">{ex.vn}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-700">
              <button
                onClick={() => toggleMastered(selectedGrammar.id)}
                className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer ${
                  masteredIds.has(selectedGrammar.id)
                    ? "bg-emerald-600 text-white"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {masteredIds.has(selectedGrammar.id) ? "Đã thuộc mẫu này" : "Đánh dấu đã thuộc"}
              </button>

              <button
                onClick={() => setSelectedGrammar(null)}
                className="px-5 py-2 rounded-xl bg-purple-700 text-white font-bold text-xs hover:bg-purple-800 cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
