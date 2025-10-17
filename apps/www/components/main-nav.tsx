"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/registry/shadcn/button"

export function MainNav({
  items,
  className,
  ...props
}: React.ComponentProps<"nav"> & {
  items: { href: string; label: string; badge?: string; hide?: boolean }[]
}) {
  const pathname = usePathname()

  const visibleItems = items.filter((item) => !item.hide)

  return (
    <nav className={cn("items-center gap-0.5", className)} {...props}>
      {visibleItems.map((item) => (
        <Button key={item.href} variant="ghost" asChild size="sm">
          <Link
            href={item.href}
            className={cn(pathname === item.href && "text-primary")}
          >
            {item.label}
            {item.badge && <StatusBadge label={item.badge} />}
          </Link>
        </Button>
      ))}
    </nav>
  )
}
