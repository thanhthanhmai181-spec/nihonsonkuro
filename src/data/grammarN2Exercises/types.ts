export interface GrammarN2ExerciseQuestion {
  id: string; // e.g. "b1-q1"
  lessonId: number; // 1 to 26
  lessonTitle: string; // "Bài 1: 〜とき・〜直後に"
  questionNum: number; // 1, 2, ...
  grammarTarget: string; // e.g. "〜際（に）"
  question: string;
  options: [string, string, string]; // 3 options: a, b, c
  correctIndex: 0 | 1 | 2; // 0 for a, 1 for b, 2 for c
  correctLetter: "a" | "b" | "c";
  explanation: string;
}

export interface LessonExerciseSummary {
  lessonId: number;
  lessonTitle: string;
  questionCount: number;
  grammarFocus?: string[];
  title?: string;
  topicName?: string;
  totalQuestions?: number;
}
