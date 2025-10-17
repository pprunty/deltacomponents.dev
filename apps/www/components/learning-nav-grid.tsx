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

const learningItems = [
  {
    href: "/learning/introduction-to-nextjs",
    title: "Introduction to Next.js",
    description: "Learn the fundamentals of Next.js and modern web development",
    variant: "muted" as const,
  },
  {
    href: "/learning/what-is-shadcn",
    title: "What is shadcn?",
    description: "Understand shadcn/ui's philosophy and component approach",
    variant: "muted" as const,
  },
  {
    href: "/learning/integrating-shadcn-with-nextjs",
    title: "Integration Guide",
    description: "Step-by-step guide to integrate shadcn/ui with Next.js",
    variant: "muted" as const,
  },
  {
    href: "/learning/creating-custom-shadcn-registry",
    title: "Custom Registries",
    description: "Build your own component registry for team consistency",
    variant: "muted" as const,
  },
  {
    href: "/learning/using-custom-shadcn-registries",
    title: "Using Registries",
    description: "Best practices for consuming custom component registries",
    variant: "muted" as const,
  },
  {
    href: "/docs",
    title: "Components Documentation",
    description: "Explore available components and implementation examples",
    variant: "muted" as const,
  },
]

export function LearningNavGrid() {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      {learningItems.map((item) => (
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
