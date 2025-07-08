"use client"

import React, { useEffect, useState } from "react"
import { Highlight, PrismTheme } from "prism-react-renderer"

import { cn } from "@/lib/utils"
import defaultTheme from "@/styles/prism-theme.json"

import { CopyButton } from "./copy-button"

interface CodeSnippetProps {
  title?: string
  code: string
  language?: string
  className?: string
  border?: boolean
  theme?: PrismTheme
  showLineNumbers?: boolean
  adaptiveTheme?: {
    light: PrismTheme
    dark: PrismTheme
  }
}

export const CodeSnippet: React.FC<CodeSnippetProps> = ({
  title,
  code,
  language = "typescript",
  className,
  border = true,
  theme,
  showLineNumbers = true,
  adaptiveTheme,
}) => {
  const lines = code.trim().split("\n")
  const [isDark, setIsDark] = useState(false)

  // Hook to detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }

    // Check on mount
    checkDarkMode()

    // Watch for changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          checkDarkMode()
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  // Select theme based on adaptiveTheme prop or fallback to theme/default
  const selectedTheme = adaptiveTheme 
    ? (isDark ? adaptiveTheme.dark : adaptiveTheme.light)
    : theme || (defaultTheme as PrismTheme)

  return (
    <div
      className={cn(
        "rounded-2xl overflow-hidden pointer-events-auto",
        border && "border border-border",
        className
      )}
    >
      {title ? (
        <div
          className="flex items-center justify-between pl-4 pr-3 py-2 border-b h-11"
          style={{ 
            backgroundColor: selectedTheme.plain?.backgroundColor || "#151515", 
            borderBottomColor: selectedTheme.plain?.backgroundColor?.toLowerCase() === "#ffffff" ? "#e5e5e5" : "#2a2a2a"
          }}
        >
          <h3 
            className="text-sm font-medium" 
            style={{ color: selectedTheme.plain?.color || "#FFFFFF" }}
          >
            {title}
          </h3>
          <CopyButton 
            value={code} 
            className={selectedTheme.plain?.backgroundColor?.toLowerCase() === "#ffffff" 
              ? "text-zinc-600 hover:bg-zinc-200 hover:text-zinc-800" 
              : "text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50"
            } 
          />
        </div>
      ) : null}
      <div
        className="relative max-h-[calc(530px-44px)] py-4"
        style={{ backgroundColor: selectedTheme.plain?.backgroundColor || "#151515" }}
      >
        {!title && (
          <div
            className={`absolute ${
              lines.length === 1
                ? "top-1/2 -translate-y-1/2 right-3"
                : "top-4 right-3"
            }`}
          >
            <CopyButton 
              value={code} 
              className={selectedTheme.plain?.backgroundColor?.toLowerCase() === "#ffffff" 
                ? "text-zinc-600 hover:bg-zinc-200 hover:text-zinc-800" 
                : "text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50"
              } 
            />
          </div>
        )}
        <Highlight theme={selectedTheme} code={code.trim()} language={language}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} text-[13px] overflow-x-auto overflow-y-auto max-h-[calc(530px-88px)] font-mono font-medium`}
              style={style}
            >
              {tokens.map((line, i) => (
                <div
                  key={i}
                  {...getLineProps({ line })}
                  className="flex items-center py-px px-4"
                  style={{}}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      selectedTheme.plain?.backgroundColor?.toLowerCase() === "#ffffff"
                        ? "#f5f5f5"
                        : "#202020")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  {showLineNumbers && (
                    <span
                      className="mr-4 select-none text-right text-[10px] items-center flex"
                      style={{
                        color:
                          selectedTheme.plain?.backgroundColor === "#FFFFFF"
                            ? "#999999"
                            : "#757575",
                        minWidth: "1.5rem",
                      }}
                    >
                      {i + 1}
                    </span>
                  )}
                  <span className={!showLineNumbers ? "ml-0" : ""}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  )
}

export default CodeSnippet
