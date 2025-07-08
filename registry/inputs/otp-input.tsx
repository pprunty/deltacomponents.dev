"use client"

import * as React from "react"
import { motion } from "framer-motion"
import type { z } from "zod"

import { cn } from "@/lib/utils"

export type OtpInputType = "numeric" | "alphabetic" | "alphanumeric"

export interface OtpInputProps {
  /** The label for the OTP input field */
  label: string
  /** The name of the OTP input field (used for form submission) */
  name: string
  /** Optional description text to display below the label */
  description?: string
  /** Optional hint text to display below the OTP input */
  hint?: string
  /** Error message to display (typically from Zod validation) */
  error?: string
  /** Whether the field is required */
  required?: boolean
  /** Whether the field is in a loading/pending state */
  pending?: boolean
  /** Default value for the OTP input */
  defaultValue?: string
  /** Controlled value */
  value?: string
  /** Container className for the entire component */
  containerClassName?: string
  /** Label className for customizing the label */
  labelClassName?: string
  /** Label variant - 'default' or 'muted' */
  labelVariant?: "default" | "muted"
  /** Input variant - 'default' or 'pill' */
  variant?: "default" | "pill"
  /** Whether to show a colored border (only applies to pill variant) */
  coloredBorder?: boolean
  /** Input type validation - numeric, alphabetic, or alphanumeric */
  inputType?: OtpInputType
  /** Whether the OTP is in a success state (shows green border) */
  success?: boolean
  /** Zod schema for validation (optional - can be handled at the form level) */
  schema?: z.ZodType<string>
  /** Callback when validation occurs */
  onValidate?: (isValid: boolean, value: string, error?: string) => void
  /** Callback when OTP value changes */
  onChange?: (value: string) => void
  /** Callback when OTP is completed */
  onComplete?: (value: string) => void
  /** ID for the OTP input */
  id?: string
  /** Whether the OTP input is disabled */
  disabled?: boolean
  /** Length of the OTP code */
  length?: number
  /** Character to display when input is masked */
  maskChar?: string
  /** Whether to mask the input (like a password) */
  mask?: boolean
  /** Whether to auto-focus the first input on mount */
  autoFocus?: boolean
  /** Whether to render with a separator between groups */
  separator?: boolean
  /** Size of each group of digits */
  groupSize?: number
  /** Whether to automatically submit the form when OTP is completed */
  autoSubmit?: boolean
}

/**
 * OtpInput component that integrates with Zod validation
 */
export function OtpInput({
  label,
  name,
  description,
  hint,
  error,
  required = false,
  pending = false,
  defaultValue = "",
  value,
  containerClassName,
  labelClassName,
  labelVariant = "default",
  variant = "default",
  coloredBorder = false,
  inputType = "alphanumeric",
  success = false,
  schema,
  onValidate,
  onChange,
  onComplete,
  id = name,
  disabled = false,
  length = 6,
  maskChar = "•",
  mask = false,
  autoFocus = false,
  separator = false,
  groupSize = 3,
  autoSubmit = false,
}: OtpInputProps) {
  const [localError, setLocalError] = React.useState<string | undefined>(error)
  const [otpValue, setOtpValue] = React.useState<string[]>(
    (value || defaultValue || "")
      .split("")
      .slice(0, length)
      .concat(Array(length).fill(""))
      .slice(0, length)
  )
  const [errorIndexes, setErrorIndexes] = React.useState<Set<number>>(new Set())
  const [shakeAnimation, setShakeAnimation] = React.useState(false)
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])
  const hasError = !!localError || !!error
  const errorId = `error-${id}`
  const hintId = `hint-${id}`
  const formRef = React.useRef<HTMLFormElement | null>(null)

  // Controlled vs uncontrolled
  const isControlled = value !== undefined

  React.useEffect(() => {
    setLocalError(error)
  }, [error])

  React.useEffect(() => {
    if (isControlled && value !== undefined) {
      setOtpValue(
        value
          .split("")
          .slice(0, length)
          .concat(Array(length).fill(""))
          .slice(0, length)
      )
    }
  }, [isControlled, value, length])

  React.useEffect(() => {
    if (autoSubmit) {
      const input = inputRefs.current[0]
      if (input) {
        let el: HTMLElement | null = input
        while (el && el.tagName !== "FORM") {
          el = el.parentElement
        }
        formRef.current = el as HTMLFormElement
      }
    }
  }, [autoSubmit])

  const isValidInputType = (char: string): boolean => {
    switch (inputType) {
      case "numeric":
        return /^\d$/.test(char)
      case "alphabetic":
        return /^[a-zA-Z]$/.test(char)
      case "alphanumeric":
        return /^[a-zA-Z0-9]$/.test(char)
      default:
        return true
    }
  }

  const triggerErrorAnimation = (index: number) => {
    setErrorIndexes((prev) => new Set(prev).add(index))
    setShakeAnimation(true)
    setTimeout(() => setShakeAnimation(false), 500)
  }

  const validateOTP = React.useCallback(
    (val: string) => {
      if (!schema) return
      if (val.length === length) {
        const result = schema.safeParse(val)
        if (!result.success) {
          const msg = result.error.errors[0]?.message || "Invalid code"
          setLocalError(msg)
          onValidate?.(false, val, msg)
        } else {
          setLocalError(undefined)
          onValidate?.(true, val)
        }
      } else {
        setLocalError(undefined)
      }
    },
    [schema, onValidate, length]
  )

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const val = e.target.value

    if (val.length > 1) {
      handlePaste(index, val)
      return
    }

    if (val && !isValidInputType(val)) {
      triggerErrorAnimation(index)
      return
    }

    if (val) {
      setErrorIndexes((prev) => {
        const next = new Set(prev)
        next.delete(index)
        return next
      })
    }

    const nextOtp = [...otpValue]
    nextOtp[index] = val
    setOtpValue(nextOtp)

    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    const joined = nextOtp.join("")
    onChange?.(joined)

    if (nextOtp.filter(Boolean).length === length) {
      onComplete?.(joined)
      schema && validateOTP(joined)
      if (autoSubmit && formRef.current) {
        setTimeout(() => formRef.current?.requestSubmit(), 100)
      }
    }
  }

  const handlePasteEvent = (
    index: number,
    e: React.ClipboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault()
    const data = e.clipboardData.getData("text/plain")
    data && handlePaste(index, data)
  }

  const handlePaste = (start: number, pasted: string) => {
    let cleaned = pasted.replace(/\s/g, "")
    if (inputType) {
      cleaned = cleaned.split("").filter(isValidInputType).join("")
    }
    if (!cleaned && pasted.trim()) {
      triggerErrorAnimation(start)
      return
    }

    const newOtp = Array(length).fill("")
    for (let i = 0; i < Math.min(cleaned.length, length); i++) {
      newOtp[i] = cleaned[i]
    }
    setOtpValue(newOtp)
    setErrorIndexes(new Set())
    const filled = newOtp.filter(Boolean).length
    filled === length
      ? inputRefs.current[length - 1]?.focus()
      : inputRefs.current[filled]?.focus()

    const joined = newOtp.join("")
    onChange?.(joined)
    if (filled === length) {
      onComplete?.(joined)
      schema && validateOTP(joined)
      if (autoSubmit && formRef.current) {
        setTimeout(() => formRef.current?.requestSubmit(), 100)
      }
    } else {
      schema && validateOTP(joined)
    }
  }

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (!otpValue[index] && index > 0) {
        const prev = [...otpValue]
        prev[index - 1] = ""
        setOtpValue(prev)
        onChange?.(prev.join(""))
        inputRefs.current[index - 1]?.focus()
      }
      if (!otpValue[index]) e.preventDefault()
    } else if (
      ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(e.key)
    ) {
      e.preventDefault()
    }
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select()
  }

  const inputGroups: number[][] = []
  for (let i = 0; i < length; i += groupSize) {
    inputGroups.push(
      Array.from({ length: Math.min(groupSize, length - i) }, (_, j) => i + j)
    )
  }

  return (
    <div
      className={cn("group/field grid gap-2", containerClassName)}
      data-invalid={hasError}
    >
      <label
        htmlFor={`${id}-0`}
        className={cn(
          "text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 group-data-[invalid=true]/field:text-destructive",
          labelVariant === "muted" && "text-muted-foreground",
          labelClassName
        )}
      >
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>

      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}

      <div className="flex items-center justify-center space-x-1.5 sm:space-x-2">
        {inputGroups.map((group, gi) => (
          <React.Fragment key={gi}>
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              {group.map((idx) => (
                <div key={idx} className="relative">
                  <motion.input
                    ref={(el) => {
                      inputRefs.current[idx] = el
                    }}
                    id={`${id}-${idx}`}
                    name={idx === 0 ? name : `${name}-${idx}`}
                    type="text"
                    inputMode={inputType === "numeric" ? "tel" : "text"}
                    pattern={inputType === "numeric" ? "[0-9]*" : undefined}
                    maxLength={1}
                    autoComplete="off"
                    value={mask && otpValue[idx] ? maskChar : otpValue[idx]}
                    onChange={(e) => handleChange(idx, e)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    onPaste={(e) => handlePasteEvent(idx, e)}
                    onFocus={handleFocus}
                    disabled={pending || disabled}
                    aria-invalid={hasError}
                    aria-errormessage={hasError ? errorId : undefined}
                    aria-describedby={hint ? hintId : undefined}
                    aria-required={required}
                    autoFocus={autoFocus && idx === 0}
                    animate={{
                      x:
                        errorIndexes.has(idx) && shakeAnimation
                          ? [-2, 2, -2, 2, 0]
                          : 0,
                      borderColor: success
                        ? "rgb(34 197 94)"
                        : errorIndexes.has(idx)
                        ? "rgb(239 68 68)"
                        : undefined,
                      scale: success ? [1, 1.02, 1] : 1,
                    }}
                    transition={{
                      x:
                        errorIndexes.has(idx) && shakeAnimation
                          ? { duration: 0.4, type: "tween" }
                          : { duration: 0.4, type: "spring", stiffness: 300 },
                      borderColor: { duration: 0.3 },
                      scale: success
                        ? { duration: 0.6, delay: 0 }
                        : { duration: 0.6, delay: 0.1 },
                    }}
                    className={cn(
                      // Base styling
                      "w-11 h-12 sm:w-10 sm:h-12 bg-background text-center text-base sm:text-xl font-medium transition-colors",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-white dark:ring-offset-black",

                      // Default variant
                      variant === "default" &&
                        "border border-input rounded-md shadow-[0px_2px_2px_rgba(0,0,0,0.03),_0px_4px_7px_rgba(0,0,0,0.02)] focus-visible:border-primary focus-visible:ring-primary/20",

                      // Pill variant
                      variant === "pill" &&
                        "bg-muted border-0 rounded-lg focus-visible:border-primary focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-background",
                      variant === "pill" && coloredBorder && "border-2 border-primary",

                      // Success state
                      success &&
                        "border-2 border-green-500 focus:ring-0 focus:ring-transparent",

                      // Per-input error
                      errorIndexes.has(idx) &&
                        "border-destructive focus:ring-destructive",

                      // Global error override
                      "group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
                    )}
                  />
                </div>
              ))}
            </div>
            {separator && gi < inputGroups.length - 1 && (
              <div className="text-muted-foreground text-base sm:text-lg font-medium">
                -
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Hidden for form */}
      <input
        type="hidden"
        name={name}
        value={otpValue.join("")}
        data-testid={`${id}-hidden`}
      />

      {hint && !hasError && (
        <p id={hintId} className="text-xs text-muted-foreground mt-1">
          {hint}
        </p>
      )}

      {hasError && (
        <p id={errorId} className="text-destructive text-sm">
          {localError || error}
        </p>
      )}
    </div>
  )
}
