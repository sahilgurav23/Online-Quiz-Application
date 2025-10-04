# Quiz API Testing Guide

## 🚀 Start the Application

Run the application first:
```bash
dotnet run
```

The API will be available at: **http://localhost:5079**

---

## Method 1: Swagger UI (Recommended for Beginners)

1. **Open your browser** and go to: http://localhost:5079/swagger
2. You'll see all API endpoints organized by controller
3. Click on any endpoint to expand it
4. Click **"Try it out"** button
5. Fill in the request body (if needed)
6. Click **"Execute"**
7. View the response below

### Example Flow in Swagger:
1. **Create a User** → POST `/api/users`
2. **Create a Quiz** → POST `/api/quizzes`
3. **Submit Quiz** → POST `/api/quizsubmissions`
4. **View Results** → GET `/api/quizsubmissions/user/{userId}/quiz/{quizId}`

---

## Method 2: Using Quiz Api.http File (Visual Studio)

1. Make sure the application is running
2. Open the `Quiz Api.http` file
3. You'll see green "Send Request" links above each request
4. Click any "Send Request" link to execute that API call
5. Results appear in a new panel

### Recommended Test Sequence:

**Step 1: Create a User**
```http
POST http://localhost:5079/api/users
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com"
}
```

**Step 2: Create a Quiz**
```http
POST http://localhost:5079/api/quizzes
Content-Type: application/json

{
  "title": "General Knowledge Quiz",
  "description": "Test your general knowledge",
  "questions": [
    {
      "questionText": "What is the capital of France?",
      "options": [
        { "optionText": "London", "isCorrect": false },
        { "optionText": "Paris", "isCorrect": true },
        { "optionText": "Berlin", "isCorrect": false },
        { "optionText": "Madrid", "isCorrect": false }
      ]
    },
    {
      "questionText": "What is 2 + 2?",
      "options": [
        { "optionText": "3", "isCorrect": false },
        { "optionText": "4", "isCorrect": true },
        { "optionText": "5", "isCorrect": false }
      ]
    }
  ]
}
```

**Step 3: Get All Quizzes**
```http
GET http://localhost:5079/api/quizzes
```
Note the quiz ID and question IDs from the response.

**Step 4: Submit Quiz Answers**
```http
POST http://localhost:5079/api/quizsubmissions
Content-Type: application/json

{
  "userId": 1,
  "quizId": 1,
  "answers": [
    { "questionId": 1, "optionId": 2 },
    { "questionId": 2, "optionId": 6 }
  ]
}
```

**Step 5: View Quiz Results**
```http
GET http://localhost:5079/api/quizsubmissions/user/1/quiz/1
```

---

## Method 3: Using Postman

1. Download and install [Postman](https://www.postman.com/downloads/)
2. Create a new request
3. Set the method (GET, POST, PUT, DELETE)
4. Enter the URL: `http://localhost:5079/api/...`
5. For POST/PUT requests:
   - Go to "Body" tab
   - Select "raw" and "JSON"
   - Paste the JSON request body
6. Click "Send"

---

## Method 4: Using PowerShell/Command Line

### Create a User
```powershell
Invoke-RestMethod -Uri "http://localhost:5079/api/users" -Method POST -ContentType "application/json" -Body '{"username":"test_user","email":"test@example.com"}'
```

### Get All Users
```powershell
Invoke-RestMethod -Uri "http://localhost:5079/api/users" -Method GET
```

### Create a Quiz
```powershell
$quiz = @{
    title = "Sample Quiz"
    description = "A test quiz"
    questions = @(
        @{
            questionText = "What is 1+1?"
            options = @(
                @{ optionText = "1"; isCorrect = $false }
                @{ optionText = "2"; isCorrect = $true }
                @{ optionText = "3"; isCorrect = $false }
            )
        }
    )
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri "http://localhost:5079/api/quizzes" -Method POST -ContentType "application/json" -Body $quiz
```

---

## Quick Test Checklist

- [ ] Application is running (`dotnet run`)
- [ ] Swagger UI loads (http://localhost:5079/swagger)
- [ ] Create a user successfully
- [ ] Create a quiz with questions and options
- [ ] Get all quizzes and verify data
- [ ] Submit quiz answers
- [ ] View quiz results with score
- [ ] Check that score calculation is correct

---

## Common Issues

**Port Already in Use**
```bash
# Stop the running process
Get-Process -Name "Quiz Api" | Stop-Process -Force
```

**Database Not Found**
- The database is auto-created on first run
- Check for `quiz.db` file in the project directory

**404 Not Found**
- Ensure the application is running
- Check the URL includes `/api/` prefix
- Verify the endpoint path is correct

---

## API Endpoints Quick Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/users` | GET | Get all users |
| `/api/users` | POST | Create user |
| `/api/users/{id}` | GET | Get user by ID |
| `/api/users/{id}` | PUT | Update user |
| `/api/users/{id}` | DELETE | Delete user |
| `/api/quizzes` | GET | Get all quizzes |
| `/api/quizzes` | POST | Create quiz |
| `/api/quizzes/{id}` | GET | Get quiz by ID |
| `/api/quizzes/{id}` | PUT | Update quiz |
| `/api/quizzes/{id}` | DELETE | Delete quiz |
| `/api/quizsubmissions` | POST | Submit quiz answers |
| `/api/quizsubmissions/user/{userId}/quiz/{quizId}` | GET | Get quiz result |
| `/api/quizsubmissions/user/{userId}` | GET | Get all user results |

---

## 🎯 Recommended: Start with Swagger UI

The easiest way to test is:
1. Run `dotnet run`
2. Open http://localhost:5079/swagger in your browser
3. Test the endpoints interactively

Happy Testing! 🚀
