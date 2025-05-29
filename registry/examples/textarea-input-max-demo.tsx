"use client"

import React from "react"

import TextareaInput from "@/registry/inputs/textarea-input"

export default function TextareaInputMaxDemo() {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 p-4">
      <h2 className="text-2xl font-bold">TextareaInput Max Demo</h2>

      <div className="p-6 border rounded-lg">
        {/* Component usage goes here */}
        <p className="text-muted-foreground mb-4">
          Add your custom max demo for the TextareaInput component below:
        </p>

        <TextareaInput>{/* Component content goes here */}</TextareaInput>
      </div>
    </div>
  )
}
