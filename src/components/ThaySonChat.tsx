import React, { useState, useRef, useEffect } from "react";
import { ChatMessage, UserProgress } from "../types";
import { playSound } from "../utils/audio";
import { Send, Sparkles, MessageCircle, Volume2, RotateCcw, AlertTriangle, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ThaySonChatProps {
  progress: UserProgress;
  updateProgress: (updated: Partial<UserProgress>) => void;
  onGoBack: () => void;
}

const PRESET_QUESTIONS = [
  { text: "Dịch giúp em câu", query: "Thầy Sơn ơi, dịch giúp em câu này sang tiếng Nhật lịch sự và tự nhiên nhé: 'Hôm nay trời rất đẹp, em muốn rủ bạn đi uống cà phê và ăn mochi.' " },
  { text: "Phân biệt N3", query: "Thầy ơi, phân biệt giúp em cách dùng mẫu ngữ pháp ~ている và ~てある của trình độ N3 nhé! Cho em ví dụ rõ ràng dễ thương nha." },
  { text: "Học qua Anime", query: "Thầy kể tên 5 từ vựng tiếng Nhật độc lạ hay xuất hiện trong Anime Shonen kèm ví dụ câu nói ngầu lòi được không ạ?" },
  { text: "Hội thoại Combini", query: "Thầy đóng vai nhân viên cửa hàng tiện lợi Combini Nhật Bản, em đóng vai người mua hàng. Hãy cùng luyện hội thoại Kaiwa mua sắm thực hành nhé!" }
];

export default function ThaySonChat({ progress, updateProgress, onGoBack }: ThaySonChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Initialize with a welcome message from Teacher Son
  useEffect(() => {
    setMessages([
      {
        id: "welcome_msg",
        role: "assistant",
        content: `Konnichiwa, ${progress.userName}! 🌸 Thầy Sơn rất vui khi được trò chuyện cùng em ở đây!

Thầy là trợ lý học tập AI cá nhân của em. Thầy có thể:
1. Giải thích cặn kẽ mọi ngữ pháp tiếng Nhật (N5 - N3).
2. Dịch câu và gợi ý cách diễn đạt tự nhiên nhất.
3. Chia sẻ nguồn gốc các từ vựng Anime độc lạ mà em thắc mắc.
4. Luyện tập hội thoại Kaiwa thực tế bằng tiếng Nhật!

Em muốn hỏi Thầy điều gì nào? Gõ câu hỏi của em hoặc chọn một gợi ý bên dưới nhé! Ganbatte ne! 💪✨`,
        timestamp: new Date()
      }
    ]);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;
    
    playSound.click();
    setError(null);

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      role: "user",
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage("");
    setLoading(true);

    try {
      // Map message history to correct server payload format
      // Trim to last 6 messages to keep context short and fast
      const recentHistory = messages.slice(-6).map(m => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: recentHistory
        })
      });

      if (!response.ok) {
        throw new Error("Không thể kết nối đến server. Có thể chìa khóa Gemini API chưa được định cấu hình chính xác.");
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      const assistantMsg: ChatMessage = {
        id: `assistant_${Date.now()}`,
        role: "assistant",
        content: data.reply,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMsg]);
      
      // Award XP for talking with the AI teacher!
      updateProgress({ xp: progress.xp + 5 });

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Đã xảy ra lỗi khi kết nối với Thầy Sơn AI. Hãy thử lại sau nhé!");
    } finally {
      setLoading(false);
    }
  };

  const handleSpeakText = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    playSound.click();
    
    if (!("speechSynthesis" in window)) {
      alert("Trình duyệt không hỗ trợ đọc tiếng!");
      return;
    }
    
    // We want to filter out vietnamese explanations when speaking Japanese, or just read the entire response.
    // Reading the whole text is simpler, let's clean it up slightly or read it straight.
    window.speechSynthesis.cancel();
    
    // Check if the text contains Japanese characters to decide language
    const hasJapanese = /[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]/g.test(text);
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = hasJapanese ? "ja-JP" : "vi-VN";
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  const handleClearChat = () => {
    playSound.click();
    if (window.confirm("Em có muốn làm mới cuộc trò chuyện với Thầy Sơn không?")) {
      setMessages([
        {
          id: `welcome_${Date.now()}`,
          role: "assistant",
          content: `Konnichiwa! Cuộc trò chuyện đã được làm mới. Thầy Sơn đã sẵn sàng trả lời các câu hỏi học tập tiếp theo của em rồi đây! 🌸💪`,
          timestamp: new Date()
        }
      ]);
    }
  };

  return (
    <div id="thay-son-chat-container" className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-5xl mx-auto h-[600px]">
      
      {/* Sidebar with presets and quick tips */}
      <div className="lg:col-span-1 bg-white p-6 rounded-[32px] border border-natural-border shadow-sm flex flex-col justify-between space-y-4">
        <div className="space-y-4">
          <div className="space-y-1">
            <button 
              onClick={onGoBack}
              className="text-natural-muted hover:text-pink-600 text-xs font-bold transition-colors cursor-pointer"
            >
              ← Trở về trang chủ
            </button>
            <h3 className="text-lg font-black text-natural-deep flex items-center gap-1.5 mt-1">
              <MessageCircle className="w-5 h-5 text-pink-500" />
              <span>GÓC AI HỎI ĐÁP</span>
            </h3>
          </div>
          
          <hr className="border-natural-border" />
          
          <div className="space-y-3">
            <span className="text-xs font-black text-natural-muted uppercase tracking-wider">Hỏi Thầy nhanh:</span>
            <div className="flex flex-col gap-2">
              {PRESET_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q.query)}
                  disabled={loading}
                  className="text-left px-3 py-2.5 rounded-xl border border-natural-border bg-natural-soft hover:bg-pink-50 hover:border-pink-300 transition-all text-xs font-bold text-natural-text disabled:opacity-50 cursor-pointer"
                >
                  💡 {q.text}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Small tips box */}
        <div className="bg-natural-sand p-4 rounded-2xl border border-natural-border space-y-1.5">
          <span className="text-xs font-bold text-natural-deep flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>Mẹo học tốt:</span>
          </span>
          <p className="text-[11px] text-natural-text leading-relaxed">
            Em có thể yêu cầu Thầy Sơn AI đóng các vai khác nhau (như tiếp viên, người bán vé, bạn thân) để thực hành giao tiếp Kaiwa tự nhiên nhất!
          </p>
        </div>
      </div>

      {/* Main chat interface */}
      <div className="lg:col-span-3 bg-white rounded-[32px] border border-natural-border shadow-sm flex flex-col h-full overflow-hidden">
        
        {/* Chat top bar */}
        <div className="bg-[#2D241E] text-white px-5 py-4 flex items-center justify-between border-b border-[#2D241E]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-pink-400 flex items-center justify-center text-xl">
              👨‍🏫
            </div>
            <div>
              <span className="font-bold text-sm sm:text-base block">Thầy Sơn Trợ Lý Học Tập AI</span>
              <span className="text-[11px] text-pink-300 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                Đang trực tuyến • Sẵn sàng giải đáp
              </span>
            </div>
          </div>

          <button
            onClick={handleClearChat}
            className="text-xs text-natural-sand/80 hover:text-white flex items-center gap-1 border border-white/10 px-2.5 py-1.5 rounded-xl bg-white/5 cursor-pointer transition-colors"
            title="Xóa lịch sử chat"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Làm mới</span>
          </button>
        </div>

        {/* Chat bubbles list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-natural-bg/30 scrollbar-thin">
          <AnimatePresence initial={false}>
            {messages.map((msg) => {
              const isAssistant = msg.role === "assistant";
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 max-w-[85%] ${isAssistant ? "mr-auto" : "ml-auto flex-row-reverse"}`}
                >
                  {/* Bubble icon */}
                  <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-sm shadow-sm ${isAssistant ? "bg-natural-pink border border-pink-300" : "bg-orange-100 border border-natural-border"}`}>
                    {isAssistant ? "👨‍🏫" : "👤"}
                  </div>

                  {/* Bubble body */}
                  <div className="space-y-1">
                    <div 
                      className={`p-4 rounded-2xl text-xs sm:text-sm shadow-sm leading-relaxed whitespace-pre-wrap ${isAssistant ? "bg-white border border-natural-border text-natural-text rounded-tl-none" : "bg-pink-600 text-white rounded-tr-none"}`}
                    >
                      {msg.content}
                    </div>
                    
                    {/* Extra utilities (e.g. read speech out loud for teacher son) */}
                    <div className={`flex items-center gap-2 text-[10px] text-natural-muted ${isAssistant ? "justify-start" : "justify-end"}`}>
                      <span>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {isAssistant && (
                        <button
                          onClick={(e) => handleSpeakText(e, msg.content)}
                          className="hover:text-pink-600 flex items-center gap-0.5 cursor-pointer transition-colors"
                          title="Đọc nội dung này"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Nghe đọc</span>
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Typing indicator */}
          {loading && (
            <div className="flex gap-3 mr-auto max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-natural-pink border border-pink-300 flex items-center justify-center text-sm shadow-sm">
                👨‍🏫
              </div>
              <div className="bg-white border border-natural-border p-4 rounded-2xl rounded-tl-none text-xs text-natural-muted shadow-sm flex items-center gap-1.5">
                <span>Thầy Sơn đang viết lời giải thích</span>
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce delay-0" />
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce delay-150" />
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce delay-300" />
                </span>
              </div>
            </div>
          )}

          {/* Error notice */}
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-2xl flex items-start gap-3 max-w-md mx-auto">
              <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-xs block">Lỗi kết nối</span>
                <p className="text-xs leading-relaxed">{error}</p>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Chat input form */}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputMessage); }}
          className="border-t border-natural-border p-4 flex gap-2 items-center bg-white"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Hỏi Thầy Sơn điều gì đó... (Ví dụ: 'Sensei nghĩa là gì?')"
            disabled={loading}
            className="flex-1 bg-natural-soft border border-natural-border rounded-2xl px-4 py-3 text-xs sm:text-sm text-natural-text focus:outline-none focus:ring-2 focus:ring-pink-400 disabled:opacity-50"
          />
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
  );
}
