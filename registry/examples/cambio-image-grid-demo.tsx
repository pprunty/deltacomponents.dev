"use client"

import React from "react"

import CambioImage from "@/registry/media/cambio-image"

export default function CambioImageGridDemo() {
  // Array of images with different motion variants for demonstration
  const images = [
    {
      src: "/og/1200x6238-twitter.png",
      alt: "Smooth motion example",
      motion: "smooth" as const,
    },
    {
      src: "/og/1200x6238-twitter.png",
      alt: "Snappy motion example",
      motion: "snappy" as const,
    },
    {
      src: "/og/1200x6238-twitter.png",
      alt: "Bouncy motion example",
      motion: "bouncy" as const,
    },
    {
      src: "/og/1200x6238-twitter.png",
      alt: "Reduced motion example",
      motion: "reduced" as const,
    },
  ]

  return (
    <div className="root">
      <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
        {images.map((image, index) => (
          <div key={index} className="aspect-square">
            <CambioImage
              src={image.src}
              alt={image.alt}
              width={1200}
              height={6238}
              motion={image.motion}
              index={index}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
