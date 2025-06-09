"use client"

import React from "react"

import AnimateIn from "@/registry/animations/animate-in"

export default function AnimateInStaggerDemo() {
  return (
    <div className="space-y-8 py-8">
      <AnimateIn direction="up" duration={0.6}>
        <h2 className="text-2xl font-bold text-center">Staggered Animation</h2>
        <p className="text-center text-muted-foreground mt-2">
          Each card animates in sequence with a small delay
        </p>
      </AnimateIn>

      <AnimateIn direction="up" staggerChildren={0.15} duration={0.5}>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 rounded-lg border">
            <div className="w-12 h-12 bg-blue-500 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-white font-bold">1</span>
            </div>
            <h3 className="font-semibold mb-2">Feature One</h3>
            <p className="text-sm text-muted-foreground">
              The first feature in our staggered animation sequence
            </p>
          </div>

          <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 rounded-lg border">
            <div className="w-12 h-12 bg-green-500 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-white font-bold">2</span>
            </div>
            <h3 className="font-semibold mb-2">Feature Two</h3>
            <p className="text-sm text-muted-foreground">
              The second feature appears with a slight delay
            </p>
          </div>

          <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 rounded-lg border">
            <div className="w-12 h-12 bg-purple-500 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-white font-bold">3</span>
            </div>
            <h3 className="font-semibold mb-2">Feature Three</h3>
            <p className="text-sm text-muted-foreground">
              The final feature completes the staggered sequence
            </p>
          </div>
        </div>
      </AnimateIn>

      <AnimateIn
        direction="up"
        staggerChildren={0.1}
        duration={0.4}
        delay={0.5}
      >
        <div className="flex flex-wrap gap-3 justify-center">
          <div className="px-4 py-2 bg-muted rounded-full">Tag One</div>
          <div className="px-4 py-2 bg-muted rounded-full">Tag Two</div>
          <div className="px-4 py-2 bg-muted rounded-full">Tag Three</div>
          <div className="px-4 py-2 bg-muted rounded-full">Tag Four</div>
          <div className="px-4 py-2 bg-muted rounded-full">Tag Five</div>
        </div>
      </AnimateIn>
    </div>
  )
}
