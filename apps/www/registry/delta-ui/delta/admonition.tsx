"use client"

import type React from "react"
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

const admonitionConfig = {
  note: {
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    borderColor: "border-blue-200 dark:border-blue-800",
    textColor: "text-blue-900 dark:text-blue-200",
    iconColor: "text-blue-600 dark:text-blue-400",
    icon: Info,
    selectionColor:
      "selection:bg-blue-200 selection:text-blue-900 dark:selection:bg-blue-800 dark:selection:text-blue-100",
    primaryButton: "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700",
  },
  tip: {
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    textColor: "text-emerald-900 dark:text-emerald-200",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    icon: Lightbulb,
    selectionColor:
      "selection:bg-emerald-200 selection:text-emerald-900 dark:selection:bg-emerald-800 dark:selection:text-emerald-100",
    primaryButton: "bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700",
  },
  info: {
    bgColor: "bg-slate-50 dark:bg-slate-950/30",
    borderColor: "border-slate-200 dark:border-slate-800",
    textColor: "text-slate-700 dark:text-slate-300",
    iconColor: "text-slate-500 dark:text-slate-400",
    icon: CircleAlert,
    selectionColor:
      "selection:bg-slate-200 selection:text-slate-900 dark:selection:bg-slate-800 dark:selection:text-slate-100",
    primaryButton: "bg-slate-600 text-white hover:bg-slate-700 dark:bg-slate-500 dark:hover:bg-slate-600",
  },
  warning: {
    bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
    borderColor: "border-yellow-300 dark:border-yellow-700",
    textColor: "text-yellow-900 dark:text-yellow-200",
    iconColor: "text-yellow-600 dark:text-yellow-400",
    icon: TriangleAlert,
    selectionColor:
      "selection:bg-yellow-200 selection:text-yellow-900 dark:selection:bg-yellow-800 dark:selection:text-yellow-100",
    primaryButton: "bg-yellow-600 text-white hover:bg-yellow-700 dark:bg-yellow-600 dark:hover:bg-yellow-700",
  },
  danger: {
    bgColor: "bg-red-50 dark:bg-red-950/30",
    borderColor: "border-red-200 dark:border-red-800",
    textColor: "text-red-900 dark:text-red-200",
    iconColor: "text-red-600 dark:text-red-400",
    icon: CircleX,
    selectionColor:
      "selection:bg-red-200 selection:text-red-900 dark:selection:bg-red-800 dark:selection:text-red-100",
    primaryButton: "bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700",
  },
  success: {
    bgColor: "bg-green-50 dark:bg-green-950/30",
    borderColor: "border-green-200 dark:border-green-800",
    textColor: "text-green-900 dark:text-green-200",
    iconColor: "text-green-600 dark:text-green-400",
    icon: CircleCheck,
    selectionColor:
      "selection:bg-green-200 selection:text-green-900 dark:selection:bg-green-800 dark:selection:text-green-100",
    primaryButton: "bg-green-600 text-white hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700",
  },
  caution: {
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
    borderColor: "border-orange-200 dark:border-orange-700",
    textColor: "text-orange-900 dark:text-orange-200",
    iconColor: "text-orange-600 dark:text-orange-400",
    icon: ShieldAlert,
    selectionColor:
      "selection:bg-orange-200 selection:text-orange-900 dark:selection:bg-orange-800 dark:selection:text-orange-100",
    primaryButton: "bg-orange-600 text-white hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700",
  },
}

const sizeVariants = {
  sm: {
    container: "p-3",
    title: "text-sm",
    content: "text-sm",
    icon: "h-4 w-4",
  },
  default: {
    container: "p-4",
    title: "text-base",
    content: "text-base",
    icon: "h-5 w-5",
  },
  lg: {
    container: "p-5",
    title: "text-lg",
    content: "text-lg",
    icon: "h-5 w-5",
  },
}

interface AdmonitionProps {
  type?: keyof typeof admonitionConfig
  title?: string
  children: React.ReactNode
  icon?: React.ComponentType<{ className?: string }>
  dismissible?: boolean
  dismissKey?: string
  collapsible?: boolean
  defaultCollapsed?: boolean
  size?: keyof typeof sizeVariants
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
  size = "default",
}: AdmonitionProps) {
  const config = admonitionConfig[type]
  const sizeConfig = sizeVariants[size]
  const Icon = CustomIcon || config.icon

  const [isDismissed, setIsDismissed] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)

  useEffect(() => {
    if (dismissible && dismissKey) {
      if (localStorage.getItem(`admonition-dismissed-${dismissKey}`) === "true") {
        setIsDismissed(true)
      }
    }
  }, [dismissible, dismissKey])

  if (isDismissed) return null

  return (
    <div
      className={cn(
        "rounded-xl border",
        sizeConfig.container,
        config.bgColor,
        config.borderColor,
        config.selectionColor,
      )}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className={cn(
            config.iconColor,
            "flex",
          )}
        >
          <Icon className={cn(sizeConfig.icon, "h-[1lh]", "leading-[1.5]", sizeConfig.title)} />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1 leading-[1.5]">
          {title && (
            <div
              className={cn(
                config.textColor,
                sizeConfig.title,
                "font-medium [text-box-trim:trim-start]",
              )}
            >
              {title}
            </div>
          )}

          {!isCollapsed && (
            <div
              className={cn(
                config.textColor,
                sizeConfig.content,
                title && "mt-1",
                "[text-box-trim:trim-start] [&_*]:!text-inherit",
              )}
            >
              {children}
            </div>
          )}
        </div>

        {(collapsible || dismissible) && (
          <div className="flex items-start gap-1">
            {collapsible && (
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className={cn(
                  config.iconColor,
                  "rounded p-1 transition-transform hover:bg-black/5 dark:hover:bg-white/5",
                  isCollapsed && "rotate-180",
                )}
              >
                <ChevronDown className="h-5 w-5" />
              </button>
            )}
            {dismissible && (
              <button
                onClick={() => {
                  setIsDismissed(true)
                  dismissKey &&
                    localStorage.setItem(`admonition-dismissed-${dismissKey}`, "true")
                }}
                className={cn(
                  config.iconColor,
                  "rounded p-1 hover:bg-black/5 dark:hover:bg-white/5",
                )}
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}