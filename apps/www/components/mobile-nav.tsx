"use client"

import * as React from "react"
import Link, { LinkProps } from "next/link"
import { usePathname, useRouter } from "next/navigation"

import { source } from "@/lib/source"
import { cn } from "@/lib/utils"
import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/registry/shadcn/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/shadcn/popover"

export function MobileNav({
  tree,
  items,
  className,
}: {
  tree: typeof source.pageTree
  items: { href: string; label: string; badge?: string; hide?: boolean }[]
  className?: string
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "extend-touch-target h-8 touch-manipulation items-center justify-start gap-2.5 !p-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent dark:hover:bg-transparent",
            className
          )}
        >
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
              <MobileLink href="/" onOpenChange={setOpen}>
                Home
              </MobileLink>
              {items
                .filter((item) => !item.hide)
                .map((item, index) => (
                  <MobileLink
                    key={index}
                    href={item.href}
                    onOpenChange={setOpen}
                  >
                    {item.label}
                    {item.badge && <StatusBadge label={item.badge} />}
                  </MobileLink>
                ))}
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
                        if (item.type === "page") {
                          return (
                            <MobileLink
                              key={`${item.url}-${index}`}
                              href={item.url}
                              onOpenChange={setOpen}
                            >
                              {item.name}
                              {typeof item.name === "string" &&
                                (item.name
                                  .toLowerCase()
                                  .includes("admonition") ||
                                  item.name.toLowerCase().includes("tabs") ||
                                  item.name
                                    .toLowerCase()
                                    .includes("card deck")) && (
                                  <StatusBadge label="beta" />
                                )}
                            </MobileLink>
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
                          <MobileLink
                            href="/blocks/landing-page#testimonials"
                            onOpenChange={setOpen}
                          >
                            Testimonials
                            <StatusBadge label="beta" />
                          </MobileLink>
                          <MobileLink
                            href="/blocks/landing-page#interactive-feature-showcase"
                            onOpenChange={setOpen}
                          >
                            Video Card Grid
                            <StatusBadge label="beta" />
                          </MobileLink>
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

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: LinkProps & {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      data-href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(
        "flex items-center text-2xl font-medium transition-colors",
        isActive
          ? "text-primary font-semibold"
          : "text-muted-foreground hover:text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  )
}
