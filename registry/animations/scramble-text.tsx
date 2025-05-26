"use client"

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react"
import { useScramble } from "use-scramble"

import { cn } from "@/lib/utils"

interface ScrambleTextProps {
  /** The text that will be scrambled and displayed */
  text: string
  /** Speed of the scrambling effect (higher is faster) */
  speed?: number
  /** Optional custom CSS class for the container */
  className?: string
  /** Whether to start the animation automatically when mounted */
  autoStart?: boolean
  /** Callback function when animation completes */
  onComplete?: () => void
  /** Whether to use intersection observer to trigger animation when visible */
  useIntersectionObserver?: boolean
  /** Whether to retrigger animation when element comes into view again */
  retriggerOnIntersection?: boolean
  /** Threshold for intersection observer (0-1) */
  intersectionThreshold?: number
  /** Root margin for intersection observer */
  intersectionRootMargin?: string
}

export interface ScrambleTextHandle {
  start: () => void
  reset: () => void
}

const ScrambleText = forwardRef<ScrambleTextHandle, ScrambleTextProps>(
  (
    {
      text,
      speed = 80,
      className = "",
      autoStart = true,
      onComplete,
      useIntersectionObserver = false,
      retriggerOnIntersection = false,
      intersectionThreshold = 0.3,
      intersectionRootMargin = "0px",
    },
    ref
  ) => {
    const containerRef = useRef<HTMLSpanElement>(null)
    const hasCompletedOnce = useRef(false)

    const { ref: scrambleRef, replay } = useScramble({
      text,
      speed: speed / 100, // Convert to 0-1 range
      tick: 2,
      step: 1,
      range: [65, 125], // Use default range (A-Z, a-z, and some special chars)
      scramble: 2,
      playOnMount: autoStart && !useIntersectionObserver,
      onAnimationEnd: () => {
        hasCompletedOnce.current = true
        onComplete?.()
      },
      overdrive: false, // Disable underscore characters
    })

    useImperativeHandle(ref, () => ({
      start: () => replay(),
      reset: () => {
        // Reset internal state
        hasCompletedOnce.current = false
        // Replay the animation
        replay()
      },
    }))

    // Handle Intersection Observer
    useEffect(() => {
      if (!useIntersectionObserver || !containerRef.current) return

      const observerOptions = {
        root: null,
        rootMargin: intersectionRootMargin,
        threshold: intersectionThreshold,
      }

      const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!hasCompletedOnce.current || retriggerOnIntersection) {
              replay()
            }

            // If not set to retrigger, unobserve after first animation
            if (!retriggerOnIntersection) {
              observer.unobserve(entry.target)
            }
          }
        })
      }

      const observer = new IntersectionObserver(
        handleIntersection,
        observerOptions
      )
      observer.observe(containerRef.current)

      return () => {
        if (containerRef.current) {
          observer.unobserve(containerRef.current)
        }
      }
    }, [
      useIntersectionObserver,
      retriggerOnIntersection,
      intersectionThreshold,
      intersectionRootMargin,
      replay,
    ])

    return (
      <>
        <span className="sr-only">{text}</span>
        <span
          ref={containerRef}
          className={cn("inline-block whitespace-pre-wrap", className)}
          aria-hidden="true"
        >
          <span ref={scrambleRef} />
        </span>
      </>
    )
  }
)

ScrambleText.displayName = "ScrambleText"
export default ScrambleText
