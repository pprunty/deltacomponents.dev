"use client"

import { PerspectiveCarousel } from "@/registry/delta-ui/blocks/perspective-carousel/components/perspective-carousel"

export default function PerspectiveCarouselPage() {
  return (
    <div className="bg-background flex min-h-screen w-full items-center justify-center">
      <div className="mx-auto w-full max-w-7xl p-6">
        <div className="space-y-8">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Perspective Carousel
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg">
              An interactive 3D carousel with perspective transforms
            </p>
          </div>

          <PerspectiveCarousel />
        </div>
      </div>
    </div>
  )
}
