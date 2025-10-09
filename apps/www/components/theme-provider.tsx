"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"

import { META_THEME_COLORS } from "@/lib/config"

function MetaThemeColorUpdater() {
  const { theme, resolvedTheme } = useTheme()

  React.useEffect(() => {
    // Update meta theme-color for iOS devices
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      const currentTheme = resolvedTheme || theme
      const color = currentTheme === "dark" ? META_THEME_COLORS.dark : META_THEME_COLORS.light
      metaThemeColor.setAttribute("content", color)
    }
  }, [theme, resolvedTheme])

  return null
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
      {...props}
    >
      {children}
      <MetaThemeColorUpdater />
    </NextThemesProvider>
  )
}
