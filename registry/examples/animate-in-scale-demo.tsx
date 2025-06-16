"use client"

import React from "react"

import AnimateIn from "@/registry/animations/animate-in"

export default function AnimateInScaleDemo() {
  return (
    <div className="space-y-8 p-8">
      <AnimateIn direction="scale" duration={0.6} delay={0.1}>
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Scale Animation</h3>
          <p className="text-muted-foreground">
            This card scales in with a spring bounce effect when it comes into
            view.
          </p>
        </div>
      </AnimateIn>

      <AnimateIn direction="scale" duration={0.8} delay={0.3}>
        <div className="bg-primary text-primary-foreground rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-2">Bouncy Scale</h3>
          <p className="opacity-90">
            A longer duration with more pronounced spring physics for extra
            bounce.
          </p>
        </div>
      </AnimateIn>

      <AnimateIn direction="scale" duration={0.5} delay={0.5} overlayBlur>
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-2">Scale with Blur</h3>
          <p className="opacity-90">
            Scale animation combined with blur overlay effect for smooth
            transitions.
          </p>
        </div>
      </AnimateIn>
    </div>
  )
}
