import React, { useState, useEffect, useMemo } from "react";
import { playSound } from "../utils/audio";
import { 
  getGrammarN4Data, 
  parseText, 
  getPlainText, 
  GrammarN4Item 
} from "../data/grammarN4Data";
import { 
  ArrowLeft, 
  Volume2, 
  BookOpen, 
  Search, 
  RotateCcw, 
  Sparkles, 
  Layers, 
  GraduationCap, 
  Trophy, 
  CheckCircle2, 
  Bookmark, 
  HelpCircle, 
  ChevronLeft, 
  ChevronRight, 
  Info,
  Brain,
  X,
  Plus
} from "lucide-react";

interface GrammarN4LessonsProps {
  onGoBack: () => void;
}

export default function GrammarN4Lessons({ onGoBack }: GrammarN4LessonsProps) {
  const [activeTab, setActiveTab] = useState<"dashboard" | "library" | "flashcard" | "practice">("dashboard");
  const [selectedGrammarId, setSelectedGrammarId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Mastered IDs in local storage
  const [masteredIds, setMasteredIds] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem("sk_n4_mastered_ids");
      return saved ? new Set(JSON.parse(saved).map(Number)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Sync state reactively when localStorage is updated by cloud sync or other components
  useEffect(() => {
    const handleStorageChange = (e: any) => {
      const key = e.detail?.key || e.key;
      if (!key || key === "sk_n4_mastered_ids") {
        try {
          const saved = localStorage.getItem("sk_n4_mastered_ids");
          if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) {
              const newSet = new Set<number>(parsed.map(Number));
              setMasteredIds(prev => {
                if (newSet.size !== prev.size || Array.from(newSet).some(id => !prev.has(id))) {
                  return newSet;
                }
                return prev;
              });
            }
          } else {
            setMasteredIds(new Set());
          }
        } catch (err) {
          console.error("Failed to read sk_n4_mastered_ids on storage change:", err);
        }
      }
    };

    window.addEventListener("local-storage-changed" as any, handleStorageChange);
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("local-storage-changed" as any, handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    try {
      const arr = Array.from(masteredIds).map(Number);
      const serialized = JSON.stringify(arr);
      const existing = localStorage.getItem("sk_n4_mastered_ids");
      if (existing !== serialized) {
        localStorage.setItem("sk_n4_mastered_ids", serialized);
      }
    } catch (e) {
      console.error("Error saving sk_n4_mastered_ids:", e);
    }
  }, [masteredIds]);

  // Safe helper to toggle mastered status without losing background cloud-synced items
  const toggleMasteredId = (id: number) => {
    try {
      const saved = localStorage.getItem("sk_n4_mastered_ids");
      const currentArray: number[] = saved ? JSON.parse(saved).map(Number) : Array.from(masteredIds);
      const nextSet = new Set<number>(currentArray);
      
      if (nextSet.has(id)) {
        nextSet.delete(id);
      } else {
        nextSet.add(id);
      }
      
      const newArray = Array.from(nextSet);
      localStorage.setItem("sk_n4_mastered_ids", JSON.stringify(newArray));
      setMasteredIds(nextSet);
    } catch (e) {
      console.error("Error toggling N4 mastered ID:", e);
    }
  };

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const cleanText = getPlainText(text);
      const u = new SpeechSynthesisUtterance(cleanText); 
      u.lang = "ja-JP"; 
      u.rate = 0.85; 
      window.speechSynthesis.speak(u);
    }
  };

  const grammarData = useMemo(() => getGrammarN4Data(), []);

  const learnedCount = masteredIds.size;
  const totalCount = grammarData.length;
  const progressPercent = Math.round((learnedCount / (totalCount || 1)) * 100) || 0;

  // Search filter
  const filteredGrammar = useMemo(() => {
    if (!searchQuery.trim()) return grammarData;
    const query = searchQuery.toLowerCase();
    return grammarData.filter(
      item =>
        item.p.toLowerCase().includes(query) ||
        item.m.toLowerCase().includes(query) ||
        item.l.toLowerCase().includes(query)
    );
  }, [grammarData, searchQuery]);

  return (
    <div className="washi-pattern min-h-screen p-4 sm:p-8 -mx-4 sm:-mx-8 rounded-[40px] border-2 border-[#1A1A1A] text-[#1A1A1A]" style={{ fontFamily: "'Lora', 'Noto Serif JP', serif" }}>
      {/* Navigation Sub-bar */}
      <div className="flex justify-between items-center mb-8 border-b-2 border-[#1A1A1A] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 border-2 border-[#1A1A1A] bg-[#1A1A1A] rounded flex items-center justify-center text-white font-black text-lg">
            山
          </div>
          <span className="text-lg font-black tracking-widest text-[#1A1A1A]">
            NGỮ PHÁP N4
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

      {/* Detail View of a specific grammar pattern */}
      {selectedGrammarId !== null ? (
        <DetailView 
          grammar={grammarData.find(item => item.id === selectedGrammarId)!}
          onBack={() => {
            playSound.click();
            setSelectedGrammarId(null);
          }}
          speakText={speakText}
          isLearned={masteredIds.has(selectedGrammarId)}
          onToggleLearned={() => {
            playSound.click();
            toggleMasteredId(selectedGrammarId);
          }}
        />
      ) : (
        <>
          {/* Sub Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 bg-[#F4EFEB] p-1.5 rounded-2xl border-2 border-[#1A1A1A]">
            <button
              onClick={() => {
                playSound.click();
                setActiveTab("dashboard");
              }}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 ${activeTab === "dashboard" ? "bg-[#8B0000] text-white shadow-md" : "text-[#1A1A1A] hover:bg-white/50"}`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Tổng quan</span>
            </button>
            <button
              onClick={() => {
                playSound.click();
                setActiveTab("library");
              }}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 ${activeTab === "library" ? "bg-[#8B0000] text-white shadow-md" : "text-[#1A1A1A] hover:bg-white/50"}`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Bài học</span>
            </button>
            <button
              onClick={() => {
                playSound.click();
                setActiveTab("flashcard");
              }}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 ${activeTab === "flashcard" ? "bg-[#8B0000] text-white shadow-md" : "text-[#1A1A1A] hover:bg-white/50"}`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Flashcard</span>
            </button>
            <button
              onClick={() => {
                playSound.click();
                setActiveTab("practice");
              }}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 ${activeTab === "practice" ? "bg-[#8B0000] text-white shadow-md" : "text-[#1A1A1A] hover:bg-white/50"}`}
            >
              <Brain className="w-4 h-4" />
              <span>Luyện tập</span>
            </button>
          </div>

          {/* Render Active Tab Screen */}
          {activeTab === "dashboard" && (
            <div className="space-y-8 animate-fadeIn">
              {/* Progress Card */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border-4 border-[#1A1A1A] shadow-[8px_8px_0px_#1A1A1A] relative overflow-hidden flex flex-col md:flex-row items-center gap-6">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#8B0000]/5 rounded-bl-full flex items-center justify-center pointer-events-none">
                  <Sparkles className="w-8 h-8 text-[#8B0000]/20 translate-x-4 -translate-y-4" />
                </div>
                
                <div className="w-24 h-24 sm:w-28 sm:h-28 relative flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#F4EFEB" strokeWidth="8"></circle>
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="42" 
                      fill="none" 
                      stroke="#8B0000" 
                      strokeWidth="8" 
                      strokeDasharray={`${progressPercent * 2.63} 263`}
                      className="transition-all duration-1000"
                    ></circle>
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-xl sm:text-2xl font-black text-[#1A1A1A]">{progressPercent}%</span>
                    <span className="text-[9px] uppercase tracking-wider font-bold text-gray-400">Tiến độ</span>
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left space-y-2">
                  <h3 className="text-2xl font-black text-[#1A1A1A]">Tu hành Trận pháp N4</h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-serif">
                    Đã thông thạo <span className="font-bold text-[#8B0000]">{learnedCount}</span> trên tổng số <span className="font-bold text-[#1A1A1A]">{totalCount}</span> cổ trận pháp ngữ pháp N4. Hãy kiên trì luyện tập mỗi ngày để tăng tiến công lực!
                  </p>
                </div>
              </div>

              {/* Action grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div 
                  onClick={() => {
                    playSound.click();
                    setActiveTab("library");
                  }}
                  className="bg-white p-6 rounded-2xl border-2 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-200">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="font-black text-lg">Học bài mới</h4>
                  <p className="text-xs text-gray-500 font-serif leading-relaxed">
                    Khám phá chi tiết công thức chia thể, ý nghĩa và ví dụ sinh động của từng bài học.
                  </p>
                </div>

                <div 
                  onClick={() => {
                    playSound.click();
                    setActiveTab("flashcard");
                  }}
                  className="bg-white p-6 rounded-2xl border-2 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center border border-amber-200">
                    <Bookmark className="w-5 h-5 text-amber-600" />
                  </div>
                  <h4 className="font-black text-lg">Flashcard cốt tủy</h4>
                  <p className="text-xs text-gray-500 font-serif leading-relaxed">
                    Sử dụng thẻ nhớ lật nhanh để củng cố phản xạ ghi nhớ ý nghĩa tiếng Việt và cách dùng.
                  </p>
                </div>

                <div 
                  onClick={() => {
                    playSound.click();
                    setActiveTab("practice");
                  }}
                  className="bg-white p-6 rounded-2xl border-2 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center border border-emerald-200">
                    <Brain className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h4 className="font-black text-lg">Luyện tập trắc nghiệm</h4>
                  <p className="text-xs text-gray-500 font-serif leading-relaxed">
                    Vượt qua các câu hỏi trắc nghiệm chia từ và thử thách xếp sao chuẩn khuôn đề JLPT N4.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "library" && (
            <div className="space-y-6 animate-fadeIn">
              {/* Search Header */}
              <div className="relative">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm mẫu ngữ pháp, ý nghĩa..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white pl-12 pr-4 py-3 rounded-2xl border-2 border-[#1A1A1A] text-[#1A1A1A] placeholder-gray-400 focus:outline-none font-bold text-sm"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")} 
                    className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Lesson Grid List */}
              <div className="grid grid-cols-1 gap-4">
                {filteredGrammar.length > 0 ? (
                  filteredGrammar.map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => {
                        playSound.click();
                        setSelectedGrammarId(item.id);
                      }}
                      className="bg-white p-5 rounded-2xl border-2 border-[#1A1A1A] shadow-[3px_3px_0px_#1A1A1A] hover:border-[#8B0000] hover:shadow-[3px_3px_0px_#8B0000] cursor-pointer transition-all flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] sm:text-xs font-black bg-[#8B0000] text-white px-2 py-0.5 rounded">
                            {item.l}
                          </span>
                          {masteredIds.has(item.id) && (
                            <span className="text-[10px] sm:text-xs font-black bg-emerald-100 text-emerald-700 border border-emerald-300 px-2 py-0.5 rounded flex items-center gap-1">
                              ✓ Đã thuộc
                            </span>
                          )}
                        </div>
                        <h4 className="text-lg sm:text-xl font-black font-japanese text-[#1A1A1A]">
                          {item.p}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-500 font-serif">
                          {item.m}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
                    </div>
                  ))
                ) : (
                  <div className="bg-[#FDFBF7] p-12 text-center rounded-3xl border-2 border-[#1A1A1A]">
                    <span className="text-4xl block mb-2">🏮</span>
                    <p className="font-bold text-gray-500">Không tìm thấy trận pháp ngữ pháp phù hợp!</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "flashcard" && (
            <FlashcardView 
              grammarList={grammarData} 
              masteredIds={masteredIds} 
              onToggleMastered={(id) => {
                toggleMasteredId(id);
              }}
              onResetAll={() => {
                if (window.confirm("Bạn có chắc chắn muốn đưa toàn bộ thẻ về trạng thái chưa thuộc?")) {
                  playSound.click();
                  localStorage.setItem("sk_n4_mastered_ids", JSON.stringify([]));
                  setMasteredIds(new Set());
                }
              }}
            />
          )}

          {activeTab === "practice" && (
            <PracticeView 
              grammarList={grammarData} 
              speakText={speakText}
            />
          )}
        </>
      )}
    </div>
  );
}

/* ==========================================================================
   DETAIL VIEW COMPONENT
   ========================================================================== */
interface DetailViewProps {
  grammar: GrammarN4Item;
  onBack: () => void;
  speakText: (text: string) => void;
  isLearned: boolean;
  onToggleLearned: () => void;
}

function DetailView({ grammar, onBack, speakText, isLearned, onToggleLearned }: DetailViewProps) {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Detail Header bar */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onBack}
          className="p-2 rounded-xl bg-white border-2 border-[#1A1A1A] text-[#1A1A1A] hover:text-[#8B0000] hover:border-[#8B0000] transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <span className="text-xs font-black text-gray-500 uppercase tracking-widest block">CHI TIẾT TRẬN PHÁP</span>
          <span className="font-bold text-[#8B0000]">{grammar.l}</span>
        </div>
      </div>

      {/* Main info card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border-4 border-[#1A1A1A] shadow-[6px_6px_0px_#1A1A1A] space-y-4">
        <h3 className="text-2xl sm:text-3xl font-black text-[#8B0000] font-japanese leading-relaxed">
          {grammar.p}
        </h3>
        <p className="text-lg font-bold text-[#1A1A1A] font-serif border-l-4 border-[#8B0000] pl-3 py-1">
          {grammar.m}
        </p>
        
        {/* Structure sub-section */}
        <div className="bg-[#FDFBF7] p-4 rounded-xl border border-gray-200 mt-4">
          <span className="text-xs font-black text-amber-700 uppercase tracking-wider block mb-1">CẤU TRÚC KẾT HỢP</span>
          <p className="font-mono text-sm sm:text-base text-gray-800 whitespace-pre-line leading-relaxed">
            {grammar.s}
          </p>
        </div>

        {/* Note/Usage */}
        {grammar.u && (
          <div className="text-xs sm:text-sm text-gray-500 leading-relaxed font-serif pt-2 border-t border-gray-100">
            <span className="font-bold block text-gray-700 mb-0.5">Chú ý sử dụng:</span>
            {grammar.u}
          </div>
        )}
      </div>

      {/* Action Button: Marked as Learned */}
      <button 
        onClick={onToggleLearned}
        className={`w-full py-4 rounded-2xl font-bold transition-all border-2 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none flex items-center justify-center gap-2 ${isLearned ? "bg-emerald-500 text-white hover:bg-emerald-600" : "bg-[#F4EFEB] text-[#1A1A1A] hover:bg-white"}`}
      >
        <span>{isLearned ? "✓ Đã thuộc trận pháp này" : "Đánh dấu là đã thuộc"}</span>
      </button>

      {/* Examples list */}
      <div className="space-y-4">
        <h4 className="text-base font-black text-gray-500 uppercase tracking-widest">Ví dụ minh họa</h4>
        {grammar.ex.map((ex, idx) => (
          <div 
            key={idx}
            className="bg-white p-5 rounded-2xl border-2 border-[#1A1A1A] shadow-[3px_3px_0px_#1A1A1A] flex items-start gap-4"
          >
            <button 
              onClick={() => {
                playSound.click();
                speakText(ex.t);
              }}
              className="p-2 bg-[#F4EFEB] hover:bg-[#8B0000]/10 text-[#8B0000] border-2 border-transparent hover:border-[#8B0000]/20 rounded-xl transition-all shrink-0 mt-1"
            >
              <Volume2 className="w-5 h-5" />
            </button>
            <div className="space-y-2 flex-1">
              <p 
                className="text-lg sm:text-xl font-bold font-japanese leading-relaxed text-[#1A1A1A]"
                dangerouslySetInnerHTML={{ __html: parseText(ex.t) }}
              ></p>
              <p className="text-sm text-gray-500 font-serif leading-relaxed italic">
                {ex.v}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==========================================================================
   FLASHCARD VIEW COMPONENT
   ========================================================================== */
interface FlashcardViewProps {
  grammarList: GrammarN4Item[];
  masteredIds: Set<number>;
  onToggleMastered: (id: number) => void;
  onResetAll: () => void;
}

function FlashcardView({ grammarList, masteredIds, onToggleMastered, onResetAll }: FlashcardViewProps) {
  const [sessionMode, setSessionMode] = useState<"dashboard" | "playing" | "summary">("dashboard");
  const [playType, setPlayMode] = useState<"unmastered" | "mastered">("unmastered");
  const [cardsQueue, setCardsQueue] = useState<GrammarN4Item[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [sessionCorrect, setSessionCorrect] = useState<GrammarN4Item[]>([]);
  const [sessionIncorrect, setSessionIncorrect] = useState<GrammarN4Item[]>([]);

  const unmasteredList = useMemo(() => grammarList.filter(g => !masteredIds.has(g.id)), [grammarList, masteredIds]);
  const masteredList = useMemo(() => grammarList.filter(g => masteredIds.has(g.id)), [grammarList, masteredIds]);

  const startSession = (type: "unmastered" | "mastered") => {
    playSound.click();
    setPlayMode(type);
    setSessionCorrect([]);
    setSessionIncorrect([]);
    setIsFlipped(false);
    setCurrentIndex(0);
    const initialQueue = type === "unmastered" ? [...unmasteredList] : [...masteredList];
    // Shuffle queue slightly or sort
    initialQueue.sort(() => Math.random() - 0.5);
    setCardsQueue(initialQueue);
    setSessionMode("playing");
  };

  const handleNextCard = () => {
    if (cardsQueue.length === 0) return;
    playSound.click();
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % cardsQueue.length);
  };

  const handlePrevCard = () => {
    if (cardsQueue.length === 0) return;
    playSound.click();
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + cardsQueue.length) % cardsQueue.length);
  };

  // Keyboard arrow key navigation listener
  useEffect(() => {
    if (sessionMode !== "playing") return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;
      if (
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          (activeElement as HTMLElement).isContentEditable)
      ) {
        return;
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNextCard();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevCard();
      } else if (e.key === " " || e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
        setIsFlipped(prev => !prev);
        playSound.click();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [sessionMode, cardsQueue.length, currentIndex, isFlipped]);

  const handleCardFeedback = (remembered: boolean) => {
    playSound.click();
    const currentCard = cardsQueue[currentIndex];
    if (!currentCard) return;

    if (remembered) {
      setSessionCorrect(prev => [...prev, currentCard]);
      if (playType === "unmastered") {
        onToggleMastered(currentCard.id);
      }
    } else {
      setSessionIncorrect(prev => {
        if (!prev.find(c => c.id === currentCard.id)) {
          return [...prev, currentCard];
        }
        return prev;
      });
    }

    setIsFlipped(false);
    setTimeout(() => {
      setCardsQueue(prev => {
        const nextQueue = prev.filter((_, idx) => idx !== currentIndex);
        return nextQueue;
      });
      setCurrentIndex(prev => (cardsQueue.length <= 1 ? 0 : prev % (cardsQueue.length - 1)));
    }, 150);
  };

  if (sessionMode === "dashboard") {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="bg-[#FDFBF7] p-5 rounded-2xl border-2 border-dashed border-[#1A1A1A] text-center space-y-2">
          <h4 className="font-black text-lg">Trung Tâm Thẻ Nhớ N4</h4>
          <p className="text-xs text-gray-500 font-serif">
            Học thông qua phản xạ lật thẻ 2 mặt siêu tốc. Đã nắm vững: <span className="font-bold text-[#8B0000]">{masteredList.length}/{grammarList.length}</span> thẻ.
          </p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => startSession("unmastered")}
            disabled={unmasteredList.length === 0}
            className={`w-full p-5 rounded-2xl flex items-center justify-between border-2 border-[#1A1A1A] transition-all shadow-[4px_4px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${unmasteredList.length > 0 ? "bg-[#8B0000] text-white hover:bg-[#8B0000]/95" : "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200 shadow-none"}`}
          >
            <div className="text-left space-y-1">
              <span className="font-black text-lg block">Học thẻ MỚI / CHƯA NHỚ</span>
              <span className="text-xs opacity-90 font-serif">Có {unmasteredList.length} bài chưa thông thạo</span>
            </div>
            <Sparkles className="w-6 h-6 shrink-0" />
          </button>

          <button 
            onClick={() => startSession("mastered")}
            disabled={masteredList.length === 0}
            className={`w-full p-5 rounded-2xl flex items-center justify-between border-2 border-[#1A1A1A] transition-all shadow-[4px_4px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${masteredList.length > 0 ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200 shadow-none"}`}
          >
            <div className="text-left space-y-1">
              <span className="font-black text-lg block">Ôn tập thẻ ĐÃ NHỚ</span>
              <span className="text-xs opacity-90 font-serif">Đang có {masteredList.length} thẻ đang lưu giữ</span>
            </div>
            <CheckCircle2 className="w-6 h-6 shrink-0" />
          </button>
        </div>

        <div className="text-center pt-6">
          <button 
            onClick={onResetAll}
            className="text-xs font-black text-gray-400 hover:text-red-600 transition-colors uppercase tracking-widest underline cursor-pointer"
          >
            Khôi phục trạng thái tất cả thẻ về chưa thuộc
          </button>
        </div>
      </div>
    );
  }

  const currentCard = cardsQueue[currentIndex] || cardsQueue[0];
  if (!currentCard || cardsQueue.length === 0) {
    // Session is complete!
    return (
      <div className="bg-white p-8 rounded-3xl border-4 border-[#1A1A1A] shadow-[8px_8px_0px_#1A1A1A] text-center space-y-6 animate-fadeIn">
        <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 shadow-inner mx-auto border-2 border-amber-200">
          <Trophy className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-[#1A1A1A]">Hoàn thành phiên học!</h2>
          <p className="text-sm text-gray-500 font-serif">
            Bạn đã nỗ lực lật qua tất cả các thẻ ngữ pháp được chọn.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-center">
            <span className="text-3xl font-black text-emerald-600 block">{sessionCorrect.length}</span>
            <span className="text-[10px] font-bold text-emerald-700 uppercase">Đã thuộc</span>
          </div>
          <div className="bg-rose-50 border border-red-200 p-4 rounded-xl text-center">
            <span className="text-3xl font-black text-rose-600 block">{sessionIncorrect.length}</span>
            <span className="text-[10px] font-bold text-rose-700 uppercase">Chưa thuộc</span>
          </div>
        </div>

        <button 
          onClick={() => setSessionMode("dashboard")}
          className="w-full max-w-xs mx-auto py-3.5 bg-[#1A1A1A] hover:bg-gray-800 text-white font-bold rounded-2xl border-2 border-[#1A1A1A] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Trở về Thẻ nhớ ➔</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Cards Play Header info */}
      <div className="flex justify-between items-center bg-[#FDFBF7] p-4 rounded-xl border border-gray-200">
        <span className="font-bold text-[#1A1A1A] text-sm">
          Thẻ <span className="text-[#8B0000]">{currentIndex + 1}</span> / {cardsQueue.length}
        </span>
        <button 
          onClick={() => {
            playSound.click();
            setSessionMode("dashboard");
          }}
          className="text-xs font-black text-rose-600 hover:underline uppercase cursor-pointer"
        >
          Dừng phiên ✕
        </button>
      </div>

      {/* Main Flashcard Interactive Box */}
      <div 
        onClick={() => {
          playSound.click();
          setIsFlipped(prev => !prev);
        }}
        className={`w-full min-h-[320px] flex flex-col items-center justify-center p-6 sm:p-8 rounded-[2rem] shadow-[6px_6px_0px_#1A1A1A] transition-all cursor-pointer relative border-4 ${isFlipped ? "bg-amber-50/50 border-[#8B0000]" : "bg-white border-[#1A1A1A] hover:scale-[1.01]"}`}
      >
        {!isFlipped ? (
          <div className="text-center space-y-4 animate-fadeIn">
            <span className="text-xs font-black text-amber-700 uppercase tracking-widest bg-amber-100 px-3 py-1.5 rounded-full">Ý nghĩa Tiếng Việt</span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] leading-normal font-serif">
              {currentCard.m}
            </h3>
            <span className="text-xs font-medium text-gray-400 animate-pulse block pt-4">Bấm vào thẻ để lật ngược ☝</span>
          </div>
        ) : (
          <div className="text-center space-y-6 animate-fadeIn w-full">
            <span className="text-xs font-black text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3 py-1.5 rounded-full">Trận pháp Tiếng Nhật</span>
            <h3 className="text-3xl sm:text-4xl font-black text-[#8B0000] font-japanese leading-relaxed">
              {currentCard.p}
            </h3>
            <div className="bg-white p-4 rounded-xl border border-gray-200 text-left w-full shadow-inner max-w-sm mx-auto">
              <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest block mb-1">Cấu trúc</span>
              <p className="font-mono text-[#1A1A1A] text-xs sm:text-sm whitespace-pre-line leading-relaxed">{currentCard.s}</p>
            </div>
          </div>
        )}
      </div>

      {/* Slide Navigation + Feedback controller buttons */}
      <div className="space-y-3 pt-2">
        <div className="flex justify-between items-center gap-3">
          <button
            onClick={handlePrevCard}
            className="flex-1 py-3 bg-white hover:bg-gray-50 border-2 border-[#1A1A1A] text-[#1A1A1A] font-black text-xs rounded-xl shadow-[2px_2px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-1 cursor-pointer"
            title="Thẻ trước (Phím ◄)"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Thẻ Trước</span>
          </button>
          
          <button
            onClick={() => {
              playSound.click();
              setIsFlipped(prev => !prev);
            }}
            className="px-5 py-3 bg-amber-100 hover:bg-amber-200 border-2 border-[#1A1A1A] text-[#1A1A1A] font-black text-xs rounded-xl shadow-[2px_2px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-1 cursor-pointer"
            title="Lật thẻ (Phím Space)"
          >
            <span>Lật thẻ 🔄</span>
          </button>

          <button
            onClick={handleNextCard}
            className="flex-1 py-3 bg-white hover:bg-gray-50 border-2 border-[#1A1A1A] text-[#1A1A1A] font-black text-xs rounded-xl shadow-[2px_2px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-1 cursor-pointer"
            title="Thẻ tiếp (Phím ►)"
          >
            <span>Thẻ Tiếp</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-1">
          <button
            disabled={!isFlipped}
            onClick={() => handleCardFeedback(false)}
            className={`py-3.5 rounded-xl font-bold transition-all border-2 border-[#1A1A1A] shadow-[3px_3px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer ${isFlipped ? "bg-rose-500 text-white hover:bg-rose-600" : "bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed shadow-none"}`}
          >
            CHƯA THUỘC ✕
          </button>
          <button
            disabled={!isFlipped}
            onClick={() => handleCardFeedback(true)}
            className={`py-3.5 rounded-xl font-bold transition-all border-2 border-[#1A1A1A] shadow-[3px_3px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer ${isFlipped ? "bg-emerald-500 text-white hover:bg-emerald-600" : "bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed shadow-none"}`}
          >
            ĐÃ THUỘC ✓
          </button>
        </div>

        <div className="text-center text-[11px] text-gray-500 font-medium pt-1">
          💡 Phím tắt: <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-[10px] font-mono">◄</kbd> Lùi • <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-[10px] font-mono">►</kbd> Tới • <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-[10px] font-mono">Space</kbd> Lật thẻ
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   PRACTICE / QUIZ VIEW COMPONENT
   ========================================================================== */
interface PracticeViewProps {
  grammarList: GrammarN4Item[];
  speakText: (text: string) => void;
}

function PracticeView({ grammarList, speakText }: PracticeViewProps) {
  const [sessionState, setSessionState] = useState<"list" | "playing" | "result">("list");
  const [selectedGrammar, setSelectedGrammar] = useState<GrammarN4Item | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [arrangedParts, setArrangedParts] = useState<number[]>([]);

  const startSession = (grammar: GrammarN4Item) => {
    playSound.click();
    setSelectedGrammar(grammar);
    // Shuffle the quiz list from the selected grammar
    const questions = [...grammar.qz].sort(() => Math.random() - 0.5);
    setQuizQuestions(questions);
    setCurrentIndex(0);
    setScore(0);
    setSessionState("playing");
    resetQuestionState();
  };

  const resetQuestionState = () => {
    setShowAnswer(false);
    setSelectedOption(null);
    setArrangedParts([]);
  };

  const checkAnswer = (isCorrect: boolean) => {
    playSound.click();
    if (isCorrect) setScore(prev => prev + 1);
    setShowAnswer(true);
  };

  const nextQuestion = () => {
    playSound.click();
    if (currentIndex + 1 < quizQuestions.length) {
      setCurrentIndex(prev => prev + 1);
      resetQuestionState();
    } else {
      setSessionState("result");
    }
  };

  if (sessionState === "list") {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="bg-[#FDFBF7] p-5 rounded-2xl border-2 border-dashed border-[#1A1A1A] text-center space-y-1">
          <h4 className="font-black text-lg">Trắc Nghiệm Trận Pháp</h4>
          <p className="text-xs text-gray-500 font-serif">
            Lựa chọn mẫu ngữ pháp để tiến hành làm kiểm tra nhanh 5 câu trắc nghiệm chia từ hoặc sắp xếp sao.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {grammarList.map(g => (
            <div 
              key={g.id}
              onClick={() => startSession(g)}
              className="bg-white p-5 rounded-2xl border-2 border-[#1A1A1A] shadow-[3px_3px_0px_#1A1A1A] hover:border-[#8B0000] hover:shadow-[3px_3px_0px_#8B0000] cursor-pointer transition-all flex items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <span className="text-[10px] sm:text-xs font-black bg-[#8B0000] text-white px-2 py-0.5 rounded">
                  {g.l}
                </span>
                <h4 className="text-lg sm:text-xl font-black font-japanese text-[#1A1A1A]">
                  {g.p}
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 font-serif">
                  {g.m}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-[#1A1A1A] bg-[#F4EFEB] flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#1A1A1A]">
                <Plus className="w-5 h-5 text-[#1A1A1A]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (sessionState === "result") {
    const percent = Math.round((score / (quizQuestions.length || 1)) * 100);
    return (
      <div className="bg-white p-8 rounded-3xl border-4 border-[#1A1A1A] shadow-[8px_8px_0px_#1A1A1A] text-center space-y-6 animate-fadeIn">
        <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 shadow-inner mx-auto border-2 border-amber-200">
          <Trophy className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-[#1A1A1A]">Hoàn thành luyện tập!</h2>
          <p className="text-sm text-gray-500 font-serif">
            {percent >= 80 ? "Tuyệt vời, bạn đã thông thạo trận pháp này một cách sâu sắc!" : "Bạn hãy nỗ lực thử thêm nhiều lần nữa nhé!"}
          </p>
        </div>

        <div className="text-5xl font-black text-[#8B0000]">
          {score} / {quizQuestions.length}
        </div>

        <button 
          onClick={() => setSessionState("list")}
          className="w-full max-w-xs mx-auto py-3.5 bg-[#1A1A1A] hover:bg-gray-800 text-white font-bold rounded-2xl border-2 border-[#1A1A1A] transition-all flex items-center justify-center gap-2"
        >
          <span>Trở về danh sách ➔</span>
        </button>
      </div>
    );
  }

  const currentQ = quizQuestions[currentIndex];
  if (!currentQ) return null;
  const progressPercent = ((currentIndex) / quizQuestions.length) * 100;

  return (
    <div className="bg-white p-5 sm:p-6 rounded-3xl border-4 border-[#1A1A1A] shadow-[6px_6px_0px_#1A1A1A] space-y-6 animate-fadeIn">
      {/* Quiz Progress header */}
      <div className="flex justify-between items-center text-xs font-bold text-gray-500">
        <button 
          onClick={() => setSessionState("list")}
          className="text-xs font-black text-rose-600 hover:underline uppercase"
        >
          Hủy kiểm tra ✕
        </button>
        <span>Câu {currentIndex + 1} / {quizQuestions.length}</span>
      </div>

      <div className="w-full bg-[#F4EFEB] rounded-full h-2">
        <div 
          className="bg-[#8B0000] h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      {currentQ.type === "fill" ? (
        <div className="space-y-6">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Điền từ đúng vào chỗ trống</span>
          <h3 
            className="text-xl sm:text-2xl font-black font-japanese text-[#1A1A1A] leading-relaxed bg-[#FDFBF7] p-5 rounded-2xl border-2 border-[#1A1A1A]"
            dangerouslySetInnerHTML={{ __html: parseText(currentQ.q.replace("___", " ( ... ) ")) }}
          ></h3>

          <div className="grid grid-cols-1 gap-3">
            {currentQ.o.map((opt: string, idx: number) => {
              let btnStyle = "border-2 border-[#1A1A1A] bg-white hover:bg-gray-50 text-[#1A1A1A]";
              if (showAnswer) {
                if (opt === currentQ.a) {
                  btnStyle = "border-2 border-emerald-500 bg-emerald-50 text-emerald-700 font-bold";
                } else if (opt === selectedOption) {
                  btnStyle = "border-2 border-rose-500 bg-rose-50 text-rose-700 font-bold";
                } else {
                  btnStyle = "border-2 border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed";
                }
              }

              return (
                <button
                  key={idx}
                  disabled={showAnswer}
                  onClick={() => {
                    setSelectedOption(opt);
                    checkAnswer(opt === currentQ.a);
                  }}
                  className={`w-full py-3.5 px-4 text-left rounded-xl font-bold text-base transition-all ${btnStyle}`}
                >
                  <span className="font-japanese text-base sm:text-lg">{opt}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Sắp xếp các từ để hoàn thành câu hoàn chỉnh</span>
          <h3 
            className="text-lg sm:text-xl font-black font-japanese text-[#1A1A1A] text-center bg-[#FDFBF7] p-4 rounded-xl border-2 border-[#1A1A1A]"
            dangerouslySetInnerHTML={{ __html: parseText(currentQ.q) }}
          ></h3>

          {/* Arranged box */}
          <div className="flex flex-wrap gap-2 min-h-[60px] p-4 bg-amber-50/20 rounded-2xl border-2 border-dashed border-[#1A1A1A] justify-center items-center">
            {arrangedParts.length === 0 && <span className="text-xs text-gray-400 font-serif">Bấm vào các từ bên dưới</span>}
            {arrangedParts.map((partIdx, idx) => (
              <button 
                key={idx}
                disabled={showAnswer}
                onClick={() => setArrangedParts(prev => prev.filter(p => p !== partIdx))}
                className="px-3 py-1.5 bg-[#8B0000] text-white rounded-lg shadow font-japanese text-sm sm:text-base active:scale-95 transition-all border border-[#1A1A1A]"
              >
                {currentQ.p[partIdx]}
              </button>
            ))}
          </div>

          {/* Options pool */}
          <div className="flex flex-wrap gap-2.5 justify-center">
            {currentQ.p.map((word: string, idx: number) => {
              if (arrangedParts.includes(idx)) return null;
              return (
                <button 
                  key={idx}
                  disabled={showAnswer}
                  onClick={() => setArrangedParts(prev => [...prev, idx])}
                  className="px-4 py-2 border-2 border-[#1A1A1A] rounded-xl font-japanese bg-white text-sm sm:text-base active:scale-95 transition-all shadow-[2px_2px_0px_#1A1A1A]"
                >
                  {word}
                </button>
              );
            })}
          </div>

          <div className="pt-2">
            {!showAnswer && arrangedParts.length === currentQ.p.length && (
              <button 
                onClick={() => checkAnswer(JSON.stringify(arrangedParts) === JSON.stringify(currentQ.ao))}
                className="w-full py-3.5 bg-[#1A1A1A] text-white rounded-xl font-bold animate-fadeIn shadow-md hover:bg-gray-800 transition"
              >
                Kiểm tra đáp án
              </button>
            )}
          </div>
        </div>
      )}

      {/* Solution Explanation Box */}
      {showAnswer && (
        <div className="bg-[#FDFBF7] p-5 rounded-2xl border-2 border-[#1A1A1A] space-y-4 animate-slideIn">
          {(() => {
            const isCorrect = currentQ.type === "fill" 
              ? selectedOption === currentQ.a 
              : JSON.stringify(arrangedParts) === JSON.stringify(currentQ.ao);

            return isCorrect ? (
              <div className="text-emerald-600 font-bold flex items-center gap-2 text-sm sm:text-base">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Chính xác! Bạn thật xuất sắc. 🎉</span>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-rose-600 font-bold flex items-center gap-2 text-sm sm:text-base">
                  <X className="w-5 h-5 shrink-0" />
                  <span>Chưa chính xác rồi. Đáp án đúng là:</span>
                </div>
                <div className="font-japanese text-gray-800 bg-white p-3 rounded-lg border border-gray-200 text-base leading-relaxed">
                  {currentQ.type === "fill" ? currentQ.a : currentQ.ao.map((i: number) => currentQ.p[i]).join(" ")}
                </div>
              </div>
            );
          })()}

          {currentQ.e && (
            <div className="text-xs sm:text-sm text-gray-500 leading-relaxed font-serif pt-2 border-t border-gray-200">
              <span className="font-bold text-gray-700 block mb-0.5">Chú ý giải thích:</span>
              {currentQ.e}
            </div>
          )}

          <button
            onClick={nextQuestion}
            className="w-full py-3 bg-[#1A1A1A] hover:bg-gray-800 text-white font-bold rounded-xl transition"
          >
            <span>Câu tiếp theo ➔</span>
          </button>
        </div>
      )}
    </div>
  );
}
