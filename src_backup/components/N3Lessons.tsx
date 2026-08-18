import React, { useState } from "react";
import { playSound } from "../utils/audio";
import { ArrowLeft, ExternalLink } from "lucide-react";
import VocabN3Lessons from "./VocabN3Lessons";
import GrammarN3Lessons from "./GrammarN3Lessons";
import KanjiN3Lessons from "./KanjiN3Lessons";

interface N3LessonsProps {
  onGoBack: () => void;
  onNavigate: (tab: string) => void;
}

export default function N3Lessons({ onGoBack, onNavigate }: N3LessonsProps) {
  const [studyVocab, setStudyVocab] = useState<boolean>(false);
  const [studyGrammar, setStudyGrammar] = useState<boolean>(false);
  const [studyKanji, setStudyKanji] = useState<boolean>(false);

  const books = [
    {
      id: 1,
      title: "Từ Vựng N3",
      volume: "Quyển I",
      symbol: "詞",
      desc: "Hệ thống ngôn từ thâm sâu. Mỗi từ vựng là một đòn đánh hiểm hóc, hãy mài giũa cho sắc bén.",
      url: "https://sites.google.com/view/lopthayson/n3/t%E1%BB%AB-v%E1%BB%B1ng-n3?authuser=0",
    },
    {
      id: 2,
      title: "Ngữ Pháp N3",
      volume: "Quyển II",
      symbol: "法",
      desc: "Trận pháp vạn biến. Kẻ lĩnh ngộ được nó sẽ kiểm soát nhịp độ của toàn bộ trận chiến.",
      url: "https://sites.google.com/view/lopthayson/n3/ng%E1%BB%AF-ph%C3%A1p-n3?authuser=0",
    },
    {
      id: 3,
      title: "Hán Tự N3",
      volume: "Quyển III",
      symbol: "漢",
      desc: "Chân ngôn của người Nhật. Nắm được Hán tự là nắm được chìa khóa của sức mạnh tối thượng.",
      url: "https://sites.google.com/view/lopthayson/n3/h%C3%A1n-t%E1%BB%B1-n3?authuser=0",
    },
    {
      id: 4,
      title: "Thi Thử N3",
      volume: "Thử Thách",
      symbol: "試",
      desc: "Bước vào trận chiến thực sự. Thử sức với đề thi mô phỏng sát hạch thực tế, kiểm tra năng lực trước giờ khắc quyết định.",
      url: "https://sites.google.com/view/lopthayson/n3/thi-th%E1%BB%AD",
    },
  ];

  const handleBookClick = (book: typeof books[0]) => {
    playSound.click();
    if (book.id === 1) {
      setStudyVocab(true);
    } else if (book.id === 2) {
      setStudyGrammar(true);
    } else if (book.id === 3) {
      setStudyKanji(true);
    } else if (book.id === 4) {
      onNavigate("n3-jlpt-exam");
    } else {
      window.open(book.url, "_blank", "noopener,noreferrer");
    }
  };

  if (studyVocab) {
    return (
      <VocabN3Lessons 
        onGoBack={() => {
          playSound.click();
          setStudyVocab(false);
        }} 
      />
    );
  }

  if (studyGrammar) {
    return (
      <GrammarN3Lessons 
        onGoBack={() => {
          playSound.click();
          setStudyGrammar(false);
        }} 
      />
    );
  }

  if (studyKanji) {
    return (
      <KanjiN3Lessons 
        onGoBack={() => {
          playSound.click();
          setStudyKanji(false);
        }} 
      />
    );
  }

  return (
    <div className="washi-pattern min-h-screen p-4 sm:p-8 -mx-4 sm:-mx-8 rounded-[40px] border-2 border-[#1A1A1A] text-[#1A1A1A]" style={{ fontFamily: "'Lora', 'Noto Serif JP', serif" }}>
      {/* Navigation Sub-bar */}
      <div className="flex justify-between items-center mb-8 border-b-2 border-[#1A1A1A] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 border-2 border-[#1A1A1A] bg-[#1A1A1A] rounded flex items-center justify-center text-white font-black text-lg" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            山
          </div>
          <span className="text-lg font-black tracking-widest text-[#1A1A1A]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            ĐẠO TRÀNG N3
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
            CẤP ĐỘ N3
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1A1A1A] leading-tight" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            Cửa Ải Trung Cấp
          </h1>
          <p className="text-base sm:text-lg text-gray-700 italic border-l-4 border-[#8B0000] pl-4 sm:pl-5 leading-relaxed bg-gray-50/50 py-2">
            "Ngươi đã sống sót qua N4? Khá khen. Nhưng N3 không phải là trò trẻ con. Đây là ranh giới giữa kẻ nghiệp dư và một chiến binh thực thụ. Trút bỏ sự yếu đuối và chuẩn bị tinh thần đón nhận những thử thách khốc liệt nhất đi!"
          </p>
        </div>

        {/* Vertical Kanji Accent for desktop */}
        <div className="hidden lg:flex items-center border-l-2 border-[#1A1A1A] pl-8 ml-4 select-none">
          <h2 className="tategaki text-3xl font-black text-[#8B0000] opacity-95" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            限界を超えよ
          </h2>
        </div>
      </section>

      {/* Four Books Section */}
      <section className="max-w-5xl mx-auto space-y-8">
        <div className="text-center">
          <div className="inline-block border-y-2 border-[#1A1A1A] py-2 px-8">
            <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] tracking-wider uppercase" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              TỨ ĐẠI BÍ KÍP N3
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {books.map((book) => (
            <div
              key={book.id}
              onClick={() => handleBookClick(book)}
              className="card-antique group flex flex-col relative overflow-hidden cursor-pointer rounded-2xl w-full"
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
                  <span>{(book.id === 1 || book.id === 2 || book.id === 3) ? "Bắt Đầu Học 100%" : "Mở Khóa Ấn"}</span>
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
