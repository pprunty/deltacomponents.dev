import { Index } from "@/__registry__"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { componentToCategory } from "@/config/docs"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

/**
 * Determines the correct route category for a component based on the docs configuration
 * @param component The component name to check
 * @returns The appropriate URL category for routing
 */
export function getComponentCategory(component: string): string {
  // First check our pre-computed mapping for the fastest lookup
  if (componentToCategory[component]) {
    return componentToCategory[component]
  }

  // If not in the mapping, fallback to file path and type-based detection
  const componentData = Index[component]
  if (!componentData) return "components"

  // Extract the file path for directory-based categorization
  const filePath = componentData.files?.[0]?.path || ""

  // Check for special component directories
  if (filePath.includes("landing-page/")) {
    return "landing-page"
  }

  if (filePath.includes("media/")) {
    return "media"
  }

  if (filePath.includes("inputs/")) {
    return "inputs"
  }

  if (filePath.includes("animations/")) {
    return "animations"
  }

  if (filePath.includes("blocks/")) {
    return "blocks"
  }

  if (filePath.includes("hooks/")) {
    return "hooks"
  }

  // Type-based detection as final fallback
  const typeIdentifier = componentData.type.split(":")[1]

  switch (typeIdentifier) {
    case "block":
      return "blocks"
    case "hook":
      return "hooks"
    case "animation":
      return "animations"
    case "component":
      // Input components check
      if (component.includes("input")) {
        return "inputs"
      }
      return "components"
    default:
      return "components" // Default fallback
  }
}
