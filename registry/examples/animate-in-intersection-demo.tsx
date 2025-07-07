"use client"

import React from "react"

import AnimateIn from "@/registry/animations/animate-in"

export default function AnimateInIntersectionDemo() {
  return (
    <div className="space-y-32 py-8 min-h-[800px]">
      {/* Intro text */}
      <div className="text-center">
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Scroll down to see elements animate in as they come into view using
          the Intersection Observer API.
        </p>
      </div>

      {/* First section */}
      <AnimateIn direction="up" useIntersectionObserver threshold={0.2}>
        <div className="p-8 border border-border rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <h3 className="text-2xl font-semibold mb-4 text-center">
            First Section
          </h3>
          <p className="text-muted-foreground text-center max-w-md mx-auto">
            This section animates in from the bottom when it becomes 20% visible
            in the viewport.
          </p>
        </div>
      </AnimateIn>

      {/* Second section */}
      <AnimateIn direction="left" useIntersectionObserver threshold={0.3}>
        <div className="p-8 border border-border rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <h3 className="text-2xl font-semibold mb-4 text-center">
            Second Section
          </h3>
          <p className="text-muted-foreground text-center max-w-md mx-auto">
            This section slides in from the left when 30% of it is visible.
          </p>
        </div>
      </AnimateIn>

      {/* Third section */}
      <AnimateIn direction="right" useIntersectionObserver threshold={0.1}>
        <div className="p-8 border border-border rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
          <h3 className="text-2xl font-semibold mb-4 text-center">
            Third Section
          </h3>
          <p className="text-muted-foreground text-center max-w-md mx-auto">
            This section slides in from the right with a lower threshold (10%).
          </p>
        </div>
      </AnimateIn>

      {/* Fourth section with different behavior */}
      <AnimateIn
        direction="up"
        useIntersectionObserver
        threshold={0.5}
        triggerOnce={false}
      >
        <div className="p-8 border border-border rounded-lg bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
          <h3 className="text-2xl font-semibold mb-4 text-center">
            Re-triggerable Section
          </h3>
          <p className="text-muted-foreground text-center max-w-md mx-auto">
            This section re-animates every time you scroll it in and out of view
            (triggerOnce=false).
          </p>
        </div>
      </AnimateIn>

      {/* Final section */}
      <div className="text-center space-y-4">
        <AnimateIn direction="up" useIntersectionObserver threshold={0.2}>
          <h2 className="text-3xl font-bold">You made it to the end!</h2>
        </AnimateIn>

        <AnimateIn direction="up" useIntersectionObserver threshold={0.2}>
          <p className="text-muted-foreground">
            Each section used different threshold values and animation
            directions.
          </p>
        </AnimateIn>
      </div>
    </div>
  )
}
