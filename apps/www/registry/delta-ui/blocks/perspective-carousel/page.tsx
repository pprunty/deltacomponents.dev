"use client"

import { PerspectiveCarousel } from "@/registry/delta-ui/blocks/perspective-carousel/components/perspective-carousel"

export default function PerspectiveCarouselPage() {
  return (
    <div className="min-h-screen w-full bg-background py-6">
      <div className="mx-auto max-w-7xl">
        <PerspectiveCarousel />
      </div>
    </div>
  )
}
