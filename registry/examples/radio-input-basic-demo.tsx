"use client"

import { RadioInput } from "@/registry/ui/radio-input"

export default function RadioInputBasicDemo() {
  const options = [
    { value: "email", label: "Email", description: "Get updates via email" },
    { value: "sms", label: "SMS", description: "Get updates via text message" },
    { value: "push", label: "Push Notifications", description: "Get updates via push notifications" }
  ]

  return (
    <div className="max-w-md mx-auto">
      <RadioInput
        label="Notification Preferences"
        name="notifications"
        options={options}
        description="How would you like to receive notifications?"
        defaultValue="email"
      />
    </div>
  )
}
