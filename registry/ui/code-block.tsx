"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import { getHighlighter } from "shikiji"
import type { Highlighter, BundledTheme } from "shikiji"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { ClipboardText, Check, CaretDown, CaretUp } from "@phosphor-icons/react"
import "./code-block.css"

// Define theme mapping
type ThemeOption = "github" | "vitesse" | "gruvbox" | "plastic" | "default"

// Map theme options to actual Shikiji theme names
const themeMapping: Record<ThemeOption, { light: BundledTheme; dark: BundledTheme }> = {
  default: { light: "github-light", dark: "github-dark" },
  github: { light: "github-light", dark: "github-dark" },
  vitesse: { light: "vitesse-light", dark: "vitesse-dark" },
  // Gruvbox isn't in the list, using similar themes
  gruvbox: { light: "solarized-light", dark: "material-theme-darker" },
  // Plastic isn't in the list, using similar dark themes
  plastic: { light: "light-plus", dark: "material-theme" },
}

// Get all unique theme names for loading
const allThemes = Array.from(
  new Set(
    Object.values(themeMapping).flatMap(({ light, dark }) => [light, dark])
  )
) as BundledTheme[]

// Cache key generator
const getCacheKey = (code: string, language: string, theme: BundledTheme) =>
  `code-block-${btoa(code)}-${language}-${theme}`

export interface CodeBlockProps {
  code: string
  language?: string
  showLineNumbers?: boolean
  className?: string
  highlightLines?: number[]
  caption?: string
  maxHeight?: string
  showCopyButton?: boolean
  showExpandButton?: boolean
  theme?: ThemeOption
  border?: boolean
}

export default function CodeBlock({
  code,
  language = "typescript",
  showLineNumbers = false,
  className,
  highlightLines = [],
  caption,
  maxHeight = "300px",
  showCopyButton = true,
  showExpandButton = true,
  theme = "default",
  border = true,
}: CodeBlockProps) {
  const [highlighter, setHighlighter] = useState<Highlighter | null>(null)
  const [highlightedCode, setHighlightedCode] = useState<string>("")
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [contentOverflows, setContentOverflows] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const contentRef = useRef<HTMLDivElement>(null)
  const [currentTheme, setCurrentTheme] = useState<BundledTheme>("github-light")

  const { resolvedTheme } = useTheme()

  // Initialize the highlighter
  useEffect(() => {
    const initHighlighter = async () => {
      try {
        setIsLoading(true)
        const hl = await getHighlighter({
          themes: allThemes,
          langs: [language as string],
        })
        
        // Load all themes explicitly
        await Promise.all(
          allThemes.map(theme => hl.loadTheme(theme))
        )
        
        setHighlighter(hl)
      } catch (error) {
        console.error("Failed to initialize highlighter:", error)
      }
    }

    initHighlighter()
  }, [language])

  // Update the currentTheme when the theme changes
  useEffect(() => {
    if (!mounted) return
    const isDark = resolvedTheme === "dark"
    const selectedTheme = themeMapping[theme] || themeMapping.default
    setCurrentTheme(isDark ? selectedTheme.dark : selectedTheme.light)
  }, [resolvedTheme, mounted, theme])

  // Handle theme changes and code highlighting with caching
  useEffect(() => {
    if (!highlighter || !mounted) return

    try {
      setIsLoading(true)

      // Generate cache key
      const cacheKey = getCacheKey(code, language, currentTheme)

      // Try to get from cache
      const cachedHtml = localStorage.getItem(cacheKey)

      if (cachedHtml) {
        setHighlightedCode(cachedHtml)
        setIsLoading(false)
        return
      }

      // If not in cache, generate and cache it
      const html = highlighter.codeToHtml(code, {
        lang: language as string,
        theme: currentTheme,
      })

      setHighlightedCode(html)
      localStorage.setItem(cacheKey, html)
      setIsLoading(false)
    } catch (error) {
      console.error("Error highlighting code:", error)
      setHighlightedCode(`<pre>${code}</pre>`)
      setIsLoading(false)
    }
  }, [highlighter, code, language, mounted, currentTheme])

  // Check if content overflows the maxHeight
  useEffect(() => {
    if (!contentRef.current || !mounted) return

    const checkOverflow = () => {
      const element = contentRef.current
      if (!element) return

      // Convert maxHeight to pixels for comparison
      let maxHeightPx = 0
      if (maxHeight.endsWith("px")) {
        maxHeightPx = Number.parseInt(maxHeight, 10)
      } else if (maxHeight.endsWith("rem")) {
        const remValue = Number.parseInt(maxHeight, 10)
        const rootFontSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize)
        maxHeightPx = remValue * rootFontSize
      } else if (maxHeight.endsWith("em")) {
        const emValue = Number.parseInt(maxHeight, 10)
        const parentFontSize = Number.parseFloat(getComputedStyle(element.parentElement || document.body).fontSize)
        maxHeightPx = emValue * parentFontSize
      } else if (maxHeight.endsWith("vh")) {
        const vhValue = Number.parseInt(maxHeight, 10)
        maxHeightPx = (vhValue / 100) * window.innerHeight
      } else {
        // Default fallback
        maxHeightPx = Number.parseInt(maxHeight, 10) || 300
      }

      // Check if content height exceeds maxHeight
      setContentOverflows(element.scrollHeight > maxHeightPx)
    }

    // Initial check
    checkOverflow()

    // Check again when window is resized
    window.addEventListener("resize", checkOverflow)

    // Check again after a short delay to ensure content is fully rendered
    const timeoutId = setTimeout(checkOverflow, 100)

    return () => {
      window.removeEventListener("resize", checkOverflow)
      clearTimeout(timeoutId)
    }
  }, [highlightedCode, maxHeight, mounted])

  // Handle copy to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Handle client-side rendering
  useEffect(() => {
    setMounted(true)
  }, [])

  // Render a skeleton while loading
  const renderSkeleton = () => (
    <div className="animate-pulse">
      <div className="h-6 bg-muted/30 rounded mb-2 w-3/4"></div>
      <div className="h-6 bg-muted/30 rounded mb-2"></div>
      <div className="h-6 bg-muted/30 rounded mb-2 w-5/6"></div>
      <div className="h-6 bg-muted/30 rounded mb-2 w-2/3"></div>
      <div className="h-6 bg-muted/30 rounded w-4/5"></div>
    </div>
  )

  // Determine what to render based on the current state
  const renderContent = () => {
    // If we have highlighted code and we're not loading, show the code
    if (!isLoading && highlightedCode && mounted) {
      return <div dangerouslySetInnerHTML={{ __html: highlightedCode }} className="shiki-container" />
    }

    // Otherwise, always show the skeleton (both during SSR and client loading)
    return renderSkeleton()
  }

  return (
    <div className={cn(
      "relative w-full bg-card text-card-foreground shadow-sm",
      border && "border border-border rounded-lg",
      className
    )}>
      {caption && <div className="text-sm text-muted-foreground mb-2">{caption}</div>}
      <div className="relative w-full code-block-container">
        {/* Only show copy button when mounted and not loading */}
        {showCopyButton && mounted && !isLoading && (
          <div className="absolute right-4 top-2 z-10">
            <button
              onClick={copyToClipboard}
              className={cn(
                "p-2 rounded-lg",
                "bg-background/80 backdrop-blur-sm",
                "text-muted-foreground hover:text-foreground hover:bg-background",
                "transition-all duration-200",
                "shadow-sm hover:shadow-md",
                "border border-border/50",
                copied && "border-none",
              )}
              aria-label="Copy code to clipboard"
            >
              {copied ? <Check size={18} weight="bold" /> : <ClipboardText size={18} />}
            </button>
          </div>
        )}
        <div
          ref={contentRef}
          className={cn(
            "my-4 px-2 w-full code-content",
            !expanded && "max-h-[var(--code-block-max-height)] overflow-y-auto",
            showLineNumbers && "relative",
          )}
          style={{ "--code-block-max-height": maxHeight } as React.CSSProperties}
        >
          {renderContent()}
        </div>
        {showExpandButton && contentOverflows && mounted && (
          <button
            onClick={() => setExpanded(!expanded)}
            className={cn(
              "absolute right-4 p-2 rounded-lg",
              "bg-background/80 backdrop-blur-sm",
              "text-muted-foreground hover:text-foreground hover:bg-background",
              "transition-all duration-200",
              "shadow-sm hover:shadow-md",
              "border border-border/50",
              expanded ? "bottom-5" : "bottom-2",
            )}
            aria-label={expanded ? "Collapse code" : "Expand code"}
          >
            {expanded ? <CaretUp size={18} weight="bold" /> : <CaretDown size={18} weight="bold" />}
          </button>
        )}
      </div>
    </div>
  )
}
