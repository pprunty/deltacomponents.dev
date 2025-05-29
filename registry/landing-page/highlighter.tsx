"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { HTMLMotionProps, motion, PanInfo, useInView } from "framer-motion"

import { cn } from "@/lib/utils"

const highlighterVariants = cva("bg-transparent font-extrabold relative", {
  variants: {
    variant: {
      default: "text-foreground",
      success: "text-foreground",
      info: "text-foreground",
      warning: "text-foreground",
      destructive: "text-foreground",
    },
    thickness: {
      thin: "",
      default: "",
      thick: "",
    },
  },
  defaultVariants: {
    variant: "default",
    thickness: "default",
  },
})

export interface HighlighterProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof highlighterVariants> {
  asChild?: boolean
  shadowColor?: string
  darkShadowColor?: string
  animate?: boolean
  text?: string
}

const Highlighter = React.forwardRef<HTMLElement, HighlighterProps>(
  (
    {
      className,
      variant,
      thickness,
      asChild = false,
      shadowColor,
      darkShadowColor,
      style,
      animate = false,
      children,
      text,
      ...props
    },
    ref
  ) => {
    const highlighterRef = React.useRef<HTMLElement | null>(null)
    const isInView = useInView(highlighterRef, { once: true, amount: 0.5 })

    // Determine shadow values based on variant and custom colors
    const getShadowValue = (isDefault = true) => {
      if (shadowColor) {
        return isDefault ? shadowColor : darkShadowColor || shadowColor
      }

      switch (variant) {
        case "default":
          return isDefault ? "rgb(240,171,252)" : "rgba(245,140,245,0.8)"
        case "success":
          return isDefault ? "rgba(132,204,22,0.5)" : "rgba(132,204,22,0.4)"
        case "info":
          return isDefault ? "rgba(56,189,248,0.5)" : "rgba(56,189,248,0.4)"
        case "warning":
          return isDefault ? "rgba(250,204,21,0.5)" : "rgba(250,204,21,0.4)"
        case "destructive":
          return isDefault ? "rgba(239,68,68,0.5)" : "rgba(239,68,68,0.4)"
        default:
          return isDefault ? "rgb(240,171,252)" : "rgba(245,140,245,0.8)"
      }
    }

    // Determine thickness value
    const getThicknessValue = () => {
      switch (thickness) {
        case "thin":
          return "0.3em"
        case "thick":
          return "0.7em"
        default:
          return "0.5em"
      }
    }

    // Create custom styles
    const customStyle = {
      ...style,
      "--highlight-shadow-color": getShadowValue(true),
      "--highlight-dark-shadow-color": getShadowValue(false),
      "--highlight-thickness": getThicknessValue(),
    } as React.CSSProperties

    // Animation variants
    const highlightVariants = {
      hidden: { width: "0%" },
      visible: {
        width: "100%",
        transition: {
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1],
        },
      },
    }

    // Static shadow class (no animation)
    const staticShadowClass = !animate
      ? "shadow-[inset_0_-var(--highlight-thickness)_0_0_var(--highlight-shadow-color)] dark:shadow-[inset_0_-var(--highlight-thickness)_0_0_var(--highlight-dark-shadow-color)]"
      : ""

    if (asChild) {
      // When using as a fragment, just return the children with no wrapping
      return <React.Fragment>{children}</React.Fragment>
    }

    // When using as a mark element
    return (
      <mark
        ref={(node) => {
          // Handle both the forwarded ref and our local ref
          if (typeof ref === "function") {
            ref(node as HTMLElement)
          } else if (ref) {
            ref.current = node as HTMLElement
          }
          highlighterRef.current = node as HTMLElement
        }}
        className={cn(
          highlighterVariants({ variant, thickness, className }),
          staticShadowClass,
          "relative"
        )}
        style={customStyle}
        {...props}
      >
        {text ? <span className="relative z-10">{text}</span> : children}

        {animate ? (
          <motion.span
            className="absolute bottom-0 left-0 h-[var(--highlight-thickness)] bg-[var(--highlight-shadow-color)] dark:bg-[var(--highlight-dark-shadow-color)] pointer-events-none z-0 will-change-transform will-change-width transform-gpu"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={highlightVariants}
          />
        ) : (
          // Add a static span for non-animated highlights to ensure consistent rendering
          <span className="absolute bottom-0 left-0 h-[var(--highlight-thickness)] w-full bg-[var(--highlight-shadow-color)] dark:bg-[var(--highlight-dark-shadow-color)] pointer-events-none z-0" />
        )}
      </mark>
    )
  }
)
Highlighter.displayName = "Highlighter"

export { Highlighter, highlighterVariants }
