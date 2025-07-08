"use client"

import * as React from "react"
import { X } from "lucide-react"
import type { z } from "zod"

import { cn } from "@/lib/utils"

export type TagTriggerKey = "Enter" | "Space" | "Comma"

export interface TagsInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
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
  /** Default value for the tags */
  defaultValue?: string[]
  /** Current value for the tags (controlled component) */
  value?: string[]
  /** Callback when tags change */
  onChange?: (tags: string[]) => void
  /** Key that triggers tag addition - defaults to Enter */
  triggerKey?: TagTriggerKey
  /** Maximum number of tags allowed */
  maxTags?: number
  /** Zod schema for validation (optional - can be handled at the form level) */
  schema?: z.ZodType<string[]>
  /** Callback when validation occurs */
  onValidate?: (isValid: boolean, value: string[], error?: string) => void
}

export function TagsInput({
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
  triggerKey = "Enter",
  maxTags,
  schema,
  onValidate,
  className,
  id = name,
  value,
  onChange,
  ...props
}: TagsInputProps) {
  const [inputValue, setInputValue] = React.useState("")
  const [localTags, setLocalTags] = React.useState<string[]>(
    value || defaultValue || []
  )
  const [localError, setLocalError] = React.useState<string | undefined>(error)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const hasError = !!localError || !!error
  const errorId = `error-${id}`
  const hintId = `hint-${id}`

  // Controlled vs. uncontrolled
  const isControlled = value !== undefined

  // Max tags check
  const isMaxTagsReached = maxTags !== undefined && localTags.length >= maxTags

  // Sync controlled value → localTags
  React.useEffect(() => {
    if (isControlled && JSON.stringify(value) !== JSON.stringify(localTags)) {
      setLocalTags(value || [])
    }
  }, [value, isControlled, localTags])

  // Sync error prop → localError
  React.useEffect(() => {
    setLocalError(error)
  }, [error])

  // Zod validation
  const validateTags = React.useCallback(
    (tags: string[]) => {
      if (!schema) return
      const result = schema.safeParse(tags)
      if (!result.success) {
        const msg = result.error.errors[0]?.message || "Invalid input"
        setLocalError(msg)
        onValidate?.(false, tags, msg)
      } else {
        setLocalError(undefined)
        onValidate?.(true, tags)
      }
    },
    [schema, onValidate]
  )

  const updateTags = (newTags: string[]) => {
    if (isControlled) {
      onChange?.(newTags)
    } else {
      setLocalTags(newTags)
      onChange?.(newTags)
    }
    schema && validateTags(newTags)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (triggerKey === "Comma" && val.endsWith(",")) {
      const tag = val.slice(0, -1).trim()
      if (tag && !localTags.includes(tag) && !isMaxTagsReached) {
        updateTags([...localTags, tag])
      }
      setInputValue("")
    } else {
      setInputValue(val)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      (triggerKey === "Enter" && e.key === "Enter") ||
      (triggerKey === "Space" && e.key === " ") ||
      (triggerKey === "Comma" && e.key === ",")
    ) {
      e.preventDefault()
      const tag = inputValue.trim()
      if (tag && !localTags.includes(tag) && !isMaxTagsReached) {
        updateTags([...localTags, tag])
      }
      setInputValue("")
    } else if (e.key === "Backspace" && !inputValue && localTags.length > 0) {
      updateTags(localTags.slice(0, -1))
    }
  }

  const handleBlur = () => {
    const tag = inputValue.trim()
    if (tag && !localTags.includes(tag) && !isMaxTagsReached) {
      updateTags([...localTags, tag])
    }
    setInputValue("")
    schema && validateTags(localTags)
  }

  const getTriggerKeyText = () => {
    switch (triggerKey) {
      case "Enter":
        return "Enter"
      case "Space":
        return "Space"
      case "Comma":
        return "comma"
      default:
        return "Enter"
    }
  }

  const getHintText = () => {
    if (maxTags !== undefined) {
      const remaining = maxTags - localTags.length
      if (remaining <= 0) {
        return `Maximum ${maxTags} tags reached`
      }
      return (
        hint ||
        `${remaining} tag${remaining === 1 ? "" : "s"} remaining (${localTags.length}/${maxTags})`
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

      {/* -- Unified styling here: */}
      <input
        ref={inputRef}
        type="text"
        id={id}
        name={name}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        disabled={pending || props.disabled || isMaxTagsReached}
        aria-invalid={hasError}
        aria-errormessage={hasError ? errorId : undefined}
        aria-describedby={hint ? hintId : undefined}
        aria-required={required}
        autoComplete="off"
        placeholder={
          isMaxTagsReached
            ? `Maximum ${maxTags} tags reached`
            : props.placeholder ||
              `Type and press ${getTriggerKeyText()} to add tags`
        }
        {...props}
        className={cn(
          // Base for both variants
          "h-[46px] md:text-md text-md focus-visible:outline-none bg-background placeholder:text-muted-foreground",

          // Default variant styling
          variant === "default" &&
            "border border-input shadow-[0px_2px_2px_rgba(0,0,0,0.03),_0px_4px_7px_rgba(0,0,0,0.02)] " +
            "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 rounded-md px-3",

          // Pill variant styling (flat, padded, rounded + your ring-offset tweak)
          variant === "pill" &&
            "bg-muted border-0 rounded-lg h-12 px-4 " +
            "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-background",
          variant === "pill" && coloredBorder && "border-2 border-primary",

          // Error override for both
          "group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive",

          // When max reached
          isMaxTagsReached && "opacity-50 cursor-not-allowed",

          className
        )}
      />

      {/* Tags display */}
      {localTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {localTags.map((tag) => (
            <div
              key={tag}
              className={cn(
                "flex items-center gap-1 px-2 py-1 text-sm bg-secondary",
                variant === "pill" ? "rounded-lg" : "rounded-md"
              )}
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => {
                  const filtered = localTags.filter((t) => t !== tag)
                  updateTags(filtered)
                }}
                className="text-muted-foreground hover:text-foreground"
                disabled={pending || props.disabled}
                aria-label={`Remove ${tag}`}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {getHintText() && !hasError && (
        <p
          id={hintId}
          className={cn(
            "text-xs mt-1",
            isMaxTagsReached
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
