"use client"

import * as React from "react"
import AnimateIn from "@/delta/animate-in"

const YCombinatorLogo = () => (
  <div className="w-5 h-5 bg-orange-500 rounded-sm p-0.5 flex items-center justify-center">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Y_Combinator_logo.svg/256px-Y_Combinator_logo.svg.png?20161016225220"
      alt="Y Combinator"
      className="w-full h-full"
    />
  </div>
)

export default function AnimateInDemo() {
  return (
    <div className="text-center space-y-8 py-16">
      <AnimateIn direction="up" delay={100} enableBlur={true} blurAmount={15}>
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Welcome to the Future
        </h1>
      </AnimateIn>

      <AnimateIn direction="up" delay={200} enableBlur={true} blurAmount={15}>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Experience seamless animations that bring your content to life with
          elegant motion design
        </p>
      </AnimateIn>

      <AnimateIn direction="up" delay={450} enableBlur={true} blurAmount={15}>
        <div className="flex items-center justify-center gap-2 text-sm mb-6">
          <div className="bg-muted-foreground/10 px-3 py-1 rounded-full flex items-center gap-2">
            <span className="text-foreground">Backed by</span>
            <YCombinatorLogo />
            <span className="text-foreground">Combinator</span>
          </div>
        </div>
      </AnimateIn>

      <AnimateIn direction="up" delay={300} enableBlur={true} blurAmount={15}>
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
