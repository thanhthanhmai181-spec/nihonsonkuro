import React, { useState, useEffect } from "react";
import { Vocabulary, UserProgress } from "../types";
import { playSound } from "../utils/audio";
import { ChevronLeft, ChevronRight, Volume2, Star, CheckCircle, RotateCcw, Heart, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getGeminiHeaders } from "../utils/geminiKey";

interface FlashcardSetProps {
  level: "N5" | "N4" | "N3" | "Anime" | "Travel";
  vocabList: Vocabulary[];
  progress: UserProgress;
  updateProgress: (updated: Partial<UserProgress>) => void;
  onGoBack: () => void;
}

// Helper for dynamic font sizing based on Japanese word length (ensuring 5+ char words stay on 1 line on all screens)
const getVocabFontSizeClass = (text: string) => {
  const len = text ? text.length : 0;
  if (len <= 3) {
    return "text-5xl sm:text-7xl md:text-8xl";
  } else if (len === 4) {
    return "text-4xl sm:text-6xl md:text-7xl";
  } else if (len === 5) {
    return "text-3xl sm:text-4xl md:text-6xl";
  } else if (len === 6) {
    return "text-2xl sm:text-3xl md:text-5xl";
  } else if (len === 7) {
    return "text-xl sm:text-2xl md:text-4xl";
  } else {
    return "text-lg sm:text-xl md:text-3xl";
  }
};

const getKanaFontSizeClass = (text: string) => {
  const len = text ? text.length : 0;
  if (len <= 4) {
    return "text-2xl sm:text-3xl";
  } else if (len <= 6) {
    return "text-lg sm:text-2xl";
  } else {
    return "text-base sm:text-xl";
  }
};

export default function FlashcardSet({ level, vocabList, progress, updateProgress, onGoBack }: FlashcardSetProps) {
  const filteredVocab = vocabList.filter(v => v.level === level);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [filterType, setFilterType] = useState<"all" | "unlearned" | "favorites">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả");

  // Load/save AI examples from localStorage
  const [aiExamples, setAiExamples] = useState<Record<string, { example: string; exampleMeaning: string }>>(() => {
    try {
      const saved = localStorage.getItem("hoc_cung_thay_son_ai_examples");
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [isLoadingExample, setIsLoadingExample] = useState(false);
  const [exampleError, setExampleError] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("hoc_cung_thay_son_ai_examples", JSON.stringify(aiExamples));
  }, [aiExamples]);

  const categories = ["Tất cả", ...Array.from(new Set(filteredVocab.map(v => v.category)))];

  // Apply filters
  const displayedVocab = filteredVocab.filter(vocab => {
    const matchesCategory = selectedCategory === "Tất cả" || vocab.category === selectedCategory;
    
    if (filterType === "unlearned") {
      return matchesCategory && !progress.learnedWordIds.includes(vocab.id);
    }
    if (filterType === "favorites") {
      return matchesCategory && progress.favoriteWordIds.includes(vocab.id);
    }
    return matchesCategory;
  });

  const currentWord = displayedVocab[currentIndex];

  const getEffectiveExample = (word: Vocabulary) => {
    if (!word) return null;
    if (word.example && word.example !== "N/A") {
      return { example: word.example, exampleMeaning: word.exampleMeaning };
    }
    return aiExamples[word.id] || null;
  };

  const fetchAiExampleForWord = async (word: Vocabulary) => {
    if (!word || isLoadingExample) return;
    setIsLoadingExample(true);
    setExampleError(null);

    try {
      const response = await fetch("/api/gemini/generate-example", {
        method: "POST",
        headers: getGeminiHeaders(),
        body: JSON.stringify({
          word: word.word,
          reading: word.reading,
          meaning: word.meaning,
          level: word.level,
          category: word.category
        })
      });

      if (!response.ok) {
        throw new Error("Không thể tải ví dụ từ Thầy Sơn AI.");
      }

      const data = await response.json();
      if (data.example && data.example !== "N/A") {
        setAiExamples(prev => ({
          ...prev,
          [word.id]: {
            example: data.example,
            exampleMeaning: data.exampleMeaning
          }
        }));
      } else {
        throw new Error("Dữ liệu ví dụ rỗng hoặc không đúng định dạng.");
      }
    } catch (err: any) {
      console.error(err);
      setExampleError("Có lỗi khi tạo ví dụ bằng AI. Nhấp để thử lại nhé!");
    } finally {
      setIsLoadingExample(false);
    }
  };

  // Trigger auto-fetch when flipped to back and example is missing
  useEffect(() => {
    if (isFlipped && currentWord) {
      const existing = getEffectiveExample(currentWord);
      if (!existing && !isLoadingExample) {
        fetchAiExampleForWord(currentWord);
      }
    }
  }, [isFlipped, currentIndex, currentWord]);

  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [level, filterType, selectedCategory]);

  const handleFlip = () => {
    playSound.flip();
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentIndex < displayedVocab.length - 1) {
      playSound.click();
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 150);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      playSound.click();
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex(prev => prev - 1);
      }, 150);
    }
  };

  // Keyboard navigation for flashcards
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;
      if (
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          (activeElement as HTMLElement).isContentEditable)
      ) {
        return;
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === " " || e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
        handleFlip();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, displayedVocab.length, isFlipped]);

  const handleToggleLearned = (e: React.MouseEvent, wordId: string) => {
    e.stopPropagation();
    playSound.click();
    
    const isAlreadyLearned = progress.learnedWordIds.includes(wordId);
    let updatedLearned = [...progress.learnedWordIds];
    let newXp = progress.xp;

    if (isAlreadyLearned) {
      updatedLearned = updatedLearned.filter(id => id !== wordId);
      newXp = Math.max(0, newXp - 10);
    } else {
      updatedLearned.push(wordId);
      newXp += 10;
      playSound.achievement();
    }

    updateProgress({
      learnedWordIds: updatedLearned,
      xp: newXp
    });

    // Also sync with n5_srs_v8 if this is an N5 word
    const matchN5 = wordId.match(/^(?:n5_)?(\d+)$/i);
    if (matchN5) {
      const numId = parseInt(matchN5[1], 10);
      try {
        const savedSRS = localStorage.getItem('n5_srs_v8');
        let parsedSRS: Record<string, any> = savedSRS ? JSON.parse(savedSRS) : {};
        if (isAlreadyLearned) {
          parsedSRS[numId] = [0, new Date().toISOString().slice(0, 10), 2.5, 0];
        } else {
          parsedSRS[numId] = [1, new Date().toISOString().slice(0, 10), 2.5, 1];
        }
        localStorage.setItem('n5_srs_v8', JSON.stringify(parsedSRS));
      } catch (err) {}
    }

    window.dispatchEvent(new CustomEvent("local-storage-changed", { detail: { key: "hoc_cung_thay_son_progress" } }));
  };

  const handleToggleFavorite = (e: React.MouseEvent, wordId: string) => {
    e.stopPropagation();
    playSound.click();
    
    const isFav = progress.favoriteWordIds.includes(wordId);
    const updatedFavs = isFav
      ? progress.favoriteWordIds.filter(id => id !== wordId)
      : [...progress.favoriteWordIds, wordId];

    updateProgress({ favoriteWordIds: updatedFavs });
  };

  // Speak Japanese using standard Web Speech API
  const handleSpeak = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    playSound.click();
    
    if (!("speechSynthesis" in window)) {
      alert("Trình duyệt không hỗ trợ đọc tiếng!");
      return;
    }
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.rate = 0.85; // slightly slower for better learning
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div id="flashcard-set-container" className="space-y-6">
      {/* Header and Filter controllers */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-[32px] border border-natural-border shadow-sm">
        <div className="space-y-1">
          <button 
            onClick={onGoBack}
            className="text-natural-muted hover:text-pink-600 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
          >
            ← Trở về trang chủ
          </button>
          <h3 className="text-xl font-black text-natural-deep flex items-center gap-2 mt-1">
            <span>BÀI HỌC: LEVEL {level}</span>
            <span className="text-xs bg-pink-50 text-pink-600 px-2.5 py-0.5 rounded-full font-bold border border-pink-100">
              {filteredVocab.length} từ vựng
            </span>
          </h3>
        </div>

        {/* Tab Controllers */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => { playSound.click(); setFilterType("all"); }}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold border transition-all cursor-pointer ${filterType === "all" ? "bg-pink-600 border-pink-600 text-white shadow-sm" : "bg-white border-natural-border text-natural-text hover:bg-natural-soft"}`}
          >
            Tất cả
          </button>
          <button
            onClick={() => { playSound.click(); setFilterType("unlearned"); }}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold border transition-all cursor-pointer ${filterType === "unlearned" ? "bg-pink-600 border-pink-600 text-white shadow-sm" : "bg-white border-natural-border text-natural-text hover:bg-natural-soft"}`}
          >
            Chưa thuộc ({filteredVocab.filter(v => !progress.learnedWordIds.includes(v.id)).length})
          </button>
          <button
            onClick={() => { playSound.click(); setFilterType("favorites"); }}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold border transition-all cursor-pointer ${filterType === "favorites" ? "bg-pink-600 border-pink-600 text-white shadow-sm" : "bg-white border-natural-border text-natural-text hover:bg-natural-soft"}`}
          >
            Đã thích ({filteredVocab.filter(v => progress.favoriteWordIds.includes(v.id)).length})
          </button>
        </div>
      </div>

      {/* Category Dropdown Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs font-black text-natural-muted uppercase shrink-0">Chủ đề:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { playSound.click(); setSelectedCategory(cat); }}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${selectedCategory === cat ? "bg-pink-100 text-pink-700 border border-pink-200" : "bg-natural-soft text-natural-text border border-natural-border/60 hover:bg-natural-sand"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {displayedVocab.length === 0 ? (
        <div className="bg-white rounded-[32px] p-12 text-center border border-natural-border shadow-sm space-y-4">
          <span className="text-5xl">🌸</span>
          <h4 className="font-black text-natural-deep text-lg">Hộp từ vựng hiện đang trống!</h4>
          <p className="text-natural-muted text-xs max-w-md mx-auto leading-relaxed">
            Không tìm thấy từ vựng nào phù hợp với bộ lọc đã chọn. Hãy thử chuyển sang chủ đề khác hoặc thêm từ mới vào Sổ Tay của em nhé!
          </p>
          <button
            onClick={() => { playSound.click(); setFilterType("all"); setSelectedCategory("Tất cả"); }}
            className="px-4 py-2.5 bg-pink-600 hover:bg-pink-700 text-white font-extrabold rounded-2xl text-xs cursor-pointer transition-all"
          >
            Reset Bộ Lọc
          </button>
        </div>
      ) : (
        <div className="max-w-xl mx-auto space-y-6">
          {/* Progress gauge */}
          <div className="flex items-center justify-between text-xs font-bold text-natural-muted px-1">
            <span>Từ số {currentIndex + 1} / {displayedVocab.length}</span>
            <span>Tiến trình: {Math.round(((currentIndex + 1) / displayedVocab.length) * 100)}%</span>
          </div>
          
          <div className="w-full bg-natural-soft h-2.5 rounded-full overflow-hidden border border-natural-border/40">
            <div 
              className="bg-pink-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / displayedVocab.length) * 100}%` }}
            />
          </div>

          {/* Flashcard 3D structure */}
          <div 
            id="flashcard-deck"
            onClick={handleFlip}
            className="perspective-1000 w-full h-96 sm:h-[400px] cursor-pointer group relative"
          >
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full h-full transform-style-3d relative rounded-[32px] shadow-lg border border-natural-border"
            >
              {/* CARD FRONT */}
              <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-natural-soft via-white to-natural-sand rounded-[32px] p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
                {/* Visual decorations for Japanese theme */}
                <div className="absolute right-0 bottom-0 text-natural-border/30 text-9xl pointer-events-none font-extrabold select-none">
                  和
                </div>

                <div className="flex items-center justify-between z-10">
                  <span className="text-xs bg-pink-50 text-pink-600 border border-pink-100 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                    {currentWord.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleSpeak(e, currentWord.word)}
                      className="p-2.5 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-all shadow-sm cursor-pointer"
                      title="Nghe phát âm chuẩn"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => handleToggleFavorite(e, currentWord.id)}
                      className="p-2.5 bg-white text-pink-600 border border-natural-border rounded-full hover:scale-105 transition-all shadow-sm cursor-pointer"
                    >
                      <Heart className={`w-4 h-4 ${progress.favoriteWordIds.includes(currentWord.id) ? "fill-pink-600 text-pink-600" : ""}`} />
                    </button>
                  </div>
                </div>

                {/* Primary Content Word */}
                <div className="text-center space-y-3 z-10 w-full flex flex-col items-center justify-center">
                  <h1 className={`font-black text-black tracking-tight leading-none font-yu-gothic whitespace-nowrap max-w-full overflow-hidden text-center px-1 ${getVocabFontSizeClass(currentWord.word)}`}>
                    {currentWord.word}
                  </h1>
                  <p className={`text-black font-yu-gothic font-bold tracking-wider whitespace-nowrap max-w-full overflow-hidden text-center px-1 ${getKanaFontSizeClass(currentWord.reading)}`}>
                    {currentWord.reading}
                  </p>
                </div>

                <div className="flex items-center justify-between z-10">
                  <span className="text-natural-muted text-xs flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-pink-500" />
                    Ấn vào thẻ để xem giải nghĩa
                  </span>
                  
                  <button
                    onClick={(e) => handleToggleLearned(e, currentWord.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${progress.learnedWordIds.includes(currentWord.id) ? "bg-emerald-100 border-emerald-200 text-emerald-800" : "bg-white border-natural-border text-natural-text hover:bg-natural-soft"}`}
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{progress.learnedWordIds.includes(currentWord.id) ? "Đã thuộc (+10 XP)" : "Chưa thuộc"}</span>
                  </button>
                </div>
              </div>

              {/* CARD BACK */}
              <div 
                className="absolute inset-0 backface-hidden bg-[#2D241E] rounded-[32px] p-6 sm:p-8 flex flex-col justify-between overflow-hidden text-white"
                style={{ transform: "rotateY(180deg)" }}
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs bg-pink-500 text-white px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                    Định nghĩa
                  </span>
                  <span className="text-xs font-mono text-pink-300 tracking-wider">
                    [{currentWord.romaji}]
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Meaning translation in elegant display */}
                  <div className="text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-pink-400 tracking-tight leading-tight">
                      {currentWord.meaning}
                    </h2>
                    <p className={`text-white font-yu-gothic font-bold mt-2 whitespace-nowrap max-w-full overflow-hidden text-center px-1 ${getKanaFontSizeClass(currentWord.reading)}`}>
                      {currentWord.reading}
                    </p>
                  </div>

                  {/* Japanese Example sentence */}
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-2 relative min-h-[100px] flex flex-col justify-center text-left">
                    {(() => {
                      const effective = getEffectiveExample(currentWord);
                      if (effective) {
                        return (
                          <>
                            <p className="text-xs text-pink-300 font-bold uppercase tracking-wider flex items-center justify-between">
                              <span>Ví dụ:</span>
                              <button 
                                onClick={(e) => handleSpeak(e, effective.example)}
                                className="text-pink-400 hover:text-white cursor-pointer px-2 py-0.5 rounded hover:bg-white/10 transition-colors flex items-center gap-1"
                                title="Nghe câu ví dụ"
                              >
                                <span>🔊 Nghe phát âm</span>
                              </button>
                            </p>
                            <p className="text-base font-semibold tracking-wide font-yu-gothic text-white">{effective.example}</p>
                            <p className="text-xs text-slate-300 italic">{effective.exampleMeaning}</p>
                          </>
                        );
                      }
                      
                      if (isLoadingExample) {
                        return (
                          <div className="flex flex-col items-center justify-center py-2 space-y-2 text-pink-300 text-xs">
                            <span className="animate-spin text-lg">🌸</span>
                            <p className="font-bold animate-pulse text-center">🔮 Thầy Sơn AI đang viết ví dụ siêu cấp...</p>
                          </div>
                        );
                      }

                      if (exampleError) {
                        return (
                          <div className="flex flex-col items-center justify-center py-1 space-y-2 text-center">
                            <p className="text-xs text-rose-400">{exampleError}</p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                fetchAiExampleForWord(currentWord);
                              }}
                              className="px-3 py-1 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-[10px] font-bold cursor-pointer"
                            >
                              🔄 Thử lại
                            </button>
                          </div>
                        );
                      }

                      return (
                        <div className="flex flex-col items-center justify-center py-2 space-y-1 text-center">
                          <p className="text-[11px] text-slate-400">Chưa có câu ví dụ cho từ này.</p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              fetchAiExampleForWord(currentWord);
                            }}
                            className="px-3 py-1 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-[10px] font-bold cursor-pointer"
                          >
                            ✨ Tạo ví dụ AI
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Level {currentWord.level} • {currentWord.category}</span>
                  <span className="text-pink-400 flex items-center gap-1 animate-pulse">
                    <RotateCcw className="w-3.5 h-3.5" />
                    Ấn để xoay lại
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation Controls */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between px-2">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="p-3.5 rounded-2xl bg-white border border-natural-border shadow-sm text-natural-text disabled:opacity-40 disabled:cursor-not-allowed hover:bg-natural-soft transition-all cursor-pointer"
                title="Thẻ trước (Phím ◄)"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleFlip}
                className="px-8 py-3.5 rounded-2xl bg-pink-600 hover:bg-pink-700 text-white font-black text-sm shadow-sm hover:shadow-md transition-all uppercase tracking-wider cursor-pointer"
                title="Lật thẻ (Phím Space)"
              >
                LẬT THẺ 🔄
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex === displayedVocab.length - 1}
                className="p-3.5 rounded-2xl bg-white border border-natural-border shadow-sm text-natural-text disabled:opacity-40 disabled:cursor-not-allowed hover:bg-natural-soft transition-all cursor-pointer"
                title="Thẻ tiếp (Phím ►)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="text-center text-[11px] text-natural-muted font-medium pt-1">
              💡 Phím tắt: <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-[10px] font-mono">◄</kbd> Lùi • <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-[10px] font-mono">►</kbd> Tới • <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-[10px] font-mono">Space</kbd> Lật thẻ
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
