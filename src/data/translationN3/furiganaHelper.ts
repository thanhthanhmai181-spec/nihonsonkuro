import { TranslationSentence } from "./types";

/**
 * High-accuracy dictionary of Kanji phrases to Furigana (Hiragana) readings
 * covering JLPT N3 vocabulary, grammar patterns, verbs, nouns, and expressions.
 */
export const KANJI_READING_DICT: Record<string, string> = {
  // Lesson 1 - Time & State
  "若いうちに": "わかいうちに",
  "若いうち": "わかいうち",
  "若い": "わかい",
  "勉強しなさい": "べんきょうしなさい",
  "勉強": "べんきょう",
  "雨が降らない": "あめがふらない",
  "雨": "あめ",
  "降らない": "ふらない",
  "降り始めた": "ふりはじめた",
  "帰りましょう": "かえりましょう",
  "彼": "かれ",
  "来ない": "こない",
  "準備": "じゅんび",
  "終わらせた": "おわらせた",
  "暗くならない": "くらくならない",
  "家に帰りたい": "いえにかえりたい",
  "家": "いえ",
  "帰りたい": "かえりたい",
  "彼女": "かのじょ",
  "気づかない": "きづかない",
  "置いた": "おいた",
  "忘れない": "わすれない",
  "取っておこう": "とっておこう",
  "料理": "りょうり",
  "作っていた": "つくっていた",
  "私": "わたし",
  "仕事": "しごと",
  "子供たち": "こどもたち",
  "子供": "こども",
  "遊んでいた": "あそんでいた",
  "見ていた": "みていた",
  "本": "ほん",
  "読んでいた": "よんでいた",
  "寝ている": "ねている",
  "掃除": "そうじ",
  "話している": "はなしている",
  "運転": "うんてん",
  "音楽": "おんがく",
  "聴いていた": "きいていた",
  "間に": "あいだに",
  "電話": "でんわ",
  "鳴った": "なった",
  "友達": "ともだち",
  "訪ねてきた": "たずねてきた",
  "開いた": "あいた",
  "地震": "じしん",
  "起きた": "おきた",
  "笑い出した": "わらいだした",
  "宿題": "しゅくだい",
  "遊びに行けない": "あそびにいけない",
  "お金": "おかね",
  "払って": "はらって",
  "商品": "しょうひん",
  "受け取れない": "うけとれない",
  "許可": "きょか",
  "始められない": "はじめられない",
  "出かけられない": "でかけられない",
  "謝って": "あやまっても",
  "許してもらえない": "ゆるしてもらえない",
  "試験": "しけん",
  "合格できない": "ごうかくできない",
  "合格": "ごうかく",
  "出かける": "でかける",
  "帰ってきた": "かえってきた",
  "今": "いま",
  "ご飯": "ごはん",
  "食べている": "たべている",
  "寝る": "ねる",
  "終わった": "おわった",

  // Lesson 2 - Relation & Proportion
  "言うとおりに": "いうとおりに",
  "言う": "いう",
  "説明書": "せつめいしょ",
  "組み立てました": "くみたてました",
  "予想どおり": "よそうどおり",
  "予想": "よそう",
  "難しかった": "むずかしかった",
  "計画": "けいかく",
  "進んでいます": "すすんでいます",
  "指示": "しじ",
  "行動": "こうどう",
  "人によって": "ひとによって",
  "人": "ひと",
  "考え方": "かんがえかた",
  "違います": "ちがいます",
  "国": "くに",
  "文化": "ぶんか",
  "異なります": "ことなります",
  "天気": "てんき",
  "予定": "よてい",
  "変更します": "へんこうします",
  "年齢": "ねんれい",
  "興味": "きょうみ",
  "変わります": "かわります",
  "場所": "ばしょ",
  "物価": "ぶっか",
  "店": "みせ",
  "割引": "わりびき",
  "旅行するたびに": "りょこうするたびに",
  "旅行": "りょこう",
  "写真": "しゃしん",
  "撮る": "とる",
  "会うたびに": "あうたびに",
  "笑顔": "えがお",
  "散歩のたびに": "さんぽのたびに",
  "散歩": "さんぽ",
  "神社": "じんじゃ",
  "立ち寄る": "たちよる",
  "聞くたびに": "きくたびに",
  "家族": "かぞく",
  "思い出す": "おもいだす",
  "食べる": "たべる",
  "太る": "ふとる",
  "山": "やま",
  "登る": "のぼる",
  "景色": "けしき",
  "綺麗": "きれい",
  "読む": "よむ",
  "面白い": "おもしろい",
  "練習する": "れんしゅうする",
  "上手": "じょうず",
  "時間": "じかん",
  "経つ": "たつ",
  "不安": "ふあん",
  "買い物": "かいもの",
  "郵便局": "ゆうびんきょく",
  "犬": "いぬ",
  "通勤": "つうきん",
  "読書": "どくしょ",
  "出張": "しゅっちょう",
  "観光": "かんこう",
  "掃除のついでに": "そうじのついでに",
  "整理": "せいり",

  // Lesson 3 - Comparison & Degree
  "泣きたい": "なきたい",
  "足": "あし",
  "痛くて": "いたくて",
  "歩けない": "あるけない",
  "声": "こえ",
  "出ない": "でない",
  "倒れる": "たおれる",
  "忙しい": "いそがしい",
  "死ぬほど": "しぬほど",
  "疲れた": "つかれた",
  "富士山": "ふじさん",
  "親切な人": "しんせつなひと",
  "親切": "しんせつ",
  "大切なもの": "たいせつなもの",
  "大切": "たいせつ",
  "春": "はる",
  "夏": "なつ",
  "秋": "あき",
  "冬": "ふゆ",
  "諦める": "あきらめる",
  "満員電車": "まんいんでんしゃ",
  "乗る": "のる",
  "歩いていく": "あるいていく",
  "冷たいビール": "つめたいビール",
  "温泉": "おんせん",
  "最高": "さいこう",

  // Lesson 4 - Limitation & Basis
  "姉": "あね",
  "静か": "しずか",
  "妹": "いもうと",
  "賑やか": "にぎやか",
  "兄": "あに",
  "弟": "おとうと",
  "賛成": "さんせい",
  "反対": "はんたい",
  "都市部": "としぶ",
  "農村部": "のうそんぶ",
  "教室": "きょうしつ",
  "携帯電話": "けいたいでんわ",
  "使用": "しよう",
  "禁止": "きんし",
  "会議室": "かいぎしつ",
  "発表": "はっぴょう",
  "歴史": "れきし",
  "重要": "じゅうよう",
  "結果": "けっか",
  "売り上げ": "うりあげ",
  "減少": "げんしょう",
  "事実": "じじつ",
  "法律": "ほうりつ",
  "基づいて": "もとづいて",
  "判断": "はんだん",
  "調査結果": "ちょうさけっか",
  "データ": "データ",
  "分析": "ぶんせき",

  // Lesson 5 - Contrast & Replacement
  "便利": "べんり",
  "危険": "きけん",
  "都会": "とかい",
  "田舎": "いなか",
  "英語": "えいご",
  "得意": "とくい",
  "苦手": "にがて",
  "自由": "じゆう",
  "責任": "せきにん",
  "増加": "ぞうか",
  "先生": "せんせい",
  "指導": "しどう",
  "皿洗い": "さらあらい",
  "車": "くるま",
  "自転車": "じてんしゃ",

  // Lesson 6 - Scope & Extent
  "太陽": "たいよう",
  "地球": "ちきゅう",
  "回っている": "まわっている",
  "東京": "とうきょう",
  "首相": "しゅしょう",
  "選手": "せんしゅ",
  "全国": "ぜんこく",
  "関東地方": "かんとうちほう",
  "大雨": "おおあめ",
  "3日間": "みっかかん",
  "10年間": "じゅうねんかん",
  "祭り": "まつり",
  "開催": "かいさい",

  // Lesson 7 - Natural Progression & Association
  "人口": "じんこう",
  "発展": "はってん",
  "生活": "せいかつ",
  "豊か": "ゆたか",
  "成長": "せいちょう",
  "規則": "きそく",
  "従う": "したがう",
  "命令": "めいれい",
  "気温": "きおん",
  "低下": "ていか",
  "上昇": "じょうしょう",

  // Lesson 8 - Absolute Certainty & Modesty
  "成功": "せいこう",
  "嘘": "うそ",
  "失敗": "しっぱい",
  "努力": "どりょく",
  "理由": "りゆう",
  "単なる": "たんなる",
  "冗談": "じょうだん",
  "過ち": "あやまち",
  "真実": "しんじつ",

  // Lesson 9 - Range, Media & Channels
  "アニメ": "アニメ",
  "漫画": "まんが",
  "桜": "さくら",
  "友人": "ゆうじん",
  "経験": "けいけん",
  "学ぶ": "まなぶ",
  "年間": "ねんかん",
  "通じて": "をつうじて",
  "インターネット": "インターネット",
  "情報": "じょうほう",

  // Lesson 10 - Trigger & Milestone
  "留学": "りゅうがく",
  "日本留学": "にほんりゅうがく",
  "卒業": "そつぎょう",
  "就職": "しゅうしょく",
  "映画": "えいが",
  "小説": "しょうせつ",
  "調査": "ちょうさ",
  "結論": "けつろん",
  "事故": "じこ",
  "安全対策": "あんぜんたいさく",
  "強化": "きょうか",

  // Lesson 11 - Logic & Constraint
  "嘘をつく": "うそをつく",
  "嫌い": "きらい",
  "秘密": "ひみつ",
  "守る": "まもる",
  "約束": "やくそく",
  "参加": "さんか",
  "断る": "ことわる",
  "会社": "かいしゃ",
  "辞める": "やめる",
  "病気": "びょうき",
  "休む": "やすむ",

  // Lesson 12 - Cause & Inevitability
  "台風": "たいふう",
  "電車": "でんしゃ",
  "遅延": "ちえん",
  "遅れ": "おくれ",
  "知らない": "しらない",
  "元気": "げんき",
  "高い": "たかい",
  "買えない": "かえない",
  "給料": "きゅうりょう",
  "少ない": "すくない",

  // Lesson 13 - Obligation & Essence
  "早く寝る": "はやくねる",
  "復習": "ふくしゅう",
  "悪口": "わるくち",
  "感動": "かんどう",
  "素晴らしい": "すばらしい",
  "子供のころ": "こどものころ",
  "懐かしい": "なつかしい",
  "挨拶": "あいさつ",

  // Lesson 14 - Habits, Rules & Mechanisms
  "嬉しい": "うれしい",
  "残念": "ざんねん",
  "毎日運動": "まいにちうんどう",
  "運動": "うんどう",
  "砂糖": "さとう",
  "控え": "ひかえ",
  "自動ドア": "じどうドア",
  "開く": "あく",
  "閉まる": "しまる",

  // Lesson 15 - State & Tendency
  "焼きたて": "やきたて",
  "パン": "パン",
  "炊きたて": "たきたて",
  "風邪気味": "かぜぎみ",
  "風邪": "かぜ",
  "疲れ気味": "つかれぎみ",
  "忘れがち": "わすれがち",
  "遅刻": "ちこく",
  "怒りっぽい": "おこりっぽい",
  "子供っぽい": "こどもっぽい",

  // Lesson 16 - Purpose & Full of
  "子供向け": "こどもむけ",
  "初心者向け": "しょしんしゃむけ",
  "初心者": "しょしんしゃ",
  "間違いだらけ": "まちがいだらけ",
  "間違い": "まちがい",
  "泥だらけ": "どろだらけ",
  "泥": "どろ",
  "嘘だらけ": "うそだらけ",
  "埃だらけ": "ほこりだらけ",
  "傷だらけ": "きずだらけ",

  // Lesson 17 - Completion & Halfway
  "疲れ果て": "つかれはて",
  "食べ切れない": "たべきれない",
  "走り抜く": "はしりぬく",
  "やり抜く": "やりぬく",
  "最後まで": "さいごまで",
  "読みかけ": "よみかけ",
  "食べかけ": "たべかけ",

  // Lesson 18 - Risk & Inability
  "洪水": "こうずい",
  "漏洩": "ろうえい",
  "賛成しかねる": "さんせいしかねる",
  "引き受けかねる": "ひきうけかねる",
  "承知しかねる": "しょうちしかねる",

  // Lesson 19 - Regardless & Even if
  "連絡": "れんらく",
  "男": "おとこ",
  "女": "おんな",
  "性別": "せいべつ",
  "国籍": "こくせき",
  "問わず": "とわず",

  // Lesson 20 - Looks like & Tendency
  "悲しげ": "かなしげ",
  "自信ありげ": "じしんありげ",
  "自信": "じしん",
  "不安げ": "ふあんげ",
  "遠慮がち": "えんりょがち",
  "遠慮": "えんりょ",
  "曇りがち": "くもりがち",
  "飽きっぽい": "あきっぽい",

  // Lesson 21 - Keigo (Honorifics & Humble)
  "お召し上がり": "おめしあがり",
  "召し上がる": "めしあがる",
  "いらっしゃる": "いらっしゃる",
  "ご覧になる": "ごらんになる",
  "おっしゃる": "おっしゃる",
  "なさる": "なさる",
  "拝見する": "はいけんする",
  "伺う": "うかがう",
  "申し上げる": "もうしあげる",
  "存じ上げる": "ぞんじあげる",
  "参る": "まいる",
  "お目にかかる": "おめにかかる",
  "社長": "しゃちょう",
  "部長": "ぶちょう",
  "お客様": "おきゃくさま",

  // Lesson 22 - Conjunctions & Synthesis
  "にもかかわらず": "にもかかわらず",
  "をもとに": "をもとに",
  "に応じて": "におうじて",
  "に限らず": "にかぎらず",
  "に際して": "にさいして",
  "にあたって": "にあたって",
  "開会": "かいかい",
  "入学": "にゅうがく",
  "契約": "けいやく",
  "締結": "ていけつ"
};

/**
 * Clean and normalize Kana strings for robust comparison
 */
export function normalizeKana(str: string): string {
  if (!str) return "";
  // Convert Katakana to Hiragana
  const hira = str.replace(/[\u30a1-\u30f6]/g, (match) => {
    const chr = match.charCodeAt(0) - 0x60;
    return String.fromCharCode(chr);
  });
  // Strip punctuation, spaces, prolonged marks
  return hira
    .replace(/[\s　、。！？,.!?…「」『』〜~ー・\-\(\)\[\]\|]/g, "")
    .toLowerCase();
}

/**
 * Convert Hiragana to Romaji for secondary phonetic assistance
 */
export function hiraganaToRomaji(hiragana: string): string {
  if (!hiragana) return "";
  const romajiMap: Record<string, string> = {
    "あ": "a", "い": "i", "う": "u", "え": "e", "お": "o",
    "か": "ka", "き": "ki", "く": "ku", "け": "ke", "こ": "ko",
    "さ": "sa", "し": "shi", "す": "su", "せ": "se", "そ": "so",
    "た": "ta", "ち": "chi", "つ": "tsu", "て": "te", "と": "to",
    "な": "na", "に": "ni", "ぬ": "nu", "ね": "ne", "の": "no",
    "は": "ha", "ひ": "hi", "ふ": "fu", "へ": "he", "ほ": "ho",
    "ま": "ma", "み": "mi", "む": "mu", "め": "me", "も": "mo",
    "や": "ya", "ゆ": "yu", "よ": "yo",
    "ら": "ra", "り": "ri", "る": "ru", "れ": "re", "ろ": "ro",
    "わ": "wa", "を": "wo", "ん": "n",
    "が": "ga", "ぎ": "gi", "ぐ": "gu", "げ": "ge", "ご": "go",
    "ざ": "za", "じ": "ji", "ず": "zu", "ぜ": "ze", "ぞ": "zo",
    "だ": "da", "ぢ": "ji", "づ": "zu", "で": "de", "ど": "do",
    "ば": "ba", "び": "bi", "ぶ": "bu", "べ": "be", "ぼ": "bo",
    "ぱ": "pa", "ぴ": "pi", "ぷ": "pu", "ぺ": "pe", "ぽ": "po",
    "きゃ": "kya", "きゅ": "kyu", "きょ": "kyo",
    "しゃ": "sha", "しゅ": "shu", "しょ": "sho",
    "ちゃ": "cha", "ちゅ": "chu", "ちょ": "cho",
    "にゃ": "nya", "にゅ": "nyu", "にょ": "nyo",
    "ひゃ": "hya", "ひゅ": "hyu", "ひょ": "hyo",
    "みゃ": "mya", "みゅ": "myu", "みょ": "myo",
    "りゃ": "rya", "りゅ": "ryu", "りょ": "ryo",
    "ぎゃ": "gya", "ぎゅ": "gyu", "ぎょ": "gyo",
    "じゃ": "ja", "じゅ": "ju", "じょ": "jo",
    "びゃ": "bya", "びゅ": "byu", "びょ": "byo",
    "ぴゃ": "pya", "ぴゅ": "pyu", "ぴょ": "pyo"
  };

  let result = "";
  let i = 0;
  while (i < hiragana.length) {
    // Check 2-char combinations (contracted sounds like きゃ, しゃ)
    if (i + 1 < hiragana.length) {
      const two = hiragana.substring(i, i + 2);
      if (romajiMap[two]) {
        result += romajiMap[two];
        i += 2;
        continue;
      }
    }
    // Check small っ (sokuon)
    if (hiragana[i] === "っ") {
      if (i + 1 < hiragana.length) {
        const nextChar = hiragana[i + 1];
        const nextRomaji = romajiMap[nextChar] || "";
        if (nextRomaji) {
          result += nextRomaji[0];
          i++;
          continue;
        }
      }
    }
    const one = hiragana[i];
    if (romajiMap[one]) {
      result += romajiMap[one];
    } else if (one === "、" || one === ",") {
      result += ", ";
    } else if (one === "。" || one === ".") {
      result += ". ";
    } else {
      result += one;
    }
    i++;
  }
  return result.trim();
}

/**
 * Extract / Generate accurate Furigana for a Japanese sentence
 */
export function getSentenceFurigana(sentence: TranslationSentence | { japanese: string; furigana?: string }): string {
  if (sentence.furigana && sentence.furigana.trim() !== "") {
    return sentence.furigana;
  }

  const japanese = sentence.japanese;
  if (!japanese) return "";

  // If already pure kana, return as is
  if (!/[\u4E00-\u9FAF\u3400-\u4DBF\uF900-\uFAFF]/.test(japanese)) {
    return japanese;
  }

  // Generate furigana reading by replacing known Kanji phrases from dictionary
  let reading = japanese;
  // Sort dictionary keys by descending length for greedy matching
  const keys = Object.keys(KANJI_READING_DICT).sort((a, b) => b.length - a.length);

  for (const key of keys) {
    if (reading.includes(key)) {
      reading = reading.split(key).join(KANJI_READING_DICT[key]);
    }
  }

  return reading;
}

/**
 * Generate Romaji reading
 */
export function getSentenceRomaji(sentence: TranslationSentence | { japanese: string; furigana?: string; romaji?: string }): string {
  if (sentence.romaji && sentence.romaji.trim() !== "") {
    return sentence.romaji;
  }
  const furigana = getSentenceFurigana(sentence);
  return hiraganaToRomaji(furigana);
}

/**
 * Check if the user's input matches either the exact Kanji sentence or its Hiragana/Romaji reading
 */
export function isAnswerMatching(
  userInput: string,
  targetJapanese: string,
  targetFurigana?: string
): { isMatch: boolean; matchType: "exact" | "kana" | "romaji" | "none" } {
  if (!userInput || !targetJapanese) {
    return { isMatch: false, matchType: "none" };
  }

  const cleanUser = userInput.trim().replace(/[\s　、。！？,.!?]/g, "");
  const cleanTargetJa = targetJapanese.trim().replace(/[\s　、。！？,.!?]/g, "");
  
  // Exact Kanji match
  if (cleanUser === cleanTargetJa) {
    return { isMatch: true, matchType: "exact" };
  }

  const userKana = normalizeKana(userInput);
  const targetKana = normalizeKana(targetFurigana || getSentenceFurigana({ japanese: targetJapanese, furigana: targetFurigana }));

  // Hiragana / Katakana reading match
  if (userKana.length > 0 && userKana === targetKana) {
    return { isMatch: true, matchType: "kana" };
  }

  // Romaji match
  const userRomaji = userInput.toLowerCase().replace(/[^a-z0-9]/g, "");
  const targetRomaji = hiraganaToRomaji(targetKana).toLowerCase().replace(/[^a-z0-9]/g, "");
  if (userRomaji.length > 3 && userRomaji === targetRomaji) {
    return { isMatch: true, matchType: "romaji" };
  }

  return { isMatch: false, matchType: "none" };
}
