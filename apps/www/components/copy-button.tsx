"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

import { cn } from "@/lib/utils"

export function copyToClipboardWithMeta(value: string, event?: any) {
  navigator.clipboard.writeText(value)
  if (event) {
    // Handle event tracking if needed
  }
}

interface CopyButtonProps {
  value: string
  src?: string
  className?: string
}

export function CopyButton({ value, src, className }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setHasCopied(true)
      setTimeout(() => setHasCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy to clipboard:", error)
    }
  }

  return (
    <button
      className={cn(
        "group absolute right-2 top-2 z-40 flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md bg-muted/90 text-muted-foreground transition-colors duration-300 ease-out hover:bg-muted/80 hover:text-foreground active:scale-[0.97] will-change-transform",
        className
      )}
      onClick={copyToClipboard}
      aria-label="Copy code to clipboard"
    >
      <div className="relative">
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out will-change-[transform,opacity,filter]",
            hasCopied
              ? "scale-100 opacity-100 blur-0"
              : "blur-xs scale-[0.25] opacity-0"
          )}
        >
          <Check className="h-4 w-4" />
        </div>
        <div
          className={cn(
            "transition-[transform,opacity,filter] duration-300 ease-in-out will-change-[transform,opacity,filter]",
            hasCopied
              ? "blur-xs scale-[0.25] opacity-0"
              : "scale-100 opacity-100 blur-0"
          )}
        >
          <Copy className="h-4 w-4" />
        </div>
      </div>
    </button>
  )
}