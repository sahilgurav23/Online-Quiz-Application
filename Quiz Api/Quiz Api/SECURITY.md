# Quiz API - Security Guide

## 🔒 API Key Authentication

The Quiz API is protected with **API Key authentication**. All API requests must include a valid API key in the request header.

---

## 🔑 API Key Configuration

### Current API Key
A cryptographically secure API key is configured in `appsettings.json`:

```json
{
  "ApiKey": "YRwMhWyVsN4cx8CF0CyEfetDrQ2Ag0xuumo4RaOoEiI="
}
```

**Key Details:**
- **Length:** 256-bit (32 bytes)
- **Encoding:** Base64
- **Generated:** Using cryptographically secure random number generator
- **Strength:** Highly secure for production use

### ⚠️ Important: Keep This Key Secret!

**Before deploying to production:**
1. Generate a strong, random API key
2. Update the `ApiKey` value in `appsettings.json` or use environment variables
3. Never commit your production API key to source control

### Using Environment Variables (Recommended for Production)

Instead of storing the API key in `appsettings.json`, use environment variables:

**Windows:**
```powershell
$env:ApiKey = "YRwMhWyVsN4cx8CF0CyEfetDrQ2Ag0xuumo4RaOoEiI="
dotnet run
```

**Linux/Mac:**
```bash
export ApiKey="YRwMhWyVsN4cx8CF0CyEfetDrQ2Ag0xuumo4RaOoEiI="
dotnet run
```

**Docker:**
```bash
docker run -e ApiKey="YRwMhWyVsN4cx8CF0CyEfetDrQ2Ag0xuumo4RaOoEiI=" your-image
```

### 🔐 Generate Your Own Secure API Key

To generate a new cryptographically secure API key, run this PowerShell command:

```powershell
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$bytes = New-Object byte[] 32
$rng.GetBytes($bytes)
[System.Convert]::ToBase64String($bytes)
```

This generates a 256-bit random key encoded in Base64.

---

## 📝 How to Use API Key

### Required Header
All API requests must include the following header:

```
X-API-Key: YRwMhWyVsN4cx8CF0CyEfetDrQ2Ag0xuumo4RaOoEiI=
```

---

## 🧪 Testing with API Key

### Option 1: Swagger UI

1. Open Swagger UI: http://localhost:5079/swagger
2. Click the **"Authorize"** button (🔓 lock icon) at the top
3. Enter your API key: `YRwMhWyVsN4cx8CF0CyEfetDrQ2Ag0xuumo4RaOoEiI=`
4. Click **"Authorize"**
5. Click **"Close"**
6. Now you can test all endpoints with the API key automatically included

### Option 2: Quiz Api.http File

The API key is already configured in the file:

```http
@ApiKey = YRwMhWyVsN4cx8CF0CyEfetDrQ2Ag0xuumo4RaOoEiI=

GET http://localhost:5079/api/quizzes
X-API-Key: {{ApiKey}}
```

Just click "Send Request" and it will work!

### Option 3: PowerShell

```powershell
$headers = @{
    "X-API-Key" = "YRwMhWyVsN4cx8CF0CyEfetDrQ2Ag0xuumo4RaOoEiI="
}

# Get all quizzes
Invoke-RestMethod -Uri "http://localhost:5079/api/quizzes" -Method GET -Headers $headers

# Get specific quiz
Invoke-RestMethod -Uri "http://localhost:5079/api/quizzes/1" -Method GET -Headers $headers

# Get quiz with answers
Invoke-RestMethod -Uri "http://localhost:5079/api/quizzes/1/answers" -Method GET -Headers $headers
```

### Option 4: cURL

```bash
# Get all quizzes
curl -H "X-API-Key: YRwMhWyVsN4cx8CF0CyEfetDrQ2Ag0xuumo4RaOoEiI=" http://localhost:5079/api/quizzes

# Get specific quiz
curl -H "X-API-Key: YRwMhWyVsN4cx8CF0CyEfetDrQ2Ag0xuumo4RaOoEiI=" http://localhost:5079/api/quizzes/1

# Get quiz with answers
curl -H "X-API-Key: YRwMhWyVsN4cx8CF0CyEfetDrQ2Ag0xuumo4RaOoEiI=" http://localhost:5079/api/quizzes/1/answers
```

### Option 5: JavaScript/Fetch

```javascript
const apiKey = 'YRwMhWyVsN4cx8CF0CyEfetDrQ2Ag0xuumo4RaOoEiI=';

// Get all quizzes
fetch('http://localhost:5079/api/quizzes', {
  headers: {
    'X-API-Key': apiKey
  }
})
.then(response => response.json())
.then(data => console.log(data));

// Get quiz with answers
fetch('http://localhost:5079/api/quizzes/1/answers', {
  headers: {
    'X-API-Key': apiKey
  }
})
.then(response => response.json())
.then(data => console.log(data));
```

### Option 6: C# HttpClient

```csharp
using System.Net.Http;
using System.Net.Http.Headers;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("X-API-Key", "YRwMhWyVsN4cx8CF0CyEfetDrQ2Ag0xuumo4RaOoEiI=");

// Get all quizzes
var response = await client.GetAsync("http://localhost:5079/api/quizzes");
var quizzes = await response.Content.ReadAsStringAsync();
Console.WriteLine(quizzes);
```

---

## ❌ Unauthorized Access

### Without API Key
If you try to access the API without the `X-API-Key` header, you'll get:

**Status Code:** `401 Unauthorized`

**Response:**
```json
{
  "error": "Unauthorized",
  "message": "API Key is missing. Please provide X-API-Key header."
}
```

### With Invalid API Key
If you provide an incorrect API key, you'll get:

**Status Code:** `401 Unauthorized`

**Response:**
```json
{
  "error": "Unauthorized",
  "message": "Invalid API Key."
}
```

---

## 🛡️ Security Best Practices

### 1. **Keep Your API Key Secret**
- Never share your API key publicly
- Don't commit it to version control (use `.gitignore`)
- Use environment variables in production

### 2. **Use HTTPS in Production**
- Always use HTTPS to encrypt API key transmission
- The API key is sent in plain text in the header

### 3. **Rotate API Keys Regularly**
- Change your API key periodically
- Immediately rotate if compromised

### 4. **Use Different Keys for Different Environments**
- Development: `dev-api-key-12345`
- Staging: `staging-api-key-67890`
- Production: `prod-secure-key-xxxxx`

### 5. **Monitor API Usage**
- Log all API requests
- Set up alerts for unusual activity
- Track which clients are using your API

### 6. **Rate Limiting (Future Enhancement)**
Consider adding rate limiting to prevent abuse:
- Limit requests per API key
- Implement throttling for excessive use

---

## 🔧 Customization

### Change the Header Name

If you want to use a different header name (e.g., `Authorization`), edit `Middleware/ApiKeyAuthMiddleware.cs`:

```csharp
private const string API_KEY_HEADER = "Authorization"; // Change this
```

### Add Multiple API Keys

To support multiple API keys, modify `appsettings.json`:

```json
{
  "ApiKeys": [
    "client-1-api-key",
    "client-2-api-key",
    "admin-api-key"
  ]
}
```

Then update the middleware to check against the array.

---

## 📊 What's Protected

All API endpoints are protected:

✅ `GET /api/quizzes` - Requires API key  
✅ `GET /api/quizzes/{id}` - Requires API key  
✅ `GET /api/quizzes/{id}/answers` - Requires API key  

**Exception:** Swagger UI is accessible without API key for documentation purposes.

---

## 🚀 Quick Test

1. **Start the API:**
   ```bash
   dotnet run
   ```

2. **Test WITHOUT API Key (Should Fail):**
   ```bash
   curl http://localhost:5079/api/quizzes
   ```
   Expected: `401 Unauthorized`

3. **Test WITH API Key (Should Work):**
   ```bash
   curl -H "X-API-Key: your-secret-api-key-12345" http://localhost:5079/api/quizzes
   ```
   Expected: `200 OK` with quiz data

---

## 📖 Additional Resources

- See `QUICK_START.md` for general usage
- See `API_DOCUMENTATION.md` for detailed API reference
- See `README.md` for project overview

---

## ⚠️ Disclaimer

This is a simple API Key authentication implementation suitable for:
- Internal APIs
- Development/Testing
- Simple access control

For production applications with user authentication, consider:
- **JWT (JSON Web Tokens)** for user-based authentication
- **OAuth 2.0** for third-party integrations
- **Azure AD / Identity Server** for enterprise applications
