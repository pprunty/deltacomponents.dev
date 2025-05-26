"use client"

import React, { useState } from "react"

interface RetroButtonProps {
  children?: React.ReactNode
  icon?: React.ComponentType<{ className?: string }>
  onClick?: () => void
  disabled?: boolean
  size?: "sm" | "md" | "lg"
  variant?: "default" | "primary" | "secondary"
  className?: string
}

export default function RetroButton({
  children,
  icon: Icon,
  onClick,
  disabled = false,
  size = "md",
  variant = "default",
  className = "",
}: RetroButtonProps) {
  const [isPressed, setIsPressed] = useState(false)

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-base",
  }

  const variantClasses = {
    default: {
      bg: "bg-gray-200 dark:bg-gray-700",
      border: "border-gray-400 dark:border-gray-500",
      text: "text-gray-900 dark:text-gray-100",
      shadow:
        "shadow-[inset_1px_1px_0px_0px_rgb(255,255,255),inset_-1px_-1px_0px_0px_rgb(128,128,128)] dark:shadow-[inset_1px_1px_0px_0px_rgb(156,163,175),inset_-1px_-1px_0px_0px_rgb(55,65,81)]",
    },
    primary: {
      bg: "bg-blue-200 dark:bg-blue-800",
      border: "border-blue-400 dark:border-blue-600",
      text: "text-blue-900 dark:text-blue-100",
      shadow:
        "shadow-[inset_1px_1px_0px_0px_rgb(219,234,254),inset_-1px_-1px_0px_0px_rgb(59,130,246)] dark:shadow-[inset_1px_1px_0px_0px_rgb(147,197,253),inset_-1px_-1px_0px_0px_rgb(30,64,175)]",
    },
    secondary: {
      bg: "bg-slate-200 dark:bg-slate-700",
      border: "border-slate-400 dark:border-slate-500",
      text: "text-slate-900 dark:text-slate-100",
      shadow:
        "shadow-[inset_1px_1px_0px_0px_rgb(248,250,252),inset_-1px_-1px_0px_0px_rgb(100,116,139)] dark:shadow-[inset_1px_1px_0px_0px_rgb(148,163,184),inset_-1px_-1px_0px_0px_rgb(51,65,85)]",
    },
  }

  const currentVariant = variantClasses[variant]

  const handleMouseDown = () => {
    if (!disabled) {
      setIsPressed(true)
    }
  }

  const handleMouseUp = () => {
    setIsPressed(false)
  }

  const handleMouseLeave = () => {
    setIsPressed(false)
  }

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick()
    }
  }

  return (
    <button
      className={`
        ${sizeClasses[size]}
        ${currentVariant.bg}
        ${currentVariant.border}
        ${currentVariant.text}
        border-2
        ${
          isPressed
            ? "shadow-[inset_-1px_-1px_0px_0px_rgb(255,255,255),inset_1px_1px_0px_0px_rgb(128,128,128)] dark:shadow-[inset_-1px_-1px_0px_0px_rgb(156,163,175),inset_1px_1px_0px_0px_rgb(55,65,81)] translate-x-[1px] translate-y-[1px]"
            : currentVariant.shadow
        }
        ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:brightness-105 active:brightness-95"
        }
        flex items-center justify-center
        font-medium
        select-none
        transition-all duration-75
        ${className}
      `.trim()}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      disabled={disabled}
    >
      {Icon && (
        <Icon
          className={`
          ${size === "sm" ? "w-3 h-3" : size === "md" ? "w-4 h-4" : "w-5 h-5"}
          ${children ? "mr-1" : ""}
        `}
        />
      )}
      {children}
    </button>
  )
}
