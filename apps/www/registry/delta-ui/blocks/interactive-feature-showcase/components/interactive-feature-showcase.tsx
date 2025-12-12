"use client"

import { ArrowUpRight } from "lucide-react"

export interface VideoFeature {
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
      <div className="border-border bg-card flex flex-col overflow-hidden rounded-sm border p-6">
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
        <div className="aspect-square flex-1 overflow-hidden">
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
        <div className="aspect-square overflow-hidden">
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
