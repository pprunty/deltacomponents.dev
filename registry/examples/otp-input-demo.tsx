"use client"

import * as React from "react"
import { OtpInput } from "@/delta/otp-input"

export default function OtpInputDemo() {
  return (
    <div className="w-full max-w-md p-0 mx-auto">
      <OtpInput
        label="Verification Code"
        name="verificationCode"
        length={6}
        required
        separator
        groupSize={3}
        hint="Enter the 6-digit verification code"
      />
    </div>
  )
}
