"use client"

import CambioImage from "@/registry/media/cambio-image"

export default function CambioImageAdvancedDemo() {
  return (
    <div className="w-full max-w-md mx-auto">
      <CambioImage
        src="/og/1200x6238-twitter.png"
        alt="Advanced motion configuration example"
        width={400}
        height={300}
        motion={{
          trigger: "snappy",
          popup: "bouncy",
          backdrop: "smooth",
        }}
        dismissible={false}
      />
      <p className="text-center text-sm text-muted-foreground mt-2">
        Mixed motion: snappy trigger, bouncy popup, smooth backdrop
      </p>
    </div>
  )
}
