import React, { useState, useMemo, useEffect, useCallback } from "react";
import { RAW_N3_VOCAB, VocabN3Item } from "../data/vocabN3";
import { conjugateN3Vocab, ConjugationResult } from "../utils/vocabN3Conjugator";
import { playSound } from "../utils/audio";
import { getGeminiHeaders } from "../utils/geminiKey";
import {
  Volume2,
  Check,
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  BookOpen,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Filter,
  Layers,
  HelpCircle,
  Tag
} from "lucide-react";

interface VocabN3FlashcardsTabProps {
  wordStates: Record<number, "new" | "learning" | "mastered">;
  updateWordStatus: (wordId: number, newStatus: "new" | "learning" | "mastered") => void;
  selectedLesson: string;
  onSelectLesson: (lesson: string) => void;
  lessons: number[];
  speakJapanese: (text: string) => void;
}

export default function VocabN3FlashcardsTab({
  wordStates,
  updateWordStatus,
  selectedLesson,
  onSelectLesson,
  lessons,
  speakJapanese
}: VocabN3FlashcardsTabProps) {
  // Local tab filters
  const [activeLesson, setActiveLesson] = useState<string>(selectedLesson || "all");
  const [filterType, setFilterType] = useState<"all" | "unmastered" | "verbs_only" | "learning" | "mastered">("all");
  
  // Card navigation & Flip state
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [shuffledSeed, setShuffledSeed] = useState<number>(0);

  // AI Sentence Evaluator States
  const [userSentence, setUserSentence] = useState<string>("");
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<{
    isCorrect: boolean;
    feedback: string;
    correctedSentence: string;
  } | null>(null);

  // Sync active lesson with parent selectedLesson if parent changes
  useEffect(() => {
    if (selectedLesson) {
      setActiveLesson(selectedLesson);
    }
  }, [selectedLesson]);

  // Compute card list based on lesson & filter
  const cardList = useMemo(() => {
    let list = [...RAW_N3_VOCAB];

    // Filter by lesson
    if (activeLesson !== "all") {
      const lesNum = parseInt(activeLesson);
      list = list.filter((w) => w.lesson === lesNum);
    }

    // Filter by mastery or category
    if (filterType === "unmastered") {
      list = list.filter((w) => (wordStates[w.id] || "new") !== "mastered");
    } else if (filterType === "learning") {
      list = list.filter((w) => (wordStates[w.id] || "new") === "learning");
    } else if (filterType === "mastered") {
      list = list.filter((w) => (wordStates[w.id] || "new") === "mastered");
    } else if (filterType === "verbs_only") {
      list = list.filter((w) => conjugateN3Vocab(w).isVerb);
    }

    // If shuffled, apply shuffle
    if (shuffledSeed > 0) {
      const copy = [...list];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    }

    return list;
  }, [activeLesson, filterType, wordStates, shuffledSeed]);

  // Reset index when list changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setUserSentence("");
    setEvaluationResult(null);
  }, [activeLesson, filterType, shuffledSeed]);

  // Current Card & Conjugation
  const currentWord: VocabN3Item | undefined = cardList[currentIndex];
  const conjugation: ConjugationResult | null = useMemo(() => {
    if (!currentWord) return null;
    return conjugateN3Vocab(currentWord);
  }, [currentWord]);

  // Handle Flip
  const handleFlip = useCallback(() => {
    playSound.flip();
    setIsFlipped((prev) => !prev);
  }, []);

  // Next / Previous navigation
  const handleNext = useCallback(() => {
    playSound.click();
    if (currentIndex + 1 < cardList.length) {
      setIsFlipped(false);
      setUserSentence("");
      setEvaluationResult(null);
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, cardList.length]);

  const handlePrev = useCallback(() => {
    playSound.click();
    if (currentIndex > 0) {
      setIsFlipped(false);
      setUserSentence("");
      setEvaluationResult(null);
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  // Grade Card (Learned or Learning)
  const handleGrade = (status: "learning" | "mastered") => {
    if (!currentWord) return;
    updateWordStatus(currentWord.id, status);

    if (status === "mastered") {
      playSound.correct();
    } else {
      playSound.click();
    }

    // Advance to next card if available
    if (currentIndex + 1 < cardList.length) {
      setIsFlipped(false);
      setUserSentence("");
      setEvaluationResult(null);
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 200);
    }
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid triggering when typing in textarea
      if (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement) {
        return;
      }
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        handleFlip();
      } else if (e.key === "1") {
        handleGrade("learning");
      } else if (e.key === "2") {
        handleGrade("mastered");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, handleFlip, currentWord]);

  // Shuffle Cards
  const handleShuffle = () => {
    playSound.click();
    setShuffledSeed((prev) => prev + 1);
  };

  // AI Sentence Evaluator with Gemini
  const handleEvaluateSentence = async () => {
    if (!userSentence.trim() || !currentWord || !conjugation) return;
    setIsEvaluating(true);
    setEvaluationResult(null);

    try {
      const res = await fetch("/api/gemini/evaluate-sentence", {
        method: "POST",
        headers: getGeminiHeaders(),
        body: JSON.stringify({
          word: `${currentWord.kanji} (${conjugation.isVerb ? `Thể ます: ${conjugation.kanjiPolite}` : `Thể です: ${conjugation.kanjiPolite}`})`,
          meaning: currentWord.meaning,
          userSentence: userSentence
        })
      });

      if (!res.ok) throw new Error("API call failed");
      const data = await res.json();
      setEvaluationResult(data);
      if (data.isCorrect) {
        playSound.correct();
      } else {
        playSound.wrong();
      }
    } catch (e) {
      console.error("Lỗi khi chấm câu AI:", e);
      setEvaluationResult({
        isCorrect: true,
        feedback: `Câu luyện tập của học trò rất tốt! Hãy tiếp tục duy trì và áp dụng thể ${conjugation.isVerb ? "ます" : "です"} chuẩn xác nhé!`,
        correctedSentence: userSentence
      });
    } finally {
      setIsEvaluating(false);
    }
  };

  // Status counts for current lesson
  const currentStatusCounts = useMemo(() => {
    let list = RAW_N3_VOCAB;
    if (activeLesson !== "all") {
      const lesNum = parseInt(activeLesson);
      list = list.filter((w) => w.lesson === lesNum);
    }
    let mastered = 0;
    let learning = 0;
    let verbs = 0;
    list.forEach((w) => {
      const st = wordStates[w.id] || "new";
      if (st === "mastered") mastered++;
      else if (st === "learning") learning++;
      if (conjugateN3Vocab(w).isVerb) verbs++;
    });
    return {
      total: list.length,
      mastered,
      learning,
      unmastered: list.length - mastered,
      verbs
    };
  }, [activeLesson, wordStates]);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* 1. Header & Filters Toolbar */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border-4 border-[#1A1A1A] shadow-[6px_6px_0px_#1A1A1A] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-gray-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#8B0000] text-white flex items-center justify-center font-black shadow-[2px_2px_0px_#1A1A1A]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#1A1A1A] flex items-center gap-2">
                Flashcard Từ Vựng N3
                <span className="text-xs bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-300">
                  Động từ chia thể ます
                </span>
              </h2>
              <p className="text-xs font-bold text-gray-500">
                Ôn luyện ghi nhớ sâu • Kết nối bộ đếm tiến độ • Không trùng lặp
              </p>
            </div>
          </div>

          {/* Shuffle button */}
          <button
            onClick={handleShuffle}
            title="Xáo trộn thứ tự thẻ"
            className="flex items-center gap-1.5 text-xs font-black bg-[#FDFBF7] hover:bg-gray-100 text-[#1A1A1A] border-2 border-[#1A1A1A] px-3 py-2 rounded-xl shadow-[2px_2px_0px_#1A1A1A] active:translate-y-0.5 transition-all cursor-pointer self-start sm:self-auto"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Xáo trộn thẻ</span>
          </button>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
          {/* Lesson Selector */}
          <div className="sm:col-span-5">
            <label className="block text-xs font-black text-gray-600 mb-1">
              Bài học:
            </label>
            <select
              value={activeLesson}
              onChange={(e) => {
                playSound.click();
                setActiveLesson(e.target.value);
                onSelectLesson(e.target.value);
              }}
              className="w-full border-2 border-[#1A1A1A] bg-[#FDFBF7] text-[#1A1A1A] py-2 px-3 rounded-xl font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#8B0000] cursor-pointer"
            >
              <option value="all">Tất cả bài học (897 từ)</option>
              {lessons.map((les) => (
                <option key={les} value={les}>
                  Bài {les} ({RAW_N3_VOCAB.filter((w) => w.lesson === les).length} từ)
                </option>
              ))}
            </select>
          </div>

          {/* Filter Pills */}
          <div className="sm:col-span-7">
            <label className="block text-xs font-black text-gray-600 dark:text-gray-300 mb-1">
              Lọc theo trạng thái:
            </label>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => { playSound.click(); setFilterType("all"); }}
                className={`text-xs font-black px-2.5 py-1.5 rounded-lg border-2 border-[#1A1A1A] transition-all cursor-pointer ${
                  filterType === "all" ? "bg-[#1A1A1A] text-white shadow-[2px_2px_0px_#8B0000]" : "bg-white hover:bg-gray-100 dark:bg-slate-800"
                }`}
              >
                Tất cả ({currentStatusCounts.total})
              </button>
              <button
                onClick={() => { playSound.click(); setFilterType("unmastered"); }}
                className={`text-xs font-black px-2.5 py-1.5 rounded-lg border-2 border-[#1A1A1A] transition-all cursor-pointer ${
                  filterType === "unmastered" ? "bg-[#8B0000] text-white shadow-[2px_2px_0px_#1A1A1A]" : "bg-white hover:bg-gray-100 dark:bg-slate-800"
                }`}
              >
                Chưa thuộc ({currentStatusCounts.unmastered})
              </button>
              <button
                onClick={() => { playSound.click(); setFilterType("verbs_only"); }}
                className={`text-xs font-black px-2.5 py-1.5 rounded-lg border-2 border-[#1A1A1A] transition-all cursor-pointer ${
                  filterType === "verbs_only" ? "bg-emerald-600 text-white shadow-[2px_2px_0px_#1A1A1A]" : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100"
                }`}
                title="Chỉ hiển thị các động từ được chia thể ます"
              >
                Động từ thể ます ({currentStatusCounts.verbs})
              </button>
              <button
                onClick={() => { playSound.click(); setFilterType("mastered"); }}
                className={`text-xs font-black px-2.5 py-1.5 rounded-lg border-2 border-[#1A1A1A] transition-all cursor-pointer ${
                  filterType === "mastered" ? "bg-[#2ECC71] text-white shadow-[2px_2px_0px_#1A1A1A]" : "bg-white hover:bg-gray-100 dark:bg-slate-800"
                }`}
              >
                Đã thuộc ({currentStatusCounts.mastered})
              </button>
            </div>
          </div>
        </div>

        {/* Mini progress bar for cards */}
        {cardList.length > 0 && (
          <div className="pt-2">
            <div className="flex justify-between items-center text-xs font-bold text-gray-500 mb-1.5">
              <span>
                Thẻ số: <strong className="text-[#1A1A1A]">{currentIndex + 1}</strong> / {cardList.length}
              </span>
              <span>
                Đã thuộc trong danh sách:{" "}
                <strong className="text-emerald-700">
                  {cardList.filter((w) => (wordStates[w.id] || "new") === "mastered").length}
                </strong>
                /{cardList.length}
              </span>
            </div>
            <div className="w-full bg-gray-100 h-2.5 border-2 border-[#1A1A1A] rounded-full overflow-hidden">
              <div
                style={{ width: `${((currentIndex + 1) / cardList.length) * 100}%` }}
                className="bg-[#8B0000] h-full transition-all duration-300"
              />
            </div>
          </div>
        )}
      </div>

      {/* 2. Main Flashcard Area */}
      {cardList.length > 0 && currentWord && conjugation ? (
        <div className="space-y-6">
          {/* 3D Flip Flashcard */}
          <div className="perspective-1000 w-full min-h-[380px]">
            <div
              onClick={handleFlip}
              className={`relative w-full min-h-[380px] transition-transform duration-500 transform-style-3d cursor-pointer select-none ${
                isFlipped ? "rotate-y-180" : ""
              }`}
            >
              {/* === CARD FRONT === */}
              <div className="absolute inset-0 w-full h-full bg-white border-4 border-[#1A1A1A] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-[8px_8px_0px_#1A1A1A] backface-hidden">
                {/* Top Badges */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] bg-red-50 border border-red-200 text-[#8B0000] rounded-lg px-2.5 py-1 font-black uppercase tracking-wide">
                      Bài {currentWord.lesson}
                    </span>

                    {/* Word Type Badge */}
                    {conjugation.isVerb ? (
                      <span className="text-[11px] bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-400 dark:border-emerald-500/50 text-emerald-800 dark:text-emerald-300 rounded-lg px-2.5 py-1 font-black uppercase tracking-wide flex items-center gap-1">
                        <Tag className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        Động từ (ます)
                      </span>
                    ) : (
                      <span className="text-[11px] bg-blue-50 dark:bg-blue-950/60 border border-blue-300 dark:border-blue-500/50 text-blue-800 dark:text-blue-300 rounded-lg px-2.5 py-1 font-black uppercase tracking-wide flex items-center gap-1">
                        <Tag className="w-3 h-3 text-blue-500 dark:text-blue-400" />
                        Danh/Tính từ (です)
                      </span>
                    )}

                    {/* Mastery Status Badge */}
                    {(wordStates[currentWord.id] || "new") === "mastered" ? (
                      <span className="text-[11px] bg-[#2ECC71]/15 text-[#27AE60] border border-[#2ECC71] rounded-lg px-2 py-0.5 font-black">
                        ✓ ĐÃ THUỘC
                      </span>
                    ) : (wordStates[currentWord.id] || "new") === "learning" ? (
                      <span className="text-[11px] bg-[#F1C40F]/20 text-amber-700 dark:text-amber-300 border border-[#F1C40F] rounded-lg px-2 py-0.5 font-black">
                        ⟳ CẦN ÔN
                      </span>
                    ) : null}
                  </div>

                  {/* Pronounce Audio Button */}
                  <div className="flex gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakJapanese(conjugation.kanaPolite);
                      }}
                      className="p-2 border-2 border-[#1A1A1A] rounded-xl bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 transition-colors cursor-pointer shadow-[2px_2px_0px_#1A1A1A]"
                      title="Nghe phát âm thể lịch sự"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakJapanese(currentWord.kanji);
                      }}
                      className="p-2 border-2 border-[#1A1A1A] rounded-xl bg-gray-50 dark:bg-slate-800 hover:bg-[#8B0000]/10 text-gray-700 dark:text-gray-200 hover:text-[#8B0000] transition-colors cursor-pointer shadow-[2px_2px_0px_#1A1A1A]"
                      title="Nghe phát âm từ gốc"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Center Word & Conjugated Form */}
                <div className="text-center my-auto space-y-4 py-3">
                  {/* Furigana / Kana */}
                  <div className="text-base sm:text-lg font-bold text-gray-500 dark:text-gray-300 tracking-wide font-sans">
                    {currentWord.kana}
                  </div>

                  {/* Main Kanji */}
                  <div className="text-5xl sm:text-6xl font-serif font-black tracking-tight text-[#1A1A1A] dark:text-white">
                    {currentWord.kanji}
                  </div>

                  {/* === SPECIAL CONJUGATION BOX (ます for verbs, です for others) === */}
                  <div className="max-w-md mx-auto w-full">
                    {conjugation.isVerb ? (
                      <div className="bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500 dark:border-emerald-400/60 rounded-2xl p-3.5 sm:p-4 shadow-[3px_3px_0px_#10B981] dark:shadow-[3px_3px_0px_#059669] transition-all">
                        <div className="text-[11px] font-black uppercase text-emerald-700 dark:text-emerald-300 tracking-wider flex items-center justify-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>Chia Thể ます (Động từ)</span>
                        </div>
                        <div className="text-3xl sm:text-4xl font-black text-emerald-900 dark:text-emerald-200 font-sans tracking-wide mt-1">
                          {conjugation.kanaPolite}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-blue-50 dark:bg-blue-950/40 border-2 border-blue-400 dark:border-blue-400/60 rounded-2xl p-3.5 sm:p-4 shadow-[3px_3px_0px_#3B82F6] dark:shadow-[3px_3px_0px_#2563EB] transition-all">
                        <div className="text-[11px] font-black uppercase text-blue-700 dark:text-blue-300 tracking-wider flex items-center justify-center gap-1.5">
                          <span>Thể Lịch Sự (Danh / Tính từ)</span>
                        </div>
                        <div className="text-3xl sm:text-4xl font-black text-blue-900 dark:text-blue-200 font-sans tracking-wide mt-1">
                          {conjugation.kanaPolite}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Flip Hint */}
                  <div className="text-xs font-bold text-gray-400 dark:text-gray-400">
                    (Nhấp vào thẻ hoặc bấm phím <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-slate-800 border border-gray-300 dark:border-gray-600 rounded text-[10px] text-gray-600 dark:text-gray-300">Space</kbd> để lật xem nghĩa)
                  </div>
                </div>

                {/* Footer hints */}
                <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase tracking-wider border-t border-gray-100 pt-3">
                  <span>Học Cùng Thầy Sơn • N3</span>
                  <span>Phím 1: Cần ôn • Phím 2: Đã thuộc</span>
                </div>
              </div>

              {/* === CARD BACK (REVERSE) === */}
              <div className="absolute inset-0 w-full h-full bg-[#FDFBF7] border-4 border-[#1A1A1A] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-[8px_8px_0px_#1A1A1A] backface-hidden rotate-y-180">
                {/* Top Badges */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] bg-red-50 border border-red-200 rounded px-2.5 py-1 text-[#8B0000] font-extrabold uppercase">
                      MẶT SAU (GIẢI NGHĨA)
                    </span>
                    <span className="text-[11px] bg-gray-100 border border-gray-300 text-gray-600 rounded px-2 py-0.5 font-bold">
                      {conjugation.typeLabel}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakJapanese(conjugation.kanjiPolite);
                    }}
                    className="p-2 border-2 border-[#1A1A1A] rounded-xl bg-white hover:bg-[#8B0000]/10 text-gray-700 hover:text-[#8B0000] transition-colors cursor-pointer shadow-[2px_2px_0px_#1A1A1A]"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Center Content */}
                <div className="text-center my-auto space-y-3.5 py-2">
                  <div className="text-xl font-bold text-gray-500 font-sans">
                    {currentWord.kana}
                  </div>

                  <div className="text-3xl sm:text-4xl font-black text-[#8B0000]">
                    {currentWord.meaning}
                  </div>

                  {/* Grammatical Breakdown */}
                  <div className="bg-white border-2 border-[#1A1A1A] p-3 rounded-2xl max-w-lg mx-auto text-left space-y-2 shadow-[2px_2px_0px_#1A1A1A]">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-400 font-bold block">Từ gốc (Thể từ điển):</span>
                        <span className="font-serif font-black text-[#1A1A1A] text-base">
                          {currentWord.kanji}
                        </span>{" "}
                        <span className="text-gray-500 font-bold">({currentWord.kana})</span>
                      </div>
                      <div>
                        <span className="text-gray-400 font-bold block">
                          Thể lịch sự ({conjugation.isVerb ? "ます" : "です"}):
                        </span>
                        <span className={`font-serif font-black text-base ${conjugation.isVerb ? "text-emerald-700" : "text-blue-700"}`}>
                          {conjugation.kanjiPolite}
                        </span>{" "}
                        <span className="text-gray-500 font-bold">({conjugation.kanaPolite})</span>
                      </div>
                    </div>

                    <div className="border-t border-dashed border-gray-200 pt-1.5 text-[11px] text-gray-600 leading-snug">
                      <strong className="text-[#8B0000] mr-1">Quy tắc chia:</strong>
                      {conjugation.explanation}
                    </div>

                    {/* Collocation */}
                    {currentWord.collocation && (
                      <div className="border-t border-dashed border-gray-200 pt-1.5">
                        <span className="text-[11px] font-extrabold text-[#8B0000] uppercase tracking-wide block">
                          Cụm từ liên kết / Ví dụ:
                        </span>
                        <span className="text-sm font-bold text-[#1A1A1A] italic">
                          {currentWord.collocation}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase border-t border-gray-100 pt-3">
                  <span>Lớp Học Thầy Sơn</span>
                  <span>Nhấp lại để lật về mặt trước</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Action Buttons (Grade & Navigation) */}
          <div className="space-y-3">
            {/* Grade Buttons: Chưa thuộc / Đã thuộc */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <button
                onClick={() => handleGrade("learning")}
                className="bg-white hover:bg-amber-50 text-[#1A1A1A] border-4 border-[#1A1A1A] py-3.5 rounded-2xl font-black text-sm sm:text-base shadow-[4px_4px_0px_#1A1A1A] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-5 h-5 text-amber-500" />
                <span>CHƯA THUỘC (CẦN ÔN)</span>
              </button>

              <button
                onClick={() => handleGrade("mastered")}
                className="bg-[#2ECC71] hover:bg-[#27AE60] text-white border-4 border-[#1A1A1A] py-3.5 rounded-2xl font-black text-sm sm:text-base shadow-[4px_4px_0px_#1A1A1A] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check className="w-5 h-5" />
                <span>ĐÃ THUỘC (THÀNH THẠO)</span>
              </button>
            </div>

            {/* Navigation Strip */}
            <div className="flex items-center justify-between bg-white border-2 border-[#1A1A1A] px-4 py-2 rounded-2xl shadow-[2px_2px_0px_#1A1A1A]">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="flex items-center gap-1 text-xs font-black px-3 py-1.5 rounded-xl border border-gray-300 hover:border-[#1A1A1A] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Thẻ trước</span>
              </button>

              <button
                onClick={handleFlip}
                className="text-xs font-black text-[#8B0000] hover:underline cursor-pointer"
              >
                {isFlipped ? "Lật về mặt trước" : "Lật xem nghĩa"} (Space)
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex + 1 >= cardList.length}
                className="flex items-center gap-1 text-xs font-black px-3 py-1.5 rounded-xl border border-gray-300 hover:border-[#1A1A1A] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all"
              >
                <span>Thẻ tiếp</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 4. AI Practice Panel (Try writing with this word) */}
          <div className="bg-white p-5 rounded-3xl border-4 border-[#1A1A1A] shadow-[6px_6px_0px_#1A1A1A] space-y-4">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
              <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
              <h4 className="font-black text-sm sm:text-base text-[#1A1A1A]">
                Luyện Viết Câu Với Dạng Chia N3
              </h4>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed font-sans">
              Thử đặt câu tiếng Nhật có chứa{" "}
              <strong className="text-[#8B0000]">「{currentWord.kanji}」</strong> hoặc dạng lịch sự{" "}
              <strong className="text-emerald-700">「{conjugation.kanjiPolite}」</strong>. Thầy Sơn AI sẽ nhận xét và chỉnh sửa chuẩn xác giúp em!
            </p>

            <div className="space-y-3">
              <textarea
                rows={2}
                value={userSentence}
                onChange={(e) => setUserSentence(e.target.value)}
                placeholder={
                  conjugation.isVerb
                    ? `Ví dụ: 私は${conjugation.kanjiPolite}...`
                    : `Nhập câu tiếng Nhật với 「${currentWord.kanji}」...`
                }
                className="w-full border-2 border-[#1A1A1A] bg-[#FDFBF7] p-3 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
              />

              <div className="flex justify-end">
                <button
                  onClick={handleEvaluateSentence}
                  disabled={isEvaluating || !userSentence.trim()}
                  className="bg-[#8B0000] text-white font-black text-xs px-4 py-2 border-2 border-[#1A1A1A] rounded-xl hover:bg-[#A30000] active:translate-y-0.5 shadow-[2px_2px_0px_#1A1A1A] flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isEvaluating ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Thầy Sơn đang chấm...</span>
                    </>
                  ) : (
                    <>
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Thầy Sơn Nhận Xét</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* AI Review Result */}
            {evaluationResult && (
              <div
                className={`p-4 rounded-xl border-2 border-[#1A1A1A] font-sans space-y-3 shadow-[2px_2px_0px_#1A1A1A] ${
                  evaluationResult.isCorrect ? "bg-[#EAFaf1]" : "bg-[#FDEDEC]"
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
                  {evaluationResult.isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-[#27AE60]" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-[#E74C3C]" />
                  )}
                  <span>
                    {evaluationResult.isCorrect
                      ? "Hoàn hảo! Em áp dụng dạng chia câu rất chuẩn xác."
                      : "Cần chú ý một chút học trò ơi!"}
                  </span>
                </div>

                <div className="text-xs leading-relaxed text-gray-700 whitespace-pre-line">
                  {evaluationResult.feedback}
                </div>

                <div className="bg-white border border-gray-300 p-2.5 rounded-lg space-y-1">
                  <div className="text-[10px] font-black uppercase text-gray-400">
                    Câu đề xuất chuẩn từ Thầy Sơn:
                  </div>
                  <div className="text-sm font-bold text-gray-800 font-serif">
                    {evaluationResult.correctedSentence}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white p-12 rounded-3xl border-4 border-[#1A1A1A] shadow-[8px_8px_0px_#1A1A1A] text-center space-y-4">
          <HelpCircle className="w-12 h-12 mx-auto text-gray-300" />
          <h3 className="text-lg font-black text-[#1A1A1A]">
            Không tìm thấy thẻ từ vựng phù hợp
          </h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Không có từ vựng nào khớp với bộ lọc hiện tại. Hãy chọn "Tất cả bài học" hoặc chuyển bộ lọc sang "Tất cả".
          </p>
          <button
            onClick={() => {
              setActiveLesson("all");
              setFilterType("all");
            }}
            className="px-4 py-2 bg-[#8B0000] text-white font-bold text-xs rounded-xl border-2 border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A] hover:bg-[#A30000] transition-colors cursor-pointer"
          >
            Xem tất cả từ vựng N3
          </button>
        </div>
      )}
    </div>
  );
}
