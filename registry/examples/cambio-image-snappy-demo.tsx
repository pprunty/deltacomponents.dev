"use client"

import CambioImage from "@/registry/media/cambio-image"

export default function CambioImageSnappyDemo() {
  return (
    <div className="w-full max-w-md mx-auto">
      <CambioImage
        src="/og/1200x6238-twitter.png"
        alt="Fast snappy animation example"
        width={400}
        height={300}
        motion="snappy"
      />
      <p className="text-center text-sm text-muted-foreground mt-2">
        Snappy preset - 240ms ease-out
      </p>
    </div>
  )
}
