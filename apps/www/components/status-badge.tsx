"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  label: string
  className?: string
}

export function StatusBadge({ label, className }: StatusBadgeProps) {
  // Helper function to get label style based on label text
  const getLabelStyle = (label: string) => {
    switch (label.toLowerCase()) {
      case "new":
        return "bg-[#adfa1d] text-[#000000]" // Bright green for "New"
      case "beta":
        return "bg-[#ff9800] text-white" // Orange for "Beta"
      case "updated":
        return "bg-[#2196f3] text-white" // Blue for "Updated"
      case "experimental":
        return "bg-[#9c27b0] text-white" // Purple for "Experimental"
      case "deprecated":
        return "bg-[#f44336] text-white" // Red for "Deprecated"
      default:
        return "bg-[#adfa1d] text-[#000000]" // Default is green
    }
  }

  return (
    <span
      className={cn(
        "ml-2 rounded-sm px-1.5 py-0.5 text-xs leading-none no-underline group-hover:no-underline",
        getLabelStyle(label),
        className
      )}
      style={{
        backgroundColor: getLabelStyle(label).includes('bg-[#adfa1d]') ? '#adfa1d' : 
                        getLabelStyle(label).includes('bg-[#ff9800]') ? '#ff9800' :
                        getLabelStyle(label).includes('bg-[#2196f3]') ? '#2196f3' :
                        getLabelStyle(label).includes('bg-[#9c27b0]') ? '#9c27b0' :
                        getLabelStyle(label).includes('bg-[#f44336]') ? '#f44336' : '#adfa1d'
      }}
    >
      {label}
    </span>
  )
}