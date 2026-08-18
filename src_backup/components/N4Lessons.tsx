import React from "react";
import { playSound } from "../utils/audio";
import { ArrowLeft, ExternalLink } from "lucide-react";

interface N4LessonsProps {
  onGoBack: () => void;
  onNavigate: (tab: string) => void;
}

export default function N4Lessons({ onGoBack, onNavigate }: N4LessonsProps) {
  const books = [
    {
      id: 1,
      title: "Từ Vựng N4",
      volume: "Quyển I",
      symbol: "詞",
      desc: "Nâng cấp kho vũ khí. Những từ vựng sắc bén hơn đang chờ ngươi thu thập.",
      url: "https://sites.google.com/view/lopthayson/n4/t%E1%BB%AB-v%E1%BB%B1ng-n4?authuser=0",
    },
    {
      id: 2,
      title: "Ngữ Pháp N4",
      volume: "Quyển II",
      symbol: "法",
      desc: "Trận pháp cao cấp. Đừng để sự phức tạp của nó làm ngươi chùn bước.",
      url: "https://sites.google.com/view/lopthayson/n4/ng%E1%BB%AF-ph%C3%A1p-n4?authuser=0",
    },
    {
      id: 3,
      title: "Hán Tự N4",
      volume: "Quyển III",
      symbol: "漢",
      desc: "Những ấn chú mạnh mẽ hơn. Học cách khắc chúng vào bộ nhớ của ngươi.",
      url: "https://sites.google.com/view/lopthayson/n4/h%C3%A1n-t%E1%BB%B1-n4?authuser=0",
    },
    {
      id: 4,
      title: "Chia Thể Động Từ",
      volume: "Quyển IV",
      symbol: "変",
      desc: "Kỹ thuật biến hóa bậc cao. Thành thạo nó để linh hoạt trong mọi trận chiến.",
      url: "https://sites.google.com/view/lopthayson/n4/chia-%C4%91%E1%BB%99ng-t%E1%BB%AB?authuser=0",
    },
    {
      id: 5,
      title: "Luyện Thi JLPT",
      volume: "Quyển V",
      symbol: "試",
      desc: "Thử thách bản thân với những đề thi thực tế. Đánh giá sức mạnh trước trận chiến cuối cùng.",
      url: "https://sites.google.com/view/lopthayson/n4/thi-th%E1%BB%AD-n4",
    },
  ];

  const handleBookClick = (book: any) => {
    playSound.click();
    if (book.id === 1) {
      onNavigate("n4-vocab-lessons");
    } else if (book.id === 2) {
      onNavigate("n4-grammar-lessons");
    } else if (book.id === 3) {
      onNavigate("n4-kanji-lessons");
    } else if (book.id === 4) {
      onNavigate("n4-verb-conjugation-lessons");
    } else if (book.id === 5) {
      onNavigate("n4-jlpt-exam");
    } else {
      window.open(book.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="washi-pattern min-h-screen p-4 sm:p-8 -mx-4 sm:-mx-8 rounded-[40px] border-2 border-[#1A1A1A] text-[#1A1A1A]" style={{ fontFamily: "'Lora', 'Noto Serif JP', serif" }}>
      {/* Navigation Sub-bar */}
      <div className="flex justify-between items-center mb-8 border-b-2 border-[#1A1A1A] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 border-2 border-[#1A1A1A] bg-[#1A1A1A] rounded flex items-center justify-center text-white font-black text-lg" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            山
          </div>
          <span className="text-lg font-black tracking-widest text-[#1A1A1A]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            ĐẠO TRÀNG N4
          </span>
        </div>
        <button
          onClick={() => {
            playSound.click();
            onGoBack();
          }}
          className="flex items-center gap-2 text-[#1A1A1A] font-bold hover:text-[#8B0000] transition-colors border-2 border-[#1A1A1A] hover:border-[#8B0000] px-4 py-1.5 rounded-xl bg-white shadow-[3px_3px_0px_#1A1A1A] hover:shadow-[3px_3px_0px_#8B0000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Trở về Khóa học</span>
        </button>
      </div>

      {/* Hero Welcome Section */}
      <section className="mb-16 flex flex-col md:flex-row items-stretch gap-8 md:gap-10 bg-white p-6 sm:p-8 md:p-10 border-4 border-[#1A1A1A] relative shadow-[8px_8px_0px_#8B0000] rounded-2xl">
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#8B0000]"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#8B0000]"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#8B0000]"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#8B0000]"></div>

        {/* Demon Head Avatar */}
        <div className="w-40 h-40 flex-shrink-0 overflow-hidden flex items-center justify-center relative border-4 border-[#8B0000] rounded-full bg-[#1A0000] mx-auto md:mx-0 shadow-inner">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transform scale-110">
            <circle cx="100" cy="100" r="100" fill="#2A0000" />
            <circle cx="100" cy="100" r="85" fill="#8B0000" />
            <path d="M 50 80 Q 100 200 150 80 Q 100 50 50 80 Z" fill="#D32F2F" stroke="#000" strokeWidth="3"/>
            <path d="M 60 70 Q 50 20 40 10 Q 70 30 75 60 Z" fill="#FFFDE7" stroke="#000" strokeWidth="2"/>
            <path d="M 140 70 Q 150 20 160 10 Q 130 30 125 60 Z" fill="#FFFDE7" stroke="#000" strokeWidth="2"/>
            <path d="M 65 95 Q 80 85 90 95 Q 80 100 65 95 Z" fill="#FFEB3B" stroke="#000" strokeWidth="2"/>
            <path d="M 135 95 Q 120 85 110 95 Q 120 100 135 95 Z" fill="#FFEB3B" stroke="#000" strokeWidth="2"/>
            <path d="M 70 120 Q 100 140 130 120" fill="none" stroke="#000" strokeWidth="4"/>
            <path d="M 75 125 L 80 135 L 85 127" fill="#FFF" stroke="#000" strokeWidth="1"/>
            <path d="M 125 125 L 120 135 L 115 127" fill="#FFF" stroke="#000" strokeWidth="1"/>
            <text x="100" y="70" fontFamily="'Noto Serif JP', serif" fontSize="20" fill="#FFCC00" textAnchor="middle" fontWeight="900">山</text>
          </svg>
        </div>

        {/* Level Details */}
        <div className="flex-1 flex flex-col justify-center text-center md:text-left space-y-4">
          <div className="hanko-seal px-4 py-1 text-xs font-black tracking-widest w-max mx-auto md:mx-0 bg-[#8B0000]/10 border-2 border-[#8B0000]">
            CẤP ĐỘ N4
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1A1A1A] leading-tight" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            Cửa Ải Rèn Đúc
          </h1>
          <p className="text-base sm:text-lg text-gray-700 italic border-l-4 border-[#8B0000] pl-4 sm:pl-5 leading-relaxed bg-gray-50/50 py-2">
            "Ngươi vượt qua được N5 và nghĩ mình đã giỏi? Thật ngây thơ! N4 mới là hố sâu thực sự. Ở đây, ta sẽ tôi luyện ngươi bằng những ngữ pháp phức tạp và hàng tá Hán tự khó nhằn. Kẻ yếu đuối hãy quay đầu ngay bây giờ!"
          </p>
        </div>

        {/* Vertical Kanji Accent for desktop */}
        <div className="hidden lg:flex items-center border-l-2 border-[#1A1A1A] pl-8 ml-4 select-none">
          <h2 className="tategaki text-3xl font-black text-[#8B0000] opacity-95" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            精神を鍛えよ
          </h2>
        </div>
      </section>

      {/* Five Books Section */}
      <section className="max-w-5xl mx-auto space-y-8">
        <div className="text-center">
          <div className="inline-block border-y-2 border-[#1A1A1A] py-2 px-8">
            <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] tracking-wider uppercase" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              NGŨ ĐẠI BÍ KÍP N4
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {books.map((book) => (
            <div
              key={book.id}
              onClick={() => handleBookClick(book)}
              className="card-antique group flex flex-col relative overflow-hidden cursor-pointer rounded-2xl w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm"
            >
              {/* Volume Tag */}
              <div className="absolute top-0 right-0 bg-[#8B0000] text-white text-[10px] sm:text-xs font-bold px-3 py-1 transform translate-x-2 -translate-y-0.5 shadow-md">
                {book.volume}
              </div>

              <div className="p-6 sm:p-8 flex flex-col items-center text-center h-full space-y-4">
                {/* Kanji Badge representation */}
                <div 
                  className="w-16 h-16 border-2 border-[#1A1A1A] rounded-full flex items-center justify-center text-2xl font-serif font-black transition-all duration-300 group-hover:bg-[#8B0000] group-hover:text-white group-hover:border-[#8B0000] bg-[#FDFBF7]"
                  style={{ fontFamily: "'Noto Serif JP', serif" }}
                >
                  {book.symbol}
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-[#1A1A1A] tracking-tight" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                  {book.title}
                </h3>

                <div className="h-0.5 w-12 bg-[#8B0000]"></div>

                <p className="text-xs sm:text-sm text-gray-600 font-medium flex-grow leading-relaxed">
                  {book.desc}
                </p>

                <button
                  className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 border-2 border-[#1A1A1A] text-[#1A1A1A] font-bold group-hover:bg-[#1A1A1A] group-hover:text-white transition-all w-full uppercase tracking-wider text-xs rounded-xl mt-auto"
                >
                  <span>Mở Khóa Ấn</span>
                  {[1, 2, 3, 4, 5].includes(book.id) ? null : <ExternalLink className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Traditional Footer */}
      <footer className="border-t-4 border-[#8B0000] pt-8 pb-4 mt-20 text-center space-y-2">
        <p className="font-black text-lg tracking-widest uppercase" style={{ fontFamily: "'Noto Serif JP', serif" }}>
          LỚP HỌC THẦY SƠN
        </p>
        <p className="text-gray-500 text-xs italic font-semibold">
          Không khoan nhượng với sự lười biếng.
        </p>
      </footer>
    </div>
  );
}
