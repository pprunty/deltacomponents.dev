"use client"

import React from "react"

import AnimateIn from "@/registry/animations/animate-in"

export default function AnimateInHeroDemo() {
  return (
    <div className="text-center space-y-8 py-16">
      <AnimateIn direction="up" delay={200}>
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Welcome to the Future
        </h1>
      </AnimateIn>

      <AnimateIn direction="up" delay={800}>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Experience seamless animations that bring your content to life with
          elegant motion design
        </p>
      </AnimateIn>

      <AnimateIn direction="up" delay={1400}>
        <div className="flex gap-4 justify-center">
          <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            Get Started
          </button>
          <button className="px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors">
            Learn More
          </button>
        </div>
      </AnimateIn>

      <AnimateIn direction="up" delay={2000}>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-8">
          <span>Backed by</span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-orange-500 flex items-center justify-center text-white font-bold text-xs transform rotate-180">
              Y
            </div>
            <span className="font-medium">Combinator</span>
          </div>
        </div>
      </AnimateIn>
    </div>
  )
}
