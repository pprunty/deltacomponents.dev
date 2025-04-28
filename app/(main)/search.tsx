'use client';

import type React from 'react';
import { useEffect, useState, useRef } from 'react';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import registryData from '@/registry.json';
// Update the import for Modal to use the correct path
import Modal from '@/delta/components/modal';

interface SearchProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
  mobileOnly?: boolean;
  showFullInputOnMobile?: boolean;
}

interface SearchResult {
  title: string;
  path: string;
  category: string;
  description?: string;
}

// Convert registry data to searchable format
const getSearchResults = (): SearchResult[] => {
  return registryData.items.map((item) => ({
    title: item.title,
    path: `/docs/${item.name}`,
    category: item.category || 'component', // Default to 'component' if category is undefined
    description: item.description,
  }));
};

// Update the desktop search component to also open a modal
export default function Search({
  placeholder = 'Find Anything',
  onSearch,
  className = '',
  mobileOnly = false,
  showFullInputOnMobile = false,
}: SearchProps) {
  const [query, setQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const desktopInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
    // Close search dialog after search
    if (isSearchOpen) {
      setIsSearchOpen(false);
    }
  };

  // Update results when query changes
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const searchQuery = query.toLowerCase();
    const allResults = getSearchResults();
    const filtered = allResults.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery) ||
        (item.description &&
          item.description.toLowerCase().includes(searchQuery)),
    );
    setResults(filtered.slice(0, 8)); // Limit to 8 results for performance
  }, [query]);

  // Mobile search icon button handler
  const handleMobileSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // Handle desktop input focus
  const handleDesktopInputFocus = () => {
    setIsSearchOpen(true);
  };

  // Close search on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    // Auto-focus input when search is opened
    if (isSearchOpen) {
      if (mobileOnly && inputRef.current) {
        inputRef.current.focus();
      } else if (!mobileOnly && desktopInputRef.current) {
        desktopInputRef.current.focus();
      }
    }

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isSearchOpen, mobileOnly]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(e.target as Node) &&
        isSearchOpen
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchOpen]);

  // Shared search modal content
  const searchModalContent = (
    <div className="space-y-4">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <MagnifyingGlass
              size={18}
              weight="bold"
              className="text-muted-foreground"
            />
          </div>
          <input
            ref={mobileOnly ? inputRef : desktopInputRef}
            type="search"
            className="flex h-10 w-full rounded-md border border-input bg-background/50 pl-10 pr-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </form>

      {query.trim() !== '' && (
        <div className="mt-2 overflow-y-auto max-h-[60vh]">
          {results.length > 0 ? (
            <ul className="space-y-2">
              {results.map((result, index) => (
                <li key={index}>
                  <a
                    href={result.path}
                    className="block p-3 rounded-md hover:bg-accent transition-colors"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium">{result.title}</div>
                      <div className="text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-accent/50">
                        {result.category}
                      </div>
                    </div>
                    {result.description && (
                      <div className="text-xs text-muted-foreground line-clamp-1">
                        {result.description}
                      </div>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center p-4 text-muted-foreground">
              No results found
            </div>
          )}
        </div>
      )}

      {query.trim() === '' && (
        <div className="text-center p-4 text-muted-foreground">
          <p>
            On your published sites your content will be fully searchable
            allowing users to move around your documents with ease ✨
          </p>
        </div>
      )}
    </div>
  );

  // If this is mobileOnly mode
  if (mobileOnly) {
    // If showFullInputOnMobile is true, render the full input
    if (showFullInputOnMobile) {
      return (
        <form onSubmit={handleSearch} className={cn('w-full', className)}>
          <div className="relative">
            <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
              <MagnifyingGlass
                size={13}
                weight="bold"
                className="text-muted-foreground"
              />
            </div>
            <input
              ref={inputRef}
              type="search"
              className="flex h-8 w-full rounded-md border border-input bg-background pl-7 pr-2 py-1 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsSearchOpen(true)}
            />
          </div>
        </form>
      );
    }

    // Otherwise render just the icon
    return (
      <>
        <button
          type="button"
          onClick={handleMobileSearchClick}
          className={cn('flex items-center justify-center p-2', className)}
          aria-label="Search"
        >
          <MagnifyingGlass
            size={16}
            weight="bold"
            className="text-foreground"
          />
        </button>

        {/* Mobile Search Modal */}
        <Modal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          type="blur"
          showCloseButton={false}
          animationType="scale"
          className="max-w-md w-full rounded-md"
          position={350} // Position it higher on the screen
        >
          {searchModalContent}
        </Modal>
      </>
    );
  }

  // Full search component for desktop or sidebar
  return (
    <>
      <form onSubmit={handleSearch} className={cn('w-full', className)}>
        <div className="relative">
          <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
            <MagnifyingGlass
              size={13}
              weight="bold"
              className="text-muted-foreground"
            />
          </div>
          <input
            ref={desktopInputRef}
            type="search"
            className="flex h-8 w-full rounded-md border border-input bg-background pl-7 pr-2 py-1 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleDesktopInputFocus}
          />
        </div>
      </form>

      {/* Desktop Search Modal */}
      <Modal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        type="blur"
        showCloseButton={false}
        animationType="scale"
        className="max-w-md w-full rounded-md"
        position={380} // Position it higher on the screen
      >
        {searchModalContent}
      </Modal>
    </>
  );
}
