import { TextInput } from "@/registry/ui/text-input"

export default function TextInputVariantsDemo() {
  return (
    <div className="w-full max-w-sm mx-auto space-y-4">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Default Variant</h3>
        <TextInput
          label="Default Input"
          name="default"
          placeholder="This is a default input"
          description="This is a description for the input field"
          hint="This is a helpful hint"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Pill Variant</h3>
        <TextInput
          label="Pill Input"
          name="pill"
          variant="pill"
          placeholder="This is a pill input"
        />
        <TextInput
          label="Pill with Colored Border"
          name="pill-colored"
          variant="pill"
          coloredBorder
          placeholder="This is a pill input with colored border"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Label Variants</h3>
        <TextInput
          label="Default Label"
          name="default-label"
          placeholder="This has a default label"
        />
        <TextInput
          label="Muted Label"
          name="muted-label"
          labelVariant="muted"
          placeholder="This has a muted label"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">States</h3>
        <TextInput
          label="Disabled Input"
          name="disabled"
          placeholder="This input is disabled"
          disabled
        />
        <TextInput
          label="Pending Input"
          name="pending"
          placeholder="This input is in pending state"
          pending
        />
        <TextInput
          label="Error Input"
          name="error"
          placeholder="This input has an error"
          error="This field is required"
        />
      </div>
    </div>
  )
} 