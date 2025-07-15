"use client"

import React from "react"

import { OtpInput } from "@/delta/otp-input"

export default function OtpInputShortDemo() {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <OtpInput
        label="PIN Code"
        name="shortOtp"
        length={4}
        required
        hint="Enter your 4-digit PIN"
        groupSize={2}
        separator
      />
    </div>
  )
}
