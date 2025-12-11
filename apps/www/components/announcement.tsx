import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { Badge } from "@/registry/delta-ui/ui/badge"

export function Announcement() {
  return (
    <Badge asChild variant="outline" className="rounded-full border-none bg-transparent transition-colors hover:bg-secondary">
      <Link href="/docs/changelog" className="flex items-center gap-1">
        <span className="flex size-2 rounded-full bg-[#ff9800]" title="New" />
        January 2026 Beta Release Announced <ArrowRightIcon />
      </Link>
    </Badge>
  )
}
