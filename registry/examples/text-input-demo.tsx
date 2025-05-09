"use client"

import * as React from "react"
import { TextInput } from "@/registry/inputs/text-input"

export default function TextInputDemo() {
  return (
    <div className="w-full min-w-[320px] max-w-md mx-auto p-4">
      <TextInput
        label="Username"
        name="username"
        description="Enter a unique username for your account"
        placeholder="johndoe"
        required
      />
    </div>
  );
}
