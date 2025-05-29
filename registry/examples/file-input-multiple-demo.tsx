"use client"

import React from "react"

import FileInput from "@/registry/inputs/file-input"

export default function FileInputMultipleDemo() {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 p-4">
      <h2 className="text-2xl font-bold">FileInput Multiple Demo</h2>

      <div className="p-6 border rounded-lg">
        {/* Component usage goes here */}
        <p className="text-muted-foreground mb-4">
          Add your custom multiple demo for the FileInput component below:
        </p>

        <FileInput>{/* Component content goes here */}</FileInput>
      </div>
    </div>
  )
}
