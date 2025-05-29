"use client"

import React from "react"

import OtpInput from "@/registry/inputs/otp-input"

export default function OtpInputShortDemo() {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 p-4">
      <h2 className="text-2xl font-bold">OtpInput Short Demo</h2>

      <div className="p-6 border rounded-lg">
        {/* Component usage goes here */}
        <p className="text-muted-foreground mb-4">
          Add your custom short demo for the OtpInput component below:
        </p>

        <OtpInput>{/* Component content goes here */}</OtpInput>
      </div>
    </div>
  )
}
