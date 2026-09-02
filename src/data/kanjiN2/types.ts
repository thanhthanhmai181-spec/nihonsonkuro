export interface VocabularyItem {
  word: string;
  reading: string;
  meaning: string;
}

export interface KanjiItem {
  character: string;
  sino_vietnamese: string;
  meaning: string;
  kunyomi?: string;
  onyomi?: string;
  kun_examples?: string[];
  on_examples?: string[];
  vocabularies: VocabularyItem[];
}

export interface LessonItem {
  id: number;
  title: string;
  description?: string;
  kanjis: KanjiItem[];
}
