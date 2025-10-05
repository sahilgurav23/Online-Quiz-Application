# Theme Toggle Guide

## Quick Start

The Online Quiz Application now supports **Light** and **Dark** modes with a beautiful, modern UI.

## How to Use

### Toggle Theme
Look for the **sun/moon icon button** in the top-right corner of any page:
- **☀️ Sun Icon** = Currently in Light Mode (click to switch to Dark)
- **🌙 Moon Icon** = Currently in Dark Mode (click to switch to Light)

### Theme Locations
The theme toggle button appears on:
1. **Home Page** - Top right of the header
2. **Quiz Start Screen** - Top right corner (fixed position)
3. **Quiz Questions** - Next to the timer in the header
4. **Results Page** - Top right of the header

## Features

### 🎨 Visual Enhancements

#### Light Mode
- Clean white backgrounds
- Soft blue and purple gradients
- Dark text for optimal readability
- Subtle shadows and borders

#### Dark Mode
- Deep gray/black backgrounds
- Vibrant accent colors
- Light text for comfortable reading
- Enhanced contrast for better visibility

### 💾 Persistence
Your theme choice is **automatically saved** and will be remembered:
- Stored in browser's localStorage
- Persists across sessions
- Syncs across tabs

### 🖥️ System Integration
On first visit, the app automatically detects your system preference:
- Windows: Settings → Personalization → Colors
- macOS: System Preferences → General → Appearance
- Linux: Varies by desktop environment

### ✨ Smooth Transitions
All theme changes animate smoothly:
- Colors fade gradually
- No jarring flashes
- Consistent timing (300ms)

## Design Improvements

### Enhanced Cards
- **Hover Effects**: Cards lift and scale on hover
- **Gradient Overlays**: Subtle color gradients appear on interaction
- **Better Shadows**: Dynamic shadow depth based on state

### Improved Buttons
- **Gradient Backgrounds**: Modern gradient fills
- **Scale Animation**: Buttons grow slightly on hover
- **Enhanced Shadows**: Deeper shadows for better depth

### Better Typography
- **Geist Font Family**: Modern, clean typeface
- **Improved Hierarchy**: Clear visual structure
- **Better Contrast**: Optimized for both themes

### Polished Animations
- **Icon Transitions**: Smooth emoji and icon animations
- **Card Movements**: Subtle lift effects
- **Progress Indicators**: Animated progress bars

## Color Scheme

### Light Mode Colors
```
Background: #ffffff (white)
Foreground: #171717 (near black)
Primary: #2563eb (blue)
Accent: #f3f4f6 (light gray)
Border: #e5e7eb (gray)
```

### Dark Mode Colors
```
Background: #0a0a0a (near black)
Foreground: #ededed (off white)
Primary: #3b82f6 (bright blue)
Accent: #374151 (dark gray)
Border: #374151 (dark gray)
```

## Technical Details

### Implementation
- **React Context API** for state management
- **CSS Custom Properties** for theming
- **Tailwind CSS** for styling
- **localStorage** for persistence

### Browser Support
- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Opera 74+

## Troubleshooting

### Theme Not Saving?
- Check if localStorage is enabled in your browser
- Clear browser cache and try again
- Ensure cookies/storage is not blocked

### Theme Flashing on Load?
- This is normal on first load
- The app detects your preference quickly
- Subsequent loads will be instant

### Wrong System Theme Detected?
- Manually toggle to your preferred theme
- Your choice will override system preference
- Clear localStorage to reset to system preference

## Keyboard Shortcuts

While there's no built-in keyboard shortcut, you can:
1. Tab to the theme toggle button
2. Press Enter or Space to toggle

## Accessibility

### WCAG Compliance
- **AA Level** color contrast in both themes
- **Keyboard Navigation** fully supported
- **Screen Reader** compatible with aria-labels
- **Focus Indicators** clear and visible

### Reduced Motion
The app respects `prefers-reduced-motion` system setting for users who prefer minimal animations.

## Tips

1. **Try Both Themes**: Experiment to find your preference
2. **Match Your Environment**: Use light mode in bright rooms, dark mode in dim lighting
3. **Battery Saving**: Dark mode can save battery on OLED screens
4. **Eye Comfort**: Dark mode may reduce eye strain in low-light conditions

---

Enjoy your enhanced quiz experience! 🎉
