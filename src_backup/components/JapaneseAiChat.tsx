import React, { useState, useRef, useEffect } from "react";
import { UserProgress } from "../types";
import { playSound } from "../utils/audio";
import { 
  Send, 
  Sparkles, 
  Volume2, 
  RotateCcw, 
  AlertTriangle, 
  Mic, 
  MicOff, 
  Languages, 
  CheckCircle2, 
  MessageSquareHeart, 
  UserCheck, 
  ArrowLeft,
  Eye,
  EyeOff,
  Key
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import GeminiKeyModal from "./GeminiKeyModal";
import { getGeminiHeaders, getCustomGeminiKey } from "../utils/geminiKey";

interface JapaneseAiChatProps {
  progress: UserProgress;
  updateProgress: (updated: Partial<UserProgress>) => void;
  onGoBack: () => void;
}

interface JapaneseCharacter {
  id: string;
  name: string;
  jpName: string;
  avatar: string;
  role: string;
  desc: string;
  bgGradient: string;
  badgeColor: string;
  welcomeJp: string;
  welcomeRomaji: string;
  welcomeVi: string;
}

const CHARACTERS: JapaneseCharacter[] = [
  {
    id: "yuki",
    name: "Yuki-chan",
    jpName: "ユキちゃん",
    avatar: "🌸",
    role: "Bạn học người Nhật",
    desc: "Cùng lứa tuổi, dễ thương, trò chuyện tự nhiên về cuộc sống hàng ngày & sở thích.",
    bgGradient: "from-pink-500 to-rose-400",
    badgeColor: "bg-pink-100 text-pink-700 border-pink-200",
    welcomeJp: "初めまして！ユキです。一緒に楽しく日本語でおしゃべりしましょう！何でも話してね！",
    welcomeRomaji: "Hajimemashite! Yuki desu. Issho ni tanoshiku nihongo de oshaberi shimashou! Nandemo hanashite ne!",
    welcomeVi: "Rất vui được gặp bạn! Mình là Yuki. Chúng mình hãy cùng trò chuyện bằng tiếng Nhật thật vui vẻ nhé! Bạn muốn nói về chủ đề gì nào?"
  },
  {
    id: "sonkuro",
    name: "Sơnkuro Sensei",
    jpName: "ソンクロ先生",
    avatar: "👨‍🏫",
    role: "Thầy giáo Tiếng Nhật Quỷ Lệ",
    desc: "Nghiêm khắc nhưng tận tụy, luôn chỉnh sửa ngữ pháp chuẩn mực (Desu/Masu/Keigo) khích lệ bạn.",
    bgGradient: "from-amber-600 to-orange-500",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    welcomeJp: "みなさん、こんにちは。ソンクロです。日本語の会話練習を始めましょう。気軽に声をかけてくださいね。",
    welcomeRomaji: "Minasan, konnichiwa. Sonkuro desu. Nihongo no kaiwa renshuu o hajimemashou. Kigal ni koe o kakete kudasai ne.",
    welcomeVi: "Xin chào các em. Thầy là Sơnkuro Sensei đây! Chúng ta hãy bắt đầu luyện tập giao tiếp tiếng Nhật nhé. Hãy cứ tự nhiên trò chuyện cùng thầy!"
  }
];

const SUGGESTED_TOPICS = [
  { jp: "初めまして！自己紹介をします。", vi: "Chào bạn! Tôi xin tự giới thiệu bản thân." },
  { jp: "日本のおすすめの食べ物は何ですか？", vi: "Món ăn Nhật Bản bạn yêu thích nhất là gì?" },
  { jp: "週末は何をして過ごすのが好きですか？", vi: "Cuối tuần bạn thích làm gì nhất?" },
  { jp: "コンビニで人気のお菓子を教えてください。", vi: "Hãy chỉ cho tôi các món bánh kẹo hot ở Combini." },
  { jp: "おすすめのアニメや映画はありますか？", vi: "Bạn có gợi ý bộ Anime hay bộ phim nào hay không?" }
];

interface ChatTurn {
  id: string;
  sender: "user" | "ai";
  textJp?: string;
  textRomaji?: string;
  textVi?: string;
  feedback?: string;
  rawText?: string;
  timestamp: Date;
}

export default function JapaneseAiChat({ progress, updateProgress, onGoBack }: JapaneseAiChatProps) {
  const [selectedCharacter, setSelectedCharacter] = useState<JapaneseCharacter>(CHARACTERS[0]);
  const [selectedLevel, setSelectedLevel] = useState<"N5" | "N4" | "N3" | "Mọi trình độ">("N5");
  
  const [showRomaji, setShowRomaji] = useState(true);
  const [showVi, setShowVi] = useState(true);

  const [messages, setMessages] = useState<ChatTurn[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [isListening, setIsListening] = useState(false);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const speechRecognitionRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Initialize or reset chat when character changes
  useEffect(() => {
    setMessages([
      {
        id: `welcome_${Date.now()}`,
        sender: "ai",
        textJp: selectedCharacter.welcomeJp,
        textRomaji: selectedCharacter.welcomeRomaji,
        textVi: selectedCharacter.welcomeVi,
        timestamp: new Date()
      }
    ]);
  }, [selectedCharacter]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Speech Recognition Setup (Web Speech API)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "ja-JP"; // Japanese recognition

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            setInputMessage(prev => (prev ? prev + " " + transcript : transcript));
          }
          setIsListening(false);
        };

        recognition.onerror = (err: any) => {
          console.warn("Speech recognition error:", err);
          setIsListening(false);
          if (err.error === "not-allowed" || err.error === "service-not-allowed") {
            alert("Trình duyệt chưa được cấp quyền dùng Micro. Hãy bấm Cho Phép (Allow) Micro trên thanh địa chỉ trình duyệt, hoặc mở ứng dụng ở Tab mới để dùng ghi âm nhé!");
          } else if (err.error === "no-speech") {
            // Silence - no audio detected
          }
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        speechRecognitionRef.current = recognition;
      }
    }
  }, []);

  const toggleMic = async () => {
    playSound.click();
    
    if (isListening) {
      if (speechRecognitionRef.current) {
        try { speechRecognitionRef.current.stop(); } catch (e) {}
      }
      setIsListening(false);
      return;
    }

    // First request browser microphone stream to trigger native permission popup if needed
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // Stop stream immediately after permission granted so speech recognition can take over
        stream.getTracks().forEach(track => track.stop());
      } catch (err: any) {
        console.warn("Microphone permission denied:", err);
        alert("Vui lòng BẬT/CHO PHÉP quyền truy cập Micro (Microphone) trên trình duyệt để ghi âm giọng nói tiếng Nhật nhé!");
        return;
      }
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Trình duyệt hiện tại (như Chrome/Edge) hỗ trợ ghi âm tiếng Nhật tốt nhất. Em có thể gõ chữ hoặc chuyển sang Chrome/Edge nhé!");
      return;
    }

    if (!speechRecognitionRef.current) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "ja-JP";

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputMessage(prev => (prev ? prev + " " + transcript : transcript));
        }
        setIsListening(false);
      };

      recognition.onerror = (err: any) => {
        console.warn("Speech recognition error:", err);
        setIsListening(false);
        if (err.error === "not-allowed" || err.error === "service-not-allowed") {
          alert("Trình duyệt bị chặn quyền Micro. Hãy kiểm tra cài đặt Micro trên trình duyệt hoặc mở ứng dụng ở Tab mới!");
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      speechRecognitionRef.current = recognition;
    }

    try {
      setIsListening(true);
      speechRecognitionRef.current.start();
    } catch (e) {
      console.error("Failed to start speech recognition:", e);
      setIsListening(false);
    }
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    playSound.click();
    setError(null);

    const userTurn: ChatTurn = {
      id: `user_${Date.now()}`,
      sender: "user",
      rawText: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userTurn]);
    setInputMessage("");
    setLoading(true);

    try {
      // Recent history for context
      const historyPayload = messages.slice(-6).map(m => {
        if (m.sender === "user") {
          return { role: "user", content: m.rawText || "" };
        } else {
          return { role: "model", content: m.textJp || "" };
        }
      });

      const sendRequest = async () => {
        return await fetch("/api/gemini/japanese-chat", {
          method: "POST",
          headers: getGeminiHeaders(),
          body: JSON.stringify({
            message: textToSend,
            history: historyPayload,
            characterId: selectedCharacter.id,
            level: selectedLevel
          })
        });
      };

      let response = await sendRequest();
      let data = await response.json().catch(() => ({}));

      // Auto retry after 2s if rate limit error
      if (!response.ok && data.error && (data.error.includes("quá nhiều") || data.error.includes("429") || data.error.includes("hạn mức"))) {
        console.warn("Rate limit detected on Japanese chat, auto-retrying in 2 seconds...");
        await new Promise(resolve => setTimeout(resolve, 2000));
        response = await sendRequest();
        data = await response.json().catch(() => ({}));
      }

      if (!response.ok || data.error) {
        throw new Error(data.error || "Không thể kết nối với Nhân vật AI. Vui lòng kiểm tra lại cấu hình Gemini API Key.");
      }

      const aiTurn: ChatTurn = {
        id: `ai_${Date.now()}`,
        sender: "ai",
        textJp: data.reply.japanese,
        textRomaji: data.reply.romaji,
        textVi: data.reply.vietnamese,
        feedback: data.reply.feedback,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiTurn]);
      
      // Award XP for Japanese conversation practice
      updateProgress({ xp: progress.xp + 5 });

      // Play audio automatically or click sound
      playSound.correct();

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Đã xảy ra lỗi khi kết nối với Nhân vật AI Tiếng Nhật.");
    } finally {
      setLoading(false);
    }
  };

  const handleSpeakJapanese = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    playSound.click();

    if (!("speechSynthesis" in window)) {
      alert("Trình duyệt không hỗ trợ đọc phát âm!");
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const handleResetChat = () => {
    playSound.click();
    if (window.confirm(`Em có muốn làm mới cuộc trò chuyện tiếng Nhật với ${selectedCharacter.name} không?`)) {
      setMessages([
        {
          id: `welcome_${Date.now()}`,
          sender: "ai",
          textJp: selectedCharacter.welcomeJp,
          textRomaji: selectedCharacter.welcomeRomaji,
          textVi: selectedCharacter.welcomeVi,
          timestamp: new Date()
        }
      ]);
    }
  };

  return (
    <div id="japanese-ai-chat-root" className="max-w-6xl mx-auto space-y-6">
      
      {/* Top Header Bar */}
      <div className="bg-white rounded-[32px] p-6 border border-natural-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onGoBack}
            className="p-2.5 rounded-2xl bg-natural-soft hover:bg-pink-50 border border-natural-border text-natural-muted hover:text-pink-600 transition-colors cursor-pointer"
            title="Trở về trang trước"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🗾</span>
              <h2 className="text-xl font-black text-natural-deep font-sans">
                LUYỆN TẬP KAIWA VỚI NHÂN VẬT AI
              </h2>
              <span className="bg-pink-100 text-pink-700 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-pink-200">
                100% TIẾNG NHẬT
              </span>
            </div>
            <p className="text-xs text-natural-muted mt-0.5">
              Giao tiếp phản xạ tiếng Nhật tự nhiên mọi lúc mọi nơi cùng các nhân vật AI độc đáo.
            </p>
          </div>
        </div>

        {/* Display options toggle */}
        <div className="flex flex-wrap items-center gap-2 bg-natural-soft p-1.5 rounded-2xl border border-natural-border">
          <button
            onClick={() => setIsKeyModalOpen(true)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              getCustomGeminiKey()
                ? "bg-emerald-500 text-white shadow-sm"
                : "bg-white text-natural-text hover:text-pink-600 shadow-sm border border-natural-border"
            }`}
            title="Cấu hình Gemini API Key cá nhân"
          >
            <Key className="w-3.5 h-3.5" />
            <span>{getCustomGeminiKey() ? "API Key Cá Nhân" : "API Key riêng"}</span>
          </button>

          <button
            onClick={() => { playSound.click(); setShowRomaji(!showRomaji); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${showRomaji ? "bg-white text-pink-600 shadow-sm border border-natural-border" : "text-natural-muted hover:text-natural-text"}`}
          >
            {showRomaji ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>Romaji</span>
          </button>

          <button
            onClick={() => { playSound.click(); setShowVi(!showVi); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${showVi ? "bg-white text-pink-600 shadow-sm border border-natural-border" : "text-natural-muted hover:text-natural-text"}`}
          >
            <Languages className="w-3.5 h-3.5" />
            <span>Dịch Việt</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Sidebar (Characters & Level) + Right Chat Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Character Selection & Level Controls */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Character Selector Card */}
          <div className="bg-white rounded-[32px] p-6 border border-natural-border shadow-sm space-y-4">
            <h3 className="text-xs font-black text-natural-deep uppercase tracking-wider flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-pink-500" />
              <span>CHỌN NHÂN VẬT AI BẠN ĐỒNG HÀNH</span>
            </h3>

            <div className="space-y-2.5">
              {CHARACTERS.map((char) => {
                const isSelected = selectedCharacter.id === char.id;
                return (
                  <button
                    key={char.id}
                    onClick={() => {
                      playSound.click();
                      setSelectedCharacter(char);
                    }}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 relative overflow-hidden ${isSelected ? "bg-pink-50/60 border-pink-400 shadow-sm ring-2 ring-pink-300/50" : "bg-natural-soft/50 border-natural-border hover:bg-white hover:border-pink-200"}`}
                  >
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${char.bgGradient} text-white flex items-center justify-center text-2xl shadow-sm shrink-0`}>
                      {char.avatar}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-bold text-xs sm:text-sm text-natural-deep truncate">
                          {char.name} <span className="text-[11px] font-normal text-natural-muted">({char.jpName})</span>
                        </span>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
                        )}
                      </div>
                      <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-md border mt-0.5 ${char.badgeColor}`}>
                        {char.role}
                      </span>
                      <p className="text-[10px] text-natural-muted line-clamp-1 mt-1">
                        {char.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Japanese Level Filter */}
          <div className="bg-white rounded-[32px] p-6 border border-natural-border shadow-sm space-y-3">
            <span className="text-xs font-black text-natural-deep uppercase tracking-wider block">
              Trình độ tiếng Nhật bạn muốn nói:
            </span>
            <div className="grid grid-cols-2 gap-2">
              {(["N5", "N4", "N3", "Mọi trình độ"] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => { playSound.click(); setSelectedLevel(lvl); }}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${selectedLevel === lvl ? "bg-pink-600 text-white border-pink-600 shadow-sm" : "bg-natural-soft text-natural-text border-natural-border hover:border-pink-300"}`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Topic Starters */}
          <div className="bg-white rounded-[32px] p-6 border border-natural-border shadow-sm space-y-3">
            <span className="text-xs font-black text-natural-deep uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              <span>Gợi ý chủ đề giao tiếp:</span>
            </span>

            <div className="space-y-2">
              {SUGGESTED_TOPICS.map((topic, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(topic.jp)}
                  disabled={loading}
                  className="w-full text-left p-2.5 rounded-xl border border-natural-border bg-natural-soft hover:bg-pink-50 hover:border-pink-300 text-xs text-natural-text transition-all disabled:opacity-50 cursor-pointer space-y-0.5"
                >
                  <p className="font-bold text-natural-deep">{topic.jp}</p>
                  <p className="text-[10px] text-natural-muted">{topic.vi}</p>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: AI Conversation Canvas */}
        <div className="lg:col-span-8 bg-white rounded-[32px] border border-natural-border shadow-sm flex flex-col h-[640px] overflow-hidden">
          
          {/* Active Character Top Bar */}
          <div className={`p-4 sm:p-5 bg-gradient-to-r ${selectedCharacter.bgGradient} text-white flex items-center justify-between shadow-sm`}>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-2xl shadow-inner">
                {selectedCharacter.avatar}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-black text-base leading-none">
                    {selectedCharacter.name} <span className="text-xs font-medium text-white/80">({selectedCharacter.jpName})</span>
                  </h4>
                </div>
                <p className="text-[11px] text-white/90 font-medium mt-1">
                  {selectedCharacter.role} • Trình độ mục tiêu: {selectedLevel}
                </p>
              </div>
            </div>

            <button
              onClick={handleResetChat}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Làm mới cuộc trò chuyện"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Bắt đầu lại</span>
            </button>
          </div>

          {/* Messages List Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-natural-bg/30 scrollbar-thin">
            <AnimatePresence initial={false}>
              {messages.map((turn) => {
                const isAi = turn.sender === "ai";
                return (
                  <motion.div
                    key={turn.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 max-w-[90%] sm:max-w-[85%] ${isAi ? "mr-auto" : "ml-auto flex-row-reverse"}`}
                  >
                    {/* Icon */}
                    <div className={`w-9 h-9 rounded-2xl shrink-0 flex items-center justify-center text-base shadow-sm ${isAi ? `bg-gradient-to-br ${selectedCharacter.bgGradient} text-white` : "bg-orange-100 border border-natural-border"}`}>
                      {isAi ? selectedCharacter.avatar : "👤"}
                    </div>

                    {/* Content Box */}
                    <div className="space-y-2">
                      <div className={`p-4 rounded-2xl shadow-sm space-y-2 ${isAi ? "bg-white border border-natural-border text-natural-text rounded-tl-none" : "bg-pink-600 text-white rounded-tr-none"}`}>
                        
                        {/* User Message */}
                        {!isAi && (
                          <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                            {turn.rawText}
                          </p>
                        )}

                        {/* AI Japanese Message */}
                        {isAi && (
                          <div className="space-y-2">
                            {/* Main Japanese Text */}
                            <div className="flex items-start justify-between gap-2 border-b border-natural-border/60 pb-2">
                              <p className="text-base sm:text-lg font-black text-natural-deep font-sans leading-relaxed tracking-wide">
                                {turn.textJp}
                              </p>
                              <button
                                onClick={(e) => handleSpeakJapanese(e, turn.textJp || "")}
                                className="p-1.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-600 transition-colors shrink-0 cursor-pointer"
                                title="Nghe phát âm tiếng Nhật"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Romaji Option */}
                            {showRomaji && turn.textRomaji && (
                              <p className="text-xs text-pink-700 font-mono font-medium">
                                💬 {turn.textRomaji}
                              </p>
                            )}

                            {/* Vietnamese Translation Option */}
                            {showVi && turn.textVi && (
                              <p className="text-xs text-natural-text/90 italic bg-natural-soft/80 p-2.5 rounded-xl border border-natural-border/60">
                                🇻🇳 {turn.textVi}
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Gentle Feedback Card if available */}
                      {isAi && turn.feedback && turn.feedback.trim() !== "" && (
                        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-2xl text-xs space-y-1 shadow-sm">
                          <span className="font-black flex items-center gap-1 text-amber-900">
                            💡 Mẹo Kaiwa & Sửa lỗi nhỏ từ {selectedCharacter.name}:
                          </span>
                          <p className="leading-relaxed font-medium">{turn.feedback}</p>
                        </div>
                      )}

                      {/* Timestamp */}
                      <span className={`block text-[10px] text-natural-muted ${isAi ? "text-left" : "text-right"}`}>
                        {turn.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Typing Loader */}
            {loading && (
              <div className="flex gap-3 mr-auto max-w-[80%]">
                <div className={`w-9 h-9 rounded-2xl bg-gradient-to-br ${selectedCharacter.bgGradient} text-white flex items-center justify-center text-base shadow-sm`}>
                  {selectedCharacter.avatar}
                </div>
                <div className="bg-white border border-natural-border p-4 rounded-2xl rounded-tl-none text-xs text-natural-muted shadow-sm flex items-center gap-2">
                  <span>{selectedCharacter.name} đang phản hồi bằng tiếng Nhật</span>
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce delay-150" />
                    <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce delay-300" />
                  </span>
                </div>
              </div>
            )}

            {/* Error Notification */}
            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-2xl flex items-start gap-3 max-w-md mx-auto">
                <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <span className="font-bold block">Không thể gửi tin nhắn</span>
                  <p>{error}</p>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Listening Active Banner */}
          {isListening && (
            <div className="bg-rose-50 border-t border-rose-200 px-4 py-2 flex items-center justify-between text-xs text-rose-700 animate-pulse">
              <span className="flex items-center gap-2 font-bold">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                🎙️ Đang lắng nghe giọng nói tiếng Nhật của bạn... hãy nói vào micro!
              </span>
              <button
                type="button"
                onClick={toggleMic}
                className="text-[11px] underline font-bold hover:text-rose-900 cursor-pointer"
              >
                Tắt micro
              </button>
            </div>
          )}

          {/* Bottom Chat Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputMessage);
            }}
            className="p-3 sm:p-4 border-t border-natural-border bg-white flex items-center gap-2"
          >
            {/* Mic voice input button */}
            <button
              type="button"
              onClick={toggleMic}
              className={`p-3 rounded-2xl border transition-all cursor-pointer relative ${isListening ? "bg-rose-500 text-white border-rose-600 animate-pulse shadow-md ring-2 ring-rose-300" : "bg-natural-soft text-natural-muted hover:text-pink-600 border-natural-border"}`}
              title={isListening ? "Đang lắng nghe tiếng Nhật... Bấm để dừng" : "Nói tiếng Nhật bằng Micro"}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Input field */}
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={isListening ? "Đang lắng nghe bạn nói tiếng Nhật..." : `Gõ tiếng Nhật hoặc Romaji để nói chuyện với ${selectedCharacter.name}...`}
              disabled={loading}
              className="flex-1 bg-natural-soft border border-natural-border rounded-2xl px-4 py-3 text-xs sm:text-sm text-natural-text focus:outline-none focus:ring-2 focus:ring-pink-400 disabled:opacity-50"
            />

            {/* Send button */}
            <button
              type="submit"
              disabled={!inputMessage.trim() || loading}
              className="p-3 rounded-2xl bg-pink-600 hover:bg-pink-700 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>

      <GeminiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
      />
    </div>
  );
}
