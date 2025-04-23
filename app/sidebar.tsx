"use client";

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Search from './search';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

  return (
    <aside className={cn("hidden md:block w-72 border-r border-border h-screen fixed left-0 top-0 pt-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", className)}>
      <div className="px-3">
        <Search />
      </div>
      <nav className="px-3 py-3">
        <div className="space-y-1">
          <Link
            href="/getting-started"
            className={cn(
              "flex items-center gap-2 px-2 py-1.5 rounded-sm text-xs font-medium transition-colors",
              isActive('/getting-started')
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
            )}
          >
            Getting Started
          </Link>
          <Link
            href="/"
            className={cn(
              "flex items-center gap-2 px-2 py-1.5 rounded-sm text-xs font-medium transition-colors",
              isActive('/docs')
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
            )}
          >
            Components
          </Link>
        </div>
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-3 py-6 border-t border-border">
        {/* Additional components will be added here later */}
      </div>
    </aside>
  );
} 