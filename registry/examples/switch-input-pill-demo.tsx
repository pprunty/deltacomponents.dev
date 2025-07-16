"use client"

import React from "react"
import { SwitchInput } from "@/delta/switch-input"

export default function SwitchInputPillDemo() {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <SwitchInput
        label="Enable notifications"
        name="pillSwitch"
        variant="pill"
        description="Pill variant has fully rounded corners"
        defaultChecked={true}
      />
    </div>
  )
}
