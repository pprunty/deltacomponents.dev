"use client"

import * as React from "react"
import type { z } from "zod"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** The label for the input field */
  label: string
  /** The name of the input field (used for form submission) */
  name: string
  /** Optional description text to display below the label */
  description?: string
  /** Optional hint text to display below the input */
  hint?: string
  /** Error message to display (typically from Zod validation) */
  error?: string
  /** Whether the field is required */
  required?: boolean
  /** Whether the field is in a loading/pending state */
  pending?: boolean
  /** Default value for the input */
  defaultValue?: string
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
  /** Zod schema for validation (optional - can be handled at the form level) */
  schema?: z.ZodType<string>
  /** Callback when validation occurs */
  onValidate?: (isValid: boolean, value: string, error?: string) => void
}

/**
 * TextInput component that integrates with Zod validation
 */
export function TextInput({
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
  schema,
  onValidate,
  className,
  id = name,
  value,
  ...props
}: TextInputProps) {
  const [localError, setLocalError] = React.useState<string | undefined>(error)
  const hasError = !!localError || !!error
  const errorId = `error-${id}`
  const hintId = `hint-${id}`

  // Controlled vs uncontrolled
  const isControlled = value !== undefined

  React.useEffect(() => {
    setLocalError(error)
  }, [error])

  const validateInput = React.useCallback(
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    schema && validateInput(v)
    props.onChange?.(e)
  }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    schema && validateInput(e.target.value)
    props.onBlur?.(e)
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

      <Input
        id={id}
        name={name}
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
          // -- Base for both --
          "h-[46px] md:text-md text-md focus-visible:outline-none bg-background",

          // -- Default variant --
          variant === "default" &&
            "border border-input shadow-[0px_2px_2px_rgba(0,0,0,0.03),_0px_4px_7px_rgba(0,0,0,0.02)] " +
              "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20",

          // -- Pill variant --
          variant === "pill" &&
            "bg-muted border-0 rounded-lg h-12 px-4" +
              "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background !shadow-none",
          variant === "pill" && coloredBorder && "border-2 border-primary",
          variant === "pill" && "placeholder:text-muted-foreground",

          // -- Error override --
          "group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive",

          className
        )}
      />

      {hint && !hasError && (
        <p id={hintId} className="text-xs text-muted-foreground mt-1">
          {hint}
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
