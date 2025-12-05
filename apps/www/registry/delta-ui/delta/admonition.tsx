import React from "react"
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Info,
  Lightbulb,
  XCircle,
} from "lucide-react"

import { cn } from "@/lib/utils"

const admonitionConfig = {
  note: {
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    borderColor: "border-blue-200 dark:border-blue-800",
    textColor: "text-blue-700 dark:text-blue-300",
    iconColor: "text-blue-600 dark:text-blue-400",
    icon: Info,
  },
  tip: {
    bgColor: "bg-green-50 dark:bg-green-950/30",
    borderColor: "border-green-200 dark:border-green-800",
    textColor: "text-green-700 dark:text-green-300",
    iconColor: "text-green-600 dark:text-green-400",
    icon: Lightbulb,
  },
  info: {
    bgColor: "bg-cyan-50 dark:bg-cyan-950/30",
    borderColor: "border-cyan-200 dark:border-cyan-800",
    textColor: "text-cyan-700 dark:text-cyan-300",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    icon: Info,
  },
  warning: {
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    borderColor: "border-amber-200 dark:border-amber-700",
    textColor: "text-amber-700 dark:text-amber-300",
    iconColor: "text-amber-600 dark:text-amber-400",
    icon: AlertTriangle,
  },
  danger: {
    bgColor: "bg-red-50 dark:bg-red-950/30",
    borderColor: "border-red-200 dark:border-red-800",
    textColor: "text-red-700 dark:text-red-300",
    iconColor: "text-red-600 dark:text-red-400",
    icon: XCircle,
  },
  success: {
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    textColor: "text-emerald-700 dark:text-emerald-300",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    icon: CheckCircle,
  },
  caution: {
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
    borderColor: "border-orange-200 dark:border-orange-700",
    textColor: "text-orange-700 dark:text-orange-300",
    iconColor: "text-orange-600 dark:text-orange-400",
    icon: AlertCircle,
  },
}

interface AdmonitionProps {
  type?: keyof typeof admonitionConfig
  title?: string
  children: React.ReactNode
  icon?: React.ComponentType<{ className?: string }>
  className?: string
}

export function Admonition({
  type = "note",
  title,
  children,
  icon: CustomIcon,
  className = "",
}: AdmonitionProps) {
  const config = admonitionConfig[type]
  const IconComponent = CustomIcon || config.icon

  return (
    <div
      className={cn(
        "rounded-lg border p-4 text-base",
        config.bgColor,
        config.borderColor,
        className
      )}
    >
      <div className="flex gap-3">
        <div className={`${config.iconColor} mt-0.5 flex-shrink-0`}>
          <IconComponent className="h-5 w-5" style={{ lineHeight: "1lh" }} />
        </div>
        <div className="min-w-0 flex-1">
          {title && (
            <div className={cn(config.textColor, "mb-1 font-semibold")}>
              {title}
            </div>
          )}
          <div className={cn(config.textColor, "leading-relaxed")}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
