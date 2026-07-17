import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Scroll, 
  BookOpen, 
  PenTool, 
  Feather, 
  Compass, 
  ArrowLeft, 
  ExternalLink, 
  Info, 
  Heart, 
  Sparkles, 
  Flame,
  ArrowRight,
  Clock,
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  Award,
  Trophy,
  CheckSquare
} from "lucide-react";
import { playSound } from "../utils/audio";
import { EXAM_DATA_N4_2024, Question } from "../data/examN4_2024";
import { EXAM_DATA_N4_2021 } from "../data/examN4_2021";
import { EXAM_DATA_N4_2018 } from "../data/examN4_2018";
import { EXAM_DATA_N4_2017 } from "../data/examN4_2017";
import { EXAM_DATA_N4_2014 } from "../data/examN4_2014";

interface JLPTN4ExamsProps {
  onGoBack: () => void;
}

interface Exam {
  id: string;
  title: string;
  year: string;
  label: string;
  url: string;
  icon: string;
  isSimulated?: boolean;
}

const EXAMS: Exam[] = [
  {
    id: "2024-07",
    title: "JLPT N4 - Tháng 7/2024",
    year: "2024",
    label: "Đề thi tháng 7",
    url: "https://sites.google.com/view/lopthayson/n4/thi-th%E1%BB%AD-n4/jlpt-n4-72024",
    icon: "Scroll",
    isSimulated: true, // Native interactive exam simulator!
  },
  {
    id: "2021-12",
    title: "JLPT N4 - Tháng 12/2021",
    year: "2021",
    label: "Đề thi tháng 12",
    url: "https://sites.google.com/view/lopthayson/n4/thi-th%E1%BB%AD-n4/jlpt-n4-122021",
    icon: "BookOpen",
    isSimulated: true, // Native interactive exam simulator!
  },
  {
    id: "2018",
    title: "JLPT N4 - Năm 2018",
    year: "2018",
    label: "Đề thi chính thức",
    url: "https://sites.google.com/view/lopthayson/n4/thi-th%E1%BB%AD-n4/jlpt-n4-2018",
    icon: "PenTool",
    isSimulated: true, // Native interactive exam simulator!
  },
  {
    id: "2017",
    title: "JLPT N4 - Năm 2017",
    year: "2017",
    label: "Đề thi chính thức",
    url: "https://sites.google.com/view/lopthayson/n4/thi-th%E1%BB%AD-n4/jlpt-n4-2017",
    icon: "Feather",
    isSimulated: true, // Native interactive exam simulator!
  },
  {
    id: "2014",
    title: "JLPT N4 - Năm 2014",
    year: "2014",
    label: "Đề thi chính thức",
    url: "https://sites.google.com/view/lopthayson/n4/thi-th%E1%BB%AD-n4/jlpt-n4-2014",
    icon: "Compass",
    isSimulated: true, // Native interactive exam simulator!
  }
];

const SECTIONS = [
  { id: 'vocab', title: 'Từ vựng / Kanji', icon: <BookOpen className="w-4 h-4" />, time: 30 * 60 },
  { id: 'grammar', title: 'Ngữ pháp / Đọc', icon: <PenTool className="w-4 h-4" />, time: 60 * 60 },
  { id: 'listening', title: 'Nghe hiểu', icon: <Compass className="w-4 h-4" />, time: 35 * 60 }
] as const;

type SectionId = typeof SECTIONS[number]['id'];

export default function JLPTN4Exams({ onGoBack }: JLPTN4ExamsProps) {
  // Simulator State
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  const [examScreen, setExamScreen] = useState<'intro' | 'exam' | 'results'>('intro');
  const [activeSection, setActiveSection] = useState<SectionId>('vocab');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState<number>(SECTIONS[0].time);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  const currentExamData = useMemo(() => {
    if (selectedExamId === "2021-12") {
      return EXAM_DATA_N4_2021;
    }
    if (selectedExamId === "2018") {
      return EXAM_DATA_N4_2018;
    }
    if (selectedExamId === "2017") {
      return EXAM_DATA_N4_2017;
    }
    if (selectedExamId === "2014") {
      return EXAM_DATA_N4_2014;
    }
    return EXAM_DATA_N4_2024;
  }, [selectedExamId]);

  const selectedExam = useMemo(() => EXAMS.find(e => e.id === selectedExamId), [selectedExamId]);

  // General particles
  const particles = useMemo(() => {
    const colors = ["#ffb7c5", "#e892a5", "#f0d78c", "#ffffff"];
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      size: Math.random() * 6 + 3,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 10,
      duration: Math.random() * 8 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, []);

  // Timer Effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (selectedExamId && examScreen === 'exam') {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            // Trigger auto-submit
            setExamScreen('results');
            handlePlaySound("success");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [selectedExamId, examScreen]);

  const handlePlaySound = (type: "click" | "success" | "wrong") => {
    try {
      if (type === "click") playSound.click();
      else if (type === "success") playSound.correct();
      else if (type === "wrong") playSound.wrong();
    } catch (e) {
      // Ignored if sound utility fails
    }
  };

  const handleSelectExam = (exam: Exam) => {
    handlePlaySound("click");
    if (exam.isSimulated) {
      setSelectedExamId(exam.id);
      setExamScreen('intro');
    } else {
      openExamWindow(exam.url, exam.title);
    }
  };

  const openExamWindow = (url: string, title: string) => {
    const width = 1100;
    const height = 800;
    const left = Math.max(0, (window.screen.width - width) / 2);
    const top = Math.max(0, (window.screen.height - height) / 2);
    const features = [
      `width=${width}`,
      `height=${height}`,
      `left=${left}`,
      `top=${top}`,
      'resizable=yes',
      'scrollbars=yes',
      'toolbar=yes',
      'location=yes',
      'menubar=no',
      'status=yes'
    ].join(',');

    const examWindow = window.open(url, title || 'JLPT_N4_Exam', features);

    if (!examWindow || examWindow.closed || typeof examWindow.closed === 'undefined') {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const changeSection = (sectionId: SectionId) => {
    handlePlaySound("click");
    setActiveSection(sectionId);
    const secObj = SECTIONS.find(s => s.id === sectionId);
    if (secObj) {
      setTimeLeft(secObj.time);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectAnswer = (qId: string, optIdx: number) => {
    handlePlaySound("click");
    setAnswers(prev => ({
      ...prev,
      [qId]: optIdx
    }));
  };

  const calculateScore = () => {
    let totalCorrect = 0;
    let totalQuestions = 0;
    const sectionScores: Record<string, { correct: number; total: number }> = {};

    Object.keys(currentExamData).forEach((secKey) => {
      const questions = currentExamData[secKey as keyof typeof EXAM_DATA_N4_2024];
      let correct = 0;
      questions.forEach((q) => {
        if (answers[q.id] === q.ans) {
          correct++;
        }
      });
      sectionScores[secKey] = { correct, total: questions.length };
      totalCorrect += correct;
      totalQuestions += questions.length;
    });

    const percentage = totalQuestions === 0 ? 0 : Math.round((totalCorrect / totalQuestions) * 100);
    return {
      totalCorrect,
      totalQuestions,
      sectionScores,
      percentage,
      passed: percentage >= 60
    };
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const renderIcon = (iconName: string) => {
    const classProps = "w-7 h-7 text-[#e63946] group-hover:text-[#ff4d5a] transition-colors duration-300";
    switch (iconName) {
      case "Scroll": return <Scroll className={classProps} />;
      case "BookOpen": return <BookOpen className={classProps} />;
      case "PenTool": return <PenTool className={classProps} />;
      case "Feather": return <Feather className={classProps} />;
      case "Compass": return <Compass className={classProps} />;
      default: return <Scroll className={classProps} />;
    }
  };

  // Render question component
  const renderQuestion = (q: Question, idx: number, isResultView = false) => {
    const chosenAnswer = answers[q.id];
    const isCorrect = chosenAnswer === q.ans;
    const hasAnswered = chosenAnswer !== undefined;
    const isBlankOptions = q.opts[0] === ' ' || q.opts[0] === '';

    return (
      <div 
        key={q.id}
        className={`p-6 md:p-8 rounded-3xl border-2 transition-all duration-300 text-left ${
          isResultView
            ? isCorrect 
              ? 'border-emerald-500/30 bg-emerald-950/20 shadow-[0_4px_20px_rgba(16,185,129,0.05)]' 
              : 'border-rose-500/30 bg-rose-950/20 shadow-[0_4px_20px_rgba(244,63,94,0.05)]'
            : hasAnswered 
              ? 'border-amber-500/40 bg-[#16213e]/40 shadow-lg' 
              : 'border-white/10 bg-[#111122]/30'
        }`}
      >
        {/* Context / Reading Passage */}
        {q.context && (
          <div className="mb-5 bg-black/40 p-5 rounded-2xl border border-white/5 text-gray-300 text-[14px] md:text-[15px] leading-relaxed whitespace-pre-wrap font-sans">
            {q.context}
          </div>
        )}

        {/* Question Image */}
        {q.image && (
          <div className="mb-6 flex justify-center">
            <img 
              src={q.image} 
              alt="Hình minh họa" 
              className="max-w-full md:max-w-md h-auto rounded-2xl border border-white/10 shadow-md"
              referrerPolicy="no-referrer"
              onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} 
            />
          </div>
        )}

        {/* Question Title */}
        <h4 className="text-[15px] md:text-base font-medium text-white mb-5 flex gap-2.5 leading-relaxed">
          <span className="text-[#f0d78c] font-black shrink-0">Câu {idx + 1}:</span>
          <span 
            dangerouslySetInnerHTML={{ 
              __html: q.q.replace(
                /【(.*?)】/g, 
                '<u class="font-bold text-[#ff4d5a] decoration-2 underline-offset-4 font-sans select-all">$1</u>'
              ) 
            }} 
          />
        </h4>

        {/* Options Grid */}
        <div className={`grid gap-3 ${isBlankOptions ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-1'}`}>
          {q.opts.map((opt, i) => {
            const isSelected = chosenAnswer === i;
            const isActualCorrect = q.ans === i;
            
            let btnClass = `group/opt px-5 py-3.5 rounded-2xl border transition-all duration-200 font-medium flex items-center min-h-[50px] w-full text-left `;
            
            if (isResultView) {
              if (isActualCorrect) {
                btnClass += "border-emerald-500 bg-emerald-500/10 text-emerald-300";
              } else if (isSelected) {
                btnClass += "border-rose-500 bg-rose-500/10 text-rose-300";
              } else {
                btnClass += "border-white/5 text-gray-500 bg-black/10 cursor-not-allowed";
              }
            } else {
              btnClass += isSelected 
                ? "border-amber-500 bg-amber-500/10 text-[#f0d78c] shadow-[0_0_15px_rgba(240,215,140,0.1)] font-bold" 
                : "border-white/10 text-gray-300 hover:border-white/30 hover:bg-white/5 active:scale-[0.99]";
            }

            return (
              <button 
                key={i} 
                disabled={isResultView} 
                onClick={() => handleSelectAnswer(q.id, i)} 
                className={btnClass}
              >
                <span className={`shrink-0 w-7 h-7 rounded-full border text-xs flex items-center justify-center transition-all duration-200 mr-3.5 font-bold
                  ${isResultView && isActualCorrect 
                    ? 'border-emerald-500 bg-emerald-500 text-white' 
                    : isResultView && isSelected 
                    ? 'border-rose-500 bg-rose-500 text-white'
                    : isSelected 
                    ? 'border-amber-500 bg-amber-500 text-slate-900 shadow-md' 
                    : 'border-white/20 text-gray-400 group-hover/opt:border-white/40'}`}>
                  {i + 1}
                </span>
                {!isBlankOptions && <span className="text-[14px] md:text-[15px]">{opt}</span>}
              </button>
            );
          })}
        </div>

        {/* Feedback info bar on result screen */}
        {isResultView && (
          <div className={`mt-5 p-4 rounded-xl flex items-center gap-3 border text-sm font-semibold ${
            isCorrect 
              ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400' 
              : 'border-rose-500/20 bg-rose-500/5 text-rose-400'
          }`}>
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Trả lời chính xác!</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                <span>
                  Đáp án đúng là: <strong className="text-white bg-emerald-500/20 px-2 py-0.5 rounded-md ml-1">Option {q.ans + 1} {!isBlankOptions ? `(${q.opts[q.ans]})` : ''}</strong>
                </span>
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  // Render simulator content based on sub-state
  if (selectedExamId) {
    if (examScreen === 'intro') {
      return (
        <div 
          className="min-h-screen relative overflow-hidden p-6 sm:p-8 md:p-12 -mx-4 sm:-mx-8 rounded-[40px] border-4 border-[#1A1A1A] font-sans text-white"
          style={{
            background: "#0f0c1a",
            backgroundImage: "radial-gradient(ellipse at 15% 20%, rgba(200, 16, 46, 0.08) 0%, transparent 55%), radial-gradient(ellipse at 85% 75%, rgba(212, 168, 83, 0.07) 0%, transparent 55%), radial-gradient(ellipse at 50% 50%, rgba(26, 26, 46, 1) 0%, #0a0812 100%)",
          }}
        >
          {/* SAKURA PARTICLES BACKGROUND */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-[36px]">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  width: p.size,
                  height: p.size,
                  left: p.left,
                  backgroundColor: p.color,
                }}
                animate={{
                  y: ["105vh", "-10vh"],
                  x: ["0px", "20px", "-15px", "10px", "0px"],
                  scale: [0, 1, 1.2, 0.8, 0.3, 0],
                  opacity: [0, 0.6, 0.5, 0.3, 0.05, 0]
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: "linear"
                }}
              />
            ))}
          </div>

          <div className="relative z-10 max-w-xl mx-auto flex flex-col justify-center min-h-[calc(100vh-140px)] text-center">
            
            {/* Upper navigation */}
            <div className="flex justify-start mb-8">
              <button
                onClick={() => {
                  handlePlaySound("click");
                  setSelectedExamId(null);
                }}
                className="flex items-center gap-2 text-gray-400 hover:text-white font-black text-xs transition-colors border-2 border-white/10 hover:border-white/30 px-4 py-2 rounded-xl bg-white/5 backdrop-blur-md shadow-md active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>QUAY LẠI</span>
              </button>
            </div>

            {/* Simulated cover card */}
            <motion.div 
              className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-2xl relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Outer decorative halo */}
              <div className="absolute -top-12 -left-12 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center mx-auto mb-6 border border-rose-500/20">
                <Scroll className="w-8 h-8 text-rose-400 animate-pulse" />
              </div>

              <h3 className="text-3xl font-black text-white tracking-wide mb-1" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                JLPT N4
              </h3>
              <h4 className="text-xl font-bold text-[#f0d78c] mb-6 tracking-widest uppercase">
                {selectedExam ? selectedExam.title.toUpperCase() : "ĐỀ THI THÁNG 7/2024"}
              </h4>

              {/* Stats blocks */}
              <div className="bg-black/30 border border-white/5 p-5 rounded-2xl text-left space-y-3 mb-8 text-sm text-gray-300">
                <div className="flex items-center gap-3">
                  <CheckSquare className="w-4 h-4 text-rose-400" />
                  <span>Tổng số: <strong className="text-white">{currentExamData.vocab.length + currentExamData.grammar.length + currentExamData.listening.length} câu hỏi</strong> trắc nghiệm</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Cấu trúc: <strong className="text-white">3 phần riêng biệt</strong> bám sát thực tế</span>
                </div>
                <div className="flex items-center gap-3">
                  <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
                  <span>Điều kiện đạt: <strong className="text-white">Tối thiểu 60%</strong> tổng số điểm</span>
                </div>
              </div>

              {/* Play / Start button */}
              <button 
                onClick={() => {
                  handlePlaySound("click");
                  setAnswers({});
                  setExamScreen('exam');
                  changeSection('vocab');
                }} 
                className="group relative w-full bg-rose-600 hover:bg-rose-500 text-white font-black py-4.5 rounded-2xl transition-all duration-300 shadow-xl overflow-hidden active:scale-[0.98] flex items-center justify-center gap-2 tracking-widest"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <Play className="w-5 h-5 fill-white shrink-0" />
                <span>BẮT ĐẦU LÀM BÀI</span>
              </button>
            </motion.div>
          </div>
        </div>
      );
    }

    if (examScreen === 'exam') {
      const activeSecObj = SECTIONS.find(s => s.id === activeSection);
      const totalQuestions = currentExamData[activeSection].length;
      const answeredCount = currentExamData[activeSection].filter(q => answers[q.id] !== undefined).length;

      return (
        <div 
          className="min-h-screen relative overflow-hidden pb-32 -mx-4 sm:-mx-8 rounded-[40px] border-4 border-[#1A1A1A] font-sans text-white"
          style={{
            background: "#0f0c1a",
            backgroundImage: "radial-gradient(ellipse at 15% 20%, rgba(200, 16, 46, 0.05) 0%, transparent 55%), radial-gradient(ellipse at 85% 75%, rgba(212, 168, 83, 0.05) 0%, transparent 55%), radial-gradient(ellipse at 50% 50%, rgba(18, 18, 36, 1) 0%, #06050b 100%)",
          }}
        >
          {/* Header Sticky section */}
          <header className="sticky top-0 z-50 bg-[#0c0a15]/90 border-b border-white/10 backdrop-blur-md">
            <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    handlePlaySound("click");
                    setIsExitModalOpen(true);
                  }}
                  className="p-2 border border-white/10 hover:border-white/30 rounded-xl bg-white/5 active:scale-95 transition"
                >
                  <ArrowLeft className="w-4 h-4 text-gray-400 hover:text-white" />
                </button>
                <div>
                  <h1 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Thi Thử JLPT N4</h1>
                  <h2 className="text-[11px] font-black text-[#f0d78c] tracking-wider">
                    {selectedExam ? selectedExam.title.toUpperCase() : "ĐỀ THI THÁNG 7/2024"}
                  </h2>
                </div>
              </div>

              {/* Timer clock pill */}
              <div className="flex items-center gap-2 bg-[#16213e] px-4 py-2 rounded-2xl border border-amber-500/20 text-[#f0d78c] font-black text-sm md:text-base animate-pulse">
                <Clock className="w-4.5 h-4.5 text-amber-400 shrink-0" />
                <span className="font-mono tracking-widest">{formatTime(timeLeft)}</span>
              </div>
            </div>

            {/* Subsection Tab Selectors */}
            <div className="max-w-4xl mx-auto px-4 md:px-6 flex border-t border-white/5 overflow-x-auto scrollbar-hide">
              {SECTIONS.map((sec) => {
                const isActive = activeSection === sec.id;
                const secTotal = currentExamData[sec.id].length;
                const secAnswered = currentExamData[sec.id].filter(q => answers[q.id] !== undefined).length;
                const isSectionDone = secAnswered === secTotal;

                return (
                  <button
                    key={sec.id}
                    onClick={() => changeSection(sec.id)}
                    className={`flex-1 min-w-[140px] px-5 py-4 text-xs md:text-sm font-black border-b-4 transition-all duration-300 flex items-center justify-center gap-2.5 whitespace-nowrap ${
                      isActive 
                        ? 'border-amber-500 text-amber-400 bg-white/5' 
                        : 'border-transparent text-gray-400 hover:text-white hover:bg-white/2'
                    }`}
                  >
                    {sec.icon}
                    <span>{sec.title}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold transition-colors shrink-0 ${
                      isSectionDone 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-white/5 text-gray-400 border border-white/5'
                    }`}>
                      {secAnswered}/{secTotal}
                    </span>
                  </button>
                );
              })}
            </div>
          </header>

          {/* Main Question Body */}
          <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 relative z-10">
            
            {/* Listening Section Online Audio Stream Link */}
            {activeSection === 'listening' && (
              <motion.div 
                className="bg-[#16213e]/60 border border-amber-500/20 rounded-3xl p-5 mb-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-3.5 text-left">
                  <div className="w-11 h-11 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20">
                    <Compass className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-white">File Nghe Trực Tuyến</h4>
                    <p className="text-xs text-gray-400 mt-0.5">Click để mở tab nghe chính thức trong khi làm bài.</p>
                  </div>
                </div>
                <a 
                  href={selectedExamId === "2021-12" ? "https://drive.google.com/file/d/1x7iQZrIEbfD-0NrypsgOk-0PPuF0oe05/view?usp=sharing" : selectedExamId === "2018" ? "https://drive.google.com/file/d/1hwveS1p3l5PTc0ZXPP9PfFIdQKRrSijc/view?usp=sharing" : selectedExamId === "2017" ? "https://drive.google.com/file/d/1j0MuVDBaIcSvFL33wKBcethO5uQUnVym/view?usp=drive_link" : "https://drive.google.com/file/d/1Rk4R8_2ficLHu5GAFb4W6r6ax0hTu0HQ/view?usp=sharing"} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={() => handlePlaySound("click")}
                  className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors active:scale-95"
                >
                  <Play className="w-4 h-4 fill-slate-950 shrink-0" />
                  <span>MỞ THẺ NGHE</span>
                </a>
              </motion.div>
            )}

            {/* Questions container */}
            <div className="space-y-6">
              {currentExamData[activeSection].map((q, idx) => renderQuestion(q, idx, false))}
            </div>

            {/* Bottom Section Control Panel */}
            <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => {
                  handlePlaySound("click");
                  setIsSubmitModalOpen(true);
                }} 
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4.5 rounded-2xl shadow-xl transition-all duration-200 hover:shadow-emerald-500/10 active:scale-[0.99] flex items-center justify-center gap-2 text-base"
              >
                <CheckSquare className="w-5 h-5 shrink-0" />
                <span>NỘP TOÀN BỘ BÀI THI</span>
              </button>
            </div>
          </main>

          {/* Dialogs / Modals */}
          {/* Submit Exam Modal */}
          <AnimatePresence>
            {isSubmitModalOpen && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                <motion.div 
                  className="bg-[#111122] border border-white/10 rounded-3xl shadow-2xl max-w-sm w-full p-6 text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                    <CheckSquare className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-black text-white mb-2">Nộp bài thi</h3>
                  <p className="text-gray-400 text-sm mb-6">Bạn đã hoàn thành bài thi và chắc chắn muốn nộp bài để xem điểm?</p>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => {
                        handlePlaySound("click");
                        setIsSubmitModalOpen(false);
                      }} 
                      className="flex-1 px-4 py-3 rounded-xl font-bold text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition active:scale-95 text-xs"
                    >
                      TIẾP TỤC THI
                    </button>
                    <button 
                      onClick={() => {
                        handlePlaySound("success");
                        setIsSubmitModalOpen(false);
                        setExamScreen('results');
                        window.scrollTo({ top: 0 });
                      }} 
                      className="flex-1 px-4 py-3 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-md active:scale-95 text-xs"
                    >
                      NỘP BÀI THI
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Exit Exam Warning Modal */}
          <AnimatePresence>
            {isExitModalOpen && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                <motion.div 
                  className="bg-[#111122] border border-white/10 rounded-3xl shadow-2xl max-w-sm w-full p-6 text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center mx-auto mb-4 border border-rose-500/20">
                    <XCircle className="w-6 h-6 text-rose-400" />
                  </div>
                  <h3 className="text-xl font-black text-white mb-2">Thoát bài thi?</h3>
                  <p className="text-gray-400 text-sm mb-6">Tiến trình làm bài thi thử hiện tại của bạn sẽ bị xóa bỏ.</p>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => {
                        handlePlaySound("click");
                        setIsExitModalOpen(false);
                      }} 
                      className="flex-1 px-4 py-3 rounded-xl font-bold text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition active:scale-95 text-xs"
                    >
                      HỦY
                    </button>
                    <button 
                      onClick={() => {
                        handlePlaySound("click");
                        setIsExitModalOpen(false);
                        setSelectedExamId(null);
                      }} 
                      className="flex-1 px-4 py-3 rounded-xl font-bold bg-rose-600 hover:bg-rose-500 text-white transition shadow-md active:scale-95 text-xs"
                    >
                      THOÁT RA ngoài
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

        </div>
      );
    }

    if (examScreen === 'results') {
      const score = calculateScore();

      return (
        <div 
          className="min-h-screen relative overflow-hidden pb-32 -mx-4 sm:-mx-8 rounded-[40px] border-4 border-[#1A1A1A] font-sans text-white"
          style={{
            background: "#0f0c1a",
            backgroundImage: "radial-gradient(ellipse at 15% 20%, rgba(16, 185, 129, 0.05) 0%, transparent 55%), radial-gradient(ellipse at 85% 75%, rgba(212, 168, 83, 0.05) 0%, transparent 55%), radial-gradient(ellipse at 50% 50%, rgba(18, 18, 36, 1) 0%, #06050b 100%)",
          }}
        >
          {/* Upper sticky header for results screen */}
          <header className="sticky top-0 z-50 bg-[#0c0a15]/90 border-b border-white/10 backdrop-blur-md py-4">
            <div className="max-w-4xl mx-auto px-4 md:px-6 flex justify-between items-center">
              <button
                onClick={() => {
                  handlePlaySound("click");
                  setSelectedExamId(null);
                }}
                className="flex items-center gap-2 text-gray-400 hover:text-white font-black text-xs transition-colors border-2 border-white/10 hover:border-white/30 px-4 py-2 rounded-xl bg-white/5 active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>MENU CHÍNH</span>
              </button>

              <h1 className="text-xs font-black text-gray-400 tracking-widest uppercase">
                Kết Quả Bài Thi Thử
              </h1>
            </div>
          </header>

          <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 relative z-10">
            {/* Main Score summary card */}
            <motion.div 
              className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-md mb-8 text-center relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Soft background light */}
              <div className={`absolute -inset-20 bg-gradient-to-br ${score.passed ? 'from-emerald-500/10' : 'from-rose-500/10'} via-transparent to-transparent opacity-40 pointer-events-none rounded-3xl`} />

              {/* Congratulations Badge */}
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-6">
                {score.passed ? (
                  <>
                    <Award className="w-4 h-4 text-emerald-400 animate-bounce" />
                    <span className="text-[10px] font-black tracking-widest text-emerald-400 uppercase">TUYỆT VỜI! XIN CHÚC MỪNG!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-amber-400 animate-spin" />
                    <span className="text-[10px] font-black tracking-widest text-amber-400 uppercase">CỐ GẮNG THÊM NHÉ!</span>
                  </>
                )}
              </div>

              {/* Total points circles */}
              <div className="flex items-baseline justify-center mb-6">
                <span className="text-6xl md:text-7xl font-black text-white">{score.totalCorrect}</span>
                <span className="text-2xl md:text-3xl text-gray-400 font-bold ml-1">/{score.totalQuestions}</span>
                <span className="text-xs font-black text-gray-400 tracking-wider uppercase block mt-2">Câu trả lời đúng</span>
              </div>

              {/* Custom Score Slider / Metric bar */}
              <div className="relative w-full h-3 bg-white/5 rounded-full mb-8 border border-white/5 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${
                    score.passed 
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                      : 'bg-gradient-to-r from-rose-500 to-amber-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                  }`}
                  style={{ width: `${score.percentage}%` }}
                />
              </div>

              {/* Section points breakdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {SECTIONS.map((sec) => {
                  const secScore = score.sectionScores[sec.id];
                  const correct = secScore ? secScore.correct : 0;
                  const total = secScore ? secScore.total : 0;
                  const pct = total === 0 ? 0 : Math.round((correct / total) * 100);

                  return (
                    <div key={sec.id} className="bg-black/40 border border-white/5 p-4 rounded-2xl flex flex-col items-center gap-1">
                      <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">{sec.title}</span>
                      <div className="flex items-baseline font-black">
                        <span className="text-xl text-white">{correct}</span>
                        <span className="text-xs text-gray-500 ml-0.5">/{total}</span>
                      </div>
                      <span className="text-[10px] font-bold text-gray-500 font-mono mt-1">{pct}% chính xác</span>
                    </div>
                  );
                })}
              </div>

              {/* Retry button */}
              <button 
                onClick={() => {
                  handlePlaySound("click");
                  setAnswers({});
                  setExamScreen('exam');
                  changeSection('vocab');
                }}
                className="w-full bg-white/10 hover:bg-white/15 border border-white/10 text-white font-black py-4 rounded-2xl shadow-md transition duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4 shrink-0" />
                <span>THI LẠI ĐỀ NÀY</span>
              </button>
            </motion.div>

            {/* Answer reviews section */}
            <div className="flex items-center gap-2 mb-6 px-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-black text-white tracking-wide">Chi Tiết Đáp Án</h3>
            </div>

            <div className="space-y-12">
              {SECTIONS.map((sec) => (
                <div key={sec.id} className="space-y-4">
                  <h4 className="text-sm font-black text-amber-400 tracking-[3px] uppercase py-2.5 border-b border-white/5 mb-6 text-center">
                    {sec.title}
                  </h4>
                  {currentExamData[sec.id].map((q, idx) => renderQuestion(q, idx, true))}
                </div>
              ))}
            </div>

          </main>
        </div>
      );
    }
  }

  // Primary component layout (Menu list)
  return (
    <div 
      className="min-h-screen relative overflow-hidden p-6 sm:p-8 md:p-12 -mx-4 sm:-mx-8 rounded-[40px] border-4 border-[#1A1A1A] font-sans selection:bg-[#c8102e]/30 selection:text-white"
      style={{
        background: "#0f0c1a",
        backgroundImage: "radial-gradient(ellipse at 15% 20%, rgba(200, 16, 46, 0.08) 0%, transparent 55%), radial-gradient(ellipse at 85% 75%, rgba(212, 168, 83, 0.07) 0%, transparent 55%), radial-gradient(ellipse at 50% 50%, rgba(26, 26, 46, 1) 0%, #0a0812 100%)",
      }}
    >
      {/* 🌸 SAKURA PARTICLES FLOATING UP 🌸 */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-[36px]">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              left: p.left,
              backgroundColor: p.color,
            }}
            animate={{
              y: ["105vh", "-10vh"],
              x: ["0px", "30px", "-25px", "15px", "0px"],
              scale: [0, 1, 1.2, 0.8, 0.3, 0],
              opacity: [0, 0.7, 0.6, 0.35, 0.08, 0]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Main Wrapper content */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col justify-between min-h-[calc(100vh-80px)]">
        
        {/* Navigation back and title */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
          <button
            onClick={() => {
              handlePlaySound("click");
              onGoBack();
            }}
            className="flex items-center gap-2 text-gray-400 hover:text-white font-black text-xs transition-colors border-2 border-white/10 hover:border-white/30 px-4 py-2 rounded-xl bg-white/5 backdrop-blur-md shadow-md active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>QUAY LẠI CỬA ẢI</span>
          </button>

          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#f0d78c] bg-white/5 px-3 py-1 rounded-full border border-white/5">
            <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>N4 CHALLENGES</span>
          </div>
        </div>

        {/* HEADER */}
        <header className="text-center pt-6 pb-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-6 shadow-lg backdrop-blur-md">
            <span className="w-2.5 h-2.5 bg-[#e63946] rounded-full animate-ping" />
            <span className="text-[10px] font-bold text-gray-300 tracking-[3px] uppercase">
              SONKURO - LUYỆN THI JLPT
            </span>
          </div>

          {/* Titles */}
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-2 tracking-[6px] select-none text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f0d78c] to-[#d4a853] filter drop-shadow-[0_0_20px_rgba(212,168,83,0.25)]"
            style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
          >
            日本語能力試験 N4
          </h1>
          <h2 className="text-lg sm:text-xl font-bold text-[#e8e8e8] tracking-[4px] uppercase mb-3">
            THI THỬ JLPT N4
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
            Rèn luyện kỹ năng thực tế với 5 bộ đề chuẩn hóa, bám sát cấu trúc đề thi chính thức của tổ chức thi cử Nhật Bản.
          </p>

          <div className="w-20 h-1 bg-[#e63946] mx-auto my-6 rounded-full" />

          {/* Decorative icons sway */}
          <div className="flex justify-center gap-4 text-[#ffb7c5]/50">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                animate={{ rotate: [0, 8, -8, 0], y: [0, -4, -2, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
            ))}
          </div>
        </header>

        {/* EXAM CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 my-10 px-2">
          {EXAMS.map((exam, index) => (
            <motion.div
              key={exam.id}
              onClick={() => handleSelectExam(exam)}
              className="group relative flex flex-col items-center justify-between p-8 rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:border-[#e63946]/50 cursor-pointer overflow-hidden transition-all duration-300 text-center gap-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 50px rgba(230,57,70,0.15)"
              }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Soft background light */}
              <div className="absolute -inset-10 bg-gradient-to-br from-[#e63946]/10 via-transparent to-[#f0d78c]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />

              {/* Icon wrap */}
              <div className="w-[68px] h-[68px] rounded-full bg-[#e63946]/15 group-hover:bg-[#e63946]/30 flex items-center justify-center transition-all duration-300 border border-white/5 group-hover:shadow-[0_0_20px_rgba(230,57,70,0.4)]">
                <motion.div
                  whileHover={{ scale: 1.15, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {renderIcon(exam.icon)}
                </motion.div>
              </div>

              {/* Year */}
              <div className="text-2xl font-black text-white tracking-widest mt-1">
                {exam.year}
              </div>

              {/* Label */}
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors duration-300">
                {exam.label}
              </div>

              {/* Interactive tag if simulated */}
              {exam.isSimulated && (
                <span className="text-[9px] font-black tracking-widest text-[#f0d78c] border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 rounded-md">
                  THI TRỰC TUYẾN
                </span>
              )}

              {/* Arrow Indicator */}
              <div className="text-[#e63946] opacity-60 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300 mt-2">
                <ArrowRight className="w-5 h-5" />
              </div>

              {/* Bottom decorative accent */}
              <motion.div 
                className="absolute bottom-0 h-1 bg-[#e63946] w-12 rounded-t-full transition-all duration-300"
                style={{ left: "50%", x: "-50%" }}
                variants={{
                  hover: { width: "100px", backgroundColor: "#ff4d5a" }
                }}
                whileHover="hover"
              />
            </motion.div>
          ))}
        </div>

        {/* FOOTER */}
        <footer className="text-center text-xs text-gray-500 max-w-xl mx-auto space-y-4 pt-4 border-t border-white/5 w-full">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-2">
            <div className="flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-[#ffb7c5]" />
              <span>Bấm vào đề 2024 để thi thử trực tuyến hoặc chọn năm khác để làm qua link phụ.</span>
            </div>
            <span className="hidden sm:inline text-white/20">|</span>
            <div className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-[#e63946] fill-[#e63946] animate-pulse" />
              <span>Chúc bạn ôn luyện hiệu quả! がんばって！</span>
            </div>
          </div>
          <p className="text-[10px] text-gray-600 font-mono">
            * Đối với đề thi phụ, nếu cửa sổ bị chặn, hãy cho phép hiển thị popup hoặc bấm chuột phải chọn "Mở trong tab mới".
          </p>
        </footer>

      </div>
    </div>
  );
}
