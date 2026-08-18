import React, { useState, useEffect, useMemo } from "react";
import { playSound } from "../utils/audio";
import { RAW_N3_VOCAB, VocabN3Item } from "../data/vocabN3";
import { getGeminiHeaders } from "../utils/geminiKey";
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
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Loader2
} from "lucide-react";

interface VocabN3LessonsProps {
  onGoBack: () => void;
}

export default function VocabN3Lessons({ onGoBack }: VocabN3LessonsProps) {
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
  const [studyQueue, setStudyQueue] = useState<VocabN3Item[]>([]);
  const [studyIndex, setStudyIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [studyFinished, setStudyFinished] = useState<boolean>(false);

  // AI Sentence Evaluator States
  const [userSentence, setUserSentence] = useState<string>("");
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<{
    isCorrect: boolean;
    feedback: string;
    correctedSentence: string;
  } | null>(null);

  // Quiz states
  const [quizList, setQuizList] = useState<{
    word: VocabN3Item;
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

  // Load progress from localStorage on mount and reactive updates
  useEffect(() => {
    const loadFromStorage = () => {
      const saved = localStorage.getItem("sk_vocab_n3_progress");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const stateMap: Record<number, "new" | "learning" | "mastered"> = {};
          RAW_N3_VOCAB.forEach((w) => {
            stateMap[w.id] = parsed[w.id] || "new";
          });
          setWordStates(stateMap);
        } catch (e) {
          console.error("Failed to load N3 Vocab progress:", e);
        }
      } else {
        const defaultState: Record<number, "new" | "learning" | "mastered"> = {};
        RAW_N3_VOCAB.forEach((w) => {
          defaultState[w.id] = "new";
        });
        setWordStates(defaultState);
      }
    };

    loadFromStorage();

    const handleStorageChange = (e: any) => {
      const key = e.detail?.key || e.key;
      if (!key || key === "sk_vocab_n3_progress") {
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
    const saved = localStorage.getItem("sk_vocab_n3_progress");
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
    localStorage.setItem("sk_vocab_n3_progress", JSON.stringify(progressToSave));
    window.dispatchEvent(new CustomEvent("local-storage-changed", { detail: { key: "sk_vocab_n3_progress" } }));
  };

  // Lessons list extraction (Lessons 1 - 30)
  const lessons = useMemo(() => {
    const lessonNumbers = [...new Set(RAW_N3_VOCAB.map((w) => w.lesson))].sort((a, b) => a - b);
    return lessonNumbers;
  }, []);

  // Filtered vocabulary list based on active dashboard lesson
  const dashboardWords = useMemo(() => {
    if (selectedLesson === "all") return RAW_N3_VOCAB;
    const lesNum = parseInt(selectedLesson);
    return RAW_N3_VOCAB.filter((w) => w.lesson === lesNum);
  }, [selectedLesson]);

  // Overall database statistics
  const stats = useMemo(() => {
    const total = RAW_N3_VOCAB.length;
    let mastered = 0;
    let learning = 0;
    let fresh = 0;

    RAW_N3_VOCAB.forEach((w) => {
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
      targets = targets.filter((w) => (wordStates[w.id] || "new") !== "mastered");
    }

    if (targets.length === 0) {
      alert("Không có từ vựng nào phù hợp trong bài học này để học.");
      return;
    }

    const shuffled = [...targets].sort(() => Math.random() - 0.5);
    setStudyQueue(shuffled);
    setStudyIndex(0);
    setIsFlipped(false);
    setStudyFinished(false);
    setUserSentence("");
    setEvaluationResult(null);
    setActiveTab("flashcard");
  };

  const handleFlip = () => {
    playSound.flip();
    setIsFlipped(!isFlipped);
  };

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
      setUserSentence("");
      setEvaluationResult(null);
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
    let result = RAW_N3_VOCAB;

    if (libLesson !== "all") {
      const lesNum = parseInt(libLesson);
      result = result.filter((w) => w.lesson === lesNum);
    }

    if (libTab !== "all") {
      result = result.filter((w) => (wordStates[w.id] || "new") === libTab);
    }

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

    const chosenWords = [...sourceWords].sort(() => Math.random() - 0.5).slice(0, 20);

    const generatedQuizzes = chosenWords.map((word) => {
      // Find 3 incorrect options from N3 pool
      const distractors = RAW_N3_VOCAB
        .filter((w) => w.id !== word.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((w) => w.kanji);

      const options = [word.kanji, ...distractors];
      const uniqueOptions = [...new Set(options)];
      
      while (uniqueOptions.length < 4) {
        const padWord = RAW_N3_VOCAB[Math.floor(Math.random() * RAW_N3_VOCAB.length)];
        if (!uniqueOptions.includes(padWord.kanji)) {
          uniqueOptions.push(padWord.kanji);
        }
      }

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
    if (answeredIndex !== null) return;
    setAnsweredIndex(selectedIdx);

    const currentQuiz = quizList[quizIndex];
    if (selectedIdx === currentQuiz.correctIndex) {
      playSound.correct();
      setQuizScore((prev) => prev + 1);
      const currentWordStatus = wordStates[currentQuiz.word.id] || "new";
      if (currentWordStatus === "new") {
        updateWordStatus(currentQuiz.word.id, "learning");
      }
    } else {
      playSound.wrong();
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

  // Submit sentence to Express Backend for Gemini AI Review
  const handleEvaluateSentence = async () => {
    const currentWord = studyQueue[studyIndex];
    if (!currentWord || !userSentence.trim()) return;

    playSound.click();
    setIsEvaluating(true);
    setEvaluationResult(null);

    try {
      const response = await fetch("/api/gemini/evaluate-sentence", {
        method: "POST",
        headers: getGeminiHeaders(),
        body: JSON.stringify({
          word: currentWord.kanji,
          meaning: currentWord.meaning,
          userSentence: userSentence,
        }),
      });

      if (!response.ok) {
        throw new Error("API call failed");
      }

      const data = await response.json();
      setEvaluationResult(data);
      if (data.isCorrect) {
        playSound.correct();
      } else {
        playSound.wrong();
      }
    } catch (error) {
      console.error("Failed to evaluate sentence:", error);
      setEvaluationResult({
        isCorrect: false,
        feedback: "Học trò ơi, hệ thống AI Thầy Sơn đang bận chấm bài một chút. Đừng nản lòng nhé, hãy tiếp tục đặt câu thật hay nha! 💪",
        correctedSentence: userSentence
      });
    } finally {
      setIsEvaluating(false);
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
            TỪ VỰNG N3
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
          {/* Progress Overview (5 Columns on large screen) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border-4 border-[#1A1A1A] shadow-[8px_8px_0px_#1A1A1A] space-y-6">
            <h3 className="text-xl font-black text-[#1A1A1A] border-b-2 border-[#1A1A1A] pb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#8B0000]" />
              Tiến Độ Tổng Quan N3
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
              <label className="block text-sm font-black mb-2 text-gray-700">Chọn Bài Học N3:</label>
              <select
                value={selectedLesson}
                onChange={(e) => { playSound.click(); setSelectedLesson(e.target.value); }}
                className="w-full border-2 border-[#1A1A1A] bg-[#FDFBF7] text-[#1A1A1A] py-3.5 px-4 rounded-xl font-black text-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] cursor-pointer"
              >
                <option value="all">Tất cả bài học (Bài 1 - 30)</option>
                {lessons.map((les) => (
                  <option key={les} value={les}>
                    Bài {les} ({RAW_N3_VOCAB.filter(w => w.lesson === les).length} từ)
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

          {/* Words List Count */}
          <div className="text-xs font-black uppercase text-gray-500 tracking-wider">
            Tìm thấy {filteredLibraryWords.length} từ vựng phù hợp
          </div>

          {/* Cards List Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredLibraryWords.map((word) => {
              const status = wordStates[word.id] || "new";
              return (
                <div 
                  key={word.id}
                  className={`border-4 border-[#1A1A1A] rounded-2xl p-5 relative overflow-hidden transition-all hover:translate-y-[-3px] flex flex-col justify-between ${
                    status === "mastered" ? "bg-[#EAFaf1] shadow-[4px_4px_0px_#27AE60]" :
                    status === "learning" ? "bg-[#FEF9E7] shadow-[4px_4px_0px_#F1C40F]" : "bg-white shadow-[4px_4px_0px_#1A1A1A]"
                  }`}
                >
                  <div>
                    {/* Furigana/Reading */}
                    <div className="text-xs text-gray-500 font-bold tracking-tight">{word.kana}</div>
                    
                    {/* Kanji Display */}
                    <div className="text-2xl font-black text-[#1A1A1A] mt-1 flex items-center justify-between">
                      <span className="font-serif">{word.kanji}</span>
                      <button 
                        onClick={() => speakJapanese(word.kanji)}
                        className="p-1 hover:bg-[#8B0000]/10 rounded-lg text-gray-600 hover:text-[#8B0000] cursor-pointer"
                        title="Nghe phát âm"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Meaning */}
                    <div className="text-sm font-bold text-[#8B0000] mt-2 border-t border-dashed border-gray-300 pt-2">
                      {word.meaning}
                    </div>

                    {/* Collocation */}
                    <div className="text-xs text-gray-700 italic mt-1.5 font-sans bg-gray-50/50 p-1.5 rounded border border-gray-200">
                      <span className="font-bold text-gray-500 mr-1">Cụm từ:</span>
                      {word.collocation}
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                    <span className="text-[10px] bg-gray-100 border border-gray-300 rounded px-2 py-0.5 font-bold uppercase text-gray-500">
                      Bài {word.lesson}
                    </span>

                    {/* Status Changer Toggle */}
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => {
                          playSound.click();
                          updateWordStatus(word.id, status === "mastered" ? "learning" : "mastered");
                        }}
                        className={`p-1.5 border-2 border-[#1A1A1A] rounded-lg text-xs font-black cursor-pointer transition-all ${
                          status === "mastered" 
                            ? "bg-[#2ECC71] text-white hover:bg-[#27AE60]" 
                            : "bg-white text-[#1A1A1A] hover:bg-gray-100"
                        }`}
                        title={status === "mastered" ? "Đánh dấu chưa thuộc" : "Đánh dấu đã thuộc"}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredLibraryWords.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <HelpCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-bold">Không tìm thấy từ vựng nào khớp với bộ lọc!</p>
            </div>
          )}
        </div>
      )}

      {/* 3. FLASHCARDS STUDY VIEW */}
      {activeTab === "flashcard" && studyQueue.length > 0 && (
        <div className="max-w-xl mx-auto space-y-8">
          {/* Progress Mini Bar */}
          <div className="flex justify-between items-center bg-white border-2 border-[#1A1A1A] px-4 py-2 rounded-xl shadow-[3px_3px_0px_#1A1A1A]">
            <span className="font-bold text-xs">Học từ: {studyIndex + 1} / {studyQueue.length}</span>
            <div className="w-32 bg-gray-100 h-2 border border-[#1A1A1A] rounded-full overflow-hidden">
              <div 
                style={{ width: `${((studyIndex + 1) / studyQueue.length) * 100}%` }} 
                className="bg-[#8B0000] h-full transition-all duration-300"
              />
            </div>
            <span className="text-[10px] font-black uppercase text-[#8B0000] bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-md">
              Bài {studyQueue[studyIndex]?.lesson}
            </span>
          </div>

          {!studyFinished ? (
            <div className="space-y-6">
              {/* Study Card Container */}
              <div className="perspective-1000 w-full min-h-[280px]">
                <div 
                  onClick={handleFlip}
                  className={`relative w-full min-h-[280px] transition-transform duration-500 transform-style-3d cursor-pointer ${
                    isFlipped ? "rotate-y-180" : ""
                  }`}
                >
                  {/* Front Side (Kanji + Audio Button) */}
                  <div className="absolute inset-0 w-full h-full bg-white border-4 border-[#1A1A1A] rounded-3xl p-8 flex flex-col justify-between shadow-[8px_8px_0px_#1A1A1A] backface-hidden">
                    <div className="flex justify-between items-start">
                      <span className="text-xs bg-gray-100 border border-gray-300 rounded px-2.5 py-1 text-gray-500 font-extrabold uppercase">
                        MẶT TRƯỚC
                      </span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          speakJapanese(studyQueue[studyIndex].kanji);
                        }}
                        className="w-10 h-10 border-2 border-[#1A1A1A] rounded-xl flex items-center justify-center bg-gray-50 hover:bg-[#8B0000]/10 text-gray-600 hover:text-[#8B0000] transition-colors cursor-pointer"
                        title="Phát âm tiếng Nhật"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="text-center space-y-3">
                      <div className="text-5xl font-serif font-black tracking-tight text-[#1A1A1A]">
                        {studyQueue[studyIndex].kanji}
                      </div>
                      <div className="text-sm font-bold text-gray-400 font-sans tracking-wide">
                        (Nhấp vào thẻ để lật xem nghĩa)
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      <span>Cố lên học trò!</span>
                      <span>Thẻ từ N3</span>
                    </div>
                  </div>

                  {/* Back Side (Kana + Meaning + Collocation) */}
                  <div className="absolute inset-0 w-full h-full bg-[#FDFBF7] border-4 border-[#1A1A1A] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-[8px_8px_0px_#1A1A1A] backface-hidden rotate-y-180">
                    <div className="flex justify-between items-start">
                      <span className="text-xs bg-red-50 border border-red-200 rounded px-2.5 py-1 text-[#8B0000] font-extrabold uppercase">
                        MẶT SAU (Ý NGHĨA)
                      </span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          speakJapanese(studyQueue[studyIndex].kanji);
                        }}
                        className="w-10 h-10 border-2 border-[#1A1A1A] rounded-xl flex items-center justify-center bg-white hover:bg-[#8B0000]/10 text-gray-600 hover:text-[#8B0000] transition-colors cursor-pointer"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="text-center space-y-4">
                      <div className="text-2xl font-black text-gray-500 font-sans">{studyQueue[studyIndex].kana}</div>
                      <div className="text-3xl font-black text-[#8B0000]">{studyQueue[studyIndex].meaning}</div>
                      
                      <div className="bg-white border-2 border-[#1A1A1A] p-3 rounded-xl max-w-sm mx-auto text-left space-y-1.5 shadow-[2px_2px_0px_#1A1A1A]">
                        <div className="text-xs font-extrabold text-[#8B0000] uppercase tracking-wide">Cụm từ liên kết:</div>
                        <div className="text-sm font-bold text-[#1A1A1A]">{studyQueue[studyIndex].collocation}</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase">
                      <span>Lớp học Thầy Sơn</span>
                      <span>Học liệu N3 100%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Study Response Options (Buttons) */}
              <div className="flex gap-4">
                <button
                  onClick={() => handleGradeCard("learning")}
                  className="flex-1 bg-white hover:bg-gray-50 text-[#1A1A1A] border-4 border-[#1A1A1A] py-3.5 rounded-2xl font-black text-sm sm:text-base shadow-[4px_4px_0px_#1A1A1A] hover:translate-y-[-1px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-5 h-5 text-[#F1C40F]" />
                  <span>CHƯA THUỘC (ÔN LẠI)</span>
                </button>
                <button
                  onClick={() => handleGradeCard("mastered")}
                  className="flex-1 bg-[#2ECC71] hover:bg-[#27AE60] text-white border-4 border-[#1A1A1A] py-3.5 rounded-2xl font-black text-sm sm:text-base shadow-[4px_4px_0px_#1A1A1A] hover:translate-y-[-1px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Check className="w-5 h-5" />
                  <span>ĐÃ THUỘC (ĐẠT CHUẨN)</span>
                </button>
              </div>

              {/* AI PRACTICE PANEL: Try writing a sentence! */}
              <div className="bg-white p-5 rounded-3xl border-4 border-[#1A1A1A] shadow-[6px_6px_0px_#1A1A1A] space-y-4">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                  <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
                  <h4 className="font-black text-sm sm:text-base text-[#1A1A1A]">Luyện Đặt Câu Với Thầy Sơn AI</h4>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed font-sans">
                  Hãy thử tự đặt câu có chứa từ <span className="font-extrabold text-[#8B0000]">「{studyQueue[studyIndex].kanji}」</span>. Thầy Sơn AI sẽ nhận xét ngữ pháp và sửa lại giúp học trò chuẩn xác 100%!
                </p>

                <div className="space-y-3">
                  <textarea
                    rows={2}
                    value={userSentence}
                    onChange={(e) => setUserSentence(e.target.value)}
                    placeholder="Nhập câu tiếng Nhật của em vào đây..."
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
                          <span>Đang chấm...</span>
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
                  <div className={`p-4 rounded-xl border-2 border-[#1A1A1A] font-sans space-y-3 shadow-[2px_2px_0px_#1A1A1A] ${
                    evaluationResult.isCorrect ? "bg-[#EAFaf1]" : "bg-[#FDEDEC]"
                  }`}>
                    <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
                      {evaluationResult.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-[#27AE60]" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-[#E74C3C]" />
                      )}
                      <span>
                        {evaluationResult.isCorrect ? "Hoàn hảo! Câu viết hoàn toàn chính xác." : "Cần sửa đổi một chút học trò ơi!"}
                      </span>
                    </div>

                    <div className="text-xs leading-relaxed text-gray-700 whitespace-pre-line">
                      {evaluationResult.feedback}
                    </div>

                    <div className="bg-white border border-gray-300 p-2.5 rounded-lg space-y-1">
                      <div className="text-[10px] font-black uppercase text-gray-400">Câu đề xuất chuẩn:</div>
                      <div className="text-sm font-bold text-gray-800 font-serif">{evaluationResult.correctedSentence}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Finished queue screen */
            <div className="bg-white p-8 rounded-3xl border-4 border-[#1A1A1A] shadow-[8px_8px_0px_#1A1A1A] text-center space-y-6">
              <span className="text-5xl">🏆</span>
              <h3 className="text-2xl font-black text-[#8B0000]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                Hoàn Thành Phiên Học!
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed font-sans max-w-sm mx-auto">
                Tuyệt vời học trò ơi! Ngươi đã hoàn tất nghiên cứu toàn bộ thẻ từ vựng đã chọn. Hãy tiến vào thư viện để xem lại hoặc kiểm tra bằng bài test để tăng thực lực nhé!
              </p>
              
              <div className="flex gap-4 max-w-xs mx-auto">
                <button
                  onClick={() => handleStartLearning()}
                  className="flex-1 border-2 border-[#1A1A1A] py-3 rounded-xl font-bold bg-[#FDFBF7] hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Học lại tiếp
                </button>
                <button
                  onClick={() => { playSound.click(); setActiveTab("dashboard"); }}
                  className="flex-1 bg-[#8B0000] text-white border-2 border-[#1A1A1A] py-3 rounded-xl font-bold hover:bg-[#A30000] shadow-[2px_2px_0px_#1A1A1A] transition-colors cursor-pointer"
                >
                  Về Trang Chủ
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. MCQ QUIZ TEST SECTION */}
      {quizActive && quizList.length > 0 && (
        <div className="max-w-xl mx-auto space-y-8">
          {/* Progress Mini bar */}
          <div className="flex justify-between items-center bg-white border-2 border-[#1A1A1A] px-4 py-2 rounded-xl shadow-[3px_3px_0px_#1A1A1A]">
            <span className="font-bold text-xs">Câu hỏi: {quizIndex + 1} / {quizList.length}</span>
            <div className="w-32 bg-gray-100 h-2 border border-[#1A1A1A] rounded-full overflow-hidden">
              <div 
                style={{ width: `${((quizIndex + 1) / quizList.length) * 100}%` }} 
                className="bg-[#8B0000] h-full transition-all duration-300"
              />
            </div>
            <span className="text-xs font-black text-[#27AE60]">Đúng: {quizScore}</span>
          </div>

          {!quizFinished ? (
            <div className="space-y-6">
              {/* Question card */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border-4 border-[#1A1A1A] shadow-[6px_6px_0px_#1A1A1A] space-y-4">
                <span className="text-xs bg-[#1A1A1A] text-white rounded-md font-bold px-2.5 py-1 uppercase tracking-wider">
                  BÀI TRẮC NGHIỆM
                </span>
                
                <h4 className="text-xl sm:text-2xl font-bold text-gray-800 leading-relaxed font-sans">
                  {quizList[quizIndex].question}
                </h4>
              </div>

              {/* Answers choices */}
              <div className="grid grid-cols-1 gap-3">
                {quizList[quizIndex].options.map((option, idx) => {
                  const isAnswered = answeredIndex !== null;
                  const isCurrent = answeredIndex === idx;
                  const isCorrectAnswer = quizList[quizIndex].correctIndex === idx;

                  let buttonStyle = "bg-white hover:bg-gray-50 hover:translate-y-[-1px] active:translate-y-[1px]";
                  if (isAnswered) {
                    if (isCorrectAnswer) {
                      buttonStyle = "bg-[#D4EFDF] border-[#2ECC71] text-[#27AE60]";
                    } else if (isCurrent) {
                      buttonStyle = "bg-[#FADBD8] border-[#E74C3C] text-[#C0392B]";
                    } else {
                      buttonStyle = "bg-gray-50 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectQuizAnswer(idx)}
                      disabled={isAnswered}
                      className={`border-2 border-[#1A1A1A] p-4 rounded-xl text-left font-bold text-base sm:text-lg transition-all flex justify-between items-center ${buttonStyle} ${
                        !isAnswered ? "cursor-pointer" : ""
                      }`}
                    >
                      <span className="font-serif">{option}</span>
                      
                      {isAnswered && isCorrectAnswer && (
                        <Check className="w-5 h-5 text-[#27AE60]" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Quiz Explanation & Next step */}
              {answeredIndex !== null && (
                <div className="space-y-4 bg-white p-5 rounded-2xl border-4 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A]">
                  <div className="text-sm font-bold text-[#8B0000] border-b pb-1.5 flex items-center gap-1.5">
                    <HelpCircle className="w-4.5 h-4.5" />
                    <span>Giải thích từ Thầy Sơn:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans italic">
                    {quizList[quizIndex].explanation}
                  </p>
                  
                  <button
                    onClick={handleNextQuiz}
                    className="w-full bg-[#1A1A1A] hover:bg-black text-white py-3.5 rounded-xl font-bold text-sm sm:text-base hover:translate-y-[-1px] transition-all flex justify-center items-center gap-2 cursor-pointer"
                  >
                    <span>{quizIndex + 1 < quizList.length ? "CÂU TIẾP THEO" : "XEM KẾT QUẢ"}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Quiz finished view */
            <div className="bg-white p-8 rounded-3xl border-4 border-[#1A1A1A] shadow-[8px_8px_0px_#1A1A1A] text-center space-y-6">
              <span className="text-5xl">🎯</span>
              <h3 className="text-2xl font-black text-[#8B0000]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                Kết Quả Sát Hạch!
              </h3>
              
              <div className="border-4 border-[#1A1A1A] p-6 rounded-2xl bg-[#FDFBF7] inline-block">
                <div className="text-xs text-gray-400 font-bold uppercase">Điểm số đạt được:</div>
                <div className="text-4xl font-black text-[#1A1A1A] mt-1">{quizScore} / {quizList.length}</div>
                <div className="text-[10px] text-gray-500 font-extrabold mt-1.5 uppercase">
                  Tỉ lệ đúng: {Math.round((quizScore / quizList.length) * 100)}%
                </div>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed font-sans max-w-sm mx-auto">
                {quizScore === quizList.length ? "Thần sầu! Học trò quả thực là một kỳ tài học tập xuất chúng!" :
                 quizScore >= quizList.length * 0.8 ? "Tuyệt hảo! Thực lực của ngươi đã tăng tiến rõ rệt!" :
                 quizScore >= quizList.length * 0.5 ? "Không tồi! Hãy ôn tập tiếp và đánh bại các thử thách sau nhé!" : 
                 "Mài giũa thêm đi! Ngươi cần phải chăm chỉ rèn luyện hơn nữa để không phụ lòng Thầy Sơn!"}
              </p>
              
              <div className="flex gap-4 max-w-xs mx-auto">
                <button
                  onClick={() => { playSound.click(); handleStartQuiz(); }}
                  className="flex-1 border-2 border-[#1A1A1A] py-3 rounded-xl font-bold bg-[#FDFBF7] hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Làm lại test
                </button>
                <button
                  onClick={() => { playSound.click(); setQuizActive(false); setActiveTab("dashboard"); }}
                  className="flex-1 bg-[#8B0000] text-white border-2 border-[#1A1A1A] py-3 rounded-xl font-bold hover:bg-[#A30000] shadow-[2px_2px_0px_#1A1A1A] transition-colors cursor-pointer"
                >
                  Kết thúc
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
