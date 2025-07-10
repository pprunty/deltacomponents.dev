"use client"

import type React from "react"
import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

interface LatexProps {
  /**
   * The LaTeX mathematical expression to render
   */
  math: string
  /**
   * Whether to render as a block-level element (centered) or inline
   * @default false
   */
  block?: boolean
  /**
   * Size scaling for the rendered math
   * @default "medium"
   */
  size?: "small" | "medium" | "large" | "x-large"
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * LaTeX component for rendering mathematical expressions
 *
 * Note: This component requires KaTeX CSS. Add the following to your global CSS:
 * @import "katex/dist/katex.min.css";
 *
 * @example
 * ```tsx
 * <Latex math="E = mc^2" />
 * <Latex math="\int_0^1 x^2 dx" block size="large" />
 * ```
 */
export default function Latex({
  math,
  block = false,
  size = "medium",
  className,
}: LatexProps) {
  const [renderedMath, setRenderedMath] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Map size names to scale values
  const sizeMap = {
    small: 1,
    medium: 1.2,
    large: 1.5,
    "x-large": 2,
  }

  const scale = sizeMap[size]

  const style = {
    fontSize: `${scale}em`,
  }

  useEffect(() => {
    const renderMath = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Dynamic import to avoid SSR issues
        const { default: katex } = await import("katex")

        const html = katex.renderToString(math, {
          displayMode: block,
          throwOnError: false,
          output: "html",
          strict: false,
        })

        setRenderedMath(html)
      } catch (err) {
        console.error("LaTeX rendering error:", err)
        setError(`Invalid LaTeX: ${math}`)
      } finally {
        setIsLoading(false)
      }
    }

    renderMath()
  }, [math, block])

  if (isLoading) {
    return block ? (
      <div style={style} className={cn("text-center my-4", className)}>
        Loading...
      </div>
    ) : (
      <span style={style} className={cn("inline-block", className)}>
        Loading...
      </span>
    )
  }

  if (error) {
    return block ? (
      <div
        style={style}
        className={cn("text-center my-4 text-red-500", className)}
      >
        [{error}]
      </div>
    ) : (
      <span
        style={style}
        className={cn("inline-block text-red-500", className)}
      >
        [{error}]
      </span>
    )
  }

  return block ? (
    <div
      style={style}
      className={cn("text-center my-4", className)}
      dangerouslySetInnerHTML={{ __html: renderedMath }}
    />
  ) : (
    <span
      style={style}
      className={cn("inline-block", className)}
      dangerouslySetInnerHTML={{ __html: renderedMath }}
    />
  )
}

/**
 * Enhanced inline math component with large size preset
 */
export const LargeInlineMath: React.FC<{
  math: string
  className?: string
}> = ({ math, className }) => {
  return <Latex math={math} size="large" className={className} />
}

/**
 * Enhanced block math component with large size preset
 */
export const LargeBlockMath: React.FC<{ math: string; className?: string }> = ({
  math,
  className,
}) => {
  return <Latex math={math} block size="large" className={className} />
}

// Export the main component as named export for consistency
export { Latex }
