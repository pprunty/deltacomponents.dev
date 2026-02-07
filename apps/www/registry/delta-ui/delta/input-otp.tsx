"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { Dot } from "lucide-react"

import { cn } from "@/lib/utils"

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-1 has-disabled:opacity-50",
        containerClassName
      )}
      className={cn(
        "disabled:cursor-not-allowed",
        "text-base caret-transparent selection:bg-transparent selection:text-transparent file:bg-transparent file:text-transparent",
        className
      )}
      {...props}
    />
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center gap-1 sm:gap-2", className)}
      {...props}
    />
  )
}

function InputOTPSlot({
  index,
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & {
  index: number
  variant?: "default" | "pill"
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "text-foreground relative flex h-10 w-10 items-center justify-center text-sm font-semibold",
        // Default variant: matches shadcn input styling
        variant === "default" && [
          "dark:bg-input/30 border-input rounded-md border bg-transparent shadow-xs",
          "data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:ring-[3px]",
          "aria-invalid:border-destructive data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 data-[active=true]:aria-invalid:border-destructive",
        ],
        // Pill variant: rounded with muted background
        variant === "pill" && [
          "border-input bg-muted rounded-lg border",
          "data-[active=true]:ring-ring data-[active=true]:ring-offset-background data-[active=true]:z-10 data-[active=true]:ring-2 data-[active=true]:ring-offset-2",
        ],
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-separator"
      role="separator"
      className="-mx-0.5 flex items-center"
      {...props}
    >
      <Dot className="fill-muted/40 h-4 w-4" />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
