import React, { useState, useEffect, useMemo } from "react";
import { playSound } from "../utils/audio";
import { RAW_N2_VOCAB, VocabN2Item } from "../data/vocabN2";
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
  GraduationCap,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Tag,
  Compass,
  Zap,
  Flame,
  Lightbulb,
  ArrowRight,
  ChevronRight,
  Eye,
  CheckCheck,
  ArrowLeftRight,
  Shuffle
} from "lucide-react";

interface VocabN2LessonsProps {
  onGoBack: () => void;
}

export default function VocabN2Lessons({ onGoBack }: VocabN2LessonsProps) {
  // Navigation & Study mode states: dashboard | flashcard | library | study | mondai5
  const [activeTab, setActiveTab] = useState<"dashboard" | "flashcard" | "library" | "study" | "mondai5">("dashboard");
  const [selectedLesson, setSelectedLesson] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  
  // Progress states mapped by word ID
  const [wordStates, setWordStates] = useState<Record<number, "new" | "learning" | "mastered">>({});

  // Status Detail Modal: "mastered" | "learning" | "new" | null
  const [statusDetailModal, setStatusDetailModal] = useState<"new" | "learning" | "mastered" | null>(null);

  // Library filters
  const [libLesson, setLibLesson] = useState<string>("all");
  const [libCategory, setLibCategory] = useState<string>("all");
  const [libTab, setLibTab] = useState<"all" | "new" | "learning" | "mastered">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Simple Flashcard Mode States
  const [flashcardQueue, setFlashcardQueue] = useState<VocabN2Item[]>([]);
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isSwapped, setIsSwapped] = useState<boolean>(false); // false: Front=Kanji, Back=Kana+Meaning | true: Front=Meaning, Back=Kanji+Kana
  const [flashcardFinished, setFlashcardFinished] = useState<boolean>(false);

  // Study Queue states (4-Dimensional deep dive)
  const [studyQueue, setStudyQueue] = useState<VocabN2Item[]>([]);
  const [studyIndex, setStudyIndex] = useState<number>(0);
  const [studyFinished, setStudyFinished] = useState<boolean>(false);

  // Deep Dive Card Tab: "meaning" | "collocation" | "synonyms" | "ai-coach"
  const [cardTab, setCardTab] = useState<"meaning" | "collocation" | "synonyms" | "ai-coach">("meaning");

  // AI Sentence Evaluator States
  const [userSentence, setUserSentence] = useState<string>("");
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<{
    isCorrect: boolean;
    feedback: string;
    correctedSentence: string;
    scoreExplanation?: string;
  } | null>(null);

  // Mondai 5 (Usage Drill) states
  const [mondaiList, setMondaiList] = useState<VocabN2Item[]>([]);
  const [mondaiIndex, setMondaiIndex] = useState<number>(0);
  const [mondaiScore, setMondaiScore] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [mondaiFinished, setMondaiFinished] = useState<boolean>(false);

  // Load progress from localStorage on mount and reactive updates
  useEffect(() => {
    const loadFromStorage = () => {
      const saved = localStorage.getItem("sk_vocab_n2_progress");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const stateMap: Record<number, "new" | "learning" | "mastered"> = {};
          RAW_N2_VOCAB.forEach((w) => {
            stateMap[w.id] = parsed[w.id] || "new";
          });
          setWordStates(stateMap);
        } catch (e) {
          console.error("Failed to load N2 Vocab progress:", e);
        }
      } else {
        const defaultState: Record<number, "new" | "learning" | "mastered"> = {};
        RAW_N2_VOCAB.forEach((w) => {
          defaultState[w.id] = "new";
        });
        setWordStates(defaultState);
      }
    };

    loadFromStorage();

    const handleStorageChange = (e: any) => {
      const key = e.detail?.key || e.key;
      if (!key || key === "sk_vocab_n2_progress") {
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

  // Save progress helper
  const updateWordStatus = (wordId: number, newStatus: "new" | "learning" | "mastered") => {
    const saved = localStorage.getItem("sk_vocab_n2_progress");
    let currentMap: Record<number, "new" | "learning" | "mastered"> = { ...wordStates };
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        Object.keys(parsed).forEach((k) => {
          const id = Number(k);
          if (parsed[id]) currentMap[id] = parsed[id];
        });
      } catch (e) {
        console.error("Failed to parse existing N2 storage:", e);
      }
    }

    currentMap[wordId] = newStatus;
    setWordStates(currentMap);
    localStorage.setItem("sk_vocab_n2_progress", JSON.stringify(currentMap));
  };

  // Distinct lessons from RAW_N2_VOCAB
  const lessons = useMemo(() => {
    const map = new Map<number, string>();
    RAW_N2_VOCAB.forEach((w) => {
      if (!map.has(w.lesson)) {
        map.set(w.lesson, w.lessonTitle);
      }
    });
    return Array.from(map.entries()).map(([id, title]) => ({ id, title }));
  }, []);

  // Distinct categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    RAW_N2_VOCAB.forEach((w) => set.add(w.category));
    return Array.from(set);
  }, []);

  // Filter for dashboard
  const currentFilteredVocab = useMemo(() => {
    return RAW_N2_VOCAB.filter((w) => {
      const matchLesson = selectedLesson === "all" || w.lesson === Number(selectedLesson);
      const matchCat = categoryFilter === "all" || w.category === categoryFilter;
      return matchLesson && matchCat;
    });
  }, [selectedLesson, categoryFilter]);

  // Counts
  const counts = useMemo(() => {
    let mastered = 0;
    let learning = 0;
    let unlearned = 0;

    currentFilteredVocab.forEach((w) => {
      const st = wordStates[w.id] || "new";
      if (st === "mastered") mastered++;
      else if (st === "learning") learning++;
      else unlearned++;
    });

    return { mastered, learning, unlearned, total: currentFilteredVocab.length };
  }, [currentFilteredVocab, wordStates]);

  const completionRate = counts.total > 0 ? Math.round((counts.mastered / counts.total) * 100) : 0;

  // Words corresponding to the clicked status modal
  const modalStatusWords = useMemo(() => {
    if (!statusDetailModal) return [];
    return currentFilteredVocab.filter((w) => {
      const raw = wordStates[w.id];
      const st = (raw === "mastered" || raw === "learning") ? raw : "new";
      return st === statusDetailModal;
    });
  }, [statusDetailModal, currentFilteredVocab, wordStates]);

  // Audio speech synthesis helper
  const speak = (text: string) => {
    playSound.click();
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "ja-JP";
      u.rate = 0.85;
      window.speechSynthesis.speak(u);
    }
  };

  // Start Simple Flashcard Mode
  const startFlashcardMode = (customList?: VocabN2Item[]) => {
    playSound.click();
    const queue = customList && customList.length > 0 
      ? customList 
      : (currentFilteredVocab.length > 0 ? currentFilteredVocab : RAW_N2_VOCAB);
    
    setFlashcardQueue([...queue]);
    setFlashcardIndex(0);
    setIsFlipped(false);
    setFlashcardFinished(false);
    setActiveTab("flashcard");
  };

  const handleFlashcardNext = () => {
    playSound.click();
    if (flashcardIndex < flashcardQueue.length - 1) {
      setFlashcardIndex(flashcardIndex + 1);
      setIsFlipped(false);
    } else {
      setFlashcardFinished(true);
    }
  };

  const handleFlashcardPrev = () => {
    playSound.click();
    if (flashcardIndex > 0) {
      setFlashcardIndex(flashcardIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleShuffleFlashcards = () => {
    playSound.click();
    const shuffled = [...flashcardQueue].sort(() => Math.random() - 0.5);
    setFlashcardQueue(shuffled);
    setFlashcardIndex(0);
    setIsFlipped(false);
  };

  const handleToggleSwap = () => {
    playSound.click();
    setIsSwapped(prev => !prev);
  };

  // Start 4-Dimensional Study Session
  const startStudy = (mode: "all" | "learning" | "unlearned" | "category" | "custom", customList?: VocabN2Item[]) => {
    playSound.click();
    let queue: VocabN2Item[] = [];

    if (mode === "custom" && customList) {
      queue = customList;
    } else if (mode === "category" && customList) {
      queue = customList;
    } else if (mode === "learning") {
      queue = currentFilteredVocab.filter((w) => wordStates[w.id] === "learning");
    } else if (mode === "unlearned") {
      queue = currentFilteredVocab.filter((w) => !wordStates[w.id] || wordStates[w.id] === "new");
    } else {
      queue = [...currentFilteredVocab];
    }

    if (queue.length === 0) {
      queue = [...currentFilteredVocab];
    }

    setStatusDetailModal(null);
    setStudyQueue(queue);
    setStudyIndex(0);
    setCardTab("meaning");
    setStudyFinished(false);
    setUserSentence("");
    setEvaluationResult(null);
    setActiveTab("study");
  };

  // Mark word and move forward in study queue
  const handleMarkAndNext = (status: "learning" | "mastered") => {
    if (studyQueue.length === 0) return;
    const currentWord = studyQueue[studyIndex];
    updateWordStatus(currentWord.id, status);

    if (status === "mastered") {
      playSound.correct();
    } else {
      playSound.click();
    }

    if (studyIndex < studyQueue.length - 1) {
      setStudyIndex(studyIndex + 1);
      setCardTab("meaning");
      setUserSentence("");
      setEvaluationResult(null);
    } else {
      setStudyFinished(true);
    }
  };

  // AI Sentence Evaluator Call
  const evaluateUserSentence = async () => {
    if (!userSentence.trim()) return;
    playSound.click();
    setIsEvaluating(true);
    setEvaluationResult(null);

    const currentWord = studyQueue[studyIndex];

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          ...getGeminiHeaders()
        },
        body: JSON.stringify({
          prompt: `Bạn là Thầy Sơn - chuyên gia luyện thi JLPT N2. Hãy nhận xét và chấm điểm câu tiếng Nhật học sinh vừa tự đặt:
Từ vựng N2 yêu cầu: ${currentWord.kanji} (${currentWord.kana}) - Nghĩa: ${currentWord.meaning} - Collocation: ${currentWord.collocations.join(", ")}
Câu học sinh đặt: "${userSentence}"

Tiêu chí đánh giá:
1. Có đúng ngữ pháp và cấu trúc câu tự nhiên N2 không?
2. Có dùng đúng ngữ cảnh, sắc thái của từ ${currentWord.kanji} không (đặc biệt tránh các lỗi bẫy Mondai 5)?
3. Phân tích chi tiết bằng giọng điệu người thầy tâm huyết, dễ hiểu.

Trả về duy nhất định dạng JSON thuần túy (không dùng markdown code blocks):
{
  "isCorrect": true/false,
  "feedback": "Nhận xét chi tiết bằng tiếng Việt...",
  "correctedSentence": "Câu mẫu chuẩn và tự nhiên hơn (nếu có lỗi)",
  "scoreExplanation": "Giải thích thêm về sắc thái N2"
}`
        })
      });

      const data = await response.json();
      let text = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
      text = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(text);

      setEvaluationResult({
        isCorrect: Boolean(parsed.isCorrect),
        feedback: parsed.feedback || "Đã kiểm tra xong câu của bạn.",
        correctedSentence: parsed.correctedSentence || userSentence,
        scoreExplanation: parsed.scoreExplanation
      });

      if (parsed.isCorrect) {
        playSound.correct();
      } else {
        playSound.click();
      }
    } catch (e) {
      console.error("AI Evaluation failed:", e);
      setEvaluationResult({
        isCorrect: false,
        feedback: "Không thể kết nối với Thầy AI để chấm câu lúc này. Bạn hãy kiểm tra lại kết nối nhé!",
        correctedSentence: userSentence
      });
    } finally {
      setIsEvaluating(false);
    }
  };

  // Start Mondai 5 (Usage test)
  const startMondai5 = () => {
    playSound.click();
    const sourceWithQuestions = (selectedLesson === "all" ? RAW_N2_VOCAB : currentFilteredVocab)
      .filter((w) => w.usageQuestion);

    const shuffled = [...sourceWithQuestions].sort(() => 0.5 - Math.random());
    setMondaiList(shuffled);
    setMondaiIndex(0);
    setMondaiScore(0);
    setSelectedOption(null);
    setMondaiFinished(false);
    setActiveTab("mondai5");
  };

  const handleAnswerMondai = (optionIdx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionIdx);

    const currentQ = mondaiList[mondaiIndex];
    if (currentQ.usageQuestion && optionIdx === currentQ.usageQuestion.correctIndex) {
      playSound.correct();
      setMondaiScore(mondaiScore + 1);
      updateWordStatus(currentQ.id, "mastered");
    } else {
      playSound.wrong();
      updateWordStatus(currentQ.id, "learning");
    }
  };

  const handleNextMondai = () => {
    playSound.click();
    if (mondaiIndex < mondaiList.length - 1) {
      setMondaiIndex(mondaiIndex + 1);
      setSelectedOption(null);
    } else {
      setMondaiFinished(true);
    }
  };

  // Library filtered items
  const libraryItems = useMemo(() => {
    return RAW_N2_VOCAB.filter((w) => {
      const matchLesson = libLesson === "all" || w.lesson === Number(libLesson);
      const matchCat = libCategory === "all" || w.category === libCategory;
      const rawSt = wordStates[w.id];
      const st = (rawSt === "mastered" || rawSt === "learning") ? rawSt : "new";
      const matchTab = libTab === "all" || st === libTab;
      const matchSearch =
        searchQuery.trim() === "" ||
        w.kanji.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.kana.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.hanViet.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.meaning.toLowerCase().includes(searchQuery.toLowerCase());

      return matchLesson && matchCat && matchTab && matchSearch;
    });
  }, [libLesson, libCategory, libTab, searchQuery, wordStates]);

  const currentStudyWord = studyQueue[studyIndex];

  return (
    <div id="vocab-n2-container" className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-2xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white shadow-md">
            語
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-wide">
                TỪ VỰNG N2 CAO CẤP (FORM THỰC CHIẾN)
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-100 text-purple-700 border border-purple-300">
                JLPT N2 PRO
              </span>
            </div>
            <p className="text-xs text-natural-muted">
              Đột phá N2 với Cụm Collocations, Phân biệt Từ Đồng Nghĩa, Sắc thái ngữ cảnh & Đặt câu AI
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            playSound.click();
            onGoBack();
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer shadow-sm hover:bg-natural-soft"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Trở về Khóa N2</span>
        </button>
      </div>

      {/* Mode Sub-navigation: TỔNG QUAN | FLASHCARD | KHO TỪ VỰNG | HỌC THẺ 4 CHIỀU | LUYỆN MONDAI 5 */}
      <div className="flex items-center gap-2 border-b pb-2 overflow-x-auto">
        <button
          onClick={() => {
            playSound.click();
            setActiveTab("dashboard");
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-xs transition-all cursor-pointer ${
            activeTab === "dashboard"
              ? "bg-[#1A1A1A] text-white shadow-md"
              : "hover:bg-natural-soft text-natural-muted"
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Tổng Quan N2</span>
        </button>

        {/* Nút Flashcard */}
        <button
          onClick={() => {
            startFlashcardMode();
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-xs transition-all cursor-pointer ${
            activeTab === "flashcard"
              ? "bg-[#1A1A1A] text-white shadow-md"
              : "hover:bg-natural-soft text-natural-muted"
          }`}
        >
          <Layers className="w-4 h-4 text-purple-400" />
          <span>Flashcard</span>
        </button>

        <button
          onClick={() => {
            playSound.click();
            setActiveTab("library");
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-xs transition-all cursor-pointer ${
            activeTab === "library"
              ? "bg-[#1A1A1A] text-white shadow-md"
              : "hover:bg-natural-soft text-natural-muted"
          }`}
        >
          <List className="w-4 h-4" />
          <span>Kho Từ Vựng ({RAW_N2_VOCAB.length})</span>
        </button>

        <button
          onClick={() => {
            playSound.click();
            startStudy("all");
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-xs transition-all cursor-pointer ${
            activeTab === "study"
              ? "bg-purple-600 text-white shadow-md"
              : "hover:bg-natural-soft text-natural-muted"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Học Thẻ 4 Chiều N2</span>
        </button>

        <button
          onClick={() => {
            startMondai5();
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-xs transition-all cursor-pointer ${
            activeTab === "mondai5"
              ? "bg-indigo-600 text-white shadow-md"
              : "hover:bg-natural-soft text-natural-muted"
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Luyện Mondai 5 (Cách Dùng)</span>
        </button>
      </div>

      {/* TAB 1: DASHBOARD N2 */}
      {activeTab === "dashboard" && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Top Strategic Overview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Progress Card with Interactive Status Click */}
            <div className="md:col-span-5 bg-white p-6 rounded-3xl border shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-black text-sm text-purple-700">
                  <Flame className="w-4 h-4 text-purple-600" />
                  <span>Tiến Độ Chinh Phục N2</span>
                </div>
                <span className="text-xs font-mono font-bold text-natural-muted">
                  {counts.mastered}/{counts.total} từ
                </span>
              </div>

              {/* 3 Interactive Buttons: ĐÃ THUỘC / CẦN ÔN / CHƯA HỌC */}
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-3 text-center">
                  
                  {/* Button 1: ĐÃ THUỘC */}
                  <button
                    onClick={() => {
                      playSound.click();
                      setStatusDetailModal("mastered");
                    }}
                    className="p-3.5 rounded-2xl bg-emerald-50/90 hover:bg-emerald-100 border-2 border-emerald-300 hover:border-emerald-500 transition-all cursor-pointer shadow-sm hover:shadow-md hover:scale-105 active:scale-95 group text-center"
                    title="Bấm để xem danh sách từ ĐÃ THUỘC"
                  >
                    <div className="text-2xl font-black text-emerald-600 font-mono group-hover:scale-110 transition-transform">
                      {counts.mastered}
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 mt-1">
                      ĐÃ THUỘC
                    </div>
                    <div className="text-[9px] text-emerald-600 font-bold opacity-90 mt-1 flex items-center justify-center gap-0.5">
                      <span>Xem từ</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </button>

                  {/* Button 2: CẦN ÔN */}
                  <button
                    onClick={() => {
                      playSound.click();
                      setStatusDetailModal("learning");
                    }}
                    className="p-3.5 rounded-2xl bg-amber-50/90 hover:bg-amber-100 border-2 border-amber-300 hover:border-amber-500 transition-all cursor-pointer shadow-sm hover:shadow-md hover:scale-105 active:scale-95 group text-center"
                    title="Bấm để xem danh sách từ CẦN ÔN"
                  >
                    <div className="text-2xl font-black text-amber-600 font-mono group-hover:scale-110 transition-transform">
                      {counts.learning}
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800 mt-1">
                      CẦN ÔN
                    </div>
                    <div className="text-[9px] text-amber-600 font-bold opacity-90 mt-1 flex items-center justify-center gap-0.5">
                      <span>Xem từ</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </button>

                  {/* Button 3: CHƯA HỌC */}
                  <button
                    onClick={() => {
                      playSound.click();
                      setStatusDetailModal("new");
                    }}
                    className="p-3.5 rounded-2xl bg-slate-50/90 hover:bg-slate-100 border-2 border-slate-300 hover:border-slate-500 transition-all cursor-pointer shadow-sm hover:shadow-md hover:scale-105 active:scale-95 group text-center"
                    title="Bấm để xem danh sách từ CHƯA HỌC"
                  >
                    <div className="text-2xl font-black text-slate-600 font-mono group-hover:scale-110 transition-transform">
                      {counts.unlearned}
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-800 mt-1">
                      CHƯA HỌC
                    </div>
                    <div className="text-[9px] text-slate-600 font-bold opacity-90 mt-1 flex items-center justify-center gap-0.5">
                      <span>Xem từ</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </button>

                </div>
                <div className="text-center text-[10px] text-natural-muted italic">
                  💡 Bấm vào từng ô trên để xem danh sách & học riêng nhóm từ đó
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-black">
                  <span>Mức độ thành thạo:</span>
                  <span className="text-purple-600 font-mono">{completionRate}%</span>
                </div>
                <div className="w-full bg-natural-soft h-3 rounded-full overflow-hidden border">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-indigo-600 h-full transition-all duration-500 rounded-full"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
              </div>

              {/* N2 Pillars Badge */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 text-purple-950 text-xs space-y-2">
                <div className="font-black flex items-center gap-1.5 text-purple-700">
                  <Lightbulb className="w-4 h-4" />
                  <span>4 Trọng Tâm Từ Vựng N2 Cần Làm Chủ:</span>
                </div>
                <ul className="list-disc pl-4 space-y-1 text-[11px] leading-relaxed">
                  <li><strong>Collocations:</strong> Học từ vựng đi liền với trợ từ và động từ đi kèm.</li>
                  <li><strong>Từ gần nghĩa:</strong> Phân biệt tinh tế giữa 把握 / 理解 / 認識.</li>
                  <li><strong>Phó từ & Từ tượng hình:</strong> Nắm chắc ずらりと, あらかじめ.</li>
                  <li><strong>Quán dụng ngữ:</strong> Luyện thuần thục 手を打つ, 拍車をかける.</li>
                </ul>
              </div>
            </div>

            {/* Selection & Quick Start */}
            <div className="md:col-span-7 bg-white p-6 rounded-3xl border shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-black text-sm text-natural-deep">
                  <Layers className="w-4 h-4 text-purple-600" />
                  <span>Chọn Chuyên Đề & Nhóm Từ Vựng N2</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-natural-muted">Theo Chuyên Đề:</label>
                    <select
                      value={selectedLesson}
                      onChange={(e) => setSelectedLesson(e.target.value)}
                      className="w-full p-3 rounded-2xl border font-bold text-xs outline-none focus:border-purple-500 cursor-pointer"
                    >
                      <option value="all">Tất cả chuyên đề N2</option>
                      {lessons.map((les) => (
                        <option key={les.id} value={les.id.toString()}>
                          {les.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-natural-muted">Theo Loại Từ N2:</label>
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="w-full p-3 rounded-2xl border font-bold text-xs outline-none focus:border-purple-500 cursor-pointer"
                    >
                      <option value="all">Tất cả loại từ</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Stat banner */}
                <div className="p-4 rounded-2xl bg-natural-soft border flex items-center justify-between">
                  <div>
                    <span className="text-xs text-natural-muted">Số từ trong bộ lọc:</span>
                    <div className="text-xl font-black font-mono text-purple-700">{counts.total} từ vựng N2</div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-natural-muted">Đã thuộc:</span>
                    <div className="text-xl font-black font-mono text-emerald-600">
                      {counts.mastered} / {counts.total}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons: FLASHCARD | HỌC THẺ 4 CHIỀU | MONDAI 5 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                <button
                  onClick={() => startFlashcardMode()}
                  className="py-3.5 px-3 bg-[#1A1A1A] hover:bg-black text-white rounded-2xl font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Layers className="w-4 h-4 text-purple-400" />
                  <span>FLASHCARD N2</span>
                </button>

                <button
                  onClick={() => startStudy("all")}
                  className="py-3.5 px-3 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>THẺ 4 CHIỀU</span>
                </button>

                <button
                  onClick={() => startMondai5()}
                  className="py-3.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>MONDAI 5</span>
                </button>
              </div>
            </div>

          </div>

          {/* Quick Specialty Categories Strip */}
          <div className="space-y-3">
            <h3 className="text-sm font-black text-natural-deep flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Chuyên Mục Luyện Nhanh Trọng Điểm N2:</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div 
                onClick={() => {
                  const words = RAW_N2_VOCAB.filter((w) => w.category === "Phó từ");
                  startFlashcardMode(words);
                }}
                className="p-4 rounded-2xl border bg-white hover:border-purple-400 cursor-pointer shadow-sm hover:shadow-md transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-800">
                    Trọng điểm Mondai 4 & 5
                  </span>
                  <ArrowRight className="w-4 h-4 text-natural-muted group-hover:text-purple-600 transition-transform group-hover:translate-x-1" />
                </div>
                <div className="font-black text-sm text-natural-deep group-hover:text-purple-600">
                  Phó Từ N2 (副詞)
                </div>
                <p className="text-xs text-natural-muted">
                  Bao gồm các từ bẫy hay gặp: あらかじめ, ろくに, まさに, 一概に...
                </p>
              </div>

              <div 
                onClick={() => {
                  const words = RAW_N2_VOCAB.filter((w) => w.category === "Từ láy/Tượng thanh");
                  startFlashcardMode(words);
                }}
                className="p-4 rounded-2xl border bg-white hover:border-purple-400 cursor-pointer shadow-sm hover:shadow-md transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-rose-800">
                    Phần dễ mất điểm
                  </span>
                  <ArrowRight className="w-4 h-4 text-natural-muted group-hover:text-purple-600 transition-transform group-hover:translate-x-1" />
                </div>
                <div className="font-black text-sm text-natural-deep group-hover:text-purple-600">
                  Từ Láy & Tượng Hình (オノマトペ)
                </div>
                <p className="text-xs text-natural-muted">
                  Chinh phục các từ: ずらりと, こっそり, まごまご, びっしょり...
                </p>
              </div>

              <div 
                onClick={() => {
                  const words = RAW_N2_VOCAB.filter((w) => w.category === "Quán dụng ngữ");
                  startFlashcardMode(words);
                }}
                className="p-4 rounded-2xl border bg-white hover:border-purple-400 cursor-pointer shadow-sm hover:shadow-md transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-indigo-100 text-indigo-800">
                    Văn viết & Đọc hiểu
                  </span>
                  <ArrowRight className="w-4 h-4 text-natural-muted group-hover:text-purple-600 transition-transform group-hover:translate-x-1" />
                </div>
                <div className="font-black text-sm text-natural-deep group-hover:text-purple-600">
                  Quán Dụng Ngữ (慣用句)
                </div>
                <p className="text-xs text-natural-muted">
                  Cụm từ cố định: 手を打つ, 拍車をかける, 目を配る...
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* POPUP MODAL XEM CHI TIẾT TỪ VỰNG KHI BẤM: ĐÃ THUỘC / CẦN ÔN / CHƯA HỌC */}
      {statusDetailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl border-2 border-purple-300 max-w-2xl w-full max-h-[85vh] shadow-2xl flex flex-col overflow-hidden animate-scale-up">
            
            {/* Modal Header */}
            <div className={`p-5 border-b flex items-center justify-between ${
              statusDetailModal === "mastered"
                ? "bg-emerald-50 border-emerald-200"
                : statusDetailModal === "learning"
                ? "bg-amber-50 border-amber-200"
                : "bg-slate-50 border-slate-200"
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-lg ${
                  statusDetailModal === "mastered"
                    ? "bg-emerald-600 text-white"
                    : statusDetailModal === "learning"
                    ? "bg-amber-600 text-white"
                    : "bg-slate-600 text-white"
                }`}>
                  {statusDetailModal === "mastered" ? "✓" : statusDetailModal === "learning" ? "⟳" : "•"}
                </div>
                <div>
                  <h3 className="text-base font-black text-natural-deep">
                    Danh Sách Từ N2 {statusDetailModal === "mastered" ? "ĐÃ THUỘC" : statusDetailModal === "learning" ? "CẦN ÔN LẠI" : "CHƯA HỌC"}
                  </h3>
                  <p className="text-xs text-natural-muted">
                    Có <strong className="font-mono text-purple-700">{modalStatusWords.length}</strong> từ vựng tương ứng
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  playSound.click();
                  setStatusDetailModal(null);
                }}
                className="px-3 py-1.5 rounded-xl border bg-white hover:bg-natural-soft text-natural-muted font-black text-xs cursor-pointer"
              >
                Đóng ✕
              </button>
            </div>

            {/* Modal Word List */}
            <div className="p-5 overflow-y-auto flex-1 space-y-3">
              {modalStatusWords.length > 0 ? (
                modalStatusWords.map((word) => (
                  <div
                    key={word.id}
                    className="p-4 rounded-2xl border bg-natural-soft/40 hover:bg-white hover:border-purple-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-black text-natural-deep font-sans">{word.kanji}</span>
                        <span className="text-xs font-mono font-bold text-purple-600">【{word.kana}】</span>
                        <span className="text-[11px] font-bold text-amber-700">({word.hanViet})</span>
                        <button
                          onClick={() => speak(word.kanji)}
                          className="p-1 rounded-full hover:bg-purple-100 text-purple-600 cursor-pointer"
                          title="Nghe phát âm"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-sm font-bold text-emerald-700">{word.meaning}</div>
                      <div className="text-xs text-natural-muted font-medium">
                        <span className="font-bold text-amber-800">Collocation:</span> {word.collocations[0]}
                      </div>
                    </div>

                    {/* Quick status change buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                      {statusDetailModal !== "mastered" && (
                        <button
                          onClick={() => {
                            updateWordStatus(word.id, "mastered");
                            playSound.correct();
                          }}
                          className="px-3 py-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold text-xs flex items-center gap-1 cursor-pointer transition-all"
                          title="Đánh dấu đã thuộc"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Thuộc</span>
                        </button>
                      )}

                      {statusDetailModal !== "learning" && (
                        <button
                          onClick={() => {
                            updateWordStatus(word.id, "learning");
                            playSound.click();
                          }}
                          className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold text-xs flex items-center gap-1 cursor-pointer transition-all"
                          title="Đánh dấu cần ôn"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Cần ôn</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 space-y-2 text-natural-muted">
                  <div className="text-4xl">📭</div>
                  <p className="text-sm font-black text-natural-deep">Chưa có từ vựng nào trong mục này</p>
                  <p className="text-xs">Hãy luyện tập các thẻ từ vựng để chuyển trạng thái từ nhé!</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t bg-natural-soft flex flex-col sm:flex-row justify-between items-center gap-3">
              <button
                onClick={() => {
                  playSound.click();
                  setStatusDetailModal(null);
                  setLibTab(statusDetailModal);
                  setActiveTab("library");
                }}
                className="text-xs font-bold text-purple-700 hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>Xem chi tiết trong Kho từ vựng</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              {modalStatusWords.length > 0 && (
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => startFlashcardMode(modalStatusWords)}
                    className="flex-1 sm:flex-initial px-4 py-2.5 bg-[#1A1A1A] hover:bg-black text-white rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-all"
                  >
                    <Layers className="w-3.5 h-3.5 text-purple-400" />
                    <span>FLASHCARD ({modalStatusWords.length})</span>
                  </button>

                  <button
                    onClick={() => startStudy("custom", modalStatusWords)}
                    className="flex-1 sm:flex-initial px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>THẺ 4 CHIỀU</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* TAB FLASHCARD: FLASHCARD ĐƠN GIẢN CÓ TÍNH NĂNG HOÁN ĐỔI MẶT THẺ */}
      {activeTab === "flashcard" && (
        <div className="max-w-xl mx-auto space-y-6 animate-fade-in">
          {!flashcardFinished && flashcardQueue.length > 0 ? (
            <div className="space-y-5">
              
              {/* Flashcard Top Control Bar */}
              <div className="flex items-center justify-between gap-3 text-xs font-black text-natural-muted">
                <div className="flex items-center gap-2">
                  <span className="font-mono bg-natural-soft px-3 py-1 rounded-full border">
                    Từ {flashcardIndex + 1} / {flashcardQueue.length}
                  </span>
                  <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                    {flashcardQueue[flashcardIndex].category}
                  </span>
                </div>

                {/* Controls: Hoán đổi mặt & Trộn ngẫu nhiên */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShuffleFlashcards}
                    className="p-2 rounded-xl border bg-white hover:bg-natural-soft text-natural-deep font-bold text-xs flex items-center gap-1 cursor-pointer transition-all shadow-2xs"
                    title="Trộn ngẫu nhiên danh sách từ"
                  >
                    <Shuffle className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Trộn</span>
                  </button>

                  <button
                    onClick={handleToggleSwap}
                    className={`px-3 py-1.5 rounded-xl border font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs ${
                      isSwapped
                        ? "bg-purple-600 text-white border-purple-700 shadow-sm"
                        : "bg-white hover:bg-purple-50 text-purple-700 border-purple-300"
                    }`}
                    title="Hoán đổi: Mặt trước là Nghĩa Tiếng Việt, Mặt sau là Từ vựng & Phiên âm"
                  >
                    <ArrowLeftRight className="w-3.5 h-3.5" />
                    <span>{isSwapped ? "Nghĩa → Từ Vựng" : "Từ Vựng → Nghĩa"}</span>
                  </button>
                </div>
              </div>

              {/* Interactive Flip Card */}
              <div
                onClick={() => {
                  playSound.click();
                  setIsFlipped(!isFlipped);
                }}
                className="w-full min-h-[300px] sm:min-h-[340px] bg-white rounded-3xl border-2 border-purple-200 hover:border-purple-400 p-6 sm:p-10 shadow-lg flex flex-col justify-between items-center text-center cursor-pointer transition-all hover:shadow-xl relative select-none group"
              >
                {/* Top Hint badge */}
                <div className="w-full flex items-center justify-between text-xs text-natural-muted">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-full">
                    {!isFlipped 
                      ? (!isSwapped ? "MẶT TRƯỚC: TỪ VỰNG" : "MẶT TRƯỚC: NGHĨA TIẾNG VIỆT") 
                      : (!isSwapped ? "MẶT SAU: PHIÊN ÂM & NGHĨA" : "MẶT SAU: TỪ VỰNG & PHIÊN ÂM")}
                  </span>
                  
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speak(flashcardQueue[flashcardIndex].kanji);
                      }}
                      className="p-2 rounded-full hover:bg-purple-100 text-purple-600 transition-all border border-purple-200 cursor-pointer"
                      title="Nghe phát âm"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Center Content based on Swap and Flip states */}
                <div className="my-auto space-y-4 py-4 w-full">
                  {!isFlipped ? (
                    /* MẶT TRƯỚC */
                    !isSwapped ? (
                      /* Chế độ chuẩn: Mặt trước là Từ Vựng Kanji */
                      <div className="space-y-3">
                        <div className="text-4xl sm:text-5xl font-black text-natural-deep font-sans tracking-wide">
                          {flashcardQueue[flashcardIndex].kanji}
                        </div>
                        <div className="text-xs text-natural-muted font-bold">
                          (Chạm vào thẻ để lật xem phiên âm & nghĩa)
                        </div>
                      </div>
                    ) : (
                      /* Chế độ hoán đổi: Mặt trước là Nghĩa Tiếng Việt */
                      <div className="space-y-3">
                        <div className="text-2xl sm:text-3xl font-black text-emerald-600 leading-snug">
                          {flashcardQueue[flashcardIndex].meaning}
                        </div>
                        <div className="text-xs text-natural-muted font-bold">
                          (Chạm vào thẻ để lật xem từ vựng tiếng Nhật)
                        </div>
                      </div>
                    )
                  ) : (
                    /* MẶT SAU */
                    !isSwapped ? (
                      /* Chế độ chuẩn: Mặt sau là Phiên âm & Nghĩa */
                      <div className="space-y-3 animate-fade-in">
                        <div className="text-2xl sm:text-3xl font-bold text-purple-600 font-mono">
                          【 {flashcardQueue[flashcardIndex].kana} 】
                        </div>
                        <div className="text-xs font-bold text-amber-700">
                          Hán Việt: {flashcardQueue[flashcardIndex].hanViet}
                        </div>
                        <div className="text-xl sm:text-2xl font-black text-emerald-600 pt-1">
                          {flashcardQueue[flashcardIndex].meaning}
                        </div>
                      </div>
                    ) : (
                      /* Chế độ hoán đổi: Mặt sau là Từ Vựng & Phiên Âm */
                      <div className="space-y-3 animate-fade-in">
                        <div className="text-4xl sm:text-5xl font-black text-natural-deep font-sans">
                          {flashcardQueue[flashcardIndex].kanji}
                        </div>
                        <div className="text-2xl font-bold text-purple-600 font-mono">
                          【 {flashcardQueue[flashcardIndex].kana} 】
                        </div>
                        <div className="text-xs font-bold text-amber-700">
                          Hán Việt: {flashcardQueue[flashcardIndex].hanViet}
                        </div>
                      </div>
                    )
                  )}
                </div>

                {/* Bottom Flip Action Helper */}
                <div className="text-[11px] font-bold text-purple-600/70 group-hover:text-purple-700 transition-colors flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Chạm để lật mặt thẻ</span>
                </div>
              </div>

              {/* Navigation & Status Bottom Action Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                <button
                  onClick={handleFlashcardPrev}
                  disabled={flashcardIndex === 0}
                  className="py-3 px-4 rounded-2xl border bg-white hover:bg-natural-soft disabled:opacity-30 disabled:cursor-not-allowed font-black text-xs text-natural-deep cursor-pointer transition-all shadow-2xs"
                >
                  ← Từ trước
                </button>

                <button
                  onClick={() => {
                    updateWordStatus(flashcardQueue[flashcardIndex].id, "learning");
                    handleFlashcardNext();
                  }}
                  className="py-3 px-4 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-black text-xs cursor-pointer transition-all shadow-2xs flex items-center justify-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
                  <span>Cần ôn</span>
                </button>

                <button
                  onClick={() => {
                    updateWordStatus(flashcardQueue[flashcardIndex].id, "mastered");
                    handleFlashcardNext();
                  }}
                  className="py-3 px-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-900 font-black text-xs cursor-pointer transition-all shadow-2xs flex items-center justify-center gap-1"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Đã thuộc</span>
                </button>

                <button
                  onClick={handleFlashcardNext}
                  className="py-3 px-4 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs cursor-pointer transition-all shadow-md flex items-center justify-center gap-1"
                >
                  <span>Tiếp theo →</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-3xl border p-8 text-center space-y-6 shadow-md animate-fade-in">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto text-2xl font-black">
                🎉
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-natural-deep">
                  Hoàn Thành Vòng Flashcard!
                </h3>
                <p className="text-xs text-natural-muted">
                  Em đã hoàn thành lật xem toàn bộ các từ vựng trong danh sách này.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => startFlashcardMode()}
                  className="px-6 py-3 bg-purple-600 text-white font-black rounded-2xl text-xs uppercase tracking-wider shadow-md hover:bg-purple-700 cursor-pointer"
                >
                  HỌC LẠI TỪ ĐẦU
                </button>
                <button
                  onClick={() => {
                    playSound.click();
                    setActiveTab("dashboard");
                  }}
                  className="px-6 py-3 border bg-natural-soft text-natural-deep font-black rounded-2xl text-xs uppercase tracking-wider hover:bg-gray-200 cursor-pointer"
                >
                  VỀ BẢNG ĐIỀU KHIỂN
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: STUDY FLASHCARD 4 CHIỀU N2 */}
      {activeTab === "study" && (
        <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
          {!studyFinished && currentStudyWord ? (
            <div className="space-y-6">
              
              {/* Header bar */}
              <div className="flex items-center justify-between text-xs font-black text-natural-muted">
                <span className="font-mono">Từ {studyIndex + 1} / {studyQueue.length}</span>
                <span className="px-3 py-1 rounded-full bg-natural-soft border font-mono">
                  {currentStudyWord.lessonTitle}
                </span>
              </div>

              {/* Multi-Dimensional N2 Card */}
              <div className="w-full bg-white rounded-3xl border-2 p-6 sm:p-8 shadow-lg space-y-6">
                
                {/* Top badges & Audio */}
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-purple-100 text-purple-700 border border-purple-200">
                      {currentStudyWord.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-800 border border-amber-200">
                      Hán Việt: {currentStudyWord.hanViet}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => speak(currentStudyWord.kanji)}
                    className="p-3 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-600 transition-all border border-purple-200 cursor-pointer"
                    title="Nghe phát âm chuẩn"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Core Kanji & Hiragana Display */}
                <div className="text-center py-2 space-y-2">
                  <div className="text-4xl sm:text-5xl font-black text-natural-deep font-sans tracking-wide">
                    {currentStudyWord.kanji}
                  </div>
                  <div className="text-lg font-bold text-purple-600 font-mono">
                    【 {currentStudyWord.kana} 】
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-600 pt-1">
                    {currentStudyWord.meaning}
                  </div>
                </div>

                {/* 4 Multi-Dimensional Tabs for Deep N2 Mastery */}
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-1.5 p-1 bg-natural-soft rounded-2xl border">
                    <button
                      onClick={() => {
                        playSound.click();
                        setCardTab("meaning");
                      }}
                      className={`flex-1 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        cardTab === "meaning" ? "bg-white text-purple-700 shadow-sm border" : "text-natural-muted"
                      }`}
                    >
                      Ngữ Cảnh & Sắc Thái
                    </button>
                    <button
                      onClick={() => {
                        playSound.click();
                        setCardTab("collocation");
                      }}
                      className={`flex-1 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        cardTab === "collocation" ? "bg-white text-purple-700 shadow-sm border" : "text-natural-muted"
                      }`}
                    >
                      Collocations ({currentStudyWord.collocations.length})
                    </button>
                    <button
                      onClick={() => {
                        playSound.click();
                        setCardTab("synonyms");
                      }}
                      className={`flex-1 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        cardTab === "synonyms" ? "bg-white text-purple-700 shadow-sm border" : "text-natural-muted"
                      }`}
                    >
                      Từ Đồng / Trái Nghĩa
                    </button>
                    <button
                      onClick={() => {
                        playSound.click();
                        setCardTab("ai-coach");
                      }}
                      className={`flex-1 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        cardTab === "ai-coach" ? "bg-purple-600 text-white shadow-sm" : "text-natural-muted"
                      }`}
                    >
                      AI Chấm Câu
                    </button>
                  </div>

                  {/* TAB 1: Sắc thái & Ngữ cảnh */}
                  {cardTab === "meaning" && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 text-xs text-purple-950 leading-relaxed">
                        <div className="font-black text-purple-700 flex items-center gap-1.5 mb-1">
                          <Lightbulb className="w-4 h-4" />
                          <span>Lưu ý cách dùng & Bẫy đề thi N2:</span>
                        </div>
                        {currentStudyWord.nuanceNote}
                      </div>

                      <div className="p-4 rounded-2xl bg-natural-soft border text-xs space-y-1.5">
                        <div className="font-black text-natural-deep">Câu ví dụ thực tế:</div>
                        <div className="text-sm font-sans font-medium text-purple-900">{currentStudyWord.exampleJp}</div>
                        <div className="text-xs text-natural-deep italic">→ {currentStudyWord.exampleVn}</div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: Collocations */}
                  {cardTab === "collocation" && (
                    <div className="space-y-2.5 animate-fade-in">
                      <div className="text-xs font-bold text-natural-muted">
                        Các cụm từ cố định thường gặp nhất trong đề thi N2:
                      </div>
                      {currentStudyWord.collocations.map((col, idx) => (
                        <div 
                          key={idx} 
                          className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs font-bold text-amber-950 flex items-center gap-2"
                        >
                          <Tag className="w-4 h-4 text-amber-600 shrink-0" />
                          <span>{col}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* TAB 3: Từ đồng nghĩa & Trái nghĩa */}
                  {cardTab === "synonyms" && (
                    <div className="space-y-4 animate-fade-in">
                      {currentStudyWord.synonyms && currentStudyWord.synonyms.length > 0 && (
                        <div className="space-y-2">
                          <div className="text-xs font-bold text-natural-muted">Từ đồng nghĩa / Phân biệt sắc thái:</div>
                          {currentStudyWord.synonyms.map((syn, idx) => (
                            <div key={idx} className="p-3 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950">
                              <span className="font-black text-blue-800">{syn.word} ({syn.reading})</span>: {syn.note}
                            </div>
                          ))}
                        </div>
                      )}

                      {currentStudyWord.antonyms && currentStudyWord.antonyms.length > 0 && (
                        <div className="space-y-2">
                          <div className="text-xs font-bold text-natural-muted">Từ trái nghĩa (Đối lập):</div>
                          {currentStudyWord.antonyms.map((ant, idx) => (
                            <div key={idx} className="p-3 rounded-2xl bg-rose-50/70 border border-rose-200 text-xs text-rose-950">
                              <span className="font-black text-rose-800">{ant.word} ({ant.reading})</span>: {ant.meaning}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 4: Thầy AI Chấm Câu N2 */}
                  {cardTab === "ai-coach" && (
                    <div className="space-y-3 animate-fade-in">
                      <div className="text-xs text-natural-muted">
                        Tập đặt câu có chứa từ 「<strong>{currentStudyWord.kanji}</strong>」 để Thầy Sơn AI phân tích và sửa lỗi trực tiếp:
                      </div>

                      <textarea
                        value={userSentence}
                        onChange={(e) => setUserSentence(e.target.value)}
                        placeholder={`Nhập câu tiếng Nhật của bạn có chứa từ ${currentStudyWord.kanji}...`}
                        className="w-full p-3.5 rounded-2xl border text-sm font-sans outline-none focus:border-purple-500 min-h-[75px]"
                      />

                      <button
                        onClick={evaluateUserSentence}
                        disabled={isEvaluating || !userSentence.trim()}
                        className={`w-full py-3 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                          isEvaluating
                            ? "bg-natural-soft text-natural-muted cursor-not-allowed"
                            : "bg-purple-600 hover:bg-purple-700 text-white shadow-md cursor-pointer"
                        }`}
                      >
                        {isEvaluating ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Thầy Sơn đang chấm câu...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            <span>GỬI THẦY SƠN CHẤM BÀI</span>
                          </>
                        )}
                      </button>

                      {evaluationResult && (
                        <div className={`p-4 rounded-2xl border text-xs space-y-2.5 animate-fade-in ${
                          evaluationResult.isCorrect 
                            ? "bg-emerald-50 border-emerald-300 text-emerald-950" 
                            : "bg-amber-50 border-amber-300 text-amber-950"
                        }`}>
                          <div className="flex items-center gap-2 font-black">
                            {evaluationResult.isCorrect ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-amber-600" />
                            )}
                            <span>{evaluationResult.isCorrect ? "Câu chuẩn N2 xuất sắc!" : "Cần hoàn thiện thêm một chút:"}</span>
                          </div>

                          <p className="leading-relaxed">{evaluationResult.feedback}</p>

                          {evaluationResult.correctedSentence && (
                            <div className="p-3 bg-white/80 rounded-xl border border-dashed font-sans font-medium text-natural-deep">
                              <span className="font-bold text-purple-700">Câu gợi ý tự nhiên hơn: </span>
                              {evaluationResult.correctedSentence}
                            </div>
                          )}

                          {evaluationResult.scoreExplanation && (
                            <div className="text-[11px] opacity-90 italic">
                              💡 {evaluationResult.scoreExplanation}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                </div>

                {/* Bottom Card Controls */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t">
                  <button
                    onClick={() => handleMarkAndNext("learning")}
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
                  >
                    <RotateCcw className="w-4 h-4 text-amber-600" />
                    <span>CẦN ÔN LẠI</span>
                  </button>

                  <button
                    onClick={() => handleMarkAndNext("mastered")}
                    className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>ĐÃ THUỘC TỪ NÀY</span>
                  </button>
                </div>

              </div>

            </div>
          ) : (
            <div className="bg-white rounded-3xl border p-8 text-center space-y-6 shadow-md animate-fade-in">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto text-2xl font-black">
                🎉
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-natural-deep">
                  Chúc Mừng Em Đã Hoàn Thành Phiên Học N2!
                </h3>
                <p className="text-xs text-natural-muted">
                  Em đã xem qua toàn bộ các từ vựng trong danh sách chọn lọc.
                </p>
              </div>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => startStudy("all")}
                  className="px-6 py-3 bg-purple-600 text-white font-black rounded-2xl text-xs uppercase tracking-wider shadow-md hover:bg-purple-700 cursor-pointer"
                >
                  HỌC LẠI TỪ ĐẦU
                </button>
                <button
                  onClick={() => {
                    playSound.click();
                    setActiveTab("dashboard");
                  }}
                  className="px-6 py-3 border font-black rounded-2xl text-xs uppercase tracking-wider hover:bg-natural-soft cursor-pointer"
                >
                  VỀ BẢNG ĐIỀU KHIỂN
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: KHO TỪ VỰNG & TRA CỨU */}
      {activeTab === "library" && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Search and Filters */}
          <div className="bg-white p-6 rounded-3xl border shadow-sm space-y-4">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-natural-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tra cứu từ vựng N2, Kanji, Furigana, Hán Việt hoặc Nghĩa tiếng Việt..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl border font-medium text-xs sm:text-sm outline-none focus:border-purple-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-natural-muted hover:text-natural-deep cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <select
                value={libLesson}
                onChange={(e) => setLibLesson(e.target.value)}
                className="p-2.5 rounded-xl border text-xs font-bold outline-none cursor-pointer"
              >
                <option value="all">Tất cả chuyên đề ({lessons.length})</option>
                {lessons.map((les) => (
                  <option key={les.id} value={les.id.toString()}>
                    {les.title}
                  </option>
                ))}
              </select>

              <select
                value={libCategory}
                onChange={(e) => setLibCategory(e.target.value)}
                className="p-2.5 rounded-xl border text-xs font-bold outline-none cursor-pointer"
              >
                <option value="all">Tất cả loại từ ({categories.length})</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-1 p-1 bg-natural-soft rounded-xl border">
                <button
                  onClick={() => setLibTab("all")}
                  className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${
                    libTab === "all" ? "bg-white text-natural-deep shadow-xs" : "text-natural-muted"
                  }`}
                >
                  Tất cả
                </button>
                <button
                  onClick={() => setLibTab("mastered")}
                  className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${
                    libTab === "mastered" ? "bg-emerald-600 text-white shadow-xs" : "text-natural-muted"
                  }`}
                >
                  Đã thuộc
                </button>
                <button
                  onClick={() => setLibTab("learning")}
                  className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${
                    libTab === "learning" ? "bg-amber-500 text-white shadow-xs" : "text-natural-muted"
                  }`}
                >
                  Cần ôn
                </button>
                <button
                  onClick={() => setLibTab("new")}
                  className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${
                    libTab === "new" ? "bg-slate-600 text-white shadow-xs" : "text-natural-muted"
                  }`}
                >
                  Chưa học
                </button>
              </div>
            </div>

          </div>

          {/* Word List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {libraryItems.map((word) => {
              const status = wordStates[word.id] || "new";

              return (
                <div
                  key={word.id}
                  className="p-5 rounded-3xl border bg-white shadow-sm hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-black text-natural-deep font-sans">{word.kanji}</span>
                        <span className="text-xs font-mono font-bold text-purple-600">【{word.kana}】</span>
                        <span className="text-xs font-bold text-amber-700">({word.hanViet})</span>
                        <button
                          onClick={() => speak(word.kanji)}
                          className="p-1 rounded-full hover:bg-purple-100 text-purple-600 cursor-pointer"
                          title="Nghe phát âm"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                        status === "mastered"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : status === "learning"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-slate-50 text-slate-700 border-slate-200"
                      }`}>
                        {status === "mastered" ? "Đã thuộc" : status === "learning" ? "Cần ôn" : "Chưa học"}
                      </span>
                    </div>

                    <div className="text-sm font-bold text-emerald-700">{word.meaning}</div>
                    
                    {/* Collocations */}
                    <div className="space-y-1 text-xs">
                      <div className="font-bold text-amber-900">Collocations thực chiến:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {word.collocations.map((c, i) => (
                          <span key={i} className="px-2.5 py-0.5 bg-amber-50 border border-amber-200 rounded-lg text-amber-950 text-[11px] font-medium">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Nuance */}
                    <div className="p-2.5 rounded-xl bg-natural-soft text-xs text-natural-muted leading-relaxed">
                      💡 {word.nuanceNote}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t text-xs">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          updateWordStatus(word.id, "mastered");
                          playSound.correct();
                        }}
                        className={`p-1.5 rounded-lg border cursor-pointer ${
                          status === "mastered" ? "bg-emerald-600 text-white" : "hover:bg-emerald-50 text-emerald-700"
                        }`}
                        title="Đánh dấu đã thuộc"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          updateWordStatus(word.id, "learning");
                          playSound.click();
                        }}
                        className={`p-1.5 rounded-lg border cursor-pointer ${
                          status === "learning" ? "bg-amber-500 text-white" : "hover:bg-amber-50 text-amber-700"
                        }`}
                        title="Đánh dấu cần ôn"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startFlashcardMode([word])}
                        className="px-3 py-1 rounded-xl bg-[#1A1A1A] hover:bg-black text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                      >
                        <Layers className="w-3 h-3 text-purple-400" />
                        <span>Flashcard</span>
                      </button>

                      <button
                        onClick={() => startStudy("custom", [word])}
                        className="px-3 py-1 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-800 font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>Học sâu</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {libraryItems.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border space-y-3">
              <div className="text-4xl">🔍</div>
              <p className="text-sm font-black text-natural-deep">Không tìm thấy từ vựng nào phù hợp</p>
              <p className="text-xs text-natural-muted">Thầy hãy thử thay đổi từ khóa hoặc bộ lọc xem sao nhé!</p>
            </div>
          )}

        </div>
      )}

      {/* TAB 4: MONDAI 5 (USAGE DRILL) */}
      {activeTab === "mondai5" && (
        <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
          {!mondaiFinished && mondaiList.length > 0 ? (
            <div className="bg-white rounded-3xl border p-6 sm:p-8 space-y-6 shadow-md">
              
              <div className="flex items-center justify-between border-b pb-3">
                <span className="text-xs font-black text-natural-muted">
                  Câu {mondaiIndex + 1} / {mondaiList.length}
                </span>
                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold font-mono">
                  Điểm: {mondaiScore}
                </span>
              </div>

              {mondaiList[mondaiIndex].usageQuestion && (
                <div className="space-y-4">
                  <div className="text-base sm:text-lg font-black text-natural-deep font-sans leading-relaxed">
                    {mondaiList[mondaiIndex].usageQuestion.question}
                  </div>

                  <div className="space-y-2.5">
                    {mondaiList[mondaiIndex].usageQuestion.options.map((opt, idx) => {
                      const isSelected = selectedOption === idx;
                      const isCorrect = idx === mondaiList[mondaiIndex].usageQuestion!.correctIndex;
                      let btnStyle = "border bg-white hover:border-indigo-400 hover:bg-natural-soft text-natural-deep";

                      if (selectedOption !== null) {
                        if (isCorrect) {
                          btnStyle = "border-2 border-emerald-500 bg-emerald-50 text-emerald-950 font-bold";
                        } else if (isSelected) {
                          btnStyle = "border-2 border-rose-500 bg-rose-50 text-rose-950";
                        } else {
                          btnStyle = "opacity-40 border-gray-200";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={selectedOption !== null}
                          onClick={() => handleAnswerMondai(idx)}
                          className={`w-full p-4 rounded-2xl text-left text-xs sm:text-sm font-bold transition-all flex items-center justify-between leading-relaxed ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {selectedOption !== null && idx === mondaiList[mondaiIndex].usageQuestion?.correctIndex && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {selectedOption !== null && (
                    <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 text-xs leading-relaxed space-y-3 animate-fade-in">
                      <div className="text-purple-950 font-medium">
                        <strong>Giải thích:</strong> {mondaiList[mondaiIndex].usageQuestion?.explanation}
                      </div>
                      <button
                        onClick={handleNextMondai}
                        className="w-full py-3 bg-purple-600 text-white rounded-xl font-black text-xs uppercase tracking-wider shadow-md hover:bg-purple-700 cursor-pointer"
                      >
                        {mondaiIndex < mondaiList.length - 1 ? "CÂU TIẾP THEO" : "XEM KẾT QUẢ"}
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>
          ) : (
            <div className="bg-white rounded-3xl border p-8 text-center space-y-6 shadow-md animate-fade-in">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto text-2xl font-black">
                🏆
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-natural-deep">
                  Hoàn Thành Bài Luyện Mondai 5 N2!
                </h3>
                <div className="text-4xl font-black text-purple-600 font-mono">
                  {mondaiScore} / {mondaiList.length} Điểm
                </div>
              </div>
              <div className="flex justify-center gap-3">
                <button
                  onClick={startMondai5}
                  className="px-6 py-3 bg-purple-600 text-white font-black rounded-2xl text-xs uppercase tracking-wider shadow-md hover:bg-purple-700 cursor-pointer"
                >
                  LÀM LẠI ĐỀ
                </button>
                <button
                  onClick={() => {
                    playSound.click();
                    setActiveTab("dashboard");
                  }}
                  className="px-6 py-3 border font-black rounded-2xl text-xs uppercase tracking-wider hover:bg-natural-soft cursor-pointer"
                >
                  VỀ BẢNG ĐIỀU KHIỂN
                </button>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
