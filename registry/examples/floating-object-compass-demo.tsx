"use client"

import React from "react"
import { FloatingObject } from "@/delta/floating-object"

export default function FloatingObjectCompassDemo() {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 p-4">
      <h2 className="text-2xl font-bold">FloatingObject Compass Demo</h2>

      <div className="p-6 border rounded-lg">
        <p className="text-muted-foreground mb-4">
          Random directional movement between compass points.
        </p>

        <div className="relative h-80 bg-muted/20 rounded-lg flex items-center justify-center">
          {/* Compass directions */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-muted-foreground text-sm">
            N
          </div>
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-muted-foreground text-sm">
            E
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-muted-foreground text-sm">
            S
          </div>
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-muted-foreground text-sm">
            W
          </div>

          <FloatingObject
            pattern="random-directions"
            intensity="medium"
            speed="medium"
          >
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
              🧭
            </div>
          </FloatingObject>
        </div>
      </div>
    </div>
  )
}
