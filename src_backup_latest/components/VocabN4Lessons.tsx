import React, { useState, useEffect, useMemo } from "react";
import { playSound } from "../utils/audio";
import { RAW_N4_VOCAB, VocabN4Item } from "../data/vocabN4";
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
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface VocabN4LessonsProps {
  onGoBack: () => void;
}

interface UserWordState {
  id: number;
  status: "new" | "learning" | "mastered";
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

export default function VocabN4Lessons({ onGoBack }: VocabN4LessonsProps) {
  // Navigation & Screen states
  const [activeTab, setActiveTab] = useState<"dashboard" | "library" | "flashcard" | "quiz">("dashboard");
  const [selectedLesson, setSelectedLesson] = useState<string>("all");
  
  // Progress states mapped by word ID
  const [wordStates, setWordStates] = useState<Record<number, "new" | "learning" | "mastered">>({});

  // Library / Wordlist filters
  const [libLesson, setLibLesson] = useState<string>("all");
  const [libTab, setLibTab] = useState<"all" | "learning" | "mastered">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Study Queue states
  const [studyQueue, setStudyQueue] = useState<VocabN4Item[]>([]);
  const [studyIndex, setStudyIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [studyFinished, setStudyFinished] = useState<boolean>(false);

  // Quiz states
  const [quizList, setQuizList] = useState<{
    word: VocabN4Item;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[]>([]);
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [answeredIndex, setAnsweredIndex] = useState<number | null>(null);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [quizActive, setQuizActive] = useState<boolean>(false);

  // Load progress from localStorage on mount and reactive changes
  useEffect(() => {
    const loadFromStorage = () => {
      const saved = localStorage.getItem("sk_vocab_n4_progress");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const stateMap: Record<number, "new" | "learning" | "mastered"> = {};
          RAW_N4_VOCAB.forEach((w) => {
            stateMap[w.id] = parsed[w.id] || "new";
          });
          setWordStates(stateMap);
        } catch (e) {
          console.error("Failed to load N4 Vocab progress:", e);
        }
      } else {
        const defaultState: Record<number, "new" | "learning" | "mastered"> = {};
        RAW_N4_VOCAB.forEach((w) => {
          defaultState[w.id] = "new";
        });
        setWordStates(defaultState);
      }
    };

    loadFromStorage();

    const handleStorageChange = (e: any) => {
      const key = e.detail?.key || e.key;
      if (!key || key === "sk_vocab_n4_progress") {
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

  // Save progress helper safely merged with current localStorage
  const updateWordStatus = (wordId: number, newStatus: "new" | "learning" | "mastered") => {
    const saved = localStorage.getItem("sk_vocab_n4_progress");
    let currentMap: Record<number, "new" | "learning" | "mastered"> = { ...wordStates };
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        Object.keys(parsed).forEach((k) => {
          const id = Number(k);
          if (parsed[id]) currentMap[id] = parsed[id];
        });
      } catch (e) {}
    }

    currentMap[wordId] = newStatus;
    setWordStates(currentMap);

    const progressToSave: Record<number, "new" | "learning" | "mastered"> = {};
    Object.keys(currentMap).forEach((key) => {
      const id = Number(key);
      if (currentMap[id] !== "new") {
        progressToSave[id] = currentMap[id];
      }
    });
    localStorage.setItem("sk_vocab_n4_progress", JSON.stringify(progressToSave));
    window.dispatchEvent(new CustomEvent("local-storage-changed", { detail: { key: "sk_vocab_n4_progress" } }));
  };

  // Lessons list extraction
  const lessons = useMemo(() => {
    const lessonNumbers = [...new Set(RAW_N4_VOCAB.map((w) => w.lesson))].sort((a, b) => a - b);
    return lessonNumbers;
  }, []);

  // Filtered vocabulary list based on active dashboard lesson
  const dashboardWords = useMemo(() => {
    if (selectedLesson === "all") return RAW_N4_VOCAB;
    const lesNum = parseInt(selectedLesson);
    return RAW_N4_VOCAB.filter((w) => w.lesson === lesNum);
  }, [selectedLesson]);

  // Overall database statistics
  const stats = useMemo(() => {
    const total = RAW_N4_VOCAB.length;
    let mastered = 0;
    let learning = 0;
    let fresh = 0;

    RAW_N4_VOCAB.forEach((w) => {
      const status = wordStates[w.id] || "new";
      if (status === "mastered") mastered++;
      else if (status === "learning") learning++;
      else fresh++;
    });

    const completionRate = total > 0 ? Math.round((mastered / total) * 100) : 0;

    return { total, mastered, learning, fresh, completionRate };
  }, [wordStates]);

  // Selected lesson statistics
  const currentLessonStats = useMemo(() => {
    const words = dashboardWords;
    const total = words.length;
    let mastered = 0;
    
    words.forEach((w) => {
      if ((wordStates[w.id] || "new") === "mastered") mastered++;
    });

    return { total, mastered };
  }, [dashboardWords, wordStates]);

  // Text-to-speech audio pronunciation
  const speakJapanese = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Start study session (flashcards)
  const handleStartLearning = (filterType?: "all" | "new" | "learning" | "mastered") => {
    playSound.click();
    let targets = [...dashboardWords];

    if (filterType) {
      if (filterType === "new") {
        targets = targets.filter((w) => (wordStates[w.id] || "new") === "new");
      } else if (filterType === "learning") {
        targets = targets.filter((w) => (wordStates[w.id] || "new") === "learning");
      } else if (filterType === "mastered") {
        targets = targets.filter((w) => (wordStates[w.id] || "new") === "mastered");
      }
    } else {
      // Default behavior: study non-mastered items
      targets = targets.filter((w) => (wordStates[w.id] || "new") !== "mastered");
    }

    if (targets.length === 0) {
      alert("Không có từ vựng nào phù hợp trong danh sách này để học.");
      return;
    }

    // Shuffle the targets
    const shuffled = [...targets].sort(() => Math.random() - 0.5);
    setStudyQueue(shuffled);
    setStudyIndex(0);
    setIsFlipped(false);
    setStudyFinished(false);
    setActiveTab("flashcard");
  };

  const handleFlip = () => {
    playSound.flip();
    setIsFlipped(!isFlipped);
  };

  const handleNextCard = () => {
    if (studyQueue.length === 0) return;
    playSound.click();
    setIsFlipped(false);
    setStudyIndex(prev => (prev + 1) % studyQueue.length);
  };

  const handlePrevCard = () => {
    if (studyQueue.length === 0) return;
    playSound.click();
    setIsFlipped(false);
    setStudyIndex(prev => (prev - 1 + studyQueue.length) % studyQueue.length);
  };

  // Keyboard navigation for Vocab N4 Flashcards
  useEffect(() => {
    if (activeTab !== "flashcard" || studyFinished) return;
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
        handleNextCard();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevCard();
      } else if (e.key === " " || e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
        handleFlip();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeTab, studyFinished, studyQueue.length, studyIndex, isFlipped]);

  const handleGradeCard = (status: "learning" | "mastered") => {
    const currentWord = studyQueue[studyIndex];
    if (!currentWord) return;

    updateWordStatus(currentWord.id, status);

    if (status === "mastered") {
      playSound.correct();
    } else {
      playSound.click();
    }

    // Go to next card
    if (studyIndex + 1 < studyQueue.length) {
      setIsFlipped(false);
      setTimeout(() => {
        setStudyIndex(studyIndex + 1);
      }, 250);
    } else {
      playSound.achievement();
      setStudyFinished(true);
    }
  };

  // Filtered Library list
  const filteredLibraryWords = useMemo(() => {
    let result = RAW_N4_VOCAB;

    // Filter by Lesson
    if (libLesson !== "all") {
      const lesNum = parseInt(libLesson);
      result = result.filter((w) => w.lesson === lesNum);
    }

    // Filter by Status Tab
    if (libTab !== "all") {
      result = result.filter((w) => (wordStates[w.id] || "new") === libTab);
    }

    // Filter by Search Query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (w) =>
          w.kanji.toLowerCase().includes(query) ||
          w.kana.toLowerCase().includes(query) ||
          w.meaning.toLowerCase().includes(query)
      );
    }

    return result;
  }, [libLesson, libTab, searchQuery, wordStates]);

  // Generate adaptive quiz
  const handleStartQuiz = () => {
    playSound.click();
    let sourceWords = [...dashboardWords];
    if (sourceWords.length === 0) {
      alert("Không có từ vựng nào trong bài này để làm bài test.");
      return;
    }

    // Shuffle and pick max 20 words
    const chosenWords = [...sourceWords].sort(() => Math.random() - 0.5).slice(0, 20);

    const generatedQuizzes = chosenWords.map((word) => {
      // Find 3 incorrect options from general pool
      const distractors = RAW_N4_VOCAB
        .filter((w) => w.id !== word.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((w) => w.kanji);

      const options = [word.kanji, ...distractors];
      const uniqueOptions = [...new Set(options)];
      
      // Pad to 4 options if duplicate kanji happened to be picked
      while (uniqueOptions.length < 4) {
        const padWord = RAW_N4_VOCAB[Math.floor(Math.random() * RAW_N4_VOCAB.length)];
        if (!uniqueOptions.includes(padWord.kanji)) {
          uniqueOptions.push(padWord.kanji);
        }
      }

      // Shuffle options
      const shuffledOptions = uniqueOptions.sort(() => Math.random() - 0.5);
      const correctIndex = shuffledOptions.indexOf(word.kanji);

      return {
        word,
        question: `Từ nào dưới đây tương ứng với nghĩa: "${word.meaning}"?`,
        options: shuffledOptions,
        correctIndex,
        explanation: `Từ 「${word.kanji}」 (${word.kana}) có nghĩa là "${word.meaning}". Ví dụ: ${word.collocation || "Không có ví dụ"}`
      };
    });

    setQuizList(generatedQuizzes);
    setQuizIndex(0);
    setQuizScore(0);
    setAnsweredIndex(null);
    setQuizFinished(false);
    setQuizActive(true);
  };

  const handleSelectQuizAnswer = (selectedIdx: number) => {
    if (answeredIndex !== null) return; // Prevent double answering
    setAnsweredIndex(selectedIdx);

    const currentQuiz = quizList[quizIndex];
    if (selectedIdx === currentQuiz.correctIndex) {
      playSound.correct();
      setQuizScore((prev) => prev + 1);
      // Promote status to mastered or learning if successfully answered in test
      const currentWordStatus = wordStates[currentQuiz.word.id] || "new";
      if (currentWordStatus === "new") {
        updateWordStatus(currentQuiz.word.id, "learning");
      }
    } else {
      playSound.wrong();
      // Keep or mark as learning
      updateWordStatus(currentQuiz.word.id, "learning");
    }
  };

  const handleNextQuiz = () => {
    playSound.click();
    if (quizIndex + 1 < quizList.length) {
      setQuizIndex((prev) => prev + 1);
      setAnsweredIndex(null);
    } else {
      playSound.achievement();
      setQuizFinished(true);
    }
  };

  return (
    <div className="washi-pattern min-h-screen p-4 sm:p-8 -mx-4 sm:-mx-8 rounded-[40px] border-2 border-[#1A1A1A] text-[#1A1A1A]" style={{ fontFamily: "'Lora', 'Noto Serif JP', serif" }}>
      {/* Top Banner Navigation */}
      <div className="flex justify-between items-center mb-8 border-b-2 border-[#1A1A1A] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 border-2 border-[#1A1A1A] bg-[#1A1A1A] rounded flex items-center justify-center text-white font-black text-lg" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            詞
          </div>
          <span className="text-sm sm:text-lg font-black tracking-widest text-[#1A1A1A]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            TỪ VỰNG N4
          </span>
        </div>
        <button
          onClick={() => {
            playSound.click();
            onGoBack();
          }}
          className="flex items-center gap-2 text-[#1A1A1A] font-bold hover:text-[#8B0000] transition-colors border-2 border-[#1A1A1A] hover:border-[#8B0000] px-4 py-1.5 rounded-xl bg-white shadow-[3px_3px_0px_#1A1A1A] hover:shadow-[3px_3px_0px_#8B0000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Trở về</span>
        </button>
      </div>

      {/* Navigation Tabs (Only visible when not actively in a session) */}
      {activeTab !== "flashcard" && !quizActive && (
        <div className="flex border-b-2 border-[#1A1A1A] mb-8 bg-white p-1 rounded-xl shadow-[3px_3px_0px_#1A1A1A] max-w-md">
          <button
            onClick={() => { playSound.click(); setActiveTab("dashboard"); }}
            className={`flex-1 py-2 text-center rounded-lg font-bold text-sm sm:text-base transition-all ${
              activeTab === "dashboard" ? "bg-[#1A1A1A] text-white" : "text-[#1A1A1A] hover:bg-gray-100"
            }`}
          >
            Học Từ
          </button>
          <button
            onClick={() => { playSound.click(); setActiveTab("library"); }}
            className={`flex-1 py-2 text-center rounded-lg font-bold text-sm sm:text-base transition-all ${
              activeTab === "library" ? "bg-[#1A1A1A] text-white" : "text-[#1A1A1A] hover:bg-gray-100"
            }`}
          >
            Thư Viện
          </button>
          <button
            onClick={() => { playSound.click(); handleStartQuiz(); }}
            className="flex-1 py-2 text-center rounded-lg font-bold text-sm sm:text-base transition-all text-[#1A1A1A] hover:bg-gray-100"
          >
            Luyện Test
          </button>
        </div>
      )}

      {/* 1. DASHBOARD VIEW */}
      {activeTab === "dashboard" && !quizActive && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Progress Overview (4 Columns on large screen) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border-4 border-[#1A1A1A] shadow-[8px_8px_0px_#1A1A1A] space-y-6">
            <h3 className="text-xl font-black text-[#1A1A1A] border-b-2 border-[#1A1A1A] pb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#8B0000]" />
              Tiến Độ Tổng Quan N4
            </h3>
            
            <div className="grid grid-cols-3 gap-2">
              <div 
                onClick={() => handleStartLearning("mastered")}
                className="bg-[#EAFaf1] border-2 border-[#2ECC71] rounded-2xl p-3 text-center cursor-pointer hover:translate-y-[-2px] transition-all"
                title="Học lại các từ đã thuộc"
              >
                <div className="text-2xl font-black text-[#27AE60]">{stats.mastered}</div>
                <div className="text-[10px] sm:text-xs font-black text-gray-600 mt-1 uppercase">Đã thuộc</div>
              </div>
              <div 
                onClick={() => handleStartLearning("learning")}
                className="bg-[#FEF9E7] border-2 border-[#F1C40F] rounded-2xl p-3 text-center cursor-pointer hover:translate-y-[-2px] transition-all"
                title="Ôn tập các từ đang học"
              >
                <div className="text-2xl font-black text-[#D4AC0D]">{stats.learning}</div>
                <div className="text-[10px] sm:text-xs font-black text-gray-600 mt-1 uppercase">Cần ôn</div>
              </div>
              <div 
                onClick={() => handleStartLearning("new")}
                className="bg-gray-50 border-2 border-gray-300 rounded-2xl p-3 text-center cursor-pointer hover:translate-y-[-2px] transition-all"
                title="Bắt đầu học các từ chưa học"
              >
                <div className="text-2xl font-black text-gray-500">{stats.fresh}</div>
                <div className="text-[10px] sm:text-xs font-black text-gray-600 mt-1 uppercase">Chưa học</div>
              </div>
            </div>

            {/* Custom Multi-Color Progress Bar */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-black text-gray-700">Tỉ lệ hoàn thành:</span>
                <span className="text-base font-black text-[#8B0000]">{stats.completionRate}%</span>
              </div>
              <div className="w-full bg-gray-100 h-6 border-2 border-[#1A1A1A] rounded-full overflow-hidden flex">
                <div 
                  style={{ width: `${(stats.mastered / stats.total) * 100}%` }} 
                  className="bg-[#2ECC71] h-full transition-all duration-500 border-r border-[#1A1A1A]" 
                  title={`Đã thuộc: ${stats.mastered}`}
                />
                <div 
                  style={{ width: `${(stats.learning / stats.total) * 100}%` }} 
                  className="bg-[#F1C40F] h-full transition-all duration-500 border-r border-[#1A1A1A]" 
                  title={`Đang học: ${stats.learning}`}
                />
                <div 
                  style={{ width: `${(stats.fresh / stats.total) * 100}%` }} 
                  className="bg-gray-200 h-full transition-all duration-500" 
                  title={`Chưa học: ${stats.fresh}`}
                />
              </div>
              <div className="flex justify-between text-[11px] text-gray-500 font-semibold mt-1.5">
                <span>Tổng cộng: {stats.total} từ</span>
                <span>Hoàn thành: {stats.mastered}/{stats.total}</span>
              </div>
            </div>
          </div>

          {/* Lesson Chooser (7 Columns on large screen) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border-4 border-[#1A1A1A] shadow-[8px_8px_0px_#8B0000] space-y-6">
            <h3 className="text-xl font-black text-[#1A1A1A] border-b-2 border-[#1A1A1A] pb-2 flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#8B0000]" />
              Luyện Tập Theo Bài Học
            </h3>

            <div>
              <label className="block text-sm font-black mb-2 text-gray-700">Chọn Bài Học N4:</label>
              <select
                value={selectedLesson}
                onChange={(e) => { playSound.click(); setSelectedLesson(e.target.value); }}
                className="w-full border-2 border-[#1A1A1A] bg-[#FDFBF7] text-[#1A1A1A] py-3.5 px-4 rounded-xl font-black text-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] cursor-pointer"
              >
                <option value="all">Tất cả bài học (Bài 26 - 50)</option>
                {lessons.map((les) => (
                  <option key={les} value={les}>
                    Bài {les} ({RAW_N4_VOCAB.filter(w => w.lesson === les).length} từ)
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-between items-center p-4 bg-[#FDFBF7] border-2 border-[#1A1A1A] rounded-2xl">
              <div>
                <div className="text-sm text-gray-500 font-bold">Số từ trong bài:</div>
                <div className="text-2xl font-black text-[#1A1A1A]">{currentLessonStats.total} từ</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 font-bold">Đã thuộc:</div>
                <div className="text-2xl font-black text-[#27AE60]">{currentLessonStats.mastered} / {currentLessonStats.total}</div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => handleStartLearning()}
                disabled={currentLessonStats.mastered === currentLessonStats.total}
                className="w-full bg-[#8B0000] text-white border-2 border-[#1A1A1A] hover:bg-[#A30000] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_#1A1A1A] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none transition-all py-4 rounded-2xl font-black text-lg shadow-[2px_2px_0px_#1A1A1A] flex items-center justify-center gap-2"
              >
                <GraduationCap className="w-6 h-6" />
                <span>BẮT ĐẦU HỌC TOÀN BỘ</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. LIBRARY VIEW */}
      {activeTab === "library" && !quizActive && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border-4 border-[#1A1A1A] shadow-[8px_8px_0px_#1A1A1A] space-y-6">
          {/* Filters Bar */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <input
                type="text"
                placeholder="Tìm kiếm bằng Kanji, Hiragana hoặc Nghĩa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-2 border-[#1A1A1A] bg-[#FDFBF7] py-3 pl-11 pr-4 rounded-xl font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
            </div>

            {/* Lesson Dropdown */}
            <div className="md:col-span-3">
              <select
                value={libLesson}
                onChange={(e) => { playSound.click(); setLibLesson(e.target.value); }}
                className="w-full border-2 border-[#1A1A1A] bg-[#FDFBF7] py-3 px-3 rounded-xl font-bold text-sm cursor-pointer"
              >
                <option value="all">Tất cả bài học</option>
                {lessons.map((les) => (
                  <option key={les} value={les}>
                    Bài {les}
                  </option>
                ))}
              </select>
            </div>

            {/* Tab filter button group */}
            <div className="md:col-span-4 flex border-2 border-[#1A1A1A] rounded-xl overflow-hidden p-0.5 bg-[#FDFBF7]">
              <button
                onClick={() => { playSound.click(); setLibTab("all"); }}
                className={`flex-1 py-2 text-center text-xs font-black rounded-lg transition-all ${
                  libTab === "all" ? "bg-[#1A1A1A] text-white" : "text-[#1A1A1A] hover:bg-gray-100"
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => { playSound.click(); setLibTab("learning"); }}
                className={`flex-1 py-2 text-center text-xs font-black rounded-lg transition-all ${
                  libTab === "learning" ? "bg-[#F1C40F] text-[#1A1A1A]" : "text-[#1A1A1A] hover:bg-gray-100"
                }`}
              >
                Đang học
              </button>
              <button
                onClick={() => { playSound.click(); setLibTab("mastered"); }}
                className={`flex-1 py-2 text-center text-xs font-black rounded-lg transition-all ${
                  libTab === "mastered" ? "bg-[#2ECC71] text-white" : "text-[#1A1A1A] hover:bg-gray-100"
                }`}
              >
                Đã thuộc
              </button>
            </div>
          </div>

          {/* Word List Grid */}
          <div className="border-t-2 border-[#1A1A1A] pt-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-gray-500">Hiển thị {filteredLibraryWords.length} từ vựng</span>
            </div>

            {filteredLibraryWords.length === 0 ? (
              <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
                <HelpCircle className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                <p className="font-bold">Không tìm thấy từ vựng nào khớp với bộ lọc.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2">
                {filteredLibraryWords.map((w) => {
                  const status = wordStates[w.id] || "new";
                  return (
                    <div 
                      key={w.id}
                      className="bg-[#FDFBF7] border-2 border-[#1A1A1A] rounded-2xl p-4 flex justify-between items-start hover:shadow-[4px_4px_0px_#1A1A1A] transition-all duration-200"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span 
                            onClick={() => speakJapanese(w.kanji)}
                            className="font-black text-xl text-[#1A1A1A] cursor-pointer hover:text-[#8B0000] transition-colors"
                          >
                            {w.kanji}
                          </span>
                          <button 
                            onClick={() => speakJapanese(w.kanji)}
                            className="p-1 hover:bg-gray-100 rounded-full transition-all"
                            title="Nghe phát âm"
                          >
                            <Volume2 className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                        <div className="text-sm text-gray-500 font-bold">({w.kana})</div>
                        <div className="text-sm font-semibold text-gray-800">{w.meaning}</div>
                        {w.collocation && (
                          <div className="text-xs text-[#8B0000] italic bg-[#8B0000]/5 px-2 py-1 rounded border border-[#8B0000]/10 inline-block">
                            {w.collocation}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col items-end justify-between h-full gap-4">
                        <span className="text-[10px] font-bold text-[#1A1A1A] border border-[#1A1A1A] px-2 py-0.5 rounded bg-white">
                          Bài {w.lesson}
                        </span>

                        <select
                          value={status}
                          onChange={(e) => updateWordStatus(w.id, e.target.value as any)}
                          className={`text-xs font-black py-1.5 px-2.5 border-2 border-[#1A1A1A] rounded-lg cursor-pointer ${
                            status === "mastered" 
                              ? "bg-[#2ECC71] text-white" 
                              : status === "learning" 
                              ? "bg-[#F1C40F] text-[#1A1A1A]" 
                              : "bg-white text-gray-600"
                          }`}
                        >
                          <option value="new">Chưa học</option>
                          <option value="learning">Đang học</option>
                          <option value="mastered">Đã thuộc</option>
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. FLASHCARD STUDY VIEW */}
      {activeTab === "flashcard" && (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-sm font-black text-gray-600">
              Tiến độ học: {studyIndex + 1} / {studyQueue.length}
            </span>
            <button
              onClick={() => { playSound.click(); setActiveTab("dashboard"); }}
              className="text-xs font-black text-[#8B0000] hover:underline"
            >
              Dừng học ✕
            </button>
          </div>

          {!studyFinished && studyQueue[studyIndex] ? (
            <div className="space-y-6">
              {/* Scene container with perspective */}
              <div 
                onClick={handleFlip}
                className="w-full h-96 sm:h-[400px] relative cursor-pointer group"
                style={{ perspective: "1000px" }}
              >
                {/* Inner card containing faces */}
                <div 
                  className={`w-full h-full duration-500 ease-out transition-transform relative`}
                  style={{ 
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "none"
                  }}
                >
                  {/* Front Face */}
                  <div 
                    className="absolute inset-0 bg-white border-4 border-[#1A1A1A] rounded-3xl p-6 sm:p-8 flex flex-col justify-center items-center text-center shadow-[6px_6px_0px_#1A1A1A]"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <button 
                      onClick={(e) => { e.stopPropagation(); speakJapanese(studyQueue[studyIndex].kanji); }}
                      className="absolute top-4 right-4 p-2.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-all border-2 border-[#1A1A1A] cursor-pointer"
                      title="Nghe phát âm"
                    >
                      <Volume2 className="w-5 h-5 text-[#1A1A1A]" />
                    </button>

                    <div className="space-y-4 w-full flex flex-col items-center justify-center">
                      <div className={`font-black text-black font-yu-gothic tracking-tight leading-none whitespace-nowrap max-w-full overflow-hidden text-center px-1 ${getVocabFontSizeClass(studyQueue[studyIndex].kanji)}`}>
                        {studyQueue[studyIndex].kanji}
                      </div>
                      <div className={`font-bold text-black font-yu-gothic tracking-wider whitespace-nowrap max-w-full overflow-hidden text-center px-1 ${getKanaFontSizeClass(studyQueue[studyIndex].kana)}`}>
                        {studyQueue[studyIndex].kana}
                      </div>
                      <div className="text-xs text-gray-400 font-bold animate-pulse pt-2">
                        Chạm vào thẻ để lật xem nghĩa
                      </div>
                    </div>
                  </div>

                  {/* Back Face */}
                  <div 
                    className="absolute inset-0 bg-[#FDFBF7] border-4 border-[#1A1A1A] rounded-3xl p-6 sm:p-8 flex flex-col justify-center items-center text-center shadow-[6px_6px_0px_#1A1A1A]"
                    style={{ 
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)"
                    }}
                  >
                    <button 
                      onClick={(e) => { e.stopPropagation(); speakJapanese(studyQueue[studyIndex].kanji); }}
                      className="absolute top-4 right-4 p-2.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-all border-2 border-[#1A1A1A] cursor-pointer"
                      title="Nghe phát âm"
                    >
                      <Volume2 className="w-5 h-5 text-[#1A1A1A]" />
                    </button>

                    <div className="space-y-4 w-full flex flex-col items-center justify-center">
                      <div className="text-xs font-black text-gray-400 border-b border-gray-200 pb-2 uppercase tracking-wider w-full">
                        Ý nghĩa & Ngữ cảnh
                      </div>
                      <div className="text-3xl sm:text-4xl md:text-5xl font-black text-[#8B0000] leading-tight">
                        {studyQueue[studyIndex].meaning}
                      </div>
                      <div className={`text-black font-bold font-yu-gothic whitespace-nowrap max-w-full overflow-hidden text-center px-1 ${getKanaFontSizeClass(studyQueue[studyIndex].kana)}`}>
                        {studyQueue[studyIndex].kana}
                      </div>

                      {studyQueue[studyIndex].collocation && (
                        <div className="pt-2">
                          <div className="text-[10px] font-bold text-gray-400 uppercase">Ví dụ / Kết hợp:</div>
                          <div className="text-lg font-bold text-black font-yu-gothic bg-white border-2 border-[#1A1A1A] p-2.5 rounded-xl inline-block mt-1">
                            {studyQueue[studyIndex].collocation}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls Section */}
              <div className="space-y-3 pt-2">
                {/* Slide Navigation Buttons */}
                <div className="flex justify-between items-center gap-3">
                  <button
                    onClick={handlePrevCard}
                    className="flex-1 py-3 bg-white hover:bg-gray-50 border-2 border-[#1A1A1A] text-[#1A1A1A] font-black text-xs rounded-xl shadow-[2px_2px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-1 cursor-pointer"
                    title="Thẻ trước (Phím ◄)"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Thẻ Trước</span>
                  </button>
                  
                  <button
                    onClick={handleFlip}
                    className="px-5 py-3 bg-amber-100 hover:bg-amber-200 border-2 border-[#1A1A1A] text-[#1A1A1A] font-black text-xs rounded-xl shadow-[2px_2px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-1 cursor-pointer"
                    title="Lật thẻ (Phím Space)"
                  >
                    <span>Lật thẻ 🔄</span>
                  </button>

                  <button
                    onClick={handleNextCard}
                    className="flex-1 py-3 bg-white hover:bg-gray-50 border-2 border-[#1A1A1A] text-[#1A1A1A] font-black text-xs rounded-xl shadow-[2px_2px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-1 cursor-pointer"
                    title="Thẻ tiếp (Phím ►)"
                  >
                    <span>Thẻ Tiếp</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Status grading buttons */}
                <div className="grid grid-cols-2 gap-4 pt-1">
                  <button
                    onClick={() => handleGradeCard("learning")}
                    className="bg-white border-2 border-[#1A1A1A] hover:bg-red-50 text-[#C0392B] font-black py-3.5 rounded-2xl shadow-[3px_3px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex flex-col items-center justify-center cursor-pointer"
                  >
                    <span className="text-base">Chưa thuộc ✕</span>
                    <span className="text-[10px] text-gray-500 uppercase mt-0.5">Cần học lại</span>
                  </button>
                  <button
                    onClick={() => handleGradeCard("mastered")}
                    className="bg-[#2ECC71] border-2 border-[#1A1A1A] hover:bg-[#27AE60] text-white font-black py-3.5 rounded-2xl shadow-[3px_3px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex flex-col items-center justify-center cursor-pointer"
                  >
                    <span className="text-base">Đã thuộc ✓</span>
                    <span className="text-[10px] text-white/80 uppercase mt-0.5">Bỏ qua lần sau</span>
                  </button>
                </div>

                <div className="text-center text-[11px] text-gray-500 font-medium pt-1">
                  💡 Phím tắt: <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-[10px] font-mono">◄</kbd> Lùi • <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-[10px] font-mono">►</kbd> Tới • <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-[10px] font-mono">Space</kbd> Lật thẻ
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-3xl border-4 border-[#1A1A1A] shadow-[8px_8px_0px_#1A1A1A] text-center space-y-6">
              <span className="text-6xl">🎉</span>
              <h3 className="text-2xl font-black text-[#27AE60]">Hoàn thành mục tiêu!</h3>
              <p className="text-sm text-gray-600 font-bold">
                Chúc mừng chiến binh! Ngươi đã hoàn tất lượt học vựng cho mục này. Hãy duy trì ngọn lửa kiên trì để nắm trọn vẹn JLPT N4!
              </p>
              <button
                onClick={() => { playSound.click(); setActiveTab("dashboard"); }}
                className="w-full bg-[#1A1A1A] text-white py-3 rounded-xl border-2 border-[#1A1A1A] font-bold hover:bg-gray-800 transition-all shadow-[3px_3px_0px_#8B0000]"
              >
                Quay lại trang chủ
              </button>
            </div>
          )}
        </div>
      )}

      {/* 4. QUIZ VIEW */}
      {quizActive && (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="flex justify-between items-center border-b border-gray-200 pb-3">
            <div>
              <span className="text-xs font-bold text-[#8B0000] border border-[#8B0000] bg-[#8B0000]/5 px-2.5 py-1 rounded-full uppercase">
                {selectedLesson === "all" ? "Tổng Hợp N4" : `Bài ${selectedLesson}`}
              </span>
            </div>
            <button
              onClick={() => { playSound.click(); setQuizActive(false); }}
              className="text-xs font-black text-[#8B0000] hover:underline"
            >
              Hủy làm test ✕
            </button>
          </div>

          {!quizFinished && quizList[quizIndex] ? (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border-4 border-[#1A1A1A] shadow-[6px_6px_0px_#1A1A1A] space-y-6">
              <div className="flex justify-between text-xs font-bold text-gray-500">
                <span>Câu {quizIndex + 1} / {quizList.length}</span>
                <span>Điểm số: {quizScore}</span>
              </div>

              {/* Question Text */}
              <div className="space-y-2">
                <p className="text-base text-gray-500 font-bold">Hãy chọn câu trả lời đúng:</p>
                <h4 className="text-xl font-black text-[#1A1A1A] leading-relaxed">
                  {quizList[quizIndex].question}
                </h4>
              </div>

              {/* Options list */}
              <div className="grid grid-cols-1 gap-3">
                {quizList[quizIndex].options.map((opt, idx) => {
                  const isAnswered = answeredIndex !== null;
                  const isCorrect = idx === quizList[quizIndex].correctIndex;
                  const isSelected = idx === answeredIndex;

                  let buttonStyle = "border-2 border-[#1A1A1A] bg-white hover:bg-gray-50 text-[#1A1A1A]";
                  if (isAnswered) {
                    if (isCorrect) {
                      buttonStyle = "border-2 border-[#27AE60] bg-[#EAFaf1] text-[#27AE60] font-black";
                    } else if (isSelected) {
                      buttonStyle = "border-2 border-[#C0392B] bg-[#FDEDEC] text-[#C0392B] font-black";
                    } else {
                      buttonStyle = "border-2 border-gray-200 bg-white text-gray-300 cursor-not-allowed";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleSelectQuizAnswer(idx)}
                      className={`w-full py-4 px-5 text-left rounded-2xl font-bold text-lg flex items-center justify-between transition-all ${buttonStyle}`}
                    >
                      <span className="font-serif text-lg sm:text-xl">{opt}</span>
                      {isAnswered && isCorrect && <span className="text-xs font-black text-[#27AE60]">ĐÚNG</span>}
                      {isAnswered && isSelected && !isCorrect && <span className="text-xs font-black text-[#C0392B]">SAI</span>}
                    </button>
                  );
                })}
              </div>

              {/* Immediate feedback & Explanation */}
              {answeredIndex !== null && (
                <div className="bg-[#FDFBF7] border-2 border-[#1A1A1A] p-4 rounded-2xl space-y-2 animate-fadeIn">
                  <p className="text-sm font-bold text-gray-500">Giải thích:</p>
                  <p className="text-base font-bold text-[#1A1A1A]">{quizList[quizIndex].explanation}</p>
                  <button
                    onClick={handleNextQuiz}
                    className="w-full bg-[#1A1A1A] hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-xl border-2 border-[#1A1A1A] transition-all flex items-center justify-center gap-2 mt-4"
                  >
                    <span>Câu Tiếp Theo ➔</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-3xl border-4 border-[#1A1A1A] shadow-[8px_8px_0px_#1A1A1A] text-center space-y-6">
              <span className="text-6xl">🏆</span>
              <h3 className="text-2xl font-black text-[#1A1A1A]">Hoàn thành bài Test!</h3>
              
              <div className="bg-[#FDFBF7] border-2 border-[#1A1A1A] p-6 rounded-2xl max-w-sm mx-auto">
                <div className="text-sm font-bold text-gray-500 uppercase">Kết quả chung cuộc:</div>
                <div className="text-5xl font-black text-[#8B0000] mt-2">{quizScore} / {quizList.length}</div>
                <p className="text-xs font-bold text-gray-400 mt-2">
                  Tỉ lệ đúng: {quizList.length > 0 ? Math.round((quizScore / quizList.length) * 100) : 0}%
                </p>
              </div>

              <p className="text-sm text-gray-600 font-semibold max-w-md mx-auto">
                Ngươi đã chứng tỏ khí phách qua loạt thử thách vựng thi cử N4 này. Hãy tiếp tục mài giũa thêm!
              </p>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => { playSound.click(); handleStartQuiz(); }}
                  className="bg-white hover:bg-gray-50 text-[#1A1A1A] font-bold py-3 rounded-xl border-2 border-[#1A1A1A] transition-all"
                >
                  Làm đề khác
                </button>
                <button
                  onClick={() => { playSound.click(); setQuizActive(false); }}
                  className="bg-[#1A1A1A] hover:bg-gray-800 text-white font-bold py-3 rounded-xl border-2 border-[#1A1A1A] transition-all"
                >
                  Về trang chính
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
