"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Animation speed in seconds for one complete loop
   * @default 30
   */
  speed?: number
  /**
   * Direction of the carousel animation
   * @default "left"
   */
  direction?: "left" | "right"
  /**
   * Whether to pause animation on hover
   * @default true
   */
  pauseOnHover?: boolean
  /**
   * Gap between items in pixels
   * @default 70
   */
  gap?: number
  /**
   * Whether to show fade effect on edges
   * @default true
   */
  showFade?: boolean
  /**
   * Fade intensity (0-100)
   * @default 12.5
   */
  fadeIntensity?: number
  /**
   * Number of times to duplicate the children for seamless loop
   * @default 2
   */
  duplicates?: number
  /**
   * Custom class for each item container
   */
  itemClassName?: string
  /**
   * Children to display in the marquee
   */
  children: React.ReactNode
}

export function Marquee({
  children,
  speed = 30,
  direction = "left",
  pauseOnHover = true,
  gap = 70,
  showFade = true,
  fadeIntensity = 12.5,
  duplicates = 2,
  itemClassName,
  className,
  ...props
}: MarqueeProps) {
  const [isPaused, setIsPaused] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Create duplicated children array for seamless loop
  const childrenArray = React.Children.toArray(children)
  const duplicatedChildren = React.useMemo(() => {
    return Array.from({ length: duplicates }, () => childrenArray).flat()
  }, [childrenArray, duplicates])

  // Calculate animation duration based on number of items
  const animationDuration = `${speed}s`

  const maskImage = showFade
    ? `linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) ${fadeIntensity}%, rgb(0, 0, 0) ${100 - fadeIntensity}%, rgba(0, 0, 0, 0) 100%)`
    : undefined

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full overflow-hidden", className)}
      style={{
        maskImage,
        WebkitMaskImage: maskImage,
      }}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      {...props}
    >
      <div
        className="flex w-max"
        style={{
          gap: `${gap}px`,
          animation: `scroll-${direction} ${animationDuration} linear infinite`,
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {duplicatedChildren.map((child, index) => (
          <div
            key={index}
            className={cn(
              "flex flex-shrink-0 items-center justify-center",
              itemClassName
            )}
          >
            {child}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}
