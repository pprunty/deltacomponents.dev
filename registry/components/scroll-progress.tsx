import React from "react"
import { motion, SpringOptions, useScroll, useSpring } from "framer-motion"

// ScrollProgress Component
const cn = (...classes: (string | undefined | false)[]) =>
  classes.filter(Boolean).join(" ")

type ScrollProgressProps = {
  className?: string
  springOptions?: SpringOptions
  containerRef?: React.RefObject<HTMLDivElement>
  position?: "top" | "bottom"
  variant?: "default" | "secondary" | "destructive" | "outline"
  absolute?: boolean
  children?: React.ReactNode
  height?: number
  color?: string
}

const DEFAULT_SPRING_OPTIONS: SpringOptions = {
  stiffness: 200,
  damping: 50,
  restDelta: 0.001,
}

const variantStyles = {
  default: "bg-slate-900 dark:bg-slate-50",
  secondary: "bg-slate-500 dark:bg-slate-400",
  destructive: "bg-red-500 dark:bg-red-900",
  outline: "bg-slate-200 dark:bg-slate-800",
}

export default function ScrollProgress({
  className,
  springOptions,
  containerRef,
  position = "bottom",
  variant = "default",
  absolute = false,
  children,
  height = 4,
  color,
}: ScrollProgressProps) {
  const contentRef = React.useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    container: containerRef,
    target: children ? contentRef : undefined,
    offset: children ? ["start end", "end start"] : undefined,
    layoutEffect: Boolean(containerRef?.current) || Boolean(children),
  })

  const scaleX = useSpring(scrollYProgress, {
    ...DEFAULT_SPRING_OPTIONS,
    ...(springOptions ?? {}),
  })

  const positionStyles = {
    top: "top-0",
    bottom: "bottom-0",
  }

  const progressBar = (
    <div
      className={cn(
        "inset-x-0 bg-slate-200/20 dark:bg-slate-800/20 z-50",
        absolute ? "absolute" : "fixed",
        positionStyles[position],
        className
      )}
      style={{ height: `${height}px` }}
    >
      <motion.div
        className={cn(
          "h-full origin-left transition-colors",
          !color && variantStyles[variant]
        )}
        style={{
          scaleX,
          backgroundColor: color,
        }}
      />
    </div>
  )

  if (children) {
    return (
      <>
        {progressBar}
        <div ref={contentRef}>{children}</div>
      </>
    )
  }

  return progressBar
}
