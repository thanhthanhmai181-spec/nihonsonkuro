import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  ChevronLeft, 
  BookOpen, 
  ArrowRight, 
  RotateCcw, 
  Award, 
  CheckCircle2, 
  XCircle, 
  HelpCircle,
  Eye,
  EyeOff,
  Sparkles,
  Bookmark,
  GraduationCap,
  Volume2,
  ListFilter,
  Check,
  BrainCircuit,
  MessageSquare,
  BadgeInfo,
  Layers
} from "lucide-react";
import { MASTER_SENSEI_DATA, SENSEI_QUIZ_DATA, QuestionWordItem, QuizItem } from "../data/questionWordsData";
import { playSound } from "../utils/audio";

export default function QuestionWordsHandbook({ onBack }: { onBack: () => void }) {
  // Navigation tabs: 'handbook' or 'quiz'
  const [activeMode, setActiveMode] = useState<"handbook" | "quiz">("handbook");
  
  // Handbook states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedWordId, setExpandedWordId] = useState<string | null>(null);
  const [showFurigana, setShowFurigana] = useState(true);
  const [showRomaji, setShowRomaji] = useState(true);
  
  // Bookmarked words (persisted in state)
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  // Quiz states
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [answersHistory, setAnswersHistory] = useState<Array<{ questionId: number; selected: string; isCorrect: boolean }>>([]);

  const categories = useMemo(() => [
    { id: "all", label: "Tất cả", count: MASTER_SENSEI_DATA.length, icon: Layers },
    { id: "kosoado", label: "Ai & Nơi chốn", count: MASTER_SENSEI_DATA.filter(w => w.category === "kosoado").length, icon: Bookmark },
    { id: "nani_group", label: "Nhóm [何] (Cái gì, lượng từ...)", count: MASTER_SENSEI_DATA.filter(w => w.category === "nani_group").length, icon: BrainCircuit },
    { id: "reasons", label: "Hỏi lý do", count: MASTER_SENSEI_DATA.filter(w => w.category === "reasons").length, icon: MessageSquare },
    { id: "general", label: "Mốc thời gian & Số lượng", count: MASTER_SENSEI_DATA.filter(w => w.category === "general").length, icon: ListFilter },
    { id: "advanced", label: "Đại từ bất định", count: MASTER_SENSEI_DATA.filter(w => w.category === "advanced").length, icon: BadgeInfo }
  ], []);

  // Filter handbook words
  const filteredWords = useMemo(() => {
    return MASTER_SENSEI_DATA.filter((item) => {
      const matchQuery = 
        item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.reading.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchCategory = selectedCategory === "all" || item.category === selectedCategory;
      
      return matchQuery && matchCategory;
    });
  }, [searchQuery, selectedCategory]);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id]
    );
    playSound.click();
  };

  const handleModeChange = (mode: "handbook" | "quiz") => {
    setActiveMode(mode);
    playSound.click();
  };

  // Speak word using SpeechSynthesis (fallback if audio system is offline)
  const speakWord = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playSound.correct();
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Quiz actions
  const handleAnswerSelection = (option: string) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
  };

  const checkQuizAnswer = () => {
    if (!selectedAnswer || isAnswered) return;
    
    const currentQuestion = SENSEI_QUIZ_DATA[currentQuizIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    setIsAnswered(true);
    if (isCorrect) {
      setScore(prev => prev + 1);
      playSound.correct();
    } else {
      playSound.wrong();
    }

    setAnswersHistory(prev => [
      ...prev,
      {
        questionId: currentQuestion.id,
        selected: selectedAnswer,
        isCorrect
      }
    ]);
  };

  const nextQuizQuestion = () => {
    if (currentQuizIndex + 1 < SENSEI_QUIZ_DATA.length) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      playSound.click();
    } else {
      setQuizFinished(true);
      playSound.correct();
    }
  };

  const resetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
    setAnswersHistory([]);
    playSound.click();
  };

  return (
    <div id="question-words-handbook-root" className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Header Bar */}
      <header id="handbook-header" className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 py-3 sm:px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <button 
              id="back-to-menu-btn"
              onClick={onBack}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
              title="Quay lại danh mục"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Mastery N5 - N4</span>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Check className="w-3 h-3" /> 53 Từ để hỏi chuẩn
                </span>
              </div>
              <h1 id="handbook-title" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                Bộ Từ Để Hỏi Tiếng Nhật <span className="text-indigo-600 font-normal">疑問詞 Guide</span>
              </h1>
            </div>
          </div>

          {/* Tab Selection */}
          <div className="flex bg-slate-100 p-1 rounded-xl self-start sm:self-center border border-slate-200">
            <button
              id="tab-handbook-mode"
              onClick={() => handleModeChange("handbook")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeMode === "handbook" 
                  ? "bg-white text-indigo-700 shadow-sm" 
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Sổ tay từ hỏi ({filteredWords.length})
            </button>
            <button
              id="tab-quiz-mode"
              onClick={() => handleModeChange("quiz")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeMode === "quiz" 
                  ? "bg-white text-indigo-700 shadow-sm" 
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              Luyện tập Quiz
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main id="handbook-main-container" className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <AnimatePresence mode="wait">
          {activeMode === "handbook" ? (
            <motion.div
              key="handbook-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Controls bar */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                <div className="flex flex-col md:flex-row gap-3">
                  {/* Search box */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      id="search-input"
                      type="text"
                      placeholder="Tìm kiếm từ để hỏi (Ví dụ: だれ, nani, tại sao, bao nhiêu...)"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-sm text-slate-900 transition-all placeholder:text-slate-400"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery("")} 
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded hover:bg-indigo-100"
                      >
                        Xóa
                      </button>
                    )}
                  </div>
                  
                  {/* Display settings toggles */}
                  <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-1.5 rounded-xl border border-slate-200 self-start md:self-auto">
                    <button
                      onClick={() => { setShowFurigana(!showFurigana); playSound.click(); }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        showFurigana ? "bg-white text-indigo-700 shadow-xs" : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {showFurigana ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      Kèm Hán tự/Hiragana
                    </button>
                    <button
                      onClick={() => { setShowRomaji(!showRomaji); playSound.click(); }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        showRomaji ? "bg-white text-indigo-700 shadow-xs" : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {showRomaji ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      Kèm Romaji
                    </button>
                  </div>
                </div>

                {/* Categories filtering bar */}
                <div className="border-t border-slate-100 pt-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Phân loại cấu trúc</span>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => {
                      const IconComp = cat.icon;
                      const isSelected = selectedCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => { setSelectedCategory(cat.id); playSound.click(); }}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                            isSelected 
                              ? "bg-indigo-600 text-white border-indigo-600 shadow-xs" 
                              : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          <IconComp className="w-3.5 h-3.5" />
                          <span>{cat.label}</span>
                          <span className={`inline-flex items-center justify-center rounded-full px-1.5 py-0.25 text-[10px] font-bold ${
                            isSelected ? "bg-indigo-700 text-indigo-100" : "bg-slate-100 text-slate-500"
                          }`}>
                            {cat.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Grid of cards */}
              {filteredWords.length === 0 ? (
                <div className="bg-white text-center p-12 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <div className="inline-flex p-4 bg-amber-50 text-amber-500 rounded-full">
                    <Search className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Không tìm thấy từ để hỏi phù hợp</h3>
                  <p className="text-slate-500 text-sm max-w-md mx-auto">
                    Thử đổi từ khóa tìm kiếm khác hoặc kiểm tra xem bạn đã chọn đúng tab danh mục chưa nhé.
                  </p>
                  <button
                    onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
                    className="mt-2 text-xs font-semibold text-indigo-600 hover:text-indigo-800 underline"
                  >
                    Xóa bộ lọc tìm kiếm
                  </button>
                </div>
              ) : (
                <div id="word-cards-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredWords.map((item, index) => {
                    const isExpanded = expandedWordId === item.id;
                    const isBookmarked = bookmarks.includes(item.id);
                    return (
                      <motion.div
                        layout
                        id={`word-card-${item.id}`}
                        key={item.id}
                        onClick={() => {
                          setExpandedWordId(isExpanded ? null : item.id);
                          playSound.click();
                        }}
                        className={`bg-white rounded-2xl border transition-all cursor-pointer overflow-hidden ${
                          isExpanded 
                            ? "col-span-1 md:col-span-2 lg:col-span-3 ring-2 ring-indigo-500 border-transparent shadow-md" 
                            : "hover:border-indigo-200 hover:shadow-xs border-slate-200"
                        }`}
                      >
                        {/* Word Card Head */}
                        <div className="p-4 sm:p-5 flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            {/* Accent Circle Badge */}
                            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex flex-col items-center justify-center text-indigo-700 font-bold border border-indigo-100">
                              <span className="text-xs font-normal leading-none opacity-70">{index + 1}</span>
                              <span className="text-sm font-bold leading-none mt-0.5">{item.reading.slice(0, 2)}</span>
                            </div>
                            
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-indigo-900 font-sans tracking-tight">{item.word}</span>
                                <span className="text-xs text-slate-400 font-mono">({item.reading})</span>
                              </div>
                              <p className="text-sm font-semibold text-slate-700 mt-1 line-clamp-1">{item.meaning}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={(e) => speakWord(item.word, e)}
                              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-indigo-600 transition-colors"
                              title="Nghe phát âm"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => toggleBookmark(item.id, e)}
                              className={`p-1.5 rounded-lg hover:bg-slate-100 transition-colors ${
                                isBookmarked ? "text-amber-500" : "text-slate-300"
                              }`}
                              title={isBookmarked ? "Bỏ đánh dấu" : "Đánh dấu từ"}
                            >
                              <Bookmark className="w-4 h-4" fill={isBookmarked ? "currentColor" : "none"} />
                            </button>
                          </div>
                        </div>

                        {/* Summary / Description */}
                        <div className="px-5 pb-4">
                          <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-sans">
                            {item.desc}
                          </p>
                        </div>

                        {/* Expandable Example Section */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="border-t border-slate-100 bg-indigo-50/20 overflow-hidden"
                            >
                              <div className="p-4 sm:p-6 space-y-4">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                                    Ví dụ thực tế ({item.examples.length})
                                  </h4>
                                  <span className="text-xs text-indigo-600 font-semibold italic">Nhấn vào từng câu ví dụ để nghe phát âm</span>
                                </div>

                                <div className="space-y-4">
                                  {item.examples.map((ex, exIdx) => (
                                    <div 
                                      key={exIdx} 
                                      onClick={(e) => speakWord(ex.q, e)}
                                      className="p-3 bg-white rounded-xl border border-slate-200/60 shadow-xs hover:border-indigo-300 hover:bg-indigo-50/10 transition-all space-y-2 group"
                                    >
                                      {/* Question sentence */}
                                      <div className="space-y-1">
                                        <div className="flex items-start gap-2">
                                          <span className="inline-block px-1.5 py-0.5 text-[10px] font-bold bg-amber-50 text-amber-700 rounded border border-amber-100 mt-1">HỎI</span>
                                          <div>
                                            <p className="text-sm font-bold text-slate-900 leading-relaxed font-sans">{ex.q}</p>
                                            {showFurigana && <p className="text-xs text-slate-500 font-sans mt-0.5">{ex.qh}</p>}
                                            {showRomaji && <p className="text-[11px] text-slate-400 font-mono mt-0.5">{ex.qr}</p>}
                                            <p className="text-xs font-medium text-emerald-700 italic mt-1 font-sans">➔ {ex.qv}</p>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Answer sentence */}
                                      <div className="border-t border-slate-100/60 pt-2 mt-2">
                                        <div className="flex items-start gap-2">
                                          <span className="inline-block px-1.5 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-700 rounded border border-blue-100 mt-1">ĐÁP</span>
                                          <div>
                                            <p className="text-sm font-semibold text-slate-800 leading-relaxed font-sans">{ex.a}</p>
                                            {showFurigana && <p className="text-xs text-slate-500 font-sans mt-0.5">{ex.ah}</p>}
                                            {showRomaji && <p className="text-[11px] text-slate-400 font-mono mt-0.5">{ex.ar}</p>}
                                            <p className="text-xs font-medium text-slate-600 italic mt-1 font-sans">➔ {ex.av}</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          ) : (
            // Quiz Tab view
            <motion.div
              key="quiz-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="max-w-3xl mx-auto"
            >
              {!quizFinished ? (
                <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
                  {/* Quiz Header Info */}
                  <div className="bg-indigo-600 text-white p-6 sm:p-8 relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-widest bg-indigo-700 px-3 py-1 rounded-full">
                        Câu hỏi {currentQuizIndex + 1} / {SENSEI_QUIZ_DATA.length}
                      </span>
                      <span className="text-xs font-bold bg-emerald-500 text-white px-3 py-1 rounded-full flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" /> Điểm: {score}
                      </span>
                    </div>

                    <div className="mt-4">
                      {/* Interactive Linear Progress */}
                      <div className="w-full bg-indigo-700/50 h-2 rounded-full overflow-hidden mb-2">
                        <div 
                          className="bg-emerald-400 h-full transition-all duration-300"
                          style={{ width: `${((currentQuizIndex + 1) / SENSEI_QUIZ_DATA.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Question Box */}
                  <div className="p-6 sm:p-8 space-y-6">
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider block">Hãy hoàn thành câu sau:</span>
                      <h3 className="text-xl font-bold text-slate-950 font-sans tracking-tight">
                        {SENSEI_QUIZ_DATA[currentQuizIndex].question}
                      </h3>
                      {SENSEI_QUIZ_DATA[currentQuizIndex].answer && (
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-start gap-2">
                          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 mt-0.5">TRẢ LỜI</span>
                          <p className="text-xs text-slate-600 leading-relaxed font-sans">{SENSEI_QUIZ_DATA[currentQuizIndex].answer}</p>
                        </div>
                      )}
                    </div>

                    {/* Options list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {SENSEI_QUIZ_DATA[currentQuizIndex].options.map((option, idx) => {
                        const isSelected = selectedAnswer === option;
                        const isCorrectOption = option === SENSEI_QUIZ_DATA[currentQuizIndex].correctAnswer;
                        
                        let optionStyle = "border-slate-200 hover:border-indigo-300 hover:bg-slate-50";
                        if (isSelected) {
                          optionStyle = "border-indigo-600 bg-indigo-50/50 text-indigo-900 ring-2 ring-indigo-100";
                        }
                        
                        if (isAnswered) {
                          if (isCorrectOption) {
                            optionStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-100";
                          } else if (isSelected) {
                            optionStyle = "border-rose-500 bg-rose-50 text-rose-900 ring-2 ring-rose-100";
                          } else {
                            optionStyle = "border-slate-100 bg-slate-50 opacity-60";
                          }
                        }

                        return (
                          <button
                            key={idx}
                            disabled={isAnswered}
                            onClick={() => { handleAnswerSelection(option); playSound.click(); }}
                            className={`flex items-center justify-between p-4 rounded-xl border-2 text-sm font-semibold transition-all ${optionStyle}`}
                          >
                            <span className="font-sans">{option}</span>
                            
                            <div className="flex items-center gap-1.5">
                              {isAnswered && isCorrectOption && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                              {isAnswered && isSelected && !isCorrectOption && <XCircle className="w-4 h-4 text-rose-600" />}
                              <span className="text-xs font-normal text-slate-400">Option {idx + 1}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Action buttons */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                      <button
                        onClick={resetQuiz}
                        className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> Làm lại từ đầu
                      </button>

                      {!isAnswered ? (
                        <button
                          disabled={!selectedAnswer}
                          onClick={checkQuizAnswer}
                          className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Kiểm tra kết quả
                        </button>
                      ) : (
                        <button
                          onClick={nextQuizQuestion}
                          className="flex items-center gap-1 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-sm hover:shadow-md transition-all"
                        >
                          {currentQuizIndex + 1 === SENSEI_QUIZ_DATA.length ? "Xem kết quả" : "Câu tiếp theo"}
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Explanation block */}
                    <AnimatePresence>
                      {isAnswered && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-indigo-50/40 p-4 rounded-2xl border border-indigo-100/80 space-y-2 overflow-hidden"
                        >
                          <h4 className="text-xs font-bold text-indigo-700 flex items-center gap-1.5">
                            <HelpCircle className="w-3.5 h-3.5" /> Giải thích chi tiết từ Sensei:
                          </h4>
                          <p className="text-xs text-slate-600 leading-relaxed font-sans">
                            {SENSEI_QUIZ_DATA[currentQuizIndex].explanation}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                // Quiz Final Result View
                <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10 text-center space-y-6">
                  <div className="inline-flex p-5 bg-indigo-50 text-indigo-600 rounded-full">
                    <Award className="w-16 h-16" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-slate-950">Chúc mừng bạn đã hoàn thành bài thi!</h2>
                    <p className="text-sm text-slate-500 max-w-md mx-auto">
                      Bộ câu hỏi đã giúp bạn rèn luyện phản xạ, phân biệt chính xác cách dùng của các nghi vấn từ thường gặp nhất.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 max-w-sm mx-auto flex justify-around">
                    <div>
                      <span className="text-2xl font-black text-indigo-600 block">{score} / {SENSEI_QUIZ_DATA.length}</span>
                      <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Đúng chính xác</span>
                    </div>
                    <div className="border-r border-slate-200" />
                    <div>
                      <span className="text-2xl font-black text-emerald-600 block">{Math.round((score / SENSEI_QUIZ_DATA.length) * 100)}%</span>
                      <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Tỷ lệ hoàn thành</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-sm mx-auto">
                    <button
                      onClick={resetQuiz}
                      className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-sm hover:shadow-md transition-all"
                    >
                      <RotateCcw className="w-4 h-4" /> Làm lại bài Quiz
                    </button>
                    <button
                      onClick={() => handleModeChange("handbook")}
                      className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm border border-slate-200 transition-all"
                    >
                      <BookOpen className="w-4 h-4" /> Ôn lại lý thuyết
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
