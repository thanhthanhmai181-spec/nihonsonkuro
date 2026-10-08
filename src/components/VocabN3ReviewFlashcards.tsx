import React, { useState, useMemo, useEffect, useCallback } from "react";
import { RAW_N3_VOCAB, VocabN3Item } from "../data/vocabN3";
import { playSound } from "../utils/audio";
import {
  Volume2,
  Check,
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  BookOpen,
  Layers,
  HelpCircle
} from "lucide-react";

interface VocabN3ReviewFlashcardsProps {
  wordStates: Record<number, "new" | "learning" | "mastered">;
  updateWordStatus: (wordId: number, newStatus: "new" | "learning" | "mastered") => void;
  selectedLesson: string;
  onSelectLesson: (lesson: string) => void;
  lessons: number[];
  speakJapanese: (text: string) => void;
}

export default function VocabN3ReviewFlashcards({
  wordStates,
  updateWordStatus,
  selectedLesson,
  onSelectLesson,
  lessons,
  speakJapanese
}: VocabN3ReviewFlashcardsProps) {
  // Lesson filter
  const [activeLesson, setActiveLesson] = useState<string>(selectedLesson || "all");
  const [filterType, setFilterType] = useState<"all" | "unmastered" | "mastered">("all");

  // Navigation, flip & shuffle state
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [shuffledSeed, setShuffledSeed] = useState<number>(0);

  // Sync active lesson with parent
  useEffect(() => {
    if (selectedLesson) {
      setActiveLesson(selectedLesson);
    }
  }, [selectedLesson]);

  // Compute cards list
  const cardList = useMemo(() => {
    let list = [...RAW_N3_VOCAB];

    // Filter by lesson
    if (activeLesson !== "all") {
      const lesNum = parseInt(activeLesson);
      list = list.filter((w) => w.lesson === lesNum);
    }

    // Filter by status
    if (filterType === "unmastered") {
      list = list.filter((w) => (wordStates[w.id] || "new") !== "mastered");
    } else if (filterType === "mastered") {
      list = list.filter((w) => (wordStates[w.id] || "new") === "mastered");
    }

    // Shuffle when shuffledSeed > 0
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

  // Reset index when lesson / filter / shuffle changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [activeLesson, filterType, shuffledSeed]);

  const currentWord: VocabN3Item | undefined = cardList[currentIndex];

  // Handle Flip
  const handleFlip = useCallback(() => {
    playSound.flip();
    setIsFlipped((prev) => !prev);
  }, []);

  // Handle Next
  const handleNext = useCallback(() => {
    playSound.click();
    if (currentIndex + 1 < cardList.length) {
      setIsFlipped(false);
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, cardList.length]);

  // Handle Prev
  const handlePrev = useCallback(() => {
    playSound.click();
    if (currentIndex > 0) {
      setIsFlipped(false);
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  // Grade card
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
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 180);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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

  // Shuffle handler
  const handleShuffle = () => {
    playSound.click();
    setShuffledSeed((prev) => prev + 1);
  };

  // Status counts for current lesson
  const currentStatusCounts = useMemo(() => {
    let list = RAW_N3_VOCAB;
    if (activeLesson !== "all") {
      const lesNum = parseInt(activeLesson);
      list = list.filter((w) => w.lesson === lesNum);
    }
    let mastered = 0;
    list.forEach((w) => {
      if ((wordStates[w.id] || "new") === "mastered") mastered++;
    });
    return {
      total: list.length,
      mastered,
      unmastered: list.length - mastered
    };
  }, [activeLesson, wordStates]);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* 1. Header & Filters Toolbar */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border-4 border-[#1A1A1A] shadow-[6px_6px_0px_#1A1A1A] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-gray-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div
              className="w-10 h-10 rounded-xl bg-[#8B0000] text-white flex items-center justify-center font-black shadow-[2px_2px_0px_#1A1A1A] text-xl font-ms-mincho"
              style={{ fontFamily: '"MS Mincho", "MS PMincho", "ＭＳ 明朝", "ＭＳ Ｐ明朝", "Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif' }}
            >
              漢
            </div>
            <div>
              <h2 className="text-xl font-black text-[#1A1A1A] flex items-center gap-2">
                Flashcard Ôn Tập
                <span className="text-xs bg-red-100 text-[#8B0000] font-black px-2.5 py-0.5 rounded-full border border-red-200">
                  Mặt trước: Chữ Hán • Mặt sau: Cách đọc, Ý nghĩa
                </span>
              </h2>
              <p className="text-xs font-bold text-gray-500">
                Luyện phản xạ nhận diện chữ Hán • Chia theo bài học • Có thể xáo trộn ngẫu nhiên
              </p>
            </div>
          </div>

          {/* Shuffle button */}
          <button
            onClick={handleShuffle}
            title="Xáo trộn ngẫu nhiên thứ tự thẻ"
            className="flex items-center gap-1.5 text-xs font-black bg-[#FDFBF7] hover:bg-gray-100 text-[#1A1A1A] border-2 border-[#1A1A1A] px-3.5 py-2 rounded-xl shadow-[3px_3px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer self-start sm:self-auto"
          >
            <Shuffle className="w-4 h-4 text-[#8B0000]" />
            <span>Xáo trộn</span>
          </button>
        </div>

        {/* Filter Controls: Lesson & Status */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
          {/* Lesson Selector */}
          <div className="sm:col-span-6">
            <label className="block text-xs font-black text-gray-700 mb-1">
              Chọn bài học:
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
              <option value="all">Tất cả bài học (Bài 1 - 30 • {RAW_N3_VOCAB.length} từ)</option>
              {lessons.map((les) => (
                <option key={les} value={les}>
                  Bài {les} ({RAW_N3_VOCAB.filter((w) => w.lesson === les).length} từ)
                </option>
              ))}
            </select>
          </div>

          {/* Filter Pills */}
          <div className="sm:col-span-6">
            <label className="block text-xs font-black text-gray-700 mb-1">
              Lọc trạng thái nhớ:
            </label>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => { playSound.click(); setFilterType("all"); }}
                className={`text-xs font-black px-2.5 py-1.5 rounded-lg border-2 border-[#1A1A1A] transition-all cursor-pointer ${
                  filterType === "all" ? "bg-[#1A1A1A] text-white shadow-[2px_2px_0px_#8B0000]" : "bg-white hover:bg-gray-100"
                }`}
              >
                Tất cả ({currentStatusCounts.total})
              </button>
              <button
                onClick={() => { playSound.click(); setFilterType("unmastered"); }}
                className={`text-xs font-black px-2.5 py-1.5 rounded-lg border-2 border-[#1A1A1A] transition-all cursor-pointer ${
                  filterType === "unmastered" ? "bg-[#8B0000] text-white shadow-[2px_2px_0px_#1A1A1A]" : "bg-white hover:bg-gray-100"
                }`}
              >
                Chưa thuộc ({currentStatusCounts.unmastered})
              </button>
              <button
                onClick={() => { playSound.click(); setFilterType("mastered"); }}
                className={`text-xs font-black px-2.5 py-1.5 rounded-lg border-2 border-[#1A1A1A] transition-all cursor-pointer ${
                  filterType === "mastered" ? "bg-[#27AE60] text-white shadow-[2px_2px_0px_#1A1A1A]" : "bg-white hover:bg-gray-100"
                }`}
              >
                Đã thuộc ({currentStatusCounts.mastered})
              </button>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        {cardList.length > 0 && (
          <div className="space-y-1 pt-2 border-t border-gray-100">
            <div className="flex justify-between items-center text-xs font-black text-gray-600">
              <span>
                Thẻ {currentIndex + 1} / {cardList.length}
                {shuffledSeed > 0 && <span className="ml-2 text-[#8B0000] font-bold">(Đang xáo trộn)</span>}
              </span>
              <span className="text-[#8B0000]">
                {Math.round(((currentIndex + 1) / cardList.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 h-2.5 rounded-full border border-[#1A1A1A] overflow-hidden">
              <div
                className="bg-[#8B0000] h-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / cardList.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* 2. Main Flashcard Area */}
      {cardList.length > 0 && currentWord ? (
        <div className="space-y-6">
          {/* 3D Flip Flashcard */}
          <div className="perspective-1000 w-full min-h-[360px]">
            <div
              onClick={handleFlip}
              className={`relative w-full min-h-[360px] transition-transform duration-500 transform-style-3d cursor-pointer select-none ${
                isFlipped ? "rotate-y-180" : ""
              }`}
            >
              {/* === CARD FRONT: ONLY KANJI === */}
              <div className="absolute inset-0 w-full h-full bg-white border-4 border-[#1A1A1A] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-[8px_8px_0px_#1A1A1A] backface-hidden">
                {/* Top Badges */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] bg-red-50 border border-red-200 text-[#8B0000] rounded-lg px-2.5 py-1 font-black uppercase tracking-wide">
                      Bài {currentWord.lesson}
                    </span>
                    <span className="text-[11px] bg-amber-50 border border-amber-200 text-amber-900 rounded-lg px-2.5 py-1 font-black uppercase tracking-wide">
                      MẶT TRƯỚC: CHỮ HÁN
                    </span>

                    {/* Mastery Status Badge */}
                    {(wordStates[currentWord.id] || "new") === "mastered" ? (
                      <span className="text-[11px] bg-[#2ECC71]/15 text-[#27AE60] border border-[#2ECC71] rounded-lg px-2 py-0.5 font-black">
                        ✓ ĐÃ THUỘC
                      </span>
                    ) : (wordStates[currentWord.id] || "new") === "learning" ? (
                      <span className="text-[11px] bg-[#F1C40F]/20 text-amber-700 border border-[#F1C40F] rounded-lg px-2 py-0.5 font-black">
                        ⟳ CẦN ÔN
                      </span>
                    ) : null}
                  </div>

                  {/* Audio Pronunciation */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakJapanese(currentWord.kanji);
                    }}
                    className="p-2 border-2 border-[#1A1A1A] rounded-xl bg-gray-50 hover:bg-[#8B0000]/10 text-gray-700 hover:text-[#8B0000] transition-colors cursor-pointer shadow-[2px_2px_0px_#1A1A1A]"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Center Word: Strictly Kanji Only */}
                <div className="text-center my-auto space-y-4 py-6">
                  {/* Big Prominent Kanji */}
                  <div
                    className="text-6xl sm:text-7xl font-black tracking-tight text-[#1A1A1A] font-ms-mincho"
                    style={{ fontFamily: '"MS Mincho", "MS PMincho", "ＭＳ 明朝", "ＭＳ Ｐ明朝", "Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif' }}
                  >
                    {currentWord.kanji}
                  </div>

                  {/* Flip Hint */}
                  <div className="text-xs font-bold text-gray-400">
                    (Nhấp chuột hoặc bấm <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-[10px] text-gray-600 font-sans">Space</kbd> để lật xem cách đọc và ý nghĩa)
                  </div>
                </div>

                {/* Footer hints */}
                <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase tracking-wider border-t border-gray-100 pt-3">
                  <span>Flashcard Ôn Tập • Thầy Sơn N3</span>
                  <span>Phím 1: Cần ôn • Phím 2: Đã thuộc</span>
                </div>
              </div>

              {/* === CARD BACK: READING & MEANING === */}
              <div className="absolute inset-0 w-full h-full bg-[#FDFBF7] border-4 border-[#1A1A1A] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-[8px_8px_0px_#1A1A1A] backface-hidden rotate-y-180">
                {/* Top Badges */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] bg-red-50 border border-red-200 rounded px-2.5 py-1 text-[#8B0000] font-black uppercase">
                      MẶT SAU: CÁCH ĐỌC &amp; Ý NGHĨA
                    </span>
                    <span className="text-[11px] bg-gray-100 border border-gray-300 text-gray-700 rounded px-2 py-0.5 font-bold">
                      Bài {currentWord.lesson}
                    </span>
                  </div>

                  {/* Audio */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakJapanese(currentWord.kanji);
                    }}
                    className="p-2 border-2 border-[#1A1A1A] rounded-xl bg-white hover:bg-[#8B0000]/10 text-gray-700 hover:text-[#8B0000] transition-colors cursor-pointer shadow-[2px_2px_0px_#1A1A1A]"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Center Content */}
                <div className="text-center my-auto space-y-4 py-4">
                  {/* Reading (Hiragana / Katakana) */}
                  <div className="space-y-1">
                    <div className="text-xs font-black text-gray-400 uppercase tracking-wider">
                      CÁCH ĐỌC (FURIGANA / KANA)
                    </div>
                    <div
                      className="text-2xl sm:text-3xl font-extrabold text-gray-700 tracking-wide font-ms-mincho"
                      style={{ fontFamily: '"MS Mincho", "MS PMincho", "ＭＳ 明朝", "ＭＳ Ｐ明朝", "Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif' }}
                    >
                      {currentWord.kana}
                    </div>
                  </div>

                  {/* Kanji Reference */}
                  <div
                    className="text-3xl sm:text-4xl font-black text-[#1A1A1A] font-ms-mincho"
                    style={{ fontFamily: '"MS Mincho", "MS PMincho", "ＭＳ 明朝", "ＭＳ Ｐ明朝", "Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif' }}
                  >
                    {currentWord.kanji}
                  </div>

                  {/* Meaning (Vietnamese) */}
                  <div className="space-y-1 max-w-lg mx-auto">
                    <div className="text-xs font-black text-gray-400 uppercase tracking-wider">
                      Ý NGHĨA TIẾNG VIỆT
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-[#8B0000]">
                      {currentWord.meaning}
                    </div>
                  </div>

                  {/* Collocation / Example if available */}
                  {currentWord.collocation && (
                    <div className="bg-white border-2 border-[#1A1A1A] p-3 rounded-2xl max-w-md mx-auto text-left shadow-[2px_2px_0px_#1A1A1A]">
                      <span className="text-[10px] font-extrabold text-[#8B0000] uppercase tracking-wide block">
                        Ví dụ / Cụm từ đi kèm:
                      </span>
                      <span
                        className="text-xs sm:text-sm font-bold text-[#1A1A1A] font-ms-mincho"
                        style={{ fontFamily: '"MS Mincho", "MS PMincho", "ＭＳ 明朝", "ＭＳ Ｐ明朝", "Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif' }}
                      >
                        {currentWord.collocation}
                      </span>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase border-t border-gray-200 pt-3">
                  <span>Nhấp chuột để lật lại mặt trước</span>
                  <span>Phím ←: Thẻ trước • Phím →: Thẻ sau</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Bottom Controls & Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border-4 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A]">
            {/* Prev button */}
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="w-full sm:w-auto px-5 py-3 border-2 border-[#1A1A1A] rounded-xl font-black text-sm bg-[#FDFBF7] hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_#1A1A1A] active:translate-y-0.5 active:shadow-none cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Thẻ trước</span>
            </button>

            {/* Quick Rating (Connected to word memory counting) */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
              <button
                onClick={() => handleGrade("learning")}
                className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl border-2 border-[#1A1A1A] font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_#1A1A1A] active:translate-y-0.5 active:shadow-none transition-all ${
                  (wordStates[currentWord.id] || "new") === "learning"
                    ? "bg-[#F1C40F] text-black"
                    : "bg-white hover:bg-amber-50 text-[#1A1A1A]"
                }`}
                title="Đánh dấu cần ôn tập lại (Phím 1)"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Cần ôn lại</span>
              </button>

              <button
                onClick={() => handleGrade("mastered")}
                className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl border-2 border-[#1A1A1A] font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_#1A1A1A] active:translate-y-0.5 active:shadow-none transition-all ${
                  (wordStates[currentWord.id] || "new") === "mastered"
                    ? "bg-[#2ECC71] text-white"
                    : "bg-white hover:bg-emerald-50 text-[#1A1A1A]"
                }`}
                title="Đánh dấu đã ghi nhớ (Phím 2)"
              >
                <Check className="w-4 h-4 text-[#27AE60]" />
                <span>Đã thuộc</span>
              </button>
            </div>

            {/* Next button */}
            <button
              onClick={handleNext}
              disabled={currentIndex + 1 >= cardList.length}
              className="w-full sm:w-auto px-5 py-3 bg-[#8B0000] text-white border-2 border-[#1A1A1A] rounded-xl font-black text-sm hover:bg-[#A30000] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_#1A1A1A] active:translate-y-0.5 active:shadow-none cursor-pointer"
            >
              <span>Thẻ kế tiếp</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white p-10 rounded-3xl border-4 border-[#1A1A1A] shadow-[8px_8px_0px_#1A1A1A] text-center space-y-4">
          <HelpCircle className="w-12 h-12 mx-auto text-gray-400" />
          <h3 className="text-lg font-black text-[#1A1A1A]">
            Không tìm thấy từ vựng nào phù hợp!
          </h3>
          <p className="text-sm text-gray-500">
            Hãy đổi bộ lọc trạng thái hoặc chọn bài học khác để tiếp tục ôn tập flashcard.
          </p>
          <button
            onClick={() => {
              setFilterType("all");
              setActiveLesson("all");
              onSelectLesson("all");
            }}
            className="px-5 py-2.5 bg-[#8B0000] text-white rounded-xl font-black border-2 border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A] cursor-pointer"
          >
            Hiện tất cả từ vựng
          </button>
        </div>
      )}
    </div>
  );
}
