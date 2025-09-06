"use client"

import CambioImage from "@/registry/media/cambio-image"

export default function CambioImageAccessibleDemo() {
  return (
    <div className="w-full max-w-md mx-auto">
      <CambioImage
        src="/og/1200x6238-twitter.png"
        alt="Reduced motion for accessibility"
        width={400}
        height={300}
        motion="reduced"
      />
      <p className="text-center text-sm text-muted-foreground mt-2">
        Reduced preset - 10ms linear (accessible)
      </p>
    </div>
  )
}
