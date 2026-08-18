import React, { useState, useEffect, useRef } from "react";
import { 
  ArrowLeft, 
  BookOpen, 
  Search, 
  RotateCcw, 
  Check, 
  Trash2, 
  HelpCircle, 
  Edit3, 
  Layers, 
  Flame, 
  Sparkles, 
  Eye, 
  ChevronRight, 
  Info,
  Sliders,
  Award
} from "lucide-react";
import { playSound } from "../utils/audio";
import { KANJI_N5_DATA, KanjiItem } from "../data/kanjiN5Data";

interface KanjiN5LessonsProps {
  onGoBack: () => void;
}

interface ReviewState {
  ease: number;
  interval: number;
  repetitions: number;
  nextReview: string | null;
}

export default function KanjiN5Lessons({ onGoBack }: KanjiN5LessonsProps) {
  // --- States ---
  const [activeTab, setActiveTab] = useState<"dashboard" | "learn" | "flashcard" | "quiz" | "write">("dashboard");
  const [learnedIds, setLearnedIds] = useState<Set<number>>(new Set());
  const [streak, setStreak] = useState<number>(0);
  const [lastStudyDate, setLastStudyDate] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Record<number, ReviewState>>({});
  
  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "learned" | "unlearned">("all");
  
  // Modal for detailed view
  const [selectedKanji, setSelectedKanji] = useState<KanjiItem | null>(null);
  
  // Flashcards state
  const [fcQueue, setFcQueue] = useState<KanjiItem[]>([]);
  const [currentFcIndex, setCurrentFcIndex] = useState(0);
  const [fcFlipped, setFcFlipped] = useState(false);
  
  // Quiz state
  const [quizCurrent, setQuizCurrent] = useState<{
    correctId: number;
    kanji: string;
    options: string[];
    answered: boolean;
    selectedOption: string | null;
  } | null>(null);
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 });
  
  // Writing Canvas state
  const [selectedWriteId, setSelectedWriteId] = useState<number>(1);
  const [brushColor, setBrushColor] = useState("#2c2416");
  const [brushSize, setBrushSize] = useState(5);
  const [showCanvasMenu, setShowCanvasMenu] = useState(false);
  const [canvasEvalMsg, setCanvasEvalMsg] = useState<{ text: string; success: boolean } | null>(null);
  const [canvasHistory, setCanvasHistory] = useState<string[]>([]);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  // --- Initial Load & Persistence ---
  useEffect(() => {
    const loadFromStorage = () => {
      const saved = localStorage.getItem("kanji_n5_state");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setLearnedIds(new Set(parsed.learnedIds || []));
          setStreak(parsed.streak || 0);
          setLastStudyDate(parsed.lastStudyDate || null);
          setReviews(parsed.reviews || {});
          if (parsed.quizCorrect !== undefined && parsed.quizTotal !== undefined) {
            setQuizScore({ correct: parsed.quizCorrect, total: parsed.quizTotal });
          }
        } catch (e) {
          console.error("Error parsing local kanji state", e);
        }
      }
    };

    loadFromStorage();

    const handleStorageChange = (e: any) => {
      const key = e.detail?.key || e.key;
      if (!key || key === "kanji_n5_state") {
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

  const saveState = (
    newLearned: Set<number>,
    newStreak: number,
    newLastDate: string | null,
    newReviews: Record<number, ReviewState>,
    newQuizCorrect?: number,
    newQuizTotal?: number
  ) => {
    let latestSaved: any = {};
    const savedStr = localStorage.getItem("kanji_n5_state");
    if (savedStr) {
      try { latestSaved = JSON.parse(savedStr); } catch (e) {}
    }

    const mergedLearned = Array.from(new Set([...(latestSaved.learnedIds || []), ...Array.from(newLearned)]));
    const mergedStreak = Math.max(latestSaved.streak || 0, newStreak);
    const mergedReviews = { ...(latestSaved.reviews || {}), ...newReviews };
    const mergedCorrect = Math.max(latestSaved.quizCorrect || 0, newQuizCorrect !== undefined ? newQuizCorrect : quizScore.correct);
    const mergedTotal = Math.max(latestSaved.quizTotal || 0, newQuizTotal !== undefined ? newQuizTotal : quizScore.total);

    const toSave = {
      learnedIds: mergedLearned,
      streak: mergedStreak,
      lastStudyDate: newLastDate || latestSaved.lastStudyDate,
      reviews: mergedReviews,
      quizCorrect: mergedCorrect,
      quizTotal: mergedTotal,
    };
    
    setLearnedIds(new Set(mergedLearned));
    setStreak(mergedStreak);
    setReviews(mergedReviews);
    setQuizScore({ correct: mergedCorrect, total: mergedTotal });

    localStorage.setItem("kanji_n5_state", JSON.stringify(toSave));
  };

  const updateStreak = (currentLearned: Set<number>) => {
    const today = new Date().toDateString();
    let updatedStreak = streak;
    let updatedLastDate = lastStudyDate;

    if (lastStudyDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (lastStudyDate === yesterday) {
        updatedStreak += 1;
      } else if (lastStudyDate !== today) {
        updatedStreak = 1;
      }
      updatedLastDate = today;
      setStreak(updatedStreak);
      setLastStudyDate(updatedLastDate);
    }
    return { updatedStreak, updatedLastDate };
  };

  const markLearned = (id: number) => {
    if (!learnedIds.has(id)) {
      const updated = new Set<number>(learnedIds);
      updated.add(id);
      setLearnedIds(updated);
      const { updatedStreak, updatedLastDate } = updateStreak(updated);
      saveState(updated, updatedStreak, updatedLastDate, reviews);
    }
  };

  // --- SRS Review Calculation ---
  const getDueReviews = (): number[] => {
    const now = new Date();
    const due: number[] = [];
    Object.keys(reviews).forEach((key) => {
      const id = parseInt(key);
      const r = reviews[id];
      if (!r.nextReview || new Date(r.nextReview) <= now) {
        due.push(id);
      }
    });
    return due;
  };

  const handleUpdateReview = (id: number, rating: number) => {
    const r = reviews[id] || { ease: 2.5, interval: 0, repetitions: 0, nextReview: null };
    const updatedReviews = { ...reviews };
    const nextR = { ...r };

    if (rating >= 2) {
      if (nextR.repetitions === 0) nextR.interval = 1;
      else if (nextR.repetitions === 1) nextR.interval = 3;
      else nextR.interval = Math.round(nextR.interval * nextR.ease);
      nextR.repetitions += 1;
    } else {
      nextR.repetitions = 0;
      nextR.interval = 0;
    }

    nextR.ease = Math.max(1.3, nextR.ease + (0.1 - (2 - rating) * (0.08 + (2 - rating) * 0.02)));
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + nextR.interval);
    nextR.nextReview = nextDate.toISOString();
    updatedReviews[id] = nextR;

    setReviews(updatedReviews);
    markLearned(id);
    
    // Propagate state update
    const updatedLearned = new Set<number>(learnedIds);
    updatedLearned.add(id);
    const { updatedStreak, updatedLastDate } = updateStreak(updatedLearned);
    saveState(updatedLearned, updatedStreak, updatedLastDate, updatedReviews);
  };

  // --- Navigation Tab Switcher ---
  const handleTabChange = (tab: typeof activeTab) => {
    playSound.click();
    setActiveTab(tab);
    setCanvasEvalMsg(null);
    if (tab === "flashcard") {
      const due = getDueReviews();
      const dueSet = new Set(due);
      let queue = KANJI_N5_DATA.filter((k) => dueSet.has(k.id));
      const unlearned = KANJI_N5_DATA.filter((k) => !learnedIds.has(k.id) && !dueSet.has(k.id));
      const fullQueue = [...queue, ...unlearned];
      setFcQueue(fullQueue);
      setCurrentFcIndex(0);
      setFcFlipped(false);
    } else if (tab === "quiz") {
      generateQuiz();
    }
  };

  // --- Quiz Generator & Handler ---
  const generateQuiz = () => {
    const randomIndex = Math.floor(Math.random() * KANJI_N5_DATA.length);
    const correct = KANJI_N5_DATA[randomIndex];
    const options = [correct.meaning];
    while (options.length < 4) {
      const randOptIndex = Math.floor(Math.random() * KANJI_N5_DATA.length);
      const randOpt = KANJI_N5_DATA[randOptIndex];
      if (!options.includes(randOpt.meaning)) {
        options.push(randOpt.meaning);
      }
    }
    const shuffled = options.sort(() => Math.random() - 0.5);
    setQuizCurrent({
      correctId: correct.id,
      kanji: correct.kanji,
      options: shuffled,
      answered: false,
      selectedOption: null,
    });
  };

  const handleQuizAnswer = (option: string) => {
    if (!quizCurrent || quizCurrent.answered) return;
    const correctKanji = KANJI_N5_DATA.find((k) => k.id === quizCurrent.correctId);
    const isCorrect = correctKanji?.meaning === option;

    if (isCorrect) {
      playSound.correct();
      setQuizScore((prev) => {
        const nextCorrect = prev.correct + 1;
        const nextTotal = prev.total + 1;
        saveState(learnedIds, streak, lastStudyDate, reviews, nextCorrect, nextTotal);
        return { correct: nextCorrect, total: nextTotal };
      });
      markLearned(quizCurrent.correctId);
    } else {
      playSound.wrong();
      setQuizScore((prev) => {
        const nextTotal = prev.total + 1;
        saveState(learnedIds, streak, lastStudyDate, reviews, prev.correct, nextTotal);
        return { correct: prev.correct, total: nextTotal };
      });
    }

    setQuizCurrent((prev) => prev ? { ...prev, answered: true, selectedOption: option } : null);
    setTimeout(() => {
      generateQuiz();
    }, 1500);
  };

  // --- Canvas Handwriting Logic ---
  const getCanvasContext = () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    return { canvas, ctx };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const res = getCanvasContext();
    if (!res) return;
    const { canvas, ctx } = res;
    
    isDrawing.current = true;
    const pos = getPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    lastPos.current = pos;
    saveCanvasHistory();
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    e.preventDefault();
    const res = getCanvasContext();
    if (!res) return;
    const { canvas, ctx } = res;

    const pos = getPos(e, canvas);
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = brushColor;
    
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPos.current = pos;
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const getPos = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>,
    canvas: HTMLCanvasElement
  ) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    // Check if TouchEvent
    if ("touches" in e) {
      if (e.touches.length === 0) return lastPos.current;
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    } else {
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    }
  };

  const saveCanvasHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setCanvasHistory((prev) => [...prev, canvas.toDataURL()]);
  };

  const handleClearCanvas = () => {
    playSound.click();
    const res = getCanvasContext();
    if (!res) return;
    const { canvas, ctx } = res;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setCanvasHistory([]);
    setCanvasEvalMsg(null);
  };

  const handleUndoCanvas = () => {
    playSound.click();
    const res = getCanvasContext();
    if (!res) return;
    const { canvas, ctx } = res;

    if (canvasHistory.length > 0) {
      const updatedHistory = [...canvasHistory];
      updatedHistory.pop(); // Remove current state
      setCanvasHistory(updatedHistory);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (updatedHistory.length > 0) {
        const lastImgSrc = updatedHistory[updatedHistory.length - 1];
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
        };
        img.src = lastImgSrc;
      }
    }
  };

  const handleShowTemplate = () => {
    playSound.click();
    const res = getCanvasContext();
    if (!res) return;
    const { canvas, ctx } = res;

    const kanjiObj = KANJI_N5_DATA.find((k) => k.id === selectedWriteId);
    if (!kanjiObj) return;

    ctx.save();
    ctx.globalAlpha = 0.15;
    ctx.font = `bold ${canvas.width * 0.75}px 'Noto Sans JP', 'Noto Serif JP', sans-serif`;
    ctx.fillStyle = brushColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(kanjiObj.kanji, canvas.width / 2, canvas.height / 2);
    ctx.restore();
    saveCanvasHistory();
  };

  const evaluateHandwriting = () => {
    playSound.click();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const kanjiObj = KANJI_N5_DATA.find((k) => k.id === selectedWriteId);
    if (!kanjiObj) return;

    // Create virtual reference offscreen canvas
    const offCanvas = document.createElement("canvas");
    offCanvas.width = canvas.width;
    offCanvas.height = canvas.height;
    const offCtx = offCanvas.getContext("2d");
    if (!offCtx) return;

    offCtx.fillStyle = "#000";
    offCtx.font = `bold ${canvas.width * 0.75}px 'Noto Sans JP', 'Noto Serif JP', sans-serif`;
    offCtx.textAlign = "center";
    offCtx.textBaseline = "middle";
    offCtx.fillText(kanjiObj.kanji, canvas.width / 2, canvas.height / 2);

    // Scan pixels
    const userImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const refImageData = offCtx.getImageData(0, 0, canvas.width, canvas.height);

    const userPixels = userImageData.data;
    const refPixels = refImageData.data;
    let matchCount = 0;
    let totalRefDark = 0;

    for (let i = 0; i < userPixels.length; i += 4) {
      // average gray channel
      const userGray = (userPixels[i] + userPixels[i + 1] + userPixels[i + 2]) / 3;
      const refGray = (refPixels[i] + refPixels[i + 1] + refPixels[i + 2]) / 3;
      
      const userDark = userGray < 240 ? 1 : 0; // alpha check or color presence
      const refDark = refGray < 128 ? 1 : 0;

      if (refDark) totalRefDark++;
      if (userDark && refDark) matchCount++;
    }

    const similarity = totalRefDark > 0 ? Math.round((matchCount / totalRefDark) * 100) : 0;
    
    // Scale or adjust similarity slightly for nicer user tolerance
    let adjustedScore = Math.min(100, Math.round(similarity * 1.5));
    
    if (adjustedScore >= 60) {
      playSound.achievement();
      setCanvasEvalMsg({
        text: `Độ tương đồng: ${adjustedScore}% - Tuyệt vời! Bạn viết rất tốt. Đã ghi nhận đã học!`,
        success: true,
      });
      markLearned(selectedWriteId);
    } else {
      playSound.wrong();
      setCanvasEvalMsg({
        text: `Độ tương đồng: ${adjustedScore}% - Cần cố gắng thêm! Hãy nhìn mẫu hoặc viết cẩn thận hơn nhé.`,
        success: false,
      });
    }
  };

  // --- Handlers for views ---
  const unlearnedList = KANJI_N5_DATA.filter((k) => !learnedIds.has(k.id)).slice(0, 6);
  const dueReviewsCount = getDueReviews().length;

  const filteredKanjiList = KANJI_N5_DATA.filter((k) => {
    const matchesSearch = 
      k.kanji.includes(searchQuery) || 
      k.hanviet.toLowerCase().includes(searchQuery.toLowerCase()) || 
      k.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.on.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.kun.toLowerCase().includes(searchQuery.toLowerCase());
      
    if (filterStatus === "learned") return matchesSearch && learnedIds.has(k.id);
    if (filterStatus === "unlearned") return matchesSearch && !learnedIds.has(k.id);
    return matchesSearch;
  });

  return (
    <div className="washi-pattern min-h-screen p-4 sm:p-8 -mx-4 sm:-mx-8 rounded-[40px] border-2 border-[#1A1A1A] text-[#1A1A1A]" style={{ fontFamily: "'Lora', 'Noto Serif JP', serif" }}>
      {/* Top Banner Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b-2 border-[#1A1A1A] pb-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              playSound.click();
              onGoBack();
            }}
            className="p-2 border-2 border-[#1A1A1A] bg-white text-[#1A1A1A] hover:bg-[#8B0000] hover:text-white rounded-xl transition-all shadow-[2px_2px_0px_#1A1A1A]"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-xs font-black text-[#8B0000] uppercase tracking-widest block">BÍ KÍP QUYỂN V</span>
            <span className="text-xl font-black tracking-widest text-[#1A1A1A]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              HÁN TỰ N5
            </span>
          </div>
        </div>

        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto py-1">
          <button
            onClick={() => handleTabChange("dashboard")}
            className={`px-4 py-2 text-xs font-bold border-2 border-[#1A1A1A] rounded-xl transition-all whitespace-nowrap ${activeTab === "dashboard" ? "bg-[#1A1A1A] text-white" : "bg-white text-[#1A1A1A] hover:bg-[#1A1A1A]/5"}`}
          >
            📊 Tổng Quan
          </button>
          <button
            onClick={() => handleTabChange("learn")}
            className={`px-4 py-2 text-xs font-bold border-2 border-[#1A1A1A] rounded-xl transition-all whitespace-nowrap ${activeTab === "learn" ? "bg-[#1A1A1A] text-white" : "bg-white text-[#1A1A1A] hover:bg-[#1A1A1A]/5"}`}
          >
            📖 Tra cứu / Học
          </button>
          <button
            onClick={() => handleTabChange("flashcard")}
            className={`px-4 py-2 text-xs font-bold border-2 border-[#1A1A1A] rounded-xl transition-all whitespace-nowrap ${activeTab === "flashcard" ? "bg-[#1A1A1A] text-white" : "bg-white text-[#1A1A1A] hover:bg-[#1A1A1A]/5"}`}
          >
            🃏 Flashcard
          </button>
          <button
            onClick={() => handleTabChange("quiz")}
            className={`px-4 py-2 text-xs font-bold border-2 border-[#1A1A1A] rounded-xl transition-all whitespace-nowrap ${activeTab === "quiz" ? "bg-[#1A1A1A] text-white" : "bg-white text-[#1A1A1A] hover:bg-[#1A1A1A]/5"}`}
          >
            ❓ Trắc Nghiệm
          </button>
          <button
            onClick={() => handleTabChange("write")}
            className={`px-4 py-2 text-xs font-bold border-2 border-[#1A1A1A] rounded-xl transition-all whitespace-nowrap ${activeTab === "write" ? "bg-[#1A1A1A] text-white" : "bg-white text-[#1A1A1A] hover:bg-[#1A1A1A]/5"}`}
          >
            ✍️ Luyện Viết
          </button>
        </div>
      </div>

      {/* --- Tab Content: Dashboard --- */}
      {activeTab === "dashboard" && (
        <div className="space-y-8 animate-fadeIn">
          {/* Progress and Streaks Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 border-4 border-[#1A1A1A] rounded-2xl shadow-[6px_6px_0px_#1A1A1A] text-center flex flex-col justify-between">
              <span className="text-xs font-black tracking-widest text-[#8B0000] uppercase block mb-2">ĐÃ CHINH PHỤC</span>
              <div className="text-5xl font-black text-[#1A1A1A] mb-1" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                {learnedIds.size}<span className="text-2xl text-gray-400">/50</span>
              </div>
              <div className="w-full bg-gray-100 h-3 border-2 border-[#1A1A1A] rounded-full overflow-hidden">
                <div 
                  className="bg-[#8B0000] h-full transition-all duration-500" 
                  style={{ width: `${(learnedIds.size / 50) * 100}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500 font-bold mt-2">Đạt {Math.round((learnedIds.size / 50) * 100)}% thành tựu</span>
            </div>

            <div className="bg-white p-6 border-4 border-[#1A1A1A] rounded-2xl shadow-[6px_6px_0px_#1A1A1A] text-center flex flex-col justify-between relative overflow-hidden">
              <span className="text-xs font-black tracking-widest text-[#8B0000] uppercase block mb-2">CHUỖI TU LUYỆN</span>
              <div className="flex items-center justify-center gap-2 mb-1">
                <Flame className="w-8 h-8 text-orange-600 animate-pulse" />
                <div className="text-5xl font-black text-[#1A1A1A]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                  {streak} <span className="text-lg font-bold text-gray-500">Ngày</span>
                </div>
              </div>
              <div className="text-xs font-bold text-gray-500 mt-2">
                {streak > 0 ? "Tuyệt vời, hãy giữ lửa tu luyện mỗi ngày nhé!" : "Hãy học ít nhất 1 chữ ngay hôm nay!"}
              </div>
            </div>

            <div className="bg-white p-6 border-4 border-[#1A1A1A] rounded-2xl shadow-[6px_6px_0px_#1A1A1A] text-center flex flex-col justify-between">
              <span className="text-xs font-black tracking-widest text-[#8B0000] uppercase block mb-2">CẦN ÔN TẬP</span>
              <div className="text-5xl font-black text-[#1A1A1A] mb-1" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                {dueReviewsCount} <span className="text-lg font-bold text-gray-500">Chữ</span>
              </div>
              <button
                onClick={() => handleTabChange("flashcard")}
                className="w-full py-2 bg-[#8B0000] hover:bg-[#a00000] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all border-2 border-[#1A1A1A] shadow-[3px_3px_0px_#1A1A1A]"
              >
                Ôn ngay qua Flashcard
              </button>
            </div>
          </div>

          {/* New Kanji Recommendations */}
          <div className="bg-[#FFFDF9] p-6 sm:p-8 border-4 border-[#1A1A1A] rounded-2xl shadow-[8px_8px_0px_#8B0000] relative">
            <div className="absolute top-0 right-0 bg-[#8B0000] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest rounded-bl-lg">
              Tân Thủ Kanji
            </div>
            <h3 className="text-xl font-black mb-4 flex items-center gap-2" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              <Sparkles className="w-5 h-5 text-yellow-600" />
              Chữ hán khuyên dùng học hôm nay
            </h3>
            <p className="text-sm text-gray-600 mb-6 font-medium leading-relaxed">
              Dưới đây là các chữ Hán tự N5 cơ bản nhất bạn chưa học. Hãy nhấp vào từng chữ để xem chi tiết chiêu thức, âm On/Kun và luyện tập ghi nhớ.
            </p>

            {unlearnedList.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {unlearnedList.map((k) => (
                  <div
                    key={k.id}
                    onClick={() => {
                      playSound.click();
                      setSelectedKanji(k);
                    }}
                    className="p-4 border-2 border-[#1A1A1A] bg-white hover:border-[#8B0000] rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_#1A1A1A]"
                  >
                    <span className="text-3xl font-black mb-1 text-[#1A1A1A] font-serif">{k.kanji}</span>
                    <span className="text-xs font-black text-[#8B0000]">{k.hanviet}</span>
                    <span className="text-[10px] text-gray-500 mt-1 font-semibold">{k.meaning}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                <Award className="w-12 h-12 text-[#8B0000] mx-auto mb-2 animate-bounce" />
                <p className="font-bold text-[#1A1A1A]">Thiên hạ vô địch!</p>
                <p className="text-xs text-gray-500 mt-1">Bạn đã thuần thục toàn bộ 50 chữ Hán tự N5 trong sách bí kíp này.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- Tab Content: Learn / Tra cứu --- */}
      {activeTab === "learn" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Filter Toolbar */}
          <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 border-2 border-[#1A1A1A] rounded-2xl shadow-[4px_4px_0px_#1A1A1A]">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm chữ, nghĩa, âm đọc..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-[#1A1A1A] rounded-xl text-sm focus:outline-none focus:border-[#8B0000] bg-gray-50 font-sans"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-4 py-2 border-2 border-[#1A1A1A] rounded-xl text-sm bg-white focus:outline-none font-bold"
              >
                <option value="all">Tất cả chữ hán</option>
                <option value="learned">Đã học ({learnedIds.size})</option>
                <option value="unlearned">Chưa học ({50 - learnedIds.size})</option>
              </select>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-3 border-2 border-[#1A1A1A] rounded-xl hover:bg-gray-100"
                >
                  Xóa lọc
                </button>
              )}
            </div>
          </div>

          {/* Grid Layout of 50 Kanji */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {filteredKanjiList.map((k) => {
              const hasLearned = learnedIds.has(k.id);
              return (
                <div
                  key={k.id}
                  onClick={() => {
                    playSound.click();
                    setSelectedKanji(k);
                  }}
                  className={`p-4 border-2 border-[#1A1A1A] rounded-xl flex flex-col items-center justify-center cursor-pointer relative transition-all group hover:-translate-y-1 hover:shadow-[4px_4px_0px_#1A1A1A] ${hasLearned ? "bg-[#FFFDF6] border-[#8B0000]" : "bg-white"}`}
                >
                  {hasLearned && (
                    <span className="absolute top-1.5 right-1.5 w-4.5 h-4.5 bg-[#8B0000] text-white flex items-center justify-center text-[9px] rounded-full font-bold">
                      ✓
                    </span>
                  )}
                  <span className="text-3xl sm:text-4xl font-black mb-1 text-[#1A1A1A] group-hover:scale-110 transition-transform font-serif">{k.kanji}</span>
                  <span className="text-xs font-black text-[#8B0000] tracking-wider">{k.hanviet}</span>
                  <span className="text-[10px] text-gray-500 font-bold text-center leading-none mt-1">{k.meaning}</span>
                </div>
              );
            })}
          </div>

          {filteredKanjiList.length === 0 && (
            <div className="py-12 text-center bg-white border-2 border-[#1A1A1A] rounded-2xl">
              <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="font-bold text-gray-500">Không tìm thấy chữ Hán tự nào khớp yêu cầu!</p>
            </div>
          )}
        </div>
      )}

      {/* --- Tab Content: Flashcard --- */}
      {activeTab === "flashcard" && (
        <div className="max-w-md mx-auto space-y-6 animate-fadeIn">
          <div className="text-center bg-[#8B0000]/5 py-2 px-4 border-2 border-[#8B0000] rounded-xl text-xs font-bold text-[#8B0000]">
            Hàng đợi ôn tập: {fcQueue.length - currentFcIndex} chữ còn lại
          </div>

          {fcQueue.length > 0 && currentFcIndex < fcQueue.length ? (
            <div className="space-y-6">
              {/* Flashcard container with 3D Flip */}
              <div 
                onClick={() => {
                  playSound.flip();
                  setFcFlipped(!fcFlipped);
                }}
                className="perspective-1000 w-full h-[320px] cursor-pointer"
              >
                <div className={`relative w-full h-full duration-500 transform-style-3d ${fcFlipped ? "rotate-y-180" : ""}`}>
                  {/* Front Side */}
                  <div className="absolute inset-0 w-full h-full backface-hidden bg-white border-4 border-[#1A1A1A] rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-[6px_6px_0px_#1A1A1A]">
                    <div className="text-8xl font-black text-[#1A1A1A] font-serif mb-2">{fcQueue[currentFcIndex].kanji}</div>
                    <div className="text-xl font-black text-[#8B0000] tracking-widest">{fcQueue[currentFcIndex].hanviet}</div>
                    <p className="text-[10px] text-gray-400 font-bold mt-4 uppercase tracking-widest">Chạm để xem bí kíp đằng sau</p>
                  </div>

                  {/* Back Side */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-[#FFFDF6] border-4 border-[#1A1A1A] rounded-3xl p-6 flex flex-col justify-between text-left shadow-[6px_6px_0px_#1A1A1A] overflow-y-auto">
                    <div>
                      <div className="flex justify-between items-center border-b-2 border-[#1A1A1A]/10 pb-2 mb-3">
                        <span className="text-lg font-black text-[#8B0000]">{fcQueue[currentFcIndex].hanviet}</span>
                        <span className="text-xs bg-gray-200 text-[#1A1A1A] px-2 py-0.5 rounded font-black font-serif">Nét: {fcQueue[currentFcIndex].strokes}</span>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-bold text-xs text-gray-500 uppercase tracking-widest block">Nghĩa tiếng Việt</span>
                          <span className="text-lg font-black text-[#1A1A1A]">{fcQueue[currentFcIndex].meaning}</span>
                        </div>
                        <div>
                          <span className="font-bold text-xs text-gray-500 uppercase tracking-widest block">Onyomi (Âm Nhật cổ)</span>
                          <span className="font-bold text-[#1A1A1A]">{fcQueue[currentFcIndex].on}</span>
                        </div>
                        <div>
                          <span className="font-bold text-xs text-gray-500 uppercase tracking-widest block">Kunyomi (Âm Nhật thuần)</span>
                          <span className="font-bold text-[#1A1A1A]">{fcQueue[currentFcIndex].kun || "—"}</span>
                        </div>
                        <div>
                          <span className="font-bold text-xs text-gray-500 uppercase tracking-widest block mb-1">Ví dụ tu luyện</span>
                          <div className="text-xs space-y-1 font-sans bg-white p-2.5 border border-[#1A1A1A] rounded-xl max-h-[80px] overflow-y-auto">
                            {fcQueue[currentFcIndex].examples.map((ex, i) => (
                              <div key={i} className="text-gray-700 font-semibold">{ex}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-[10px] text-gray-400 font-bold text-center mt-2 uppercase tracking-widest">Chạm lần nữa để thu hồi</p>
                  </div>
                </div>
              </div>

              {/* Rating Control Buttons */}
              <div className="bg-white p-4 border-2 border-[#1A1A1A] rounded-2xl shadow-[4px_4px_0px_#1A1A1A] space-y-3">
                <p className="text-xs font-black text-center text-gray-600 uppercase tracking-wider">Đánh giá độ thông thạo để xếp lịch học:</p>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => {
                      handleUpdateReview(fcQueue[currentFcIndex].id, 0);
                      setFcFlipped(false);
                      setCurrentFcIndex((prev) => prev + 1);
                    }}
                    className="py-2.5 px-1 bg-red-50 hover:bg-red-100 border-2 border-[#1A1A1A] rounded-xl text-[11px] font-bold text-red-700 flex flex-col items-center justify-center transition-all"
                  >
                    <span>😰 Quên</span>
                    <span className="text-[8px] text-gray-400 mt-0.5">Học lại</span>
                  </button>
                  <button
                    onClick={() => {
                      handleUpdateReview(fcQueue[currentFcIndex].id, 1);
                      setFcFlipped(false);
                      setCurrentFcIndex((prev) => prev + 1);
                    }}
                    className="py-2.5 px-1 bg-orange-50 hover:bg-orange-100 border-2 border-[#1A1A1A] rounded-xl text-[11px] font-bold text-orange-700 flex flex-col items-center justify-center transition-all"
                  >
                    <span>🤔 Khó</span>
                    <span className="text-[8px] text-gray-400 mt-0.5">3 ngày sau</span>
                  </button>
                  <button
                    onClick={() => {
                      handleUpdateReview(fcQueue[currentFcIndex].id, 2);
                      setFcFlipped(false);
                      setCurrentFcIndex((prev) => prev + 1);
                    }}
                    className="py-2.5 px-1 bg-green-50 hover:bg-green-100 border-2 border-[#1A1A1A] rounded-xl text-[11px] font-bold text-green-700 flex flex-col items-center justify-center transition-all"
                  >
                    <span>👍 Tốt</span>
                    <span className="text-[8px] text-gray-400 mt-0.5">7 ngày sau</span>
                  </button>
                  <button
                    onClick={() => {
                      handleUpdateReview(fcQueue[currentFcIndex].id, 3);
                      setFcFlipped(false);
                      setCurrentFcIndex((prev) => prev + 1);
                    }}
                    className="py-2.5 px-1 bg-blue-50 hover:bg-blue-100 border-2 border-[#1A1A1A] rounded-xl text-[11px] font-bold text-blue-700 flex flex-col items-center justify-center transition-all"
                  >
                    <span>🚀 Dễ</span>
                    <span className="text-[8px] text-gray-400 mt-0.5">14 ngày sau</span>
                  </button>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => {
                      playSound.click();
                      setFcFlipped(false);
                      setCurrentFcIndex((prev) => (prev + 1) % fcQueue.length);
                    }}
                    className="text-xs font-bold text-gray-500 hover:text-[#1A1A1A] flex items-center gap-1"
                  >
                    ⏭ Bỏ qua
                  </button>
                  <button
                    onClick={() => {
                      playSound.click();
                      setFcFlipped(false);
                      setCurrentFcIndex(0);
                    }}
                    className="text-xs font-bold text-gray-500 hover:text-[#1A1A1A] flex items-center gap-1"
                  >
                    🔄 Bắt đầu lại
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-12 px-6 text-center bg-white border-4 border-[#1A1A1A] rounded-3xl shadow-[6px_6px_0px_#1A1A1A] space-y-4">
              <Award className="w-16 h-16 text-[#8B0000] mx-auto animate-bounce" />
              <h4 className="text-xl font-black" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                Chúc mừng cao thủ!
              </h4>
              <p className="text-sm text-gray-600 font-medium leading-relaxed">
                Bạn đã giải quyết sạch sẽ các chữ Hán tự trong hàng đợi hôm nay. Hãy quay lại vào ngày mai để ôn tập theo thuật toán thông minh SRS.
              </p>
              <button
                onClick={() => {
                  playSound.click();
                  setFcQueue(KANJI_N5_DATA);
                  setCurrentFcIndex(0);
                  setFcFlipped(false);
                }}
                className="py-2.5 px-6 bg-[#1A1A1A] hover:bg-[#8B0000] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all"
              >
                Ôn toàn bộ 50 chữ hán
              </button>
            </div>
          )}
        </div>
      )}

      {/* --- Tab Content: Quiz --- */}
      {activeTab === "quiz" && quizCurrent && (
        <div className="max-w-md mx-auto space-y-6 animate-fadeIn">
          <div className="bg-white p-6 border-4 border-[#1A1A1A] rounded-3xl shadow-[6px_6px_0px_#1A1A1A] text-center space-y-4">
            <div className="flex justify-between items-center text-xs font-bold text-gray-500">
              <span>TRẮC NGHIỆM CHỚP NHOÁNG</span>
              <span className="text-[#8B0000]">Tỷ lệ đúng: {quizScore.correct}/{quizScore.total}</span>
            </div>

            <div className="py-8">
              <div className="text-9xl font-black text-[#1A1A1A] font-serif mb-2 select-none animate-pulse">
                {quizCurrent.kanji}
              </div>
              <p className="text-sm text-gray-500 font-black">Nghĩa của chữ hán tự này là gì?</p>
            </div>

            <div className="space-y-3">
              {quizCurrent.options.map((opt, idx) => {
                const correctMeaning = KANJI_N5_DATA.find((k) => k.id === quizCurrent?.correctId)?.meaning;
                let btnStyle = "bg-white hover:bg-gray-50 text-[#1A1A1A] border-[#1A1A1A]";
                
                if (quizCurrent.answered) {
                  if (opt === correctMeaning) {
                    btnStyle = "bg-green-100 text-green-800 border-green-600 scale-[1.02] shadow-[2px_2px_0px_#155724]";
                  } else if (quizCurrent.selectedOption === opt) {
                    btnStyle = "bg-red-100 text-red-800 border-red-600 opacity-80";
                  } else {
                    btnStyle = "bg-white text-gray-400 border-gray-200 opacity-60";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={quizCurrent.answered}
                    onClick={() => handleQuizAnswer(opt)}
                    className={`w-full py-3 px-4 border-2 rounded-xl text-left font-black transition-all text-sm sm:text-base flex justify-between items-center ${btnStyle}`}
                  >
                    <span>{idx + 1}. {opt}</span>
                    {quizCurrent.answered && opt === correctMeaning && <Check className="w-4 h-4 text-green-600" />}
                  </button>
                );
              })}
            </div>
            
            <div className="pt-2 text-xs font-bold text-gray-400">
              *Trả lời đúng sẽ tự động lưu vào danh sách "Đã học" của bạn.
            </div>
          </div>
        </div>
      )}

      {/* --- Tab Content: Handwriting Luyện Viết --- */}
      {activeTab === "write" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start animate-fadeIn">
          {/* Controls column */}
          <div className="md:col-span-4 bg-white p-6 border-4 border-[#1A1A1A] rounded-3xl shadow-[6px_6px_0px_#1A1A1A] space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest block">Chọn Hán tự luyện viết</label>
              <select
                value={selectedWriteId}
                onChange={(e) => {
                  setSelectedWriteId(parseInt(e.target.value));
                  setCanvasEvalMsg(null);
                  handleClearCanvas();
                }}
                className="w-full px-3 py-2.5 border-2 border-[#1A1A1A] rounded-xl text-sm font-black focus:outline-none focus:border-[#8B0000] bg-white cursor-pointer"
              >
                {KANJI_N5_DATA.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.kanji} - {k.hanviet} ({k.meaning})
                  </option>
                ))}
              </select>
            </div>

            {/* Micro Details card */}
            {(() => {
              const currentObj = KANJI_N5_DATA.find((k) => k.id === selectedWriteId);
              if (!currentObj) return null;
              return (
                <div className="p-4 bg-[#FFFDF6] border-2 border-[#1A1A1A] rounded-xl text-xs space-y-2 font-sans font-semibold">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Số nét chuẩn:</span>
                    <span className="text-[#8B0000] font-black">{currentObj.strokes} nét</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Bộ thủ chính:</span>
                    <span className="text-[#1A1A1A] font-black">{currentObj.radical} ({currentObj.radicalMeaning})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Âm On:</span>
                    <span className="text-gray-700">{currentObj.on}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Âm Kun:</span>
                    <span className="text-gray-700">{currentObj.kun || "—"}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 text-[11px] text-gray-500 italic">
                    💡 Mẹo nhớ: {currentObj.mnemonic}
                  </div>
                </div>
              );
            })()}

            {/* Custom Brush Customizer Panel */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <button 
                onClick={() => {
                  playSound.click();
                  setShowCanvasMenu(!showCanvasMenu);
                }}
                className="w-full py-2 bg-gray-50 hover:bg-gray-100 border-2 border-[#1A1A1A] rounded-xl text-xs font-black flex items-center justify-center gap-2"
              >
                <Sliders className="w-4 h-4 text-gray-600" />
                Cài đặt nét bút
              </button>

              {showCanvasMenu && (
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-3 animate-slideDown">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-600">Màu mực vẽ:</span>
                    <div className="flex gap-1.5">
                      {["#2c2416", "#8B0000", "#1E3A8A", "#15803D"].map((color) => (
                        <button
                          key={color}
                          onClick={() => setBrushColor(color)}
                          style={{ backgroundColor: color }}
                          className={`w-6 h-6 rounded-full border-2 transition-transform ${brushColor === color ? "border-black scale-110" : "border-transparent"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-gray-600">
                      <span>Độ rộng nét mực:</span>
                      <span>{brushSize}px</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="12"
                      value={brushSize}
                      onChange={(e) => setBrushSize(parseInt(e.target.value))}
                      className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#8B0000]"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Canvas column */}
          <div className="md:col-span-8 flex flex-col items-center gap-4">
            <div className="bg-white p-4 border-4 border-[#1A1A1A] rounded-3xl shadow-[6px_6px_0px_#1A1A1A] w-full max-w-[380px] sm:max-w-md">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Hộp Cát Tập Viết</span>
                <div className="flex gap-1.5">
                  <button
                    onClick={handleUndoCanvas}
                    disabled={canvasHistory.length === 0}
                    className="px-2.5 py-1 text-[10px] font-bold border-2 border-[#1A1A1A] bg-white rounded-lg disabled:opacity-50"
                  >
                    Hoàn tác
                  </button>
                  <button
                    onClick={handleClearCanvas}
                    className="px-2.5 py-1 text-[10px] font-bold border-2 border-[#1A1A1A] bg-white hover:bg-red-50 rounded-lg"
                  >
                    Xóa sạch
                  </button>
                </div>
              </div>

              {/* HTML5 Canvas container */}
              <div className="relative border-4 border-[#1A1A1A] rounded-2xl overflow-hidden bg-[#FAF6EE] aspect-square w-full">
                {/* Traditional cross guidelines */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-full h-0 border-t border-dashed border-gray-300"></div>
                </div>
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="h-full w-0 border-l border-dashed border-gray-300"></div>
                </div>

                <canvas
                  ref={canvasRef}
                  width={380}
                  height={380}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-full block cursor-crosshair touch-none"
                />
              </div>

              {/* Bottom Canvas Utilities */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                <button
                  onClick={handleShowTemplate}
                  className="py-2.5 bg-white hover:bg-gray-100 border-2 border-[#1A1A1A] text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1 shadow-[2px_2px_0px_#1A1A1A]"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Gợi ý mẫu
                </button>
                <button
                  onClick={evaluateHandwriting}
                  className="py-2.5 bg-[#8B0000] hover:bg-[#a00000] text-white border-2 border-[#1A1A1A] text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-[2px_2px_0px_#1A1A1A]"
                >
                  Đánh giá
                </button>
                <button
                  onClick={() => {
                    playSound.click();
                    const nextId = (selectedWriteId % 50) + 1;
                    setSelectedWriteId(nextId);
                    setCanvasEvalMsg(null);
                    handleClearCanvas();
                  }}
                  className="py-2.5 bg-white hover:bg-gray-100 border-2 border-[#1A1A1A] text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1 shadow-[2px_2px_0px_#1A1A1A]"
                >
                  Kế tiếp
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Evaluation Result Alert */}
            {canvasEvalMsg && (
              <div className={`p-4 border-2 border-[#1A1A1A] rounded-2xl w-full max-w-[380px] sm:max-w-md text-xs font-bold font-sans flex items-center gap-2 animate-fadeIn ${canvasEvalMsg.success ? "bg-green-50 text-green-800 border-green-600" : "bg-red-50 text-red-800 border-red-600"}`}>
                <Info className="w-4 h-4 flex-shrink-0" />
                <p>{canvasEvalMsg.text}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- Kanji Detailed Modal --- */}
      {selectedKanji && (
        <div className="fixed inset-0 z-50 bg-[#1A1A1A]/60 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border-4 border-[#1A1A1A] rounded-3xl p-6 max-w-lg w-full shadow-[8px_8px_0px_#8B0000] relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                playSound.click();
                setSelectedKanji(null);
              }}
              className="absolute top-4 right-4 text-2xl font-black text-gray-500 hover:text-black hover:scale-110 transition-transform"
            >
              &times;
            </button>

            <div className="text-center mb-6 pt-4">
              <div className="text-8xl font-black text-[#1A1A1A] font-serif mb-2">{selectedKanji.kanji}</div>
              <div className="text-xl font-black text-[#8B0000] tracking-widest uppercase">{selectedKanji.hanviet}</div>
              <div className="text-sm font-semibold text-gray-500 mt-1">Ý nghĩa: {selectedKanji.meaning}</div>
            </div>

            <div className="space-y-4 text-sm font-semibold text-gray-700">
              <div className="grid grid-cols-2 gap-4 border-b border-gray-100 pb-3">
                <div>
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-0.5">Onyomi</span>
                  <span className="text-base font-black text-[#1A1A1A]">{selectedKanji.on}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-0.5">Kunyomi</span>
                  <span className="text-base font-black text-[#1A1A1A]">{selectedKanji.kun || "—"}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-b border-gray-100 pb-3">
                <div>
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-0.5">Bộ thủ chính</span>
                  <span className="text-base font-black text-[#1A1A1A]">{selectedKanji.radical} ({selectedKanji.radicalMeaning})</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-0.5">Số nét</span>
                  <span className="text-base font-black text-[#1A1A1A]">{selectedKanji.strokes} nét viết</span>
                </div>
              </div>

              <div>
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-1">Ví dụ minh họa</span>
                <div className="bg-gray-50 p-3.5 border-2 border-[#1A1A1A] rounded-2xl space-y-2 font-sans max-h-[140px] overflow-y-auto">
                  {selectedKanji.examples.map((ex, i) => (
                    <div key={i} className="text-xs font-black text-gray-700">{ex}</div>
                  ))}
                </div>
              </div>

              <div className="bg-[#FFFDF6] p-4 border border-[#1A1A1A] rounded-2xl italic">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block not-italic mb-1">Mẹo nhớ nhanh:</span>
                " {selectedKanji.mnemonic} "
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  playSound.achievement();
                  markLearned(selectedKanji.id);
                  setSelectedKanji(null);
                }}
                className="flex-1 py-3 bg-[#8B0000] hover:bg-[#a00000] text-white border-2 border-[#1A1A1A] font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-[3px_3px_0px_#1A1A1A] text-center"
              >
                Đánh dấu đã học thành công
              </button>
              <button
                onClick={() => {
                  playSound.click();
                  setSelectedWriteId(selectedKanji.id);
                  handleTabChange("write");
                  setSelectedKanji(null);
                }}
                className="py-3 px-4 bg-white hover:bg-gray-50 text-[#1A1A1A] border-2 border-[#1A1A1A] font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-[3px_3px_0px_#1A1A1A]"
              >
                Luyện viết chữ này ✍️
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Traditional Footer design */}
      <div className="border-t-2 border-[#1A1A1A] pt-8 pb-4 mt-12 text-center space-y-1.5 opacity-80">
        <p className="font-black text-base tracking-widest uppercase" style={{ fontFamily: "'Noto Serif JP', serif" }}>
          LỚP HỌC THẦY SƠN
        </p>
        <p className="text-gray-500 text-[10px] italic font-bold">
          Chinh phục Hán Tự - Đập tan mù chữ - Nắm trọn tiếng Nhật!
        </p>
      </div>
    </div>
  );
}
