"use client"

import React from "react"

import QRCode from "@/registry/media/qr-code"

export default function QRCodeCustomDemo() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Primary Theme QR Code */}
        <div className="text-center space-y-3">
          <h3 className="text-sm font-medium">Primary Theme</h3>
          <QRCode
            value="https://deltacomponents.dev"
            size={180}
            bgColor="--color-primary"
            fgColor="--color-primary-foreground"
            containerClassName="border-2 border-primary/20 shadow-md"
          />
        </div>

        {/* Destructive Theme QR Code */}
        <div className="text-center space-y-3">
          <h3 className="text-sm font-medium">Destructive Theme</h3>
          <QRCode
            value="https://deltacomponents.dev/docs"
            size={180}
            bgColor="--color-destructive"
            fgColor="--color-destructive-foreground"
            containerClassName="border-2 border-destructive/20 shadow-md"
          />
        </div>

        {/* Muted Theme QR Code */}
        <div className="text-center space-y-3">
          <h3 className="text-sm font-medium">Muted Theme</h3>
          <QRCode
            value="https://github.com/pprunty"
            size={180}
            bgColor="--color-muted"
            fgColor="--color-muted-foreground"
            containerClassName="border-2 border-muted-foreground/20 shadow-md"
          />
        </div>

        {/* Custom Border Theme */}
        <div className="text-center space-y-3">
          <h3 className="text-sm font-medium">Custom Border</h3>
          <QRCode
            value="https://patrickprunty.com"
            size={180}
            bgColor="--color-card"
            fgColor="--color-card-foreground"
            containerClassName="border-4 border-dashed border-primary rounded-xl shadow-lg ring-2 ring-primary/10"
          />
        </div>
      </div>
    </div>
  )
}
