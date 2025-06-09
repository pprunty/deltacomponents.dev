"use client"

import React from "react"

import { RadioInput } from "@/registry/inputs/radio-input"

export default function RadioInputPillDemo() {
  const options = [
    {
      value: "starter",
      label: "Starter Plan",
      description: "Perfect for individuals just getting started",
    },
    {
      value: "pro",
      label: "Pro Plan",
      description: "Best for growing teams and businesses",
    },
    {
      value: "enterprise",
      label: "Enterprise Plan",
      description: "Custom solutions for large organizations",
    },
  ]

  return (
    <div className="w-full min-w-[320px] max-w-md mx-auto p-4">
      <RadioInput
        label="Choose Your Plan"
        name="pricing_plan"
        options={options}
        description="Select the plan that best fits your needs"
        defaultValue="pro"
        variant="pill"
      />
    </div>
  )
}
