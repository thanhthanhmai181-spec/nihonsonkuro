import React, { useState } from "react";
import { playSound } from "../utils/audio";
import { 
  ArrowLeft, 
  Volume2, 
  Check, 
  HelpCircle, 
  Award, 
  FileText, 
  Compass, 
  Activity,
  ThumbsUp,
  RotateCcw
} from "lucide-react";

interface MoraLessonsProps {
  onGoBack: () => void;
}

export default function MoraLessons({ onGoBack }: MoraLessonsProps) {
  const [activeTab, setActiveTab] = useState("truongam");

  // State for Exercises
  const [moraInputs, setMoraInputs] = useState<Record<string, string>>({
    obaasan: "",
    gakkou: "",
    kitte: "",
    yuuki: "",
    otto: "",
    issho: "",
    toukyou: ""
  });
  const [showMoraAnswers, setShowMoraAnswers] = useState(false);

  const [fillAnswers, setFillAnswers] = useState<Record<string, string>>({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
    q8: "",
    q9: "",
    q10: ""
  });
  const [showFillAnswers, setShowFillAnswers] = useState(false);

  const [selectedPairs, setSelectedPairs] = useState<Record<string, string>>({
    mp1: "",
    mp2: "",
    mp3: "",
    mp4: "",
    mp5: "",
    mp6: ""
  });
  const [showPairsFeedback, setShowPairsFeedback] = useState(false);

  const [translationInputs, setTranslationInputs] = useState<Record<string, string>>({
    t1: "",
    t2: "",
    t3: "",
    t4: ""
  });
  const [showTransAnswers, setShowTransAnswers] = useState(false);

  const [correctionInputs, setCorrectionInputs] = useState<Record<string, string>>({
    c1: "",
    c2: "",
    c3: ""
  });
  const [showCorrectionAnswers, setShowCorrectionAnswers] = useState(false);

  const playAudio = (text: string) => {
    playSound.click();
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      utterance.rate = 0.8; // slightly slower for educational clarity
      window.speechSynthesis.speak(utterance);
    }
  };

  // Correct values for exercise checking
  const correctMoras = {
    obaasan: "4",
    gakkou: "4",
    kitte: "3",
    yuuki: "3",
    otto: "3",
    issho: "3",
    toukyou: "4"
  };

  const correctFills = {
    q1: "おおきい",
    q2: "けいさつ",
    q3: "きっぷ",
    q4: "とても",
    q5: "コーヒー",
    q6: "がっこう",
    q7: "おとうさん",
    q8: "いっしょ",
    q9: "ゆうびん",
    q10: "ざっし"
  };

  const correctPairs = {
    mp1: "おばあさん",
    mp2: "おっと",
    mp3: "かっこ",
    mp4: "とり",
    mp5: "ゆき", // accepts romanized/hiragana variations
    mp6: "もっと"
  };

  const checkMoraExercise = () => {
    playSound.click();
    setShowMoraAnswers(true);
  };

  const checkFillExercise = () => {
    playSound.click();
    setShowFillAnswers(true);
  };

  const checkPairsExercise = () => {
    playSound.click();
    setShowPairsFeedback(true);
  };

  const handleReset = () => {
    playSound.click();
    setMoraInputs({
      obaasan: "",
      gakkou: "",
      kitte: "",
      yuuki: "",
      otto: "",
      issho: "",
      toukyou: ""
    });
    setShowMoraAnswers(false);

    setFillAnswers({
      q1: "",
      q2: "",
      q3: "",
      q4: "",
      q5: "",
      q6: "",
      q7: "",
      q8: "",
      q9: "",
      q10: ""
    });
    setShowFillAnswers(false);

    setSelectedPairs({
      mp1: "",
      mp2: "",
      mp3: "",
      mp4: "",
      mp5: "",
      mp6: ""
    });
    setShowPairsFeedback(false);

    setTranslationInputs({
      t1: "",
      t2: "",
      t3: "",
      t4: ""
    });
    setShowTransAnswers(false);

    setCorrectionInputs({
      c1: "",
      c2: "",
      c3: ""
    });
    setShowCorrectionAnswers(false);
  };

  return (
    <div id="mora-lessons-container" className="washi-pattern min-h-screen p-4 sm:p-8 -mx-4 sm:-mx-8 rounded-[40px] border-2 border-[#1A1A1A] text-[#1A1A1A]" style={{ fontFamily: "'Lora', 'Noto Serif JP', serif" }}>
      
      {/* Navigation Sub-bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 border-b-2 border-[#1A1A1A] pb-4 gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playSound.click();
              onGoBack();
            }}
            className="p-2 border-2 border-[#1A1A1A] bg-white rounded-xl shadow-[2px_2px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none hover:text-[#8B0000] cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-9 h-9 border-2 border-[#1A1A1A] bg-[#1A1A1A] rounded flex items-center justify-center text-white font-black text-lg" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            長
          </div>
          <span className="text-lg font-black tracking-widest text-[#1A1A1A]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            TRƯỜNG ÂM & ÂM NGẮT
          </span>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-slate-100 p-1 rounded-2xl border-2 border-[#1A1A1A] max-w-full">
          {[
            { id: "truongam", label: "Trường Âm", icon: <Compass className="w-4 h-4" /> },
            { id: "amngat", label: "Âm Ngắt", icon: <Activity className="w-4 h-4" /> },
            { id: "practice", label: "Bài Luyện Tập", icon: <FileText className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playSound.click();
                setActiveTab(tab.id);
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab.id 
                  ? "bg-[#1A1A1A] text-white" 
                  : "text-[#1A1A1A] hover:bg-black/10"
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Hero Welcome Card */}
      <section className="mb-12 flex flex-col md:flex-row items-stretch gap-8 bg-white p-6 sm:p-8 border-4 border-[#1A1A1A] relative shadow-[6px_6px_0px_#1A1A1A] rounded-3xl">
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#8B0000]"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#8B0000]"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#8B0000]"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#8B0000]"></div>

        <div className="w-32 h-32 flex-shrink-0 overflow-hidden flex items-center justify-center relative border-4 border-[#8B0000] rounded-full bg-[#1A0000] mx-auto md:mx-0 shadow-inner">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transform scale-110">
            <circle cx="100" cy="100" r="100" fill="#2A0000" />
            <circle cx="100" cy="100" r="85" fill="#8B0000" />
            <path d="M 50 80 Q 100 200 150 80 Q 100 50 50 80 Z" fill="#D32F2F" stroke="#000" strokeWidth="3"/>
            <path d="M 60 70 Q 50 20 40 10 Q 70 30 75 60 Z" fill="#FFFDE7" stroke="#000" strokeWidth="2"/>
            <path d="M 140 70 Q 150 20 160 10 Q 130 30 125 60 Z" fill="#FFFDE7" stroke="#000" strokeWidth="2"/>
            <circle cx="80" cy="100" r="12" fill="#FFEB3B" stroke="#000" strokeWidth="2" />
            <circle cx="120" cy="100" r="12" fill="#FFEB3B" stroke="#000" strokeWidth="2" />
            <circle cx="80" cy="100" r="5" fill="#000" />
            <circle cx="120" cy="100" r="5" fill="#000" />
            <path d="M 75 130 Q 100 150 125 130" fill="none" stroke="#000" strokeWidth="4"/>
            <text x="100" y="70" fontFamily="'Noto Serif JP', serif" fontSize="20" fill="#FFCC00" textAnchor="middle" fontWeight="900">音</text>
          </svg>
        </div>

        <div className="flex-1 flex flex-col justify-center text-center md:text-left space-y-3">
          <div className="hanko-seal px-3 py-0.5 text-[10px] font-black tracking-widest w-max mx-auto md:mx-0 bg-[#8B0000]/10 border border-[#8B0000]">
            BÍ TRUYỀN NGỮ ÂM
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1A1A1A]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            Trường Âm & Âm Ngắt
          </h1>
          <p className="text-sm sm:text-base text-gray-700 italic border-l-4 border-[#8B0000] pl-4 leading-relaxed bg-gray-50/50 py-1.5">
            "Học tiếng Nhật mà không phát âm chuẩn trường âm và âm ngắt thì chẳng khác gì tấu hài! Hãy lắng nghe thật kỹ sự chênh lệch nhịp (Mora), nếu không, 'Thần Rùa' sẽ bò đến cười vào mặt ngươi!"
          </p>
        </div>
      </section>

      {/* Dynamic Content Sections based on selected tab */}
      
      {/* ================== TRƯỜNG ÂM TAB ================== */}
      {activeTab === "truongam" && (
        <div className="space-y-10 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl border-2 border-[#1A1A1A] p-6 sm:p-8 shadow-[4px_4px_0px_#1A1A1A] space-y-4">
            <h2 className="text-xl sm:text-2xl font-black flex items-center gap-2 text-[#8B0000]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              <span>🎼</span> Nguyên lý Trường âm (長音 - Chōon)
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              <strong>Trường âm</strong> đơn giản là kéo dài nguyên âm của âm đứng trước nó thêm đúng 1 nhịp (Mora). Một từ có trường âm sẽ có độ dài phát âm lâu gấp đôi từ không có trường âm. Hãy tập đếm nhịp bằng cách gõ tay xuống bàn nhé!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#FDFBF7] p-4 rounded-xl border border-[#1A1A1A]">
              <div className="space-y-1">
                <span className="text-xs font-bold text-gray-500 uppercase">Phát âm ngắn (3 nhịp):</span>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-black text-slate-800 bg-white border border-slate-200 px-3 py-1 rounded-lg">おばさん</span>
                  <span className="text-xs font-semibold text-gray-600">(o-ba-sa-n / Cô, Dì)</span>
                  <button onClick={() => playAudio("おばさん")} className="p-1.5 bg-slate-100 hover:bg-[#8B0000] hover:text-white transition rounded-full cursor-pointer"><Volume2 className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#8B0000] uppercase">Phát âm dài (4 nhịp):</span>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-black text-[#8B0000] bg-[#FFECE5] border-2 border-[#8B0000] px-3 py-1 rounded-lg">おばあさん</span>
                  <span className="text-xs font-semibold text-[#8B0000]">(o-ba-a-sa-n / Bà)</span>
                  <button onClick={() => playAudio("おばあさん")} className="p-1.5 bg-slate-100 hover:bg-[#8B0000] hover:text-white transition rounded-full cursor-pointer"><Volume2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </div>

          {/* Quy tắc Hiragana */}
          <div className="bg-white rounded-3xl border-2 border-[#1A1A1A] p-6 sm:p-8 shadow-[4px_4px_0px_#1A1A1A] space-y-6">
            <h3 className="text-lg sm:text-xl font-black text-slate-800 border-b pb-2" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              📋 Quy tắc ghép Trường âm Hiragana
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-[#1A1A1A]">
                    <th className="py-3 px-4 text-left font-black text-xs uppercase tracking-wider text-slate-600">Hàng âm</th>
                    <th className="py-3 px-4 text-center font-black text-xs uppercase tracking-wider text-slate-600">Nguyên âm chính</th>
                    <th className="py-3 px-4 text-center font-black text-xs uppercase tracking-wider text-[#8B0000]">Thêm ký tự kéo dài</th>
                    <th className="py-3 px-4 text-left font-black text-xs uppercase tracking-wider text-slate-600">Ví dụ tiêu biểu</th>
                    <th className="py-3 px-4 text-left font-black text-xs uppercase tracking-wider text-slate-600">Nghĩa tiếng Việt</th>
                    <th className="py-3 px-4 text-center font-black text-xs uppercase tracking-wider text-slate-600">Phát âm</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { row: "Hàng あ (A)", vowel: "/a/", char: "あ", ex: "おかあさん (Okaasan)", desc: "Mẹ (của người khác)", audio: "おかあさん" },
                    { row: "Hàng い (I)", vowel: "/i/", char: "い", ex: "おにいさん (Oniisan)", desc: "Anh trai (của người khác)", audio: "おにいさん" },
                    { row: "Hàng う (U)", vowel: "/u/", char: "う", ex: "すうじ (Suuji)", desc: "Chữ số / Số liệu", audio: "すうじ" },
                    { row: "Hàng え (E)", vowel: "/e/", char: "い (Ngoại lệ: あ / え)", ex: "せんせい (Sensei)", desc: "Thầy cô giáo / Bác sĩ", audio: "せんせい" },
                    { row: "Hàng お (O)", vowel: "/o/", char: "う (Ngoại lệ: お)", ex: "おとうさん (Otousan)", desc: "Bố (của người khác)", audio: "おとうさん" },
                  ].map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="py-4 px-4 font-black text-sm text-slate-800">{item.row}</td>
                      <td className="py-4 px-4 text-center font-bold text-sm text-gray-500">{item.vowel}</td>
                      <td className="py-4 px-4 text-center font-black text-base text-[#8B0000] bg-red-50/25">{item.char}</td>
                      <td className="py-4 px-4 font-serif font-black text-sm text-slate-800">{item.ex}</td>
                      <td className="py-4 px-4 text-sm text-slate-600 font-medium">{item.desc}</td>
                      <td className="py-4 px-4 text-center">
                        <button 
                          onClick={() => playAudio(item.audio)}
                          className="p-2 bg-slate-100 hover:bg-[#8B0000] hover:text-white transition rounded-xl cursor-pointer inline-flex items-center gap-1.5 text-xs font-bold"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Nghe</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-[#FFFCE5] border-l-4 border-yellow-500 p-4 rounded-r-xl text-xs font-medium leading-relaxed text-gray-700">
              <strong>💡 Bí mật ngữ âm:</strong> Trường âm của hàng <strong>え</strong> thường được kéo dài bằng chữ <strong>い</strong> (như trong せんせい - phát âm kéo dài âm Ê). Trường âm của hàng <strong>お</strong> được kéo dài bằng chữ <strong>う</strong> (như trong おとうさん - phát âm kéo dài âm Ô). Một vài từ đặc biệt giữ nguyên cách dùng truyền thống như <em>おおきい (to lớn)</em> hay <em>おねえさん (chị gái)</em>.
            </div>
          </div>

          {/* Quy tắc Katakana */}
          <div className="bg-white rounded-3xl border-2 border-[#1A1A1A] p-6 sm:p-8 shadow-[4px_4px_0px_#1A1A1A] space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-slate-800" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              🐱 Katakana – Quy tắc kéo dài thống nhất với dấu gạch ngang 「ー」
            </h3>
            <p className="text-sm text-gray-600 font-medium leading-relaxed">
              Trong bảng chữ cứng Katakana, trường âm vô cùng đơn giản: tất cả các hàng chỉ cần thêm một ký tự gạch ngang <strong>「ー」</strong> (Chōonpu) để kéo dài âm tiết trước đó.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {[
                { kana: "ケーキ", romaji: "keeki", vi: "Bánh ngọt", audio: "ケーキ" },
                { kana: "ノート", romaji: "nooto", vi: "Vở ghi / Laptop", audio: "ノート" },
                { kana: "コーヒー", romaji: "koohii", vi: "Cà phê", audio: "コーヒー" },
                { kana: "ジュース", romaji: "juusu", vi: "Nước ngọt / Nước quả", audio: "ジュース" },
                { kana: "カード", romaji: "kaado", vi: "Thẻ / Card", audio: "カード" },
                { kana: "パーティー", romaji: "paatii", vi: "Bữa tiệc / Party", audio: "パーティー" }
              ].map((item, idx) => (
                <div key={idx} className="bg-[#FDFBF7] p-4 rounded-2xl border border-slate-200 flex items-center justify-between hover:border-[#8B0000] transition">
                  <div>
                    <div className="text-xl font-serif font-black text-[#8B0000]">{item.kana}</div>
                    <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">{item.romaji}</div>
                    <div className="text-xs text-gray-600 font-medium mt-1">{item.vi}</div>
                  </div>
                  <button 
                    onClick={() => playAudio(item.audio)}
                    className="p-2.5 bg-white border border-slate-200 hover:bg-[#8B0000] hover:text-white rounded-xl transition cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Minimal Pairs - Cặp từ tối thiểu để phân biệt */}
          <div className="bg-white rounded-3xl border-2 border-[#1A1A1A] p-6 sm:p-8 shadow-[4px_4px_0px_#1A1A1A] space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-[#8B0000]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              🎭 Hãy phân biệt: Cặp từ tối thiểu (Minimal Pairs) cực kỳ quan trọng!
            </h3>
            <p className="text-sm text-gray-600 font-medium">
              Chỉ sai lệch đúng một nhịp kéo dài, nghĩa của từ sẽ biến đổi hoàn toàn sang một từ khác. Hãy luyện tập phát âm và nghe phân biệt:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {[
                {
                  short: "おじさん", shortR: "ojisan (3 nhịp)", shortVi: "Chú, Bác trai", shortAudio: "おじさん",
                  long: "おじいさん", longR: "ojiisan (4 nhịp)", longVi: "Ông nội / Ông ngoại", longAudio: "おじいさん"
                },
                {
                  short: "ゆき", shortR: "yuki (2 nhịp)", shortVi: "Tuyết trắng", shortAudio: "ゆき",
                  long: "ゆうき", longR: "yuuki (3 nhịp)", longVi: "Lòng dũng cảm / Dũng khí", longAudio: "ゆうき"
                },
                {
                  short: "とり", shortR: "tori (2 nhịp)", shortVi: "Con chim", shortAudio: "とり",
                  long: "とおり", longR: "toori (3 nhịp)", longVi: "Con đường, Phố phường", longAudio: "とおり"
                },
                {
                  short: "ビル", shortR: "biru (2 nhịp)", shortVi: "Tòa nhà cao tầng", shortAudio: "ビル",
                  long: "ビール", longR: "biiru (3 nhịp)", longVi: "Bia (đồ uống)", longAudio: "ビール"
                }
              ].map((pair, idx) => (
                <div key={idx} className="border-2 border-dashed border-slate-300 p-4 rounded-2xl bg-slate-50/50 flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Short */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200 text-center space-y-1 relative group">
                      <div className="text-xs font-black text-gray-400">NGẮN</div>
                      <div className="text-xl font-black text-slate-800 font-serif">{pair.short}</div>
                      <div className="text-[10px] text-gray-500 font-mono">{pair.shortR}</div>
                      <div className="text-xs text-gray-600 font-semibold">{pair.shortVi}</div>
                      <button 
                        onClick={() => playAudio(pair.shortAudio)}
                        className="mt-2 mx-auto p-1.5 bg-slate-100 group-hover:bg-[#8B0000] group-hover:text-white transition rounded-full cursor-pointer flex items-center justify-center"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Long */}
                    <div className="bg-[#FFFCE5] p-3 rounded-xl border-2 border-yellow-500 text-center space-y-1 relative group">
                      <div className="text-xs font-black text-yellow-600">TRƯỜNG ÂM</div>
                      <div className="text-xl font-black text-[#8B0000] font-serif">{pair.long}</div>
                      <div className="text-[10px] text-yellow-700 font-mono">{pair.longR}</div>
                      <div className="text-xs text-slate-800 font-semibold">{pair.longVi}</div>
                      <button 
                        onClick={() => playAudio(pair.longAudio)}
                        className="mt-2 mx-auto p-1.5 bg-[#FFF2CC] group-hover:bg-[#8B0000] group-hover:text-white transition rounded-full cursor-pointer flex items-center justify-center"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================== ÂM NGẮT TAB ================== */}
      {activeTab === "amngat" && (
        <div className="space-y-10 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl border-2 border-[#1A1A1A] p-6 sm:p-8 shadow-[4px_4px_0px_#1A1A1A] space-y-4">
            <h2 className="text-xl sm:text-2xl font-black flex items-center gap-2 text-[#8B0000]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              <span>🔸</span> Nguyên lý Âm ngắt (促音 - Sokuon)
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              <strong>Âm ngắt</strong> là một khoảng lặng dài đúng 1 nhịp (Mora) được ký hiệu bằng chữ tsu nhỏ: <strong>っ</strong> (trong Hiragana) hoặc <strong>ッ</strong> (trong Katakana). Bạn sẽ giữ khẩu hình, ngưng luồng hơi lại một nhịp rồi mới phát âm tiếp theo. Hãy tưởng tượng như có một vật cản vô hình chặn đứng luồng hơi trong tích tắc!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#FDFBF7] p-4 rounded-xl border border-[#1A1A1A]">
              <div className="space-y-1">
                <span className="text-xs font-bold text-gray-500 uppercase">Phát âm trơn (2 nhịp):</span>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-black text-slate-800 bg-white border border-slate-200 px-3 py-1 rounded-lg">かこ</span>
                  <span className="text-xs font-semibold text-gray-600">(ka-ko / Quá khứ)</span>
                  <button onClick={() => playAudio("かこ")} className="p-1.5 bg-slate-100 hover:bg-[#8B0000] hover:text-white transition rounded-full cursor-pointer"><Volume2 className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#8B0000] uppercase">Có âm ngắt (3 nhịp):</span>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-black text-[#8B0000] bg-[#FFECE5] border-2 border-[#8B0000] px-3 py-1 rounded-lg">かっこ</span>
                  <span className="text-xs font-semibold text-[#8B0000]">(ka-[ngắt]-ko / Ngoặc đơn)</span>
                  <button onClick={() => playAudio("かっこ")} className="p-1.5 bg-slate-100 hover:bg-[#8B0000] hover:text-white transition rounded-full cursor-pointer"><Volume2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </div>

          {/* Quy tắc Phân loại theo phụ âm */}
          <div className="bg-white rounded-3xl border-2 border-[#1A1A1A] p-6 sm:p-8 shadow-[4px_4px_0px_#1A1A1A] space-y-6">
            <h3 className="text-lg sm:text-xl font-black text-slate-800 border-b pb-2" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              📋 Phân loại cơ chế âm ngắt theo phụ âm đi sau
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-[#1A1A1A]">
                    <th className="py-3 px-4 text-left font-black text-xs uppercase tracking-wider text-slate-600">Loại phụ âm đi sau っ</th>
                    <th className="py-3 px-4 text-left font-black text-xs uppercase tracking-wider text-slate-600">Cơ chế phát âm</th>
                    <th className="py-3 px-4 text-left font-black text-xs uppercase tracking-wider text-slate-600">Ví dụ Hiragana</th>
                    <th className="py-3 px-4 text-left font-black text-xs uppercase tracking-wider text-slate-600">Ví dụ Katakana</th>
                    <th className="py-3 px-4 text-left font-black text-xs uppercase tracking-wider text-[#8B0000]">Nghĩa Việt</th>
                    <th className="py-3 px-4 text-center font-black text-xs uppercase tracking-wider text-slate-600">Phát âm</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { type: "Hàng か / Phụ âm /k/", mechanism: "Ngưng hoàn toàn luồng hơi ở cổ họng, rồi bật âm K mạnh", exH: "がっこう (gakkou)", exK: "サッカー (sakkaa)", vi: "Trường học / Bóng đá", audio: "がっこう" },
                    { type: "Hàng さ / Phụ âm /s/", mechanism: "Giữ khe hẹp giữa răng để tạo âm xát kéo dài rồi phát âm S", exH: "ざっし (zasshi)", exK: "マッサージ (massaaji)", vi: "Tạp chí / Mát-xa", audio: "ざっし" },
                    { type: "Hàng た / Phụ âm /t/", mechanism: "Đầu lưỡi chạm nướu trên giữ chặt hơi, bật hơi tạo âm T", exH: "きって (kitte)", exK: "チケット (chiketto)", vi: "Tem thư / Vé xe", audio: "きって" },
                    { type: "Hàng ぱ / Phụ âm /p/", mechanism: "Hai môi khép chặt giữ hơi rồi mím bật mạnh âm P", exH: "きっぷ (kippu)", exK: "コップ (koppu)", vi: "Vé tàu / Cái cốc", audio: "きっぷ" },
                  ].map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="py-4 px-4 font-black text-sm text-slate-800">{item.type}</td>
                      <td className="py-4 px-4 text-xs font-semibold text-gray-500 max-w-[200px] leading-relaxed">{item.mechanism}</td>
                      <td className="py-4 px-4 font-serif font-black text-sm text-[#8B0000]">{item.exH}</td>
                      <td className="py-4 px-4 font-serif font-black text-sm text-slate-800">{item.exK}</td>
                      <td className="py-4 px-4 text-xs text-slate-600 font-bold">{item.vi}</td>
                      <td className="py-4 px-4 text-center">
                        <button 
                          onClick={() => playAudio(item.audio)}
                          className="p-2 bg-slate-100 hover:bg-[#8B0000] hover:text-white transition rounded-xl cursor-pointer inline-flex items-center gap-1.5 text-xs font-bold"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Nghe</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-[#FFFCE5] border-l-4 border-yellow-500 p-4 rounded-r-xl text-xs font-medium leading-relaxed text-gray-700">
              <strong>💡 Lưu ý quan trọng khi gõ bàn phím (Romaji):</strong> Khi bạn gõ tiếng Nhật trên máy tính hay điện thoại, để viết được âm ngắt, bạn chỉ cần <strong>gõ gấp đôi phụ âm đi sau nó</strong>. Ví dụ: gõ <em>gakkou</em> để ra がっこう, gõ <em>kitte</em> để ra きって. Thật đơn giản phải không nào?
            </div>
          </div>

          {/* Minimal Pairs - Âm Ngắt */}
          <div className="bg-white rounded-3xl border-2 border-[#1A1A1A] p-6 sm:p-8 shadow-[4px_4px_0px_#1A1A1A] space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-[#8B0000]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              🎭 Hãy phân biệt: Cặp từ có và không có âm ngắt
            </h3>
            <p className="text-sm text-gray-600 font-medium">
              Tương tự như trường âm, việc ngắt nhịp hay phát âm trơn sẽ làm thay đổi hoàn toàn nghĩa của câu từ:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {[
                {
                  short: "きて", shortR: "kite (2 nhịp)", shortVi: "Hãy đến đây / Mặc áo", shortAudio: "きて",
                  long: "きって", longR: "kitte (3 nhịp)", longVi: "Con tem / Hãy cắt đi", longAudio: "きって"
                },
                {
                  short: "おと", shortR: "oto (2 nhịp)", shortVi: "Âm thanh, Tiếng động", shortAudio: "おと",
                  long: "おっと", longR: "otto (3 nhịp)", longVi: "Người chồng (của tôi)", longAudio: "おっと"
                },
                {
                  short: "もと", shortR: "moto (2 nhịp)", shortVi: "Gốc rễ / Nguyên bản", shortAudio: "もと",
                  long: "もっと", longR: "motto (3 nhịp)", longVi: "Hơn nữa (more)", longAudio: "もっと"
                },
                {
                  short: "ぶか", shortR: "buka (2 nhịp)", shortVi: "Cấp dưới, Binh lính", shortAudio: "ぶか",
                  long: "ぶっか", longR: "bukka (3 nhịp)", longVi: "Vật giá / Giá cả thị trường", longAudio: "ぶっか"
                }
              ].map((pair, idx) => (
                <div key={idx} className="border-2 border-dashed border-slate-300 p-4 rounded-2xl bg-slate-50/50 flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Without */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200 text-center space-y-1 relative group">
                      <div className="text-xs font-black text-gray-400">TRƠN</div>
                      <div className="text-xl font-black text-slate-800 font-serif">{pair.short}</div>
                      <div className="text-[10px] text-gray-500 font-mono">{pair.shortR}</div>
                      <div className="text-xs text-gray-600 font-semibold">{pair.shortVi}</div>
                      <button 
                        onClick={() => playAudio(pair.shortAudio)}
                        className="mt-2 mx-auto p-1.5 bg-slate-100 group-hover:bg-[#8B0000] group-hover:text-white transition rounded-full cursor-pointer flex items-center justify-center"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* With Sokuon */}
                    <div className="bg-[#FFECE5] p-3 rounded-xl border-2 border-[#8B0000] text-center space-y-1 relative group">
                      <div className="text-xs font-black text-[#8B0000]">CÓ ÂM NGẮT</div>
                      <div className="text-xl font-black text-[#8B0000] font-serif">{pair.long}</div>
                      <div className="text-[10px] text-red-700 font-mono">{pair.longR}</div>
                      <div className="text-xs text-slate-800 font-semibold">{pair.longVi}</div>
                      <button 
                        onClick={() => playAudio(pair.longAudio)}
                        className="mt-2 mx-auto p-1.5 bg-[#FFD6CC] group-hover:bg-[#8B0000] group-hover:text-white transition rounded-full cursor-pointer flex items-center justify-center"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================== PRACTICE EXERCISES TAB ================== */}
      {activeTab === "practice" && (
        <div className="space-y-10 animate-in fade-in duration-300">
          
          {/* EXERCISE 1 */}
          <div className="bg-white rounded-3xl border-2 border-[#1A1A1A] p-6 sm:p-8 shadow-[4px_4px_0px_#1A1A1A] space-y-6">
            <h3 className="text-lg sm:text-xl font-black text-[#8B0000] flex items-center gap-2" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              <Award className="w-5 h-5" /> Bài tập 1: Đếm số nhịp phát âm (Mora)
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 font-medium">
              Hãy nghe thật kỹ phát âm của mỗi từ rồi nhập số nhịp phát âm (ví dụ: "3" hoặc "4") vào ô trống bên cạnh. Mỗi ký tự đơn, trường âm hay âm ngắt đều được tính là 1 nhịp.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              {[
                { word: "おばあさん", key: "obaasan" },
                { word: "がっこう", key: "gakkou" },
                { word: "きって", key: "kitte" },
                { word: "ゆうき", actual: "ゆうき", key: "yuuki" },
                { word: "おっと", key: "otto" },
                { word: "いっしょ", key: "issho" },
                { word: "とうきょう", key: "toukyou" }
              ].map((item, idx) => {
                const isCorrect = moraInputs[item.key] === correctMoras[item.key as keyof typeof correctMoras];
                return (
                  <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col justify-between gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-black text-slate-800 font-serif">{item.actual || item.word}</span>
                      <button 
                        onClick={() => playAudio(item.actual || item.word)}
                        className="p-1.5 bg-white border border-slate-200 hover:bg-[#8B0000] hover:text-white rounded-xl transition cursor-pointer"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <input 
                        type="text"
                        placeholder="Số nhịp..."
                        value={moraInputs[item.key] || ""}
                        onChange={(e) => setMoraInputs({ ...moraInputs, [item.key]: e.target.value.trim() })}
                        disabled={showMoraAnswers}
                        className={`w-full px-3 py-2 border-2 rounded-xl text-sm font-black text-center ${
                          showMoraAnswers 
                            ? isCorrect ? "bg-green-50 border-green-500 text-green-700" : "bg-red-50 border-red-400 text-red-700"
                            : "bg-white border-slate-200 focus:border-[#8B0000]"
                        }`}
                      />
                      {showMoraAnswers && (
                        <div className="text-xs font-black uppercase text-slate-500 whitespace-nowrap">
                          Đúng: {correctMoras[item.key as keyof typeof correctMoras]}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button 
                onClick={checkMoraExercise}
                className="px-6 py-2.5 bg-[#1A1A1A] text-white font-black rounded-xl text-xs uppercase tracking-wider hover:bg-[#8B0000] transition cursor-pointer"
              >
                Kiểm tra kết quả
              </button>
            </div>
          </div>

          {/* EXERCISE 2 */}
          <div className="bg-white rounded-3xl border-2 border-[#1A1A1A] p-6 sm:p-8 shadow-[4px_4px_0px_#1A1A1A] space-y-6">
            <h3 className="text-lg sm:text-xl font-black text-[#8B0000] flex items-center gap-2" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              <Award className="w-5 h-5" /> Bài tập 2: Điền ký tự thích hợp (Tự gõ phím)
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 font-medium">
              Điền toàn bộ từ Hiragana hoặc Katakana chính xác (ví dụ: おおきい, ざっし) vào ô trống dựa vào gợi ý bên dưới:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {[
                { label: "1. お_きい (To lớn)", key: "q1" },
                { label: "2. け_さつ (Cảnh sát)", key: "q2" },
                { label: "3. き_ぷ (Vé tàu xe)", key: "q3" },
                { label: "4. と_ても (Rất nhiều)", key: "q4" },
                { label: "5. コ_ヒ_ (Cà phê)", key: "q5" },
                { label: "6. が_こう (Trường học)", key: "q6" },
                { label: "7. おと_san (Bố kính yêu)", key: "q7" },
                { label: "8. い_しょ (Cùng nhau)", key: "q8" },
                { label: "9. ゆ_びん (Bưu điện)", key: "q9" },
                { label: "10. ざ_し (Tạp chí)", key: "q10" }
              ].map((item, idx) => {
                const userAns = fillAnswers[item.key]?.trim().toLowerCase();
                const correctAns = correctFills[item.key as keyof typeof correctFills];
                const isCorrect = userAns === correctAns;
                
                return (
                  <div key={idx} className="flex flex-col gap-1.5 p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                    <span className="text-xs font-black text-gray-600">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <input 
                        type="text"
                        placeholder="Nhập chữ đầy đủ..."
                        value={fillAnswers[item.key] || ""}
                        onChange={(e) => setFillAnswers({ ...fillAnswers, [item.key]: e.target.value })}
                        disabled={showFillAnswers}
                        className={`w-full px-3 py-1.5 border-2 rounded-xl text-sm font-bold ${
                          showFillAnswers 
                            ? isCorrect ? "bg-green-50 border-green-500 text-green-700" : "bg-red-50 border-red-400 text-red-700"
                            : "bg-white border-slate-200 focus:border-[#8B0000]"
                        }`}
                      />
                      {showFillAnswers && (
                        <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Đúng: {correctAns}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button 
                onClick={checkFillExercise}
                className="px-6 py-2.5 bg-[#1A1A1A] text-white font-black rounded-xl text-xs uppercase tracking-wider hover:bg-[#8B0000] transition cursor-pointer"
              >
                Kiểm tra kết quả
              </button>
            </div>
          </div>

          {/* EXERCISE 3 */}
          <div className="bg-white rounded-3xl border-2 border-[#1A1A1A] p-6 sm:p-8 shadow-[4px_4px_0px_#1A1A1A] space-y-6">
            <h3 className="text-lg sm:text-xl font-black text-[#8B0000] flex items-center gap-2" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              <HelpCircle className="w-5 h-5" /> Bài tập 3: Chọn từ đúng ngữ cảnh
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 font-medium">
              Lựa chọn phương án chính xác nhất trong ngoặc để hoàn thành câu văn dưới đây:
            </p>

            <div className="space-y-4 pt-2">
              {[
                { q: "1. (おばさん / おばあさん) が台所にいます。 (Bà tôi đang ở trong bếp)", key: "mp1", opts: ["おばさん", "おばあさん"], correct: "おばあさん" },
                { q: "2. 彼は私の (おっと / おto) です。 (Anh ấy là chồng tôi)", key: "mp2", opts: ["おと", "おっと"], correct: "おっと" },
                { q: "3. この (かっこ / かこ) を開けてください。 (Hãy mở ngoặc đơn này ra)", key: "mp3", opts: ["かこ", "かっこ"], correct: "かっこ" },
                { q: "4. (とり / とおり) が青空を飛んでいます。 (Con chim đang bay trên bầu trời)", key: "mp4", opts: ["とり", "とおり"], correct: "とり" },
                { q: "5. (ゆき / ゆうき) が降っています。 (Tuyết đang rơi)", key: "mp5", opts: ["ゆき", "ゆうき"], correct: "ゆき" },
                { q: "6. (もと / もっと) 練習してください！ (Hãy luyện tập nhiều hơn nữa!)", key: "mp6", opts: ["もと", "もっと"], correct: "もっと" }
              ].map((item, idx) => {
                const userVal = selectedPairs[item.key];
                const isCorrect = userVal === item.correct;
                return (
                  <div key={idx} className="p-4 bg-slate-50/50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <span className="text-sm font-bold text-slate-800 leading-relaxed">{item.q}</span>
                    <div className="flex items-center gap-2">
                      <select 
                        value={userVal || ""}
                        onChange={(e) => setSelectedPairs({ ...selectedPairs, [item.key]: e.target.value })}
                        disabled={showPairsFeedback}
                        className={`px-3 py-1.5 border-2 rounded-xl text-xs font-black uppercase tracking-wider bg-white ${
                          showPairsFeedback 
                            ? isCorrect ? "border-green-500 text-green-700 bg-green-50" : "border-red-400 text-red-700 bg-red-50"
                            : "border-[#1A1A1A]"
                        }`}
                      >
                        <option value="">-- Chọn --</option>
                        {item.opts.map((opt, oIdx) => <option key={oIdx} value={opt}>{opt}</option>)}
                      </select>
                      {showPairsFeedback && !isCorrect && (
                        <span className="text-xs font-black uppercase text-[#8B0000]">{item.correct}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button 
                onClick={checkPairsExercise}
                className="px-6 py-2.5 bg-[#1A1A1A] text-white font-black rounded-xl text-xs uppercase tracking-wider hover:bg-[#8B0000] transition cursor-pointer"
              >
                Kiểm tra kết quả
              </button>
            </div>
          </div>

          {/* EXERCISE 4: TRANSLATION */}
          <div className="bg-white rounded-3xl border-2 border-[#1A1A1A] p-6 sm:p-8 shadow-[4px_4px_0px_#1A1A1A] space-y-6">
            <h3 className="text-lg sm:text-xl font-black text-[#8B0000] flex items-center gap-2" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              <FileText className="w-5 h-5" /> Bài tập 4: Dịch Việt - Nhật (Gợi ý phản xạ)
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 font-medium">
              Nhập câu tiếng Nhật tương ứng và đối chiếu với đáp án chuẩn học thuật của Thầy Sơn:
            </p>

            <div className="space-y-4">
              {[
                { label: "1. Tôi sống cùng với bà.", key: "t1", hint: "おばあさんとすんでいます。" },
                { label: "2. Hãy cho tôi một con tem thư.", key: "t2", hint: "きッてをください。" },
                { label: "3. Người đó thật đáng sợ.", key: "t3", hint: "そのひとはこわいです。" },
                { label: "4. Hãy tập luyện nhiều hơn nữa.", key: "t4", hint: "もっとれんしゅうしてください。" }
              ].map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <div className="text-xs font-black text-[#8B0000]">{item.label}</div>
                  <input 
                    type="text"
                    placeholder="Nhập câu tiếng Nhật..."
                    value={translationInputs[item.key] || ""}
                    onChange={(e) => setTranslationInputs({ ...translationInputs, [item.key]: e.target.value })}
                    disabled={showTransAnswers}
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl text-sm"
                  />
                  {showTransAnswers && (
                    <div className="text-xs font-black bg-green-50 border border-green-200 text-green-800 p-2 rounded-lg">
                      Gợi ý chuẩn: <span className="font-serif text-sm">{item.hint}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button 
                onClick={() => {
                  playSound.click();
                  setShowTransAnswers(true);
                }}
                className="px-6 py-2.5 bg-[#1A1A1A] text-white font-black rounded-xl text-xs uppercase tracking-wider hover:bg-[#8B0000] transition cursor-pointer"
              >
                Hiện gợi ý chuẩn
              </button>
            </div>
          </div>

          {/* EXERCISE 5: EDIT FAILURES */}
          <div className="bg-white rounded-3xl border-2 border-[#1A1A1A] p-6 sm:p-8 shadow-[4px_4px_0px_#1A1A1A] space-y-6">
            <h3 className="text-lg sm:text-xl font-black text-[#8B0000] flex items-center gap-2" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              <ThumbsUp className="w-5 h-5" /> Bài tập 5: Phát hiện và Sửa lỗi chính tả
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 font-medium">
              Các câu tiếng Nhật sau bị thiếu trường âm hoặc âm ngắt làm sai lệch nghĩa. Hãy sửa chúng lại cho đúng:
            </p>

            <div className="space-y-4">
              {[
                { 
                  q: "a) きのう、おばさんとこうえんにいきました。 (Ý định: Hôm qua tôi đi công viên với BÀ)", 
                  key: "c1", 
                  ans: "きのう、おばあさんとこうえんにいきました。" 
                },
                { 
                  q: "b) ゆきがあるから、あたたかいです。 (Ý định: Vì có DŨNG KHÍ nên lòng tôi luôn ấm áp)", 
                  key: "c2", 
                  ans: "ゆうきがあるから、あたたかいです。" 
                },
                { 
                  q: "c) かこをつけてください。 (Ý định: Hãy thêm DẤU NGOẶC ĐƠN)", 
                  key: "c3", 
                  ans: "かっこをつけてください。" 
                }
              ].map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <div className="text-xs font-bold text-slate-800 leading-relaxed">{item.q}</div>
                  <input 
                    type="text"
                    placeholder="Sửa lại cả câu chính xác..."
                    value={correctionInputs[item.key] || ""}
                    onChange={(e) => setCorrectionInputs({ ...correctionInputs, [item.key]: e.target.value })}
                    disabled={showCorrectionAnswers}
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl text-sm font-serif"
                  />
                  {showCorrectionAnswers && (
                    <div className="text-xs font-black bg-blue-50 border border-blue-200 text-blue-800 p-2 rounded-lg">
                      Đáp án đúng: <span className="font-serif text-sm">{item.ans}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-2">
              <button 
                onClick={handleReset}
                className="flex items-center gap-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset tất cả bài tập</span>
              </button>
              <button 
                onClick={() => {
                  playSound.click();
                  setShowCorrectionAnswers(true);
                }}
                className="px-6 py-2.5 bg-[#1A1A1A] text-white font-black rounded-xl text-xs uppercase tracking-wider hover:bg-[#8B0000] transition cursor-pointer"
              >
                Xem đáp án sửa lỗi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* traditional footer note block */}
      <section className="max-w-3xl mx-auto bg-white p-6 border-4 border-[#1A1A1A] relative shadow-[4px_4px_0px_#8B0000] rounded-2xl mt-12">
        <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-[#8B0000] text-white px-5 py-1 font-black text-xs tracking-widest uppercase rounded-md" style={{ fontFamily: "'Noto Serif JP', serif" }}>
          LỜI NHẮN TỪ THẦY SƠN
        </div>
        
        <div className="pt-4 space-y-4">
          <p className="text-sm sm:text-base text-gray-700 italic leading-relaxed text-center">
            "Muốn làm kẻ mạnh, trước tiên phải luyện phát âm chuẩn xác. Sai một nhịp, cả cuộc diện sẽ sụp đổ!"
          </p>
          
          <div className="flex items-center justify-end gap-3">
            <div className="text-right">
              <p className="font-black text-[#8B0000]" style={{ fontFamily: "'Noto Serif JP', serif" }}>Thầy Sơn</p>
              <p className="text-xs text-gray-500">Giáo chủ đạo tràng tiếng Nhật</p>
            </div>
            <div className="w-12 h-12 border-2 border-[#8B0000] rounded-full flex items-center justify-center bg-[#8B0000]/10 text-[#8B0000] font-black text-base">
              山
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
