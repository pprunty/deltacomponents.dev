"use client"

import { useState } from "react"

import { SwitchInput } from "@/delta/switch-input"

export default function SwitchInputDemo() {
  const [notifications, setNotifications] = useState(true)

  return (
    <div className="w-full min-w-[320px] max-w-md mx-auto p-4">
      <SwitchInput
        label="Enable notifications"
        name="notifications"
        checked={notifications}
        onCheckedChange={setNotifications}
        description="Receive notifications about account activity and updates"
        containerClassName="space-y-4"
      />

      <div className="text-sm text-muted-foreground mt-6">
        Notifications are currently:{" "}
        <span className="font-medium">
          {notifications ? "Enabled" : "Disabled"}
        </span>
      </div>
    </div>
  )
}
