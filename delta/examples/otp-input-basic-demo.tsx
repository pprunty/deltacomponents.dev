"use client"

import { OTPInput } from "@/delta/components/otp-input"

export default function OtpInputBasicDemo() {
  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-lg space-y-4">
      <OTPInput
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
