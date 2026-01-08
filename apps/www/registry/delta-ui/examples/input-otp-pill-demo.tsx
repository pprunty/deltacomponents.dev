"use client"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/registry/delta-ui/delta/input-otp"
import { Label } from "@/registry/delta-ui/ui/label"

export default function InputOTPPill() {
  return (
    <div className="space-y-2">
      <Label htmlFor="input-otp-pill">One-Time Password</Label>
      <InputOTP id="input-otp-pill" maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} variant="pill" />
          <InputOTPSlot index={1} variant="pill" />
          <InputOTPSlot index={2} variant="pill" />
          <InputOTPSlot index={3} variant="pill" />
          <InputOTPSlot index={4} variant="pill" />
          <InputOTPSlot index={5} variant="pill" />
        </InputOTPGroup>
      </InputOTP>
    </div>
  )
}
