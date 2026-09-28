import { VocabN3Item } from "../data/vocabN3";

export interface ConjugationResult {
  isVerb: boolean;
  wordType: "verb_godan" | "verb_ichidan" | "verb_suru" | "verb_kuru" | "noun_adj";
  typeLabel: string;
  kanjiPolite: string;
  kanaPolite: string;
  politeEnding: "ます" | "です";
  explanation: string;
}

// Special Godan verbs ending in -eru or -iru that conjugate with -r-imasu instead of dropping -ru
const GODAN_RU_VERBS = new Set([
  "殴る", "なぐる", "蹴る", "ける", "黙る", "だまる", "奢る", "おごる", 
  "預かる", "あずかる", "決まる", "きまる", "閉まる", "しまる", "直る", "なおる", 
  "治る", "亡くなる", "なくなる", "祈る", "いのる", "通る", "とおる", 
  "配る", "くばる", "断る", "ことわる", "見送る", "みおくる", "重なる", "かさなる", 
  "捕まる", "つかまる", "助かる", "たすかる", "掛かる", "かかる", "移る", "うつる", 
  "写る", "映る", "握る", "にぎる", "折る", "おる", "滑る", "すべる", 
  "光る", "ひかる", "縮む", "ちぢむ", "散る", "ちる", "限る", "かぎる", 
  "切る", "きる", "知る", "しる", "走る", "はしる", "入る", "はいる", 
  "要る", "いる", "減る", "へる", "喋る", "しゃべる", "帰る", "かえる", 
  "照る", "てる", "混ざる", "まざる", "交ざる", "尖る", "とがる", 
  "潜る", "もぐる", "威張る", "いばる", "怒鳴る", "どなる", "詰まる", "つまる", 
  "固まる", "かたまる", "埋まる", "うまる", "留まる", "とまる", "止まる",
  "跨る", "またがる", "擦る", "こする", "握る", "にぎる", "練る", "ねる",
  "焦る", "あせる", "茂る", "しげる", "蘇る", "よみがえる", "濁る", "にごる"
]);

// Non-verbs that might end in kana matching verb endings but are actually adverbs, adjectives, or pure nouns
const NON_VERB_EXCEPTIONS = new Set([
  "多く", "おおく", "近く", "ちかく", "遠く", "とおく", 
  "早く", "はやく", "速く", "遅く", "おそく"
]);

/**
 * Conjugates an N3 Vocabulary item into its polite form (Thể lịch sự).
 * If the word is a Verb (Động từ) -> Conjugates into 〜ます (e.g. 渇きます, 合格します).
 * If the word is a Noun / Adjective -> Appends 〜です (e.g. 男性です, 高齢です).
 */
export function conjugateN3Vocab(item: VocabN3Item): ConjugationResult {
  const kanji = item.kanji.trim();
  const kana = item.kana.trim();
  const collocation = (item.collocation || "").trim();

  // 1. Check non-verb exceptions
  if (NON_VERB_EXCEPTIONS.has(kanji) || NON_VERB_EXCEPTIONS.has(kana)) {
    return {
      isVerb: false,
      wordType: "noun_adj",
      typeLabel: "Phó từ / Danh từ",
      kanjiPolite: `${kanji}です`,
      kanaPolite: `${kana}です`,
      politeEnding: "です",
      explanation: "Từ này thuộc nhóm danh từ/phó từ, kết thúc dạng lịch sự với 「です」."
    };
  }

  // 2. Check Irregular Kuru (来る)
  if (kanji === "来る" || kana === "くる" || kanji.endsWith("来る") || kana.endsWith("くる")) {
    const prefixKanji = kanji.slice(0, -2);
    const prefixKana = kana.slice(0, -2);
    return {
      isVerb: true,
      wordType: "verb_kuru",
      typeLabel: "Động từ nhóm 3 (くる)",
      kanjiPolite: `${prefixKanji}来ます`,
      kanaPolite: `${prefixKana}きます`,
      politeEnding: "ます",
      explanation: "Động từ bất quy tắc nhóm 3 (くる), chia thể lịch sự dạng 「〜ます」."
    };
  }

  // 3. Check Suru verbs (Danh động từ V3)
  // Words used with する in collocations or ending in する
  const isSuru = kanji.endsWith("する") || 
    collocation.includes(`${kanji}する`) || 
    collocation.includes(`${kanji}して`) || 
    collocation.includes(`${kanji}した`) || 
    collocation.includes(`${kanji}しない`) ||
    collocation.includes(`${kanji}しよう`) ||
    collocation.includes(`${kana}する`);

  if (isSuru) {
    const baseKanji = kanji.endsWith("する") ? kanji.slice(0, -2) : kanji;
    const baseKana = kana.endsWith("する") ? kana.slice(0, -2) : kana;
    return {
      isVerb: true,
      wordType: "verb_suru",
      typeLabel: "Động từ nhóm 3 (する)",
      kanjiPolite: `${baseKanji}します`,
      kanaPolite: `${baseKana}します`,
      politeEnding: "ます",
      explanation: "Danh động từ nhóm 3 (〜する), chia thể lịch sự dạng 「〜します」 thay vì 「です」."
    };
  }

  // 4. Check Pure Verbs (Ending in kana: う, く, ぐ, す, つ, ぬ, ぶ, む, る)
  const lastCharKana = kana.slice(-1);
  const lastCharKanji = kanji.slice(-1);

  const isPureVerbEnding = /[うくぐすつぬぶむる]$/.test(lastCharKana) && /[うくぐすつぬぶむる]$/.test(lastCharKanji);

  if (isPureVerbEnding) {
    const stemKanji = kanji.slice(0, -1);
    const stemKana = kana.slice(0, -1);

    // Group 1: う -> います
    if (lastCharKana === "う") {
      return {
        isVerb: true,
        wordType: "verb_godan",
        typeLabel: "Động từ nhóm 1 (Godan)",
        kanjiPolite: `${stemKanji}います`,
        kanaPolite: `${stemKana}います`,
        politeEnding: "ます",
        explanation: "Động từ nhóm 1 đuôi 「う」 chuyển sang hàng い + ます (〜います)."
      };
    }

    // Group 1: く -> きます (Hành động 行く -> 行きます)
    if (lastCharKana === "く") {
      return {
        isVerb: true,
        wordType: "verb_godan",
        typeLabel: "Động từ nhóm 1 (Godan)",
        kanjiPolite: `${stemKanji}きます`,
        kanaPolite: `${stemKana}きます`,
        politeEnding: "ます",
        explanation: "Động từ nhóm 1 đuôi 「く」 chuyển sang hàng い + ます (〜きます)."
      };
    }

    // Group 1: ぐ -> ぎます
    if (lastCharKana === "ぐ") {
      return {
        isVerb: true,
        wordType: "verb_godan",
        typeLabel: "Động từ nhóm 1 (Godan)",
        kanjiPolite: `${stemKanji}ぎます`,
        kanaPolite: `${stemKana}ぎます`,
        politeEnding: "ます",
        explanation: "Động từ nhóm 1 đuôi 「ぐ」 chuyển sang hàng い + ます (〜ぎます)."
      };
    }

    // Group 1: す -> します
    if (lastCharKana === "す") {
      return {
        isVerb: true,
        wordType: "verb_godan",
        typeLabel: "Động từ nhóm 1 (Godan)",
        kanjiPolite: `${stemKanji}します`,
        kanaPolite: `${stemKana}します`,
        politeEnding: "ます",
        explanation: "Động từ nhóm 1 đuôi 「す」 chuyển sang hàng い + ます (〜します)."
      };
    }

    // Group 1: つ -> ちます
    if (lastCharKana === "つ") {
      return {
        isVerb: true,
        wordType: "verb_godan",
        typeLabel: "Động từ nhóm 1 (Godan)",
        kanjiPolite: `${stemKanji}ちます`,
        kanaPolite: `${stemKana}ちます`,
        politeEnding: "ます",
        explanation: "Động từ nhóm 1 đuôi 「つ」 chuyển sang hàng い + ます (〜ちます)."
      };
    }

    // Group 1: ぬ -> にます
    if (lastCharKana === "ぬ") {
      return {
        isVerb: true,
        wordType: "verb_godan",
        typeLabel: "Động từ nhóm 1 (Godan)",
        kanjiPolite: `${stemKanji}にます`,
        kanaPolite: `${stemKana}にます`,
        politeEnding: "ます",
        explanation: "Động từ nhóm 1 đuôi 「ぬ」 chuyển sang hàng い + ます (〜にます)."
      };
    }

    // Group 1: ぶ -> びます
    if (lastCharKana === "ぶ") {
      return {
        isVerb: true,
        wordType: "verb_godan",
        typeLabel: "Động từ nhóm 1 (Godan)",
        kanjiPolite: `${stemKanji}びます`,
        kanaPolite: `${stemKana}びます`,
        politeEnding: "ます",
        explanation: "Động từ nhóm 1 đuôi 「ぶ」 chuyển sang hàng い + ます (〜びます)."
      };
    }

    // Group 1: む -> みます
    if (lastCharKana === "む") {
      return {
        isVerb: true,
        wordType: "verb_godan",
        typeLabel: "Động từ nhóm 1 (Godan)",
        kanjiPolite: `${stemKanji}みます`,
        kanaPolite: `${stemKana}みます`,
        politeEnding: "ます",
        explanation: "Động từ nhóm 1 đuôi 「む」 chuyển sang hàng い + ます (〜みます)."
      };
    }

    // Ending in る: Check if Godan exception or Ichidan
    if (lastCharKana === "る") {
      const isGodanSpecial = GODAN_RU_VERBS.has(kanji) || GODAN_RU_VERBS.has(kana);

      if (isGodanSpecial) {
        return {
          isVerb: true,
          wordType: "verb_godan",
          typeLabel: "Động từ nhóm 1 (Godan)",
          kanjiPolite: `${stemKanji}ります`,
          kanaPolite: `${stemKana}ります`,
          politeEnding: "ます",
          explanation: "Động từ nhóm 1 đặc biệt đuôi 「る」 chia theo hàng い + ます (〜ります)."
        };
      }

      // Check if preceding kana is i or e vowel (Ichidan)
      const prevCharKana = stemKana.slice(-1);
      const isIEVowel = /[いきしちにひみりえけせてねへめれ]$/.test(prevCharKana);

      if (isIEVowel) {
        return {
          isVerb: true,
          wordType: "verb_ichidan",
          typeLabel: "Động từ nhóm 2 (Ichidan)",
          kanjiPolite: `${stemKanji}ます`,
          kanaPolite: `${stemKana}ます`,
          politeEnding: "ます",
          explanation: "Động từ nhóm 2 đuôi 「〜る」 bỏ 「る」 thêm 「ます」."
        };
      } else {
        // Ending in a-ru, o-ru, u-ru -> Godan
        return {
          isVerb: true,
          wordType: "verb_godan",
          typeLabel: "Động từ nhóm 1 (Godan)",
          kanjiPolite: `${stemKanji}ります`,
          kanaPolite: `${stemKana}ります`,
          politeEnding: "ます",
          explanation: "Động từ nhóm 1 đuôi 「る」 chuyển sang hàng い + ます (〜ります)."
        };
      }
    }
  }

  // 5. Default: Nouns, Adjectives, Expressions
  return {
    isVerb: false,
    wordType: "noun_adj",
    typeLabel: "Danh từ / Tính từ",
    kanjiPolite: `${kanji}です`,
    kanaPolite: `${kana}です`,
    politeEnding: "です",
    explanation: "Từ này là danh từ hoặc tính từ, kết thúc dạng lịch sự với 「です」."
  };
}
