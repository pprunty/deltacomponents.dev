// components/ScrollToTopButton.tsx
'use client';

import { ArrowUp } from '@phosphor-icons/react';
import Float from '@/delta/components/floating-button';

export function ScrollToTopButton() {
  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <Float placement="bottom-right" offset={16}>
      <button
        onClick={scrollToTop}
        className="inline-flex items-center justify-center rounded-md border border-input bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-3 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        title="Scroll to top"
      >
        <ArrowUp size={20} weight="bold" />
      </button>
    </Float>
  );
}
