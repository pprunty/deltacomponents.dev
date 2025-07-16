"use client"

import React from "react"
import { SwitchInput } from "@/delta/switch-input"

export default function SwitchInputColorDemo() {
  return (
    <div className="w-full max-w-md mx-auto space-y-6 p-4">
      <SwitchInput
        label="Custom Red Switch"
        name="redSwitch"
        activeColor="#ef4444"
        description="Using custom red color"
        defaultChecked={true}
      />

      <SwitchInput
        label="Custom Green Switch"
        name="greenSwitch"
        activeColor="#22c55e"
        description="Using custom green color"
        defaultChecked={true}
      />

      <SwitchInput
        label="Custom Purple Switch"
        name="purpleSwitch"
        activeColor="#a855f7"
        description="Using custom purple color"
        defaultChecked={true}
      />
    </div>
  )
}
