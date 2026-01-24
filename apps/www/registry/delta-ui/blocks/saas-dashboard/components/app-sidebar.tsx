"use client"

import * as React from "react"
import {
  FileStack,
  Inbox,
  Layers,
  ListTodo,
  MoreHorizontal,
  Plus,
  Users,
} from "lucide-react"

import { NavUser } from "@/registry/delta-ui/blocks/saas-dashboard/components/nav-user"
import { SearchCommand } from "@/registry/delta-ui/blocks/saas-dashboard/components/search-command"
import { ScrollFadeEffect } from "@/registry/delta-ui/delta/scroll-fade-effect"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/registry/delta-ui/ui/sidebar"

const data = {
  user: {
    name: "pprunty",
    email: "m@example.com",
    avatar: "https://patrickprunty.com/icon.webp",
  },
  navMain: [
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
    },
    {
      title: "My issues",
      url: "#",
      icon: ListTodo,
    },
  ],
  workspace: [
    {
      title: "Projects",
      url: "#",
      icon: FileStack,
    },
    {
      title: "Views",
      url: "#",
      icon: Layers,
    },
  ],
  teams: [
    {
      name: "Patrickprunty",
      url: "#",
      icon: Users,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      variant="inset"
      className="[&_[data-slot='sidebar-container']]:pr-0 [&_[data-slot='sidebar-container']]:pl-2"
      {...props}
    >
      <SidebarHeader className="flex flex-row items-center justify-start gap-1 px-2 py-2">
        <NavUser user={data.user} />
        <div className="flex shrink-0 items-center">
          <SearchCommand />
        </div>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        <ScrollFadeEffect
          intensity={48}
          className="overscroll-none [scrollbar-color:rgb(163_163_163_/_0.5)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[rgb(163_163_163_/_0.5)] hover:[&::-webkit-scrollbar-thumb]:bg-[rgb(163_163_163_/_0.7)] [&::-webkit-scrollbar-track]:bg-transparent"
        >
          {/* Top Level Items */}
          <SidebarGroup className="px-2 py-0">
            <SidebarGroupContent>
              <SidebarMenu className="gap-0">
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      className="px-1"
                    >
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Workspace */}
          <SidebarGroup className="px-2">
            <SidebarGroupLabel className="px-1">Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-0">
                {data.workspace.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      className="px-1"
                    >
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                    <SidebarMenuAction showOnHover>
                      <Plus />
                      <span className="sr-only">Add {item.title}</span>
                    </SidebarMenuAction>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Your Teams */}
          <SidebarGroup className="px-2">
            <SidebarGroupLabel className="px-1">Your teams</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-0">
                {data.teams.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild className="px-1">
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.name}</span>
                      </a>
                    </SidebarMenuButton>
                    <SidebarMenuAction showOnHover>
                      <MoreHorizontal />
                      <span className="sr-only">More</span>
                    </SidebarMenuAction>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </ScrollFadeEffect>
      </SidebarContent>
    </Sidebar>
  )
}
