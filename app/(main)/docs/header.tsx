'use client';

import Link from 'next/link';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Cross as Hamburger } from 'hamburger-react';
import Search from './search';
import Drawer from '@/delta/components/drawer';
import { usePathname, useRouter } from 'next/navigation';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLinkClick = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  return (
    <header
      className={cn(
        'flex items-center h-12 border-b relative z-[48] px-4',
        'bg-background border-dotted border-border',
        'lg:hidden', // Hide the entire header on large screens
        className,
      )}
    >
      {/* Mobile hamburger menu */}
      <div className="flex items-center gap-1 shrink-0">
        <div className="mx-[-10px]">
          <Drawer
            open={isOpen}
            onOpenChange={setOpen}
            trigger={<Hamburger toggled={isOpen} toggle={setOpen} size={16} />}
            title="Delta Components"
            showCloseButton={false}
          >
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="text-sm font-medium text-muted-foreground">Navigation</div>
                <nav className="flex flex-col space-y-2">
                  <Link 
                    href="/getting-started" 
                    className={cn(
                      "px-3 py-2 rounded-md hover:bg-accent transition-colors",
                      pathname === '/getting-started' && "bg-accent text-accent-foreground font-medium"
                    )}
                    onClick={() => handleLinkClick('/getting-started')}
                  >
                    Guide
                  </Link>
                  <Link 
                    href="/" 
                    className={cn(
                      "px-3 py-2 rounded-md hover:bg-accent transition-colors",
                      pathname === '/' && "bg-accent text-accent-foreground font-medium"
                    )}
                    onClick={() => handleLinkClick('/')}
                  >
                    Components
                  </Link>
                </nav>
              </div>

              <div className="border-t border-border pt-4">
                <div className="text-sm font-medium text-muted-foreground mb-3">Links</div>
                <div className="space-y-2">
                  <a
                    href="https://github.com/pprunty/deltacomponents.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-md hover:bg-accent transition-colors flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      className="text-foreground"
                    >
                      <path
                        fill="currentColor"
                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                      />
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </Drawer>
        </div>
      </div>

      {/* Mobile search */}
      <div className="flex-grow mx-2">
        <Search mobileOnly={false} />
      </div>

      {/* Icons section - pushed to the right */}
      <div className="flex items-center gap-1 shrink-0 ml-auto">
        <a
          href="https://github.com/pprunty/deltacomponents.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-md hover:bg-accent transition-colors p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            className="text-foreground"
          >
            <path
              fill="currentColor"
              d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
            />
          </svg>
        </a>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
