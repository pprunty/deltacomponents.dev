"use client"

import React from "react"

import QRCode from "@/registry/media/qr-code"

export default function QRCodeReactiveDemo() {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="text-center space-y-4">
        <h3 className="text-lg font-medium">Reactive Dark Mode QR Code</h3>
        <p className="text-sm text-muted-foreground">
          This QR code automatically adapts to light and dark themes
        </p>

        <QRCode
          value="https://deltacomponents.dev"
          size={200}
          bgColor="--color-background"
          fgColor="--color-foreground"
          containerClassName="bg-background border border-border rounded-lg shadow-sm"
        />

        <p className="text-xs text-muted-foreground">
          Uses --color-background and --color-foreground for automatic theme
          adaptation
        </p>
      </div>
    </div>
  )
}
