import React, { useState } from "react";
import { playSound } from "../utils/audio";
import { ExternalLink } from "lucide-react";
import CountersHandbook from "./CountersHandbook";
import VerbHandbook from "./VerbHandbook";
import ParticlesHandbook from "./ParticlesHandbook";
import TranslationPractice from "./TranslationPractice";
import QuestionWordsHandbook from "./QuestionWordsHandbook";
import ListeningShadowing from "./ListeningShadowing";

export default function KnowledgeTab() {
  const [activeHandbook, setActiveHandbook] = useState<string | null>(null);

  const handbooks = [
    {
      title: "GÓC LUYỆN NGHE & SHADOWING",
      tag: "CỰC HOT",
      tagStyle: "tag-essential bg-pink-600 text-white font-black",
      icon: "🎧",
      sub: "LUYỆN NGHE · PHÁT ÂM",
      desc: "Luyện nghe thụ động (Podcast đụi) & đọc nhại Shadowing N5-N3 với kịch bản chạy Karaoke, điều chỉnh tốc độ, ghi âm giọng nói và tạo bài nghe AI mới cùng Thầy Sơn.",
      stats: ["🎙️ Shadowing AI", "⏱️ Đa tốc độ", "⭐ N5 · N4 · N3"],
      link: "listening_shadowing"
    },
    {
      title: "SỔ TAY SỐ ĐẾM TOÀN TẬP",
      tag: "THIẾT YẾU",
      tagStyle: "tag-essential",
      icon: "🔢",
      sub: "SỐ ĐẾM · NGỮ PHÁP",
      desc: "Tổng hợp đầy đủ cách đếm số trong tiếng Nhật: đếm người, vật, tuổi, thời gian, tiền bạc. Bảng counter (助数詞) chi tiết với ví dụ thực tế và mẹo ghi nhớ.",
      stats: ["📊 24+ Counter", "⏱️ 25 phút đọc", "⭐ Độ khó: Trung bình"],
      link: "https://sites.google.com/view/lopthayson/c%C3%B3-th%E1%BB%83-b%E1%BA%A1n-mu%E1%BB%91n-h%E1%BB%8Dc/s%E1%BB%91-%C4%91%E1%BA%BFm"
    },
    {
      title: "SỔ TAY TỰ - THA ĐỘNG TỪ",
      tag: "THỰC TẾ",
      tagStyle: "tag-practical",
      icon: "🔄",
      sub: "ĐỘNG TỪ · NGỮ PHÁP",
      desc: "Phân biệt rõ ràng tự động từ và tha động từ. Bảng so sánh 70 cặp động từ phổ biến nhất, quy tắc chuyển đổi và bài tập thực hành kèm đáp án chi tiết.",
      stats: ["📝 70 cặp từ", "⏱️ 30 phút đọc", "⭐ Độ khó: Khó"],
      link: "https://sites.google.com/view/lopthayson/c%C3%B3-th%E1%BB%83-b%E1%BA%A1n-mu%E1%BB%91n-h%E1%BB%8Dc/t%E1%BB%B1-tha-%C4%91%E1%BB%99ng-t%E1%BB%AB"
    },
    {
      title: "SỔ TAY TRỢ TỪ TIẾNG NHẬT",
      tag: "THIẾT YẾU",
      tagStyle: "tag-essential",
      icon: "🎯",
      sub: "TRỢ TỪ · NGỮ PHÁP",
      desc: "Tổng hợp toàn bộ trợ từ quan trọng: は、が、を、に、で、と、から、まで... kèm ví dụ minh họa và cách phân biệt các trợ từ dễ gây nhầm lẫn nhất.",
      stats: ["📚 15+ Trợ từ", "⏱️ 30 phút đọc", "⭐ Độ khó: Trung bình"],
      link: "https://sites.google.com/view/lopthayson/c%C3%B3-th%E1%BB%83-b%E1%BA%A1n-mu%E1%BB%91n-h%E1%BB%8Dc/tr%E1%BB%A3-t%E1%BB%AB"
    },
    {
      title: "LUYỆN DỊCH NHẬT - VIỆT",
      tag: "THỰC TẾ",
      tagStyle: "tag-practical",
      icon: "✍️",
      sub: "DỊCH THUẬT · KỸ NĂNG",
      desc: "Chuỗi bài tập luyện dịch từ cơ bản đến nâng cao, rèn luyện kỹ năng đọc hiểu và chuyển ngữ. Mỗi bài đều có phân tích chi tiết và bản dịch mẫu tham khảo.",
      stats: ["📄 20+ Bài dịch", "⏱️ 40 phút/bài", "⭐ Độ khó: Khó"],
      link: "https://sites.google.com/view/lopthayson/c%C3%B3-th%E1%BB%83-b%E1%BA%A1n-mu%E1%BB%91n-h%E1%BB%8Dc/luy%E1%BB%87n-d%E1%BB%8Bch"
    },
    {
      title: "TỪ ĐỂ HỎI TOÀN TẬP",
      tag: "THIẾT YẾU",
      tagStyle: "tag-essential",
      icon: "❓",
      sub: "TỪ VỰNG · GIAO TIẾP",
      desc: "Tổng hợp toàn diện 53 từ để hỏi trong tiếng Nhật: 何、誰、どこ、いつ... kèm cách sử dụng, mẫu câu thực tế, mẹo phân biệt và bài luyện tập phản xạ.",
      stats: ["🔤 53 Từ để hỏi", "⏱️ 25 phút đọc", "⭐ Độ khó: Dễ"],
      link: "https://sites.google.com/view/lopthayson/c%C3%B3-th%E1%BB%83-b%E1%BA%A1n-mu%E1%BB%91n-h%E1%BB%8Dc/t%E1%BB%AB-%C4%91%E1%BB%83-h%E1%BB%8Fi"
    }
  ];

  const handleCardClick = (hb: typeof handbooks[0]) => {
    playSound.click();
    if (hb.title === "GÓC LUYỆN NGHE & SHADOWING") {
      setActiveHandbook("listening_shadowing");
    } else if (hb.title === "SỔ TAY SỐ ĐẾM TOÀN TẬP") {
      setActiveHandbook("counters");
    } else if (hb.title === "SỔ TAY TỰ - THA ĐỘNG TỪ") {
      setActiveHandbook("verbs");
    } else if (hb.title === "SỔ TAY TRỢ TỪ TIẾNG NHẬT") {
      setActiveHandbook("particles");
    } else if (hb.title === "LUYỆN DỊCH NHẬT - VIỆT") {
      setActiveHandbook("translation");
    } else if (hb.title === "TỪ ĐỂ HỎI TOÀN TẬP") {
      setActiveHandbook("question_words");
    } else {
      window.open(hb.link, "_blank", "noopener,noreferrer");
    }
  };

  if (activeHandbook === "listening_shadowing") {
    return (
      <div id="knowledge-tab-container" className="space-y-6">
        <ListeningShadowing onGoBack={() => setActiveHandbook(null)} />
      </div>
    );
  }

  if (activeHandbook === "counters") {
    return (
      <div id="knowledge-tab-container" className="space-y-6">
        <CountersHandbook onGoBack={() => setActiveHandbook(null)} />
      </div>
    );
  }

  if (activeHandbook === "verbs") {
    return (
      <div id="knowledge-tab-container" className="space-y-6">
        <VerbHandbook onGoBack={() => setActiveHandbook(null)} />
      </div>
    );
  }

  if (activeHandbook === "particles") {
    return (
      <div id="knowledge-tab-container" className="space-y-6">
        <ParticlesHandbook onGoBack={() => setActiveHandbook(null)} />
      </div>
    );
  }

  if (activeHandbook === "translation") {
    return (
      <div id="knowledge-tab-container" className="space-y-6">
        <TranslationPractice onGoBack={() => setActiveHandbook(null)} />
      </div>
    );
  }

  if (activeHandbook === "question_words") {
    return (
      <div id="knowledge-tab-container" className="space-y-6">
        <QuestionWordsHandbook onBack={() => setActiveHandbook(null)} />
      </div>
    );
  }

  return (
    <div id="knowledge-tab-container" className="space-y-16">
      {/* Editorial Header Section */}
      <section className="flex flex-col md:flex-row items-stretch gap-10 bg-white p-8 md:p-12 border-4 border-[#1A1A1A] relative shadow-[8px_8px_0px_#8B0000] rounded-2xl">
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#8B0000]"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#8B0000]"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#8B0000]"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#8B0000]"></div>

        {/* Vintage Styled Stamp Circle */}
        <div className="w-48 h-48 flex-shrink-0 overflow-hidden flex items-center justify-center relative border-4 border-[#8B0000] rounded-full bg-[#1A0000] mx-auto md:mx-0 shadow-inner">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transform scale-110">
            <circle cx="100" cy="100" r="100" fill="#2A0000"/>
            <circle cx="100" cy="100" r="85" fill="#C5A059" opacity="0.9"/>
            <path d="M 70 60 L 100 130 L 130 60 Z" fill="#8B0000" stroke="#000" strokeWidth="3"/>
            <circle cx="100" cy="85" r="12" fill="#FFEB3B" stroke="#000" strokeWidth="2"/>
            <path d="M 85 110 Q 100 125 115 110" fill="none" stroke="#000" strokeWidth="3"/>
            <text x="100" y="155" fontFamily="'Noto Serif JP', serif" fontSize="16" fill="#FFFDE7" textAnchor="middle" fontWeight="900">知識</text>
          </svg>
        </div>

        <div className="flex-1 flex flex-col justify-center text-center md:text-left space-y-4">
          <div className="hanko-seal px-3 py-1 text-xs font-black tracking-widest w-max mx-auto md:mx-0 bg-[#8B0000]/10">
            KIẾN THỨC BỔ ÍCH
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1A1A1A] leading-tight" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            Có Thể Bạn Muốn Học
          </h1>
          <p className="text-base sm:text-lg text-gray-700 italic border-l-4 border-[#8B0000] pl-5 leading-relaxed bg-gray-50/50 py-2">
            "Những kiến thức này không có trong sách giáo khoa, nhưng cực kỳ hữu ích khi ngươi sống và làm việc tại Nhật. Ta đã tổng hợp từ kinh nghiệm thực tế của chính mình. Hãy đọc kỹ và áp dụng ngay!"
          </p>
        </div>

        {/* Vertical Japanese decorative element for desktop */}
        <div className="hidden lg:flex items-center border-l-2 border-[#1A1A1A] pl-8 ml-4 select-none">
          <h2 className="tategaki text-3xl font-black text-[#8B0000] opacity-90" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            役立つ知識
          </h2>
        </div>
      </section>

      {/* Grid of Recommended knowledge cards */}
      <section className="max-w-5xl mx-auto space-y-12">
        <div className="text-center">
          <div className="inline-block border-y-2 border-[#1A1A1A] py-2 px-8">
            <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] tracking-wider uppercase" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              KIẾN THỨC ĐỀ XUẤT
            </h2>
          </div>
        </div>

        <div id="handbooks-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {handbooks.map((hb, i) => (
            <div 
              key={i} 
              onClick={() => handleCardClick(hb)}
              className="card-recommended group h-full flex flex-col relative overflow-hidden rounded-2xl cursor-pointer"
            >
              {/* Tag overlay */}
              <div className="absolute top-3 right-3 z-10 flex gap-2">
                <span className={hb.tagStyle}>
                  {hb.tag}
                </span>
              </div>

              <div className="p-8 flex flex-col h-full relative z-10 justify-between">
                <div>
                  {/* Handbook icon circle */}
                  <div className="w-16 h-16 border-2 border-[#C5A059] rounded-full flex items-center justify-center text-3xl mb-6 text-white group-hover:bg-[#C5A059] transition-all group-hover:shadow-lg group-hover:shadow-[#C5A059]/30 bg-[#1a1a2e] mx-auto lg:mx-0">
                    {hb.icon}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black mb-1 text-white knowledge-title-glow tracking-tight font-sans leading-tight">
                    {hb.title}
                  </h3>
                  <p className="text-[#C5A059] text-xs font-bold tracking-widest mb-3 uppercase">
                    {hb.sub}
                  </p>

                  <div className="h-0.5 w-12 bg-[#C5A059] mb-5"></div>

                  <p className="text-gray-400 font-medium mb-6 text-sm leading-relaxed">
                    {hb.desc}
                  </p>
                </div>

                {/* Bottom stats and action indicator */}
                <div className="mt-auto pt-4 border-t border-gray-800 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
                    {hb.stats.map((st, si) => (
                      <span key={si} className="font-semibold">{st}</span>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="btn-read-more inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-[#C5A059] text-white font-bold hover:bg-[#D4AF6A] transition-all w-full uppercase tracking-wider text-sm rounded-xl"
                  >
                    <span>Đọc Ngay</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Secret/Locked card to complete the clean traditional grid feel */}
          <div className="bg-[#fdfbf7] rounded-2xl border-2 border-dashed border-gray-400 p-8 flex flex-col items-center justify-center text-center space-y-4 relative opacity-85 transition-all hover:opacity-100 hover:translate-y-[-2px]">
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center text-3xl text-gray-500">
              🔒
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-black text-gray-700 tracking-tight" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                KHO KIẾN THỨC MỚI
              </h3>
              <span className="text-[10px] font-black text-white px-2 py-0.5 rounded bg-zinc-500 uppercase tracking-wider">
                COMING SOON
              </span>
            </div>
            <p className="text-xs text-gray-500 font-semibold italic max-w-xs leading-relaxed">
              "Ta đang chuẩn bị các bài học cực kỳ quan trọng tiếp theo. Hãy rèn luyện thật nhuần nhuyễn 5 mảng kiến thức này trước đã!"
            </p>
            <div className="w-full py-2.5 bg-zinc-200 text-zinc-500 text-xs font-black rounded-xl uppercase tracking-wider cursor-not-allowed">
              Đang biên soạn
            </div>
          </div>
        </div>
      </section>

      {/* Quote banner from Teacher Son */}
      <section className="max-w-3xl mx-auto bg-white p-8 border-4 border-[#1A1A1A] relative shadow-[6px_6px_0px_#8B0000] rounded-2xl mt-12">
        <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-[#8B0000] text-white px-6 py-1.5 font-black text-xs tracking-widest uppercase rounded-md" style={{ fontFamily: "'Noto Serif JP', serif" }}>
          LỜI NHẮN TỪ THẦY SƠN
        </div>
        
        <div className="pt-4 space-y-6">
          <p className="text-base sm:text-lg text-gray-700 italic leading-relaxed text-center">
            "Trợ từ, luyện dịch và từ để hỏi là ba mảng kiến thức nền tảng mà bất kỳ ai học tiếng Nhật cũng cần nắm vững. Cùng với số đếm và tự-tha động từ, đây sẽ là bộ ngũ kiến thức giúp ngươi tự tin hơn trên con đường chinh phục ngôn ngữ này. Hãy đọc kỹ từng phần, ghi chú cẩn thận và thực hành thường xuyên nhé!"
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
