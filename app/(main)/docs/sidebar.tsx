'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Search from './search';
import { useEffect, useState } from 'react';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { getCategories, type CategoryType } from '@/lib/registry';

// Navigation items configuration
const navigationItems = {
  basics: {
    title: 'Basics',
    items: [
      { href: '/docs/introduction', label: 'Introduction' },
      { href: '/docs/getting-started', label: 'Getting Started' }
    ]
  }
};

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [isLoaded, setIsLoaded] = useState(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    };
    fetchCategories();
  }, []);

  // Set isLoaded to true after component mount to trigger the animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const isActive = (path: string) => {
    // For the homepage/root path, only match exact
    if (path === '/') {
      return pathname === '/';
    }
    // For other paths, check if pathname starts with the path
    return pathname.startsWith(path);
  };

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col w-[250px] border-r border-dotted border-border dark:bg-[#161716] bg-background',
        'fixed top-0 h-screen',
        'transition-transform duration-500 ease-out',
        isLoaded ? 'translate-x-0' : '-translate-x-full',
        className,
      )}
    >
      {/* Search section */}
      <div className="bg-inherit z-10 pt-4 pb-4">
        <div className="flex flex-col px-4">
          <div className="flex items-center mb-4">
            <Link href="/" className="flex items-center">
              <svg
                className="fill-foreground dark:fill-foreground transition-colors"
                width="24"
                height="24"
                viewBox="0 0 282 308"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M280.438 295.396L152.117 5.66075C151.645 3.87252 150.584 2.32152 149.12 1.29292C147.665 0.264327 145.896 -0.172778 144.147 0.0619372H120.258C118.509 -0.172778 116.74 0.264327 115.285 1.29292C113.821 2.32152 112.76 3.87252 112.288 5.66075L0.780777 295.396C0.171502 296.774 -0.0839596 298.294 0.0241376 299.81C0.132235 301.327 0.603995 302.788 1.40981 304.052C2.2058 305.318 3.30641 306.345 4.58392 307.034C5.87126 307.725 7.30596 308.054 8.75053 307.993H272.92C279.111 307.993 284.86 300.528 280.438 295.396ZM122.469 127.434L177.775 250.605C178.384 252.07 178.65 253.664 178.551 255.257C178.453 256.85 177.991 258.395 177.215 259.765C176.429 261.133 175.358 262.286 174.07 263.128C172.783 263.969 171.329 264.475 169.815 264.602H68.037C66.4941 264.493 64.9807 264.019 63.6246 263.213C62.2685 262.408 61.1089 261.293 60.2146 259.951C59.3204 258.607 58.7307 257.07 58.4752 255.454C58.2197 253.836 58.318 252.18 58.7504 250.605L106.539 127.434C107.266 125.856 108.397 124.525 109.802 123.594C111.207 122.663 112.838 122.169 114.499 122.169C116.17 122.169 117.791 122.663 119.206 123.594C120.612 124.525 121.741 125.856 122.469 127.434Z" />
              </svg>
              <span className="font-medium text-sm ml-2 text-foreground">deltacomponents.dev</span>
            </Link>
          </div>
          <div className="mb-4">
            <Search mobileOnly={false} />
          </div>
        </div>
        <div className="h-px w-full border-t border-dotted border-border"></div>
      </div>

      {/* Main navigation with scrollable content */}
      <div className="grow overflow-y-auto px-5 relative">
        {/* Basics Section */}
        {Object.entries(navigationItems).map(([key, section]) => (
          <div key={key} className="mb-5">
            <span className="text-xs text-muted-foreground/60 font-medium inline-block mb-2">
              {section.title}
            </span>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'h-7 flex items-center font-medium text-[13px] px-2 -ml-2 rounded-md w-[calc(100%+8px)]',
                      'hover:bg-accent/50 transition-colors',
                      isActive(item.href)
                        ? 'bg-accent text-primary'
                        : 'text-muted-foreground',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Divider between sections */}
            <div aria-hidden="true" className="h-px w-full border-t border-dotted border-border my-5"></div>
          </div>
        ))}

        {/* Components Sections */}
        {categories.map((category) => (
          <div key={category.title} className="mb-5">
            <span className="text-xs text-muted-foreground/60 font-medium inline-block mb-2">
              {category.title}
            </span>
            <ul className="space-y-1">
              {category.items.map((item) => (
                <li key={item.name}>
                  <Link
                    href={`/docs/ui/${item.name}`}
                    className={cn(
                      'h-7 flex items-center font-medium text-[13px] px-2 -ml-2 rounded-md w-[calc(100%+8px)]',
                      'hover:bg-accent/50 transition-colors',
                      isActive(`/docs/ui/${item.name}`)
                        ? 'bg-accent text-primary'
                        : 'text-muted-foreground',
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Divider between sections */}
            {category !== categories[categories.length - 1] && (
              <div aria-hidden="true" className="h-px w-full border-t border-dotted border-border my-5"></div>
            )}
          </div>
        ))}
      </div>

      {/* Footer section with border */}
      <div className="px-4 border-t border-dotted border-border">
        <div className="flex items-center justify-between h-12">
          <ThemeSwitcher />
          <Link
            href="https://github.com/pprunty/deltacomponents.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-md hover:bg-accent/50 transition-[background-color] p-2"
            aria-label="GitHub repository"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              className="text-accent-foreground"
            >
              <path
                fill="currentColor"
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </aside>
  );
}
