"use client"

import React, { memo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Plus } from "phosphor-react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import {
  Tooltip,
  TooltipContent,
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
  showTooltips?: boolean
}

export const Sidebar = memo(function Sidebar({
  className,
  routes = [],
  showCTAButton = true,
  onCTAClick = () => console.log("Sidebar CTA clicked"),
  showTooltips = true,
}: SidebarProps) {
  const pathname = usePathname()
  const [lastClickedItem, setLastClickedItem] = React.useState<string | null>(
    null
  )
  const [activeRoute, setActiveRoute] = React.useState<string>("")

  // Set initial active route
  React.useEffect(() => {
    if (routes.length > 0) {
      setActiveRoute(routes[0]?.href || "")
    }
  }, [routes])

  const handleItemClick = React.useCallback(
    (href: string) => {
      // Scroll to top if clicking the same active item
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
    <nav
      className={cn(
        "bg-background/80 fixed top-0 left-0 z-50 hidden h-screen w-20 flex-col items-center border-r py-3 backdrop-blur-lg md:flex",
        className
      )}
    >
      {/* Top: Logo section */}
      <div className="mb-8 py-2">
        <Link href="/" className="block" onClick={() => handleItemClick("/")}>
          <Icons.logo className="size-6.5" />
        </Link>
      </div>

      {/* Middle: main nav icons (centered vertically) */}
      <div className="flex flex-1 flex-col items-center justify-center space-y-4">
        {routes.slice(0, 2).map(({ href, icon: Icon, label }, index) => {
          const isActive = index === 0 // Make first item (Home) active by default
          const linkElement = (
            <Link
              href={href}
              onClick={() => handleItemClick(href)}
              className={`group relative rounded-lg px-4 py-3 transition-colors duration-300 ${
                isActive ? "text-accent-foreground" : "text-muted-foreground"
              }`}
            >
              <div className="bg-accent absolute inset-0 scale-75 rounded-lg opacity-0 transition-all duration-200 ease-out group-hover:scale-100 group-hover:opacity-100" />
              {Icon && (
                <Icon
                  className="group-hover:text-accent-foreground relative z-10 h-6.5 w-6.5 transition-colors duration-300"
                  weight={isActive ? "fill" : "regular"}
                />
              )}
            </Link>
          )

          return showTooltips ? (
            <Tooltip key={href}>
              <TooltipTrigger asChild>{linkElement}</TooltipTrigger>
              <TooltipContent
                side="right"
                sideOffset={2}
                className="animate-in fade-in-0 slide-in-from-left-1 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-left-1 data-[state=closed]:zoom-out-95 [&_.bg-foreground.fill-foreground]:hidden [&>*[data-radix-tooltip-arrow]]:hidden [&>svg]:hidden"
              >
                {label}
              </TooltipContent>
            </Tooltip>
          ) : (
            <div key={href}>{linkElement}</div>
          )
        })}

        {/* CTA Button */}
        {showCTAButton &&
          (() => {
            const buttonElement = (
              <button
                onClick={onCTAClick}
                className="group bg-muted text-muted-foreground relative rounded-lg px-4 py-3 transition-colors duration-300"
              >
                <div className="bg-accent absolute inset-0 scale-75 rounded-lg opacity-0 transition-all duration-200 ease-out group-hover:scale-100 group-hover:opacity-100" />
                <Plus
                  className="group-hover:text-accent-foreground relative z-10 h-6.5 w-6.5 transition-colors duration-300"
                  weight="regular"
                />
              </button>
            )

            return showTooltips ? (
              <Tooltip>
                <TooltipTrigger asChild>{buttonElement}</TooltipTrigger>
                <TooltipContent
                  side="right"
                  sideOffset={2}
                  className="animate-in fade-in-0 slide-in-from-left-1 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-left-1 data-[state=closed]:zoom-out-95 [&_.bg-foreground.fill-foreground]:hidden [&>*[data-radix-tooltip-arrow]]:hidden [&>svg]:hidden"
                >
                  Add
                </TooltipContent>
              </Tooltip>
            ) : (
              buttonElement
            )
          })()}

        {routes.slice(2).map(({ href, icon: Icon, label }, index) => {
          const isActive = false // Bottom items not active by default
          const linkElement = (
            <Link
              href={href}
              onClick={() => handleItemClick(href)}
              className={`group relative rounded-lg px-4 py-3 transition-colors duration-300 ${
                isActive ? "text-accent-foreground" : "text-muted-foreground"
              }`}
            >
              <div className="bg-accent absolute inset-0 scale-75 rounded-lg opacity-0 transition-all duration-200 ease-out group-hover:scale-100 group-hover:opacity-100" />
              {Icon && (
                <Icon
                  className="group-hover:text-accent-foreground relative z-10 h-6.5 w-6.5 transition-colors duration-300"
                  weight={isActive ? "fill" : "regular"}
                />
              )}
            </Link>
          )

          return showTooltips ? (
            <Tooltip key={href}>
              <TooltipTrigger asChild>{linkElement}</TooltipTrigger>
              <TooltipContent
                side="right"
                sideOffset={2}
                className="animate-in fade-in-0 slide-in-from-left-1 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-left-1 data-[state=closed]:zoom-out-95 [&_.bg-foreground.fill-foreground]:hidden [&>*[data-radix-tooltip-arrow]]:hidden [&>svg]:hidden"
              >
                {label}
              </TooltipContent>
            </Tooltip>
          ) : (
            <div key={href}>{linkElement}</div>
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
