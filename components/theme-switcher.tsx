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
    setCurrentTheme(themeEffect());
  }, [preference]);

  useEffect(() => {
    window.addEventListener('storage', onStorageChange);
    return () => window.removeEventListener('storage', onStorageChange);
  }, [onStorageChange]);

  return (
    <>
      {/* Removed hover-based descriptor */}
      <button
        aria-label="Toggle theme"
        className="inline-flex rounded-md hover:bg-accent hover:text-accent-foreground transition-[background-color]  p-2 theme-system:!bg-inherit [&_.sun-icon]:hidden dark:[&_.moon-icon]:hidden dark:[&_.sun-icon]:inline"
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
