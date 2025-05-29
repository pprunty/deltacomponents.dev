"use client"

import React from "react"

import { SelectInput } from "@/registry/inputs/select-input"

export default function SelectInputPillDemo() {
  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
    { value: "grape", label: "Grape" },
  ]

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <SelectInput
        label="Select Fruit"
        name="pillSelect"
        options={options}
        variant="pill"
        placeholder="Choose a fruit"
        hint="Pill variant has a rounded, muted background style"
      />
    </div>
  )
}
