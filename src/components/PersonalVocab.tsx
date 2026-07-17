import React, { useState } from "react";
import { Vocabulary, UserProgress } from "../types";
import { playSound } from "../utils/audio";
import { Plus, Trash2, Edit3, Search, BookOpen, Check, X, Bookmark, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PersonalVocabProps {
  customVocab: Vocabulary[];
  setCustomVocab: React.Dispatch<React.SetStateAction<Vocabulary[]>>;
  progress: UserProgress;
  updateProgress: (updated: Partial<UserProgress>) => void;
  onGoBack: () => void;
  onPracticeCustom: () => void;
}

export default function PersonalVocab({ customVocab, setCustomVocab, progress, updateProgress, onGoBack, onPracticeCustom }: PersonalVocabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("Tất cả");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states for adding/editing
  const [word, setWord] = useState("");
  const [reading, setReading] = useState("");
  const [meaning, setMeaning] = useState("");
  const [romaji, setRomaji] = useState("");
  const [example, setExample] = useState("");
  const [exampleMeaning, setExampleMeaning] = useState("");
  const [level, setLevel] = useState<"N5" | "N4" | "N3" | "Anime" | "Travel">("N5");
  const [category, setCategory] = useState("Sổ tay");

  const handleAddWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!word || !reading || !meaning) {
      alert("Hãy điền đầy đủ Chữ Nhật, Cách đọc và Ý nghĩa nhé!");
      return;
    }

    playSound.click();

    const newWord: Vocabulary = {
      id: `custom_${Date.now()}`,
      word,
      reading,
      romaji: romaji || word.toLowerCase(),
      meaning,
      example: example || "N/A",
      exampleMeaning: exampleMeaning || "N/A",
      level,
      category: category || "Sổ tay"
    };

    setCustomVocab(prev => [newWord, ...prev]);
    
    // Reset form states
    setWord("");
    setReading("");
    setMeaning("");
    setRomaji("");
    setExample("");
    setExampleMeaning("");
    setCategory("Sổ tay");
    setShowAddForm(false);
    
    // Award XP
    updateProgress({ xp: progress.xp + 15 });
    playSound.achievement();
  };

  const handleDeleteWord = (id: string) => {
    playSound.click();
    if (window.confirm("Học trò có chắc chắn muốn xóa từ vựng này khỏi sổ tay không?")) {
      setCustomVocab(prev => prev.filter(v => v.id !== id));
    }
  };

  const startEditing = (vocab: Vocabulary) => {
    playSound.click();
    setEditingId(vocab.id);
    setWord(vocab.word);
    setReading(vocab.reading);
    setMeaning(vocab.meaning);
    setRomaji(vocab.romaji);
    setExample(vocab.example);
    setExampleMeaning(vocab.exampleMeaning);
    setLevel(vocab.level);
    setCategory(vocab.category);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    playSound.click();

    setCustomVocab(prev => prev.map(v => {
      if (v.id === editingId) {
        return {
          ...v,
          word,
          reading,
          meaning,
          romaji: romaji || word.toLowerCase(),
          example: example || "N/A",
          exampleMeaning: exampleMeaning || "N/A",
          level,
          category
        };
      }
      return v;
    }));

    setEditingId(null);
    setWord("");
    setReading("");
    setMeaning("");
    setRomaji("");
    setExample("");
    setExampleMeaning("");
    setCategory("Sổ tay");
  };

  const handleSpeak = (text: string) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    window.speechSynthesis.speak(utterance);
  };

  // Filter notebook list
  const filteredList = customVocab.filter(v => {
    const matchesSearch = v.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          v.reading.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          v.meaning.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === "Tất cả" || v.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div id="personal-vocab-container" className="space-y-6">
      
      {/* Notebook Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-[32px] border border-natural-border shadow-sm">
        <div className="space-y-1">
          <button 
            onClick={onGoBack}
            className="text-natural-muted hover:text-pink-600 text-xs font-bold transition-colors cursor-pointer"
          >
            ← Trở về trang chủ
          </button>
          <h3 className="text-xl font-black text-natural-deep flex items-center gap-2 mt-1">
            <Bookmark className="w-5 h-5 text-pink-500" />
            <span>SỔ TAY CỦA EM</span>
            <span className="text-xs bg-pink-50 text-pink-600 px-2.5 py-0.5 rounded-full font-bold border border-pink-100">
              {customVocab.length} từ ghi chép
            </span>
          </h3>
        </div>

        {/* Buttons to trigger new item additions or practice mode */}
        <div className="flex gap-2 shrink-0">
          {customVocab.length >= 3 && (
            <button
              onClick={() => { playSound.click(); onPracticeCustom(); }}
              className="px-4 py-2.5 bg-natural-olive hover:opacity-90 text-white font-extrabold rounded-2xl text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              📖 Ôn luyện sổ tay
            </button>
          )}
          <button
            onClick={() => { playSound.click(); setShowAddForm(!showAddForm); setEditingId(null); }}
            className="px-4 py-2.5 bg-pink-600 hover:bg-pink-700 text-white font-extrabold rounded-2xl text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm từ mới</span>
          </button>
        </div>
      </div>

      {/* Form Card for Addition or Editing */}
      <AnimatePresence>
        {(showAddForm || editingId) && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-white rounded-[32px] p-6 border border-natural-border shadow-md max-w-2xl mx-auto"
          >
            <h4 className="font-black text-natural-deep text-base mb-4 flex items-center gap-2 border-b border-natural-border pb-2">
              <BookOpen className="w-4 h-4 text-pink-500" />
              <span>{editingId ? "CẬP NHẬT TỪ GHI CHÉP" : "GHI CHÉP TỪ VỰNG MỚI"}</span>
            </h4>

            <form onSubmit={editingId ? handleSaveEdit : handleAddWord} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-natural-muted">Chữ Nhật (Kanji hoặc Kana) *</label>
                  <input
                    type="text"
                    required
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    placeholder="Ví dụ: 食べる, 猫, 絆..."
                    className="w-full bg-natural-soft text-natural-text border border-natural-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-natural-muted">Cách đọc (Hiragana) *</label>
                  <input
                    type="text"
                    required
                    value={reading}
                    onChange={(e) => setReading(e.target.value)}
                    placeholder="Ví dụ: たべる, ねco, きずな..."
                    className="w-full bg-natural-soft text-natural-text border border-natural-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-natural-muted">Romaji phiên âm</label>
                  <input
                    type="text"
                    value={romaji}
                    onChange={(e) => setRomaji(e.target.value)}
                    placeholder="Ví dụ: taberu, neko..."
                    className="w-full bg-natural-soft text-natural-text border border-natural-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-natural-muted">Ý nghĩa tiếng Việt *</label>
                  <input
                    type="text"
                    required
                    value={meaning}
                    onChange={(e) => setMeaning(e.target.value)}
                    placeholder="Ví dụ: Ăn, Con mèo..."
                    className="w-full bg-natural-soft text-natural-text border border-natural-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-natural-muted">Trình độ phân loại</label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as any)}
                    className="w-full border border-natural-border bg-natural-soft text-natural-text rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                  >
                    <option value="N5">N5 Sơ cấp</option>
                    <option value="N4">N4 Sơ cấp</option>
                    <option value="N3">N3 Trung cấp</option>
                    <option value="Anime">Anime Giao tiếp</option>
                    <option value="Travel">Du lịch Đời sống</option>
                  </select>
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-natural-muted">Chủ đề phân nhóm</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Ví dụ: Ăn uống, Trường học..."
                    className="w-full bg-natural-soft text-natural-text border border-natural-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-natural-muted">Câu ví dụ bằng tiếng Nhật</label>
                <input
                  type="text"
                  value={example}
                  onChange={(e) => setExample(e.target.value)}
                  placeholder="Ví dụ: りんごを食べます。"
                  className="w-full bg-natural-soft text-natural-text border border-natural-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-natural-muted">Nghĩa tiếng Việt của câu ví dụ</label>
                <input
                  type="text"
                  value={exampleMeaning}
                  onChange={(e) => setExampleMeaning(e.target.value)}
                  placeholder="Ví dụ: Tôi ăn quả táo."
                  className="w-full bg-natural-soft text-natural-text border border-natural-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-natural-border mt-4">
                <button
                  type="button"
                  onClick={() => { playSound.click(); setShowAddForm(false); setEditingId(null); }}
                  className="px-4 py-2 border border-natural-border text-natural-text text-xs font-bold rounded-xl hover:bg-natural-sand transition-all cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-pink-600 text-white text-xs font-extrabold rounded-xl shadow-sm hover:bg-pink-700 transition-all cursor-pointer"
                >
                  {editingId ? "Cập nhật (+10 XP)" : "Lưu vào sổ tay (+15 XP)"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notebook Search & Level Filter Row */}
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        {/* Search Input Box */}
        <div className="relative w-full sm:flex-1">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-natural-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm chữ Nhật, cách đọc, hay ý nghĩa..."
            className="w-full bg-white border border-natural-border rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-natural-text focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm"
          />
        </div>

        {/* Level Filters */}
        <div className="flex gap-1.5 shrink-0 w-full sm:w-auto overflow-x-auto pb-1 scrollbar-none">
          {["Tất cả", "N5", "N4", "N3", "Anime", "Travel"].map((lvl) => (
            <button
              key={lvl}
              onClick={() => { playSound.click(); setSelectedLevel(lvl); }}
              className={`px-4 py-2 rounded-2xl text-xs font-extrabold border transition-all shrink-0 cursor-pointer ${selectedLevel === lvl ? "bg-pink-600 border-pink-600 text-white shadow-sm" : "bg-white border-natural-border text-natural-text hover:bg-natural-soft"}`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Vocabulary List Cards */}
      {filteredList.length === 0 ? (
        <div className="bg-white rounded-[32px] p-12 text-center border border-natural-border shadow-sm space-y-4">
          <span className="text-4xl">📚</span>
          <h4 className="font-black text-natural-deep text-base">Sổ tay học tập chưa có ghi chép phù hợp</h4>
          <p className="text-natural-muted text-xs max-w-sm mx-auto leading-relaxed">
            Hãy bắt đầu lưu giữ những từ vựng yêu thích bằng nút &quot;Thêm từ mới&quot; phía trên nhé. Sách vở Thầy Sơn luôn chào đón em!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredList.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-[32px] p-6 border border-natural-border shadow-sm flex flex-col justify-between hover:border-pink-300 hover:shadow-md transition-all relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-natural-border/40 pb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-pink-50 text-pink-600 border border-pink-100">
                    {item.level} • {item.category}
                  </span>
                  
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => handleSpeak(item.word)}
                      className="p-1.5 hover:bg-natural-soft text-pink-600 rounded-lg transition-all cursor-pointer"
                      title="Nghe phát âm chuẩn"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => startEditing(item)}
                      className="p-1.5 hover:bg-natural-soft text-pink-600 rounded-lg transition-all cursor-pointer"
                      title="Sửa từ vựng"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteWord(item.id)}
                      className="p-1.5 hover:bg-natural-soft text-rose-500 rounded-lg transition-all cursor-pointer"
                      title="Xóa từ vựng"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-2xl font-black text-natural-deep font-sans tracking-wide">
                    {item.word}
                  </h4>
                  <p className="text-xs text-natural-muted font-mono mt-0.5">[{item.reading}]</p>
                  <p className="text-sm font-black text-pink-600 mt-2">{item.meaning}</p>
                </div>

                {item.example !== "N/A" && (
                  <div className="bg-natural-soft p-3 rounded-xl text-xs space-y-1 border border-natural-border/60">
                    <p className="font-bold text-natural-text">{item.example}</p>
                    <p className="text-natural-muted italic">{item.exampleMeaning}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
