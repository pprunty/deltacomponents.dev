"use client"

import React from "react"

import { OtpInput } from "@/registry/inputs/otp-input"

export default function OtpInputAutofillDemo() {
  const handleComplete = (value: string) => {
    alert(`OTP completed: ${value}`)
  }

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <OtpInput
        label="Verification Code"
        name="autoFillCode"
        length={6}
        required
        onComplete={handleComplete}
        hint="Enter 6 digits to see auto-complete"
      />
    </div>
  )
}
