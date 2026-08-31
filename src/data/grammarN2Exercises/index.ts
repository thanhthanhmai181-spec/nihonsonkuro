import { GrammarN2ExerciseQuestion, LessonExerciseSummary } from "./types";
import { EXERCISES_LESSON_1_5 } from "./lesson1_5";
import { EXERCISES_LESSON_6_10 } from "./lesson6_10";
import { EXERCISES_LESSON_11_15 } from "./lesson11_15";
import { EXERCISES_LESSON_16_20 } from "./lesson16_20";
import { EXERCISES_LESSON_21_26 } from "./lesson21_26";

export * from "./types";

export const ALL_GRAMMAR_N2_EXERCISES: GrammarN2ExerciseQuestion[] = [
  ...EXERCISES_LESSON_1_5,
  ...EXERCISES_LESSON_6_10,
  ...EXERCISES_LESSON_11_15,
  ...EXERCISES_LESSON_16_20,
  ...EXERCISES_LESSON_21_26,
];

export const LESSON_TITLES_MAP: Record<number, string> = {
  1: "Bài 1: 〜際・〜際（に）・〜に際して・〜にあたって",
  2: "Bài 2: 〜たとたん（に）・〜（か）と思うと・〜か〜ないかのうちに",
  3: "Bài 3: 〜最中だ・〜うちに・〜ばかりだ・〜一方だ",
  4: "Bài 4: 〜（よ）うとしている・〜つつある・〜つつ・〜てはじめて",
  5: "Bài 5: 〜上（で）・〜次第・〜以来・〜をはじめ（として）",
  6: "Bài 6: 〜だけではなく・それに加えて（〜に限らず・〜のみならず・〜ばかりか...）",
  7: "Bài 7: 〜について・〜を相手にして（〜に関して・〜をめぐって・〜にかけては...）",
  8: "Bài 8: 〜を基準にして（〜をもとに・〜に基づいて・〜に沿って・〜のもとで...）",
  9: "Bài 9: 〜に関連して・〜に対応して（〜につれて・〜にしたがって・〜次第で...）",
  10: "Bài 10: 〜や〜など（〜やら〜やら・〜というか〜というか・〜にしろ〜にしろ...）",
  11: "Bài 11: 〜に限定する・〜だけでなくすべて（〜に限り・〜に限って・〜限り...）",
  12: "Bài 12: 目的・理由・原因（〜ために・〜ように・〜おかげで・〜せいで・〜からには...）",
  13: "Bài 13: 条件・仮定・逆接（〜さえ〜ば・〜たとえ〜ても・〜わりに・〜くせに...）",
  14: "Bài 14: 程度・比較・強調（〜くらい・〜ほど・〜ば〜ほど・〜に限る・〜反面...）",
  15: "Bài 15: 進行・変化・状態の継続（〜一方だ・〜つつある・〜っぱなし・〜きり・〜がち...）",
  16: "Bài 16: 様子・状態・傾向（〜だらけ・〜まみれ・〜ずくめ・〜めく・〜にたえない...）",
  17: "Bài 17: 判断の立場・評価の視点（〜から見ると・〜から言うと・〜からして...）",
  18: "Bài 18: 感情・感覚の表出（〜たまらない・〜てならない・〜ざるを得ない...）",
  19: "Bài 19: 強調・限定・極端な例（〜さえ・〜こそ・〜すら・〜どころか・〜ばかりに...）",
  20: "Bài 20: 視点の転換・話題の導入（〜といえば・〜というと・〜といったら...）",
  21: "Bài 21: 関連・対応・関係の有無（〜にかかわらず・〜にもかかわらず・〜を問わず・〜ぬきで...）",
  22: "Bài 22: 義務・当然・助言・勧告（〜べきだ・〜ことだ・〜ものだ・〜ものではない...）",
  23: "Bài 23: 可能性・推量・判断（〜に違いない・〜に相違ない・〜っこない・〜かねない...）",
  24: "Bài 24: 伝聞・伝達・引用（〜とのことだ・〜ということだ・〜とか・〜って...）",
  25: "Bài 25: 敬語・待遇表現（お／ご〜になる・お／ご〜する・〜ていただく・〜てくださる...）",
  26: "Bài 26: 複合格助詞・複合接続助詞の総まとめ（Tổng kết toàn diện 26 bài ngữ pháp N2）",
};

export const LESSONS_EXERCISES_SUMMARY: LessonExerciseSummary[] = Array.from({ length: 26 }, (_, i) => {
  const lessonId = i + 1;
  const questions = ALL_GRAMMAR_N2_EXERCISES.filter((q) => q.lessonId === lessonId);
  return {
    lessonId,
    lessonTitle: LESSON_TITLES_MAP[lessonId] || `Bài ${lessonId}`,
    questionCount: questions.length,
  };
});

export const getExercisesByLesson = (lessonId: number | "all"): GrammarN2ExerciseQuestion[] => {
  if (lessonId === "all") {
    return ALL_GRAMMAR_N2_EXERCISES;
  }
  return ALL_GRAMMAR_N2_EXERCISES.filter((q) => q.lessonId === lessonId);
};
