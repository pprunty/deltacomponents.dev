"use client"

import { Marquee } from "@/registry/delta-ui/delta/marquee"
import { ScrollFadeEffect } from "@/registry/delta-ui/delta/scroll-fade-effect"

const brands = [
  { name: "Vercel", logo: "/images/brands/vercel.svg" },
  { name: "Next.js", logo: "/images/brands/nextdotjs.svg" },
  { name: "React", logo: "/images/brands/react.svg" },
  { name: "Tailwind CSS", logo: "/images/brands/tailwindcss.svg" },
  { name: "GitHub", logo: "/images/brands/github.svg" },
  { name: "Figma", logo: "/images/brands/figma.svg" },
  { name: "Stripe", logo: "/images/brands/stripe.svg" },
  { name: "Framer", logo: "/images/brands/framer.svg" },
]

function BrandLogo({ name, logo }: { name: string; logo: string }) {
  return (
    <img
      src={logo || "/placeholder.svg"}
      alt={`${name} logo`}
      className="mx-8 h-7 w-auto object-contain opacity-70 transition-opacity hover:opacity-100 sm:h-8"
      loading="lazy"
    />
  )
}

// Lower is slower; both rows share one speed so they scroll in sync.
const SPEED = 12

export default function MarqueeStackedDemo() {
  return (
    <div className="w-full space-y-6 py-12">
      {/* Top row — right to left */}
      <ScrollFadeEffect orientation="horizontal" force intensity={96}>
        <Marquee direction="left" speed={SPEED} className="py-2">
          {brands.map((brand) => (
            <BrandLogo key={brand.name} {...brand} />
          ))}
        </Marquee>
      </ScrollFadeEffect>

      {/* Bottom row — left to right */}
      <ScrollFadeEffect orientation="horizontal" force intensity={96}>
        <Marquee direction="right" speed={SPEED} className="py-2">
          {brands.map((brand) => (
            <BrandLogo key={brand.name} {...brand} />
          ))}
        </Marquee>
      </ScrollFadeEffect>
    </div>
  )
}
