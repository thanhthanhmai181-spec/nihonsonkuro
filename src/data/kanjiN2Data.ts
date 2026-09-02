import { LessonItem } from "./kanjiN2/types";
import { KANJI_N2_DATA_PART1 } from "./kanjiN2/kanjiN2Part1";
import { KANJI_N2_DATA_PART2 } from "./kanjiN2/kanjiN2Part2";
import { KANJI_N2_DATA_PART3 } from "./kanjiN2/kanjiN2Part3";

export * from "./kanjiN2/types";

export const KANJI_N2_LESSONS: LessonItem[] = [
  ...KANJI_N2_DATA_PART1,
  ...KANJI_N2_DATA_PART2,
  ...KANJI_N2_DATA_PART3,
];
