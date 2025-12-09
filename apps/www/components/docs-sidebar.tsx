"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import type { source } from "@/lib/source"
import { siteConfig } from "@/lib/config"
import { BLOCKS_NAV_ITEMS } from "@/lib/navigation"
import { StatusBadge } from "@/components/status-badge"
import { Index } from "@/registry/__index__"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/registry/delta-ui/ui/sidebar"

const TOP_LEVEL_SECTIONS = [
  { name: "Introduction", href: "/docs" },
  { name: "Components", href: "/docs/components" },
  { name: "Installation", href: "/docs/installation" },
  { name: "Usage", href: "/docs/usage" },
  { name: "Theming & Customization", href: "/docs/theming" },
  { name: "llms.txt", href: "/llms.txt", badge: "new" },
]

const BLOCKS_SECTIONS = [
  {
    name: "Blocks",
    items: BLOCKS_NAV_ITEMS,
  },
]

const EXCLUDED_SECTIONS = ["dark-mode", "(root)", "Get Started", "root:(root)"]
const EXCLUDED_PAGES: string[] = []

export function DocsSidebar({
  tree,
  ...props
}: React.ComponentProps<typeof Sidebar> & { tree: typeof source.pageTree }) {
  const pathname = usePathname()

  return (
    <Sidebar
      className="sticky top-[calc(var(--header-height)+1px)] z-30 hidden h-[calc(100svh-var(--footer-height)+2rem)] bg-transparent lg:flex"
      collapsible="none"
      {...props}
    >
      <SidebarContent className="no-scrollbar overflow-x-hidden px-2 pb-12">
        <div className="from-background via-background/80 to-background/50 sticky -top-1 z-10 h-8 shrink-0 bg-gradient-to-b blur-xs" />
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-medium">
            Getting Started
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {TOP_LEVEL_SECTIONS.map(({ name, href, badge }) => {
                return (
                  <SidebarMenuItem key={name}>
                    <SidebarMenuButton
                      asChild
                      isActive={
                        href === "/docs" || href === "/docs/components"
                          ? pathname === href
                          : pathname.startsWith(href)
                      }
                      className="data-[active=true]:bg-accent data-[active=true]:border-accent 3xl:fixed:w-full 3xl:fixed:max-w-48 relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md peer/menu-button flex items-center gap-2 rounded-md p-2 text-left outline-hidden ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    >
                      <Link href={href} className="flex items-center gap-2">
                        {name}
                        {badge && <StatusBadge label={badge} />}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {tree.children.map((item) => {
          if (EXCLUDED_SECTIONS.includes(item.$id ?? "") || EXCLUDED_SECTIONS.includes(String(item.name ?? ""))) {
            return null
          }

          return (
            <SidebarGroup key={item.$id}>
              <SidebarGroupLabel className="text-muted-foreground font-medium">
                {item.name}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                {item.type === "folder" && (
                  <SidebarMenu>
                    {item.children.map((item) => {
                      // Extract component name and get metadata
                      const componentName = (item as { url?: string }).url?.split('/').pop()
                      const componentMeta = componentName ? Index[componentName]?.meta : null

                      // Check if component should be hidden in production
                      const isProduction = process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production"
                      const shouldHide = componentMeta?.hide && isProduction

                      // Skip rendering hidden components
                      if (shouldHide) {
                        return null
                      }

                      if (
                        item.type === "page" &&
                        !EXCLUDED_PAGES.includes(item.url) &&
                        (!(item as { hide?: boolean }).hide || process.env.VERCEL_ENV !== "production")
                      ) {
                        // Check if component should be disabled in production (runtime evaluation)
                        const isComponentDisabled = componentMeta?.badge === "coming soon" && isProduction

                        if (isComponentDisabled) {
                          return (
                            <SidebarMenuItem key={item.url}>
                              <SidebarMenuButton
                                disabled
                                className="data-[active=true]:bg-accent data-[active=true]:border-accent 3xl:fixed:w-full 3xl:fixed:max-w-48 relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md text-muted-foreground cursor-not-allowed opacity-60 peer/menu-button flex items-center gap-2 rounded-md p-2 text-left outline-hidden ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50"
                              >
                                {item.name}
                                {componentMeta?.badge && (
                                  <StatusBadge label={componentMeta.badge} />
                                )}
                                {(item as { hide?: boolean }).hide && process.env.VERCEL_ENV !== "production" && (
                                  <StatusBadge label="hidden" />
                                )}
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          )
                        }

                        return (
                          <SidebarMenuItem key={item.url}>
                            <SidebarMenuButton
                              asChild
                              isActive={item.url === pathname}
                              className="data-[active=true]:bg-accent data-[active=true]:border-accent 3xl:fixed:w-full 3xl:fixed:max-w-48 relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md peer/menu-button flex items-center gap-2 rounded-md p-2 text-left outline-hidden ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                            >
                              <Link
                                href={item.url}
                                className="flex items-center gap-2"
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
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        )
                      }
                      return null
                    })}
                  </SidebarMenu>
                )}
              </SidebarGroupContent>
            </SidebarGroup>
          )
        })}
        {BLOCKS_SECTIONS.map((section) => (
          <SidebarGroup key={section.name}>
            <SidebarGroupLabel className="text-muted-foreground font-medium">
              {section.name}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={item.href === pathname}
                      className="data-[active=true]:bg-accent data-[active=true]:border-accent 3xl:fixed:w-full 3xl:fixed:max-w-48 relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md peer/menu-button flex items-center gap-2 rounded-md p-2 text-left outline-hidden ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-2"
                      >
                        {item.name}
                        {siteConfig.showComponentBetaBadges && <StatusBadge label="beta" />}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <div className="from-background via-background/80 to-background/50 relative sticky -bottom-13 z-10 h-16 shrink-0 bg-gradient-to-t blur-xs" />
      </SidebarContent>
    </Sidebar>
  )
}
