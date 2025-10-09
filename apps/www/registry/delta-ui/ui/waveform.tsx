"use client"

import { useEffect, useRef, type HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

export type WaveformProps = HTMLAttributes<HTMLDivElement> & {
  height?: string | number
  barWidth?: number
  barGap?: number
  barRadius?: number
  barColor?: string
  fadeEdges?: boolean
  fadeWidth?: number
  data?: number[]
}

export type ScrollingWaveformProps = WaveformProps & {
  speed?: number
  barCount?: number
  amplitude?: number
}

export const Waveform = ({
  height = 100,
  barWidth = 3,
  barGap = 1,
  barRadius = 2,
  barColor = "currentColor",
  fadeEdges = false,
  fadeWidth = 20,
  data = [],
  className,
  ...props
}: WaveformProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    ctx.clearRect(0, 0, rect.width, rect.height)
    ctx.fillStyle = barColor

    const barCount = Math.floor(rect.width / (barWidth + barGap))
    const centerY = rect.height / 2

    for (let i = 0; i < barCount && i < data.length; i++) {
      const x = i * (barWidth + barGap)
      const barHeight = Math.max(2, data[i] * rect.height * 0.8)
      const y = centerY - barHeight / 2

      if (barRadius > 0) {
        ctx.beginPath()
        ctx.roundRect(x, y, barWidth, barHeight, barRadius)
        ctx.fill()
      } else {
        ctx.fillRect(x, y, barWidth, barHeight)
      }
    }

    if (fadeEdges && fadeWidth > 0) {
      const gradient = ctx.createLinearGradient(0, 0, fadeWidth, 0)
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)")
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

      ctx.globalCompositeOperation = "destination-out"
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, fadeWidth, rect.height)

      const rightGradient = ctx.createLinearGradient(
        rect.width - fadeWidth,
        0,
        rect.width,
        0
      )
      rightGradient.addColorStop(0, "rgba(255, 255, 255, 0)")
      rightGradient.addColorStop(1, "rgba(255, 255, 255, 1)")

      ctx.fillStyle = rightGradient
      ctx.fillRect(rect.width - fadeWidth, 0, fadeWidth, rect.height)
    }
  }, [data, barWidth, barGap, barRadius, barColor, fadeEdges, fadeWidth])

  return (
    <div className={cn("relative", className)} {...props}>
      <canvas
        ref={canvasRef}
        className="w-full"
        style={{ height: typeof height === "number" ? `${height}px` : height }}
      />
    </div>
  )
}

export const ScrollingWaveform = ({
  speed = 50,
  barCount = 50,
  amplitude = 0.8,
  ...props
}: ScrollingWaveformProps) => {
  const dataRef = useRef<number[]>([])
  const animationRef = useRef<number | null>(null)
  const lastUpdateRef = useRef(0)

  useEffect(() => {
    // Initialize with random data
    dataRef.current = Array.from(
      { length: barCount },
      () => Math.random() * amplitude
    )

    const animate = (timestamp: number) => {
      if (timestamp - lastUpdateRef.current >= speed) {
        // Shift data left and add new random value
        dataRef.current.shift()
        dataRef.current.push(Math.random() * amplitude)
        lastUpdateRef.current = timestamp
      }
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [speed, barCount, amplitude])

  return <Waveform {...props} data={dataRef.current} />
}
