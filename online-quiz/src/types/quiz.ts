// API Response Types matching the Quiz API DTOs

export interface OptionDto {
  id: number;
  questionId: number;
  optionText: string;
  isCorrect: boolean;
}

export interface QuestionDto {
  id: number;
  quizId: number;
  questionText: string;
  options: OptionDto[];
}

export interface QuizDto {
  id: number;
  title: string;
  description: string;
  questions: QuestionDto[];
}

// Frontend-specific types for quiz taking

export interface UserAnswer {
  questionId: number;
  selectedOptionId: number;
}

export interface QuizResult {
  quizId: number;
  quizTitle: string;
  totalQuestions: number;
  correctAnswers: number;
  score: number; // percentage
  userAnswers: UserAnswer[];
  timeTaken?: number; // in seconds
}
