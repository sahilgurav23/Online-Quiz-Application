'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import { QuizDto, UserAnswer } from '@/types/quiz';
import ThemeToggle from './ThemeToggle';

// Fisher–Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

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
  // Anti-screenshot states
  const [isObscured, setIsObscured] = useState(false);
  const [showShotWarning, setShowShotWarning] = useState(false);
  const [violations, setViolations] = useState(0);
  const violationLockRef = useRef(false);
  const [autoSubmitting, setAutoSubmitting] = useState(false);

  // Shuffled questions for this session (options also shuffled)
  const [shuffledQuestions, setShuffledQuestions] = useState(quiz.questions);

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === shuffledQuestions.length - 1;
  const progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;
  
  // 5 minutes in seconds
  const TIME_LIMIT = 60;
  const MAX_VIOLATIONS = 2; // number of allowed focus losses before auto-submit
  const timeRemaining = TIME_LIMIT - timeElapsed;
  const isTimeUp = timeRemaining <= 0;

  // Timer effect with auto-submit
  useEffect(() => {
    if (!isStarted) return;

    const timer = setInterval(() => {
      setTimeElapsed((prev) => {
        const newTime = prev + 1;
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isStarted]);

  // Prepare shuffled questions when quiz loads
  useEffect(() => {
    const shuffled = shuffleArray(quiz.questions).map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));
    setShuffledQuestions(shuffled);
    setCurrentQuestionIndex(0);
  }, [quiz.id]);

  // Separate effect to handle auto-submit when time is up
  useEffect(() => {
    if (isStarted && timeElapsed >= TIME_LIMIT) {
      // Store results and navigate
      const resultsData = {
        quizId: quiz.id,
        quizTitle: quiz.title,
        userAnswers: userAnswers,
        timeTaken: TIME_LIMIT,
      };
      sessionStorage.setItem('quizResults', JSON.stringify(resultsData));
      router.push(`/quiz/${quiz.id}/results`);
    }
  }, [timeElapsed, isStarted, TIME_LIMIT, userAnswers, quiz.id, quiz.title, router]);

  // Register a single violation per focus-loss burst (debounced)
  const registerViolation = useCallback(() => {
    if (!isStarted) return;
    if (violationLockRef.current) return;
    setViolations((v) => v + 1);
    violationLockRef.current = true;
    // Unlock after short delay to avoid double counting from blur + visibilitychange
    setTimeout(() => {
      violationLockRef.current = false;
    }, 1200);
  }, [isStarted]);

  // Anti-screenshot: blur content when tab/window loses focus and count violations (debounced)
  useEffect(() => {
    if (!isStarted) return;

    const onVisibility = () => {
      const hidden = document.hidden;
      setIsObscured(hidden);
      if (hidden) registerViolation();
    };
    const onBlur = () => {
      setIsObscured(true);
      registerViolation();
    };
    const onFocus = () => setIsObscured(false);

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('blur', onBlur);
    window.addEventListener('focus', onFocus);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('focus', onFocus);
    };
  }, [isStarted, registerViolation]);

  // Auto-submit immediately when max attempts are reached
  useEffect(() => {
    if (!isStarted) return;
    if (violations >= MAX_VIOLATIONS && !autoSubmitting) {
      setAutoSubmitting(true);
      const resultsData = {
        quizId: quiz.id,
        quizTitle: quiz.title,
        userAnswers: userAnswers,
        timeTaken: timeElapsed,
      };
      sessionStorage.setItem('quizResults', JSON.stringify(resultsData));
      router.push(`/quiz/${quiz.id}/results`);
    }
  }, [violations, isStarted, autoSubmitting, quiz.id, quiz.title, router, userAnswers, timeElapsed]);

  // Anti-screenshot: attempt to block PrintScreen by clearing clipboard and show warning
  useEffect(() => {
    const onKeyDown = async (e: KeyboardEvent) => {
      const isPrintScreen = e.key === 'PrintScreen' || e.key === 'Snapshot';
      if (isPrintScreen) {
        e.preventDefault();
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText('');
          }
        } catch (_) {
          // ignore
        }
        setShowShotWarning(true);
        setTimeout(() => setShowShotWarning(false), 2000);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Check if current question has been answered
  useEffect(() => {
    const existingAnswer = userAnswers.find(
      (answer) => answer.questionId === currentQuestion.id
    );
    setSelectedOption(existingAnswer?.selectedOptionId || null);
  }, [currentQuestionIndex, userAnswers, currentQuestion.id]);

  const handleStartQuiz = async () => {
    setIsStarted(true);
    // Try entering fullscreen for stricter focus
    try {
      const el: any = document.documentElement as any;
      if (el.requestFullscreen) await el.requestFullscreen();
      else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
      else if (el.msRequestFullscreen) await el.msRequestFullscreen();
    } catch (_) {
      // Ignore if user blocks fullscreen
    }
  };

  // Prevent copy shortcuts (Ctrl+C, Ctrl+A, etc.)
  const handleKeyDown = (e: ReactKeyboardEvent) => {
    // Block copy, cut, select all
    if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'a' || e.key === 'x' || e.key === 'C' || e.key === 'A' || e.key === 'X')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    // Block F12 and Ctrl+Shift+I (DevTools)
    if (e.key === 'F12' || ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  };

  const handleOptionSelect = (optionId: number) => {
    setSelectedOption(optionId);
    
    // Save answer immediately when option is selected
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedOptionId: optionId,
    };

    setUserAnswers((prev) => {
      // Remove any existing answer for this question
      const filtered = prev.filter((a) => a.questionId !== currentQuestion.id);
      // Add the new answer
      return [...filtered, newAnswer];
    });
  };

  const handleNext = () => {
    // Check if this is the last question and submit
    if (isLastQuestion) {
      handleSubmit(userAnswers);
      return;
    }

    // Move to next question
    setCurrentQuestionIndex((prev) => prev + 1);
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

  const getTimerColor = () => {
    if (timeRemaining <= 60) return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
    if (timeRemaining <= 180) return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
    return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
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
                    1:00
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Time Limit
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
                Question {currentQuestionIndex + 1} of {shuffledQuestions.length}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className={`${getTimerColor()} px-4 py-2 rounded-lg font-mono font-semibold transition-colors`}>
                ⏱️ {formatTime(timeRemaining)}
                <span className="text-xs ml-2">remaining</span>
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

      {/* Anti-screenshot overlays */}
      {isObscured && (
        <div className="focus-overlay">
          {autoSubmitting || violations >= MAX_VIOLATIONS
            ? 'Max attempts reached. Submitting your quiz...'
            : 'You left the quiz window. Please return to continue.'}
          {!autoSubmitting && violations < MAX_VIOLATIONS && (
            <div className="mt-2 text-sm opacity-90">
              Attempt {Math.min(violations, MAX_VIOLATIONS)} of {MAX_VIOLATIONS}
            </div>
          )}
        </div>
      )}
      {showShotWarning && !isObscured && (
        <div className="focus-overlay">Screenshots are not allowed</div>
      )}

      {/* Question Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div
          className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 no-copy ${isObscured ? 'exam-blur' : ''}`}
          onContextMenu={(e) => e.preventDefault()}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
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
              {userAnswers.length} of {shuffledQuestions.length} answered
            </div>

            <button
              onClick={handleNext}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
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
            {shuffledQuestions.map((question, index) => {
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
