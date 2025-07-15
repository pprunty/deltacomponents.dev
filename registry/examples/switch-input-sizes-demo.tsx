"use client"

import React from "react"

import { SwitchInput } from "@/delta/switch-input"

export default function SwitchInputSizesDemo() {
  return (
    <div className="w-full max-w-md mx-auto space-y-6 p-4">
      <SwitchInput
        label="Default Size Switch"
        name="defaultSwitch"
        size="default"
        description="Standard switch size (24px height)"
        defaultChecked={true}
      />

      <SwitchInput
        label="Large Size Switch"
        name="largeSwitch"
        size="large"
        description="Large switch size (30px height)"
        defaultChecked={true}
      />
    </div>
  )
}
