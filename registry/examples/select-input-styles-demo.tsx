import { SelectInput } from "@/registry/ui/select-input"

export default function SelectInputStylesDemo() {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ]

  return (
    <div className="space-y-4">
      <SelectInput
        label="Default Variant"
        name="default-select"
        options={options}
        placeholder="Select an option"
      />
      <SelectInput
        label="Pill Variant"
        name="pill-select"
        options={options}
        variant="pill"
        placeholder="Select an option"
      />
      <SelectInput
        label="Error State"
        name="error-select"
        options={options}
        error="This field is required"
        placeholder="Select an option"
      />
      <SelectInput
        label="Disabled State"
        name="disabled-select"
        options={options}
        disabled
        placeholder="Select an option"
      />
      <SelectInput
        label="Pending State"
        name="pending-select"
        options={options}
        pending
        placeholder="Select an option"
      />
    </div>
  )
} 