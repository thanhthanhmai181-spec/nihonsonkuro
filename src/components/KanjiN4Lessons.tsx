import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  BookOpen, 
  Search, 
  RotateCcw, 
  Check, 
  Trash2, 
  HelpCircle, 
  Layers, 
  Flame, 
  Sparkles, 
  ChevronRight, 
  Award,
  BookMarked
} from "lucide-react";
import { playSound } from "../utils/audio";
import { KANJI_N4_DATA, KanjiN4Item } from "../data/kanjiN4Data";

interface KanjiN4LessonsProps {
  onGoBack: () => void;
}

export default function KanjiN4Lessons({ onGoBack }: KanjiN4LessonsProps) {
  // Tabs: overview, search, flashcard, review, example_flash, example_review, dashboard
  const [activeTab, setActiveTab] = useState<"overview" | "search" | "flashcard" | "review" | "example_flash" | "example_review" | "dashboard">("overview");

  // Filter and Lesson State
  const [currentLesson, setCurrentLesson] = useState<number | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // User Progress States
  const [knownKanji, setKnownKanji] = useState<Set<string>>(new Set());
  const [knownExamples, setKnownExamples] = useState<Set<string>>(new Set());
  const [quizCorrect, setQuizCorrect] = useState<number>(0);
  const [quizTotal, setQuizTotal] = useState<number>(0);

  // Flashcards state (Kanji)
  const [fcIndex, setFcIndex] = useState(0);
  const [fcFlipped, setFcFlipped] = useState(false);

  // Flashcards state (Examples)
  const [exFcIndex, setExFcIndex] = useState(0);
  const [exFcFlipped, setExFcFlipped] = useState(false);

  // Quiz State (Kanji MCQ)
  const [quizPool, setQuizPool] = useState<KanjiN4Item[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizSelected, setQuizSelected] = useState<string | null>(null);

  // Quiz State (Example Word MCQ)
  const [exQuizPool, setExQuizPool] = useState<{ rawWord: string; rawReading: string; meaning: string }[]>([]);
  const [exQuizIndex, setExQuizIndex] = useState(0);
  const [exQuizOptions, setExQuizOptions] = useState<string[]>([]);
  const [exQuizAnswered, setExQuizAnswered] = useState(false);
  const [exQuizSelected, setExQuizSelected] = useState<string | null>(null);

  // --- Load progress on mount ---
  useEffect(() => {
    const savedKanji = localStorage.getItem("n4_known_kanji");
    const savedExamples = localStorage.getItem("n4_known_examples");
    const savedCorrect = localStorage.getItem("n4_quiz_correct");
    const savedTotal = localStorage.getItem("n4_quiz_total");

    if (savedKanji) {
      try {
        setKnownKanji(new Set(JSON.parse(savedKanji)));
      } catch (e) {
        console.error(e);
      }
    }
    if (savedExamples) {
      try {
        setKnownExamples(new Set(JSON.parse(savedExamples)));
      } catch (e) {
        console.error(e);
      }
    }
    if (savedCorrect) setQuizCorrect(parseInt(savedCorrect) || 0);
    if (savedTotal) setQuizTotal(parseInt(savedTotal) || 0);
  }, []);

  // --- Helper to save state ---
  const saveKnownKanjiSet = (newSet: Set<string>) => {
    setKnownKanji(newSet);
    localStorage.setItem("n4_known_kanji", JSON.stringify(Array.from(newSet)));
  };

  const saveKnownExamplesSet = (newSet: Set<string>) => {
    setKnownExamples(newSet);
    localStorage.setItem("n4_known_examples", JSON.stringify(Array.from(newSet)));
  };

  const saveQuizStats = (correct: number, total: number) => {
    setQuizCorrect(correct);
    setQuizTotal(total);
    localStorage.setItem("n4_quiz_correct", correct.toString());
    localStorage.setItem("n4_quiz_total", total.toString());
  };

  // --- Get list filtered by current selected lesson ---
  const getFilteredKanji = (): KanjiN4Item[] => {
    if (currentLesson === "all") return KANJI_N4_DATA;
    return KANJI_N4_DATA.filter(k => k.lesson === currentLesson);
  };

  // --- Initialize Kanji MCQ quiz for the selected lesson ---
  const initKanjiQuiz = (lessonToUse = currentLesson) => {
    const filtered = KANJI_N4_DATA.filter(k => lessonToUse === "all" || k.lesson === lessonToUse);
    if (filtered.length === 0) return;
    
    // Shuffle
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    setQuizPool(shuffled);
    setQuizIndex(0);
    setQuizAnswered(false);
    setQuizSelected(null);
    setupQuizOptions(shuffled[0], KANJI_N4_DATA);
  };

  const setupQuizOptions = (questionItem: KanjiN4Item, allItems: KanjiN4Item[]) => {
    if (!questionItem) return;
    const opts = new Set<string>([questionItem.meaning]);
    while (opts.size < Math.min(4, allItems.length)) {
      const randItem = allItems[Math.floor(Math.random() * allItems.length)];
      opts.add(randItem.meaning);
    }
    setQuizOptions([...opts].sort());
  };

  // --- Initialize Example MCQ quiz ---
  const initExampleQuiz = (lessonToUse = currentLesson) => {
    const filteredKanji = KANJI_N4_DATA.filter(k => lessonToUse === "all" || k.lesson === lessonToUse);
    const examplesList = filteredKanji.flatMap(k => 
      k.examples.map(ex => ({
        rawWord: ex.rawWord,
        rawReading: ex.rawReading,
        meaning: ex.meaning
      }))
    );

    if (examplesList.length === 0) return;

    const shuffled = [...examplesList].sort(() => Math.random() - 0.5);
    setExQuizPool(shuffled);
    setExQuizIndex(0);
    setExQuizAnswered(false);
    setExQuizSelected(null);
    setupExQuizOptions(shuffled[0], examplesList);
  };

  const setupExQuizOptions = (
    questionEx: { rawWord: string; rawReading: string; meaning: string },
    allExs: { rawWord: string; rawReading: string; meaning: string }[]
  ) => {
    if (!questionEx) return;
    const opts = new Set<string>([questionEx.rawReading]);
    while (opts.size < Math.min(4, allExs.length)) {
      const randEx = allExs[Math.floor(Math.random() * allExs.length)];
      opts.add(randEx.rawReading);
    }
    setExQuizOptions([...opts].sort());
  };

  // --- Reset All Progress ---
  const handleResetProgress = () => {
    playSound.click();
    if (window.confirm("Bạn có chắc chắn muốn xóa toàn bộ tiến trình học và ôn tập Hán tự N4?")) {
      const emptySet = new Set<string>();
      saveKnownKanjiSet(emptySet);
      saveKnownExamplesSet(emptySet);
      saveQuizStats(0, 0);
      alert("Đã xóa toàn bộ tiến trình học N4!");
    }
  };

  // --- When active tab changes ---
  const handleTabChange = (tab: typeof activeTab) => {
    playSound.click();
    setActiveTab(tab);
    setFcFlipped(false);
    setExFcFlipped(false);
    setFcIndex(0);
    setExFcIndex(0);

    if (tab === "review") {
      initKanjiQuiz();
    } else if (tab === "example_review") {
      initExampleQuiz();
    }
  };

  // --- Filter and Search Overview ---
  const activeKanjiList = getFilteredKanji();
  const searchedKanjiList = activeKanjiList.filter(k => 
    k.kanji.includes(searchQuery) ||
    k.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
    k.hanviet.toLowerCase().includes(searchQuery.toLowerCase()) ||
    k.onyomi.some(o => o.includes(searchQuery)) ||
    k.kunyomi.some(ku => ku.includes(searchQuery))
  );

  // Example Flashcard dynamic list
  const activeExamplesList = activeKanjiList.flatMap(k => 
    k.examples.map(ex => ({
      kanji: k.kanji,
      phraseHtml: ex.phraseHtml,
      meaning: ex.meaning,
      rawWord: ex.rawWord,
      rawReading: ex.rawReading
    }))
  );

  return (
    <div className="washi-pattern min-h-screen p-4 sm:p-8 -mx-4 sm:-mx-8 rounded-[40px] border-2 border-[#1A1A1A] text-[#1A1A1A]" style={{ fontFamily: "'Lora', 'Noto Serif JP', serif" }}>
      {/* Top Bar Header */}
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
            <span className="text-xs font-black text-[#8B0000] uppercase tracking-widest block">BÍ KÍP QUYỂN III</span>
            <span className="text-xl font-black tracking-widest text-[#1A1A1A]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              HÁN TỰ N4
            </span>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto py-1 scrollbar-thin">
          <button
            onClick={() => handleTabChange("overview")}
            className={`px-4 py-2 text-xs font-bold border-2 border-[#1A1A1A] rounded-xl transition-all whitespace-nowrap ${activeTab === "overview" ? "bg-[#1A1A1A] text-white" : "bg-white text-[#1A1A1A] hover:bg-[#1A1A1A]/5"}`}
          >
            📚 Tổng Quan
          </button>
          <button
            onClick={() => handleTabChange("search")}
            className={`px-4 py-2 text-xs font-bold border-2 border-[#1A1A1A] rounded-xl transition-all whitespace-nowrap ${activeTab === "search" ? "bg-[#1A1A1A] text-white" : "bg-white text-[#1A1A1A] hover:bg-[#1A1A1A]/5"}`}
          >
            🔍 Tra cứu
          </button>
          <button
            onClick={() => handleTabChange("flashcard")}
            className={`px-4 py-2 text-xs font-bold border-2 border-[#1A1A1A] rounded-xl transition-all whitespace-nowrap ${activeTab === "flashcard" ? "bg-[#1A1A1A] text-white" : "bg-white text-[#1A1A1A] hover:bg-[#1A1A1A]/5"}`}
          >
            🃏 Flashcard Kanji
          </button>
          <button
            onClick={() => handleTabChange("review")}
            className={`px-4 py-2 text-xs font-bold border-2 border-[#1A1A1A] rounded-xl transition-all whitespace-nowrap ${activeTab === "review" ? "bg-[#1A1A1A] text-white" : "bg-white text-[#1A1A1A] hover:bg-[#1A1A1A]/5"}`}
          >
            📝 Ôn Tập Kanji
          </button>
          <button
            onClick={() => handleTabChange("example_flash")}
            className={`px-4 py-2 text-xs font-bold border-2 border-[#1A1A1A] rounded-xl transition-all whitespace-nowrap ${activeTab === "example_flash" ? "bg-[#1A1A1A] text-white" : "bg-white text-[#1A1A1A] hover:bg-[#1A1A1A]/5"}`}
          >
            🃏 Flashcard Ví dụ
          </button>
          <button
            onClick={() => handleTabChange("example_review")}
            className={`px-4 py-2 text-xs font-bold border-2 border-[#1A1A1A] rounded-xl transition-all whitespace-nowrap ${activeTab === "example_review" ? "bg-[#1A1A1A] text-white" : "bg-white text-[#1A1A1A] hover:bg-[#1A1A1A]/5"}`}
          >
            📖 Ôn Tập Ví dụ
          </button>
          <button
            onClick={() => handleTabChange("dashboard")}
            className={`px-4 py-2 text-xs font-bold border-2 border-[#1A1A1A] rounded-xl transition-all whitespace-nowrap ${activeTab === "dashboard" ? "bg-[#1A1A1A] text-white" : "bg-white text-[#1A1A1A] hover:bg-[#1A1A1A]/5"}`}
          >
            📊 Dashboard
          </button>
        </div>
      </div>

      {/* Lesson Filter Selector (Displayed on learning tabs) */}
      {["overview", "flashcard", "review", "example_flash", "example_review"].includes(activeTab) && (
        <div className="mb-6 bg-[#FFFDF9] p-4 border-2 border-[#1A1A1A] rounded-2xl shadow-[4px_4px_0px_#1A1A1A]">
          <span className="text-xs font-black text-[#8B0000] uppercase tracking-widest block mb-2">Chọn Bài Học N4:</span>
          <div className="flex gap-2 flex-wrap max-h-24 overflow-y-auto pr-2 scrollbar-thin">
            <button
              onClick={() => {
                playSound.click();
                setCurrentLesson("all");
                setFcIndex(0);
                setExFcIndex(0);
                if (activeTab === "review") initKanjiQuiz("all");
                if (activeTab === "example_review") initExampleQuiz("all");
              }}
              className={`px-3 py-1.5 text-xs font-bold border-2 border-[#1A1A1A] rounded-xl transition-all ${currentLesson === "all" ? "bg-[#8B0000] text-white border-[#8B0000]" : "bg-white text-[#1A1A1A] hover:bg-gray-100"}`}
            >
              📖 Tất Cả 18 Bài
            </button>
            {Array.from({ length: 18 }, (_, i) => i + 1).map(num => (
              <button
                key={num}
                onClick={() => {
                  playSound.click();
                  setCurrentLesson(num);
                  setFcIndex(0);
                  setExFcIndex(0);
                  if (activeTab === "review") initKanjiQuiz(num);
                  if (activeTab === "example_review") initExampleQuiz(num);
                }}
                className={`px-3 py-1.5 text-xs font-bold border-2 border-[#1A1A1A] rounded-xl transition-all ${currentLesson === num ? "bg-[#8B0000] text-white border-[#8B0000]" : "bg-white text-[#1A1A1A] hover:bg-gray-100"}`}
              >
                Bài {num}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB: OVERVIEW --- */}
      {activeTab === "overview" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Search bar inside overview */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="🔎 Lọc chữ Hán, nghĩa, âm đọc Onyomi, Kunyomi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-[#1A1A1A] rounded-xl text-sm focus:outline-none focus:border-[#8B0000] bg-white font-sans font-medium"
            />
          </div>

          {/* Kanji Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {searchedKanjiList.map((k) => {
              const isLearned = knownKanji.has(k.kanji);
              return (
                <div 
                  key={k.id}
                  className={`bg-white border-4 border-[#1A1A1A] rounded-2xl p-5 relative transition-all duration-200 hover:-translate-y-1 ${isLearned ? "shadow-[6px_6px_0px_#8B0000]" : "shadow-[6px_6px_0px_#1A1A1A]"}`}
                >
                  {/* Mark learned tag */}
                  <button
                    onClick={() => {
                      playSound.click();
                      const newSet = new Set<string>(knownKanji);
                      if (isLearned) {
                        newSet.delete(k.kanji);
                      } else {
                        newSet.add(k.kanji);
                      }
                      saveKnownKanjiSet(newSet);
                    }}
                    className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-1 rounded border border-[#1A1A1A] transition-all ${isLearned ? "bg-[#8B0000] text-white" : "bg-white hover:bg-gray-100"}`}
                  >
                    {isLearned ? "✓ Đã nhớ" : "Chưa nhớ"}
                  </button>

                  {/* Header info */}
                  <div className="flex items-center gap-4 border-b border-gray-100 pb-3 mb-3">
                    <span className="text-4xl font-black font-serif text-[#8B0000]">{k.kanji}</span>
                    <div>
                      <span className="text-xs bg-[#1A1A1A]/5 text-[#1A1A1A] px-2 py-0.5 rounded font-bold font-sans">Bài {k.lesson}</span>
                      <h4 className="text-lg font-black text-[#1A1A1A] font-sans mt-0.5">{k.hanviet}</h4>
                    </div>
                  </div>

                  {/* On / Kun readings */}
                  <div className="space-y-1 text-xs text-gray-700 font-semibold mb-4">
                    <p><span className="text-gray-400">Nghĩa:</span> {k.meaning}</p>
                    <p><span className="text-gray-400">On:</span> {k.onyomi.join(", ") || "—"}</p>
                    <p><span className="text-gray-400">Kun:</span> {k.kunyomi.join(", ") || "—"}</p>
                  </div>

                  {/* Examples Section */}
                  <div className="border-t border-dashed border-gray-200 pt-3">
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1">Ví dụ tiêu biểu:</span>
                    <div className="space-y-2">
                      {k.examples.map((ex, idx) => (
                        <div key={idx} className="text-xs">
                          <div className="flex items-start gap-1 font-sans font-bold">
                            <span className="text-red-800 font-normal mr-1">▪</span>
                            <span dangerouslySetInnerHTML={{ __html: ex.phraseHtml }} />
                          </div>
                          <span className="text-[11px] text-gray-500 font-semibold block pl-3">— {ex.meaning}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {searchedKanjiList.length === 0 && (
            <div className="text-center py-12 bg-white border-2 border-dashed border-gray-300 rounded-2xl">
              <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="font-bold text-gray-500">Không tìm thấy chữ Hán tự nào phù hợp bộ lọc!</p>
            </div>
          )}
        </div>
      )}

      {/* --- TAB: SEARCH --- */}
      {activeTab === "search" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Nhập chữ Hán, nghĩa hoặc âm đọc của từ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-[#1A1A1A] rounded-xl text-sm focus:outline-none focus:border-[#8B0000] bg-white font-sans font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {KANJI_N4_DATA.filter(k => 
              k.kanji.includes(searchQuery) ||
              k.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
              k.hanviet.toLowerCase().includes(searchQuery.toLowerCase()) ||
              k.onyomi.some(o => o.includes(searchQuery)) ||
              k.kunyomi.some(ku => ku.includes(searchQuery))
            ).map((k) => (
              <div key={k.id} className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-[4px_4px_0px_#1A1A1A]">
                <span className="text-4xl font-black font-serif text-[#8B0000] mb-1">{k.kanji}</span>
                <span className="text-xs font-black text-gray-500 mb-2">{k.hanviet}</span>
                <span className="text-sm font-bold text-[#1A1A1A] bg-[#8B0000]/10 px-3 py-1 rounded-full">{k.meaning}</span>
                
                <div className="mt-3 w-full border-t border-gray-100 pt-2 text-left space-y-1">
                  {k.examples.slice(0, 2).map((ex, idx) => (
                    <div key={idx} className="text-[11px] font-sans">
                      <span className="font-bold" dangerouslySetInnerHTML={{ __html: ex.phraseHtml }} />: {ex.meaning}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB: FLASHCARD KANJI --- */}
      {activeTab === "flashcard" && (
        <div className="max-w-md mx-auto space-y-6 animate-fadeIn">
          {activeKanjiList.length > 0 ? (
            <>
              <div className="text-center text-xs font-bold text-gray-500 bg-[#8B0000]/5 py-2 px-4 border border-[#8B0000]/20 rounded-xl">
                Bài học: {currentLesson === "all" ? "Tất Cả" : `Bài ${currentLesson}`} | Thẻ {fcIndex + 1}/{activeKanjiList.length}
              </div>

              {/* Flashcard Box with Flip animation */}
              <div 
                onClick={() => {
                  playSound.flip();
                  setFcFlipped(!fcFlipped);
                }}
                className="w-full h-80 bg-white border-4 border-[#1A1A1A] rounded-3xl p-6 flex flex-col items-center justify-center text-center cursor-pointer shadow-[6px_6px_0px_#1A1A1A] transition-all hover:border-[#8B0000]"
              >
                {!fcFlipped ? (
                  <div className="animate-fadeIn">
                    <span className="text-8xl font-black font-serif text-[#1A1A1A]">{activeKanjiList[fcIndex].kanji}</span>
                    <p className="text-xs text-gray-400 mt-6 font-bold uppercase tracking-widest">Chạm hoặc click để lật mặt sau</p>
                  </div>
                ) : (
                  <div className="animate-fadeIn text-left w-full h-full flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-3">
                        <span className="text-2xl font-black text-[#8B0000]">{activeKanjiList[fcIndex].kanji}</span>
                        <span className="text-lg font-black text-[#1A1A1A]">{activeKanjiList[fcIndex].hanviet}</span>
                      </div>

                      <div className="space-y-2 text-sm text-gray-700 font-semibold">
                        <p><span className="text-gray-400 block text-xs uppercase">Nghĩa tiếng Việt</span><span className="text-base text-black font-black">{activeKanjiList[fcIndex].meaning}</span></p>
                        <p><span className="text-gray-400 block text-xs uppercase">Âm On</span>{activeKanjiList[fcIndex].onyomi.join(", ") || "—"}</p>
                        <p><span className="text-gray-400 block text-xs uppercase">Âm Kun</span>{activeKanjiList[fcIndex].kunyomi.join(", ") || "—"}</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-400 text-center font-bold uppercase tracking-widest">Chạm lần nữa để lật lại</p>
                  </div>
                )}
              </div>

              {/* Known / Unknown Action buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    playSound.click();
                    const newSet = new Set<string>(knownKanji);
                    newSet.add(activeKanjiList[fcIndex].kanji);
                    saveKnownKanjiSet(newSet);
                    // Automatically next
                    if (fcIndex < activeKanjiList.length - 1) {
                      setFcIndex(fcIndex + 1);
                      setFcFlipped(false);
                    }
                  }}
                  className="py-3 bg-green-50 hover:bg-green-100 text-green-800 font-bold border-2 border-[#1A1A1A] rounded-xl transition-all shadow-[2px_2px_0px_#1A1A1A] flex items-center justify-center gap-2"
                >
                  <span>✅ Đã nhớ</span>
                </button>
                <button
                  onClick={() => {
                    playSound.click();
                    const newSet = new Set<string>(knownKanji);
                    newSet.delete(activeKanjiList[fcIndex].kanji);
                    saveKnownKanjiSet(newSet);
                    // Automatically next
                    if (fcIndex < activeKanjiList.length - 1) {
                      setFcIndex(fcIndex + 1);
                      setFcFlipped(false);
                    }
                  }}
                  className="py-3 bg-red-50 hover:bg-red-100 text-red-800 font-bold border-2 border-[#1A1A1A] rounded-xl transition-all shadow-[2px_2px_0px_#1A1A1A] flex items-center justify-center gap-2"
                >
                  <span>❌ Chưa nhớ</span>
                </button>
              </div>

              {/* Previous / Next buttons */}
              <div className="flex justify-between items-center pt-2">
                <button
                  disabled={fcIndex === 0}
                  onClick={() => {
                    playSound.click();
                    setFcIndex(fcIndex - 1);
                    setFcFlipped(false);
                  }}
                  className="px-4 py-2 text-xs font-bold border-2 border-[#1A1A1A] bg-white rounded-xl disabled:opacity-50 transition-all hover:bg-gray-100 shadow-[2px_2px_0px_#1A1A1A]"
                >
                  ◀ Trước
                </button>
                <button
                  onClick={() => {
                    playSound.flip();
                    setFcFlipped(!fcFlipped);
                  }}
                  className="px-6 py-2 text-xs font-bold border-2 border-[#1A1A1A] bg-[#1A1A1A] text-white rounded-xl transition-all hover:bg-[#8B0000] shadow-[2px_2px_0px_#1A1A1A]"
                >
                  🔄 Lật thẻ
                </button>
                <button
                  disabled={fcIndex === activeKanjiList.length - 1}
                  onClick={() => {
                    playSound.click();
                    setFcIndex(fcIndex + 1);
                    setFcFlipped(false);
                  }}
                  className="px-4 py-2 text-xs font-bold border-2 border-[#1A1A1A] bg-white rounded-xl disabled:opacity-50 transition-all hover:bg-gray-100 shadow-[2px_2px_0px_#1A1A1A]"
                >
                  Sau ▶
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12 bg-white border-2 border-dashed border-gray-300 rounded-3xl">
              <p className="font-bold text-gray-500">Không có dữ liệu Hán tự cho bài này!</p>
            </div>
          )}
        </div>
      )}

      {/* --- TAB: REVIEW KANJI MCQ --- */}
      {activeTab === "review" && (
        <div className="max-w-md mx-auto space-y-6 animate-fadeIn">
          {quizPool.length > 0 && quizIndex < quizPool.length ? (
            <div className="bg-white border-4 border-[#1A1A1A] rounded-3xl p-6 shadow-[6px_6px_0px_#1A1A1A] space-y-6 text-center">
              <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                <span>ÔN TẬP PHẢN XẠ KANJI</span>
                <span className="text-[#8B0000]">Đã làm: {quizIndex + 1}/{quizPool.length}</span>
              </div>

              <div className="py-4">
                <span className="text-8xl font-black font-serif text-[#1A1A1A] inline-block mb-3">{quizPool[quizIndex].kanji}</span>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Chọn ý nghĩa hoặc âm Hán Việt chính xác:</p>
              </div>

              {/* Options list */}
              <div className="space-y-3">
                {quizOptions.map((opt, idx) => {
                  const isCorrect = opt === quizPool[quizIndex].meaning;
                  let btnStyle = "bg-white hover:bg-gray-50 text-[#1A1A1A] border-[#1A1A1A]";
                  
                  if (quizAnswered) {
                    if (isCorrect) {
                      btnStyle = "bg-green-100 text-green-800 border-green-600 scale-[1.01] shadow-[2px_2px_0px_#155724]";
                    } else if (quizSelected === opt) {
                      btnStyle = "bg-red-100 text-red-800 border-red-600 opacity-85";
                    } else {
                      btnStyle = "bg-white text-gray-300 border-gray-200 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={quizAnswered}
                      onClick={() => {
                        setQuizSelected(opt);
                        setQuizAnswered(true);
                        const isAnsCorrect = opt === quizPool[quizIndex].meaning;
                        if (isAnsCorrect) {
                          playSound.correct();
                          saveQuizStats(quizCorrect + 1, quizTotal + 1);
                        } else {
                          playSound.wrong();
                          saveQuizStats(quizCorrect, quizTotal + 1);
                        }

                        // Next question delay
                        setTimeout(() => {
                          if (quizIndex < quizPool.length - 1) {
                            const nextIdx = quizIndex + 1;
                            setQuizIndex(nextIdx);
                            setQuizAnswered(false);
                            setQuizSelected(null);
                            setupQuizOptions(quizPool[nextIdx], KANJI_N4_DATA);
                          } else {
                            setQuizIndex(quizPool.length); // complete
                          }
                        }, 1800);
                      }}
                      className={`w-full py-3 px-4 border-2 rounded-xl text-left font-black transition-all text-sm sm:text-base flex justify-between items-center ${btnStyle}`}
                    >
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-white border-4 border-[#1A1A1A] rounded-3xl p-8 text-center shadow-[6px_6px_0px_#1A1A1A] space-y-4">
              <Award className="w-16 h-16 text-[#8B0000] mx-auto animate-bounce" />
              <h4 className="text-xl font-black">🏆 Hoàn thành bài trắc nghiệm Hán tự!</h4>
              <p className="text-sm text-gray-600">Bạn đã ôn tập xong toàn bộ chữ Hán trong học phần này.</p>
              <button
                onClick={() => initKanjiQuiz()}
                className="px-6 py-2 bg-[#1A1A1A] hover:bg-[#8B0000] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all"
              >
                Làm Lại Bài Này
              </button>
            </div>
          )}
        </div>
      )}

      {/* --- TAB: FLASHCARD EXAMPLES --- */}
      {activeTab === "example_flash" && (
        <div className="max-w-md mx-auto space-y-6 animate-fadeIn">
          {activeExamplesList.length > 0 ? (
            <>
              <div className="text-center text-xs font-bold text-gray-500 bg-[#8B0000]/5 py-2 px-4 border border-[#8B0000]/20 rounded-xl">
                Ví dụ Bài: {currentLesson === "all" ? "Tất Cả" : `Bài ${currentLesson}`} | Thẻ {exFcIndex + 1}/{activeExamplesList.length}
              </div>

              {/* Flashcard Box with Flip animation */}
              <div 
                onClick={() => {
                  playSound.flip();
                  setExFcFlipped(!exFcFlipped);
                }}
                className="w-full h-80 bg-white border-4 border-[#1A1A1A] rounded-3xl p-6 flex flex-col items-center justify-center text-center cursor-pointer shadow-[6px_6px_0px_#1A1A1A] transition-all hover:border-[#8B0000]"
              >
                {!exFcFlipped ? (
                  <div className="animate-fadeIn">
                    <span 
                      className="text-4xl sm:text-5xl font-black text-[#1A1A1A] font-sans block mb-2"
                      dangerouslySetInnerHTML={{ __html: activeExamplesList[exFcIndex].phraseHtml }}
                    />
                    <p className="text-xs text-gray-400 mt-6 font-bold uppercase tracking-widest">Chạm hoặc click để xem nghĩa & furigana</p>
                  </div>
                ) : (
                  <div className="animate-fadeIn text-left w-full h-full flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-4">
                        <span className="text-lg font-black text-[#8B0000]">Ý nghĩa ví dụ</span>
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded font-bold">Gốc: {activeExamplesList[exFcIndex].kanji}</span>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <span className="text-xs text-gray-400 block uppercase">Chữ và cách đọc</span>
                          <span className="text-xl font-bold text-[#1A1A1A]" dangerouslySetInnerHTML={{ __html: activeExamplesList[exFcIndex].phraseHtml }} />
                          <span className="text-sm text-gray-500 block font-sans font-semibold mt-1">Cách đọc: {activeExamplesList[exFcIndex].rawReading}</span>
                        </div>

                        <div>
                          <span className="text-xs text-gray-400 block uppercase">Nghĩa tiếng Việt</span>
                          <span className="text-base font-black text-black">{activeExamplesList[exFcIndex].meaning}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-400 text-center font-bold uppercase tracking-widest">Chạm lần nữa để lật lại</p>
                  </div>
                )}
              </div>

              {/* Known / Unknown Action buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    playSound.click();
                    const newSet = new Set<string>(knownExamples);
                    newSet.add(activeExamplesList[exFcIndex].rawWord);
                    saveKnownExamplesSet(newSet);
                    // Automatically next
                    if (exFcIndex < activeExamplesList.length - 1) {
                      setExFcIndex(exFcIndex + 1);
                      setExFcFlipped(false);
                    }
                  }}
                  className="py-3 bg-green-50 hover:bg-green-100 text-green-800 font-bold border-2 border-[#1A1A1A] rounded-xl transition-all shadow-[2px_2px_0px_#1A1A1A]"
                >
                  ✅ Đã nhớ ví dụ
                </button>
                <button
                  onClick={() => {
                    playSound.click();
                    const newSet = new Set<string>(knownExamples);
                    newSet.delete(activeExamplesList[exFcIndex].rawWord);
                    saveKnownExamplesSet(newSet);
                    // Automatically next
                    if (exFcIndex < activeExamplesList.length - 1) {
                      setExFcIndex(exFcIndex + 1);
                      setExFcFlipped(false);
                    }
                  }}
                  className="py-3 bg-red-50 hover:bg-red-100 text-red-800 font-bold border-2 border-[#1A1A1A] rounded-xl transition-all shadow-[2px_2px_0px_#1A1A1A]"
                >
                  ❌ Chưa nhớ ví dụ
                </button>
              </div>

              {/* Previous / Next buttons */}
              <div className="flex justify-between items-center pt-2">
                <button
                  disabled={exFcIndex === 0}
                  onClick={() => {
                    playSound.click();
                    setExFcIndex(exFcIndex - 1);
                    setExFcFlipped(false);
                  }}
                  className="px-4 py-2 text-xs font-bold border-2 border-[#1A1A1A] bg-white rounded-xl disabled:opacity-50 transition-all hover:bg-gray-100 shadow-[2px_2px_0px_#1A1A1A]"
                >
                  ◀ Trước
                </button>
                <button
                  onClick={() => {
                    playSound.flip();
                    setExFcFlipped(!exFcFlipped);
                  }}
                  className="px-6 py-2 text-xs font-bold border-2 border-[#1A1A1A] bg-[#1A1A1A] text-white rounded-xl transition-all hover:bg-[#8B0000] shadow-[2px_2px_0px_#1A1A1A]"
                >
                  🔄 Lật thẻ
                </button>
                <button
                  disabled={exFcIndex === activeExamplesList.length - 1}
                  onClick={() => {
                    playSound.click();
                    setExFcIndex(exFcIndex + 1);
                    setExFcFlipped(false);
                  }}
                  className="px-4 py-2 text-xs font-bold border-2 border-[#1A1A1A] bg-white rounded-xl disabled:opacity-50 transition-all hover:bg-gray-100 shadow-[2px_2px_0px_#1A1A1A]"
                >
                  Sau ▶
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12 bg-white border-2 border-dashed border-gray-300 rounded-3xl">
              <p className="font-bold text-gray-500">Không có dữ liệu ví dụ cho bài này!</p>
            </div>
          )}
        </div>
      )}

      {/* --- TAB: EXAMPLE REVIEW MCQ --- */}
      {activeTab === "example_review" && (
        <div className="max-w-md mx-auto space-y-6 animate-fadeIn">
          {exQuizPool.length > 0 && exQuizIndex < exQuizPool.length ? (
            <div className="bg-white border-4 border-[#1A1A1A] rounded-3xl p-6 shadow-[6px_6px_0px_#1A1A1A] space-y-6 text-center">
              <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                <span>ÔN TẬP ĐỌC CỤM TỪ</span>
                <span className="text-[#8B0000]">Đã làm: {exQuizIndex + 1}/{exQuizPool.length}</span>
              </div>

              <div className="py-4">
                <span className="text-4xl font-black text-[#1A1A1A] font-sans inline-block mb-1">{exQuizPool[exQuizIndex].rawWord}</span>
                <p className="text-sm text-gray-500 font-bold">Nghĩa: {exQuizPool[exQuizIndex].meaning}</p>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-3">Chọn cách đọc Hiragana chính xác:</p>
              </div>

              {/* Options list */}
              <div className="space-y-3">
                {exQuizOptions.map((opt, idx) => {
                  const isCorrect = opt === exQuizPool[exQuizIndex].rawReading;
                  let btnStyle = "bg-white hover:bg-gray-50 text-[#1A1A1A] border-[#1A1A1A]";
                  
                  if (exQuizAnswered) {
                    if (isCorrect) {
                      btnStyle = "bg-green-100 text-green-800 border-green-600 scale-[1.01] shadow-[2px_2px_0px_#155724]";
                    } else if (exQuizSelected === opt) {
                      btnStyle = "bg-red-100 text-red-800 border-red-600 opacity-85";
                    } else {
                      btnStyle = "bg-white text-gray-300 border-gray-200 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={exQuizAnswered}
                      onClick={() => {
                        setExQuizSelected(opt);
                        setExQuizAnswered(true);
                        const isAnsCorrect = opt === exQuizPool[exQuizIndex].rawReading;
                        if (isAnsCorrect) {
                          playSound.correct();
                          saveQuizStats(quizCorrect + 1, quizTotal + 1);
                        } else {
                          playSound.wrong();
                          saveQuizStats(quizCorrect, quizTotal + 1);
                        }

                        // Next question delay
                        setTimeout(() => {
                          if (exQuizIndex < exQuizPool.length - 1) {
                            const nextIdx = exQuizIndex + 1;
                            setExQuizIndex(nextIdx);
                            setExQuizAnswered(false);
                            setExQuizSelected(null);
                            setupExQuizOptions(exQuizPool[nextIdx], exQuizPool);
                          } else {
                            setExQuizIndex(exQuizPool.length); // complete
                          }
                        }, 1800);
                      }}
                      className={`w-full py-3 px-4 border-2 rounded-xl text-left font-sans font-black transition-all text-sm sm:text-base flex justify-between items-center ${btnStyle}`}
                    >
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-white border-4 border-[#1A1A1A] rounded-3xl p-8 text-center shadow-[6px_6px_0px_#1A1A1A] space-y-4">
              <Award className="w-16 h-16 text-[#8B0000] mx-auto animate-bounce" />
              <h4 className="text-xl font-black">🏆 Hoàn thành trắc nghiệm ví dụ!</h4>
              <p className="text-sm text-gray-600">Bạn đã hoàn thành xong các câu hỏi cách đọc cụm từ.</p>
              <button
                onClick={() => initExampleQuiz()}
                className="px-6 py-2 bg-[#1A1A1A] hover:bg-[#8B0000] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all"
              >
                Làm Lại Bài Này
              </button>
            </div>
          )}
        </div>
      )}

      {/* --- TAB: DASHBOARD STATS --- */}
      {activeTab === "dashboard" && (
        <div className="space-y-8 animate-fadeIn">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 border-4 border-[#1A1A1A] rounded-2xl shadow-[6px_6px_0px_#1A1A1A] text-center">
              <span className="text-xs font-black tracking-widest text-gray-400 block mb-1">TỔNG HÁN TỰ N4</span>
              <div className="text-5xl font-black text-[#8B0000]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                194
              </div>
              <span className="text-xs text-gray-500 font-bold mt-1 block">Trong 18 bài học</span>
            </div>

            <div className="bg-white p-6 border-4 border-[#1A1A1A] rounded-2xl shadow-[6px_6px_0px_#1A1A1A] text-center">
              <span className="text-xs font-black tracking-widest text-[#8B0000] block mb-1">ĐÃ GHI NHỚ KANJI</span>
              <div className="text-5xl font-black text-[#1A1A1A]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                {knownKanji.size}<span className="text-xl text-gray-400">/194</span>
              </div>
              <span className="text-xs text-gray-500 font-bold mt-1 block">Đạt {Math.round((knownKanji.size / 194) * 100)}% thành tựu</span>
            </div>

            <div className="bg-white p-6 border-4 border-[#1A1A1A] rounded-2xl shadow-[6px_6px_0px_#1A1A1A] text-center">
              <span className="text-xs font-black tracking-widest text-blue-800 block mb-1">ĐÃ NHỚ VÍ DỤ</span>
              <div className="text-5xl font-black text-[#1A1A1A]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                {knownExamples.size}
              </div>
              <span className="text-xs text-gray-500 font-bold mt-1 block">Cụm từ vựng thực tế</span>
            </div>

            <div className="bg-white p-6 border-4 border-[#1A1A1A] rounded-2xl shadow-[6px_6px_0px_#1A1A1A] text-center">
              <span className="text-xs font-black tracking-widest text-green-800 block mb-1">ÔN TẬP ĐÚNG KANJI</span>
              <div className="text-5xl font-black text-[#1A1A1A]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                {quizCorrect}<span className="text-xl text-gray-400">/{quizTotal || 0}</span>
              </div>
              <span className="text-xs text-gray-500 font-bold mt-1 block">Độ chính xác {quizTotal > 0 ? Math.round((quizCorrect / quizTotal) * 100) : 0}%</span>
            </div>
          </div>

          {/* Reset progress */}
          <div className="bg-[#FFFDF9] p-6 border-4 border-[#1A1A1A] rounded-2xl shadow-[8px_8px_0px_#8B0000] flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h4 className="text-lg font-black" style={{ fontFamily: "'Noto Serif JP', serif" }}>Khu vực tu luyện & reset dữ liệu</h4>
              <p className="text-xs text-gray-500 font-medium mt-1">Hành động này sẽ giải phóng tất cả các ấn ký ghi nhớ và đưa bạn về khởi điểm của đạo tràng N4.</p>
            </div>
            <button
              onClick={handleResetProgress}
              className="px-6 py-3 bg-[#8B0000] hover:bg-red-800 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all border-2 border-[#1A1A1A] shadow-[3px_3px_0px_#1A1A1A]"
            >
              Reset dữ liệu học N4
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center mt-12 pt-6 border-t border-[#1A1A1A]/10 text-xs text-gray-400 font-bold">
        © 漢字 N4 - SONKURO | Hiển thị Furigana chuẩn hóa cho chữ Hán, không bọc phần Hiragana đuôi
      </footer>
    </div>
  );
}
