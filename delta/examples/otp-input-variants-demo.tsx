"use client"

import { OTPInput } from "@/delta/components/otp-input"

export default function OtpInputVariantsDemo() {
  return (
    <div className="flex flex-col space-y-6 p-6 border rounded-lg">
      <OTPInput
        label="Basic OTP"
        name="basicOtp"
        length={4}
        hint="4-digit code"
      />

      <OTPInput
        label="Grouped OTP"
        name="groupedOtp"
        length={6}
        separator
        groupSize={3}
        hint="6-digit code with groups of 3"
      />

      <OTPInput
        label="Masked OTP"
        name="maskedOtp"
        length={4}
        mask
        maskChar="•"
        hint="4-digit code with masked input"
      />

      <OTPInput
        label="Auto-Submit OTP"
        name="autoSubmitOtp"
        length={6}
        autoSubmit
        onComplete={(value) => {
          console.log("OTP completed:", value)
        }}
        hint="6-digit code that auto-submits on completion"
      />

      <OTPInput
        label="Pending OTP"
        name="pendingOtp"
        length={6}
        pending
        hint="6-digit code with pending state"
      />

      <OTPInput
        label="Error OTP"
        name="errorOtp"
        length={6}
        error="Invalid verification code"
        hint="6-digit code with error state"
      />
    </div>
  )
} 