"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import type { source } from "@/lib/source"
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
  {
    name: "Components",
    href: "/docs/components",
  },
  { name: "Setup", href: "/docs/setup" },
  { name: "Usage", href: "/docs/usage" },
  { name: "Troubleshooting", href: "/docs/troubleshooting" },
  { name: "llms.txt", href: "/llms.txt" },
]

const BLOCKS_SECTIONS = [
  {
    name: "Blocks",
    items: [
      { name: "Testimonials", href: "/blocks/landing-page#testimonials" },
      {
        name: "Video Card Grid",
        href: "/blocks/landing-page#interactive-feature-showcase",
      },
      {
        name: "LLM Chat Window",
        href: "/blocks/ai-elements#chatbot-window",
      },
      {
        name: "Perspective Carousel",
        href: "/blocks/featured#perspective-carousel",
      },
    ],
  },
]

const EXCLUDED_SECTIONS = ["dark-mode", "(root)"]
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
              {TOP_LEVEL_SECTIONS.map(({ name, href }) => {
                return (
                  <SidebarMenuItem key={name}>
                    <SidebarMenuButton
                      asChild
                      isActive={
                        href === "/docs" || href === "/docs/components"
                          ? pathname === href
                          : pathname.startsWith(href)
                      }
                      className="data-[active=true]:bg-accent data-[active=true]:border-accent 3xl:fixed:w-full 3xl:fixed:max-w-48 relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md"
                    >
                      <Link href={href}>
                        {name}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {tree.children.map((item) => {
          if (EXCLUDED_SECTIONS.includes(item.$id ?? "")) {
            return null
          }

          return (
            <SidebarGroup key={item.$id}>
              <SidebarGroupLabel className="text-muted-foreground font-medium">
                {item.name}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                {item.type === "folder" && (
                  <SidebarMenu className="gap-0.5">
                    {item.children.map((item) => {
                      // Extract component name and get metadata
                      const componentName = (item as { url?: string }).url?.split('/').pop()
                      const componentMeta = componentName ? Index[componentName]?.meta : null
                      
                      if (
                        item.type === "page" &&
                        !EXCLUDED_PAGES.includes(item.url) &&
                        (!(item as { hide?: boolean }).hide || process.env.VERCEL_ENV !== "production")
                      ) {
                        // Check if component should be disabled in production (runtime evaluation)
                        const isComponentDisabled = componentMeta?.badge === "coming soon" && (process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production")
                        
                        if (isComponentDisabled) {
                          return (
                            <SidebarMenuItem key={item.url}>
                              <SidebarMenuButton
                                disabled
                                className="data-[active=true]:bg-accent data-[active=true]:border-accent 3xl:fixed:w-full 3xl:fixed:max-w-48 relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md text-muted-foreground cursor-not-allowed opacity-60"
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
                              className="data-[active=true]:bg-accent data-[active=true]:border-accent 3xl:fixed:w-full 3xl:fixed:max-w-48 relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md"
                            >
                              <Link
                                href={item.url}
                                className="flex items-center gap-2"
                              >
                                {item.name}
                                {componentMeta?.badge ? (
                                  <StatusBadge label={componentMeta.badge} />
                                ) : (
                                  <StatusBadge label="beta" />
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
              <SidebarMenu className="gap-0.5">
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={item.href === pathname}
                      className="data-[active=true]:bg-accent data-[active=true]:border-accent 3xl:fixed:w-full 3xl:fixed:max-w-48 relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md"
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-2"
                      >
                        {item.name}
                        <StatusBadge label="beta" />
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
