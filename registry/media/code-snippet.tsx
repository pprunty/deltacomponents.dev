"use client"

import React, { useEffect, useState } from "react"
import { Highlight, PrismTheme } from "prism-react-renderer"

import { cn } from "@/lib/utils"

import { CopyButton } from "./copy-button"

// Inline theme definitions to make component self-contained
const defaultTheme: PrismTheme = {
  plain: {
    color: "#FFFFFF",
    backgroundColor: "#1B1912",
  },
  styles: [
    {
      types: ["comment"],
      style: {
        color: "#757575",
        fontStyle: "italic",
      },
    },
    {
      types: ["keyword", "property", "property-access", "attr-name"],
      style: {
        color: "#77b7d7",
      },
    },
    {
      types: ["tag"],
      style: {
        color: "#dfab5c",
      },
    },
    {
      types: ["punctuation", "symbol", "dom"],
      style: {
        color: "#ffffff",
      },
    },
    {
      types: ["definition", "function"],
      style: {
        color: "#86d9ca",
      },
    },
    {
      types: ["string", "char", "attr-value"],
      style: {
        color: "#977cdc",
      },
    },
    {
      types: ["static", "number"],
      style: {
        color: "#ff6658",
      },
    },
  ],
}

const lightTheme: PrismTheme = {
  plain: {
    color: "#24292e",
    backgroundColor: "#FAFAFA",
  },
  styles: [
    {
      types: ["comment"],
      style: {
        color: "#8b949e",
        fontStyle: "italic",
      },
    },
    {
      types: ["variable", "parameter"],
      style: {
        color: "#e36209",
      },
    },
    {
      types: ["keyword", "builtin", "function-definition"],
      style: {
        color: "#d73a49",
      },
    },
    {
      types: ["property", "property-access", "attr-name"],
      style: {
        color: "#005cc5",
      },
    },
    {
      types: ["tag"],
      style: {
        color: "#22863a",
      },
    },
    {
      types: ["punctuation", "symbol", "dom", "operator"],
      style: {
        color: "#24292e",
      },
    },
    {
      types: ["function"],
      style: {
        color: "#6f42c1",
      },
    },
    {
      types: ["class-name"],
      style: {
        color: "#6f42c1",
      },
    },
    {
      types: ["string", "char", "attr-value"],
      style: {
        color: "#032f62",
      },
    },
    {
      types: ["static", "number"],
      style: {
        color: "#005cc5",
      },
    },
  ],
}

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
  tabs?: { [key: string]: { code: string; language?: string } }
  activeTab?: string
  onTabChange?: (tab: string) => void
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
  tabs,
  activeTab,
  onTabChange,
}) => {
  // Handle tabs functionality
  const currentTab = tabs && activeTab ? activeTab : null
  const currentCode = currentTab && tabs ? tabs[currentTab].code : code
  const currentLanguage =
    currentTab && tabs ? tabs[currentTab].language || language : language

  const lines = currentCode.trim().split("\n")
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
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
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

  // Select theme based on adaptiveTheme prop or auto-detect light/dark mode
  const selectedTheme = adaptiveTheme
    ? isDark
      ? adaptiveTheme.dark
      : adaptiveTheme.light
    : theme || (isDark ? defaultTheme : lightTheme)

  return (
    <div
      className={cn(
        "rounded-sm overflow-hidden pointer-events-auto",
        border && "border border-border",
        className
      )}
    >
      {title || tabs ? (
        <div className="flex items-center justify-between border-b bg-muted">
          {title ? (
            <h3
              className="text-sm font-medium pl-4 py-2"
              style={{ color: selectedTheme.plain?.color || "#FFFFFF" }}
            >
              {title}
            </h3>
          ) : null}

          {tabs && !title ? (
            <div className="flex items-center px-3 ">
              <div className="h-7 translate-y-[2px] gap-3 bg-transparent p-0 pl-1 flex">
                {Object.entries(tabs).map(([key]) => (
                  <button
                    key={key}
                    onClick={() => onTabChange?.(key)}
                    className={cn(
                      "rounded-none border-b-2 border-transparent bg-transparent p-0 pb-1.5 font-mono text-sm transition-colors",
                      activeTab === key
                        ? selectedTheme.plain?.backgroundColor?.toLowerCase() ===
                            "#ffffff" ||
                          selectedTheme.plain?.backgroundColor === "#FAFAFA"
                          ? "border-b-zinc-900 text-zinc-900"
                          : "border-b-zinc-50 text-zinc-50"
                        : selectedTheme.plain?.backgroundColor?.toLowerCase() ===
                              "#ffffff" ||
                            selectedTheme.plain?.backgroundColor === "#FAFAFA"
                          ? "text-zinc-600 hover:text-zinc-800"
                          : "text-zinc-400 hover:text-zinc-200"
                    )}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <CopyButton
            value={currentCode}
            className={cn(
              "mr-3",
              selectedTheme.plain?.backgroundColor?.toLowerCase() ===
                "#ffffff" || selectedTheme.plain?.backgroundColor === "#FAFAFA"
                ? "text-zinc-600 hover:bg-zinc-200 hover:text-zinc-800"
                : "text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50"
            )}
          />
        </div>
      ) : null}
      <div
        className="relative max-h-[calc(530px-44px)] py-4"
        style={{
          backgroundColor: selectedTheme.plain?.backgroundColor || "#151515",
        }}
      >
        {!title && !tabs && (
          <div
            className={`absolute ${
              lines.length === 1
                ? "top-1/2 -translate-y-1/2 right-3"
                : "top-4 right-3"
            }`}
          >
            <CopyButton
              value={currentCode}
              className={
                selectedTheme.plain?.backgroundColor?.toLowerCase() ===
                  "#ffffff" ||
                selectedTheme.plain?.backgroundColor === "#FAFAFA"
                  ? "text-zinc-600 hover:bg-zinc-200 hover:text-zinc-800"
                  : "text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50"
              }
            />
          </div>
        )}
        <Highlight
          theme={selectedTheme}
          code={currentCode.trim()}
          language={currentLanguage}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} text-[13px] overflow-x-auto overflow-y-auto max-h-[calc(530px-88px)] font-mono font-medium thin-scrollbar`}
              style={{
                ...style,
                scrollbarWidth: "thin",
                scrollbarColor:
                  selectedTheme.plain?.backgroundColor?.toLowerCase() ===
                    "#ffffff" ||
                  selectedTheme.plain?.backgroundColor === "#FAFAFA"
                    ? "#d1d5db transparent"
                    : "#4b5563 transparent",
              }}
            >
              {tokens.map((line, i) => (
                <div
                  key={i}
                  {...getLineProps({ line })}
                  className="flex items-center py-px px-4"
                  style={{}}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      selectedTheme.plain?.backgroundColor?.toLowerCase() ===
                        "#ffffff" ||
                      selectedTheme.plain?.backgroundColor === "#FAFAFA"
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
                          selectedTheme.plain?.backgroundColor === "#FFFFFF" ||
                          selectedTheme.plain?.backgroundColor === "#FAFAFA"
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
