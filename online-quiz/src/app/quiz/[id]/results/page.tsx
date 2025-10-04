'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { quizApi } from '@/lib/api';
import { QuizDto, UserAnswer } from '@/types/quiz';

interface StoredResults {
  quizId: number;
  quizTitle: string;
  userAnswers: UserAnswer[];
  timeTaken: number;
}

export default function ResultsPage() {
  const router = useRouter();
  const params = useParams();
  const quizId = parseInt(params.id as string, 10);

  const [quiz, setQuiz] = useState<QuizDto | null>(null);
  const [results, setResults] = useState<StoredResults | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadResults = async () => {
      try {
        // Get stored results from sessionStorage
        const storedData = sessionStorage.getItem('quizResults');
        if (!storedData) {
          setError('No quiz results found. Please take the quiz first.');
          setLoading(false);
          return;
        }

        const parsedResults: StoredResults = JSON.parse(storedData);
        
        if (parsedResults.quizId !== quizId) {
          setError('Quiz ID mismatch. Please take the quiz again.');
          setLoading(false);
          return;
        }

        setResults(parsedResults);

        // Fetch quiz with correct answers
        const quizWithAnswers = await quizApi.getQuizWithAnswers(quizId);
        setQuiz(quizWithAnswers);
        setLoading(false);
      } catch (err) {
        console.error('Error loading results:', err);
        setError(err instanceof Error ? err.message : 'Failed to load results');
        setLoading(false);
      }
    };

    loadResults();
  }, [quizId]);

  const calculateScore = () => {
    if (!quiz || !results) return { correct: 0, total: 0, percentage: 0 };

    let correctCount = 0;
    const total = quiz.questions.length;

    quiz.questions.forEach((question) => {
      const userAnswer = results.userAnswers.find(
        (a) => a.questionId === question.id
      );
      if (!userAnswer) return;

      const correctOption = question.options.find((opt) => opt.isCorrect);
      if (correctOption && userAnswer.selectedOptionId === correctOption.id) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / total) * 100);
    return { correct: correctCount, total, percentage };
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600 dark:text-green-400';
    if (percentage >= 60) return 'text-blue-600 dark:text-blue-400';
    if (percentage >= 40) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreEmoji = (percentage: number) => {
    if (percentage >= 80) return '🎉';
    if (percentage >= 60) return '👍';
    if (percentage >= 40) return '😊';
    return '📚';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Calculating your score...</p>
        </div>
      </div>
    );
  }

  if (error || !quiz || !results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-gray-200 dark:border-gray-700">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Error Loading Results
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error || 'Unable to load quiz results'}
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const score = calculateScore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Quiz Results
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Score Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-8">
            <div className="text-7xl mb-4">{getScoreEmoji(score.percentage)}</div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {results.quizTitle}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Quiz Completed!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 text-center border border-blue-200 dark:border-blue-800">
              <div className={`text-5xl font-bold mb-2 ${getScoreColor(score.percentage)}`}>
                {score.percentage}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Your Score
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 text-center border border-green-200 dark:border-green-800">
              <div className="text-5xl font-bold text-green-600 dark:text-green-400 mb-2">
                {score.correct}/{score.total}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Correct Answers
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 text-center border border-purple-200 dark:border-purple-800">
              <div className="text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                ⏱️
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Time Taken
              </div>
              <div className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                {formatTime(results.timeTaken)}
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Link
              href={`/quiz/${quizId}`}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              Retake Quiz
            </Link>
            <Link
              href="/"
              className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Detailed Results
          </h3>

          <div className="space-y-6">
            {quiz.questions.map((question, index) => {
              const userAnswer = results.userAnswers.find(
                (a) => a.questionId === question.id
              );
              const correctOption = question.options.find((opt) => opt.isCorrect);
              const selectedOption = question.options.find(
                (opt) => opt.id === userAnswer?.selectedOptionId
              );
              const isCorrect = userAnswer?.selectedOptionId === correctOption?.id;

              return (
                <div
                  key={question.id}
                  className={`p-6 rounded-xl border-2 ${
                    isCorrect
                      ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/10'
                      : 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/10'
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <span
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        isCorrect
                          ? 'bg-green-600 text-white'
                          : 'bg-red-600 text-white'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        {question.questionText}
                      </h4>

                      <div className="space-y-2">
                        {question.options.map((option) => {
                          const isSelected = option.id === userAnswer?.selectedOptionId;
                          const isCorrectOption = option.isCorrect;

                          return (
                            <div
                              key={option.id}
                              className={`p-3 rounded-lg border ${
                                isCorrectOption
                                  ? 'border-green-500 bg-green-100 dark:bg-green-900/20'
                                  : isSelected
                                  ? 'border-red-500 bg-red-100 dark:bg-red-900/20'
                                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                {isCorrectOption && (
                                  <span className="text-green-600 dark:text-green-400 font-bold">
                                    ✓
                                  </span>
                                )}
                                {isSelected && !isCorrectOption && (
                                  <span className="text-red-600 dark:text-red-400 font-bold">
                                    ✗
                                  </span>
                                )}
                                <span
                                  className={`${
                                    isCorrectOption || isSelected
                                      ? 'font-semibold text-gray-900 dark:text-white'
                                      : 'text-gray-600 dark:text-gray-400'
                                  }`}
                                >
                                  {option.optionText}
                                </span>
                                {isCorrectOption && (
                                  <span className="ml-auto text-xs font-semibold text-green-600 dark:text-green-400">
                                    Correct Answer
                                  </span>
                                )}
                                {isSelected && !isCorrectOption && (
                                  <span className="ml-auto text-xs font-semibold text-red-600 dark:text-red-400">
                                    Your Answer
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
