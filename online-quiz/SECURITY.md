# 🔒 Frontend Security Configuration

## API Key Authentication

The Quiz API requires API Key authentication. All requests from the frontend include the `X-API-Key` header.

## Configuration

### Environment Variables

Create a `.env.local` file in the `online-quiz` directory:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5079/api

# API Key (must match backend configuration)
NEXT_PUBLIC_API_KEY=YRwMhWyVsN4cx8CF0CyEfetDrQ2Ag0xuumo4RaOoEiI=
```

### Default Configuration

If no `.env.local` file is present, the app uses these defaults:
- **API URL**: `http://localhost:5079/api`
- **API Key**: `YRwMhWyVsN4cx8CF0CyEfetDrQ2Ag0xuumo4RaOoEiI=`

## How It Works

The API client (`src/lib/api.ts`) automatically includes the API key in all requests:

```typescript
headers: {
  'Content-Type': 'application/json',
  'X-API-Key': 'YRwMhWyVsN4cx8CF0CyEfetDrQ2Ag0xuumo4RaOoEiI='
}
```

## Error Handling

### 401 Unauthorized
If the API key is invalid or missing, you'll see:
```
Error: Unauthorized: Invalid or missing API key
```

**Solution**: 
1. Check your `.env.local` file
2. Verify the API key matches the backend configuration
3. Restart the dev server after changing environment variables

### API Key Mismatch
If frontend and backend API keys don't match:
1. Check backend `appsettings.json` for the correct key
2. Update `NEXT_PUBLIC_API_KEY` in `.env.local`
3. Restart both frontend and backend

## Security Best Practices

### ⚠️ Important Security Notes

1. **API Key Exposure**: The API key is visible in the browser since it's a public environment variable (`NEXT_PUBLIC_*`). This is acceptable for:
   - Development environments
   - Internal applications
   - APIs that don't contain sensitive data

2. **Production Considerations**: For production applications with sensitive data, consider:
   - Implementing a backend-for-frontend (BFF) pattern
   - Using server-side API calls only
   - Implementing user authentication (JWT, OAuth)
   - Adding rate limiting per user/session

3. **Environment Variables**: 
   - Never commit `.env.local` to version control
   - Use different API keys for dev/staging/production
   - Rotate keys regularly

### Development vs Production

**Development** (Current Setup):
```env
NEXT_PUBLIC_API_KEY=YRwMhWyVsN4cx8CF0CyEfetDrQ2Ag0xuumo4RaOoEiI=
```

**Production** (Recommended):
- Use environment variables in your hosting platform (Vercel, Netlify, etc.)
- Generate a unique production API key
- Consider implementing server-side API routes

## Testing Authentication

### Test with Valid Key
```bash
# Should work
curl -H "X-API-Key: YRwMhWyVsN4cx8CF0CyEfetDrQ2Ag0xuumo4RaOoEiI=" \
  http://localhost:5079/api/quizzes
```

### Test with Invalid Key
```bash
# Should return 401
curl -H "X-API-Key: invalid-key" \
  http://localhost:5079/api/quizzes
```

### Test without Key
```bash
# Should return 401
curl http://localhost:5079/api/quizzes
```

## Deployment Configuration

### Vercel
1. Go to Project Settings → Environment Variables
2. Add:
   - `NEXT_PUBLIC_API_URL` = Your production API URL
   - `NEXT_PUBLIC_API_KEY` = Your production API key
3. Redeploy

### Netlify
1. Go to Site Settings → Build & Deploy → Environment
2. Add the same variables
3. Trigger new deployment

### Other Platforms
Set environment variables according to your platform's documentation.

## Troubleshooting

### Issue: "Unauthorized: Invalid or missing API key"
**Cause**: API key mismatch or not configured

**Solutions**:
1. Create `.env.local` with correct API key
2. Restart dev server: `npm run dev`
3. Check backend API key in `appsettings.json`
4. Verify no typos in the API key

### Issue: Changes to .env.local not working
**Cause**: Next.js caches environment variables

**Solution**: Restart the dev server
```bash
# Stop server (Ctrl+C)
npm run dev
```

### Issue: API key visible in browser
**Cause**: This is expected behavior for `NEXT_PUBLIC_*` variables

**Solution**: This is acceptable for development. For production with sensitive data, implement server-side API calls.

## Alternative: Server-Side API Calls

For enhanced security, you can move API calls to server-side:

### Create API Route
```typescript
// app/api/quizzes/route.ts
import { quizApi } from '@/lib/api';

export async function GET() {
  const quizzes = await quizApi.getAllQuizzes();
  return Response.json(quizzes);
}
```

### Update Client Code
```typescript
// Instead of calling API directly
const response = await fetch('/api/quizzes');
const quizzes = await response.json();
```

This way, the API key stays on the server and is never exposed to the browser.

## Summary

✅ **Current Setup**: API key authentication implemented  
✅ **Default Key**: Configured for development  
✅ **Error Handling**: 401 errors properly handled  
⚠️ **Production**: Consider server-side API calls for sensitive data  
📝 **Configuration**: Use `.env.local` for custom settings  

---

**For backend security configuration, see the Quiz API Security Guide.**
