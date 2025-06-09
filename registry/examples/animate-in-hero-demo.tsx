"use client"

import React from "react"

import AnimateIn from "@/registry/animations/animate-in"

export default function AnimateInHeroDemo() {
  return (
    <div className="text-center space-y-8 py-16">
      <AnimateIn direction="up" duration={1.0} delay={0.2} overlayBlur>
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Welcome to the Future
        </h1>
      </AnimateIn>

      <AnimateIn direction="up" duration={1.0} delay={0.8} overlayBlur>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Experience seamless animations that bring your content to life with
          elegant motion design
        </p>
      </AnimateIn>

      <AnimateIn direction="up" duration={0.8} delay={1.4} distance={30}>
        <div className="flex gap-4 justify-center">
          <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            Get Started
          </button>
          <button className="px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors">
            Learn More
          </button>
        </div>
      </AnimateIn>
    </div>
  )
}
