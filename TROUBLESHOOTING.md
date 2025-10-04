# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### ❌ "Failed to fetch" Error

**Symptoms**: 
- Error appears on results page or quiz listing
- Console shows: `Failed to fetch` or `TypeError: Failed to fetch`

**Causes & Solutions**:

#### 1. Backend API Not Running
**Check**: Is the Quiz API running?

```bash
# Test if API is accessible
curl http://localhost:5079/api/quizzes
```

**Solution**: Start the backend API
```bash
cd "Quiz Api"
dotnet run
```

Verify it's running at: http://localhost:5079/swagger

---

#### 2. CORS (Cross-Origin Resource Sharing) Issue
**Check**: Browser console shows CORS error

**Solution**: Ensure your backend API has CORS configured for `http://localhost:3000`

In your `Program.cs`, you should have:
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// After var app = builder.Build();
app.UseCors("AllowFrontend");
```

---

#### 3. API Key Authentication Issue
**Check**: Console shows `401 Unauthorized`

**Solution**: 
1. Verify backend API key in `Quiz Api/appsettings.json`:
   ```json
   {
     "ApiKey": "YRwMhWyVsN4cx8CF0CyEfetDrQ2Ag0xuumo4RaOoEiI="
   }
   ```

2. Verify frontend API key matches. Create `online-quiz/.env.local`:
   ```env
   NEXT_PUBLIC_API_KEY=YRwMhWyVsN4cx8CF0CyEfetDrQ2Ag0xuumo4RaOoEiI=
   ```

3. Restart both frontend and backend

---

#### 4. Wrong API URL
**Check**: Verify the API URL is correct

**Solution**: Create `online-quiz/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5079/api
NEXT_PUBLIC_API_KEY=YRwMhWyVsN4cx8CF0CyEfetDrQ2Ag0xuumo4RaOoEiI=
```

Restart frontend: `npm run dev`

---

### ❌ "Unauthorized: Invalid or missing API key"

**Solution**:
1. Check backend `appsettings.json` for the API key
2. Update frontend `.env.local` with matching key
3. Restart both servers

---

### ❌ Results Page Shows Error

**Symptoms**: Error on `/quiz/1/results` page

**Causes**:

#### 1. Navigated Directly to Results
**Solution**: Take the quiz first, don't navigate directly to results URL

#### 2. Page Refreshed During Quiz
**Solution**: Session storage is cleared on refresh. Retake the quiz.

#### 3. Backend Not Returning Answers
**Check**: Test the answers endpoint directly
```bash
curl -H "X-API-Key: YRwMhWyVsN4cx8CF0CyEfetDrQ2Ag0xuumo4RaOoEiI=" \
  http://localhost:5079/api/quizzes/1/answers
```

---

### ❌ Port Already in Use

#### Backend (Port 5079)
```powershell
# Windows - Find process
netstat -ano | findstr :5079

# Kill process
taskkill /PID <PID> /F
```

#### Frontend (Port 3000)
```bash
# Use different port
npm run dev -- -p 3001
```

---

### ❌ "Unable to Load Quizzes" on Home Page

**Checklist**:
1. ✅ Backend running at http://localhost:5079
2. ✅ Test API directly: http://localhost:5079/api/quizzes
3. ✅ Check browser console for errors (F12)
4. ✅ Verify CORS is configured
5. ✅ Verify API key matches

---

### ❌ Environment Variables Not Working

**Issue**: Changes to `.env.local` not taking effect

**Solution**: 
1. Restart the dev server (Ctrl+C, then `npm run dev`)
2. Clear browser cache
3. Check file is named `.env.local` (not `.env.local.txt`)

---

### ❌ Quiz Not Found (404)

**Solution**:
1. Check quiz ID exists in database
2. Test API: http://localhost:5079/api/quizzes/1
3. Verify database has sample data (check `quiz.db`)

---

## Debugging Steps

### Step 1: Verify Backend is Running
```bash
# Test API health
curl http://localhost:5079/api/quizzes

# Or open in browser
http://localhost:5079/swagger
```

### Step 2: Check Browser Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for error messages
4. Check Network tab for failed requests

### Step 3: Test API with Correct Headers
```bash
# PowerShell
$headers = @{ "X-API-Key" = "YRwMhWyVsN4cx8CF0CyEfetDrQ2Ag0xuumo4RaOoEiI=" }
Invoke-RestMethod -Uri "http://localhost:5079/api/quizzes" -Headers $headers
```

### Step 4: Check CORS Headers
In browser Network tab, check response headers should include:
```
Access-Control-Allow-Origin: http://localhost:3000
```

### Step 5: Verify Environment Variables
Add console log to check values:
```typescript
// In src/lib/api.ts
console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
console.log('API Key:', process.env.NEXT_PUBLIC_API_KEY?.substring(0, 10) + '...');
```

---

## Quick Fix Checklist

When you get "Failed to fetch":

- [ ] Backend API is running (`dotnet run`)
- [ ] Backend accessible at http://localhost:5079/swagger
- [ ] Frontend is running (`npm run dev`)
- [ ] CORS is configured in backend
- [ ] API key matches in both frontend and backend
- [ ] Browser console shows no CORS errors
- [ ] Network tab shows request is being made
- [ ] No firewall blocking localhost connections

---

## Testing the Complete Flow

### 1. Start Backend
```bash
cd "Quiz Api"
dotnet run
```
Expected output: `Now listening on: http://localhost:5079`

### 2. Test Backend API
```bash
curl -H "X-API-Key: YRwMhWyVsN4cx8CF0CyEfetDrQ2Ag0xuumo4RaOoEiI=" \
  http://localhost:5079/api/quizzes
```
Expected: JSON array of quizzes

### 3. Start Frontend
```bash
cd online-quiz
npm run dev
```
Expected output: `ready - started server on 0.0.0.0:3000`

### 4. Test Frontend
Open: http://localhost:3000
Expected: See 3 quizzes listed

### 5. Take a Quiz
1. Click a quiz
2. Start quiz
3. Answer questions
4. Submit
5. View results

---

## Still Having Issues?

### Enable Detailed Logging

**Frontend** - Add to `src/lib/api.ts`:
```typescript
private async handleResponse<T>(response: Response): Promise<T> {
  console.log('API Response:', {
    url: response.url,
    status: response.status,
    statusText: response.statusText,
    headers: Object.fromEntries(response.headers.entries())
  });
  
  // ... rest of code
}
```

**Backend** - Check console output for errors

### Check Network Request Details
1. Open DevTools (F12)
2. Go to Network tab
3. Click on failed request
4. Check:
   - Request URL
   - Request Headers (should include X-API-Key)
   - Response (error message)
   - Status code

---

## Contact & Support

If none of these solutions work:

1. Check backend console for error messages
2. Check frontend console for error messages
3. Verify both servers are on the same machine
4. Try disabling antivirus/firewall temporarily
5. Check if another application is using the ports

---

## Common Error Messages Reference

| Error Message | Likely Cause | Solution |
|--------------|--------------|----------|
| `Failed to fetch` | Backend not running or CORS | Start backend, configure CORS |
| `401 Unauthorized` | API key mismatch | Match API keys in both apps |
| `404 Not Found` | Wrong URL or quiz doesn't exist | Check API URL and quiz ID |
| `Network Error` | Backend not accessible | Check backend is running |
| `CORS policy` | CORS not configured | Add CORS policy in backend |
| `Quiz not found` | Invalid quiz ID | Use valid quiz ID (1, 2, or 3) |

---

**Need more help?** Check the main README.md or API documentation.
