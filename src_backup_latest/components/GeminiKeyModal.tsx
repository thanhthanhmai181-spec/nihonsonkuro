import React, { useState, useEffect } from "react";
import { Key, X, ExternalLink, Check, Trash2, ShieldCheck } from "lucide-react";
import { getCustomGeminiKey, setCustomGeminiKey } from "../utils/geminiKey";
import { playSound } from "../utils/audio";

interface GeminiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeySaved?: () => void;
}

export default function GeminiKeyModal({ isOpen, onClose, onKeySaved }: GeminiKeyModalProps) {
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setApiKey(getCustomGeminiKey());
      setSavedSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    playSound.click();
    setCustomGeminiKey(apiKey);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      if (onKeySaved) onKeySaved();
      onClose();
    }, 1000);
  };

  const handleClear = () => {
    playSound.click();
    setApiKey("");
    setCustomGeminiKey("");
    if (onKeySaved) onKeySaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-rose-100">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-pink-500 to-rose-400 text-white shadow-md">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Cấu hình Gemini API Key cá nhân</h3>
            <p className="text-xs text-gray-500">Dùng API Key riêng để sở hữu hạn mức cao nhất & không bị dùng chung</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl bg-amber-50 p-3.5 border border-amber-200/80 text-xs text-amber-900 leading-relaxed">
            <div className="font-semibold flex items-center gap-1.5 mb-1 text-amber-950">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
              Cách lấy API Key Gemini Miễn Phí (Free Tier):
            </div>
            <ol className="list-decimal pl-4 space-y-1 text-amber-900/90">
              <li>Mở trang Google AI Studio: <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="font-bold underline inline-flex items-center gap-0.5 text-pink-600 hover:text-pink-700">aistudio.google.com/app/apikey <ExternalLink className="w-3 h-3" /></a></li>
              <li>Đăng nhập tài khoản Google của bạn và bấm <strong>Create API Key</strong>.</li>
              <li>Sao chép mã API Key (bắt đầu bằng <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">AIzaSy...</code>) và dán vào ô bên dưới.</li>
            </ol>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Khóa API Gemini (API Key) của bạn:
            </label>
            <div className="relative">
              <input
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm font-mono focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all pr-20"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 text-xs font-semibold text-gray-500 hover:text-gray-700"
              >
                {showKey ? "Ẩn" : "Hiện"}
              </button>
            </div>
            <p className="mt-1 text-[11px] text-gray-400">
              * Khóa được lưu trực tiếp và an toàn trên thiết bị của bạn (localStorage), không gửi đi đâu khác.
            </p>
          </div>

          {savedSuccess && (
            <div className="flex items-center gap-2 rounded-lg bg-emerald-50 p-2.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
              <Check className="w-4 h-4 text-emerald-600" />
              Đã lưu API Key cá nhân thành công!
            </div>
          )}

          <div className="flex items-center justify-between pt-2 gap-2">
            {getCustomGeminiKey() ? (
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" /> Xóa key (Dùng lại hệ thống)
              </button>
            ) : <div />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-all"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="rounded-xl bg-pink-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-pink-700 transition-all"
              >
                Lưu & Sử dụng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
