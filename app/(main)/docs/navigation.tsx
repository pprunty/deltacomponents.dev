'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCategories, type CategoryType } from '@/lib/registry';

// Navigation items configuration
export const navigationItems = {
  basics: {
    title: 'Basics',
    items: [
      { href: '/docs/introduction', label: 'Introduction' },
      { href: '/docs/getting-started', label: 'Getting Started' }
    ]
  }
};

interface NavigationProps {
  className?: string;
  onLinkClick?: (path: string) => void;
  variant?: 'sidebar' | 'drawer';
}

export function Navigation({ className, onLinkClick, variant = 'sidebar' }: NavigationProps) {
  const pathname = usePathname();
  const [categories, setCategories] = useState<CategoryType[]>([]);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    };
    fetchCategories();
  }, []);

  const isActive = (path: string) => {
    // For the homepage/root path, only match exact
    if (path === '/') {
      return pathname === '/';
    }
    // For other paths, check if pathname starts with the path
    return pathname.startsWith(path);
  };
  
  const handleClick = (path: string) => {
    if (onLinkClick) {
      onLinkClick(path);
    }
  };

  // Different styles based on variant
  const getLinkClassName = (isActiveLink: boolean) => {
    if (variant === 'sidebar') {
      return cn(
        'h-7 flex items-center font-medium text-[13px] px-2 -ml-2 rounded-md w-[calc(100%+8px)]',
        'hover:bg-accent/50 transition-colors',
        isActiveLink
          ? 'bg-accent text-primary'
          : 'text-muted-foreground'
      );
    } else {
      return cn(
        'px-3 py-2 rounded-md hover:bg-accent transition-colors',
        isActiveLink && 'bg-accent text-accent-foreground font-medium'
      );
    }
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Basics Section */}
      {Object.entries(navigationItems).map(([key, section]) => (
        <div key={key} className={variant === 'sidebar' ? 'mb-5' : 'space-y-3'}>
          <span className="text-xs text-muted-foreground/60 font-medium inline-block mb-2">
            {section.title}
          </span>
          <ul className={variant === 'sidebar' ? 'space-y-1' : 'flex flex-col space-y-2'}>
            {section.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={getLinkClassName(isActive(item.href))}
                  onClick={() => handleClick(item.href)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Divider between sections - only for sidebar */}
          {variant === 'sidebar' && (
            <div aria-hidden="true" className="h-px w-full border-t border-dotted border-border my-5"></div>
          )}
        </div>
      ))}

      {/* Components Sections */}
      {categories.map((category, index) => (
        <div key={category.title} className={variant === 'sidebar' ? 'mb-5' : 'space-y-3'}>
          <span className="text-[13px] text-muted-foreground/60 font-medium inline-block mb-2">
            {category.title}
          </span>
          <ul className={variant === 'sidebar' ? 'space-y-1' : 'flex flex-col space-y-2'}>
            {category.items.map((item) => (
              <li key={item.name}>
                <Link
                  href={`/docs/ui/${item.name}`}
                  className={getLinkClassName(isActive(`/docs/ui/${item.name}`))}
                  onClick={() => handleClick(`/docs/ui/${item.name}`)}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Divider between sections - for sidebar only */}
          {variant === 'sidebar' && index < categories.length - 1 && (
            <div aria-hidden="true" className="h-px w-full border-t border-dotted border-border my-5"></div>
          )}
        </div>
      ))}
    </div>
  );
} 