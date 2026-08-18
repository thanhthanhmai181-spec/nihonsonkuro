import React, { useState, useMemo, useEffect } from "react";
import { 
  ALL_COUNTERS, 
  BASIC_NUMBERS, 
  Counter, 
  CounterItem, 
  generate1To20List 
} from "../data/countersData";
import { playSound } from "../utils/audio";
import { 
  Volume2, 
  Hash, 
  Clock, 
  BookMarked, 
  Info, 
  ClipboardCheck, 
  Sparkles, 
  AlertCircle, 
  Search, 
  ChevronRight, 
  ChevronLeft,
  Award, 
  RotateCcw, 
  ArrowRight, 
  CheckCircle2, 
  XCircle 
} from "lucide-react";

interface CountersHandbookProps {
  onGoBack: () => void;
}

interface QuizQuestion {
  counter: Counter;
  number: number;
  correctAnswer: string;
  kanji: string;
  options: string[];
  explanation: string;
}

export default function CountersHandbook({ onGoBack }: CountersHandbookProps) {
  const [activeSubTab, setActiveSubTab] = useState<"basicNumbers" | "guide1to20" | "dictionary" | "rules" | "quiz">("basicNumbers");
  const [activeCounterId, setActiveCounterId] = useState<string>("tsu");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Quiz states
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Switch tabs with click sound
  const handleSwitchTab = (tabId: typeof activeSubTab) => {
    playSound.click();
    setActiveSubTab(tabId);
    if (tabId === "quiz") {
      generateQuiz();
    }
  };

  // TTS helper
  const speakJa = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      // Speak only the main Japanese reading part (e.g. before / or parentheses)
      const cleanText = text.split("/")[0].split("(")[0].trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = "ja-JP";
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  // 1-20 active counter selector data
  const activeCounter = useMemo(() => {
    return ALL_COUNTERS.find(c => c.id === activeCounterId) || ALL_COUNTERS[0];
  }, [activeCounterId]);

  const active1To20List = useMemo(() => {
    return generate1To20List(activeCounter);
  }, [activeCounter]);

  // Dictionary filters
  const categories = ["All", "Cốt lõi", "Thời gian", "Vật thể", "Người & Động vật", "Vị trí & Địa điểm", "Khác"];
  
  const filteredCounters = useMemo(() => {
    return ALL_COUNTERS.filter(counter => {
      const matchesCategory = selectedCategory === "All" || counter.category === selectedCategory;
      const matchesSearch = counter.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            counter.kanji.includes(searchTerm) || 
                            counter.romaji.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  // Quiz generator
  const generateQuiz = () => {
    // Collect all possible number + counter combinations as a pool
    const pool: { counter: Counter; number: number; correctAnswer: string; kanji: string; rawItem: CounterItem }[] = [];
    
    ALL_COUNTERS.forEach(counter => {
      const maxLimit = counter.id === "tsu" ? 10 : 20;
      const list20 = generate1To20List(counter);
      
      for (let num = 1; num <= maxLimit; num++) {
        const item = list20.find(x => x.num === num);
        if (item) {
          pool.push({
            counter,
            number: num,
            correctAnswer: item.reading,
            kanji: item.kanji,
            rawItem: item
          });
        }
      }
    });

    // Shuffle pool
    const shuffledPool = [...pool].sort(() => Math.random() - 0.5);
    
    // Pick 20 questions
    const selected = shuffledPool.slice(0, 20);
    
    const questions: QuizQuestion[] = selected.map(q => {
      const list20 = generate1To20List(q.counter);
      const otherOptions = list20
        .filter(x => x.reading !== q.correctAnswer)
        .map(x => x.reading)
        .sort(() => Math.random() - 0.5);

      const incorrect1 = otherOptions[0] || (q.correctAnswer + "り");
      const incorrect2 = otherOptions[1] || (q.correctAnswer + "な");
      
      // Make a tricky fake option by altering the sound (súc âm / đục âm)
      let incorrect3 = q.correctAnswer;
      if (incorrect3.includes("っ")) {
        incorrect3 = incorrect3.replace("っ", "");
      } else if (incorrect3.includes("ん")) {
        incorrect3 = incorrect3.replace("ん", "っ");
      } else {
        incorrect3 = incorrect3 + "り";
      }

      const optionsSet = new Set<string>([q.correctAnswer, incorrect1, incorrect2, incorrect3]);
      
      // Pad options if somehow less than 4
      let fallbackIndex = 2;
      while (optionsSet.size < 4 && fallbackIndex < otherOptions.length) {
        optionsSet.add(otherOptions[fallbackIndex]);
        fallbackIndex++;
      }

      return {
        counter: q.counter,
        number: q.number,
        correctAnswer: q.correctAnswer,
        kanji: q.kanji,
        options: Array.from(optionsSet).sort(() => Math.random() - 0.5),
        explanation: `Cách ghép mốc số ${q.number} bộ đếm ~${q.counter.kanji} (${q.counter.name.split(" ")[0]}): ${
          q.rawItem.irregular ? "Đây là mốc biến âm đặc biệt (súc âm hóa hoặc đục âm hóa) cần lưu ý học thuộc." : "Hệ đếm ghép quy tắc thông thường."
        } Phát âm mẫu: ${q.correctAnswer}.`
      };
    });

    setQuizQuestions(questions);
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizFinished(false);
  };

  const handleQuizAnswer = (option: string) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(option);
    
    const isCorrect = option === quizQuestions[currentQuizIndex].correctAnswer;
    if (isCorrect) {
      playSound.correct();
      setScore(prev => prev + 1);
    } else {
      playSound.wrong();
    }
    speakJa(option);
  };

  const handleNextQuiz = () => {
    playSound.click();
    if (currentQuizIndex < quizQuestions.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Button and Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-rose-100 pb-4">
        <button
          onClick={onGoBack}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          Quay lại danh sách sổ tay
        </button>
        <div className="text-right">
          <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
            Học độc quyền cùng Thầy Sơn 🌸
          </span>
        </div>
      </div>

      {/* Embedded App Navigation Header */}
      <div className="bg-white border border-rose-100 shadow-sm rounded-3xl p-4 md:p-6 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-rose-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-md">
              山
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
                Số Đếm Tiếng Nhật Toàn Tập <span className="text-[10px] bg-rose-500 text-white font-bold px-2 py-0.5 rounded-full">SIMULATOR V2.1</span>
              </h2>
              <p className="text-xs text-gray-500">Giáo trình tương tác thông minh cho học sinh Việt Nam 🇻🇳 🇯🇵</p>
            </div>
          </div>

          {/* Tab buttons */}
          <nav className="flex flex-wrap gap-1 bg-gray-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto scrollbar-none">
            <button
              onClick={() => handleSwitchTab("basicNumbers")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeSubTab === "basicNumbers" ? "bg-rose-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-950"}`}
            >
              <Hash className="w-3.5 h-3.5" />
              <span>Số Cơ Bản</span>
            </button>
            <button
              onClick={() => handleSwitchTab("guide1to20")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeSubTab === "guide1to20" ? "bg-rose-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-950"}`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Bảng Đếm 1-20</span>
            </button>
            <button
              onClick={() => handleSwitchTab("dictionary")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeSubTab === "dictionary" ? "bg-rose-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-950"}`}
            >
              <BookMarked className="w-3.5 h-3.5" />
              <span>24 Bộ Số Đếm</span>
            </button>
            <button
              onClick={() => handleSwitchTab("rules")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeSubTab === "rules" ? "bg-rose-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-950"}`}
            >
              <Info className="w-3.5 h-3.5" />
              <span>Quy Luật Âm</span>
            </button>
            <button
              onClick={() => handleSwitchTab("quiz")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeSubTab === "quiz" ? "bg-rose-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-950"}`}
            >
              <ClipboardCheck className="w-3.5 h-3.5" />
              <span>Luyện Phản Xạ</span>
            </button>
          </nav>
        </div>
      </div>

      {/* SUBTAB CONTENT 1: SỐ CƠ BẢN */}
      {activeSubTab === "basicNumbers" && (
        <div className="space-y-8 animate-fadeIn">
          {/* Banner Thầy Sơn */}
          <div className="bg-gradient-to-br from-rose-600 to-amber-600 rounded-3xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
            <div className="absolute right-0 bottom-0 translate-y-10 translate-x-10 text-white/5 font-serif text-[12rem] select-none pointer-events-none">
              数
            </div>
            <div className="max-w-2xl space-y-3 relative z-10">
              <span className="bg-white/20 text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider uppercase">
                Bài học 1: Nền tảng số đếm thuần túy
              </span>
              <h2 className="text-xl md:text-3xl font-black leading-tight">
                Làm chủ hệ thống số đếm từ 0 đến 100 Triệu (億)!
              </h2>
              <p className="text-rose-50 text-xs md:text-sm leading-relaxed">
                "Chào các em học sinh thân yêu! Trước khi đi sâu vào các hậu tố đếm phức tạp, chúng ta phải xây dựng nền tảng vững chắc bằng cách đếm số thông thường. Hãy cùng Thầy Sơn tìm hiểu cách ghép số và các trường hợp biến âm cực kỳ thú vị nhé!"
              </p>
            </div>
          </div>

          {/* Grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Units & Tens */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Units 0-10 */}
              <div className="bg-white rounded-2xl border border-rose-100 shadow-sm overflow-hidden">
                <div className="bg-rose-50/50 px-4 py-3 border-b border-rose-100 flex justify-between items-center">
                  <h3 className="font-extrabold text-sm text-rose-950 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-rose-600" /> Hàng Đơn Vị (0 - 10)
                  </h3>
                  <span class="text-[10px] text-gray-400">Bấm nút loa để nghe phát âm</span>
                </div>
                <div className="divide-y divide-gray-50 max-h-[380px] overflow-y-auto">
                  {BASIC_NUMBERS.units.map(item => (
                    <div key={item.num} className="p-3 flex items-center justify-between hover:bg-rose-50/10 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-md bg-gray-100 font-extrabold text-xs text-gray-500 flex items-center justify-center">
                          {item.num}
                        </span>
                        <span className="font-serif font-black text-base text-gray-900">{item.kanji}</span>
                        {item.note && <span className="text-[10px] text-gray-400 italic">({item.note})</span>}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="font-extrabold text-xs text-gray-700">{item.reading}</p>
                          <p className="text-[9px] font-mono text-gray-400">{item.romaji}</p>
                        </div>
                        <button 
                          onClick={() => speakJa(item.reading)}
                          className="w-8 h-8 rounded-full bg-gray-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center transition-colors"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tens 11-20 */}
              <div className="bg-white rounded-2xl border border-rose-100 shadow-sm overflow-hidden">
                <div className="bg-rose-50/50 px-4 py-3 border-b border-rose-100">
                  <h3 className="font-extrabold text-sm text-rose-950">Quy tắc ghép Hàng Chục (11 - 20)</h3>
                  <p className="text-[10px] text-rose-800 mt-0.5">Công thức: 10 (じゅう) + Số đơn vị lẻ</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 bg-white">
                  <div className="divide-y divide-gray-50">
                    {BASIC_NUMBERS.tens.slice(0, 5).map(item => (
                      <div key={item.num} className="p-3 flex items-center justify-between hover:bg-rose-50/10 transition-colors">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-md bg-rose-50 font-extrabold text-xs text-rose-600 flex items-center justify-center">
                            {item.num}
                          </span>
                          <span className="font-serif font-bold text-sm text-gray-900">{item.kanji}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-gray-800">{item.reading}</span>
                          <button onClick={() => speakJa(item.reading)} className="text-rose-600 hover:scale-110 transition-transform">
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="divide-y divide-gray-50">
                    {BASIC_NUMBERS.tens.slice(5, 10).map(item => (
                      <div key={item.num} className="p-3 flex items-center justify-between hover:bg-rose-50/10 transition-colors">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-md bg-rose-50 font-extrabold text-xs text-rose-600 flex items-center justify-center">
                            {item.num}
                          </span>
                          <span className="font-serif font-bold text-sm text-gray-900">{item.kanji}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-gray-800">{item.reading}</span>
                          <button onClick={() => speakJa(item.reading)} className="text-rose-600 hover:scale-110 transition-transform">
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Hundreds, Thousands, Ten Thousands */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Hundreds */}
              <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-4 space-y-3">
                <div>
                  <h3 className="font-extrabold text-sm text-rose-950">Đơn vị Hàng Trăm (百 - ひゃく)</h3>
                  <p className="text-[10px] text-gray-400 mt-0.5">Chú ý các mốc biến âm súc âm hóa đặc biệt: 300, 600, 800.</p>
                </div>
                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                  {BASIC_NUMBERS.hundreds.map(item => (
                    <div key={item.num} className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${item.irregular ? "bg-rose-50/40 border-rose-200" : "border-gray-100 bg-white"}`}>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-gray-500">{item.num}</span>
                          <span className="font-serif font-black">{item.kanji}</span>
                          {item.irregular && <span className="text-[8px] bg-rose-100 text-rose-700 font-bold px-1 rounded-sm">Biến âm</span>}
                        </div>
                        {item.note && <p className="text-[8px] text-rose-800/80 italic leading-none">{item.note}</p>}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-800">{item.reading}</span>
                        <button onClick={() => speakJa(item.reading)} className="text-rose-600 hover:scale-110">
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Thousands */}
              <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-4 space-y-3">
                <div>
                  <h3 className="font-extrabold text-sm text-rose-950">Đơn vị Hàng Nghìn (千 - せん)</h3>
                  <p className="text-[10px] text-gray-400 mt-0.5">Chú ý mốc biến âm đục 3000 (さんぜん) và âm ngắt 8000 (はっせん).</p>
                </div>
                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                  {BASIC_NUMBERS.thousands.map(item => (
                    <div key={item.num} className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${item.irregular ? "bg-amber-50/40 border-amber-200" : "border-gray-100 bg-white"}`}>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-gray-500">{item.num}</span>
                          <span className="font-serif font-black">{item.kanji}</span>
                          {item.irregular && <span className="text-[8px] bg-amber-100 text-amber-800 font-bold px-1 rounded-sm">Biến âm</span>}
                        </div>
                        {item.note && <p className="text-[8px] text-amber-800/80 italic leading-none">{item.note}</p>}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-800">{item.reading}</span>
                        <button onClick={() => speakJa(item.reading)} className="text-rose-600 hover:scale-110">
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ten Thousands */}
              <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-4 space-y-3">
                <div>
                  <h3 className="font-extrabold text-sm text-rose-950">Hàng Vạn (万) - Tư Duy Đếm Kiểu Nhật</h3>
                  <p className="text-[10px] text-gray-400 mt-0.5">Tiếng Nhật gộp cụm 4 chữ số (Vạn - 万) làm chuẩn thay vì 3 chữ số.</p>
                </div>
                <div className="space-y-2">
                  {BASIC_NUMBERS.tenThousands.map(item => (
                    <div key={item.num} className="p-2.5 rounded-xl border border-gray-100 bg-amber-50/20 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="font-serif font-black text-sm">{item.kanji}</span>
                          <span className="text-[10px] text-gray-400">({item.value || item.num.toLocaleString()})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-rose-700">{item.reading}</span>
                          <button onClick={() => speakJa(item.reading)} className="text-rose-600">
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      {item.note && <p className="text-[9px] text-gray-500 leading-tight">{item.note}</p>}
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* SUBTAB CONTENT 2: BẢNG TRUY XUẤT 1 ĐẾN 20 */}
      {activeSubTab === "guide1to20" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Giới thiệu quy luật */}
          <div className="bg-gradient-to-r from-rose-50 to-amber-50 rounded-2xl p-4 border border-rose-100/60 flex items-start gap-3">
            <div className="bg-rose-600 text-white rounded-xl p-2 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-xs text-rose-950 uppercase tracking-wider">Học đếm mốc nâng cao (11 đến 20)</h3>
              <p className="text-[11px] text-rose-900/80 leading-relaxed mt-0.5">
                Khi đếm mốc lớn hơn 10, cách ghép từ 11 đến 20 của mỗi hậu tố đếm vẫn giữ nguyên quy luật súc âm hoặc liên trọc của hàng đơn vị đứng sau. Hãy chọn bộ đếm bất kỳ để tự động tạo bảng đếm 1-20!
              </p>
            </div>
          </div>

          {/* Quick Counter Selector Grid */}
          <div className="bg-white rounded-2xl p-4 border border-rose-100 shadow-sm space-y-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Chọn một đơn vị đếm để dựng bảng 1-20:</span>
            <div className="flex flex-wrap gap-2">
              {ALL_COUNTERS.map(counter => {
                const isActive = counter.id === activeCounterId;
                return (
                  <button
                    key={counter.id}
                    onClick={() => {
                      playSound.click();
                      setActiveCounterId(counter.id);
                      speakJa(counter.kanji);
                    }}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${isActive ? "bg-rose-50 border-rose-300 text-rose-700 shadow-sm" : "bg-gray-50 border-gray-100 hover:border-gray-200 text-gray-600"}`}
                  >
                    ~{counter.kanji} ({counter.name.split(" ")[0]})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Table display */}
          <div className="bg-white rounded-2xl border border-rose-100 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-rose-600 p-5 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-serif font-black">~{activeCounter.kanji}</span>
                  <h3 className="font-extrabold text-base">{activeCounter.name}</h3>
                </div>
                <p className="text-xs text-rose-100">Ý nghĩa cách dùng: {activeCounter.usage}</p>
              </div>
              <div className="flex flex-col sm:items-end gap-1 text-xs">
                <span className="bg-white/15 px-3 py-1 rounded-lg">Từ nghi vấn: <strong className="font-serif">{activeCounter.howToAsk}</strong></span>
                <span className="text-[10px] text-rose-200">Ví dụ cụ thể: {activeCounter.example}</span>
              </div>
            </div>

            {/* Special warning for tsu */}
            {activeCounter.id === "tsu" && (
              <div className="p-4 bg-amber-50 text-amber-900 text-xs border-b border-amber-100 flex items-center gap-2">
                <AlertCircle className="text-amber-600 shrink-0 w-4 h-4" />
                <span>
                  <strong>Lưu ý từ Thầy Sơn:</strong> Bộ đếm chung thuần Nhật (~つ) chỉ đếm giới hạn từ 1 đến 10. Từ 11 trở đi, các em hãy sử dụng hệ số đếm Hán Nhật thông thường nhé!
                </span>
              </div>
            )}

            {/* Grid rows */}
            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
              {/* Rows 1-10 */}
              <div className="divide-y divide-gray-50">
                <div className="p-2.5 bg-gray-50 text-[10px] font-bold text-gray-400 text-center uppercase">Hàng Đơn Vị (1 - 10)</div>
                {active1To20List.slice(0, 10).map(item => (
                  <div key={item.num} className={`p-3 flex items-center justify-between transition-colors hover:bg-rose-50/10 ${item.irregular ? "bg-amber-50/20" : ""}`}>
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center font-bold text-xs">{item.num}</span>
                      <span className="font-serif font-bold text-lg text-gray-900">{item.kanji}</span>
                      {item.irregular && <span className="text-[8px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded-sm">Biến âm</span>}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-extrabold text-sm text-gray-800">{item.reading}</p>
                        <p className="text-[10px] text-gray-400 font-mono">{item.romaji}</p>
                      </div>
                      <button onClick={() => speakJa(item.reading)} className="w-8 h-8 rounded-full bg-gray-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center active:scale-90 transition-transform">
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Rows 11-20 */}
              <div className="divide-y divide-gray-50">
                <div className="p-2.5 bg-gray-50 text-[10px] font-bold text-gray-400 text-center uppercase">Hàng Ghép (11 - 20)</div>
                {active1To20List.length > 10 ? (
                  active1To20List.slice(10, 20).map(item => (
                    <div key={item.num} className={`p-3 flex items-center justify-between transition-colors hover:bg-rose-50/10 ${item.irregular ? "bg-amber-50/20" : ""}`}>
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xs">{item.num}</span>
                        <span className="font-serif font-bold text-lg text-gray-900">{item.kanji}</span>
                        {item.irregular && <span className="text-[8px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded-sm">Biến âm</span>}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="font-extrabold text-sm text-gray-800">{item.reading}</p>
                          <p className="text-[10px] text-gray-400 font-mono">{item.romaji}</p>
                        </div>
                        <button onClick={() => speakJa(item.reading)} className="w-8 h-8 rounded-full bg-gray-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center active:scale-90 transition-transform">
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-xs text-gray-400 italic">
                    Bộ đếm này kết thúc ở mốc số 10.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB CONTENT 3: THƯ VIỆN 24 BỘ SỐ ĐẾM */}
      {activeSubTab === "dictionary" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Search bar & Category filters */}
          <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-sm flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm chữ Kanji, Romaji hoặc tên..."
                className="w-full pl-9 pr-4 py-2 border border-gray-100 rounded-xl text-xs focus:outline-none focus:border-rose-400 bg-gray-50 font-sans"
              />
            </div>

            {/* Horizontal Filter Buttons */}
            <div className="flex gap-1.5 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 scrollbar-none">
              {categories.map(cat => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      playSound.click();
                      setSelectedCategory(cat);
                    }}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${isActive ? "bg-rose-50 text-rose-700 border border-rose-200 shadow-sm" : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent"}`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cards Directory */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCounters.length > 0 ? (
              filteredCounters.map(counter => (
                <div key={counter.id} className="bg-white p-5 rounded-2xl border border-rose-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                        {counter.category}
                      </span>
                      <span className="text-[11px] font-mono text-gray-400">~{counter.romaji}</span>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-serif font-black text-gray-900">~{counter.kanji}</span>
                      <h4 className="text-sm font-extrabold text-gray-800">{counter.name}</h4>
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed">{counter.usage}</p>
                    
                    <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-xl border border-gray-100/50">
                      <strong>Thường đếm:</strong> {counter.example}
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-gray-400">Từ hỏi: <strong className="text-gray-700 font-serif">{counter.howToAsk}</strong></span>
                    <button 
                      onClick={() => {
                        playSound.click();
                        setActiveCounterId(counter.id);
                        setActiveSubTab("guide1to20");
                      }}
                      className="font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 group"
                    >
                      Bảng 1-20 <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-gray-400 text-xs italic">
                Không tìm thấy bộ đếm phù hợp với từ khoá tra cứu...
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUBTAB CONTENT 4: QUY LUẬT BIẾN ÂM */}
      {activeSubTab === "rules" && (
        <div className="bg-white rounded-2xl p-6 border border-rose-100 shadow-sm space-y-6 animate-fadeIn">
          <div className="space-y-2 border-b border-rose-100 pb-4">
            <h2 className="text-xl font-extrabold text-gray-950 flex items-center gap-2">
              <Info className="text-rose-600 w-5 h-5" /> Bản đồ Quy Luật Biến Âm (Phonetic Rules)
            </h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              Biến âm trong tiếng Nhật không phải là ngẫu nhiên, mà tuân theo quy tắc âm học tự nhiên để người Nhật có thể phát âm trôi chảy mà không bị vấp phụ âm. Khi hiểu rõ 2 quy tắc này, các em hoàn toàn có thể tự suy luận ra cách đọc!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gemination (súc âm) */}
            <div className="bg-rose-50/30 p-5 rounded-2xl border border-rose-100 space-y-3">
              <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full inline-block uppercase tracking-wider">Quy Tắc 1</span>
              <h4 className="font-extrabold text-sm text-rose-950">Hiện tượng Súc âm hóa (促音化) - Âm ngắt</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Xảy ra khi các số kết thúc bằng âm **ち (ichi, hachi)** hoặc **く/じゅう (roku, juu)** đứng trước một đơn vị đếm bắt đầu bằng các phụ âm hàng **K, S, T, P**. Âm đuôi sẽ co lại tạo thành âm ngắt **「っ」**.
              </p>
              <div className="bg-white p-3 rounded-xl border border-rose-100/30 text-xs space-y-1 font-mono">
                <p><span className="text-rose-600 font-bold">1 (いち) + Phút (ふん/H)</span> → いっ<b>ぷ</b>ん (ippun)</p>
                <p><span className="text-rose-600 font-bold">6 (ろく) + Phút (ふん/H)</span> → ろっ<b>ぷ</b>ん (roppun)</p>
                <p><span className="text-rose-600 font-bold">10 (じゅう) + Phút (ふん/H)</span> → じゅっ<b>ぷ</b>ん (juppun)</p>
              </div>
            </div>

            {/* Rendaku (Liên trọc) */}
            <div className="bg-amber-50/30 p-5 rounded-2xl border border-amber-100 space-y-3">
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full inline-block uppercase tracking-wider">Quy Tắc 2</span>
              <h4 className="font-extrabold text-sm text-amber-950">Hiện tượng Liên trọc hóa (連濁) - Đục hóa</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Khi đi sau số **3 (さん)**, phụ âm đầu của bộ đếm đứng sau thường bị đục hóa (thêm dấu tenten " hoặc biến đổi hàng H thành B, P) để tạo cảm giác trơn tru khi phát âm.
              </p>
              <div className="bg-white p-3 rounded-xl border border-amber-100/30 text-xs space-y-1 font-mono">
                <p><span className="text-amber-700 font-bold">3 (さん) + Bản/Chai (ほん)</span> → さん<b>ぼ</b>ん (sanbon)</p>
                <p><span className="text-amber-700 font-bold">3 (さん) + Con (ひき)</span> → さん<b>び</b>き (sanbiki)</p>
                <p><span className="text-amber-700 font-bold">3 (さん) + Phút (ふん)</span> → さん<b>ぷ</b>ん (sanpun)</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-xs text-gray-600">
            <h4 className="font-bold text-gray-700 mb-1">Thầy Sơn khuyên các em:</h4>
            <p className="leading-relaxed">
              "Khi ghép các số từ 11 đến 19, các em chỉ cần đọc: <b>じゅう (10) + cách đọc số đơn vị lẻ</b>. Nếu mốc lẻ có biến âm, mốc mười mấy cũng sẽ biến âm tương tự một cách đồng bộ!"
            </p>
          </div>
        </div>
      )}

      {/* SUBTAB CONTENT 5: LUYỆN PHẢN XẠ (QUIZ) */}
      {activeSubTab === "quiz" && (
        <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
          {quizFinished ? (
            <div className="bg-white rounded-2xl p-8 border border-rose-100 shadow-sm text-center space-y-6">
              <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-rose-600">
                <Award className="w-8 h-8" />
              </div>
              
              <div className="space-y-1">
                <h3 className="text-lg font-extrabold text-gray-900">Thầy Sơn chúc mừng các em hoàn thành thử thách!</h3>
                <p className="text-xs text-gray-500">Mức độ phản xạ số đếm tiếng Nhật sẽ tiến bộ vượt bậc sau mỗi lần rèn luyện.</p>
              </div>

              <div className="bg-rose-50/50 p-4 rounded-2xl max-w-xs mx-auto border border-rose-100">
                <span className="text-[10px] text-rose-700 font-bold uppercase tracking-wider block">Điểm số đạt được</span>
                <p className="text-4xl font-serif font-black text-rose-600 mt-1">{score} / {quizQuestions.length}</p>
                <span className="text-[10px] text-gray-400 mt-1 block">Tỉ lệ đúng: {Math.round((score / quizQuestions.length) * 100)}%</span>
              </div>

              <div className="flex justify-center gap-2">
                <button 
                  onClick={generateQuiz} 
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Chơi lượt mới ngẫu nhiên
                </button>
                <button 
                  onClick={() => handleSwitchTab("guide1to20")} 
                  className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                >
                  Quay lại bảng tra cứu
                </button>
              </div>
            </div>
          ) : quizQuestions.length > 0 ? (
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-sm flex justify-between items-center">
                <div>
                  <h3 className="font-extrabold text-xs text-gray-900 uppercase">Thử Thách Phản Xạ Toàn Diện (20 Câu Hỏi)</h3>
                  <p className="text-[10px] text-gray-500">Mỗi lượt chơi là một tổ hợp câu hỏi hoàn toàn khác biệt!</p>
                </div>
                <div className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-lg">
                  Đúng: {score} / {quizQuestions.length}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-rose-100 shadow-sm space-y-6">
                <span className="text-[10px] font-bold text-gray-400">CÂU HỎI HỌC TẬP {currentQuizIndex + 1} / {quizQuestions.length}</span>
                
                <div className="space-y-2 text-center">
                  <span className="text-xs text-gray-400 block">Hãy lựa chọn cách phát âm đúng nhất của:</span>
                  <h2 className="text-3xl font-serif font-black text-gray-900">
                    {quizQuestions[currentQuizIndex].number} {quizQuestions[currentQuizIndex].counter.name.split(" ")[0]}
                  </h2>
                  <p className="text-xs text-gray-500 italic">Kanji hỗ trợ: <strong className="font-serif text-gray-900">{quizQuestions[currentQuizIndex].kanji}</strong></p>
                </div>

                {/* Options list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {quizQuestions[currentQuizIndex].options.map(option => {
                    const isSubmitted = selectedAnswer !== null;
                    const isCorrect = option === quizQuestions[currentQuizIndex].correctAnswer;
                    const isSelected = selectedAnswer === option;

                    let btnStyle = "border-gray-100 hover:border-rose-200 hover:bg-rose-50/10";
                    let iconMarkup = null;
                    if (isSubmitted) {
                      if (isCorrect) {
                        btnStyle = "bg-emerald-50 border-emerald-400 text-emerald-900";
                        iconMarkup = <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
                      } else if (isSelected) {
                        btnStyle = "bg-rose-50 border-rose-400 text-rose-900";
                        iconMarkup = <XCircle className="w-4 h-4 text-rose-600" />;
                      } else {
                        btnStyle = "bg-gray-50 opacity-40 border-transparent";
                      }
                    }

                    return (
                      <button
                        key={option}
                        onClick={() => handleQuizAnswer(option)}
                        disabled={isSubmitted}
                        className={`p-4 rounded-xl border text-left font-bold text-xs transition-all flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{option}</span>
                        {iconMarkup}
                      </button>
                    );
                  })}
                </div>

                {/* Answer explanation */}
                {selectedAnswer && (
                  <div className="space-y-4 pt-4 border-t border-gray-100 animate-fadeIn">
                    <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 text-xs text-amber-900 leading-relaxed">
                      <strong>💡 Giải nghĩa từ Thầy Sơn:</strong> {quizQuestions[currentQuizIndex].explanation}
                    </div>

                    <button
                      onClick={handleNextQuiz}
                      className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span>
                        {currentQuizIndex === quizQuestions.length - 1 ? "Xem kết quả tổng kết" : "Sang câu hỏi tiếp theo"}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">Đang khởi tạo câu hỏi...</div>
          )}
        </div>
      )}
    </div>
  );
}
