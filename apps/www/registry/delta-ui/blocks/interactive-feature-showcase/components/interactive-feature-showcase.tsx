"use client"

import { ArrowUpRight } from "lucide-react"

interface VideoFeature {
  id: string
  title: string
  description: string
  iframeSrc: string
  videoTitle: string
  link?: string
}

interface VideoFeaturesGridProps {
  features: VideoFeature[]
  variant?: "default" | "inner-card"
}

export function InteractiveFeatureShowcase({
  features,
  variant = "default",
}: VideoFeaturesGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:gap-8">
      {features.map((feature) => (
        <VideoFeatureCard
          key={feature.id}
          feature={feature}
          variant={variant}
        />
      ))}
    </div>
  )
}

function VideoFeatureCard({
  feature,
  variant = "default",
}: {
  feature: VideoFeature
  variant?: "default" | "inner-card"
}) {
  if (variant === "inner-card") {
    return (
      <div className="bg-card text-card-foreground border-border flex flex-col rounded-xl border p-6">
        <div className="mb-6">
          <h3 className="mb-4 text-lg leading-tight font-medium md:text-xl">
            {feature.title}
          </h3>
          <p className="text-muted-foreground mb-6 overflow-hidden leading-relaxed md:h-20">
            {feature.description}
          </p>
          {feature.link && (
            <a
              href={feature.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground inline-flex items-center transition-opacity hover:opacity-70"
            >
              Learn more
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </a>
          )}
        </div>
        <div className="aspect-square flex-1 overflow-hidden rounded-lg">
          <iframe
            width="100%"
            height="100%"
            src={feature.iframeSrc}
            title={feature.videoTitle}
            className="h-full w-full border-0"
            scrolling="no"
            allow="fullscreen"
          />
        </div>
      </div>
    )
  }

  // Default variant
  const content = (
    <>
      <div className="mb-6">
        <div className="aspect-square overflow-hidden rounded-lg">
          <iframe
            width="100%"
            height="100%"
            src={feature.iframeSrc}
            title={feature.videoTitle}
            className="h-full w-full border-0"
            scrolling="no"
            allow="fullscreen"
          />
        </div>
      </div>
      <div className="max-w-md">
        <h3 className="mb-4 text-lg leading-tight font-medium md:text-xl">
          {feature.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {feature.description}
        </p>
      </div>
    </>
  )

  if (feature.link) {
    return (
      <a
        href={feature.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block transition-opacity hover:opacity-70"
      >
        {content}
      </a>
    )
  }

  return <div>{content}</div>
}

// Video features with actual Vidzflow iframe sources
export const sampleVideoFeatures: VideoFeature[] = [
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
