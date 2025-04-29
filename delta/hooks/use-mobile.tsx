"use client"

import { useState, useEffect } from "react"

/**
 * Hook to detect if the current viewport is mobile
 * @param breakpoint - The breakpoint in pixels to consider as mobile (default: 1024px)
 * @returns boolean - True if viewport width is less than the breakpoint
 */
export function useIsMobile(breakpoint = 1024): boolean {
  // Default to false during SSR
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Function to check if window width is less than breakpoint
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    // Check on mount
    checkMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile)

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [breakpoint])

  return isMobile
}
