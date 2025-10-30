"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

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

const BarItem = React.memo<BarItemProps>(({ href, label, Icon, isActive, labels, onItemClick }) => {
  return (
    <li className="flex-1">
      <Link
        href={href}
        className={cn(
          "flex flex-col items-center justify-center w-full h-full px-1 transition-colors duration-150",
          labels ? "py-2" : "py-4",
        )}
        onClick={() => onItemClick(href)}
      >
        <div className="flex flex-col items-center">
          {Icon && (
            <div className="transform transition-transform duration-150 active:scale-95">
              <Icon
                className={cn(
                  "w-7 h-7 transition-colors duration-150",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
              />
            </div>
          )}
          {labels && (
            <span
              className={cn(
                "text-[10px] leading-tight text-center mt-1.5 transition-colors duration-150",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
            >
              {label}
            </span>
          )}
        </div>
      </Link>
    </li>
  )
})

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

const CenterButton = React.memo<CenterButtonProps>(({ onClick, label, labels }) => {
  return (
    <li className="flex-none -mt-5 z-10">
      <button onClick={onClick} className="flex flex-col items-center justify-center" aria-label={label || "Add"}>
        <div className="flex flex-col items-center">
          <div className="p-3.5 rounded-full bg-primary shadow-lg transition-all duration-150 hover:scale-105 active:scale-95 hover:shadow-xl">
            <Plus className="w-6 h-6 text-primary-foreground" />
          </div>
          {labels && label && (
            <span className="text-[10px] leading-tight text-center mt-1.5 text-primary">{label}</span>
          )}
        </div>
      </button>
    </li>
  )
})

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
  const [lastClickedItem, setLastClickedItem] = React.useState<string | null>(null)
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
    if (typeof window !== 'undefined' && routes.some((route) => route.href.startsWith("#"))) {
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
    [lastClickedItem, activeRoute],
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
        "block md:hidden fixed py-1 bottom-0 left-0 right-0 z-50",
        "backdrop-blur-lg supports-[backdrop-filter]:bg-background/85",
        className,
      )}
      {...motionProps}
    >
      <ul className="flex justify-around items-center relative">
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

            <CenterButton onClick={handleCenterButtonClick} label={centerButton.label} labels={labels} />

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
