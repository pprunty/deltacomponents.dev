"use client"

import * as React from "react"
import type { z } from "zod"

import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"

export interface TextareaInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** The label for the textarea field */
  label: string
  /** The name of the textarea field (used for form submission) */
  name: string
  /** Optional description text to display below the label */
  description?: string
  /** Optional hint text to display below the textarea */
  hint?: string
  /** Error message to display (typically from Zod validation) */
  error?: string
  /** Whether the field is required */
  required?: boolean
  /** Whether the field is in a loading/pending state */
  pending?: boolean
  /** Default value for the textarea */
  defaultValue?: string
  /** Container className for the entire component */
  containerClassName?: string
  /** Label className for customizing the label */
  labelClassName?: string
  /** Label variant - 'default' or 'muted' */
  labelVariant?: "default" | "muted"
  /** Textarea variant - 'default' or 'pill' */
  variant?: "default" | "pill"
  /** Whether to show a colored border (only applies to pill variant) */
  coloredBorder?: boolean
  /** Size of the textarea - 'sm', 'md', or 'lg' */
  size?: "sm" | "md" | "lg"
  /** Zod schema for validation (optional - can be handled at the form level) */
  schema?: z.ZodType<string>
  /** Callback when validation occurs */
  onValidate?: (isValid: boolean, value: string, error?: string) => void
}

/**
 * TextareaInput component that integrates with Zod validation
 */
export function TextareaInput({
  label,
  name,
  description,
  hint,
  error,
  required = false,
  pending = false,
  defaultValue,
  containerClassName,
  labelClassName,
  labelVariant = "default",
  variant = "default",
  coloredBorder = false,
  size = "md",
  schema,
  onValidate,
  className,
  id = name,
  value,
  maxLength,
  ...props
}: TextareaInputProps) {
  const [localError, setLocalError] = React.useState<string | undefined>(error)

  // Helper function to convert value to string safely
  const valueToString = (
    val: string | number | readonly string[] | undefined
  ): string => {
    if (val === undefined || val === null) return ""
    if (typeof val === "string") return val
    if (typeof val === "number") return String(val)
    if (Array.isArray(val)) return val.join("")
    return String(val)
  }

  const [currentValue, setCurrentValue] = React.useState<string>(
    valueToString(value) || valueToString(defaultValue) || ""
  )
  const hasError = !!localError || !!error
  const errorId = `error-${id}`
  const hintId = `hint-${id}`

  // Determine if component is controlled or uncontrolled
  const isControlled = value !== undefined

  // Check if max length is reached
  const isMaxLengthReached =
    maxLength !== undefined && currentValue.length >= maxLength

  // Update local error when prop changes
  React.useEffect(() => {
    setLocalError(error)
  }, [error])

  // Update current value when controlled value changes
  React.useEffect(() => {
    if (isControlled && value !== undefined) {
      setCurrentValue(valueToString(value))
    }
  }, [isControlled, value])

  // Handle validation with the provided schema
  const validateTextarea = React.useCallback(
    (value: string) => {
      if (!schema) return

      const result = schema.safeParse(value)
      if (!result.success) {
        const errorMessage = result.error.errors[0]?.message || "Invalid input"
        setLocalError(errorMessage)
        onValidate?.(false, value, errorMessage)
      } else {
        setLocalError(undefined)
        onValidate?.(true, value)
      }
    },
    [schema, onValidate]
  )

  // Handle textarea change
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value

    // Always update current value for character count tracking
    setCurrentValue(newValue)

    // If we have a schema, validate on change
    if (schema) {
      validateTextarea(newValue)
    }

    // Call the original onChange if provided
    props.onChange?.(e)
  }

  // Handle blur event for validation
  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (schema) {
      validateTextarea(e.target.value)
    }

    // Call the original onBlur if provided
    props.onBlur?.(e)
  }

  // Generate dynamic hint text based on maxLength
  const getHintText = () => {
    if (maxLength !== undefined) {
      const remaining = maxLength - currentValue.length
      if (remaining <= 0) {
        return `Maximum ${maxLength} characters reached`
      }
      return (
        hint ||
        `${remaining} character${remaining === 1 ? "" : "s"} remaining (${currentValue.length}/${maxLength})`
      )
    }
    return hint
  }

  return (
    <div
      className={cn("group/field grid gap-2", containerClassName)}
      data-invalid={hasError}
    >
      <label
        htmlFor={id}
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
        <p className="text-xs text-muted-foreground">{description}</p>
      )}

      <Textarea
        id={id}
        name={name}
        disabled={pending || props.disabled}
        aria-invalid={hasError}
        aria-errormessage={hasError ? errorId : undefined}
        aria-describedby={hint ? hintId : undefined}
        aria-required={required}
        size={size}
        maxLength={maxLength}
        className={cn(
          "md:text-md text-md bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:ring-offset-black ring-offset-white",
          // Default variant styling - only apply shadow to default variant
          variant === "default" &&
            "shadow-[0px_1px_1px_rgba(0,0,0,0.03),_0px_3px_6px_rgba(0,0,0,0.02)]",

          // Pill variant styling - less rounded
          variant === "pill" && "bg-muted border-0 rounded-lg px-4 py-3",
          variant === "pill" && coloredBorder && "border-2 border-primary",
          variant === "pill" && "placeholder:text-muted-foreground",

          // Error styling for both variants
          "group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive",
          "scrollbar-hide",
          className
        )}
        onChange={handleChange}
        onBlur={handleBlur}
        // Only pass one of value or defaultValue, not both
        {...(isControlled ? { value } : { defaultValue })}
        {...props}
      />

      {getHintText() && !hasError && (
        <p
          id={hintId}
          className={cn(
            "text-xs mt-1",
            isMaxLengthReached
              ? "text-orange-600 dark:text-orange-400"
              : "text-muted-foreground"
          )}
        >
          {getHintText()}
        </p>
      )}

      {hasError && (
        <p id={errorId} className="text-destructive text-xs">
          {localError || error}
        </p>
      )}
    </div>
  )
}
