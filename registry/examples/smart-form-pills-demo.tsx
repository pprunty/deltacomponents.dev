"use client"

import { SmartForm, FieldDefinition } from "@/delta/forms/smart-form"
import { z } from "zod"

const schema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

const fields: FieldDefinition[] = [
  {
    name: "username",
    label: "Username",
    type: "text",
    required: true,
    placeholder: "Enter your username",
  variant: 'pill' as const,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    required: true,
    placeholder: "Enter your password",
          variant: 'pill' as const,
  },
]

export default function SmartFormBasicDemo() {
  const handleSubmit = async (data: z.infer<typeof schema>) => {
    alert(`Form submitted with data:\n${JSON.stringify(data, null, 2)}`)
    // In a real app, you would handle the form submission here
    // For example: await login(data.username, data.password)
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <SmartForm
        fields={fields}
        schema={schema}
        variant={"pills"}
        onSubmit={handleSubmit}
        submitText="Sign In"
      />
    </div>
  )
}