import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { playSound } from "../utils/audio";
import { 
  ArrowLeft, 
  BookOpen, 
  RotateCcw, 
  Eye, 
  EyeOff, 
  PenTool, 
  Layers, 
  HelpCircle, 
  FileText, 
  BarChart2, 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  Settings, 
  CheckCircle2, 
  XCircle, 
  Award, 
  AlertTriangle,
  Volume2
} from "lucide-react";

interface AlphabetLessonsProps {
  onGoBack: () => void;
}

interface AlphabetRow {
  id: string;
  h: (string | null)[];
  k: (string | null)[];
  r: (string | null)[];
}

interface FlatKana {
  h: string;
  k: string;
  r: string;
}

interface TestHistoryRecord {
  id: number;
  date: string;
  score: number;
  total: number;
  percentage: number;
  details: {
    char: string;
    r: string;
    kanaType: string;
    charType: string;
    isCorrect: boolean;
  }[];
}

const seionData: AlphabetRow[] = [
  { id: "a",  h: ["あ","い","う","え","お"], k: ["ア","イ","ウ","エ","オ"], r: ["a","i","u","e","o"] },
  { id: "ka", h: ["か","き","く","け","こ"], k: ["カ","キ","ク","ケ","コ"], r: ["ka","ki","ku","ke","ko"] },
  { id: "sa", h: ["さ","し","す","せ","そ"], k: ["サ","シ","ス","セ","ソ"], r: ["sa","shi","su","se","so"] },
  { id: "ta", h: ["た","ち","つ","て","と"], k: ["タ","チ","ツ","テ","ト"], r: ["ta","chi","tsu","te","to"] },
  { id: "na", h: ["な","に","ぬ","ね","の"], k: ["ナ","ニ","ヌ","ネ","ノ"], r: ["na","ni","nu","ne","no"] }, // Fixed the auto-translation "của" -> "の"
  { id: "ha", h: ["は","ひ","ふ","へ","ほ"], k: ["ハ","ヒ","フ","ヘ","ホ"], r: ["ha","hi","fu","he","ho"] },
  { id: "ma", h: ["ま","み","む","め","も"], k: ["マ","ミ","ム","メ","モ"], r: ["ma","mi","mu","me","mo"] },
  { id: "ya", h: ["や",null,"ゆ",null,"よ"], k: ["ヤ",null,"ユ",null,"ヨ"], r: ["ya",null,"yu",null,"yo"] },
  { id: "ra", h: ["ら","り","る","れ","ろ"], k: ["ラ","リ","ル","レ","ロ"], r: ["ra","ri","ru","re","ro"] },
  { id: "wa", h: ["わ",null,null,null,"を"], k: ["ワ",null,null,null,"ヲ"], r: ["wa",null,null,null,"wo"] },
  { id: "n",  h: ["ん",null,null,null,null], k: ["ン",null,null,null,null], r: ["n",null,null,null,null] }
];

const dakuonData: AlphabetRow[] = [
  { id: "ga", h: ["が","ぎ","ぐ","げ","ご"], k: ["ガ","ギ","グ","ゲ","ゴ"], r: ["ga","gi","gu","ge","go"] },
  { id: "za", h: ["ざ","じ","ず","ぜ","ぞ"], k: ["ザ","ジ","ズ","ゼ","ゾ"], r: ["za","ji","zu","ze","zo"] },
  { id: "da", h: ["だ","ぢ","づ","で","ど"], k: ["ダ","ヂ","ヅ","デ","ド"], r: ["da","ji","zu","de","do"] },
  { id: "ba", h: ["ば","び","ぶ","べ","ぼ"], k: ["バ","ビ","ブ","ベ","ボ"], r: ["ba","bi","bu","be","bo"] },
  { id: "pa", h: ["ぱ","ぴ","ぷ","ぺ","ぽ"], k: ["パ","ピ","プ","ペ","ポ"], r: ["pa","pi","pu","pe","po"] }
];

const yoonData: AlphabetRow[] = [
  { id: "kya", h: ["きゃ","きゅ","きょ"], k: ["キャ","キュ","キョ"], r: ["kya","kyu","kyo"] },
  { id: "sha", h: ["しゃ","しゅ","しょ"], k: ["シャ","シュ","ショ"], r: ["sha","shu","sho"] },
  { id: "cha", h: ["ちゃ","ちゅ","ちょ"], k: ["チャ","チュ","チョ"], r: ["cha","chu","cho"] },
  { id: "nya", h: ["にゃ","にゅ","にょ"], k: ["ニャ","ニュ","ニョ"], r: ["nya","nyu","nyo"] },
  { id: "hya", h: ["ひゃ","ひゅ","ひょ"], k: ["ヒャ","ヒュ","ヒョ"], r: ["hya","hyu","hyo"] },
  { id: "mya", h: ["みゃ","みゅ","みょ"], k: ["ミャ","ミュ","ミョ"], r: ["mya","myu","myo"] },
  { id: "rya", h: ["りゃ","りゅ","りょ"], k: ["リャ","リュ","リョ"], r: ["rya","ryu","ryo"] }, // Fixed the typo 'りょ' -> 'リョ'
  { id: "gya", h: ["ぎゃ","ぎゅ","ぎょ"], k: ["ギャ","ギュ","ギョ"], r: ["gya","gyu","gyo"] },
  { id: "ja",  h: ["じゃ","じゅ","じょ"], k: ["ジャ","ジュ","ジョ"], r: ["ja","ju","jo"] },
  { id: "bya", h: ["びゃ","びゅ","びょ"], k: ["ビャ","ビュ","ビョ"], r: ["bya","byu","byo"] },
  { id: "pya", h: ["ぴゃ","ぴゅ","ぴょ"], k: ["ピャ","ピュ","ピョ"], r: ["pya","pyu","pyo"] } // Fixed typo 'pya' -> 'pyo'
];

const flatKanaList: FlatKana[] = [];
[seionData, dakuonData, yoonData].forEach((dataSet) => {
  dataSet.forEach((row) => row.r.forEach((romaji, index) => {
    const hiragana = row.h[index];
    const katakana = row.k[index];
    if (romaji && hiragana && katakana) {
      flatKanaList.push({ h: hiragana, k: katakana, r: romaji });
    }
  }));
});

interface DrawingPadProps {
  char: string;
}

const DrawingPad = ({ char }: DrawingPadProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    clearCanvas();
  }, [char]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const getCoordinates = (e: MouseEvent | TouchEvent | Touch | React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    if ("touches" in e) {
      if (e.touches && e.touches.length > 0) {
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        };
      }
    } else if ("clientX" in e) {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
    
    return { x: 0, y: 0 };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const touchOrMouse = "touches" in e ? e.touches[0] : e;
    const { x, y } = getCoordinates(touchOrMouse);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing) return;
    const touchOrMouse = "touches" in e ? e.touches[0] : e;
    const { x, y } = getCoordinates(touchOrMouse);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.lineTo(x, y);
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 14;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.closePath();
      setIsDrawing(false);
    }
  };

  const bgFontSize = char && char.length > 1 ? "100px" : "180px";

  return (
    <div className="relative w-full aspect-square max-w-[280px] mx-auto bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl overflow-hidden touch-none flex items-center justify-center">
      <div 
        className="absolute inset-0 flex items-center justify-center text-slate-200 select-none pointer-events-none" 
        style={{ fontSize: bgFontSize, fontFamily: "'Noto Serif JP', serif", lineHeight: 1 }}
      >
        {char}
      </div>
      <canvas
        ref={canvasRef}
        width={280}
        height={280}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className="absolute inset-0 z-10 w-full h-full cursor-crosshair"
      />
      <button 
        onClick={clearCanvas} 
        className="absolute bottom-3 right-3 z-20 p-3 bg-white text-slate-500 rounded-full shadow-md hover:text-red-500 hover:scale-105 transition-all cursor-pointer" 
        title="Xóa để viết lại"
      >
        <RotateCcw className="w-5 h-5" />
      </button>
    </div>
  );
};

export default function AlphabetLessons({ onGoBack }: AlphabetLessonsProps) {
  const [activeMainTab, setActiveMainTab] = useState("hiragana");
  const [pendingTab, setPendingTab] = useState<string | null>(null);

  // Học
  const [readSubTab, setReadSubTab] = useState("seion");
  const [showRomaji, setShowRomaji] = useState(true);

  // Luyện Viết
  const [writeKanaTab, setWriteKanaTab] = useState("hiragana");
  const [writeSubTab, setWriteSubTab] = useState("seion");
  const [selectedWriteChar, setSelectedWriteChar] = useState<{ char: string; r: string } | null>(null);

  // Thẻ Ghi Nhớ (Flashcard)
  const [flashcardConfig, setFlashcardConfig] = useState({ hiragana: true, katakana: false, seion: true, dakuon: false, yoon: false });
  interface FlashcardItem {
    char: string;
    r: string;
    kanaType: string;
    charType: string;
  }
  const [flashcardPool, setFlashcardPool] = useState<FlashcardItem[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Luyện Tập (Quiz)
  const [quizConfig, setQuizConfig] = useState({ hiragana: true, katakana: false, seion: true, dakuon: false, yoon: false });
  const [currentQuestion, setCurrentQuestion] = useState<FlashcardItem | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [totalAttempted, setTotalAttempted] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // Kiểm tra (Exam)
  const [examConfig, setExamConfig] = useState({ hiragana: true, katakana: true, seion: true, dakuon: true, yoon: true });
  interface ExamQuestion extends FlashcardItem {
    options: string[];
  }
  interface ExamState {
    isRunning: boolean;
    questions: ExamQuestion[];
    currentIndex: number;
    score: number;
    answersLog: {
      char: string;
      r: string;
      kanaType: string;
      charType: string;
      isCorrect: boolean;
    }[];
  }
  const [examState, setExamState] = useState<ExamState>({ isRunning: false, questions: [], currentIndex: 0, score: 0, answersLog: [] });
  const [examSelectedAnswer, setExamSelectedAnswer] = useState<string | null>(null);

  // Lịch sử kết quả
  const [testHistory, setTestHistory] = useState<TestHistoryRecord[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sk_test_history");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Lưu lịch sử
  useEffect(() => {
    localStorage.setItem("sk_test_history", JSON.stringify(testHistory));
  }, [testHistory]);

  const playAudio = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const getQuizPool = useCallback((config: { hiragana: boolean; katakana: boolean; seion: boolean; dakuon: boolean; yoon: boolean }) => {
    const pool: FlashcardItem[] = [];
    const addData = (dataSet: AlphabetRow[], charType: string) => {
      dataSet.forEach((row) => {
        row.r.forEach((romaji, index) => {
          if (romaji) {
            const hChar = row.h[index];
            const kChar = row.k[index];
            if (config.hiragana && hChar) {
              pool.push({ char: hChar, r: romaji, kanaType: "hiragana", charType });
            }
            if (config.katakana && kChar) {
              pool.push({ char: kChar, r: romaji, kanaType: "katakana", charType });
            }
          }
        });
      });
    };

    if (config.seion) addData(seionData, "seion");
    if (config.dakuon) addData(dakuonData, "dakuon");
    if (config.yoon) addData(yoonData, "yoon");
    return pool;
  }, []);

  // Sync Flashcards config
  useEffect(() => {
    if (activeMainTab === "flashcard") {
      const pool = getQuizPool(flashcardConfig);
      setFlashcardPool(pool);
      setCurrentCardIndex(0);
      setIsFlipped(false);
    }
  }, [activeMainTab, flashcardConfig, getQuizPool]);

  const handleFlashcardToggleConfig = (key: "hiragana" | "katakana" | "seion" | "dakuon" | "yoon") => {
    setFlashcardConfig((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      if (!next.hiragana && !next.katakana) next.hiragana = true;
      if (!next.seion && !next.dakuon && !next.yoon) next.seion = true;
      return next;
    });
  };

  const nextFlashcard = () => {
    if (flashcardPool.length === 0) return;
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev + 1) % flashcardPool.length);
    }, 150);
  };

  const prevFlashcard = () => {
    if (flashcardPool.length === 0) return;
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev - 1 + flashcardPool.length) % flashcardPool.length);
    }, 150);
  };

  const shuffleFlashcards = () => {
    if (flashcardPool.length === 0) return;
    setIsFlipped(false);
    setTimeout(() => {
      setFlashcardPool((prev) => [...prev].sort(() => Math.random() - 0.5));
      setCurrentCardIndex(0);
    }, 150);
  };

  const flipCard = () => {
    const nextFlippedState = !isFlipped;
    setIsFlipped(nextFlippedState);
    if (nextFlippedState && flashcardPool[currentCardIndex]) {
      playAudio(flashcardPool[currentCardIndex].char);
    }
  };

  // Load Quiz questions
  const loadNextQuizQuestion = useCallback((config: typeof quizConfig) => {
    const pool = getQuizPool(config);
    if (pool.length === 0) return;

    const qIndex = Math.floor(Math.random() * pool.length);
    const question = pool[qIndex];

    const wrongOptions = new Set<string>();
    while (wrongOptions.size < 3) {
      const randRomaji = flatKanaList[Math.floor(Math.random() * flatKanaList.length)].r;
      if (randRomaji !== question.r) {
        wrongOptions.add(randRomaji);
      }
    }

    const allOptions = [...wrongOptions, question.r].sort(() => Math.random() - 0.5);
    setCurrentQuestion(question);
    setOptions(allOptions);
    setSelectedAnswer(null);
  }, [getQuizPool]);

  // Sync Quiz
  useEffect(() => {
    if (activeMainTab === "quiz") {
      loadNextQuizQuestion(quizConfig);
      setScore(0);
      setTotalAttempted(0);
    }
  }, [activeMainTab, quizConfig, loadNextQuizQuestion]);

  const handleToggleConfig = (key: "hiragana" | "katakana" | "seion" | "dakuon" | "yoon", isExam = false) => {
    if (!isExam && selectedAnswer !== null) return;
    const setConfig = isExam ? setExamConfig : setQuizConfig;
    setConfig((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      if (!next.hiragana && !next.katakana) next.hiragana = true;
      if (!next.seion && !next.dakuon && !next.yoon) next.seion = true;
      return next;
    });
  };

  const handleQuizAnswer = (ans: string) => {
    if (selectedAnswer || !currentQuestion) return;
    setSelectedAnswer(ans);
    if (ans === currentQuestion.r) {
      setScore((s) => s + 1);
      playAudio(currentQuestion.char);
    }
    setTotalAttempted((t) => t + 1);
    setTimeout(() => loadNextQuizQuestion(quizConfig), 1200);
  };

  const EXAM_TOTAL_QUESTIONS = 20;

  const startExam = () => {
    const pool = getQuizPool(examConfig);
    if (pool.length < 5) return;

    const shuffledPool = [...pool].sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffledPool.slice(0, Math.min(EXAM_TOTAL_QUESTIONS, pool.length));

    const questionsWithOptions = selectedQuestions.map((q) => {
      const wrongOptions = new Set<string>();
      while (wrongOptions.size < 3) {
        const randRomaji = flatKanaList[Math.floor(Math.random() * flatKanaList.length)].r;
        if (randRomaji !== q.r) {
          wrongOptions.add(randRomaji);
        }
      }
      return {
        ...q,
        options: [...wrongOptions, q.r].sort(() => Math.random() - 0.5)
      };
    });

    setExamState({
      isRunning: true,
      questions: questionsWithOptions,
      currentIndex: 0,
      score: 0,
      answersLog: []
    });
    setExamSelectedAnswer(null);
  };

  const finishExam = (finalScore: number, totalQs: number, finalLog: ExamState["answersLog"]) => {
    const percentage = Math.round((finalScore / totalQs) * 100);
    const newRecord: TestHistoryRecord = {
      id: Date.now(),
      date: new Date().toLocaleDateString("vi-VN") + " " + new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
      score: finalScore,
      total: totalQs,
      percentage: percentage,
      details: finalLog
    };

    setTestHistory((prev) => [newRecord, ...prev]);
    setExamState({ isRunning: false, questions: [], currentIndex: 0, score: 0, answersLog: [] });
    setExamSelectedAnswer(null);
    setActiveMainTab("dashboard");
  };

  const handleExamAnswer = (ans: string) => {
    if (examSelectedAnswer) return;
    setExamSelectedAnswer(ans);

    const currentQ = examState.questions[examState.currentIndex];
    const isCorrect = ans === currentQ.r;

    if (isCorrect) {
      playAudio(currentQ.char);
    }

    const newScore = examState.score + (isCorrect ? 1 : 0);
    const newLog = [...examState.answersLog, { ...currentQ, isCorrect }];

    setTimeout(() => {
      if (examState.currentIndex + 1 < examState.questions.length) {
        setExamState((prev) => ({
          ...prev,
          currentIndex: prev.currentIndex + 1,
          score: newScore,
          answersLog: newLog
        }));
        setExamSelectedAnswer(null);
      } else {
        finishExam(newScore, examState.questions.length, newLog);
      }
    }, 1000);
  };

  const confirmExitExam = () => {
    setExamState((prev) => ({ ...prev, isRunning: false }));
    if (pendingTab) {
      setActiveMainTab(pendingTab);
    }
    setPendingTab(null);
  };

  const masteryStats = useMemo(() => {
    const stats = {
      hiragana: { correct: 0, total: 0 },
      katakana: { correct: 0, total: 0 },
      seion: { correct: 0, total: 0 },
      dakuon: { correct: 0, total: 0 },
      yoon: { correct: 0, total: 0 }
    };

    testHistory.forEach((test) => {
      if (test.details && Array.isArray(test.details)) {
        test.details.forEach((ans) => {
          if (ans.kanaType === "hiragana" || ans.kanaType === "katakana") {
            stats[ans.kanaType].total += 1;
            if (ans.isCorrect) stats[ans.kanaType].correct += 1;
          }
          if (ans.charType === "seion" || ans.charType === "dakuon" || ans.charType === "yoon") {
            stats[ans.charType].total += 1;
            if (ans.isCorrect) stats[ans.charType].correct += 1;
          }
        });
      }
    });

    const getPercent = (stat: { correct: number; total: number }) => {
      return stat.total === 0 ? 0 : Math.round((stat.correct / stat.total) * 100);
    };

    return {
      hiragana: { ...stats.hiragana, percent: getPercent(stats.hiragana) },
      katakana: { ...stats.katakana, percent: getPercent(stats.katakana) },
      seion: { ...stats.seion, percent: getPercent(stats.seion) },
      dakuon: { ...stats.dakuon, percent: getPercent(stats.dakuon) },
      yoon: { ...stats.yoon, percent: getPercent(stats.yoon) }
    };
  }, [testHistory]);

  const getAdvice = (percent: number) => {
    if (percent >= 90) return "Tuyệt vời! Sensei rất tự hào. Bạn đã nắm cực kỳ vững mặt chữ. Hãy tự tin tiến tới các bài học ngữ pháp nhé!";
    if (percent >= 70) return "Khá tốt! Bạn đã thuộc phần lớn bảng chữ. Cố gắng luyện viết thêm những chữ bị nhầm để đạt độ hoàn hảo nhé.";
    if (percent >= 50) return "Bạn đang tiến bộ, nhưng vẫn còn nhầm lẫn một số nét. Đừng nản chí, hãy dùng tab Luyện Viết mỗi ngày 15 phút là sẽ ổn thôi!";
    return "Sensei hiểu học bảng chữ cái khá vất vả ban đầu. Hãy kiên nhẫn chia nhỏ ra học từng hàng chữ, kết hợp luyện viết thường xuyên nhé. Cố lên!";
  };

  const renderGrid = (
    data: AlphabetRow[], 
    kanaKey: "h" | "k", 
    isYoon: boolean, 
    onCardClick: (char: string, romaji: string) => void, 
    isWritingTab = false
  ) => {
    const cols = isYoon ? "grid-cols-3" : "grid-cols-5";
    return (
      <div className="flex flex-col gap-3 max-w-4xl mx-auto w-full">
        {data.map((row) => (
          <div key={row.id} className={`grid ${cols} gap-3`}>
            {row.r.map((romaji, idx) => {
              const char = row[kanaKey][idx];
              if (!char || !romaji) return <div key={`${row.id}-${idx}`} className="opacity-0"></div>;
              return (
                <button
                  key={`${row.id}-${idx}`}
                  onClick={() => onCardClick(char, romaji)}
                  className="group relative flex flex-col items-center justify-center p-3 sm:p-4 bg-white border border-slate-200 hover:border-red-400 hover:bg-red-50/50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 aspect-square cursor-pointer"
                >
                  <span className="text-3xl sm:text-4xl font-black text-slate-800 mb-1 group-hover:text-red-600 transition-colors" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                    {char}
                  </span>
                  <span className={`text-xs sm:text-sm font-black text-slate-400 uppercase tracking-widest transition-opacity duration-300 ${showRomaji ? "opacity-100" : "opacity-0"}`}>
                    {romaji}
                  </span>
                  
                  {isWritingTab ? (
                    <PenTool className="w-3.5 h-3.5 absolute top-2.5 right-2.5 text-slate-300 group-hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 absolute top-2.5 right-2.5 text-slate-300 group-hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  const renderProgressBar = (label: string, stat: { percent: number; correct: number; total: number }) => {
    if (stat.total === 0) return null;
    const color = stat.percent >= 80 ? "bg-green-500" : stat.percent >= 50 ? "bg-yellow-500" : "bg-red-500";
    return (
      <div className="mb-4">
        <div className="flex justify-between text-xs font-bold mb-1 text-slate-600">
          <span>{label}</span>
          <span>{stat.percent}% <span className="text-slate-400 font-normal">({stat.correct}/{stat.total})</span></span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2">
          <div className={`${color} h-2 rounded-full transition-all duration-500`} style={{ width: `${stat.percent}%` }}></div>
        </div>
      </div>
    );
  };

  return (
    <div className="washi-pattern min-h-screen p-4 sm:p-8 -mx-4 sm:-mx-8 rounded-[40px] border-2 border-[#1A1A1A] text-[#1A1A1A]" style={{ fontFamily: "'Lora', 'Noto Serif JP', serif" }}>
      {/* Navigation Sub-bar */}
      <div className="flex flex-col xl:flex-row justify-between items-center mb-8 border-b-2 border-[#1A1A1A] pb-6 gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playSound.click();
              onGoBack();
            }}
            className="p-2 border-2 border-[#1A1A1A] bg-white rounded-xl shadow-[2px_2px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none hover:text-red-600 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-9 h-9 border-2 border-[#1A1A1A] bg-[#1A1A1A] rounded flex items-center justify-center text-white font-black text-lg" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            仮
          </div>
          <span className="text-lg font-black tracking-widest text-[#1A1A1A] uppercase" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            Nhập Môn Chữ Cái
          </span>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap justify-center bg-slate-100 p-1.5 rounded-2xl gap-1 border-2 border-[#1A1A1A] max-w-full">
          {[
            { id: "hiragana", label: "Hiragana", icon: <BookOpen className="w-4 h-4" /> },
            { id: "katakana", label: "Katakana", icon: <BookOpen className="w-4 h-4" /> },
            { id: "writing", label: "Tập Viết", icon: <PenTool className="w-4 h-4" /> },
            { id: "flashcard", label: "Thẻ Nhớ", icon: <Layers className="w-4 h-4" /> },
            { id: "quiz", label: "Luyện Tập", icon: <HelpCircle className="w-4 h-4" /> },
            { id: "exam", label: "Kiểm Tra", icon: <FileText className="w-4 h-4" /> },
            { id: "dashboard", label: "Kết Quả", icon: <BarChart2 className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playSound.click();
                if (examState.isRunning && tab.id !== "exam") {
                  setPendingTab(tab.id);
                } else {
                  setActiveMainTab(tab.id);
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeMainTab === tab.id 
                  ? "bg-[#1A1A1A] text-white" 
                  : "text-[#1A1A1A] hover:bg-black/10"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Tab Contents */}
      <div className="space-y-8">
        
        {/* HIRAGANA / KATAKANA TAB */}
        {(activeMainTab === "hiragana" || activeMainTab === "katakana") && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 sm:p-5 border-2 border-[#1A1A1A] rounded-2xl gap-4 shadow-[4px_4px_0px_#1A1A1A]">
              <div className="flex gap-2 p-1 bg-slate-100 rounded-full border border-slate-200">
                {["seion", "dakuon", "yoon"].map((tab) => (
                  <button
                    key={tab} 
                    onClick={() => {
                      playSound.click();
                      setReadSubTab(tab);
                    }}
                    className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-colors cursor-pointer ${
                      readSubTab === tab 
                        ? "bg-[#1A1A1A] text-white" 
                        : "text-slate-600 hover:text-[#1A1A1A]"
                    }`}
                  >
                    {tab === "seion" ? "Cơ bản" : tab === "dakuon" ? "Âm đục" : "Âm ghép"}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => {
                  playSound.click();
                  setShowRomaji(!showRomaji);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#1A1A1A] rounded-xl text-xs font-black uppercase tracking-wider hover:bg-slate-50 transition-colors shadow-[2px_2px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
              >
                {showRomaji ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{showRomaji ? "Ẩn Romaji" : "Hiện Romaji"}</span>
              </button>
            </div>

            <div className="bg-white/45 p-6 rounded-3xl border-2 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A]">
              {readSubTab === "seion" && renderGrid(seionData, activeMainTab === "hiragana" ? "h" : "k", false, (char) => playAudio(char))}
              {readSubTab === "dakuon" && renderGrid(dakuonData, activeMainTab === "hiragana" ? "h" : "k", false, (char) => playAudio(char))}
              {readSubTab === "yoon" && renderGrid(yoonData, activeMainTab === "hiragana" ? "h" : "k", true, (char) => playAudio(char))}
            </div>
          </div>
        )}

        {/* TẬP VIẾT TAB */}
        {activeMainTab === "writing" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 sm:p-5 border-2 border-[#1A1A1A] rounded-2xl gap-4 shadow-[4px_4px_0px_#1A1A1A]">
              <div className="flex gap-2 p-1 bg-slate-100 rounded-full border border-slate-200">
                <button 
                  onClick={() => {
                    playSound.click();
                    setWriteKanaTab("hiragana");
                  }} 
                  className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider cursor-pointer ${
                    writeKanaTab === "hiragana" ? "bg-[#1A1A1A] text-white" : "text-slate-600"
                  }`}
                >
                  Hiragana
                </button>
                <button 
                  onClick={() => {
                    playSound.click();
                    setWriteKanaTab("katakana");
                  }} 
                  className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider cursor-pointer ${
                    writeKanaTab === "katakana" ? "bg-[#1A1A1A] text-white" : "text-slate-600"
                  }`}
                >
                  Katakana
                </button>
              </div>

              <div className="flex gap-2 p-1 bg-slate-100 rounded-full border border-slate-200">
                {["seion", "dakuon", "yoon"].map((tab) => (
                  <button
                    key={tab} 
                    onClick={() => {
                      playSound.click();
                      setWriteSubTab(tab);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider cursor-pointer ${
                      writeSubTab === tab ? "bg-[#1A1A1A] text-white" : "text-slate-500 hover:text-[#1A1A1A]"
                    }`}
                  >
                    {tab === "seion" ? "Cơ bản" : tab === "dakuon" ? "Âm đục" : "Âm ghép"}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white/45 p-6 rounded-3xl border-2 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A]">
              <p className="text-center text-xs font-black uppercase tracking-wider text-slate-500 mb-6 italic">
                * Click vào ký tự bất kỳ để mở bảng tập viết bằng cọ đỏ *
              </p>
              {writeSubTab === "seion" && renderGrid(seionData, writeKanaTab === "hiragana" ? "h" : "k", false, (char, r) => { playAudio(char); setSelectedWriteChar({ char, r }); }, true)}
              {writeSubTab === "dakuon" && renderGrid(dakuonData, writeKanaTab === "hiragana" ? "h" : "k", false, (char, r) => { playAudio(char); setSelectedWriteChar({ char, r }); }, true)}
              {writeSubTab === "yoon" && renderGrid(yoonData, writeKanaTab === "hiragana" ? "h" : "k", true, (char, r) => { playAudio(char); setSelectedWriteChar({ char, r }); }, true)}
            </div>
          </div>
        )}

        {/* THẺ NHỚ TAB */}
        {activeMainTab === "flashcard" && (
          <div className="max-w-md mx-auto space-y-6 animate-in fade-in zoom-in duration-300">
            <div className="bg-white rounded-2xl border-2 border-[#1A1A1A] p-5 shadow-[4px_4px_0px_#1A1A1A]">
              <div className="flex items-center gap-2 mb-3 text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
                <Settings className="w-4 h-4 text-[#8B0000]" /> Bộ lọc thẻ ghi nhớ
              </div>
              <div className="space-y-3">
                <div className="flex gap-4 border-b pb-2">
                  <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider cursor-pointer hover:text-red-600">
                    <input 
                      type="checkbox" 
                      checked={flashcardConfig.hiragana} 
                      onChange={() => handleFlashcardToggleConfig("hiragana")} 
                      className="accent-[#8B0000] w-4 h-4 cursor-pointer" 
                    />
                    <span>Hiragana</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider cursor-pointer hover:text-red-600">
                    <input 
                      type="checkbox" 
                      checked={flashcardConfig.katakana} 
                      onChange={() => handleFlashcardToggleConfig("katakana")} 
                      className="accent-[#8B0000] w-4 h-4 cursor-pointer" 
                    />
                    <span>Katakana</span>
                  </label>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider cursor-pointer hover:text-red-600">
                    <input 
                      type="checkbox" 
                      checked={flashcardConfig.seion} 
                      onChange={() => handleFlashcardToggleConfig("seion")} 
                      className="accent-[#8B0000] w-4 h-4 cursor-pointer" 
                    />
                    <span>Cơ bản</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider cursor-pointer hover:text-red-600">
                    <input 
                      type="checkbox" 
                      checked={flashcardConfig.dakuon} 
                      onChange={() => handleFlashcardToggleConfig("dakuon")} 
                      className="accent-[#8B0000] w-4 h-4 cursor-pointer" 
                    />
                    <span>Âm đục</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider cursor-pointer hover:text-red-600">
                    <input 
                      type="checkbox" 
                      checked={flashcardConfig.yoon} 
                      onChange={() => handleFlashcardToggleConfig("yoon")} 
                      className="accent-[#8B0000] w-4 h-4 cursor-pointer" 
                    />
                    <span>Âm ghép</span>
                  </label>
                </div>
              </div>
            </div>

            {flashcardPool.length > 0 ? (
              <div className="flex flex-col items-center">
                <div 
                  className="relative w-full aspect-[3/4] max-w-[320px] cursor-pointer perspective-1000"
                  onClick={flipCard}
                >
                  <div className={`w-full h-full relative transition-transform duration-500 transform-style-3d ${isFlipped ? "rotate-y-180" : ""}`}>
                    {/* Front of card */}
                    <div className="absolute w-full h-full backface-hidden bg-white rounded-3xl border-4 border-[#1A1A1A] shadow-[8px_8px_0px_#1A1A1A] flex flex-col items-center justify-center p-6">
                      <span className="text-8xl sm:text-9xl font-black text-slate-800" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                        {flashcardPool[currentCardIndex].char}
                      </span>
                      <span className="absolute bottom-6 text-slate-400 text-xs font-black uppercase tracking-widest flex items-center gap-1.5">
                        <RotateCcw className="w-3.5 h-3.5" /> Chạm để lật
                      </span>
                    </div>

                    {/* Back of card */}
                    <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-red-50/70 rounded-3xl border-4 border-[#8B0000] shadow-[8px_8px_0px_#8B0000] flex flex-col items-center justify-center p-6">
                      <span className="text-5xl sm:text-6xl font-black text-[#8B0000] mb-8 uppercase tracking-widest">
                        {flashcardPool[currentCardIndex].r}
                      </span>
                      <button 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          playAudio(flashcardPool[currentCardIndex].char); 
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-[#8B0000] text-white rounded-xl font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_#1A1A1A] hover:bg-red-700 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>Nghe phát âm</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Control Panel */}
                <div className="flex items-center justify-between w-full max-w-[320px] mt-8 bg-white px-3 py-2 border-2 border-[#1A1A1A] rounded-2xl shadow-[4px_4px_0px_#1A1A1A]">
                  <button 
                    onClick={prevFlashcard} 
                    className="p-3 text-slate-700 hover:text-[#8B0000] hover:bg-slate-100 rounded-full transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-black text-slate-700">{currentCardIndex + 1} / {flashcardPool.length}</span>
                    <button 
                      onClick={shuffleFlashcards} 
                      className="text-[10px] text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-1 font-black uppercase tracking-wider cursor-pointer"
                    >
                      <Shuffle className="w-3.5 h-3.5" /> Trộn bộ thẻ
                    </button>
                  </div>
                  <button 
                    onClick={nextFlashcard} 
                    className="p-3 text-slate-700 hover:text-[#8B0000] hover:bg-slate-100 rounded-full transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center p-10 bg-white rounded-2xl border-2 border-[#1A1A1A] text-slate-500 font-bold">
                Không tìm thấy ký tự phù hợp với cấu hình bộ lọc!
              </div>
            )}
          </div>
        )}

        {/* LUYỆN TẬP QUIZ TAB */}
        {activeMainTab === "quiz" && (
          <div className="max-w-xl mx-auto space-y-6 animate-in fade-in zoom-in duration-300">
            <div className="bg-white rounded-2xl border-2 border-[#1A1A1A] p-5 shadow-[4px_4px_0px_#1A1A1A]">
              <div className="flex items-center gap-2 mb-3 text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
                <Settings className="w-4 h-4 text-[#8B0000]" /> Cấu hình luyện tập trắc nghiệm
              </div>
              <div className="space-y-3">
                <div className="flex gap-4 border-b pb-2">
                  <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider cursor-pointer hover:text-red-600">
                    <input 
                      type="checkbox" 
                      disabled={selectedAnswer !== null} 
                      checked={quizConfig.hiragana} 
                      onChange={() => handleToggleConfig("hiragana")} 
                      className="accent-[#8B0000] w-4 h-4 cursor-pointer" 
                    />
                    <span>Hiragana</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider cursor-pointer hover:text-red-600">
                    <input 
                      type="checkbox" 
                      disabled={selectedAnswer !== null} 
                      checked={quizConfig.katakana} 
                      onChange={() => handleToggleConfig("katakana")} 
                      className="accent-[#8B0000] w-4 h-4 cursor-pointer" 
                    />
                    <span>Katakana</span>
                  </label>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider cursor-pointer hover:text-red-600">
                    <input 
                      type="checkbox" 
                      disabled={selectedAnswer !== null} 
                      checked={quizConfig.seion} 
                      onChange={() => handleToggleConfig("seion")} 
                      className="accent-[#8B0000] w-4 h-4 cursor-pointer" 
                    />
                    <span>Cơ bản</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider cursor-pointer hover:text-red-600">
                    <input 
                      type="checkbox" 
                      disabled={selectedAnswer !== null} 
                      checked={quizConfig.dakuon} 
                      onChange={() => handleToggleConfig("dakuon")} 
                      className="accent-[#8B0000] w-4 h-4 cursor-pointer" 
                    />
                    <span>Âm đục</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider cursor-pointer hover:text-red-600">
                    <input 
                      type="checkbox" 
                      disabled={selectedAnswer !== null} 
                      checked={quizConfig.yoon} 
                      onChange={() => handleToggleConfig("yoon")} 
                      className="accent-[#8B0000] w-4 h-4 cursor-pointer" 
                    />
                    <span>Âm ghép</span>
                  </label>
                </div>
              </div>
            </div>

            {currentQuestion && (
              <div className="bg-white rounded-3xl border-4 border-[#1A1A1A] p-6 sm:p-8 relative shadow-[6px_6px_0px_#1A1A1A]">
                <div className="flex flex-col items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                  <div className="text-xs font-black uppercase tracking-wider text-slate-500 bg-slate-50 border border-slate-200 px-4 py-1.5 rounded-full">
                    Ghi điểm: <span className="text-green-600">{score}</span> / {totalAttempted}
                  </div>
                  <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest text-center mt-2">
                    Romaji của chữ này là gì?
                  </h2>
                </div>

                <div className="text-8xl font-black text-slate-800 mb-8 py-4 text-center drop-shadow-sm" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                  {currentQuestion.char}
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {options.map((opt, idx) => {
                    let btnStyle = "bg-slate-50 border-slate-200 hover:border-red-400 hover:bg-red-50 text-slate-700";
                    let icon = null;

                    if (selectedAnswer !== null) {
                      if (opt === currentQuestion.r) {
                        btnStyle = "bg-green-100 border-green-500 text-green-800";
                        icon = <CheckCircle2 className="w-5 h-5 absolute right-4 text-green-600" />;
                      } else if (opt === selectedAnswer) {
                        btnStyle = "bg-red-100 border-red-500 text-red-800";
                        icon = <XCircle className="w-5 h-5 absolute right-4 text-red-600" />;
                      } else {
                        btnStyle = "bg-slate-50 border-slate-200 text-slate-400 opacity-50";
                      }
                    }

                    return (
                      <button 
                        key={idx} 
                        onClick={() => handleQuizAnswer(opt)} 
                        disabled={selectedAnswer !== null} 
                        className={`relative flex items-center justify-center py-4 rounded-xl border-2 text-lg sm:text-xl font-bold transition-all duration-200 cursor-pointer ${btnStyle}`}
                      >
                        <span className="uppercase">{opt}</span>
                        {icon}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* KIỂM TRA (EXAM) TAB */}
        {activeMainTab === "exam" && (
          <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in zoom-in duration-300">
            {!examState.isRunning ? (
              <div className="bg-white rounded-3xl border-4 border-[#1A1A1A] p-6 sm:p-8 text-center shadow-[8px_8px_0px_#8B0000]">
                <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-2xl font-black text-[#1A1A1A] uppercase tracking-wider mb-2" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                  Bài Kiểm Tra Đánh Giá
                </h2>
                <p className="text-slate-500 font-medium text-sm sm:text-base mb-6">
                  Vượt qua {EXAM_TOTAL_QUESTIONS} câu hỏi trắc nghiệm gắt gao dưới sự giám sát để đánh giá chính xác độ thuộc mặt chữ của bạn.
                </p>

                <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 text-left border-2 border-[#1A1A1A] mb-8">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 justify-between border-b pb-4">
                      <span className="font-black text-xs uppercase tracking-wider text-slate-700">Bộ chữ:</span>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 text-xs font-bold cursor-pointer"><input type="checkbox" checked={examConfig.hiragana} onChange={() => handleToggleConfig("hiragana", true)} className="accent-[#8B0000] w-4 h-4 cursor-pointer" /> Hiragana</label>
                        <label className="flex items-center gap-2 text-xs font-bold cursor-pointer"><input type="checkbox" checked={examConfig.katakana} onChange={() => handleToggleConfig("katakana", true)} className="accent-[#8B0000] w-4 h-4 cursor-pointer" /> Katakana</label>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 justify-between">
                      <span className="font-black text-xs uppercase tracking-wider text-slate-700">Phân loại:</span>
                      <div className="flex flex-wrap sm:flex-col gap-3 sm:gap-2">
                        <label className="flex items-center gap-2 text-xs font-bold cursor-pointer"><input type="checkbox" checked={examConfig.seion} onChange={() => handleToggleConfig("seion", true)} className="accent-[#8B0000] w-4 h-4 cursor-pointer" /> Âm cơ bản</label>
                        <label className="flex items-center gap-2 text-xs font-bold cursor-pointer"><input type="checkbox" checked={examConfig.dakuon} onChange={() => handleToggleConfig("dakuon", true)} className="accent-[#8B0000] w-4 h-4 cursor-pointer" /> Âm đục</label>
                        <label className="flex items-center gap-2 text-xs font-bold cursor-pointer"><input type="checkbox" checked={examConfig.yoon} onChange={() => handleToggleConfig("yoon", true)} className="accent-[#8B0000] w-4 h-4 cursor-pointer" /> Âm ghép</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  {getQuizPool(examConfig).length < 5 ? (
                    <p className="text-red-500 text-xs font-black uppercase tracking-wider mb-2">
                      Vui lòng chọn phạm vi lớn hơn (Tối thiểu 5 ký tự) để tạo đề thi!
                    </p>
                  ) : (
                    <button 
                      onClick={() => {
                        playSound.click();
                        startExam();
                      }} 
                      className="bg-[#8B0000] text-white font-black text-xs uppercase tracking-widest px-8 py-3.5 rounded-2xl hover:bg-red-700 shadow-[4px_4px_0px_#1A1A1A] transition-all transform active:translate-y-0.5 cursor-pointer"
                    >
                      Bắt đầu khai chiến
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border-4 border-[#1A1A1A] p-6 sm:p-10 relative shadow-[6px_6px_0px_#1A1A1A]">
                <div className="w-full bg-slate-100 h-2.5 rounded-full mb-6 overflow-hidden border">
                  <div className="bg-[#8B0000] h-full transition-all duration-300" style={{ width: `${((examState.currentIndex) / examState.questions.length) * 100}%` }}></div>
                </div>

                <div className="flex flex-col items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                  <div className="text-xs font-black uppercase tracking-wider text-[#8B0000] bg-[#8B0000]/10 border border-[#8B0000]/30 px-4 py-1.5 rounded-full">
                    Khảo hạch: Câu {examState.currentIndex + 1} / {examState.questions.length}
                  </div>
                  <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest text-center mt-2">
                    Romaji của chữ này là gì?
                  </h2>
                </div>

                {examState.questions[examState.currentIndex] && (
                  <div className="text-8xl font-black text-slate-800 mb-8 py-4 text-center drop-shadow-sm" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                    {examState.questions[examState.currentIndex].char}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {examState.questions[examState.currentIndex]?.options.map((opt, idx) => {
                    const currentQ = examState.questions[examState.currentIndex];
                    let btnStyle = "bg-slate-50 border-slate-200 hover:border-red-400 hover:bg-red-50 text-slate-700";
                    let icon = null;

                    if (examSelectedAnswer !== null) {
                      if (opt === currentQ.r) {
                        btnStyle = "bg-green-100 border-green-500 text-green-800";
                        icon = <CheckCircle2 className="w-5 h-5 absolute right-4 text-green-600" />;
                      } else if (opt === examSelectedAnswer) {
                        btnStyle = "bg-red-100 border-red-500 text-red-800";
                        icon = <XCircle className="w-5 h-5 absolute right-4 text-red-600" />;
                      } else {
                        btnStyle = "bg-slate-50 border-slate-200 text-slate-400 opacity-50";
                      }
                    }

                    return (
                      <button 
                        key={idx} 
                        onClick={() => handleExamAnswer(opt)} 
                        disabled={examSelectedAnswer !== null} 
                        className={`relative flex items-center justify-center py-4 rounded-xl border-2 text-lg sm:text-xl font-bold transition-all duration-200 cursor-pointer ${btnStyle}`}
                      >
                        <span className="uppercase">{opt}</span>
                        {icon}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* KẾT QUẢ TAB */}
        {activeMainTab === "dashboard" && (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            {testHistory.length === 0 ? (
              <div className="text-center p-12 bg-white rounded-3xl border-4 border-dashed border-gray-300 shadow-[4px_4px_0px_#1A1A1A] text-slate-500 flex flex-col items-center">
                <BarChart2 className="w-16 h-16 text-slate-300 mb-4" />
                <h3 className="text-lg font-black text-[#1A1A1A] uppercase tracking-wider mb-2">Chưa có dữ liệu khảo hạch</h3>
                <p className="max-w-md text-xs font-semibold leading-relaxed mb-6">
                  Ngươi cần hoàn thành ít nhất một bài kiểm tra nghiêm túc để kích hoạt sơ đồ phân tích và lời khuyên răn từ Sensei!
                </p>
                <button 
                  onClick={() => {
                    playSound.click();
                    setActiveMainTab("exam");
                  }} 
                  className="px-6 py-3 bg-[#8B0000] text-white rounded-xl font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_#1A1A1A] hover:bg-red-700 cursor-pointer"
                >
                  Làm bài kiểm tra ngay
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Score & Teacher Son Advice */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border-4 border-[#1A1A1A] shadow-[6px_6px_0px_#1A1A1A] flex flex-col items-center text-center">
                  <h3 className="text-sm font-black text-[#1A1A1A] uppercase tracking-widest mb-6 border-b-2 border-black pb-2 w-full">
                    BÀI THI GẦN NHẤT
                  </h3>
                  
                  {/* Radial progress circle */}
                  <div className="relative w-40 h-40 flex items-center justify-center mb-6">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="80" cy="80" r="70" stroke="#f1f5f9" strokeWidth="12" fill="transparent" />
                      <circle 
                        cx="80" 
                        cy="80" 
                        r="70" 
                        stroke={testHistory[0].percentage >= 80 ? "#22c55e" : testHistory[0].percentage >= 50 ? "#eab308" : "#ef4444"} 
                        strokeWidth="12" 
                        fill="transparent" 
                        strokeDasharray={2 * Math.PI * 70} 
                        strokeDashoffset={2 * Math.PI * 70 * (1 - testHistory[0].percentage / 100)}
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-4xl font-black text-slate-800">{testHistory[0].percentage}%</span>
                      <span className="text-xs font-bold text-slate-400 tracking-wider">{testHistory[0].score}/{testHistory[0].total} Câu đúng</span>
                    </div>
                  </div>

                  <div className="bg-blue-50/70 border-2 border-blue-200 text-blue-900 p-5 rounded-2xl w-full text-left relative overflow-hidden">
                    <div className="font-black text-xs uppercase tracking-wider flex items-center gap-2 mb-2">
                      <span className="text-base">👨‍🏫</span> <span>Thầy Sơn dặn:</span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold italic leading-relaxed text-slate-700">
                      "{getAdvice(testHistory[0].percentage)}"
                    </p>
                  </div>
                </div>

                {/* Progress bars / historic details */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border-4 border-[#1A1A1A] shadow-[6px_6px_0px_#1A1A1A] flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-black text-[#1A1A1A] uppercase tracking-widest mb-4 border-b-2 border-black pb-2 flex items-center gap-2">
                      🎯 Độ thuộc từ tổng hợp
                    </h3>
                    <div className="space-y-1">
                      {masteryStats.hiragana.total > 0 || masteryStats.katakana.total > 0 ? (
                        <>
                          {renderProgressBar("Hiragana", masteryStats.hiragana)}
                          {renderProgressBar("Katakana", masteryStats.katakana)}
                          <div className="h-0.5 bg-[#1A1A1A]/10 my-3"></div>
                          {renderProgressBar("Âm cơ bản", masteryStats.seion)}
                          {renderProgressBar("Âm đục", masteryStats.dakuon)}
                          {renderProgressBar("Âm ghép", masteryStats.yoon)}
                        </>
                      ) : (
                        <p className="text-xs text-slate-400 italic text-center py-4">Chưa đủ dữ liệu phân tích</p>
                      )}
                    </div>
                  </div>

                  <div className="border-t-2 border-[#1A1A1A]/10 pt-6 mt-6">
                    <h3 className="text-xs font-black text-[#1A1A1A] uppercase tracking-widest mb-4">
                      Lịch sử 10 bài thi gần nhất
                    </h3>
                    <div className="h-24 flex items-end justify-between gap-2 border-b-2 border-slate-200 pb-2 mb-2">
                      {testHistory.slice(0, 10).reverse().map((test) => (
                        <div key={test.id} className="w-full flex flex-col items-center gap-2 group relative">
                          {/* Tooltip */}
                          <div className="absolute -top-10 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 font-bold uppercase tracking-widest">
                            {test.percentage}%
                          </div>
                          <div 
                            className={`w-full rounded-t-lg transition-all duration-500 ${
                              test.percentage >= 80 
                                ? "bg-green-400 border-t border-green-500" 
                                : test.percentage >= 50 
                                  ? "bg-yellow-400 border-t border-yellow-500" 
                                  : "bg-red-400 border-t border-red-500"
                            }`} 
                            style={{ height: `${test.percentage}%`, minHeight: "6px" }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* FOOTER MESSAGE */}
      <footer className="border-t-4 border-[#8B0000] pt-8 pb-4 mt-20 text-center space-y-2">
        <p className="font-black text-lg tracking-widest uppercase" style={{ fontFamily: "'Noto Serif JP', serif" }}>
          LỚP HỌC THẦY SƠN
        </p>
        <p className="text-gray-500 text-xs italic font-semibold">
          Học phải rèn, chơi phải tinh. Không khoan nhượng với sự lười biếng!
        </p>
      </footer>

      {/* PRACTICE WRITE MODAL WINDOW */}
      {selectedWriteChar && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200" 
          onClick={() => setSelectedWriteChar(null)}
        >
          <div 
            className="bg-white rounded-3xl border-4 border-[#1A1A1A] shadow-[8px_8px_0px_#1A1A1A] w-full max-w-sm overflow-hidden" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b-2 border-slate-100 bg-[#FDFBF7]">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                Tập viết nét <span className="text-[#8B0000] text-lg font-black">{selectedWriteChar.char}</span>
              </h3>
              <button 
                onClick={() => setSelectedWriteChar(null)} 
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 text-center space-y-6 bg-[#FEF9F3]">
              <DrawingPad char={selectedWriteChar.char} />
              
              <div className="flex flex-col items-center gap-3">
                <button 
                  onClick={() => playAudio(selectedWriteChar.char)} 
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#8B0000]/10 text-[#8B0000] border-2 border-[#8B0000] hover:bg-[#8B0000] hover:text-white rounded-xl font-black text-xs uppercase tracking-wider shadow-[2px_2px_0px_#1A1A1A] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Nghe lại phát âm</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM TEST EXIT MODAL */}
      {pendingTab && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border-4 border-[#1A1A1A] shadow-[8px_8px_0px_#1A1A1A] w-full max-w-sm overflow-hidden p-6 text-center">
            <AlertTriangle className="w-14 h-14 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-black text-slate-800 uppercase tracking-widest mb-2">Thoát Khảo Hạch?</h3>
            <p className="text-slate-500 font-bold text-xs leading-relaxed mb-6">
              Ngươi đang thực hiện bài thi kiểm tra. Nếu thoát bây giờ, toàn bộ nỗ lực và kết quả sẽ bị hủy bỏ!
            </p>
            <div className="flex gap-3 justify-center">
              <button 
                onClick={() => setPendingTab(null)} 
                className="px-5 py-2 border-2 border-[#1A1A1A] bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer"
              >
                Tiếp tục thi
              </button>
              <button 
                onClick={confirmExitExam} 
                className="px-5 py-2 bg-[#8B0000] text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_#1A1A1A] hover:bg-red-700 cursor-pointer"
              >
                Đồng ý thoát
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
