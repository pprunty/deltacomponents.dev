"use client"

import * as React from "react"
import { toast as sonnerToast, Toaster as SonnerToaster } from "sonner"
import type { ToasterProps } from "sonner"

import { cn } from "@/lib/utils"

// Toast theme configuration based on admonition colors
const toastTheme = {
  success: {
    background: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800",
    text: "text-emerald-700 dark:text-emerald-300",
  },
  error: {
    background: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-200 dark:border-red-800",
    text: "text-red-700 dark:text-red-300",
  },
  warning: {
    background: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-700",
    text: "text-amber-700 dark:text-amber-300",
  },
  info: {
    background: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
    text: "text-blue-700 dark:text-blue-300",
  },
  default: {
    background: "bg-gray-50 dark:bg-gray-950/30",
    border: "border-gray-200 dark:border-gray-800",
    text: "text-gray-700 dark:text-gray-300",
  },
}

export interface ToastProviderProps extends Omit<ToasterProps, "theme"> {
  /**
   * Position of the toast
   * @default "bottom-right"
   */
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right"

  /**
   * Enable rich colors for better visual hierarchy
   * @default true
   */
  richColors?: boolean

  /**
   * Maximum number of toasts to show at once
   * @default 3
   */
  visibleToasts?: number

  /**
   * Custom class name for the toaster
   */
  className?: string

  /**
   * Custom styling for different toast types
   */
  toastOptions?: {
    style?: React.CSSProperties
    className?: string
    duration?: number
  }
}

/**
 * ToastProvider component - singleton toast manager
 * Should be rendered once at the app level
 */
export function ToastProvider({
  position = "bottom-right",
  richColors = true,
  visibleToasts = 3,
  className,
  toastOptions,
  ...props
}: ToastProviderProps) {
  return (
    <SonnerToaster
      position={position}
      richColors={richColors}
      visibleToasts={visibleToasts}
      className={cn("toaster", className)}
      toastOptions={{
        className: cn(
          "group toast",
          "border rounded-lg p-4 shadow-md",
          "bg-background text-foreground",
          toastOptions?.className
        ),
        style: toastOptions?.style,
        duration: toastOptions?.duration,
      }}
      {...props}
    />
  )
}

/**
 * Toast function with type-specific methods
 * Enhanced with theme-aware styling
 */
export const toast = Object.assign(
  (message: string, options?: any) => sonnerToast(message, options),
  {
    success: (message: string, options?: any) =>
      sonnerToast.success(message, {
        className: cn(
          toastTheme.success.background,
          toastTheme.success.border,
          toastTheme.success.text,
          "border"
        ),
        ...options,
      }),

    error: (message: string, options?: any) =>
      sonnerToast.error(message, {
        className: cn(
          toastTheme.error.background,
          toastTheme.error.border,
          toastTheme.error.text,
          "border"
        ),
        ...options,
      }),

    warning: (message: string, options?: any) =>
      sonnerToast.warning(message, {
        className: cn(
          toastTheme.warning.background,
          toastTheme.warning.border,
          toastTheme.warning.text,
          "border"
        ),
        ...options,
      }),

    info: (message: string, options?: any) =>
      sonnerToast.info(message, {
        className: cn(
          toastTheme.info.background,
          toastTheme.info.border,
          toastTheme.info.text,
          "border"
        ),
        ...options,
      }),

    default: (message: string, options?: any) =>
      sonnerToast(message, {
        className: cn(
          toastTheme.default.background,
          toastTheme.default.border,
          toastTheme.default.text,
          "border"
        ),
        ...options,
      }),

    // Copy over other methods from sonnerToast
    dismiss: sonnerToast.dismiss,
    message: sonnerToast.message,
    promise: sonnerToast.promise,
    custom: sonnerToast.custom,
    loading: sonnerToast.loading,
  }
)

// Re-export types for convenience
export type { ToasterProps } from "sonner"

// Default export for backwards compatibility (deprecated - use ToastProvider instead)
export default ToastProvider
