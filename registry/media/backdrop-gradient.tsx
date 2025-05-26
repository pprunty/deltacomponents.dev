import React from "react"

import { cn } from "@/lib/utils"

export interface BlurOverlayProps {
  /** Source URL of the image */
  src: string
  /** Alt text for the image */
  alt?: string
  /** Additional container classes */
  className?: string
}

export default function BackdropGradient({
  src,
  alt = "",
  className,
}: BlurOverlayProps) {
  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      {/* Blurred background layer */}
      <div
        className="absolute top-1/2 left-1/2 w-[120%] h-[120%] -translate-x-1/2 -translate-y-1/2 bg-cover bg-center filter blur-3xl brightness-75 saturate-75"
        style={{ backgroundImage: `url(${src})` }}
      />

      {/* Foreground image layer */}
      <div className="relative flex justify-center items-center w-full h-full">
        <img
          src={src}
          alt={alt}
          className="max-w-[80%] max-h-[80%] rounded-2xl shadow-xl"
        />
      </div>
    </div>
  )
}
