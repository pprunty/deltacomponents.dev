"use client"

import React from "react"

import AnimateIn from "@/registry/animations/animate-in"

export default function AnimateInFadeDemo() {
  return (
    <div className="space-y-8 py-8">
      <div className="text-center mb-8">
        <p className="text-muted-foreground">
          Cards fade in smoothly using only opacity changes, without any
          directional movement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Card One", delay: 0 },
          { title: "Card Two", delay: 200 },
          { title: "Card Three", delay: 400 },
          { title: "Card Four", delay: 600 },
          { title: "Card Five", delay: 800 },
          { title: "Card Six", delay: 1000 },
        ].map((card, index) => (
          <AnimateIn
            key={index}
            direction="fade"
            useIntersectionObserver
            threshold={0.1}
            triggerOnce={true}
            delay={card.delay}
          >
            <div className="p-6 border border-border rounded-lg bg-gradient-to-br from-background to-muted/20 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
              <p className="text-muted-foreground text-sm">
                This card fades in smoothly using only opacity animation without
                any transform effects.
              </p>
            </div>
          </AnimateIn>
        ))}
      </div>
    </div>
  )
}
