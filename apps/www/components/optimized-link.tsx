"use client"

import Link, { LinkProps } from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface OptimizedLinkProps extends LinkProps {
  children: React.ReactNode
  className?: string
  expectedTitle?: string
}

export function OptimizedLink({ 
  children, 
  className, 
  expectedTitle,
  href,
  ...props 
}: OptimizedLinkProps) {
  const router = useRouter()
  const linkRef = useRef<HTMLAnchorElement>(null)

  // Preload the route on hover/focus for instant navigation
  useEffect(() => {
    const link = linkRef.current
    if (!link) return

    const handleMouseEnter = () => {
      router.prefetch(href.toString())
    }

    const handleFocus = () => {
      router.prefetch(href.toString())
    }

    link.addEventListener("mouseenter", handleMouseEnter)
    link.addEventListener("focus", handleFocus)

    return () => {
      link.removeEventListener("mouseenter", handleMouseEnter)
      link.removeEventListener("focus", handleFocus)
    }
  }, [router, href])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Optimistically update document title if provided
    if (expectedTitle && typeof document !== "undefined") {
      const originalTitle = document.title
      document.title = `${expectedTitle} - Delta Components`
      
      // Revert if navigation fails
      const timeout = setTimeout(() => {
        if (document.title === `${expectedTitle} - Delta Components`) {
          document.title = originalTitle
        }
      }, 3000)

      // Clear timeout when page actually loads
      const clearTimeoutOnLoad = () => {
        clearTimeout(timeout)
        window.removeEventListener("load", clearTimeoutOnLoad)
      }
      window.addEventListener("load", clearTimeoutOnLoad)
    }

    // Let Next.js handle the navigation normally
    props.onClick?.(e)
  }

  return (
    <Link
      ref={linkRef}
      href={href}
      className={cn(className)}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  )
}