export interface Vocabulary {
  id: string;
  word: string;       // Kanji or Kana
  reading: string;    // Furigana/Hiragana
  romaji: string;     // Romanized spelling
  meaning: string;    // Vietnamese translation
  example: string;    // Example Japanese sentence
  exampleMeaning: string; // Example Vietnamese translation
  level: "N5" | "N4" | "N3" | "Anime" | "Travel";
  category: string;   // e.g. "Chào hỏi", "Gia đình", "Ăn uống", "Anime"
}

export interface UserProgress {
  streak: number;
  xp: number;
  learnedWordIds: string[];
  favoriteWordIds: string[];
  quizHighScore: number;
  selectedAvatarId: string;
  userName: string;
  lastActiveDate: string; // YYYY-MM-DD
  customAvatarUrl?: string;
}

export interface QuizQuestion {
  id: string;
  type: "kanji-to-meaning" | "kana-to-kanji" | "meaning-to-word";
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  wordId?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface AvatarOption {
  id: string;
  name: string;
  emoji: string;
  color: string;
  borderColor: string;
  description: string;
}
