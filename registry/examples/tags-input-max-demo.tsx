"use client"

import React from "react"
import { TagsInput } from "@/delta/tags-input"

export default function TagsInputMaxDemo() {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <TagsInput
        label="Skills (Max 3)"
        name="maxTags"
        maxTags={3}
        placeholder="Add up to 3 skills..."
        description="Demonstrates maxTags functionality"
        defaultValue={["JavaScript", "React"]}
      />
    </div>
  )
}
