"use client"

import React from "react"

import { TextareaInput } from "@/registry/inputs/textarea-input"

export default function TextareaInputPillDemo() {
  return (
    <div className="w-full min-w-[320px] max-w-md mx-auto p-4">
      <TextareaInput
        label="Comments"
        name="pillTextarea"
        variant="pill"
        placeholder="Enter your comments..."
        size="md"
        hint="Pill variant with colored border"
      />
    </div>
  )
}
