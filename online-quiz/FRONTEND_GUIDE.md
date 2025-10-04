# 🎯 Frontend Quick Start Guide

## Overview

This Next.js frontend application connects to the ASP.NET Core Quiz API to provide an interactive quiz-taking experience.

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Quiz API running at http://localhost:5079

## Installation

```bash
cd online-quiz
npm install
```

## Running the Application

### Development Mode
```bash
npm run dev
```
Open http://localhost:3000 in your browser.

### Production Build
```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Home page - Quiz listing
│   ├── quiz/[id]/
│   │   ├── page.tsx               # Quiz taking page
│   │   └── results/page.tsx       # Results page
│   ├── layout.tsx                 # Root layout
│   └── globals.css                # Global styles
├── components/
│   └── QuizInterface.tsx          # Main quiz component (client-side)
├── lib/
│   └── api.ts                     # API client for backend communication
└── types/
    └── quiz.ts                    # TypeScript type definitions
```

## Key Features

### 1. Quiz Listing (Home Page)
- Fetches all quizzes from `/api/quizzes`
- Displays quiz cards with title, description, and question count
- Error handling for API connection issues

### 2. Quiz Taking Interface
- **Timer**: Tracks elapsed time
- **Progress Bar**: Visual progress indicator
- **Question Navigator**: Grid showing all questions and their status
- **Answer Selection**: Radio button style selection
- **Navigation**: Previous/Next buttons
- **State Management**: Stores answers in component state

### 3. Results Page
- Fetches correct answers from `/api/quizzes/{id}/answers`
- Calculates score percentage
- Shows detailed breakdown of each question
- Visual indicators for correct/incorrect answers
- Option to retake quiz

## API Integration

The app uses three API endpoints:

```typescript
// Get all quizzes (without answers)
GET /api/quizzes

// Get specific quiz (without answers)
GET /api/quizzes/{id}

// Get quiz with correct answers
GET /api/quizzes/{id}/answers
```

## Configuration

### API URL and Authentication

Default: `http://localhost:5079/api`

To change, create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://your-api-url/api
NEXT_PUBLIC_API_KEY=YRwMhWyVsN4cx8CF0CyEfetDrQ2Ag0xuumo4RaOoEiI=
```

**Important**: The API key must match the backend configuration in `appsettings.json`.

See [SECURITY.md](SECURITY.md) for detailed security configuration.

## Technologies

- **Next.js 15.5.4** - App Router with Server Components
- **React 19.1.0** - UI library
- **TypeScript 5** - Type safety
- **TailwindCSS 4** - Styling
- **Server & Client Components** - Optimized rendering

## Common Issues

### API Connection Error
**Problem**: "Unable to Load Quizzes" error on home page

**Solution**: 
1. Ensure Quiz API is running at http://localhost:5079
2. Check API URL in browser: http://localhost:5079/api/quizzes
3. Verify CORS is enabled in the API

### Quiz Not Found
**Problem**: 404 error when clicking a quiz

**Solution**: 
1. Verify the quiz ID exists in the database
2. Check API response at http://localhost:5079/api/quizzes/{id}

### Results Not Loading
**Problem**: Error on results page

**Solution**: 
1. Complete the quiz properly before viewing results
2. Don't refresh the page during quiz (session storage will be lost)
3. Check browser console for errors

## Development Tips

### Hot Reload
Next.js automatically reloads when you save files. Changes to:
- `page.tsx` files - Server components
- `QuizInterface.tsx` - Client component
- `globals.css` - Styles

### Type Safety
All API responses are typed. Check `src/types/quiz.ts` for type definitions.

### Debugging
- Check browser console for errors
- Use React DevTools for component inspection
- Check Network tab for API calls

## Building for Production

```bash
# Create optimized production build
npm run build

# Test production build locally
npm start

# Or deploy to Vercel
vercel deploy
```

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Set environment variable: `NEXT_PUBLIC_API_URL`
4. Deploy

### Other Platforms
- Netlify
- AWS Amplify
- Azure Static Web Apps
- Docker container

## Next Steps

- Add user authentication
- Implement quiz categories
- Add quiz search/filter
- Create admin panel for quiz management
- Add social sharing features
- Implement leaderboards

---

**Need help?** Check the main README.md or API documentation.
