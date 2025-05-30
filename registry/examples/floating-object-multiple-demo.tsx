"use client"

import React from "react"

import { FloatingObject } from "@/registry/animations/floating-object"

export default function FloatingObjectMultipleDemo() {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 p-4">
      <h2 className="text-2xl font-bold">FloatingObject Multiple Demo</h2>

      <div className="p-6 border rounded-lg">
        <p className="text-muted-foreground mb-4">
          Multiple floating objects with different patterns and intensities.
        </p>

        <div className="grid grid-cols-3 gap-8 items-center justify-items-center h-64">
          <FloatingObject pattern="float" intensity="subtle" speed="slow">
            <div className="w-12 h-12 bg-blue-500 rounded-full" />
          </FloatingObject>

          <FloatingObject pattern="circular" intensity="medium" speed="medium">
            <div className="w-12 h-12 bg-green-500 rounded-full" />
          </FloatingObject>

          <FloatingObject
            pattern="random-directions"
            intensity="strong"
            speed="fast"
          >
            <div className="w-12 h-12 bg-purple-500 rounded-full" />
          </FloatingObject>
        </div>
      </div>
    </div>
  )
}
