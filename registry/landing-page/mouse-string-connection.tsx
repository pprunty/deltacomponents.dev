"use client"

import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

interface MouseStringConnectionProps {
  children: React.ReactNode
  className?: string
  strokeColor?: string
  strokeWidth?: number
  dashArray?: [number, number]
  maxOpacity?: number
  curveIntensity?: number
  arrowSize?: number
  fadeDistance?: number
  disabled?: boolean
}

interface MousePosition {
  x: number | null
  y: number | null
}

export default function MouseStringConnection({
  children,
  className,
  strokeColor = "hsl(var(--foreground) / 0.75)",
  strokeWidth = 1,
  dashArray = [10, 4],
  maxOpacity = 0.75,
  curveIntensity = 0.5,
  arrowSize = 10,
  fadeDistance = 750,
  disabled = false,
}: MouseStringConnectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const targetRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const [mouse, setMouse] = useState<MousePosition>({ x: null, y: null })

  // Helper function to get the actual CSS variable value
  const getForegroundColor = useCallback((opacity: number) => {
    if (typeof window === "undefined") return `rgba(30, 41, 59, ${opacity})`

    const style = getComputedStyle(document.documentElement)
    const foregroundValue = style.getPropertyValue("--foreground").trim()

    if (foregroundValue) {
      // Convert the HSL values to rgba
      // foregroundValue should be something like "#1e293b" or "30 41 59" (for hsl format)
      if (foregroundValue.startsWith("#")) {
        // Hex color - convert to rgb
        const hex = foregroundValue.replace("#", "")
        const r = parseInt(hex.substr(0, 2), 16)
        const g = parseInt(hex.substr(2, 2), 16)
        const b = parseInt(hex.substr(4, 2), 16)
        return `rgba(${r}, ${g}, ${b}, ${opacity})`
      } else {
        // Assume it's space-separated RGB values like "30 41 59"
        const [r, g, b] = foregroundValue
          .split(" ")
          .map((v) => parseInt(v.trim()))
        return `rgba(${r || 30}, ${g || 41}, ${b || 59}, ${opacity})`
      }
    }

    // Fallback
    return `rgba(30, 41, 59, ${opacity})`
  }, [])

  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const { devicePixelRatio = 1 } = window
    const rect = canvas.getBoundingClientRect()

    canvas.width = rect.width * devicePixelRatio
    canvas.height = rect.height * devicePixelRatio
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.scale(devicePixelRatio, devicePixelRatio)
    }
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (disabled) return
      setMouse({ x: e.clientX, y: e.clientY })
    },
    [disabled]
  )

  const drawArrow = useCallback(() => {
    const canvas = canvasRef.current
    const target = targetRef.current
    const ctx = canvas?.getContext("2d")

    if (!canvas || !target || !ctx || !mouse.x || !mouse.y) return

    const x0 = mouse.x
    const y0 = mouse.y

    // Get target center and dimensions
    const rect = target.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2

    // Calculate angle and end point (stopping at button edge)
    const angle = Math.atan2(cy - y0, cx - x0)
    const x1 = cx - Math.cos(angle) * (rect.width / 2 + 12)
    const y1 = cy - Math.sin(angle) * (rect.height / 2 + 12)

    // Calculate curve control point
    const midX = (x0 + x1) / 2
    const midY = (y0 + y1) / 2
    const distance = Math.hypot(x1 - x0, y1 - y0)
    const offset = Math.min(200, distance * curveIntensity)
    const t = Math.max(-1, Math.min(1, (y0 - y1) / 200))
    const controlX = midX
    const controlY = midY + offset * t

    // Calculate opacity based on distance
    const minDistance = Math.max(rect.width, rect.height) / 2
    const opacity = Math.min(
      maxOpacity,
      Math.max(0, (distance - minDistance) / fadeDistance)
    )

    if (opacity <= 0) return

    // Parse stroke color and apply opacity
    let colorWithOpacity: string

    if (strokeColor === "hsl(var(--foreground) / 0.75)") {
      // Use the computed foreground color for theme support
      colorWithOpacity = getForegroundColor(opacity)
    } else if (strokeColor.includes("rgba")) {
      colorWithOpacity = strokeColor.replace(/[\d.]+\)$/g, `${opacity})`)
    } else if (strokeColor.includes("rgb")) {
      colorWithOpacity = strokeColor
        .replace("rgb", "rgba")
        .replace(")", `, ${opacity})`)
    } else {
      // Fallback for other color formats
      colorWithOpacity = `rgba(255, 255, 255, ${opacity})`
    }

    ctx.strokeStyle = colorWithOpacity
    ctx.lineWidth = strokeWidth

    // Draw curved dashed line
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(x0, y0)
    ctx.quadraticCurveTo(controlX, controlY, x1, y1)
    ctx.setLineDash(dashArray)
    ctx.stroke()
    ctx.restore()

    // Draw arrowhead
    const arrowAngle = Math.atan2(y1 - controlY, x1 - controlX)
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(
      x1 - arrowSize * Math.cos(arrowAngle - Math.PI / 6),
      y1 - arrowSize * Math.sin(arrowAngle - Math.PI / 6)
    )
    ctx.moveTo(x1, y1)
    ctx.lineTo(
      x1 - arrowSize * Math.cos(arrowAngle + Math.PI / 6),
      y1 - arrowSize * Math.sin(arrowAngle + Math.PI / 6)
    )
    ctx.stroke()
  }, [
    mouse,
    strokeColor,
    strokeWidth,
    dashArray,
    maxOpacity,
    curveIntensity,
    arrowSize,
    fadeDistance,
    getForegroundColor,
  ])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")

    if (!canvas || !ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (!disabled) {
      drawArrow()
    }

    animationRef.current = requestAnimationFrame(animate)
  }, [drawArrow, disabled])

  useEffect(() => {
    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [updateCanvasSize, handleMouseMove])

  useEffect(() => {
    animate()
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animate])

  return (
    <div className={cn("relative", className)}>
      <div ref={targetRef}>{children}</div>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50"
        style={{ width: "100vw", height: "100vh" }}
      />
    </div>
  )
}
