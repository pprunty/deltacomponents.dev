"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const highlighterVariants = cva("bg-transparent font-extrabold", {
  variants: {
    variant: {
      default:
        "text-primary shadow-[inset_0_-0.5em_0_0_rgb(240,171,252)] dark:shadow-[inset_0_-0.5em_0_0_rgba(245,140,245,0.8)]",
      success:
        "text-primary shadow-[inset_0_-0.5em_0_0_rgba(132,204,22,0.5)] dark:shadow-[inset_0_-0.5em_0_0_rgba(132,204,22,0.4)]",
      info: "text-primary shadow-[inset_0_-0.5em_0_0_rgba(56,189,248,0.5)] dark:shadow-[inset_0_-0.5em_0_0_rgba(56,189,248,0.4)]",
      warning:
        "text-primary shadow-[inset_0_-0.5em_0_0_rgba(250,204,21,0.5)] dark:shadow-[inset_0_-0.5em_0_0_rgba(250,204,21,0.4)]",
      destructive:
        "text-primary shadow-[inset_0_-0.5em_0_0_rgba(239,68,68,0.5)] dark:shadow-[inset_0_-0.5em_0_0_rgba(239,68,68,0.4)]",
    },
    thickness: {
      thin: "shadow-[inset_0_-0.3em_0_0] dark:shadow-[inset_0_-0.3em_0_0]",
      default: "shadow-[inset_0_-0.5em_0_0] dark:shadow-[inset_0_-0.5em_0_0]",
      thick: "shadow-[inset_0_-0.7em_0_0] dark:shadow-[inset_0_-0.7em_0_0]",
    },
  },
  defaultVariants: {
    variant: "default",
    thickness: "default",
  },
})

export interface HighlighterProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof highlighterVariants> {
  asChild?: boolean
  shadowColor?: string
  darkShadowColor?: string
}

const Highlighter = React.forwardRef<HTMLElement, HighlighterProps>(
  ({ className, variant, thickness, asChild = false, shadowColor, darkShadowColor, style, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "mark"

    // Create custom shadow styles if shadowColor is provided
    const customStyle = shadowColor
      ? {
          ...style,
          "--highlight-shadow-color": shadowColor,
          "--highlight-dark-shadow-color": darkShadowColor || shadowColor,
        }
      : style

    // Apply custom shadow class if shadowColor is provided
    const customShadowClass = shadowColor
      ? "shadow-[inset_0_-0.5em_0_0_var(--highlight-shadow-color)] dark:shadow-[inset_0_-0.5em_0_0_var(--highlight-dark-shadow-color)]"
      : undefined

    return (
      <Comp
        ref={ref}
        className={cn(
          highlighterVariants({ variant: shadowColor ? undefined : variant, thickness, className }),
          customShadowClass,
        )}
        style={customStyle}
        {...props}
      />
    )
  },
)
Highlighter.displayName = "Highlighter"

export { Highlighter, highlighterVariants }
