"use client"

import React, { useState } from "react"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { OtpInput } from "@/delta/otp-input"

// Different validation schemas for different input types
const numericSchema = z
  .string()
  .length(6, "Must be 6 digits")
  .regex(/^\d+$/, "Only numbers allowed")
const alphabeticSchema = z
  .string()
  .length(4, "Must be 4 letters")
  .regex(/^[a-zA-Z]+$/, "Only letters allowed")
const alphanumericSchema = z
  .string()
  .length(6, "Must be 6 characters")
  .regex(/^[a-zA-Z0-9]+$/, "Letters and numbers only")

export default function OtpInputValidationDemo() {
  const [numericValue, setNumericValue] = useState("")
  const [alphabeticValue, setAlphabeticValue] = useState("")
  const [alphanumericValue, setAlphanumericValue] = useState("")
  const [numericSuccess, setNumericSuccess] = useState(false)
  const [alphabeticSuccess, setAlphabeticSuccess] = useState(false)
  const [alphanumericSuccess, setAlphanumericSuccess] = useState(false)

  const handleNumericComplete = (value: string) => {
    const result = numericSchema.safeParse(value)
    if (result.success) {
      setNumericSuccess(true)
      setTimeout(() => setNumericSuccess(false), 2000)
    }
  }

  const handleAlphabeticComplete = (value: string) => {
    const result = alphabeticSchema.safeParse(value)
    if (result.success) {
      setAlphabeticSuccess(true)
      setTimeout(() => setAlphabeticSuccess(false), 2000)
    }
  }

  const handleAlphanumericComplete = (value: string) => {
    const result = alphanumericSchema.safeParse(value)
    if (result.success) {
      setAlphanumericSuccess(true)
      setTimeout(() => setAlphanumericSuccess(false), 2000)
    }
  }

  const resetAll = () => {
    setNumericValue("")
    setAlphabeticValue("")
    setAlphanumericValue("")
    setNumericSuccess(false)
    setAlphabeticSuccess(false)
    setAlphanumericSuccess(false)
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 p-0">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">OTP Input Validation</h2>
        <p className="text-muted-foreground">
          Try entering wrong character types to see error animations. Complete
          valid codes to see success animations.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Numeric Only (6 digits)</h3>
          <p className="text-sm text-muted-foreground">
            Try entering letters to see error animation
          </p>
          <OtpInput
            label="Numeric OTP"
            name="numericOtp"
            length={6}
            inputType="numeric"
            value={numericValue}
            success={numericSuccess}
            schema={numericSchema}
            onChange={setNumericValue}
            onComplete={handleNumericComplete}
            hint="Enter only numbers (0-9)"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Alphabetic Only (4 letters)</h3>
          <p className="text-sm text-muted-foreground">
            Try entering numbers to see error animation
          </p>
          <OtpInput
            label="Alphabetic Code"
            name="alphabeticCode"
            length={4}
            inputType="alphabetic"
            value={alphabeticValue}
            success={alphabeticSuccess}
            schema={alphabeticSchema}
            onChange={setAlphabeticValue}
            onComplete={handleAlphabeticComplete}
            hint="Enter only letters (A-Z)"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Alphanumeric (6 characters)</h3>
          <p className="text-sm text-muted-foreground">
            Try entering special characters to see error animation
          </p>
          <OtpInput
            label="Alphanumeric Code"
            name="alphanumericCode"
            length={6}
            inputType="alphanumeric"
            value={alphanumericValue}
            success={alphanumericSuccess}
            schema={alphanumericSchema}
            onChange={setAlphanumericValue}
            onComplete={handleAlphanumericComplete}
            hint="Enter letters and numbers only"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <Button onClick={resetAll} variant="outline">
          Reset All
        </Button>
      </div>
    </div>
  )
}
