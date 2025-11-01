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

const DEFAULT_THEME = "kerry"
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
        return stored || initialTheme || DEFAULT_THEME
      } catch {
        return initialTheme || DEFAULT_THEME
      }
    }
    return initialTheme || DEFAULT_THEME
  })

  useEffect(() => {
    // Set data-theme attribute on html element
    document.documentElement.setAttribute("data-theme", activeTheme)

    // Update meta theme-color using pre-calculated hex values
    const updateMetaThemeColor = () => {
      const themeColors =
        THEME_META_COLORS[activeTheme as keyof typeof THEME_META_COLORS]

      if (themeColors) {
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
