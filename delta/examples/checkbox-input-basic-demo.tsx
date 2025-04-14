"use client"

import {CheckboxInput} from "@/delta/components/checkbox-input"

export default function CheckboxInputBasicDemo() {
  return (
    <div className="max-w-md mx-auto">
      <CheckboxInput
        label="Accept terms and conditions"
        name="terms"
        description="By accepting, you agree to our Terms of Service and Privacy Policy"
        hint="Required for account creation"
        required
      />
    </div>
  )
}
