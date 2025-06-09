"use client"

import * as React from "react"
import { motion, useInView, type Variants } from "framer-motion"

import { cn } from "@/lib/utils"

export interface AnimateInProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    | "onDrag"
    | "onDragEnd"
    | "onDragStart"
    | "onAnimationStart"
    | "onAnimationEnd"
  > {
  children: React.ReactNode
  /**
   * Direction of the animation
   * @default "up"
   */
  direction?: "up" | "down" | "left" | "right"
  /**
   * Distance in pixels the element travels during animation
   * @default 50
   */
  distance?: number
  /**
   * Duration of the animation in seconds
   * @default 0.6
   */
  duration?: number
  /**
   * Delay before animation starts in seconds
   * @default 0
   */
  delay?: number
  /**
   * Whether to use intersection observer for triggering animation
   * @default true
   */
  useIntersectionObserver?: boolean
  /**
   * Intersection observer threshold (0-1)
   * @default 0.1
   */
  threshold?: number
  /**
   * Whether to animate only once or every time it comes into view
   * @default true
   */
  once?: boolean
  /**
   * Easing function for the animation
   * @default "easeOut"
   */
  easing?:
    | "linear"
    | "easeIn"
    | "easeOut"
    | "easeInOut"
    | "circIn"
    | "circOut"
    | "circInOut"
    | "backIn"
    | "backOut"
    | "backInOut"
    | "anticipate"
  /**
   * Initial opacity value
   * @default 0
   */
  initialOpacity?: number
  /**
   * Final opacity value
   * @default 1
   */
  finalOpacity?: number
  /**
   * Whether to start animation immediately (ignores intersection observer)
   * @default false
   */
  immediate?: boolean
  /**
   * Stagger delay for child elements in seconds
   * @default 0
   */
  staggerChildren?: number
  /**
   * Whether animation is disabled
   * @default false
   */
  disabled?: boolean
  /**
   * Whether to show a blur overlay effect during animation
   * @default false
   */
  overlayBlur?: boolean
}

const easingMap = {
  linear: [0, 0, 1, 1],
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  circIn: [0.6, 0.04, 0.98, 0.335],
  circOut: [0.075, 0.82, 0.165, 1],
  circInOut: [0.785, 0.135, 0.15, 0.86],
  backIn: [0.6, -0.28, 0.735, 0.045],
  backOut: [0.175, 0.885, 0.32, 1.275],
  backInOut: [0.68, -0.55, 0.265, 1.55],
  anticipate: [0.215, 0.61, 0.355, 1],
} as const

export default function AnimateIn({
  children,
  direction = "up",
  distance = 50,
  duration = 0.6,
  delay = 0,
  useIntersectionObserver = true,
  threshold = 0.1,
  once = true,
  easing = "easeOut",
  initialOpacity = 0,
  finalOpacity = 1,
  immediate = false,
  staggerChildren = 0,
  disabled = false,
  overlayBlur = false,
  className,
  ...props
}: AnimateInProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    once,
    margin: "0px 0px -100px 0px", // Start animation slightly before element is fully visible
  })

  // Determine if animation should be active
  const shouldAnimate = React.useMemo(() => {
    if (disabled) return false
    if (immediate) return true
    if (!useIntersectionObserver) return true
    return isInView
  }, [disabled, immediate, useIntersectionObserver, isInView])

  // Calculate initial position based on direction
  const getInitialPosition = React.useCallback(() => {
    switch (direction) {
      case "up":
        return { x: 0, y: distance }
      case "down":
        return { x: 0, y: -distance }
      case "left":
        return { x: distance, y: 0 }
      case "right":
        return { x: -distance, y: 0 }
      default:
        return { x: 0, y: distance }
    }
  }, [direction, distance])

  const initialPosition = getInitialPosition()

  const variants: Variants = {
    hidden: {
      opacity: initialOpacity,
      x: initialPosition.x,
      y: initialPosition.y,
    },
    visible: {
      opacity: finalOpacity,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: easingMap[easing],
        staggerChildren: staggerChildren > 0 ? staggerChildren : undefined,
      },
    },
  }

  const childVariants: Variants =
    staggerChildren > 0
      ? {
          hidden: {
            opacity: initialOpacity,
            x: initialPosition.x,
            y: initialPosition.y,
          },
          visible: {
            opacity: finalOpacity,
            x: 0,
            y: 0,
            transition: {
              duration,
              ease: easingMap[easing],
            },
          },
        }
      : {}

  // If disabled, render without animation
  if (disabled) {
    return (
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    )
  }

  // Create variants with blur effect if overlayBlur is enabled
  const blurVariants = overlayBlur
    ? {
        hidden: {
          ...variants.hidden,
          filter: "blur(4px)",
        },
        visible: {
          ...variants.visible,
          filter: "blur(0px)",
        },
      }
    : variants

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={shouldAnimate ? "visible" : "hidden"}
      variants={blurVariants}
      className={cn(className)}
      {...props}
    >
      {staggerChildren > 0
        ? React.Children.map(children, (child, index) => (
            <motion.div key={index} variants={childVariants}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  )
}
