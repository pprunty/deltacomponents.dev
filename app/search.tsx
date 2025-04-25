"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import { MagnifyingGlass, X } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import registryData from "@/registry.json"

interface SearchProps {
  placeholder?: string
  onSearch?: (query: string) => void
  className?: string
  mobileOnly?: boolean
}

interface SearchResult {
  title: string;
  path: string;
  category: string;
  description?: string;
}

// Convert registry data to searchable format
const getSearchResults = (): SearchResult[] => {
  return registryData.items.map(item => ({
    title: item.title,
    path: `/docs/${item.name}`,
    category: item.category || 'component', // Default to 'component' if category is undefined
    description: item.description
  }));
};

export default function Search({
  placeholder = "Find Anything",
  onSearch,
  className = "",
  mobileOnly = false,
}: SearchProps) {
  const [query, setQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const mobileSearchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(query)
    }
    // Close mobile search dialog after search
    if (mobileOnly && isSearchOpen) {
      setIsSearchOpen(false)
    }
  }

  // Update results when query changes
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const searchQuery = query.toLowerCase();
    const allResults = getSearchResults();
    const filtered = allResults.filter(
      item => 
        item.title.toLowerCase().includes(searchQuery) || 
        (item.description && item.description.toLowerCase().includes(searchQuery))
    );
    setResults(filtered.slice(0, 8)); // Limit to 8 results for performance
  }, [query]);

  // Mobile search icon button handler
  const handleMobileSearchClick = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  // Close mobile search on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false)
      }
    }

    // Auto-focus input when search is opened
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus()
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isSearchOpen])

  // Close mobile search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(e.target as Node) && isSearchOpen) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isSearchOpen])

  // If this is mobileOnly mode, render just the icon
  if (mobileOnly) {
    return (
      <>
        <button 
          type="button" 
          onClick={handleMobileSearchClick}
          className={cn("flex items-center justify-center p-2", className)}
          aria-label="Search"
        >
          <MagnifyingGlass
            size={16}
            weight="bold"
            className="text-foreground"
          />
        </button>

        {/* Mobile Search Dialog */}
        {isSearchOpen && (
          <div 
            className="fixed inset-0 z-[60] bg-background/95 pt-16 px-4"
            ref={mobileSearchRef}
          >
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Search Components</h2>
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="p-1"
                  aria-label="Close search"
                >
                  <X size={18} weight="bold" className="text-foreground" />
                </button>
              </div>
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
                    ref={inputRef}
                    type="search"
                    className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                    placeholder={placeholder}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
              </form>

              {/* Search Results */}
              {query.trim() !== '' && (
                <div className="mt-4 overflow-y-auto max-h-[60vh]">
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
            </div>
          </div>
        )}
      </>
    )
  }

  // Full search component for desktop or sidebar
  return (
    <form onSubmit={handleSearch} className={cn("w-full", className)}>
      <div className="relative">
        <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
          <MagnifyingGlass
            size={13}
            weight="bold"
            className="text-muted-foreground"
          />
        </div>
        <input
          type="search"
          className="flex h-8 w-full rounded-md border border-input bg-background pl-7 pr-2 py-1 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </form>
  )
}
