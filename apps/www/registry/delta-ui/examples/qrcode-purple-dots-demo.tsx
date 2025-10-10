"use client"

import QRCode from "@/registry/delta-ui/components/qrcode"

export default function QrcodePurpleDotsDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <QRCode
        value="https://patrickprunty.com"
        size={200}
        dotStyle="rounded"
        fgColor="#8b5cf6"
        cornerSquareStyle="dot"
        cornerDotStyle="dot"
        level={"H"}
        enableNavigation={true}
      />
    </div>
  )
}
