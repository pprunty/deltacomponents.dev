"use client"

import { XCard } from "@/registry/delta-ui/delta/x-card"

export default function XCardSideBySideDemo() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 sm:flex-row sm:items-start">
      <XCard id="1617979122625712128" size="xs" />
      <XCard id="1939308785727602764" size="xs" />
    </div>
  )
}
