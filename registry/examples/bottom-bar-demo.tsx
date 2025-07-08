"use client"

import React from "react"
import type { IconProps } from "@phosphor-icons/react"
import {
  Heart,
  House,
  Info,
  MagnifyingGlass,
  User,
} from "@phosphor-icons/react"

import BottomBar from "@/registry/layout/bottom-bar"

interface Route {
  href: string
  label: string
  icon: React.ForwardRefExoticComponent<IconProps>
}

const demoRoutes: Route[] = [
  {
    href: "/",
    label: "Home",
    icon: House,
  },
  {
    href: "/search",
    label: "Search",
    icon: MagnifyingGlass,
  },
  {
    href: "#about",
    label: "About",
    icon: Info,
  },
  {
    href: "/favorites",
    label: "Favorites",
    icon: Heart,
  },
  {
    href: "/profile",
    label: "Profile",
    icon: User,
  },
]

export default function BottomBarDemo() {
  return (
    <div className="relative h-96 bg-background border border-border rounded-lg overflow-hidden">
      <div className="p-4 h-full overflow-y-auto">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-2">
              Mobile Navigation Demo
            </h2>
            <p className="text-muted-foreground text-sm">
              Navigation bar with labels enabled. Try tapping "About" to scroll
              to the about section.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Welcome</h3>
              <p className="text-sm text-muted-foreground">
                This demo shows how the bottom bar works with labels enabled and
                anchor navigation.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Features</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Mobile-first design</li>
                <li>• Smooth animations</li>
                <li>• Anchor link navigation</li>
                <li>• Active state indicators</li>
              </ul>
            </div>

            <div id="about">
              <h3 className="font-medium mb-2">About</h3>
              <p className="text-sm text-muted-foreground">
                This is the About section! When you tap "About" in the bottom
                navigation, it scrolls to this section. The navigation supports
                both page routing and anchor link navigation for smooth user
                experiences.
              </p>
            </div>
          </div>
        </div>
      </div>
      <BottomBar routes={demoRoutes} showLabels={true} />
    </div>
  )
}
