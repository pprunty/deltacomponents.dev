// src/ClientSideScrollRestorer.tsx
'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const ClientSideScrollRestorer = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only restore scroll position if we're navigating to a new page
    if (typeof window !== 'undefined') {
      const savedPosition = sessionStorage.getItem(`scrollPosition-${pathname}${searchParams}`);
      if (savedPosition) {
        const { x, y } = JSON.parse(savedPosition);
        window.scrollTo(x, y);
      }
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(
          `scrollPosition-${pathname}${searchParams}`,
          JSON.stringify({ x: window.scrollX, y: window.scrollY })
        );
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, searchParams]);

  return null;
};

export default ClientSideScrollRestorer;
