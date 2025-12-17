"use client"

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import { useTheme } from "next-themes"

import { THEME_META_COLORS } from "@/lib/config"

const DEFAULT_THEME = "default"
const THEME_STORAGE_KEY = "active-theme"

type ThemeContextType = {
  activeTheme: string
  setActiveTheme: (theme: string) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ActiveThemeProvider({
  children,
  initialTheme,
}: {
  children: ReactNode
  initialTheme?: string
}) {
  const { resolvedTheme } = useTheme()
  const [activeTheme, setActiveTheme] = useState<string>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(THEME_STORAGE_KEY)
        // Also check if data-theme is already set on HTML element
        const currentDataTheme =
          document.documentElement.getAttribute("data-theme")
        return stored || currentDataTheme || initialTheme || DEFAULT_THEME
      } catch {
        return initialTheme || DEFAULT_THEME
      }
    }
    return initialTheme || DEFAULT_THEME
  })

  useEffect(() => {
    // Only update data-theme attribute if it's different from current
    const currentTheme = document.documentElement.getAttribute("data-theme")
    if (currentTheme !== activeTheme) {
      document.documentElement.setAttribute("data-theme", activeTheme)
    }

    // Update meta theme-color using pre-calculated hex values
    const updateMetaThemeColor = () => {
      const themeColors =
        THEME_META_COLORS[activeTheme as keyof typeof THEME_META_COLORS]

      if (themeColors && resolvedTheme) {
        const isDark = resolvedTheme === "dark"
        const themeColor = isDark ? themeColors.dark : themeColors.light

        // Update or create meta theme-color tag
        let metaThemeColor = document.querySelector('meta[name="theme-color"]')
        if (!metaThemeColor) {
          metaThemeColor = document.createElement("meta")
          metaThemeColor.setAttribute("name", "theme-color")
          document.head.appendChild(metaThemeColor)
        }
        metaThemeColor.setAttribute("content", themeColor)

        // Debug logging in development
        if (process.env.NODE_ENV === "development") {
          console.log(
            `[ActiveTheme] Updated meta theme-color: ${themeColor} (theme: ${activeTheme}, mode: ${resolvedTheme})`
          )
        }
      } else {
        // Fallback to default theme if current theme not found
        if (!themeColors && activeTheme !== DEFAULT_THEME) {
          if (process.env.NODE_ENV === "development") {
            console.warn(
              `[ActiveTheme] No colors found for theme: ${activeTheme}, falling back to ${DEFAULT_THEME}`
            )
          }
          setActiveTheme(DEFAULT_THEME)
          return
        }

        if (process.env.NODE_ENV === "development") {
          console.warn(
            `[ActiveTheme] No colors found for theme: ${activeTheme} or resolvedTheme not ready: ${resolvedTheme}`
          )
        }
      }
    }

    // Update immediately and on theme change
    updateMetaThemeColor()
  }, [activeTheme, resolvedTheme])

  const handleSetActiveTheme = (theme: string) => {
    setActiveTheme(theme)
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(THEME_STORAGE_KEY, theme)
      } catch {
        // Ignore localStorage errors
      }
    }
  }

  return (
    <ThemeContext.Provider
      value={{ activeTheme, setActiveTheme: handleSetActiveTheme }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeConfig() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useThemeConfig must be used within an ActiveThemeProvider")
  }
  return context
}
