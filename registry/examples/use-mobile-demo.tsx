"use client"

import { useMobile } from "@/registry/hooks/use-mobile"

export default function UseMobileDemo() {
  const isMobile = useMobile()

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="text-lg font-semibold">Mobile Detection</div>
      <div className="p-4 border rounded-lg bg-muted/50">
        <p className="text-sm text-muted-foreground mb-2">
          Current screen size:
        </p>
        <div className="text-2xl font-mono">
          {isMobile ? (
            <span className="text-orange-500">📱 Mobile</span>
          ) : (
            <span className="text-blue-500">🖥️ Desktop</span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Resize your window to see the detection change (breakpoint: 640px)
        </p>
      </div>
    </div>
  )
}
