import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/delta-ui/ui/button"

export function DocsSidebarCta({ className }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "group bg-surface text-surface-foreground relative flex flex-col gap-2 overflow-hidden rounded-lg p-6 text-sm",
        className
      )}
    >
      <div className="bg-surface/80 absolute inset-0" />

      <div className="relative z-10 text-base leading-tight font-semibold text-balance group-hover:underline">
        Build Better User Experiences
      </div>
      <div className="text-muted-foreground relative z-10">
        Discover open source components that make the difference in your applications. Copy, paste, and customize to create exceptional user interfaces.
      </div>
      <Button size="sm" className="relative z-10 mt-2 w-fit">
        Browse Components
      </Button>
      <Link
        href="/docs/components"
        className="absolute inset-0 z-20"
      >
        <span className="sr-only">Browse components</span>
      </Link>
    </div>
  )
}
