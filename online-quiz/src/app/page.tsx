import Link from 'next/link';
import { quizApi } from '@/lib/api';
import { QuizDto } from '@/types/quiz';

export default async function Home() {
  let quizzes: QuizDto[] = [];
  let error: string | null = null;

  try {
    quizzes = await quizApi.getAllQuizzes();
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load quizzes';
    console.error('Error fetching quizzes:', err);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            🎯 Online Quiz Application
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Test your knowledge with our interactive quizzes
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
            <div className="text-5xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">
              Unable to Load Quizzes
            </h2>
            <p className="text-red-600 dark:text-red-300 mb-4">{error}</p>
            <p className="text-sm text-red-500 dark:text-red-400">
              Make sure the Quiz API is running at http://localhost:5079
            </p>
          </div>
        ) : quizzes.length === 0 ? (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 text-center">
            <div className="text-5xl mb-4">📝</div>
            <h2 className="text-xl font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
              No Quizzes Available
            </h2>
            <p className="text-yellow-600 dark:text-yellow-300">
              Check back later for new quizzes!
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Available Quizzes
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Choose a quiz to get started
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.map((quiz) => (
                <Link
                  key={quiz.id}
                  href={`/quiz/${quiz.id}`}
                  className="group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:-translate-y-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">📚</div>
                      <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold px-3 py-1 rounded-full">
                        {quiz.questions.length} Questions
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {quiz.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {quiz.description || 'Test your knowledge with this quiz'}
                    </p>
                    
                    <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm">
                      Start Quiz
                      <svg
                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
            Powered by Next.js & ASP.NET Core Quiz API
          </p>
        </div>
      </footer>
    </div>
  );
}
