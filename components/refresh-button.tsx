import { ArrowClockwise } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"

interface RefreshButtonProps {
  onRefresh: () => void
}

export function RefreshButton({ onRefresh }: RefreshButtonProps) {
  return (
    <Button
      aria-label="Refresh component"
      variant="default"
      className="h-8 w-8 rounded-[6px] border p-0 z-[995]"
      onClick={onRefresh}
    >
      <ArrowClockwise className="h-3 w-3" />
    </Button>
  )
}
