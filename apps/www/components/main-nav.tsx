"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/registry/delta-ui/ui/button"

export function MainNav({
  items,
  className,
  ...props
}: React.ComponentProps<"nav"> & {
  items: {
    href: string
    label: string
    badge?: string
    hide?: boolean
    disabled?: boolean
  }[]
}) {
  const pathname = usePathname()

  const isProduction =
    process.env.VERCEL_ENV === "production" ||
    process.env.NODE_ENV === "production"
  const visibleItems = items.filter(
    (item) => !item.hide || (item.hide && !isProduction)
  )

  return (
    <nav className={cn("items-center gap-0.5", className)} {...props}>
      {visibleItems.map((item) => {
        if (item.disabled) {
          return (
            <Button
              key={item.href}
              variant="ghost"
              size="sm"
              className="text-muted-foreground cursor-not-allowed opacity-60"
              disabled
            >
              {item.label}
              {item.badge && <StatusBadge label={item.badge} />}
              {item.hide && !isProduction && <StatusBadge label="hidden" />}
            </Button>
          )
        }

        return (
          <Button key={item.href} variant="ghost" asChild size="sm">
            <Link
              href={item.href}
              className={cn(pathname === item.href && "text-primary")}
            >
              {item.label}
              {item.badge && <StatusBadge label={item.badge} />}
              {item.hide && !isProduction && <StatusBadge label="hidden" />}
            </Link>
          </Button>
        )
      })}
    </nav>
  )
}
