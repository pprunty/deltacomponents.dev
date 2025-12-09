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

  const Logo = () => (
    <svg
      className="size-6"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L2 7L12 12L22 7L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 17L12 22L22 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 12L12 17L22 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
            <Logo />
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
