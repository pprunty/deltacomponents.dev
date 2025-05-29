"use client"

import React from "react"

import { OtpInput } from "@/registry/inputs/otp-input"

export default function OtpInputPillDemo() {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <OtpInput
        label="Verification Code"
        name="pillCode"
        length={6}
        variant="pill"
        required
        hint="Enter the 6-digit code"
      />
    </div>
  )
}
