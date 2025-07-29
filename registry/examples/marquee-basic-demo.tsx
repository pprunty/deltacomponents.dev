"use client"

import React from "react"

import Marquee from "@/registry/components/marquee"

export default function MarqueeBasicDemo() {
  return (
    <div className="w-full overflow-hidden">
      <Marquee baseVelocity={20} className="py-4">
        <div className="flex gap-8 mr-8">
          <div className="rounded-lg bg-primary px-4 py-2 text-primary-foreground font-medium">
            React
          </div>
          <div className="rounded-lg bg-primary px-4 py-2 text-primary-foreground font-medium">
            Next.js
          </div>
          <div className="rounded-lg bg-primary px-4 py-2 text-primary-foreground font-medium">
            TypeScript
          </div>
          <div className="rounded-lg bg-primary px-4 py-2 text-primary-foreground font-medium">
            Tailwind CSS
          </div>
          <div className="rounded-lg bg-primary px-4 py-2 text-primary-foreground font-medium">
            Framer Motion
          </div>
        </div>
      </Marquee>
    </div>
  )
}
