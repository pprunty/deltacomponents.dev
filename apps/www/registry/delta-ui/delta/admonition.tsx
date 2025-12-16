import type React from "react"
import { AlertCircle, AlertTriangle, CheckCircle, Info, Lightbulb, XCircle } from "lucide-react"

import { cn } from "@/lib/utils"

const admonitionConfig = {
  note: {
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    borderColor: "border-blue-200 dark:border-blue-800",
    textColor: "text-blue-700 dark:text-blue-300",
    iconColor: "text-blue-600 dark:text-blue-400",
    icon: Info,
    selectionColor:
      "selection:bg-blue-200 selection:text-blue-900 dark:selection:bg-blue-800 dark:selection:text-blue-100",
  },
  tip: {
    bgColor: "bg-green-50 dark:bg-green-950/30",
    borderColor: "border-green-200 dark:border-green-800",
    textColor: "text-green-700 dark:text-green-300",
    iconColor: "text-green-600 dark:text-green-400",
    icon: Lightbulb,
    selectionColor:
      "selection:bg-green-200 selection:text-green-900 dark:selection:bg-green-800 dark:selection:text-green-100",
  },
  info: {
    bgColor: "bg-gray-50 dark:bg-gray-950/30",
    borderColor: "border-gray-200 dark:border-gray-800",
    textColor: "text-gray-700 dark:text-gray-300",
    iconColor: "text-gray-600 dark:text-gray-400",
    icon: Info,
    selectionColor:
      "selection:bg-gray-200 selection:text-gray-900 dark:selection:bg-gray-800 dark:selection:text-gray-100",
  },
  warning: {
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    borderColor: "border-amber-200 dark:border-amber-700",
    textColor: "text-amber-700 dark:text-amber-300",
    iconColor: "text-amber-600 dark:text-amber-400",
    icon: AlertTriangle,
    selectionColor:
      "selection:bg-amber-200 selection:text-amber-900 dark:selection:bg-amber-800 dark:selection:text-amber-100",
  },
  danger: {
    bgColor: "bg-red-50 dark:bg-red-950/30",
    borderColor: "border-red-200 dark:border-red-800",
    textColor: "text-red-700 dark:text-red-300",
    iconColor: "text-red-600 dark:text-red-400",
    icon: XCircle,
    selectionColor: "selection:bg-red-200 selection:text-red-900 dark:selection:bg-red-800 dark:selection:text-red-100",
  },
  success: {
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    textColor: "text-emerald-700 dark:text-emerald-300",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    icon: CheckCircle,
    selectionColor:
      "selection:bg-emerald-200 selection:text-emerald-900 dark:selection:bg-emerald-800 dark:selection:text-emerald-100",
  },
  caution: {
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
    borderColor: "border-orange-200 dark:border-orange-700",
    textColor: "text-orange-700 dark:text-orange-300",
    iconColor: "text-orange-600 dark:text-orange-400",
    icon: AlertCircle,
    selectionColor:
      "selection:bg-orange-200 selection:text-orange-900 dark:selection:bg-orange-800 dark:selection:text-orange-100",
  },
}

interface AdmonitionProps {
  type?: keyof typeof admonitionConfig
  title?: string
  children: React.ReactNode
  icon?: React.ComponentType<{ className?: string }>
  className?: string
}

export function Admonition({ type = "note", title, children, icon: CustomIcon, className = "" }: AdmonitionProps) {
  const config = admonitionConfig[type]
  const IconComponent = CustomIcon || config.icon

  return (
    <div
      data-slot="admonition"
      className={cn(
        "rounded-md border p-4 text-base",
        config.bgColor,
        config.borderColor,
        config.selectionColor,
        className,
      )}
    >
      <div className="flex gap-3">
        <div className={`${config.iconColor} mt-0.5 flex-shrink-0`}>
          <IconComponent className="h-5 w-5" style={{ lineHeight: "1lh" }} />
        </div>
        <div className="min-w-0 flex-1">
          {title && <div className={cn(config.textColor, "mb-1 text-base font-medium")}>{title}</div>}
          <div className={cn(config.textColor, "leading-relaxed")}>{children}</div>
        </div>
      </div>
    </div>
  )
}
