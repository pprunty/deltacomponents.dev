import { SelectInput } from "@/registry/ui/select-input"

export default function SelectInputBasicDemo() {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ]

  return (
    <div className="space-y-4">
      <SelectInput
        label="Basic Select"
        name="basic-select"
        options={options}
        placeholder="Select an option"
      />
      <SelectInput
        label="Required Select"
        name="required-select"
        options={options}
        required
        placeholder="Select an option"
      />
      <SelectInput
        label="Select with Description"
        name="description-select"
        options={options}
        description="This is a description of the select field"
        placeholder="Select an option"
      />
    </div>
  )
} 