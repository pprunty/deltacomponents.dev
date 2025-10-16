"use client"

import {
  InteractiveFeatureShowcase,
  sampleVideoFeatures,
} from "@/registry/delta-ui/blocks/interactive-feature-showcase/components/interactive-feature-showcase"

export default function InteractiveFeatureShowcasePage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <div className="mx-auto w-full max-w-5xl">
        <InteractiveFeatureShowcase
          features={sampleVideoFeatures}
          variant="inner-card"
        />
      </div>
    </div>
  )
}
