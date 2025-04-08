"use client"

import { Button } from "@/registry/ui/button"
import { ArrowRight } from "lucide-react"

export default function ButtonExtendedClickDemo() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center justify-center min-h-[200px]">
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Standard Click Area</h3>
        <Button
          title="Standard Button"
          variant="primary"
          className="max-w-[200px]"
          icon={<ArrowRight className="w-4 h-4" />}
        />
        <div className="text-xs text-muted-foreground mt-2">Try clicking just outside the button</div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Extended Click Area</h3>
        <Button
          title="Extended Click Area"
          variant="primary"
          className="max-w-[200px]"
          extendedClickArea={true}
          icon={<ArrowRight className="w-4 h-4" />}
        />
        <div className="text-xs text-muted-foreground mt-2">The click area extends 40px beyond the button</div>
      </div>
    </div>
  )
} 