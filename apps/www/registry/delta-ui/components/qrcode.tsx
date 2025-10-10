"use client"

import React, { useEffect, useRef } from "react"
import QRCodeStyling from "qr-code-styling"

import { cn } from "@/lib/utils"

interface QRCodeProps {
  value: string
  size?: number
  bgColor?: string // Can be a CSS variable (e.g. --color-background) or a color value
  fgColor?: string // Can be a CSS variable (e.g. --color-foreground) or a color value
  level?: "L" | "M" | "Q" | "H"
  marginSize?: number
  className?: string
  enableNavigation?: boolean // Enable click navigation to the QR code URL
  dotStyle?:
    | "rounded"
    | "dots"
    | "classy"
    | "classy-rounded"
    | "square"
    | "extra-rounded"
  cornerSquareStyle?:
    | "dot"
    | "square"
    | "extra-rounded"
    | "rounded"
    | "dots"
    | "classy"
    | "classy-rounded"
  cornerDotStyle?:
    | "dot"
    | "square"
    | "rounded"
    | "dots"
    | "classy"
    | "classy-rounded"
    | "extra-rounded"
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
  bgColor = "--color-background", // background
  fgColor = "--color-foreground", // foreground (text/qr dots)
  level = "M",
  marginSize = 0,
  className,
  enableNavigation = false,
  dotStyle = "square",
  cornerSquareStyle = "square",
  cornerDotStyle = "square",
}: QRCodeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const qrCodeRef = useRef<QRCodeStyling | null>(null)

  useEffect(() => {
    if (!value || !ref.current) return

    // Always resolve to actual color values
    const resolvedBgColor = resolveColor(bgColor, "hsl(0, 0%, 100%)") // fallback: white
    const resolvedFgColor = resolveColor(fgColor, "hsl(222.2, 84%, 4.9%)") // fallback: dark

    const qrCode = new QRCodeStyling({
      width: size,
      height: size,
      type: "svg",
      data: value,
      margin: marginSize,
      qrOptions: {
        typeNumber: 0,
        mode: "Byte",
        errorCorrectionLevel: level,
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.4,
        margin: 0,
        crossOrigin: "anonymous",
      },
      dotsOptions: {
        color: resolvedFgColor,
        type: dotStyle,
      },
      backgroundOptions: {
        color: resolvedBgColor,
      },
      cornersSquareOptions: {
        color: resolvedFgColor,
        type: cornerSquareStyle,
      },
      cornersDotOptions: {
        color: resolvedFgColor,
        type: cornerDotStyle,
      },
    })

    qrCodeRef.current = qrCode

    // Clear previous content
    ref.current.innerHTML = ""

    // Append the QR code
    qrCode.append(ref.current)
  }, [
    value,
    size,
    bgColor,
    fgColor,
    level,
    marginSize,
    dotStyle,
    cornerSquareStyle,
    cornerDotStyle,
  ])

  // Re-render when theme changes by listening to color changes
  useEffect(() => {
    if (!qrCodeRef.current) return

    const handleThemeChange = () => {
      // Force re-render by updating the effect dependencies
      const resolvedBgColor = resolveColor(bgColor, "hsl(0, 0%, 100%)")
      const resolvedFgColor = resolveColor(fgColor, "hsl(222.2, 84%, 4.9%)")

      qrCodeRef.current?.update({
        dotsOptions: {
          color: resolvedFgColor,
          type: dotStyle,
        },
        backgroundOptions: {
          color: resolvedBgColor,
        },
        cornersSquareOptions: {
          color: resolvedFgColor,
          type: cornerSquareStyle,
        },
        cornersDotOptions: {
          color: resolvedFgColor,
          type: cornerDotStyle,
        },
      })
    }

    // Listen for theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    mediaQuery.addEventListener("change", handleThemeChange)

    // Also listen for class changes on document element (for manual theme switching)
    const observer = new MutationObserver(handleThemeChange)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    })

    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange)
      observer.disconnect()
    }
  }, [bgColor, fgColor, dotStyle, cornerSquareStyle, cornerDotStyle])

  if (!value) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-xl border-2 border-dashed border-gray-300 text-gray-500",
          className
        )}
        style={{ width: size, height: size }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 368 368"
          className="animate-pulse rounded-lg opacity-30"
          style={{
            width: `${size - marginSize * 8}px`,
            height: `${size - marginSize * 8}px`,
          }}
        >
          <path
            d="m 16,16 0,16 0,16 0,16 0,16 0,16 0,16 0,16 16,0 16,0 16,0 16,0 16,0 16,0 16,0 0,-16 0,-16 0,-16 0,-16 0,-16 0,-16 0,-16 -16,0 -16,0 -16,0 -16,0 -16,0 -16,0 -16,0 z m 128,0 0,16 0,16 16,0 0,-16 16,0 0,-16 -16,0 -16,0 z m 32,16 0,16 16,0 0,-16 -16,0 z m 16,16 0,16 16,0 16,0 0,-16 0,-16 0,-16 -16,0 0,16 0,16 -16,0 z m 0,16 -16,0 -16,0 -16,0 0,16 16,0 16,0 0,16 -16,0 0,16 16,0 0,16 16,0 0,-16 16,0 0,16 -16,0 0,16 -16,0 0,16 16,0 16,0 0,16 16,0 0,-16 0,-16 0,-16 0,-16 0,-16 -16,0 0,-16 -16,0 0,-16 z m 16,112 -16,0 0,16 -16,0 0,16 0,16 16,0 0,16 0,16 -16,0 -16,0 0,-16 16,0 0,-16 -16,0 0,-16 0,-16 -16,0 0,-16 16,0 0,16 16,0 0,-16 0,-16 -16,0 -16,0 0,-16 -16,0 -16,0 -16,0 0,16 -16,0 0,16 -16,0 0,-16 16,0 0,-16 -16,0 -16,0 0,16 -16,0 0,16 0,16 0,16 16,0 0,-16 16,0 16,0 16,0 0,-16 16,0 0,-16 16,0 0,16 -16,0 0,16 16,0 0,16 -16,0 0,16 16,0 16,0 0,16 0,16 0,16 16,0 0,16 16,0 16,0 16,0 0,16 -16,0 -16,0 -16,0 0,-16 -16,0 0,16 0,16 16,0 0,16 -16,0 0,16 16,0 16,0 0,-16 16,0 0,16 16,0 16,0 16,0 16,0 0,-16 16,0 0,16 16,0 16,0 16,0 0,-16 -16,0 -16,0 0,-16 -16,0 0,-16 -16,0 0,16 -16,0 -16,0 0,16 -16,0 0,-16 16,0 0,-16 0,-16 0,-16 16,0 0,-16 -16,0 -16,0 0,-16 16,0 0,-16 0,-16 0,-16 -16,0 0,-16 z m 48,128 0,-16 -16,0 0,16 16,0 z m 32,16 16,0 16,0 0,-16 -16,0 -16,0 0,16 z m 32,-16 16,0 0,-16 0,-16 0,-16 0,-16 -16,0 -16,0 -16,0 0,-16 -16,0 0,16 -16,0 0,16 0,16 16,0 0,-16 16,0 0,16 0,16 16,0 16,0 0,16 z m -48,-80 0,-16 -16,0 -16,0 0,16 16,0 16,0 z m 16,0 16,0 0,-16 0,-16 0,-16 16,0 0,16 16,0 0,16 16,0 0,-16 0,-16 -16,0 0,-16 16,0 0,-16 -16,0 -16,0 0,16 -16,0 0,-16 -16,0 0,16 -16,0 0,16 16,0 0,16 0,16 0,16 z m -16,-48 -16,0 0,16 16,0 0,-16 z m 64,32 -16,0 0,16 16,0 0,-16 z m -224,0 0,-16 -16,0 0,16 16,0 z m -16,0 -16,0 -16,0 -16,0 0,16 16,0 16,0 16,0 0,-16 z m -64,0 -16,0 0,16 16,0 0,-16 z m 0,-48 0,-16 -16,0 0,16 16,0 z m 112,-16 16,0 0,-16 0,-16 -16,0 0,16 0,16 z m 96,-128 0,16 0,16 0,16 0,16 0,16 0,16 0,16 16,0 16,0 16,0 16,0 16,0 16,0 16,0 0,-16 0,-16 0,-16 0,-16 0,-16 0,-16 0,-16 -16,0 -16,0 -16,0 -16,0 -16,0 -16,0 -16,0 z m -208,16 16,0 16,0 16,0 16,0 16,0 0,16 0,16 0,16 0,16 0,16 -16,0 -16,0 -16,0 -16,0 -16,0 0,-16 0,-16 0,-16 0,-16 0,-16 z m 224,0 16,0 16,0 16,0 16,0 16,0 0,16 0,16 0,16 0,16 0,16 -16,0 -16,0 -16,0 -16,0 -16,0 0,-16 0,-16 0,-16 0,-16 0,-16 z m -208,16 0,16 0,16 0,16 16,0 16,0 16,0 0,-16 0,-16 0,-16 -16,0 -16,0 -16,0 z m 224,0 0,16 0,16 0,16 16,0 16,0 16,0 0,-16 0,-16 0,-16 -16,0 -16,0 -16,0 z m -32,96 0,16 16,0 0,-16 -16,0 z m -224,96 0,16 0,16 0,16 0,16 0,16 0,16 0,16 16,0 16,0 16,0 16,0 16,0 16,0 16,0 0,-16 0,-16 0,-16 0,-16 0,-16 0,-16 0,-16 -16,0 -16,0 -16,0 -16,0 -16,0 -16,0 -16,0 z m 16,16 16,0 16,0 16,0 16,0 16,0 0,16 0,16 0,16 0,16 0,16 -16,0 -16,0 -16,0 -16,0 -16,0 0,-16 0,-16 0,-16 0,-16 0,-16 z m 16,16 0,16 0,16 0,16 16,0 16,0 16,0 0,-16 0,-16 0,-16 -16,0 -16,0 -16,0 z m 288,48 0,16 16,0 0,-16 -16,0 z"
            fill="currentColor"
            className="text-gray-400 dark:text-gray-600"
          />
        </svg>
      </div>
    )
  }

  const handleClick = () => {
    if (enableNavigation && value) {
      // Check if the value is a valid URL
      try {
        const url = new URL(value)
        window.open(url.toString(), "_blank", "noopener,noreferrer")
      } catch {
        // If not a valid URL, try to open it anyway (might be a relative path)
        window.open(value, "_blank", "noopener,noreferrer")
      }
    }
  }

  return (
    <div
      className={cn(
        "inline-block",
        enableNavigation &&
          "cursor-pointer transition-opacity hover:opacity-80",
        className
      )}
      onClick={handleClick}
      role={enableNavigation ? "button" : undefined}
      tabIndex={enableNavigation ? 0 : undefined}
      onKeyDown={
        enableNavigation
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                handleClick()
              }
            }
          : undefined
      }
    >
      <div ref={ref} />
    </div>
  )
}
