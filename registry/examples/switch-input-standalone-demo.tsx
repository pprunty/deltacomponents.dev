"use client"

import React from "react"
import { SwitchInput } from "@/delta/switch-input"

export default function SwitchInputStandaloneDemo() {
  const handleToggle = (checked: boolean) => {
    alert(
      `Switch ${checked ? "enabled" : "disabled"}! This would trigger some action.`
    )
  }

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <SwitchInput
        label="Trigger Action"
        name="standaloneSwitch"
        onCheckedChange={handleToggle}
        description="Toggle to see alert functionality"
      />
    </div>
  )
}
