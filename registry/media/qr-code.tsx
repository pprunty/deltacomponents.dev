"use client"

import { useEffect, useRef, useState } from "react"
// @ts-expect-error: No type definitions for 'qrcode' available
import { toCanvas } from "qrcode"

import { cn } from "@/lib/utils"

interface QRCodeProps {
  value: string
  size?: number
  bgColor?: string // Can be a CSS variable (e.g. --color-card) or a color value
  fgColor?: string // Can be a CSS variable (e.g. --color-primary-foreground) or a color value
  errorCorrectionLevel?: "L" | "M" | "Q" | "H"
  margin?: number
  className?: string
  containerClassName?: string
}

// Helper to resolve CSS variable or direct color
function resolveColor(color?: string, fallback?: string) {
  if (!color) return fallback
  if (color.startsWith("--")) {
    if (typeof window !== "undefined") {
      const value = getComputedStyle(document.documentElement).getPropertyValue(
        color
      )
      if (value) return value.trim()
    }
    return fallback
  }
  return color
}

export default function QRCode({
  value,
  size = 200,
  // Use shadcn theme variables for best contrast by default
  bgColor = "--color-card", // background
  fgColor = "--color-card-foreground", // foreground (text/qr dots)
  errorCorrectionLevel = "M",
  margin = 4,
  className,
  containerClassName,
}: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !value) return

    setIsLoading(true)
    setHasError(false)

    // Always resolve to actual color values
    const resolvedBgColor = resolveColor(bgColor, "#ffffff00") // fallback: transparent
    const resolvedFgColor = resolveColor(fgColor, "#000000") // fallback: black

    toCanvas(
      canvas,
      value,
      {
        width: size,
        margin,
        color: {
          dark: resolvedFgColor,
          light: resolvedBgColor,
        },
        errorCorrectionLevel,
      },
      (error: unknown) => {
        if (error) {
          console.error("QR Code generation error:", error)
          setHasError(true)
        }
        setIsLoading(false)
      }
    )
  }, [value, size, bgColor, fgColor, errorCorrectionLevel, margin])

  if (!value) {
    return (
      <div
        className={cn(
          "flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-500 rounded-xl",
          containerClassName
        )}
        style={{ width: size + 32, height: size + 32 }}
      >
        No data provided
      </div>
    )
  }

  if (hasError) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center border-2 border-dashed border-red-300 text-red-500 rounded-xl p-4",
          containerClassName
        )}
        style={{ width: size + 32, height: size + 32 }}
      >
        <svg
          className="w-8 h-8 mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
        <span className="text-sm">Failed to generate QR code</span>
      </div>
    )
  }

  // Use the resolved background color for the container, or transparent if not found
  const containerBg = resolveColor(bgColor, "transparent")

  return (
    <div
      className={cn(
        "inline-block p-4 rounded-xl shadow-lg relative",
        containerClassName
      )}
      style={{ backgroundColor: containerBg }}
    >
      {/* Container for both SVG and canvas to ensure same positioning */}
      <div className="relative" style={{ width: size, height: size }}>
        {/* Loading SVG placeholder - positioned absolutely to match canvas exactly */}
        {isLoading && (
          <div
            className="absolute top-0 left-0 flex items-center justify-center"
            style={{ width: size, height: size }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 368 368"
              className="opacity-30 animate-pulse rounded-lg"
              style={{
                width: `${size - margin * 8}px`,
                height: `${size - margin * 8}px`,
              }}
            >
              <path
                d="m 16,16 0,16 0,16 0,16 0,16 0,16 0,16 0,16 16,0 16,0 16,0 16,0 16,0 16,0 16,0 0,-16 0,-16 0,-16 0,-16 0,-16 0,-16 0,-16 -16,0 -16,0 -16,0 -16,0 -16,0 -16,0 -16,0 z m 128,0 0,16 0,16 16,0 0,-16 16,0 0,-16 -16,0 -16,0 z m 32,16 0,16 16,0 0,-16 -16,0 z m 16,16 0,16 16,0 16,0 0,-16 0,-16 0,-16 -16,0 0,16 0,16 -16,0 z m 0,16 -16,0 -16,0 -16,0 0,16 16,0 16,0 0,16 -16,0 0,16 16,0 0,16 16,0 0,-16 16,0 0,16 -16,0 0,16 -16,0 0,16 16,0 16,0 0,16 16,0 0,-16 0,-16 0,-16 0,-16 0,-16 -16,0 0,-16 -16,0 0,-16 z m 16,112 -16,0 0,16 -16,0 0,16 0,16 16,0 0,16 0,16 -16,0 -16,0 0,-16 16,0 0,-16 -16,0 0,-16 0,-16 -16,0 0,-16 16,0 0,16 16,0 0,-16 0,-16 -16,0 -16,0 0,-16 -16,0 -16,0 -16,0 0,16 -16,0 0,16 -16,0 0,-16 16,0 0,-16 -16,0 -16,0 0,16 -16,0 0,16 0,16 0,16 16,0 0,-16 16,0 16,0 16,0 0,-16 16,0 0,-16 16,0 0,16 -16,0 0,16 16,0 0,16 -16,0 0,16 16,0 16,0 0,16 0,16 0,16 16,0 0,16 16,0 16,0 16,0 0,16 -16,0 -16,0 -16,0 0,-16 -16,0 0,16 0,16 16,0 0,16 -16,0 0,16 16,0 16,0 0,-16 16,0 0,16 16,0 16,0 16,0 16,0 0,-16 16,0 0,16 16,0 16,0 16,0 0,-16 -16,0 -16,0 0,-16 -16,0 0,-16 -16,0 0,16 -16,0 -16,0 0,16 -16,0 0,-16 16,0 0,-16 0,-16 0,-16 16,0 0,-16 -16,0 -16,0 0,-16 16,0 0,-16 0,-16 0,-16 -16,0 0,-16 z m 48,128 0,-16 -16,0 0,16 16,0 z m 32,16 16,0 16,0 0,-16 -16,0 -16,0 0,16 z m 32,-16 16,0 0,-16 0,-16 0,-16 0,-16 -16,0 -16,0 -16,0 0,-16 -16,0 0,16 -16,0 0,16 0,16 16,0 0,-16 16,0 0,16 0,16 16,0 16,0 0,16 z m -48,-80 0,-16 -16,0 -16,0 0,16 16,0 16,0 z m 16,0 16,0 0,-16 0,-16 0,-16 16,0 0,16 16,0 0,16 16,0 0,-16 0,-16 -16,0 0,-16 16,0 0,-16 -16,0 -16,0 0,16 -16,0 0,-16 -16,0 0,16 -16,0 0,16 16,0 0,16 0,16 0,16 z m -16,-48 -16,0 0,16 16,0 0,-16 z m 64,32 -16,0 0,16 16,0 0,-16 z m -224,0 0,-16 -16,0 0,16 16,0 z m -16,0 -16,0 -16,0 -16,0 0,16 16,0 16,0 16,0 0,-16 z m -64,0 -16,0 0,16 16,0 0,-16 z m 0,-48 0,-16 -16,0 0,16 16,0 z m 112,-16 16,0 0,-16 0,-16 -16,0 0,16 0,16 z m 96,-128 0,16 0,16 0,16 0,16 0,16 0,16 0,16 16,0 16,0 16,0 16,0 16,0 16,0 16,0 0,-16 0,-16 0,-16 0,-16 0,-16 0,-16 0,-16 -16,0 -16,0 -16,0 -16,0 -16,0 -16,0 -16,0 z m -208,16 16,0 16,0 16,0 16,0 16,0 0,16 0,16 0,16 0,16 0,16 -16,0 -16,0 -16,0 -16,0 -16,0 0,-16 0,-16 0,-16 0,-16 0,-16 z m 224,0 16,0 16,0 16,0 16,0 16,0 0,16 0,16 0,16 0,16 0,16 -16,0 -16,0 -16,0 -16,0 -16,0 0,-16 0,-16 0,-16 0,-16 0,-16 z m -208,16 0,16 0,16 0,16 16,0 16,0 16,0 0,-16 0,-16 0,-16 -16,0 -16,0 -16,0 z m 224,0 0,16 0,16 0,16 16,0 16,0 16,0 0,-16 0,-16 0,-16 -16,0 -16,0 -16,0 z m -32,96 0,16 16,0 0,-16 -16,0 z m -224,96 0,16 0,16 0,16 0,16 0,16 0,16 0,16 16,0 16,0 16,0 16,0 16,0 16,0 16,0 0,-16 0,-16 0,-16 0,-16 0,-16 0,-16 0,-16 -16,0 -16,0 -16,0 -16,0 -16,0 -16,0 -16,0 z m 16,16 16,0 16,0 16,0 16,0 16,0 0,16 0,16 0,16 0,16 0,16 -16,0 -16,0 -16,0 -16,0 -16,0 0,-16 0,-16 0,-16 0,-16 0,-16 z m 16,16 0,16 0,16 0,16 16,0 16,0 16,0 0,-16 0,-16 0,-16 -16,0 -16,0 -16,0 z m 288,48 0,16 16,0 0,-16 -16,0 z"
                fill="currentColor"
                className="text-gray-400 dark:text-gray-600"
              />
            </svg>
          </div>
        )}

        {/* Actual QR code canvas - positioned absolutely to match SVG exactly */}
        <canvas
          ref={canvasRef}
          className={cn(
            "absolute top-0 left-0 block rounded-lg transition-opacity duration-200",
            isLoading ? "opacity-0" : "opacity-100",
            className
          )}
          style={{ width: size, height: size, maxWidth: "100%" }}
        />
      </div>
    </div>
  )
}
