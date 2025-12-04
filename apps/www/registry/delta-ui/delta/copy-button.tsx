"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/delta-ui/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/delta-ui/ui/tooltip"

export function copyToClipboard(value: string) {
  navigator.clipboard.writeText(value)
}

interface CopyButtonProps extends React.ComponentProps<typeof Button> {
  value: string
  variant?:
  | "ghost"
  | "outline"
  | "secondary"
  | "default"
  | "destructive"
  | "link"
  iconColor?: string
  tooltip?: string
}

export function CopyButton({
  value,
  className,
  variant = "ghost",
  iconColor,
  tooltip = "Copy to Clipboard",
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => {
        setHasCopied(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [hasCopied])

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          data-slot="copy-button"
          size="icon"
          variant={variant}
          className={cn(
            "size-7 hover:opacity-100 focus-visible:opacity-100",
            className
          )}
          onClick={() => {
            copyToClipboard(value)
            setHasCopied(true)
          }}
          {...props}
        >
          <span className="sr-only">Copy</span>
          <div className="relative">
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out will-change-[transform,opacity,filter]",
                hasCopied
                  ? "scale-100 opacity-100 blur-0"
                  : "blur-xs scale-[0.25] opacity-0"
              )}
            >
              <CheckIcon className="h-3.5 w-3.5" style={iconColor ? { color: iconColor } : {}} />
            </div>
            <div
              className={cn(
                "transition-[transform,opacity,filter] duration-300 ease-in-out will-change-[transform,opacity,filter]",
                hasCopied
                  ? "blur-xs scale-[0.25] opacity-0"
                  : "scale-100 opacity-100 blur-0"
              )}
            >
              <CopyIcon className="h-3.5 w-3.5" style={iconColor ? { color: iconColor } : {}} />
            </div>
          </div>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {hasCopied ? "Copied" : tooltip}
      </TooltipContent>
    </Tooltip>
  )
}
