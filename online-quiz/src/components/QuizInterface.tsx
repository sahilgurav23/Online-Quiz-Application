'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { QuizDto, UserAnswer } from '@/types/quiz';
import ThemeToggle from './ThemeToggle';

interface QuizInterfaceProps {
  quiz: QuizDto;
}

export default function QuizInterface({ quiz }: QuizInterfaceProps) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  // Timer effect
  useEffect(() => {
    if (!isStarted) return;

    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isStarted]);

  // Check if current question has been answered
  useEffect(() => {
    const existingAnswer = userAnswers.find(
      (answer) => answer.questionId === currentQuestion.id
    );
    setSelectedOption(existingAnswer?.selectedOptionId || null);
  }, [currentQuestionIndex, userAnswers, currentQuestion.id]);

  const handleStartQuiz = () => {
    setIsStarted(true);
  };

  const handleOptionSelect = (optionId: number) => {
    setSelectedOption(optionId);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    // Save answer
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedOptionId: selectedOption,
    };

    setUserAnswers((prev) => {
      const filtered = prev.filter((a) => a.questionId !== currentQuestion.id);
      return [...filtered, newAnswer];
    });

    if (isLastQuestion) {
      // Submit quiz
      handleSubmit([...userAnswers.filter((a) => a.questionId !== currentQuestion.id), newAnswer]);
    } else {
      // Move to next question
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = (finalAnswers: UserAnswer[]) => {
    // Store results in sessionStorage and navigate to results page
    const resultsData = {
      quizId: quiz.id,
      quizTitle: quiz.title,
      userAnswers: finalAnswers,
      timeTaken: timeElapsed,
    };
    sessionStorage.setItem('quizResults', JSON.stringify(resultsData));
    router.push(`/quiz/${quiz.id}/results`);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <div className="fixed top-6 right-6 z-50">
          <ThemeToggle />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-2xl w-full border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-6xl mb-6">🎯</div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {quiz.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {quiz.description || 'Test your knowledge with this quiz'}
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-8">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {quiz.questions.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Questions
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    ⏱️
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Timed
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleStartQuiz}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200 shadow-lg hover:shadow-2xl transform hover:scale-105"
            >
              Start Quiz 🚀
            </button>

            <button
              onClick={() => router.push('/')}
              className="mt-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white block mx-auto transition-colors"
            >
              ← Back to Quizzes
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header with Timer */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {quiz.title}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-lg font-mono font-semibold">
                ⏱️ {formatTime(timeElapsed)}
              </div>
              <ThemeToggle />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-600 h-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      {/* Question Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          {/* Question */}
          <div className="mb-8">
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                {currentQuestionIndex + 1}
              </span>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white pt-1">
                {currentQuestion.questionText}
              </h2>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-4 mb-8">
            {currentQuestion.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 ${
                  selectedOption === option.id
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 shadow-md'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 bg-white dark:bg-gray-800'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      selectedOption === option.id
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    {selectedOption === option.id && (
                      <div className="w-3 h-3 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {option.optionText}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-3 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ← Previous
            </button>

            <div className="text-sm text-gray-600 dark:text-gray-400">
              {userAnswers.length} of {quiz.questions.length} answered
            </div>

            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg"
            >
              {isLastQuestion ? 'Submit Quiz' : 'Next →'}
            </button>
          </div>
        </div>

        {/* Question Navigator */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Question Navigator
          </h3>
          <div className="flex flex-wrap gap-2">
            {quiz.questions.map((question, index) => {
              const isAnswered = userAnswers.some((a) => a.questionId === question.id);
              const isCurrent = index === currentQuestionIndex;

              return (
                <button
                  key={question.id}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all ${
                    isCurrent
                      ? 'bg-blue-600 text-white shadow-md'
                      : isAnswered
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
