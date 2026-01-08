"use client"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/registry/delta-ui/delta/input-otp"
import { Label } from "@/registry/delta-ui/ui/label"

export default function InputOTPSeparatorDemo() {
  return (
    <div className="space-y-2">
      <Label htmlFor="otp-separator">2FA Code</Label>
      <InputOTP id="otp-separator" maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  )
}
