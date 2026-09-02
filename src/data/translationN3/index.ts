import { TranslationLesson, TranslationSentence } from "./types";
import { TRANSLATION_N3_LESSONS_1_TO_6 } from "./lessons1to6";
import { TRANSLATION_N3_LESSONS_7_TO_12 } from "./lessons7to12";
import { TRANSLATION_N3_LESSONS_13_TO_17 } from "./lessons13to17";
import { TRANSLATION_N3_LESSONS_18_TO_22 } from "./lessons18to22";

export * from "./types";
export * from "./furiganaHelper";

export const TRANSLATION_N3_DATA: TranslationLesson[] = [
  ...TRANSLATION_N3_LESSONS_1_TO_6,
  ...TRANSLATION_N3_LESSONS_7_TO_12,
  ...TRANSLATION_N3_LESSONS_13_TO_17,
  ...TRANSLATION_N3_LESSONS_18_TO_22
];

export const ALL_TRANSLATION_N3_SENTENCES: TranslationSentence[] = TRANSLATION_N3_DATA.flatMap(
  (lesson) => lesson.sentences
);
