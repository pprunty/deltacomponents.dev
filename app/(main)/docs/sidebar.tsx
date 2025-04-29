'use client';

import { cn } from '@/lib/utils';
import Search from './search';
import { useEffect, useState } from 'react';
import { Navigation } from './navigation';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Set isLoaded to true after component mount to trigger the animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col w-[250px] border-r border-dotted border-border bg-background',
        'fixed top-0 h-screen',
        'transition-transform duration-500 ease-out',
        isLoaded ? 'translate-x-0' : '-translate-x-full',
        className,
      )}
    >
      {/* Search section */}
      <div className="bg-inherit z-10 pt-12 pb-4">
        <div className="flex flex-col px-4">
          <div className="mb-4">
            <Search mobileOnly={false} />
          </div>
        </div>
        <div className="h-px w-full border-t border-dotted border-border"></div>
      </div>

      {/* Main navigation with scrollable content */}
      <div className="grow overflow-y-auto px-5 relative">
        <Navigation variant="sidebar" />
      </div>
    </aside>
  );
}
