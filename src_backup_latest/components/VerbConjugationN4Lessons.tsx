import React, { useState, useEffect, useRef } from "react";
import { playSound } from "../utils/audio";
import { RAW_VERBS_LIST, RawVerb } from "../data/verbN4Data";
import { 
  ArrowLeft, 
  Search, 
  BookOpen, 
  Activity, 
  HelpCircle, 
  CheckCircle, 
  XCircle, 
  Zap, 
  Flame, 
  Award, 
  Clock, 
  ChevronRight, 
  Sparkles,
  GitFork,
  Check,
  RefreshCw
} from "lucide-react";

interface VerbConjugationN4LessonsProps {
  onGoBack: () => void;
}

interface ConjugatedForms {
  masu: string;
  dict: string;
  nai: string;
  ta: string;
  te: string;
  volitional: string;
  imperative: string;
  prohibitive: string;
  conditional: string;
  potential: string;
  passive: string;
  causative: string;
}

export interface VerbItem {
  kanji: string;
  hiragana: string;
  masu: string;
  group: number;
  meaning: string;
  forms: ConjugatedForms;
  hiraForms: ConjugatedForms;
  rules: { [key: string]: string };
}

const FORM_NAMES: { [key in keyof ConjugatedForms]: string } = {
  masu: "Thể Masu (ます)",
  dict: "Từ điển (る)",
  nai: "Thể Nai (ない)",
  ta: "Thể Quá khứ (た)",
  te: "Thể Te (て)",
  volitional: "Thể Ý chí (よう)",
  imperative: "Mệnh lệnh (え/ろ)",
  prohibitive: "Cấm đoán (るな)",
  conditional: "Điều kiện (ば)",
  potential: "Khả năng (える/られる)",
  passive: "Bị động (れる/られる)",
  causative: "Sai khiến (せる/させる)"
};

const FORM_KEYS: (keyof ConjugatedForms)[] = [
  "masu", "dict", "nai", "ta", "te", "volitional", 
  "imperative", "prohibitive", "conditional", "potential", "passive", "causative"
];

// Conjugation builder
function getVerbConjugations(raw: RawVerb): VerbItem {
  const { kanji, hiragana, masu, group, meaning } = raw;
  const stem = masu.slice(0, -2); // e.g. かきます -> かき
  const lastChar = stem.slice(-1); // e.g. き
  const baseStem = stem.slice(0, -1); // e.g. か

  const columns: { [key: string]: { a: string; u: string; e: string; o: string; t: string } } = {
    "い": { a: "わ", u: "う", e: "え", o: "お", t: "って" },
    "き": { a: "か", u: "く", e: "け", o: "こ", t: "いて" },
    "ぎ": { a: "が", u: "ぐ", e: "げ", o: "ご", t: "いで" },
    "し": { a: "さ", u: "す", e: "せ", o: "そ", t: "して" },
    "ち": { a: "た", u: "つ", e: "て", o: "と", t: "って" },
    "に": { a: "な", u: "ぬ", e: "ね", o: "の", t: "んで" },
    "び": { a: "ば", u: "ぶ", e: "べ", o: "ぼ", t: "んで" },
    "み": { a: "ま", u: "む", e: "め", o: "も", t: "んで" },
    "り": { a: "ら", u: "る", e: "れ", o: "ろ", t: "って" }
  };

  let hiraForms: ConjugatedForms;

  if (group === 1) {
    const col = columns[lastChar] || { a: "わ", u: "う", e: "え", o: "お", t: "って" };
    let teForm = baseStem + col.t;
    let taForm = teForm.endsWith("て") ? teForm.slice(0, -1) + "た" : teForm.slice(0, -1) + "だ";

    if (masu === "いきます" || kanji === "行く") {
      teForm = "いって";
      taForm = "いった";
    }

    hiraForms = {
      masu: masu,
      dict: baseStem + col.u,
      nai: baseStem + col.a + "ない",
      ta: taForm,
      te: teForm,
      volitional: baseStem + col.o + "う",
      imperative: baseStem + col.e,
      prohibitive: baseStem + col.u + "な",
      conditional: baseStem + col.e + "ば",
      potential: baseStem + col.e + "ます",
      passive: baseStem + col.a + "れます",
      causative: baseStem + col.a + "せます"
    };
  } else if (group === 2) {
    hiraForms = {
      masu: masu,
      dict: stem + "る",
      nai: stem + "ない",
      ta: stem + "た",
      te: stem + "て",
      volitional: stem + "よう",
      imperative: stem + "ろ",
      prohibitive: stem + "るna".replace("na", "な"),
      conditional: stem + "れば",
      potential: stem + "られます",
      passive: stem + "られます",
      causative: stem + "させます"
    };
  } else {
    // Group 3
    const isKuru = kanji === "来る" || hiragana === "くる";
    if (isKuru) {
      hiraForms = {
        masu: "きます",
        dict: "くる",
        nai: "こない",
        ta: "きた",
        te: "きて",
        volitional: "こよう",
        imperative: "こい",
        prohibitive: "くるな",
        conditional: "くれば",
        potential: "こられます",
        passive: "こられます",
        causative: "こさせます"
      };
    } else {
      // Suru compound or Suru
      const prefix = stem.slice(0, -1); // e.g. べんきょうし -> べんきょう
      hiraForms = {
        masu: masu,
        dict: prefix + "する",
        nai: prefix + "しない",
        ta: prefix + "した",
        te: prefix + "して",
        volitional: prefix + "しよう",
        imperative: prefix + "しろ",
        prohibitive: prefix + "するな",
        conditional: prefix + "すれば",
        potential: prefix + "できます",
        passive: prefix + "されます",
        causative: prefix + "させます"
      };
    }
  }

  // Kanji replacement
  const isSuru = kanji.endsWith("する") || kanji.endsWith("します");
  const isKuru = kanji === "来る" || hiragana === "くる";

  let kanjiRoot = kanji.slice(0, -1);
  let hiraRoot = hiragana.slice(0, -1);

  if (isSuru) {
    kanjiRoot = kanji.slice(0, -2);
    hiraRoot = hiragana.slice(0, -2);
  } else if (isKuru) {
    kanjiRoot = "来";
    hiraRoot = "く";
  }

  const forms: ConjugatedForms = { ...hiraForms };

  Object.keys(hiraForms).forEach((key) => {
    const hForm = hiraForms[key as keyof ConjugatedForms];
    if (isKuru) {
      if (key === "masu" || key === "ta" || key === "te") {
        forms[key as keyof ConjugatedForms] = hForm.replace("き", "来");
      } else if (key === "dict" || key === "prohibitive" || key === "conditional") {
        forms[key as keyof ConjugatedForms] = hForm.replace("く", "来");
      } else {
        forms[key as keyof ConjugatedForms] = hForm.replace("こ", "来");
      }
    } else if (hForm.startsWith(hiraRoot)) {
      forms[key as keyof ConjugatedForms] = hForm.replace(hiraRoot, kanjiRoot);
    }
  });

  // Construct rules description
  const rules: { [key: string]: string } = {};
  const formRules: { [key: string]: string } = {
    masu: `Thể lịch sự kết thúc bằng ます`,
    dict: `Nhóm ${group}: Chuyển đuôi cột I sang cột U tương ứng`,
    nai: `Nhóm ${group}: Chuyển đuôi cột I sang cột A rồi thêm ない`,
    ta: `Nhóm ${group}: Chuyển đổi dựa trên thể Te (て -> た, de -> だ)`,
    te: `Nhóm ${group}: Biến âm đặc trưng theo nhóm từ trước ます`,
    volitional: `Nhóm ${group}: Chuyển đuôi cột I sang cột O rồi thêm う`,
    imperative: `Nhóm ${group}: Chuyển đuôi cột I sang cột E`,
    prohibitive: `Nhóm ${group}: Thêm な vào sau Thể Từ điển (u + な)`,
    conditional: `Nhóm ${group}: Chuyển đuôi cột I sang cột E rồi thêm ば`,
    potential: `Nhóm ${group}: Chuyển đuôi cột I sang cột E rồi thêm ます`,
    passive: `Nhóm ${group}: Chuyển đuôi cột I sang cột A rồi thêm れます`,
    causative: `Nhóm ${group}: Chuyển đuôi cột I sang cột A rồi thêm せます`
  };

  Object.keys(forms).forEach((key) => {
    let explanation = formRules[key];
    if (group === 2) {
      if (key === "dict") explanation = "Nhóm 2: Bỏ ます thêm る";
      else if (key === "nai") explanation = "Nhóm 2: Bỏ ます thêm ない";
      else if (key === "te") explanation = "Nhóm 2: Bỏ ます thêm て";
      else if (key === "ta") explanation = "Nhóm 2: Bỏ ます thêm た";
      else if (key === "volitional") explanation = "Nhóm 2: Bỏ ます thêm よう";
      else if (key === "imperative") explanation = "Nhóm 2: Bỏ ます thêm ろ";
      else if (key === "prohibitive") explanation = "Nhóm 2: Bỏ ます thêm るな";
      else if (key === "conditional") explanation = "Nhóm 2: Bỏ ます thêm れば";
      else if (key === "potential") explanation = "Nhóm 2: Bỏ ます thêm られます";
      else if (key === "passive") explanation = "Nhóm 2: Bỏ ます thêm られます (Bị động)";
      else if (key === "causative") explanation = "Nhóm 2: Bỏ ます thêm させます (Sai khiến)";
    } else if (group === 3) {
      if (isKuru) {
        if (key === "dict") explanation = "Nhóm 3 (来): くる (dictionary)";
        else if (key === "nai") explanation = "Nhóm 3 (来): こない (negative)";
        else if (key === "te") explanation = "Nhóm 3 (来): きて (te-form)";
        else if (key === "ta") explanation = "Nhóm 3 (来): きた (past)";
        else if (key === "volitional") explanation = "Nhóm 3 (来): こよう (volitional)";
        else if (key === "imperative") explanation = "Nhóm 3 (来): こい (imperative)";
        else if (key === "prohibitive") explanation = "Nhóm 3 (来): くるな (prohibitive)";
        else if (key === "conditional") explanation = "Nhóm 3 (来): くれば (conditional)";
        else if (key === "potential") explanation = "Nhóm 3 (来): こられます (potential)";
        else if (key === "passive") explanation = "Nhóm 3 (来): こられます (passive)";
        else if (key === "causative") explanation = "Nhóm 3 (来): こさせます (causative)";
      } else {
        if (key === "dict") explanation = "Nhóm 3 (する): する";
        else if (key === "nai") explanation = "Nhóm 3 (する): しない";
        else if (key === "te") explanation = "Nhóm 3 (する): して";
        else if (key === "ta") explanation = "Nhóm 3 (する): した";
        else if (key === "volitional") explanation = "Nhóm 3 (する): しよう";
        else if (key === "imperative") explanation = "Nhóm 3 (する): しろ";
        else if (key === "prohibitive") explanation = "Nhóm 3 (する): するな";
        else if (key === "conditional") explanation = "Nhóm 3 (する): すれば";
        else if (key === "potential") explanation = "Nhóm 3 (する): できます";
        else if (key === "passive") explanation = "Nhóm 3 (する): されます";
        else if (key === "causative") explanation = "Nhóm 3 (する): させます";
      }
    }
    rules[key] = explanation;
  });

  return {
    kanji,
    hiragana,
    masu,
    group,
    meaning,
    forms,
    hiraForms,
    rules
  };
}

const DATABASE: VerbItem[] = RAW_VERBS_LIST.map(getVerbConjugations);

interface TheoryFormItem {
  key: keyof ConjugatedForms;
  name: string;
  jpName: string;
  vietName: string;
  suffix: string;
  desc: string;
  usage: string[];
  g1: {
    rule: string;
    formula: string;
    example: string;
  };
  g2: {
    rule: string;
    formula: string;
    example: string;
  };
  g3: {
    rule: string;
    formula: string;
    example: string;
  };
}

const THEORY_ITEMS: TheoryFormItem[] = [
  {
    key: "dict",
    name: "Thể Từ điển (辞書形)",
    jpName: "辞書形",
    vietName: "Thể Từ Điển",
    suffix: "V_る / くる / する",
    desc: "Thể nguyên bản của động từ, được dùng khi tra từ điển, nói chuyện thân mật suồng sã, hoặc đi kèm với nhiều cấu trúc ngữ pháp quan trọng như: ～ことが できる (có thể), ～まえに (trước khi), ～つもり (dự định)...",
    usage: [
      "Tra cứu từ điển",
      "Nói chuyện thân mật, suồng sã (thay cho ます)",
      "Cấu trúc dự định: Vる + つもりです",
      "Cấu trúc có thể: Vる + ことができます"
    ],
    g1: {
      rule: "Chuyển đuôi cột い (của thể ます) sang cột う tương ứng.",
      formula: "V_ます (い) ➔ V_う",
      example: "かきます (kaki) ➔ かく (kaku)\nいきます (iki) ➔ いく (iku)\nあそびます (asobi) ➔ あそぶ (asobu)"
    },
    g2: {
      rule: "Chỉ cần bỏ đuôi ます rồi thêm る vào sau.",
      formula: "V_ます ➔ V_る",
      example: "たべます ➔ たべる\nおきます ➔ おきる\nねます ➔ ねる"
    },
    g3: {
      rule: "Bất quy tắc cố định, học viên học thuộc lòng hai động từ chính.",
      formula: "きます ➔ くる | します ➔ する",
      example: "きます (Đến) ➔ くる\nします (Làm) ➔ する\nべんきょうします ➔ べんきょうする"
    }
  },
  {
    key: "nai",
    name: "Thể Phủ định (ない形)",
    jpName: "ない形",
    vietName: "Thể Phủ Định",
    suffix: "V_ない / こない / しない",
    desc: "Dùng để phủ định hành động ở dạng thông thường (thân mật), hoặc làm nền tảng cho nhiều cấu trúc ngữ pháp như: ～ないでください (xin đừng), ～なければならない (phải làm), ～なくてもいい (không cần làm)...",
    usage: [
      "Phủ định thân mật (thay cho ません)",
      "Yêu cầu nhẹ nhàng: Vない + でください",
      "Bắt buộc: Vない (bỏ い) + ければなりません",
      "Không cần thiết: Vない (bỏ い) + くてもいいです"
    ],
    g1: {
      rule: "Chuyển đuôi cột い sang cột あ tương ứng rồi thêm ない. Đặc biệt: Đuôi [い] chuyển thành [わ] chứ không phải [あ].",
      formula: "V_ます (い) ➔ V_あ + ない (い ➔ わ)",
      example: "かきます ➔ かかない\nあいます ➔ あわない (không phải ああない)\nまちます ➔ またない"
    },
    g2: {
      rule: "Chỉ cần bỏ đuôi ます rồi thêm ない vào sau.",
      formula: "V_ます ➔ V_ない",
      example: "たべます ➔ たべない\nおきます ➔ おきない\nみます ➔ みない"
    },
    g3: {
      rule: "Bất quy tắc biến âm hoàn toàn, cần ghi nhớ kỹ cách đọc Kanji.",
      formula: "きます ➔ こない | します ➔ しない",
      example: "きます (Đến) ➔ こない (phiên âm là konai)\nします (Làm) ➔ しない\nさんぽします ➔ さんぽしない"
    }
  },
  {
    key: "te",
    name: "Thể Te (て形)",
    jpName: "て形",
    vietName: "Thể Te (Liên Kết)",
    suffix: "V_て / で",
    desc: "Thể biến âm phức tạp và quan trọng bậc nhất. Dùng để nối các vế câu, diễn tả chuỗi hành động liên tiếp, hoặc kết hợp làm yêu cầu lịch sự (～てください), đang thực hiện (～ている), thử làm (～てみる)...",
    usage: [
      "Nối câu, liên kết hành động liên tiếp",
      "Yêu cầu lịch sự: Vて + ください",
      "Đang thực hiện (tiếp diễn): Vて + いる",
      "Xin phép / Cấm đoán: Vて + もいい / Vて + はいけない"
    ],
    g1: {
      rule: "Biến âm đặc trưng theo các chữ cái đứng ngay trước ます.",
      formula: "• い、ち、り ➔ って\n• み、び、に ➔ んで\n• き ➔ いて (Đặc biệt: いきます ➔ いって)\n• ぎ ➔ いで\n• し ➔ して",
      example: "かいます ➔ かって | まちます ➔ まって\nよみます ➔ よんで | しにます ➔ しんで\nかきます ➔ かいて | いきます ➔ いって\nおよぎます ➔ およいで | はなします ➔ はなして"
    },
    g2: {
      rule: "Chỉ cần bỏ ます rồi thêm て vào sau.",
      formula: "V_ます ➔ V_て",
      example: "たべます ➔ たべて\nおきます ➔ おきて\nねます ➔ ねて"
    },
    g3: {
      rule: "Bất quy tắc cố định, chia tương tự như cách phát âm.",
      formula: "きます ➔ きて | します ➔ して",
      example: "きます (Đến) ➔ きて\nします (Làm) ➔ して\nれんしゅうします ➔ れんしゅうして"
    }
  },
  {
    key: "ta",
    name: "Thể Quá khứ (た形)",
    jpName: "た形",
    vietName: "Thể Quá Khứ (Ta)",
    suffix: "V_た / だ",
    desc: "Thể hiện hành động đã kết thúc trong quá khứ ở dạng thân mật suồng sã. Được dùng trong các cấu trúc kinh nghiệm (～たことがある), lời khuyên (～ほうがいい), liệt kê hành động phi tuần tự (～たり～たり)...",
    usage: [
      "Quá khứ thân mật (thay cho ました)",
      "Đã từng làm gì (kinh nghiệm): Vた + ことがあります",
      "Nên làm gì (lời khuyên): Vた + ほうがいいです",
      "Liệt kê hành động: Vた + り, Vた + りします"
    ],
    g1: {
      rule: "Chia hoàn toàn giống hệt thể Te, nhưng thay đuôi [て ➔ た] và [で ➔ だ].",
      formula: "• い, ち, り ➔ った\n• み, び, に ➔ んだ\n• き ➔ いた (Đặc biệt: いきます ➔ いった)\n• ぎ ➔ いだ\n• し ➔ した",
      example: "かいます ➔ かった | よみます ➔ よんだ\nかきます ➔ かいた | いきます ➔ いった\nおよぎます ➔ およいだ | はなします ➔ はなした"
    },
    g2: {
      rule: "Chỉ cần bỏ ます rồi thêm た vào sau.",
      formula: "V_ます ➔ V_た",
      example: "たべます ➔ たべた\nおきます ➔ おきた\nみます ➔ みた"
    },
    g3: {
      rule: "Bất quy tắc cố định, chia tương tự như quá khứ.",
      formula: "きます ➔ きた | します ➔ した",
      example: "きます (Đến) ➔ きた\nします (Làm) ➔ した\nしょくじします ➔ しょくじした"
    }
  },
  {
    key: "volitional",
    name: "Thể Ý chí (よう形)",
    jpName: "意向形",
    vietName: "Thể Ý Chí (Rủ Rê)",
    suffix: "V_おう / よう",
    desc: "Thể hiện ý chí, quyết tâm thực hiện hành động của bản thân, hoặc dùng để rủ rê, đề nghị làm việc gì đó một cách thân mật, suồng sã (bản ngắn của cấu trúc ましょう).",
    usage: [
      "Rủ rê thân mật (thay cho ましょう)",
      "Dự định tự sự: Vよう + と思っています (Tôi đang định...)"
    ],
    g1: {
      rule: "Chuyển đuôi hàng い sang hàng お tương ứng rồi thêm う.",
      formula: "V_ます (i) ➔ V_お + う",
      example: "かきます (ki) ➔ かこう (ko + u)\nあいます (i) ➔ あおう (o + u)\nよみます (mi) ➔ よぼう (bo + u)"
    },
    g2: {
      rule: "Chỉ cần bỏ ます rồi thêm よう vào sau.",
      formula: "V_ます ➔ V_よう",
      example: "たべます ➔ たべよう\nねます ➔ ねよう\nおきます ➔ おきよう"
    },
    g3: {
      rule: "Bất quy tắc cố định, cần chú ý cách phát âm biến đổi.",
      formula: "きます ➔ こよう | します ➔ しよう",
      example: "きます (Đến) ➔ こよう (koyou)\nします (Làm) ➔ しよう (shiyou)\nかいものします ➔ かいものしよう"
    }
  },
  {
    key: "potential",
    name: "Thể Khả năng (える)",
    jpName: "可能形",
    vietName: "Thể Khả Năng",
    suffix: "V_える / られる",
    desc: "Diễn tả khả năng, năng lực có thể thực hiện hành động nào đó của chủ thể. Trợ từ [を] trong câu thường được chuyển thành [ga] (が) khi chuyển sang thể khả năng.",
    usage: [
      "Diễn tả khả năng có thể làm gì",
      "Sử dụng nhiều với trợ từ が thay cho を (Ví dụ: ほんがよめる)"
    ],
    g1: {
      rule: "Chuyển đuôi hàng い sang hàng え tương ứng rồi thêm ます (ở dạng lịch sự) hoặc thêm る (ở dạng thông thường).",
      formula: "V_ます (i) ➔ V_え + ます / る",
      example: "かきます ➔ かけます (có thể viết)\nあいます ➔ あえます (có thể gặp)\nはなします ➔ はなせます (có thể nói)"
    },
    g2: {
      rule: "Bỏ ます rồi thêm られます vào sau (dạng lịch sự) hoặc られる (dạng ngắn). Trong giao tiếp thực tế, người Nhật thường bỏ bớt âm 'ら' (thành れます) gọi là ら抜き言葉.",
      formula: "V_ます ➔ V_られます",
      example: "たべます ➔ たべられます (có thể ăn)\nおきます ➔ おkiられます\nねます ➔ ねられます"
    },
    g3: {
      rule: "Bất quy tắc hoàn toàn cố định.",
      formula: "きます ➔ こられます | します ➔ できます",
      example: "きます (Đến) ➔ こられます (có thể đến)\nします (Làm) ➔ できます (có thể làm)\nうんてんします ➔ うんてんできます"
    }
  },
  {
    key: "conditional",
    name: "Thể Điều kiện (ば)",
    jpName: "条件形",
    vietName: "Thể Giả Định (Nếu)",
    suffix: "V_れば / ば",
    desc: "Dùng để diễn tả điều kiện giả định 'Nếu... thì...'. Nếu vế trước xảy ra thì vế sau chắc chắn xảy ra, hoặc dùng để đưa ra lời khuyên, gợi ý phương án tốt nhất.",
    usage: [
      "Nếu... thì... (giả định, tất yếu)",
      "Cấu trúc gợi ý, lời khuyên: Vれば + いい (Nên...)",
      "Cấu trúc càng... càng...: Vれば Vるほど"
    ],
    g1: {
      rule: "Chuyển đuôi cột い sang cột え tương ứng rồi thêm ば.",
      formula: "V_ます (i) ➔ V_え + ば",
      example: "かきます (ki) ➔ かけば\nあいます (i) ➔ あえば\nよみます (mi) ➔ よめば"
    },
    g2: {
      rule: "Chỉ cần bỏ đuôi ます rồi thêm れば vào sau.",
      formula: "V_ます ➔ V_れば",
      example: "たべます ➔ たべれば\nおきます ➔ おきれば\nねます ➔ ねれば"
    },
    g3: {
      rule: "Bất quy tắc cố định.",
      formula: "きます ➔ くれば | します ➔ すれば",
      example: "きます (Đến) ➔ くれば (kureba)\nします (Làm) ➔ すれば (sureba)\nよやくします ➔ よやくすれば"
    }
  },
  {
    key: "imperative",
    name: "Thể Mệnh lệnh (え / ろ)",
    jpName: "命令形",
    vietName: "Thể Mệnh Lệnh",
    suffix: "V_え / ろ",
    desc: "Dùng để ra lệnh, yêu cầu một cách bắt buộc, dứt khoát. Thường được sử dụng trong trường hợp khẩn cấp, biển chỉ dẫn, cổ vũ thể thao, hoặc nam giới nói chuyện thân mật ra lệnh.",
    usage: [
      "Ra lệnh, yêu cầu bắt buộc",
      "Khẩu hiệu cổ vũ (Cố lên ➔ がんばれ!)",
      "Hướng dẫn, biển chỉ thị báo cáo khẩn cấp"
    ],
    g1: {
      rule: "Chuyển đuôi cột い sang cột え tương ứng (không thêm gì cả).",
      formula: "V_ます (i) ➔ V_え",
      example: "かきます (ki) ➔ かけ (Viết đi!)\nいきます (iki) ➔ いけ (Đi đi!)\nはなします (shi) ➔ はなせ (Nói đi!)"
    },
    g2: {
      rule: "Chỉ cần bỏ đuôi ます rồi thêm ろ vào sau.",
      formula: "V_ます ➔ V_ろ",
      example: "たべます ➔ たべろ (Ăn đi!)\nおきます ➔ おきろ\nねます ➔ ねろ (Ngủ đi!)"
    },
    g3: {
      rule: "Bất quy tắc cố định, học thuộc lòng.",
      formula: "きます ➔ こい | します ➔ しろ",
      example: "きます (Đến) ➔ こい (Lại đây!)\nします (Làm) ➔ しろ (Làm đi!)\nたいそうします ➔ たいそうしろ"
    }
  },
  {
    key: "prohibitive",
    name: "Thể Cấm đoán (るな)",
    jpName: "禁止形",
    vietName: "Thể Cấm Đoán",
    suffix: "V_るな",
    desc: "Cấm tuyệt đối không được thực hiện hành động nào đó. Thường dùng trong các biển cấm, hiệu lệnh nghiêm khắc của cảnh sát, người có chức quyền lớn hoặc trong trường hợp khẩn cấp.",
    usage: [
      "Cấm đoán tuyệt đối, khẩn cấp",
      "Biển báo công cộng (Không được vào ➔ はいるな)"
    ],
    g1: {
      rule: "Lấy Thể Từ điển (u) của động từ rồi thêm trực tiếp chữ な vào phía sau.",
      formula: "V_Từ điển + な",
      example: "かきます (Từ điển: かく) ➔ かくな (Cấm viết!)\nいきます (Từ điển: いく) ➔ いくな (Cấm đi!)\nあう (Từ điển: あう) ➔ あうna"
    },
    g2: {
      rule: "Lấy Thể Từ điển (る) rồi thêm trực tiếp chữ な vào phía sau.",
      formula: "V_Từ điển + な",
      example: "たべます (Từ điển: たべる) ➔ たべるna (Cấm ăn!)\nおきます (Từ điển: おきる) ➔ おきるな"
    },
    g3: {
      rule: "Lấy Thể Từ điển rồi thêm な vào phía sau.",
      formula: "V_Từ điển + な",
      example: "きます (Từ điển: くる) ➔ くるな (Cấm đến!)\nします (Từ điển: する) ➔ するな (Cấm làm!)"
    }
  },
  {
    key: "passive",
    name: "Thể Bị động (れる)",
    jpName: "受身形",
    vietName: "Thể Bị Động",
    suffix: "V_れる / られる",
    desc: "Diễn tả việc một người bị hoặc được một người khác tác động hành động lên mình. Thường mang sắc thái bị phiền toái, quấy rầy hoặc nói về các sự kiện lịch sử, báo chí công cộng.",
    usage: [
      "Bị tác động mang nghĩa quấy rầy (bị mắng, bị giẫm chân...)",
      "Sự thật khách quan, lịch sử (kính ngữ hoặc báo chí)"
    ],
    g1: {
      rule: "Chuyển đuôi cột い sang cột あ tương ứng rồi thêm れます (hoặc される ở dạng ngắn). Lưu ý: Đuôi [い] chuyển thành [わ].",
      formula: "V_ます (i) ➔ V_あ + れます",
      example: "かきます ➔ かかれます (bị viết)\nあいます ➔ あわれます (bị gặp)\nしかります ➔ しかられます (bị mắng)"
    },
    g2: {
      rule: "Bỏ ます rồi thêm られます vào sau (hoặc られる ở dạng ngắn). Cách chia này giống hệt Thể Khả năng của nhóm 2.",
      formula: "V_ます ➔ V_られます",
      example: "たべます ➔ たべられます (bị ăn)\nほめます ➔ ほめられます (được khen)"
    },
    g3: {
      rule: "Bất quy tắc cố định.",
      formula: "きます ➔ こられます | します ➔ されます",
      example: "きます (Đến) ➔ こられます (bị đến)\nします (Làm) ➔ されます (bị làm)\nしょうかいします ➔ しょうかいされます"
    }
  },
  {
    key: "causative",
    name: "Thể Sai khiến (せる)",
    jpName: "使役形",
    vietName: "Thể Sai Khiến",
    suffix: "V_せる / させる",
    desc: "Diễn tả hành động bắt buộc (ép buộc) hoặc cho phép ai đó làm một việc gì đó. Thường sử dụng bởi cha mẹ với con cái, sếp với nhân viên, hoặc giáo viên với học sinh.",
    usage: [
      "Bắt buộc, ép buộc người khác làm gì",
      "Cho phép người khác làm gì"
    ],
    g1: {
      rule: "Chuyển đuôi cột い sang cột あ tương ứng rồi thêm せます (hoặc せる ở dạng ngắn). Lưu ý: Đuôi [い] chuyển thành [わ].",
      formula: "V_ます (i) ➔ V_あ + せます",
      example: "かきます ➔ かかせます (bắt viết)\nあいます ➔ あわせます (cho gặp)\nいきます ➔ いかせます (bắt đi)"
    },
    g2: {
      rule: "Bỏ ます rồi thêm させます vào sau (hoặc させる ở dạng ngắn).",
      formula: "V_ます ➔ V_させます",
      example: "たべます ➔ たべさせます (bắt ăn)\nおきます ➔ おkiさせます\nみます ➔ みさせます"
    },
    g3: {
      rule: "Bất quy tắc cố định.",
      formula: "きます ➔ こさせます | します ➔ させます",
      example: "きます (Đến) ➔ こさせます\nします (Làm) ➔ させます\nべんきょうします ➔ べんきょうさせます"
    }
  }
];

export default function VerbConjugationN4Lessons({ onGoBack }: VerbConjugationN4LessonsProps) {
  const [activeSubTab, setActiveSubTab] = useState<"search" | "theory" | "practice" | "reflex" | "mindmap">("search");
  
  // Tab 1: Tra Cứu State
  const [searchQuery, setSearchQuery] = useState("");
  const [groupFilter, setGroupFilter] = useState<number | null>(null);
  const [selectedVerb, setSelectedVerb] = useState<VerbItem>(DATABASE[0]);

  // Tab 2: Bí kíp 11 thể State
  const [selectedTheoryForm, setSelectedTheoryForm] = useState<keyof ConjugatedForms>("te");
  const [theorySearchQuery, setTheorySearchQuery] = useState("");

  // Tab 3: Luyện Tập State
  const [practiceGroups, setPracticeGroups] = useState<number[]>([1, 2, 3]);
  const [practiceForms, setPracticeForms] = useState<string[]>(["dict", "nai", "te", "ta"]);
  const [isPracticing, setIsPracticing] = useState(false);
  const [practiceQuestion, setPracticeQuestion] = useState<{
    verb: VerbItem;
    formKey: keyof ConjugatedForms;
  } | null>(null);
  const [practiceAnswer, setPracticeAnswer] = useState("");
  const [practiceResult, setPracticeResult] = useState<{
    isCorrect: boolean;
    userAnswer: string;
    correctAnswer: string;
    show: boolean;
  } | null>(null);
  const [practiceStats, setPracticeStats] = useState({ correct: 0, total: 0 });

  // Tab 4: Phản Xạ 3s State
  const [reflexActive, setReflexActive] = useState(false);
  const [reflexConfig, setReflexConfig] = useState({
    timeLimit: 5, // 5s, 3s, etc
    groups: [1, 2, 3]
  });
  const [reflexQuestion, setReflexQuestion] = useState<{
    verb: VerbItem;
    formKey: keyof ConjugatedForms;
    correctAnswer: string;
    options: string[];
  } | null>(null);
  const [reflexTimer, setReflexTimer] = useState(5);
  const [reflexScore, setReflexScore] = useState(0);
  const [reflexStreak, setReflexStreak] = useState(0);
  const [reflexHighscore, setReflexHighscore] = useState(() => {
    return Number(localStorage.getItem("reflex_n4_highscore") || 0);
  });
  const [reflexFeedback, setReflexFeedback] = useState<"correct" | "wrong" | "timeout" | null>(null);
  const reflexTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sound play wrapper
  const handlePlaySound = (type: "click" | "correct" | "wrong" | "achievement") => {
    if (playSound[type]) {
      playSound[type]();
    }
  };

  // Switch Sub-tabs
  const handleTabChange = (tab: typeof activeSubTab) => {
    handlePlaySound("click");
    setActiveSubTab(tab);
    // stop reflex if running
    if (reflexActive) {
      endReflexGame();
    }
  };

  // Tra cứu filters
  const filteredVerbs = DATABASE.filter((v) => {
    const matchesSearch = 
      v.kanji.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.hiragana.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.masu.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGroup = groupFilter === null || v.group === groupFilter;
    return matchesSearch && matchesGroup;
  });

  // Dynamic initialization for Practice
  const generatePracticeQuestion = () => {
    const eligibleVerbs = DATABASE.filter((v) => practiceGroups.includes(v.group));
    if (eligibleVerbs.length === 0) return;
    
    const randomVerb = eligibleVerbs[Math.floor(Math.random() * eligibleVerbs.length)];
    const randomFormKey = practiceForms[Math.floor(Math.random() * practiceForms.length)] as keyof ConjugatedForms;

    setPracticeQuestion({
      verb: randomVerb,
      formKey: randomFormKey
    });
    setPracticeAnswer("");
    setPracticeResult(null);
  };

  const handleStartPractice = () => {
    if (practiceGroups.length === 0 || practiceForms.length === 0) {
      alert("Vui lòng chọn ít nhất 1 nhóm động từ và 1 thể chia!");
      return;
    }
    handlePlaySound("click");
    setIsPracticing(true);
    setPracticeStats({ correct: 0, total: 0 });
    setTimeout(generatePracticeQuestion, 100);
  };

  const checkPracticeAnswer = () => {
    if (!practiceQuestion) return;
    const cleanUser = practiceAnswer.trim().toLowerCase();
    const cleanCorrectKanji = practiceQuestion.verb.forms[practiceQuestion.formKey].trim().toLowerCase();
    const cleanCorrectHira = practiceQuestion.verb.hiraForms[practiceQuestion.formKey].trim().toLowerCase();

    const isCorrect = cleanUser === cleanCorrectKanji || cleanUser === cleanCorrectHira;

    setPracticeResult({
      isCorrect,
      userAnswer: practiceAnswer,
      correctAnswer: practiceQuestion.verb.forms[practiceQuestion.formKey],
      show: true
    });

    setPracticeStats((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));

    if (isCorrect) {
      handlePlaySound("correct");
    } else {
      handlePlaySound("wrong");
    }
  };

  // Dynamic Reflex Game Logic
  const startReflexGame = () => {
    handlePlaySound("click");
    setReflexActive(true);
    setReflexScore(0);
    setReflexStreak(0);
    setReflexFeedback(null);
    generateReflexQuestion();
  };

  const generateReflexQuestion = () => {
    setReflexFeedback(null);
    const eligibleVerbs = DATABASE.filter((v) => reflexConfig.groups.includes(v.group));
    if (eligibleVerbs.length === 0) return;

    const randomVerb = eligibleVerbs[Math.floor(Math.random() * eligibleVerbs.length)];
    // pick a random form excluding masu
    const availableKeys = FORM_KEYS.filter((k) => k !== "masu");
    const randomFormKey = availableKeys[Math.floor(Math.random() * availableKeys.length)];

    const correctAnswer = randomVerb.forms[randomFormKey];
    
    // generate options
    const optionsSet = new Set<string>();
    optionsSet.add(correctAnswer);

    // add incorrect options
    while (optionsSet.size < 4) {
      const randomOtherVerb = eligibleVerbs[Math.floor(Math.random() * eligibleVerbs.length)];
      const randomOtherForm = availableKeys[Math.floor(Math.random() * availableKeys.length)];
      optionsSet.add(randomOtherVerb.forms[randomOtherForm]);
    }

    const optionsArray = Array.from(optionsSet);
    // Shuffle
    for (let i = optionsArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [optionsArray[i], optionsArray[j]] = [optionsArray[j], optionsArray[i]];
    }

    setReflexQuestion({
      verb: randomVerb,
      formKey: randomFormKey,
      correctAnswer,
      options: optionsArray
    });

    setReflexTimer(reflexConfig.timeLimit);
  };

  // Timer tick for reflex
  useEffect(() => {
    if (!reflexActive || !reflexQuestion || reflexFeedback) return;

    reflexTimerRef.current = setTimeout(() => {
      if (reflexTimer <= 1) {
        handlePlaySound("wrong");
        setReflexFeedback("timeout");
        setReflexStreak(0);
        // show brief results then next question
        setTimeout(() => {
          generateReflexQuestion();
        }, 1500);
      } else {
        setReflexTimer((t) => t - 1);
      }
    }, 1000);

    return () => {
      if (reflexTimerRef.current) clearTimeout(reflexTimerRef.current);
    };
  }, [reflexActive, reflexTimer, reflexQuestion, reflexFeedback]);

  const handleReflexAnswer = (answer: string) => {
    if (reflexFeedback) return;

    const isCorrect = answer === reflexQuestion?.correctAnswer;
    if (isCorrect) {
      handlePlaySound("correct");
      setReflexFeedback("correct");
      const addedPoints = 10 + reflexStreak * 2;
      const newScore = reflexScore + addedPoints;
      setReflexScore(newScore);
      const newStreak = reflexStreak + 1;
      setReflexStreak(newStreak);

      if (newScore > reflexHighscore) {
        const oldHigh = Number(localStorage.getItem("reflex_n4_highscore") || 0);
        const best = Math.max(oldHigh, newScore);
        setReflexHighscore(best);
        localStorage.setItem("reflex_n4_highscore", String(best));
      }

      setTimeout(() => {
        generateReflexQuestion();
      }, 1000);
    } else {
      handlePlaySound("wrong");
      setReflexFeedback("wrong");
      setReflexStreak(0);
      setTimeout(() => {
        generateReflexQuestion();
      }, 1500);
    }
  };

  const endReflexGame = () => {
    if (reflexTimerRef.current) clearTimeout(reflexTimerRef.current);
    setReflexActive(false);
    setReflexQuestion(null);
  };

  // Sơ đồ tư duy sound-map details helper
  const getMindmapNodes = (verb: VerbItem) => {
    const isG1 = verb.group === 1;
    const isG2 = verb.group === 2;
    const isG3 = verb.group === 3;

    // Groups 5 rows:
    // A-Cột, I-Cột, U-Cột, E-Cột, O-Cột, and Te/Ta branches
    return {
      a: {
        vowel: "Cột あ (A)",
        forms: [
          { name: "Thể Phủ định (ない)", value: verb.forms.nai },
          { name: "Thể Bị động (れ)", value: verb.forms.passive },
          { name: "Thể Sai khiến (せ)", value: verb.forms.causative }
        ]
      },
      i: {
        vowel: "Cột い (I)",
        forms: [
          { name: "Thể Lịch sự (ます)", value: verb.forms.masu }
        ]
      },
      u: {
        vowel: "Cột う (U)",
        forms: [
          { name: "Thể Từ điển (る)", value: verb.forms.dict },
          { name: "Thể Cấm đoán (な)", value: verb.forms.prohibitive }
        ]
      },
      e: {
        vowel: "Cột え (E)",
        forms: [
          { name: "Thể Khả năng (え/られ)", value: verb.forms.potential },
          { name: "Thể Điều kiện (ば)", value: verb.forms.conditional },
          { name: "Mệnh lệnh (ろ/え)", value: verb.forms.imperative }
        ]
      },
      o: {
        vowel: "Cột お (O)",
        forms: [
          { name: "Thể Ý chí (よう)", value: verb.forms.volitional }
        ]
      },
      t: {
        vowel: "Nhánh て / た",
        forms: [
          { name: "Thể Te (て)", value: verb.forms.te },
          { name: "Quá khứ (た)", value: verb.forms.ta }
        ]
      }
    };
  };

  const mindmap = getMindmapNodes(selectedVerb);

  return (
    <div className="washi-pattern min-h-screen p-4 sm:p-8 -mx-4 sm:-mx-8 rounded-[40px] border-2 border-[#1A1A1A] text-[#1A1A1A]" style={{ fontFamily: "'Lora', 'Noto Serif JP', serif" }}>
      
      {/* Sub Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 border-b-2 border-[#1A1A1A] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border-2 border-[#1A1A1A] bg-[#8B0000] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-[2px_2px_0px_#1A1A1A]">
            変
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-wide text-[#1A1A1A] uppercase" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              CHIẾN THẦN CHIA ĐỘNG TỪ
            </h1>
            <p className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-wider">Sơnkuro N4 System v2.0</p>
          </div>
        </div>
        <button
          onClick={() => {
            handlePlaySound("click");
            onGoBack();
          }}
          className="flex items-center gap-2 text-[#1A1A1A] font-bold hover:text-[#8B0000] transition-colors border-2 border-[#1A1A1A] hover:border-[#8B0000] px-4 py-1.5 rounded-xl bg-white shadow-[3px_3px_0px_#1A1A1A] hover:shadow-[3px_3px_0px_#8B0000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về Bí Kíp N4</span>
        </button>
      </div>

      {/* Sub Tabs Selection Navigation */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 border-b-2 border-gray-200/60 pb-5">
        <button
          onClick={() => handleTabChange("search")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold border-2 transition-all cursor-pointer text-sm ${activeSubTab === "search" ? "bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-[3px_3px_0px_#8B0000]" : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"}`}
        >
          <Search className="w-4 h-4" />
          <span>Tra Cứu</span>
        </button>

        <button
          onClick={() => handleTabChange("theory")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold border-2 transition-all cursor-pointer text-sm ${activeSubTab === "theory" ? "bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-[3px_3px_0px_#8B0000]" : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"}`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Bí Kíp 11 Thể</span>
        </button>

        <button
          onClick={() => handleTabChange("practice")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold border-2 transition-all cursor-pointer text-sm ${activeSubTab === "practice" ? "bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-[3px_3px_0px_#8B0000]" : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"}`}
        >
          <Activity className="w-4 h-4" />
          <span>Luyện Tập Gõ</span>
        </button>

        <button
          onClick={() => handleTabChange("reflex")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold border-2 transition-all cursor-pointer text-sm ${activeSubTab === "reflex" ? "bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-[3px_3px_0px_#8B0000]" : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"}`}
        >
          <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span>Phản Xạ 3S</span>
        </button>

        <button
          onClick={() => handleTabChange("mindmap")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold border-2 transition-all cursor-pointer text-sm ${activeSubTab === "mindmap" ? "bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-[3px_3px_0px_#8B0000]" : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"}`}
        >
          <GitFork className="w-4 h-4" />
          <span>Sơ Đồ Tư Duy</span>
        </button>
      </div>

      {/* RENDER ACTIVE TAB */}

      {/* -------------------- 1. TRA CỨU -------------------- */}
      {activeSubTab === "search" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: search bar & list of chips */}
          <div className="lg:col-span-5 bg-white p-5 border-4 border-[#1A1A1A] rounded-2xl shadow-[5px_5px_0px_#1A1A1A] space-y-4">
            <div className="flex justify-between items-center border-b-2 border-[#1A1A1A] pb-3">
              <h2 className="text-lg font-black" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                TRA CỨU ĐỘNG TỪ
              </h2>
              <span className="text-xs font-black bg-[#8B0000]/10 border border-[#8B0000] px-2.5 py-1 rounded-md text-[#8B0000]">
                {filteredVerbs.length} Từ
              </span>
            </div>

            {/* Search inputs */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
              <input
                type="text"
                placeholder="Nhập kanji, hiragana hoặc ý nghĩa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-300 focus:border-[#8B0000] outline-none text-sm transition-all"
              />
            </div>

            {/* Group filters */}
            <div className="flex gap-2">
              <button
                onClick={() => { handlePlaySound("click"); setGroupFilter(null); }}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold border ${groupFilter === null ? "bg-[#1A1A1A] text-white border-[#1A1A1A]" : "bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-200"}`}
              >
                Tất cả
              </button>
              <button
                onClick={() => { handlePlaySound("click"); setGroupFilter(1); }}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold border ${groupFilter === 1 ? "bg-emerald-600 text-white border-emerald-600" : "bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-200"}`}
              >
                Nhóm 1
              </button>
              <button
                onClick={() => { handlePlaySound("click"); setGroupFilter(2); }}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold border ${groupFilter === 2 ? "bg-sky-600 text-white border-sky-600" : "bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-200"}`}
              >
                Nhóm 2
              </button>
              <button
                onClick={() => { handlePlaySound("click"); setGroupFilter(3); }}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold border ${groupFilter === 3 ? "bg-amber-600 text-white border-amber-600" : "bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-200"}`}
              >
                Nhóm 3
              </button>
            </div>

            {/* Chip Container */}
            <div className="max-h-[380px] overflow-y-auto pr-1 space-y-1 bg-gray-50/50 p-2 border-2 border-gray-200 rounded-xl custom-scrollbar">
              {filteredVerbs.length === 0 ? (
                <p className="text-center text-xs text-gray-400 py-10 font-bold">Không tìm thấy động từ nào!</p>
              ) : (
                filteredVerbs.map((v) => (
                  <button
                    key={v.kanji + v.meaning}
                    onClick={() => {
                      handlePlaySound("click");
                      setSelectedVerb(v);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border text-left transition-all cursor-pointer ${selectedVerb.kanji === v.kanji ? "bg-[#8B0000]/10 border-[#8B0000] text-[#8B0000] shadow-sm font-bold scale-[0.99]" : "bg-white hover:bg-gray-50 border-gray-100 text-gray-700"}`}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-black tracking-tight flex items-center gap-1.5">
                        {v.kanji}
                        <span className="text-[10px] font-normal text-gray-400">({v.hiragana})</span>
                      </span>
                      <span className="text-xs text-gray-500 font-bold italic line-clamp-1">{v.meaning}</span>
                    </div>
                    <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md text-white uppercase tracking-wider ${v.group === 1 ? "bg-emerald-500" : v.group === 2 ? "bg-sky-500" : "bg-amber-500"}`}>
                      N{v.group}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Right Column: details & tables for chosen word */}
          <div className="lg:col-span-7 bg-white p-6 border-4 border-[#1A1A1A] rounded-2xl shadow-[5px_5px_0px_#1A1A1A] space-y-6">
            
            {/* Active Word Header Info */}
            <div className="flex flex-wrap justify-between items-center gap-4 bg-[#FDFBF7] p-4 border-2 border-[#1A1A1A] rounded-xl relative">
              <div className="absolute top-2 right-2 flex gap-1">
                <span className={`text-xs font-black text-white px-2.5 py-1 rounded-md tracking-widest ${selectedVerb.group === 1 ? "bg-emerald-600" : selectedVerb.group === 2 ? "bg-sky-600" : "bg-amber-600"}`}>
                  NHÓM {selectedVerb.group}
                </span>
              </div>
              
              <div>
                <span className="text-xs text-gray-400 font-bold block mb-1">Từ đang chọn:</span>
                <div className="flex items-baseline gap-2.5">
                  <h3 className="text-2xl sm:text-3xl font-black text-[#1A1A1A]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                    {selectedVerb.kanji}
                  </h3>
                  <p className="text-sm text-gray-600 font-bold">({selectedVerb.hiragana})</p>
                </div>
                <p className="text-sm sm:text-base font-bold text-[#8B0000] mt-1 italic">
                  Ý nghĩa: {selectedVerb.meaning}
                </p>
              </div>
            </div>

            {/* Conjugated Grid */}
            <div>
              <h4 className="text-xs text-gray-400 font-bold tracking-widest uppercase mb-3 border-b border-gray-100 pb-1.5">
                BẢNG 11 THỂ BIẾN HOÁ
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-[440px] overflow-y-auto pr-1">
                {FORM_KEYS.map((key) => {
                  const label = FORM_NAMES[key];
                  const value = selectedVerb.forms[key];
                  const hiraValue = selectedVerb.hiraForms[key];
                  const rule = selectedVerb.rules[key];
                  
                  return (
                    <div 
                      key={key} 
                      className="p-3 bg-gray-50/50 hover:bg-gray-50 border border-gray-200 hover:border-gray-400 rounded-xl transition-all relative overflow-hidden group"
                    >
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-[#1A1A1A] group-hover:bg-[#8B0000] transition-colors"></div>
                      <div className="pl-2">
                        <span className="text-[10px] text-gray-400 font-black tracking-wider block uppercase">{label}</span>
                        <div className="flex items-baseline gap-1.5 my-1">
                          <span className="text-base font-black text-[#1A1A1A]">{value}</span>
                          {value !== hiraValue && (
                            <span className="text-xs text-gray-400 font-bold">({hiraValue})</span>
                          )}
                        </div>
                        <p className="text-[10px] text-gray-500 font-medium italic mt-0.5 line-clamp-2">{rule}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Open in Mindmap Shortcut */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  handlePlaySound("click");
                  setActiveSubTab("mindmap");
                }}
                className="flex items-center gap-1.5 text-xs font-black text-[#8B0000] hover:underline"
              >
                <span>Xem sơ đồ tư duy 5 cột âm của từ này</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------- 2. BÍ KÍP 11 THỂ (LÝ THUYẾT) -------------------- */}
      {activeSubTab === "theory" && (() => {
        const selectedItem = THEORY_ITEMS.find((item) => item.key === selectedTheoryForm) || THEORY_ITEMS[0];
        
        // Filter the 11 forms
        const filteredTheoryItems = THEORY_ITEMS.filter((item) => {
          const query = theorySearchQuery.trim().toLowerCase();
          return (
            item.name.toLowerCase().includes(query) ||
            item.vietName.toLowerCase().includes(query) ||
            item.jpName.toLowerCase().includes(query) ||
            item.desc.toLowerCase().includes(query)
          );
        });

        // Dynamic examples query
        const getDynamicExamples = (formKey: keyof ConjugatedForms) => {
          const g1 = DATABASE.filter(v => v.group === 1).slice(0, 2);
          const g2 = DATABASE.filter(v => v.group === 2).slice(0, 2);
          const g3 = DATABASE.filter(v => v.group === 3).slice(0, 2);
          return { g1, g2, g3 };
        };
        const dynamicExs = getDynamicExamples(selectedTheoryForm);

        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-7xl mx-auto">
            {/* Left Panel: 11 Forms Selection Sidebar */}
            <div className="lg:col-span-4 bg-white p-5 border-4 border-[#1A1A1A] rounded-2xl shadow-[5px_5px_0px_#1A1A1A] space-y-4">
              <div className="border-b-2 border-[#1A1A1A] pb-3">
                <h2 className="text-lg font-black uppercase flex items-center gap-2" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>DANH SÁCH 11 THỂ</span>
                </h2>
                <p className="text-xs text-gray-500 font-bold mt-1">Chọn thể cần tra cứu quy tắc chia nhanh</p>
              </div>

              {/* Simple search through forms */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm thể nhanh..."
                  value={theorySearchQuery}
                  onChange={(e) => setTheorySearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border-2 border-gray-200 focus:border-[#8B0000] outline-none text-xs transition-all font-sans"
                />
              </div>

              {/* List of 11 Forms */}
              <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
                {filteredTheoryItems.length === 0 ? (
                  <p className="text-center text-xs text-gray-400 py-6 font-bold">Không tìm thấy thể nào!</p>
                ) : (
                  filteredTheoryItems.map((item, index) => {
                    const isSelected = selectedTheoryForm === item.key;
                    return (
                      <button
                        key={item.key}
                        onClick={() => {
                          handlePlaySound("click");
                          setSelectedTheoryForm(item.key as keyof ConjugatedForms);
                        }}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected 
                            ? "bg-[#8B0000]/10 border-[#8B0000] text-[#8B0000] font-black shadow-sm scale-[0.99]" 
                            : "bg-white hover:bg-gray-50 border-gray-100 text-gray-700"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                            isSelected ? "bg-[#8B0000] text-white" : "bg-gray-100 text-gray-500"
                          }`}>
                            {index + 1}
                          </span>
                          <div className="flex flex-col">
                            <span className="text-xs font-black tracking-tight">{item.vietName}</span>
                            <span className="text-[10px] text-gray-400 font-normal">({item.jpName})</span>
                          </div>
                        </div>
                        <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md border ${
                          isSelected ? "bg-white border-[#8B0000] text-[#8B0000]" : "bg-gray-50 border-gray-200 text-gray-500"
                        }`}>
                          {item.suffix}
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right Panel: Selected Form Detailed Secrets */}
            <div className="lg:col-span-8 bg-white p-6 border-4 border-[#1A1A1A] rounded-2xl shadow-[5px_5px_0px_#1A1A1A] space-y-6">
              {/* Header Card */}
              <div className="border-b-4 border-[#1A1A1A] pb-5">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                  <span className="text-xs bg-[#8B0000] text-white px-3 py-1 rounded-lg font-black uppercase tracking-wider shadow-[1px_1px_0px_#1A1A1A]">
                    {selectedItem.jpName}
                  </span>
                  <span className="text-xs font-bold text-gray-400 font-mono">Đuôi biến đổi chính: {selectedItem.suffix}</span>
                </div>
                <h2 className="text-2xl font-black text-[#1A1A1A] uppercase tracking-wide" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                  {selectedItem.name}
                </h2>
                <p className="text-sm text-gray-600 mt-2 font-medium leading-relaxed italic border-l-4 border-amber-500 pl-3">
                  {selectedItem.desc}
                </p>
              </div>

              {/* Usage & Key Applications */}
              <div className="bg-[#FDFBF7] p-4 border-2 border-dashed border-[#1A1A1A] rounded-xl space-y-2.5">
                <h3 className="text-xs text-amber-800 font-black tracking-widest uppercase flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>ỨNG DỤNG NGỮ PHÁP TIÊU BIỂU</span>
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-bold text-gray-700">
                  {selectedItem.usage.map((use, idx) => (
                    <li key={idx} className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-lg border border-gray-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8B0000]"></span>
                      <span>{use}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Interactive Rule breakdown for 3 groups */}
              <div className="space-y-4">
                <h3 className="text-xs text-gray-400 font-bold tracking-widest uppercase border-b border-gray-100 pb-2">
                  BÍ QUYẾT CHIA THEO TỪNG NHÓM
                </h3>

                {/* Nhóm 1 Card */}
                <div className="p-4 rounded-xl border-2 border-emerald-600 bg-emerald-50/20 relative overflow-hidden space-y-2.5">
                  <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl shadow-sm">
                    NHÓM 1 (G1)
                  </div>
                  <h4 className="text-sm font-black text-emerald-800 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span>Quy tắc chuyển âm</span>
                  </h4>
                  <p className="text-xs text-gray-700 font-bold leading-relaxed">{selectedItem.g1.rule}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <div className="bg-white p-2.5 rounded-lg border border-emerald-100 font-mono text-xs">
                      <span className="text-[10px] text-gray-400 block font-bold uppercase">CÔNG THỨC</span>
                      <pre className="text-emerald-700 font-extrabold whitespace-pre-wrap">{selectedItem.g1.formula}</pre>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-emerald-100 text-xs">
                      <span className="text-[10px] text-gray-400 block font-bold uppercase">VÍ DỤ ĐIỂN HÌNH</span>
                      <pre className="text-gray-600 font-medium whitespace-pre-wrap leading-relaxed">{selectedItem.g1.example}</pre>
                    </div>
                  </div>
                </div>

                {/* Nhóm 2 Card */}
                <div className="p-4 rounded-xl border-2 border-sky-600 bg-sky-50/20 relative overflow-hidden space-y-2.5">
                  <div className="absolute top-0 right-0 bg-sky-600 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl shadow-sm">
                    NHÓM 2 (G2)
                  </div>
                  <h4 className="text-sm font-black text-sky-800 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                    <span>Quy tắc vàng</span>
                  </h4>
                  <p className="text-xs text-gray-700 font-bold leading-relaxed">{selectedItem.g2.rule}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <div className="bg-white p-2.5 rounded-lg border border-sky-100 font-mono text-xs">
                      <span className="text-[10px] text-gray-400 block font-bold uppercase">CÔNG THỨC</span>
                      <pre className="text-sky-700 font-extrabold whitespace-pre-wrap">{selectedItem.g2.formula}</pre>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-sky-100 text-xs">
                      <span className="text-[10px] text-gray-400 block font-bold uppercase">VÍ DỤ ĐIỂN HÌNH</span>
                      <pre className="text-gray-600 font-medium whitespace-pre-wrap leading-relaxed">{selectedItem.g2.example}</pre>
                    </div>
                  </div>
                </div>

                {/* Nhóm 3 Card */}
                <div className="p-4 rounded-xl border-2 border-amber-600 bg-amber-50/20 relative overflow-hidden space-y-2.5">
                  <div className="absolute top-0 right-0 bg-amber-600 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl shadow-sm">
                    NHÓM 3 (G3 - Bất Quy Tắc)
                  </div>
                  <h4 className="text-sm font-black text-amber-800 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <span>Quy tắc cố định</span>
                  </h4>
                  <p className="text-xs text-gray-700 font-bold leading-relaxed">{selectedItem.g3.rule}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <div className="bg-white p-2.5 rounded-lg border border-amber-100 font-mono text-xs">
                      <span className="text-[10px] text-gray-400 block font-bold uppercase">CÔNG THỨC</span>
                      <pre className="text-amber-700 font-extrabold whitespace-pre-wrap">{selectedItem.g3.formula}</pre>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-amber-100 text-xs">
                      <span className="text-[10px] text-gray-400 block font-bold uppercase">VÍ DỤ ĐIỂN HÌNH</span>
                      <pre className="text-gray-600 font-medium whitespace-pre-wrap leading-relaxed">{selectedItem.g3.example}</pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Live database examples */}
              <div className="border-t border-gray-200 pt-5 space-y-3">
                <h3 className="text-xs text-gray-400 font-bold tracking-widest uppercase flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-[#8B0000]" />
                  <span>VÍ DỤ THỰC TẾ TRONG HỆ THỐNG</span>
                </h3>
                <p className="text-xs text-gray-500 font-bold">Các động từ học viên được luyện tập thực tế sẽ chia như sau:</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* G1 live */}
                  <div className="p-3 border border-gray-200 rounded-xl bg-gray-50/50 space-y-2">
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 font-extrabold px-1.5 py-0.5 rounded tracking-wide uppercase">Nhóm 1 Examples</span>
                    <div className="space-y-1.5">
                      {dynamicExs.g1.map(v => (
                        <div key={v.kanji} className="flex justify-between items-baseline border-b border-gray-200/50 pb-1 last:border-0 text-xs font-bold text-gray-700">
                          <span>{v.kanji} <span className="text-[9px] text-gray-400">({v.masu})</span></span>
                          <span className="text-[#8B0000] font-black">{v.forms[selectedTheoryForm]}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* G2 live */}
                  <div className="p-3 border border-gray-200 rounded-xl bg-gray-50/50 space-y-2">
                    <span className="text-[9px] bg-sky-100 text-sky-800 font-extrabold px-1.5 py-0.5 rounded tracking-wide uppercase">Nhóm 2 Examples</span>
                    <div className="space-y-1.5">
                      {dynamicExs.g2.map(v => (
                        <div key={v.kanji} className="flex justify-between items-baseline border-b border-gray-200/50 pb-1 last:border-0 text-xs font-bold text-gray-700">
                          <span>{v.kanji} <span className="text-[9px] text-gray-400">({v.masu})</span></span>
                          <span className="text-[#8B0000] font-black">{v.forms[selectedTheoryForm]}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* G3 live */}
                  <div className="p-3 border border-gray-200 rounded-xl bg-gray-50/50 space-y-2">
                    <span className="text-[9px] bg-amber-100 text-amber-800 font-extrabold px-1.5 py-0.5 rounded tracking-wide uppercase">Nhóm 3 Examples</span>
                    <div className="space-y-1.5">
                      {dynamicExs.g3.map(v => (
                        <div key={v.kanji} className="flex justify-between items-baseline border-b border-gray-200/50 pb-1 last:border-0 text-xs font-bold text-gray-700">
                          <span>{v.kanji} <span className="text-[9px] text-gray-400">({v.masu})</span></span>
                          <span className="text-[#8B0000] font-black">{v.forms[selectedTheoryForm]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {false && activeSubTab === "theory" && (
        <div className="max-w-4xl mx-auto bg-white p-6 border-4 border-[#1A1A1A] rounded-3xl shadow-[5px_5px_0px_#1A1A1A] space-y-8">
          <div className="text-center border-b-2 border-gray-200 pb-5">
            <h2 className="text-2xl font-black text-[#1A1A1A] tracking-wider uppercase" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              CÔNG THỨC CHIẾN THẦN CHIA ĐỘNG TỪ
            </h2>
            <p className="text-xs text-gray-500 font-bold italic mt-1">Toàn bộ quy tắc cốt lõi giúp rèn luyện phản xạ nhanh chóng</p>
          </div>

          <div className="space-y-8">
            
            {/* Nhóm 1 */}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-black bg-emerald-600 text-white px-4 py-2 rounded-xl flex items-center justify-between shadow-[3px_3px_0px_#1A1A1A]">
                <span>NHÓM 1 (Động từ kết thúc đuôi cột I trước ます)</span>
                <span className="text-xs font-serif font-black bg-white text-emerald-800 px-2 py-0.5 rounded-lg">G1</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium pl-2">
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 space-y-1.5">
                  <p className="font-extrabold text-[#1A1A1A] text-sm">Cột A: Phủ định, Bị động, Sai khiến</p>
                  <ul className="list-disc pl-4 space-y-1 text-gray-600">
                    <li><strong className="text-gray-800">Thể Nai:</strong> Đuôi cột I chuyển sang cột A + ない (Ví dụ: あいます → あわない)</li>
                    <li><strong className="text-gray-800">Thể Bị động:</strong> Chuyển cột I thành cột A + れます (あいます → あわれます)</li>
                    <li><strong className="text-gray-800">Thể Sai khiến:</strong> Chuyển cột I thành cột A + せます (あいます → あわせます)</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 space-y-1.5">
                  <p className="font-extrabold text-[#1A1A1A] text-sm">Cột U: Từ điển, Cấm đoán</p>
                  <ul className="list-disc pl-4 space-y-1 text-gray-600">
                    <li><strong className="text-gray-800">Thể Từ điển:</strong> Đuôi cột I chuyển sang cột U tương ứng (あいます → あう)</li>
                    <li><strong className="text-gray-800">Cấm đoán:</strong> Thể từ điển + な (Ví dụ: あう + な → あうな)</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 space-y-1.5">
                  <p className="font-extrabold text-[#1A1A1A] text-sm">Cột E: Khả năng, Điều kiện, Mệnh lệnh</p>
                  <ul className="list-disc pl-4 space-y-1 text-gray-600">
                    <li><strong className="text-gray-800">Khả năng:</strong> Đuôi cột I sang cột E + ます (Ví dụ: あいます → あえます)</li>
                    <li><strong className="text-gray-800">Điều kiện:</strong> Đuôi cột I sang cột E + ば (Ví dụ: あいます → あえば)</li>
                    <li><strong className="text-gray-800">Mệnh lệnh:</strong> Đuôi cột I sang cột E (Ví dụ: あいます → あえ)</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 space-y-1.5">
                  <p className="font-extrabold text-[#1A1A1A] text-sm">Biến âm Thể Te / Ta (Rất Quan Trọng)</p>
                  <ul className="list-disc pl-4 space-y-1 text-gray-600">
                    <li><strong className="text-gray-800">い、ち、り:</strong> Biến đổi thành <span className="text-[#8B0000] font-bold">って / った</span> (あいます → あって)</li>
                    <li><strong className="text-gray-800">み、び、に:</strong> Biến đổi thành <span className="text-[#8B0000] font-bold">んで / んだ</span> (よみます → よんで)</li>
                    <li><strong className="text-gray-800">き:</strong> Biến đổi thành <span className="text-[#8B0000] font-bold">いて / いた</span> (かきます → かいて)</li>
                    <li><strong className="text-gray-800">ぎ:</strong> Biến đổi thành <span className="text-[#8B0000] font-bold">いで / いだ</span> (およぎます → およぎで)</li>
                    <li><strong className="text-gray-800">し:</strong> Biến đổi thành <span className="text-[#8B0000] font-bold">して / した</span> (はなします → はなして)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Nhóm 2 */}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-black bg-sky-600 text-white px-4 py-2 rounded-xl flex items-center justify-between shadow-[3px_3px_0px_#1A1A1A]">
                <span>NHÓM 2 (Động từ kết thúc đuôi cột E trước ます và từ đặc biệt)</span>
                <span className="text-xs font-serif font-black bg-white text-sky-800 px-2 py-0.5 rounded-lg">G2</span>
              </h3>
              
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs font-medium space-y-2">
                <p className="font-extrabold text-[#1A1A1A] text-sm">Quy tắc vàng: "Chỉ cần Bỏ ます rồi lắp Đuôi"</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="p-2 bg-white rounded border border-gray-100"><strong className="text-[#8B0000]">Từ điển:</strong> Bỏ ます + る (たべる)</div>
                  <div className="p-2 bg-white rounded border border-gray-100"><strong className="text-[#8B0000]">Thể Nai:</strong> Bỏ ます + ない (たべない)</div>
                  <div className="p-2 bg-white rounded border border-gray-100"><strong className="text-[#8B0000]">Thể Te/Ta:</strong> Bỏ ます + て / た (たべて)</div>
                  <div className="p-2 bg-white rounded border border-gray-100"><strong className="text-[#8B0000]">Khả năng:</strong> Bỏ ます + られます</div>
                  <div className="p-2 bg-white rounded border border-gray-100"><strong className="text-[#8B0000]">Bị động:</strong> Bỏ ます + られます</div>
                  <div className="p-2 bg-white rounded border border-gray-100"><strong className="text-[#8B0000]">Sai khiến:</strong> Bỏ ます + させます</div>
                  <div className="p-2 bg-white rounded border border-gray-100"><strong className="text-[#8B0000]">Ý chí:</strong> Bỏ ます + よう</div>
                  <div className="p-2 bg-white rounded border border-gray-100"><strong className="text-[#8B0000]">Điều kiện:</strong> Bỏ ます + れば</div>
                  <div className="p-2 bg-white rounded border border-gray-100"><strong className="text-[#8B0000]">Mệnh lệnh:</strong> Bỏ ます + ろ</div>
                </div>
              </div>
            </div>

            {/* Nhóm 3 */}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-black bg-amber-600 text-white px-4 py-2 rounded-xl flex items-center justify-between shadow-[3px_3px_0px_#1A1A1A]">
                <span>NHÓM 3 (Động từ bất quy tắc)</span>
                <span className="text-xs font-serif font-black bg-white text-amber-800 px-2 py-0.5 rounded-lg">G3</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2">
                  <p className="font-extrabold text-[#1A1A1A] text-sm text-center border-b border-gray-200 pb-1.5">来る (くる - Đến)</p>
                  <div className="space-y-1.5 text-gray-600">
                    <p>• Từ điển: <strong className="text-gray-850">くる</strong> | Thể Nai: <strong className="text-gray-850">こない</strong></p>
                    <p>• Thể Te: <strong className="text-gray-850">きて</strong> | Thể Ta: <strong className="text-gray-850">きた</strong></p>
                    <p>• Khả năng/Bị động: <strong className="text-gray-850">こられます</strong></p>
                    <p>• Sai khiến: <strong className="text-gray-850">こさせます</strong></p>
                    <p>• Ý chí: <strong className="text-gray-850">こよう</strong> | Mệnh lệnh: <strong className="text-gray-850">こい</strong></p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2">
                  <p className="font-extrabold text-[#1A1A1A] text-sm text-center border-b border-gray-200 pb-1.5">する (Làm / Danh động từ + する)</p>
                  <div className="space-y-1.5 text-gray-600">
                    <p>• Từ điển: <strong className="text-gray-850">する</strong> | Thể Nai: <strong className="text-gray-850">しない</strong></p>
                    <p>• Thể Te: <strong className="text-gray-850">して</strong> | Thể Ta: <strong className="text-gray-850">した</strong></p>
                    <p>• Khả năng: <strong className="text-gray-850">できます</strong> | Bị động: <strong className="text-gray-850">されます</strong></p>
                    <p>• Sai khiến: <strong className="text-gray-850">させます</strong></p>
                    <p>• Ý chí: <strong className="text-gray-850">しよう</strong> | Mệnh lệnh: <strong className="text-gray-850">しろ</strong></p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* -------------------- 3. LUYỆN TẬP GÕ -------------------- */}
      {activeSubTab === "practice" && (
        <div className="max-w-3xl mx-auto">
          {!isPracticing ? (
            <div className="bg-white p-6 sm:p-8 border-4 border-[#1A1A1A] rounded-3xl shadow-[5px_5px_0px_#1A1A1A] space-y-6">
              <div className="text-center border-b border-gray-100 pb-4">
                <h2 className="text-xl font-black text-[#1A1A1A] uppercase" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                  CÀI ĐẶT LUYỆN TẬP GÕ
                </h2>
                <p className="text-xs text-gray-400 font-bold italic mt-1">Cá nhân hoá thử thách của bạn</p>
              </div>

              {/* Group selection */}
              <div className="space-y-3">
                <label className="text-xs font-black tracking-wider text-gray-400 uppercase block">Chọn Nhóm Động Từ:</label>
                <div className="flex gap-3">
                  {[1, 2, 3].map((g) => (
                    <button
                      key={g}
                      onClick={() => {
                        handlePlaySound("click");
                        setPracticeGroups((prev) => 
                          prev.includes(g) ? prev.filter((item) => item !== g) : [...prev, g]
                        );
                      }}
                      className={`flex-1 py-3 border-2 rounded-2xl font-black cursor-pointer text-sm transition-all ${practiceGroups.includes(g) ? "bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-[3px_3px_0px_#8B0000]" : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"}`}
                    >
                      Nhóm {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Forms selection */}
              <div className="space-y-3">
                <label className="text-xs font-black tracking-wider text-gray-400 uppercase block">Chọn Thể Muốn Luyện Tập:</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                  {FORM_KEYS.map((k) => {
                    const active = practiceForms.includes(k);
                    return (
                      <button
                        key={k}
                        onClick={() => {
                          handlePlaySound("click");
                          setPracticeForms((prev) => 
                            prev.includes(k) ? prev.filter((item) => item !== k) : [...prev, k]
                          );
                        }}
                        className={`py-2 px-3 border rounded-xl font-bold text-xs transition-all cursor-pointer ${active ? "bg-[#8B0000]/10 text-[#8B0000] border-[#8B0000]" : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"}`}
                      >
                        {FORM_NAMES[k]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action */}
              <button
                onClick={handleStartPractice}
                className="w-full py-4 bg-[#8B0000] hover:bg-[#A30000] text-white font-black rounded-2xl tracking-widest uppercase transition-all shadow-[4px_4px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer mt-4"
              >
                BẮT ĐẦU TUYỆT KỸ
              </button>
            </div>
          ) : (
            /* Active Typing Practice Area */
            <div className="bg-white p-6 sm:p-8 border-4 border-[#1A1A1A] rounded-3xl shadow-[5px_5px_0px_#1A1A1A] space-y-6">
              
              {/* Header Details with stats */}
              <div className="flex justify-between items-center border-b-2 border-gray-200 pb-3">
                <span className="text-xs font-black text-[#8B0000] uppercase tracking-wider">Luyện Tập Gõ</span>
                <div className="flex gap-4 items-center">
                  <span className="text-xs font-black text-gray-500">
                    Chính xác: <span className="text-[#1A1A1A] font-extrabold">{practiceStats.correct}/{practiceStats.total}</span>
                  </span>
                  <button
                    onClick={() => {
                      handlePlaySound("click");
                      setIsPracticing(false);
                      setPracticeQuestion(null);
                    }}
                    className="text-xs font-bold text-gray-400 hover:text-[#8B0000]"
                  >
                    Thoát
                  </button>
                </div>
              </div>

              {practiceQuestion && (
                <div className="text-center py-6 space-y-4">
                  {/* Current word card */}
                  <div className="bg-[#FFFDF9] p-6 border-2 border-dashed border-[#1A1A1A] rounded-2xl space-y-2 inline-block min-w-[280px]">
                    <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded uppercase">
                      Nhóm {practiceQuestion.verb.group}
                    </span>
                    <h3 className="text-3xl font-black text-[#1A1A1A]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                      {practiceQuestion.verb.kanji}
                    </h3>
                    <p className="text-xs text-gray-500 font-bold">({practiceQuestion.verb.hiragana})</p>
                    <p className="text-xs text-gray-400 italic">Ý nghĩa: {practiceQuestion.verb.meaning}</p>
                  </div>

                  {/* Requested conjugation task */}
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-black block">Yêu cầu chia sang thể:</span>
                    <h4 className="text-lg font-black text-[#8B0000] tracking-wide my-1">
                      {FORM_NAMES[practiceQuestion.formKey]}
                    </h4>
                  </div>

                  {/* Input form */}
                  <div className="max-w-md mx-auto space-y-3">
                    <input
                      type="text"
                      placeholder="Gõ Kanji hoặc Hiragana..."
                      value={practiceAnswer}
                      onChange={(e) => setPracticeAnswer(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !practiceResult) {
                          checkPracticeAnswer();
                        }
                      }}
                      disabled={!!practiceResult}
                      autoFocus
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-[#8B0000] text-center font-bold outline-none shadow-sm text-base"
                    />

                    {/* Result Card */}
                    {practiceResult && (
                      <div className={`p-4 rounded-xl border-2 text-center space-y-1.5 ${practiceResult.isCorrect ? "bg-emerald-50 border-emerald-500 text-emerald-800" : "bg-red-50 border-red-500 text-red-800"}`}>
                        <div className="flex items-center justify-center gap-2">
                          {practiceResult.isCorrect ? (
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600" />
                          )}
                          <span className="font-extrabold text-sm">{practiceResult.isCorrect ? "XUẤT SẮC! ĐÃ CHIA CHÍNH XÁC." : "CHƯA CHÍNH XÁC RỒI!"}</span>
                        </div>
                        <p className="text-xs font-bold">
                          Đáp án đúng: <span className="underline font-black text-base">{practiceResult.correctAnswer}</span>
                        </p>
                        <p className="text-[10px] text-gray-500 font-medium">Quy luật: {practiceQuestion.verb.rules[practiceQuestion.formKey]}</p>
                      </div>
                    )}

                    {/* Controls */}
                    <div className="flex gap-3 pt-2">
                      {!practiceResult ? (
                        <>
                          <button
                            onClick={() => {
                              handlePlaySound("click");
                              setPracticeAnswer("");
                            }}
                            className="flex-1 py-2.5 border-2 border-gray-200 hover:border-gray-400 font-bold text-gray-500 rounded-xl text-xs cursor-pointer"
                          >
                            Xoá trắng
                          </button>
                          <button
                            onClick={checkPracticeAnswer}
                            disabled={!practiceAnswer.trim()}
                            className="flex-1 py-2.5 bg-[#1A1A1A] hover:bg-[#333] text-white font-black rounded-xl text-xs tracking-wider cursor-pointer disabled:opacity-50"
                          >
                            XÁC NHẬN
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={generatePracticeQuestion}
                          className="w-full py-3 bg-[#8B0000] hover:bg-[#A30000] text-white font-black rounded-xl text-xs tracking-widest uppercase cursor-pointer"
                        >
                          CÂU TIẾP THEO
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* -------------------- 4. PHẢN XẠ 3S (GAME) -------------------- */}
      {activeSubTab === "reflex" && (
        <div className="max-w-2xl mx-auto">
          {!reflexActive ? (
            <div className="bg-white p-6 sm:p-8 border-4 border-[#1A1A1A] rounded-3xl shadow-[5px_5px_0px_#1A1A1A] space-y-6 text-center">
              <Zap className="w-12 h-12 text-amber-500 fill-amber-500 mx-auto animate-pulse" />
              <div className="space-y-1">
                <h2 className="text-xl font-black text-[#1A1A1A] uppercase" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                  ĐẠO TRÀNG PHẢN XẠ 3S
                </h2>
                <p className="text-xs text-gray-400 font-bold italic">Rèn luyện phản xạ sinh tử với thời gian đếm ngược</p>
              </div>

              {/* High Score Panel */}
              <div className="bg-amber-50/50 p-4 border border-amber-300 rounded-2xl flex justify-between items-center max-w-sm mx-auto">
                <div className="flex items-center gap-2 text-amber-800">
                  <Award className="w-5 h-5 text-amber-600 fill-amber-300" />
                  <span className="text-xs font-black uppercase">Kỷ lục của bạn:</span>
                </div>
                <span className="text-lg font-black text-amber-800">{reflexHighscore} Đểm</span>
              </div>

              {/* Settings */}
              <div className="space-y-4 text-left max-w-md mx-auto">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 tracking-wider uppercase block">Chọn Thời Gian Đếm Ngược:</label>
                  <div className="flex gap-2">
                    {[10, 5, 3].map((s) => (
                      <button
                        key={s}
                        onClick={() => { handlePlaySound("click"); setReflexConfig((c) => ({ ...c, timeLimit: s })); }}
                        className={`flex-1 py-2.5 rounded-xl border-2 font-black text-xs transition-all cursor-pointer ${reflexConfig.timeLimit === s ? "bg-[#1A1A1A] text-white border-[#1A1A1A]" : "bg-white text-gray-500 border-gray-200"}`}
                      >
                        {s} giây {s === 3 ? "🔥 (Ác mộng)" : s === 5 ? "⚡ (Trung bình)" : "🍀 (Dễ)"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 tracking-wider uppercase block">Động từ Nhóm:</label>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((g) => {
                      const active = reflexConfig.groups.includes(g);
                      return (
                        <button
                          key={g}
                          onClick={() => {
                            handlePlaySound("click");
                            setReflexConfig((c) => ({
                              ...c,
                              groups: active ? c.groups.filter((item) => item !== g) : [...c.groups, g]
                            }));
                          }}
                          className={`flex-1 py-2.5 rounded-xl border-2 font-black text-xs transition-all cursor-pointer ${active ? "bg-[#8B0000]/10 border-[#8B0000] text-[#8B0000]" : "bg-white text-gray-500 border-gray-200"}`}
                        >
                          Nhóm {g}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Start Button */}
              <button
                onClick={startReflexGame}
                className="w-full max-w-md py-4 bg-[#8B0000] hover:bg-[#A30000] text-white font-black rounded-2xl tracking-widest uppercase shadow-[4px_4px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
              >
                VÀO ĐẠO TRÀNG CHIẾN ĐẤU
              </button>
            </div>
          ) : (
            /* ACTIVE REFLEX GAME CONTAINER */
            <div className="bg-[#1A1A1A] text-white p-6 sm:p-8 border-4 border-[#1A1A1A] rounded-3xl shadow-[5px_5px_0px_#8B0000] space-y-6 relative overflow-hidden">
              
              {/* Decorative side graphics */}
              <div className="absolute top-0 right-0 p-8 opacity-5 text-8xl font-serif pointer-events-none select-none">
                死
              </div>

              {/* Score & Streak Header */}
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <div className="flex items-center gap-4">
                  <div className="text-left">
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">ĐIỂM SỐ</span>
                    <span className="text-xl font-black text-[#FFCC00]">{reflexScore}</span>
                  </div>
                  
                  {reflexStreak > 0 && (
                    <div className="flex items-center gap-1 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-lg">
                      <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-bounce" />
                      <span className="text-xs font-black text-amber-500">x{reflexStreak} Chuỗi</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={endReflexGame}
                  className="text-xs font-bold text-gray-400 hover:text-white"
                >
                  Kết thúc
                </button>
              </div>

              {/* Progress time limit bar */}
              {reflexQuestion && !reflexFeedback && (
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 rounded-full ${reflexTimer <= 2 ? "bg-rose-500" : "bg-emerald-500"}`}
                    style={{ width: `${(reflexTimer / reflexConfig.timeLimit) * 100}%` }}
                  ></div>
                </div>
              )}

              {/* Current reflex challenge */}
              {reflexQuestion && (
                <div className="text-center space-y-6 py-4">
                  
                  {/* Big bold word */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">ĐỘNG TỪ CẦN CHIA</span>
                    <h3 className="text-3xl font-black tracking-wide" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                      {reflexQuestion.verb.kanji}
                    </h3>
                    <p className="text-xs text-gray-400">({reflexQuestion.verb.hiragana}) - {reflexQuestion.verb.meaning}</p>
                  </div>

                  {/* Goal label */}
                  <div className="bg-white/5 py-3 px-4 border border-white/10 rounded-xl inline-block">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Hãy chia nhanh sang thể:</span>
                    <span className="text-lg font-black text-[#FFCC00]">{FORM_NAMES[reflexQuestion.formKey]}</span>
                  </div>

                  {/* Option Choice Grid (4 button choices) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto pt-2">
                    {reflexQuestion.options.map((opt) => {
                      const isCorrectAnswer = opt === reflexQuestion.correctAnswer;
                      
                      let btnStyle = "bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white border-white/10";
                      
                      if (reflexFeedback) {
                        if (isCorrectAnswer) {
                          btnStyle = "bg-emerald-600 text-white border-emerald-500";
                        } else {
                          btnStyle = "bg-red-950/40 text-gray-500 border-red-900/30 line-through";
                        }
                      }

                      return (
                        <button
                          key={opt}
                          disabled={!!reflexFeedback}
                          onClick={() => handleReflexAnswer(opt)}
                          className={`py-3.5 px-4 border-2 rounded-xl text-sm font-black transition-all cursor-pointer truncate ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback overlay */}
                  {reflexFeedback && (
                    <div className="pt-2 animate-bounce">
                      {reflexFeedback === "correct" ? (
                        <p className="text-emerald-400 font-black text-sm flex items-center justify-center gap-1">
                          <Check className="w-4 h-4" /> CHÍNH XÁC! +{10 + (reflexStreak - 1) * 2} Điểm
                        </p>
                      ) : reflexFeedback === "wrong" ? (
                        <p className="text-rose-500 font-black text-sm">
                          CHƯA CHÍNH XÁC! Hãy để ý quy luật chia.
                        </p>
                      ) : (
                        <p className="text-rose-500 font-black text-sm flex items-center justify-center gap-1">
                          <Clock className="w-4 h-4" /> HẾT GIỜ! Thử thách đã hết hạn.
                        </p>
                      )}
                    </div>
                  )}

                </div>
              )}

            </div>
          )}
        </div>
      )}

      {/* -------------------- 5. SƠ ĐỒ TƯ DUY (MINDMAP) -------------------- */}
      {activeSubTab === "mindmap" && (
        <div className="space-y-6">
          
          {/* Top selection row */}
          <div className="bg-white p-4 border-4 border-[#1A1A1A] rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-sm font-black text-[#1A1A1A]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                SƠ ĐỒ TƯ DUY 5 CỘT ÂM (あ・い・う・え・お)
              </h3>
              <p className="text-xs text-gray-400 font-bold">Hệ thống hóa 11 thể tương ứng theo 5 nguyên âm chính của Nhật ngữ</p>
            </div>

            {/* Quick selectors */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-bold">Xem từ:</span>
              <select
                value={selectedVerb.kanji}
                onChange={(e) => {
                  const found = DATABASE.find((v) => v.kanji === e.target.value);
                  if (found) {
                    handlePlaySound("click");
                    setSelectedVerb(found);
                  }
                }}
                className="px-3 py-1.5 rounded-xl border-2 border-gray-300 font-bold text-xs outline-none bg-white focus:border-[#8B0000]"
              >
                {DATABASE.map((v) => (
                  <option key={v.kanji} value={v.kanji}>
                    {v.kanji} ({v.meaning})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Core Interactive Visual Graph */}
          <div className="bg-white p-6 border-4 border-[#1A1A1A] rounded-3xl shadow-[6px_6px_0px_#1A1A1A] relative overflow-x-auto">
            
            {/* Center Core node */}
            <div className="flex flex-col items-center mb-10">
              <div className="bg-[#8B0000] text-white p-5 border-2 border-[#1A1A1A] rounded-2xl shadow-[4px_4px_0px_#1A1A1A] text-center min-w-[200px] relative z-10">
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-bold uppercase tracking-wider">CHỦ THỂ</span>
                <h4 className="text-2xl font-black mt-1" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                  {selectedVerb.kanji}
                </h4>
                <p className="text-xs text-white/80 font-bold">({selectedVerb.hiragana})</p>
                <div className="h-0.5 w-10 bg-white/40 mx-auto my-1.5"></div>
                <p className="text-xs italic text-amber-200 font-bold">Nhóm {selectedVerb.group} • {selectedVerb.meaning}</p>
              </div>
            </div>

            {/* Branches representation: 5 columns + Te/Ta */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5 relative z-10 min-w-[900px]">
              
              {/* Column A */}
              <div className="p-4 bg-emerald-50/50 border-2 border-dashed border-emerald-400 rounded-2xl space-y-3">
                <div className="text-center bg-emerald-600 text-white py-1 rounded-lg font-black text-xs uppercase">
                  {mindmap.a.vowel}
                </div>
                <div className="space-y-2">
                  {mindmap.a.forms.map((f) => (
                    <div key={f.name} className="bg-white p-2.5 rounded-xl border border-emerald-100 shadow-sm">
                      <span className="text-[9px] text-gray-400 font-black block uppercase">{f.name}</span>
                      <span className="text-sm font-black text-[#1A1A1A]">{f.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column I */}
              <div className="p-4 bg-sky-50/50 border-2 border-dashed border-sky-400 rounded-2xl space-y-3">
                <div className="text-center bg-sky-600 text-white py-1 rounded-lg font-black text-xs uppercase">
                  {mindmap.i.vowel}
                </div>
                <div className="space-y-2">
                  {mindmap.i.forms.map((f) => (
                    <div key={f.name} className="bg-white p-2.5 rounded-xl border border-sky-100 shadow-sm">
                      <span className="text-[9px] text-gray-400 font-black block uppercase">{f.name}</span>
                      <span className="text-sm font-black text-[#1A1A1A]">{f.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column U */}
              <div className="p-4 bg-indigo-50/50 border-2 border-dashed border-indigo-400 rounded-2xl space-y-3">
                <div className="text-center bg-indigo-600 text-white py-1 rounded-lg font-black text-xs uppercase">
                  {mindmap.u.vowel}
                </div>
                <div className="space-y-2">
                  {mindmap.u.forms.map((f) => (
                    <div key={f.name} className="bg-white p-2.5 rounded-xl border border-indigo-100 shadow-sm">
                      <span className="text-[9px] text-gray-400 font-black block uppercase">{f.name}</span>
                      <span className="text-sm font-black text-[#1A1A1A]">{f.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column E */}
              <div className="p-4 bg-purple-50/50 border-2 border-dashed border-purple-400 rounded-2xl space-y-3">
                <div className="text-center bg-purple-600 text-white py-1 rounded-lg font-black text-xs uppercase">
                  {mindmap.e.vowel}
                </div>
                <div className="space-y-2">
                  {mindmap.e.forms.map((f) => (
                    <div key={f.name} className="bg-white p-2.5 rounded-xl border border-purple-100 shadow-sm">
                      <span className="text-[9px] text-gray-400 font-black block uppercase">{f.name}</span>
                      <span className="text-sm font-black text-[#1A1A1A]">{f.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column O */}
              <div className="p-4 bg-pink-50/50 border-2 border-dashed border-pink-400 rounded-2xl space-y-3">
                <div className="text-center bg-pink-600 text-white py-1 rounded-lg font-black text-xs uppercase">
                  {mindmap.o.vowel}
                </div>
                <div className="space-y-2">
                  {mindmap.o.forms.map((f) => (
                    <div key={f.name} className="bg-white p-2.5 rounded-xl border border-pink-100 shadow-sm">
                      <span className="text-[9px] text-gray-400 font-black block uppercase">{f.name}</span>
                      <span className="text-sm font-black text-[#1A1A1A]">{f.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nhánh Te / Ta */}
              <div className="p-4 bg-amber-50/50 border-2 border-dashed border-amber-400 rounded-2xl space-y-3">
                <div className="text-center bg-amber-600 text-white py-1 rounded-lg font-black text-xs uppercase">
                  {mindmap.t.vowel}
                </div>
                <div className="space-y-2">
                  {mindmap.t.forms.map((f) => (
                    <div key={f.name} className="bg-white p-2.5 rounded-xl border border-amber-100 shadow-sm">
                      <span className="text-[9px] text-gray-400 font-black block uppercase">{f.name}</span>
                      <span className="text-sm font-black text-[#1A1A1A]">{f.value}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Decorative footer line */}
      <div className="mt-12 text-center text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-widest border-t border-gray-200 pt-5">
        Lớp học Thầy Sơn • Không ngừng tôi luyện bản thân
      </div>

    </div>
  );
}
