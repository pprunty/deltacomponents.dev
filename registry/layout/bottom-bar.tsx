"use client"

import React, { memo, useCallback, useState } from "react"
import type { FC } from "react"
import type { IconProps } from "@phosphor-icons/react"
import { Plus } from "@phosphor-icons/react"
import clsx from "clsx"
import { motion } from "motion/react"

// Route interface
interface Route {
  href: string
  label: string
  icon: React.ForwardRefExoticComponent<IconProps>
}

// Animation styles defined inline for maintainability
const animationStyles = `
  @keyframes icon-pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
  .icon-pulse { animation: icon-pulse 0.3s ease-in-out; }
  .icon-container { transition: transform 0.2s ease-in-out; }
`

interface BarItemProps {
  href: string
  label: string
  Icon?: React.ForwardRefExoticComponent<IconProps>
  isActive: boolean
  showLabels: boolean
  onItemClick: () => void
  animationKey: number
}

const BarItem = memo(
  ({
    href,
    label,
    Icon,
    isActive,
    showLabels,
    onItemClick,
    animationKey,
  }: BarItemProps) => {
    return (
      <li className="flex-1">
        <a
          href={href}
          className={clsx(
            "flex flex-col items-center justify-center w-full h-full px-1",
            showLabels ? "py-2" : "py-4"
          )}
          onClick={() => {
            onItemClick()
          }}
        >
          <motion.div
            key={animationKey}
            className="flex flex-col items-center"
            initial={{ scale: 1 }}
            animate={isActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {Icon && (
              <motion.div
                className="icon-container"
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
              >
                <Icon
                  weight={isActive ? "fill" : "regular"}
                  className={clsx(
                    "w-7 h-7",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                />
              </motion.div>
            )}
            {showLabels && (
              <motion.span
                className={clsx(
                  "text-[10px] leading-tight text-center mt-1.5",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: isActive ? 1 : 0.8 }}
                transition={{ duration: 0.2 }}
              >
                {label}
              </motion.span>
            )}
          </motion.div>
        </a>
      </li>
    )
  }
)

BarItem.displayName = "BarItem"

// Update CenterButtonConfig
interface CenterButtonConfig {
  onClick: () => void
  label?: string
}

// Update CenterButtonProps
interface CenterButtonProps {
  onClick: () => void
  label?: string
  showLabels: boolean
  animationKey: number
}

// Update CenterButton component
const CenterButton = memo(
  ({ onClick, label, showLabels, animationKey }: CenterButtonProps) => {
    return (
      <li className="flex-none -mt-5 z-10">
        <button
          onClick={onClick}
          className="flex flex-col items-center justify-center"
          aria-label={label || "Add"}
        >
          <motion.div
            key={animationKey}
            className="flex flex-col items-center"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.div
              className="p-3.5 rounded-full bg-primary shadow-lg transition-colors"
              whileHover={{
                scale: 1.05,
                backgroundColor: "var(--primary-hover, var(--primary))",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }}
            >
              <Plus weight="bold" className="w-6 h-6 text-primary-foreground" />
            </motion.div>
            {showLabels && label && (
              <motion.span
                className="text-[10px] leading-tight text-center mt-1.5 text-primary"
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {label}
              </motion.span>
            )}
          </motion.div>
        </button>
      </li>
    )
  }
)

CenterButton.displayName = "CenterButton"

interface BottomBarProps {
  routes?: Route[]
  showLabels?: boolean
  centerButton?: CenterButtonConfig
  showBorderTop?: boolean
  enableEntranceAnimation?: boolean
}

const BottomBar: FC<BottomBarProps> = memo(function BottomBar({
  routes = [],
  showLabels = false,
  centerButton,
  showBorderTop = true,
  enableEntranceAnimation = false,
}) {
  const [animationKeys, setAnimationKeys] = useState<Record<string, number>>({})
  const [activeRoute, setActiveRoute] = useState<string>("")
  const [lastClickedItem, setLastClickedItem] = useState<string | null>(null)

  // Update active route based on current location and route types
  React.useEffect(() => {
    // Get current route (hash or pathname) based on route type
    const getCurrentRoute = () => {
      if (typeof window === "undefined") return ""

      // Check if we have any hash routes
      const hasHashRoutes = routes.some((route) => route.href.startsWith("#"))

      if (hasHashRoutes) {
        return window.location.hash
      } else {
        return window.location.pathname
      }
    }

    const updateActiveRoute = () => {
      const currentRoute = getCurrentRoute()
      setActiveRoute(currentRoute || (routes.length > 0 ? routes[0].href : ""))
    }

    // Set initial route
    updateActiveRoute()

    // Listen for both hash changes and navigation changes
    window.addEventListener("hashchange", updateActiveRoute)
    window.addEventListener("popstate", updateActiveRoute)

    return () => {
      window.removeEventListener("hashchange", updateActiveRoute)
      window.removeEventListener("popstate", updateActiveRoute)
    }
  }, [routes])

  const handleItemClick = useCallback(
    (href: string) => {
      setAnimationKeys((prev) => ({
        ...prev,
        [href]: (prev[href] || 0) + 1,
      }))

      // Check if clicking the same item that's already active
      if (lastClickedItem === href && activeRoute === href) {
        // Scroll to top if clicking the same active item
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }, 100)
      }

      setLastClickedItem(href)
    },
    [lastClickedItem, activeRoute]
  )

  const handleCenterButtonClick = useCallback(() => {
    setAnimationKeys((prev) => ({
      ...prev,
      centerButton: (prev.centerButton || 0) + 1,
    }))
    centerButton?.onClick()
  }, [centerButton])

  // Split routes into two halves for layout with center button
  const halfLength = Math.ceil(routes.length / 2)
  const firstHalf = routes.slice(0, halfLength)
  const secondHalf = routes.slice(halfLength)

  // Define animation props based on enableEntranceAnimation
  const motionProps = enableEntranceAnimation
    ? {
        initial: { y: 100, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.3 },
      }
    : {
        initial: { y: 0, opacity: 1 },
        animate: { y: 0, opacity: 1 },
      }

  return (
    <>
      {/* Inline styles for maintainability */}
      <style jsx>{animationStyles}</style>

      <motion.nav
        className={clsx(
          "block md:hidden fixed py-1 bottom-0 left-0 right-0 z-50 backdrop-blur backdrop-blur-lg supports-[backdrop-filter]:bg-background/85",
          showBorderTop && "border-t border-border"
        )}
        {...motionProps}
      >
        <ul className="flex justify-around items-center relative">
          {centerButton ? (
            <>
              {/* First half of navigation items */}
              {firstHalf.map(({ href, label, icon: Icon }) => (
                <BarItem
                  key={href}
                  href={href}
                  label={label}
                  Icon={Icon}
                  isActive={activeRoute === href}
                  showLabels={showLabels}
                  onItemClick={() => handleItemClick(href)}
                  animationKey={animationKeys[href] || 0}
                />
              ))}

              {/* Center button */}
              <CenterButton
                onClick={handleCenterButtonClick}
                label={centerButton.label}
                showLabels={showLabels}
                animationKey={animationKeys.centerButton || 0}
              />

              {/* Second half of navigation items */}
              {secondHalf.map(({ href, label, icon: Icon }) => (
                <BarItem
                  key={href}
                  href={href}
                  label={label}
                  Icon={Icon}
                  isActive={activeRoute === href}
                  showLabels={showLabels}
                  onItemClick={() => handleItemClick(href)}
                  animationKey={animationKeys[href] || 0}
                />
              ))}
            </>
          ) : (
            // Original layout without center button
            routes.map(({ href, label, icon: Icon }) => (
              <BarItem
                key={href}
                href={href}
                label={label}
                Icon={Icon}
                isActive={activeRoute === href}
                showLabels={showLabels}
                onItemClick={() => handleItemClick(href)}
                animationKey={animationKeys[href] || 0}
              />
            ))
          )}
        </ul>
      </motion.nav>
    </>
  )
})

BottomBar.displayName = "BottomBar"

export default BottomBar
