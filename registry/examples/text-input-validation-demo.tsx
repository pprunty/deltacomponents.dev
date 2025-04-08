'use client'

import { useState } from "react"
import { z } from "zod"
import { TextInput } from "@/registry/ui/text-input"

const emailSchema = z.string().email("Please enter a valid email address")
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")

export default function TextInputValidationDemo() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="w-full max-w-sm mx-auto space-y-4">
      <TextInput
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        schema={emailSchema}
        required
      />
      <TextInput
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        schema={passwordSchema}
        required
        description="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
      />
    </div>
  )
} 