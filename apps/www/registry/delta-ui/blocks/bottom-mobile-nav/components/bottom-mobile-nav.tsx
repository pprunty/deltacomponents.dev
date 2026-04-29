"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Plus } from "lucide-react"

import { cn } from "@/lib/utils"

interface Route {
  href: string
  label: string
  icon: React.ComponentType<any>
}

interface BarItemProps {
  href: string
  label: string
  Icon?: React.ComponentType<any>
  isActive: boolean
  labels: boolean
  onItemClick: (href: string) => void
}

function usePressAnimation(releaseDuration = 300) {
  const [phase, setPhase] = React.useState<"idle" | "down" | "up">("idle")
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const clearPending = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const pressDown = React.useCallback(() => {
    clearPending()
    setPhase("down")
  }, [clearPending])

  const pressUp = React.useCallback(() => {
    clearPending()
    setPhase("up")
    timeoutRef.current = setTimeout(() => {
      setPhase("idle")
    }, releaseDuration)
  }, [clearPending, releaseDuration])

  const triggerPress = React.useCallback(() => {
    clearPending()
    setPhase("down")
    timeoutRef.current = setTimeout(() => {
      setPhase("up")
      timeoutRef.current = setTimeout(() => {
        setPhase("idle")
      }, releaseDuration)
    }, 80)
  }, [clearPending, releaseDuration])

  React.useEffect(() => {
    return () => clearPending()
  }, [clearPending])

  return { phase, pressDown, pressUp, triggerPress }
}

const PRESS_DOWN_DURATION = "120ms"
const PRESS_DOWN_EASING = "cubic-bezier(0.25, 0.1, 0.25, 1)"
const PRESS_DOWN_SCALE = "scale(0.86)"

const RELEASE_DURATION = "320ms"
const RELEASE_EASING = "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
const RELEASE_SCALE = "scale(1)"

function getPressStyle(phase: "idle" | "down" | "up") {
  if (phase === "down") {
    return {
      transform: PRESS_DOWN_SCALE,
      transitionProperty: "transform",
      transitionDuration: PRESS_DOWN_DURATION,
      transitionTimingFunction: PRESS_DOWN_EASING,
    }
  }
  return {
    transform: RELEASE_SCALE,
    transitionProperty: "transform",
    transitionDuration: phase === "up" ? RELEASE_DURATION : "0ms",
    transitionTimingFunction: RELEASE_EASING,
  }
}

const CENTER_PRESS_DOWN_SCALE = "scale(0.88)"

function getCenterPressStyle(phase: "idle" | "down" | "up") {
  if (phase === "down") {
    return {
      transform: CENTER_PRESS_DOWN_SCALE,
      transitionProperty: "transform",
      transitionDuration: PRESS_DOWN_DURATION,
      transitionTimingFunction: PRESS_DOWN_EASING,
    }
  }
  return {
    transform: RELEASE_SCALE,
    transitionProperty: "transform",
    transitionDuration: phase === "up" ? RELEASE_DURATION : "0ms",
    transitionTimingFunction: RELEASE_EASING,
  }
}

const BarItem = React.memo<BarItemProps>(
  ({ href, label, Icon, isActive, labels, onItemClick }) => {
    const { phase, pressDown, pressUp, triggerPress } = usePressAnimation(300)
    const touchedRef = React.useRef(false)

    const handleTouchStart = () => {
      touchedRef.current = true
      pressDown()
    }

    const handleTouchEnd = () => {
      pressUp()
    }

    const handleClick = () => {
      if (!touchedRef.current) {
        triggerPress()
      }
      touchedRef.current = false
      onItemClick(href)
    }

    return (
      <li className="flex-1">
        <Link
          href={href}
          className={cn(
            "flex h-full w-full flex-col items-center justify-center px-1 transition-colors duration-150 select-none",
            labels ? "py-2" : "py-3"
          )}
          style={{ WebkitTouchCallout: "none" }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          onClick={handleClick}
        >
          <div
            className="pointer-events-none flex flex-col items-center will-change-transform"
            style={getPressStyle(phase)}
          >
            {Icon && (
              <Icon
                className={cn(
                  "h-7 w-7 transition-colors duration-150",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              />
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
    const { phase, pressDown, pressUp, triggerPress } = usePressAnimation(300)
    const touchedRef = React.useRef(false)

    const handleTouchStart = () => {
      touchedRef.current = true
      pressDown()
    }

    const handleTouchEnd = () => {
      pressUp()
    }

    const handleClick = () => {
      if (!touchedRef.current) {
        triggerPress()
      }
      touchedRef.current = false
      onClick()
    }

    return (
      <li className="flex-1">
        <button
          type="button"
          onClick={handleClick}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          className="flex h-full w-full flex-col items-center justify-center px-1 py-1 transition-colors duration-150 select-none"
          style={{ WebkitTouchCallout: "none" }}
          aria-label={label || "Add"}
        >
          <div className="pointer-events-none flex flex-col items-center">
            <div
              className="supports-[backdrop-filter]:bg-muted/90 rounded-lg px-6 py-2 backdrop-blur-lg will-change-transform"
              style={getCenterPressStyle(phase)}
            >
              <Plus className="text-muted-foreground h-7 w-7 transition-colors duration-150" />
            </div>
            {labels && label && (
              <span className="text-accent-foreground mt-1.5 text-center text-[10px] leading-tight">
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
  className?: string
  /**
   * Renders a soft top-to-bottom gradient backdrop fading the content behind
   * the nav into the background colour. When false, falls back to a solid
   * blurred background.
   */
  gradient?: boolean
}

export function BottomMobileNav({
  routes = [],
  labels = false,
  centerButton,
  className,
  gradient = true,
}: BottomMobileNavProps) {
  const pathname = usePathname()
  const [lastClickedItem, setLastClickedItem] = React.useState<string | null>(
    null
  )
  const [activeRoute, setActiveRoute] = React.useState<string>("")

  React.useEffect(() => {
    if (routes.length === 0) return

    const updateActiveRoute = () => {
      const hasHashRoutes = routes.some((route) => route.href.startsWith("#"))
      let currentRoute = ""

      if (hasHashRoutes) {
        currentRoute = window.location.hash
        if (!currentRoute && routes.length > 0) {
          currentRoute = routes[0].href
        }
      } else {
        currentRoute = pathname
      }

      setActiveRoute(currentRoute || routes[0]?.href || "")
    }

    updateActiveRoute()

    const handleRouteChange = () => updateActiveRoute()

    window.addEventListener("hashchange", handleRouteChange, { passive: true })
    window.addEventListener("popstate", handleRouteChange, { passive: true })

    return () => {
      window.removeEventListener("hashchange", handleRouteChange)
      window.removeEventListener("popstate", handleRouteChange)
    }
  }, [routes, pathname])

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

  const handleCenterButtonClick = React.useCallback(() => {
    centerButton?.onClick()
  }, [centerButton])

  const { firstHalf, secondHalf } = React.useMemo(() => {
    const halfLength = Math.ceil(routes.length / 2)
    return {
      firstHalf: routes.slice(0, halfLength),
      secondHalf: routes.slice(halfLength),
    }
  }, [routes])

  return (
    <nav
      className={cn(
        "fixed right-0 bottom-0 left-0 z-50 block py-1 md:hidden",
        "pt-1 pb-[env(safe-area-inset-bottom,4px)]",
        !gradient &&
          "supports-[backdrop-filter]:bg-background/85 backdrop-blur-lg",
        className
      )}
      style={
        gradient
          ? {
              background:
                "linear-gradient(to bottom, transparent 0%, color-mix(in srgb, var(--background) 15%, transparent) 5%, color-mix(in srgb, var(--background) 40%, transparent) 10%, color-mix(in srgb, var(--background) 60%, transparent) 15%, color-mix(in srgb, var(--background) 80%, transparent) 25%, var(--background) 45%)",
            }
          : undefined
      }
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
    </nav>
  )
}
