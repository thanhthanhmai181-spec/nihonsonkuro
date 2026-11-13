import React from "react";
import { playSound } from "../utils/audio";
import { ExternalLink, GraduationCap } from "lucide-react";
import { CourseTierIcon, CourseFrameDecor, CourseTierId } from "./CourseTierEmblem";

interface CoursesTabProps {
  onNavigate: (tab: string, level?: "N5" | "N4" | "N3" | "Anime" | "Travel") => void;
}

interface CourseItem {
  id: CourseTierId;
  title: string;
  level: string;
  rankLabel: string;
  tierCount: number;
  cardClass: string;
  stageClass: string;
  levelColorClass: string;
  rankColorClass: string;
  buttonClass: string;
  iconSizeClass: string;
  desc: string;
  externalLink: string;
}

export default function CoursesTab({ onNavigate }: CoursesTabProps) {
  const courses: CourseItem[] = [
    {
      id: "N5",
      title: "Cơ Bản & Nhập Môn",
      level: "N5",
      rankLabel: "Cấp I · Sơ Khởi",
      tierCount: 1,
      cardClass: "course-card-n5",
      stageClass: "course-stage-n5",
      levelColorClass: "text-rose-700 dark:text-rose-200",
      rankColorClass: "text-rose-600/85 dark:text-rose-300/85",
      buttonClass:
        "bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 dark:from-rose-700 dark:to-pink-700 dark:hover:from-rose-600 dark:hover:to-pink-600 text-white shadow-sm shadow-rose-600/20",
      iconSizeClass: "w-16 h-16",
      desc: "Dành cho người mới bắt đầu, nắm vững bảng chữ cái Hiragana/Katakana và các mẫu câu giao tiếp đời sống cơ bản.",
      externalLink: "https://sites.google.com/view/lopthayson/n5",
    },
    {
      id: "N4",
      title: "Sơ Trung Cấp",
      level: "N4",
      rankLabel: "Cấp II · Rèn Giũa",
      tierCount: 2,
      cardClass: "course-card-n4",
      stageClass: "course-stage-n4",
      levelColorClass: "text-sky-700 dark:text-sky-200",
      rankColorClass: "text-sky-600/90 dark:text-sky-300/90",
      buttonClass:
        "bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 dark:from-sky-600 dark:to-blue-700 dark:hover:from-sky-500 dark:hover:to-blue-600 text-white shadow-md shadow-sky-600/25",
      iconSizeClass: "w-[70px] h-[70px]",
      desc: "Mở rộng vốn từ vựng xã hội và làm quen với các cấu trúc ngữ pháp phức tạp hơn để diễn tả cảm xúc và kế hoạch.",
      externalLink: "https://sites.google.com/view/lopthayson/n4",
    },
    {
      id: "N3",
      title: "Trung Cấp",
      level: "N3",
      rankLabel: "Cấp III · Tinh Luyện",
      tierCount: 3,
      cardClass: "course-card-n3",
      stageClass: "course-stage-n3",
      levelColorClass: "text-purple-800 dark:text-purple-200",
      rankColorClass: "text-purple-700/90 dark:text-amber-300/90",
      buttonClass:
        "bg-gradient-to-r from-purple-700 via-violet-600 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white shadow-md shadow-purple-700/30 border border-purple-300/30",
      iconSizeClass: "w-[74px] h-[74px]",
      desc: "Nâng cao khả năng đọc hiểu và nghe hiểu để tự tin giao tiếp trong công việc và cuộc sống hàng ngày tại Nhật Bản.",
      externalLink: "https://sites.google.com/view/lopthayson/n3",
    },
    {
      id: "N2",
      title: "Trung Cao Cấp",
      level: "N2",
      rankLabel: "Cấp IV · Đỉnh Cao",
      tierCount: 4,
      cardClass: "course-card-n2",
      stageClass: "course-stage-n2",
      levelColorClass: "text-amber-800 dark:text-amber-200",
      rankColorClass: "text-amber-700 dark:text-amber-300",
      buttonClass:
        "bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-slate-950 font-black shadow-lg shadow-amber-500/35 border border-yellow-200/80",
      iconSizeClass: "w-20 h-20",
      desc: "Làm chủ từ vựng cao cấp, cụm Collocations thực tế và ngữ pháp phức tạp chuẩn đề thi JLPT N2.",
      externalLink: "https://sites.google.com/view/lopthayson/n2",
    },
  ];

  return (
    <div id="courses-tab-container" className="space-y-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 bg-rose-100/80 dark:bg-amber-950/50 text-[#8B261D] dark:text-amber-300 border border-rose-200/80 dark:border-amber-500/30 rounded-full text-xs font-bold tracking-widest px-4 py-1.5 uppercase">
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

      <div id="course-cards-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {courses.map((course) => (
          <div
            key={course.id}
            className={`relative rounded-[30px] overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 group ${course.cardClass}`}
          >
            {/* Progressive Japanese Kamon Corner & Crown Ornaments */}
            <CourseFrameDecor tier={course.id} />

            <div className="relative z-10 p-6 sm:p-7 space-y-5">
              {/* Escalating Emblem Stage */}
              <div
                className={`rounded-2xl px-4 py-5 flex flex-col items-center justify-center relative transition-transform duration-200 ${course.stageClass}`}
              >
                <div className="transition-transform duration-300 group-hover:scale-105">
                  <CourseTierIcon tier={course.id} className={course.iconSizeClass} />
                </div>

                <div className="mt-2 flex flex-col items-center gap-1">
                  <span className={`text-2xl font-black font-mono tracking-tight leading-none ${course.levelColorClass}`}>
                    {course.level}
                  </span>
                  <div className={`flex items-center gap-1.5 text-[11px] font-bold tracking-wide ${course.rankColorClass}`}>
                    <span>{course.rankLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-0.5" aria-label={`Bậc ${course.tierCount} trên 4`}>
                      {[1, 2, 3, 4].map((step) => (
                        <span
                          key={step}
                          className={`inline-block w-1.5 h-1.5 rotate-45 transition-all ${
                            step <= course.tierCount
                              ? course.id === "N2"
                                ? "bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.9)]"
                                : course.id === "N3"
                                ? "bg-purple-400"
                                : course.id === "N4"
                                ? "bg-sky-400"
                                : "bg-rose-400"
                              : "bg-current opacity-20"
                          }`}
                        />
                      ))}
                    </span>
                  </div>
                </div>
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

            <div className="relative z-10 p-6 sm:p-7 pt-0">
              <button
                onClick={() => {
                  playSound.click();
                  if (course.id === "N5") {
                    onNavigate("n5-lessons");
                  } else if (course.id === "N4") {
                    onNavigate("n4-lessons");
                  } else if (course.id === "N3") {
                    onNavigate("n3-lessons");
                  } else {
                    onNavigate("n2-lessons");
                  }
                }}
                className={`w-full py-3 rounded-2xl font-black transition-all duration-200 text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap ${course.buttonClass}`}
              >
                <ExternalLink className="w-4 h-4 shrink-0" />
                <span>
                  {course.id === "N5"
                    ? "HỌC N5 NGAY"
                    : course.id === "N4"
                    ? "HỌC N4 NGAY"
                    : course.id === "N3"
                    ? "HỌC N3 NGAY"
                    : "HỌC N2 NGAY"}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

