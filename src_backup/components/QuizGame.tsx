import React, { useState, useEffect } from "react";
import { Vocabulary, UserProgress, QuizQuestion } from "../types";
import { playSound } from "../utils/audio";
import { Award, CheckCircle, XCircle, ChevronRight, RotateCcw, ShieldAlert, Sparkles, Smile } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface QuizGameProps {
  vocabList: Vocabulary[];
  progress: UserProgress;
  updateProgress: (updated: Partial<UserProgress>) => void;
  onGoBack: () => void;
}

export default function QuizGame({ vocabList, progress, updateProgress, onGoBack }: QuizGameProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  // Helper to generate dynamic questions from vocab list
  const generateQuiz = () => {
    if (vocabList.length < 4) return;
    
    // Choose 5 random unique words
    const shuffled = [...vocabList].sort(() => 0.5 - Math.random());
    const selectedWords = shuffled.slice(0, Math.min(5, shuffled.length));
    
    const newQuestions: QuizQuestion[] = selectedWords.map((word, index) => {
      // Pick 3 random distractor words that are NOT the correct one
      const distractors = vocabList
        .filter(v => v.id !== word.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      
      const typeNum = Math.floor(Math.random() * 3);
      let type: "kanji-to-meaning" | "kana-to-kanji" | "meaning-to-word" = "kanji-to-meaning";
      let prompt = "";
      let correctAnswer = "";
      let options: string[] = [];
      let explanation = "";

      // Check if we have an AI-generated example cached
      let wordExample = word.example;
      let wordExampleMeaning = word.exampleMeaning;
      try {
        const cachedStr = localStorage.getItem("hoc_cung_thay_son_ai_examples");
        if (cachedStr) {
          const cached = JSON.parse(cachedStr);
          if (cached[word.id]) {
            wordExample = cached[word.id].example;
            wordExampleMeaning = cached[word.id].exampleMeaning;
          }
        }
      } catch (e) {}

      const hasExample = wordExample && wordExample !== "N/A";
      const exPart = hasExample ? ` Ví dụ: ${wordExample} (${wordExampleMeaning})` : "";

      if (typeNum === 0) {
        type = "kanji-to-meaning";
        prompt = `Từ "${word.word}" (${word.reading}) có nghĩa là gì?`;
        correctAnswer = word.meaning;
        options = [word.meaning, ...distractors.map(d => d.meaning)];
        explanation = `"${word.word}" có nghĩa là "${word.meaning}".${exPart}`;
      } else if (typeNum === 1) {
        type = "kana-to-kanji";
        prompt = `Từ nào có cách viết Kanji thích hợp với cách đọc "${word.reading}"?`;
        correctAnswer = word.word;
        options = [word.word, ...distractors.map(d => d.word)];
        explanation = `"${word.word}" được đọc là "${word.reading}", nghĩa là "${word.meaning}".${exPart}`;
      } else {
        type = "meaning-to-word";
        prompt = `Hãy tìm từ tiếng Nhật mang nghĩa: "${word.meaning}"`;
        correctAnswer = `${word.word} (${word.reading})`;
        options = [
          `${word.word} (${word.reading})`,
          ...distractors.map(d => `${d.word} (${d.reading})`)
        ];
        explanation = `"${word.word}" [${word.romaji}] có nghĩa là "${word.meaning}".${exPart}`;
      }

      // Shuffle options
      options = options.sort(() => 0.5 - Math.random());

      return {
        id: `q_${index}`,
        type,
        prompt,
        options,
        correctAnswer,
        explanation,
        wordId: word.id
      };
    });

    setQuestions(newQuestions);
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setCorrectCount(0);
    setGameFinished(false);
    setXpEarned(0);
  };

  useEffect(() => {
    generateQuiz();
  }, [vocabList]);

  const handleOptionSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption || isAnswered) return;
    
    const isCorrect = selectedOption === questions[currentIdx].correctAnswer;
    setIsAnswered(true);

    if (isCorrect) {
      playSound.correct();
      setCorrectCount(prev => prev + 1);
    } else {
      playSound.wrong();
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      playSound.click();
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Game Over calculations
      playSound.achievement();
      const finalXp = correctCount * 15; // 15 XP per correct answer
      setXpEarned(finalXp);
      
      const newHighScore = correctCount > progress.quizHighScore;
      const updatedHighScore = newHighScore ? correctCount : progress.quizHighScore;
      
      // Update overall XP and High Score in general profile
      updateProgress({
        xp: progress.xp + finalXp,
        quizHighScore: updatedHighScore,
        streak: progress.streak === 0 ? 1 : progress.streak // Make sure streak is activated
      });
      
      setGameFinished(true);
    }
  };

  // Evaluation remarks from Thầy Sơn based on score
  const getTeacherVerdict = () => {
    if (correctCount === 5) {
      return {
        emoji: "🌸👨‍🏫🌸",
        title: "Tuyệt vời xuất sắc! Sugoi desu ne!",
        desc: "Thầy Sơn thực sự ngả mũ thán phục! Em đã trả lời đúng tất cả 5 câu hỏi một cách hoàn hảo. Đúng là trò cưng của Thầy! Cứ tiếp tục phong độ siêu cấp này nhé! Ganbatte! 🎉"
      };
    }
    if (correctCount >= 3) {
      return {
        emoji: "👍👨‍🏫🌟",
        title: "Làm tốt lắm học trò! Đạt yêu cầu!",
        desc: "Chúc mừng em đã vượt qua bài kiểm tra của Thầy một cách thuyết phục. Chỉ sai sót một chút xíu thôi, ôn lại flashcard vài lần nữa là em sẽ đạt điểm tuyệt đối ngay! Thầy tin em! 💪"
      };
    }
    return {
      emoji: "✊👨‍🏫🔥",
      title: "Cố gắng lên nhé! Không được nản chí!",
      desc: "Chưa đạt kết quả như mong muốn nhưng không sao cả! Thất bại hôm nay là bàn đạp cho thành công ngày mai. Hãy đọc kỹ phần giải thích của Thầy và thử sức lại nhé. Thầy Sơn luôn đồng hành cùng em! ❤️"
    };
  };

  if (vocabList.length < 4) {
    return (
      <div className="bg-white rounded-[32px] p-12 text-center border border-natural-border shadow-sm space-y-4">
        <span className="text-5xl">⚠️</span>
        <h4 className="font-black text-natural-deep text-lg">Chưa đủ từ vựng để bắt đầu!</h4>
        <p className="text-natural-muted text-sm max-w-md mx-auto leading-relaxed">
          Cần ít nhất 4 từ vựng trong kho dữ liệu để Thầy Sơn có thể khởi tạo hệ thống câu hỏi trắc nghiệm một cách chính xác nhất. Hãy thêm từ vựng hoặc học thêm nhé!
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

  if (questions.length === 0) {
    return <div className="text-center py-12 text-natural-muted font-bold">Đang khởi tạo bài thi trắc nghiệm...</div>;
  }

  const currentQuestion = questions[currentIdx];

  return (
    <div id="quiz-game-container" className="max-w-xl mx-auto space-y-6">
      
      {/* Quiz Screen Header */}
      <div className="flex items-center justify-between bg-white p-5 rounded-[32px] border border-natural-border shadow-sm">
        <button 
          onClick={onGoBack}
          className="text-natural-muted hover:text-pink-600 text-xs font-bold transition-colors cursor-pointer"
        >
          ← Thoát thi đấu
        </button>
        <span className="font-black text-natural-deep text-sm font-sans tracking-wide">TRẮC NGHIỆM SƠN MÔN</span>
        <span className="text-xs font-bold bg-pink-50 text-pink-600 border border-pink-100 px-3 py-1 rounded-full">
          Câu {currentIdx + 1} / {questions.length}
        </span>
      </div>

      {!gameFinished ? (
        <div className="space-y-6">
          {/* Progress bar */}
          <div className="w-full bg-natural-soft h-2.5 rounded-full overflow-hidden border border-natural-border/30">
            <div 
              className="bg-pink-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentIdx) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question Prompt card */}
          <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-natural-border shadow-sm space-y-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-pink-500" />
            <span className="text-xs bg-pink-50 text-pink-600 border border-pink-100 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
              Thử thách
            </span>
            <h2 className="text-lg sm:text-xl font-black text-natural-deep leading-snug">
              {currentQuestion.prompt}
            </h2>
          </div>

          {/* Options list */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === option;
              const isCorrect = option === currentQuestion.correctAnswer;
              
              let buttonStyle = "bg-white border-natural-border text-natural-text hover:bg-natural-soft hover:border-pink-300";
              let badgeStyle = isSelected ? "bg-pink-600 text-white" : "bg-natural-soft text-natural-text border border-natural-border/60";
              let iconElement = null;

              if (isAnswered) {
                if (isCorrect) {
                  buttonStyle = "bg-emerald-50 border-emerald-400 text-emerald-800 font-bold";
                  badgeStyle = "bg-emerald-600 text-white";
                  iconElement = <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />;
                } else if (isSelected) {
                  buttonStyle = "bg-rose-50 border-rose-400 text-rose-800 font-bold";
                  badgeStyle = "bg-rose-600 text-white";
                  iconElement = <XCircle className="w-5 h-5 text-rose-600 shrink-0" />;
                } else {
                  buttonStyle = "bg-natural-soft/30 border-natural-border/40 text-natural-muted opacity-50";
                  badgeStyle = "bg-natural-soft/60 text-natural-muted border border-natural-border/30";
                }
              } else if (isSelected) {
                buttonStyle = "bg-pink-50 border-pink-400 text-pink-900 font-bold ring-2 ring-pink-500/20";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(option)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 text-sm sm:text-base cursor-pointer ${buttonStyle}`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black uppercase shrink-0 ${badgeStyle}`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </span>
                  {iconElement}
                </button>
              );
            })}
          </div>

          {/* Explanation panel displayed after answering */}
          <AnimatePresence>
            {isAnswered && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#2D241E] text-white rounded-[32px] p-6 border border-[#2D241E] space-y-3 shadow-md"
              >
                <div className="flex items-center gap-2 text-pink-300 text-xs font-bold uppercase tracking-wider">
                  <Smile className="w-4 h-4 text-pink-300 animate-bounce" />
                  <span>Lời Thầy Sơn khuyên dạy:</span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-200">
                  {currentQuestion.explanation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action buttons */}
          <div className="flex justify-end">
            {!isAnswered ? (
              <button
                onClick={handleCheckAnswer}
                disabled={!selectedOption}
                className="px-6 py-3.5 bg-pink-600 hover:bg-pink-700 text-white font-black rounded-2xl text-xs sm:text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed uppercase tracking-wider shadow-sm cursor-pointer"
              >
                Kiểm tra Đáp án ✔️
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-3.5 bg-pink-600 hover:bg-pink-700 text-white font-black rounded-2xl text-xs sm:text-sm transition-all flex items-center gap-2 uppercase tracking-wider shadow-sm cursor-pointer"
              >
                <span>{currentIdx === questions.length - 1 ? "Xem kết quả" : "Câu tiếp theo"}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        // Game Finished / Scoring Screen
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[32px] p-6 sm:p-8 border border-natural-border shadow-sm text-center space-y-6"
        >
          <span className="text-5xl block animate-bounce">{getTeacherVerdict().emoji}</span>
          
          <div className="space-y-1">
            <span className="text-xs bg-pink-50 text-pink-600 border border-pink-100 px-3 py-1 rounded-full font-bold uppercase">
              Kết quả bài thi
            </span>
            <h2 className="text-2xl font-black text-natural-deep mt-2">
              {getTeacherVerdict().title}
            </h2>
          </div>

          {/* Large Scoring metrics */}
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto my-4">
            <div className="bg-natural-soft p-4 rounded-2xl border border-natural-border">
              <span className="block text-xs text-natural-muted font-bold">Chính xác</span>
              <span className="text-3xl font-black text-pink-600">{correctCount} / {questions.length}</span>
            </div>
            <div className="bg-natural-soft p-4 rounded-2xl border border-natural-border">
              <span className="block text-xs text-natural-muted font-bold">Nhận được</span>
              <span className="text-3xl font-black text-pink-500">+{xpEarned} XP</span>
            </div>
          </div>

          {/* Teacher Son detailed text advice */}
          <div className="bg-natural-sand p-5 rounded-2xl border border-natural-border text-left text-xs sm:text-sm text-natural-text leading-relaxed">
            {getTeacherVerdict().desc}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <button
              onClick={generateQuiz}
              className="flex-1 py-3.5 bg-pink-600 hover:bg-pink-700 text-white font-black rounded-2xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 uppercase tracking-wide cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Làm lại bài khác 🔄
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
