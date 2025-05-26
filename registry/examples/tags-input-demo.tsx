"use client"

import { TagsInput } from "@/registry/inputs/tags-input"

export default function TagsInputDemo() {
  return (
    <div className="w-full min-w-[320px] max-w-md mx-auto p-4">
      <TagsInput
        label="Tags"
        name="tags"
        placeholder="Add tags..."
        description="Add tags by pressing enter"
        hint="Press backspace to remove the last tag"
      />
    </div>
  )
}
