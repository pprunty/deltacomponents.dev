"use client"

import { Suspense, useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { useTheme } from "next-themes"

import { getThemeBackgroundColor } from "@/hooks/use-meta-color"

import { useThemeConfig } from "./active-theme"

function ThemeMetaUpdaterInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { resolvedTheme } = useTheme()
  const { activeTheme } = useThemeConfig()

  // This effect runs on every navigation event
  useEffect(() => {
    // Skip if we don't have a theme yet
    if (!activeTheme || !resolvedTheme) return

    // Update the meta theme color
    const isDark = resolvedTheme === "dark"
    const bgColor = getThemeBackgroundColor(activeTheme, isDark)

    // Set the meta color
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", bgColor)
  }, [pathname, searchParams, activeTheme, resolvedTheme])

  // This component doesn't render anything
  return null
}

export function ThemeMetaUpdater() {
  return (
    <Suspense fallback={null}>
      <ThemeMetaUpdaterInner />
    </Suspense>
  )
}
