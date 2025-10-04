# 🎯 Online Quiz Application

A modern, full-stack quiz application with a **Next.js 15** frontend and **ASP.NET Core 8.0** backend API.

## 🌟 Features

### Frontend (Next.js)
- ✅ **Modern UI** - Beautiful, responsive design with TailwindCSS
- ✅ **Interactive Quiz Interface** - Smooth question navigation with progress tracking
- ✅ **Timer** - Track time spent on each quiz
- ✅ **Question Navigator** - Jump to any question instantly
- ✅ **Detailed Results** - View correct/incorrect answers with explanations
- ✅ **Dark Mode Support** - Automatic theme switching
- ✅ **TypeScript** - Full type safety throughout the application

### Backend (ASP.NET Core)
- ✅ **RESTful API** - 3 simple GET endpoints
- ✅ **SQLite Database** - Lightweight, auto-created database
- ✅ **Sample Data** - Pre-loaded with 3 quizzes
- ✅ **Swagger UI** - Interactive API documentation
- ✅ **Secure Design** - Correct answers hidden by default

## 📁 Project Structure

```
Online-Quiz-Application/
├── online-quiz/                    # Next.js Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx           # Quiz listing page
│   │   │   ├── quiz/[id]/
│   │   │   │   ├── page.tsx       # Quiz taking page
│   │   │   │   └── results/
│   │   │   │       └── page.tsx   # Results page
│   │   │   ├── layout.tsx
│   │   │   └── globals.css
│   │   ├── components/
│   │   │   └── QuizInterface.tsx  # Main quiz component
│   │   ├── lib/
│   │   │   └── api.ts             # API client
│   │   └── types/
│   │       └── quiz.ts            # TypeScript types
│   └── package.json
└── Quiz Api/                       # ASP.NET Core Backend (Your existing API)
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ (for Next.js frontend)
- **.NET 8.0 SDK** (for ASP.NET Core backend)

### 1. Start the Backend API

```bash
cd "Quiz Api"
dotnet restore
dotnet run
```

The API will be available at: **http://localhost:5079**
- Swagger UI: http://localhost:5079/swagger

### 2. Start the Frontend

```bash
cd online-quiz
npm install
npm run dev
```

The frontend will be available at: **http://localhost:3000**

## 🎮 How to Use

1. **Browse Quizzes** - View all available quizzes on the home page
2. **Start a Quiz** - Click on any quiz card to begin
3. **Answer Questions** - Select your answers and navigate between questions
4. **Submit** - Complete all questions and submit your quiz
5. **View Results** - See your score, time taken, and detailed answer breakdown

## 🔌 API Endpoints

The frontend consumes these 3 API endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/quizzes` | GET | Fetch all quizzes (without answers) |
| `/api/quizzes/{id}` | GET | Fetch specific quiz (without answers) |
| `/api/quizzes/{id}/answers` | GET | Fetch quiz with correct answers |

## 🎨 UI Features

### Quiz Listing Page
- Grid layout with quiz cards
- Shows question count for each quiz
- Hover effects and smooth transitions
- Error handling for API failures

### Quiz Taking Interface
- **Progress Bar** - Visual progress indicator
- **Timer** - Real-time elapsed time tracking
- **Question Navigator** - Visual grid showing answered/unanswered questions
- **Previous/Next Navigation** - Easy question navigation
- **Answer Selection** - Clear visual feedback for selected options

### Results Page
- **Score Card** - Large percentage display with emoji feedback
- **Statistics** - Correct answers count and time taken
- **Detailed Review** - Question-by-question breakdown
- **Visual Indicators** - Green for correct, red for incorrect
- **Retake Option** - Quick access to retake the quiz

## 🛠️ Technologies Used

### Frontend
- **Next.js 15.5.4** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript 5** - Type safety
- **TailwindCSS 4** - Utility-first CSS framework
- **Geist Font** - Modern typography

### Backend
- **ASP.NET Core 8.0** - Web framework
- **Entity Framework Core 8.0** - ORM
- **SQLite** - Lightweight database
- **Swagger/OpenAPI** - API documentation

## 📝 Configuration

### API URL and Authentication

The frontend is configured to connect to the backend API at `http://localhost:5079/api` by default with API key authentication.

To customize, create a `.env.local` file in the `online-quiz` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5079/api
NEXT_PUBLIC_API_KEY=YRwMhWyVsN4cx8CF0CyEfetDrQ2Ag0xuumo4RaOoEiI=
```

**Important**: The API key must match the backend's `appsettings.json` configuration.

See `online-quiz/SECURITY.md` for detailed security configuration.

## 🎯 Sample Quizzes

The API comes pre-loaded with 3 sample quizzes:

1. **General Knowledge Quiz** (3 questions)
   - Geography, Science, Nature

2. **Programming Basics** (2 questions)
   - HTML, JavaScript

3. **Math Quiz** (3 questions)
   - Basic arithmetic operations

## 🔒 Security Notes

- **API Key Authentication**: All API endpoints are protected with API key authentication (`X-API-Key` header)
- **Default API Key**: `YRwMhWyVsN4cx8CF0CyEfetDrQ2Ag0xuumo4RaOoEiI=` (change for production)
- **Frontend Security**: API key is visible in browser (acceptable for development/internal apps)
- **Production**: Consider server-side API calls or user authentication for sensitive data
- **CORS**: Configured for development, update for production deployment
- **Session Storage**: Used for quiz results (client-side only)

See `online-quiz/SECURITY.md` for detailed security configuration.

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd online-quiz
npm run build
# Deploy to Vercel or your preferred hosting
```

### Backend (Azure/IIS)
```bash
cd "Quiz Api"
dotnet publish -c Release
# Deploy to Azure App Service or IIS
```

## 📚 Next Steps

- [ ] Add user authentication
- [ ] Implement quiz categories
- [ ] Add leaderboard functionality
- [ ] Support multiple quiz attempts
- [ ] Add quiz creation interface
- [ ] Implement quiz sharing
- [ ] Add social media integration

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

**Built with ❤️ using Next.js and ASP.NET Core**