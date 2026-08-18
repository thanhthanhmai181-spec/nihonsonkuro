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
      <section className="flex flex-col md:flex-row items-stretch gap-10 bg-white p-8 md:p-12 border-4 border-[#1A1A1A] relative shadow-[8px_8px_0px_#8B0000] rounded-2xl">
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#8B0000]"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#8B0000]"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#8B0000]"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#8B0000]"></div>

        {/* Vintage Styled Stamp Circle */}
        <div className="w-48 h-48 flex-shrink-0 overflow-hidden flex items-center justify-center relative border-4 border-[#8B0000] rounded-full bg-[#1A0000] mx-auto md:mx-0 shadow-inner">
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1A1A1A] leading-tight" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            Trò Chơi Học Tập
          </h1>
          <p className="text-base sm:text-lg text-gray-700 italic border-l-4 border-[#8B0000] pl-5 leading-relaxed bg-gray-50/50 py-2">
            "Ngươi nghĩ học tiếng Nhật chỉ có sách vở ư? NGU NGỐC! Hãy thư giãn đầu óc với những trò chơi do chính tay ta thiết kế. Nhưng nhớ: chơi mà vẫn phải học, không thì TA SẼ ĐẾN TẬN NHÀ NGƯƠI!"
          </p>
        </div>

        {/* Vertical Japanese decorative element for desktop */}
        <div className="hidden lg:flex items-center border-l-2 border-[#1A1A1A] pl-8 ml-4 select-none">
          <h2 className="tategaki text-3xl font-black text-[#8B0000] opacity-90" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            遊びながら学べ
          </h2>
        </div>
      </section>

      {/* Grid of games */}
      <section className="max-w-5xl mx-auto space-y-12">
        <div className="text-center">
          <div className="inline-block border-y-2 border-[#1A1A1A] py-2 px-8">
            <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] tracking-wider uppercase" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              DANH MỤC TRÒ CHƠI
            </h2>
          </div>
        </div>

        <div id="games-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* GAME 1: SONKURO DRIFT */}
          <div 
            onClick={() => handleBuiltInPlay("drift")}
            className="game-card-active group h-full flex flex-col relative overflow-hidden rounded-2xl cursor-pointer"
          >
            <div className="absolute top-3 right-3 z-10">
              <span className="text-[10px] font-black text-white px-2 py-0.5 rounded bg-pink-600 uppercase tracking-wider">
                BẢN ĐỊA
              </span>
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FF6B35] opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition"></div>

            <div className="p-8 flex flex-col h-full relative z-10 justify-between">
              <div>
                <div className="w-16 h-16 border-2 border-[#FF6B35] rounded-full flex items-center justify-center text-3xl mb-6 text-white group-hover:bg-[#FF6B35] transition-all group-hover:shadow-lg group-hover:shadow-[#FF6B35]/30 bg-[#1a1a2e] mx-auto lg:mx-0">
                  🏎️
                </div>

                <h3 className="text-xl sm:text-2xl font-black mb-1 text-white game-title-glow tracking-tight">
                  SONKURO DRIFT
                </h3>
                <p className="text-[#FF6B35] text-xs font-bold tracking-widest mb-3 uppercase">
                  ĐUA XE · LUYỆN NGỮ PHÁP
                </p>

                <div className="h-0.5 w-12 bg-[#FF6B35] mb-5"></div>

                <p className="text-gray-400 font-medium mb-6 text-sm leading-relaxed">
                  Đua xe tốc độ cao qua những con phố Tokyo. Mỗi cú va chạm là một thử thách ngữ pháp. Trả lời đúng để bứt phá tốc độ và rinh về điểm số kỷ lục!
                </p>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-800 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500 font-bold">
                  <span>🎯 N5-N1 · GRAMMAR</span>
                  <span>⏱️ ~5 phút/lượt</span>
                  <span>👥 1 người</span>
                </div>

                <button
                  type="button"
                  className="btn-play-now inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-[#FF6B35] text-white font-bold hover:bg-[#FF8C5A] transition-all w-full uppercase tracking-wider text-sm rounded-xl"
                >
                  <span>▶ Bắt Đầu Đua</span>
                  <Play className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* GAME 2: HẠC TÔNG HÁN TỰ */}
          <div 
            onClick={() => handleBuiltInPlay("crane")}
            className="game-card-active group h-full flex flex-col relative overflow-hidden rounded-2xl cursor-pointer"
          >
            <div className="absolute top-3 right-3 z-10">
              <span className="text-[10px] font-black text-white px-2 py-0.5 rounded bg-pink-600 uppercase tracking-wider">
                BẢN ĐỊA
              </span>
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FF6B35] opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition"></div>

            <div className="p-8 flex flex-col h-full relative z-10 justify-between">
              <div>
                <div className="w-16 h-16 border-2 border-[#FF6B35] rounded-full flex items-center justify-center text-3xl mb-6 text-white group-hover:bg-[#FF6B35] transition-all group-hover:shadow-lg group-hover:shadow-[#FF6B35]/30 bg-[#1a1a2e] mx-auto lg:mx-0">
                  🏮
                </div>

                <h3 className="text-xl sm:text-2xl font-black mb-1 text-white game-title-glow tracking-tight">
                  HẠC TÔNG HÁN TỰ
                </h3>
                <p className="text-[#FF6B35] text-xs font-bold tracking-widest mb-3 uppercase">
                  BẮN HẠC · LUYỆN KANJI
                </p>

                <div className="h-0.5 w-12 bg-[#FF6B35] mb-5"></div>

                <p className="text-gray-400 font-medium mb-6 text-sm leading-relaxed">
                  Bắn hạc giấy để thu thập Hán tự. Ghép đúng bộ thủ, nhận diện mặt chữ, vượt qua thử thách Kanji đầy mê hoặc. Nhanh tay lên, hạc không chờ đợi!
                </p>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-800 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500 font-bold">
                  <span>🎯 N5-N4 · KANJI</span>
                  <span>⏱️ ~5 phút/lượt</span>
                  <span>👥 1 người</span>
                </div>

                <button
                  type="button"
                  className="btn-play-now inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-[#FF6B35] text-white font-bold hover:bg-[#FF8C5A] transition-all w-full uppercase tracking-wider text-sm rounded-xl"
                >
                  <span>▶ Bắt Đầu Bay</span>
                  <Play className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* GAME 3: TRẮC NGHIỆM ĐẤU TRÍ (Built-in) */}
          <div 
            onClick={() => handleBuiltInPlay("quiz")}
            className="game-card-active group h-full flex flex-col relative overflow-hidden rounded-2xl cursor-pointer"
          >
            <div className="absolute top-3 right-3 z-10">
              <span className="text-[10px] font-black text-white px-2 py-0.5 rounded bg-pink-600 uppercase tracking-wider">
                BẢN ĐỊA
              </span>
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FF6B35] opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition"></div>

            <div className="p-8 flex flex-col h-full relative z-10 justify-between">
              <div>
                <div className="w-16 h-16 border-2 border-[#FF6B35] rounded-full flex items-center justify-center text-3xl mb-6 text-white group-hover:bg-[#FF6B35] transition-all group-hover:shadow-lg group-hover:shadow-[#FF6B35]/30 bg-[#1a1a2e] mx-auto lg:mx-0">
                  📝
                </div>

                <h3 className="text-xl sm:text-2xl font-black mb-1 text-white game-title-glow tracking-tight">
                  TRẮC NGHIỆM ĐẤU TRÍ
                </h3>
                <p className="text-[#FF6B35] text-xs font-bold tracking-widest mb-3 uppercase">
                  TẬP PHẢN XẠ · CHỌN ĐÁP ÁN
                </p>

                <div className="h-0.5 w-12 bg-[#FF6B35] mb-5"></div>

                <p className="text-gray-400 font-medium mb-6 text-sm leading-relaxed">
                  Vượt qua các câu hỏi trắc nghiệm tiếng Nhật được thiết lập từ vựng mưu mẹo, nhận điểm XP khổng lồ để thăng cấp danh vọng!
                </p>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-800 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500 font-bold">
                  <span>🎯 N5-N3 & PHỔ THÔNG</span>
                  <span>⏱️ Không giới hạn</span>
                  <span>👥 Trò chơi trí tuệ</span>
                </div>

                <button
                  type="button"
                  className="btn-play-now inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-[#FF6B35] text-white font-bold hover:bg-[#FF8C5A] transition-all w-full uppercase tracking-wider text-sm rounded-xl"
                >
                  <span>🎮 Bắt Đầu Đấu</span>
                  <Play className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* GAME 4: GHÉP CẶP CHIẾN THUẬT (Built-in) */}
          <div 
            onClick={() => handleBuiltInPlay("match")}
            className="game-card-active group h-full flex flex-col relative overflow-hidden rounded-2xl cursor-pointer"
          >
            <div className="absolute top-3 right-3 z-10">
              <span className="text-[10px] font-black text-white px-2 py-0.5 rounded bg-pink-600 uppercase tracking-wider">
                BẢN ĐỊA
              </span>
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FF6B35] opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition"></div>

            <div className="p-8 flex flex-col h-full relative z-10 justify-between">
              <div>
                <div className="w-16 h-16 border-2 border-[#FF6B35] rounded-full flex items-center justify-center text-3xl mb-6 text-white group-hover:bg-[#FF6B35] transition-all group-hover:shadow-lg group-hover:shadow-[#FF6B35]/30 bg-[#1a1a2e] mx-auto lg:mx-0">
                  🧩
                </div>

                <h3 className="text-xl sm:text-2xl font-black mb-1 text-white game-title-glow tracking-tight">
                  GHÉP CẶP CHIẾN THUẬT
                </h3>
                <p className="text-[#FF6B35] text-xs font-bold tracking-widest mb-3 uppercase">
                  SỐNG CÒN · NHANH TAY LẸ MẮT
                </p>

                <div className="h-0.5 w-12 bg-[#FF6B35] mb-5"></div>

                <p className="text-gray-400 font-medium mb-6 text-sm leading-relaxed">
                  Tìm các cặp Kanji / Kana đồng nghĩa và ghép chúng lại trong thời gian ngắn nhất. Thách thức đỉnh cao phản xạ thần tốc!
                </p>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-800 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500 font-bold">
                  <span>🎯 TẬP KANJI & KANA</span>
                  <span>⏱️ Đếm giây khốc liệt</span>
                  <span>👥 Rèn tinh thần thép</span>
                </div>

                <button
                  type="button"
                  className="btn-play-now inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-[#FF6B35] text-white font-bold hover:bg-[#FF8C5A] transition-all w-full uppercase tracking-wider text-sm rounded-xl"
                >
                  <span>🎮 Bắt Đầu Đấu</span>
                  <Play className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* GAME 5: ??? BÍ MẬT ??? (Locked) */}
          <div className="card-locked group h-full flex flex-col relative overflow-hidden rounded-2xl bg-[#f5f0eb] border-2 border-dashed border-gray-400 p-8 flex flex-col items-center justify-center text-center space-y-4 opacity-70 transition-all hover:opacity-85 hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#bbb]">
            <div className="absolute top-3 right-3 z-10">
              <span className="tag-dev">ĐANG CODE</span>
            </div>
            <div className="w-16 h-16 border-2 border-dashed border-gray-400 rounded-full flex items-center justify-center text-3xl mb-6 text-gray-400 bg-gray-100 mx-auto">
              🔒
            </div>
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-black text-gray-500 tracking-tight" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                ??? BÍ MẬT ???
              </h3>
              <div className="h-0.5 w-12 bg-gray-400 mx-auto"></div>
            </div>
            <p className="text-xs text-gray-500 font-semibold italic max-w-xs leading-relaxed">
              "Đừng tò mò! Ta đang ủ một trò còn độc ác hơn cả Sonkuro Drift. Hãy kiên nhẫn, kẻ yếu đuối!"
            </p>
            <div className="w-full py-2.5 bg-gray-400 text-white text-xs font-black rounded-xl uppercase tracking-wider cursor-not-allowed">
              Sắp Ra Mắt
            </div>
          </div>

          {/* GAME 6: ??? HUYỀN THOẠI ??? (Locked) */}
          <div className="card-locked group h-full flex flex-col relative overflow-hidden rounded-2xl bg-[#f5f0eb] border-2 border-dashed border-gray-400 p-8 flex flex-col items-center justify-center text-center space-y-4 opacity-70 transition-all hover:opacity-85 hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#bbb]">
            <div className="absolute top-3 right-3 z-10">
              <span className="tag-soon">LÊN KẾ HOẠCH</span>
            </div>
            <div className="w-16 h-16 border-2 border-dashed border-gray-400 rounded-full flex items-center justify-center text-3xl mb-6 text-gray-400 bg-gray-100 mx-auto">
              🔮
            </div>
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-black text-gray-500 tracking-tight" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                ??? HUYỀN THOẠI ???
              </h3>
              <div className="h-0.5 w-12 bg-gray-400 mx-auto"></div>
            </div>
            <p className="text-xs text-gray-500 font-semibold italic max-w-xs leading-relaxed">
              "Một tựa game huyền thoại sắp ra đời. Ngươi sẽ phải dùng cả Hán tự lẫn ngữ pháp để sinh tồn!"
            </p>
            <div className="w-full py-2.5 bg-gray-400 text-white text-xs font-black rounded-xl uppercase tracking-wider cursor-not-allowed">
              Sắp Ra Mắt
            </div>
          </div>

        </div>
      </section>

      {/* traditional footer note block */}
      <section className="max-w-3xl mx-auto bg-white p-8 border-4 border-[#1A1A1A] relative shadow-[6px_6px_0px_#8B0000] rounded-2xl mt-12">
        <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-[#8B0000] text-white px-6 py-1.5 font-black text-xs tracking-widest uppercase rounded-md" style={{ fontFamily: "'Noto Serif JP', serif" }}>
          LỜI NHẮN TỪ THẦY SƠN
        </div>
        
        <div className="pt-4 space-y-6">
          <p className="text-base sm:text-lg text-gray-700 italic leading-relaxed text-center">
            "Không khoan nhượng với sự lười biếng. Kể cả trong lúc chơi game!"
          </p>
          
          <div className="flex items-center justify-end gap-3">
            <div className="text-right">
              <p className="font-black text-[#8B0000]" style={{ fontFamily: "'Noto Serif JP', serif" }}>Thầy Sơn</p>
              <p className="text-xs text-gray-500">Giáo viên tiếng Nhật</p>
            </div>
            <div className="w-16 h-16 border-2 border-[#8B0000] rounded-full flex items-center justify-center bg-[#8B0000]/10 text-[#8B0000] font-black text-lg">
              山
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
