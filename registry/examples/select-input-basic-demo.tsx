"use client"

import { SelectInput } from "@/registry/ui/select-input"

export default function SelectInputBasicDemo() {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ]

  return (
    <div className="max-w-md mx-auto space-y-4">
      <SelectInput
        label="Select an option"
        name="basic-select"
        options={options}
        description="Choose one of the available options"
        placeholder="Select an option"
      />
    </div>
  )
} 