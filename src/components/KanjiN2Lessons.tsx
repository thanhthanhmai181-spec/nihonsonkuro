import React, { useState, useEffect, useMemo } from "react";
import { playSound } from "../utils/audio";
import { 
  ArrowLeft, 
  Book, 
  Layers, 
  Pencil, 
  ChartPie, 
  ChevronDown, 
  GraduationCap, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  RotateCcw,
  BookOpen,
  Brain,
  FileText,
  Star,
  Pointer,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  Volume2,
  Sparkles,
  Search,
  Filter
} from "lucide-react";
import { KANJI_N2_LESSONS, LessonItem, KanjiItem, VocabularyItem } from "../data/kanjiN2Data";
import { SINO_VIETNAMESE_DICTIONARY } from "../data/sinoVietnameseDictionary";

interface KanjiN2LessonsProps {
  onGoBack: () => void;
}

// Helper to determine optimal font size so Kanji words stay strictly on 1 line while maximizing size
const getKanjiN2WordSizeClass = (word: string) => {
  const len = word ? word.length : 0;
  if (len <= 1) {
    return "text-7xl sm:text-8xl md:text-9xl";
  } else if (len === 2) {
    return "text-6xl sm:text-7xl md:text-8xl";
  } else if (len === 3) {
    return "text-5xl sm:text-6xl md:text-7xl";
  } else if (len === 4) {
    return "text-4xl sm:text-5xl md:text-6xl";
  } else {
    return "text-3xl sm:text-4xl md:text-5xl";
  }
};

// Base Sino-Vietnamese dictionary for common kanji
const BASE_SINO_MAP: Record<string, string> = {
  ...SINO_VIETNAMESE_DICTIONARY
};

interface UserProgress {
  viewedKanjis: string[];
  flashcards: Record<string, { attempts: number; mastered: boolean }>;
  quizHistory: {
    date: string;
    lessonId: string;
    score: number;
    total: number;
    percent: number;
  }[];
}

export default function KanjiN2Lessons({ onGoBack }: KanjiN2LessonsProps) {
  // Tabs: 'kienthuc' | 'hocflashcard' | 'flashcard' | 'baitap' | 'dulieu'
  const [currentTab, setCurrentTab] = useState<'kienthuc' | 'hocflashcard' | 'flashcard' | 'baitap' | 'dulieu'>('kienthuc');
  
  // Progress State
  const [userProgress, setUserProgress] = useState<UserProgress>({
    viewedKanjis: [],
    flashcards: {},
    quizHistory: []
  });

  // Search keyword for Knowledge tab
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Load progress on mount & reactive updates
  useEffect(() => {
    const loadFromStorage = () => {
      const saved = localStorage.getItem("kanji_n2_progress");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setUserProgress({
            viewedKanjis: parsed.viewedKanjis || [],
            flashcards: parsed.flashcards || {},
            quizHistory: parsed.quizHistory || []
          });
        } catch (e) {
          console.error("Error parsing Kanji N2 progress", e);
        }
      }
    };

    loadFromStorage();

    const handleStorageChange = (e: any) => {
      const key = e.detail?.key || e.key;
      if (!key || key === "kanji_n2_progress") {
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
  const saveProgress = (newProgress: UserProgress) => {
    let latestSaved: any = {};
    const savedStr = localStorage.getItem("kanji_n2_progress");
    if (savedStr) {
      try { latestSaved = JSON.parse(savedStr); } catch (e) {}
    }

    const mergedViewed = Array.from(new Set([...(latestSaved.viewedKanjis || []), ...(newProgress.viewedKanjis || [])]));
    const mergedFlashcards = { ...(latestSaved.flashcards || {}), ...(newProgress.flashcards || {}) };
    const mergedQuizHistory = [...(latestSaved.quizHistory || []), ...(newProgress.quizHistory || [])];

    const merged = {
      viewedKanjis: mergedViewed,
      flashcards: mergedFlashcards,
      quizHistory: mergedQuizHistory
    };

    setUserProgress(merged);
    localStorage.setItem("kanji_n2_progress", JSON.stringify(merged));
  };

  // Flattened vocabulary list for Flashcards and Quizzes
  const allVocabularies = useMemo(() => {
    const list: (VocabularyItem & { lessonId: number; kanjiChar: string })[] = [];
    const seenWords = new Set<string>();

    KANJI_N2_LESSONS.forEach(lesson => {
      lesson.kanjis.forEach(kanji => {
        kanji.vocabularies.forEach(vocab => {
          if (!seenWords.has(vocab.word)) {
            seenWords.add(vocab.word);
            list.push({
              ...vocab,
              lessonId: lesson.id,
              kanjiChar: kanji.character
            });
          }
        });
      });
    });
    return list;
  }, []);

  // Sino-Vietnamese map combined from N2 dataset and base map
  const kanjiSinoMap = useMemo(() => {
    const map: Record<string, string> = { ...BASE_SINO_MAP };
    KANJI_N2_LESSONS.forEach(lesson => {
      lesson.kanjis.forEach(k => {
        if (k.character && k.sino_vietnamese) {
          map[k.character] = k.sino_vietnamese;
        }
      });
    });
    return map;
  }, []);

  // Helper to format Sino-Vietnamese reading in parentheses: e.g. (Cấm - Chỉ)
  const getWordSinoVietnamese = (word: string): string => {
    const kanjiRegex = /[\u4E00-\u9FAF\u3400-\u4DBF]/g;
    const matches = word.match(kanjiRegex);
    if (!matches || matches.length === 0) return "";
    
    const parts = matches.map(char => {
      const val = kanjiSinoMap[char] || "";
      if (!val) return "";
      return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
    }).filter(Boolean);

    if (parts.length === 0) return "";
    return `(${parts.join(" - ")})`;
  };

  // Helper for Japanese TTS pronunciation
  const speakJapanese = (text: string) => {
    playSound.click();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  // --- TAB 1: KIẾN THỨC (KNOWLEDGE) STATE ---
  const [expandedLessonIndex, setExpandedLessonIndex] = useState<number | null>(0);
  const [expandedKanjiKeys, setExpandedKanjiKeys] = useState<Record<string, boolean>>({});

  const toggleLesson = (index: number) => {
    playSound.click();
    setExpandedLessonIndex(prev => (prev === index ? null : index));
  };

  const toggleKanji = (lessonIndex: number, kanjiIndex: number, character: string) => {
    playSound.click();
    const key = `${lessonIndex}-${kanjiIndex}`;
    setExpandedKanjiKeys(prev => ({
      ...prev,
      [key]: !prev[key]
    }));

    // Mark Kanji as viewed
    if (!userProgress.viewedKanjis.includes(character)) {
      const nextViewed = [...userProgress.viewedKanjis, character];
      saveProgress({
        ...userProgress,
        viewedKanjis: nextViewed
      });
    }
  };

  // Filter lessons and kanji by search query
  const filteredLessons = useMemo(() => {
    if (!searchQuery.trim()) return KANJI_N2_LESSONS;
    const q = searchQuery.toLowerCase().trim();
    return KANJI_N2_LESSONS.map(lesson => {
      const matchingKanjis = lesson.kanjis.filter(k => 
        k.character.includes(q) ||
        k.sino_vietnamese.toLowerCase().includes(q) ||
        k.meaning.toLowerCase().includes(q) ||
        k.kunyomi.toLowerCase().includes(q) ||
        k.onyomi.toLowerCase().includes(q) ||
        k.vocabularies.some(v => v.word.includes(q) || v.reading.includes(q) || v.meaning.toLowerCase().includes(q))
      );
      return {
        ...lesson,
        kanjis: matchingKanjis
      };
    }).filter(l => l.kanjis.length > 0 || l.title.toLowerCase().includes(q));
  }, [searchQuery]);

  // --- TAB 2: HỌC FLASHCARD (1-MẶT ĐẦY ĐỦ THÔNG TIN) STATE ---
  const [hfcLessonSelect, setHfcLessonSelect] = useState<string>('all');
  const [hfcCurrentQueue, setHfcCurrentQueue] = useState<(VocabularyItem & { lessonId: number; kanjiChar: string })[]>([]);
  const [hfcCurrentIndex, setHfcCurrentIndex] = useState<number>(0);

  const initHocFlashcards = () => {
    let queue: typeof allVocabularies = [];

    if (hfcLessonSelect === 'all') {
      const unmastered = allVocabularies.filter(v => {
        const stats = userProgress.flashcards[v.word];
        return !stats || !stats.mastered;
      });
      const mastered = allVocabularies.filter(v => {
        const stats = userProgress.flashcards[v.word];
        return stats && stats.mastered;
      });
      queue = [...unmastered, ...mastered];
    } else {
      queue = allVocabularies.filter(v => v.lessonId === Number(hfcLessonSelect));
    }

    setHfcCurrentQueue(queue);
    setHfcCurrentIndex(0);
  };

  useEffect(() => {
    if (currentTab === 'hocflashcard') {
      initHocFlashcards();
    }
  }, [currentTab, hfcLessonSelect]);

  const handleHfcPrev = () => {
    playSound.click();
    setHfcCurrentIndex(prev => (prev > 0 ? prev - 1 : hfcCurrentQueue.length - 1));
  };

  const handleHfcNext = () => {
    playSound.click();
    setHfcCurrentIndex(prev => (prev < hfcCurrentQueue.length - 1 ? prev + 1 : 0));
  };

  const handleHfcResult = (isMastered: boolean) => {
    if (hfcCurrentQueue.length === 0) return;
    playSound.click();

    const currentVocab = hfcCurrentQueue[hfcCurrentIndex];
    const prevStats = userProgress.flashcards[currentVocab.word] || { attempts: 0, mastered: false };
    
    const updatedFlashcards = {
      ...userProgress.flashcards,
      [currentVocab.word]: {
        attempts: prevStats.attempts + 1,
        mastered: isMastered
      }
    };

    saveProgress({
      ...userProgress,
      flashcards: updatedFlashcards
    });

    if (hfcCurrentIndex < hfcCurrentQueue.length - 1) {
      setHfcCurrentIndex(prev => prev + 1);
    }
  };

  const hfcStats = useMemo(() => {
    let pool = hfcLessonSelect === 'all' 
      ? allVocabularies 
      : allVocabularies.filter(v => v.lessonId === Number(hfcLessonSelect));

    let mastered = 0;
    let unmastered = 0;

    pool.forEach(v => {
      const s = userProgress.flashcards[v.word];
      if (s && s.mastered) {
        mastered++;
      } else {
        unmastered++;
      }
    });

    return { total: pool.length, mastered, unmastered };
  }, [allVocabularies, userProgress.flashcards, hfcLessonSelect]);

  // --- TAB 3: LUYỆN FLASHCARD (2 MẶT LẬT THẺ) STATE ---
  const [fcLessonSelect, setFcLessonSelect] = useState<string>('all');
  const [fcCurrentQueue, setFcCurrentQueue] = useState<(VocabularyItem & { lessonId: number; kanjiChar: string })[]>([]);
  const [fcCurrentIndex, setFcCurrentIndex] = useState<number>(0);
  const [fcIsFlipped, setFcIsFlipped] = useState<boolean>(false);

  const initFlashcards = () => {
    let queue: typeof allVocabularies = [];

    if (fcLessonSelect === 'all') {
      const unmastered = allVocabularies.filter(v => {
        const stats = userProgress.flashcards[v.word];
        return !stats || !stats.mastered;
      });
      const mastered = allVocabularies.filter(v => {
        const stats = userProgress.flashcards[v.word];
        return stats && stats.mastered;
      });
      queue = [...unmastered, ...mastered];
    } else {
      queue = allVocabularies.filter(v => v.lessonId === Number(fcLessonSelect));
    }

    setFcCurrentQueue(queue);
    setFcCurrentIndex(0);
    setFcIsFlipped(false);
  };

  useEffect(() => {
    if (currentTab === 'flashcard') {
      initFlashcards();
    }
  }, [currentTab, fcLessonSelect]);

  const handleFcFlip = () => {
    playSound.click();
    setFcIsFlipped(prev => !prev);
  };

  const handleFcPrev = () => {
    playSound.click();
    setFcIsFlipped(false);
    setFcCurrentIndex(prev => (prev > 0 ? prev - 1 : fcCurrentQueue.length - 1));
  };

  const handleFcNext = () => {
    playSound.click();
    setFcIsFlipped(false);
    setFcCurrentIndex(prev => (prev < fcCurrentQueue.length - 1 ? prev + 1 : 0));
  };

  const handleFcResult = (isMastered: boolean) => {
    if (fcCurrentQueue.length === 0) return;
    playSound.click();

    const currentVocab = fcCurrentQueue[fcCurrentIndex];
    const prevStats = userProgress.flashcards[currentVocab.word] || { attempts: 0, mastered: false };
    
    const updatedFlashcards = {
      ...userProgress.flashcards,
      [currentVocab.word]: {
        attempts: prevStats.attempts + 1,
        mastered: isMastered
      }
    };

    saveProgress({
      ...userProgress,
      flashcards: updatedFlashcards
    });

    setFcIsFlipped(false);
    if (fcCurrentIndex < fcCurrentQueue.length - 1) {
      setFcCurrentIndex(prev => prev + 1);
    }
  };

  const fcStats = useMemo(() => {
    let pool = fcLessonSelect === 'all' 
      ? allVocabularies 
      : allVocabularies.filter(v => v.lessonId === Number(fcLessonSelect));

    let mastered = 0;
    let unmastered = 0;

    pool.forEach(v => {
      const s = userProgress.flashcards[v.word];
      if (s && s.mastered) {
        mastered++;
      } else {
        unmastered++;
      }
    });

    return { total: pool.length, mastered, unmastered };
  }, [allVocabularies, userProgress.flashcards, fcLessonSelect]);

  // --- TAB 4: BÀI TẬP (QUIZ) STATE ---
  const [quizLessonSelect, setQuizLessonSelect] = useState<string>('1');
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [quizCurrentIndex, setQuizCurrentIndex] = useState<number>(0);
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizIsFinished, setQuizIsFinished] = useState<boolean>(false);
  const [quizAnswersRecord, setQuizAnswersRecord] = useState<{ isCorrect: boolean; selected: number; correct: number }[]>([]);

  const generateQuiz = () => {
    let pool = quizLessonSelect === 'all'
      ? allVocabularies
      : allVocabularies.filter(v => v.lessonId === Number(quizLessonSelect));

    if (pool.length === 0) return;

    // Shuffle pool
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(10, shuffled.length));

    const questions = selected.map(item => {
      // 50% chance: Question is Kanji -> Options are Readings; 50% chance: Question is Kanji -> Options are Meanings
      const type = Math.random() > 0.5 ? 'reading' : 'meaning';
      
      let otherOptions: string[] = [];
      if (type === 'reading') {
        const potentialWrong = allVocabularies.filter(v => v.reading !== item.reading).map(v => v.reading);
        const uniqueWrong = Array.from(new Set(potentialWrong)).sort(() => 0.5 - Math.random()).slice(0, 3) as string[];
        otherOptions = uniqueWrong;
      } else {
        const potentialWrong = allVocabularies.filter(v => v.meaning !== item.meaning).map(v => v.meaning);
        const uniqueWrong = Array.from(new Set(potentialWrong)).sort(() => 0.5 - Math.random()).slice(0, 3) as string[];
        otherOptions = uniqueWrong;
      }

      const correctAnswer = type === 'reading' ? item.reading : item.meaning;
      const options = [...otherOptions, correctAnswer].sort(() => 0.5 - Math.random());
      const correctIndex = options.indexOf(correctAnswer);

      return {
        vocab: item,
        type,
        question: item.word,
        options,
        correctIndex,
        explanation: `${item.word} 【${item.reading}】: ${item.meaning}`
      };
    });

    setQuizQuestions(questions);
    setQuizCurrentIndex(0);
    setQuizSelectedOption(null);
    setQuizScore(0);
    setQuizIsFinished(false);
    setQuizAnswersRecord([]);
  };

  useEffect(() => {
    if (currentTab === 'baitap') {
      generateQuiz();
    }
  }, [currentTab, quizLessonSelect]);

  const handleSelectQuizOption = (index: number) => {
    if (quizSelectedOption !== null) return; // Prevent change
    setQuizSelectedOption(index);

    const currentQ = quizQuestions[quizCurrentIndex];
    const isCorrect = index === currentQ.correctIndex;

    if (isCorrect) {
      playSound.correct();
      setQuizScore(prev => prev + 1);
    } else {
      playSound.wrong();
    }

    setQuizAnswersRecord(prev => [
      ...prev,
      { isCorrect, selected: index, correct: currentQ.correctIndex }
    ]);
  };

  const handleNextQuizQuestion = () => {
    playSound.click();
    if (quizCurrentIndex < quizQuestions.length - 1) {
      setQuizCurrentIndex(prev => prev + 1);
      setQuizSelectedOption(null);
    } else {
      setQuizIsFinished(true);
      // Save quiz history
      const total = quizQuestions.length;
      const finalScore = quizScore;
      const percent = Math.round((finalScore / total) * 100);

      const historyItem = {
        date: new Date().toLocaleDateString('vi-VN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        lessonId: quizLessonSelect === 'all' ? 'Tất cả bài' : `Bài ${quizLessonSelect}`,
        score: finalScore,
        total,
        percent
      };

      saveProgress({
        ...userProgress,
        quizHistory: [historyItem, ...userProgress.quizHistory.slice(0, 19)]
      });
    }
  };

  // --- TAB 5: DỮ LIỆU (STATS) CALCULATIONS ---
  const totalKanjisInN2 = useMemo(() => {
    return KANJI_N2_LESSONS.reduce((acc, l) => acc + l.kanjis.length, 0);
  }, []);

  const totalVocabInN2 = useMemo(() => {
    return allVocabularies.length;
  }, [allVocabularies]);

  const kanjiViewedCount = useMemo(() => {
    return userProgress.viewedKanjis.length;
  }, [userProgress.viewedKanjis]);

  const vocabMasteredCount = useMemo(() => {
    return Object.values(userProgress.flashcards).filter((f: { attempts: number; mastered: boolean }) => f.mastered).length;
  }, [userProgress.flashcards]);

  return (
    <div id="kanji-n2-container" className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans pb-16">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-emerald-800 via-teal-700 to-cyan-800 text-white shadow-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              id="kanji-n2-back-btn"
              onClick={() => {
                playSound.click();
                onGoBack();
              }}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition-all text-white flex items-center justify-center cursor-pointer"
              title="Quay lại danh mục N2"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-amber-400 text-slate-900 text-xs font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                  N2 Kanji
                </span>
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                  Hán Tự N2 Toàn Diện
                </h1>
              </div>
              <p className="text-xs text-teal-100 hidden sm:block">
                Học Hán tự N2 chuẩn format JLPT với âm Hán Việt, từ vựng, Flashcard & Luyện tập
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right hidden sm:block">
              <span className="text-xs text-teal-200 block">Đã xem</span>
              <span className="text-sm font-black text-amber-300">
                {kanjiViewedCount} / {totalKanjisInN2} Hán tự
              </span>
            </div>
          </div>
        </div>

        {/* TABS NAVIGATION */}
        <div className="max-w-6xl mx-auto px-2 sm:px-4 flex overflow-x-auto no-scrollbar gap-1 border-t border-teal-600/50 pt-1 pb-1">
          <button
            id="tab-kienthuc-btn"
            onClick={() => {
              playSound.click();
              setCurrentTab('kienthuc');
            }}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              currentTab === 'kienthuc'
                ? 'bg-white text-teal-900 shadow-sm'
                : 'text-teal-100 hover:bg-white/10'
            }`}
          >
            <Book className="w-4 h-4" />
            <span>1. Kiến thức</span>
          </button>

          <button
            id="tab-hocflashcard-btn"
            onClick={() => {
              playSound.click();
              setCurrentTab('hocflashcard');
            }}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              currentTab === 'hocflashcard'
                ? 'bg-white text-teal-900 shadow-sm'
                : 'text-teal-100 hover:bg-white/10'
            }`}
          >
            <Brain className="w-4 h-4 text-emerald-600" />
            <span>2. Học Flashcard</span>
          </button>

          <button
            id="tab-flashcard-btn"
            onClick={() => {
              playSound.click();
              setCurrentTab('flashcard');
            }}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              currentTab === 'flashcard'
                ? 'bg-white text-teal-900 shadow-sm'
                : 'text-teal-100 hover:bg-white/10'
            }`}
          >
            <Layers className="w-4 h-4 text-amber-600" />
            <span>3. Luyện Flashcard</span>
          </button>

          <button
            id="tab-baitap-btn"
            onClick={() => {
              playSound.click();
              setCurrentTab('baitap');
            }}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              currentTab === 'baitap'
                ? 'bg-white text-teal-900 shadow-sm'
                : 'text-teal-100 hover:bg-white/10'
            }`}
          >
            <Pencil className="w-4 h-4 text-rose-500" />
            <span>4. Bài tập</span>
          </button>

          <button
            id="tab-dulieu-btn"
            onClick={() => {
              playSound.click();
              setCurrentTab('dulieu');
            }}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              currentTab === 'dulieu'
                ? 'bg-white text-teal-900 shadow-sm'
                : 'text-teal-100 hover:bg-white/10'
            }`}
          >
            <ChartPie className="w-4 h-4 text-cyan-600" />
            <span>5. Tiến độ & Thống kê</span>
          </button>
        </div>
      </header>

      {/* BODY CONTENT ACCORDING TO TABS */}
      <main className="max-w-6xl mx-auto px-4 py-6 flex-1 w-full">

        {/* 1. TAB KIẾN THỨC */}
        {currentTab === 'kienthuc' && (
          <div className="space-y-6">
            {/* Search and Overview Bar */}
            <div className="bg-white dark:bg-[#18182B] rounded-2xl p-4 shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm Hán tự, âm Hán Việt, âm On/Kun, hoặc từ vựng..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm bg-slate-50/70 dark:bg-[#151528] text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded cursor-pointer hover:bg-slate-300"
                  >
                    Xóa
                  </button>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-600 self-end md:self-auto">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/70 text-teal-800 dark:text-teal-200 font-bold border border-teal-200/60 dark:border-teal-800/60">
                  <BookOpen className="w-4 h-4" /> {KANJI_N2_LESSONS.length} bài học
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/70 text-amber-800 dark:text-amber-200 font-bold border border-amber-200/60 dark:border-amber-800/60">
                  <GraduationCap className="w-4 h-4" /> {totalKanjisInN2} Hán tự N2
                </span>
              </div>
            </div>

            {/* Lesson Accordions */}
            <div className="space-y-4">
              {filteredLessons.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-[#18182B] rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                  <HelpCircle className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                  <p className="text-slate-600 dark:text-slate-300 font-medium">Không tìm thấy chữ Hán nào phù hợp với "{searchQuery}"</p>
                </div>
              ) : (
                filteredLessons.map((lesson, lIdx) => {
                  const isLessonExpanded = expandedLessonIndex === lIdx || searchQuery.trim().length > 0;
                  return (
                    <div 
                      key={lesson.id} 
                      className="bg-white dark:bg-[#18182B] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-200"
                    >
                      {/* Lesson Header */}
                      <button
                        onClick={() => toggleLesson(lIdx)}
                        className="w-full px-5 py-4 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white dark:from-[#151528] dark:to-[#18182B] hover:bg-slate-100/80 dark:hover:bg-[#1d1d33] transition-colors text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-3.5">
                          <span className="w-8 h-8 rounded-xl bg-teal-600 text-white font-black text-sm flex items-center justify-center shadow-sm">
                            {lesson.id}
                          </span>
                          <div>
                            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                              {lesson.title}
                            </h3>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
                              {lesson.description} • ({lesson.kanjis.length} Hán tự)
                            </p>
                          </div>
                        </div>
                        <ChevronDown 
                          className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                            isLessonExpanded ? "rotate-180 text-teal-600" : ""
                          }`} 
                        />
                      </button>

                      {/* Lesson Content - Kanji Cards Grid */}
                      {isLessonExpanded && (
                        <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-[#131324]">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {lesson.kanjis.map((kanji, kIdx) => {
                              const kanjiKey = `${lIdx}-${kIdx}`;
                              const isKanjiExpanded = expandedKanjiKeys[kanjiKey] ?? true;
                              const isViewed = userProgress.viewedKanjis.includes(kanji.character);

                              return (
                                <div 
                                  key={kIdx}
                                  className="bg-white dark:bg-[#18182B] rounded-xl border border-slate-200/90 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col"
                                >
                                  {/* Kanji Top Header */}
                                  <div 
                                    onClick={() => toggleKanji(lIdx, kIdx, kanji.character)}
                                    className="p-3.5 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white flex items-center justify-between cursor-pointer group"
                                  >
                                    <div className="flex items-center gap-3">
                                      <span className="text-3xl font-black font-serif text-amber-300 drop-shadow-sm group-hover:scale-105 transition-transform">
                                        {kanji.character}
                                      </span>
                                      <div>
                                        <div className="flex items-center gap-1.5">
                                          <span className="font-extrabold text-white text-base tracking-wide uppercase">
                                            {kanji.sino_vietnamese}
                                          </span>
                                          {isViewed && (
                                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                                          )}
                                        </div>
                                        <p className="text-xs text-slate-200 line-clamp-1 font-medium">
                                          {kanji.meaning}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-1">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          speakJapanese(kanji.character);
                                        }}
                                        className="p-1.5 text-slate-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                                        title="Nghe phát âm"
                                      >
                                        <Volume2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </div>

                                  {/* Kanji Details */}
                                  <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                                    {/* Readings */}
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                      <div className="bg-slate-100/80 dark:bg-[#1E1E34] p-2 rounded-lg border border-slate-200 dark:border-slate-700/80">
                                        <span className="text-slate-600 dark:text-slate-400 font-bold block text-[10px] uppercase tracking-wider">Âm Kun</span>
                                        <span className="text-slate-900 dark:text-slate-100 font-bold">{kanji.kunyomi || "-"}</span>
                                      </div>
                                      <div className="bg-teal-50/80 dark:bg-[#162738] p-2 rounded-lg border border-teal-200/80 dark:border-teal-800/60">
                                        <span className="text-teal-800 dark:text-teal-300 font-bold block text-[10px] uppercase tracking-wider">Âm On</span>
                                        <span className="text-teal-950 dark:text-teal-200 font-black">{kanji.onyomi || "-"}</span>
                                      </div>
                                    </div>

                                    {/* Vocabulary List */}
                                    {isKanjiExpanded && (
                                      <div className="space-y-1.5 pt-1">
                                        <span className="text-[11px] font-bold text-teal-800 dark:text-teal-300 uppercase tracking-wider block">
                                          Từ vựng thường gặp ({kanji.vocabularies.length})
                                        </span>
                                        <div className="space-y-1.5">
                                          {kanji.vocabularies.map((v, vIdx) => {
                                            const sino = getWordSinoVietnamese(v.word);
                                            return (
                                              <div 
                                                key={vIdx}
                                                className="p-2.5 rounded-lg bg-slate-100/90 hover:bg-teal-50/90 dark:bg-[#1E1E34] dark:hover:bg-[#282846] border border-slate-200 dark:border-slate-700/80 flex items-center justify-between text-xs transition-colors group/v shadow-xs"
                                              >
                                                <div>
                                                  <div className="flex items-baseline gap-1.5">
                                                    <span className="font-extrabold text-slate-900 dark:text-white text-sm tracking-wide">{v.word}</span>
                                                    <span className="text-teal-700 dark:text-teal-300 font-bold">【{v.reading}】</span>
                                                    {sino && (
                                                      <span className="text-[11px] text-slate-600 dark:text-amber-300/90 font-semibold italic">{sino}</span>
                                                    )}
                                                  </div>
                                                  <p className="text-slate-800 dark:text-slate-100 text-xs mt-0.5 font-medium">{v.meaning}</p>
                                                </div>
                                                <button
                                                  onClick={() => speakJapanese(v.word)}
                                                  className="p-1 text-slate-400 group-hover/v:text-teal-700 dark:text-slate-400 dark:group-hover/v:text-teal-300 transition-colors cursor-pointer"
                                                  title="Nghe từ vựng"
                                                >
                                                  <Volume2 className="w-3.5 h-3.5" />
                                                </button>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* 2. TAB HỌC FLASHCARD (1-MẶT ĐẦY ĐỦ THÔNG TIN) */}
        {currentTab === 'hocflashcard' && (
          <div className="max-w-2xl mx-auto space-y-5">
            {/* Filter Toolbar */}
            <div className="bg-white dark:bg-[#18182B] p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Chọn bài:</span>
                <select
                  value={hfcLessonSelect}
                  onChange={(e) => setHfcLessonSelect(e.target.value)}
                  className="bg-slate-50 dark:bg-[#151528] border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="all">Toàn bộ các bài ({totalVocabInN2} từ)</option>
                  {KANJI_N2_LESSONS.map(l => (
                    <option key={l.id} value={l.id.toString()}>Bài {l.id}: {l.title.slice(0, 30)}...</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="text-emerald-800 dark:text-emerald-300 font-bold bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200/60 dark:border-emerald-800/60 px-2.5 py-1 rounded-md">
                  Thuộc: {hfcStats.mastered}
                </span>
                <span className="text-amber-800 dark:text-amber-300 font-bold bg-amber-50 dark:bg-amber-950/70 border border-amber-200/60 dark:border-amber-800/60 px-2.5 py-1 rounded-md">
                  Chưa thuộc: {hfcStats.unmastered}
                </span>
              </div>
            </div>

            {/* Flashcard Item View */}
            {hfcCurrentQueue.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-[#18182B] rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
                <p className="text-slate-600 dark:text-slate-300 font-medium">Không có từ vựng nào trong danh sách.</p>
              </div>
            ) : (
              (() => {
                const currentItem = hfcCurrentQueue[hfcCurrentIndex];
                const isMastered = userProgress.flashcards[currentItem.word]?.mastered;
                const sino = getWordSinoVietnamese(currentItem.word);

                return (
                  <div className="space-y-4">
                    {/* Main Flashcard Card */}
                    <div className="bg-white dark:bg-[#18182B] rounded-3xl border-2 border-teal-600/40 dark:border-teal-700/60 shadow-xl overflow-hidden relative">
                      {/* Top Bar of Card */}
                      <div className="bg-gradient-to-r from-teal-800 to-cyan-900 text-white px-5 py-3 flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-teal-200">
                          Học Từ Vựng Hán Tự N2 ({hfcCurrentIndex + 1}/{hfcCurrentQueue.length})
                        </span>
                        <span className="text-xs bg-white/20 px-2.5 py-0.5 rounded-full font-semibold">
                          Bài {currentItem.lessonId}
                        </span>
                      </div>

                      {/* Card Content */}
                      <div className="p-6 sm:p-10 text-center space-y-6">
                        {/* Word Display with Large Dynamic Font */}
                        <div className="space-y-2">
                          <h2 className={`${getKanjiN2WordSizeClass(currentItem.word)} font-black font-serif text-slate-900 dark:text-white tracking-wider whitespace-nowrap overflow-x-auto py-2`}>
                            {currentItem.word}
                          </h2>
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-2xl sm:text-3xl font-extrabold text-teal-700 dark:text-teal-300">
                              {currentItem.reading}
                            </span>
                            <button
                              onClick={() => speakJapanese(currentItem.word)}
                              className="p-2 rounded-full bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900/60 text-teal-700 dark:text-teal-300 transition-colors cursor-pointer"
                              title="Nghe phát âm"
                            >
                              <Volume2 className="w-5 h-5" />
                            </button>
                          </div>
                          {sino && (
                            <p className="text-base text-slate-700 dark:text-amber-300 font-bold italic">
                              Âm Hán Việt: {sino}
                            </p>
                          )}
                        </div>

                        {/* Meaning Section */}
                        <div className="py-4 px-6 rounded-2xl bg-gradient-to-r from-teal-50/90 via-emerald-50/90 to-cyan-50/90 dark:from-[#162738] dark:to-[#1a2d3d] border border-teal-200 dark:border-teal-800/80 max-w-lg mx-auto">
                          <span className="text-xs font-bold text-teal-800 dark:text-teal-300 uppercase tracking-wider block mb-1">
                            Ý nghĩa tiếng Việt
                          </span>
                          <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                            {currentItem.meaning}
                          </p>
                        </div>
                      </div>

                      {/* Status Indicator */}
                      <div className="bg-slate-50 dark:bg-[#151528] border-t border-slate-100 dark:border-slate-800 px-6 py-3 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                        <span>Trạng thái:</span>
                        <span className={`font-bold px-2.5 py-1 rounded-full ${
                          isMastered ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700' : 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700'
                        }`}>
                          {isMastered ? '✓ Đã ghi nhớ' : '⏳ Cần ôn tập thêm'}
                        </span>
                      </div>
                    </div>

                    {/* Navigation and Result Controls */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                      <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
                        <button
                          onClick={handleHfcPrev}
                          className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#18182B] hover:bg-slate-50 dark:hover:bg-[#202038] text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <ChevronLeft className="w-4 h-4" /> Trước
                        </button>
                        <button
                          onClick={handleHfcNext}
                          className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#18182B] hover:bg-slate-50 dark:hover:bg-[#202038] text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          Sau <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
                        <button
                          onClick={() => handleHfcResult(false)}
                          className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-95 transition-all"
                        >
                          <RotateCcw className="w-4 h-4" /> Chưa thuộc
                        </button>
                        <button
                          onClick={() => handleHfcResult(true)}
                          className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-95 transition-all"
                        >
                          <CheckCircle className="w-4 h-4" /> Đã thuộc
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()
            )}
          </div>
        )}

        {/* 3. TAB LUYỆN FLASHCARD (2 MẶT LẬT THẺ) */}
        {currentTab === 'flashcard' && (
          <div className="max-w-2xl mx-auto space-y-5">
            {/* Filter Toolbar */}
            <div className="bg-white dark:bg-[#18182B] p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Chọn bài:</span>
                <select
                  value={fcLessonSelect}
                  onChange={(e) => setFcLessonSelect(e.target.value)}
                  className="bg-slate-50 dark:bg-[#151528] border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="all">Toàn bộ các bài ({totalVocabInN2} từ)</option>
                  {KANJI_N2_LESSONS.map(l => (
                    <option key={l.id} value={l.id.toString()}>Bài {l.id}: {l.title.slice(0, 30)}...</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="text-emerald-800 dark:text-emerald-300 font-bold bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200/60 dark:border-emerald-800/60 px-2.5 py-1 rounded-md">
                  Thuộc: {fcStats.mastered}
                </span>
                <span className="text-amber-800 dark:text-amber-300 font-bold bg-amber-50 dark:bg-amber-950/70 border border-amber-200/60 dark:border-amber-800/60 px-2.5 py-1 rounded-md">
                  Chưa thuộc: {fcStats.unmastered}
                </span>
              </div>
            </div>

            {/* Flip Card View */}
            {fcCurrentQueue.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-[#18182B] rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
                <p className="text-slate-600 dark:text-slate-300 font-medium">Không có từ vựng nào.</p>
              </div>
            ) : (
              (() => {
                const currentItem = fcCurrentQueue[fcCurrentIndex];
                const sino = getWordSinoVietnamese(currentItem.word);

                return (
                  <div className="space-y-4">
                    {/* Interactive 2-Sided Flip Card */}
                    <div 
                      onClick={handleFcFlip}
                      className="bg-white dark:bg-[#18182B] rounded-3xl border-2 border-amber-500/50 dark:border-amber-600/60 shadow-xl overflow-hidden relative cursor-pointer min-h-[300px] flex flex-col justify-between hover:border-amber-500 transition-all group"
                    >
                      {/* Top Bar */}
                      <div className="bg-gradient-to-r from-amber-700 via-orange-700 to-amber-900 text-white px-5 py-3 flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-100">
                          {fcIsFlipped ? 'Mặt sau: Đáp án & Âm Hán' : 'Mặt trước: Chữ Hán'} ({fcCurrentIndex + 1}/{fcCurrentQueue.length})
                        </span>
                        <span className="text-xs bg-white/20 px-2.5 py-0.5 rounded-full font-semibold">
                          Chạm thẻ để lật
                        </span>
                      </div>

                      {/* Card Body */}
                      <div className="p-8 sm:p-12 text-center flex-1 flex flex-col items-center justify-center space-y-4">
                        {!fcIsFlipped ? (
                          // Front: Kanji Only
                          <div className="space-y-3">
                            <h2 className={`${getKanjiN2WordSizeClass(currentItem.word)} font-black font-serif text-slate-900 dark:text-white tracking-wide`}>
                              {currentItem.word}
                            </h2>
                            <p className="text-xs font-bold text-amber-800 dark:text-amber-200 uppercase tracking-widest bg-amber-50 dark:bg-amber-950/70 inline-block px-3 py-1 rounded-full border border-amber-300 dark:border-amber-700">
                              Chạm để xem cách đọc & ý nghĩa
                            </p>
                          </div>
                        ) : (
                          // Back: Reading, Sino, Meaning
                          <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200 w-full max-w-md">
                            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                              {currentItem.word}
                            </h2>
                            <div className="flex items-center justify-center gap-2">
                              <span className="text-2xl sm:text-3xl font-black text-amber-700 dark:text-amber-300">
                                {currentItem.reading}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  speakJapanese(currentItem.word);
                                }}
                                className="p-2 rounded-full bg-amber-100 dark:bg-amber-950/60 hover:bg-amber-200 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-200 transition-colors cursor-pointer"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </div>
                            {sino && (
                              <p className="text-sm font-bold text-slate-700 dark:text-amber-300 italic">
                                Âm Hán: {sino}
                              </p>
                            )}
                            <div className="p-4 rounded-2xl bg-amber-50/90 dark:bg-[#2b2518] border border-amber-200 dark:border-amber-800/80">
                              <span className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase block mb-1">Ý nghĩa</span>
                              <p className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">{currentItem.meaning}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Bottom Hint */}
                      <div className="bg-slate-50 dark:bg-[#151528] border-t border-slate-100 dark:border-slate-800 px-6 py-2.5 text-center text-xs text-slate-500 dark:text-slate-400 font-medium">
                        💡 Thử tự nhẩm cách đọc Hiragana và nghĩa trước khi lật thẻ
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                      <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
                        <button
                          onClick={handleFcPrev}
                          className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#18182B] hover:bg-slate-50 dark:hover:bg-[#202038] text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <ChevronLeft className="w-4 h-4" /> Trước
                        </button>
                        <button
                          onClick={handleFcNext}
                          className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#18182B] hover:bg-slate-50 dark:hover:bg-[#202038] text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          Sau <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
                        <button
                          onClick={() => handleFcResult(false)}
                          className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-95 transition-all"
                        >
                          <RotateCcw className="w-4 h-4" /> Chưa thuộc
                        </button>
                        <button
                          onClick={() => handleFcResult(true)}
                          className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-95 transition-all"
                        >
                          <CheckCircle className="w-4 h-4" /> Đã thuộc
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()
            )}
          </div>
        )}

        {/* 4. TAB BÀI TẬP (QUIZ) */}
        {currentTab === 'baitap' && (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Quiz Lesson Select */}
            <div className="bg-white dark:bg-[#18182B] p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Phạm vi câu hỏi:</span>
                <select
                  value={quizLessonSelect}
                  onChange={(e) => setQuizLessonSelect(e.target.value)}
                  className="bg-slate-50 dark:bg-[#151528] border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="all">Tất cả bài học</option>
                  {KANJI_N2_LESSONS.map(l => (
                    <option key={l.id} value={l.id.toString()}>Bài {l.id}: {l.title.slice(0, 30)}...</option>
                  ))}
                </select>
              </div>

              <button
                onClick={generateQuiz}
                className="px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-800 dark:text-rose-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors border border-rose-200/60 dark:border-rose-800/60"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Tạo đề thi mới
              </button>
            </div>

            {/* Quiz Body */}
            {quizQuestions.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-[#18182B] rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
                <p className="text-slate-600 dark:text-slate-300 font-medium">Đang tải đề bài...</p>
              </div>
            ) : !quizIsFinished ? (
              (() => {
                const q = quizQuestions[quizCurrentIndex];
                const hasAnswered = quizSelectedOption !== null;

                return (
                  <div className="bg-white dark:bg-[#18182B] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden space-y-6 p-6 sm:p-8">
                    {/* Progress Header */}
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                      <div>
                        <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider block">
                          Câu {quizCurrentIndex + 1} / {quizQuestions.length}
                        </span>
                        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                          {q.type === 'reading' ? 'Chọn cách đọc đúng của từ:' : 'Chọn ý nghĩa đúng của từ:'}
                        </h3>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-slate-500 dark:text-slate-400 block">Điểm số</span>
                        <span className="text-base font-black text-rose-600 dark:text-rose-400">{quizScore} / {quizQuestions.length}</span>
                      </div>
                    </div>

                    {/* Question Kanji */}
                    <div className="text-center py-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl shadow-inner relative">
                      <h2 className="text-5xl sm:text-6xl font-black font-serif text-amber-300 tracking-wider">
                        {q.question}
                      </h2>
                      <button
                        onClick={() => speakJapanese(q.question)}
                        className="absolute right-4 top-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                        title="Nghe phát âm"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Options List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {q.options.map((opt: string, optIdx: number) => {
                        let btnClass = "bg-slate-50 dark:bg-[#1E1E34] hover:bg-slate-100 dark:hover:bg-[#282846] border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100";

                        if (hasAnswered) {
                          if (optIdx === q.correctIndex) {
                            btnClass = "bg-emerald-600 text-white border-emerald-600 font-bold shadow-md";
                          } else if (optIdx === quizSelectedOption) {
                            btnClass = "bg-rose-600 text-white border-rose-600 font-bold";
                          } else {
                            btnClass = "bg-slate-50 dark:bg-[#1E1E34] border-slate-200 dark:border-slate-800 text-slate-400 opacity-60";
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectQuizOption(optIdx)}
                            disabled={hasAnswered}
                            className={`p-4 rounded-xl border-2 text-left font-bold text-sm transition-all duration-200 flex items-center justify-between cursor-pointer ${btnClass}`}
                          >
                            <span>{opt}</span>
                            {hasAnswered && optIdx === q.correctIndex && (
                              <CheckCircle className="w-5 h-5 text-white" />
                            )}
                            {hasAnswered && optIdx === quizSelectedOption && optIdx !== q.correctIndex && (
                              <XCircle className="w-5 h-5 text-white" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation Banner (Shown after answering) */}
                    {hasAnswered && (
                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#1E1E34] border border-slate-200 dark:border-slate-700 space-y-2 animate-in fade-in duration-200">
                        <div className="flex items-center gap-2">
                          {quizSelectedOption === q.correctIndex ? (
                            <span className="text-emerald-700 dark:text-emerald-400 font-bold text-xs flex items-center gap-1">
                              <CheckCircle className="w-4 h-4" /> Chính xác!
                            </span>
                          ) : (
                            <span className="text-rose-700 dark:text-rose-400 font-bold text-xs flex items-center gap-1">
                              <XCircle className="w-4 h-4" /> Chưa chính xác!
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          Giải thích: <span className="text-teal-800 dark:text-teal-300 font-bold">{q.explanation}</span>
                        </p>

                        <button
                          onClick={handleNextQuizQuestion}
                          className="w-full mt-3 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                        >
                          {quizCurrentIndex < quizQuestions.length - 1 ? "Câu tiếp theo" : "Xem kết quả"} <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })()
            ) : (
              // Quiz Summary Finished View
              <div className="bg-white dark:bg-[#18182B] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-8 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto shadow-inner">
                  <GraduationCap className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">Hoàn thành bài luyện tập!</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Kết quả làm bài Hán tự N2 của bạn</p>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-50 to-orange-50 dark:from-[#2a1720] dark:to-[#2b1f17] border border-rose-200 dark:border-rose-800/80 max-w-sm mx-auto space-y-2">
                  <div className="text-4xl font-black text-rose-600 dark:text-rose-400">
                    {quizScore} / {quizQuestions.length}
                  </div>
                  <div className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Đạt {Math.round((quizScore / quizQuestions.length) * 100)}%
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                  <button
                    onClick={generateQuiz}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md cursor-pointer transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" /> Làm lại đề này
                  </button>
                  <button
                    onClick={() => setCurrentTab('kienthuc')}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-[#202038] text-slate-800 dark:text-slate-200 font-bold text-sm cursor-pointer transition-all"
                  >
                    Về mục Kiến thức
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 5. TAB TIẾN ĐỘ & THỐNG KÊ (DATA) */}
        {currentTab === 'dulieu' && (
          <div className="space-y-6">
            {/* Overview Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-[#18182B] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                  <span className="text-xs font-bold uppercase">Tổng Hán tự N2</span>
                  <Book className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                </div>
                <div className="text-3xl font-black text-slate-900 dark:text-white">{totalKanjisInN2}</div>
                <p className="text-xs text-slate-600 dark:text-slate-400">Bao gồm {KANJI_N2_LESSONS.length} bài học</p>
              </div>

              <div className="bg-white dark:bg-[#18182B] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                  <span className="text-xs font-bold uppercase">Hán tự đã xem</span>
                  <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                  {kanjiViewedCount} <span className="text-sm font-medium text-slate-500 dark:text-slate-400">/ {totalKanjisInN2}</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min(100, Math.round((kanjiViewedCount / totalKanjisInN2) * 100))}%` }}
                  />
                </div>
              </div>

              <div className="bg-white dark:bg-[#18182B] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                  <span className="text-xs font-bold uppercase">Từ vựng đã thuộc</span>
                  <Star className="w-5 h-5 text-amber-500" />
                </div>
                <div className="text-3xl font-black text-amber-600 dark:text-amber-400">
                  {vocabMasteredCount} <span className="text-sm font-medium text-slate-500 dark:text-slate-400">/ {totalVocabInN2}</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                  <div 
                    className="bg-amber-500 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min(100, Math.round((vocabMasteredCount / totalVocabInN2) * 100))}%` }}
                  />
                </div>
              </div>

              <div className="bg-white dark:bg-[#18182B] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                  <span className="text-xs font-bold uppercase">Lần luyện tập</span>
                  <Pencil className="w-5 h-5 text-rose-500" />
                </div>
                <div className="text-3xl font-black text-rose-600 dark:text-rose-400">{userProgress.quizHistory.length}</div>
                <p className="text-xs text-slate-600 dark:text-slate-400">Lịch sử bài kiểm tra đã lưu</p>
              </div>
            </div>

            {/* Quiz History Table */}
            <div className="bg-white dark:bg-[#18182B] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <ChartPie className="w-5 h-5 text-teal-600 dark:text-teal-400" /> Lịch sử làm bài tập
                </h3>
                {userProgress.quizHistory.length > 0 && (
                  <button
                    onClick={() => {
                      if (confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử làm bài?")) {
                        saveProgress({
                          ...userProgress,
                          quizHistory: []
                        });
                      }
                    }}
                    className="text-xs text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 cursor-pointer transition-colors"
                  >
                    Xóa lịch sử
                  </button>
                )}
              </div>

              {userProgress.quizHistory.length === 0 ? (
                <p className="text-slate-500 dark:text-slate-400 text-sm italic py-4 text-center">Chưa có lịch sử làm bài tập nào.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase text-[11px]">
                        <th className="py-2.5 px-3">Thời gian</th>
                        <th className="py-2.5 px-3">Phạm vi</th>
                        <th className="py-2.5 px-3">Điểm số</th>
                        <th className="py-2.5 px-3">Tỷ lệ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {userProgress.quizHistory.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-[#202038] transition-colors">
                          <td className="py-3 px-3 text-slate-700 dark:text-slate-300 font-medium">{item.date}</td>
                          <td className="py-3 px-3 text-slate-900 dark:text-slate-100 font-bold">{item.lessonId}</td>
                          <td className="py-3 px-3 text-slate-800 dark:text-slate-200 font-semibold">{item.score}/{item.total}</td>
                          <td className="py-3 px-3">
                            <span className={`font-bold px-2 py-0.5 rounded ${
                              item.percent >= 80 ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300' :
                              item.percent >= 50 ? 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300' :
                              'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300'
                            }`}>
                              {item.percent}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
