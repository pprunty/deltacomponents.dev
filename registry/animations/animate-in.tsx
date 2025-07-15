"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"

interface AnimateInProps {
  children: React.ReactNode
  direction?: "up" | "left" | "right" | "fade"
  delay?: number
  className?: string
  useIntersectionObserver?: boolean
  threshold?: number
  triggerOnce?: boolean
  duration?: number
  enableBlur?: boolean
  blurAmount?: number
}

const AnimateIn: React.FC<AnimateInProps> = ({
  children,
  direction = "up",
  delay = 0,
  className = "",
  useIntersectionObserver = false,
  threshold = 0.1,
  triggerOnce = true,
  duration = 0.6,
  enableBlur = false,
  blurAmount = 8,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (useIntersectionObserver) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (triggerOnce) {
              observer.unobserve(entry.target)
            }
          } else if (!triggerOnce) {
            setIsVisible(false)
          }
        },
        { threshold }
      )

      if (elementRef.current) {
        observer.observe(elementRef.current)
      }

      return () => {
        if (elementRef.current) {
          observer.unobserve(elementRef.current)
        }
      }
    } else {
      // Original delay-based behavior
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [delay, useIntersectionObserver, threshold, triggerOnce])

  const getInitialState = () => {
    const baseState = (() => {
      switch (direction) {
        case "left":
          return { opacity: 0, x: -30 }
        case "right":
          return { opacity: 0, x: 30 }
        case "fade":
          return { opacity: 0 }
        case "up":
        default:
          return { opacity: 0, y: 20 }
      }
    })()

    return enableBlur
      ? { ...baseState, filter: `blur(${blurAmount}px)` }
      : baseState
  }

  const getAnimateState = () => {
    const baseState = (() => {
      switch (direction) {
        case "left":
          return { opacity: 1, x: 0 }
        case "right":
          return { opacity: 1, x: 0 }
        case "fade":
          return { opacity: 1 }
        case "up":
        default:
          return { opacity: 1, y: 0 }
      }
    })()

    return enableBlur ? { ...baseState, filter: "blur(0px)" } : baseState
  }

  return (
    <motion.div
      ref={elementRef}
      className={className}
      initial={getInitialState()}
      animate={isVisible ? getAnimateState() : getInitialState()}
      transition={{
        duration,
        delay: useIntersectionObserver ? 0 : delay / 1000,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  )
}

export default AnimateIn
