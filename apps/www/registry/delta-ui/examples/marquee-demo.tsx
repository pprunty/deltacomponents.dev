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
    <div className="bg-black dark:bg-white w-full py-1">
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
            className="text-white dark:text-black text-2xl md:text-4xl font-bold tracking-widest whitespace-nowrap select-none"
          >
            {text}
          </div>
        ))}
      </Marquee>
    </div>
  )
}