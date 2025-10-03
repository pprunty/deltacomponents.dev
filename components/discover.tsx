"use client"

import Link from "next/link"
import {
  BookOpenIcon,
  DownloadIcon,
  HeartHandshakeIcon,
  RocketIcon,
  SparklesIcon,
  UsersIcon,
} from "lucide-react"

interface DiscoverItem {
  title: string
  description: string
  href: string
  icon: React.ElementType
  external?: boolean
}

const discoverItems: DiscoverItem[] = [
  {
    title: "Get started",
    description:
      "Add Delta Components to your React project with shadcn/ui CLI.",
    href: "/docs/installation",
    icon: RocketIcon,
  },
  {
    title: "Components",
    description: "Explore animations, inputs, layouts and media components.",
    href: "/docs/components",
    icon: BookOpenIcon,
  },
  {
    title: "What's new",
    description: "See the latest component releases and feature updates.",
    href: "https://github.com/pprunty/deltacomponents.dev/releases",
    icon: SparklesIcon,
    external: true,
  },
  {
    title: "Download",
    description: "Clone the repository and contribute new components.",
    href: "https://github.com/pprunty/deltacomponents.dev",
    icon: DownloadIcon,
    external: true,
  },
  {
    title: "Community",
    description: "Join discussions about component design and best practices.",
    href: "https://github.com/pprunty/deltacomponents.dev/discussions",
    icon: UsersIcon,
    external: true,
  },
  {
    title: "Support",
    description: "Report bugs or request new component features.",
    href: "https://github.com/pprunty/deltacomponents.dev/issues",
    icon: HeartHandshakeIcon,
    external: true,
  },
]

export function Discover() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6">
      {discoverItems.map((item) => {
        const Component = item.external ? "a" : Link
        const props = item.external
          ? {
              href: item.href,
              target: "_blank",
              rel: "noopener noreferrer",
            }
          : { href: item.href }

        return (
          <Component
            key={item.title}
            {...props}
            className="group rounded-sm border border-border bg-card hover:border-primary/50 hover:shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-foreground transition-all duration-200 overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-muted/50">
              <item.icon className="size-4 text-primary" />
              <h3 className="font-medium text-sm">{item.title}</h3>
            </div>
            <div className="px-4 py-3">
              <p className="text-base text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          </Component>
        )
      })}
    </div>
  )
}
