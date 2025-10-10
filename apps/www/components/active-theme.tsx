"use client"

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

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
    // Set data-theme attribute on html element instead of classes on body
    document.documentElement.setAttribute('data-theme', activeTheme)
    
    // Update meta theme-color for mobile browsers
    const updateMetaThemeColor = () => {
      const backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--background').trim()
      
      let themeColor = backgroundColor
      if (backgroundColor.startsWith('oklch(')) {
        // For oklch colors, create a temporary element to get computed color
        const testDiv = document.createElement('div')
        testDiv.style.backgroundColor = backgroundColor
        testDiv.style.visibility = 'hidden'
        testDiv.style.position = 'absolute'
        document.body.appendChild(testDiv)
        const computedColor = getComputedStyle(testDiv).backgroundColor
        document.body.removeChild(testDiv)
        
        // Convert rgb to hex
        if (computedColor.startsWith('rgb')) {
          const rgbValues = computedColor.match(/\d+/g)
          if (rgbValues && rgbValues.length >= 3) {
            themeColor = '#' + rgbValues.slice(0, 3).map(x => {
              const hex = parseInt(x).toString(16)
              return hex.length === 1 ? '0' + hex : hex
            }).join('')
          }
        }
      }

      // Update or create meta theme-color tag
      let metaThemeColor = document.querySelector('meta[name="theme-color"]')
      if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta')
        metaThemeColor.setAttribute('name', 'theme-color')
        document.head.appendChild(metaThemeColor)
      }
      metaThemeColor.setAttribute('content', themeColor)
    }

    // Update meta theme color after a brief delay to allow CSS to apply
    const timeoutId = setTimeout(updateMetaThemeColor, 100)
    return () => clearTimeout(timeoutId)
  }, [activeTheme])

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
    <ThemeContext.Provider value={{ activeTheme, setActiveTheme: handleSetActiveTheme }}>
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
