"use client"

import React from "react"

import { TagsInput } from "@/delta/tags-input"

export default function TagsInputPillDemo() {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <TagsInput
        label="Keywords"
        name="pillTags"
        variant="pill"
        placeholder="Add keywords..."
        description="Pill variant with rounded corners"
        hint="Press Enter to add tags"
        defaultValue={["react", "typescript"]}
      />
    </div>
  )
}
