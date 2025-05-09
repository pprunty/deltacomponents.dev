"use client"

import * as React from "react"
import { OtpInput } from "@/registry/inputs/otp-input"

export default function OtpInputDemo() {
  return (
    <div className="w-full min-w-[320px] max-w-md mx-auto p-4">
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
  );
}
