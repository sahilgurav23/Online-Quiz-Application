# Quiz API - Quick Start Guide

## ✅ Your API is Ready!

The Quiz API has been simplified to include **only 3 essential endpoints** for fetching quiz data.

**🔒 Security:** All endpoints are protected with **API Key authentication**.

---

## 🚀 Start the Application

```bash
dotnet run
```

**API URL:** http://localhost:5079  
**Swagger UI:** http://localhost:5079/swagger

---

## 🔑 API Key Authentication

**All requests require an API Key header:**

```
X-API-Key: YRwMhWyVsN4cx8CF0CyEfetDrQ2Ag0xuumo4RaOoEiI=
```

**API Key:** `YRwMhWyVsN4cx8CF0CyEfetDrQ2Ag0xuumo4RaOoEiI=`

⚠️ **This is a cryptographically secure key. Keep it secret!** See `SECURITY.md` for details.

---

## 📋 Available Endpoints

### 1️⃣ Get All Quizzes (Without Answers)
```http
GET http://localhost:5079/api/quizzes
```
**Returns:** All quizzes with questions and options (correct answers hidden)

### 2️⃣ Get Specific Quiz (Without Answers)
```http
GET http://localhost:5079/api/quizzes/1
```
**Returns:** Single quiz with questions and options (correct answers hidden)

### 3️⃣ Get Quiz With Correct Answers
```http
GET http://localhost:5079/api/quizzes/1/answers
```
**Returns:** Single quiz with questions, options, and correct answers revealed

---

## 🧪 Test It Now!

### Option 1: Swagger UI (Easiest)
1. Open browser: http://localhost:5079/swagger
2. Click the **"Authorize"** button (🔓 lock icon)
3. Enter API key: `YRwMhWyVsN4cx8CF0CyEfetDrQ2Ag0xuumo4RaOoEiI=`
4. Click **"Authorize"** then **"Close"**
5. Now click on any endpoint → "Try it out" → "Execute"

### Option 2: Use Quiz Api.http File
1. Open `Quiz Api.http` in Visual Studio
2. The API key is already configured
3. Click "Send Request" above any endpoint

### Option 3: PowerShell
```powershell
$headers = @{ "X-API-Key" = "YRwMhWyVsN4cx8CF0CyEfetDrQ2Ag0xuumo4RaOoEiI=" }

# Get all quizzes
Invoke-RestMethod -Uri "http://localhost:5079/api/quizzes" -Headers $headers

# Get quiz 1 without answers
Invoke-RestMethod -Uri "http://localhost:5079/api/quizzes/1" -Headers $headers

# Get quiz 1 with answers
Invoke-RestMethod -Uri "http://localhost:5079/api/quizzes/1/answers" -Headers $headers
```

### Option 4: cURL
```bash
curl -H "X-API-Key: YRwMhWyVsN4cx8CF0CyEfetDrQ2Ag0xuumo4RaOoEiI=" http://localhost:5079/api/quizzes
```

---

## 📊 Sample Data Included

The database is automatically populated with 3 sample quizzes:

1. **General Knowledge Quiz** (3 questions)
   - Capital of France
   - Red Planet
   - Largest ocean

2. **Programming Basics** (2 questions)
   - HTML meaning
   - Language of the web

3. **Math Quiz** (3 questions)
   - Addition
   - Subtraction
   - Multiplication

---

## 🎯 Typical Usage Flow

```
1. User opens app
   ↓
2. GET /api/quizzes
   → Display list of available quizzes
   ↓
3. User selects a quiz
   ↓
4. GET /api/quizzes/{id}
   → Display questions and options (no correct answers shown)
   ↓
5. User answers questions
   ↓
6. GET /api/quizzes/{id}/answers
   → Compare user's answers with correct answers
   → Calculate and display score
```

---

## 📁 Project Structure

```
Quiz Api/
├── Controllers/
│   └── QuizzesController.cs      # 3 endpoints only
├── Models/
│   ├── Quiz.cs
│   ├── Question.cs
│   └── Option.cs
├── DTOs/
│   ├── QuizDto.cs
│   ├── QuestionDto.cs
│   └── OptionDto.cs
├── Data/
│   ├── QuizDbContext.cs
│   ├── DbInitializer.cs
│   └── SampleDataSeeder.cs       # Sample quiz data
├── API_DOCUMENTATION.md           # Detailed documentation
├── QUICK_START.md                 # This file
└── Quiz Api.http                  # Test requests
```

---

## 🔧 Database

- **Type:** SQLite
- **File:** `quiz.db` (auto-created)
- **Tables:** 
  - `quizzes` - Quiz information
  - `questions` - Questions for each quiz
  - `options` - Answer options with correct flag

---

## 💡 Key Features

✅ **Clean & Simple** - Only 3 GET endpoints  
✅ **Secure** - Correct answers hidden by default  
✅ **Auto Setup** - Database and sample data created automatically  
✅ **RESTful** - Follows REST API best practices  
✅ **Documented** - Swagger UI for interactive testing  

---

## 📖 Need More Details?

See **API_DOCUMENTATION.md** for:
- Complete API reference
- Request/response examples
- Frontend integration examples
- Security considerations

---

## 🛑 Stop the Application

Press `Ctrl+C` in the terminal, or run:
```powershell
Get-Process -Name "Quiz Api" | Stop-Process -Force
```

---

## 🎉 You're All Set!

Your simplified Quiz API is ready to use. Open Swagger UI and start testing!

**Swagger URL:** http://localhost:5079/swagger
