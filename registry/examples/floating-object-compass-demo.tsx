"use client"

import React from "react"

import FloatingObject from "@/registry/animations/floating-object"

export default function FloatingObjectCompassDemo() {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 p-4">
      <h2 className="text-2xl font-bold">FloatingObject Compass Demo</h2>

      <div className="p-6 border rounded-lg">
        {/* Component usage goes here */}
        <p className="text-muted-foreground mb-4">
          Add your custom compass demo for the FloatingObject component below:
        </p>

        <FloatingObject>{/* Component content goes here */}</FloatingObject>
      </div>
    </div>
  )
}
