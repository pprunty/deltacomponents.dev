"use client"

import QRCode from "@/registry/delta-ui/delta/qrcode"

export default function QrcodeDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <QRCode value="https://patrickprunty.com" size={200} />
    </div>
  )
}
