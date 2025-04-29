"use client"

import type React from "react"
import { useEffect, useState, useRef, useCallback } from "react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from 'next/navigation'

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  className?: string
}

// Debounce function for performance
function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export function TableOfContents({ className }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>("")
  const [indicatorHeight, setIndicatorHeight] = useState(0)
  const [indicatorTop, setIndicatorTop] = useState(0)
  const itemsRef = useRef<Map<string, HTMLLIElement>>(new Map())
  const observerRef = useRef<IntersectionObserver | null>(null)
  const pathname = usePathname()

  // Extract headings with debounce
  const extractHeadings = useCallback(() => {
    const elements = Array.from(document.querySelectorAll("h1, h2, h3"))
    const extractedHeadings = elements
      .filter((element) => element.id && element.textContent)
      .map((element) => ({
        id: element.id,
        text: element.textContent || "",
        level: Number(element.tagName.charAt(1)),
      }))

    setHeadings(extractedHeadings)
  }, [])

  // Setup intersection observer
  const setupObserver = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const intersectingEntry = entries.find((entry) => entry.isIntersecting)
        if (intersectingEntry) {
          setActiveId(intersectingEntry.target.id)
        }
      },
      {
        rootMargin: "-100px 0px -80% 0px",
        threshold: 0.1,
      }
    )

    observerRef.current = observer

    // Observe all headings
    document.querySelectorAll("h1, h2, h3").forEach((element) => {
      if (element.id) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  // Update indicator position
  const updateIndicatorPosition = useCallback(() => {
    if (activeId && itemsRef.current.has(activeId)) {
      const activeItem = itemsRef.current.get(activeId)
      if (activeItem) {
        setIndicatorTop(activeItem.offsetTop)
        setIndicatorHeight(activeItem.offsetHeight)
      }
    }
  }, [activeId])

  // Scroll to element
  const scrollToElement = useCallback((id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const headerHeight = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'auto'
      })
    }
  }, [])

  // Handle click
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    
    // Update URL hash without triggering a full navigation
    window.history.pushState(null, '', `#${id}`)
    setActiveId(id)

    // Scroll to element after a small delay to ensure DOM is ready
    setTimeout(() => {
      scrollToElement(id)
    }, 50)
  }, [scrollToElement])

  // Handle hash changes
  const handleHashChange = useCallback(() => {
    const hash = window.location.hash.slice(1)
    if (hash) {
      setActiveId(hash)
      // Scroll to element after a small delay to ensure DOM is ready
      setTimeout(() => {
        scrollToElement(hash)
      }, 50)
    }
  }, [scrollToElement])

  // Initial setup and cleanup
  useEffect(() => {
    // Initial extraction
    extractHeadings()
    setupObserver()

    // Handle initial hash if present
    if (window.location.hash) {
      handleHashChange()
    }

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange)
    
    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [extractHeadings, setupObserver, handleHashChange])

  // Handle Next.js client-side navigation
  useEffect(() => {
    // Reset and re-extract headings when pathname changes
    setHeadings([])
    setActiveId("")
    
    // Re-extract headings after a short delay to ensure DOM is updated
    const timer = setTimeout(() => {
      extractHeadings()
      setupObserver()
      
      // Handle hash if present after navigation
      if (window.location.hash) {
        handleHashChange()
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [pathname, extractHeadings, setupObserver, handleHashChange])

  // Update indicator position when active ID changes
  useEffect(() => {
    updateIndicatorPosition()
  }, [activeId, headings, updateIndicatorPosition])

  // Handle window resize
  useEffect(() => {
    const handleResize = debounce(() => {
      updateIndicatorPosition()
    }, 100)

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [updateIndicatorPosition])

  if (headings.length === 0) return null

  return (
    <aside className={cn("hidden lg:block w-full sticky top-6 right-10 h-[calc(100vh-8rem)]", className)}>
      <div className="h-full py-6">
        <div className="flex items-center gap-2 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-muted-foreground">
            <path d="M2.75 12H21.25M2.75 5.75H21.25M2.75 18.25H11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          <span className="text-[13px] font-medium text-muted-foreground">On this page</span>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            {headings.length > 0 ? (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Animated indicator */}
                {activeId && (
                  <motion.div
                    className="absolute left-0 w-[3px] bg-primary rounded-full"
                    initial={false}
                    animate={{
                      top: indicatorTop,
                      height: indicatorHeight,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                <ul className="space-y-2 text-[13px]">
                  {headings.map((heading) => (
                    <li
                      key={heading.id}
                      ref={(el) => {
                        if (el) itemsRef.current.set(heading.id, el)
                        else itemsRef.current.delete(heading.id)
                      }}
                      className="h-7 truncate pl-3"
                    >
                      <a 
                        href={`#${heading.id}`} 
                        onClick={(e) => handleClick(e, heading.id)} 
                        className={cn(
                          "transition-colors block",
                          activeId === heading.id 
                            ? "text-primary font-medium" 
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ) : (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="h-8 flex items-center"
              >
                <span className="text-xs text-muted-foreground/70">Loading...</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </aside>
  )
}
