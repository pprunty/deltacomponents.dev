"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import Search from "./search"
import { useEffect, useState } from "react"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [isLoaded, setIsLoaded] = useState(false)

  // Set isLoaded to true after component mount to trigger the animation
  useEffect(() => {
    // Small delay to ensure the initial state is rendered first
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const isActive = (path: string) => {
    return pathname.startsWith(path)
  }

  return (
    <aside
      className={cn(
        "hidden md:block w-72 border-r border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        "fixed top-12 h-[calc(100vh-3rem)] overflow-hidden",
        "transition-transform duration-500 ease-out",
        isLoaded ? "translate-x-0" : "-translate-x-full",
        className,
      )}
    >
      <div className="h-full overflow-y-auto">
        <div className="px-3 py-2">
          <Search mobileOnly={false} />
        </div>
        <nav className="px-3 py-2">
          <div className="space-y-1">
            <Link
              href="/getting-started"
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 rounded-sm text-xs font-medium transition-colors",
                isActive("/getting-started")
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground",
              )}
            >
              Getting Started
            </Link>
            <Link
              href="/"
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 rounded-sm text-xs font-medium transition-colors",
                isActive("/docs")
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground",
              )}
            >
              Components
            </Link>
          </div>
        </nav>

        <div className="border-t border-border p-3 py-6 mt-auto">
          {/* Additional components will be added here later */}
        </div>
      </div>
    </aside>
  )
}
