import { LessonItem, KanjiItem, VocabularyItem, KANJI_N3_DATA_PART1 } from "./kanjiN3DataPart1";
import { KANJI_N3_DATA_PART2 } from "./kanjiN3DataPart2";
import { KANJI_N3_DATA_PART3 } from "./kanjiN3DataPart3";

export type { LessonItem, KanjiItem, VocabularyItem };

export const KANJI_N3_DATA: LessonItem[] = [
  ...KANJI_N3_DATA_PART1,
  ...KANJI_N3_DATA_PART2,
  ...KANJI_N3_DATA_PART3
];
