import { notFound } from 'next/navigation';
import { quizApi } from '@/lib/api';
import QuizInterface from '@/components/QuizInterface';

interface QuizPageProps {
  params: Promise<{ id: string }>;
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { id } = await params;
  const quizId = parseInt(id, 10);

  if (isNaN(quizId)) {
    notFound();
  }

  let quiz;
  try {
    quiz = await quizApi.getQuizById(quizId);
  } catch (error) {
    console.error('Error fetching quiz:', error);
    notFound();
  }

  return <QuizInterface quiz={quiz} />;
}
