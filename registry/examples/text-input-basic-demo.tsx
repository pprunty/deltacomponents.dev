"use client"

import { TextInput } from "@/registry/ui/text-input"

export default function TextInputBasicDemo() {
  return (
    <div className="max-w-md mx-auto">
      <TextInput
        label="Username"
        name="username"
        description="Enter a unique username for your account"
        placeholder="johndoe"
        required
      />
    </div>
  )
} 