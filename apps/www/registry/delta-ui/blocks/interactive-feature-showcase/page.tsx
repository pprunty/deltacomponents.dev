"use client"

import {
  InteractiveFeatureShowcase,
  VideoFeature,
} from "@/registry/delta-ui/blocks/interactive-feature-showcase/components/interactive-feature-showcase"

// Delta Components demos — shown at /blocks/landing-page
const sampleVideoFeatures: VideoFeature[] = [
  {
    id: "chat",
    title: "LLM Chat, ready to ship.",
    description:
      "A complete chat interface with streaming responses, file uploads, and model selection. Composable primitives let you build the exact chat UX you need.",
    videoSrc: "/videos/chat-demo.mp4",
    videoTitle: "LLM Chat demo",
    link: "/docs/components/chat",
  },
  {
    id: "cambio-image",
    title: "Images that feel alive.",
    description:
      "Physics-based zoom transitions, blur-up loading, and gesture-driven dismissal. Drop in CambioImage anywhere you'd use a native <img>.",
    videoSrc: "/videos/cambio-image-demo.mp4",
    videoTitle: "Cambio Image demo",
    link: "/docs/components/cambio-image",
  },
  {
    id: "card-deck",
    title: "A swipeable stack, physics included.",
    description:
      "Touch gestures, autoplay, and customizable motion. Perfect for mobile-first product tours, testimonials, or card-based browsing.",
    videoSrc: "/videos/card-deck-demo.mp4",
    videoTitle: "Card Deck demo",
    link: "/docs/components/card-deck",
  },
  {
    id: "product-card",
    title: "Commerce UI, out of the box.",
    description:
      "A compound Product Card with multiple layout variants, flexible sizing, and interactive hover states. Drop into any storefront or listing.",
    videoSrc: "/videos/product-card-demo.mp4",
    videoTitle: "Product Card demo",
    link: "/docs/components/product-card",
  },
]

export default function InteractiveFeatureShowcasePage() {
  return (
    <div className="bg-background min-h-screen w-full">
      <div className="mx-auto max-w-7xl p-6">
        <div className="space-y-8">
          <div className="space-y-4 text-center">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Built for modern interfaces
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg">
              Delta Components ships molecular, production-ready primitives on
              top of shadcn/ui — from AI chat to interactive media.
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
