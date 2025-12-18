"use client"

import type React from "react"
import { useRef, type RefObject } from "react"
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type SpringOptions,
} from "motion/react"

import { cn } from "@/lib/utils"

// Custom wrap function for seamless looping
const wrap = (min: number, max: number, value: number): number => {
  const range = max - min
  return ((((value - min) % range) + range) % range) + min
}

export interface MarqueeProps {
  children: React.ReactNode
  className?: string
  /**
   * Direction of the marquee animation
   * @default "right"
   */
  direction?: "left" | "right" | "up" | "down"
  /**
   * Speed preset for the marquee animation
   * @default "default"
   */
  speedPreset?: "slow" | "default" | "fast"
  /**
   * Speed of the marquee animation (lower is slower, higher is faster)
   * @default 10
   */
  speed?: number
  /**
   * Whether to pause animation on hover
   * @default false
   */
  pauseOnHover?: boolean
  /**
   * Whether to slow down the animation on hover
   * @default false
   */
  slowdownOnHover?: boolean
  /**
   * The factor to slow down the animation on hover
   * @default 0.3
   */
  slowDownFactor?: number
  /**
   * The spring config for the slow down animation
   */
  slowDownSpringConfig?: SpringOptions
  /**
   * Whether to show fade effect on edges
   * @default false
   */
  showFade?: boolean
  /**
   * Fade intensity (0-100)
   * @default 12.5
   */
  fadeIntensity?: number
  /**
   * Number of times to repeat the children
   * @default 3
   */
  repeat?: number
  /**
   * Whether to use the scroll velocity to control the marquee speed
   * @default false
   */
  useScrollVelocity?: boolean
  /**
   * Whether to adjust the direction based on the scroll direction
   * @default false
   */
  scrollAwareDirection?: boolean
  /**
   * The spring config for the scroll velocity-based direction adjustment
   */
  scrollSpringConfig?: SpringOptions
  /**
   * The container to use for the scroll velocity
   */
  scrollContainer?: RefObject<HTMLElement | null> | HTMLElement | null
  /**
   * Whether to allow dragging of the marquee
   * @default false
   */
  draggable?: boolean
  /**
   * The sensitivity of the drag movement
   * @default 0.2
   */
  dragSensitivity?: number
  /**
   * The decay of the drag velocity
   * @default 0.96
   */
  dragVelocityDecay?: number
  /**
   * Whether to adjust the direction based on the drag velocity
   * @default false
   */
  dragAwareDirection?: boolean
  /**
   * The angle of the drag movement in degrees
   * @default 0
   */
  dragAngle?: number
  /**
   * Whether to change the cursor to grabbing when dragging
   * @default true
   */
  grabCursor?: boolean
  /**
   * Custom easing function for the animation
   */
  easing?: (value: number) => number
}

export function Marquee({
  children,
  className,
  direction = "right",
  speedPreset = "default",
  speed,
  pauseOnHover = false,
  slowdownOnHover = false,
  slowDownFactor = 0.3,
  slowDownSpringConfig = { damping: 50, stiffness: 400 },
  showFade = false,
  fadeIntensity = 12.5,
  repeat = 3,
  useScrollVelocity = false,
  scrollAwareDirection = false,
  scrollSpringConfig = { damping: 50, stiffness: 400 },
  scrollContainer,
  draggable = false,
  dragSensitivity = 0.2,
  dragVelocityDecay = 0.96,
  dragAwareDirection = false,
  dragAngle = 0,
  grabCursor = true,
  easing,
}: MarqueeProps) {
  const speedMap = {
    slow: 5,
    default: 10,
    fast: 20,
  }

  const actualSpeed = speed ?? speedMap[speedPreset]

  const baseX = useMotionValue(0)
  const baseY = useMotionValue(0)

  const { scrollY } = useScroll({
    ...(scrollContainer && {
      container: scrollContainer as RefObject<HTMLDivElement>,
    }),
  })

  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, scrollSpringConfig)

  const hoverFactorValue = useMotionValue(1)
  const defaultVelocity = useMotionValue(1)

  const isDragging = useRef(false)
  const dragVelocity = useRef(0)
  const isPausedRef = useRef(false)

  const smoothHoverFactor = useSpring(hoverFactorValue, slowDownSpringConfig)

  const velocityFactor = useTransform(
    useScrollVelocity ? smoothVelocity : defaultVelocity,
    [0, 1000],
    [0, 5],
    {
      clamp: false,
    }
  )

  const isHorizontal = direction === "left" || direction === "right"

  const actualBaseVelocity =
    direction === "left" || direction === "up" ? -actualSpeed : actualSpeed

  const isHovered = useRef(false)
  const directionFactor = useRef(1)

  const x = useTransform(baseX, (v) => {
    const wrappedValue = wrap(0, -100, v)
    return `${easing ? easing(wrappedValue / -100) * -100 : wrappedValue}%`
  })
  const y = useTransform(baseY, (v) => {
    const wrappedValue = wrap(0, -100, v)
    return `${easing ? easing(wrappedValue / -100) * -100 : wrappedValue}%`
  })

  useAnimationFrame((t, delta) => {
    if (isPausedRef.current) {
      return
    }

    if (isDragging.current && draggable) {
      if (isHorizontal) {
        baseX.set(baseX.get() + dragVelocity.current)
      } else {
        baseY.set(baseY.get() + dragVelocity.current)
      }

      dragVelocity.current *= 0.9

      if (Math.abs(dragVelocity.current) < 0.01) {
        dragVelocity.current = 0
      }

      return
    }

    if (isHovered.current) {
      hoverFactorValue.set(slowdownOnHover ? slowDownFactor : 1)
    } else {
      hoverFactorValue.set(1)
    }

    let moveBy =
      directionFactor.current *
      actualBaseVelocity *
      (delta / 1000) *
      smoothHoverFactor.get()

    if (scrollAwareDirection && !isDragging.current) {
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1
      }
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()

    if (draggable) {
      moveBy += dragVelocity.current

      if (dragAwareDirection && Math.abs(dragVelocity.current) > 0.1) {
        directionFactor.current = Math.sign(dragVelocity.current)
      }

      if (!isDragging.current && Math.abs(dragVelocity.current) > 0.01) {
        dragVelocity.current *= dragVelocityDecay
      } else if (!isDragging.current) {
        dragVelocity.current = 0
      }
    }

    if (isHorizontal) {
      baseX.set(baseX.get() + moveBy)
    } else {
      baseY.set(baseY.get() + moveBy)
    }
  })

  const lastPointerPosition = useRef({ x: 0, y: 0 })

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!draggable) return
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)

    if (grabCursor) {
      ;(e.currentTarget as HTMLElement).style.cursor = "grabbing"
    }

    isDragging.current = true
    lastPointerPosition.current = { x: e.clientX, y: e.clientY }
    dragVelocity.current = 0
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggable || !isDragging.current) return

    const currentPosition = { x: e.clientX, y: e.clientY }
    const deltaX = currentPosition.x - lastPointerPosition.current.x
    const deltaY = currentPosition.y - lastPointerPosition.current.y

    const angleInRadians = (dragAngle * Math.PI) / 180
    const directionX = Math.cos(angleInRadians)
    const directionY = Math.sin(angleInRadians)

    const projectedDelta = deltaX * directionX + deltaY * directionY
    dragVelocity.current = projectedDelta * dragSensitivity

    lastPointerPosition.current = currentPosition
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!draggable) return
    ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)

    if (grabCursor) {
      ;(e.currentTarget as HTMLElement).style.cursor = "grab"
    }

    isDragging.current = false
  }

  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      style={{ transform: "translateZ(0)" }}
    >
      {showFade && isHorizontal && (
        <>
          <div
            className="from-background to-transparent pointer-events-none absolute top-0 left-0 z-10 h-full bg-gradient-to-r select-none"
            style={{
              width: `${fadeIntensity}%`,
              transform: "translateZ(0)",
            }}
          />
          <div
            className="from-background to-transparent pointer-events-none absolute top-0 right-0 z-10 h-full bg-gradient-to-l select-none"
            style={{
              width: `${fadeIntensity}%`,
              transform: "translateZ(0)",
            }}
          />
        </>
      )}
      {showFade && !isHorizontal && (
        <>
          <div
            className="from-background to-transparent pointer-events-none absolute top-0 left-0 z-10 w-full bg-gradient-to-b select-none"
            style={{
              height: `${fadeIntensity}%`,
              transform: "translateZ(0)",
            }}
          />
          <div
            className="from-background to-transparent pointer-events-none absolute bottom-0 left-0 z-10 w-full bg-gradient-to-t select-none"
            style={{
              height: `${fadeIntensity}%`,
              transform: "translateZ(0)",
            }}
          />
        </>
      )}
      <motion.div
        className={cn("flex", isHorizontal ? "flex-row" : "flex-col")}
        onHoverStart={() => {
          isHovered.current = true
          if (pauseOnHover) {
            isPausedRef.current = true
          }
        }}
        onHoverEnd={() => {
          isHovered.current = false
          if (pauseOnHover) {
            isPausedRef.current = false
          }
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {Array.from({ length: repeat }, (_, i) => i).map((i) => (
          <motion.div
            key={i}
            className={cn(
              "shrink-0",
              isHorizontal && "flex",
              draggable && grabCursor && "cursor-grab"
            )}
            style={isHorizontal ? { x } : { y }}
            aria-hidden={i > 0}
          >
            {children}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
