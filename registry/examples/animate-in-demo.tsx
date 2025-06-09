"use client"

import * as React from "react"

import AnimateIn from "@/registry/animations/animate-in"

export default function AnimateInDemo() {
  return (
    <div className="space-y-8 py-8">
      <AnimateIn direction="up" duration={0.6} immediate>
        <div className="text-center">
          <p className="text-muted-foreground max-w-2xl mx-auto">
            This content animates in from the bottom with a smooth fade effect
            when the component mounts.
          </p>
        </div>
      </AnimateIn>

      <AnimateIn direction="left" duration={0.8} delay={0.2} immediate>
        <div className="p-6 border border-border rounded-lg bg-muted/50">
          <h3 className="text-xl font-semibold mb-2">From the Left</h3>
          <p className="text-muted-foreground">
            This card slides in from the left side with a slight delay.
          </p>
        </div>
      </AnimateIn>

      <AnimateIn direction="right" duration={0.8} delay={0.4} immediate>
        <div className="p-6 border border-border rounded-lg bg-muted/50">
          <h3 className="text-xl font-semibold mb-2">From the Right</h3>
          <p className="text-muted-foreground">
            This card slides in from the right side with more delay.
          </p>
        </div>
      </AnimateIn>
    </div>
  )
}
