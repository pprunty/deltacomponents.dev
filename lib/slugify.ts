import type React from "react"
/**
 * Converts a string to a URL-friendly slug
 * - Converts to lowercase
 * - Removes special characters
 * - Replaces spaces with hyphens
 * - Removes consecutive hyphens
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w-]+/g, "") // Remove all non-word characters except hyphens
    .replace(/--+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-+/, "") // Trim hyphens from start
    .replace(/-+$/, "") // Trim hyphens from end
}

/**
 * Extracts text content from React children
 */
export function extractTextFromChildren(children: React.ReactNode): string {
  if (typeof children === "string") {
    return children
  }

  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join("")
  }

  // Check if children is a React element with props.children
  if (children && 
      typeof children === "object" && 
      "props" in children && 
      children.props && 
      typeof children.props === "object" &&
      "children" in children.props) {
    return extractTextFromChildren(children.props.children as React.ReactNode)
  }

  return ""
}
