import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, Maximize2, Minimize2, RotateCcw, HelpCircle, Gamepad2, Compass, Shield } from "lucide-react";
import { playSound } from "../utils/audio";
import { UserProgress } from "../types";

interface SwordKyoto3DProps {
  onGoBack: () => void;
  progress?: UserProgress;
  updateProgress?: (updated: Partial<UserProgress>) => void;
}

export default function SwordKyoto3D({ onGoBack }: SwordKyoto3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Listen for message from iframe (e.g., EXIT_SWORD_GAME)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && (event.data.type === "EXIT_SWORD_GAME" || event.data.type === "EXIT_GAME")) {
        playSound.click();
        onGoBack();
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onGoBack]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    playSound.click();
    if (!containerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.warn("Fullscreen toggle failed:", err);
    }
  };

  const reloadGame = () => {
    playSound.click();
    if (iframeRef.current) {
      iframeRef.current.src = "/games/sword-kyoto-3d.html?t=" + Date.now();
    }
  };

  const handleBack = () => {
    playSound.click();
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    onGoBack();
  };

  return (
    <div
      ref={containerRef}
      className={`flex flex-col bg-[#070913] text-white transition-all ${
        isFullscreen
          ? "fixed inset-0 z-50 p-0 overflow-hidden"
          : "w-full rounded-2xl border-2 sm:border-4 border-[#1A1A1A] shadow-[4px_4px_0px_#8B0000] sm:shadow-[8px_8px_0px_#8B0000] overflow-hidden"
      }`}
    >
      {/* Top Controls Header Bar */}
      <div className="flex items-center justify-between gap-2 sm:gap-3 px-2 sm:px-5 py-1.5 sm:py-2.5 bg-[#0f1422] border-b border-amber-500/30 shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/80 hover:bg-red-900 border border-red-500/50 text-red-100 text-xs sm:text-sm font-black transition-all hover:scale-105 active:scale-95 shadow-sm shrink-0"
            title="Quay lại danh mục Trò chơi"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Thoát</span>
          </button>

          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xl sm:text-2xl shrink-0">⚔️</span>
            <div className="min-w-0">
              <h1 className="text-xs sm:text-base font-black text-amber-300 truncate tracking-wide">
                KIẾM THÁNH N5: THẾ GIỚI MỞ KYOTO 3D
              </h1>
              <p className="hidden md:block text-[11px] text-gray-400 font-medium">
                25 Bài Minna no Nihongo I · Nhập vai thế giới mở Kyoto 3D
              </p>
            </div>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={() => {
              playSound.click();
              setShowHelp(prev => !prev);
            }}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all ${
              showHelp
                ? "bg-amber-500 text-slate-950 border-amber-300"
                : "bg-slate-800/80 hover:bg-slate-700 text-amber-200 border-amber-500/30"
            }`}
            title="Hướng dẫn phím tắt và mẹo chơi"
          >
            <HelpCircle className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">Phím Tắt</span>
          </button>

          <button
            onClick={reloadGame}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-600/50 text-gray-200 text-xs font-bold transition-all hover:scale-105"
            title="Làm mới game"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-all hover:scale-105 active:scale-95 shadow-md"
            title={isFullscreen ? "Thu nhỏ màn hình" : "Phóng to toàn màn hình"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{isFullscreen ? "Thu nhỏ" : "Toàn màn hình"}</span>
          </button>
        </div>
      </div>

      {/* Quick Help Modal Banner */}
      {showHelp && (
        <div className="bg-slate-900/95 border-b border-amber-500/40 p-4 text-xs sm:text-sm text-gray-200 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between font-black text-amber-300 text-sm border-b border-slate-800 pb-2">
            <span className="flex items-center gap-2">
              <Gamepad2 className="w-4 h-4 text-amber-400" /> HƯỚNG DẪN THAO TÁC & CHIẾN ĐẤU (THẾ GIỚI MỞ KYOTO 3D)
            </span>
            <button
              onClick={() => setShowHelp(false)}
              className="text-gray-400 hover:text-white px-2 py-0.5 rounded-lg bg-slate-800"
            >
              ✕ Đóng
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-2.5 bg-slate-950/70 rounded-xl border border-slate-800 space-y-1.5">
              <div className="font-bold text-amber-400 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" /> Điều khiển di chuyển
              </div>
              <ul className="list-disc list-inside space-y-1 text-gray-300 text-xs">
                <li><strong className="text-white">W, A, S, D</strong> hoặc phím mũi tên: Di chuyển</li>
                <li><strong className="text-white">Chuột kéo</strong>: Xoay góc nhìn camera xung quanh</li>
                <li><strong className="text-white">Lăn chuột</strong>: Phóng to / Thu nhỏ camera</li>
                <li><strong className="text-white">V</strong>: Đổi góc nhìn (Góc nhìn vai / Góc nhìn xa)</li>
              </ul>
            </div>

            <div className="p-2.5 bg-slate-950/70 rounded-xl border border-slate-800 space-y-1.5">
              <div className="font-bold text-red-400 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" /> Chiến đấu & Tiêu diệt Võ Sĩ
              </div>
              <ul className="list-disc list-inside space-y-1 text-gray-300 text-xs">
                <li><strong className="text-white">J / Click Trái</strong>: Trảm Katana combo 3 thức (Tự áp sát)</li>
                <li><strong className="text-white">K / Chuột Phải</strong>: Thần Cung tự đuổi mục tiêu</li>
                <li><strong className="text-white">Phím Cách (Space)</strong>: Nhảy né sóng xung kích</li>
                <li><strong className="text-white">Shift</strong>: Lướt tốc biến · <strong className="text-white">Q</strong>: Tuyệt kỹ Nộ</li>
              </ul>
            </div>

            <div className="p-2.5 bg-slate-950/70 rounded-xl border border-slate-800 space-y-1.5">
              <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                <Gamepad2 className="w-3.5 h-3.5" /> Tiện ích & Hỗ trợ học tập
              </div>
              <ul className="list-disc list-inside space-y-1 text-gray-300 text-xs">
                <li><strong className="text-white">Tab</strong>: Khóa mục tiêu · <strong className="text-white">G</strong>: Gió dẫn đường</li>
                <li><strong className="text-white">F</strong>: Giải ấn bia đền cổ (+30 HP & +50 Vàng)</li>
                <li><strong className="text-white">M</strong>: Mở Bản Đồ Lớn & Dịch chuyển tức thời</li>
                <li><strong className="text-white">Chạm nhân vật 3D</strong>: Tự động chạy tới và trảm!</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Main 3D Game Frame */}
      <div
        className={`relative w-full overflow-hidden ${
          isFullscreen
            ? "flex-1 h-[calc(100dvh-42px)] sm:h-[calc(100dvh-54px)]"
            : "h-[65vh] sm:h-[75vh] min-h-[300px] sm:min-h-[460px] md:min-h-[560px] lg:min-h-[640px] max-h-[92dvh]"
        }`}
      >
        <iframe
          ref={iframeRef}
          src="/games/sword-kyoto-3d.html?v=20261112"
          title="Kiếm Thánh N5 Thế Giới Mở Kyoto 3D"
          className="w-full h-full border-0 bg-[#070913]"
          allow="autoplay; fullscreen; microphone; camera"
          sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-downloads allow-pointer-lock"
        />
      </div>
    </div>
  );
}
