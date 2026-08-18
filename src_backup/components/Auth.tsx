import React, { useState } from "react";
import { auth, db } from "../lib/firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { playSound } from "../utils/audio";
import { X, Mail, Lock, User, Sparkles, LogOut, Loader2, BookOpen } from "lucide-react";
import { motion } from "motion/react";
import { UserProgress } from "../types";

interface AuthProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: any) => void;
  currentLocalProgress?: UserProgress;
}

export default function Auth({ isOpen, onClose, onAuthSuccess, currentLocalProgress }: AuthProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuggestSignUp, setShowSuggestSignUp] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsLoading(true);
    playSound.click();

    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      playSound.achievement();
      onAuthSuccess(userCredential.user);
      onClose();
    } catch (err: any) {
      console.error(err);
      let vietnameseMsg = err.message;
      if (err.code === "auth/popup-blocked") {
        vietnameseMsg = "Trình duyệt đã chặn Pop-up. Em hãy bật quyền hiển thị Pop-up cho trang web này để đăng nhập Google nhé!";
      } else if (err.code === "auth/popup-closed-by-user") {
        vietnameseMsg = "Em đã đóng cửa sổ đăng nhập bằng Google.";
      } else if (err.code === "auth/cancelled-popup-request") {
        vietnameseMsg = "Yêu cầu đăng nhập đã bị hủy.";
      } else if (err.code === "auth/unauthorized-domain") {
        vietnameseMsg = `Tên miền hiện tại (${window.location.hostname}) chưa được thêm vào 'Authorized domains' trong Firebase Console. Thầy/Em hãy truy cập Firebase Console -> Authentication -> Settings -> Authorized domains và thêm tên miền này vào nhé!`;
      } else if (err.code === "auth/operation-not-allowed") {
        vietnameseMsg = "Phương thức đăng nhập Google chưa được kích hoạt trong Firebase Console. Thầy/Em hãy bật Google Sign-In trong Authentication -> Sign-in method nhé!";
      } else {
        vietnameseMsg = `Không đăng nhập được Google: ${err.message || err.code || "Lỗi không xác định"}. Thầy/Em vui lòng kiểm tra kết nối, mở trong tab mới hoặc thêm tên miền hiện tại vào Authorized domains của Firebase nha!`;
      }
      setError(vietnameseMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    setShowSuggestSignUp(false);
    playSound.click();

    try {
      if (isSignUp) {
        if (!fullName.trim()) {
          throw new Error("Vui lòng điền tên của em nhé!");
        }
        // Create user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update profile
        await updateProfile(user, { displayName: fullName });

        // Create user document in Firestore with current progress or default
        const initialProgress: UserProgress = currentLocalProgress || {
          streak: 1,
          xp: 15,
          learnedWordIds: [],
          favoriteWordIds: [],
          quizHighScore: 0,
          selectedAvatarId: "hero",
          userName: fullName,
          lastActiveDate: new Date().toISOString().split("T")[0]
        };

        // Enforce user name
        initialProgress.userName = fullName;

        await setDoc(doc(db, "users", user.uid), initialProgress);
        
        playSound.achievement();
        onAuthSuccess(user);
        onClose();
      } else {
        // Sign in
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        playSound.achievement();
        onAuthSuccess(userCredential.user);
        onClose();
      }
    } catch (err: any) {
      console.error(err);
      let vietnameseMsg = err.message;
      if (err.code === "auth/invalid-email") {
        vietnameseMsg = "Email không hợp lệ rồi em ơi!";
      } else if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        vietnameseMsg = "Email hoặc mật khẩu chưa chính xác rồi!";
        if (!isSignUp) {
          setShowSuggestSignUp(true);
        }
      } else if (err.code === "auth/weak-password") {
        vietnameseMsg = "Mật khẩu nên có ít nhất 6 ký tự nha!";
      } else if (err.code === "auth/email-already-in-use") {
        vietnameseMsg = "Email này đã được đăng ký mất rồi!";
      } else if (err.code === "auth/operation-not-allowed") {
        vietnameseMsg = "Chưa bật Email/Password trong Firebase! Hãy dùng nút 'Tiếp tục với Google' ở dưới hoặc Bật (Enable) 'Email/Password' trong Firebase Console nha!";
      } else {
        vietnameseMsg = `${err.message || "Lỗi không xác định"} (Mã lỗi: ${err.code || "unknown"})`;
      }
      setError(vietnameseMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-md bg-white rounded-[32px] border-4 border-natural-border shadow-2xl overflow-hidden p-6 sm:p-8"
      >
        {/* Close Button */}
        <button 
          onClick={() => { playSound.click(); onClose(); }}
          className="absolute top-4 right-4 p-2 text-natural-muted hover:text-pink-600 rounded-full hover:bg-natural-soft transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Mascot & Welcome Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-16 h-16 bg-pink-100 border-2 border-pink-300 rounded-full mx-auto flex items-center justify-center text-3xl">
            🎓
          </div>
          <h3 className="text-2xl font-black text-natural-deep tracking-tight">
            {isSignUp ? "ĐĂNG KÝ TÀI KHOẢN" : "ĐĂNG NHẬP HỌC TẬP"}
          </h3>
          <p className="text-xs text-natural-muted font-medium px-4">
            {isSignUp 
              ? "Hãy tạo tài khoản để đồng bộ sổ tay, điểm số và chuỗi ngày học của em lên đám mây nhé!" 
              : "Chào em! Hãy đăng nhập để lưu trữ tiến trình học tập cùng Thầy Sơn."}
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-bold text-red-600 text-center animate-shake">
            ⚠️ {error}
            {showSuggestSignUp && (
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(true);
                  setShowSuggestSignUp(false);
                  setError(null);
                }}
                className="w-full mt-2.5 py-2 px-3 bg-pink-600 hover:bg-pink-700 text-white font-extrabold rounded-lg text-[11px] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>👉 Click để đăng ký tài khoản mới ngay</span>
              </button>
            )}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="space-y-1">
              <label className="text-xs font-black text-natural-deep block">Họ và tên của em:</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-natural-muted" />
                <input 
                  type="text" 
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn A"
                  className="w-full pl-10 pr-4 py-2.5 bg-natural-soft border border-natural-border rounded-xl text-sm font-semibold text-natural-deep placeholder:text-natural-muted/60 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-black text-natural-deep block">Email học tập:</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-natural-muted" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setShowSuggestSignUp(false);
                }}
                placeholder="ten-cua-em@gmail.com"
                className="w-full pl-10 pr-4 py-2.5 bg-natural-soft border border-natural-border rounded-xl text-sm font-semibold text-natural-deep placeholder:text-natural-muted/60 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-black text-natural-deep block">Mật khẩu:</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-natural-muted" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setShowSuggestSignUp(false);
                }}
                placeholder="Mật khẩu của em"
                className="w-full pl-10 pr-4 py-2.5 bg-natural-soft border border-natural-border rounded-xl text-sm font-semibold text-natural-deep placeholder:text-natural-muted/60 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-pink-600 hover:bg-pink-700 disabled:bg-pink-400 text-white font-extrabold rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Đang xử lý...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{isSignUp ? "Đăng Ký Ngay" : "Đăng Nhập"}</span>
              </>
            )}
          </button>
        </form>

        {/* OR Divider */}
        <div className="relative flex items-center justify-center my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-natural-border"></div>
          </div>
          <span className="relative px-3 bg-white text-[10px] font-black text-natural-muted uppercase tracking-wider">Hoặc</span>
        </div>

        {/* Google Sign-In Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full py-2.5 bg-white hover:bg-natural-soft border-2 border-natural-border text-natural-deep font-extrabold rounded-xl shadow-sm transition-all text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Tiếp tục với Google</span>
        </button>

        {/* Toggle Mode */}
        <div className="mt-6 text-center border-t border-natural-border pt-4">
          <button
            onClick={() => {
              playSound.click();
              setIsSignUp(!isSignUp);
              setError(null);
            }}
            className="text-xs text-pink-600 hover:text-pink-700 font-bold hover:underline cursor-pointer"
          >
            {isSignUp ? "Đã có tài khoản? Đăng nhập ngay" : "Chưa có tài khoản? Đăng ký học viên mới"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
