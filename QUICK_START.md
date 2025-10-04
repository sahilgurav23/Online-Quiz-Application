# 🚀 Quick Start Guide

## Prerequisites
- ✅ .NET 8.0 SDK installed
- ✅ Node.js 18+ installed

## Start the Application (2 Steps)

### Step 1: Start Backend API
```bash
cd "Quiz Api"
dotnet run
```
✅ API running at: **http://localhost:5079**  
📚 Swagger UI: **http://localhost:5079/swagger**

### Step 2: Start Frontend
Open a **new terminal** window:
```bash
cd online-quiz
npm install    # First time only
npm run dev
```
✅ Frontend running at: **http://localhost:3000**

## That's It! 🎉

Open your browser and go to: **http://localhost:3000**

You should see 3 sample quizzes ready to take!

## Quick Test

1. **Home Page** - See 3 quizzes listed
2. **Click a Quiz** - Start "General Knowledge Quiz"
3. **Answer Questions** - Select answers and click Next
4. **View Results** - See your score and detailed breakdown

## Troubleshooting

### ❌ "Unable to Load Quizzes" Error
**Problem**: Frontend can't connect to backend  
**Solution**: Make sure backend is running at http://localhost:5079

### ❌ "Unauthorized: Invalid or missing API key"
**Problem**: API key authentication failed  
**Solution**: 
1. Frontend uses default API key: `YRwMhWyVsN4cx8CF0CyEfetDrQ2Ag0xuumo4RaOoEiI=`
2. Backend must have matching key in `appsettings.json`
3. If you changed the backend key, create `online-quiz/.env.local`:
   ```env
   NEXT_PUBLIC_API_KEY=your-backend-api-key
   ```
4. Restart frontend: `npm run dev`

### ❌ Port Already in Use
**Backend (5079)**:
```bash
# Windows
netstat -ano | findstr :5079
taskkill /PID <PID> /F
```

**Frontend (3000)**:
```bash
# Use a different port
npm run dev -- -p 3001
```

### ❌ Database Not Found
**Solution**: Delete `quiz.db` and restart the API - it will recreate with sample data

## Project Structure

```
Online-Quiz-Application/
├── Quiz Api/          # Backend (.NET)
│   └── quiz.db       # SQLite database (auto-created)
└── online-quiz/      # Frontend (Next.js)
    └── src/          # Source code
```

## Available Commands

### Backend
```bash
dotnet run          # Start development server
dotnet build        # Build project
dotnet test         # Run tests (if any)
```

### Frontend
```bash
npm run dev         # Start development server
npm run build       # Build for production
npm start           # Start production server
npm run lint        # Run ESLint
```

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/quizzes` | Get all quizzes |
| `GET /api/quizzes/{id}` | Get quiz by ID |
| `GET /api/quizzes/{id}/answers` | Get quiz with answers |

## Default Quizzes

1. **General Knowledge Quiz** - 3 questions
2. **Programming Basics** - 2 questions  
3. **Math Quiz** - 3 questions

## Next Steps

- 📖 Read [README.md](README.md) for full documentation
- 🎨 Read [FRONTEND_GUIDE.md](online-quiz/FRONTEND_GUIDE.md) for frontend details
- 📋 Read [INTEGRATION_SUMMARY.md](INTEGRATION_SUMMARY.md) for technical details

## Need Help?

- Check if both servers are running
- Check browser console for errors (F12)
- Check terminal for error messages
- Verify ports 5079 and 3000 are available

---

**Happy Quizzing! 🎯**
