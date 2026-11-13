import React from "react";
import { playSound } from "../utils/audio";
import { ExternalLink, Play } from "lucide-react";

interface GamesTabProps {
  onNavigate: (tab: string) => void;
}

export default function GamesTab({ onNavigate }: GamesTabProps) {
  const handleBuiltInPlay = (tab: string) => {
    playSound.click();
    onNavigate(tab);
  };

  const handleExternalPlay = (url: string) => {
    playSound.click();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div id="games-tab-container" className="space-y-16">
      {/* Immersive Editorial Header Card */}
      <section className="flex flex-col md:flex-row items-stretch gap-8 lg:gap-10 bg-[#FFFDF9] dark:bg-[#1A1622] p-7 md:p-10 border-2 border-[#D4C3A3] dark:border-[#4A3D58] relative shadow-md rounded-3xl">
        <div className="hidden sm:block absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#9E4244]/60 dark:border-amber-500/50 rounded-tl-md"></div>
        <div className="hidden sm:block absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#9E4244]/60 dark:border-amber-500/50 rounded-tr-md"></div>
        <div className="hidden sm:block absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#9E4244]/60 dark:border-amber-500/50 rounded-bl-md"></div>
        <div className="hidden sm:block absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#9E4244]/60 dark:border-amber-500/50 rounded-br-md"></div>

        {/* Vintage Styled Stamp Circle */}
        <div className="w-40 h-40 sm:w-44 sm:h-44 flex-shrink-0 overflow-hidden flex items-center justify-center relative border-3 border-[#8B261D] dark:border-amber-500/70 rounded-full bg-[#2A0909] mx-auto md:mx-0 shadow-md">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transform scale-110">
            <circle cx="100" cy="100" r="100" fill="#2A0000" />
            <circle cx="100" cy="100" r="85" fill="#FF6B35" opacity="0.9" />
            <path d="M 50 80 Q 100 200 150 80 Q 100 50 50 80 Z" fill="#D32F2F" stroke="#000" strokeWidth="3" />
            <path d="M 60 70 Q 50 20 40 10 Q 70 30 75 60 Z" fill="#FFFDE7" stroke="#000" strokeWidth="2" />
            <path d="M 140 70 Q 150 20 160 10 Q 130 30 125 60 Z" fill="#FFFDE7" stroke="#000" strokeWidth="2" />
            <circle cx="80" cy="95" r="12" fill="#FFEB3B" stroke="#000" strokeWidth="2" />
            <circle cx="120" cy="95" r="12" fill="#FFEB3B" stroke="#000" strokeWidth="2" />
            <circle cx="80" cy="95" r="5" fill="#000" />
            <circle cx="120" cy="95" r="5" fill="#000" />
            <path d="M 70 125 Q 100 155 130 125" fill="none" stroke="#000" strokeWidth="4" />
            <text x="100" y="75" fontFamily="'Noto Serif JP', serif" fontSize="18" fill="#FFCC00" textAnchor="middle" fontWeight="900">GAME</text>
          </svg>
        </div>

        <div className="flex-1 flex flex-col justify-center text-center md:text-left space-y-4">
          <div className="hanko-seal px-3 py-1 text-xs font-black tracking-widest w-max mx-auto md:mx-0 bg-[#8B0000]/10">
            ĐẠO TRÀNG GIẢI TRÍ
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#2D241E] dark:text-[#FFF8EE] leading-tight" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            Trò Chơi Học Tập
          </h1>
          <p className="text-sm sm:text-base text-[#4A3F35] dark:text-[#DFD5C5] italic bg-[#FBF6EC] dark:bg-[#231D2D] border border-[#E5D7BC] dark:border-[#3D334A] rounded-2xl px-5 py-3 leading-relaxed">
            "Ngươi nghĩ học tiếng Nhật chỉ có sách vở ư? NGU NGỐC! Hãy thư giãn đầu óc với những trò chơi do chính tay ta thiết kế. Nhưng nhớ: chơi mà vẫn phải học, không thì TA SẼ ĐẾN TẬN NHÀ NGƯƠI!"
          </p>
        </div>

        {/* Vertical Japanese decorative element for desktop */}
        <div className="hidden lg:flex items-center border-l border-[#E0D2B8] dark:border-[#3A3142] pl-8 ml-2 select-none">
          <h2 className="tategaki text-3xl font-black text-[#8B261D] dark:text-amber-300 opacity-90" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            遊びながら学べ
          </h2>
        </div>
      </section>

      {/* Grid of games */}
      <section className="max-w-5xl mx-auto space-y-12">
        <div className="text-center">
          <div className="inline-block border-y-2 border-[#C5A059]/70 dark:border-amber-500/45 py-2 px-8">
            <h2 className="text-2xl sm:text-3xl font-black text-[#2D241E] dark:text-[#FFF8EE] tracking-wider uppercase" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              DANH MỤC TRÒ CHƠI
            </h2>
          </div>
        </div>

        <div id="games-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* GAME 1: KIẾM THÁNH N5: THẾ GIỚI MỞ KYOTO 3D */}
          <div 
            onClick={() => handleBuiltInPlay("sword-kyoto-3d")}
            className="game-card-active group h-full flex flex-col relative overflow-hidden rounded-2xl cursor-pointer border-2 border-amber-500/70 shadow-md hover:border-amber-500 dark:hover:border-amber-400"
          >
            <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
              <span className="text-[10px] font-black text-slate-950 px-2.5 py-0.5 rounded-md bg-amber-400 uppercase tracking-wider shadow-sm">
                3D SIÊU PHẨM
              </span>
            </div>
            <div className="absolute -top-10 -right-10 w-44 h-44 bg-amber-500/15 rounded-full blur-3xl group-hover:bg-amber-500/25 transition"></div>

            <div className="p-7 flex flex-col h-full relative z-10 justify-between">
              <div>
                <div className="w-16 h-16 border-2 border-amber-500 rounded-full flex items-center justify-center text-3xl mb-6 bg-[#FFF3D1] dark:bg-[#261D33] text-[#2D241E] dark:text-white group-hover:bg-amber-500 group-hover:text-slate-950 transition-all shadow-sm mx-auto lg:mx-0">
                  ⚔️
                </div>

                <h3 className="text-xl sm:text-2xl font-black mb-1 text-[#2D241E] dark:text-[#FFF8EE] game-title-glow tracking-tight">
                  KIẾM THÁNH N5: KYOTO 3D
                </h3>
                <p className="text-amber-700 dark:text-amber-400 text-xs font-bold tracking-widest mb-3 uppercase">
                  NHẬP VAI 3D · 25 BÀI MINNA I
                </p>

                <div className="h-0.5 w-12 bg-amber-500 dark:bg-amber-400 mb-5"></div>

                <p className="text-[#5A4D41] dark:text-[#D5C9B8] font-medium mb-6 text-sm leading-relaxed">
                  Phiêu lưu thế giới mở Kyoto 3D thời Edo: Chùa Chureito, Taiko-bashi, Rừng trúc Arashiyama. Vung kiếm Katana, bắn Cung Linh Hồn, diệt Yokai để thông thạo 500 từ vựng N5!
                </p>
              </div>

              <div className="mt-auto pt-4 border-t border-[#E6D5B8] dark:border-white/10 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-amber-800 dark:text-amber-300/90 font-bold">
                  <span>🎯 25 BÀI MINNA I (500 TỪ)</span>
                  <span>⚔️ CHIẾN ĐẤU 3D</span>
                  <span>👥 THẾ GIỚI MỞ</span>
                </div>

                <button
                  type="button"
                  className="btn-play-now inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-black hover:brightness-105 transition-all w-full uppercase tracking-wider text-sm rounded-xl shadow-sm cursor-pointer"
                >
                  <span>▶ Vào Thế Giới Mở</span>
                  <Play className="w-4 h-4 fill-current" />
                </button>
              </div>
            </div>
          </div>

          {/* GAME 2: SONKURO DRIFT */}
          <div 
            onClick={() => handleBuiltInPlay("drift")}
            className="game-card-active group h-full flex flex-col relative overflow-hidden rounded-2xl cursor-pointer"
          >
            <div className="absolute top-3 right-3 z-10">
              <span className="text-[10px] font-black text-[#FFFDF7] px-2.5 py-0.5 rounded-md bg-[#9A3412] dark:bg-[#B45309] uppercase tracking-wider border border-orange-300/30">
                BẢN ĐỊA
              </span>
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#EA580C]/10 rounded-full blur-3xl group-hover:bg-[#EA580C]/20 transition"></div>

            <div className="p-7 flex flex-col h-full relative z-10 justify-between">
              <div>
                <div className="w-16 h-16 border-2 border-[#D95B26] dark:border-[#EA580C] rounded-full flex items-center justify-center text-3xl mb-6 bg-[#FDEBE2] dark:bg-[#281C26] text-[#2D241E] dark:text-white group-hover:bg-[#EA580C] group-hover:text-white transition-all shadow-sm mx-auto lg:mx-0">
                  🏎️
                </div>

                <h3 className="text-xl sm:text-2xl font-black mb-1 text-[#2D241E] dark:text-[#FFF8EE] game-title-glow tracking-tight">
                  SONKURO DRIFT
                </h3>
                <p className="text-[#C2410C] dark:text-[#FB923C] text-xs font-bold tracking-widest mb-3 uppercase">
                  ĐUA XE · LUYỆN NGỮ PHÁP
                </p>

                <div className="h-0.5 w-12 bg-[#EA580C] dark:bg-[#FB923C] mb-5"></div>

                <p className="text-[#5A4D41] dark:text-[#CFC4B4] font-medium mb-6 text-sm leading-relaxed">
                  Đua xe tốc độ cao qua những con phố Tokyo. Mỗi cú va chạm là một thử thách ngữ pháp. Trả lời đúng để bứt phá tốc độ và rinh về điểm số kỷ lục!
                </p>
              </div>

              <div className="mt-auto pt-4 border-t border-[#EBD8CD] dark:border-white/10 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#6E5D4F] dark:text-[#B8AC9B] font-bold">
                  <span>🎯 N5-N1 · GRAMMAR</span>
                  <span>⏱️ ~5 phút/lượt</span>
                  <span>👥 1 người</span>
                </div>

                <button
                  type="button"
                  className="btn-play-now inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-[#C2410C] hover:bg-[#9A3412] text-[#FFFDF7] dark:bg-[#EA580C] dark:hover:bg-[#F97316] dark:text-slate-950 font-black transition-all w-full uppercase tracking-wider text-sm rounded-xl shadow-sm cursor-pointer"
                >
                  <span>▶ Bắt Đầu Đua</span>
                  <Play className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* GAME 3: HẠC TÔNG HÁN TỰ */}
          <div 
            onClick={() => handleBuiltInPlay("crane")}
            className="game-card-active group h-full flex flex-col relative overflow-hidden rounded-2xl cursor-pointer"
          >
            <div className="absolute top-3 right-3 z-10">
              <span className="text-[10px] font-black text-[#FFFDF7] px-2.5 py-0.5 rounded-md bg-[#9A3412] dark:bg-[#B45309] uppercase tracking-wider border border-orange-300/30">
                BẢN ĐỊA
              </span>
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#EA580C]/10 rounded-full blur-3xl group-hover:bg-[#EA580C]/20 transition"></div>

            <div className="p-7 flex flex-col h-full relative z-10 justify-between">
              <div>
                <div className="w-16 h-16 border-2 border-[#D95B26] dark:border-[#EA580C] rounded-full flex items-center justify-center text-3xl mb-6 bg-[#FDEBE2] dark:bg-[#281C26] text-[#2D241E] dark:text-white group-hover:bg-[#EA580C] group-hover:text-white transition-all shadow-sm mx-auto lg:mx-0">
                  🏮
                </div>

                <h3 className="text-xl sm:text-2xl font-black mb-1 text-[#2D241E] dark:text-[#FFF8EE] game-title-glow tracking-tight">
                  HẠC TÔNG HÁN TỰ
                </h3>
                <p className="text-[#C2410C] dark:text-[#FB923C] text-xs font-bold tracking-widest mb-3 uppercase">
                  BẮN HẠC · LUYỆN KANJI
                </p>

                <div className="h-0.5 w-12 bg-[#EA580C] dark:bg-[#FB923C] mb-5"></div>

                <p className="text-[#5A4D41] dark:text-[#CFC4B4] font-medium mb-6 text-sm leading-relaxed">
                  Bắn hạc giấy để thu thập Hán tự. Ghép đúng bộ thủ, nhận diện mặt chữ, vượt qua thử thách Kanji đầy mê hoặc. Nhanh tay lên, hạc không chờ đợi!
                </p>
              </div>

              <div className="mt-auto pt-4 border-t border-[#EBD8CD] dark:border-white/10 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#6E5D4F] dark:text-[#B8AC9B] font-bold">
                  <span>🎯 N5-N4 · KANJI</span>
                  <span>⏱️ ~5 phút/lượt</span>
                  <span>👥 1 người</span>
                </div>

                <button
                  type="button"
                  className="btn-play-now inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-[#C2410C] hover:bg-[#9A3412] text-[#FFFDF7] dark:bg-[#EA580C] dark:hover:bg-[#F97316] dark:text-slate-950 font-black transition-all w-full uppercase tracking-wider text-sm rounded-xl shadow-sm cursor-pointer"
                >
                  <span>▶ Bắt Đầu Bay</span>
                  <Play className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* GAME 4: TRẮC NGHIỆM ĐẤU TRÍ (Built-in) */}
          <div 
            onClick={() => handleBuiltInPlay("quiz")}
            className="game-card-active group h-full flex flex-col relative overflow-hidden rounded-2xl cursor-pointer"
          >
            <div className="absolute top-3 right-3 z-10">
              <span className="text-[10px] font-black text-[#FFFDF7] px-2.5 py-0.5 rounded-md bg-[#9A3412] dark:bg-[#B45309] uppercase tracking-wider border border-orange-300/30">
                BẢN ĐỊA
              </span>
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#EA580C]/10 rounded-full blur-3xl group-hover:bg-[#EA580C]/20 transition"></div>

            <div className="p-7 flex flex-col h-full relative z-10 justify-between">
              <div>
                <div className="w-16 h-16 border-2 border-[#D95B26] dark:border-[#EA580C] rounded-full flex items-center justify-center text-3xl mb-6 bg-[#FDEBE2] dark:bg-[#281C26] text-[#2D241E] dark:text-white group-hover:bg-[#EA580C] group-hover:text-white transition-all shadow-sm mx-auto lg:mx-0">
                  📝
                </div>

                <h3 className="text-xl sm:text-2xl font-black mb-1 text-[#2D241E] dark:text-[#FFF8EE] game-title-glow tracking-tight">
                  TRẮC NGHIỆM ĐẤU TRÍ
                </h3>
                <p className="text-[#C2410C] dark:text-[#FB923C] text-xs font-bold tracking-widest mb-3 uppercase">
                  TẬP PHẢN XẠ · CHỌN ĐÁP ÁN
                </p>

                <div className="h-0.5 w-12 bg-[#EA580C] dark:bg-[#FB923C] mb-5"></div>

                <p className="text-[#5A4D41] dark:text-[#CFC4B4] font-medium mb-6 text-sm leading-relaxed">
                  Vượt qua các câu hỏi trắc nghiệm tiếng Nhật được thiết lập từ vựng mưu mẹo, nhận điểm XP khổng lồ để thăng cấp danh vọng!
                </p>
              </div>

              <div className="mt-auto pt-4 border-t border-[#EBD8CD] dark:border-white/10 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#6E5D4F] dark:text-[#B8AC9B] font-bold">
                  <span>🎯 N5-N3 & PHỔ THÔNG</span>
                  <span>⏱️ Không giới hạn</span>
                  <span>👥 Trò chơi trí tuệ</span>
                </div>

                <button
                  type="button"
                  className="btn-play-now inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-[#C2410C] hover:bg-[#9A3412] text-[#FFFDF7] dark:bg-[#EA580C] dark:hover:bg-[#F97316] dark:text-slate-950 font-black transition-all w-full uppercase tracking-wider text-sm rounded-xl shadow-sm cursor-pointer"
                >
                  <span>🎮 Bắt Đầu Đấu</span>
                  <Play className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* GAME 5: GHÉP CẶP CHIẾN THUẬT (Built-in) */}
          <div 
            onClick={() => handleBuiltInPlay("match")}
            className="game-card-active group h-full flex flex-col relative overflow-hidden rounded-2xl cursor-pointer"
          >
            <div className="absolute top-3 right-3 z-10">
              <span className="text-[10px] font-black text-[#FFFDF7] px-2.5 py-0.5 rounded-md bg-[#9A3412] dark:bg-[#B45309] uppercase tracking-wider border border-orange-300/30">
                BẢN ĐỊA
              </span>
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#EA580C]/10 rounded-full blur-3xl group-hover:bg-[#EA580C]/20 transition"></div>

            <div className="p-7 flex flex-col h-full relative z-10 justify-between">
              <div>
                <div className="w-16 h-16 border-2 border-[#D95B26] dark:border-[#EA580C] rounded-full flex items-center justify-center text-3xl mb-6 bg-[#FDEBE2] dark:bg-[#281C26] text-[#2D241E] dark:text-white group-hover:bg-[#EA580C] group-hover:text-white transition-all shadow-sm mx-auto lg:mx-0">
                  🧩
                </div>

                <h3 className="text-xl sm:text-2xl font-black mb-1 text-[#2D241E] dark:text-[#FFF8EE] game-title-glow tracking-tight">
                  GHÉP CẶP CHIẾN THUẬT
                </h3>
                <p className="text-[#C2410C] dark:text-[#FB923C] text-xs font-bold tracking-widest mb-3 uppercase">
                  SỐNG CÒN · NHANH TAY LẸ MẮT
                </p>

                <div className="h-0.5 w-12 bg-[#EA580C] dark:bg-[#FB923C] mb-5"></div>

                <p className="text-[#5A4D41] dark:text-[#CFC4B4] font-medium mb-6 text-sm leading-relaxed">
                  Tìm các cặp Kanji / Kana đồng nghĩa và ghép chúng lại trong thời gian ngắn nhất. Thách thức đỉnh cao phản xạ thần tốc!
                </p>
              </div>

              <div className="mt-auto pt-4 border-t border-[#EBD8CD] dark:border-white/10 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#6E5D4F] dark:text-[#B8AC9B] font-bold">
                  <span>🎯 TẬP KANJI & KANA</span>
                  <span>⏱️ Đếm giây khốc liệt</span>
                  <span>👥 Rèn tinh thần thép</span>
                </div>

                <button
                  type="button"
                  className="btn-play-now inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-[#C2410C] hover:bg-[#9A3412] text-[#FFFDF7] dark:bg-[#EA580C] dark:hover:bg-[#F97316] dark:text-slate-950 font-black transition-all w-full uppercase tracking-wider text-sm rounded-xl shadow-sm cursor-pointer"
                >
                  <span>🎮 Bắt Đầu Đấu</span>
                  <Play className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* GAME 6: ??? BÍ MẬT ??? (Locked) */}
          <div className="card-locked group h-full relative overflow-hidden rounded-2xl bg-[#F6F0E6] dark:bg-[#17131E] border-2 border-dashed border-[#C7B99E] dark:border-[#40364D] p-8 flex flex-col items-center justify-center text-center space-y-4 opacity-90 transition-all hover:opacity-100 hover:-translate-y-0.5">
            <div className="absolute top-3 right-3 z-10">
              <span className="tag-dev">ĐANG CODE</span>
            </div>
            <div className="w-16 h-16 border-2 border-dashed border-[#B8A98E] dark:border-[#4A3F58] rounded-full flex items-center justify-center text-3xl mb-2 text-[#7A6B5D] dark:text-[#9E92A8] bg-[#EDE5D5] dark:bg-[#211B2B] mx-auto">
              🔒
            </div>
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-black text-[#4A3F35] dark:text-[#D9CEBE] tracking-tight" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                ??? BÍ MẬT ???
              </h3>
              <div className="h-0.5 w-12 bg-[#C7B99E] dark:bg-[#4A3F58] mx-auto"></div>
            </div>
            <p className="text-xs text-[#6E5F51] dark:text-[#AFA3B8] font-semibold italic max-w-xs leading-relaxed">
              "Đừng tò mò! Ta đang ủ một trò còn độc ác hơn cả Sonkuro Drift. Hãy kiên nhẫn, kẻ yếu đuối!"
            </p>
            <div className="w-full py-2.5 bg-[#E3D9C6] text-[#6E5F51] dark:bg-[#262030] dark:text-[#A598AC] text-xs font-black rounded-xl uppercase tracking-wider cursor-not-allowed">
              Sắp Ra Mắt
            </div>
          </div>

          {/* GAME 7: ??? HUYỀN THOẠI ??? (Locked) */}
          <div className="card-locked group h-full relative overflow-hidden rounded-2xl bg-[#F6F0E6] dark:bg-[#17131E] border-2 border-dashed border-[#C7B99E] dark:border-[#40364D] p-8 flex flex-col items-center justify-center text-center space-y-4 opacity-90 transition-all hover:opacity-100 hover:-translate-y-0.5">
            <div className="absolute top-3 right-3 z-10">
              <span className="tag-soon">LÊN KẾ HOẠCH</span>
            </div>
            <div className="w-16 h-16 border-2 border-dashed border-[#B8A98E] dark:border-[#4A3F58] rounded-full flex items-center justify-center text-3xl mb-2 text-[#7A6B5D] dark:text-[#9E92A8] bg-[#EDE5D5] dark:bg-[#211B2B] mx-auto">
              🔮
            </div>
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-black text-[#4A3F35] dark:text-[#D9CEBE] tracking-tight" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                ??? HUYỀN THOẠI ???
              </h3>
              <div className="h-0.5 w-12 bg-[#C7B99E] dark:bg-[#4A3F58] mx-auto"></div>
            </div>
            <p className="text-xs text-[#6E5F51] dark:text-[#AFA3B8] font-semibold italic max-w-xs leading-relaxed">
              "Một tựa game huyền thoại sắp ra đời. Ngươi sẽ phải dùng cả Hán tự lẫn ngữ pháp để sinh tồn!"
            </p>
            <div className="w-full py-2.5 bg-[#E3D9C6] text-[#6E5F51] dark:bg-[#262030] dark:text-[#A598AC] text-xs font-black rounded-xl uppercase tracking-wider cursor-not-allowed">
              Sắp Ra Mắt
            </div>
          </div>

        </div>
      </section>

      {/* traditional footer note block */}
      <section className="max-w-3xl mx-auto bg-[#FFFDF9] dark:bg-[#1A1622] p-8 border-2 border-[#D4C3A3] dark:border-[#4A3D58] relative shadow-md rounded-3xl mt-12">
        <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-[#8B261D] dark:bg-[#9A3412] text-[#FFFDF7] px-6 py-1.5 font-black text-xs tracking-widest uppercase rounded-full shadow-sm" style={{ fontFamily: "'Noto Serif JP', serif" }}>
          LỜI NHẮN TỪ THẦY SƠN
        </div>
        
        <div className="pt-4 space-y-6">
          <p className="text-base sm:text-lg text-[#4A3F35] dark:text-[#E2D8C8] italic leading-relaxed text-center">
            "Không khoan nhượng với sự lười biếng. Kể cả trong lúc chơi game!"
          </p>
          
          <div className="flex items-center justify-end gap-3">
            <div className="text-right">
              <p className="font-black text-[#8B261D] dark:text-amber-300" style={{ fontFamily: "'Noto Serif JP', serif" }}>Thầy Sơn</p>
              <p className="text-xs text-[#6E5F51] dark:text-[#C7BBA8]">Giáo viên tiếng Nhật</p>
            </div>
            <div className="w-14 h-14 border-2 border-[#8B261D] dark:border-amber-500/70 rounded-full flex items-center justify-center bg-[#8B261D]/10 dark:bg-amber-500/15 text-[#8B261D] dark:text-amber-300 font-black text-lg">
              山
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
