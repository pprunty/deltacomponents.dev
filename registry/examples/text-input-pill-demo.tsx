"use client"

import React from "react"

import TextInput from "@/registry/inputs/text-input"

export default function TextInputPillDemo() {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 p-4">
      <h2 className="text-2xl font-bold">TextInput Pill Demo</h2>

      <div className="p-6 border rounded-lg">
        {/* Component usage goes here */}
        <p className="text-muted-foreground mb-4">
          Add your custom pill demo for the TextInput component below:
        </p>

        <TextInput>{/* Component content goes here */}</TextInput>
      </div>
    </div>
  )
}
