'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import { useMemo } from 'react';
import { componentRegistry } from '@/delta/mapping';
import { componentMetadata } from '@/app/routes';

// Navigation item with title, path and priority
interface NavItem {
  title: string;
  path: string;
  priority: number;
}

// Map of component paths to priority (for ordering)
const PRIORITY_MAP: Record<string, number> = {
  // Documentation pages
  'introduction': 0,
  'getting-started': 10,
  'changelog': 20,
  
  // UI component categories will start at 100
};

export function DocsPagination() {
  const pathname = usePathname();
  
  // Generate navigation items from the componentRegistry
  const navItems = useMemo(() => {
    const items: NavItem[] = [];
    
    // Add documentation pages
    Object.keys(componentRegistry)
      .filter(key => !key.includes('-'))  // Filter out component names that might have dashes
      .forEach(key => {
        // Skip components that aren't in the main docs
        if (key.includes('/')) return;
        
        // Get metadata if available
        const meta = componentMetadata[key];
        const title = meta?.title ? 
          meta.title.toString().replace(' deltacomponents.dev', '') : 
          key.charAt(0).toUpperCase() + key.slice(1).replace(/-/g, ' ');
        
        items.push({
          title,
          path: `/docs/${key}`,
          priority: PRIORITY_MAP[key] || 50,  // Default priority if not specified
        });
      });
    
    // Add UI component pages (with higher priority numbers)
    Object.keys(componentRegistry)
      .filter(key => key.includes('-') || /^[a-z]+$/.test(key))  // Component names typically have dashes or are simple words
      .forEach((key, index) => {
        // Get metadata if available
        const meta = componentMetadata[key];
        const title = meta?.title ? 
          meta.title.toString().replace(' deltacomponents.dev', '') : 
          key.charAt(0).toUpperCase() + key.slice(1).replace(/-/g, ' ');
        
        items.push({
          title,
          path: `/docs/ui/${key}`,
          priority: 100 + index,  // UI components start at priority 100
        });
      });
    
    // Sort by priority
    return items.sort((a, b) => a.priority - b.priority);
  }, []);
  
  // Find the current page index
  const currentIndex = useMemo(() => {
    return navItems.findIndex(item => item.path === pathname);
  }, [navItems, pathname]);
  
  // If page not found in navigation
  if (currentIndex === -1) return null;
  
  const prevPage = currentIndex > 0 ? navItems[currentIndex - 1] : null;
  const nextPage = currentIndex < navItems.length - 1 ? navItems[currentIndex + 1] : null;
  
  if (!prevPage && !nextPage) return null;
  
  return (
    <div className="mt-16 mb-8 pt-6 border-t border-border flex justify-between">
      {prevPage ? (
        <Link href={prevPage.path} className="flex flex-col items-start group cursor-pointer">
          <span className="text-sm font-medium text-foreground mb-1 group-hover:text-primary transition-colors">Previous Page</span>
          <div className="flex items-center text-muted-foreground group-hover:text-foreground text-sm transition-colors">
            <ArrowLeft className="mr-1" size={16} weight="bold" />
            {prevPage.title}
          </div>
        </Link>
      ) : (
        <div />
      )}
      
      {nextPage ? (
        <Link href={nextPage.path} className="flex flex-col items-end group cursor-pointer">
          <span className="text-sm font-medium text-foreground mb-1 group-hover:text-primary transition-colors">Next Page</span>
          <div className="flex items-center text-muted-foreground group-hover:text-foreground text-sm transition-colors">
            {nextPage.title}
            <ArrowRight className="ml-1" size={16} weight="bold" />
          </div>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
} 