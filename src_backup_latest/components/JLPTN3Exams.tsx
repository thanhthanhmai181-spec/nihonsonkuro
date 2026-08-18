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
  FileText,
  GraduationCap,
  Mountain,
  Shield,
  Trophy,
  Clock,
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  Award,
  CheckSquare,
  Volume2
} from "lucide-react";
import { playSound } from "../utils/audio";
import { EXAM_DATA_N3_2024, N3Question } from "../data/examN3_2024";
import { EXAM_DATA_N3_2023 } from "../data/examN3_2023";
import { EXAM_DATA_N3_2023_12 } from "../data/examN3_2023_12";
import { EXAM_DATA_N3_2022_07 } from "../data/examN3_2022_07";
import { EXAM_DATA_N3_2022_12 } from "../data/examN3_2022_12";
import { EXAM_DATA_N3_2021_12 } from "../data/examN3_2021_12";
import { EXAM_DATA_N3_2021_07 } from "../data/examN3_2021_07";
import { EXAM_DATA_N3_2020_12 } from "../data/examN3_2020_12";
import { EXAM_DATA_N3_2019_07 } from "../data/examN3_2019_07";
import { EXAM_DATA_N3_2019_12 } from "../data/examN3_2019_12";

interface JLPTN3ExamsProps {
  onGoBack: () => void;
}

interface Exam {
  id: string;
  title: string;
  label: string;
  desc: string;
  url: string;
  icon: string;
  numberLabel: string;
  isSimulated?: boolean;
}

const EXAMS: Exam[] = [
  {
    id: "de-1",
    title: "JLPT N3 - Đề số 1",
    label: "N3 - ①",
    desc: "Đề thi tháng 7/2024",
    url: "https://sites.google.com/view/lopthayson/n3/thi-th%E1%BB%AD/72024",
    icon: "Scroll",
    numberLabel: "ĐỀ SỐ 1",
    isSimulated: true // Trình giả lập thi thử trực tiếp cực xịn cho Đề 1!
  },
  {
    id: "de-2",
    title: "JLPT N3 - Đề số 2",
    label: "N3 - ②",
    desc: "Đề thi tháng 7/2023",
    url: "https://sites.google.com/view/lopthayson/n3/thi-th%E1%BB%AD/72023",
    icon: "BookOpen",
    numberLabel: "ĐỀ SỐ 2",
    isSimulated: true // Trình giả lập thi thử trực tiếp cực xịn cho Đề 2!
  },
  {
    id: "de-3",
    title: "JLPT N3 - Đề số 3",
    label: "N3 - ③",
    desc: "Đề thi tháng 12/2023",
    url: "https://sites.google.com/view/lopthayson/n3/thi-th%E1%BB%AD/122023",
    icon: "PenTool",
    numberLabel: "ĐỀ SỐ 3",
    isSimulated: true // Trình giả lập thi thử trực tiếp cực xịn cho Đề 3!
  },
  {
    id: "de-4",
    title: "JLPT N3 - Đề số 4",
    label: "N3 - ④",
    desc: "Đề thi tháng 7/2022",
    url: "https://sites.google.com/view/lopthayson/n3/thi-th%E1%BB%AD/72022",
    icon: "Feather",
    numberLabel: "ĐỀ SỐ 4",
    isSimulated: true // Trình giả lập thi thử trực tiếp cực xịn cho Đề 4!
  },
  {
    id: "de-5",
    title: "JLPT N3 - Đề số 5",
    label: "N3 - ⑤",
    desc: "Đề thi tháng 12/2022",
    url: "https://sites.google.com/view/lopthayson/n3/thi-th%E1%BB%AD/122022",
    icon: "Compass",
    numberLabel: "ĐỀ SỐ 5",
    isSimulated: true // Trình giả lập thi thử trực tiếp cực xịn cho Đề 5!
  },
  {
    id: "de-6",
    title: "JLPT N3 - Đề số 6",
    label: "N3 - ⑥",
    desc: "Đề thi tháng 7/2021",
    url: "https://sites.google.com/view/lopthayson/n3/thi-th%E1%BB%AD/72021",
    icon: "FileText",
    numberLabel: "ĐỀ SỐ 6",
    isSimulated: true // Trình giả lập thi thử trực tiếp cực xịn cho Đề 6!
  },
  {
    id: "de-7",
    title: "JLPT N3 - Đề số 7",
    label: "N3 - ⑦",
    desc: "Đề thi tháng 12/2021",
    url: "https://sites.google.com/view/lopthayson/n3/thi-th%E1%BB%AD/122021",
    icon: "GraduationCap",
    numberLabel: "ĐỀ SỐ 7",
    isSimulated: true // Trình giả lập thi thử trực tiếp cực xịn cho Đề 7!
  },
  {
    id: "de-8",
    title: "JLPT N3 - Đề số 8",
    label: "N3 - ⑧",
    desc: "Đề thi tháng 12/2020",
    url: "https://sites.google.com/view/lopthayson/n3/thi-th%E1%BB%AD/122020",
    icon: "Mountain",
    numberLabel: "ĐỀ SỐ 8",
    isSimulated: true // Trình giả lập thi thử trực tiếp cực xịn cho Đề 8!
  },
  {
    id: "de-9",
    title: "JLPT N3 - Đề số 9",
    label: "N3 - ⑨",
    desc: "Đề thi tháng 7/2019",
    url: "https://sites.google.com/view/lopthayson/n3/thi-th%E1%BB%AD/72019",
    icon: "Shield",
    numberLabel: "ĐỀ SỐ 9",
    isSimulated: true // Trình giả lập thi thử trực tiếp cực xịn cho Đề 9!
  },
  {
    id: "de-10",
    title: "JLPT N3 - Đề số 10",
    label: "N3 - ⑩",
    desc: "Đề thi tháng 12/2019",
    url: "https://sites.google.com/view/lopthayson/n3/thi-th%E1%BB%AD/122019",
    icon: "Trophy",
    numberLabel: "ĐỀ SỐ 10",
    isSimulated: true // Trình giả lập thi thử trực tiếp cực xịn cho Đề 10!
  }
];

const SECTIONS_N3 = [
  { id: 'goi', title: 'Từ vựng (Moji)', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'bunpou', title: 'Ngữ pháp (Bunpou)', icon: <PenTool className="w-4 h-4" /> },
  { id: 'dokkai', title: 'Đọc hiểu (Dokkai)', icon: <Feather className="w-4 h-4" /> },
  { id: 'choukai', title: 'Nghe hiểu (Choukai)', icon: <Volume2 className="w-4 h-4" /> }
] as const;

type SectionN3Id = typeof SECTIONS_N3[number]['id'];

export default function JLPTN3Exams({ onGoBack }: JLPTN3ExamsProps) {
  // Simulator State
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  const [examScreen, setExamScreen] = useState<'list' | 'intro' | 'exam' | 'results'>('list');
  const [currentTab, setCurrentTab] = useState<SectionN3Id>('goi');
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showResultModal, setShowResultModal] = useState<boolean>(false);

  const selectedExam = useMemo(() => EXAMS.find(e => e.id === selectedExamId), [selectedExamId]);

  const currentExamData = useMemo(() => {
    if (selectedExamId === "de-2") return EXAM_DATA_N3_2023;
    if (selectedExamId === "de-3") return EXAM_DATA_N3_2023_12;
    if (selectedExamId === "de-4") return EXAM_DATA_N3_2022_07;
    if (selectedExamId === "de-5") return EXAM_DATA_N3_2022_12;
    if (selectedExamId === "de-6") return EXAM_DATA_N3_2021_07;
    if (selectedExamId === "de-7") return EXAM_DATA_N3_2021_12;
    if (selectedExamId === "de-8") return EXAM_DATA_N3_2020_12;
    if (selectedExamId === "de-9") return EXAM_DATA_N3_2019_07;
    if (selectedExamId === "de-10") return EXAM_DATA_N3_2019_12;
    return EXAM_DATA_N3_2024;
  }, [selectedExamId]);

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

  const handlePlaySound = (type: "click" | "success" | "wrong") => {
    try {
      if (type === "click") playSound.click();
      else if (type === "success") playSound.correct();
      else if (type === "wrong") playSound.wrong();
    } catch (e) {
      // ignore
    }
  };

  const handleSelectExam = (exam: Exam) => {
    handlePlaySound("click");
    if (exam.isSimulated) {
      setSelectedExamId(exam.id);
      setExamScreen('intro');
      setIsSubmitted(false);
      setUserAnswers({});
      setCurrentTab('goi');
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

    const examWindow = window.open(url, title || 'JLPT_N3_Exam', features);

    if (!examWindow || examWindow.closed || typeof examWindow.closed === 'undefined') {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const handleSelectOption = (qId: string, optionIdx: number) => {
    if (isSubmitted) return;
    handlePlaySound("click");
    setUserAnswers(prev => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  const getDriveImageLink = (id: string) => {
    return `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
  };
  
  const getDriveAudioLink = (id: string) => {
    return `https://drive.google.com/uc?export=download&id=${id}`;
  };

  const getDriveShareLink = (id: string) => {
    return `https://drive.google.com/file/d/${id}/view`;
  };

  const calculateScore = () => {
    let totalScore = 0;
    let totalQuestions = 0;
    const sectionBreakdown: Record<string, { correct: number; total: number; percentage: number }> = {};

    SECTIONS_N3.forEach(sec => {
      let secCorrect = 0;
      let secTotal = 0;
      const list = currentExamData[sec.id] || [];
      list.forEach(q => {
        if (q.options && q.options.length > 0) {
          secTotal++;
          if (userAnswers[q.id] === q.correct) {
            secCorrect++;
          }
        }
      });
      sectionBreakdown[sec.id] = {
        correct: secCorrect,
        total: secTotal,
        percentage: secTotal === 0 ? 0 : (secCorrect / secTotal)
      };
      totalScore += secCorrect;
      totalQuestions += secTotal;
    });

    const percentage = totalQuestions === 0 ? 0 : (totalScore / totalQuestions);
    
    // Detailed feedback recommendations based on weaknesses
    let weaknessFeedback = "";
    const weakSections: string[] = [];
    SECTIONS_N3.forEach(sec => {
      const stats = sectionBreakdown[sec.id];
      if (stats && stats.total > 0 && stats.percentage < 0.6) {
        weakSections.push(sec.title.split(' ')[0]);
      }
    });

    if (weakSections.length > 0) {
      weaknessFeedback = `Em cần tập trung cải thiện thêm phần: ${weakSections.join(", ")}. Hãy xem lại các câu trả lời sai bên dưới để rút kinh nghiệm nhé.`;
    } else if (percentage < 1) {
      weaknessFeedback = "Các phần thi của em khá đồng đều và đạt kết quả tốt. Hãy tiếp tục phát huy nhé!";
    } else {
      weaknessFeedback = "Thành tích hoàn hảo! Thầy rất tự hào về sự nỗ lực và kết quả xuất sắc của em.";
    }

    let message = "";
    if (percentage === 1) message = "Thầy Sơn chúc mừng! Em đạt điểm tối đa tuyệt đối. Trình độ N3 của em đã cực kỳ vững vàng rồi!";
    else if (percentage >= 0.8) message = "Kết quả xuất sắc! Em làm bài rất tốt, nắm chắc kiến thức và hoàn toàn tự tin chinh phục kỳ thi thực tế.";
    else if (percentage >= 0.6) message = "Chúc mừng em đã ĐẠT! Điểm số này đủ giúp em vượt qua bài thi N3, nhưng hãy rèn luyện thêm để nâng cao điểm số hơn nữa.";
    else if (percentage >= 0.4) message = "Điểm số chưa đạt mức an toàn. Đừng lo lắng, hãy rà soát lại kỹ lưỡng các lỗi sai và luyện tập thêm nhé!";
    else message = "Kết quả bài làm còn yếu. Em cần dành nhiều thời gian ôn tập lại kiến thức nền tảng của các phần bên dưới. Cố gắng lên nhé!";

    return {
      totalScore,
      totalQuestions,
      percentage,
      message,
      weaknessFeedback,
      sectionBreakdown,
      passed: percentage >= 0.5
    };
  };

  const submitTest = () => {
    if (isSubmitted) {
      handlePlaySound("click");
      setShowResultModal(true);
      return;
    }

    const { passed } = calculateScore();
    if (passed) {
      handlePlaySound("success");
    } else {
      handlePlaySound("wrong");
    }

    setIsSubmitted(true);
    setShowResultModal(true);
  };

  const renderIcon = (iconName: string) => {
    const classProps = "w-7 h-7 text-[#e63946] group-hover:text-[#ff4d5a] transition-colors duration-300";
    switch (iconName) {
      case "Scroll": return <Scroll className={classProps} />;
      case "BookOpen": return <BookOpen className={classProps} />;
      case "PenTool": return <PenTool className={classProps} />;
      case "Feather": return <Feather className={classProps} />;
      case "Compass": return <Compass className={classProps} />;
      case "FileText": return <FileText className={classProps} />;
      case "GraduationCap": return <GraduationCap className={classProps} />;
      case "Mountain": return <Mountain className={classProps} />;
      case "Shield": return <Shield className={classProps} />;
      case "Trophy": return <Trophy className={classProps} />;
      default: return <Scroll className={classProps} />;
    }
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden p-4 sm:p-8 md:p-12 -mx-4 sm:-mx-8 rounded-[40px] border-4 border-[#1A1A1A] font-sans selection:bg-[#c8102e]/30 selection:text-white"
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

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col justify-between min-h-[calc(100vh-80px)]">
        
        {/* ==============================================
            MÀN HÌNH 1: DANH SÁCH 10 ĐỀ THI THỬ JLPT N3
            ============================================== */}
        {examScreen === 'list' && (
          <>
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
                <span>N3 CHALLENGES</span>
              </div>
            </div>

            {/* HEADER */}
            <header className="text-center pt-6 pb-8">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-6 shadow-lg backdrop-blur-md">
                <span className="w-2.5 h-2.5 bg-[#e63946] rounded-full animate-ping" />
                <span className="text-[10px] font-bold text-gray-300 tracking-[3px] uppercase">
                  SONKURO - LUYỆN THI JLPT
                </span>
              </div>

              <h1 
                className="text-4xl sm:text-5xl md:text-6xl font-black mb-2 tracking-[6px] select-none text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e0c9a6] to-[#d4a853] filter drop-shadow-[0_0_20px_rgba(212,168,83,0.25)]"
                style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
              >
                日本語能力試験 N3
              </h1>
              <h2 className="text-lg sm:text-xl font-bold text-[#e8e8e8] tracking-[4px] uppercase mb-3">
                THI THỬ JLPT N3
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
                Luyện tập với 10 bộ đề sát thực tế. Đầy đủ các phần thi hỗ trợ mở rộng kỹ năng tối đa.
              </p>

              <div className="w-20 h-1 bg-[#e63946] mx-auto my-6 rounded-full" />

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
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 my-10 px-2">
              {EXAMS.map((exam, index) => (
                <motion.div
                  key={exam.id}
                  onClick={() => handleSelectExam(exam)}
                  className="group relative flex flex-col items-center justify-between p-6 rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:border-[#e63946]/50 cursor-pointer overflow-hidden transition-all duration-300 text-center gap-4 min-h-[260px]"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ 
                    y: -10, 
                    boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 50px rgba(230,57,70,0.15)"
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="absolute -inset-10 bg-gradient-to-br from-[#e63946]/10 via-transparent to-[#f0d78c]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />

                  <div className="w-[64px] h-[64px] rounded-full bg-[#e63946]/15 group-hover:bg-[#e63946]/30 flex items-center justify-center transition-all duration-300 border border-white/5 group-hover:shadow-[0_0_20px_rgba(230,57,70,0.4)]">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {renderIcon(exam.icon)}
                    </motion.div>
                  </div>

                  <div className="text-[10px] font-extrabold text-[#f0d78c] tracking-widest bg-white/5 border border-white/5 px-3 py-1 rounded-full uppercase">
                    {exam.numberLabel}
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-extrabold text-base text-white tracking-wide group-hover:text-[#ff4d5a] transition-colors duration-200">
                      {exam.label}
                    </h3>
                    <p className="text-xs text-gray-400 font-medium">
                      {exam.desc}
                    </p>
                  </div>

                  {exam.isSimulated && (
                    <div className="text-[9px] bg-red-600/80 text-white font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider animate-pulse">
                      Simulated
                    </div>
                  )}

                  <div className="text-sm text-[#e63946] opacity-60 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300">
                    <ArrowRight className="w-5 h-5" />
                  </div>

                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#e63946] rounded-t-full transition-all duration-300 group-hover:w-24 group-hover:bg-[#ff4d5a]" />
                </motion.div>
              ))}
            </div>

            <footer className="text-center mt-6 text-gray-500 text-xs sm:text-sm space-y-2">
              <div className="flex items-center justify-center gap-1">
                <Info className="w-4 h-4 text-[#ffb7c5]" />
                <span>Nhập vào bất kỳ thẻ đề thi nào — cửa sổ làm bài sẽ mở ra ngay lập tức.</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <span>Chúc bạn ôn luyện hiệu quả! がんばってください！</span>
                <Heart className="w-3.5 h-3.5 text-[#e63946] fill-[#e63946] animate-pulse" />
              </div>
            </footer>
          </>
        )}

        {/* ==============================================
            MÀN HÌNH 2: INTRO CỦA ĐỀ GIẢ LẬP TRỰC TUYẾN N3
            ============================================== */}
        {examScreen === 'intro' && (
          <motion.div 
            className="w-full max-w-3xl mx-auto my-auto p-6 sm:p-10 bg-slate-900/90 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col items-center text-center gap-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="w-20 h-20 bg-[#e63946]/10 rounded-full border-2 border-[#e63946] flex items-center justify-center text-yellow-500">
              <Trophy className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-black text-white tracking-wider">{selectedExam?.title ? selectedExam.title.toUpperCase() : "THI THỬ N3"}</h1>
              <p className="text-[#f0d78c] text-sm font-semibold tracking-widest uppercase">{selectedExam?.desc || "Đề thi tham khảo"}</p>
            </div>

            {/* Lời chúc của Sensei */}
            <div className="bg-[#16213e]/60 border-l-4 border-[#3b82f6] p-5 rounded-r-2xl text-left text-sm text-gray-300 leading-relaxed max-w-2xl w-full">
              <p className="text-[#3b82f6] font-bold text-base mb-1">💬 Lời nhắn từ Thầy Sơn:</p>
              <p>Chào các em,</p>
              <p className="mt-1">Đây là hệ thống làm bài tập N3 dựa trên {selectedExam?.desc?.toLowerCase() || 'đề thi thực tế'} mà Sensei đã tổng hợp. Các em hãy đọc kỹ câu hỏi, chọn đáp án và nhấn <b>"Nộp bài & Chấm điểm"</b> để xem điểm số cũng như lời giải thích chi tiết nhé. Chúc các em học tốt! がんばりましょう！</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full mt-4">
              <button
                onClick={() => {
                  handlePlaySound("click");
                  setExamScreen('list');
                }}
                className="flex-1 border-2 border-white/10 hover:border-white/30 text-gray-400 hover:text-white font-bold py-3.5 px-6 rounded-2xl bg-white/5 active:scale-95 transition-all text-sm uppercase tracking-wider"
              >
                Quay lại danh sách
              </button>
              <button
                onClick={() => {
                  handlePlaySound("click");
                  setExamScreen('exam');
                }}
                className="flex-1 bg-gradient-to-r from-[#e63946] to-red-600 hover:from-red-600 hover:to-red-700 text-white font-black py-3.5 px-6 rounded-2xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Bắt đầu làm bài</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* ==============================================
            MÀN HÌNH 3: GIAO DIỆN LÀM BÀI / XEM KẾT QUẢ ĐỀ N3
            ============================================== */}
        {examScreen === 'exam' && (
          <div className="w-full flex flex-col lg:flex-row gap-6 items-start mt-4">
            
            {/* LEFT COLUMN: Sidebar Navigation */}
            <aside className="w-full lg:w-1/4 sticky top-6 z-20">
              <div className="bg-slate-900/90 rounded-3xl border border-white/10 p-5 shadow-xl backdrop-blur-xl flex flex-col gap-4">
                
                {/* Header Navbar Simulator Title */}
                <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                  <div className="p-2 bg-[#e63946]/10 rounded-xl">
                    <GraduationCap className="w-6 h-6 text-[#e63946]" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-sm tracking-wide">SONKURO JLPT N3</h3>
                    <p className="text-[10px] text-gray-400 font-semibold font-mono">{selectedExam?.desc || "Đề thi tham khảo"}</p>
                  </div>
                </div>

                <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">
                  Phần thi của đề
                </div>

                {/* Switch Tabs */}
                <ul className="space-y-2">
                  {SECTIONS_N3.map((tab) => {
                    const isActive = currentTab === tab.id;
                    return (
                      <li key={tab.id}>
                        <button
                          onClick={() => {
                            handlePlaySound("click");
                            setCurrentTab(tab.id);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className={`w-full text-left px-4 py-3 rounded-xl font-bold text-xs transition-all flex items-center gap-3 border-2 ${
                            isActive 
                              ? 'bg-[#e63946]/10 border-[#e63946] text-white shadow-md' 
                              : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          {tab.icon}
                          <span>{tab.title}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                {/* Submit button */}
                <div className="pt-4 border-t border-white/10 mt-2">
                  <button
                    onClick={submitTest}
                    className="w-full bg-[#e63946] hover:bg-red-600 active:scale-95 text-white font-black text-xs py-3.5 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
                  >
                    <CheckSquare className="w-4 h-4" />
                    <span>{isSubmitted ? "Xem kết quả" : "Nộp bài & Chấm"}</span>
                  </button>
                </div>

                {/* Back to list button */}
                <button
                  onClick={() => {
                    handlePlaySound("click");
                    setExamScreen('list');
                  }}
                  className="w-full border-2 border-white/10 hover:border-white/30 text-gray-400 hover:text-white font-bold text-[10px] py-2.5 px-4 rounded-xl bg-white/5 active:scale-95 transition-all uppercase tracking-wider mt-1"
                >
                  Thoát phòng thi
                </button>

              </div>
            </aside>

            {/* RIGHT COLUMN: Quiz Content */}
            <section className="w-full lg:w-3/4 bg-slate-900/80 rounded-3xl border border-white/10 p-6 sm:p-8 shadow-xl backdrop-blur-xl min-h-[500px] flex flex-col">
              
              {/* Header section name */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase">
                  {SECTIONS_N3.find(s => s.id === currentTab)?.title}
                </h2>
                {isSubmitted && (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Đã Chấm Điểm</span>
                  </div>
                )}
              </div>

              {/* Questions Area */}
              <div className="space-y-8 flex-1">
                {currentExamData[currentTab].map((q, idx) => {
                  
                  {/* Trình phát Audio nghe hiểu */}
                  if (q.type === 'audio_player') {
                    return (
                      <div 
                        key={q.id}
                        className="bg-[#16213e]/80 rounded-2xl p-5 border border-white/15 shadow-inner space-y-4"
                      >
                        <h3 className="font-bold text-base text-blue-400 flex items-center gap-2">
                          <Volume2 className="w-5 h-5 text-blue-400 animate-bounce" />
                          <span>Trình Phát Audio Bài Nghe</span>
                        </h3>
                        <audio controls className="w-full" preload="auto">
                          {q.link && <source src={getDriveAudioLink(q.link)} type="audio/mpeg" />}
                          Trình duyệt của bạn không hỗ trợ thẻ audio.
                        </audio>
                        <div className="text-xs text-gray-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-t border-white/10 pt-3">
                          <span>* Hãy mở file gốc nếu audio bị lỗi do Drive chặn.</span>
                          {q.link && (
                            <a 
                              href={getDriveShareLink(q.link)} 
                              target="_blank" 
                              rel="noreferrer"
                              className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Mở File Gốc Tab Mới</span>
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  }

                  const isChecked = (optIndex: number) => userAnswers[q.id] === optIndex;
                  const chosenAnswer = userAnswers[q.id];

                  return (
                    <div 
                      key={q.id}
                      className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 ${
                        isSubmitted
                          ? chosenAnswer === q.correct 
                            ? 'border-emerald-500/30 bg-emerald-950/20' 
                            : chosenAnswer !== undefined
                              ? 'border-rose-500/30 bg-rose-950/20'
                              : 'border-white/10 bg-white/5'
                          : chosenAnswer !== undefined
                            ? 'border-blue-500/40 bg-[#16213e]/40' 
                            : 'border-white/10 bg-white/5'
                      }`}
                    >
                      {/* Instruction */}
                      {q.instruction && (
                        <div className="bg-amber-500/10 text-[#f0d78c] p-3 sm:p-4 rounded-xl font-bold text-xs sm:text-sm mb-4 border-l-4 border-amber-500 flex items-start gap-2">
                          <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
                          <span>{q.instruction}</span>
                        </div>
                      )}

                      {/* Reading Passage */}
                      {q.passage && (
                        <div 
                          className="bg-slate-950/60 border border-white/5 p-4 sm:p-5 rounded-xl text-gray-200 text-sm leading-relaxed mb-5 font-sans"
                          dangerouslySetInnerHTML={{ __html: q.passage }}
                        />
                      )}

                      {/* Question Label */}
                      <div className="text-base text-white font-medium mb-4 flex gap-2">
                        <span className="font-extrabold text-[#e63946] shrink-0">
                          Câu {idx + (currentTab === 'choukai' ? 0 : 1)}:
                        </span>
                        <span 
                          className="leading-relaxed" 
                          dangerouslySetInnerHTML={{ 
                            __html: (q.question || "")
                              .replace(/<b>(.*?)<\/b>/g, '<span class="font-black text-[#ff4d5a] bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/30 underline underline-offset-4 decoration-2 select-all mx-0.5">$1</span>')
                              .replace(/<u>(.*?)<\/u>/g, '<span class="font-black text-[#ff4d5a] bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/30 underline underline-offset-4 decoration-2 select-all mx-0.5">$1</span>')
                          }} 
                        />
                      </div>

                      {/* Question Image (for listening comprehension) */}
                      {q.image && (
                        <div className="mb-5 bg-black/40 p-3 rounded-xl border border-white/5 text-center">
                          <img 
                            src={getDriveImageLink(q.image)} 
                            alt="Hình ảnh đề thi" 
                            className="max-h-64 mx-auto rounded-lg shadow-sm"
                            onError={(e) => {
                              const target = e.target as HTMLElement;
                              target.onerror = null;
                              target.outerHTML = `<div class="p-4 border border-red-500/30 bg-red-950/20 text-red-400 rounded-lg text-sm">Trình duyệt chặn hiển thị ảnh Google Drive. <a href="${getDriveShareLink(q.image || '')}" target="_blank" class="underline font-bold">Xem ảnh gốc tại đây</a></div>`;
                            }}
                          />
                        </div>
                      )}

                      {/* Multiple Question Images */}
                      {q.images && q.images.length > 0 && (
                        <div className="grid grid-cols-2 gap-4 mb-5">
                          {q.images.map((imgId, imgIdx) => (
                            <div key={imgIdx} className="bg-black/40 p-3 rounded-xl border border-white/5 text-center flex flex-col justify-between">
                              <span className="block text-xs font-bold text-[#f0d78c] mb-2">Ảnh {imgIdx + 1}</span>
                              <img 
                                src={getDriveImageLink(imgId)} 
                                alt={`Ảnh ${imgIdx + 1}`} 
                                className="max-h-48 mx-auto rounded-lg shadow-sm"
                                onError={(e) => {
                                  const target = e.target as HTMLElement;
                                  target.onerror = null;
                                  target.outerHTML = `<div class="p-2 border border-red-500/30 bg-red-950/20 text-red-400 rounded-lg text-xs">Trình duyệt chặn ảnh Google Drive. <a href="${getDriveShareLink(imgId)}" target="_blank" class="underline font-bold">Xem ảnh gốc</a></div>`;
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Options Grid */}
                      {q.options && q.options.length > 0 && (
                        <div className={`grid grid-cols-1 ${q.options.length > 2 ? 'md:grid-cols-2' : ''} gap-3`}>
                          {q.options.map((opt, optIndex) => {
                            const isSelected = isChecked(optIndex);
                            
                            let bgClass = "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10 text-gray-300";
                            let icon = null;

                            if (isSubmitted) {
                              if (optIndex === q.correct) {
                                bgClass = "bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold";
                                icon = <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 ml-auto" />;
                              } else if (isSelected && optIndex !== q.correct) {
                                bgClass = "bg-rose-500/10 border-rose-500 text-rose-400 font-bold";
                                icon = <XCircle className="w-5 h-5 text-rose-500 shrink-0 ml-auto" />;
                              } else {
                                bgClass = "bg-white/5 border-white/5 text-gray-500 opacity-50";
                              }
                            } else if (isSelected) {
                              bgClass = "bg-blue-500/10 border-blue-500 text-white font-bold";
                            }

                            return (
                              <label 
                                key={optIndex}
                                className="relative flex items-center cursor-pointer group h-full select-none"
                              >
                                <input 
                                  type="radio" 
                                  name={`q_${q.id}`} 
                                  className="sr-only"
                                  checked={isSelected}
                                  disabled={isSubmitted}
                                  onChange={() => handleSelectOption(q.id, optIndex)}
                                />
                                <div className={`w-full h-full border-2 rounded-xl p-3.5 flex items-center transition-all duration-200 ${bgClass}`}>
                                  <div className={`w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center mr-3 transition-colors ${
                                    isSelected && !isSubmitted 
                                      ? 'border-blue-500 bg-blue-500' 
                                      : 'border-white/20'
                                  }`}>
                                    {isSelected && !isSubmitted && <div className="w-2 h-2 bg-white rounded-full" />}
                                  </div>
                                  <span className="text-sm font-semibold">{optIndex + 1}. {opt}</span>
                                  {icon}
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      )}

                      {/* Explanation for teacher */}
                      {isSubmitted && q.explanation && (
                        <div className="mt-4 border-t border-white/10 pt-4">
                          <div className="bg-[#16213e]/80 border border-[#e63946]/20 rounded-2xl p-5 text-xs sm:text-sm text-gray-200 shadow-md space-y-3">
                            <span className="font-extrabold text-[#e63946] flex items-center gap-2 text-sm uppercase tracking-wider">
                              <Sparkles className="w-4.5 h-4.5 text-yellow-500 animate-pulse" />
                              <span>Đáp án & Giải thích chi tiết:</span>
                            </span>
                            
                            <div className="space-y-3">
                              {q.options && q.options.length > 0 && (
                                <div className="flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-emerald-400 font-bold">
                                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                                  <span>Đáp án đúng: {q.correct + 1}. {q.options[q.correct]}</span>
                                </div>
                              )}
                              
                              <div className="p-4 bg-white/5 rounded-xl space-y-2 text-gray-300 leading-relaxed border border-white/5">
                                <span className="block font-bold text-xs text-blue-400 uppercase tracking-wider">Lời giải chi tiết của Thầy Sơn:</span>
                                <div className="font-medium" dangerouslySetInnerHTML={{ __html: q.explanation }} />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>

              {/* Bottom Nav indicators */}
              <div className="mt-10 pt-6 border-t border-white/10 flex justify-between items-center">
                <div className="text-xs text-gray-400 font-bold">
                  {isSubmitted 
                    ? `Đã nộp bài • Đúng ${calculateScore().totalScore}/${calculateScore().totalQuestions} câu` 
                    : `Đã làm ${Object.keys(userAnswers).length}/${SECTIONS_N3.reduce((acc, sec) => acc + currentExamData[sec.id].filter(q => q.options && q.options.length > 0).length, 0)} câu`
                  }
                </div>
                <button
                  onClick={submitTest}
                  className="bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-extrabold text-xs py-3 px-5 rounded-xl shadow-md transition-all uppercase tracking-wider flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isSubmitted ? "Xem kết quả bài" : "Nộp bài thi"}</span>
                </button>
              </div>

            </section>
          </div>
        )}

      </div>

      {/* ==============================================
          RESULT RESULT MODAL: CHẤM ĐIỂM HOÀN THÀNH
          ============================================== */}
      <AnimatePresence>
        {showResultModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop blur overlay */}
            <motion.div 
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowResultModal(false)}
            />

            {/* Modal Body */}
            {/* Modal Body */}
            <motion.div 
              className="bg-slate-900 border border-white/15 rounded-3xl p-6 sm:p-8 max-w-xl w-full relative z-10 text-center shadow-2xl flex flex-col items-center gap-5 max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
              
              <div className="w-16 h-16 bg-amber-500/10 rounded-full border-2 border-amber-500 flex items-center justify-center text-amber-500 shrink-0">
                <Trophy className="w-8 h-8 animate-bounce" />
              </div>

              <div className="space-y-1">
                <h2 className="text-2xl font-black text-white tracking-wide uppercase">KẾT QUẢ CHI TIẾT</h2>
                <p className="text-[#f0d78c] font-bold text-xs uppercase tracking-wider">{selectedExam?.title || "JLPT N3"} • {selectedExam?.desc || "Đề thi chính thức"}</p>
              </div>

              {/* Score breakdown metrics block */}
              <div className="w-full bg-slate-950/50 rounded-2xl p-5 border border-white/5 flex flex-col sm:flex-row items-center justify-around gap-4 shrink-0">
                <div className="text-center">
                  <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Tổng Số Câu Đúng</span>
                  <div className="flex justify-center items-end gap-1">
                    <span className="text-5xl font-extrabold text-blue-500 font-mono leading-none">
                      {calculateScore().totalScore}
                    </span>
                    <span className="text-lg text-gray-500 font-bold">/</span>
                    <span className="text-2xl text-gray-400 font-bold font-mono">
                      {calculateScore().totalQuestions}
                    </span>
                  </div>
                </div>

                <div className="h-px w-full sm:h-12 sm:w-px bg-white/10" />

                <div className="text-center">
                  <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Tỷ Lệ Chính Xác</span>
                  <span className="text-4xl font-extrabold text-emerald-400 font-mono leading-none">
                    {Math.round(calculateScore().percentage * 100)}%
                  </span>
                </div>

                <div className="h-px w-full sm:h-12 sm:w-px bg-white/10" />

                <div className="text-center">
                  <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Đánh giá chung</span>
                  <div className={`mt-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border ${
                    calculateScore().passed 
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' 
                      : 'bg-rose-500/15 text-rose-400 border-rose-500/20'
                  }`}>
                    {calculateScore().passed ? "ĐÃ ĐẠT (PASS)" : "CẦN CỐ GẮNG"}
                  </div>
                </div>
              </div>

              {/* Subsection score breakdown with custom bars */}
              <div className="w-full space-y-3 text-left shrink-0">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">Phân Tích Chi Tiết Từng Phần:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SECTIONS_N3.map(sec => {
                    const stats = calculateScore().sectionBreakdown[sec.id] || { correct: 0, total: 0, percentage: 0 };
                    const rate = Math.round(stats.percentage * 100);
                    return (
                      <div key={sec.id} className="bg-white/5 border border-white/5 rounded-xl p-3.5 space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-white flex items-center gap-1.5">
                            {sec.icon}
                            <span>{sec.title}</span>
                          </span>
                          <span className="font-bold font-mono text-gray-400">
                            {stats.correct}/{stats.total} ({rate}%)
                          </span>
                        </div>
                        <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${
                              rate >= 70 ? 'bg-emerald-500' : rate >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${rate}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Teacher message box */}
              <div className="w-full bg-[#16213e]/60 border-l-4 border-blue-500 p-4 rounded-r-2xl text-left space-y-2 text-xs sm:text-sm shrink-0">
                <div className="font-bold text-blue-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                  <span>Lời khuyên của Thầy Sơn:</span>
                </div>
                <p className="text-white font-medium leading-relaxed">
                  {calculateScore().message}
                </p>
                <p className="text-gray-300 italic">
                  {calculateScore().weaknessFeedback}
                </p>
              </div>

              <div className="w-full pt-2 border-t border-white/10 mt-1 shrink-0">
                <button
                  onClick={() => {
                    handlePlaySound("click");
                    setShowResultModal(false);
                  }}
                  className="w-full bg-[#e63946] hover:bg-red-600 active:scale-95 text-white font-extrabold text-sm py-3 px-4 rounded-xl shadow-lg transition-all uppercase tracking-wider"
                >
                  Đóng và xem giải thích chi tiết
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
