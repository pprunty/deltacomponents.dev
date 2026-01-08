"use client"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/registry/delta-ui/delta/input-otp"
import { Label } from "@/registry/delta-ui/ui/label"

export default function InputOTPDemo() {
  return (
    <div className="space-y-2">
      <Label htmlFor="input-otp">One-Time Password</Label>
      <InputOTP id="input-otp" maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  )
}
