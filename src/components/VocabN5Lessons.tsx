import React, { useState, useEffect, useMemo } from "react";
import { playSound } from "../utils/audio";
import { RAW_N5_VOCAB } from "../data/vocabN5";
import { 
  ArrowLeft, 
  Volume2, 
  Check, 
  BookOpen, 
  Search, 
  RotateCcw, 
  Sparkles, 
  Layers, 
  List, 
  HelpCircle, 
  Play, 
  Bookmark, 
  ChevronRight,
  GraduationCap
} from "lucide-react";

interface VocabN5LessonsProps {
  onGoBack: () => void;
}

interface VocabWord {
  id: number;
  hiragana: string;
  kanji: string;
  meaning: string;
  category: string;
  lesson: number;
}

interface SRSItem {
  interval: number;
  nextReview: string;
  efactor: number;
  repCount: number;
}

export default function VocabN5Lessons({ onGoBack }: VocabN5LessonsProps) {
  // Map raw vocab data to robust structure
  const vocabData: VocabWord[] = useMemo(() => {
    return RAW_N5_VOCAB.map((item, idx) => {
      const hira = item[0] || "";
      const kan = item[1] || hira;
      const mean = item[2] || "";
      const cat = item[3] || "N5 Vocabulary";
      return {
        id: idx + 1,
        hiragana: hira,
        kanji: kan,
        meaning: mean,
        category: cat,
        lesson: Math.min(25, Math.floor(idx / 40) + 1)
      };
    });
  }, []);

  const lessons = useMemo(() => [
    { id: 1, title: "Bài 1: Chào hỏi cơ bản", icon: "👋" },
    { id: 2, title: "Bài 2: Đồ vật xung quanh", icon: "📚" },
    { id: 3, title: "Bài 3: Địa điểm & Giá cả", icon: "🏢" },
    { id: 4, title: "Bài 4: Thời gian & Lịch trình", icon: "⏰" },
    { id: 5, title: "Bài 5: Đi lại & Phương tiện", icon: "🚗" },
    { id: 6, title: "Bài 6: Hoạt động thường nhật", icon: "🍚" },
    { id: 7, title: "Bài 7: Cho nhận & Đồ dùng", icon: "🎁" },
    { id: 8, title: "Bài 8: Tính từ & Trạng thái", icon: "🌈" },
    { id: 9, title: "Bài 9: Sở thích & Khả năng", icon: "🎤" },
    { id: 10, title: "Bài 10: Vị trí & Tồn tại", icon: "📍" },
    { id: 11, title: "Bài 11: Số lượng & Gia đình", icon: "🔢" },
    { id: 12, title: "Bài 12: So sánh & Thời tiết", icon: "🌸" },
    { id: 13, title: "Bài 13: Mong muốn & Hành động", icon: "🏊" },
    { id: 14, title: "Bài 14: Thao tác & Chỉ dẫn", icon: "🚦" },
    { id: 15, title: "Bài 15: Chuyên môn & Đời sống", icon: "👔" },
    { id: 16, title: "Bài 16: Di chuyển & Sức khỏe", icon: "🚉" },
    { id: 17, title: "Bài 17: Công việc & Phòng ngừa", icon: "💊" },
    { id: 18, title: "Bài 18: Khả năng & Thói quen", icon: "🎨" },
    { id: 19, title: "Bài 19: Kinh nghiệm & Trở thành", icon: "🏋️" },
    { id: 20, title: "Bài 20: Giao tiếp thân mật", icon: "💼" },
    { id: 21, title: "Bài 21: Ý kiến & Suy nghĩ", icon: "💭" },
    { id: 22, title: "Bài 22: Trang phục & Nhà cửa", icon: "👘" },
    { id: 23, title: "Bài 23: Chỉ đường & Thao tác", icon: "🚶" },
    { id: 24, title: "Bài 24: Giúp đỡ & Chia sẻ", icon: "🤝" },
    { id: 25, title: "Bài 25: Du học & Tương lai", icon: "🎓" }
  ], []);

  const [activeTab, setActiveTab] = useState<"dashboard" | "wordlist" | "flashcard" | "quiz" | "lessons">("dashboard");
  const [srsState, setSrsState] = useState<Record<number, SRSItem>>({});
  const [selectedLesson, setSelectedLesson] = useState<number>(1);
  
  // Wordlist filters
  const [listFilterLesson, setListFilterLesson] = useState<string>("all");
  const [listSearchQuery, setListSearchQuery] = useState<string>("all_words"); // default flag or empty

  // Active Session states
  const [sessionQueue, setSessionQueue] = useState<VocabWord[]>([]);
  const [sessionIndex, setSessionIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Quiz session states
  const [quizWord, setQuizWord] = useState<VocabWord | null>(null);
  const [quizOptions, setQuizOptions] = useState<VocabWord[]>([]);
  const [quizAnsweredId, setQuizAnsweredId] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });

  const todayStr = (): string => {
    return new Date().toISOString().slice(0, 10);
  };

  // Load local state
  useEffect(() => {
    const STORAGE_KEY = 'n5_srs_v8';
    const SETTINGS_KEY = 'n5_settings_v8';

    const savedSRS = localStorage.getItem(STORAGE_KEY);
    const savedSettings = localStorage.getItem(SETTINGS_KEY);

    let initialSRS: Record<number, SRSItem> = {};
    const today = todayStr();

    if (savedSRS) {
      try {
        const parsed = JSON.parse(savedSRS);
        for (const id in parsed) {
          const item = parsed[id];
          if (Array.isArray(item)) {
            initialSRS[Number(id)] = {
              interval: item[0],
              nextReview: item[1],
              efactor: item[2],
              repCount: item[3]
            };
          } else {
            initialSRS[Number(id)] = item;
          }
        }
      } catch (e) {
        console.error("Failed to parse N5 SRS state:", e);
      }
    }

    // Populate missing items
    vocabData.forEach((v) => {
      if (!initialSRS[v.id]) {
        initialSRS[v.id] = {
          interval: 0,
          nextReview: today,
          efactor: 2.5,
          repCount: 0
        };
      }
    });

    setSrsState(initialSRS);

    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        if (parsed.defaultLesson) {
          setSelectedLesson(parsed.defaultLesson);
        }
      } catch (e) {}
    }
  }, [vocabData]);

  // Save state
  const saveSRSState = (updatedSRS: Record<number, SRSItem>) => {
    const dataToSave: Record<number, [number, string, number, number]> = {};
    for (const id in updatedSRS) {
      const s = updatedSRS[id];
      if (s.repCount > 0 || s.interval > 0) {
        dataToSave[Number(id)] = [s.interval, s.nextReview, s.efactor, s.repCount];
      }
    }
    localStorage.setItem('n5_srs_v8', JSON.stringify(dataToSave));
    setSrsState(updatedSRS);
  };

  const handleSetDefaultLesson = (lessonId: number) => {
    setSelectedLesson(lessonId);
    localStorage.setItem('n5_settings_v8', JSON.stringify({ defaultLesson: lessonId }));
  };

  // TTS Voice Speak
  const speak = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  // Stats computed properties
  const stats = useMemo(() => {
    const today = todayStr();
    const list = Object.values(srsState) as SRSItem[];
    const total = vocabData.length;
    const learned = list.filter(s => s.repCount > 0).length;
    const mastered = list.filter(s => s.repCount >= 5).length;
    const due = vocabData.filter(v => {
      const s = srsState[v.id];
      return s && s.nextReview <= today;
    }).length;

    return { total, learned, mastered, due };
  }, [srsState, vocabData]);

  // Lessons stats
  const lessonStats = useMemo(() => {
    const today = todayStr();
    const statsMap: Record<number, { total: number; learned: number; due: number }> = {};
    
    lessons.forEach(l => {
      statsMap[l.id] = { total: 0, learned: 0, due: 0 };
    });

    vocabData.forEach(v => {
      const s = srsState[v.id];
      const isLearned = s && s.repCount > 0;
      const isDue = s && s.nextReview <= today;
      
      if (statsMap[v.lesson]) {
        statsMap[v.lesson].total++;
        if (isLearned) statsMap[v.lesson].learned++;
        if (isDue) statsMap[v.lesson].due++;
      }
    });

    return statsMap;
  }, [srsState, vocabData, lessons]);

  // SRS Update Algorithm
  const handleSRSResponse = (wordId: number, remembered: boolean) => {
    const updated = { ...srsState };
    const s = updated[wordId] || { interval: 0, nextReview: todayStr(), efactor: 2.5, repCount: 0 };

    if (remembered) {
      playSound.correct();
      if (s.repCount === 0) {
        s.interval = 1;
      } else if (s.repCount === 1) {
        s.interval = 3;
      } else {
        s.interval = Math.round(s.interval * s.efactor);
      }
      s.efactor = Math.min(2.5, s.efactor + 0.1);
      s.repCount++;
    } else {
      playSound.wrong();
      s.interval = 0;
      s.repCount = 0;
      s.efactor = Math.max(1.3, s.efactor - 0.2);
    }

    const next = new Date();
    next.setDate(next.getDate() + s.interval);
    s.nextReview = next.toISOString().slice(0, 10);

    updated[wordId] = s;
    saveSRSState(updated);
  };

  // Shuffle Helper
  const shuffle = <T,>(arr: T[]): T[] => {
    return [...arr].sort(() => Math.random() - 0.5);
  };

  // Quick Action Buttons
  const startReviewDue = () => {
    playSound.click();
    const today = todayStr();
    const dueWords = vocabData.filter(v => {
      const s = srsState[v.id];
      return s && s.nextReview <= today;
    });

    if (dueWords.length === 0) {
      alert("Tuyệt hảo! Toàn bộ từ vựng đã được ôn tập xong.");
      return;
    }

    setSessionQueue(shuffle(dueWords));
    setSessionIndex(0);
    setIsFlipped(false);
    setActiveTab("flashcard");
  };

  const startLearnNew = (customLessonId?: number) => {
    playSound.click();
    const targetLesson = customLessonId || selectedLesson;
    const newWords = vocabData.filter(v => {
      const s = srsState[v.id];
      return v.lesson === targetLesson && (!s || s.repCount === 0);
    });

    if (newWords.length === 0) {
      alert(`Bài học ${targetLesson} không còn từ vựng mới để tu luyện.`);
      return;
    }

    // Limit to 10 words at a time
    setSessionQueue(shuffle(newWords).slice(0, 10));
    setSessionIndex(0);
    setIsFlipped(false);
    setActiveTab("flashcard");
  };

  const startReviewLesson = (lessonId: number) => {
    playSound.click();
    const lessonWords = vocabData.filter(v => v.lesson === lessonId);
    if (lessonWords.length === 0) return;

    setSessionQueue(shuffle(lessonWords));
    setSessionIndex(0);
    setIsFlipped(false);
    setActiveTab("flashcard");
  };

  // Quiz flow
  const generateQuizQuestion = () => {
    const today = todayStr();
    const due = vocabData.filter(v => {
      const s = srsState[v.id];
      return s && s.nextReview <= today;
    });

    const pool = due.length > 0 ? due : vocabData;
    const correctWord = shuffle(pool)[0];
    if (!correctWord) return;

    const incorrectPool = vocabData.filter(v => v.id !== correctWord.id);
    const incorrects = shuffle(incorrectPool).slice(0, 3);
    const choices = shuffle([correctWord, ...incorrects]);

    setQuizWord(correctWord);
    setQuizOptions(choices);
    setQuizAnsweredId(null);
  };

  useEffect(() => {
    if (activeTab === "quiz") {
      generateQuizQuestion();
    }
  }, [activeTab]);

  const handleQuizAnswer = (optionId: number) => {
    if (quizAnsweredId !== null || !quizWord) return;
    setQuizAnsweredId(optionId);
    
    const isCorrect = optionId === quizWord.id;
    if (isCorrect) {
      playSound.correct();
      setQuizScore(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }));
      handleSRSResponse(quizWord.id, true);
    } else {
      playSound.wrong();
      setQuizScore(prev => ({ ...prev, total: prev.total + 1 }));
      handleSRSResponse(quizWord.id, false);
    }
  };

  // Word list items filtered
  const filteredWordsList = useMemo(() => {
    return vocabData.filter(v => {
      const matchesLesson = listFilterLesson === "all" || v.lesson === Number(listFilterLesson);
      
      const query = listSearchQuery === "all_words" || !listSearchQuery ? "" : listSearchQuery.trim().toLowerCase();
      const matchesSearch = !query || 
        v.kanji.toLowerCase().includes(query) || 
        v.hiragana.toLowerCase().includes(query) || 
        v.meaning.toLowerCase().includes(query);

      return matchesLesson && matchesSearch;
    });
  }, [vocabData, listFilterLesson, listSearchQuery]);

  return (
    <div id="vocab-n5-container" className="washi-pattern min-h-screen p-4 sm:p-8 -mx-4 sm:-mx-8 rounded-[40px] border-2 border-[#1A1A1A] text-[#1A1A1A]" style={{ fontFamily: "'Lora', 'Noto Serif JP', serif" }}>
      
      {/* Sub navigation bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b-2 border-[#1A1A1A] pb-4 gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playSound.click();
              onGoBack();
            }}
            className="p-2 border-2 border-[#1A1A1A] bg-white rounded-xl shadow-[2px_2px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none hover:text-[#8B0000] cursor-pointer transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-9 h-9 border-2 border-[#1A1A1A] bg-[#1A1A1A] rounded flex items-center justify-center text-white font-black text-lg" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            詞
          </div>
          <span className="text-lg font-black tracking-widest text-[#1A1A1A]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            TỪ VỰNG N5 - THẦY SƠN
          </span>
        </div>

        {/* Tab selection */}
        <div className="flex bg-slate-100 p-1 rounded-2xl border-2 border-[#1A1A1A] max-w-full overflow-x-auto">
          {[
            { id: "dashboard", label: "Tổng Quan", icon: <Layers className="w-4 h-4" /> },
            { id: "wordlist", label: "Danh Sách Từ", icon: <List className="w-4 h-4" /> },
            { id: "flashcard", label: "Luyện Thẻ", icon: <Sparkles className="w-4 h-4" /> },
            { id: "quiz", label: "Đố Vui", icon: <HelpCircle className="w-4 h-4" /> },
            { id: "lessons", label: "Giáo Trình", icon: <BookOpen className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playSound.click();
                setActiveTab(tab.id as any);
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id 
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

      {/* Hero card display */}
      {activeTab === "dashboard" && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <section className="flex flex-col md:flex-row items-stretch gap-8 bg-white p-6 sm:p-8 border-4 border-[#1A1A1A] relative shadow-[6px_6px_0px_#1A1A1A] rounded-3xl">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#8B0000]"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#8B0000]"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#8B0000]"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#8B0000]"></div>

            <div className="w-28 h-28 flex-shrink-0 overflow-hidden flex items-center justify-center border-4 border-[#8B0000] rounded-full bg-[#1A0000] mx-auto md:mx-0 shadow-lg">
              <span className="text-white text-5xl font-black font-serif" style={{ fontFamily: "'Noto Serif JP', serif" }}>詞</span>
            </div>

            <div className="flex-1 flex flex-col justify-center text-center md:text-left space-y-3">
              <div className="hanko-seal px-3 py-0.5 text-[10px] font-black tracking-widest w-max mx-auto md:mx-0 bg-[#8B0000]/10 border border-[#8B0000]">
                QUYỂN III · N5 TỪ VỰNG
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#1A1A1A]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                Kho Vũ Khí Từ Vựng N5 Chuyên Sâu
              </h1>
              <p className="text-sm sm:text-base text-gray-700 italic border-l-4 border-[#8B0000] pl-4 leading-relaxed bg-gray-50/50 py-1.5">
                "Từ vựng chính là kiếm để chém quái, là khiên để phòng vệ trong các trận đồ ải tiếng Nhật. Nhớ càng chắc, lưỡi kiếm của ngươi càng mài bén. Hãy sử dụng hệ thống Spaced Repetition (SRS) để găm chặt từ vựng vào trí não vĩnh viễn!"
              </p>
            </div>
          </section>

          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 border-2 border-[#1A1A1A] rounded-2xl shadow-[4px_4px_0px_#1A1A1A] text-center space-y-1">
              <div className="text-xs font-black text-gray-400 uppercase tracking-widest">Toàn bộ kho</div>
              <div className="text-3xl font-black text-[#1A1A1A]">{stats.total}</div>
              <div className="text-xs font-bold text-gray-500">Từ vựng chuẩn N5</div>
            </div>

            <div className="bg-yellow-50 p-5 border-2 border-[#1A1A1A] rounded-2xl shadow-[4px_4px_0px_#1A1A1A] text-center space-y-1">
              <div className="text-xs font-black text-yellow-700 uppercase tracking-widest">Đang tu luyện</div>
              <div className="text-3xl font-black text-[#1A1A1A]">{stats.learned}</div>
              <div className="text-xs font-bold text-yellow-800">Đã kích hoạt SRS</div>
            </div>

            <div className="bg-green-50 p-5 border-2 border-[#1A1A1A] rounded-2xl shadow-[4px_4px_0px_#1A1A1A] text-center space-y-1">
              <div className="text-xs font-black text-green-700 uppercase tracking-widest">Đã thành thạo</div>
              <div className="text-3xl font-black text-[#1A1A1A]">{stats.mastered}</div>
              <div className="text-xs font-bold text-green-800">Đạt cột mốc Level 5+</div>
            </div>

            <div className="bg-red-50 p-5 border-2 border-[#1A1A1A] rounded-2xl shadow-[4px_4px_0px_#1A1A1A] text-center space-y-1">
              <div className="text-xs font-black text-[#8B0000] uppercase tracking-widest">Cần luyện tập</div>
              <div className="text-3xl font-black text-[#8B0000]">{stats.due}</div>
              <div className="text-xs font-bold text-red-800">Cần ôn hôm nay</div>
            </div>
          </div>

          {/* Call to actions */}
          <div className="bg-white p-6 sm:p-8 border-2 border-[#1A1A1A] rounded-3xl shadow-[4px_4px_0px_#1A1A1A] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-lg font-black text-[#1A1A1A]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                🎯 Trạng thái tu luyện hôm nay của ngươi
              </h3>
              <p className="text-sm text-gray-600 font-medium">
                {stats.due > 0 
                  ? `Ngươi có ${stats.due} từ vựng đã đến kì hạn suy yếu cần mài sắc lại ngay lập tức!`
                  : "Tuyệt đỉnh! Hôm nay không có vũ khí từ vựng nào bị cùn đi cả. Hãy mở mang bờ cõi bằng cách học từ mới."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              {stats.due > 0 && (
                <button
                  onClick={startReviewDue}
                  className="px-6 py-3.5 bg-[#8B0000] text-white font-black rounded-xl shadow-[3px_3px_0px_#1A1A1A] border border-[#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none uppercase tracking-wider text-xs sm:text-sm cursor-pointer transition flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Mài sắc từ cần ôn ({stats.due})
                </button>
              )}
              <button
                onClick={() => startLearnNew()}
                className="px-6 py-3.5 bg-white text-[#1A1A1A] font-black rounded-xl shadow-[3px_3px_0px_#1A1A1A] border-2 border-[#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none uppercase tracking-wider text-xs sm:text-sm cursor-pointer transition flex items-center justify-center gap-2 hover:bg-[#FDFBF7]"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                Học 10 từ mới Bài {selectedLesson}
              </button>
            </div>
          </div>

          {/* Quick Config */}
          <div className="bg-amber-50/50 p-6 border-2 border-dashed border-[#1A1A1A] rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-black text-[#8B0000] uppercase tracking-widest">Tiêu Điểm Tu Luyện</span>
              <p className="text-sm font-bold text-gray-700">Chọn bài mặc định khi ấn nút "Học từ mới":</p>
            </div>
            <select
              value={selectedLesson}
              onChange={(e) => handleSetDefaultLesson(Number(e.target.value))}
              className="px-4 py-2 bg-white border-2 border-[#1A1A1A] rounded-xl font-bold text-sm cursor-pointer outline-none focus:border-[#8B0000]"
            >
              {lessons.map(l => (
                <option key={l.id} value={l.id}>
                  {l.icon} {l.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* ================== LIST OF WORDS TAB ================== */}
      {activeTab === "wordlist" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Filters row */}
          <div className="bg-white p-4 border-2 border-[#1A1A1A] rounded-2xl shadow-[2px_2px_0px_#1A1A1A] flex flex-col sm:flex-row gap-4 items-center">
            
            {/* Lesson Filter */}
            <div className="flex items-center gap-2 w-full sm:w-auto flex-1">
              <span className="text-xs font-black text-slate-500 whitespace-nowrap">Xem bài:</span>
              <select
                value={listFilterLesson}
                onChange={(e) => setListFilterLesson(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border-2 border-slate-200 focus:border-[#8B0000] rounded-xl font-bold text-sm outline-none"
              >
                <option value="all">Tất cả 25 bài học</option>
                {lessons.map(l => (
                  <option key={l.id} value={l.id}>
                    {l.icon} {l.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Text search */}
            <div className="relative w-full sm:w-auto flex-[2]">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm chữ Hán, Hiragana hoặc nghĩa tiếng Việt..."
                value={listSearchQuery === "all_words" ? "" : listSearchQuery}
                onChange={(e) => setListSearchQuery(e.target.value || "all_words")}
                className="w-full pl-9 pr-4 py-2 border-2 border-slate-200 focus:border-[#8B0000] rounded-xl font-bold text-sm outline-none bg-slate-50"
              />
            </div>
          </div>

          {/* Count Display */}
          <p className="text-xs font-bold text-slate-500 text-right">
            Tìm thấy <strong className="text-[#1A1A1A]">{filteredWordsList.length}</strong> từ vựng phù hợp.
          </p>

          {/* Vocabulary list items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredWordsList.slice(0, 100).map((v) => {
              const s = srsState[v.id];
              const isDue = s && s.nextReview <= todayStr();
              const hasKanji = v.kanji && v.kanji !== v.hiragana && !v.kanji.startsWith("～");
              
              return (
                <div 
                  key={v.id} 
                  className="bg-white p-4 border-2 border-[#1A1A1A] rounded-2xl shadow-[3px_3px_0px_#1A1A1A] hover:border-[#8B0000] transition flex justify-between items-center group relative overflow-hidden"
                >
                  <div className="space-y-1.5 flex-1 pr-4">
                    <div className="flex items-baseline gap-2.5">
                      {hasKanji ? (
                        <>
                          <span className="text-2xl font-black text-slate-900 font-serif leading-none" style={{ fontFamily: "'Noto Serif JP', serif" }}>{v.kanji}</span>
                          <span className="text-xs font-bold text-slate-400 font-mono">({v.hiragana})</span>
                        </>
                      ) : (
                        <span className="text-xl font-black text-slate-900 font-serif leading-none" style={{ fontFamily: "'Noto Serif JP', serif" }}>{v.hiragana}</span>
                      )}
                    </div>

                    <div className="inline-block bg-[#1e293b] text-[#fef9c3] text-xs font-black px-3 py-1 rounded-full shadow-inner tracking-wide">
                      {v.meaning}
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      <span>Bài {v.lesson}</span>
                      <span>•</span>
                      <span>{v.category}</span>
                      {s && s.repCount > 0 && (
                        <>
                          <span>•</span>
                          <span className={isDue ? "text-[#8B0000]" : "text-green-600"}>
                            {isDue ? "🔴 Cần Ôn" : "🟢 Đã Ôn"}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => speak(v.kanji || v.hiragana)}
                    className="p-3 bg-slate-50 border border-slate-200 hover:bg-[#8B0000] hover:text-white rounded-xl transition cursor-pointer flex-shrink-0"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>

          {filteredWordsList.length > 100 && (
            <p className="text-center text-xs font-bold text-slate-400 py-4">
              Chỉ hiển thị tối đa 100 từ vựng tiêu biểu nhất. Hãy thu hẹp tìm kiếm hoặc lọc theo từng Bài học!
            </p>
          )}
        </div>
      )}

      {/* ================== FLASHCARDS TAB ================== */}
      {activeTab === "flashcard" && (
        <div className="max-w-xl mx-auto space-y-6 animate-in fade-in duration-300">
          
          {sessionQueue.length > 0 && sessionIndex < sessionQueue.length ? (
            <>
              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-black text-slate-500 uppercase tracking-widest">
                  <span>Tiến Độ Phiên</span>
                  <span>{sessionIndex + 1} / {sessionQueue.length}</span>
                </div>
                <div className="w-full h-3 bg-slate-100 border border-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#8B0000] transition-all duration-300"
                    style={{ width: `${((sessionIndex + 1) / sessionQueue.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Card Container */}
              <div 
                onClick={() => {
                  playSound.flip();
                  setIsFlipped(!isFlipped);
                }}
                className="bg-white min-h-[260px] border-4 border-[#1A1A1A] rounded-3xl shadow-[6px_6px_0px_#1A1A1A] p-6 sm:p-8 flex flex-col justify-between items-center text-center cursor-pointer relative overflow-hidden select-none"
              >
                {/* Vintage border decoration */}
                <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-red-800"></div>
                <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-red-800"></div>
                <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-red-800"></div>
                <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-red-800"></div>

                <div className="text-[10px] font-black tracking-widest text-[#8B0000] border border-[#8B0000]/30 px-2.5 py-0.5 rounded-full bg-red-50/50">
                  {isFlipped ? "ĐÁP ÁN (NGHĨA TIẾNG VIỆT)" : `BÀI ${sessionQueue[sessionIndex].lesson} · MẶT TRƯỚC`}
                </div>

                <div className="my-auto space-y-4">
                  {!isFlipped ? (
                    <>
                      <div className="text-4xl sm:text-5xl font-black text-slate-800 font-serif leading-normal" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                        {sessionQueue[sessionIndex].kanji}
                      </div>
                      {sessionQueue[sessionIndex].kanji !== sessionQueue[sessionIndex].hiragana && (
                        <div className="text-lg font-bold text-slate-500 font-mono">
                          {sessionQueue[sessionIndex].hiragana}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="text-3xl sm:text-4xl font-black text-[#8B0000] font-serif leading-normal">
                        {sessionQueue[sessionIndex].meaning}
                      </div>
                      <div className="text-xs font-black uppercase text-slate-400 tracking-wider bg-slate-50 px-3 py-1 rounded-full">
                        {sessionQueue[sessionIndex].category}
                      </div>
                    </>
                  )}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speak(sessionQueue[sessionIndex].kanji || sessionQueue[sessionIndex].hiragana);
                    }}
                    className="p-2 border border-slate-200 rounded-full hover:bg-slate-100 transition cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <span className="text-[10px] font-bold text-slate-400 self-center uppercase tracking-widest">Chạm vào thẻ để lật</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    handleSRSResponse(sessionQueue[sessionIndex].id, false);
                    setIsFlipped(false);
                    setSessionIndex(sessionIndex + 1);
                  }}
                  className="py-3 bg-[#e11d48] text-white font-black rounded-xl border border-[#1A1A1A] shadow-[3px_3px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none uppercase tracking-wider text-xs sm:text-sm cursor-pointer transition text-center"
                >
                  🙁 Chưa nhớ sâu
                </button>

                <button
                  onClick={() => {
                    handleSRSResponse(sessionQueue[sessionIndex].id, true);
                    setIsFlipped(false);
                    setSessionIndex(sessionIndex + 1);
                  }}
                  className="py-3 bg-[#16a34a] text-white font-black rounded-xl border border-[#1A1A1A] shadow-[3px_3px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none uppercase tracking-wider text-xs sm:text-sm cursor-pointer transition text-center"
                >
                  😊 Đã nhớ kĩ
                </button>
              </div>

              <button
                onClick={() => {
                  playSound.click();
                  setSessionQueue([]);
                }}
                className="w-full py-2 border-2 border-slate-300 text-slate-500 hover:text-[#1A1A1A] hover:bg-slate-50 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer text-center"
              >
                Dừng phiên tu luyện
              </button>
            </>
          ) : (
            <div className="bg-white p-8 border-4 border-[#1A1A1A] rounded-3xl text-center space-y-6 shadow-[6px_6px_0px_#1A1A1A]">
              <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto text-4xl font-bold">
                ✓
              </div>
              <h3 className="text-xl font-black text-slate-800" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                Hoàn Thành Tuyệt Đối!
              </h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed max-w-sm mx-auto">
                Phiên mài dũa từ vựng của bạn đã kết thúc mỹ mãn. Trí lực của bạn đã được nâng cao. Hãy tiếp tục ôn tập hoặc thử sức đố vui!
              </p>
              <div className="flex gap-4 max-w-xs mx-auto">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className="w-full py-2.5 bg-[#1A1A1A] text-white font-black rounded-xl uppercase tracking-wider text-xs cursor-pointer hover:bg-[#8B0000] transition"
                >
                  Quay lại tổng quan
                </button>
                <button
                  onClick={() => startLearnNew()}
                  className="w-full py-2.5 bg-amber-500 text-white font-black rounded-xl uppercase tracking-wider text-xs cursor-pointer hover:bg-amber-600 transition"
                >
                  Học thêm từ mới
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ================== QUIZ TAB ================== */}
      {activeTab === "quiz" && (
        <div className="max-w-xl mx-auto space-y-6 animate-in fade-in duration-300">
          
          <div className="bg-white p-6 sm:p-8 border-4 border-[#1A1A1A] rounded-3xl shadow-[6px_6px_0px_#1A1A1A] space-y-6 relative overflow-hidden">
            
            {/* Top Stats bar */}
            <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-slate-500 border-b pb-3">
              <span>Đại Hải Trình Từ Vựng</span>
              <span className="text-[#8B0000]">Đúng: {quizScore.correct} / {quizScore.total}</span>
            </div>

            {quizWord ? (
              <>
                {/* Question layout */}
                <div className="text-center space-y-2 py-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#8B0000] bg-red-50/50 border border-red-200 px-3 py-1 rounded-full">Chọn nghĩa chính xác</span>
                  <h2 className="text-4xl font-black text-slate-800 font-serif leading-none pt-2" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                    {quizWord.kanji}
                  </h2>
                  {quizWord.kanji !== quizWord.hiragana && (
                    <p className="text-sm font-bold text-slate-500 font-mono">({quizWord.hiragana})</p>
                  )}
                </div>

                {/* Choices list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {quizOptions.map((opt) => {
                    const isAnswered = quizAnsweredId !== null;
                    const isUserChoice = quizAnsweredId === opt.id;
                    const isCorrectAnswer = opt.id === quizWord.id;

                    let btnClass = "border-slate-200 hover:border-[#1A1A1A] bg-white";
                    if (isAnswered) {
                      if (isCorrectAnswer) {
                        btnClass = "border-green-500 bg-green-50 text-green-700";
                      } else if (isUserChoice) {
                        btnClass = "border-red-400 bg-red-50 text-red-700";
                      } else {
                        btnClass = "border-slate-100 text-slate-300 bg-slate-50/50";
                      }
                    }

                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleQuizAnswer(opt.id)}
                        disabled={isAnswered}
                        className={`p-4 border-2 rounded-2xl text-left font-bold text-sm transition-all duration-150 cursor-pointer ${btnClass}`}
                      >
                        {opt.meaning}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback & Next Button */}
                {quizAnsweredId !== null && (
                  <div className="space-y-4 animate-in slide-in-from-bottom duration-200">
                    <p className={`text-center text-sm font-black uppercase tracking-wider ${
                      quizAnsweredId === quizWord.id ? "text-green-600" : "text-[#8B0000]"
                    }`}>
                      {quizAnsweredId === quizWord.id ? "✨ Tuyệt diệu! Ngươi chọn đúng rồi!" : "❌ Đáng tiếc, chưa chuẩn xác!"}
                    </p>

                    <button
                      onClick={generateQuizQuestion}
                      className="w-full py-3 bg-[#1A1A1A] hover:bg-[#8B0000] text-white font-black rounded-xl uppercase tracking-wider text-xs cursor-pointer transition text-center flex items-center justify-center gap-2"
                    >
                      <span>Câu tiếp theo</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="text-center text-slate-500 py-6">Đang chuẩn bị câu đố vựng...</p>
            )}

          </div>

        </div>
      )}

      {/* ================== LESSONS TAB ================== */}
      {activeTab === "lessons" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((l) => {
              const lessonWordList = vocabData.filter(v => v.lesson === l.id);
              const stats = lessonStats[l.id] || { total: 0, learned: 0, due: 0 };
              const percent = stats.total > 0 ? Math.round((stats.learned / stats.total) * 100) : 0;

              return (
                <div 
                  key={l.id} 
                  className="bg-white p-5 border-2 border-[#1A1A1A] rounded-2xl shadow-[4px_4px_0px_#1A1A1A] flex flex-col justify-between gap-4 group hover:border-[#8B0000] transition"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{l.icon}</span>
                      <div>
                        <h4 className="font-black text-base text-slate-800 leading-tight" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                          {l.title}
                        </h4>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          {stats.total} từ vựng
                        </span>
                      </div>
                    </div>

                    {/* Progress slider */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        <span>Đã học {stats.learned}/{stats.total}</span>
                        <span>{percent}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-50 border border-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-slate-800 group-hover:bg-[#8B0000] transition-all duration-300"
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Actions inside card */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => startLearnNew(l.id)}
                      className="flex-1 py-2 bg-white text-[#1A1A1A] font-black border-2 border-[#1A1A1A] hover:bg-[#FDFBF7] rounded-xl text-[10px] uppercase tracking-wider cursor-pointer text-center"
                    >
                      🆕 Học từ mới
                    </button>
                    <button
                      onClick={() => startReviewLesson(l.id)}
                      className="flex-1 py-2 bg-[#1A1A1A] text-white font-black hover:bg-[#8B0000] rounded-xl text-[10px] uppercase tracking-wider cursor-pointer text-center transition"
                    >
                      🔄 Ôn tập bài
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* Footer info */}
      <div className="mt-12 text-center text-[#b2917a] text-xs font-bold border-t border-[#e4d3c3] pt-6 flex items-center justify-center gap-1">
        <GraduationCap className="w-4 h-4" />
        <span>Học Cùng Thầy Sơn — Đệ Nhất Kiếm Pháp Phát Âm Chuẩn Học Thuật Nhật Bản</span>
      </div>

    </div>
  );
}
