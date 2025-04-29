'use client';

import { useEffect } from 'react';
import ClientSideScrollRestorer from '@/components/client-side-scroll-restorer';
import { themeEffect } from '@/components/theme-effect';

// Component to handle theme changes during navigation
const ThemeWatcher = () => {
  useEffect(() => {
    // Initial setup
    themeEffect();

    // Listen for theme changes from localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme') {
        themeEffect();
      }
    };

    // Set up listeners
    window.addEventListener('storage', handleStorageChange);
    
    // Clean up
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return null;
};

export default function ClientComponents() {
  return (
    <>
      <ThemeWatcher />
      <ClientSideScrollRestorer />
    </>
  );
}
