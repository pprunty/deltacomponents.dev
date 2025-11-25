"use client"

import React, { memo, useMemo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { House, MagnifyingGlass, Heart, User } from "phosphor-react"

import { Icons } from "@/components/icons"
import { BottomMobileNav } from "@/registry/delta-ui/blocks/bottom-mobile-nav/components/bottom-mobile-nav"

// Routes configuration - shared between mobile and desktop nav
const routes = [
  {
    href: "#",
    label: "Home",
    icon: House,
  },
  {
    href: "#search",
    label: "Search",
    icon: MagnifyingGlass,
  },
  {
    href: "#love",
    label: "Love",
    icon: Heart,
  },
  {
    href: "#profile",
    label: "Profile",
    icon: User,
  },
]

// Desktop Sidebar Component
interface SidebarProps {
  className?: string
}

const Sidebar = memo(function Sidebar({ className }: SidebarProps = {}) {
  const pathname = usePathname()

  return (
    <nav className={`bg-background/80 fixed top-0 left-0 z-50 hidden h-screen w-20 flex-col items-center border-r py-4 backdrop-blur-lg md:flex ${className || ""}`}>
      {/* Top: Logo section */}
      <div className="mb-8">
        <Icons.logo className="size-6" />
      </div>

      {/* Middle: main nav icons (centered vertically) */}
      <div className="flex flex-1 flex-col items-center justify-center space-y-4">
        {routes.map(({ href, icon: Icon, label }, index) => {
          const isActive = index === 0 // Make first item (Home) active by default
          return (
            <Link
              key={href}
              href={href}
              className={`rounded-lg px-4 py-3 transition-colors duration-300 ${
                isActive
                  ? "text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              } `}
              title={label}
            >
              {Icon && <Icon className="h-6 w-6" weight={isActive ? "fill" : "regular"} />}
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
  sidebarClassName?: string
  bottomNavClassName?: string
}

export default function Layout({ children, sidebarClassName, bottomNavClassName }: LayoutProps) {
  return (
    <div className="min-h-screen">
      {/* Desktop Sidebar */}
      <Sidebar className={sidebarClassName} />

      {/* Main Content */}
      <main className="md:ml-20">{children}</main>

      {/* Mobile Bottom Navigation */}
      <BottomMobileNav
        routes={routes}
        labels={false}
        className={`bg-background/80 backdrop-blur-lg ${bottomNavClassName || ""}`}
      />
    </div>
  )
}
