"use client"

import { Home, Search, Settings, User } from "lucide-react"
import { BottomMobileNav } from "@/registry/delta-ui/blocks/bottom-mobile-nav/components/bottom-mobile-nav"


const demoNavigationRoutes = [
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

export default function BottomMobileNavPage() {
  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center">
      {/* Centered content */}
      <div className="text-center space-y-6 px-6 max-w-2xl">
        <h1 className="font-heading text-4xl font-bold">BottomMobileNav</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          ⚠️ This is a mobile-first navigation component designed for touch interactions on mobile devices. 
          To experience the full functionality and see the navigation bar in action, please view this component 
          on a mobile screen or use your browser's device emulation tools. The bottom navigation will appear 
          fixed at the bottom of your screen with smooth animations and interactive states.
        </p>
      </div>

      {/* Navigation without center button and no border */}
      <BottomMobileNav
        routes={demoNavigationRoutes}
        labels={false}
        className="border-none bg-background"
      />
    </div>
  )
}