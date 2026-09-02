import React, { useState, useEffect, useMemo } from "react";
import { playSound } from "../utils/audio";
import { 
  TRANSLATION_N3_DATA, 
  ALL_TRANSLATION_N3_SENTENCES, 
  TranslationSentence, 
  TranslationLesson,
  getSentenceFurigana,
  getSentenceRomaji,
  isAnswerMatching,
  normalizeKana
} from "../data/translationN3";
import { KanjiRuby } from "./KanjiRuby";
import {
  ArrowLeft,
  Volume2,
  Bookmark,
  CheckCircle,
  Eye,
  EyeOff,
  RotateCcw,
  Sparkles,
  Search,
  BookOpen,
  Edit3,
  Languages,
  Layers,
  Award,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  HelpCircle,
  Check,
  X,
  VolumeX,
  Filter,
  Type
} from "lucide-react";

interface TranslationN3LessonsProps {
  onGoBack: () => void;
}

type TabMode = "list" | "vi_to_ja" | "ja_to_vi" | "flashcard" | "quiz";

export default function TranslationN3Lessons({ onGoBack }: TranslationN3LessonsProps) {
  // Navigation & Mode
  const [activeTab, setActiveTab] = useState<TabMode>("list");
  const [selectedLessonId, setSelectedLessonId] = useState<number | "all">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Progress & States
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<number>>(new Set());
  const [masteredIds, setMasteredIds] = useState<Set<number>>(new Set());
  const [filterOnlyBookmarked, setFilterOnlyBookmarked] = useState<boolean>(false);
  const [filterOnlyMastered, setFilterOnlyMastered] = useState<boolean>(false);
  const [showFurigana, setShowFurigana] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("sk_trans_n3_show_furigana");
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  // Mode: List visibility toggle per sentence
  const [revealedIds, setRevealedIds] = useState<Set<number>>(new Set());
  const [hideAllTranslations, setHideAllTranslations] = useState<boolean>(false);

  // Mode: Practice (Vi -> Ja and Ja -> Vi)
  const [practiceIndex, setPracticeIndex] = useState<number>(0);
  const [userTranslationInput, setUserTranslationInput] = useState<string>("");
  const [showPracticeAnswer, setShowPracticeAnswer] = useState<boolean>(false);
  const [showPracticeHint, setShowPracticeHint] = useState<boolean>(false);
  const [isPracticeShuffled, setIsPracticeShuffled] = useState<boolean>(false);

  // Mode: Flashcard
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);
  const [flashcardFrontLang, setFlashcardFrontLang] = useState<"vi" | "ja">("vi"); // 'vi' = Vietnamese front, 'ja' = Japanese front

  // Mode: Quiz
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Load saved progress from localStorage
  useEffect(() => {
    try {
      const savedBookmarks = localStorage.getItem("sk_trans_n3_bookmarks");
      if (savedBookmarks) {
        setBookmarkedIds(new Set(JSON.parse(savedBookmarks)));
      }
      const savedMastered = localStorage.getItem("sk_trans_n3_mastered");
      if (savedMastered) {
        setMasteredIds(new Set(JSON.parse(savedMastered)));
      }
    } catch (e) {
      console.error("Failed to load translation progress:", e);
    }
  }, []);

  // Save bookmarks
  const toggleBookmark = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playSound.click();
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem("sk_trans_n3_bookmarks", JSON.stringify(Array.from(next)));
      } catch (err) {
        console.error(err);
      }
      return next;
    });
  };

  // Save mastered
  const toggleMastered = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playSound.click();
    setMasteredIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem("sk_trans_n3_mastered", JSON.stringify(Array.from(next)));
      } catch (err) {
        console.error(err);
      }
      return next;
    });
  };

  // Text to Speech
  const speakJapanese = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Filtered sentences based on current selection
  const currentSentences = useMemo(() => {
    let list = ALL_TRANSLATION_N3_SENTENCES;
    if (selectedLessonId !== "all") {
      list = list.filter((s) => s.lessonId === selectedLessonId);
    }
    if (filterOnlyBookmarked) {
      list = list.filter((s) => bookmarkedIds.has(s.id));
    }
    if (filterOnlyMastered) {
      list = list.filter((s) => masteredIds.has(s.id));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (s) =>
          s.vietnamese.toLowerCase().includes(q) ||
          s.japanese.toLowerCase().includes(q) ||
          (s.grammarFocus && s.grammarFocus.toLowerCase().includes(q))
      );
    }
    return list;
  }, [selectedLessonId, filterOnlyBookmarked, filterOnlyMastered, searchQuery, bookmarkedIds, masteredIds]);

  // Shuffled or active practice queue
  const practiceQueue = useMemo(() => {
    if (isPracticeShuffled) {
      return [...currentSentences].sort(() => Math.random() - 0.5);
    }
    return currentSentences;
  }, [currentSentences, isPracticeShuffled]);

  // Current practice sentence
  const currentPracticeItem = practiceQueue[practiceIndex] || null;

  // Flashcard Queue
  const flashcardQueue = currentSentences;
  const currentFlashcardItem = flashcardQueue[flashcardIndex] || null;

  // Reset indices when selection or filter changes
  useEffect(() => {
    setPracticeIndex(0);
    setFlashcardIndex(0);
    setIsCardFlipped(false);
    setUserTranslationInput("");
    setShowPracticeAnswer(false);
    setShowPracticeHint(false);
  }, [selectedLessonId, filterOnlyBookmarked, filterOnlyMastered, activeTab]);

  // Quiz Questions generator
  const quizList = useMemo(() => {
    if (currentSentences.length < 4) return [];
    const pool = [...currentSentences].sort(() => Math.random() - 0.5);
    const questions = pool.slice(0, Math.min(pool.length, 20)).map((target) => {
      // Pick 3 random wrong options from the remaining sentences
      const wrongCandidates = ALL_TRANSLATION_N3_SENTENCES.filter((s) => s.id !== target.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      const options = [target.japanese, ...wrongCandidates.map((w) => w.japanese)].sort(
        () => Math.random() - 0.5
      );
      return {
        target,
        question: target.vietnamese,
        grammar: target.grammarFocus,
        options,
        correctIndex: options.indexOf(target.japanese),
        lessonId: target.lessonId
      };
    });
    return questions;
  }, [currentSentences]);

  const currentQuizItem = quizList[quizIndex] || null;

  // Handle Quiz selection
  const handleSelectQuizOption = (optIndex: number) => {
    if (isAnswerSubmitted || !currentQuizItem) return;
    setSelectedOption(optIndex);
    setIsAnswerSubmitted(true);
    if (optIndex === currentQuizItem.correctIndex) {
      playSound.correct();
      setQuizScore((prev) => prev + 1);
    } else {
      playSound.wrong();
    }
  };

  const handleNextQuiz = () => {
    playSound.click();
    if (quizIndex + 1 < quizList.length) {
      setQuizIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
      playSound.achievement();
    }
  };

  const restartQuiz = () => {
    playSound.click();
    setQuizIndex(0);
    setQuizScore(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setQuizFinished(false);
  };

  // Toggle reveal for individual card in list
  const toggleSentenceReveal = (id: number) => {
    setRevealedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Active lesson details
  const activeLessonObj = useMemo(() => {
    if (selectedLessonId === "all") return null;
    return TRANSLATION_N3_DATA.find((l) => l.lessonId === selectedLessonId);
  }, [selectedLessonId]);

  return (
    <div
      className="washi-pattern min-h-screen p-4 sm:p-6 md:p-8 -mx-4 sm:-mx-8 rounded-[40px] border-2 border-[#1A1A1A] text-[#1A1A1A]"
      style={{ fontFamily: "'Lora', 'Noto Serif JP', serif" }}
    >
      {/* Top Header & Navigation */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b-2 border-[#1A1A1A] pb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 border-2 border-[#8B0000] bg-[#8B0000] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-[3px_3px_0px_#1A1A1A]"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            訳
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-[#8B0000] bg-[#8B0000]/10 px-2 py-0.5 rounded border border-[#8B0000]/30">
                QUYỂN IV • TRUNG CẤP N3
              </span>
              <span className="text-xs text-gray-500 font-semibold">22 Bài Học • {ALL_TRANSLATION_N3_SENTENCES.length} Câu Dịch</span>
            </div>
            <h1
              className="text-2xl sm:text-3xl font-black text-[#1A1A1A] tracking-tight"
              style={{ fontFamily: "'Noto Serif JP', serif" }}
            >
              Luyện Dịch N3 (N3 翻訳特訓)
            </h1>
          </div>
        </div>

        {/* Controls: Furigana Toggle, Back Button & Mastered Counter */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-between md:justify-end">
          <button
            onClick={() => {
              playSound.click();
              setShowFurigana((prev) => {
                const next = !prev;
                try {
                  localStorage.setItem("sk_trans_n3_show_furigana", JSON.stringify(next));
                } catch (e) {
                  console.error(e);
                }
                return next;
              });
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 text-xs font-black transition-all shadow-[2px_2px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${
              showFurigana
                ? "bg-amber-100 text-amber-900 border-[#1A1A1A]"
                : "bg-white text-gray-500 border-[#1A1A1A]"
            }`}
            title="Bật/Tắt phiên âm Furigana trên đầu chữ Hán"
          >
            <Type className={`w-3.5 h-3.5 ${showFurigana ? "text-amber-700" : "text-gray-400"}`} />
            <span>Furigana: {showFurigana ? "BẬT" : "TẮT"}</span>
          </button>

          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border-2 border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A] text-xs font-bold">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Thuộc: {masteredIds.size}/{ALL_TRANSLATION_N3_SENTENCES.length}</span>
            <span className="text-gray-300">|</span>
            <Bookmark className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Lưu: {bookmarkedIds.size}</span>
          </div>

          <button
            onClick={() => {
              playSound.click();
              onGoBack();
            }}
            className="flex items-center gap-2 text-[#1A1A1A] font-bold hover:text-[#8B0000] transition-colors border-2 border-[#1A1A1A] hover:border-[#8B0000] px-4 py-1.5 rounded-xl bg-white shadow-[3px_3px_0px_#1A1A1A] hover:shadow-[3px_3px_0px_#8B0000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none text-xs sm:text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Trở về Đạo Tràng N3</span>
          </button>
        </div>
      </header>

      {/* Main Mode Tabs */}
      <nav className="flex flex-wrap gap-2 mb-6">
        {[
          { id: "list", label: "Danh Sách Câu Dịch", icon: BookOpen, desc: "Tra cứu & Tự kiểm tra" },
          { id: "vi_to_ja", label: "Dịch Xuôi (Việt → Nhật)", icon: Edit3, desc: "Tập gõ & Đối chiếu" },
          { id: "ja_to_vi", label: "Dịch Ngược (Nhật → Việt)", icon: Languages, desc: "Nghe & Luận nghĩa" },
          { id: "flashcard", label: "Flashcard Lật Thẻ", icon: Layers, desc: "Phản xạ nhanh 2 chiều" },
          { id: "quiz", label: "Trắc Nghiệm 4 Lựa Chọn", icon: Award, desc: "Thi thử thực chiến" },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                playSound.click();
                setActiveTab(tab.id as TabMode);
              }}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border-2 transition-all ${
                isActive
                  ? "bg-[#8B0000] text-white border-[#1A1A1A] shadow-[3px_3px_0px_#1A1A1A] -translate-y-0.5"
                  : "bg-white text-gray-700 hover:text-[#8B0000] border-[#1A1A1A] hover:bg-gray-50 shadow-[2px_2px_0px_#1A1A1A]"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Lesson Selector & Filter Toolbar */}
      <section className="bg-white border-2 border-[#1A1A1A] p-4 rounded-2xl shadow-[4px_4px_0px_#8B0000] mb-6 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Lesson dropdown and quick pills */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-gray-600 uppercase tracking-wider flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-[#8B0000]" /> Chọn Bài:
              </span>
              <select
                value={selectedLessonId}
                onChange={(e) => {
                  playSound.click();
                  const val = e.target.value;
                  setSelectedLessonId(val === "all" ? "all" : parseInt(val, 10));
                }}
                className="border-2 border-[#1A1A1A] rounded-xl px-3 py-1.5 text-xs sm:text-sm font-bold bg-[#FDFBF7] focus:outline-none focus:ring-2 focus:ring-[#8B0000] cursor-pointer shadow-[2px_2px_0px_#1A1A1A]"
              >
                <option value="all">Tất cả 22 bài ({ALL_TRANSLATION_N3_SENTENCES.length} câu)</option>
                {TRANSLATION_N3_DATA.map((l) => (
                  <option key={l.lessonId} value={l.lessonId}>
                    {l.title}: {l.topicName} ({l.sentences.length} câu)
                  </option>
                ))}
              </select>
            </div>

            {/* Bookmarked and Mastered Filters */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  playSound.click();
                  setFilterOnlyBookmarked(!filterOnlyBookmarked);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all ${
                  filterOnlyBookmarked
                    ? "bg-amber-100 text-amber-900 border-amber-600 shadow-[2px_2px_0px_#b45309]"
                    : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${filterOnlyBookmarked ? "fill-amber-600 text-amber-600" : ""}`} />
                <span>Đã lưu ({bookmarkedIds.size})</span>
              </button>

              <button
                onClick={() => {
                  playSound.click();
                  setFilterOnlyMastered(!filterOnlyMastered);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all ${
                  filterOnlyMastered
                    ? "bg-emerald-100 text-emerald-900 border-emerald-600 shadow-[2px_2px_0px_#047857]"
                    : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
                }`}
              >
                <CheckCircle className={`w-3.5 h-3.5 ${filterOnlyMastered ? "text-emerald-600" : ""}`} />
                <span>Đã thuộc ({masteredIds.size})</span>
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm tiếng Việt, tiếng Nhật, mẫu ngữ pháp..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 border-2 border-[#1A1A1A] rounded-xl text-xs sm:text-sm bg-[#FDFBF7] focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Active Lesson Meta Banner if specific lesson is selected */}
        {activeLessonObj && (
          <div className="bg-[#8B0000]/5 border-l-4 border-[#8B0000] p-3 rounded-r-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-black text-[#8B0000] text-sm">{activeLessonObj.title}: {activeLessonObj.topicName}</span>
                <span className="text-xs text-gray-500">• {activeLessonObj.sentences.length} câu thực chiến</span>
              </div>
              <p className="text-xs text-gray-600 mt-0.5">{activeLessonObj.description}</p>
            </div>
            <div className="flex flex-wrap gap-1">
              {activeLessonObj.grammarPatterns.map((p, idx) => (
                <span key={idx} className="bg-white border border-[#8B0000]/30 text-[#8B0000] text-[11px] font-bold px-2 py-0.5 rounded shadow-sm">
                  {p}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ================= MODE 1: LIST / TRA CỨU ================= */}
      {activeTab === "list" && (
        <div className="space-y-4">
          {/* Controls Bar for List */}
          <div className="flex justify-between items-center bg-white p-3 rounded-xl border-2 border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A]">
            <div className="text-xs font-bold text-gray-700">
              Hiển thị <span className="text-[#8B0000] font-black">{currentSentences.length}</span> câu dịch phù hợp
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  playSound.click();
                  setHideAllTranslations(!hideAllTranslations);
                }}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-[#1A1A1A] text-xs font-bold bg-[#FDFBF7] hover:bg-gray-100 transition-colors"
              >
                {hideAllTranslations ? <Eye className="w-3.5 h-3.5 text-blue-600" /> : <EyeOff className="w-3.5 h-3.5 text-gray-600" />}
                <span>{hideAllTranslations ? "Hiện tất cả tiếng Nhật" : "Ẩn tiếng Nhật để tự dịch"}</span>
              </button>
            </div>
          </div>

          {/* Sentences List */}
          {currentSentences.length === 0 ? (
            <div className="text-center py-16 bg-white border-2 border-dashed border-gray-300 rounded-2xl">
              <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="font-bold text-gray-700">Không tìm thấy câu dịch nào phù hợp với bộ lọc hiện tại.</p>
              <p className="text-xs text-gray-500 mt-1">Hãy thử đổi bài học hoặc xóa từ khóa tìm kiếm.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentSentences.map((item) => {
                const isBookmarked = bookmarkedIds.has(item.id);
                const isMastered = masteredIds.has(item.id);
                const isRevealed = revealedIds.has(item.id) || !hideAllTranslations;

                return (
                  <div
                    key={item.id}
                    className={`bg-white border-2 rounded-2xl p-4 transition-all duration-200 flex flex-col justify-between ${
                      isMastered
                        ? "border-emerald-500 bg-emerald-50/20 shadow-[3px_3px_0px_#10b981]"
                        : "border-[#1A1A1A] shadow-[3px_3px_0px_#1A1A1A] hover:border-[#8B0000]"
                    }`}
                  >
                    <div>
                      {/* Top bar of card */}
                      <div className="flex justify-between items-center mb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-black bg-[#1A1A1A] text-white px-2 py-0.5 rounded">
                            Bài {item.lessonId} • Câu {item.sentenceIndex}
                          </span>
                          {item.grammarFocus && (
                            <span className="text-[11px] font-bold bg-[#8B0000]/10 text-[#8B0000] px-2 py-0.5 rounded border border-[#8B0000]/20">
                              {item.grammarFocus}
                            </span>
                          )}
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={(e) => toggleBookmark(item.id, e)}
                            title={isBookmarked ? "Bỏ đánh dấu" : "Lưu câu này"}
                            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <Bookmark
                              className={`w-4 h-4 ${
                                isBookmarked ? "fill-amber-500 text-amber-500" : "text-gray-400 hover:text-amber-500"
                              }`}
                            />
                          </button>

                          <button
                            onClick={(e) => toggleMastered(item.id, e)}
                            title={isMastered ? "Đánh dấu chưa thuộc" : "Đã thông thuộc"}
                            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <CheckCircle
                              className={`w-4 h-4 ${
                                isMastered ? "fill-emerald-500 text-white" : "text-gray-300 hover:text-emerald-500"
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      {/* Vietnamese Sentence */}
                      <div className="mb-3">
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">Tiếng Việt:</div>
                        <p className="text-base font-bold text-[#1A1A1A] leading-snug">{item.vietnamese}</p>
                      </div>

                      {/* Japanese Sentence */}
                      <div className="pt-2.5 border-t border-gray-100">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold text-[#8B0000] uppercase tracking-wider">Tiếng Nhật:</span>
                          <div className="flex items-center gap-1">
                            {hideAllTranslations && (
                              <button
                                onClick={() => toggleSentenceReveal(item.id)}
                                className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1"
                              >
                                {isRevealed ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                <span>{isRevealed ? "Ẩn" : "Xem đáp án"}</span>
                              </button>
                            )}
                            <button
                              onClick={(e) => speakJapanese(item.japanese, e)}
                              className="p-1 text-gray-600 hover:text-[#8B0000] hover:bg-red-50 rounded-lg transition-colors"
                              title="Nghe phát âm chuẩn"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {isRevealed ? (
                          <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-200/60">
                            <div
                              className="text-lg sm:text-xl font-bold text-[#8B0000] leading-loose tracking-wide"
                              style={{ fontFamily: "'Noto Serif JP', serif" }}
                            >
                              <KanjiRuby
                                japanese={item.japanese}
                                furigana={item.furigana || getSentenceFurigana(item)}
                                showFurigana={showFurigana}
                                rtClassName="text-[#8B0000] font-black text-[0.62em]"
                              />
                            </div>
                          </div>
                        ) : (
                          <div
                            onClick={() => toggleSentenceReveal(item.id)}
                            className="bg-gray-100 hover:bg-gray-200 border border-dashed border-gray-300 rounded-xl p-3 text-center cursor-pointer transition-colors"
                          >
                            <span className="text-xs font-bold text-gray-500 flex items-center justify-center gap-1.5">
                              <Eye className="w-3.5 h-3.5" /> Bấm để xem đáp án tiếng Nhật
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ================= MODE 2: DỊCH XUÔI (VIỆT → NHẬT) ================= */}
      {activeTab === "vi_to_ja" && currentPracticeItem && (
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Progress Header */}
          <div className="flex justify-between items-center bg-white p-3.5 rounded-2xl border-2 border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A]">
            <div className="flex items-center gap-2">
              <span className="font-black text-sm text-[#8B0000]">
                Câu {practiceIndex + 1} / {practiceQueue.length}
              </span>
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-bold">
                Bài {currentPracticeItem.lessonId}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  playSound.click();
                  setIsPracticeShuffled(!isPracticeShuffled);
                  setPracticeIndex(0);
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors ${
                  isPracticeShuffled
                    ? "bg-purple-100 text-purple-900 border-purple-400"
                    : "bg-gray-100 text-gray-600 border-gray-300"
                }`}
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Xáo trộn</span>
              </button>

              <button
                onClick={(e) => toggleBookmark(currentPracticeItem.id, e)}
                className="p-1.5 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                <Bookmark
                  className={`w-4 h-4 ${
                    bookmarkedIds.has(currentPracticeItem.id) ? "fill-amber-500 text-amber-500" : "text-gray-400"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white border-3 border-[#1A1A1A] rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_#8B0000] space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-gray-500 uppercase tracking-widest">
                  Câu hỏi tiếng Việt:
                </span>
                {currentPracticeItem.grammarFocus && (
                  <span className="text-xs font-bold bg-[#8B0000]/10 text-[#8B0000] px-2.5 py-1 rounded-full border border-[#8B0000]/20">
                    Cấu trúc gợi ý: {currentPracticeItem.grammarFocus}
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#1A1A1A] leading-relaxed">
                {currentPracticeItem.vietnamese}
              </h2>
            </div>

            {/* Input Box for Japanese typing */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">
                Nhập bản dịch tiếng Nhật của bạn:
              </label>
              <textarea
                rows={3}
                value={userTranslationInput}
                onChange={(e) => setUserTranslationInput(e.target.value)}
                placeholder="Gõ tiếng Nhật tại đây (ví dụ: 若いうちに勉強しなさい)..."
                className="w-full p-3.5 border-2 border-[#1A1A1A] rounded-2xl bg-[#FDFBF7] text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                style={{ fontFamily: "'Noto Serif JP', serif" }}
              />
            </div>

            {/* Hint & Reveal Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    playSound.click();
                    setShowPracticeHint(!showPracticeHint);
                  }}
                  className="px-3.5 py-1.5 text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>{showPracticeHint ? "Ẩn gợi ý" : "Gợi ý ngữ pháp"}</span>
                </button>
              </div>

              <button
                onClick={() => {
                  playSound.click();
                  setShowPracticeAnswer(!showPracticeAnswer);
                }}
                className="px-5 py-2 text-xs sm:text-sm font-black text-white bg-[#8B0000] hover:bg-[#6e0000] border-2 border-[#1A1A1A] rounded-xl shadow-[3px_3px_0px_#1A1A1A] flex items-center gap-2 transition-all active:translate-x-0.5 active:translate-y-0.5"
              >
                {showPracticeAnswer ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{showPracticeAnswer ? "Ẩn đáp án" : "Đối chiếu đáp án chuẩn"}</span>
              </button>
            </div>

            {/* Hint Box */}
            {showPracticeHint && (
              <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl text-xs space-y-1">
                <p className="font-bold text-amber-900">💡 Gợi ý ngữ pháp:</p>
                <p className="text-amber-800">
                  Câu này áp dụng mẫu ngữ pháp: <span className="font-black">{currentPracticeItem.grammarFocus}</span> thuộc Bài {currentPracticeItem.lessonId}.
                </p>
              </div>
            )}

            {/* Official Answer Box */}
            {showPracticeAnswer && (() => {
              const matchResult = isAnswerMatching(
                userTranslationInput,
                currentPracticeItem.japanese,
                currentPracticeItem.furigana
              );
              return (
                <div className="bg-gradient-to-br from-red-50 to-amber-50/50 border-2 border-[#8B0000] p-4 sm:p-6 rounded-2xl space-y-4 shadow-sm">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <span className="text-xs font-black text-[#8B0000] uppercase tracking-wider">
                      Đáp án mẫu chuẩn:
                    </span>
                    <button
                      onClick={() => speakJapanese(currentPracticeItem.japanese)}
                      className="flex items-center gap-1.5 text-xs font-bold text-[#8B0000] hover:bg-red-100/60 px-3 py-1 rounded-lg border border-[#8B0000]/30 transition-colors"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Nghe đọc mẫu</span>
                    </button>
                  </div>

                  {/* Japanese with Furigana */}
                  <div
                    className="text-2xl sm:text-3xl font-black text-[#8B0000] leading-loose tracking-wide"
                    style={{ fontFamily: "'Noto Serif JP', serif" }}
                  >
                    <KanjiRuby
                      japanese={currentPracticeItem.japanese}
                      furigana={currentPracticeItem.furigana || getSentenceFurigana(currentPracticeItem)}
                      showFurigana={showFurigana}
                      rtClassName="text-[#8B0000] font-black text-[0.62em]"
                    />
                  </div>

                {/* Self Assessment */}
                <div className="pt-3 border-t border-[#8B0000]/20 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-bold text-gray-700">Tự đánh giá câu của bạn:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        toggleMastered(currentPracticeItem.id);
                      }}
                      className={`px-3 py-1 text-xs font-bold rounded-xl border flex items-center gap-1 ${
                        masteredIds.has(currentPracticeItem.id)
                          ? "bg-emerald-600 text-white border-emerald-700"
                          : "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{masteredIds.has(currentPracticeItem.id) ? "Đã đánh dấu thuộc" : "Tôi dịch đúng rồi"}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center">
            <button
              disabled={practiceIndex === 0}
              onClick={() => {
                playSound.click();
                setPracticeIndex((prev) => Math.max(0, prev - 1));
                setUserTranslationInput("");
                setShowPracticeAnswer(false);
                setShowPracticeHint(false);
              }}
              className="px-4 py-2 bg-white border-2 border-[#1A1A1A] rounded-xl text-xs sm:text-sm font-bold shadow-[2px_2px_0px_#1A1A1A] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Câu trước</span>
            </button>

            <button
              disabled={practiceIndex >= practiceQueue.length - 1}
              onClick={() => {
                playSound.click();
                setPracticeIndex((prev) => Math.min(practiceQueue.length - 1, prev + 1));
                setUserTranslationInput("");
                setShowPracticeAnswer(false);
                setShowPracticeHint(false);
              }}
              className="px-5 py-2 bg-[#1A1A1A] text-white border-2 border-[#1A1A1A] rounded-xl text-xs sm:text-sm font-bold shadow-[2px_2px_0px_#8B0000] hover:bg-[#8B0000] hover:border-[#8B0000] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
            >
              <span>Câu tiếp theo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= MODE 3: DỊCH NGƯỢC (NHẬT → VIỆT) ================= */}
      {activeTab === "ja_to_vi" && currentPracticeItem && (
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center bg-white p-3.5 rounded-2xl border-2 border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A]">
            <div className="flex items-center gap-2">
              <span className="font-black text-sm text-[#8B0000]">
                Câu {practiceIndex + 1} / {practiceQueue.length}
              </span>
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-bold">
                Bài {currentPracticeItem.lessonId}
              </span>
            </div>

            <button
              onClick={() => speakJapanese(currentPracticeItem.japanese)}
              className="flex items-center gap-1 px-3 py-1 bg-red-50 text-[#8B0000] border border-[#8B0000]/30 rounded-xl text-xs font-bold hover:bg-red-100 transition-colors"
            >
              <Volume2 className="w-4 h-4" />
              <span>Phát âm câu này</span>
            </button>
          </div>

          {/* Question Card */}
          <div className="bg-white border-3 border-[#1A1A1A] rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_#8B0000] space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-gray-500 uppercase tracking-widest">
                  Câu gốc tiếng Nhật:
                </span>
                <span className="text-xs font-bold bg-[#8B0000]/10 text-[#8B0000] px-2.5 py-1 rounded-full border border-[#8B0000]/20">
                  {currentPracticeItem.grammarFocus}
                </span>
              </div>
              <div
                className="text-2xl sm:text-3xl font-black text-[#8B0000] leading-loose tracking-wide"
                style={{ fontFamily: "'Noto Serif JP', serif" }}
              >
                <KanjiRuby
                  japanese={currentPracticeItem.japanese}
                  furigana={currentPracticeItem.furigana || getSentenceFurigana(currentPracticeItem)}
                  showFurigana={showFurigana}
                  rtClassName="text-[#8B0000] font-black text-[0.62em]"
                />
              </div>
            </div>

            {/* Input Box for Vietnamese translation */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">
                Nhập bản dịch tiếng Việt của bạn:
              </label>
              <textarea
                rows={3}
                value={userTranslationInput}
                onChange={(e) => setUserTranslationInput(e.target.value)}
                placeholder="Dịch câu tiếng Nhật trên sang nghĩa tiếng Việt..."
                className="w-full p-3.5 border-2 border-[#1A1A1A] rounded-2xl bg-[#FDFBF7] text-base focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
              />
            </div>

            {/* Reveal button */}
            <div className="flex justify-end">
              <button
                onClick={() => {
                  playSound.click();
                  setShowPracticeAnswer(!showPracticeAnswer);
                }}
                className="px-5 py-2 text-xs sm:text-sm font-black text-white bg-[#8B0000] hover:bg-[#6e0000] border-2 border-[#1A1A1A] rounded-xl shadow-[3px_3px_0px_#1A1A1A] flex items-center gap-2 transition-all active:translate-x-0.5 active:translate-y-0.5"
              >
                {showPracticeAnswer ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{showPracticeAnswer ? "Ẩn đáp án" : "Xem bản dịch tiếng Việt"}</span>
              </button>
            </div>

            {/* Answer Display */}
            {showPracticeAnswer && (
              <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-amber-50/40 dark:from-emerald-950/60 dark:via-teal-950/50 dark:to-slate-900 border-2 border-emerald-600 dark:border-emerald-400 p-4 sm:p-6 rounded-2xl space-y-3 shadow-[3px_3px_0px_#1A1A1A]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wider bg-emerald-100 dark:bg-emerald-900/80 px-2.5 py-1 rounded-lg border border-emerald-300 dark:border-emerald-600 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    Bản dịch chuẩn tiếng Việt
                  </span>
                </div>
                <p className="text-xl sm:text-2xl font-black text-gray-900 dark:text-emerald-50 leading-relaxed">
                  {currentPracticeItem.vietnamese}
                </p>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center">
            <button
              disabled={practiceIndex === 0}
              onClick={() => {
                playSound.click();
                setPracticeIndex((prev) => Math.max(0, prev - 1));
                setUserTranslationInput("");
                setShowPracticeAnswer(false);
              }}
              className="px-4 py-2 bg-white border-2 border-[#1A1A1A] rounded-xl text-xs sm:text-sm font-bold shadow-[2px_2px_0px_#1A1A1A] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Câu trước</span>
            </button>

            <button
              disabled={practiceIndex >= practiceQueue.length - 1}
              onClick={() => {
                playSound.click();
                setPracticeIndex((prev) => Math.min(practiceQueue.length - 1, prev + 1));
                setUserTranslationInput("");
                setShowPracticeAnswer(false);
              }}
              className="px-5 py-2 bg-[#1A1A1A] text-white border-2 border-[#1A1A1A] rounded-xl text-xs sm:text-sm font-bold shadow-[2px_2px_0px_#8B0000] hover:bg-[#8B0000] hover:border-[#8B0000] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
            >
              <span>Câu tiếp theo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= MODE 4: FLASHCARD LẬT THẺ ================= */}
      {activeTab === "flashcard" && currentFlashcardItem && (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Flashcard toolbar */}
          <div className="flex justify-between items-center bg-white p-3.5 rounded-2xl border-2 border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A]">
            <div className="flex items-center gap-2">
              <span className="font-black text-sm text-[#8B0000]">
                Thẻ {flashcardIndex + 1} / {flashcardQueue.length}
              </span>
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-bold">
                Bài {currentFlashcardItem.lessonId}
              </span>
            </div>

            {/* Front side switch button */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  playSound.click();
                  setFlashcardFrontLang(flashcardFrontLang === "vi" ? "ja" : "vi");
                  setIsCardFlipped(false);
                }}
                className="px-3 py-1 bg-amber-50 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold hover:bg-amber-100 transition-colors flex items-center gap-1.5"
              >
                <Languages className="w-3.5 h-3.5" />
                <span>Mặt trước: {flashcardFrontLang === "vi" ? "Tiếng Việt" : "Tiếng Nhật"}</span>
              </button>
            </div>
          </div>

          {/* Flashcard Container */}
          <div
            onClick={() => {
              playSound.flip();
              const nextFlipped = !isCardFlipped;
              setIsCardFlipped(nextFlipped);
              if (
                (flashcardFrontLang === "vi" && nextFlipped) ||
                (flashcardFrontLang === "ja" && !nextFlipped)
              ) {
                speakJapanese(currentFlashcardItem.japanese);
              }
            }}
            className="w-full min-h-[300px] sm:min-h-[340px] bg-white border-4 border-[#1A1A1A] rounded-3xl p-8 sm:p-10 shadow-[8px_8px_0px_#8B0000] cursor-pointer flex flex-col justify-between items-center text-center relative transition-transform duration-300 active:scale-[0.99] select-none"
          >
            {/* Top Indicator */}
            <div className="w-full flex justify-between items-center">
              <span className="text-[11px] font-black uppercase tracking-widest text-[#8B0000] bg-red-50 px-2.5 py-1 rounded-full border border-[#8B0000]/20">
                {currentFlashcardItem.grammarFocus || `Bài ${currentFlashcardItem.lessonId}`}
              </span>
              <span className="text-xs text-gray-400 font-bold">Bấm để lật thẻ ↻</span>
            </div>

            {/* Content Display */}
            <div className="my-auto py-6">
              {!isCardFlipped ? (
                /* FRONT */
                <div className="space-y-4">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
                    Mặt trước ({flashcardFrontLang === "vi" ? "Tiếng Việt" : "Tiếng Nhật"})
                  </span>
                  {flashcardFrontLang === "vi" ? (
                    <p className="font-black text-[#1A1A1A] leading-relaxed text-xl sm:text-2xl">
                      {currentFlashcardItem.vietnamese}
                    </p>
                  ) : (
                    <div
                      className="text-2xl sm:text-3xl font-black text-[#8B0000] leading-loose"
                      style={{ fontFamily: "'Noto Serif JP', serif" }}
                    >
                      <KanjiRuby
                        japanese={currentFlashcardItem.japanese}
                        furigana={currentFlashcardItem.furigana || getSentenceFurigana(currentFlashcardItem)}
                        showFurigana={showFurigana}
                        rtClassName="text-[#8B0000] font-black text-[0.62em]"
                      />
                    </div>
                  )}
                </div>
              ) : (
                /* BACK */
                <div className="space-y-4">
                  <span className="text-xs font-black text-[#8B0000] uppercase tracking-widest">
                    Mặt sau ({flashcardFrontLang === "vi" ? "Tiếng Nhật" : "Tiếng Việt"})
                  </span>
                  {flashcardFrontLang === "vi" ? (
                    <div
                      className="text-2xl sm:text-3xl font-black text-[#8B0000] leading-loose"
                      style={{ fontFamily: "'Noto Serif JP', serif" }}
                    >
                      <KanjiRuby
                        japanese={currentFlashcardItem.japanese}
                        furigana={currentFlashcardItem.furigana || getSentenceFurigana(currentFlashcardItem)}
                        showFurigana={showFurigana}
                        rtClassName="text-[#8B0000] font-black text-[0.62em]"
                      />
                    </div>
                  ) : (
                    <p className="font-black leading-relaxed text-xl sm:text-2xl text-[#1A1A1A]">
                      {currentFlashcardItem.vietnamese}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Audio trigger */}
            <div className="w-full flex justify-between items-center border-t border-gray-100 pt-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBookmark(currentFlashcardItem.id);
                }}
                className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 text-xs font-bold flex items-center gap-1 text-gray-600"
              >
                <Bookmark
                  className={`w-3.5 h-3.5 ${
                    bookmarkedIds.has(currentFlashcardItem.id) ? "fill-amber-500 text-amber-500" : ""
                  }`}
                />
                <span>{bookmarkedIds.has(currentFlashcardItem.id) ? "Đã lưu" : "Lưu thẻ"}</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  speakJapanese(currentFlashcardItem.japanese);
                }}
                className="p-1.5 bg-red-50 text-[#8B0000] rounded-lg border border-[#8B0000]/20 hover:bg-red-100 text-xs font-bold flex items-center gap-1"
              >
                <Volume2 className="w-4 h-4" />
                <span>Nghe tiếng Nhật</span>
              </button>
            </div>
          </div>

          {/* Flashcard Next/Prev Controls */}
          <div className="flex justify-between items-center">
            <button
              disabled={flashcardIndex === 0}
              onClick={() => {
                playSound.click();
                setFlashcardIndex((prev) => Math.max(0, prev - 1));
                setIsCardFlipped(false);
              }}
              className="px-4 py-2 bg-white border-2 border-[#1A1A1A] rounded-xl text-xs sm:text-sm font-bold shadow-[2px_2px_0px_#1A1A1A] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Thẻ trước</span>
            </button>

            <button
              onClick={() => toggleMastered(currentFlashcardItem.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border-2 transition-all flex items-center gap-1.5 ${
                masteredIds.has(currentFlashcardItem.id)
                  ? "bg-emerald-600 text-white border-emerald-700 shadow-[2px_2px_0px_#047857]"
                  : "bg-white text-emerald-800 border-emerald-600 hover:bg-emerald-50 shadow-[2px_2px_0px_#059669]"
              }`}
            >
              <Check className="w-4 h-4" />
              <span>{masteredIds.has(currentFlashcardItem.id) ? "Đã thuộc câu này" : "Đánh dấu đã thuộc"}</span>
            </button>

            <button
              disabled={flashcardIndex >= flashcardQueue.length - 1}
              onClick={() => {
                playSound.click();
                setFlashcardIndex((prev) => Math.min(flashcardQueue.length - 1, prev + 1));
                setIsCardFlipped(false);
              }}
              className="px-5 py-2 bg-[#1A1A1A] text-white border-2 border-[#1A1A1A] rounded-xl text-xs sm:text-sm font-bold shadow-[2px_2px_0px_#8B0000] hover:bg-[#8B0000] hover:border-[#8B0000] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
            >
              <span>Thẻ tiếp theo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= MODE 5: TRẮC NGHIỆM DỊCH (QUIZ) ================= */}
      {activeTab === "quiz" && (
        <div className="max-w-3xl mx-auto space-y-6">
          {!quizFinished && currentQuizItem ? (
            <>
              {/* Quiz progress */}
              <div className="flex justify-between items-center bg-white p-3.5 rounded-2xl border-2 border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A]">
                <div className="flex items-center gap-2">
                  <span className="font-black text-sm text-[#8B0000]">
                    Câu hỏi {quizIndex + 1} / {quizList.length}
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-bold">
                    Bài {currentQuizItem.lessonId}
                  </span>
                </div>

                <div className="text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                  Điểm: {quizScore} / {quizIndex + (isAnswerSubmitted ? 1 : 0)}
                </div>
              </div>

              {/* Quiz Question Card */}
              <div className="bg-white border-3 border-[#1A1A1A] rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_#8B0000] space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-gray-500 uppercase tracking-widest">
                      Chọn câu tiếng Nhật dịch chính xác nhất:
                    </span>
                    {currentQuizItem.grammar && (
                      <span className="text-xs font-bold bg-[#8B0000]/10 text-[#8B0000] px-2.5 py-1 rounded-full border border-[#8B0000]/20">
                        {currentQuizItem.grammar}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#1A1A1A] leading-relaxed">
                    {currentQuizItem.question}
                  </h2>
                </div>

                {/* 4 Options */}
                <div className="space-y-3">
                  {currentQuizItem.options.map((opt, oIdx) => {
                    const isCorrect = oIdx === currentQuizItem.correctIndex;
                    const isChosen = selectedOption === oIdx;

                    let btnStyle = "bg-[#FDFBF7] border-[#1A1A1A] text-gray-900 hover:bg-amber-50/60";
                    if (isAnswerSubmitted) {
                      if (isCorrect) {
                        btnStyle = "bg-emerald-100 border-emerald-600 text-emerald-950 font-bold shadow-[3px_3px_0px_#059669]";
                      } else if (isChosen && !isCorrect) {
                        btnStyle = "bg-red-100 border-red-600 text-red-950 shadow-[3px_3px_0px_#dc2626]";
                      } else {
                        btnStyle = "bg-gray-50 border-gray-300 text-gray-400 opacity-60";
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={isAnswerSubmitted}
                        onClick={() => handleSelectQuizOption(oIdx)}
                        className={`w-full p-4 text-left border-2 rounded-2xl transition-all flex items-start gap-3 text-base sm:text-lg ${btnStyle}`}
                        style={{ fontFamily: "'Noto Serif JP', serif" }}
                      >
                        <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <div className="flex-1 leading-loose">
                          <KanjiRuby
                            japanese={opt}
                            furigana={getSentenceFurigana({ japanese: opt })}
                            showFurigana={showFurigana}
                            rtClassName="text-[#8B0000] font-black text-[0.6em]"
                          />
                        </div>
                        {isAnswerSubmitted && isCorrect && (
                          <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                        )}
                        {isAnswerSubmitted && isChosen && !isCorrect && (
                          <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Next button after submitting */}
                {isAnswerSubmitted && (
                  <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                    <button
                      onClick={() => speakJapanese(currentQuizItem.target.japanese)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-[#8B0000] border border-[#8B0000]/30 rounded-xl text-xs font-bold hover:bg-red-100"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Nghe đáp án chuẩn</span>
                    </button>

                    <button
                      onClick={handleNextQuiz}
                      className="px-6 py-2.5 bg-[#8B0000] text-white border-2 border-[#1A1A1A] rounded-xl text-xs sm:text-sm font-black shadow-[3px_3px_0px_#1A1A1A] hover:bg-[#6e0000] transition-colors flex items-center gap-2"
                    >
                      <span>{quizIndex + 1 < quizList.length ? "Câu tiếp theo" : "Xem kết quả"}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : quizFinished ? (
            /* Quiz Results Card */
            <div className="bg-white border-4 border-[#1A1A1A] rounded-3xl p-8 sm:p-12 text-center shadow-[8px_8px_0px_#8B0000] space-y-6">
              <div className="w-20 h-20 bg-amber-100 border-4 border-amber-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <Award className="w-10 h-10 text-amber-700" />
              </div>

              <div>
                <h2
                  className="text-2xl sm:text-3xl font-black text-[#1A1A1A]"
                  style={{ fontFamily: "'Noto Serif JP', serif" }}
                >
                  Hoàn Thành Bài Thi Trắc Nghiệm Dịch N3!
                </h2>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">
                  Bạn đã trả lời đúng <span className="font-black text-[#8B0000] text-xl">{quizScore}</span> / {quizList.length} câu hỏi.
                </p>
              </div>

              <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden border border-gray-300 max-w-md mx-auto">
                <div
                  className="bg-emerald-500 h-full transition-all duration-500"
                  style={{ width: `${(quizScore / quizList.length) * 100}%` }}
                ></div>
              </div>

              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <button
                  onClick={restartQuiz}
                  className="px-6 py-2.5 bg-[#8B0000] text-white border-2 border-[#1A1A1A] rounded-xl text-sm font-black shadow-[3px_3px_0px_#1A1A1A] hover:bg-[#6e0000] transition-all flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Làm lại đề mới</span>
                </button>

                <button
                  onClick={() => {
                    playSound.click();
                    setActiveTab("list");
                  }}
                  className="px-6 py-2.5 bg-white text-[#1A1A1A] border-2 border-[#1A1A1A] rounded-xl text-sm font-bold shadow-[2px_2px_0px_#1A1A1A] hover:bg-gray-50 transition-all flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Xem danh sách ôn tập</span>
                </button>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
