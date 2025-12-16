"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import {
  Info,
  Lightbulb,
  CircleAlert,
  TriangleAlert,
  CircleX,
  CircleCheck,
  ShieldAlert,
  X,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"

// --- Types ---
export interface AdmonitionAction {
  label: string
  onClick: () => void
  variant?: "primary" | "secondary"
}

// --- Configuration ---
const admonitionConfig = {
  note: {
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    borderColor: "border-blue-200 dark:border-blue-800",
    textColor: "text-blue-900 dark:text-blue-200",
    iconColor: "text-blue-600 dark:text-blue-400",
    icon: Info,
    selectionColor:
      "selection:bg-blue-200 selection:text-blue-900 dark:selection:bg-blue-800 dark:selection:text-blue-100",
    primaryButton:
      "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400",
    secondaryButton:
      "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:hover:bg-blue-900",
  },
  tip: {
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    textColor: "text-emerald-900 dark:text-emerald-200",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    icon: Lightbulb,
    selectionColor:
      "selection:bg-emerald-200 selection:text-emerald-900 dark:selection:bg-emerald-800 dark:selection:text-emerald-100",
    primaryButton:
      "bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400",
    secondaryButton:
      "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-300 dark:hover:bg-emerald-900",
  },
  info: {
    bgColor: "bg-slate-50 dark:bg-slate-950/30",
    borderColor: "border-slate-200 dark:border-slate-800",
    textColor: "text-slate-700 dark:text-slate-300",
    iconColor: "text-slate-500 dark:text-slate-400",
    icon: CircleAlert,
    selectionColor:
      "selection:bg-slate-200 selection:text-slate-900 dark:selection:bg-slate-800 dark:selection:text-slate-100",
    primaryButton:
      "bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200",
    secondaryButton:
      "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
  },
  warning: {
    bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
    borderColor: "border-yellow-300 dark:border-yellow-700",
    textColor: "text-yellow-900 dark:text-yellow-200",
    iconColor: "text-yellow-600 dark:text-yellow-400",
    icon: TriangleAlert,
    selectionColor:
      "selection:bg-yellow-200 selection:text-yellow-900 dark:selection:bg-yellow-800 dark:selection:text-yellow-100",
    primaryButton:
      "bg-yellow-600 text-white hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-400",
    secondaryButton:
      "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:hover:bg-yellow-900",
  },
  danger: {
    bgColor: "bg-red-50 dark:bg-red-950/30",
    borderColor: "border-red-200 dark:border-red-800",
    textColor: "text-red-900 dark:text-red-200",
    iconColor: "text-red-600 dark:text-red-400",
    icon: CircleX,
    selectionColor:
      "selection:bg-red-200 selection:text-red-900 dark:selection:bg-red-800 dark:selection:text-red-100",
    primaryButton:
      "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400",
    secondaryButton:
      "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-900",
  },
  success: {
    bgColor: "bg-green-50 dark:bg-green-950/30",
    borderColor: "border-green-200 dark:border-green-800",
    textColor: "text-green-900 dark:text-green-200",
    iconColor: "text-green-600 dark:text-green-400",
    icon: CircleCheck,
    selectionColor:
      "selection:bg-green-200 selection:text-green-900 dark:selection:bg-green-800 dark:selection:text-green-100",
    primaryButton:
      "bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-400",
    secondaryButton:
      "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-300 dark:hover:bg-green-900",
  },
  caution: {
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
    borderColor: "border-orange-200 dark:border-orange-700",
    textColor: "text-orange-900 dark:text-orange-200",
    iconColor: "text-orange-600 dark:text-orange-400",
    icon: ShieldAlert,
    selectionColor:
      "selection:bg-orange-200 selection:text-orange-900 dark:selection:bg-orange-800 dark:selection:text-orange-100",
    primaryButton:
      "bg-orange-600 text-white hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-400",
    secondaryButton:
      "bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-900/50 dark:text-orange-300 dark:hover:bg-orange-900",
  },
}

const sizeVariants = {
  sm: {
    container: "p-3",
    title: "text-sm",
    content: "text-sm mt-1",
    icon: "h-4 w-4",
    button: "text-xs px-2.5 py-1.5",
  },
  default: {
    container: "p-4",
    title: "text-base",
    content: "text-base mt-2",
    icon: "h-5 w-5",
    button: "text-sm px-3 py-2",
  },
  lg: {
    container: "p-5",
    title: "text-lg",
    content: "text-lg mt-3",
    icon: "h-6 w-6",
    button: "text-base px-4 py-2.5",
  },
}

interface AdmonitionProps {
  type?: keyof typeof admonitionConfig
  title?: string
  children?: React.ReactNode
  icon?: React.ComponentType<{ className?: string }>
  dismissible?: boolean
  dismissKey?: string
  collapsible?: boolean
  defaultCollapsed?: boolean
  actions?: AdmonitionAction[]
  size?: keyof typeof sizeVariants
  className?: string
}

export function Admonition({
  type = "note",
  title,
  children,
  icon: CustomIcon,
  dismissible = false,
  dismissKey,
  collapsible = false,
  defaultCollapsed = false,
  actions,
  size = "default",
  className,
}: AdmonitionProps) {
  const config = admonitionConfig[type]
  const sizeConfig = sizeVariants[size]
  const Icon = CustomIcon || config.icon

  // State
  const [isDismissed, setIsDismissed] = useState(false)
  // If collapsible, default to collapsed state, otherwise always expanded.
  const [isCollapsed, setIsCollapsed] = useState(
    collapsible ? defaultCollapsed : false
  )

  useEffect(() => {
    if (dismissible && dismissKey) {
      if (localStorage.getItem(`admonition-dismissed-${dismissKey}`) === "true") {
        setIsDismissed(true)
      }
    }
  }, [dismissible, dismissKey])

  if (isDismissed) return null

  const hasControls = collapsible || dismissible

  return (
    <div
      className={cn(
        "rounded-xl border",
        sizeConfig.container,
        config.bgColor,
        config.borderColor,
        config.selectionColor,
        className
      )}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={cn(config.iconColor, "flex shrink-0")}>
          <Icon
            className={cn(
              sizeConfig.icon,
              // These classes align the icon with the cap-height of the font
              "h-[1lh] leading-[1.5]"
            )}
          />
        </div>

        {/* Content Container */}
        <div className="min-w-0 flex-1 leading-[1.5]">
          {/* Header (Title + Controls) */}
          <div className="flex items-start justify-between gap-2">
            {title && (
              <div
                className={cn(
                  config.textColor,
                  sizeConfig.title,
                  "font-medium [text-box-trim:trim-start]"
                )}
              >
                {title}
              </div>
            )}

            {/* Controls (Top Right) */}
            {hasControls && (
              <div
                className={cn(
                  "flex items-center gap-1 shrink-0",
                  // Adjust control alignment based on presence of title
                  title ? "-mt-0.5" : ""
                )}
              >
                {collapsible && (
                  <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    aria-label={isCollapsed ? "Expand" : "Collapse"}
                    className={cn(
                      config.iconColor,
                      "rounded p-1 transition-transform hover:bg-black/5 dark:hover:bg-white/5",
                      isCollapsed && "rotate-180"
                    )}
                  >
                    <ChevronDown className={sizeConfig.icon} />
                  </button>
                )}
                {dismissible && (
                  <button
                    onClick={() => {
                      setIsDismissed(true)
                      dismissKey &&
                        localStorage.setItem(
                          `admonition-dismissed-${dismissKey}`,
                          "true"
                        )
                    }}
                    aria-label="Dismiss"
                    className={cn(
                      config.iconColor,
                      "rounded p-1 hover:bg-black/5 dark:hover:bg-white/5"
                    )}
                  >
                    <X className={sizeConfig.icon} />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Body Content */}
          {children && (
            <div
              className={cn(
                config.textColor,
                sizeConfig.content,
                "[text-box-trim:trim-start] [&_*]:!text-inherit",
                // CSS Line Clamp for collapsing behavior
                collapsible && isCollapsed ? "line-clamp-2" : ""
              )}
            >
              {children}
            </div>
          )}

          {/* Actions Footer */}
          {actions && actions.length > 0 && !isCollapsed && (
            <div
              className={cn("flex flex-wrap items-center gap-2", sizeConfig.content)}
            >
              {actions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.onClick}
                  className={cn(
                    "inline-flex items-center justify-center font-medium transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                    sizeConfig.button,
                    action.variant === "secondary"
                      ? config.secondaryButton
                      : config.primaryButton
                  )}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}