"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ArrowDown, DeviceMobile, DeviceTablet, Monitor, SignIn, List } from "@phosphor-icons/react"
import Header from "./header"

// Example login button component
function LoginButton() {
  return (
    <Link
      href="/login"
      className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
    >
      <SignIn size={18} weight="bold" />
      <span>Log in</span>
    </Link>
  )
}

export default function HeaderDemo() {
  const [viewportSize, setViewportSize] = useState<"mobile" | "tablet" | "desktop">("desktop")
  const [showInfo, setShowInfo] = useState(true)
  const [showLoginButton, setShowLoginButton] = useState(true)

  return (
    <div className="space-y-8 p-8">
      <div>
        <h2 className="text-lg font-medium mb-4">Default Header</h2>
        <div className="border rounded-lg overflow-hidden">
          <Header />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-4">Header with Custom Logo</h2>
        <div className="border rounded-lg overflow-hidden">
          <Header />
          <div className="p-4 bg-muted">
            <p className="text-sm text-muted-foreground">
              Note: The logo can be customized by passing props to the Logo component in the header.
              See the Logo demo for available customization options.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-4">Mobile View</h2>
        <div className="border rounded-lg overflow-hidden">
          <div className="w-[375px] mx-auto">
            <Header />
          </div>
          <div className="p-4 bg-muted">
            <p className="text-sm text-muted-foreground">
              The header is fully responsive and includes a mobile menu.
              Try resizing your browser window to see the responsive behavior.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

