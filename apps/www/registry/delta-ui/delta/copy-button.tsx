"use client"

import * as React from "react"
import { CheckIcon, ClipboardIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/shadcn/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/shadcn/tooltip"

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
}

export function CopyButton({
  value,
  className,
  variant = "ghost",
  iconColor,
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
          {hasCopied ? (
            <CheckIcon style={iconColor ? { color: iconColor } : {}} />
          ) : (
            <ClipboardIcon style={iconColor ? { color: iconColor } : {}} />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {hasCopied ? "Copied" : "Copy to Clipboard"}
      </TooltipContent>
    </Tooltip>
  )
}
