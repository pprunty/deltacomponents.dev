"use client"

import { ArrowUpRight } from "lucide-react"

import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/delta-ui/ui/card"

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
        <div className="mb-8 space-y-6">
          <CardHeader className="p-0">
            <CardTitle className="text-xl md:text-2xl">
              {feature.title}
            </CardTitle>
            <CardDescription className="text-base leading-relaxed">
              {feature.description}
            </CardDescription>
          </CardHeader>
          {feature.link && (
            <a
              href={feature.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground group hover:text-foreground/80 inline-flex items-center gap-1.5 text-base font-medium transition-colors"
            >
              Learn more
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
        </div>
        <div className="aspect-square flex-1 overflow-hidden rounded-sm">
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
      <div className="mb-8">
        <div className="aspect-square overflow-hidden rounded-sm">
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
      <CardHeader className="max-w-md space-y-3 p-0">
        <CardTitle className="text-xl md:text-2xl">{feature.title}</CardTitle>
        <CardDescription className="text-base leading-relaxed">
          {feature.description}
        </CardDescription>
      </CardHeader>
    </>
  )

  if (feature.link) {
    return (
      <a
        href={feature.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group block transition-all duration-200 hover:opacity-90"
      >
        {content}
      </a>
    )
  }

  return <div>{content}</div>
}
