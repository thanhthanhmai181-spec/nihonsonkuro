import { UserProgress, Vocabulary } from "../types";

export interface UserLearnedStats {
  vocab: number;     // Tổng từ vựng đã thuộc (N5 + N4 + N3, tối đa 2436)
  grammar: number;   // Tổng ngữ pháp đã thuộc (N5 + N4 + N3, tối đa 293)
  kanji: number;     // Tổng Hán tự đã thuộc (N5 + N4 + N3, tối đa 614)
  total: number;     // Tổng điểm kiến thức = Vocab + Grammar + Kanji (tối đa 3343)

  // Chi tiết từng cấp độ
  grammarN5: number;
  grammarN4: number;
  grammarN3: number;

  kanjiN5: number;
  kanjiN4: number;
  kanjiN3: number;

  vocabN5: number;
  vocabN4: number;
  vocabN3: number;
}

export function calculateDetailedUserStats(
  progress?: UserProgress, 
  vocabList?: Vocabulary[],
  customGetter?: (key: string) => string | null
): UserLearnedStats {
  const getItem = (key: string): string | null => {
    if (customGetter) {
      return customGetter(key);
    }
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        return localStorage.getItem(key);
      }
    } catch (e) {}
    return null;
  };

  // 1. Ngữ pháp N5
  let g5 = 0;
  try {
    const saved = getItem("sonkuro_n5_grammar_progress_v1");
    if (saved) {
      const parsed = typeof saved === "object" ? saved : JSON.parse(saved);
      if (parsed && Array.isArray(parsed.rememberedFlashcards)) {
        g5 = parsed.rememberedFlashcards.length;
      }
    }
  } catch (e) {}

  // 2. Ngữ pháp N4
  let g4 = 0;
  try {
    const saved = getItem("sk_n4_mastered_ids");
    if (saved) {
      const parsed = typeof saved === "object" ? saved : JSON.parse(saved);
      if (Array.isArray(parsed)) {
        g4 = parsed.length;
      }
    }
  } catch (e) {}

  // 3. Ngữ pháp N3
  let g3 = 0;
  try {
    const saved = getItem("n3_grammar_progress");
    if (saved) {
      const parsed = typeof saved === "object" ? saved : JSON.parse(saved);
      if (parsed && parsed.flashcards) {
        g3 = Object.values(parsed.flashcards).filter(status => status === "learned").length;
      }
    }
  } catch (e) {}

  // 4. Hán tự N5
  let k5 = 0;
  try {
    const saved = getItem("kanji_n5_state");
    if (saved) {
      const parsed = typeof saved === "object" ? saved : JSON.parse(saved);
      if (parsed && Array.isArray(parsed.learnedIds)) {
        k5 = parsed.learnedIds.length;
      }
    }
  } catch (e) {}

  // 5. Hán tự N4
  let k4 = 0;
  try {
    const saved = getItem("n4_known_kanji");
    if (saved) {
      const parsed = typeof saved === "object" ? saved : JSON.parse(saved);
      if (Array.isArray(parsed)) {
        k4 = parsed.length;
      }
    }
  } catch (e) {}

  // 6. Hán tự N3
  let k3 = 0;
  try {
    const saved = getItem("kanji_n3_progress");
    if (saved) {
      const parsed = typeof saved === "object" ? saved : JSON.parse(saved);
      if (parsed && Array.isArray(parsed.viewedKanjis)) {
        k3 = parsed.viewedKanjis.length;
      }
    }
  } catch (e) {}

  // 7. Từ vựng N5 (Tối đa 953)
  const n5LearnedSet = new Set<number>();
  try {
    const saved = getItem("n5_srs_v8");
    if (saved) {
      const parsed = typeof saved === "object" ? saved : JSON.parse(saved);
      for (const rawKey in parsed) {
        const item = parsed[rawKey];
        const numId = Number(String(rawKey).replace(/^(n5_|v_n5_|v_)/i, ""));
        const repCount = Array.isArray(item) ? item[3] : (typeof item === 'object' ? (item?.repCount || 0) : (item === true ? 1 : 0));
        const interval = Array.isArray(item) ? item[0] : (typeof item === 'object' ? (item?.interval || 0) : 0);

        if ((repCount > 0 || interval > 0) && !isNaN(numId) && numId >= 1 && numId <= 953) {
          n5LearnedSet.add(numId);
        }
      }
    }
  } catch (e) {}

  const allLearnedWordIds = new Set<string>();
  if (progress && Array.isArray(progress.learnedWordIds)) {
    progress.learnedWordIds.forEach(id => allLearnedWordIds.add(String(id)));
  }
  try {
    const savedProg = getItem("hoc_cung_thay_son_progress");
    if (savedProg) {
      const parsedProg = typeof savedProg === "object" ? savedProg : JSON.parse(savedProg);
      if (Array.isArray(parsedProg.learnedWordIds)) {
        parsedProg.learnedWordIds.forEach((id: any) => allLearnedWordIds.add(String(id)));
      }
    }
  } catch (e) {}

  allLearnedWordIds.forEach(idStr => {
    const matchN5 = idStr.match(/^(?:n5_|v_n5_|v_)?(\d+)$/i);
    if (matchN5) {
      const numId = parseInt(matchN5[1], 10);
      if (numId >= 1 && numId <= 953) {
        n5LearnedSet.add(numId);
      }
    }
    if (vocabList && vocabList.length > 0) {
      const wordObj = vocabList.find(v => v.id === idStr);
      if (wordObj && wordObj.level === "N5") {
        const matchedNum = parseInt(wordObj.id.replace(/\D/g, ""), 10);
        if (!isNaN(matchedNum) && matchedNum >= 1 && matchedNum <= 953) {
          n5LearnedSet.add(matchedNum);
        }
      }
    }
  });
  const v5 = Math.min(953, n5LearnedSet.size);

  // 8. Từ vựng N4 (Tối đa 586)
  const n4LearnedSet = new Set<string>();
  try {
    const saved = getItem("sk_vocab_n4_progress");
    if (saved) {
      const parsed = typeof saved === "object" ? saved : JSON.parse(saved);
      for (const k in parsed) {
        if (parsed[k] === "mastered" || parsed[k] === "learning" || parsed[k] === true) {
          n4LearnedSet.add(String(k));
        }
      }
    }
  } catch (e) {}

  allLearnedWordIds.forEach(idStr => {
    if (idStr.startsWith("n4_")) {
      n4LearnedSet.add(idStr.replace("n4_", ""));
    }
    if (vocabList && vocabList.length > 0) {
      const wordObj = vocabList.find(v => v.id === idStr);
      if (wordObj && wordObj.level === "N4") {
        n4LearnedSet.add(wordObj.id);
      }
    }
  });
  const v4 = Math.min(586, n4LearnedSet.size);

  // 9. Từ vựng N3 (Tối đa 897)
  const n3LearnedSet = new Set<string>();
  try {
    const saved = getItem("sk_vocab_n3_progress");
    if (saved) {
      const parsed = typeof saved === "object" ? saved : JSON.parse(saved);
      for (const k in parsed) {
        if (parsed[k] === "mastered" || parsed[k] === "learning" || parsed[k] === true) {
          n3LearnedSet.add(String(k));
        }
      }
    }
  } catch (e) {}

  allLearnedWordIds.forEach(idStr => {
    if (idStr.startsWith("n3_")) {
      n3LearnedSet.add(idStr.replace("n3_", ""));
    }
    if (vocabList && vocabList.length > 0) {
      const wordObj = vocabList.find(v => v.id === idStr);
      if (wordObj && wordObj.level === "N3") {
        n3LearnedSet.add(wordObj.id);
      }
    }
  });
  const v3 = Math.min(897, n3LearnedSet.size);

  const grammarTotal = Math.min(293, g5 + g4 + g3);
  const kanjiTotal = Math.min(614, k5 + k4 + k3);
  const vocabTotal = Math.min(2436, v5 + v4 + v3);

  return {
    vocab: vocabTotal,
    grammar: grammarTotal,
    kanji: kanjiTotal,
    total: vocabTotal + grammarTotal + kanjiTotal,

    grammarN5: g5,
    grammarN4: g4,
    grammarN3: g3,

    kanjiN5: k5,
    kanjiN4: k4,
    kanjiN3: k3,

    vocabN5: v5,
    vocabN4: v4,
    vocabN3: v3,
  };
}
