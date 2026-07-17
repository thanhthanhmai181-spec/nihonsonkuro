import React, { useState, useEffect, useRef } from "react";
import { Vocabulary, UserProgress } from "../types";
import { playSound } from "../utils/audio";
import { Timer, Award, RotateCcw, HelpCircle, Gamepad2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MatchGameProps {
  vocabList: Vocabulary[];
  progress: UserProgress;
  updateProgress: (updated: Partial<UserProgress>) => void;
  onGoBack: () => void;
}

interface CardItem {
  id: string; // matches vocab.id
  uniqueId: string; // card-specific id
  type: "jp" | "vi";
  content: string;
  isMatched: boolean;
  isFailed: boolean;
}

export default function MatchGame({ vocabList, progress, updateProgress, onGoBack }: MatchGameProps) {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]); // uniqueId
  const [matchesCount, setMatchesCount] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [xpAwarded, setXpAwarded] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startNewGame = () => {
    playSound.click();
    if (vocabList.length < 4) return;

    // Pick 4 random words
    const shuffled = [...vocabList].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 4);

    const generatedCards: CardItem[] = [];
    selected.forEach(v => {
      generatedCards.push({
        id: v.id,
        uniqueId: `${v.id}_jp`,
        type: "jp",
        content: v.word,
        isMatched: false,
        isFailed: false
      });
      generatedCards.push({
        id: v.id,
        uniqueId: `${v.id}_vi`,
        type: "vi",
        content: v.meaning,
        isMatched: false,
        isFailed: false
      });
    });

    // Shuffle the 8 cards
    setCards(generatedCards.sort(() => 0.5 - Math.random()));
    setSelectedIds([]);
    setMatchesCount(0);
    setSeconds(0);
    setGameFinished(false);
    setIsPlaying(true);

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
  };

  useEffect(() => {
    startNewGame();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [vocabList]);

  const handleCardClick = (card: CardItem) => {
    if (card.isMatched || selectedIds.includes(card.uniqueId) || selectedIds.length >= 2) return;
    
    playSound.flip();
    const updatedSelected = [...selectedIds, card.uniqueId];
    setSelectedIds(updatedSelected);

    if (updatedSelected.length === 2) {
      // Evaluate match
      const card1 = cards.find(c => c.uniqueId === updatedSelected[0])!;
      const card2 = cards.find(c => c.uniqueId === updatedSelected[1])!;

      // Match check: must be different cards (jp vs vi) of the same vocabulary id
      if (card1.id === card2.id && card1.type !== card2.type) {
        // Successful Match!
        setTimeout(() => {
          playSound.correct();
          setCards(prev => prev.map(c => {
            if (c.id === card1.id) {
              return { ...c, isMatched: true };
            }
            return c;
          }));
          setSelectedIds([]);
          const newMatchesCount = matchesCount + 1;
          setMatchesCount(newMatchesCount);

          if (newMatchesCount === 4) {
            handleVictory();
          }
        }, 400);
      } else {
        // Failed Match! Highlight in red, then reset
        setTimeout(() => {
          playSound.wrong();
          setCards(prev => prev.map(c => {
            if (c.uniqueId === card1.uniqueId || c.uniqueId === card2.uniqueId) {
              return { ...c, isFailed: true };
            }
            return c;
          }));
        }, 300);

        setTimeout(() => {
          setCards(prev => prev.map(c => {
            if (c.uniqueId === card1.uniqueId || c.uniqueId === card2.uniqueId) {
              return { ...c, isFailed: false };
            }
            return c;
          }));
          setSelectedIds([]);
        }, 1000);
      }
    }
  };

  const handleVictory = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    playSound.achievement();
    
    // XP math: base 25 XP + speed bonus if under 20 seconds!
    const speedBonus = seconds < 20 ? 15 : 0;
    const finalXp = 25 + speedBonus;
    setXpAwarded(finalXp);
    
    updateProgress({
      xp: progress.xp + finalXp,
      streak: progress.streak === 0 ? 1 : progress.streak
    });
    
    setGameFinished(true);
    setIsPlaying(false);
  };

  if (vocabList.length < 4) {
    return (
      <div className="bg-white rounded-[32px] p-12 text-center border border-natural-border shadow-sm space-y-4">
        <span className="text-5xl">⚠️</span>
        <h4 className="font-black text-natural-deep text-lg">Chưa đủ từ vựng để ghép cặp!</h4>
        <p className="text-natural-muted text-sm max-w-md mx-auto leading-relaxed">
          Cần ít nhất 4 từ vựng trong kho dữ liệu để Thầy Sơn có thể khởi tạo trò chơi ghép cặp Kanji và nghĩa tiếng Việt một cách chính xác nhất.
        </p>
        <button
          onClick={onGoBack}
          className="px-5 py-2.5 bg-pink-600 hover:bg-pink-700 text-white font-extrabold rounded-2xl text-xs cursor-pointer transition-colors"
        >
          Trở về trang chủ
        </button>
      </div>
    );
  }

  return (
    <div id="match-game-container" className="max-w-xl mx-auto space-y-6">
      
      {/* Game Header */}
      <div className="flex items-center justify-between bg-white p-5 rounded-[32px] border border-natural-border shadow-sm">
        <button 
          onClick={onGoBack}
          className="text-natural-muted hover:text-pink-600 text-xs font-bold transition-colors cursor-pointer"
        >
          ← Thoát trò chơi
        </button>
        <div className="flex items-center gap-2 text-natural-deep font-black text-sm tracking-wide">
          <Gamepad2 className="w-4 h-4 text-pink-500 animate-pulse" />
          <span>GHÉP CẶP SƠN MÔN</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold bg-pink-50 text-pink-700 border border-pink-100 px-3 py-1 rounded-full">
          <Timer className="w-3.5 h-3.5 text-pink-500" />
          <span>Thời gian: {seconds}s</span>
        </div>
      </div>

      {!gameFinished ? (
        <div className="space-y-6">
          <div className="bg-natural-sand rounded-2xl p-4 border border-natural-border flex gap-3 items-start">
            <span className="text-xl shrink-0">💡</span>
            <p className="text-xs text-natural-text leading-relaxed">
              <strong>Cách chơi:</strong> Chạm vào một thẻ tiếng Nhật (Kanji/Kana) rồi chạm tiếp vào thẻ nghĩa tiếng Việt tương ứng để triệt tiêu chúng. Hãy ghép đôi thật nhanh để nhận thêm 15 XP thưởng tốc độ từ Thầy Sơn nhé!
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 gap-4">
            {cards.map((card) => {
              const isSelected = selectedIds.includes(card.uniqueId);
              
              let cardStyle = "bg-white border-natural-border text-natural-text hover:border-pink-300 hover:shadow-md hover:scale-[1.02]";
              let labelStyle = "text-natural-muted";
              let contentStyle = "text-natural-deep font-black";

              if (card.isMatched) {
                cardStyle = "bg-emerald-50 border-emerald-300 text-emerald-700 opacity-40 scale-95 cursor-not-allowed";
                labelStyle = "text-emerald-500/80";
                contentStyle = "text-emerald-800 font-bold";
              } else if (card.isFailed) {
                cardStyle = "bg-rose-50 border-rose-400 text-rose-800 animate-shake";
                labelStyle = "text-rose-400";
                contentStyle = "text-rose-900 font-bold";
              } else if (isSelected) {
                cardStyle = "bg-pink-50 border-pink-400 text-pink-950 scale-105 font-bold shadow-sm shadow-pink-500/10";
                labelStyle = "text-pink-500";
                contentStyle = "text-pink-900 font-extrabold";
              }

              return (
                <button
                  key={card.uniqueId}
                  onClick={() => handleCardClick(card)}
                  disabled={card.isMatched}
                  className={`h-24 px-4 py-2 rounded-2xl border transition-all duration-300 text-center flex flex-col items-center justify-center text-sm sm:text-base leading-snug shadow-sm cursor-pointer ${cardStyle}`}
                >
                  <span className={`text-[10px] font-black font-mono tracking-wider block mb-1 uppercase ${labelStyle}`}>
                    {card.type === "jp" ? "TIẾNG NHẬT" : "ĐỊNH NGHĨA"}
                  </span>
                  <span className={`line-clamp-2 ${contentStyle}`}>{card.content}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        // Victory Panel
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[32px] p-6 sm:p-8 border border-natural-border shadow-sm text-center space-y-6"
        >
          <span className="text-5xl block animate-bounce">🏆👨‍🏫🎉</span>
          
          <div className="space-y-1">
            <span className="text-xs bg-pink-50 text-pink-600 border border-pink-100 px-3 py-1 rounded-full font-bold uppercase">
              Bản đồ hoàn thành!
            </span>
            <h2 className="text-2xl font-black text-natural-deep mt-2">
              Sugoi! Ghép đôi siêu tốc thành công!
            </h2>
            <p className="text-xs text-natural-muted font-bold">Em đã giải quyết tất cả cặp thẻ chỉ trong {seconds} giây!</p>
          </div>

          {/* Scoring Metrics */}
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto my-4">
            <div className="bg-natural-soft p-4 rounded-2xl border border-natural-border">
              <span className="block text-xs text-natural-muted font-bold">Thời gian</span>
              <span className="text-3xl font-black text-pink-600">{seconds} giây</span>
            </div>
            <div className="bg-natural-soft p-4 rounded-2xl border border-natural-border">
              <span className="block text-xs text-natural-muted font-bold">Nhận được</span>
              <span className="text-3xl font-black text-pink-500">+{xpAwarded} XP</span>
            </div>
          </div>

          <div className="bg-natural-sand p-5 rounded-2xl border border-natural-border text-left text-xs sm:text-sm text-natural-text leading-relaxed">
            {seconds < 20 ? (
              <p>
                <strong>Thầy Sơn nhận xét:</strong> Tốc độ của em nhanh đến mức kinh ngạc, đúng chất một Shonen Hero thực thụ! Thầy đã tặng thêm cho em 15 XP thưởng nóng tốc độ rồi nhé. Quá tuyệt vời! 🌸⚡
              </p>
            ) : (
              <p>
                <strong>Thầy Sơn nhận xét:</strong> Chúc mừng em đã ghép cặp thành công nhé! Luyện tập thêm vài lần nữa để tăng phản xạ của mắt và tay nha, lần sau hãy cố gắng vượt dưới mốc 20 giây để đạt XP thưởng tối đa từ Thầy nhé! 🌟
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <button
              onClick={startNewGame}
              className="flex-1 py-3.5 bg-pink-600 hover:bg-pink-700 text-white font-black rounded-2xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 uppercase tracking-wide cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Chơi ván mới 🎮
            </button>
            <button
              onClick={onGoBack}
              className="flex-1 py-3.5 bg-natural-soft hover:bg-natural-sand border border-natural-border text-natural-text font-black rounded-2xl text-xs sm:text-sm transition-all uppercase tracking-wide cursor-pointer"
            >
              Trở về Trang chủ
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
