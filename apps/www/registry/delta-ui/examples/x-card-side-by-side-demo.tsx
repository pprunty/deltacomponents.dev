"use client"

import { XCard } from "@/registry/delta-ui/delta/x-card"

export default function XCardSideBySideDemo() {
  return (
    <div className="flex h-full w-full items-start justify-center gap-2">
      <XCard
        id="1617979122625712128"
        size="xs"
        className="min-w-0 flex-1"
      />
      <XCard
        id="1519480761749016577"
        size="xs"
        className="min-w-0 flex-1"
      />
    </div>
  )
}
