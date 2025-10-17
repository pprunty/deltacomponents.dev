"use client"

import { useEffect, useState } from "react"

import QRCode from "@/registry/delta-ui/delta/qrcode"

const qrCodeConfigs = [
  {
    dotStyle: "square" as const,
    cornerSquareStyle: "square" as const,
    cornerDotStyle: "square" as const,
    fgColor: "#000000",
    level: "M" as const,
  },
  {
    dotStyle: "dots" as const,
    cornerSquareStyle: "dots" as const,
    cornerDotStyle: "dots" as const,
    fgColor: "#8b5cf6",
    level: "M" as const,
  },
  {
    dotStyle: "rounded" as const,
    cornerSquareStyle: "rounded" as const,
    cornerDotStyle: "rounded" as const,
    fgColor: "#ef4444",
    level: "H" as const,
  },
  {
    dotStyle: "classy" as const,
    cornerSquareStyle: "classy" as const,
    cornerDotStyle: "classy" as const,
    fgColor: "#10b981",
    level: "Q" as const,
  },
  {
    dotStyle: "extra-rounded" as const,
    cornerSquareStyle: "extra-rounded" as const,
    cornerDotStyle: "extra-rounded" as const,
    fgColor: "#f59e0b",
    level: "L" as const,
  },
  {
    dotStyle: "classy-rounded" as const,
    cornerSquareStyle: "classy-rounded" as const,
    cornerDotStyle: "classy-rounded" as const,
    fgColor: "#3b82f6",
    level: "H" as const,
  },
]

export default function QrcodeDemoInteractive() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % qrCodeConfigs.length)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const currentConfig = qrCodeConfigs[currentIndex]

  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex h-[200px] w-[200px] items-center justify-center">
        <QRCode
          value="https://patrickprunty.com"
          size={200}
          dotStyle={currentConfig.dotStyle}
          cornerSquareStyle={currentConfig.cornerSquareStyle}
          cornerDotStyle={currentConfig.cornerDotStyle}
          fgColor={currentConfig.fgColor}
          level={currentConfig.level}
        />
      </div>
    </div>
  )
}
