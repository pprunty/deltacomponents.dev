"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, toast as sonnerToast } from "sonner"

import { cn } from "@/lib/utils"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

// Toast theme configuration
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
}

// Enhanced toast function with themed methods
const toast = Object.assign(
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

    // Copy over other methods from sonnerToast
    dismiss: sonnerToast.dismiss,
    message: sonnerToast.message,
    promise: sonnerToast.promise,
    custom: sonnerToast.custom,
    loading: sonnerToast.loading,
  }
)

export { Toaster, toast }
