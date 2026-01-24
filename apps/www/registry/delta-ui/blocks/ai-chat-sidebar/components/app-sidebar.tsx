import type React from "react"
import { Plus, Settings } from "lucide-react"

import { ScrollFadeEffect } from "@/registry/delta-ui/delta/scroll-fade-effect"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/registry/delta-ui/ui/sidebar"

function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 282 308"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M280.438 295.396L152.117 5.66075C151.645 3.87252 150.584 2.32152 149.12 1.29292C147.665 0.264327 145.896 -0.172778 144.147 0.0619372H120.258C118.509 -0.172778 116.74 0.264327 115.285 1.29292C113.821 2.32152 112.76 3.87252 112.288 5.66075L0.780777 295.396C0.171502 296.774 -0.0839596 298.294 0.0241376 299.81C0.132235 301.327 0.603995 302.788 1.40981 304.052C2.2058 305.318 3.30641 306.345 4.58392 307.034C5.87126 307.725 7.30596 308.054 8.75053 307.993H272.92C279.111 307.993 284.86 300.528 280.438 295.396ZM122.469 127.434L177.775 250.605C178.384 252.07 178.65 253.664 178.551 255.257C178.453 256.85 177.991 258.395 177.215 259.765C176.429 261.133 175.358 262.286 174.07 263.128C172.783 263.969 171.329 264.475 169.815 264.602H68.037C66.4941 264.493 64.9807 264.019 63.6246 263.213C62.2685 262.408 61.1089 261.293 60.2146 259.951C59.3204 258.607 58.7307 257.07 58.4752 255.454C58.2197 253.836 58.318 252.18 58.7504 250.605L106.539 127.434C107.266 125.856 108.397 124.525 109.802 123.594C111.207 122.663 112.838 122.169 114.499 122.169C116.17 122.169 117.791 122.663 119.206 123.594C120.612 124.525 121.741 125.856 122.469 127.434Z"
        fill="currentColor"
      />
    </svg>
  )
}

// Sample recent chats data
const recentChats = [
  {
    id: "chat_001",
    title:
      "How to build a modern React application with TypeScript and Next.js",
  },
  {
    id: "chat_002",
    title: "Explain machine learning algorithms and their applications",
  },
  { id: "chat_003", title: "Write a Python script for data analysis" },
  {
    id: "chat_004",
    title: "Debug my JavaScript code with complex async operations",
  },
  {
    id: "chat_005",
    title: "CSS flexbox and grid layout comprehensive tutorial",
  },
  {
    id: "chat_006",
    title: "Setting up Docker containerization for microservices architecture",
  },
  { id: "chat_007", title: "Database optimization techniques" },
  {
    id: "chat_008",
    title: "API design best practices and RESTful conventions",
  },
  {
    id: "chat_009",
    title: "Implementing authentication and authorization in web applications",
  },
  { id: "chat_010", title: "Performance optimization strategies" },
  { id: "chat_011", title: "Unit testing with Jest and React Testing Library" },
  { id: "chat_012", title: "GraphQL vs REST API comparison" },
  {
    id: "chat_013",
    title: "Serverless architecture with AWS Lambda functions",
  },
  { id: "chat_014", title: "Mobile app development with React Native" },
  {
    id: "chat_015",
    title: "DevOps pipeline automation and CI/CD best practices",
  },
  {
    id: "chat_016",
    title: "Building scalable e-commerce platforms with microservices",
  },
  {
    id: "chat_017",
    title: "AI and machine learning model deployment strategies",
  },
  {
    id: "chat_018",
    title: "Blockchain development and smart contract programming",
  },
  {
    id: "chat_019",
    title: "Advanced CSS animations and interactive user interfaces",
  },
  {
    id: "chat_020",
    title: "Cloud infrastructure management with Terraform and Kubernetes",
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <SidebarProvider>
      <Sidebar
        collapsible="icon"
        className="bg-muted [&_[data-slot='sidebar-container']]:pr-0 [&_[data-slot='sidebar-container']]:pl-2"
        {...props}
      >
        <SidebarHeader>
          <div className="flex items-center justify-between px-2 py-4 group-data-[collapsible=icon]:justify-center">
            <Logo className="size-6 group-data-[collapsible=icon]:hidden" />
            <SidebarTrigger
              title="Cmd + / Toggle"
              className="[&>svg]:stroke-foreground/80 hover:[&>svg]:stroke-foreground group-data-[collapsible=icon]:mx-auto"
            />
          </div>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="New Chat"
                size="lg"
                className="group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:justify-center"
              >
                <Plus className="stroke-foreground/80 hover:stroke-foreground h-7 w-7" />
                <span className="group-data-[collapsible=icon]:hidden">
                  New Chat
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent className="overflow-x-hidden pb-12 group-data-[collapsible=icon]:hidden">
          <ScrollFadeEffect
            intensity={48}
            className="overscroll-none [scrollbar-color:rgb(163_163_163_/_0.5)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[rgb(163_163_163_/_0.5)] hover:[&::-webkit-scrollbar-thumb]:bg-[rgb(163_163_163_/_0.7)] [&::-webkit-scrollbar-track]:bg-transparent"
          >
            <SidebarGroup>
              <SidebarGroupLabel className="font-medium">
                Recent Chats
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {recentChats.map((chat) => (
                    <SidebarMenuItem key={chat.id}>
                      <SidebarMenuButton asChild>
                        <a href={`#${chat.id}`} className="w-full">
                          <span className="truncate text-sm">{chat.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </ScrollFadeEffect>
        </SidebarContent>

        <SidebarFooter className="group-data-[collapsible=icon]:absolute group-data-[collapsible=icon]:right-0 group-data-[collapsible=icon]:bottom-2 group-data-[collapsible=icon]:left-0">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Settings"
                className="group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:justify-center"
              >
                <Settings className="stroke-foreground/80 hover:stroke-foreground h-7 w-7" />
                <span className="group-data-[collapsible=icon]:hidden">
                  Settings
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  )
}
