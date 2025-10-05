import { quizApi } from '@/lib/api';
import { QuizDto } from '@/types/quiz';
import HomeContent from '@/components/HomeContent';

export default async function Home() {
  let quizzes: QuizDto[] = [];
  let error: string | null = null;

  try {
    quizzes = await quizApi.getAllQuizzes();
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load quizzes';
    console.error('Error fetching quizzes:', err);
  }

  return <HomeContent quizzes={quizzes} error={error} />;
}
