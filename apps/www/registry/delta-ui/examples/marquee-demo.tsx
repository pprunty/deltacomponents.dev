"use client"

import { Marquee } from "@/registry/delta-ui/delta/marquee"

const artisticTexts = [
  "DIGITAL RENAISSANCE",
  "CREATIVE INNOVATION",
  "FUTURE AESTHETICS",
  "VISUAL STORYTELLING",
  "DESIGN REVOLUTION",
  "ARTISTIC EXPRESSION",
  "MODERN CRAFTSMANSHIP",
  "AESTHETIC EVOLUTION",
]

export default function MarqueeDemo() {
  return (
    <div className="w-full bg-black py-1 dark:bg-white">
      <Marquee
        direction="left"
        speed={100}
        gap={120}
        showFade={false}
        pauseOnHover={false}
        className="py-0"
      >
        {artisticTexts.map((text, index) => (
          <div
            key={index}
            className="text-2xl font-bold tracking-widest whitespace-nowrap text-white select-none md:text-4xl dark:text-black"
          >
            {text}
          </div>
        ))}
      </Marquee>
    </div>
  )
}
