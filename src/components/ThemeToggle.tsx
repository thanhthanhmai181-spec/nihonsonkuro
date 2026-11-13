import React from "react";
import { Moon, Sun, Sparkles } from "lucide-react";
import { playSound } from "../utils/audio";
import { motion } from "motion/react";

interface ThemeToggleProps {
  isNightMode: boolean;
  onToggle: () => void;
  className?: string;
  showLabel?: boolean;
}

export default function ThemeToggle({
  isNightMode,
  onToggle,
  className = "",
  showLabel = false
}: ThemeToggleProps) {
  const handleClick = () => {
    playSound.click();
    onToggle();
  };

  return (
    <button
      id="theme-toggle-btn"
      onClick={handleClick}
      aria-label={isNightMode ? "Chuyển sang Chế độ Ban ngày (Bạch Trà)" : "Chuyển sang Chế độ Ban đêm (Dạ Đăng Ám Vàng)"}
      title={isNightMode ? "Chuyển sang Ban ngày ☀️ (Bạch Trà Thanh Khiết)" : "Chuyển sang Ban đêm 🌙 (Dạ Đăng Ánh Vàng - Bảo Vệ Mắt)"}
      className={`group relative flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 select-none cursor-pointer border shadow-sm ${
        isNightMode
          ? "bg-[#1E1926] hover:bg-[#272132] text-amber-300 border-amber-500/40 hover:border-amber-400 shadow-amber-950/40"
          : "bg-amber-50/90 hover:bg-amber-100/90 text-amber-800 border-amber-200/80 hover:border-amber-300 shadow-amber-900/5"
      } ${className}`}
    >
      {/* Animated Icon Container */}
      <div className="relative w-5 h-5 flex items-center justify-center">
        <motion.div
          key={isNightMode ? "night" : "day"}
          initial={{ rotate: -90, scale: 0, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex items-center justify-center"
        >
          {isNightMode ? (
            <div className="relative flex items-center justify-center">
              <Moon className="w-4 h-4 text-amber-300 fill-amber-300/30 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1.5 -right-1.5 text-[9px] animate-pulse">🏮</span>
            </div>
          ) : (
            <div className="relative flex items-center justify-center">
              <Sun className="w-4 h-4 text-amber-600 fill-amber-400/40 group-hover:rotate-45 transition-transform duration-300" />
              <span className="absolute -bottom-1 -right-1 text-[9px]">☀️</span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Optional or Responsive Label */}
      <span className={`text-[11px] font-black tracking-tight ${showLabel ? "inline" : "hidden sm:inline"}`}>
        {isNightMode ? (
          <span className="text-amber-300 flex items-center gap-1">
            <span>Dạ Đăng</span>
            <span className="text-[10px] text-amber-400/80 font-normal">🌙</span>
          </span>
        ) : (
          <span className="text-amber-800 flex items-center gap-1">
            <span>Bạch Trà</span>
            <span className="text-[10px] text-amber-600 font-normal">☀️</span>
          </span>
        )}
      </span>
    </button>
  );
}
