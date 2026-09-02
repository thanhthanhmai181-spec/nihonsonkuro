export interface TranslationSentence {
  id: number;
  lessonId: number;
  sentenceIndex: number;
  vietnamese: string;
  japanese: string;
  furigana?: string;
  romaji?: string;
  grammarFocus?: string;
  notes?: string;
}

export interface TranslationLesson {
  lessonId: number;
  title: string;
  topicName: string;
  grammarPatterns: string[];
  description: string;
  sentences: TranslationSentence[];
}
