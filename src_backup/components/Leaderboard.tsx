import React, { useState, useEffect, useRef } from "react";
import { UserProgress } from "../types";
import { playSound } from "../utils/audio";
import { calculateDetailedUserStats } from "../utils/stats";
import { db } from "../lib/firebase";
import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "motion/react";
import { 
  Trophy, 
  Flame, 
  BookOpen, 
  Target, 
  Medal, 
  Crown, 
  Sparkles, 
  RefreshCw, 
  Search, 
  FileText, 
  Layers, 
  ArrowDownCircle,
  PartyPopper,
  Zap,
  Star,
  UserCheck
} from "lucide-react";

export interface LeaderboardEntry {
  uid: string;
  userName: string;
  selectedAvatarId?: string;
  customAvatarUrl?: string;
  xp: number;
  streak: number;
  quizHighScore: number;
  learnedWordsCount: number;   // Từ vựng
  learnedGrammarCount: number; // Ngữ pháp
  learnedKanjiCount: number;   // Hán tự
  totalMasteredCount: number;  // Tổng = Vocab + Grammar + Kanji
  updatedAt?: string;
  isCurrentUser?: boolean;
  badge?: string;
}

interface LeaderboardProps {
  progress: UserProgress;
  currentUser: any;
  onRefreshProgress?: () => void;
}

export type CategoryTab = "total" | "vocab" | "grammar" | "kanji";

// Leaderboard entries are fetched directly from real users registered in Firestore
const SAMPLE_STUDENTS: LeaderboardEntry[] = [];

export default function Leaderboard({ progress, currentUser }: LeaderboardProps) {
  const [activeTab, setActiveTab] = useState<CategoryTab>("total");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSyncingSelf, setIsSyncingSelf] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const myRowRef = useRef<HTMLDivElement | null>(null);

  // Trigger grand victory confetti
  const triggerVictoryConfetti = () => {
    playSound.achievement();
    // Center cannon
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#f59e0b", "#ef4444", "#10b981", "#3b82f6", "#8b5cf6"]
    });

    // Side cannons
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 }
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 }
      });
    }, 250);
  };

  // Calculate current user's detailed counts from local storage & progress state
  const getLocalDetailedCounts = () => {
    return calculateDetailedUserStats(progress);
  };

  const localCounts = getLocalDetailedCounts();

  // Sync current user's progress to Firestore leaderboard
  const syncMyLeaderboardEntry = async () => {
    if (!currentUser) return;
    setIsSyncingSelf(true);
    try {
      const myEntry: LeaderboardEntry = {
        uid: currentUser.uid,
        userName: currentUser.displayName || progress.userName || "Học trò ngoan",
        selectedAvatarId: progress.selectedAvatarId || "hero",
        customAvatarUrl: progress.customAvatarUrl || currentUser.photoURL || "",
        xp: progress.xp || 0,
        streak: progress.streak || 1,
        quizHighScore: progress.quizHighScore || 0,
        learnedWordsCount: localCounts.vocab,
        learnedGrammarCount: localCounts.grammar,
        learnedKanjiCount: localCounts.kanji,
        totalMasteredCount: localCounts.total,
        updatedAt: new Date().toISOString()
      };

      await setDoc(doc(db, "leaderboard", currentUser.uid), myEntry);
      fetchLeaderboard();
    } catch (err) {
      console.error("Lỗi đồng bộ Bảng Vàng:", err);
    } finally {
      setIsSyncingSelf(false);
    }
  };

  // Fetch Firestore leaderboard & users collections & blend with samples
  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const userMap = new Map<string, LeaderboardEntry>();

      // 1. Fetch from "leaderboard" collection
      try {
        const lbSnap = await getDocs(collection(db, "leaderboard"));
        lbSnap.forEach(docSnap => {
          const data = docSnap.data() as LeaderboardEntry;
          const vocab = data.learnedWordsCount || 0;
          const grammar = data.learnedGrammarCount || 0;
          const kanji = data.learnedKanjiCount || 0;
          const total = data.totalMasteredCount || (vocab + grammar + kanji);

          userMap.set(docSnap.id, {
            ...data,
            uid: docSnap.id,
            learnedWordsCount: vocab,
            learnedGrammarCount: grammar,
            learnedKanjiCount: kanji,
            totalMasteredCount: total
          });
        });
      } catch (err) {
        console.warn("Could not fetch leaderboard collection:", err);
      }

      // 2. Fetch from "users" collection and calculate exact stats from their sync storage
      try {
        const usersSnap = await getDocs(collection(db, "users"));
        const userPromises: Promise<void>[] = [];

        usersSnap.forEach(docSnap => {
          const uData = docSnap.data();
          const uid = docSnap.id;
          const existing = userMap.get(uid);

          // Fetch user's sync storage to compute exact learned vocab/grammar/kanji
          const syncPromise = getDoc(doc(db, "users/" + uid + "/sync/storage")).then(syncSnap => {
            let syncData: Record<string, string> = {};
            if (syncSnap.exists() && syncSnap.data()?.data) {
              syncData = syncSnap.data().data;
            }

            // Calculate precise counts matching Dashboard logic
            const detailedStats = calculateDetailedUserStats(uData as any, undefined, key => syncData[key] || null);

            const v = Math.max(detailedStats.vocab, existing?.learnedWordsCount || 0, (uData as any)?.learnedWordsCount || 0);
            const g = Math.max(detailedStats.grammar, existing?.learnedGrammarCount || 0, (uData as any)?.learnedGrammarCount || 0);
            const k = Math.max(detailedStats.kanji, existing?.learnedKanjiCount || 0, (uData as any)?.learnedKanjiCount || 0);
            const tot = Math.max(v + g + k, existing?.totalMasteredCount || 0, (uData as any)?.totalMasteredCount || 0);

            const entryFromUserDoc: LeaderboardEntry = {
              uid,
              userName: uData.userName || uData.displayName || existing?.userName || "Học viên",
              selectedAvatarId: uData.selectedAvatarId || existing?.selectedAvatarId || "hero",
              customAvatarUrl: uData.customAvatarUrl || existing?.customAvatarUrl || "",
              xp: Math.max(uData.xp || 0, existing?.xp || 0),
              streak: Math.max(uData.streak || 0, existing?.streak || 0),
              quizHighScore: Math.max(uData.quizHighScore || 0, existing?.quizHighScore || 0),
              learnedWordsCount: v,
              learnedGrammarCount: g,
              learnedKanjiCount: k,
              totalMasteredCount: tot,
              updatedAt: uData.updatedAt || existing?.updatedAt || new Date().toISOString()
            };

            userMap.set(uid, entryFromUserDoc);

            // Sync updated non-zero entry to leaderboard collection for fast retrieval
            if (tot > 0) {
              setDoc(doc(db, "leaderboard", uid), entryFromUserDoc).catch(() => {});
            }
          }).catch(err => {
            console.warn("Could not fetch storage sync for user " + uid, err);
            const uVocab = Array.isArray(uData.learnedWordIds) ? uData.learnedWordIds.length : ((uData as any)?.learnedWordsCount || 0);
            const v = Math.max(uVocab, existing?.learnedWordsCount || 0);
            const g = Math.max((uData as any)?.learnedGrammarCount || 0, existing?.learnedGrammarCount || 0);
            const k = Math.max((uData as any)?.learnedKanjiCount || 0, existing?.learnedKanjiCount || 0);
            const tot = Math.max(v + g + k, existing?.totalMasteredCount || 0);

            const fallbackEntry: LeaderboardEntry = {
              uid,
              userName: uData.userName || uData.displayName || existing?.userName || "Học viên",
              selectedAvatarId: uData.selectedAvatarId || existing?.selectedAvatarId || "hero",
              customAvatarUrl: uData.customAvatarUrl || existing?.customAvatarUrl || "",
              xp: Math.max(uData.xp || 0, existing?.xp || 0),
              streak: Math.max(uData.streak || 0, existing?.streak || 0),
              quizHighScore: Math.max(uData.quizHighScore || 0, existing?.quizHighScore || 0),
              learnedWordsCount: v,
              learnedGrammarCount: g,
              learnedKanjiCount: k,
              totalMasteredCount: tot,
              updatedAt: uData.updatedAt || existing?.updatedAt || new Date().toISOString()
            };
            userMap.set(uid, fallbackEntry);
          });

          userPromises.push(syncPromise);
        });

        await Promise.all(userPromises);
      } catch (err) {
        console.warn("Could not fetch users collection:", err);
      }

      // Include current user entry - always use exact local stats matching Dashboard
      const myUid = currentUser ? currentUser.uid : "current-local-user";
      const myCurrentEntry: LeaderboardEntry = {
        uid: myUid,
        userName: (currentUser?.displayName || progress.userName || "Bạn (Tôi)").trim(),
        selectedAvatarId: progress.selectedAvatarId || "hero",
        customAvatarUrl: progress.customAvatarUrl || currentUser?.photoURL || "",
        xp: progress.xp || 0,
        streak: progress.streak || 1,
        quizHighScore: progress.quizHighScore || 0,
        learnedWordsCount: localCounts.vocab,
        learnedGrammarCount: localCounts.grammar,
        learnedKanjiCount: localCounts.kanji,
        totalMasteredCount: localCounts.total,
        isCurrentUser: true,
        badge: "✨ Bạn (Đang học)"
      };

      // Set current user's entry with exact local stats (100% synchronized with Dashboard cards)
      userMap.set(myUid, myCurrentEntry);

      // Include sample students if not present
      SAMPLE_STUDENTS.forEach(sample => {
        if (!userMap.has(sample.uid) && sample.userName !== myCurrentEntry.userName) {
          userMap.set(sample.uid, sample);
        }
      });

      const allEntries = Array.from(userMap.values()).map(e => {
        if (e.uid === myUid) {
          return { ...e, isCurrentUser: true };
        }
        return e;
      });

      setLeaderboardData(allEntries);

      // Auto sync current logged in user to Firestore
      if (currentUser) {
        const selfData = userMap.get(currentUser.uid);
        if (selfData) {
          setDoc(doc(db, "leaderboard", currentUser.uid), {
            uid: currentUser.uid,
            userName: selfData.userName,
            selectedAvatarId: selfData.selectedAvatarId || "hero",
            customAvatarUrl: selfData.customAvatarUrl || "",
            xp: selfData.xp,
            streak: selfData.streak,
            quizHighScore: selfData.quizHighScore,
            learnedWordsCount: selfData.learnedWordsCount,
            learnedGrammarCount: selfData.learnedGrammarCount,
            learnedKanjiCount: selfData.learnedKanjiCount,
            totalMasteredCount: selfData.totalMasteredCount,
            updatedAt: new Date().toISOString()
          }).catch(() => {});
        }
      }
    } catch (err) {
      console.warn("Fallback to local leaderboard:", err);
      const myUid = currentUser ? currentUser.uid : "current-local-user";
      const myCurrentEntry: LeaderboardEntry = {
        uid: myUid,
        userName: (currentUser?.displayName || progress.userName || "Bạn (Tôi)").trim(),
        selectedAvatarId: progress.selectedAvatarId || "hero",
        customAvatarUrl: progress.customAvatarUrl || currentUser?.photoURL || "",
        xp: progress.xp || 0,
        streak: progress.streak || 1,
        quizHighScore: progress.quizHighScore || 0,
        learnedWordsCount: localCounts.vocab,
        learnedGrammarCount: localCounts.grammar,
        learnedKanjiCount: localCounts.kanji,
        totalMasteredCount: localCounts.total,
        isCurrentUser: true,
        badge: "✨ Bạn (Đang học)"
      };
      setLeaderboardData([myCurrentEntry, ...SAMPLE_STUDENTS]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [progress, currentUser]);

  // Sort helper based on activeCategory
  const getSortValue = (entry: LeaderboardEntry, tab: CategoryTab) => {
    switch (tab) {
      case "total":
        return entry.totalMasteredCount || (entry.learnedWordsCount + entry.learnedGrammarCount + entry.learnedKanjiCount);
      case "vocab":
        return entry.learnedWordsCount || 0;
      case "grammar":
        return entry.learnedGrammarCount || 0;
      case "kanji":
        return entry.learnedKanjiCount || 0;
      default:
        return entry.totalMasteredCount || 0;
    }
  };

  // Sort & filter leaderboard list
  const sortedList = [...leaderboardData].sort((a, b) => {
    const valA = getSortValue(a, activeTab);
    const valB = getSortValue(b, activeTab);
    if (valB !== valA) return valB - valA;
    return (b.xp || 0) - (a.xp || 0); // tie-breaker with XP
  });

  const filteredList = sortedList.filter(item => 
    item.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Find user rank
  const myRankIndex = sortedList.findIndex(item => item.isCurrentUser || (currentUser && item.uid === currentUser.uid));
  const myRank = myRankIndex >= 0 ? myRankIndex + 1 : 0;
  const isUserInTop3 = myRank >= 1 && myRank <= 3;
  const myEntry = myRankIndex >= 0 ? sortedList[myRankIndex] : null;
  const top1Entry = sortedList[0];

  // Trigger confetti when rank in Top 3 on load or tab change
  useEffect(() => {
    if (!loading && isUserInTop3) {
      triggerVictoryConfetti();
    }
  }, [loading, activeTab, myRank]);

  const scrollToMyRow = () => {
    playSound.click();
    if (myRowRef.current) {
      myRowRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Crown className="w-7 h-7 text-amber-500 fill-amber-400 animate-bounce" />;
    if (rank === 2) return <Medal className="w-7 h-7 text-slate-400 fill-slate-300" />;
    if (rank === 3) return <Medal className="w-7 h-7 text-amber-700 fill-amber-600" />;
    return <span className="text-base font-black text-slate-500">#{rank}</span>;
  };

  const getRankCardBg = (rank: number, isSelf?: boolean) => {
    if (isSelf) {
      return "bg-gradient-to-r from-amber-100/90 via-amber-50 to-amber-100/90 border-4 border-amber-500 shadow-[0_0_25px_rgba(245,158,11,0.4)] ring-4 ring-amber-300/50 scale-[1.01]";
    }
    if (rank === 1) return "bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-100/70 border-2 border-amber-400 shadow-[4px_4px_0px_#d97706]";
    if (rank === 2) return "bg-gradient-to-r from-slate-50 via-slate-100 to-slate-200/50 border-2 border-slate-300 shadow-[3px_3px_0px_#64748b]";
    if (rank === 3) return "bg-gradient-to-r from-orange-50 to-amber-50/40 border-2 border-amber-700/30 shadow-[3px_3px_0px_#b45309]";
    return "bg-white border-2 border-slate-200 hover:border-slate-400 shadow-[2px_2px_0px_#cbd5e1]";
  };

  const getTabLabel = (tab: CategoryTab) => {
    switch (tab) {
      case "total": return "TỔNG ĐIỂM KIẾN THỨC";
      case "vocab": return "TỪ VỰNG";
      case "grammar": return "NGỮ PHÁP";
      case "kanji": return "HÁN TỰ (KANJI)";
    }
  };

  return (
    <div className="washi-pattern min-h-screen p-4 sm:p-8 rounded-[40px] border-2 border-[#1A1A1A] text-[#1A1A1A] space-y-6 relative" style={{ fontFamily: "'Lora', 'Noto Serif JP', serif" }}>
      
      {/* Header Title Banner */}
      <div className="bg-gradient-to-r from-[#8B0000] via-[#A00000] to-[#8B0000] text-white p-6 sm:p-8 rounded-3xl border-2 border-[#1A1A1A] shadow-[6px_6px_0px_#1A1A1A] relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2 z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full text-xs font-black">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
            <span>BẢNG VÀNG HỌC VIÊN XUẤT SẮC</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-amber-100 tracking-tight flex items-center gap-3">
            <span>🏆</span> Bảng Vinh Danh Tiếng Nhật
          </h1>
          <p className="text-xs sm:text-sm text-red-100 font-medium leading-relaxed">
            Vinh danh các sĩ tử siêng năng chinh phục Từ vựng, Ngữ pháp, Hán tự và duy trì chuỗi Streak rực lửa cùng Thầy Sơn!
          </p>
        </div>

        {/* Action Buttons Header */}
        <div className="z-10 w-full md:w-auto flex flex-col sm:flex-row items-center gap-3">
          {isUserInTop3 && (
            <button
              onClick={triggerVictoryConfetti}
              className="w-full sm:w-auto px-4 py-3 bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 text-slate-900 border-2 border-[#1A1A1A] rounded-2xl font-black text-xs sm:text-sm shadow-[3px_3px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 transition flex items-center justify-center gap-2 cursor-pointer animate-pulse"
            >
              <PartyPopper className="w-4 h-4 text-slate-900" />
              <span>Bắn Pháo Hoa 🎉 (Top 3)</span>
            </button>
          )}

          {currentUser ? (
            <button
              onClick={() => { playSound.click(); syncMyLeaderboardEntry(); }}
              disabled={isSyncingSelf}
              className="w-full sm:w-auto px-5 py-3 bg-white hover:bg-slate-100 text-slate-900 border-2 border-[#1A1A1A] rounded-2xl font-black text-xs sm:text-sm shadow-[3px_3px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncingSelf ? "animate-spin text-red-600" : ""}`} />
              <span>{isSyncingSelf ? "Đang đồng bộ..." : "Đồng Bộ Thứ Hạng"}</span>
            </button>
          ) : (
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/20 text-xs text-amber-200">
              💡 Đăng nhập để lưu tên & đọ sức trên Bảng Vàng!
            </div>
          )}
        </div>

        <div className="absolute right-4 bottom-[-20px] text-8xl opacity-10 select-none pointer-events-none">
          🏯
        </div>
      </div>

      {/* TOP 3 VICTORY CELEBRATION BANNER */}
      <AnimatePresence>
        {isUserInTop3 && myEntry && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 p-1 rounded-3xl border-2 border-[#1A1A1A] shadow-[5px_5px_0px_#1A1A1A]"
          >
            <div className="bg-amber-950/90 text-white p-4 sm:p-5 rounded-[22px] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center font-black text-2xl shadow-lg shrink-0 animate-bounce">
                  🏆
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-amber-300 text-base sm:text-lg">
                      XUẤT SẮC! BẠN ĐANG NẰM TRONG TOP {myRank} BẢNG VÀNG!
                    </span>
                    <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
                  </div>
                  <p className="text-xs text-amber-100 font-medium mt-0.5">
                    Thành tích học tập siêu phàm! Tiếp tục phát huy để giữ vững ngôi vị quán quân Tiếng Nhật cùng Thầy Sơn!
                  </p>
                </div>
              </div>

              <button
                onClick={triggerVictoryConfetti}
                className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 border-2 border-slate-900 rounded-xl font-black text-xs shadow-md shrink-0 cursor-pointer flex items-center gap-2"
              >
                <PartyPopper className="w-4 h-4" />
                <span>Bắn pháo hoa ăn mừng 🎆</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MY STATUS CARD BANNER - PROMINENT HIGHLIGHT */}
      {myEntry && (
        <div className="bg-gradient-to-r from-amber-500/15 via-amber-400/20 to-amber-500/15 border-2 border-amber-500/50 p-4 sm:p-5 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm relative overflow-hidden">
          {/* Pulsing indicator */}
          <div className="absolute top-2 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-amber-500 text-white text-[10px] font-black rounded-full shadow-xs uppercase">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span>VỊ TRÍ CỦA BẠN (# {myRank})</span>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto pt-2 sm:pt-0">
            <div className="w-14 h-14 rounded-2xl border-2 border-amber-500 bg-amber-100 flex items-center justify-center text-2xl shadow-inner shrink-0 overflow-hidden relative">
              {myEntry.customAvatarUrl ? (
                <img src={myEntry.customAvatarUrl} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                myEntry.selectedAvatarId === "hero" ? "🥷" : 
                myEntry.selectedAvatarId === "sakura" ? "🌸" :
                myEntry.selectedAvatarId === "megane" ? "👓" :
                myEntry.selectedAvatarId === "neko" ? "🐱" : "🦊"
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-slate-900 text-lg sm:text-xl">{myEntry.userName}</span>
                <span className="px-2.5 py-0.5 bg-[#8B0000] text-amber-200 font-black text-[11px] rounded-full uppercase shadow-xs">
                  Hạng #{myRank} ({getTabLabel(activeTab)})
                </span>
              </div>
              <p className="text-xs text-slate-700 font-bold mt-0.5 flex items-center gap-1">
                {top1Entry && top1Entry.uid !== myEntry.uid ? (
                  <span>Cách Top 1 (<strong className="text-amber-800">{top1Entry.userName}</strong>): <span className="font-black text-red-600">+{Math.max(0, getSortValue(top1Entry, activeTab) - getSortValue(myEntry, activeTab))}</span> điểm</span>
                ) : (
                  <span className="text-emerald-700 font-black">🎉 Bạn đang dẫn đầu Bảng Vàng {getTabLabel(activeTab)}! Tuyệt vời!</span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border-2 border-amber-300 w-full sm:w-auto justify-around shadow-xs">
              <div className="text-center px-1">
                <span className="text-[10px] uppercase font-extrabold text-slate-400 block">📚 Từ vựng</span>
                <span className="font-black text-emerald-600 text-sm">{myEntry.learnedWordsCount}</span>
              </div>
              <div className="h-6 w-px bg-slate-200" />
              <div className="text-center px-1">
                <span className="text-[10px] uppercase font-extrabold text-slate-400 block">📝 Ngữ pháp</span>
                <span className="font-black text-blue-600 text-sm">{myEntry.learnedGrammarCount}</span>
              </div>
              <div className="h-6 w-px bg-slate-200" />
              <div className="text-center px-1">
                <span className="text-[10px] uppercase font-extrabold text-slate-400 block">⛩️ Hán tự</span>
                <span className="font-black text-purple-600 text-sm">{myEntry.learnedKanjiCount}</span>
              </div>
              <div className="h-6 w-px bg-slate-200" />
              <div className="text-center px-1">
                <span className="text-[10px] uppercase font-extrabold text-amber-600 block">🏆 Tổng số</span>
                <span className="font-black text-amber-700 text-sm">{myEntry.totalMasteredCount || (myEntry.learnedWordsCount + myEntry.learnedGrammarCount + myEntry.learnedKanjiCount)}</span>
              </div>
            </div>

            {/* Jump to my row button */}
            <button
              onClick={scrollToMyRow}
              title="Cuộn tới vị trí của tôi"
              className="px-3 py-2.5 bg-amber-400 hover:bg-amber-300 border-2 border-[#1A1A1A] rounded-2xl font-black text-xs shadow-[2px_2px_0px_#1A1A1A] shrink-0 cursor-pointer flex items-center gap-1.5"
            >
              <UserCheck className="w-4 h-4 text-slate-900" />
              <span className="hidden sm:inline">Vị trí tôi</span>
            </button>
          </div>
        </div>
      )}

      {/* 4 PRIMARY LEADERBOARD CATEGORY TABS */}
      <div className="bg-white p-3 sm:p-4 rounded-3xl border-2 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A] space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
          
          {/* Tab 1: Bảng Tổng */}
          <button
            onClick={() => { playSound.click(); setActiveTab("total"); }}
            className={`p-3 sm:p-4 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 border-2 ${
              activeTab === "total"
                ? "bg-[#8B0000] text-amber-300 border-[#1A1A1A] shadow-[3px_3px_0px_#1A1A1A] scale-[1.02]"
                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            <Trophy className={`w-5 h-5 ${activeTab === "total" ? "text-amber-300 animate-pulse" : "text-amber-600"}`} />
            <span>🏆 BẢNG TỔNG</span>
            <span className={`text-[10px] font-bold ${activeTab === "total" ? "text-red-200" : "text-slate-400"}`}>
              Từ vựng + Ngữ pháp + Hán tự
            </span>
          </button>

          {/* Tab 2: Bảng Từ vựng */}
          <button
            onClick={() => { playSound.click(); setActiveTab("vocab"); }}
            className={`p-3 sm:p-4 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 border-2 ${
              activeTab === "vocab"
                ? "bg-emerald-700 text-white border-[#1A1A1A] shadow-[3px_3px_0px_#1A1A1A] scale-[1.02]"
                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            <BookOpen className={`w-5 h-5 ${activeTab === "vocab" ? "text-emerald-200" : "text-emerald-600"}`} />
            <span>📚 BẢNG TỪ VỰNG</span>
            <span className={`text-[10px] font-bold ${activeTab === "vocab" ? "text-emerald-100" : "text-slate-400"}`}>
              Xếp hạng Từ vựng đã thuộc
            </span>
          </button>

          {/* Tab 3: Bảng Ngữ pháp */}
          <button
            onClick={() => { playSound.click(); setActiveTab("grammar"); }}
            className={`p-3 sm:p-4 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 border-2 ${
              activeTab === "grammar"
                ? "bg-blue-700 text-white border-[#1A1A1A] shadow-[3px_3px_0px_#1A1A1A] scale-[1.02]"
                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            <FileText className={`w-5 h-5 ${activeTab === "grammar" ? "text-blue-200" : "text-blue-600"}`} />
            <span>📝 BẢNG NGỮ PHÁP</span>
            <span className={`text-[10px] font-bold ${activeTab === "grammar" ? "text-blue-100" : "text-slate-400"}`}>
              Xếp hạng Mẫu câu đã nắm chắc
            </span>
          </button>

          {/* Tab 4: Bảng Hán tự */}
          <button
            onClick={() => { playSound.click(); setActiveTab("kanji"); }}
            className={`p-3 sm:p-4 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 border-2 ${
              activeTab === "kanji"
                ? "bg-purple-800 text-white border-[#1A1A1A] shadow-[3px_3px_0px_#1A1A1A] scale-[1.02]"
                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            <Layers className={`w-5 h-5 ${activeTab === "kanji" ? "text-purple-200" : "text-purple-600"}`} />
            <span>⛩️ BẢNG HÁN TỰ</span>
            <span className={`text-[10px] font-bold ${activeTab === "kanji" ? "text-purple-100" : "text-slate-400"}`}>
              Xếp hạng Chữ Hán Kanji đã nhớ
            </span>
          </button>

        </div>

        {/* Search Bar & Banner Description */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="text-xs font-bold text-slate-600 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Đang hiển thị: <strong className="text-slate-900 uppercase">{getTabLabel(activeTab)}</strong> ({filteredList.length} học viên)</span>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm tên học viên trong bảng..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border-2 border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-[#8B0000]"
            />
          </div>
        </div>
      </div>

      {/* Leaderboard List */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-[#8B0000] animate-spin mx-auto" />
          <p className="text-sm font-bold text-slate-500">Đang tải danh sách Bảng Vàng từ dữ liệu Firestore...</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredList.map((student, index) => {
            const rank = index + 1;
            const isSelf = student.isCurrentUser || (currentUser && student.uid === currentUser.uid);
            const displayScore = getSortValue(student, activeTab);

            return (
              <motion.div
                key={student.uid + "-" + index}
                ref={isSelf ? myRowRef : null}
                id={isSelf ? "my-leaderboard-row" : undefined}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: Math.min(index * 0.04, 0.4) }}
                className={`p-4 rounded-2xl transition-all relative flex items-center justify-between gap-4 ${getRankCardBg(rank, isSelf)}`}
              >
                {/* PROMINENT BADGE ON CURRENT USER'S ROW */}
                {isSelf && (
                  <div className="absolute -top-3 left-6 bg-[#8B0000] text-amber-300 border-2 border-[#1A1A1A] px-3 py-0.5 rounded-full font-black text-[10px] uppercase shadow-md flex items-center gap-1 z-10">
                    <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping" />
                    <span>📍 VỊ TRÍ CỦA BẠN (ĐANG HỌC)</span>
                  </div>
                )}

                {/* Left: Rank & Student Profile */}
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                  {/* Rank Icon / Number */}
                  <div className="w-10 h-10 flex items-center justify-center shrink-0">
                    {getRankBadge(rank)}
                  </div>

                  {/* Avatar with potential crown frame */}
                  <div className={`w-12 h-12 rounded-2xl border-2 border-[#1A1A1A] bg-white flex items-center justify-center text-xl shrink-0 overflow-hidden shadow-sm relative ${isSelf ? "ring-2 ring-amber-500" : ""}`}>
                    {student.customAvatarUrl ? (
                      <img src={student.customAvatarUrl} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      student.selectedAvatarId === "hero" ? "🥷" : 
                      student.selectedAvatarId === "sakura" ? "🌸" :
                      student.selectedAvatarId === "megane" ? "👓" :
                      student.selectedAvatarId === "neko" ? "🐱" : "🦊"
                    )}
                    {isSelf && (
                      <div className="absolute bottom-0 right-0 bg-amber-500 text-white p-0.5 rounded-tl-md">
                        <Star className="w-3 h-3 fill-white" />
                      </div>
                    )}
                  </div>

                  {/* Name & Badges */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-black text-sm sm:text-base truncate ${isSelf ? "text-amber-950 font-black text-base" : "text-slate-900"}`}>
                        {student.userName}
                      </span>
                      {isSelf && (
                        <span className="px-2.5 py-0.5 bg-amber-500 text-slate-900 text-[10px] font-black rounded-full shrink-0 shadow-xs border border-amber-600">
                          ⭐️ BẠN (TÔI)
                        </span>
                      )}
                      {student.badge && (
                        <span className="hidden sm:inline-block px-2 py-0.5 bg-red-100 text-[#8B0000] border border-red-200 text-[10px] font-bold rounded-full truncate">
                          {student.badge}
                        </span>
                      )}
                    </div>

                    {/* All stats pill breakdown */}
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-600 font-bold mt-1">
                      <span className={`px-2 py-0.5 rounded-md ${activeTab === "vocab" ? "bg-emerald-100 text-emerald-800 font-black ring-1 ring-emerald-400" : "bg-slate-100"}`}>
                        📚 {student.learnedWordsCount} từ
                      </span>
                      <span className={`px-2 py-0.5 rounded-md ${activeTab === "grammar" ? "bg-blue-100 text-blue-800 font-black ring-1 ring-blue-400" : "bg-slate-100"}`}>
                        📝 {student.learnedGrammarCount} bài NP
                      </span>
                      <span className={`px-2 py-0.5 rounded-md ${activeTab === "kanji" ? "bg-purple-100 text-purple-800 font-black ring-1 ring-purple-400" : "bg-slate-100"}`}>
                        ⛩️ {student.learnedKanjiCount} Hán tự
                      </span>
                      <span className="hidden md:inline-block text-orange-600">
                        🔥 {student.streak}d
                      </span>
                      <span className="hidden md:inline-block text-amber-600">
                        ⚡ {student.xp} XP
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Highlighted Main Stat value for active Tab */}
                <div className="text-right shrink-0">
                  <span className={`block font-black text-xl sm:text-2xl ${
                    activeTab === "total" ? "text-amber-600" :
                    activeTab === "vocab" ? "text-emerald-600" :
                    activeTab === "grammar" ? "text-blue-600" : "text-purple-600"
                  }`}>
                    {displayScore} {activeTab === "total" ? "Điểm" : activeTab === "vocab" ? "Từ" : activeTab === "grammar" ? "Bài" : "Chữ"}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">
                    {activeTab === "total" ? "Tổng (V+N+H)" : activeTab === "vocab" ? "Từ Vựng" : activeTab === "grammar" ? "Ngữ Pháp" : "Hán Tự"}
                  </span>
                </div>
              </motion.div>
            );
          })}

          {filteredList.length === 0 && (
            <div className="py-12 text-center bg-white rounded-3xl border-2 border-dashed border-slate-300">
              <p className="font-bold text-slate-400">Không tìm thấy học viên phù hợp với từ khóa.</p>
            </div>
          )}
        </div>
      )}

      {/* Floating Action Button to Jump to My Rank */}
      {myEntry && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={scrollToMyRow}
          className="fixed bottom-6 right-6 z-40 bg-[#8B0000] text-amber-300 border-2 border-[#1A1A1A] p-3 rounded-full shadow-[4px_4px_0px_#1A1A1A] hover:bg-red-900 cursor-pointer flex items-center gap-2 group transition"
        >
          <UserCheck className="w-5 h-5 text-amber-300" />
          <span className="text-xs font-black pr-1 hidden group-hover:inline">Tôi ở đâu? (#{myRank})</span>
        </motion.button>
      )}
    </div>
  );
}
