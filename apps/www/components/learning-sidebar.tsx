"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import type { learningSource } from "@/lib/learning-source"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/registry/shadcn/sidebar"

const LEARNING_SECTIONS = [
  { name: "Getting Started", href: "/learning" },
  { name: "Introduction to Next.js", href: "/learning/introduction-to-nextjs" },
  { name: "What is shadcn?", href: "/learning/what-is-shadcn" },
  {
    name: "Integrating shadcn with Next.js",
    href: "/learning/integrating-shadcn-with-nextjs",
  },
  {
    name: "Creating a custom shadcn registry",
    href: "/learning/creating-custom-shadcn-registry",
  },
  {
    name: "Using custom shadcn registries",
    href: "/learning/using-custom-shadcn-registries",
  },
]

export function LearningSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  tree: typeof learningSource.pageTree
}) {
  const pathname = usePathname()

  return (
    <Sidebar
      className="sticky top-[calc(var(--header-height)+1px)] z-30 hidden h-[calc(100svh-var(--footer-height)+2rem)] bg-transparent lg:flex"
      collapsible="none"
      {...props}
    >
      <SidebarContent className="no-scrollbar overflow-x-hidden px-2 pb-12">
        <div className="h-(--top-spacing) shrink-0" />
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-medium">
            Learning Topics
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {LEARNING_SECTIONS.map(({ name, href }) => {
                return (
                  <SidebarMenuItem key={name}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === href}
                      className="data-[active=true]:bg-accent data-[active=true]:border-accent 3xl:fixed:w-full 3xl:fixed:max-w-48 relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md"
                    >
                      <Link href={href}>
                        <span className="absolute inset-0 flex w-(--sidebar-width) bg-transparent" />
                        {name}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
