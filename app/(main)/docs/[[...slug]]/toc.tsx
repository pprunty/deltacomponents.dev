'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  className?: string;
}

export function TableOfContents({ className }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract headings from the page
    const elements = Array.from(document.querySelectorAll('h1, h2, h3'));
    const extractedHeadings = elements.map((element) => ({
      id: element.id,
      text: element.textContent || '',
      level: Number(element.tagName.charAt(1)),
    }));
    setHeadings(extractedHeadings);

    // Set up intersection observer to track which heading is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -100px 0px' },
    );

    // Observe all headings
    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Get the header height to offset the scroll
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerHeight;

      // Scroll to the element with smooth behavior
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className={cn('sticky top-20 hidden md:block', className)}>
      <h2 className="text-xs font-medium mb-2">On this page</h2>
      <ul className="space-y-1 text-xs">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={cn(
              'transition-colors',
              heading.level === 2 && 'ml-3',
              heading.level === 3 && 'ml-6',
              activeId === heading.id
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className="block py-0.5"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
