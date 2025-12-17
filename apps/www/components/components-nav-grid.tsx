import Link from "next/link"

import { cn } from "@/lib/utils"

interface NavCardProps {
  href: string
  title: string
  description: string
  variant?: "default" | "muted"
  className?: string
}

function NavCard({
  href,
  title,
  description,
  variant = "default",
  className,
}: NavCardProps) {
  const baseClasses =
    "flex w-full flex-col items-start rounded-lg transition-colors p-4"
  const variantClasses = {
    default: "bg-muted text-foreground hover:hover:bg-muted/80",
    muted: "bg-muted text-foreground hover:hover:bg-muted/80",
  }

  return (
    <Link
      href={href}
      className={cn(baseClasses, variantClasses[variant], className)}
    >
      <p className="text-base font-medium">{title}</p>
      <p className="text-muted-foreground pt-1 text-base leading-5">
        {description}
      </p>
    </Link>
  )
}

const navigationItems = [
  {
    href: "/docs/components",
    title: "UI Components",
    description:
      "Discover UI components such as focusable images, animated tabs, marquees, and more ",
    variant: "muted" as const,
  },
  {
    href: "/docs/components/chat",
    title: "AI Components",
    description:
      "AI-powered components for chat, conversation, and agent interfaces",
    variant: "muted" as const,
  },
  {
    href: "/blocks/landing-page",
    title: "Landing Page Components",
    description: "Pre-built components for landing pages",
    variant: "muted" as const,
  },
  {
    href: "/blocks",
    title: "Blocks",
    description: "Pre-built blocks for different page and layout types",
    variant: "muted" as const,
  },
]

export function ComponentsNavGrid() {
  return (
    <div className="grid gap-4 pt-8 sm:grid-cols-2">
      {navigationItems.map((item) => (
        <NavCard
          key={item.href}
          href={item.href}
          title={item.title}
          description={item.description}
          variant={item.variant}
        />
      ))}
    </div>
  )
}
