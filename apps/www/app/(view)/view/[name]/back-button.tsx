"use client"

import { ChevronLeftIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/registry/delta-ui/ui/button"

export function BackButton() {
  const handleBack = () => {
    if (typeof window !== 'undefined') {
      // Try to go back in history, fallback to closing tab if no history
      if (window.history.length > 1) {
        window.history.back()
      } else {
        window.close()
      }
    }
  }

  return (
    <button
      onClick={handleBack}
      className={cn(
        buttonVariants({ variant: "ghost", size: "default" }),
        "fixed bottom-4 left-4 gap-1 px-3 sm:px-2.5 py-2.5 sm:py-2 shadow-md bg-background border border-border hover:bg-accent z-50"
      )}
    >
      <ChevronLeftIcon className="size-4" />
      <span className="hidden sm:block">Back</span>
    </button>
  )
}