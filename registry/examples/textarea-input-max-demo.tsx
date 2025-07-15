"use client"

import React from "react"

import { TextareaInput } from "@/delta/textarea-input"

export default function TextareaInputMaxDemo() {
  return (
    <div className="w-full min-w-[320px] max-w-md mx-auto p-4">
      <TextareaInput
        label="Description"
        name="maxTextarea"
        size="lg"
        placeholder="Enter a detailed description..."
        maxLength={500}
        showActiveCount={true}
        rows={6}
        defaultValue="This is a comprehensive product description that demonstrates the maximum character limit functionality. The textarea will show a character counter that updates in real-time as you type, helping users stay within the specified limit. This feature is particularly useful for forms where you need to enforce content length restrictions, such as product descriptions, reviews, comments, or social media posts. The character count displays both current and maximum characters for clear user guidance."
      />
    </div>
  )
}
