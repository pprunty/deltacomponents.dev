"use client"

import React, { useEffect, useState, useRef, useCallback, useMemo } from "react"
import { MagnifyingGlass } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import registryData from "@/registry.json"
import Modal from "@/delta/components/modal"
import { useMediaQuery } from "@/delta/hooks/use-media-query"
import { useRouter } from "next/navigation"

interface SearchProps {
  placeholder?: string
  onSearch?: (query: string) => void
  className?: string
  mobileOnly?: boolean
  showFullInputOnMobile?: boolean
  /** the shared open state (if omitted, component manages its own) */
  isOpen?: boolean
  /** callback when open state should change */
  onOpenChange?: (open: boolean) => void
  /** only the one instance with this true will register ⌘K */
  enableHotkey?: boolean
}

interface SearchResult {
  title: string
  path: string
  category: string
  description?: string
}

const getSearchResults = (): SearchResult[] => {
  // Get UI component results
  const uiComponentResults = registryData.items.map((item) => ({
    title: item.title,
    path: `/docs/ui/${item.name}`,
    category: item.category || "component",
    description: item.description,
  }));
  
  // Add documentation pages
  const docResults: SearchResult[] = [
    {
      title: "Introduction",
      path: "/docs/introduction",
      category: "documentation",
      description: "Introduction to Delta Components"
    },
    {
      title: "Getting Started",
      path: "/docs/getting-started",
      category: "documentation",
      description: "How to get started with Delta Components"
    }
  ];
  
  return [...uiComponentResults, ...docResults];
}

// Create a global hotkey manager to prevent multiple instances from responding to the same shortcut
const hotkeyManager = {
  isRegistered: false,
  register() {
    if (this.isRegistered) return false
    this.isRegistered = true
    return true
  },
  unregister() {
    this.isRegistered = false
  }
}

export default function Search({
  placeholder = "Find Anything",
  onSearch,
  className = "",
  mobileOnly = false,
  showFullInputOnMobile = false,
  // controlled props:
  isOpen: isOpenProp,
  onOpenChange,
  // hotkey:
  enableHotkey = true,
}: SearchProps) {
  const router = useRouter()
  // uncontrolled state fallback
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const desktopInputRef = useRef<HTMLInputElement>(null)
  const resultsContainerRef = useRef<HTMLDivElement>(null)
  const resultItemsRef = useRef<Array<HTMLElement | null>>([])
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [hotkeyRegistered, setHotkeyRegistered] = useState(false)

  // Memoize search data so it doesn't recreate on every render
  const searchData = useMemo(() => getSearchResults(), [])

  // decide if we're controlled or uncontrolled
  const isControlled = typeof isOpenProp === "boolean"
  const isSearchOpen = isControlled ? isOpenProp! : uncontrolledOpen
  
  // Use useCallback to prevent unnecessary re-renders
  const setSearchOpen = useCallback((open: boolean) => {
    if (isControlled) {
      onOpenChange?.(open)
    } else {
      setUncontrolledOpen(open)
    }
    if (!open) {
      setSelectedIndex(-1)
      setQuery("") // Clear the query when the modal closes
    }
  }, [isControlled, onOpenChange]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(query)
    setSearchOpen(false)
  }

  const handleResultClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault()
    router.push(path)
    setSearchOpen(false)
  }

  const searchModalContent = (
    <div className="space-y-4 p-3">
      <form onSubmit={handleSearchSubmit}>
        <div className="relative">
          <input
            ref={mobileOnly ? inputRef : desktopInputRef}
            type="text" 
            className="flex h-10 w-full rounded-sm border border-input bg-background/50 px-3 py-2 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-[#4298FB]"
            placeholder="Search..."
            value={query}
            autoFocus
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </form>

      {query.trim() ? (
        <div ref={resultsContainerRef} className="mt-2 overflow-y-auto max-h-[60vh]">
          {results.length ? (
            <ul className="space-y-2">
              {results.map((r, i) => (
                <li
                  key={i}
                  ref={(el) => { resultItemsRef.current[i] = el; }}
                >
                  <a
                    href={r.path}
                    className={cn(
                      "block p-3 rounded-md transition-colors",
                      selectedIndex === i
                        ? "bg-accent"
                        : "hover:bg-accent"
                    )}
                    onClick={(e) => handleResultClick(e, r.path)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{r.title}</span>
                      <span className="text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-accent/50">
                        {r.category}
                      </span>
                    </div>
                    {r.description && (
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {r.description}
                      </p>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center p-4 text-muted-foreground">No results found</p>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <p className="text-center text-base font-medium">
            Find anything you like
          </p>
        </div>
      )}

      {/* Keyboard navigation help - desktop only */}
      {!isMobile && (
        <div className="absolute bg-muted bottom-0 left-0 right-0 px-3 py-2 text-xs text-left text-muted-foreground bg-background/80 backdrop-blur-sm rounded-b-md">
          ↑↓ Navigate ⏎ Select
        </div>
      )}
    </div>
  )

  // Register/unregister hotkey manager on mount/unmount
  useEffect(() => {
    if (enableHotkey) {
      // Only register if this component should handle the hotkey
      // and if it's appropriate for the current view (mobile vs desktop)
      const shouldRegister = (mobileOnly && isMobile) || (!mobileOnly && !isMobile)
      if (shouldRegister) {
        const registered = hotkeyManager.register()
        setHotkeyRegistered(registered)
      }
    }

    return () => {
      if (hotkeyRegistered) {
        hotkeyManager.unregister()
        setHotkeyRegistered(false)
      }
    }
  }, [enableHotkey, isMobile, mobileOnly]);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultItemsRef.current[selectedIndex]) {
      resultItemsRef.current[selectedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
  }, [selectedIndex]);

  // wire ⌘K / Ctrl+K only if asked and registered
  useEffect(() => {
    if (!enableHotkey || !hotkeyRegistered) return

    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setSearchOpen(true)
        setTimeout(() => {
          ;(mobileOnly || isMobile
            ? inputRef.current
            : desktopInputRef.current
          )?.focus()
        }, 10)
      }
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [enableHotkey, hotkeyRegistered, isMobile, mobileOnly, setSearchOpen])

  // escape to close
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        setSearchOpen(false)
      }
    }
    window.addEventListener("keydown", onEsc)
    return () => window.removeEventListener("keydown", onEsc)
  }, [isSearchOpen, setSearchOpen])

  // Handle arrow key navigation for search results
  useEffect(() => {
    if (!isSearchOpen || isMobile) return

    const handleKeydown = (e: KeyboardEvent) => {
      if (results.length === 0) return

      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex(prev =>
          prev === results.length - 1 ? 0 : prev + 1
        )
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex(prev =>
          prev <= 0 ? results.length - 1 : prev - 1
        )
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        e.preventDefault()
        const result = results[selectedIndex]
        if (result) {
          router.push(result.path)
          setSearchOpen(false)
        }
      }
    }

    window.addEventListener("keydown", handleKeydown)
    return () => window.removeEventListener("keydown", handleKeydown)
  }, [isSearchOpen, results, selectedIndex, isMobile, setSearchOpen, router])

  // update results
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setSelectedIndex(-1)
      // Only reset refs array if it had contents before
      if (resultItemsRef.current.length > 0) {
        resultItemsRef.current = []
      }
      return
    }

    const q = query.toLowerCase()
    const filteredResults = searchData
      .filter(
        (it) =>
          it.title.toLowerCase().includes(q) ||
          (it.description?.toLowerCase().includes(q) ?? false)
      )
      .slice(0, 8)

    setResults(filteredResults)
    setSelectedIndex(-1)

    // Only reset the refs array if the length doesn't match
    // This prevents unnecessary updates that can cause infinite loops
    if (resultItemsRef.current.length !== filteredResults.length) {
      resultItemsRef.current = filteredResults.map(() => null)
    }
  }, [query, searchData])

  // --- render variants ---
  if (mobileOnly) {
    if (showFullInputOnMobile) {
      return (
        <form onSubmit={handleSearchSubmit} className={cn("w-full", className)}>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
              <MagnifyingGlass size={14} weight="bold" className="text-muted-foreground" />
            </div>
            <input
              ref={inputRef}
              type="text"
              className="flex h-8 w-full rounded-md border border-input bg-background pl-7 pr-16 py-1 text-[13px] placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 dark:focus:ring-foreground/30"
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {hotkeyRegistered && (
              <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                <kbd className="px-1.5 py-0.5 text-[10px] font-sans font-medium text-muted-foreground bg-muted border border-border rounded">
                  ⌘K
                </kbd>
              </div>
            )}
          </div>
        </form>
      )
    }

    return (
      <div className={className}>
        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="flex h-8 items-center gap-2 rounded-md border border-input px-2 text-[13px] text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 dark:focus:ring-foreground/30"
        >
          <MagnifyingGlass size={14} weight="bold" />
          <span className="flex-1">{placeholder}</span>
          {hotkeyRegistered && (
            <kbd className="ml-auto px-1.5 py-0.5 text-[10px] font-sans font-medium text-muted-foreground bg-muted border border-border rounded">
              ⌘K
            </kbd>
          )}
        </button>
        <Modal
          isOpen={isSearchOpen}
          onClose={() => setSearchOpen(false)}
          className="w-full max-w-lg p-4 max-h-[580px]"
        >
          {searchModalContent}
        </Modal>
      </div>
    )
  }

  // desktop / sidebar
  return (
    <>
      <form onSubmit={handleSearchSubmit} className={cn("w-full", className)}>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
            <MagnifyingGlass size={16} weight="bold" className="text-muted-foreground" />
          </div>
          <input
            ref={desktopInputRef}
            type="text"
            className="flex h-8 w-full rounded-md border border-input bg-background pl-7 pr-16 py-1 text-base sm:text-[13px] placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 dark:focus:ring-foreground/30"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setSearchOpen(true)}
          />
          <div className="inset-y-0 right-2 flex items-center pointer-events-none absolute">
            <kbd className="hidden md:flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>
      </form>
      <Modal
        isOpen={isSearchOpen}
        onClose={() => setSearchOpen(false)}
        type="blur"
        showCloseButton={false}
        animationType="scale"
        className="max-w-md w-full rounded-md min-h-[380px]"
        position={380}
      >
        <div className="pb-8">
          {searchModalContent}
        </div>
      </Modal>
    </>
  )
}
