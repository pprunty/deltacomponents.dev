"use client"

import React, { memo, useCallback, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Plus } from "phosphor-react"

import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/delta-ui/ui/tooltip"

interface Route {
  href: string
  label: string
  icon: React.ComponentType<any>
}

interface SidebarProps {
  className?: string
  routes?: Route[]
  showCTAButton?: boolean
  onCTAClick?: () => void
  tooltips?: boolean
}

function usePressAnimation(duration = 100) {
  const [isPressed, setIsPressed] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const trigger = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsPressed(true)
    timeoutRef.current = setTimeout(() => setIsPressed(false), duration)
  }, [duration])

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return { isPressed, trigger }
}

export const Sidebar = memo(function Sidebar({
  className,
  routes = [],
  showCTAButton = true,
  onCTAClick = () => console.log("Sidebar CTA clicked"),
  tooltips = true,
}: SidebarProps) {
  const pathname = usePathname()
  const [lastClickedItem, setLastClickedItem] = React.useState<string | null>(
    null
  )
  const [activeRoute, setActiveRoute] = React.useState<string>("")
  const [clickedItem, setClickedItem] = React.useState<string | null>(null)

  const pressAnimations = useRef<
    Record<string, ReturnType<typeof usePressAnimation>>
  >({})
  const getAnimation = (key: string) => {
    if (!pressAnimations.current[key]) {
      pressAnimations.current[key] = { isPressed: false, trigger: () => {} }
    }
    return pressAnimations.current[key]
  }

  const [pressedItems, setPressedItems] = useState<Record<string, boolean>>({})
  const timeoutsRef = useRef<Record<string, NodeJS.Timeout>>({})

  const triggerPress = useCallback((key: string) => {
    if (timeoutsRef.current[key]) clearTimeout(timeoutsRef.current[key])
    setPressedItems((prev) => ({ ...prev, [key]: true }))
    timeoutsRef.current[key] = setTimeout(() => {
      setPressedItems((prev) => ({ ...prev, [key]: false }))
    }, 100)
  }, [])

  React.useEffect(() => {
    return () => {
      Object.values(timeoutsRef.current).forEach(clearTimeout)
    }
  }, [])

  React.useEffect(() => {
    if (routes.length > 0) {
      setActiveRoute(routes[0]?.href || "")
      setClickedItem(routes[0]?.href || null)
    }
  }, [routes])

  const handleItemClick = React.useCallback(
    (href: string) => {
      if (lastClickedItem === href && activeRoute === href) {
        requestAnimationFrame(() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        })
      }
      setLastClickedItem(href)
    },
    [lastClickedItem, activeRoute]
  )

  return (
    <TooltipProvider>
      <nav
        className={cn(
          "bg-background/80 fixed top-0 left-0 z-50 hidden h-screen w-20 flex-col items-center border-r py-3 backdrop-blur-lg md:flex",
          className
        )}
      >
        <div className="mb-8 py-2">
          <Link href="/" className="block" onClick={() => handleItemClick("/")}>
            <svg
              viewBox="0 0 282 308"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="size-6"
            >
              <path
                d="M280.438 295.396L152.117 5.66075C151.645 3.87252 150.584 2.32152 149.12 1.29292C147.665 0.264327 145.896 -0.172778 144.147 0.0619372H120.258C118.509 -0.172778 116.74 0.264327 115.285 1.29292C113.821 2.32152 112.76 3.87252 112.288 5.66075L0.780777 295.396C0.171502 296.774 -0.0839596 298.294 0.0241376 299.81C0.132235 301.327 0.603995 302.788 1.40981 304.052C2.2058 305.318 3.30641 306.345 4.58392 307.034C5.87126 307.725 7.30596 308.054 8.75053 307.993H272.92C279.111 307.993 284.86 300.528 280.438 295.396ZM122.469 127.434L177.775 250.605C178.384 252.07 178.65 253.664 178.551 255.257C178.453 256.85 177.991 258.395 177.215 259.765C176.429 261.133 175.358 262.286 174.07 263.128C172.783 263.969 171.329 264.475 169.815 264.602H68.037C66.4941 264.493 64.9807 264.019 63.6246 263.213C62.2685 262.408 61.1089 261.293 60.2146 259.951C59.3204 258.607 58.7307 257.07 58.4752 255.454C58.2197 253.836 58.318 252.18 58.7504 250.605L106.539 127.434C107.266 125.856 108.397 124.525 109.802 123.594C111.207 122.663 112.838 122.169 114.499 122.169C116.17 122.169 117.791 122.663 119.206 123.594C120.612 124.525 121.741 125.856 122.469 127.434Z"
                fill="currentColor"
              />
            </svg>
          </Link>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center space-y-4">
          {routes.slice(0, 2).map(({ href, icon: Icon, label }, index) => {
            const isActive = clickedItem === href
            const linkElement = (
              <Link
                key={href}
                href={href}
                onClick={() => {
                  handleItemClick(href)
                  setClickedItem(href)
                  triggerPress(href)
                }}
                style={{
                  transform: pressedItems[href] ? "scale(0.92)" : "scale(1)",
                  transition: "transform 100ms cubic-bezier(.08,.52,.52,1)",
                }}
                className={cn(
                  "group relative rounded-lg px-4 py-3 transition-colors duration-300",
                  isActive ? "text-accent-foreground" : "text-muted-foreground"
                )}
              >
                <div className="bg-accent absolute inset-0 scale-75 rounded-lg opacity-0 transition-all duration-200 ease-out group-hover:scale-100 group-hover:opacity-100" />
                {Icon && (
                  <Icon
                    className={cn(
                      "relative z-10 h-6 w-6 transition-colors duration-300",
                      isActive && "text-accent-foreground"
                    )}
                    weight={isActive ? "fill" : "regular"}
                  />
                )}
              </Link>
            )

            return tooltips ? (
              <Tooltip key={href}>
                <TooltipTrigger asChild>{linkElement}</TooltipTrigger>
                <TooltipContent side="right" sideOffset={4} hideArrow>
                  {label}
                </TooltipContent>
              </Tooltip>
            ) : (
              <div key={href}>{linkElement}</div>
            )
          })}

          {showCTAButton &&
            (() => {
              const buttonElement = (
                <button
                  key="cta-button"
                  onClick={() => {
                    onCTAClick()
                    triggerPress("cta")
                  }}
                  style={{
                    transform: pressedItems["cta"] ? "scale(0.92)" : "scale(1)",
                    transition: "transform 100ms cubic-bezier(.08,.52,.52,1)",
                  }}
                  className="group bg-muted text-muted-foreground relative cursor-pointer rounded-lg px-4 py-3 transition-colors duration-300"
                >
                  <div className="bg-accent absolute inset-0 scale-75 rounded-lg opacity-0 transition-all duration-200 ease-out group-hover:scale-100 group-hover:opacity-100" />
                  <Plus
                    className="group-hover:text-accent-foreground relative z-10 h-6 w-6 transition-colors duration-300"
                    weight="regular"
                  />
                </button>
              )

              return tooltips ? (
                <Tooltip>
                  <TooltipTrigger asChild>{buttonElement}</TooltipTrigger>
                  <TooltipContent side="right" sideOffset={4} hideArrow>
                    Add
                  </TooltipContent>
                </Tooltip>
              ) : (
                buttonElement
              )
            })()}

          {routes.slice(2).map(({ href, icon: Icon, label }, index) => {
            const isActive = clickedItem === href
            const linkElement = (
              <Link
                key={href}
                href={href}
                onClick={() => {
                  handleItemClick(href)
                  setClickedItem(href)
                  triggerPress(href)
                }}
                style={{
                  transform: pressedItems[href] ? "scale(0.92)" : "scale(1)",
                  transition: "transform 100ms cubic-bezier(.08,.52,.52,1)",
                }}
                className={cn(
                  "group relative rounded-lg px-4 py-3 transition-colors duration-300",
                  isActive ? "text-accent-foreground" : "text-muted-foreground"
                )}
              >
                <div className="bg-accent absolute inset-0 scale-75 rounded-lg opacity-0 transition-all duration-200 ease-out group-hover:scale-100 group-hover:opacity-100" />
                {Icon && (
                  <Icon
                    className={cn(
                      "relative z-10 h-6 w-6 transition-colors duration-300",
                      isActive && "text-accent-foreground"
                    )}
                    weight={isActive ? "fill" : "regular"}
                  />
                )}
              </Link>
            )

            return tooltips ? (
              <Tooltip key={href}>
                <TooltipTrigger asChild>{linkElement}</TooltipTrigger>
                <TooltipContent side="right" sideOffset={4} hideArrow>
                  {label}
                </TooltipContent>
              </Tooltip>
            ) : (
              <div key={href}>{linkElement}</div>
            )
          })}
        </div>

        <div className="mt-auto">
          {/* You can add theme switcher or other controls here */}
        </div>
      </nav>
    </TooltipProvider>
  )
})

Sidebar.displayName = "Sidebar"
