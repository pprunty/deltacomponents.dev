"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface VanishingScrollbarProps {
  children: React.ReactNode
  className?: string
  direction?: "y" | "x" | "both"
  scrollbarColor?: string
  fadeDuration?: number
  instant?: boolean
}

export function VanishingScrollbar({
  children,
  className,
  direction = "y",
  scrollbarColor = "rgb(163 163 163 / 0.5)",
  fadeDuration = 300,
  instant = false,
}: VanishingScrollbarProps) {
  const [isHovered, setIsHovered] = React.useState(false)

  const overflowClass =
    direction === "y"
      ? "overflow-y-auto overflow-x-hidden"
      : direction === "x"
        ? "overflow-x-auto overflow-y-hidden"
        : "overflow-auto"

  return (
    <div
      className={cn(
        overflowClass,
        "[&::-webkit-scrollbar-track]:bg-transparent",
        "[&::-webkit-scrollbar-thumb]:bg-[var(--vsb-thumb-color)]",
        "[&::-webkit-scrollbar-thumb]:[transition:var(--vsb-transition)]",
        className
      )}
      style={
        {
          "--vsb-thumb-color": isHovered ? scrollbarColor : "transparent",
          "--vsb-transition": instant
            ? "none"
            : `background-color ${fadeDuration}ms ease`,
          scrollbarColor: isHovered
            ? `${scrollbarColor} transparent`
            : "transparent transparent",
        } as React.CSSProperties
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  )
}
