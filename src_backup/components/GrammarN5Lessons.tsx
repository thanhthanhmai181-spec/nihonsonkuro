import React, { useState, useEffect, useMemo } from "react";
import { playSound } from "../utils/audio";
import { 
  lessonGrammar, 
  lessonDialogues, 
  qData, 
  addFuriganaHtml 
} from "../data/grammarN5Data";
import { 
  ArrowLeft, 
  Volume2, 
  BookOpen, 
  Search, 
  RotateCcw, 
  Sparkles, 
  Layers, 
  List, 
  HelpCircle, 
  ChevronRight, 
  GraduationCap, 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  Info, 
  Moon, 
  Sun, 
  Star,
  Check,
  Undo2,
  BookMarked
} from "lucide-react";

interface GrammarN5LessonsProps {
  onGoBack: () => void;
}

interface ParsedQuestion {
  text: string;
  correct: string;
  opts: string[];
}

export default function GrammarN5Lessons({ onGoBack }: GrammarN5LessonsProps) {
  const [activeTab, setActiveTab] = useState<"theory" | "dialogue" | "quiz" | "flashcard" | "dashboard">("theory");
  const [currentLesson, setCurrentLesson] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [flashcardFilter, setFlashcardFilter] = useState<string>("all");
  
  // Progress states
  const [viewedLessons, setViewedLessons] = useState<Record<number, boolean>>({});
  const [dialoguesRead, setDialoguesRead] = useState<Record<number, boolean>>({});
  const [quizResults, setQuizResults] = useState<Record<number, { done: boolean; score: number }>>({});
  const [rememberedFlashcards, setRememberedFlashcards] = useState<string[]>([]);
  
  // Active quiz states
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);
  const [quizRandomSeed, setQuizRandomSeed] = useState<number>(1); // to force reshuffle on reset

  // Custom Confirm Modal states
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {}
  });

  // Load progress from localStorage on mount and reactive updates
  useEffect(() => {
    const STORAGE_KEY = "sonkuro_n5_grammar_progress_v1";
    const loadFromStorage = () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.viewedLessons) setViewedLessons(parsed.viewedLessons);
          if (parsed.dialoguesRead) setDialoguesRead(parsed.dialoguesRead);
          if (parsed.quizResults) setQuizResults(parsed.quizResults);
          if (parsed.rememberedFlashcards) setRememberedFlashcards(parsed.rememberedFlashcards);
        } catch (e) {
          console.error("Failed to load grammar progress:", e);
        }
      }
    };

    loadFromStorage();

    const handleStorageChange = (e: any) => {
      const key = e.detail?.key || e.key;
      if (!key || key === STORAGE_KEY) {
        loadFromStorage();
      }
    };

    window.addEventListener("local-storage-changed" as any, handleStorageChange);
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("local-storage-changed" as any, handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Save progress helper safely merging with latest localStorage
  const saveProgress = (updates: {
    viewedLessons?: Record<number, boolean>;
    dialoguesRead?: Record<number, boolean>;
    quizResults?: Record<number, { done: boolean; score: number }>;
    rememberedFlashcards?: string[];
  }) => {
    const STORAGE_KEY = "sonkuro_n5_grammar_progress_v1";
    
    // Read latest saved object to prevent overwriting cloud sync
    let latestSaved: any = {};
    const savedStr = localStorage.getItem(STORAGE_KEY);
    if (savedStr) {
      try { latestSaved = JSON.parse(savedStr); } catch (e) {}
    }

    const currentViewed = updates.viewedLessons !== undefined ? updates.viewedLessons : { ...latestSaved.viewedLessons, ...viewedLessons };
    const currentDialogues = updates.dialoguesRead !== undefined ? updates.dialoguesRead : { ...latestSaved.dialoguesRead, ...dialoguesRead };
    const currentQuizzes = updates.quizResults !== undefined ? updates.quizResults : { ...latestSaved.quizResults, ...quizResults };
    
    let currentFlashcards = rememberedFlashcards;
    if (updates.rememberedFlashcards !== undefined) {
      currentFlashcards = updates.rememberedFlashcards;
    } else if (Array.isArray(latestSaved.rememberedFlashcards)) {
      currentFlashcards = Array.from(new Set([...latestSaved.rememberedFlashcards, ...rememberedFlashcards]));
    }

    const current = {
      viewedLessons: currentViewed,
      dialoguesRead: currentDialogues,
      quizResults: currentQuizzes,
      rememberedFlashcards: currentFlashcards,
    };
    
    setViewedLessons(current.viewedLessons);
    setDialoguesRead(current.dialoguesRead);
    setQuizResults(current.quizResults);
    setRememberedFlashcards(current.rememberedFlashcards);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  };

  // Set lesson read on view
  useEffect(() => {
    if (activeTab === "theory" && !viewedLessons[currentLesson]) {
      const updated = { ...viewedLessons, [currentLesson]: true };
      saveProgress({ viewedLessons: updated });
    }
    if (activeTab === "dialogue" && !dialoguesRead[currentLesson]) {
      const updated = { ...dialoguesRead, [currentLesson]: true };
      saveProgress({ dialoguesRead: updated });
    }
  }, [currentLesson, activeTab]);

  // Handle Tab Switch Click
  const handleTabChange = (tab: "theory" | "dialogue" | "quiz" | "flashcard" | "dashboard") => {
    playSound.click();
    setActiveTab(tab);
    if (tab === "quiz") {
      // Reset quiz local answer state for this lesson if not submitted
      const results = quizResults[currentLesson];
      if (!results || !results.done) {
        setQuizAnswers({});
        setIsQuizSubmitted(false);
      } else {
        setIsQuizSubmitted(true);
      }
    }
  };

  // TTS Speech Synthesis
  const speak = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    
    // Clean text of html tags and speaker indicators (A:, B:, etc.)
    const cleanText = text
      .replace(/^[A-Za-z]:\s*/, "")
      .replace(/<rt>.*?<\/rt>/g, "")
      .replace(/<[^>]*>/g, "");
      
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "ja-JP";
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  // Quiz parsing
  const parsedQuizQuestions = useMemo(() => {
    const raw = qData[currentLesson];
    if (!raw) return [];
    
    const questions: ParsedQuestion[] = [];
    const categories: ("p" | "v" | "g")[] = ["p", "v", "g"];
    
    categories.forEach(cat => {
      const list = raw[cat] || [];
      list.forEach((qStr, idx) => {
        const parts = qStr.split("|");
        if (parts.length >= 3) {
          const text = parts[0];
          const correct = parts[1];
          const wrongOptions = parts[2].split(",");
          
          // Re-shuffling is seeded to prevent random jumpiness during render
          const combined = [...wrongOptions, correct];
          // Simple deterministic shuffle using currentLesson + seed + index
          const seededShuffle = combined.map((value, i) => ({ value, sort: Math.sin(currentLesson + quizRandomSeed + idx + i) }))
            .sort((a, b) => a.sort - b.sort)
            .map(item => item.value);

          questions.push({
            text,
            correct,
            opts: seededShuffle
          });
        }
      });
    });
    
    return questions;
  }, [currentLesson, quizRandomSeed]);

  // Flashcards generator
  const allFlashcards = useMemo(() => {
    const cards: { lesson: number; index: number; pattern: string; meaning: string; examples: any[] }[] = [];
    for (let i = 1; i <= 25; i++) {
      const gList = lessonGrammar[i] || [];
      gList.forEach((g, idx) => {
        cards.push({
          lesson: i,
          index: idx,
          pattern: g.pattern,
          meaning: g.meaning,
          examples: g.examples || []
        });
      });
    }
    return cards;
  }, []);

  const filteredFlashcards = useMemo(() => {
    return allFlashcards.filter(c => flashcardFilter === "all" || c.lesson === Number(flashcardFilter));
  }, [allFlashcards, flashcardFilter]);

  const toggleFlashcardMem = (key: string) => {
    playSound.click();
    let updated: string[];
    if (rememberedFlashcards.includes(key)) {
      updated = rememberedFlashcards.filter(k => k !== key);
    } else {
      updated = [...rememberedFlashcards, key];
    }
    saveProgress({ rememberedFlashcards: updated });
  };

  // Global percentages
  const progressStats = useMemo(() => {
    const totalLessons = 25;
    const totalTasks = totalLessons * 3; // 25 theory, 25 dialogue, 25 quiz
    
    const vCount = Object.keys(viewedLessons).filter(k => viewedLessons[Number(k)]).length;
    const dCount = Object.keys(dialoguesRead).filter(k => dialoguesRead[Number(k)]).length;
    const qCount = Object.keys(quizResults).filter(k => quizResults[Number(k)]?.done).length;
    
    const completedTasks = vCount + dCount + qCount;
    const percentage = Math.round((completedTasks / totalTasks) * 100) || 0;
    
    return {
      vCount,
      dCount,
      qCount,
      percentage,
      totalCount: totalTasks,
      completedTasks
    };
  }, [viewedLessons, dialoguesRead, quizResults]);

  // Submit quiz function
  const handleQuizSubmit = () => {
    const missed = parsedQuizQuestions.length - Object.keys(quizAnswers).length;
    
    const submitAction = () => {
      let score = 0;
      parsedQuizQuestions.forEach((q, idx) => {
        if (quizAnswers[idx] === q.correct) {
          score++;
        }
      });
      
      const updatedResults = {
        ...quizResults,
        [currentLesson]: { done: true, score }
      };
      
      saveProgress({ quizResults: updatedResults });
      setIsQuizSubmitted(true);
      playSound.correct();
      
      // Scroll to quiz title
      const elem = document.getElementById("quiz-title-anchor");
      if (elem) elem.scrollIntoView({ behavior: "smooth" });
    };

    if (missed > 0) {
      setConfirmModal({
        isOpen: true,
        title: "Chưa hoàn thành đề",
        message: `Vẫn còn ${missed} câu hỏi chưa có câu trả lời. Bạn có chắc chắn muốn nộp bài ngay để chấm điểm không?`,
        onConfirm: () => {
          setConfirmModal(prev => ({ ...prev, isOpen: false }));
          submitAction();
        }
      });
    } else {
      submitAction();
    }
  };

  // Reset/retry quiz
  const handleQuizReset = () => {
    setConfirmModal({
      isOpen: true,
      title: "Làm lại đề",
      message: "Bạn có chắc chắn muốn xoá toàn bộ đáp án hiện tại và thi lại đề Bài này không?",
      onConfirm: () => {
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
        setQuizAnswers({});
        setIsQuizSubmitted(false);
        setQuizRandomSeed(prev => prev + 1); // Tráo lại đề
        
        const updatedResults = { ...quizResults };
        delete updatedResults[currentLesson];
        saveProgress({ quizResults: updatedResults });
        
        playSound.click();
      }
    });
  };

  return (
    <div className="washi-pattern min-h-screen p-4 sm:p-8 -mx-4 sm:-mx-8 rounded-[40px] border-2 border-[#1A1A1A] text-[#1A1A1A]" style={{ fontFamily: "'Lora', 'Noto Serif JP', serif" }}>
      
      {/* Sub Navigation Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b-2 border-[#1A1A1A] pb-4 gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playSound.click();
              onGoBack();
            }}
            className="p-2 border-2 border-[#1A1A1A] bg-white rounded-xl shadow-[2px_2px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none hover:text-[#8B0000] cursor-pointer transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-9 h-9 border-2 border-[#1A1A1A] bg-[#1A1A1A] rounded flex items-center justify-center text-white font-black text-lg" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            法
          </div>
          <div>
            <span className="text-lg font-black tracking-widest text-[#1A1A1A] block leading-none" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              NGỮ PHÁP N5
            </span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Bí Kíp Học Thuật Chuyên Sâu
            </span>
          </div>
        </div>

        {/* Global Progress Gauge */}
        <div className="flex items-center gap-3 bg-white px-4 py-2 border-2 border-[#1A1A1A] rounded-2xl">
          <div className="text-right">
            <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Tiến Độ Đại Hải Trình</span>
            <span className="text-sm font-black text-[#8B0000]">{progressStats.percentage}%</span>
          </div>
          <div className="w-20 sm:w-24 bg-slate-100 border border-[#1A1A1A] h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-[#8B0000] h-full rounded-full transition-all duration-500" 
              style={{ width: `${progressStats.percentage}%` }}
            ></div>
          </div>
        </div>

        {/* Study Mode/Tabs selector */}
        <div className="flex bg-slate-100 p-1 rounded-2xl border-2 border-[#1A1A1A] max-w-full overflow-x-auto">
          {[
            { id: "theory", label: "Lý thuyết", icon: <BookOpen className="w-4 h-4" /> },
            { id: "dialogue", label: "Hội thoại", icon: <Layers className="w-4 h-4" /> },
            { id: "quiz", label: "Trắc nghiệm", icon: <HelpCircle className="w-4 h-4" /> },
            { id: "flashcard", label: "Flashcards", icon: <Sparkles className="w-4 h-4" /> },
            { id: "dashboard", label: "Tiến độ", icon: <Trophy className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id 
                  ? "bg-[#1A1A1A] text-white" 
                  : "text-[#1A1A1A] hover:bg-black/10"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Study Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Sidebar for Selectable Lessons 1-25 */}
        {activeTab !== "flashcard" && activeTab !== "dashboard" && (
          <div className="lg:col-span-1 bg-white p-4 border-2 border-[#1A1A1A] rounded-2xl shadow-[3px_3px_0px_#1A1A1A] sticky top-24">
            
            {activeTab === "theory" && (
              <div className="mb-4">
                <span className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5">Tìm nhanh mẫu</span>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Mẫu câu hoặc nghĩa..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-1.5 pl-8 text-xs font-bold border-2 border-slate-200 focus:border-[#8B0000] rounded-xl outline-none"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                </div>
              </div>
            )}

            <span className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-1">
              Bản Đồ 25 Bài Học
            </span>

            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-2 gap-2 max-h-[350px] overflow-y-auto pr-1">
              {Array.from({ length: 25 }, (_, i) => i + 1).map((num) => {
                const isSelected = currentLesson === num;
                
                // check task completions
                const isTheoryDone = viewedLessons[num];
                const isDialogueDone = dialoguesRead[num];
                const quizScoreObj = quizResults[num];
                const isQuizDone = quizScoreObj?.done;

                return (
                  <button
                    key={num}
                    onClick={() => {
                      playSound.click();
                      setCurrentLesson(num);
                      // If on quiz tab, reset/load answers for the clicked lesson
                      if (activeTab === "quiz") {
                        setQuizAnswers({});
                        setIsQuizSubmitted(quizResults[num]?.done || false);
                      }
                    }}
                    className={`py-2 px-1 text-center border-2 rounded-xl transition-all cursor-pointer font-bold text-xs flex flex-col items-center justify-between ${
                      isSelected
                        ? "bg-[#8B0000] border-[#1A1A1A] text-white shadow-[2px_2px_0px_#1A1A1A]"
                        : "bg-[#FDFBF7] border-slate-200 hover:border-[#1A1A1A] text-[#1A1A1A]"
                    }`}
                  >
                    <span>Bài {num}</span>
                    <div className="flex gap-1.5 mt-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${isTheoryDone ? "bg-green-500" : "bg-slate-200"}`} title="Thuyết"></span>
                      <span className={`w-1.5 h-1.5 rounded-full ${isDialogueDone ? "bg-cyan-500" : "bg-slate-200"}`} title="Thoại"></span>
                      <span className={`w-1.5 h-1.5 rounded-full ${isQuizDone ? "bg-yellow-500" : "bg-slate-200"}`} title="Đề"></span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Content Stages */}
        <div className={activeTab === "flashcard" || activeTab === "dashboard" ? "lg:col-span-4 w-full" : "lg:col-span-3 w-full"}>
          
          {/* ================= THEORY TAB ================= */}
          {activeTab === "theory" && (
            <div className="space-y-6">
              <div className="bg-white p-6 border-2 border-[#1A1A1A] rounded-3xl shadow-[4px_4px_0px_#1A1A1A]">
                <div className="border-b-2 border-slate-100 pb-3 mb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                  <div>
                    <h2 className="text-2xl font-black text-slate-800" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                      Bài {currentLesson}: Chinh phục lý thuyết
                    </h2>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                      Khai thông thần trí với cấu trúc và ví dụ cốt lõi
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-amber-50 text-[#8B0000] text-xs font-black rounded-full border border-amber-200 self-start sm:self-center">
                    {(lessonGrammar[currentLesson] || []).length} cấu trúc
                  </span>
                </div>

                <div className="space-y-8">
                  {(lessonGrammar[currentLesson] || [])
                    .filter(g => {
                      if (!searchQuery) return true;
                      const q = searchQuery.toLowerCase().trim();
                      return g.pattern.toLowerCase().includes(q) || g.meaning.toLowerCase().includes(q);
                    })
                    .map((point, gIdx) => (
                      <div 
                        key={gIdx} 
                        className="p-5 border-2 border-slate-100 hover:border-[#8B0000] transition rounded-2xl bg-[#FDFBF7]/40 space-y-4"
                      >
                        {/* Title Pattern Badge */}
                        <div className="flex items-center gap-3 border-b pb-2">
                          <span className="bg-[#8B0000] text-white text-[10px] font-black px-2.5 py-1 rounded-full">
                            MẪU {gIdx + 1}
                          </span>
                          <span className="text-lg font-black tracking-tight text-slate-800">
                            {point.pattern}
                          </span>
                        </div>

                        {/* Meaning banner */}
                        <div className="p-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700">
                          Ý nghĩa: <span className="text-[#8B0000]">{point.meaning}</span>
                        </div>

                        {/* Examples */}
                        <div className="space-y-3">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                            Ví Dụ Điển Hình
                          </span>
                          <div className="grid grid-cols-1 gap-3">
                            {point.examples.map((ex, eIdx) => (
                              <div 
                                key={eIdx} 
                                className="bg-white p-4 border border-slate-200 hover:border-slate-400 rounded-xl flex justify-between items-start gap-4 transition"
                              >
                                <div className="space-y-1.5">
                                  <div 
                                    className="text-base sm:text-lg font-black text-slate-800 leading-normal"
                                    dangerouslySetInnerHTML={{ __html: addFuriganaHtml(ex.jp) }}
                                  ></div>
                                  <div className="text-xs text-slate-400 font-bold flex items-center gap-1">
                                    <ChevronRight className="w-3 h-3 text-[#8B0000]" />
                                    <span>{ex.vn}</span>
                                  </div>
                                </div>
                                <button
                                  onClick={() => speak(ex.jp)}
                                  className="p-2 border border-slate-200 hover:bg-[#8B0000] hover:text-white rounded-lg transition-all cursor-pointer text-slate-600 shrink-0 shadow-inner"
                                >
                                  <Volume2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Guidance note */}
                        <div className="bg-amber-50/50 p-4 border border-dashed border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed flex items-start gap-2">
                          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <strong className="block text-amber-800 font-bold mb-0.5">Chú ý</strong>
                            <span>{point.note}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  
                  {searchQuery && (lessonGrammar[currentLesson] || []).filter(g => {
                    const q = searchQuery.toLowerCase().trim();
                    return g.pattern.toLowerCase().includes(q) || g.meaning.toLowerCase().includes(q);
                  }).length === 0 && (
                    <p className="text-center text-slate-400 py-10 font-bold text-xs">
                      Không tìm thấy cấu trúc ngữ pháp nào khớp với từ khóa "{searchQuery}".
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ================= DIALOGUE TAB ================= */}
          {activeTab === "dialogue" && (
            <div className="space-y-6 animate-in fade-in">
              <div className="bg-white p-6 border-2 border-[#1A1A1A] rounded-3xl shadow-[4px_4px_0px_#1A1A1A]">
                <div className="border-b-2 border-slate-100 pb-3 mb-6">
                  <h2 className="text-2xl font-black text-slate-800" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                    Bài {currentLesson}: Hội thoại thực chiến
                  </h2>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                    Đóng vai và thẩm thấu ngữ pháp trong tình huống hằng ngày
                  </p>
                </div>

                <div className="space-y-8">
                  {(lessonDialogues[currentLesson] || []).map((dialogue, idx) => (
                    <div 
                      key={idx} 
                      className="p-5 border-2 border-slate-100 rounded-2xl bg-[#FDFBF7]/30 space-y-4 relative"
                    >
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="text-xs font-black text-[#8B0000] uppercase tracking-widest flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#8B0000]"></span>
                          TÌNH HUỐNG {idx + 1}
                        </span>
                        <button
                          onClick={() => speak(dialogue.jp)}
                          className="px-3 py-1 text-xs border border-slate-200 rounded-xl hover:bg-[#8B0000] hover:text-white transition flex items-center gap-1.5 cursor-pointer text-slate-600 font-bold shadow-sm"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Nghe Toàn Bộ</span>
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div className="p-4 bg-white border border-slate-100 rounded-xl shadow-inner space-y-2.5">
                          <div 
                            className="text-base sm:text-lg font-black text-slate-800 leading-normal"
                            dangerouslySetInnerHTML={{ __html: addFuriganaHtml(dialogue.jp) }}
                          ></div>
                          
                          <div className="border-t border-dashed border-slate-100 pt-2 text-xs sm:text-sm text-slate-500 font-semibold italic flex items-center gap-1.5">
                            <BookMarked className="w-4 h-4 text-slate-400 shrink-0" />
                            <span>Bản dịch: {dialogue.vn}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= QUIZ TAB ================= */}
          {activeTab === "quiz" && (
            <div className="space-y-6 animate-in fade-in">
              <div className="bg-white p-6 border-2 border-[#1A1A1A] rounded-3xl shadow-[4px_4px_0px_#1A1A1A]">
                
                {/* Header info */}
                <div 
                  id="quiz-title-anchor"
                  className="border-b-2 border-slate-100 pb-4 mb-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4"
                >
                  <div>
                    <h2 className="text-2xl font-black text-slate-800" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                      Bài {currentLesson}: Sát hạch năng lực (30 câu)
                    </h2>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                      10 trợ từ · 10 từ vựng · 10 chia thể & ngữ pháp
                    </p>
                  </div>
                  
                  {isQuizSubmitted ? (
                    <div className="px-4 py-2 bg-green-50 border border-green-200 text-green-700 font-black text-sm rounded-xl flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-green-600" />
                      <span>Điểm: {quizResults[currentLesson]?.score || 0} / 30</span>
                    </div>
                  ) : (
                    <span className="px-4 py-2 bg-slate-50 border border-slate-200 text-slate-500 font-bold text-xs rounded-xl">
                      Đang làm bài...
                    </span>
                  )}
                </div>

                {/* Questions render */}
                <div className="space-y-8">
                  {parsedQuizQuestions.map((q, idx) => {
                    const isCorrect = quizAnswers[idx] === q.correct;
                    const selected = quizAnswers[idx];

                    return (
                      <div 
                        key={idx} 
                        className={`p-5 rounded-2xl border-2 transition ${
                          isQuizSubmitted 
                            ? isCorrect 
                              ? "bg-green-50/20 border-green-200" 
                              : "bg-red-50/20 border-red-200"
                            : "bg-[#FDFBF7]/30 border-slate-100"
                        }`}
                      >
                        {/* Part Headers separator */}
                        {idx === 0 && (
                          <div className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-[10px] font-black uppercase tracking-widest mb-4 border border-indigo-100 inline-block">
                            Phần I: Chọn Trợ Từ (Cầu 1-10)
                          </div>
                        )}
                        {idx === 10 && (
                          <div className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-[10px] font-black uppercase tracking-widest mb-4 border border-indigo-100 inline-block">
                            Phần II: Chọn Từ Vựng (Cầu 11-20)
                          </div>
                        )}
                        {idx === 20 && (
                          <div className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-[10px] font-black uppercase tracking-widest mb-4 border border-indigo-100 inline-block">
                            Phần III: Ngữ Pháp & Chia Thể (Cầu 21-30)
                          </div>
                        )}

                        {/* Question Text */}
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 text-slate-600 font-bold text-xs flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <div 
                            className="text-base font-black text-slate-800 leading-normal"
                            dangerouslySetInnerHTML={{ __html: addFuriganaHtml(q.text) }}
                          ></div>
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 ml-9">
                          {q.opts.map((opt, oIdx) => {
                            const isOptSelected = selected === opt;
                            
                            let optionStyle = "border-slate-200 bg-white hover:border-[#1A1A1A] cursor-pointer";
                            if (isQuizSubmitted) {
                              if (opt === q.correct) {
                                optionStyle = "border-green-500 bg-green-50 text-green-700 font-black cursor-not-allowed";
                              } else if (isOptSelected) {
                                optionStyle = "border-red-400 bg-red-50 text-red-700 font-bold cursor-not-allowed";
                              } else {
                                optionStyle = "border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed";
                              }
                            } else if (isOptSelected) {
                              optionStyle = "border-[#8B0000] bg-[#8B0000]/5 text-[#8B0000] font-black scale-[1.02]";
                            }

                            return (
                              <button
                                key={oIdx}
                                disabled={isQuizSubmitted}
                                onClick={() => {
                                  playSound.click();
                                  setQuizAnswers(prev => ({ ...prev, [idx]: opt }));
                                }}
                                className={`p-3 text-center border-2 rounded-xl text-xs font-bold transition-all ${optionStyle}`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {/* Correction banner */}
                        {isQuizSubmitted && (
                          <div className={`mt-3 ml-9 p-3 rounded-xl border text-xs font-bold flex items-start gap-2 ${
                            isCorrect 
                              ? "bg-green-50 text-green-700 border-green-200" 
                              : "bg-red-50 text-red-700 border-red-200"
                          }`}>
                            {isCorrect ? (
                              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                            )}
                            <div>
                              <span>{isCorrect ? "ĐÚNG" : "SAI"}</span>
                              <span className="text-slate-500 ml-1.5 font-normal">
                                - Đáp án chính xác: <strong className="text-slate-800">{q.correct}</strong>
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Submissions actions */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-4">
                  {!isQuizSubmitted ? (
                    <button
                      onClick={handleQuizSubmit}
                      className="px-6 py-3.5 bg-[#8B0000] text-white font-black rounded-xl border border-[#1A1A1A] shadow-[3px_3px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none uppercase tracking-wider text-xs sm:text-sm cursor-pointer transition flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Nộp Bài Đại Sát Hạch
                    </button>
                  ) : (
                    <button
                      onClick={handleQuizReset}
                      className="px-6 py-3.5 bg-white text-[#1A1A1A] font-black rounded-xl border-2 border-[#1A1A1A] shadow-[3px_3px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none uppercase tracking-wider text-xs sm:text-sm cursor-pointer transition flex items-center gap-2 hover:bg-slate-50"
                    >
                      <Undo2 className="w-4 h-4" />
                      Làm Lại Đề Này (Tráo đề)
                    </button>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* ================= FLASHCARDS TAB ================= */}
          {activeTab === "flashcard" && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex flex-col items-center gap-6">
                
                {/* Selector filter */}
                <div className="bg-white p-4 border-2 border-[#1A1A1A] rounded-2xl shadow-[2px_2px_0px_#1A1A1A] flex items-center gap-3">
                  <span className="text-xs font-black text-slate-500 uppercase tracking-widest">
                    Lọc thẻ Bài học:
                  </span>
                  <select
                    value={flashcardFilter}
                    onChange={(e) => {
                      playSound.click();
                      setFlashcardFilter(e.target.value);
                    }}
                    className="bg-[#FDFBF7] border-2 border-slate-200 rounded-xl text-xs font-bold p-1.5 focus:border-[#8B0000] outline-none"
                  >
                    <option value="all">Tất cả 25 Bài học</option>
                    {Array.from({ length: 25 }, (_, i) => i + 1).map(num => (
                      <option key={num} value={num}>Bài {num}</option>
                    ))}
                  </select>
                </div>

                {/* Grid of flashcards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                  {filteredFlashcards.slice(0, 60).map((card, idx) => {
                    const cardKey = `${card.lesson}_${card.index}`;
                    const isRemembered = rememberedFlashcards.includes(cardKey);

                    return (
                      <FlashcardFlipItem 
                        key={idx}
                        card={card}
                        cardKey={cardKey}
                        isRemembered={isRemembered}
                        toggleRemembered={toggleFlashcardMem}
                        onSpeak={speak}
                      />
                    );
                  })}
                </div>

                {filteredFlashcards.length > 60 && (
                  <p className="text-center text-xs font-bold text-slate-400 py-4">
                    Chỉ hiển thị tối đa 60 thẻ. Hãy chọn Bài học cụ thể để dễ dàng tu luyện từng mẫu!
                  </p>
                )}

              </div>
            </div>
          )}

          {/* ================= DASHBOARD TAB ================= */}
          {activeTab === "dashboard" && (
            <div className="space-y-8 animate-in fade-in">
              <div className="bg-white p-6 border-2 border-[#1A1A1A] rounded-3xl shadow-[4px_4px_0px_#1A1A1A] space-y-6">
                <div className="border-b-2 border-slate-100 pb-3">
                  <h2 className="text-2xl font-black text-slate-800" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                    Bảng Thống Kê Tu Luyện Ngữ Pháp
                  </h2>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                    Tổng kết thành tựu luyện kiếm ngữ pháp N5
                  </p>
                </div>

                {/* Mini metrics cards grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-[#FDFBF7] p-5 border-2 border-[#1A1A1A] rounded-2xl text-center space-y-1">
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">LÝ THUYẾT ĐÃ ĐỌC</span>
                    <span className="text-2xl font-black text-slate-800">{progressStats.vCount} / 25</span>
                    <span className="block text-[10px] font-bold text-green-600">Đạt {Math.round(progressStats.vCount/25*100)}%</span>
                  </div>

                  <div className="bg-[#FDFBF7] p-5 border-2 border-[#1A1A1A] rounded-2xl text-center space-y-1">
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">HỘI THOẠI ĐÃ ĐỌC</span>
                    <span className="text-2xl font-black text-slate-800">{progressStats.dCount} / 25</span>
                    <span className="block text-[10px] font-bold text-green-600">Đạt {Math.round(progressStats.dCount/25*100)}%</span>
                  </div>

                  <div className="bg-[#FDFBF7] p-5 border-2 border-[#1A1A1A] rounded-2xl text-center space-y-1">
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">SÁT HẠCH ĐÃ NỘP</span>
                    <span className="text-2xl font-black text-slate-800">{progressStats.qCount} / 25</span>
                    <span className="block text-[10px] font-bold text-green-600">Đạt {Math.round(progressStats.qCount/25*100)}%</span>
                  </div>

                  <div className="bg-[#FDFBF7] p-5 border-2 border-[#1A1A1A] rounded-2xl text-center space-y-1">
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">THẺ ĐÃ THUỘC</span>
                    <span className="text-2xl font-black text-slate-800">{rememberedFlashcards.length}</span>
                    <span className="block text-[10px] font-bold text-slate-400">Đã lưu trữ srs</span>
                  </div>
                </div>

                {/* Subsections of lessons quiz progress list */}
                <div className="space-y-4">
                  <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                    <List className="w-5 h-5 text-[#8B0000]" />
                    <span>Lịch Sử Thi Thử Trắc Nghiệm</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[380px] overflow-y-auto pr-1">
                    {Array.from({ length: 25 }, (_, i) => i + 1).map(num => {
                      const res = quizResults[num];
                      const isDone = res && res.done;

                      return (
                        <div 
                          key={num} 
                          className={`p-4 border-2 rounded-2xl flex justify-between items-center transition ${
                            isDone 
                              ? "bg-green-50/20 border-green-200" 
                              : "bg-white border-slate-100"
                          }`}
                        >
                          <div>
                            <span className="block font-black text-sm text-slate-800">Bài học {num}</span>
                            <span className="block text-xs text-slate-400 font-bold mt-0.5">
                              {isDone ? `Đã nộp bài: ${res.score}/30đ (${Math.round(res.score/30*100)}%)` : "Chưa hoàn thành"}
                            </span>
                          </div>
                          
                          <button
                            onClick={() => {
                              playSound.click();
                              setCurrentLesson(num);
                              handleTabChange("quiz");
                            }}
                            className="px-3 py-1.5 bg-slate-50 border border-slate-200 hover:border-[#1A1A1A] rounded-xl text-xs font-bold text-slate-600 hover:text-slate-800 transition cursor-pointer"
                          >
                            Vào thi
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>

      {/* traditional footer signature */}
      <div className="mt-12 text-center text-[#b2917a] text-xs font-bold border-t border-[#e4d3c3] pt-6 flex items-center justify-center gap-1">
        <GraduationCap className="w-4 h-4" />
        <span>Học Cùng Thầy Sơn — Đệ Nhất Kiếm Pháp Phát Âm Chuẩn Học Thuật Nhật Bản</span>
      </div>

      {/* CUSTOM CONFIRM MODAL COMPONENT */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 z-[100] flex items-center justify-center animate-in fade-in duration-200 p-4">
          <div className="bg-white p-6 rounded-3xl max-w-md w-full border-4 border-[#1A1A1A] shadow-[6px_6px_0px_#1A1A1A] animate-in zoom-in-95">
            <div className="flex items-center gap-3 text-[#8B0000] mb-4">
              <div className="bg-red-50 p-2 rounded-xl border border-red-200">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-800">
                {confirmModal.title}
              </h3>
            </div>
            
            <p className="text-slate-600 text-sm font-semibold mb-6 leading-relaxed">
              {confirmModal.message}
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  playSound.click();
                  setConfirmModal(prev => ({ ...prev, isOpen: false }));
                }}
                className="px-4 py-2 border-2 border-slate-200 hover:border-[#1A1A1A] bg-white rounded-xl text-xs font-bold text-slate-600 transition cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                onClick={confirmModal.onConfirm}
                className="px-5 py-2 bg-[#8B0000] text-white border border-[#1A1A1A] hover:bg-[#a60000] rounded-xl text-xs font-black transition cursor-pointer"
              >
                Đồng ý
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Subcomponent representing a flip flashcard item to prevent excessive nesting and clean design
interface FlashcardFlipItemProps {
  key?: any;
  card: {
    lesson: number;
    index: number;
    pattern: string;
    meaning: string;
    examples: any[];
  };
  cardKey: string;
  isRemembered: boolean;
  toggleRemembered: (key: string) => void;
  onSpeak: (text: string) => void;
}

function FlashcardFlipItem({ card, cardKey, isRemembered, toggleRemembered, onSpeak }: FlashcardFlipItemProps) {
  const [flipped, setFlipped] = useState<boolean>(false);

  return (
    <div 
      onClick={() => {
        playSound.flip();
        setFlipped(!flipped);
      }}
      className="h-[310px] w-full relative group cursor-pointer perspective-1000"
    >
      <div 
        className={`w-full h-full duration-500 transform-style-3d transition-transform ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front side of the card */}
        <div className="absolute inset-0 bg-white border-2 border-[#1A1A1A] rounded-2xl p-5 flex flex-col justify-between hover:border-[#8B0000] transition backface-hidden shadow-[2px_2px_0px_#1A1A1A]">
          <div className="flex justify-between items-center">
            <span className="bg-amber-50 text-[#8B0000] font-black text-[10px] px-2.5 py-1 rounded-full border border-amber-100">
              Bài {card.lesson}
            </span>
            {isRemembered && (
              <span className="text-[10px] bg-green-50 border border-green-200 text-green-700 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                ✓ Thuộc
              </span>
            )}
          </div>

          <div className="text-center my-auto space-y-2">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Ý Nghĩa Cấu Trúc</span>
            <p className="text-base font-black text-slate-800 leading-snug">
              {card.meaning}
            </p>
          </div>

          <span className="text-center text-[10px] font-bold text-slate-400 border-t pt-2 block">
            Bấm lật xem cấu trúc
          </span>
        </div>

        {/* Back side of the card */}
        <div className="absolute inset-0 bg-slate-900 border-2 border-[#1A1A1A] text-white rounded-2xl p-5 flex flex-col justify-between rotate-y-180 backface-hidden shadow-[2px_2px_0px_#1A1A1A]">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <span className="text-[9px] font-black text-amber-400 uppercase tracking-widest">
              CẤU TRÚC
            </span>
            <span className="text-xs font-black font-mono text-cyan-400">
              {card.pattern}
            </span>
          </div>

          <div className="my-auto space-y-2.5">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block text-center">Ví dụ mẫu</span>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-left space-y-1 relative">
              <p 
                className="text-sm font-bold text-slate-200 pr-7 leading-normal"
                dangerouslySetInnerHTML={{ __html: addFuriganaHtml(card.examples[0]?.jp || "") }}
              ></p>
              <p className="text-[11px] text-slate-400 italic">
                {card.examples[0]?.vn || ""}
              </p>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSpeak(card.examples[0]?.jp || "");
                }}
                className="absolute right-2 top-2 p-1 text-slate-400 hover:text-white bg-slate-700 rounded-md transition"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center border-t border-slate-800 pt-2.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleRemembered(cardKey);
              }}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition ${
                isRemembered 
                  ? "bg-slate-800 text-slate-400 border border-slate-700 hover:text-white" 
                  : "bg-green-600 hover:bg-green-500 text-white font-black"
              }`}
            >
              {isRemembered ? "Bỏ nhớ" : "Đã thuộc"}
            </button>
            <span className="text-slate-500 text-xs font-black italic">SRS</span>
          </div>
        </div>

      </div>
    </div>
  );
}
