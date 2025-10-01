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
    description: "Install and start using Delta Components in your project.",
    href: "/docs/installation",
    icon: RocketIcon,
  },
  {
    title: "Components",
    description: "Browse our collection of modern React components.",
    href: "/docs/components",
    icon: BookOpenIcon,
  },
  {
    title: "What's new",
    description: "Check out the latest features and updates.",
    href: "https://github.com/pprunty/deltacomponents.dev/releases",
    icon: SparklesIcon,
    external: true,
  },
  {
    title: "Download",
    description: "Get the source code and start contributing.",
    href: "https://github.com/pprunty/deltacomponents.dev",
    icon: DownloadIcon,
    external: true,
  },
  {
    title: "Community",
    description: "Connect with other developers and get help.",
    href: "https://github.com/pprunty/deltacomponents.dev/discussions",
    icon: UsersIcon,
    external: true,
  },
  {
    title: "Support",
    description: "Get help and support for your projects.",
    href: "https://github.com/pprunty/deltacomponents.dev/issues",
    icon: HeartHandshakeIcon,
    external: true,
  },
]

export function Discover() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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