"use client"

import React, { useEffect, useState, useRef, useCallback } from "react"
import { MagnifyingGlass } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import registryData from "@/registry.json"
import Modal from "@/delta/components/modal"
import { useMediaQuery } from "@/delta/hooks/use-media-query"

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
  // uncontrolled state fallback
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const desktopInputRef = useRef<HTMLInputElement>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [hotkeyRegistered, setHotkeyRegistered] = useState(false)

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
  }, [isControlled, onOpenChange]);

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

  // update results
  useEffect(() => {
    if (!query.trim()) return setResults([])
    const q = query.toLowerCase()
    setResults(
      getSearchResults()
        .filter(
          (it) =>
            it.title.toLowerCase().includes(q) ||
            (it.description?.toLowerCase().includes(q) ?? false)
        )
        .slice(0, 8)
    )
  }, [query])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(query)
    setSearchOpen(false)
  }

  const searchModalContent = (
    <div className="space-y-4">
      <form onSubmit={handleSearchSubmit}>
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <MagnifyingGlass size={18} weight="bold" className="text-muted-foreground" />
          </div>
          <input
            ref={mobileOnly ? inputRef : desktopInputRef}
            type="search"
            className="flex h-10 w-full rounded-md border border-input bg-background/50 pl-10 pr-3 py-2 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder={placeholder}
            value={query}
            autoFocus
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </form>

      {query.trim() ? (
        <div className="mt-2 overflow-y-auto max-h-[60vh]">
          {results.length ? (
            <ul className="space-y-2">
              {results.map((r, i) => (
                <li key={i}>
                  <a
                    href={r.path}
                    className="block p-3 rounded-md hover:bg-accent transition-colors"
                    onClick={() => setSearchOpen(false)}
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
        <p className="text-center p-4 text-muted-foreground">
          On your published sites your content will be fully searchable allowing users to move around your
          documents with ease ✨
        </p>
      )}
    </div>
  )

  // --- render variants ---
  if (mobileOnly) {
    if (showFullInputOnMobile) {
      return (
        <form onSubmit={handleSearchSubmit} className={cn("w-full", className)}>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
              <MagnifyingGlass size={13} weight="bold" className="text-muted-foreground" />
            </div>
            <input
              ref={inputRef}
              type="search"
              className="flex h-8 w-full rounded-md border border-input bg-background pl-7 pr-16 py-1 text-[13px] placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setSearchOpen(true)}
            />
          </div>
        </form>
      )
    }

    return (
      <>
        <button
          type="button"
          onClick={() => setSearchOpen(!isSearchOpen)}
          className={cn("p-2", className)}
          aria-label="Search"
        >
          <MagnifyingGlass size={16} weight="bold" className="text-foreground" />
        </button>
        <Modal
          isOpen={isSearchOpen}
          onClose={() => setSearchOpen(false)}
          type="blur"
          showCloseButton={false}
          animationType="scale"
          className="max-w-md w-full rounded-md"
          position={350}
        >
          {searchModalContent}
        </Modal>
      </>
    )
  }

  // desktop / sidebar
  return (
    <>
      <form onSubmit={handleSearchSubmit} className={cn("w-full", className)}>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
            <MagnifyingGlass size={13} weight="bold" className="text-muted-foreground" />
          </div>
          <input
            ref={desktopInputRef}
            type="search"
            className="flex h-8 w-full rounded-md border border-input bg-background pl-7 pr-16 py-1 text-base sm:text-[13px] placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
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
        className="max-w-md w-full rounded-md"
        position={380}
      >
        {searchModalContent}
      </Modal>
    </>
  )
}
