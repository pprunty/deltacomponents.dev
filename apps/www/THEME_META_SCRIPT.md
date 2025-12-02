# Theme Meta Color Script

This script dynamically updates the browser's theme color to match your app's current theme, preventing flickering during page load.

## How it Works

1. **Runs before hydration** - Placed in `<head>` to execute immediately
2. **Reads theme from localStorage** - Gets user's theme preference 
3. **Detects light/dark mode** - Checks system preference or saved setting
4. **Updates meta theme-color** - Sets browser chrome color to match theme

## For Multi-Theme Projects

```tsx
// lib/config.ts
export const THEME_META_COLORS = {
  default: { light: "#ffffff", dark: "#0a0a0a" },
  custom: { light: "#f8f9fa", dark: "#212529" },
}

// app/layout.tsx
<script
  dangerouslySetInnerHTML={{
    __html: `
      try {
        const themeColors = ${JSON.stringify(THEME_META_COLORS)};
        const activeTheme = localStorage['active-theme'] || 'default';
        const isDark = localStorage.theme === 'dark' || 
          ((!('theme' in localStorage) || localStorage.theme === 'system') && 
          window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        if (themeColors[activeTheme]) {
          const themeColor = isDark ? themeColors[activeTheme].dark : themeColors[activeTheme].light;
          document.querySelector('meta[name="theme-color"]').setAttribute('content', themeColor);
        }
      } catch (_) {}
    `,
  }}
/>
<meta name="theme-color" content={THEME_META_COLORS.default.light} />
```

## For Single Theme Projects

```tsx
// app/layout.tsx
<script
  dangerouslySetInnerHTML={{
    __html: `
      try {
        const isDark = localStorage.theme === 'dark' || 
          ((!('theme' in localStorage) || localStorage.theme === 'system') && 
          window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        const themeColor = isDark ? '#0a0a0a' : '#ffffff';
        document.querySelector('meta[name="theme-color"]').setAttribute('content', themeColor);
      } catch (_) {}
    `,
  }}
/>
<meta name="theme-color" content="#ffffff" />
```

## Benefits

- **No flicker** - Browser chrome matches theme immediately
- **Better UX** - Seamless theme transitions
- **Mobile optimization** - Status bar color matches app theme
- **Fast execution** - Runs before React hydration

## Requirements

- Must be in `<head>` section
- Requires `meta[name="theme-color"]` element
- Theme colors should match your CSS variables
- Use `suppressHydrationWarning` on `<html>` element