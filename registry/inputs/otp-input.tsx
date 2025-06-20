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

  // Determine if component is controlled or uncontrolled
  const isControlled = value !== undefined

  // Update local error when prop changes
  React.useEffect(() => {
    setLocalError(error)
  }, [error])

  // Update OTP value when controlled value changes
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

  // Find the closest form element
  React.useEffect(() => {
    if (autoSubmit) {
      const input = inputRefs.current[0]
      if (input) {
        let element: HTMLElement | null = input
        while (element && element.tagName !== "FORM") {
          element = element.parentElement
        }
        formRef.current = element as HTMLFormElement
      }
    }
  }, [autoSubmit])

  // Input type validation function
  const isValidInputType = (char: string): boolean => {
    if (!inputType) return true

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

  // Trigger error animation
  const triggerErrorAnimation = (index: number) => {
    setErrorIndexes((prev) => new Set(prev.add(index)))
    setShakeAnimation(true)

    // Clear only the shake animation after it completes, but keep the error border
    setTimeout(() => {
      setShakeAnimation(false)
    }, 500)
  }

  // Handle validation with the provided schema
  const validateOTP = React.useCallback(
    (value: string) => {
      if (!schema) return

      // Only validate if all digits are entered or if the form has been submitted
      if (value.length === length) {
        const result = schema.safeParse(value)
        if (!result.success) {
          const errorMessage = result.error.errors[0]?.message || "Invalid code"
          setLocalError(errorMessage)
          onValidate?.(false, value, errorMessage)
        } else {
          setLocalError(undefined)
          onValidate?.(true, value)
        }
      } else {
        // Clear error while user is still typing
        setLocalError(undefined)
      }
    },
    [schema, onValidate, length]
  )

  // Handle input change
  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value

    // Handle paste event (detected by multiple characters)
    if (value.length > 1) {
      handlePaste(index, value)
      return
    }

    // Check if the character meets the input type requirements
    if (value && !isValidInputType(value)) {
      triggerErrorAnimation(index)
      return
    }

    // Clear error state for this index if valid input is entered
    if (value && isValidInputType(value)) {
      setErrorIndexes((prev) => {
        const newSet = new Set(prev)
        newSet.delete(index)
        return newSet
      })
    }

    // Update the OTP value
    const newOtpValue = [...otpValue]
    newOtpValue[index] = value
    setOtpValue(newOtpValue)

    // Move focus to the next input if a value was entered
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    // Call onChange with the new value - ensure it's a clean string
    const newValue = newOtpValue.join("")
    onChange?.(newValue)

    // Check if OTP is complete
    if (newOtpValue.filter(Boolean).length === length) {
      onComplete?.(newValue)

      // Validate the complete OTP
      if (schema) {
        validateOTP(newValue)
      }

      // Auto-submit the form if enabled
      if (autoSubmit && formRef.current) {
        setTimeout(() => {
          formRef.current?.requestSubmit()
        }, 100)
      }
    }
  }

  // Handle paste event with dedicated handler
  const handlePasteEvent = (
    index: number,
    e: React.ClipboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain")

    if (pastedData) {
      handlePaste(index, pastedData)
    }
  }

  // Handle paste event
  const handlePaste = (startIndex: number, pastedValue: string) => {
    // Clean the pasted value - remove all whitespace and non-printable characters
    let cleanedValue = pastedValue.replace(/\s/g, "").trim()

    // Filter characters based on input type
    if (inputType) {
      cleanedValue = cleanedValue
        .split("")
        .filter((char) => isValidInputType(char))
        .join("")
    }

    // If no valid characters after filtering, trigger error animation
    if (
      cleanedValue.length === 0 &&
      pastedValue.replace(/\s/g, "").length > 0
    ) {
      triggerErrorAnimation(startIndex)
      return
    }

    // Create a new OTP value array - clear existing values first for better UX
    const newOtpValue = Array(length).fill("")

    // Fill in the OTP value with the pasted characters from the beginning
    // This provides better UX when pasting a complete code
    const charactersToFill = Math.min(cleanedValue.length, length)
    for (let i = 0; i < charactersToFill; i++) {
      newOtpValue[i] = cleanedValue[i]
    }

    setOtpValue(newOtpValue)

    // Clear any previous error states since we're filling with new data
    setErrorIndexes(new Set())

    // Focus the appropriate input after pasting
    if (charactersToFill === length) {
      // If we filled all inputs, focus the last one
      inputRefs.current[length - 1]?.focus()
    } else {
      // Focus the next empty input
      inputRefs.current[charactersToFill]?.focus()
    }

    // Call onChange with the new value
    const newValue = newOtpValue.join("")
    onChange?.(newValue)

    // Check if OTP is complete and trigger onComplete
    if (charactersToFill === length) {
      onComplete?.(newValue)

      // Validate the complete OTP
      if (schema) {
        validateOTP(newValue)
      }

      // Auto-submit the form if enabled
      if (autoSubmit && formRef.current) {
        setTimeout(() => {
          formRef.current?.requestSubmit()
        }, 100)
      }
    } else if (schema) {
      // Validate partial input if schema exists
      validateOTP(newValue)
    }
  }

  // Handle key down event
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Move focus to the previous input on backspace if the current input is empty
    if (e.key === "Backspace") {
      if (!otpValue[index] && index > 0) {
        inputRefs.current[index - 1]?.focus()

        // Clear the previous input
        const newOtpValue = [...otpValue]
        newOtpValue[index - 1] = ""
        setOtpValue(newOtpValue)

        // Call onChange with the new value
        onChange?.(newOtpValue.join(""))
      }

      // Don't prevent default for backspace when there's content to delete
      if (!otpValue[index]) {
        e.preventDefault()
      }
    }

    // Prevent arrow key navigation
    else if (
      e.key === "ArrowRight" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowDown"
    ) {
      e.preventDefault()
    }
  }

  // Handle focus event
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // Select the input content on focus
    e.target.select()
  }

  // Create input groups based on groupSize
  const inputGroups = []
  for (let i = 0; i < length; i += groupSize) {
    const group = []
    for (let j = 0; j < groupSize && i + j < length; j++) {
      group.push(i + j)
    }
    inputGroups.push(group)
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
        {inputGroups.map((group, groupIndex) => (
          <React.Fragment key={`group-${groupIndex}`}>
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              {group.map((index) => (
                <div key={`input-${index}`} className="relative">
                  <motion.input
                    ref={(el: HTMLInputElement | null) => {
                      if (inputRefs.current) {
                        inputRefs.current[index] = el
                      }
                    }}
                    id={index === 0 ? `${id}-0` : `${id}-${index}`}
                    name={index === 0 ? name : `${name}-${index}`}
                    type="text"
                    inputMode={inputType === "numeric" ? "tel" : "text"}
                    pattern={inputType === "numeric" ? "[0-9]*" : undefined}
                    maxLength={1}
                    autoComplete="off"
                    value={mask && otpValue[index] ? maskChar : otpValue[index]}
                    onChange={(e) => handleChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={(e) => handlePasteEvent(index, e)}
                    onFocus={handleFocus}
                    disabled={pending || disabled}
                    aria-invalid={hasError}
                    aria-errormessage={hasError ? errorId : undefined}
                    aria-describedby={hint ? hintId : undefined}
                    aria-required={required}
                    autoFocus={autoFocus && index === 0}
                    animate={{
                      x:
                        errorIndexes.has(index) && shakeAnimation
                          ? [-2, 2, -2, 2, 0]
                          : 0,
                      borderColor: success
                        ? "rgb(34 197 94)" // green-500
                        : errorIndexes.has(index)
                          ? "rgb(239 68 68)" // red-500
                          : undefined,
                      scale: success ? [1, 1.02, 1] : 1,
                    }}
                    transition={{
                      x:
                        errorIndexes.has(index) && shakeAnimation
                          ? { duration: 0.4, type: "tween" }
                          : { duration: 0.4, type: "spring", stiffness: 300 },
                      borderColor: { duration: 0.3 },
                      scale: success
                        ? { duration: 0.6, delay: 0 }
                        : { duration: 0.6, delay: 0.1 },
                    }}
                    className={cn(
                      "w-11 h-12 sm:w-10 sm:h-12 bg-background text-center text-base sm:text-xl font-medium transition-colors",
                      "focus:outline-none focus:ring-2 focus:ring-primary dark:ring-offset-black ring-offset-white",
                      // Default variant styling
                      variant === "default" &&
                        "border border-input rounded-md shadow-[0px_2px_2px_rgba(0,0,0,0.03),_0px_4px_7px_rgba(0,0,0,0.02)]",
                      // Pill variant styling
                      variant === "pill" &&
                        "bg-muted border-0 rounded-lg focus:ring-offset-2",
                      variant === "pill" &&
                        coloredBorder &&
                        "border-2 border-primary",
                      // Success styling - remove focus ring for consistent appearance
                      success &&
                        "border-2 border-green-500 focus:ring-0 focus:ring-transparent",
                      // Error styling for individual inputs
                      errorIndexes.has(index) &&
                        "border-destructive focus:ring-destructive",
                      // Global error styling
                      "group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
                    )}
                  />
                </div>
              ))}
            </div>
            {separator && groupIndex < inputGroups.length - 1 && (
              <div className="text-muted-foreground text-base sm:text-lg font-medium">
                -
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Hidden input for form submission with the complete value */}
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
