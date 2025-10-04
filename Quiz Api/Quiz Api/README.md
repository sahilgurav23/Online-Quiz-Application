# Quiz API

A clean and simple RESTful API for fetching quiz data, built with ASP.NET Core 8.0 and SQLite.

## Project Structure

```
Quiz Api/
├── Controllers/
│   └── QuizzesController.cs      # Quiz endpoints (3 GET methods only)
├── Models/
│   ├── Quiz.cs                    # Quiz entity
│   ├── Question.cs                # Question entity
│   └── Option.cs                  # Option entity
├── DTOs/
│   ├── QuizDto.cs                 # Quiz data transfer object
│   ├── QuestionDto.cs             # Question DTO
│   └── OptionDto.cs               # Option DTO
├── Data/
│   ├── QuizDbContext.cs           # Database context
│   ├── DbInitializer.cs           # Database initialization
│   └── SampleDataSeeder.cs        # Sample quiz data
├── Services/
│   └── FileLoggerService.cs       # File-based logging service
├── Middleware/
│   ├── ApiKeyAuthMiddleware.cs    # API key authentication
│   ├── RequestLoggingMiddleware.cs # Request logging
│   └── ExceptionHandlingMiddleware.cs # Global exception handler
├── Logs/                          # Date-wise log files (auto-created)
│   └── log_YYYY-MM-DD.txt
├── Program.cs                     # Application entry point
├── appsettings.json               # Configuration settings
├── QUICK_START.md                 # Quick start guide
├── API_DOCUMENTATION.md           # Detailed API documentation
├── SECURITY.md                    # Security and API key guide
├── LOGGING_GUIDE.md               # Logging system documentation
├── IMPLEMENTATION_SUMMARY.md      # Implementation details
└── quiz.db                        # SQLite database (auto-created)
```

## Database Schema

### Tables

1. **quizzes** - Stores quiz information
   - id (INTEGER, PRIMARY KEY, AUTOINCREMENT)
   - title (TEXT, NOT NULL)
   - description (TEXT)

2. **questions** - Stores questions for each quiz
   - id (INTEGER, PRIMARY KEY, AUTOINCREMENT)
   - quiz_id (INTEGER, NOT NULL, FOREIGN KEY)
   - question_text (TEXT, NOT NULL)

3. **options** - Stores answer options for each question
   - id (INTEGER, PRIMARY KEY, AUTOINCREMENT)
   - question_id (INTEGER, NOT NULL, FOREIGN KEY)
   - option_text (TEXT, NOT NULL)
   - is_correct (BOOLEAN, NOT NULL, DEFAULT 0)

## Getting Started

### Prerequisites
- .NET 8.0 SDK

### Running the Application

1. Restore dependencies:
   ```bash
   dotnet restore
   ```

2. Build the project:
   ```bash
   dotnet build
   ```

3. Run the application:
   ```bash
   dotnet run
   ```

The API will be available at:
- **HTTP:** http://localhost:5079
- **Swagger UI:** http://localhost:5079/swagger

### Database

The SQLite database (`quiz.db`) will be automatically created in the project root directory when the application starts. Sample quiz data is automatically seeded on first run.

## Technologies Used

- **ASP.NET Core 8.0** - Web framework
- **Entity Framework Core 8.0** - ORM
- **SQLite** - Lightweight database
- **Swagger/OpenAPI** - Interactive API documentation
- **File-based Logging** - Date-wise log file system
- **CORS** - Cross-Origin Resource Sharing for frontend integration

---

## 📋 API Endpoints (Simplified)

This API provides **3 simple GET endpoints** for fetching quiz data:

### 1. Get All Quizzes (Without Correct Answers)

**Endpoint:** `GET /api/quizzes`

**Description:** Fetch all quizzes with questions and options. Correct answers are **hidden** (all `isCorrect` fields return `false`).

**Use Case:** Display available quizzes to users

**Example Request:**
```http
GET http://localhost:5079/api/quizzes
```

---

### 2. Get Quiz by ID (Without Correct Answers)

**Endpoint:** `GET /api/quizzes/{id}`

**Description:** Fetch a specific quiz with questions and options. Correct answers are **hidden**.

**Use Case:** Display a quiz for users to take

**Example Request:**
```http
GET http://localhost:5079/api/quizzes/1
```

**Response Example:**
```json
{
  "id": 1,
  "title": "General Knowledge Quiz",
  "description": "Test your general knowledge",
  "questions": [
    {
      "id": 1,
      "quizId": 1,
      "questionText": "What is the capital of France?",
      "options": [
        {
          "id": 1,
          "questionId": 1,
          "optionText": "London",
          "isCorrect": false
        },
        {
          "id": 2,
          "questionId": 1,
          "optionText": "Paris",
          "isCorrect": false
        },
        {
          "id": 3,
          "questionId": 1,
          "optionText": "Berlin",
          "isCorrect": false
        }
      ]
    }
  ]
}
```

---

### 3. Get Quiz with Correct Answers

**Endpoint:** `GET /api/quizzes/{id}/answers`

**Description:** Fetch a specific quiz with questions, options, and **correct answers revealed**.

**Use Case:** Check correct answers after quiz submission, grade responses, display results

**Example Request:**
```http
GET http://localhost:5079/api/quizzes/1/answers
```

**Response Example:**
```json
{
  "id": 1,
  "title": "General Knowledge Quiz",
  "description": "Test your general knowledge",
  "questions": [
    {
      "id": 1,
      "quizId": 1,
      "questionText": "What is the capital of France?",
      "options": [
        {
          "id": 1,
          "questionId": 1,
          "optionText": "London",
          "isCorrect": false
        },
        {
          "id": 2,
          "questionId": 1,
          "optionText": "Paris",
          "isCorrect": true    // ✅ Correct answer revealed
        },
        {
          "id": 3,
          "questionId": 1,
          "optionText": "Berlin",
          "isCorrect": false
        }
      ]
    }
  ]
}
```

---

## 🧪 Testing the API

### Option 1: Swagger UI (Recommended)
1. Run the application: `dotnet run`
2. Open browser: http://localhost:5079/swagger
3. Click on any endpoint → "Try it out" → "Execute"

### Option 2: Use Quiz Api.http File
1. Open `Quiz Api.http` in Visual Studio
2. Click "Send Request" above any endpoint

### Option 3: PowerShell
```powershell
# Get all quizzes
Invoke-RestMethod -Uri "http://localhost:5079/api/quizzes" -Method GET

# Get specific quiz without answers
Invoke-RestMethod -Uri "http://localhost:5079/api/quizzes/1" -Method GET

# Get quiz with correct answers
Invoke-RestMethod -Uri "http://localhost:5079/api/quizzes/1/answers" -Method GET
```

---

## 📊 Sample Data

The API comes with **3 pre-loaded sample quizzes**:

1. **General Knowledge Quiz** (3 questions)
   - Capital of France
   - Red Planet
   - Largest ocean

2. **Programming Basics** (2 questions)
   - HTML meaning
   - Language of the web

3. **Math Quiz** (3 questions)
   - Addition, Subtraction, Multiplication

---

## ✨ Features

✅ **Clean & Simple** - Only 3 GET endpoints, easy to understand  
✅ **Secure by Default** - API key authentication, correct answers hidden unless explicitly requested  
✅ **Auto Setup** - Database and sample data created automatically  
✅ **RESTful Design** - Follows REST API best practices  
✅ **Interactive Docs** - Swagger UI for testing  
✅ **Lightweight** - SQLite database, no external dependencies  
✅ **Type-Safe** - Strong typing with DTOs and models  
✅ **Comprehensive Logging** - Date-wise log files with all requests and errors  
✅ **CORS Enabled** - Ready for frontend integration  
✅ **Error Handling** - Global exception handling with detailed logging  

---

## 📖 Documentation

- **QUICK_START.md** - Quick reference guide
- **API_DOCUMENTATION.md** - Complete API documentation with examples
- **SECURITY.md** - API key authentication guide
- **LOGGING_GUIDE.md** - Logging system documentation
- **IMPLEMENTATION_SUMMARY.md** - Technical implementation details
- **Quiz Api.http** - Test requests for Visual Studio

---

## 📝 Logging System

All API requests, errors, and events are automatically logged to date-wise log files:

```
Logs/
├── log_2025-10-04.txt
├── log_2025-10-03.txt
└── log_2025-10-02.txt
```

**What's Logged**:
- All HTTP requests with duration and status code
- Authentication attempts (success/failure)
- Database operations
- Errors with full stack traces
- Application lifecycle events

**View Logs** (PowerShell):
```powershell
Get-Content "Logs\log_$(Get-Date -Format 'yyyy-MM-dd').txt" -Wait -Tail 50
```

See **LOGGING_GUIDE.md** for complete documentation.

---

## 🎯 Typical Usage Flow

1. **Fetch available quizzes** → `GET /api/quizzes`
2. **User selects a quiz** → `GET /api/quizzes/{id}`
3. **User answers questions** (handled by your frontend)
4. **Check answers & calculate score** → `GET /api/quizzes/{id}/answers`

---

## 🔒 Security

✅ **API Key Authentication** - All endpoints protected with `X-API-Key` header  
✅ **CORS Configured** - Allows requests from `http://localhost:3000` and `http://localhost:3001`  
✅ **Request Logging** - All authentication attempts logged  
✅ **Error Handling** - Sensitive data not exposed in error responses  

See **SECURITY.md** for complete security documentation.

---

## 🛠️ Next Steps

- ✅ ~~Add authentication to protect endpoints~~ (Implemented with API Key)
- ✅ ~~Implement CORS for frontend integration~~ (Implemented)
- ✅ ~~Add comprehensive logging~~ (Implemented)
- Add input validation
- Implement caching for better performance
- Add unit and integration tests
- Implement rate limiting
