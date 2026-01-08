"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/registry/delta-ui/blocks/admin-inset-layout/components/nav-main"
import { NavProjects } from "@/registry/delta-ui/blocks/admin-inset-layout/components/nav-projects"
import { NavResources } from "@/registry/delta-ui/blocks/admin-inset-layout/components/nav-resources"
import { NavSecondary } from "@/registry/delta-ui/blocks/admin-inset-layout/components/nav-secondary"
import { NavUser } from "@/registry/delta-ui/blocks/admin-inset-layout/components/nav-user"
import { SearchCommand } from "@/registry/delta-ui/blocks/admin-inset-layout/components/search-command"
import { ScrollFadeEffect } from "@/registry/delta-ui/delta/scroll-fade-effect"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/registry/delta-ui/ui/sidebar"

const data = {
  user: {
    name: "pprunty",
    email: "m@example.com",
    avatar: "https://patrickprunty.com/icon.webp",
  },
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
    {
      title: "Analytics",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Overview",
          url: "#",
        },
        {
          title: "Reports",
          url: "#",
        },
        {
          title: "Insights",
          url: "#",
        },
      ],
    },
    {
      title: "Integrations",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Apps",
          url: "#",
        },
        {
          title: "Webhooks",
          url: "#",
        },
        {
          title: "API Keys",
          url: "#",
        },
      ],
    },
    {
      title: "Security",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Authentication",
          url: "#",
        },
        {
          title: "Permissions",
          url: "#",
        },
        {
          title: "Audit Log",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  resources: [
    {
      title: "Status",
      url: "#",
    },
    {
      title: "Changelog",
      url: "#",
    },
    {
      title: "Pricing",
      url: "#",
    },
    {
      title: "Documentation",
      url: "#",
    },
    {
      title: "API Reference",
      url: "#",
    },
    {
      title: "Community",
      url: "#",
    },
    {
      title: "Blog",
      url: "#",
    },
    {
      title: "Careers",
      url: "#",
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
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
      <div className="h-14 shrink-0" />
      <div className="shrink-0 px-2 pb-2">
        <SearchCommand />
      </div>
      <SidebarContent className="gap-1">
        <ScrollFadeEffect className="overflow-y-auto overscroll-none [scrollbar-color:rgb(163_163_163_/_0.5)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[rgb(163_163_163_/_0.5)] hover:[&::-webkit-scrollbar-thumb]:bg-[rgb(163_163_163_/_0.7)] [&::-webkit-scrollbar-track]:bg-transparent">
          <NavMain items={data.navMain} />
          <NavResources items={data.resources} />
          <NavProjects projects={data.projects} />
          <NavSecondary items={data.navSecondary} className="mt-auto" />
        </ScrollFadeEffect>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
