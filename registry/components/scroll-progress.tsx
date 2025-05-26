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
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll({
    container: containerRef,
    layoutEffect: Boolean(containerRef?.current),
  })

  const scaleX = useSpring(scrollYProgress, {
    ...DEFAULT_SPRING_OPTIONS,
    ...(springOptions ?? {}),
  })

  const positionStyles = {
    top: "top-0",
    bottom: "bottom-0",
  }

  return (
    <div
      className={cn(
        "inset-x-0 h-1 bg-slate-200/20 dark:bg-slate-800/20 z-50",
        absolute ? "absolute" : "fixed",
        positionStyles[position],
        className
      )}
    >
      <motion.div
        className={cn(
          "h-full origin-left transition-colors",
          variantStyles[variant]
        )}
        style={{
          scaleX,
        }}
      />
    </div>
  )
}
