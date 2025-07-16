"use client"

import React from "react"
import { RadioInput } from "@/delta/radio-input"

export default function RadioInputNoSelectionDemo() {
  const options = [
    {
      value: "small",
      label: "Small",
      description: "Perfect for personal projects",
    },
    {
      value: "medium",
      label: "Medium",
      description: "Great for small teams",
    },
    {
      value: "large",
      label: "Large",
      description: "Ideal for enterprise use",
    },
  ]

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <RadioInput
        label="Choose a plan"
        name="plan"
        options={options}
        description="Select the plan that best fits your needs"
        allowNoSelection={true}
        onValueChange={(value) => console.log("Selected:", value)}
      />
    </div>
  )
}
