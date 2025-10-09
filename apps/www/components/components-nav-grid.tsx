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
    "flex w-full flex-col items-start rounded-lg transition-colors p-4 text-sm"
  const variantClasses = {
    default: "bg-muted text-foreground hover:hover:bg-muted/80",
    muted: "bg-muted text-foreground hover:hover:bg-muted/80",
  }

  return (
    <Link
      href={href}
      className={cn(baseClasses, variantClasses[variant], className)}
    >
      <div className="font-medium">{title}</div>
      <div className="text-muted-foreground">
        <span className="leading-relaxed">{description}</span>
      </div>
    </Link>
  )
}

const navigationItems = [
  {
    href: "/docs/components",
    title: "UI Components",
    description: "Basic UI components like buttons, inputs, and cards",
    variant: "muted" as const,
  },
  {
    href: "/docs/components/voice-button",
    title: "Voice Components",
    description: "Voice interaction components for audio interfaces",
    variant: "muted" as const,
  },
  {
    href: "/docs/components/audio-player",
    title: "Audio Components",
    description: "Audio playback and visualization components",
    variant: "muted" as const,
  },
  {
    href: "/blocks",
    title: "Blocks",
    description: "Pre-built page sections and complete layouts",
    variant: "muted" as const,
  },
]

export function ComponentsNavGrid() {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
