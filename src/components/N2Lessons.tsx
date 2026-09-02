import React, { useState } from "react";
import { playSound } from "../utils/audio";
import { ArrowLeft, ExternalLink, Sparkles, BookOpen, Layers, Award } from "lucide-react";
import VocabN2Lessons from "./VocabN2Lessons";
import GrammarN2Lessons from "./GrammarN2Lessons";
import KanjiN2Lessons from "./KanjiN2Lessons";

interface N2LessonsProps {
  onGoBack: () => void;
  onNavigate: (tab: string) => void;
}

export default function N2Lessons({ onGoBack, onNavigate }: N2LessonsProps) {
  const [studyVocab, setStudyVocab] = useState<boolean>(false);
  const [studyGrammar, setStudyGrammar] = useState<boolean>(false);
  const [studyKanji, setStudyKanji] = useState<boolean>(false);

  const books = [
    {
      id: 1,
      title: "Từ Vựng N2",
      volume: "Quyển I",
      symbol: "詞",
      desc: "Hệ thống 2.265 từ vựng cao cấp, Collocation và từ đồng nghĩa chuyên sâu chuẩn đề thi JLPT N2.",
      isReady: true,
    },
    {
      id: 2,
      title: "Ngữ Pháp N2",
      volume: "Quyển II",
      symbol: "法",
      desc: "Mẫu câu văn viết, phân biệt sắc thái, bẫy đề thi & hệ thống bài tập thực chiến chuyên sâu.",
      isReady: true,
    },
    {
      id: 3,
      title: "Hán Tự N2",
      volume: "Quyển III",
      symbol: "漢",
      desc: "Kho Hán tự N2 thực chiến, phân biệt âm On/Kun, âm Hán Việt, Flashcard và bài tập trắc nghiệm.",
      isReady: true,
    },
    {
      id: 4,
      title: "Thi Thử N2",
      volume: "Thử Thách",
      symbol: "試",
      desc: "Mô phỏng kỳ thi JLPT N2 thực chiến, kiểm tra toàn diện Từ vựng - Ngữ pháp - Đọc hiểu.",
      isReady: false,
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
    } else {
      alert("Phần này đang được Thầy Sơn biên soạn và sẽ sớm ra mắt!");
    }
  };

  if (studyVocab) {
    return (
      <VocabN2Lessons 
        onGoBack={() => {
          playSound.click();
          setStudyVocab(false);
        }} 
      />
    );
  }

  if (studyGrammar) {
    return (
      <GrammarN2Lessons 
        onGoBack={() => {
          playSound.click();
          setStudyGrammar(false);
        }} 
      />
    );
  }

  if (studyKanji) {
    return (
      <KanjiN2Lessons 
        onGoBack={() => {
          playSound.click();
          setStudyKanji(false);
        }} 
      />
    );
  }

  return (
    <div id="n2-lessons-container" className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-black text-xs uppercase tracking-wider border border-purple-300">
              TRUNG CAO CẤP JLPT N2
            </span>
            <span className="text-xs font-bold text-natural-muted">• KHÓA HỌC THỰC CHIẾN</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-natural-deep tracking-tight">
            Khoá Học Tiếng Nhật N2
          </h1>
          <p className="text-xs text-natural-muted">
            Chinh phục cấp độ Trung Cao Cấp cùng Thầy Sơn với lộ trình bài bản và chấm câu AI.
          </p>
        </div>

        <button
          onClick={() => {
            playSound.click();
            onGoBack();
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl border font-bold text-xs shadow-sm hover:bg-natural-soft transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về Khóa Học</span>
        </button>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            onClick={() => handleBookClick(book)}
            className={`p-6 rounded-3xl border-2 shadow-sm flex flex-col justify-between space-y-6 transition-all cursor-pointer group hover:-translate-y-1 hover:shadow-lg ${
              book.isReady 
                ? "bg-white hover:border-purple-500" 
                : "bg-white/60 opacity-80 hover:opacity-100 hover:border-gray-400"
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                  {book.volume}
                </span>
                <div className="w-10 h-10 rounded-2xl bg-[#1A1A1A] text-white flex items-center justify-center font-black text-lg group-hover:scale-110 transition-transform">
                  {book.symbol}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-black text-natural-deep group-hover:text-purple-600 transition-colors">
                  {book.title}
                </h3>
                <p className="text-xs text-natural-muted mt-2 leading-relaxed">
                  {book.desc}
                </p>
              </div>
            </div>

            <div>
              {book.isReady ? (
                <button className="w-full py-2.5 bg-purple-600 group-hover:bg-purple-700 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-all">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>VÀO HỌC NGAY</span>
                </button>
              ) : (
                <div className="text-center py-2 text-[11px] font-bold text-natural-muted bg-natural-soft rounded-xl">
                  Sắp ra mắt
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
