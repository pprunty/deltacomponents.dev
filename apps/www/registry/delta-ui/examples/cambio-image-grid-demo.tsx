"use client"

import { CambioImage } from "@/registry/delta-ui/ui/cambio-image"

const images = [
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    alt: "Beautiful mountain landscape with snow-capped peaks",
    width: 400,
    height: 300,
  },
  {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
    alt: "Dense forest with tall trees and misty atmosphere",
    width: 400,
    height: 300,
  },
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop",
    alt: "Winding path through peaceful countryside",
    width: 400,
    height: 300,
  },
  {
    src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop",
    alt: "Serene lake reflecting mountains and sky",
    width: 400,
    height: 300,
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&sat=-100",
    alt: "Dramatic black and white mountain vista",
    width: 400,
    height: 300,
  },
  {
    src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop",
    alt: "Golden sunset over rolling hills and valleys",
    width: 400,
    height: 300,
  },
]

export default function CambioImageGridDemo() {
  return (
    <div className="mx-auto w-full max-w-4xl p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <div key={index} className="aspect-[4/3] overflow-hidden rounded-lg">
            <CambioImage
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              index={index}
              motion="smooth"
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
