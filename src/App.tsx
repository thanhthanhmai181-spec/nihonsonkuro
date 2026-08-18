import React, { useState, useEffect } from "react";
import { UserProgress, Vocabulary } from "./types";
import { PRESET_VOCABULARY } from "./data/vocabPreset";
import { playSound } from "./utils/audio";
import { calculateDetailedUserStats } from "./utils/stats";
import Dashboard from "./components/Dashboard";
import FlashcardSet from "./components/FlashcardSet";
import QuizGame from "./components/QuizGame";
import MatchGame from "./components/MatchGame";
import SonkuroDrift from "./components/SonkuroDrift";
import CraneKanji from "./components/CraneKanji";
import ThaySonChat from "./components/ThaySonChat";
import JapaneseAiChat from "./components/JapaneseAiChat";
import PersonalVocab from "./components/PersonalVocab";
import CoursesTab from "./components/CoursesTab";
import KnowledgeTab from "./components/KnowledgeTab";
import ListeningShadowing from "./components/ListeningShadowing";
import GamesTab from "./components/GamesTab";
import N5Lessons from "./components/N5Lessons";
import AlphabetLessons from "./components/AlphabetLessons";
import MoraLessons from "./components/MoraLessons";
import VocabN5Lessons from "./components/VocabN5Lessons";
import VocabN4Lessons from "./components/VocabN4Lessons";
import GrammarN5Lessons from "./components/GrammarN5Lessons";
import GrammarN4Lessons from "./components/GrammarN4Lessons";
import KanjiN5Lessons from "./components/KanjiN5Lessons";
import KanjiN4Lessons from "./components/KanjiN4Lessons";
import N4Lessons from "./components/N4Lessons";
import N3Lessons from "./components/N3Lessons";
import VerbConjugationLessons from "./components/VerbConjugationLessons";
import VerbConjugationN4Lessons from "./components/VerbConjugationN4Lessons";
import JLPTN4Exams from "./components/JLPTN4Exams";
import JLPTN3Exams from "./components/JLPTN3Exams";
import Leaderboard from "./components/Leaderboard";
import Auth from "./components/Auth";
import { DuySonLogo } from "./components/DuySonLogo";
import { auth, db } from "./lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { doc, getDoc, setDoc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { mergeStorageSerialized } from "./utils/syncHelper";
import { 
  BookOpen, 
  Gamepad2, 
  GraduationCap, 
  Home, 
  MessageSquare, 
  Notebook, 
  Sparkles, 
  Cloud, 
  CloudOff, 
  LogIn, 
  LogOut, 
  RefreshCw,
  Trophy
} from "lucide-react";

const SYNCABLE_STORAGE_KEYS = [
  "sonkuro_n5_grammar_progress_v1",
  "sk_n4_mastered_ids",
  "n3_grammar_progress",
  "kanji_n5_state",
  "n4_known_kanji",
  "kanji_n3_progress",
  "n5_srs_v8",
  "n5_settings_v8",
  "sk_vocab_n4_progress",
  "sk_vocab_n3_progress",
  "hac_tong_high_score",
  "driftGame_stars",
  "sk_test_history",
  "sonkuro_verb_stats",
  "reflex_n4_highscore",
  "n4_known_examples",
  "n4_quiz_correct",
  "n4_quiz_total",
  "duy_son_custom_logo_url",
  "hoc_cung_thay_son_ai_examples"
];

// Monkeypatch localStorage to emit custom event on changes (deferred to avoid setState-in-render)
if (typeof window !== "undefined") {
  try {
    const originalSetItem = window.localStorage.setItem;
    const originalRemoveItem = window.localStorage.removeItem;

    window.localStorage.setItem = function (key: string, value: string) {
      originalSetItem.call(this, key, value);
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("local-storage-changed", { detail: { key, value } }));
      }, 0);
    };

    window.localStorage.removeItem = function (key: string) {
      originalRemoveItem.call(this, key);
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("local-storage-changed", { detail: { key, value: null } }));
      }, 0);
    };
  } catch (err) {
    console.warn("Failed to patch localStorage for syncing:", err);
  }
}

const PROGRESS_LOCAL_STORAGE_KEY = "hoc_cung_thay_son_progress";
const CUSTOM_VOCAB_LOCAL_STORAGE_KEY = "hoc_cung_thay_son_custom_vocab";

const DEFAULT_PROGRESS: UserProgress = {
  streak: 1,
  xp: 15,
  learnedWordIds: [],
  favoriteWordIds: [],
  quizHighScore: 0,
  selectedAvatarId: "hero",
  userName: "Học trò ngoan",
  lastActiveDate: new Date().toISOString().split("T")[0]
};

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [selectedLevel, setSelectedLevel] = useState<"N5" | "N4" | "N3" | "Anime" | "Travel">("N5");
  const [practiceMode, setPracticeMode] = useState<"standard" | "custom">("standard");

  // Firebase auth & syncing state
  const [user, setUser] = useState<any>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isFirebaseLoading, setIsFirebaseLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [renderKey, setRenderKey] = useState(0);
  const [syncTrigger, setSyncTrigger] = useState(0);

  // Load persistent user progress from LocalStorage
  const [progress, setProgress] = useState<UserProgress>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(PROGRESS_LOCAL_STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          
          // --- Streak Calculation ---
          const todayStr = new Date().toISOString().split("T")[0];
          const lastActive = parsed.lastActiveDate || todayStr;
          
          let currentStreak = parsed.streak || 1;
          
          if (lastActive !== todayStr) {
            const lastDate = new Date(lastActive);
            const todayDate = new Date(todayStr);
            const diffTime = Math.abs(todayDate.getTime() - lastDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
              // Active yesterday, increase streak
              currentStreak += 1;
            } else if (diffDays > 1) {
              // Broke streak, reset to 1
              currentStreak = 1;
            }
          }
          
          return {
            ...DEFAULT_PROGRESS,
            ...parsed,
            streak: currentStreak,
            lastActiveDate: todayStr
          };
        } catch (e) {
          return DEFAULT_PROGRESS;
        }
      }
    }
    return DEFAULT_PROGRESS;
  });

  // Load user custom vocabulary
  const [customVocab, setCustomVocab] = useState<Vocabulary[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(CUSTOM_VOCAB_LOCAL_STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return [];
        }
      }
    }
    return [];
  });

  // Subscribe to Firebase Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsFirebaseLoading(true);
      if (firebaseUser) {
        setUser(firebaseUser);
        setIsSyncing(true);
        try {
          // 1. Fetch cloud progress
          const progressRef = doc(db, "users/" + firebaseUser.uid);
          const progressSnap = await getDoc(progressRef);
          
          let firestoreProgress: UserProgress;
          if (progressSnap.exists()) {
            firestoreProgress = progressSnap.data() as UserProgress;
          } else {
            // First time login: save current local progress to cloud
            firestoreProgress = {
              ...progress,
              userName: firebaseUser.displayName || progress.userName || "Học trò ngoan"
            };
            await setDoc(progressRef, firestoreProgress);
          }
          setProgress(firestoreProgress);

          // 2. Fetch custom vocab
          const vocabRef = collection(db, "users/" + firebaseUser.uid + "/custom_vocab");
          const vocabSnap = await getDocs(vocabRef);
          const firestoreVocab: Vocabulary[] = [];
          vocabSnap.forEach((doc) => {
            firestoreVocab.push(doc.data() as Vocabulary);
          });
          setCustomVocab(firestoreVocab);

          // 3. Fetch syncable storage keys and smart merge with local storage
          const syncRef = doc(db, "users/" + firebaseUser.uid + "/sync/storage");
          const syncSnap = await getDoc(syncRef);
          if (syncSnap.exists()) {
            const syncData = syncSnap.data();
            if (syncData && syncData.data) {
              (window as any).__isSyncingFromCloud = true;
              try {
                SYNCABLE_STORAGE_KEYS.forEach(key => {
                  const cloudVal = syncData.data[key];
                  const localVal = localStorage.getItem(key);

                  if (cloudVal !== undefined && cloudVal !== null) {
                    const merged = mergeStorageSerialized(localVal, cloudVal as string);
                    localStorage.setItem(key, merged);
                  }
                });
              } finally {
                (window as any).__isSyncingFromCloud = false;
              }

              // Save the merged result back up to Cloud so Firestore reflects latest local gains
              const mergedPayload: Record<string, string> = {};
              SYNCABLE_STORAGE_KEYS.forEach(k => {
                const val = localStorage.getItem(k);
                if (val !== null) mergedPayload[k] = val;
              });
              await setDoc(syncRef, { data: mergedPayload, updatedAt: new Date().toISOString() });

              setRenderKey(prev => prev + 1);
            }
          } else {
            // First time: backup current localStorage to cloud
            const initialData: Record<string, string> = {};
            SYNCABLE_STORAGE_KEYS.forEach(k => {
              const val = localStorage.getItem(k);
              if (val !== null) {
                initialData[k] = val;
              }
            });
            await setDoc(syncRef, { data: initialData, updatedAt: new Date().toISOString() });
          }
        } catch (e) {
          console.error("Error loading user data from Firebase:", e);
        } finally {
          setIsSyncing(false);
        }
      } else {
        setUser(null);
        // Reset to local backups
        const savedProgress = localStorage.getItem(PROGRESS_LOCAL_STORAGE_KEY);
        if (savedProgress) {
          try { setProgress(JSON.parse(savedProgress)); } catch (e) {}
        }
        const savedVocab = localStorage.getItem(CUSTOM_VOCAB_LOCAL_STORAGE_KEY);
        if (savedVocab) {
          try { setCustomVocab(JSON.parse(savedVocab)); } catch (e) {}
        }
        setRenderKey(prev => prev + 1);
      }
      setIsFirebaseLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Persist progress changes (to Cloud if logged in, else to local storage)
  useEffect(() => {
    if (isFirebaseLoading) return;
    if (user) {
      setIsSyncing(true);
      setDoc(doc(db, "users/" + user.uid), progress)
        .catch(err => console.error("Error saving progress to Firestore:", err))
        .finally(() => setIsSyncing(false));

      // Also sync public leaderboard entry
      const detailed = calculateDetailedUserStats(progress, PRESET_VOCABULARY);

      const leaderboardData = {
        uid: user.uid,
        userName: user.displayName || progress.userName || "Học trò ngoan",
        selectedAvatarId: progress.selectedAvatarId || "hero",
        customAvatarUrl: progress.customAvatarUrl || user.photoURL || "",
        xp: progress.xp || 0,
        streak: progress.streak || 1,
        quizHighScore: progress.quizHighScore || 0,
        learnedWordsCount: detailed.vocab,
        learnedGrammarCount: detailed.grammar,
        learnedKanjiCount: detailed.kanji,
        totalMasteredCount: detailed.total,
        updatedAt: new Date().toISOString()
      };
      setDoc(doc(db, "leaderboard", user.uid), leaderboardData).catch(() => {});
    } else {
      localStorage.setItem(PROGRESS_LOCAL_STORAGE_KEY, JSON.stringify(progress));
    }
  }, [progress, user, isFirebaseLoading]);

  // Wrapped custom vocab modifier to support syncing changes reactively to cloud & local
  const handleSetCustomVocab = async (
    value: React.SetStateAction<Vocabulary[]>
  ) => {
    setCustomVocab(prev => {
      const nextVocab = typeof value === "function" ? (value as Function)(prev) : value;
      
      // Save locally
      localStorage.setItem(CUSTOM_VOCAB_LOCAL_STORAGE_KEY, JSON.stringify(nextVocab));

      // Save to Firestore if logged in
      if (user) {
        setIsSyncing(true);
        (async () => {
          try {
            const prevIds = new Set(prev.map(v => v.id));
            const nextIds = new Set(nextVocab.map(v => v.id));

            // Deleted items
            const deletedIds = Array.from(prevIds).filter(id => !nextIds.has(id));
            for (const id of deletedIds) {
              await deleteDoc(doc(db, "users/" + user.uid + "/custom_vocab/" + id));
            }

            // Added or Edited items
            const addedOrEdited = nextVocab.filter((v: Vocabulary) => {
              const prevItem = prev.find(p => p.id === v.id);
              return !prevItem || JSON.stringify(prevItem) !== JSON.stringify(v);
            });
            for (const word of addedOrEdited) {
              await setDoc(doc(db, "users/" + user.uid + "/custom_vocab/" + word.id), word);
            }
          } catch (err) {
            console.error("Error syncing custom vocabulary:", err);
          } finally {
            setIsSyncing(false);
          }
        })();
      }

      return nextVocab;
    });
  };

  // Direct sync function to immediately push local storage to Cloud
  const performCloudSync = async () => {
    if (!user || isFirebaseLoading) return;
    setIsSyncing(true);
    try {
      const data: Record<string, string> = {};
      SYNCABLE_STORAGE_KEYS.forEach(k => {
        const val = localStorage.getItem(k);
        if (val !== null) {
          data[k] = val;
        }
      });
      const syncRef = doc(db, "users/" + user.uid + "/sync/storage");
      await setDoc(syncRef, { data, updatedAt: new Date().toISOString() });
    } catch (err) {
      console.error("Error syncing storage to Firestore:", err);
    } finally {
      setIsSyncing(false);
    }
  };

  // Sync triggered storage changes to cloud (with short 500ms debounce)
  useEffect(() => {
    if (!user || isFirebaseLoading) return;

    const timer = setTimeout(() => {
      performCloudSync();
    }, 500);

    return () => clearTimeout(timer);
  }, [syncTrigger, user, isFirebaseLoading]);

  // Tab unload & visibility change flush to prevent data loss on closing tab
  useEffect(() => {
    if (!user) return;

    const handleFlush = () => {
      performCloudSync();
    };

    const handleVisibility = () => {
      if (document.visibilityState === "hidden") {
        handleFlush();
      }
    };

    window.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("beforeunload", handleFlush);
    return () => {
      window.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("beforeunload", handleFlush);
    };
  }, [user]);

  // Listen to storage change events
  useEffect(() => {
    const handleStorageChange = (e: any) => {
      if ((window as any).__isSyncingFromCloud) return;

      const key = e.detail?.key;
      if (!key || SYNCABLE_STORAGE_KEYS.includes(key)) {
        setSyncTrigger(prev => prev + 1);
      }
    };

    window.addEventListener("local-storage-changed" as any, handleStorageChange);
    return () => {
      window.removeEventListener("local-storage-changed" as any, handleStorageChange);
    };
  }, []);

  const handleLogout = async () => {
    playSound.click();
    if (window.confirm("Em có muốn đăng xuất khỏi tài khoản không? (Tiến trình học tập trên thiết bị này vẫn được giữ nguyên)")) {
      try {
        if (user) {
          await signOut(auth);
        }
        setUser(null);
        setProgress(DEFAULT_PROGRESS);
        setCustomVocab([]);
        setRenderKey(prev => prev + 1);
        playSound.achievement();
      } catch (err) {
        console.error("Error signing out:", err);
      }
    }
  };

  const updateProgress = (updated: Partial<UserProgress>) => {
    setProgress(prev => ({
      ...prev,
      ...updated
    }));
  };

  const handleNavigate = (tab: string, level?: "N5" | "N4" | "N3" | "Anime" | "Travel") => {
    playSound.click();
    setActiveTab(tab);
    if (level) {
      setSelectedLevel(level);
      setPracticeMode("standard");
    }
  };

  const handlePracticeCustom = () => {
    playSound.click();
    setPracticeMode("custom");
    setActiveTab("vocab");
  };

  // Compile combined vocabulary for practice modes
  const vocabSource = practiceMode === "custom" ? customVocab : PRESET_VOCABULARY;

  return (
    <div id="app-root-container" className="min-h-screen bg-natural-bg text-natural-text font-sans flex flex-col relative overflow-hidden">
      
      {/* Immersive falling cherry blossoms background (CSS only, light-weight & beautiful) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        <div className="absolute top-10 left-10 text-pink-400/20 text-2xl animate-pulse">🌸</div>
        <div className="absolute top-40 right-20 text-pink-400/10 text-xl animate-pulse delay-500">🌸</div>
        <div className="absolute bottom-20 left-1/4 text-pink-400/15 text-3xl animate-bounce delay-1000">🌸</div>
        <div className="absolute bottom-40 right-1/3 text-pink-400/20 text-2xl animate-pulse delay-300">🌸</div>
        <div className="absolute top-1/2 left-2/3 text-pink-400/10 text-4xl animate-bounce delay-700">🌸</div>
      </div>

      {/* Primary Navigation Header */}
      <header id="primary-header" className="sticky top-0 z-40 bg-white/60 backdrop-blur-md border-b border-natural-border shadow-sm h-20 flex items-center">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Logo Brand area */}
          <div 
            onClick={() => handleNavigate("dashboard")}
            className="flex items-center gap-3 cursor-pointer select-none group shrink-0"
          >
            <DuySonLogo size={52} className="group-hover:rotate-6 transition-transform duration-300" />
            <div>
              <h1 className="font-sans font-black text-natural-deep text-base sm:text-lg tracking-tight leading-none">
                Học cùng thầy Sơn
              </h1>
              <p className="text-[10px] uppercase tracking-widest font-bold text-pink-500 mt-1">
                ĐỊA NGỤC TRẦN GIAN ACADEMY
              </p>
            </div>
          </div>

          {/* Quick Info & Authentication Badge */}
          <div className="flex items-center gap-3 select-none shrink-0">
            {/* Sync status indicator & manual sync button */}
            {user && (
              <button 
                onClick={() => { playSound.click(); performCloudSync(); }}
                className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200 text-[10px] font-bold transition-all cursor-pointer"
                title={isSyncing ? "Đang đồng bộ đám mây..." : "Đã đồng bộ an toàn! Bấm để đồng bộ ngay lập tức"}
              >
                {isSyncing ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-pink-500" />
                ) : (
                  <Cloud className="w-3.5 h-3.5 text-emerald-600" />
                )}
                <span className="hidden md:inline">{isSyncing ? "Đang đồng bộ..." : "Đã đồng bộ"}</span>
              </button>
            )}
            
            {!user && (
              <div 
                className="hidden md:flex items-center justify-center p-1.5 rounded-full bg-amber-50 text-amber-600 border border-amber-100 cursor-pointer"
                onClick={() => { playSound.click(); setAuthModalOpen(true); }}
                title="Sử dụng Chế độ Khách (Bấm để đăng nhập và lưu đám mây)"
              >
                <CloudOff className="w-3.5 h-3.5" />
              </div>
            )}

            {/* User display name & XP */}
            <div className="hidden sm:flex flex-col items-end shrink-0">
              <span className="font-bold text-xs text-natural-deep leading-none">
                {user ? user.displayName || progress.userName : "Khách (Chưa lưu)"}
              </span>
              <span className="text-[10px] text-pink-600 font-bold mt-1">{progress.xp} XP</span>
            </div>
            
            {/* User Avatar */}
            <div className="w-10 h-10 rounded-full border-2 border-white shadow-md flex items-center justify-center bg-orange-100 text-lg shrink-0 overflow-hidden">
              {progress.customAvatarUrl ? (
                <img 
                  src={progress.customAvatarUrl} 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                progress.selectedAvatarId === "hero" ? "🥷" : 
                progress.selectedAvatarId === "sakura" ? "🌸" :
                progress.selectedAvatarId === "megane" ? "👓" :
                progress.selectedAvatarId === "neko" ? "🐱" : "🦊"
              )}
            </div>

            {/* Streak */}
            <div className="hidden xs:flex items-center gap-1 bg-natural-soft border border-natural-border px-2.5 py-1 rounded-full">
              <span className="text-xs">🔥</span>
              <span className="font-extrabold text-[10px] sm:text-xs text-natural-deep">{progress.streak} ngày</span>
            </div>

            {/* Auth Action Buttons */}
            {user ? (
              <button
                onClick={handleLogout}
                className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 border border-rose-100 rounded-xl transition-all cursor-pointer flex items-center justify-center animate-pulse"
                title="Đăng xuất khỏi tài khoản"
              >
                <LogOut className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => { playSound.click(); setAuthModalOpen(true); }}
                className="px-3 py-1.5 bg-pink-600 hover:bg-pink-700 text-white text-[11px] font-extrabold rounded-xl shadow-sm transition-all cursor-pointer flex items-center gap-1"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Đăng nhập</span>
              </button>
            )}
          </div>

        </div>
      </header>

      {/* Iconic Navigation Bar - Positioned at the top right below primary header/login */}
      <nav id="iconic-navigation-bar" className="sticky top-20 z-30 bg-white border-b border-natural-border py-2 px-1 sm:px-4 shadow-sm backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-7 gap-1 max-w-4xl mx-auto text-center">
            <button
              onClick={() => handleNavigate("dashboard")}
              className={`flex flex-col items-center justify-center gap-1 py-1.5 text-[10px] sm:text-xs font-bold transition-all cursor-pointer rounded-xl ${activeTab === "dashboard" ? "text-pink-600 bg-pink-50/50" : "text-natural-muted hover:text-natural-text hover:bg-natural-soft/30"}`}
            >
              <Home className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              <span>Trang chủ</span>
            </button>
            
            <button
              onClick={() => handleNavigate("leaderboard")}
              className={`flex flex-col items-center justify-center gap-1 py-1.5 text-[10px] sm:text-xs font-bold transition-all cursor-pointer rounded-xl relative ${activeTab === "leaderboard" ? "text-amber-600 bg-amber-50/80 font-black" : "text-natural-muted hover:text-natural-text hover:bg-natural-soft/30"}`}
            >
              <Trophy className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-amber-500" />
              <span>Bảng Vàng</span>
              <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase scale-90 shadow-sm">
                TOP
              </span>
            </button>

            <button
              onClick={() => handleNavigate("courses")}
              className={`flex flex-col items-center justify-center gap-1 py-1.5 text-[10px] sm:text-xs font-bold transition-all cursor-pointer rounded-xl ${activeTab === "courses" ? "text-pink-600 bg-pink-50/50" : "text-natural-muted hover:text-natural-text hover:bg-natural-soft/30"}`}
            >
              <GraduationCap className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              <span>Khóa học</span>
            </button>

            <button
              onClick={() => handleNavigate("japanese-ai-chat")}
              className={`flex flex-col items-center justify-center gap-1 py-1.5 text-[10px] sm:text-xs font-bold transition-all cursor-pointer rounded-xl relative ${activeTab === "japanese-ai-chat" ? "text-pink-600 bg-pink-50/50" : "text-natural-muted hover:text-natural-text hover:bg-natural-soft/30"}`}
            >
              <MessageSquare className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              <span>Trò chuyện AI</span>
              <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase scale-90">
                JP
              </span>
            </button>

            <button
              onClick={() => handleNavigate("knowledge")}
              className={`flex flex-col items-center justify-center gap-1 py-1.5 text-[10px] sm:text-xs font-bold transition-all cursor-pointer rounded-xl ${activeTab === "knowledge" ? "text-pink-600 bg-pink-50/50" : "text-natural-muted hover:text-natural-text hover:bg-natural-soft/30"}`}
            >
              <BookOpen className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              <span>Bổ ích</span>
            </button>

            <button
              onClick={() => handleNavigate("games")}
              className={`flex flex-col items-center justify-center gap-1 py-1.5 text-[10px] sm:text-xs font-bold transition-all cursor-pointer rounded-xl ${activeTab === "games" || activeTab === "quiz" || activeTab === "match" ? "text-pink-600 bg-pink-50/50" : "text-natural-muted hover:text-natural-text hover:bg-natural-soft/30"}`}
            >
              <Gamepad2 className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              <span>Trò chơi</span>
            </button>

            <button
              onClick={() => handleNavigate("personal")}
              className={`flex flex-col items-center justify-center gap-1 py-1.5 text-[10px] sm:text-xs font-bold transition-all cursor-pointer rounded-xl ${activeTab === "personal" ? "text-pink-600 bg-pink-50/50" : "text-natural-muted hover:text-natural-text hover:bg-natural-soft/30"}`}
            >
              <Notebook className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              <span>Sổ tay</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area Container */}
      <main id="primary-main-container" key={renderKey} className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 z-10">
        {activeTab === "dashboard" && (
          <Dashboard 
            progress={progress}
            vocabList={PRESET_VOCABULARY}
            updateProgress={updateProgress}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === "leaderboard" && (
          <Leaderboard 
            progress={progress}
            currentUser={user}
            onRefreshProgress={() => setRenderKey(prev => prev + 1)}
          />
        )}

        {activeTab === "courses" && (
          <CoursesTab 
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === "n5-lessons" && (
          <N5Lessons 
            onGoBack={() => handleNavigate("courses")}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === "alphabet-lessons" && (
          <AlphabetLessons 
            onGoBack={() => handleNavigate("n5-lessons")}
          />
        )}

        {activeTab === "mora-lessons" && (
          <MoraLessons 
            onGoBack={() => handleNavigate("n5-lessons")}
          />
        )}

        {activeTab === "n5-vocab-lessons" && (
          <VocabN5Lessons 
            onGoBack={() => handleNavigate("n5-lessons")}
          />
        )}

        {activeTab === "n5-grammar-lessons" && (
          <GrammarN5Lessons 
            onGoBack={() => handleNavigate("n5-lessons")}
          />
        )}

        {activeTab === "n5-kanji-lessons" && (
          <KanjiN5Lessons 
            onGoBack={() => handleNavigate("n5-lessons")}
          />
        )}

        {activeTab === "verb-conjugation-lessons" && (
          <VerbConjugationLessons 
            onGoBack={() => handleNavigate("n5-lessons")}
          />
        )}

        {activeTab === "n4-lessons" && (
          <N4Lessons 
            onGoBack={() => handleNavigate("courses")}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === "n4-vocab-lessons" && (
          <VocabN4Lessons 
            onGoBack={() => handleNavigate("n4-lessons")}
          />
        )}

        {activeTab === "n4-grammar-lessons" && (
          <GrammarN4Lessons 
            onGoBack={() => handleNavigate("n4-lessons")}
          />
        )}

        {activeTab === "n4-kanji-lessons" && (
          <KanjiN4Lessons 
            onGoBack={() => handleNavigate("n4-lessons")}
          />
        )}

        {activeTab === "n4-verb-conjugation-lessons" && (
          <VerbConjugationN4Lessons 
            onGoBack={() => handleNavigate("n4-lessons")}
          />
        )}

        {activeTab === "n4-jlpt-exam" && (
          <JLPTN4Exams 
            onGoBack={() => handleNavigate("n4-lessons")}
          />
        )}

        {activeTab === "n3-lessons" && (
          <N3Lessons 
            onGoBack={() => handleNavigate("courses")}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === "n3-jlpt-exam" && (
          <JLPTN3Exams 
            onGoBack={() => handleNavigate("n3-lessons")}
          />
        )}

        {activeTab === "knowledge" && (
          <KnowledgeTab />
        )}

        {activeTab === "listening-shadowing" && (
          <ListeningShadowing 
            onGoBack={() => handleNavigate("knowledge")}
          />
        )}

        {activeTab === "games" && (
          <GamesTab 
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === "vocab" && (
          <FlashcardSet 
            level={selectedLevel}
            vocabList={vocabSource}
            progress={progress}
            updateProgress={updateProgress}
            onGoBack={() => handleNavigate("courses")}
          />
        )}

        {activeTab === "quiz" && (
          <QuizGame 
            vocabList={PRESET_VOCABULARY}
            progress={progress}
            updateProgress={updateProgress}
            onGoBack={() => handleNavigate("games")}
          />
        )}

        {activeTab === "match" && (
          <MatchGame 
            vocabList={PRESET_VOCABULARY}
            progress={progress}
            updateProgress={updateProgress}
            onGoBack={() => handleNavigate("games")}
          />
        )}

        {activeTab === "drift" && (
          <SonkuroDrift 
            onGoBack={() => handleNavigate("games")}
            progress={progress}
            updateProgress={updateProgress}
          />
        )}

        {activeTab === "crane" && (
          <CraneKanji 
            onGoBack={() => handleNavigate("games")}
            progress={progress}
            updateProgress={updateProgress}
          />
        )}

        {activeTab === "japanese-ai-chat" && (
          <JapaneseAiChat 
            progress={progress}
            updateProgress={updateProgress}
            onGoBack={() => handleNavigate("dashboard")}
          />
        )}

        {activeTab === "thay-son-chat" && (
          <ThaySonChat 
            progress={progress}
            updateProgress={updateProgress}
            onGoBack={() => handleNavigate("dashboard")}
          />
        )}

        {activeTab === "personal" && (
          <PersonalVocab 
            customVocab={customVocab}
            setCustomVocab={handleSetCustomVocab}
            progress={progress}
            updateProgress={updateProgress}
            onGoBack={() => handleNavigate("dashboard")}
            onPracticeCustom={handlePracticeCustom}
          />
        )}
      </main>

      {/* Auth Modal */}
      <Auth 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={(firebaseUser) => {
          setUser(firebaseUser);
          setAuthModalOpen(false);
        }}
        currentLocalProgress={progress}
      />

    </div>
  );
}
