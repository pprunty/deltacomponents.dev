"use client"

import * as React from "react"
import type { ComponentProps } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/delta-ui/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/delta-ui/ui/tooltip"

export type ActionsProps = ComponentProps<"div"> & {
  position?: "left" | "right"
}

export const Actions = ({ className, children, position = "right", ...props }: ActionsProps) => (
  <div
    className={cn(
      "flex items-center gap-0 pb-4 opacity-100",
      position === "left" ? "justify-start" : "justify-end",
      className
    )}
    {...props}
  >
    {children}
  </div>
)

export type ActionProps = ComponentProps<typeof Button> & {
  tooltip?: string
  label?: string
}

export const Action = ({
  tooltip,
  children,
  label,
  className,
  variant = "ghost",
  size = "sm",
  ...props
}: ActionProps) => {
  const button = (
    <Button
      className={cn(
        "text-muted-foreground hover:text-foreground relative size-9 p-1.5",
        className
      )}
      size={size}
      type="button"
      variant={variant}
      {...props}
    >
      {children}
      <span className="sr-only">{label || tooltip}</span>
    </Button>
  )

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return button
}

export type CopyActionProps = Omit<ActionProps, "onClick"> & {
  value: string
}

export const CopyAction = ({
  value,
  tooltip = "Copy message",
  children,
  className,
  ...props
}: CopyActionProps) => {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => {
        setHasCopied(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [hasCopied])

  const handleCopy = () => {
    navigator.clipboard.writeText(value)
    setHasCopied(true)
  }

  return (
    <Action
      tooltip={hasCopied ? "Copied" : tooltip}
      onClick={handleCopy}
      className={className}
      {...props}
    >
      {children ||
        (hasCopied ? (
          <CheckIcon className="h-4 w-4" />
        ) : (
          <CopyIcon className="h-4 w-4" />
        ))}
    </Action>
  )
}
