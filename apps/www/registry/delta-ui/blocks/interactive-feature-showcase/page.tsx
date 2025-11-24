"use client"

import {
  InteractiveFeatureShowcase,
  VideoFeature,
} from "@/registry/delta-ui/blocks/interactive-feature-showcase/components/interactive-feature-showcase"

// Video features with actual Vidzflow iframe sources
const sampleVideoFeatures: VideoFeature[] = [
  {
    id: "citations",
    title: "AI you can validate, with pinpoint citations.",
    description:
      "Click on citations to verify answers quickly in the underlying primary documents. AI that helps lawyers catch every nuance.",
    iframeSrc:
      "https://app.vidzflow.com/v/DwSjOnvoPL?dq=1080&ap=true&muted=true&loop=true&ctp=true&bv=false&piv=true&playsinline=true&bc=%234E5FFD&controls=play",
    videoTitle: "View Citations and Verify",
    link: "https://example.com",
  },
  {
    id: "redlines",
    title: "Redlines, refined.",
    description:
      "Live contract editing with our world-leading Legal AI. Leverage your precedent to review with finesse.",
    iframeSrc:
      "https://app.vidzflow.com/v/1zDeWiA0LC?dq=1080&ap=true&muted=true&loop=true&ctp=true&bv=false&piv=true&playsinline=true&bc=%234E5FFD&controls=play",
    videoTitle: "Edit MSA with Precedent",
    link: "https://example.com",
  },
  {
    id: "search",
    title: "Robins never forget.",
    description:
      "Leverage every legal document you've ever negotiated. Precedents are easily uncovered and can be quickly leveraged.",
    iframeSrc:
      "https://app.vidzflow.com/v/pV5yFJ1EuM?dq=1080&ap=true&muted=true&loop=true&ctp=true&bv=false&piv=true&playsinline=true&bc=%234E5FFD&controls=play",
    videoTitle: "Search Contract Repository",
    link: "https://example.com",
  },
  {
    id: "integration",
    title: "Integration without objections.",
    description:
      "Connect Robin with your most important systems. Import documents at scale in a click with the out-the-box integrations.",
    iframeSrc:
      "https://app.vidzflow.com/v/SjbvqOEPED?dq=1080&ap=true&muted=true&loop=true&ctp=true&bv=false&piv=true&playsinline=true&bc=%234E5FFD&controls=play",
    videoTitle: "Bulk Import Contracts",
    link: "https://example.com",
  },
]

export default function InteractiveFeatureShowcasePage() {
  return (
    <div className="bg-background min-h-screen w-full">
      <div className="mx-auto max-w-7xl p-6">
        <div className="space-y-8">
          <div className="space-y-4 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Interactive Features
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg">
              Discover powerful tools and integrations that enhance your
              workflow with cutting-edge AI capabilities.
            </p>
          </div>

          <InteractiveFeatureShowcase
            features={sampleVideoFeatures}
            variant="inner-card"
          />
        </div>
      </div>
    </div>
  )
}
