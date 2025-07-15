"use client"

import { TextareaInput } from "@/delta/textarea-input"

export default function TextareaInputDemo() {
  return (
    <div className="w-full min-w-[320px] max-w-md mx-auto p-4">
      <TextareaInput
        label="Feedback"
        name="feedback"
        description="Share your thoughts with us"
        placeholder="Type your feedback here..."
      />
    </div>
  )
}
