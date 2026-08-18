import React, { useState, useEffect } from "react";
import { UserProgress, Vocabulary } from "../types";
import { playSound } from "../utils/audio";
import { calculateDetailedUserStats } from "../utils/stats";
import { Award, Flame, Star, BookOpen, User, Sparkles, CheckCircle, Gamepad2, Compass, Upload, Camera } from "lucide-react";
import { motion } from "motion/react";

interface DashboardProps {
  progress: UserProgress;
  vocabList: Vocabulary[];
  updateProgress: (updated: Partial<UserProgress>) => void;
  onNavigate: (tab: string, level?: "N5" | "N4" | "N3" | "Anime" | "Travel") => void;
}

const MOTIVATIONAL_QUOTES = [
  { jp: "継続は力なり！", romaji: "Keizoku wa chikara nari!", vi: "Kiên trì chính là sức mạnh! Thầy tin em làm được! 💪" },
  { jp: "一歩一歩、進もう！", romaji: "Ippo ippo, susumou!", vi: "Hãy tiến lên từng bước một nhé! Ganbatte! 🌸" },
  { jp: "失敗は成功の基！", romaji: "Shippai wa seikou no moto!", vi: "Thất bại là mẹ của thành công! Không việc gì phải sợ sai nhé học trò! 🌟" },
  { jp: "習うより慣れよ！", romaji: "Narau yori nare yo!", vi: "Trăm hay không bằng tay quen! Hãy luyện tập hàng ngày cùng Thầy nhé! 🎉" }
];

const AVATAR_OPTIONS = [
  { id: "hero", name: "Shonen Hero", emoji: "🥷", color: "from-amber-400 to-red-500", border: "border-amber-400", bg: "bg-amber-50" },
  { id: "sakura", name: "Sakura Princess", emoji: "🌸", color: "from-pink-400 to-rose-600", border: "border-pink-400", bg: "bg-pink-50" },
  { id: "megane", name: "Megane Student", emoji: "👓", color: "from-blue-400 to-indigo-600", border: "border-blue-400", bg: "bg-blue-50" },
  { id: "neko", name: "Gamer Neko", emoji: "🐱", color: "from-emerald-400 to-teal-600", border: "border-emerald-400", bg: "bg-emerald-50" },
  { id: "sensei_fan", name: "Chibi Otaku", emoji: "🦊", color: "from-purple-400 to-fuchsia-600", border: "border-purple-400", bg: "bg-purple-50" }
];

export default function Dashboard({ progress, vocabList, updateProgress, onNavigate }: DashboardProps) {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [showLogoSelector, setShowLogoSelector] = useState(false);
  const [logoInputUrl, setLogoInputUrl] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState(progress.userName);

  // Load real state from local storage for accurate dashboard stats
  const [stats, setStats] = useState({
    // Grammar N5, N4, N3
    grammarN5Learned: 0,
    grammarN4Learned: 0,
    grammarN3Learned: 0,
    grammarN5Total: 110,
    grammarN4Total: 59,
    grammarN3Total: 124,

    // Kanji N5, N4, N3
    kanjiN5Learned: 0,
    kanjiN4Learned: 0,
    kanjiN3Learned: 0,
    kanjiN5Total: 50,
    kanjiN4Total: 203,
    kanjiN3Total: 334,

    // Vocab N5, N4, N3
    vocabN5Learned: 0,
    vocabN4Learned: 0,
    vocabN3Learned: 0,
    vocabN5Total: 953,
    vocabN4Total: 586,
    vocabN3Total: 897,
  });

  const calculateStats = () => {
    const detailed = calculateDetailedUserStats(progress, vocabList);
    setStats(prev => ({
      ...prev,
      grammarN5Learned: detailed.grammarN5,
      grammarN4Learned: detailed.grammarN4,
      grammarN3Learned: detailed.grammarN3,
      kanjiN5Learned: detailed.kanjiN5,
      kanjiN4Learned: detailed.kanjiN4,
      kanjiN3Learned: detailed.kanjiN3,
      vocabN5Learned: detailed.vocabN5,
      vocabN4Learned: detailed.vocabN4,
      vocabN3Learned: detailed.vocabN3
    }));
  };

  useEffect(() => {
    calculateStats();

    const handleStorageChange = () => {
      calculateStats();
    };

    window.addEventListener("local-storage-changed" as any, handleStorageChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("local-storage-changed" as any, handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [progress, vocabList]);

  useEffect(() => {
    // Pick a daily motivational quote
    const day = new Date().getDate();
    setQuoteIndex(day % MOTIVATIONAL_QUOTES.length);

    // Load custom logo url if saved
    const savedLogo = localStorage.getItem("duy_son_custom_logo_url");
    if (savedLogo) {
      setLogoInputUrl(savedLogo);
    }
  }, []);

  const handleSaveLogo = () => {
    playSound.click();
    let finalUrl = logoInputUrl.trim();
    if (finalUrl) {
      // Automatic conversion of Google Drive share links to high-performance direct web view links
      if (finalUrl.includes("drive.google.com")) {
        let fileId = "";
        const dMatch = finalUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
        if (dMatch && dMatch[1]) {
          fileId = dMatch[1];
        } else {
          const idMatch = finalUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
          if (idMatch && idMatch[1]) {
            fileId = idMatch[1];
          }
        }
        if (fileId) {
          finalUrl = `https://lh3.googleusercontent.com/d/${fileId}`;
          setLogoInputUrl(finalUrl);
        }
      }
      localStorage.setItem("duy_son_custom_logo_url", finalUrl);
      window.dispatchEvent(new CustomEvent("local-storage-changed", { detail: { key: "duy_son_custom_logo_url", value: finalUrl } }));
    } else {
      localStorage.removeItem("duy_son_custom_logo_url");
      window.dispatchEvent(new CustomEvent("local-storage-changed", { detail: { key: "duy_son_custom_logo_url", value: null } }));
    }
    setShowLogoSelector(false);
    playSound.achievement();
  };

  const selectedAvatar = AVATAR_OPTIONS.find(a => a.id === progress.selectedAvatarId) || AVATAR_OPTIONS[0];

  const handleSaveName = () => {
    playSound.click();
    updateProgress({ userName: tempName || "Học trò bí ẩn" });
    setEditingName(false);
  };

  const handleSelectAvatar = (avatarId: string) => {
    playSound.click();
    updateProgress({ selectedAvatarId: avatarId, customAvatarUrl: "" });
    setShowAvatarSelector(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Limit to 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert("Kích thước ảnh quá lớn! Em hãy chọn ảnh nhỏ hơn 5MB nhé.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      if (base64String) {
        // Compress/resize image to ensure fast loading & avoid hitting Firestore 1MB document limit
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_SIZE = 400; // max width/height for avatar
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_SIZE) {
              height = Math.round((height * MAX_SIZE) / width);
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width = Math.round((width * MAX_SIZE) / height);
              height = MAX_SIZE;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressedBase64 = canvas.toDataURL("image/jpeg", 0.85);
            playSound.achievement();
            updateProgress({ customAvatarUrl: compressedBase64 });
            setShowAvatarSelector(false);
          } else {
            playSound.achievement();
            updateProgress({ customAvatarUrl: base64String });
            setShowAvatarSelector(false);
          }
        };
        img.onerror = () => {
          playSound.achievement();
          updateProgress({ customAvatarUrl: base64String });
          setShowAvatarSelector(false);
        };
        img.src = base64String;
      }
    };
    reader.readAsDataURL(file);
  };

  const getLearnedCountByLevel = (level: string) => {
    const levelVocab = vocabList.filter(v => v.level === level);
    if (levelVocab.length === 0) return 0;
    const learned = levelVocab.filter(v => progress.learnedWordIds.includes(v.id));
    return Math.round((learned.length / levelVocab.length) * 100);
  };

  const currentLevelLabel = () => {
    if (progress.xp < 100) return "Sơ cấp Nhập môn 🔰";
    if (progress.xp < 300) return "Chiến binh Hiragana ⚔️";
    if (progress.xp < 700) return "Thợ săn Kanji 🔍";
    if (progress.xp < 1500) return "Cao thủ Giao tiếp 💬";
    return "Nhà Thông Thái Sơn Môn 👑";
  };

  return (
    <div id="dashboard-container" className="space-y-8">
      {/* 1. Student Profile Card (HỒ SƠ HỌC TRÒ) */}
      <div id="student-profile-section" className="bg-white rounded-[32px] p-6 sm:p-8 border border-natural-border shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-sm text-natural-deep flex items-center gap-2">
            <User className="w-5 h-5 text-pink-500" />
            <span>HỒ SƠ HỌC TRÒ</span>
          </h3>
          <button 
            onClick={() => { playSound.click(); setShowAvatarSelector(!showAvatarSelector); }}
            className="text-pink-600 hover:text-pink-700 text-xs font-bold"
          >
            Đổi đại diện
          </button>
        </div>

        <div className="flex items-center gap-4">
          {/* User Avatar Representation */}
          <div className="w-12 h-12 bg-natural-pink rounded-full border-2 border-white shadow-md overflow-hidden flex items-center justify-center text-xl bg-orange-100 shrink-0">
            {progress.customAvatarUrl ? (
              <img 
                src={progress.customAvatarUrl} 
                alt="Avatar" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              selectedAvatar.emoji
            )}
          </div>

          <div className="flex-1 space-y-1">
            {editingName ? (
              <div className="flex gap-2 max-w-xs">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="border border-natural-border rounded-xl px-2 py-1 text-sm w-full bg-natural-soft text-natural-text focus:outline-none focus:ring-2 focus:ring-pink-400"
                  maxLength={15}
                />
                <button 
                  onClick={handleSaveName}
                  className="bg-pink-600 hover:bg-pink-700 text-white px-3 py-1 rounded-xl text-xs font-bold shrink-0"
                >
                  Lưu
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="font-black text-natural-deep text-lg leading-none">{progress.userName}</span>
                <button 
                  onClick={() => { playSound.click(); setEditingName(true); }}
                  className="text-natural-muted hover:text-pink-600 text-xs"
                >
                  ✏️
                </button>
              </div>
            )}
            <div className="text-pink-600 text-[10px] uppercase font-bold bg-pink-50 inline-block px-2 py-0.5 rounded-full border border-pink-100">
              {currentLevelLabel()}
            </div>
          </div>
        </div>

        {/* Avatar selection list */}
        {showAvatarSelector && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-natural-soft rounded-2xl p-4 border border-natural-border space-y-4"
          >
            <div>
              <p className="text-xs font-bold text-natural-muted mb-2">Chọn nhân vật sẵn có:</p>
              <div className="grid grid-cols-5 gap-2 max-w-sm">
                {AVATAR_OPTIONS.map((av) => (
                  <button
                    key={av.id}
                    onClick={() => handleSelectAvatar(av.id)}
                    title={av.name}
                    className={`h-11 rounded-xl flex items-center justify-center text-2xl transition-all border ${(!progress.customAvatarUrl && progress.selectedAvatarId === av.id) ? "bg-pink-50 border-pink-300 scale-110 shadow-sm" : "bg-white border-natural-border hover:scale-105"}`}
                  >
                    {av.emoji}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-natural-border/60 pt-3">
              <p className="text-xs font-bold text-natural-muted mb-2">Hoặc tự tải ảnh lên từ máy tính:</p>
              <div className="flex flex-wrap gap-2">
                <label className="flex items-center gap-2 bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-600 px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition-all active:scale-95">
                  <Upload className="w-4 h-4" />
                  <span>Tải ảnh từ thiết bị</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    className="hidden" 
                  />
                </label>

                {progress.customAvatarUrl && (
                  <button
                    onClick={() => {
                      playSound.click();
                      updateProgress({ customAvatarUrl: "" });
                      setShowAvatarSelector(false);
                    }}
                    className="bg-neutral-100 hover:bg-neutral-200 text-neutral-600 border border-neutral-300 px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95"
                  >
                    Xóa ảnh tự tải
                  </button>
                )}
              </div>
              <p className="text-[10px] text-natural-muted mt-2">Chấp nhận định dạng ảnh (JPG, PNG...), tối đa 5MB.</p>
            </div>
          </motion.div>
        )}

        {/* Custom Logo URL selector */}
        {showLogoSelector && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-natural-soft rounded-2xl p-4 border border-natural-border space-y-4"
          >
            <div>
              <p className="text-xs font-bold text-natural-muted mb-2">Đổi Logo Trang Web (Thầy Sơn / Duy Sơn):</p>
              <p className="text-[11px] text-natural-muted mb-3 leading-relaxed">
                Em có thể nhập link hình ảnh trực tiếp (direct link) hoặc link chia sẻ từ Google Drive. Hệ thống sẽ tự động tối ưu hóa để hiển thị tốt nhất!
              </p>
              <div className="flex gap-2 max-w-lg">
                <input
                  type="text"
                  placeholder="Dán link ảnh hoặc link Google Drive vào đây..."
                  value={logoInputUrl}
                  onChange={(e) => setLogoInputUrl(e.target.value)}
                  className="border border-natural-border rounded-xl px-3 py-2 text-xs w-full bg-white text-natural-text focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <button 
                  onClick={handleSaveLogo}
                  className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all active:scale-95 shadow-sm"
                >
                  Lưu Logo
                </button>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => {
                    playSound.click();
                    setLogoInputUrl("");
                    localStorage.removeItem("duy_son_custom_logo_url");
                    window.dispatchEvent(new CustomEvent("local-storage-changed", { detail: { key: "duy_son_custom_logo_url", value: null } }));
                    setShowLogoSelector(false);
                    playSound.achievement();
                  }}
                  className="text-rose-600 hover:text-rose-700 text-[11px] font-bold"
                >
                  Khôi phục Logo SVG Mặc định (Hình Wolf Duy Son)
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* 2. Dashboard Statistics Indicators */}
      <div id="stats-indicators-container" className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Streak Box */}
          <div className="bg-natural-olive text-white rounded-[32px] p-6 shadow-sm flex flex-col justify-between relative overflow-hidden h-36">
            <div className="absolute right-2 bottom-2 text-white/5">
              <Flame className="w-24 h-24 stroke-[1]" />
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-[10px] uppercase tracking-wider opacity-80">Chuỗi học tập</span>
              <span className="text-2xl">🔥</span>
            </div>
            <div className="my-2">
              <span className="text-5xl font-black tracking-tight">{progress.streak}</span>
              <span className="text-lg font-bold ml-1">ngày</span>
            </div>
            <p className="text-[10px] opacity-80 leading-relaxed">
              Duy trì học tập hàng ngày để bồi đắp công lực cùng Thầy Sơn nhé! 💪
            </p>
          </div>

          {/* XP Box */}
          <div className="bg-[#5A5A40] text-white rounded-[32px] p-6 shadow-sm flex flex-col justify-between relative overflow-hidden h-36 opacity-95">
            <div className="absolute right-2 bottom-2 text-white/5">
              <Star className="w-24 h-24 stroke-[1]" />
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-[10px] uppercase tracking-wider opacity-80">Tích lũy kinh nghiệm</span>
              <Award className="w-5 h-5 text-white opacity-80" />
            </div>
            <div className="my-2">
              <span className="text-5xl font-black tracking-tight">{progress.xp}</span>
              <span className="text-lg font-bold ml-1">XP</span>
            </div>
            <p className="text-[10px] opacity-80 leading-relaxed">
              Nhận thêm điểm khi vượt qua các mốc bài tập hoặc ôn flashcards. ⭐
            </p>
          </div>
        </div>

        {/* Detailed Breakdown Section */}
        <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-natural-border shadow-sm space-y-6">
          <div className="border-b border-natural-border pb-4">
            <h4 className="font-black text-sm text-natural-deep uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-pink-600" />
              <span>TIẾN TRÌNH THUỘC BÀI CHI TIẾT (CẢ N5, N4, N3)</span>
            </h4>
            <p className="text-xs text-natural-muted mt-1">Hệ thống hóa kết quả học tập từ vựng, ngữ pháp và Hán tự của em.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Grammar (Ngữ pháp) Progress Card */}
            <div className="bg-neutral-50/50 rounded-2xl p-5 border border-natural-border/70 space-y-4 hover:border-pink-200 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                    <BookOpen className="w-5 h-5" />
                  </span>
                  <div>
                    <h5 className="font-black text-xs text-natural-deep uppercase tracking-wider">Ngữ Pháp Đã Thuộc</h5>
                    <p className="text-[10px] text-natural-muted">Toàn bộ giáo trình</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-indigo-700">
                    {stats.grammarN5Learned + stats.grammarN4Learned + stats.grammarN3Learned}
                  </span>
                  <span className="text-xs font-bold text-natural-muted">
                    /{stats.grammarN5Total + stats.grammarN4Total + stats.grammarN3Total}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="w-full bg-natural-border/40 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-indigo-600 h-full rounded-full transition-all duration-500" 
                    style={{ 
                      width: `${Math.min(100, Math.round(((stats.grammarN5Learned + stats.grammarN4Learned + stats.grammarN3Learned) / (stats.grammarN5Total + stats.grammarN4Total + stats.grammarN3Total)) * 100))}%` 
                    }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-indigo-600 font-extrabold">
                  <span>Hoàn thành</span>
                  <span>{Math.round(((stats.grammarN5Learned + stats.grammarN4Learned + stats.grammarN3Learned) / (stats.grammarN5Total + stats.grammarN4Total + stats.grammarN3Total)) * 100) || 0}%</span>
                </div>
              </div>

              {/* Breakdown List */}
              <div className="pt-2 border-t border-dashed border-natural-border/70 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-natural-text">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                    Cấp độ N5
                  </span>
                  <span className="font-mono text-natural-deep font-bold">
                    {stats.grammarN5Learned}<span className="text-natural-muted">/{stats.grammarN5Total}</span>
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold text-natural-text">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                    Cấp độ N4
                  </span>
                  <span className="font-mono text-natural-deep font-bold">
                    {stats.grammarN4Learned}<span className="text-natural-muted">/{stats.grammarN4Total}</span>
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold text-natural-text">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                    Cấp độ N3
                  </span>
                  <span className="font-mono text-natural-deep font-bold">
                    {stats.grammarN3Learned}<span className="text-natural-muted">/{stats.grammarN3Total}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Kanji (Hán tự) Progress Card */}
            <div className="bg-neutral-50/50 rounded-2xl p-5 border border-natural-border/70 space-y-4 hover:border-pink-200 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                    <Award className="w-5 h-5" />
                  </span>
                  <div>
                    <h5 className="font-black text-xs text-natural-deep uppercase tracking-wider">Hán Tự Đã Thuộc</h5>
                    <p className="text-[10px] text-natural-muted">Toàn bộ giáo trình</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-amber-700">
                    {stats.kanjiN5Learned + stats.kanjiN4Learned + stats.kanjiN3Learned}
                  </span>
                  <span className="text-xs font-bold text-natural-muted">
                    /{stats.kanjiN5Total + stats.kanjiN4Total + stats.kanjiN3Total}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="w-full bg-natural-border/40 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-amber-500 h-full rounded-full transition-all duration-500" 
                    style={{ 
                      width: `${Math.min(100, Math.round(((stats.kanjiN5Learned + stats.kanjiN4Learned + stats.kanjiN3Learned) / (stats.kanjiN5Total + stats.kanjiN4Total + stats.kanjiN3Total)) * 100))}%` 
                    }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-amber-600 font-extrabold">
                  <span>Hoàn thành</span>
                  <span>{Math.round(((stats.kanjiN5Learned + stats.kanjiN4Learned + stats.kanjiN3Learned) / (stats.kanjiN5Total + stats.kanjiN4Total + stats.kanjiN3Total)) * 100) || 0}%</span>
                </div>
              </div>

              {/* Breakdown List */}
              <div className="pt-2 border-t border-dashed border-natural-border/70 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-natural-text">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                    Cấp độ N5
                  </span>
                  <span className="font-mono text-natural-deep font-bold">
                    {stats.kanjiN5Learned}<span className="text-natural-muted">/{stats.kanjiN5Total}</span>
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold text-natural-text">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                    Cấp độ N4
                  </span>
                  <span className="font-mono text-natural-deep font-bold">
                    {stats.kanjiN4Learned}<span className="text-natural-muted">/{stats.kanjiN4Total}</span>
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold text-natural-text">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full"></span>
                    Cấp độ N3
                  </span>
                  <span className="font-mono text-natural-deep font-bold">
                    {stats.kanjiN3Learned}<span className="text-natural-muted">/{stats.kanjiN3Total}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Vocabulary (Từ vựng) Progress Card */}
            <div className="bg-neutral-50/50 rounded-2xl p-5 border border-natural-border/70 space-y-4 hover:border-pink-200 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-2 bg-pink-50 text-pink-600 rounded-xl">
                    <Award className="w-5 h-5 text-pink-600" />
                  </span>
                  <div>
                    <h5 className="font-black text-xs text-natural-deep uppercase tracking-wider">Từ Vựng Đã Thuộc</h5>
                    <p className="text-[10px] text-natural-muted">Toàn bộ giáo trình</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-pink-700">
                    {stats.vocabN5Learned + stats.vocabN4Learned + stats.vocabN3Learned}
                  </span>
                  <span className="text-xs font-bold text-natural-muted">
                    /{stats.vocabN5Total + stats.vocabN4Total + stats.vocabN3Total}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="w-full bg-natural-border/40 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-pink-500 h-full rounded-full transition-all duration-500" 
                    style={{ 
                      width: `${Math.min(100, Math.round(((stats.vocabN5Learned + stats.vocabN4Learned + stats.vocabN3Learned) / (stats.vocabN5Total + stats.vocabN4Total + stats.vocabN3Total)) * 100))}%` 
                    }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-pink-600 font-extrabold">
                  <span>Hoàn thành</span>
                  <span>{Math.round(((stats.vocabN5Learned + stats.vocabN4Learned + stats.vocabN3Learned) / (stats.vocabN5Total + stats.vocabN4Total + stats.vocabN3Total)) * 100) || 0}%</span>
                </div>
              </div>

              {/* Breakdown List */}
              <div className="pt-2 border-t border-dashed border-natural-border/70 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-natural-text">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
                    Cấp độ N5
                  </span>
                  <span className="font-mono text-natural-deep font-bold">
                    {stats.vocabN5Learned}<span className="text-natural-muted">/{stats.vocabN5Total}</span>
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold text-natural-text">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-pink-500 rounded-full"></span>
                    Cấp độ N4
                  </span>
                  <span className="font-mono text-natural-deep font-bold">
                    {stats.vocabN4Learned}<span className="text-natural-muted">/{stats.vocabN4Total}</span>
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold text-natural-text">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-pink-600 rounded-full"></span>
                    Cấp độ N3
                  </span>
                  <span className="font-mono text-natural-deep font-bold">
                    {stats.vocabN3Learned}<span className="text-natural-muted">/{stats.vocabN3Total}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Welcome banner with Teacher Son Greeting */}
      <div 
        id="teacher-greeting-banner"
        className="relative overflow-hidden bg-[#FDF8F3] rounded-[40px] p-6 sm:p-8 border border-natural-border shadow-sm"
      >
        {/* Abstract design elements to invoke Academy style */}
        <div className="absolute top-0 right-0 p-8 select-none pointer-events-none">
           <span className="text-7xl opacity-5 grayscale">🏮</span>
        </div>
        
        <div className="relative flex flex-col md:flex-row items-center gap-6 z-10">
          {/* Custom Stylized Avatar for Thầy Sơn (User's high-fidelity custom vector portrait) */}
          <div className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-[24px] border-2 border-white shadow-md bg-zinc-900 overflow-hidden group">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transform group-hover:scale-110 transition-transform duration-300">
              <rect width="200" height="200" fill="#1A0000"/>
              <circle cx="100" cy="100" r="90" fill="#8B0000"/>
              <path d="M 20,200 Q 100,120 180,200" fill="#111"/>
              <path d="M 50,200 L 100,150 L 150,200" fill="#222"/>
              <path d="M 70,200 L 100,165 L 130,200" fill="#600000"/>
              <path d="M 65,70 Q 30,20 60,10 Q 75,30 80,50 Z" fill="#D4C4A8"/>
              <path d="M 135,70 Q 170,20 140,10 Q 125,30 120,50 Z" fill="#D4C4A8"/>
              <polygon points="100,170 45,120 55,60 145,60 155,120" fill="#B30000"/>
              <polygon points="100,170 45,120 100,140" fill="#800000"/>
              <polygon points="100,140 155,120 100,170" fill="#990000"/>
              <path d="M 40,80 Q 70,60 95,90 L 85,95 Q 65,75 45,90 Z" fill="#111"/>
              <path d="M 160,80 Q 130,60 105,90 L 115,95 Q 135,75 155,90 Z" fill="#111"/>
              <polygon points="55,95 85,105 75,90" fill="#FFCC00"/>
              <polygon points="145,95 115,105 125,90" fill="#FFCC00"/>
              <circle cx="75" cy="98" r="3" fill="#000"/>
              <circle cx="125" cy="98" r="3" fill="#000"/>
              <polygon points="100,130 90,115 110,115" fill="#111"/>
              <path d="M 60,135 Q 100,165 140,125" fill="none" stroke="#111" strokeWidth="4" strokeLinecap="round"/>
              <polygon points="70,140 75,120 82,146" fill="#FFF"/>
              <polygon points="130,130 125,110 118,138" fill="#FFF"/>
              <text x="100" y="70" fontFamily="'Noto Sans JP', sans-serif" fontSize="20" fill="#FFCC00" textAnchor="middle" fontWeight="bold">山</text>
            </svg>
            <div className="absolute -bottom-1 left-0 right-0 bg-[#8B0000] text-white text-[8px] sm:text-[9px] py-0.5 text-center font-black tracking-wider shadow-sm uppercase">
              TÔN SƯ
            </div>
          </div>

          {/* Greeting Speech Bubble */}
          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="inline-flex items-center gap-1 bg-pink-100 text-pink-600 rounded-full text-[10px] font-bold tracking-widest px-3 py-1">
              <Sparkles className="w-3 h-3 text-pink-500 animate-pulse" />
              <span>TỪ VỰNG & HỌC VỰNG HÔM NAY</span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-black text-natural-deep font-sans tracking-tight">
              Chào {progress.userName}, hôm nay hãy cùng Thầy Sơn tiến bộ nhé! 🌸
            </h2>

            {/* Daily dynamic quote */}
            <div className="bg-white/80 rounded-2xl p-4 border border-natural-border space-y-1 shadow-sm">
              <p className="text-pink-600 font-mono text-sm sm:text-base font-bold">
                {MOTIVATIONAL_QUOTES[quoteIndex].jp} 
                <span className="text-natural-muted font-normal ml-2 font-sans text-xs">[{MOTIVATIONAL_QUOTES[quoteIndex].romaji}]</span>
              </p>
              <p className="text-natural-text text-xs sm:text-sm italic">
                &ldquo;{MOTIVATIONAL_QUOTES[quoteIndex].vi}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Promotion: Góc Luyện Nghe & Shadowing */}
      <div className="bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 text-white rounded-[32px] p-6 sm:p-8 shadow-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left z-10">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-amber-300">
            <span>🎧 Mới Ra Mắt</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight">
            Góc Luyện Nghe Thụ Động & Shadowing AI
          </h3>
          <p className="text-xs sm:text-sm text-pink-100 max-w-xl leading-relaxed">
            Luyện tai nghe Podcast nhạy bén, đọc nhại theo kịch bản Karaoke và tự động tạo bài nghe mới cùng Thầy Sơn AI ở cấp độ N5, N4, N3!
          </p>
        </div>

        <button
          onClick={() => { playSound.click(); onNavigate("listening-shadowing"); }}
          className="shrink-0 px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-black rounded-2xl shadow-lg transition-all transform hover:scale-105 active:scale-95 text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer"
        >
          <span>Vào Luyện Nghe ngay</span>
          <span className="text-base">→</span>
        </button>
      </div>

      {/* NEW: Japanese AI Conversation Feature Banner */}
      <div 
        onClick={() => { playSound.click(); onNavigate("japanese-ai-chat"); }}
        className="bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white rounded-[32px] p-6 sm:p-8 shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group"
      >
        <div className="absolute -right-8 -bottom-8 opacity-10 text-9xl select-none font-black">
          日本語
        </div>

        <div className="space-y-2 text-center md:text-left z-10">
          <span className="bg-white/20 text-white border border-white/30 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-200 animate-spin" />
            <span>TÍNH NĂNG MỚI NỔI BẬT</span>
          </span>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight font-sans">
            Luyện Kaiwa Phản Xạ • Trò Chuyện Bằng Tiếng Nhật Với Nhân Vật AI
          </h3>
          <p className="text-xs sm:text-sm text-pink-50 max-w-2xl leading-relaxed">
            Thực hành phản xạ đàm thoại 100% bằng tiếng Nhật cùng Yuki-chan và Thầy Sơnkuro Sensei. Kèm đọc phát âm tự động & nhận xét sửa lỗi ngữ pháp tức thì!
          </p>
        </div>

        <button 
          className="bg-white text-pink-600 hover:bg-pink-50 font-black text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-md transition-all shrink-0 group-hover:scale-105 cursor-pointer z-10"
        >
          Trò Chuyện Ngay 🌸
        </button>
      </div>

      {/* 4. Demon Teacher Welcome Box & Key Highlights (Integrated from original homepage) */}
      <div id="demon-teacher-highlights" className="space-y-6">
        <div className="bg-white/90 border-l-4 border-rose-600 p-6 rounded-r-[32px] border-y border-r border-natural-border shadow-sm">
          <h3 className="font-sans font-black text-base text-rose-700 mb-2 flex items-center gap-2">
            <span>👹</span> ÁC QUỶ TÔN SƯ GIÁM SÁT
          </h3>
          <p className="text-natural-text text-sm leading-relaxed font-medium">
            Đây là không gian dành cho những ai đang đam mê chinh phục ngôn ngữ xứ sở Mặt trời mọc. Tại đây, chúng tôi không chỉ cung cấp kiến thức từ trình độ Nhập môn đến N3 mà còn xây dựng lộ trình rèn luyện bài bản. Ác Quỷ Tôn Sư sẽ là người giám sát nghiêm ngặt, mưu mô tạo ra các thử thách để ép bạn hệ thống hóa từ vựng, ngữ pháp và Hán tự một cách khoa học nhất.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-[28px] border border-natural-border shadow-sm text-center space-y-3 hover:border-pink-300 transition-all">
            <div className="text-3xl">📚</div>
            <h4 className="font-black text-natural-deep text-sm uppercase tracking-wider">Học Liệu Phong Phú</h4>
            <p className="text-xs text-natural-muted leading-relaxed font-medium">Tổng hợp đầy đủ các tài liệu Hán tự, Ngữ pháp cho từng cấp độ.</p>
          </div>
          <div className="bg-white p-6 rounded-[28px] border border-natural-border shadow-sm text-center space-y-3 hover:border-pink-300 transition-all">
            <div className="text-3xl">📈</div>
            <h4 className="font-black text-natural-deep text-sm uppercase tracking-wider">Theo Dõi Tiến Độ</h4>
            <p className="text-xs text-natural-muted leading-relaxed font-medium">Hệ thống ghi nhận quá trình học tập của bạn qua từng bài học.</p>
          </div>
          <div className="bg-white p-6 rounded-[28px] border border-natural-border shadow-sm text-center space-y-3 hover:border-pink-300 transition-all">
            <div className="text-3xl">👹</div>
            <h4 className="font-black text-natural-deep text-sm uppercase tracking-wider">Giám Sát Khắc Nghiệt</h4>
            <p className="text-xs text-natural-muted leading-relaxed font-medium">Ác Quỷ Tôn Sư luôn đưa ra những cái bẫy mưu mô để rèn luyện tư duy của bạn.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
