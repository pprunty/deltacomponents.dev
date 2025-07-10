"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import type { z } from "zod"

import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectInputProps {
  /** The label for the select field */
  label: string
  /** The name of the select field (used for form submission) */
  name: string
  /** Options for the select dropdown */
  options: SelectOption[]
  /** Optional description text to display below the label */
  description?: string
  /** Optional hint text to display below the select */
  hint?: string
  /** Error message to display (typically from Zod validation) */
  error?: string
  /** Whether the field is required */
  required?: boolean
  /** Whether the field is in a loading/pending state */
  pending?: boolean
  /** Default selected value */
  defaultValue?: string
  /** Controlled selected value */
  value?: string
  /** Placeholder text when no option is selected */
  placeholder?: string
  /** Container className for the entire component */
  containerClassName?: string
  /** Select trigger className */
  selectClassName?: string
  /** Label className */
  labelClassName?: string
  /** Label variant - 'default' or 'muted' */
  labelVariant?: "default" | "muted"
  /** Select variant - 'default' or 'pill' */
  variant?: "default" | "pill"
  /** Whether to show a colored border (only applies to pill variant) */
  coloredBorder?: boolean
  /** Zod schema for validation (optional - can be handled at the form level) */
  schema?: z.ZodType<string>
  /** Callback when validation occurs */
  onValidate?: (isValid: boolean, value: string, error?: string) => void
  /** Callback when selection changes */
  onValueChange?: (value: string) => void
  /** Callback when the select loses focus */
  onBlur?: () => void
  /** ID for the select */
  id?: string
  /** Whether the select is disabled */
  disabled?: boolean
}

/**
 * SelectInput component that integrates with Zod validation
 */
export function SelectInput({
  label,
  name,
  options,
  description,
  hint,
  error,
  required = false,
  pending = false,
  defaultValue,
  value,
  placeholder = "Select an option",
  containerClassName,
  selectClassName,
  labelClassName,
  labelVariant = "default",
  variant = "default",
  coloredBorder = false,
  schema,
  onValidate,
  onValueChange,
  onBlur,
  id = name,
  disabled = false,
}: SelectInputProps) {
  const [localError, setLocalError] = React.useState<string | undefined>(error)
  const hasError = !!localError || !!error
  const errorId = `error-${id}`
  const hintId = `hint-${id}`

  // Controlled vs uncontrolled
  const isControlled = value !== undefined

  React.useEffect(() => {
    setLocalError(error)
  }, [error])

  const validateSelect = React.useCallback(
    (val: string) => {
      if (!schema) return
      const result = schema.safeParse(val)
      if (!result.success) {
        const msg = result.error.errors[0]?.message || "Invalid selection"
        setLocalError(msg)
        onValidate?.(false, val, msg)
      } else {
        setLocalError(undefined)
        onValidate?.(true, val)
      }
    },
    [schema, onValidate]
  )

  const handleValueChange = (newVal: string) => {
    if (schema) {
      validateSelect(newVal)
    }
    onValueChange?.(newVal)
  }

  const handleNativeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newVal = e.target.value
    if (schema) {
      validateSelect(newVal)
    }
    onValueChange?.(newVal)
  }

  // PILL variant uses native <select>
  if (variant === "pill") {
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

        <div className="relative">
          <select
            id={id}
            name={name}
            onChange={handleNativeChange}
            onBlur={onBlur}
            disabled={pending || disabled}
            aria-invalid={hasError}
            aria-errormessage={hasError ? errorId : undefined}
            aria-describedby={hint ? hintId : undefined}
            aria-required={required}
            className={cn(
              // Base
              "h-[46px] md:text-md text-md focus-visible:outline-none bg-muted placeholder:text-muted-foreground",
              // Pill
              "border-0 rounded-lg px-4 w-full pr-10",
              "focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary focus-visible:ring-offset-background",
              // Hide native select arrow
              "appearance-none",
              coloredBorder && "border-2 border-primary",
              // Error override
              "group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive",
              selectClassName
            )}
            {...(isControlled
              ? { value }
              : { defaultValue: defaultValue || "" })}
          >
            {!defaultValue && !value && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
        </div>

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

  // DEFAULT variant uses shadcn <Select>
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

      <Select
        onValueChange={handleValueChange}
        disabled={pending || disabled}
        {...(isControlled ? { value } : { defaultValue })}
      >
        <SelectTrigger
          id={id}
          onBlur={onBlur}
          className={cn(
            // Base
            "h-[46px] md:text-md text-md focus-visible:outline-none bg-background",
            // Default
            "border border-input shadow-[0px_1px_1px_rgba(0,0,0,0.03),_0px_3px_6px_rgba(0,0,0,0.02)] " +
              "focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary",
            // Error override
            "group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive",
            selectClassName
          )}
          aria-invalid={hasError}
          aria-errormessage={hasError ? errorId : undefined}
          aria-describedby={hint ? hintId : undefined}
          aria-required={required}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem
              className={cn(
                "h-[46px] md:text-md text-md",
                "outline-none focus:bg-primary/10 focus:text-primary data-[state=checked]:bg-primary/10 data-[state=checked]:text-primary"
              )}
              key={opt.value}
              value={opt.value}
              disabled={opt.disabled}
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

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
