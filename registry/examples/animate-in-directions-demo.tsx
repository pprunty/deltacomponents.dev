"use client"

import React from "react"

import AnimateIn from "@/registry/animations/animate-in"

export default function AnimateInDirectionsDemo() {
  return (
    <div className="space-y-8 py-8">
      <AnimateIn direction="up" duration={0.6}>
        <h2 className="text-2xl font-bold text-center">Animation Directions</h2>
        <p className="text-center text-muted-foreground mt-2">
          Content can animate in from any direction
        </p>
      </AnimateIn>

      <div className="grid md:grid-cols-2 gap-6">
        <AnimateIn direction="left" duration={0.6} delay={0.1}>
          <div className="p-6 border border-border rounded-lg bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/50 dark:to-red-950/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <h3 className="text-lg font-semibold">From Left</h3>
            </div>
            <p className="text-muted-foreground">
              This content slides in smoothly from the left side of the screen
            </p>
          </div>
        </AnimateIn>

        <AnimateIn direction="right" duration={0.6} delay={0.2}>
          <div className="p-6 border border-border rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <h3 className="text-lg font-semibold">From Right</h3>
            </div>
            <p className="text-muted-foreground">
              This content slides in smoothly from the right side of the screen
            </p>
          </div>
        </AnimateIn>

        <AnimateIn direction="up" duration={0.6} delay={0.3}>
          <div className="p-6 border border-border rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <h3 className="text-lg font-semibold">From Bottom</h3>
            </div>
            <p className="text-muted-foreground">
              This content rises up from the bottom with a fade effect
            </p>
          </div>
        </AnimateIn>

        <AnimateIn direction="down" duration={0.6} delay={0.4}>
          <div className="p-6 border border-border rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <h3 className="text-lg font-semibold">From Top</h3>
            </div>
            <p className="text-muted-foreground">
              This content drops down from the top with a smooth transition
            </p>
          </div>
        </AnimateIn>
      </div>
    </div>
  )
}
