"use client"

import React, { memo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, Settings, User } from "lucide-react"

import { Icons } from "@/components/icons"
import { BottomMobileNav } from "@/registry/delta-ui/blocks/bottom-mobile-nav/components/bottom-mobile-nav"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/delta-ui/ui/tooltip"

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
    <nav className="bg-background/80 fixed top-0 left-0 z-50 hidden h-screen w-16 flex-col items-center border-r py-3 backdrop-blur-lg md:flex">
      {/* Top: Logo section */}
      <div className="mb-8">
        <Icons.logo className="size-5" />
      </div>

      {/* Middle: main nav icons (centered vertically) */}
      <div className="flex flex-1 flex-col items-center justify-center space-y-8">
        {routes.map(({ href, icon: Icon, label }) => {
          const isActive =
            pathname === href || (href === "#" && pathname === "/")
          return (
            <Tooltip key={href}>
              <TooltipTrigger asChild>
                <Link
                  href={href}
                  className={`rounded-xl p-2 transition-colors duration-300 ${
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  } `}
                >
                  {Icon && <Icon className="h-5 w-5" />}
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="[&_.bg-foreground.fill-foreground]:hidden"
              >
                {label}
              </TooltipContent>
            </Tooltip>
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

export default function BottomMobileNavPage() {
  return (
    <div className="min-h-screen">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="md:ml-16">
        <div className="bg-background flex min-h-screen w-full items-center justify-center">
          {/* Centered content */}
          <div className="max-w-2xl space-y-6 px-6 text-center">
            <h1 className="font-heading text-4xl font-bold">BottomMobileNav</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              This responsive layout shows a desktop sidebar (on md+ screens)
              and mobile bottom navigation (on smaller screens). The sidebar
              displays navigation icons vertically, while the mobile navigation
              appears at the bottom with smooth transitions.
            </p>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomMobileNav
        routes={routes}
        labels={false}
        className="bg-background/80 border-t backdrop-blur-lg"
      />
    </div>
  )
}
