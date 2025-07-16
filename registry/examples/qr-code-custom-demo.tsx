"use client"

import React, { useState } from "react"
import QRCode from "@/delta/qr-code"

export default function QRCodeCustomDemo() {
  const [size, setSize] = useState(200)
  const [level, setLevel] = useState<"L" | "M" | "Q" | "H">("M")
  const [dotStyle, setDotStyle] = useState<
    | "rounded"
    | "dots"
    | "classy"
    | "classy-rounded"
    | "square"
    | "extra-rounded"
  >("square")
  const [cornerSquareStyle, setCornerSquareStyle] = useState<
    | "dot"
    | "square"
    | "extra-rounded"
    | "rounded"
    | "dots"
    | "classy"
    | "classy-rounded"
  >("square")
  const [cornerDotStyle, setCornerDotStyle] = useState<
    | "dot"
    | "square"
    | "rounded"
    | "dots"
    | "classy"
    | "classy-rounded"
    | "extra-rounded"
  >("square")
  const [useCustomColor, setUseCustomColor] = useState(false)
  const [marginSize, setMarginSize] = useState(0)

  const dotStyleOptions = [
    "square",
    "rounded",
    "dots",
    "classy",
    "classy-rounded",
    "extra-rounded",
  ] as const

  const cornerOptions = [
    "square",
    "rounded",
    "extra-rounded",
    "dot",
    "dots",
    "classy",
    "classy-rounded",
  ] as const

  const levelOptions = [
    { value: "L", label: "L (Low)" },
    { value: "M", label: "M (Medium)" },
    { value: "Q", label: "Q (Quartile)" },
    { value: "H", label: "H (High)" },
  ] as const

  return (
    <div className="w-full py-4">
      <div className="space-y-6">
        {/* Controls Section */}
        <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
          <h3 className="text-sm font-medium">Styling Options</h3>

          {/* Size and Level Controls */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Size: {size}px
              </label>
              <input
                type="range"
                min="150"
                max="300"
                step="10"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Margin: {marginSize}
              </label>
              <input
                type="range"
                min="0"
                max="20"
                step="2"
                value={marginSize}
                onChange={(e) => setMarginSize(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Error Correction Level */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Error Correction Level
            </label>
            <div className="flex gap-2">
              {levelOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-1 text-sm"
                >
                  <input
                    type="radio"
                    name="level"
                    value={option.value}
                    checked={level === option.value}
                    onChange={(e) => setLevel(e.target.value as typeof level)}
                    className="w-3 h-3"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          {/* Style Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Dot Style
              </label>
              <select
                value={dotStyle}
                onChange={(e) => setDotStyle(e.target.value as typeof dotStyle)}
                className="w-full p-2 text-sm border rounded-md bg-background"
              >
                {dotStyleOptions.map((style) => (
                  <option key={style} value={style}>
                    {style.charAt(0).toUpperCase() +
                      style.slice(1).replace("-", " ")}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Corner Square Style
              </label>
              <select
                value={cornerSquareStyle}
                onChange={(e) =>
                  setCornerSquareStyle(
                    e.target.value as typeof cornerSquareStyle
                  )
                }
                className="w-full p-2 text-sm border rounded-md bg-background"
              >
                {cornerOptions.map((style) => (
                  <option key={style} value={style}>
                    {style.charAt(0).toUpperCase() +
                      style.slice(1).replace("-", " ")}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Corner Dot Style
              </label>
              <select
                value={cornerDotStyle}
                onChange={(e) =>
                  setCornerDotStyle(e.target.value as typeof cornerDotStyle)
                }
                className="w-full p-2 text-sm border rounded-md bg-background"
              >
                {cornerOptions.map((style) => (
                  <option key={style} value={style}>
                    {style.charAt(0).toUpperCase() +
                      style.slice(1).replace("-", " ")}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Color Options */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={useCustomColor}
                onChange={(e) => setUseCustomColor(e.target.checked)}
                className="w-4 h-4"
              />
              Use Primary Color
            </label>
            <p className="text-xs text-muted-foreground">
              {useCustomColor
                ? "QR code will use your theme's primary color"
                : "QR code will use default foreground color"}
            </p>
          </div>
        </div>

        {/* QR Code Display */}
        <div className="flex items-center justify-center p-8 border rounded-lg bg-background">
          <QRCode
            value="https://deltacomponents.dev"
            size={size}
            level={level}
            dotStyle={dotStyle}
            cornerSquareStyle={cornerSquareStyle}
            cornerDotStyle={cornerDotStyle}
            marginSize={marginSize}
            fgColor={useCustomColor ? "--color-primary" : "--color-foreground"}
          />
        </div>

        {/* Info Section */}
        <div className="text-xs text-muted-foreground space-y-1 p-3 bg-muted/20 rounded-md">
          <p>
            <strong>Current Settings:</strong>
          </p>
          <p>
            Size: {size}px | Level: {level} | Margin: {marginSize}px
          </p>
          <p>
            Dot: {dotStyle} | Corner Square: {cornerSquareStyle} | Corner Dot:{" "}
            {cornerDotStyle}
          </p>
          <p>
            Color:{" "}
            {useCustomColor ? "Primary theme color" : "Default foreground"}
          </p>
        </div>
      </div>
    </div>
  )
}
