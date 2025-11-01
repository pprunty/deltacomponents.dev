"use client"

import { Marquee } from "@/registry/delta-ui/blocks/marquee"

const brands = [
  {
    name: "Google",
    logo: "/images/brands/google.svg",
    alt: "Google logo",
  },
  {
    name: "Anthropic",
    logo: "/images/brands/anthropic.svg",
    alt: "Anthropic logo",
  },
  {
    name: "Microsoft",
    logo: "/images/brands/microsoft.svg",
    alt: "Microsoft logo",
  },
  {
    name: "Apple",
    logo: "/images/brands/apple.svg",
    alt: "Apple logo",
  },
  {
    name: "NVIDIA",
    logo: "/images/brands/nvidia.svg",
    alt: "NVIDIA logo",
  },
]

export default function MarqueeStackedDemo() {
  return (
    <div className="w-full space-y-8 py-12">
      {/* Top row - moving right to left */}
      <Marquee
        direction="left"
        speed={25}
        gap={80}
        itemClassName="h-10"
        className="py-4"
      >
        {brands.map((brand) => (
          <img
            key={brand.name}
            src={brand.logo || "/placeholder.svg"}
            alt={brand.alt || brand.name}
            className="h-full w-auto object-contain"
            loading="lazy"
          />
        ))}
      </Marquee>

      {/* Bottom row - moving left to right */}
      <Marquee
        direction="right"
        speed={30}
        gap={80}
        itemClassName="h-10"
        className="py-4"
      >
        {brands.map((brand) => (
          <img
            key={brand.name}
            src={brand.logo || "/placeholder.svg"}
            alt={brand.alt || brand.name}
            className="h-full w-auto object-contain"
            loading="lazy"
          />
        ))}
      </Marquee>
    </div>
  )
}
