import React, { useState, useEffect, useMemo, useRef } from "react";
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
  ChevronRight
} from "lucide-react";
import { KANJI_N3_DATA, LessonItem, KanjiItem, VocabularyItem } from "../data/kanjiN3Data";

interface KanjiN3LessonsProps {
  onGoBack: () => void;
}

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

export default function KanjiN3Lessons({ onGoBack }: KanjiN3LessonsProps) {
  // Tabs: 'kienthuc' | 'flashcard' | 'baitap' | 'dulieu'
  const [currentTab, setCurrentTab] = useState<'kienthuc' | 'flashcard' | 'baitap' | 'dulieu'>('kienthuc');
  
  // Progress State
  const [userProgress, setUserProgress] = useState<UserProgress>({
    viewedKanjis: [],
    flashcards: {},
    quizHistory: []
  });

  // Load progress on mount
  useEffect(() => {
    const saved = localStorage.getItem("kanji_n3_progress");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUserProgress({
          viewedKanjis: parsed.viewedKanjis || [],
          flashcards: parsed.flashcards || {},
          quizHistory: parsed.quizHistory || []
        });
      } catch (e) {
        console.error("Error parsing Kanji N3 progress", e);
      }
    }
  }, []);

  // Save progress helper
  const saveProgress = (newProgress: UserProgress) => {
    setUserProgress(newProgress);
    localStorage.setItem("kanji_n3_progress", JSON.stringify(newProgress));
  };

  // Flattened vocabulary list for Flashcards and Quizzes
  const allVocabularies = useMemo(() => {
    const list: (VocabularyItem & { lessonId: number; kanjiChar: string })[] = [];
    const seenWords = new Set<string>();

    KANJI_N3_DATA.forEach(lesson => {
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

  // --- TAB 1: KIẾN THỨC (KNOWLEDGE) STATE ---
  const [expandedLessonIndex, setExpandedLessonIndex] = useState<number | null>(null);
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

  // --- TAB 2: FLASH CARD STATE ---
  const [fcLessonSelect, setFcLessonSelect] = useState<string>('all');
  const [fcCurrentQueue, setFcCurrentQueue] = useState<(VocabularyItem & { lessonId: number; kanjiChar: string })[]>([]);
  const [fcCurrentIndex, setFcCurrentIndex] = useState<number>(0);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);

  // Re-initialize flashcard queue when tab or select option changes
  const initFlashcards = () => {
    let queue: typeof allVocabularies = [];

    if (fcLessonSelect === 'all') {
      // Get all unmastered words
      queue = allVocabularies.filter(v => {
        const stats = userProgress.flashcards[v.word];
        return !stats || !stats.mastered;
      });
      // Shuffle unmastered list
      queue = [...queue].sort(() => 0.5 - Math.random());
    } else {
      // Get all words for the specific lesson
      queue = allVocabularies.filter(v => v.lessonId === Number(fcLessonSelect));
    }

    setFcCurrentQueue(queue);
    setFcCurrentIndex(0);
    setIsCardFlipped(false);
  };

  useEffect(() => {
    if (currentTab === 'flashcard') {
      initFlashcards();
    }
  }, [currentTab, fcLessonSelect]);

  const flipCard = () => {
    playSound.click();
    setIsCardFlipped(prev => !prev);
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

    setFcCurrentIndex(prev => prev + 1);
    setIsCardFlipped(false);
  };

  const resetFlashcards = () => {
    playSound.click();
    const updatedFlashcards = { ...userProgress.flashcards };
    
    if (fcLessonSelect === 'all') {
      // Clear mastery for everything
      allVocabularies.forEach(v => {
        if (updatedFlashcards[v.word]) {
          updatedFlashcards[v.word].mastered = false;
        }
      });
    } else {
      // Clear mastery for current lesson words
      const wordsInLesson = allVocabularies.filter(v => v.lessonId === Number(fcLessonSelect)).map(v => v.word);
      wordsInLesson.forEach(w => {
        if (updatedFlashcards[w]) {
          updatedFlashcards[w].mastered = false;
        }
      });
    }

    saveProgress({
      ...userProgress,
      flashcards: updatedFlashcards
    });
    
    initFlashcards();
  };

  // Current stats in the active flashcard filter pool
  const fcStats = useMemo(() => {
    let pool = fcLessonSelect === 'all' 
      ? allVocabularies 
      : allVocabularies.filter(v => v.lessonId === Number(fcLessonSelect));

    let mastered = 0;
    let unmastered = 0;

    pool.forEach(v => {
      const stats = userProgress.flashcards[v.word];
      if (stats && stats.mastered) {
        mastered++;
      } else {
        unmastered++;
      }
    });

    return {
      mastered,
      unmastered,
      current: Math.min(fcCurrentIndex + 1, fcCurrentQueue.length),
      total: fcCurrentQueue.length
    };
  }, [fcLessonSelect, fcCurrentIndex, fcCurrentQueue, userProgress.flashcards, allVocabularies]);


  // --- TAB 3: BÀI TẬP (QUIZ) STATE ---
  const [quizLessonSelect, setQuizLessonSelect] = useState<string>('all');
  const [quizState, setQuizState] = useState<'setup' | 'active' | 'result'>('setup');
  const [quizQueue, setQuizQueue] = useState<(VocabularyItem & { lessonId: number; kanjiChar: string })[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [currentQuizScore, setCurrentQuizScore] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [currentOptions, setCurrentQuizOptions] = useState<string[]>([]);
  const QUESTIONS_PER_QUIZ = 10;

  const startQuiz = () => {
    playSound.click();
    let pool = quizLessonSelect === 'all' 
      ? [...allVocabularies] 
      : allVocabularies.filter(v => v.lessonId === Number(quizLessonSelect));

    if (pool.length < 4) {
      alert("Không đủ dữ liệu! Cần ít nhất 4 từ vựng để tạo bài tập trắc nghiệm.");
      return;
    }

    // Shuffle pool and slice
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const queue = shuffled.slice(0, Math.min(QUESTIONS_PER_QUIZ, pool.length));

    setQuizQueue(queue);
    setCurrentQuizIndex(0);
    setCurrentQuizScore(0);
    setSelectedOption(null);
    setIsAnswerCorrect(null);
    setQuizState('active');
    loadQuizQuestion(queue, 0);
  };

  const loadQuizQuestion = (queue: typeof quizQueue, index: number) => {
    if (index >= queue.length) {
      finishQuiz(queue);
      return;
    }

    const currentQ = queue[index];
    
    // Generate distractors
    const allReadings = Array.from(new Set(allVocabularies.map(v => v.reading)));
    const distractors = allReadings.filter(r => r !== currentQ.reading)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    // Merge and shuffle options
    const options = [currentQ.reading, ...distractors].sort(() => 0.5 - Math.random());
    
    setCurrentQuizOptions(options);
    setSelectedOption(null);
    setIsAnswerCorrect(null);
  };

  const handleAnswer = (option: string) => {
    if (selectedOption !== null) return; // Prevent double click

    const currentQ = quizQueue[currentQuizIndex];
    const isCorrect = option === currentQ.reading;

    setSelectedOption(option);
    setIsAnswerCorrect(isCorrect);
    
    if (isCorrect) {
      setCurrentQuizScore(prev => prev + 1);
    }

    // Auto-advance after 1 second
    setTimeout(() => {
      const nextIndex = currentQuizIndex + 1;
      setCurrentQuizIndex(nextIndex);
      loadQuizQuestion(quizQueue, nextIndex);
    }, 1000);
  };

  const finishQuiz = (queue: typeof quizQueue) => {
    setQuizState('result');

    const percent = Math.round((currentQuizScore / queue.length) * 100);

    // Save history
    const newHistoryItem = {
      date: new Date().toISOString(),
      lessonId: quizLessonSelect,
      score: currentQuizScore,
      total: queue.length,
      percent: percent
    };

    saveProgress({
      ...userProgress,
      quizHistory: [...userProgress.quizHistory, newHistoryItem]
    });
  };

  const exitQuiz = () => {
    if (window.confirm("Bạn có chắc chắn muốn thoát bài kiểm tra này? Tiến trình chưa hoàn thành sẽ không được lưu.")) {
      playSound.click();
      setQuizState('setup');
    }
  };


  // --- TAB 4: KẾT QUẢ (RESULTS/METRICS) CALCULATIONS ---
  const dashboardStats = useMemo(() => {
    const totalAppKanjis = KANJI_N3_DATA.reduce((acc, lesson) => acc + lesson.kanjis.length, 0);
    const viewedKanjisCount = userProgress.viewedKanjis.length;

    const totalVocab = allVocabularies.length;
    const masteredCount = Object.keys(userProgress.flashcards).filter(key => userProgress.flashcards[key].mastered).length;

    const quizTaken = userProgress.quizHistory.length;
    let avgScore = 0;
    if (quizTaken > 0) {
      const totalPercent = userProgress.quizHistory.reduce((acc, curr) => acc + curr.percent, 0);
      avgScore = Math.round(totalPercent / quizTaken);
    }

    return {
      viewedKanjisCount,
      totalAppKanjis,
      masteredCount,
      totalVocab,
      quizTaken,
      avgScore
    };
  }, [userProgress, allVocabularies]);

  // Tab switcher
  const handleTabChange = (tabId: typeof currentTab) => {
    playSound.click();
    setCurrentTab(tabId);
  };

  return (
    <div className="washi-pattern min-h-screen p-4 sm:p-8 -mx-4 sm:-mx-8 rounded-[40px] border-2 border-[#1A1A1A] text-[#1A1A1A]" style={{ fontFamily: "'Lora', 'Noto Serif JP', serif" }}>
      {/* Navigation sub-bar */}
      <div className="flex justify-between items-center mb-6 border-b-2 border-[#1A1A1A] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 border-2 border-[#1A1A1A] bg-[#1A1A1A] rounded flex items-center justify-center text-white font-black text-lg">
            山
          </div>
          <span className="text-lg font-black tracking-widest text-[#1A1A1A] font-serif">
            HÁN TỰ N3
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

      {/* Main content display */}
      <div className="max-w-4xl mx-auto pb-24">
        
        {/* --- TAB 1: KIẾN THỨC --- */}
        {currentTab === 'kienthuc' && (
          <section className="space-y-6">
            <div className="bg-white p-6 border-4 border-[#1A1A1A] shadow-[5px_5px_0px_#1A1A1A] rounded-2xl mb-8">
              <h2 className="text-2xl font-black mb-2 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-[#8B0000]" />
                Danh Sách Bài Học Hán Tự N3
              </h2>
              <p className="text-sm text-gray-600 italic">
                Chọn bài học để hiển thị chi tiết các Hán tự cốt lõi. Chạm vào mỗi Hán tự để mài giũa thêm cách ghép âm và nghĩa của chúng.
              </p>
            </div>

            <div className="space-y-4">
              {KANJI_N3_DATA.map((lesson, index) => {
                const isExpanded = expandedLessonIndex === index;
                return (
                  <div key={lesson.id} className="bg-white rounded-xl border-2 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A] overflow-hidden">
                    {/* Lesson Header */}
                    <button
                      onClick={() => toggleLesson(index)}
                      className="w-full text-left p-4 bg-[#FDFBF7] flex justify-between items-center hover:bg-amber-50/50 transition-colors"
                    >
                      <div>
                        <span className="font-bold text-lg text-[#8B0000] tracking-wider uppercase">{lesson.title}</span>
                        <span className="ml-3 text-xs bg-[#1A1A1A] text-white font-bold px-2.5 py-0.5 rounded-full">
                          {lesson.kanjis.length} Hán Tự
                        </span>
                      </div>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Lesson Content */}
                    {isExpanded && (
                      <div className="p-4 border-t-2 border-[#1A1A1A] bg-white divide-y-2 divide-dotted divide-gray-200">
                        {lesson.kanjis.map((kanji, kIndex) => {
                          const kanjiKey = `${index}-${kIndex}`;
                          const isKanjiExpanded = !!expandedKanjiKeys[kanjiKey];
                          const hasViewed = userProgress.viewedKanjis.includes(kanji.character);

                          return (
                            <div key={kanji.character} className="py-4 first:pt-0 last:pb-0">
                              <div 
                                onClick={() => toggleKanji(index, kIndex, kanji.character)}
                                className="flex items-center gap-4 cursor-pointer group"
                              >
                                <div className={`w-14 h-14 rounded-xl border-2 border-[#1A1A1A] flex flex-col items-center justify-center font-bold relative transition-colors ${hasViewed ? 'bg-amber-50 text-[#8B0000]' : 'bg-white text-gray-800'}`}>
                                  <span className="text-2xl pt-1 font-serif" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                                    {kanji.character}
                                  </span>
                                  {hasViewed && (
                                    <span className="absolute top-0.5 right-1 text-[8px] font-black text-green-600 uppercase">
                                      Xong
                                    </span>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="font-bold text-lg text-gray-800 tracking-wider flex items-center gap-2">
                                    {kanji.sino_vietnamese}
                                    <span className="text-xs font-normal text-gray-400 font-sans italic">({kanji.meaning})</span>
                                  </div>
                                  <div className="text-xs text-gray-500 mt-0.5 font-sans">
                                    Chạm để học {kanji.vocabularies.length} từ vựng liên quan
                                  </div>
                                </div>
                                <ChevronRight className={`w-4 h-4 text-gray-400 group-hover:text-[#8B0000] transition-transform ${isKanjiExpanded ? 'rotate-90' : ''}`} />
                              </div>

                              {/* Kanji vocabulary entries */}
                              {isKanjiExpanded && (
                                <div className="mt-3 ml-12 pl-4 border-l-2 border-[#8B0000] space-y-2.5 bg-gray-50/50 p-3 rounded-lg">
                                  {kanji.vocabularies.map((vocab, vIdx) => (
                                    <div key={vIdx} className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-gray-200 shadow-sm">
                                      <div>
                                        <div className="font-bold text-base text-[#1A1A1A]" style={{ fontFamily: "'Noto Serif JP', serif" }}>{vocab.word}</div>
                                        <div className="text-xs text-gray-500 mt-0.5 font-sans">{vocab.meaning}</div>
                                      </div>
                                      <div className="bg-[#8B0000]/10 text-[#8B0000] text-xs font-bold px-3 py-1 rounded-full border border-[#8B0000]/20 font-serif">
                                        {vocab.reading}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* --- TAB 2: FLASH CARD --- */}
        {currentTab === 'flashcard' && (
          <section className="max-w-md mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 bg-white p-4 border-2 border-[#1A1A1A] rounded-xl shadow-[3px_3px_0px_#1A1A1A]">
              <span className="font-bold text-gray-700 flex items-center gap-1.5 font-serif text-sm">
                <Layers className="w-4 h-4 text-[#8B0000]" /> Học Theo Bài:
              </span>
              <select
                value={fcLessonSelect}
                onChange={(e) => setFcLessonSelect(e.target.value)}
                className="bg-white border-2 border-[#1A1A1A] text-gray-800 text-sm font-bold rounded-lg p-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none"
              >
                <option value="all">Tất cả bài chưa nhớ ({allVocabularies.length - Object.keys(userProgress.flashcards).filter(key => userProgress.flashcards[key].mastered).length})</option>
                {KANJI_N3_DATA.map(lesson => (
                  <option key={lesson.id} value={lesson.id}>{lesson.title}</option>
                ))}
              </select>
            </div>

            {/* Flashcard Stats Panel */}
            <div className="bg-white p-4 rounded-xl border-2 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A] space-y-2">
              <div className="text-center text-sm font-bold text-gray-600 border-b pb-2">
                Từ thứ <span className="text-[#8B0000] text-lg font-serif">{fcStats.current}</span> / <span className="font-serif text-lg">{fcStats.total}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold font-sans">
                <span className="text-green-600 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Đã thuộc: {fcStats.mastered}
                </span>
                <span className="text-[#8B0000] flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" /> Chưa thuộc: {fcStats.unmastered}
                </span>
              </div>
            </div>

            {/* Empty State */}
            {fcCurrentQueue.length === 0 || fcCurrentIndex >= fcCurrentQueue.length ? (
              <div className="bg-white p-8 border-4 border-[#1A1A1A] shadow-[6px_6px_0px_#1A1A1A] rounded-2xl text-center space-y-4">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl">
                  ✓
                </div>
                <h3 className="text-xl font-bold font-serif text-gray-800">Tuyệt Vời!</h3>
                <p className="text-sm text-gray-500 italic">
                  Bạn đã hoàn thành toàn bộ Flashcard trong học phần này! Bạn có muốn học lại từ đầu để củng cố phản xạ?
                </p>
                <button
                  onClick={resetFlashcards}
                  className="px-6 py-2.5 bg-[#8B0000] text-white border-2 border-[#1A1A1A] hover:bg-red-800 transition-colors font-bold rounded-xl text-sm shadow-[3px_3px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none flex items-center gap-2 mx-auto uppercase"
                >
                  <RotateCcw className="w-4 h-4" /> Học Lại Từ Đầu
                </button>
              </div>
            ) : (
              /* Active Flashcard rendering */
              <div className="space-y-6">
                <div className="relative h-[280px] sm:h-[320px] perspective-1000">
                  <div
                    onClick={flipCard}
                    className={`w-full h-full duration-700 transform-style-3d relative rounded-3xl border-4 border-[#1A1A1A] shadow-[8px_8px_0px_#1A1A1A] cursor-pointer ${isCardFlipped ? 'rotate-y-180' : ''}`}
                  >
                    {/* Front: Word */}
                    <div className="absolute inset-0 bg-white backface-hidden flex flex-col items-center justify-center p-6 rounded-2xl">
                      <div className="text-gray-400 text-xs absolute top-4 right-4 flex items-center gap-1 font-sans">
                        <Pointer className="w-3 h-3" /> Chạm để lật
                      </div>
                      <span className="text-5xl font-black text-gray-800 tracking-wider font-serif" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                        {fcCurrentQueue[fcCurrentIndex].word}
                      </span>
                    </div>

                    {/* Back: Reading & Meaning */}
                    <div className="absolute inset-0 bg-[#FDFBF7] rotate-y-180 backface-hidden flex flex-col items-center justify-center p-6 rounded-2xl text-center">
                      <span className="text-2xl text-[#8B0000] font-bold font-serif mb-3" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                        {fcCurrentQueue[fcCurrentIndex].reading}
                      </span>
                      <div className="w-16 h-0.5 bg-[#8B0000]/30 rounded mb-3"></div>
                      <span className="text-xl font-bold text-gray-800 font-sans leading-snug">
                        {fcCurrentQueue[fcCurrentIndex].meaning}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex gap-4">
                  <button
                    onClick={() => handleFcResult(false)}
                    className="flex-1 bg-white border-2 border-[#1A1A1A] text-[#8B0000] rounded-xl py-3 px-4 font-bold shadow-[3px_3px_0px_#1A1A1A] hover:bg-red-50 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-1.5 text-sm uppercase"
                  >
                    <XCircle className="w-4 h-4" /> Chưa nhớ
                  </button>
                  <button
                    onClick={() => handleFcResult(true)}
                    className="flex-1 bg-[#8B0000] border-2 border-[#1A1A1A] text-white rounded-xl py-3 px-4 font-bold shadow-[3px_3px_0px_#1A1A1A] hover:bg-red-800 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-1.5 text-sm uppercase"
                  >
                    <CheckCircle className="w-4 h-4" /> Đã nhớ
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {/* --- TAB 3: BÀI TẬP (QUIZ) --- */}
        {currentTab === 'baitap' && (
          <section className="max-w-md mx-auto space-y-6">
            
            {/* Setup view */}
            {quizState === 'setup' && (
              <div className="bg-white p-8 border-4 border-[#1A1A1A] shadow-[6px_6px_0px_#1A1A1A] rounded-2xl text-center space-y-6 flex flex-col items-center">
                <div className="w-16 h-16 bg-[#8B0000]/10 border-2 border-[#8B0000] text-[#8B0000] rounded-full flex items-center justify-center text-3xl">
                  <Pencil className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-black font-serif text-gray-800">Luyện Tập Trắc Nghiệm</h2>
                  <p className="text-xs text-gray-500 italic">
                    Học liệu trắc nghiệm tự động kiểm tra khả năng nhận diện Hiragana của các từ vựng chứa Hán tự N3.
                  </p>
                </div>

                <div className="w-full space-y-1.5 text-left">
                  <label className="text-xs font-bold text-gray-600 block">Chọn Cấp Độ/Bài Học:</label>
                  <select
                    value={quizLessonSelect}
                    onChange={(e) => setQuizLessonSelect(e.target.value)}
                    className="w-full bg-white border-2 border-[#1A1A1A] text-gray-800 text-sm font-bold rounded-lg p-3 outline-none"
                  >
                    <option value="all">Kiểm tra ngẫu nhiên (Tất cả)</option>
                    {KANJI_N3_DATA.map(lesson => (
                      <option key={lesson.id} value={lesson.id}>{lesson.title}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={startQuiz}
                  className="w-full bg-[#8B0000] text-white border-2 border-[#1A1A1A] hover:bg-red-800 transition-colors py-3.5 font-bold rounded-xl text-md shadow-[4px_4px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none uppercase tracking-wider"
                >
                  Bắt Đầu Làm Bài
                </button>
              </div>
            )}

            {/* Active quiz playing */}
            {quizState === 'active' && quizQueue.length > 0 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center font-bold font-serif">
                  <span className="text-gray-500">Câu {currentQuizIndex + 1}/{quizQueue.length}</span>
                  <button
                    onClick={exitQuiz}
                    className="text-[#8B0000] text-sm hover:underline"
                  >
                    Thoát
                  </button>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 border-2 border-[#1A1A1A] h-4 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#8B0000] h-full transition-all duration-300"
                    style={{ width: `${((currentQuizIndex) / quizQueue.length) * 100}%` }}
                  ></div>
                </div>

                {/* Question panel */}
                <div className="bg-white rounded-2xl border-4 border-[#1A1A1A] shadow-[6px_6px_0px_#1A1A1A] p-8 text-center space-y-4">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block font-sans">
                    Cách đọc của từ này là gì?
                  </span>
                  <h3 className="text-5xl font-black text-gray-800 font-serif" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                    {quizQueue[currentQuizIndex].word}
                  </h3>
                  <div className="text-xs text-gray-400 font-sans italic">
                    (Nghĩa: {quizQueue[currentQuizIndex].meaning})
                  </div>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 gap-3 font-sans">
                  {currentOptions.map((opt, idx) => {
                    const isSelected = selectedOption === opt;
                    const isCorrect = opt === quizQueue[currentQuizIndex].reading;
                    
                    let buttonClass = "bg-white hover:bg-amber-50/30 border-2 border-[#1A1A1A] text-gray-800";
                    if (selectedOption !== null) {
                      if (isCorrect) {
                        buttonClass = "bg-green-100 border-2 border-green-600 text-green-800 font-bold";
                      } else if (isSelected) {
                        buttonClass = "bg-red-100 border-2 border-red-600 text-red-800 font-bold";
                      } else {
                        buttonClass = "bg-white opacity-40 border-2 border-[#1A1A1A] text-gray-400";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={selectedOption !== null}
                        onClick={() => handleAnswer(opt)}
                        className={`w-full text-left rounded-xl p-4 text-base font-bold transition-all shadow-[2px_2px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${buttonClass}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Results screen */}
            {quizState === 'result' && (
              <div className="bg-white p-8 border-4 border-[#1A1A1A] shadow-[6px_6px_0px_#1A1A1A] rounded-2xl text-center space-y-6 flex flex-col items-center">
                {/* Circular Percentage visual */}
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle 
                      cx="72" cy="72" r="62" 
                      className="stroke-gray-100 fill-none" 
                      strokeWidth="10" 
                    />
                    <circle 
                      cx="72" cy="72" r="62" 
                      className="stroke-[#8B0000] fill-none transition-all duration-1000" 
                      strokeWidth="10"
                      strokeDasharray={2 * Math.PI * 62}
                      strokeDashoffset={2 * Math.PI * 62 * (1 - (currentQuizScore / quizQueue.length))}
                    />
                  </svg>
                  <span className="absolute text-3xl font-black font-serif text-[#8B0000]">
                    {Math.round((currentQuizScore / quizQueue.length) * 100)}%
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black font-serif text-gray-800">
                    {currentQuizScore / quizQueue.length >= 0.8 ? "Xuất Sắc!" : currentQuizScore / quizQueue.length >= 0.5 ? "Khá Tốt!" : "Cần Cố Gắng!"}
                  </h3>
                  <p className="text-sm text-gray-600 font-sans leading-relaxed">
                    Bạn đã trả lời chính xác <span className="font-bold text-[#8B0000] text-base">{currentQuizScore}</span> trên tổng số <span className="font-bold text-gray-800 text-base">{quizQueue.length}</span> câu hỏi.
                  </p>
                </div>

                <button
                  onClick={() => setQuizState('setup')}
                  className="w-full bg-[#8B0000] text-white border-2 border-[#1A1A1A] hover:bg-red-800 transition-colors py-3.5 font-bold rounded-xl text-md shadow-[4px_4px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none uppercase"
                >
                  Làm Bài Khác
                </button>
              </div>
            )}
          </section>
        )}

        {/* --- TAB 4: KẾT QUẢ / THỐNG KÊ --- */}
        {currentTab === 'dulieu' && (
          <section className="space-y-8">
            <div className="bg-white p-6 border-4 border-[#1A1A1A] shadow-[5px_5px_0px_#1A1A1A] rounded-2xl mb-4">
              <h2 className="text-2xl font-black font-serif flex items-center gap-2">
                <ChartPie className="w-6 h-6 text-[#8B0000]" />
                Tổng Quan Tiến Độ Học Tập
              </h2>
              <p className="text-xs text-gray-500 italic">
                Dữ liệu học tập được lưu trữ trực tiếp và tức thời trên trình duyệt của bạn.
              </p>
            </div>

            {/* Metrics cards grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-2xl border-2 border-[#1A1A1A] shadow-[3px_3px_0px_#1A1A1A] flex flex-col items-center justify-center text-center space-y-1">
                <BookOpen className="w-6 h-6 text-blue-500" />
                <span className="text-2xl font-black font-serif text-gray-800">
                  {dashboardStats.viewedKanjisCount}/{dashboardStats.totalAppKanjis}
                </span>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Hán Tự Đã Xem</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border-2 border-[#1A1A1A] shadow-[3px_3px_0px_#1A1A1A] flex flex-col items-center justify-center text-center space-y-1">
                <Brain className="w-6 h-6 text-[#8B0000]" />
                <span className="text-2xl font-black font-serif text-gray-800">
                  {dashboardStats.masteredCount}/{dashboardStats.totalVocab}
                </span>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Từ Đã Nhớ (FC)</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border-2 border-[#1A1A1A] shadow-[3px_3px_0px_#1A1A1A] flex flex-col items-center justify-center text-center space-y-1">
                <FileText className="w-6 h-6 text-green-500" />
                <span className="text-2xl font-black font-serif text-gray-800">
                  {dashboardStats.quizTaken}
                </span>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Bài Test Đã Làm</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border-2 border-[#1A1A1A] shadow-[3px_3px_0px_#1A1A1A] flex flex-col items-center justify-center text-center space-y-1">
                <Star className="w-6 h-6 text-yellow-500" />
                <span className="text-2xl font-black font-serif text-gray-800">
                  {dashboardStats.avgScore}%
                </span>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Điểm TB Quiz</span>
              </div>
            </div>

            {/* Custom SVG Charts panel */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Flashcard Mastery Chart */}
              <div className="bg-white p-6 border-2 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A] rounded-2xl space-y-4">
                <h3 className="font-bold text-gray-700 text-sm tracking-wider uppercase flex items-center gap-1.5 font-serif border-b pb-2">
                  <Brain className="w-4 h-4 text-[#8B0000]" /> Tỷ lệ ghi nhớ Flashcard
                </h3>
                <div className="flex flex-col items-center">
                  <div className="relative w-36 h-36">
                    {/* Native React SVG Pie chart */}
                    <svg className="w-full h-full transform -rotate-90">
                      <circle 
                        cx="72" cy="72" r="50" 
                        className="stroke-gray-100 fill-none" 
                        strokeWidth="20" 
                      />
                      <circle 
                        cx="72" cy="72" r="50" 
                        className="stroke-[#8B0000] fill-none" 
                        strokeWidth="20"
                        strokeDasharray={2 * Math.PI * 50}
                        strokeDashoffset={2 * Math.PI * 50 * (1 - (dashboardStats.masteredCount / Math.max(dashboardStats.totalVocab, 1)))}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl font-black text-gray-800">
                        {Math.round((dashboardStats.masteredCount / Math.max(dashboardStats.totalVocab, 1)) * 100)}%
                      </span>
                      <span className="text-[9px] text-gray-400 font-bold">THUỘC</span>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-6 text-xs font-bold text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 bg-[#8B0000] rounded-sm"></div>
                      <span>Đã Nhớ ({dashboardStats.masteredCount})</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 bg-gray-100 border border-gray-300 rounded-sm"></div>
                      <span>Chưa Học ({dashboardStats.totalVocab - dashboardStats.masteredCount})</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Quiz Scores Chart */}
              <div className="bg-white p-6 border-2 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A] rounded-2xl space-y-4">
                <h3 className="font-bold text-gray-700 text-sm tracking-wider uppercase flex items-center gap-1.5 font-serif border-b pb-2">
                  <FileText className="w-4 h-4 text-green-600" /> Điểm Bài Tập Gần Đây (Tối Đa 5 Bài)
                </h3>
                
                {userProgress.quizHistory.length === 0 ? (
                  <div className="h-36 flex flex-col items-center justify-center text-center text-gray-400 text-sm italic">
                    <HelpCircle className="w-8 h-8 text-gray-300 mb-2" />
                    Chưa có lịch sử làm bài. Hãy thử sức ngay ở tab Bài Tập!
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Inline custom bar list */}
                    <div className="space-y-3 font-sans">
                      {userProgress.quizHistory.slice(-5).map((history, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between text-xs font-bold text-gray-600">
                            <span>Lần {idx + 1} ({history.lessonId === 'all' ? 'Tất cả' : `Bài ${history.lessonId}`})</span>
                            <span className="text-[#8B0000]">{history.percent}%</span>
                          </div>
                          <div className="w-full bg-gray-100 border border-gray-200 h-2.5 rounded-full overflow-hidden">
                            <div 
                              className="bg-[#8B0000] h-full rounded-full"
                              style={{ width: `${history.percent}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>
          </section>
        )}

      </div>

      {/* Persistent sticky Bottom Navigation bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#1A1A1A] z-40 pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
        <ul className="flex justify-around items-center h-16 max-w-lg mx-auto">
          <li className="flex-1">
            <button 
              onClick={() => handleTabChange('kienthuc')}
              className={`w-full h-full flex flex-col items-center justify-center gap-1 transition-all ${currentTab === 'kienthuc' ? 'text-[#8B0000] scale-105' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Book className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-wider font-sans">Kiến Thức</span>
            </button>
          </li>
          <li className="flex-1">
            <button 
              onClick={() => handleTabChange('flashcard')}
              className={`w-full h-full flex flex-col items-center justify-center gap-1 transition-all ${currentTab === 'flashcard' ? 'text-[#8B0000] scale-105' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Layers className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-wider font-sans">Flashcard</span>
            </button>
          </li>
          <li className="flex-1">
            <button 
              onClick={() => handleTabChange('baitap')}
              className={`w-full h-full flex flex-col items-center justify-center gap-1 transition-all ${currentTab === 'baitap' ? 'text-[#8B0000] scale-105' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Pencil className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-wider font-sans">Bài Tập</span>
            </button>
          </li>
          <li className="flex-1">
            <button 
              onClick={() => handleTabChange('dulieu')}
              className={`w-full h-full flex flex-col items-center justify-center gap-1 transition-all ${currentTab === 'dulieu' ? 'text-[#8B0000] scale-105' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <ChartPie className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-wider font-sans">Kết Quả</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
