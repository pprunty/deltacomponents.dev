"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

interface XScrollableProps {
  children: ReactNode
  className?: string
  showScrollbar?: boolean
  scrollbarTrackClassName?: string
  scrollbarThumbClassName?: string
  onScroll?: (
    scrollLeft: number,
    scrollWidth: number,
    clientWidth: number
  ) => void
}

export function XScrollable({
  children,
  className,
  showScrollbar = false,
  scrollbarTrackClassName,
  scrollbarThumbClassName,
  onScroll,
}: XScrollableProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftShadow, setShowLeftShadow] = useState(false)
  const [showRightShadow, setShowRightShadow] = useState(false)

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer
      setShowLeftShadow(scrollLeft > 0)
      setShowRightShadow(scrollLeft < scrollWidth - clientWidth)
      onScroll?.(scrollLeft, scrollWidth, clientWidth)
    }

    handleScroll() // Initial check
    scrollContainer.addEventListener("scroll", handleScroll)

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll)
    }
  }, [onScroll])

  return (
    <div className="relative">
      <div
        ref={scrollContainerRef}
        className={cn(
          "overflow-x-auto overflow-y-hidden",
          showScrollbar
            ? "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400"
            : "scrollbar-hide",
          className
        )}
      >
        {children}
      </div>
      {showLeftShadow && (
        <div className="from-background pointer-events-none absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r to-transparent" />
      )}
      {showRightShadow && (
        <div className="from-background pointer-events-none absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l to-transparent" />
      )}
      {showScrollbar && (
        <div
          className={cn(
            "mt-1 h-1 rounded-full bg-gray-200",
            scrollbarTrackClassName
          )}
        >
          <div
            className={cn(
              "h-full rounded-full bg-gray-400",
              scrollbarThumbClassName
            )}
            style={{
              width: scrollContainerRef.current
                ? `${(scrollContainerRef.current.clientWidth / scrollContainerRef.current.scrollWidth) * 100}%`
                : "0%",
              transform: scrollContainerRef.current
                ? `translateX(${(scrollContainerRef.current.scrollLeft / scrollContainerRef.current.clientWidth) * 100}%)`
                : "translateX(0%)",
            }}
          />
        </div>
      )}
    </div>
  )
}
