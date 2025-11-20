"use client"

import React, { memo, useMemo } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Search, Settings, User } from "lucide-react"

import { Icons } from "@/components/icons"
import { BottomMobileNav } from "@/registry/delta-ui/blocks/bottom-mobile-nav/components/bottom-mobile-nav"

// Routes configuration - shared between mobile and desktop nav
const routes = [
  {
    href: "#",
    label: "Home",
    icon: Home,
  },
  {
    href: "#search",
    label: "Search",
    icon: Search,
  },
  {
    href: "#settings",
    label: "Settings",
    icon: Settings,
  },
  {
    href: "#profile",
    label: "Profile",
    icon: User,
  },
]

// Desktop Sidebar Component
const Sidebar = memo(function Sidebar() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex flex-col items-center h-screen w-20 fixed top-0 left-0 z-50 bg-background/80 backdrop-blur-lg border-r py-4">
      {/* Top: Logo section */}
      <div className="mb-8">
        <Icons.logo className="size-5" />
      </div>

      {/* Middle: main nav icons (centered vertically) */}
      <div className="flex flex-col flex-1 justify-center items-center space-y-6">
        {routes.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href || (href === "#" && pathname === "/")
          return (
            <Link
              key={href}
              href={href}
              className={`
                p-3 rounded-xl
                transition-colors duration-300
                ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }
              `}
              title={label}
            >
              {Icon && <Icon className="w-6 h-6" />}
            </Link>
          )
        })}
      </div>

      {/* Bottom: placeholder for settings or additional actions */}
      <div className="mt-auto">
        {/* You can add theme switcher or other controls here */}
      </div>
    </nav>
  )
})

Sidebar.displayName = "Sidebar"

// Layout Component
interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="md:ml-20">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomMobileNav
        routes={routes}
        labels={false}
        className="bg-background/80 backdrop-blur-lg border-t"
      />
    </div>
  )
}