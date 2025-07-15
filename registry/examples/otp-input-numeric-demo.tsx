"use client"

import React from "react"
import { z } from "zod"

import { OtpInput } from "@/delta/otp-input"

// Zod schema that only allows numeric values
const numericOtpSchema = z
  .string()
  .length(6, "Code must be exactly 6 digits")
  .regex(/^\d+$/, "Code must contain only numbers")

export default function OtpInputNumericDemo() {
  return (
    <div className="w-full max-w-md p-0 mx-auto">
      <OtpInput
        label="Numeric Verification Code"
        name="numericCode"
        length={6}
        inputType="numeric"
        required
        schema={numericOtpSchema}
        hint="Enter only numbers (0-9)"
      />
    </div>
  )
}
