"use client"

import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

export type ChatContainerProps = ComponentProps<"div">

export const ChatContainer = ({
  className,
  children,
  ...props
}: ChatContainerProps) => (
  <div
    className={cn(
      "thin-scrollbar relative flex size-full flex-col overflow-hidden",
      className
    )}
    {...props}
  >
    {children}
  </div>
)
