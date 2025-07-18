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
  /** Whether to show active character count (e.g., "432/500") */
  showActiveCount?: boolean
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
  showActiveCount = false,
  className,
  id = name,
  value,
  maxLength,
  ...props
}: TextareaInputProps) {
  const [localError, setLocalError] = React.useState<string | undefined>(error)

  // Helper to stringify value
  const valueToString = (
    val: string | number | readonly string[] | undefined
  ): string => {
    if (val == null) return ""
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

  const isControlled = value !== undefined
  const isMaxLengthReached =
    maxLength !== undefined && currentValue.length >= maxLength

  React.useEffect(() => {
    setLocalError(error)
  }, [error])

  React.useEffect(() => {
    if (isControlled && value !== undefined) {
      setCurrentValue(valueToString(value))
    }
  }, [isControlled, value])

  const validateTextarea = React.useCallback(
    (val: string) => {
      if (!schema) return
      const result = schema.safeParse(val)
      if (!result.success) {
        const msg = result.error.errors[0]?.message || "Invalid input"
        setLocalError(msg)
        onValidate?.(false, val, msg)
      } else {
        setLocalError(undefined)
        onValidate?.(true, val)
      }
    },
    [schema, onValidate]
  )

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setCurrentValue(newValue)
    schema && validateTextarea(newValue)
    props.onChange?.(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    schema && validateTextarea(e.target.value)
    props.onBlur?.(e)
  }

  const getHintText = () => {
    if (maxLength !== undefined) {
      const remaining = maxLength - currentValue.length
      if (remaining <= 0) {
        return `Maximum ${maxLength} characters reached`
      }
      if (showActiveCount) {
        return `${currentValue.length}/${maxLength} characters`
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
        size={size}
        maxLength={maxLength}
        disabled={pending || props.disabled}
        aria-invalid={hasError}
        aria-errormessage={hasError ? errorId : undefined}
        aria-describedby={hint ? hintId : undefined}
        aria-required={required}
        onChange={handleChange}
        onBlur={handleBlur}
        {...(isControlled ? { value } : { defaultValue })}
        {...props}
        className={cn(
          // Base
          "md:text-md text-md bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:ring-offset-black ring-offset-white",

          // Default variant: add border and focus-border
          variant === "default" &&
            "border border-input shadow-[0px_1px_1px_rgba(0,0,0,0.03),_0px_3px_6px_rgba(0,0,0,0.02)] focus-visible:border-primary focus-visible:ring-primary/20",

          // Pill variant
          variant === "pill" &&
            "bg-muted border-0 rounded-lg px-4 py-3 focus-visible:ring-offset-background shadow-none",
          variant === "pill" && coloredBorder && "border-2 border-primary",
          variant === "pill" && "placeholder:text-muted-foreground",

          // Error override
          "group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive",

          // Hide scrollbar
          "scrollbar-hide",

          className
        )}
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
