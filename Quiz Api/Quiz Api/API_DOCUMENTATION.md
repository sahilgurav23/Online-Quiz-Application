# Quiz API - Simplified Documentation

## Overview
This is a clean and simple Quiz API with only **3 essential endpoints** for fetching quiz data.

---

## 🚀 Quick Start

### Start the Application
```bash
dotnet run
```

The API will be available at: **http://localhost:5079**

### Swagger UI
Open in browser: **http://localhost:5079/swagger**

---

## 📋 API Endpoints

### 1. **Get All Quizzes** (Without Correct Answers)
Fetch all quizzes with questions and options. **Correct answers are hidden** (all `isCorrect` fields return `false`).

**Endpoint:** `GET /api/quizzes`

**Use Case:** Display available quizzes to users

**Response Example:**
```json
[
  {
    "id": 1,
    "title": "General Knowledge Quiz",
    "description": "Test your knowledge",
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
]
```

---

### 2. **Get Quiz by ID** (Without Correct Answers)
Fetch a specific quiz with questions and options. **Correct answers are hidden**.

**Endpoint:** `GET /api/quizzes/{id}`

**Parameters:**
- `id` (integer) - Quiz ID

**Use Case:** Display a specific quiz to users for taking the quiz

**Example Request:**
```http
GET http://localhost:5079/api/quizzes/1
```

**Response:** Same structure as "Get All Quizzes" but for a single quiz

---

### 3. **Get Quiz with Correct Answers**
Fetch a specific quiz with questions, options, and **correct answers revealed**.

**Endpoint:** `GET /api/quizzes/{id}/answers`

**Parameters:**
- `id` (integer) - Quiz ID

**Use Case:** 
- Check correct answers after quiz submission
- Grade user responses
- Display quiz results with explanations

**Example Request:**
```http
GET http://localhost:5079/api/quizzes/1/answers
```

**Response Example:**
```json
{
  "id": 1,
  "title": "General Knowledge Quiz",
  "description": "Test your knowledge",
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

### Option 1: Using Swagger UI (Recommended)
1. Run `dotnet run`
2. Open http://localhost:5079/swagger
3. Click on any endpoint
4. Click "Try it out"
5. Click "Execute"

### Option 2: Using Quiz Api.http File
1. Open `Quiz Api.http` in Visual Studio
2. Click "Send Request" above any endpoint

### Option 3: Using PowerShell
```powershell
# Get all quizzes
Invoke-RestMethod -Uri "http://localhost:5079/api/quizzes" -Method GET

# Get quiz by ID
Invoke-RestMethod -Uri "http://localhost:5079/api/quizzes/1" -Method GET

# Get quiz with answers
Invoke-RestMethod -Uri "http://localhost:5079/api/quizzes/1/answers" -Method GET
```

---

## 📊 Database Schema

The API uses SQLite with 3 simple tables:

### **quizzes**
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key |
| title | TEXT | Quiz title |
| description | TEXT | Quiz description |

### **questions**
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key |
| quiz_id | INTEGER | Foreign key to quizzes |
| question_text | TEXT | Question text |

### **options**
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key |
| question_id | INTEGER | Foreign key to questions |
| option_text | TEXT | Option text |
| is_correct | BOOLEAN | Whether this is the correct answer |

---

## 🎯 Typical Usage Flow

1. **Display Quiz List**
   ```
   GET /api/quizzes
   ```
   Show all available quizzes to the user

2. **User Selects a Quiz**
   ```
   GET /api/quizzes/{id}
   ```
   Display the quiz questions and options (without revealing correct answers)

3. **User Submits Answers**
   Your frontend collects the user's selected option IDs

4. **Check Answers & Show Results**
   ```
   GET /api/quizzes/{id}/answers
   ```
   Compare user's selections with the correct answers and display results

---

## 🏗️ Project Structure

```
Quiz Api/
├── Controllers/
│   └── QuizzesController.cs      # Only quiz endpoints
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
│   └── DbInitializer.cs           # Database initialization
├── Program.cs                     # Application entry point
├── appsettings.json               # Configuration
└── quiz.db                        # SQLite database (auto-created)
```

---

## ✨ Features

✅ **Clean & Simple** - Only 3 endpoints, easy to understand
✅ **Secure** - Correct answers hidden by default
✅ **RESTful** - Follows REST API best practices
✅ **Auto Database** - SQLite database created automatically
✅ **Swagger Docs** - Interactive API documentation
✅ **Type-Safe** - Strong typing with DTOs

---

## 🔒 Security Note

The API has two modes for fetching quizzes:
- **Without answers** (`/api/quizzes` and `/api/quizzes/{id}`) - For quiz takers
- **With answers** (`/api/quizzes/{id}/answers`) - For checking/grading

In a production environment, you should add authentication to the `/answers` endpoint to prevent users from seeing correct answers before submitting their quiz.

---

## 💡 Example Integration

### Frontend Flow Example (JavaScript/React)

```javascript
// 1. Fetch available quizzes
const quizzes = await fetch('http://localhost:5079/api/quizzes').then(r => r.json());

// 2. User selects quiz ID 1
const quiz = await fetch('http://localhost:5079/api/quizzes/1').then(r => r.json());

// 3. Display questions and collect user answers
const userAnswers = {
  1: 2,  // Question 1: User selected option 2
  2: 6   // Question 2: User selected option 6
};

// 4. After submission, get correct answers
const quizWithAnswers = await fetch('http://localhost:5079/api/quizzes/1/answers').then(r => r.json());

// 5. Compare and calculate score
let score = 0;
quizWithAnswers.questions.forEach(question => {
  const correctOption = question.options.find(opt => opt.isCorrect);
  if (userAnswers[question.id] === correctOption.id) {
    score++;
  }
});

console.log(`Score: ${score}/${quizWithAnswers.questions.length}`);
```

---

## 📝 Notes

- Database file (`quiz.db`) is created automatically on first run
- All endpoints return JSON
- No authentication required (add in production)
- CORS is not configured (add if needed for frontend)

---

## 🛠️ Technologies

- **ASP.NET Core 8.0** - Web framework
- **Entity Framework Core 8.0** - ORM
- **SQLite** - Database
- **Swagger/OpenAPI** - API documentation
