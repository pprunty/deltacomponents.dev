"use client"

import { VanishingScrollbar } from "@/registry/delta-ui/delta/vanishing-scrollbar"

const items = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Item ${i + 1}`,
  description: `This is the description for item ${i + 1}.`,
}))

export default function VanishingScrollbarDemo() {
  return (
    <div className="flex gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground text-sm font-medium">
          Smooth fade (default)
        </p>
        <VanishingScrollbar className="h-64 w-64 rounded-md border p-3">
          <div className="flex flex-col gap-2">
            {items.map((item) => (
              <div key={item.id} className="bg-muted rounded-md p-2">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-muted-foreground text-xs">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </VanishingScrollbar>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground text-sm font-medium">
          Instant (no transition)
        </p>
        <VanishingScrollbar instant className="h-64 w-64 rounded-md border p-3">
          <div className="flex flex-col gap-2">
            {items.map((item) => (
              <div key={item.id} className="bg-muted rounded-md p-2">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-muted-foreground text-xs">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </VanishingScrollbar>
      </div>
    </div>
  )
}
