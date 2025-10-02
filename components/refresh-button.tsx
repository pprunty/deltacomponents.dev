import { ArrowClockwise } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"

interface RefreshButtonProps {
  onRefresh: () => void
}

export function RefreshButton({ onRefresh }: RefreshButtonProps) {
  return (
    <Button
      aria-label="Refresh component"
      variant="outline"
      className="h-8 w-8 rounded-[6px] p-0 z-[995] font-medium transition-transform duration-150 ease-in-out active:scale-[0.98] bg-card active:bg-gray-100"
      onClick={onRefresh}
    >
      <ArrowClockwise className="h-3 w-3" />
    </Button>
  )
}
