"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { source } from "@/lib/source"
import { siteConfig } from "@/lib/config"
import { BLOCKS_NAV_ITEMS } from "@/lib/navigation"
import { cn } from "@/lib/utils"
import { StatusBadge } from "@/components/status-badge"
import { Index } from "@/registry/__index__"
import { Button } from "@/registry/delta-ui/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/delta-ui/ui/popover"

const normalizePath = (path: string | null) => {
  if (!path) return "/"
  if (path === "/") return "/"
  return path.endsWith("/") ? path.slice(0, -1) || "/" : path
}

export function MobileNav({
  tree,
  items,
  className,
}: {
  tree: typeof source.pageTree
  items: {
    href: string
    label: string
    badge?: string
    hide?: boolean
    disabled?: boolean
  }[]
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  const [pendingHref, setPendingHref] = React.useState<string | null>(null)

  const pathname = normalizePath(usePathname())

  React.useEffect(() => {
    setOpen(false)
    setPendingHref(null)
  }, [pathname])

  React.useEffect(() => {
    if (!open) {
      setPendingHref(null)
    }
  }, [open])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "group relative h-8 touch-manipulation items-center justify-start gap-2.5 !p-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent dark:hover:bg-transparent transition-all duration-150 ease-out active:scale-95 active:opacity-70",
            className
          )}
        >
          {/* Extended invisible touch zone */}
          <div className="absolute -inset-3 md:-inset-2" />
          
          <div className="relative flex h-8 w-4 items-center justify-center">
            <div className="relative size-4">
              <span
                className={cn(
                  "bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100",
                  open ? "top-[0.4rem] -rotate-45" : "top-1"
                )}
              />
              <span
                className={cn(
                  "bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100",
                  open ? "top-[0.4rem] rotate-45" : "top-2.5"
                )}
              />
            </div>
            <span className="sr-only">Toggle Menu</span>
          </div>
          <span className="flex h-8 items-center text-lg leading-none font-medium">
            Menu
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="bg-background/90 no-scrollbar h-(--radix-popper-available-height) w-(--radix-popper-available-width) overflow-y-auto rounded-none border-none p-0 shadow-none backdrop-blur duration-100"
        align="start"
        side="bottom"
        alignOffset={-16}
        sideOffset={14}
      >
        <div className="flex flex-col gap-12 px-6 py-6">
          <div className="flex flex-col gap-4">
            <div className="text-muted-foreground text-sm font-medium">
              Menu
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href="/"
                onClick={() => {
                  const targetHref = normalizePath("/")
                  if (targetHref === pathname) {
                    setOpen(false)
                    return
                  }
                  setPendingHref("/")
                }}
                className={cn(
                  "flex items-center gap-2 text-2xl font-medium transition-all duration-100 ease-out hover:text-foreground focus-visible:text-foreground active:text-foreground active:scale-[0.99]",
                  normalizePath("/") === pathname ? "text-foreground font-semibold" : "text-muted-foreground"
                )}
              >
                Home
              </Link>
              {items
                .filter((item) => !item.hide || (item.hide && !(process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production")))
                .map((item, index) => {
                  const normalizedItemHref = normalizePath(item.href)
                  const isActive = normalizedItemHref === pathname

                  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
                    if (item.disabled) {
                      event.preventDefault()
                      return
                    }

                    const targetHref = normalizePath(item.href)
                    if (targetHref === pathname) {
                      setOpen(false)
                      return
                    }

                    setPendingHref(item.href)
                  }

                  return (
                    <Link
                      key={index}
                      href={item.disabled ? "#" : item.href}
                      onClick={handleClick}
                      aria-disabled={item.disabled ? "true" : "false"}
                      className={cn(
                        "flex items-center gap-2 text-2xl font-medium transition-all duration-100 ease-out hover:text-foreground focus-visible:text-foreground active:text-foreground active:scale-[0.99]",
                        isActive ? "text-foreground font-semibold" : "text-muted-foreground",
                        item.disabled && "cursor-not-allowed opacity-60"
                      )}
                    >
                      {item.label}
                      {item.badge && <StatusBadge label={item.badge} />}
                      {item.hide && !(process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production") && (
                        <StatusBadge label="hidden" />
                      )}
                    </Link>
                  )
                })}
            </div>
          </div>

          <div className="flex flex-col gap-8">
            {tree?.children?.map((group, index) => {
              if (group.type === "folder") {
                const groupElement = (
                  <div key={index} className="flex flex-col gap-4">
                    <div className="text-muted-foreground text-sm font-medium">
                      {group.name}
                    </div>
                    <div className="flex flex-col gap-3">
                      {group.children.map((item) => {
                        // Check for component-specific metadata
                        const componentName = item.url?.split('/').pop()
                        const componentMeta = componentName ? Index[componentName]?.meta : null

                        if (item.type === "page" && (!(item as { hide?: boolean }).hide || process.env.VERCEL_ENV !== "production")) {
                          const isActive = normalizePath(item.url) === pathname

                          // Check if component should be disabled in production (runtime evaluation)
                          const isComponentDisabled = componentMeta?.badge === "coming soon" && (process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production")

                          if (isComponentDisabled) {
                            return (
                              <div
                                key={`${item.url}-${index}`}
                                className="flex items-center gap-2 text-2xl font-medium text-muted-foreground cursor-not-allowed opacity-60"
                              >
                                {item.name}
                                {componentMeta?.badge && (
                                  <StatusBadge label={componentMeta.badge} />
                                )}
                                {(item as { hide?: boolean }).hide && process.env.VERCEL_ENV !== "production" && (
                                  <StatusBadge label="hidden" />
                                )}
                              </div>
                            )
                          }

                          const handleClick = () => {
                            const targetHref = normalizePath(item.url)
                            if (targetHref === pathname) {
                              setOpen(false)
                              return
                            }
                            setPendingHref(item.url)
                          }

                          return (
                            <Link
                              key={`${item.url}-${index}`}
                              href={item.url}
                              onClick={handleClick}
                              className={cn(
                                "flex items-center gap-2 text-2xl font-medium transition-all duration-100 ease-out hover:text-foreground focus-visible:text-foreground active:text-foreground active:scale-[0.99]",
                                isActive ? "text-foreground font-semibold" : "text-muted-foreground"
                              )}
                            >
                              {item.name}
                              {componentMeta?.badge ? (
                                <StatusBadge label={componentMeta.badge} />
                              ) : (
                                siteConfig.showComponentBetaBadges && <StatusBadge label="beta" />
                              )}
                              {(item as { hide?: boolean }).hide && process.env.VERCEL_ENV !== "production" && (
                                <StatusBadge label="hidden" />
                              )}
                            </Link>
                          )
                        }
                      })}
                    </div>
                  </div>
                )

                // If this is the Components section, add Blocks section after it
                if (group.name === "Components") {
                  return (
                    <React.Fragment key={index}>
                      {groupElement}
                      <div className="flex flex-col gap-4">
                        <div className="text-muted-foreground text-sm font-medium">
                          Blocks
                        </div>
                        <div className="flex flex-col gap-3">
                          {BLOCKS_NAV_ITEMS.map((blockItem) => {
                            const isActive = normalizePath(blockItem.href) === pathname

                            const handleClick = () => {
                              const targetHref = normalizePath(blockItem.href)
                              if (targetHref === pathname) {
                                setOpen(false)
                                return
                              }
                              setPendingHref(blockItem.href)
                            }

                            return (
                              <Link
                                key={blockItem.href}
                                href={blockItem.href}
                                onClick={handleClick}
                                className={cn(
                                  "flex items-center gap-2 text-2xl font-medium transition-all duration-100 ease-out hover:text-foreground focus-visible:text-foreground active:text-foreground active:scale-[0.99]",
                                  isActive ? "text-foreground font-semibold" : "text-muted-foreground"
                                )}
                              >
                                {blockItem.name}
                                {siteConfig.showComponentBetaBadges && <StatusBadge label="beta" />}
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    </React.Fragment>
                  )
                }

                return groupElement
              }
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

