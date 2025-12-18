'use client';

import { useEffect, useState } from 'react';
import type React from 'react';
import { cn } from '@/lib/utils';

interface FullBleedSectionProps {
  children: React.ReactNode;
  className?: string;
  backgroundColor?: string;
  padding?: string;
  scrollbarOffset?: string; // Optional manual offset
  onlyMobile?: boolean; // Only apply full-bleed on mobile devices
}

export default function FullBleedSection({
  children,
  className,
  backgroundColor = 'bg-gray-100 dark:bg-gray-800',
  padding = '',
  scrollbarOffset,
  onlyMobile = false,
}: FullBleedSectionProps) {
  const [offset, setOffset] = useState<string>('50%');

  useEffect(() => {
    // If manual offset is provided, use it
    if (scrollbarOffset) {
      setOffset(scrollbarOffset);
      return;
    }

    // Calculate scrollbar width dynamically
    const calculateScrollbarWidth = () => {
      // Difference between window inner width and document client width
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      if (scrollbarWidth > 0) {
        // For a 15px scrollbar width, we want 48.22%
        // So we calculate the offset percentage based on that ratio
        const offsetPercentage = 50 - (scrollbarWidth / 15) * (50 - 48.22);
        setOffset(`${offsetPercentage.toFixed(2)}%`);
      } else {
        setOffset('50%');
      }
    };

    calculateScrollbarWidth();

    // Recalculate on resize
    window.addEventListener('resize', calculateScrollbarWidth);
    return () => window.removeEventListener('resize', calculateScrollbarWidth);
  }, [scrollbarOffset]);

  // If onlyMobile is true, only apply full-bleed on mobile devices
  if (onlyMobile) {
    return (
      <div className="relative w-full my-8">
        <div className={cn('relative overflow-hidden md:overflow-visible', backgroundColor, className)}>
          {/* Mobile: Full-bleed */}
          <div
            className="md:hidden"
            style={{
              width: '100vw',
              left: offset,
              transform: 'translateX(-50%)',
              position: 'relative',
            }}
          >
            <div className={cn('mx-auto max-w-2xl lg:px-8', padding)}>{children}</div>
          </div>
          {/* Desktop: Normal container */}
          <div className="hidden md:block">
            <div className={cn('mx-auto max-w-2xl lg:px-8', padding)}>{children}</div>
          </div>
        </div>
      </div>
    );
  }

  // Default behavior: full-bleed on all devices
  return (
    <div className="relative w-full my-8">
      <div
        className={cn('relative overflow-hidden', backgroundColor, className)}
        style={{
          width: '100vw',
          left: offset,
          transform: 'translateX(-50%)',
          position: 'relative',
        }}
      >
        <div className={cn('mx-auto max-w-2xl lg:px-8', padding)}>{children}</div>
      </div>
    </div>
  );
}