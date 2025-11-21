"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { source } from "@/lib/source"

export function NavigationHandler() {
  const pathname = usePathname()

  useEffect(() => {
    // Update document title immediately when pathname changes
    const updateTitle = () => {
      if (pathname.startsWith("/docs")) {
        try {
          // Extract slug from pathname
          const slug = pathname === "/docs" ? undefined : pathname.replace("/docs/", "").split("/")
          const page = source.getPage(slug)
          
          if (page?.data?.title) {
            document.title = `${page.data.title} - Delta Components`
            return
          }
        } catch (error) {
          // Fallback to pathname-based title
          const segments = pathname.split("/").filter(Boolean)
          if (segments.length > 1) {
            const title = segments[segments.length - 1]
              .split("-")
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")
            document.title = `${title} - Delta Components`
            return
          }
        }
      }
      
      // Default fallback
      if (pathname !== "/") {
        document.title = "Delta Components"
      }
    }

    // Update title immediately
    updateTitle()

    // Also update on next tick to handle any async updates
    const timeout = setTimeout(updateTitle, 50)

    return () => clearTimeout(timeout)
  }, [pathname])

  return null
}