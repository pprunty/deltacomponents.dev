"use client"

import * as React from "react"
import Link, { LinkProps } from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Cross as Hamburger } from "hamburger-react"

import { docsConfig } from "@/config/docs"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHandle,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/components/drawer"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const drawerBodyRef = React.useRef<HTMLDivElement>(null)
  const activeItemRefs = React.useRef<Map<string, HTMLAnchorElement>>(new Map())

  // Enhanced drawer handler that preserves theme
  const handleDrawerChange = React.useCallback((isOpen: boolean) => {
    setOpen(isOpen)
  }, [])

  // Filter top-level navigation to only include Home, Components, and Templates (if enabled), and not hidden
  const topLevelNav = docsConfig.mainNav?.filter(
    (item) =>
      (item.title === "Home" || item.title === "Components") && !item.hide
  )

  // Add Templates to top-level nav if enabled
  const navItems = siteConfig.showTemplates
    ? [...(topLevelNav || []), { title: "Templates", href: "/templates" }]
    : topLevelNav

  // Scroll to active item when drawer opens
  React.useEffect(() => {
    if (open) {
      const timeout = setTimeout(() => {
        const activeItemRef = Array.from(activeItemRefs.current.values()).find(
          (element) => element?.dataset.active === "true"
        )

        if (activeItemRef) {
          activeItemRef.scrollIntoView({
            block: "center",
          })
        }
      }, 100)

      return () => clearTimeout(timeout)
    }
  }, [open])

  return (
    <Drawer open={open} onOpenChange={handleDrawerChange} size="xl">
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 size-8 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <div className="mx-1">
            <Hamburger
              size={18}
              toggled={open}
              toggle={setOpen}
              label="Toggle menu"
              hideOutline={false}
              rounded
            />
          </div>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerOverlay className="backdrop-blur-sm" />
        <DrawerContent className="bg-background flex flex-col rounded-t-lg mt-6 h-[82vh] fixed bottom-0 left-0 right-0 z-[100] outline-none">
          <DrawerTitle className="sr-only">Navigation Menu</DrawerTitle>
          <DrawerHandle className="bg-muted-foreground/60" />
          <DrawerBody ref={drawerBodyRef} className="flex-1 overflow-auto p-6">
            <div className="flex flex-col gap-y-3 pb-4 mb-4 border-b border-dashed border-border">
              {navItems?.map(
                (item) =>
                  item.href && (
                    <MobileLink
                      key={item.href}
                      href={item.href}
                      onOpenChange={setOpen}
                      exactMatch={true}
                      activeItemRefs={activeItemRefs}
                    >
                      <div className="flex items-center gap-2">
                        {item.title}
                        {item.title === "Templates" && (
                          <span className="ml-2 rounded-sm bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                            new
                          </span>
                        )}
                      </div>
                    </MobileLink>
                  )
              )}
            </div>
            <div className="flex flex-col space-y-2">
              {docsConfig.sidebarNav.map((item, index) => (
                <div key={index} className="flex flex-col space-y-2 pt-6">
                  <h4 className="font-medium border-b border-border pb-2">{item.title}</h4>
                  {item?.items?.length &&
                    item.items
                      .filter((i) => !i.hide)
                      .map((item, itemIndex, items) => (
                        <React.Fragment key={item.href}>
                          {!item.disabled &&
                            (item.href ? (
                              <div
                                className={cn(
                                  "pb-2",
                                  itemIndex < items.length - 1 &&
                                    "border-b border-dashed border-border"
                                )}
                              >
                                <MobileLink
                                  href={item.href}
                                  onOpenChange={setOpen}
                                  activeItemRefs={activeItemRefs}
                                >
                                  {item.title}
                                  {item.label && (
                                    <span className="ml-2 rounded-sm bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                                      {item.label}
                                    </span>
                                  )}
                                </MobileLink>
                              </div>
                            ) : (
                              item.title
                            ))}
                        </React.Fragment>
                      ))}
                </div>
              ))}
            </div>
          </DrawerBody>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
  exactMatch?: boolean
  activeItemRefs?: React.MutableRefObject<Map<string, HTMLAnchorElement>>
}

const MobileLink = React.forwardRef<HTMLAnchorElement, MobileLinkProps>(
  (
    {
      href,
      onOpenChange,
      className,
      children,
      exactMatch = false,
      activeItemRefs,
      ...props
    },
    ref
  ) => {
    const router = useRouter()
    const pathname = usePathname()

    // Check if current route is active
    const isActive = exactMatch
      ? pathname === href
      : href === "/docs/components"
        ? pathname === "/docs/components" // Only exact match for components showcase
        : pathname === href || pathname.startsWith(href + "/")

    // Set up ref callback to track active items
    const linkRef = React.useCallback(
      (node: HTMLAnchorElement | null) => {
        if (node && activeItemRefs) {
          if (isActive) {
            activeItemRefs.current.set(href.toString(), node)
          } else {
            activeItemRefs.current.delete(href.toString())
          }
        }
        if (typeof ref === "function") {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      },
      [href, isActive, activeItemRefs, ref]
    )

    // Handle navigation with scroll reset
    const handleClick = React.useCallback(() => {
      // Close the mobile drawer
      onOpenChange?.(false)

      // Short timeout to allow drawer to close
      setTimeout(() => {
        // Scroll to top before navigation
        window.scrollTo(0, 0)

        // Navigate to the new page
        router.push(href.toString())
      }, 100)
    }, [href, onOpenChange, router])

    return (
      <Link
        ref={linkRef}
        href={href}
        onClick={handleClick}
        data-active={isActive}
        className={cn(
          "text-base",
          isActive ? "text-primary font-medium" : "text-muted-foreground",
          className
        )}
        {...props}
      >
        {children}
      </Link>
    )
  }
)

MobileLink.displayName = "MobileLink"
