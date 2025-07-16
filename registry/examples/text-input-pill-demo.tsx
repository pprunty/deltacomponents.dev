"use client"

import React from "react"
import { TextInput } from "@/delta/text-input"

export default function TextInputPillDemo() {
  return (
    <div className="w-full min-w-[320px] max-w-md mx-auto p-4">
      <TextInput
        label="Username"
        name="pillText"
        variant="pill"
        placeholder="Enter your username"
        hint="Pill variant with colored border"
      />
    </div>
  )
}
