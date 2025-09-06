"use client"

import React from "react"

import CambioImage from "@/registry/media/cambio-image"

export default function CambioImageDemo() {
  return (
    <div className="w-full max-w-lg mx-auto">
      <CambioImage
        src="/og/1200x6238-twitter.png"
        alt="Delta Components Twitter Card"
        width={1200}
        height={6238}
      />
    </div>
  )
}
