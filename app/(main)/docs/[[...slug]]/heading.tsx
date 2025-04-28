'use client';

import { cn } from '@/lib/utils';
import React from 'react';

// Helper function to generate slug from text
const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
};

interface HeadingProps {
  level: number;
  children: React.ReactNode;
}

// Keep track of used IDs to ensure uniqueness
const usedIds = new Set<string>();

export function Heading({ level, children }: HeadingProps) {
  const text = React.Children.toArray(children).join('');
  let id = slugify(text);

  // Ensure unique ID
  let counter = 1;
  while (usedIds.has(id)) {
    id = `${slugify(text)}-${counter}`;
    counter++;
  }
  usedIds.add(id);

  return React.createElement(
    `h${level}`,
    {
      id,
      className: cn(
        'group relative scroll-mt-20', // Add scroll-mt for better scroll positioning
        level === 1 && 'text-3xl font-bold mt-8 mb-4',
        level === 2 && 'text-2xl font-bold mt-6 mb-3',
        level === 3 && 'text-xl font-bold mt-4 mb-2',
      ),
    },
    <>
      <span className="absolute -left-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <a
          href={`#${id}`}
          className="text-muted-foreground hover:text-foreground"
          onClick={(e) => {
            e.preventDefault();
            const element = document.getElementById(id);
            if (element) {
              const headerOffset = 80; // Adjust this value based on your header height
              const elementPosition = element.getBoundingClientRect().top;
              const offsetPosition =
                elementPosition + window.pageYOffset - headerOffset;

              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
              });
            }
          }}
        >
          #
        </a>
      </span>
      {children}
    </>,
  );
}
