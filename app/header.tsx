"use client";

import Link from 'next/link';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger } from '@/delta/components/tabs';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Cross as Hamburger } from 'hamburger-react';
import Search from './search';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);

  // Determine the active tab based on the current path
  const getActiveTab = () => {
    if (pathname === '/') return 'components';
    if (pathname === '/getting-started') return 'guide';
    return 'home';
  };

  const handleTabChange = (value: string) => {
    if (value === 'guide') {
      router.push('/getting-started');
    } else if (value === 'components') {
      router.push('/');
    }
  };

  return (
    <header className={cn("flex items-center justify-between gap-6 px-4 h-12 border-b relative z-50", className)}>
      <div className="flex items-center gap-1 sm:gap-6">
        <div className="md:hidden ml-[-10px]">
          <Hamburger toggled={isOpen} toggle={setOpen} size={16} />
        </div>
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
        </Link>

        <div className="hidden md:block">
          <Tabs defaultValue={getActiveTab()} onValueChange={handleTabChange} className="w-[400px] mb-[-12px]">
            <TabsList className="grid w-full grid-cols-2 relative" activeIndicatorOffset={0}>
              <TabsTrigger value="guide">Guide</TabsTrigger>
              <TabsTrigger value="components">Components</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {/* Mobile search icon */}
        <div className="md:hidden">
          <Search mobileOnly={true} />
        </div>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
