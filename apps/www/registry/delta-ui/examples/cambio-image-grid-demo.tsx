"use client"

import { CambioImage } from "@/registry/delta-ui/delta/cambio-image"

const images = [
  {
    src: "/images/stock/4d26c515-f5f1-43af-a9e5-e2be495ceddb.png",
    alt: "Beautiful landscape photography",
    width: 1170,
    height: 600,
  },
  {
    src: "/images/stock/2.png",
    alt: "Image gallery example",
    width: 400,
    height: 300,
  },
  {
    src: "/images/stock/3.png",
    alt: "Image gallery example",
    width: 400,
    height: 300,
  },
  {
    src: "/images/stock/4.png",
    alt: "Image gallery example",
    width: 400,
    height: 300,
  },
]

export default function CambioImageGridDemo() {
  return (
    <div className="mx-auto w-full max-w-4xl p-6">
      <div className="grid grid-cols-2 gap-x-2 gap-y-1">
        {images.map((image, index) => (
          <div key={index}>
            <CambioImage
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              index={index}
              motion="smooth"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
