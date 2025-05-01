'use client';

import { useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { themeEffect } from './theme-effect';
import { Moon, Sun } from '@phosphor-icons/react';

export function ThemeSwitcher() {
  const [preference, setPreference] = useState<undefined | null | string>(
    undefined,
  );
  const [currentTheme, setCurrentTheme] = useState<null | string>(null);

  const onMediaChange = useCallback(() => {
    const current = themeEffect();
    setCurrentTheme(current);
  }, []);

  // Update meta theme color based on current theme
  const updateMetaThemeColor = useCallback((theme: string) => {
    const color = theme === 'dark' ? '#111111' : '#ffffff';
    // Find existing meta tag
    const metaThemeColor = document.head.querySelector('meta[name=theme-color]');

    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', color);
    } else {
      // Create meta tag if it doesn't exist
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = color;
      document.head.appendChild(meta);
    }
  }, []);

  useLayoutEffect(() => {
    // Default to system theme on initial load (if no value is stored)
    setPreference(localStorage.getItem('theme'));
    const current = themeEffect();
    setCurrentTheme(current);

    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
    matchMedia.addEventListener('change', onMediaChange);
    return () => matchMedia.removeEventListener('change', onMediaChange);
  }, [onMediaChange]);

  const onStorageChange = useCallback((event: StorageEvent) => {
    if (event.key === 'theme') setPreference(event.newValue);
  }, []);

  useEffect(() => {
    const newTheme = themeEffect();
    setCurrentTheme(newTheme);

    // Update meta theme color whenever theme changes
    if (newTheme) {
      updateMetaThemeColor(newTheme);
    }
  }, [preference, updateMetaThemeColor]);

  useEffect(() => {
    window.addEventListener('storage', onStorageChange);
    return () => window.removeEventListener('storage', onStorageChange);
  }, [onStorageChange]);

  return (
    <>
      {/* Removed hover-based descriptor */}
      <button
        aria-label="Toggle theme"
        className="inline-flex rounded-md hover:bg-accent hover:text-accent-foreground transition-[background-color] p-2 theme-system:!bg-inherit [&_.sun-icon]:hidden dark:[&_.moon-icon]:hidden dark:[&_.sun-icon]:inline"
        onClick={(ev) => {
          ev.preventDefault();
          // Toggle strictly between dark and light
          const newPreference = currentTheme === 'dark' ? 'light' : 'dark';
          localStorage.setItem('theme', newPreference);
          setPreference(newPreference);
        }}
      >
        <span className="sun-icon">
          <Sun size={16} />
        </span>
        <span className="moon-icon">
          <Moon size={16} />
        </span>
      </button>
    </>
  );
}

export default ThemeSwitcher;
