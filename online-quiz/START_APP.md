# How to Start the Application

## PowerShell Execution Policy Issue

If you encounter the error about scripts being disabled, you have two options:

### Option 1: Use Command Prompt (Recommended)
1. Open **Command Prompt** (cmd.exe)
2. Navigate to the project directory:
   ```cmd
   cd d:\Projects\Online-Quiz-Application\online-quiz
   ```
3. Run the development server:
   ```cmd
   npm run dev
   ```

### Option 2: Enable PowerShell Scripts (Temporary)
1. Open PowerShell as Administrator
2. Run:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
   ```
3. Navigate to the project directory:
   ```powershell
   cd d:\Projects\Online-Quiz-Application\online-quiz
   ```
4. Run the development server:
   ```powershell
   npm run dev
   ```

## Starting the Application

Once you've resolved the execution policy:

1. **Start the Backend API** (if not already running):
   ```cmd
   cd d:\Projects\Online-Quiz-Application\Quiz Api\Quiz Api
   dotnet run
   ```
   The API should start at: http://localhost:5079

2. **Start the Frontend** (in a new terminal):
   ```cmd
   cd d:\Projects\Online-Quiz-Application\online-quiz
   npm run dev
   ```
   The app should start at: http://localhost:3000

3. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

## Testing the New Features

### Light/Dark Mode Toggle
1. Look for the **sun/moon icon** in the top-right corner
2. Click it to toggle between light and dark modes
3. Refresh the page - your preference should be saved
4. Navigate between pages - the theme should persist

### UI Enhancements
1. **Home Page**: Hover over quiz cards to see animations
2. **Quiz Start**: Notice the polished start screen
3. **Quiz Questions**: See the smooth transitions and progress bar
4. **Results Page**: Check the enhanced score display and detailed results

## What's New

✅ **Light/Dark Mode Toggle** - Available on all pages
✅ **Theme Persistence** - Saves your preference in localStorage
✅ **System Preference Detection** - Auto-detects your OS theme
✅ **Smooth Animations** - Enhanced hover effects and transitions
✅ **Modern Card Design** - Gradient overlays and better shadows
✅ **Improved Typography** - Using Geist font family
✅ **Better Buttons** - Gradient backgrounds with scale effects
✅ **Enhanced Colors** - Optimized palette for both themes

## Troubleshooting

### Theme Not Changing?
- Clear browser cache (Ctrl+Shift+Delete)
- Check browser console for errors (F12)
- Ensure JavaScript is enabled

### API Connection Issues?
- Verify the backend API is running at http://localhost:5079
- Check CORS settings in the API
- Look for errors in browser console

### Styling Issues?
- Run `npm install` to ensure all dependencies are installed
- Delete `.next` folder and restart: `npm run dev`
- Check that Tailwind CSS is properly configured

## Browser Compatibility

Tested and working on:
- ✅ Chrome 88+
- ✅ Edge 88+
- ✅ Firefox 85+
- ✅ Safari 14+

## Need Help?

Check these files for more information:
- `UI_ENHANCEMENTS.md` - Detailed feature documentation
- `THEME_GUIDE.md` - Theme usage guide
- `FRONTEND_GUIDE.md` - Frontend setup guide
- `TROUBLESHOOTING.md` - Common issues and solutions

---

Enjoy your enhanced quiz application! 🎉
