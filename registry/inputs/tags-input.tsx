"use client"

import * as React from "react"
import { X as PhosphorX } from "@phosphor-icons/react"
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

  // Determine if component is controlled or uncontrolled
  const isControlled = value !== undefined

  // Check if max tags limit is reached
  const isMaxTagsReached = maxTags !== undefined && localTags.length >= maxTags

  // Update local tags when value prop changes (for controlled component)
  React.useEffect(() => {
    if (isControlled && JSON.stringify(value) !== JSON.stringify(localTags)) {
      setLocalTags(value || [])
    }
  }, [value, isControlled, localTags])

  // Update local error when prop changes
  React.useEffect(() => {
    setLocalError(error)
  }, [error])

  // Handle validation with the provided schema
  const validateTags = React.useCallback(
    (tags: string[]) => {
      if (!schema) return

      const result = schema.safeParse(tags)
      if (!result.success) {
        const errorMessage = result.error.errors[0]?.message || "Invalid input"
        setLocalError(errorMessage)
        onValidate?.(false, tags, errorMessage)
      } else {
        setLocalError(undefined)
        onValidate?.(true, tags)
      }
    },
    [schema, onValidate]
  )

  const updateTags = (newTags: string[]) => {
    if (isControlled) {
      // For controlled component, just call onChange
      onChange?.(newTags)
    } else {
      // For uncontrolled, update internal state
      setLocalTags(newTags)
      onChange?.(newTags)
    }

    // Validate if schema is provided
    if (schema) {
      validateTags(newTags)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only handle comma as a special case in the onChange handler
    if (triggerKey === "Comma" && value.endsWith(",")) {
      const newTag = value.slice(0, -1).trim()
      if (newTag && !localTags.includes(newTag) && !isMaxTagsReached) {
        const newTags = [...localTags, newTag]
        updateTags(newTags)
        setInputValue("")
      } else {
        setInputValue("")
      }
    } else {
      setInputValue(value)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle the selected trigger key
    if (
      (triggerKey === "Enter" && e.key === "Enter") ||
      (triggerKey === "Space" && e.key === " ") ||
      (triggerKey === "Comma" && e.key === ",")
    ) {
      e.preventDefault()
      const newTag = inputValue.trim()
      if (newTag && !localTags.includes(newTag) && !isMaxTagsReached) {
        const newTags = [...localTags, newTag]
        updateTags(newTags)
      }
      setInputValue("")
    } else if (e.key === "Backspace" && !inputValue && localTags.length > 0) {
      // Always allow backspace to remove the last tag when input is empty
      const newTags = localTags.slice(0, -1)
      updateTags(newTags)
    }
  }

  const removeTag = (tagToRemove: string) => {
    const newTags = localTags.filter((tag) => tag !== tagToRemove)
    updateTags(newTags)
  }

  const handleBlur = () => {
    // Add tag on blur if there's input and limit not reached
    const newTag = inputValue.trim()
    if (newTag && !localTags.includes(newTag) && !isMaxTagsReached) {
      const newTags = [...localTags, newTag]
      updateTags(newTags)
      setInputValue("")
    }

    // Validate on blur
    if (schema) {
      validateTags(localTags)
    }
  }

  // Get the trigger key display text for the placeholder
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

  // Generate dynamic hint text based on maxTags
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

      {/* Input container - styled like TextInput */}
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
        className={cn(
          // Default variant styling
          "h-[46px] md:text-md text-md focus-visible:outline-none focus-visible:ring-2 bg-background focus-visible:ring-primary dark:ring-offset-black ring-offset-white placeholder:text-muted-foreground",
          variant === "default" &&
            "shadow-[0px_2px_2px_rgba(0,0,0,0.03),_0px_4px_7px_rgba(0,0,0,0.02)] border border-input rounded-md px-3",

          // Pill variant styling - no shadow
          variant === "pill" &&
            "bg-muted border-0 rounded-lg h-12 px-4 focus:ring-offset-2",
          variant === "pill" && coloredBorder && "border-2 border-primary",
          variant === "pill" && "placeholder:text-muted-foreground",

          // Error styling for both variants
          "group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive",

          // Disabled styling when max tags reached
          isMaxTagsReached && "opacity-50 cursor-not-allowed",
          className
        )}
        placeholder={
          isMaxTagsReached
            ? `Maximum ${maxTags} tags reached`
            : props.placeholder ||
              `Type and press ${getTriggerKeyText()} to add tags`
        }
        {...props}
      />

      {/* Tags container - completely separate from input */}
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
                onClick={() => removeTag(tag)}
                className="text-muted-foreground hover:text-foreground"
                disabled={pending || props.disabled}
                aria-label={`Remove ${tag}`}
              >
                <PhosphorX className="h-3 w-3" weight="bold" />
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
