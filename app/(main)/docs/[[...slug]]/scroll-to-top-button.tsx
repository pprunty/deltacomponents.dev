// components/ScrollToTopButton.tsx
'use client';

import { ArrowUp } from '@phosphor-icons/react';
import Float from '@/delta/components/floating-button';

export function ScrollToTopButton() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <Float placement="bottom-right" offset={{ x: 16, y: 16 }}>
      <button
        onClick={scrollToTop}
        className="px-2 py-2 shadow-2xl rounded-lg border dark:border-[#313131] border-gray-200 bg-gray-200 dark:bg-[#313131] hover:bg-gray-300 dark:hover:bg-[#424242] active:bg-gray-300 dark:active:bg-[#242424] opacity-80 pointer-events-auto z-50 transition-[background-color]"
        title="Scroll to top"
      >
        <ArrowUp size={20} weight="bold" />
      </button>
    </Float>
  );
}
