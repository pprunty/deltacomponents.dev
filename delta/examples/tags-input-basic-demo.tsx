"use client"

import {TagsInput} from "@/delta/components/tags-input"

export default function TagsInputBasicDemo() {
  return (
    <div className="max-w-md mx-auto">
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
