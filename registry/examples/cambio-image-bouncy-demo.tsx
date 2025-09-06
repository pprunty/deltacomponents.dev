"use client"

import CambioImage from "@/registry/media/cambio-image"

export default function CambioImageBouncyDemo() {
  return (
    <div className="w-full max-w-md mx-auto">
      <CambioImage
        src="/og/1200x6238-twitter.png"
        alt="Bouncy spring animation example"
        width={400}
        height={300}
        motion="bouncy"
      />
      <p className="text-center text-sm text-muted-foreground mt-2">
        Bouncy preset - Spring with overshoot
      </p>
    </div>
  )
}
