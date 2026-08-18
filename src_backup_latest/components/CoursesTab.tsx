import React from "react";
import { playSound } from "../utils/audio";
import { ExternalLink, BookOpen, GraduationCap, Award } from "lucide-react";

interface CoursesTabProps {
  onNavigate: (tab: string, level?: "N5" | "N4" | "N3" | "Anime" | "Travel") => void;
}

export default function CoursesTab({ onNavigate }: CoursesTabProps) {
  const courses = [
    {
      id: "N5" as const,
      title: "Cơ Bản & Nhập Môn",
      level: "N5",
      bgClass: "from-rose-500/10 to-pink-500/10 border-pink-200",
      textClass: "text-pink-600",
      icon: "🔰",
      desc: "Dành cho người mới bắt đầu, nắm vững bảng chữ cái Hiragana/Katakana và các mẫu câu giao tiếp đời sống cơ bản.",
      externalLink: "https://sites.google.com/view/lopthayson/n5"
    },
    {
      id: "N4" as const,
      title: "Sơ Trung Cấp",
      level: "N4",
      bgClass: "from-blue-500/10 to-sky-500/10 border-blue-200",
      textClass: "text-blue-600",
      icon: "⚔️",
      desc: "Mở rộng vốn từ vựng xã hội và làm quen với các cấu trúc ngữ pháp phức tạp hơn để diễn tả cảm xúc và kế hoạch.",
      externalLink: "https://sites.google.com/view/lopthayson/n4"
    },
    {
      id: "N3" as const,
      title: "Trung Cấp",
      level: "N3",
      bgClass: "from-purple-500/10 to-fuchsia-500/10 border-purple-200",
      textClass: "text-purple-600",
      icon: "🔍",
      desc: "Nâng cao khả năng đọc hiểu và nghe hiểu để tự tin giao tiếp trong công việc và cuộc sống hàng ngày tại Nhật Bản.",
      externalLink: "https://sites.google.com/view/lopthayson/n3"
    }
  ];

  const handleExternalClick = (url: string) => {
    playSound.click();
    window.open(url, "_blank");
  };

  return (
    <div id="courses-tab-container" className="space-y-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 bg-pink-100 text-pink-600 rounded-full text-xs font-bold tracking-widest px-4 py-1.5 uppercase">
          <GraduationCap className="w-4 h-4" />
          <span>Học Phần Giáo Trình</span>
        </div>
        <h2 className="text-3xl font-black text-natural-deep font-sans tracking-tight">
          Khoá Học Nhật Ngữ
        </h2>
        <p className="text-natural-muted italic text-sm">
          "Chọn cấp độ phù hợp để bắt đầu hành trình chinh phục tiếng Nhật của em nhé!"
        </p>
      </div>

      <div id="course-cards-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div 
            key={course.id}
            className={`bg-white rounded-[32px] overflow-hidden border border-natural-border shadow-sm flex flex-col justify-between hover:shadow-md hover:border-pink-300 transition-all group`}
          >
            <div className="p-6 sm:p-8 space-y-6">
              {/* Header Badge */}
              <div className={`h-24 rounded-2xl bg-gradient-to-r ${course.bgClass} flex flex-col items-center justify-center relative border`}>
                <span className="text-4xl mb-1">{course.icon}</span>
                <span className="text-2xl font-black font-mono tracking-tight">{course.level}</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-black text-natural-deep tracking-tight">
                  {course.title}
                </h3>
                <p className="text-xs text-natural-muted leading-relaxed font-medium">
                  {course.desc}
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 pt-0 space-y-2">
              <button 
                onClick={() => {
                  if (course.id === "N5") {
                    playSound.click();
                    onNavigate("n5-lessons");
                  } else if (course.id === "N4") {
                    playSound.click();
                    onNavigate("n4-lessons");
                  } else {
                    playSound.click();
                    onNavigate("n3-lessons");
                  }
                }}
                className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-2xl font-black shadow-sm transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                {course.id === "N5" ? "HỌC NN5 NGAY" : course.id === "N4" ? "HỌC NN4 NGAY" : "HỌC NN3 NGAY"}
              </button>
              
              {course.id === "N5" && (
                <button 
                  onClick={() => onNavigate("vocab", course.id)}
                  className="w-full py-3 bg-natural-soft hover:bg-natural-pink/20 border border-natural-border hover:border-pink-200 text-natural-deep hover:text-pink-600 rounded-2xl font-black transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  LUYỆN TỪ VỰNG NN5
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
