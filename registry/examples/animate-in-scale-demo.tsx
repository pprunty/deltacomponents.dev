"use client"

import React from "react"
import AnimateIn from "@/delta/animate-in"

export default function AnimateInScaleDemo() {
  return (
    <div className="space-y-8 p-8">
      <AnimateIn direction="up" delay={100}>
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Simple Animation</h3>
          <p className="text-muted-foreground">
            This card fades in from the bottom with a smooth transition.
          </p>
        </div>
      </AnimateIn>

      <AnimateIn direction="up" delay={300}>
        <div className="bg-primary text-primary-foreground rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-2">Delayed Animation</h3>
          <p className="opacity-90">
            This card appears with a longer delay for a staggered effect.
          </p>
        </div>
      </AnimateIn>

      <AnimateIn direction="up" delay={500}>
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-2">Final Animation</h3>
          <p className="opacity-90">
            The last card in the sequence with an even longer delay.
          </p>
        </div>
      </AnimateIn>
    </div>
  )
}
