"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Plus } from "lucide-react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

interface Route {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

interface BarItemProps {
  href: string
  label: string
  Icon?: React.ComponentType<{ className?: string }>
  isActive: boolean
  labels: boolean
  onItemClick: (href: string) => void
}

const BarItem = React.memo<BarItemProps>(
  ({ href, label, Icon, isActive, labels, onItemClick }) => {
    return (
      <li className="flex-1">
        <Link
          href={href}
          className={cn(
            "flex h-full w-full flex-col items-center justify-center px-1 transition-colors duration-150",
            labels ? "py-2" : "py-4"
          )}
          onClick={() => onItemClick(href)}
        >
          <div className="flex flex-col items-center">
            {Icon && (
              <div className="transform transition-transform duration-150 active:scale-95">
                <Icon
                  className={cn(
                    "h-7 w-7 transition-colors duration-150",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                />
              </div>
            )}
            {labels && (
              <span
                className={cn(
                  "mt-1.5 text-center text-[10px] leading-tight transition-colors duration-150",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {label}
              </span>
            )}
          </div>
        </Link>
      </li>
    )
  }
)

BarItem.displayName = "BarItem"

interface CenterButtonConfig {
  onClick: () => void
  label?: string
}

interface CenterButtonProps {
  onClick: () => void
  label?: string
  labels: boolean
}

const CenterButton = React.memo<CenterButtonProps>(
  ({ onClick, label, labels }) => {
    return (
      <li className="z-10 -mt-5 flex-none">
        <button
          onClick={onClick}
          className="flex flex-col items-center justify-center"
          aria-label={label || "Add"}
        >
          <div className="flex flex-col items-center">
            <div className="bg-primary rounded-full p-3.5 shadow-lg transition-all duration-150 hover:scale-105 hover:shadow-xl active:scale-95">
              <Plus className="text-primary-foreground h-6 w-6" />
            </div>
            {labels && label && (
              <span className="text-primary mt-1.5 text-center text-[10px] leading-tight">
                {label}
              </span>
            )}
          </div>
        </button>
      </li>
    )
  }
)

CenterButton.displayName = "CenterButton"

interface BottomMobileNavProps {
  routes?: Route[]
  labels?: boolean
  centerButton?: CenterButtonConfig
  enableEntranceAnimation?: boolean
  className?: string
}

export function BottomMobileNav({
  routes = [],
  labels = false,
  centerButton,
  enableEntranceAnimation = false,
  className,
}: BottomMobileNavProps) {
  const pathname = usePathname()
  const [lastClickedItem, setLastClickedItem] = React.useState<string | null>(
    null
  )
  const [activeRoute, setActiveRoute] = React.useState<string>("")

  // Optimized route detection with minimal DOM queries
  React.useEffect(() => {
    if (routes.length === 0) return

    const updateActiveRoute = () => {
      const hasHashRoutes = routes.some((route) => route.href.startsWith("#"))
      let currentRoute = ""

      if (hasHashRoutes) {
        currentRoute = window.location.hash
        // If no hash, default to first route for hash-based navigation
        if (!currentRoute && routes.length > 0) {
          currentRoute = routes[0].href
        }
      } else {
        currentRoute = pathname
      }

      setActiveRoute(currentRoute || routes[0]?.href || "")
    }

    updateActiveRoute()

    // Use single event listener for both hash and navigation changes
    const handleRouteChange = () => updateActiveRoute()

    window.addEventListener("hashchange", handleRouteChange, { passive: true })
    window.addEventListener("popstate", handleRouteChange, { passive: true })

    return () => {
      window.removeEventListener("hashchange", handleRouteChange)
      window.removeEventListener("popstate", handleRouteChange)
    }
  }, [routes, pathname])

  // Additional effect to handle initial hash on client-side hydration
  React.useEffect(() => {
    if (
      typeof window !== "undefined" &&
      routes.some((route) => route.href.startsWith("#"))
    ) {
      const initialHash = window.location.hash
      if (initialHash) {
        setActiveRoute(initialHash)
      }
    }
  }, [])

  // Optimized click handler with minimal state updates
  const handleItemClick = React.useCallback(
    (href: string) => {
      // Scroll to top optimization for same active item
      if (lastClickedItem === href && activeRoute === href) {
        // Use requestAnimationFrame for smooth scroll timing
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

  const handleCenterButtonClick = React.useCallback(() => {
    centerButton?.onClick()
  }, [centerButton])

  // Optimized route splitting with useMemo
  const { firstHalf, secondHalf } = React.useMemo(() => {
    const halfLength = Math.ceil(routes.length / 2)
    return {
      firstHalf: routes.slice(0, halfLength),
      secondHalf: routes.slice(halfLength),
    }
  }, [routes])

  // Conditional motion props to avoid unnecessary animations
  const motionProps = enableEntranceAnimation
    ? {
        initial: { y: 100, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.3 },
      }
    : undefined

  return (
    <motion.nav
      className={cn(
        "fixed right-0 bottom-0 left-0 z-50 block py-1 md:hidden",
        "supports-[backdrop-filter]:bg-background/85 backdrop-blur-lg",
        className
      )}
      {...motionProps}
    >
      <ul className="relative flex items-center justify-around">
        {centerButton ? (
          <>
            {firstHalf.map(({ href, label, icon: Icon }, index) => (
              <BarItem
                key={`${label}-${index}`}
                href={href}
                label={label}
                Icon={Icon}
                isActive={activeRoute === href}
                labels={labels}
                onItemClick={handleItemClick}
              />
            ))}

            <CenterButton
              onClick={handleCenterButtonClick}
              label={centerButton.label}
              labels={labels}
            />

            {secondHalf.map(({ href, label, icon: Icon }, index) => (
              <BarItem
                key={`${label}-${firstHalf.length + index}`}
                href={href}
                label={label}
                Icon={Icon}
                isActive={activeRoute === href}
                labels={labels}
                onItemClick={handleItemClick}
              />
            ))}
          </>
        ) : (
          routes.map(({ href, label, icon: Icon }, index) => (
            <BarItem
              key={`${label}-${index}`}
              href={href}
              label={label}
              Icon={Icon}
              isActive={activeRoute === href}
              labels={labels}
              onItemClick={handleItemClick}
            />
          ))
        )}
      </ul>
    </motion.nav>
  )
}
