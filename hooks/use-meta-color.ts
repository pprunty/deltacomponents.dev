import * as React from "react"
import { useTheme } from "next-themes"

import { META_THEME_COLORS } from "@/config/site"

// Theme background colors for each theme in light and dark mode
const themeBackgroundColors: Record<string, { light: string; dark: string }> = {
  "retro-arcade": { light: "#f7f8fa", dark: "#212936" },
  "kodama-grove": { light: "#f1f5f2", dark: "#353637" },
  claude: { light: "#f3f2eb", dark: "#2c2c26" },
  claymorphism: { light: "#f5f3f7", dark: "#1c1c1f" },
  "vintage-paper": { light: "#fffbf0", dark: "#282420" },
  perpetuity: { light: "#f2fbfc", dark: "#1a1d28" },
  nature: { light: "#f9fcf5", dark: "#1e2a1f" },
  dublin: { light: "#fcfcfc", dark: "#1b1c1b" },
}

export function useMetaColor() {
  const { resolvedTheme } = useTheme()

  const metaColor = React.useMemo(() => {
    return resolvedTheme !== "dark"
      ? META_THEME_COLORS.light
      : META_THEME_COLORS.dark
  }, [resolvedTheme])

  const setMetaColor = React.useCallback((color: string) => {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", color)
  }, [])

  return {
    metaColor,
    setMetaColor,
  }
}

// Simple function to get the background color for a theme and mode
export function getThemeBackgroundColor(
  themeName: string,
  isDark: boolean
): string {
  const mode = isDark ? "dark" : "light"
  return (
    themeBackgroundColors[themeName]?.[mode] ||
    (isDark ? META_THEME_COLORS.dark : META_THEME_COLORS.light)
  )
}
