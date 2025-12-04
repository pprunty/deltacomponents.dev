"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { TerminalIcon } from "lucide-react"
import { Highlight, Prism } from "prism-react-renderer"
import type { PrismTheme } from "prism-react-renderer"

// Import additional language definitions

import { cn } from "@/lib/utils"
import { CopyButton } from "@/registry/delta-ui/delta/copy-button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/delta-ui/delta/tabs"

;(typeof global !== "undefined" ? global : window).Prism = Prism
require("prismjs/components/prism-cpp")
require("prismjs/components/prism-python")
require("prismjs/components/prism-bash")
require("prismjs/components/prism-typescript")
require("prismjs/components/prism-javascript")
require("prismjs/components/prism-jsx")
require("prismjs/components/prism-tsx")
require("prismjs/components/prism-go")
require("prismjs/components/prism-rust")

type PackageManager = "npm" | "yarn" | "pnpm" | "bun"

// Inline theme definitions
const defaultTheme: PrismTheme = {
  plain: {
    color: "#FFFFFF",
    backgroundColor: "#161616",
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
    backgroundColor: "#F9F9F9",
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

interface CodeBlockProps {
  // Package manager commands
  npm?: string
  yarn?: string
  pnpm?: string
  bun?: string
  defaultPackageManager?: PackageManager

  // Code highlighting props
  code?: string
  css?: string
  language?: string
  defaultLanguage?: string
  filename?: string
  showLineNumbers?: boolean
  theme?: PrismTheme
  adaptiveTheme?: {
    light: PrismTheme
    dark: PrismTheme
  }

  // Background options
  useThemeBackground?: boolean // When true, uses the JSON theme background; when false, uses bg-surface

  className?: string
}

export function CodeBlock({
  npm,
  yarn,
  pnpm,
  bun,
  defaultPackageManager = "npm",
  code,
  css,
  language = "typescript",
  defaultLanguage,
  filename,
  showLineNumbers = true,
  theme,
  adaptiveTheme,
  useThemeBackground = false,
  className,
}: CodeBlockProps) {
  const [packageManager, setPackageManager] = React.useState<PackageManager>(
    defaultPackageManager
  )
  const [isDark, setIsDark] = useState(false)

  // Hook to detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }

    checkDarkMode()

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

  const commands = React.useMemo(() => {
    return {
      npm,
      yarn,
      pnpm,
      bun,
    }
  }, [npm, yarn, pnpm, bun])

  const availableCommands = Object.entries(commands).filter(
    ([, command]) => command
  )

  // Select theme based on adaptiveTheme prop or auto-detect light/dark mode
  const selectedTheme = adaptiveTheme
    ? isDark
      ? adaptiveTheme.dark
      : adaptiveTheme.light
    : theme || (isDark ? defaultTheme : lightTheme)

  // Use the theme's text foreground color for the copy button
  const iconColor = selectedTheme.plain?.color || "#000000"

  // Handle CSS prop - treat as code with CSS language
  const actualCode = css || code
  const actualLanguage = css ? "css" : defaultLanguage || language

  // If we have package manager commands, show the tabbed interface
  if (availableCommands.length > 0) {
    return (
      <div
        className={cn(
          "bg-card text-card-foreground overflow-x-auto rounded-lg border",
          className
        )}
        data-slot="tabs"
      >
        <Tabs
          value={packageManager}
          className="gap-0"
          onValueChange={(value) => setPackageManager(value as PackageManager)}
        >
          <div
            className={cn(
              "flex items-center justify-between border-b px-3 py-1",
              !useThemeBackground && "bg-surface"
            )}
            style={
              useThemeBackground
                ? {
                    backgroundColor: selectedTheme.plain?.backgroundColor,
                  }
                : undefined
            }
          >
            <div className="flex items-center gap-2">
              <div className="bg-foreground flex size-4 items-center justify-center rounded-[1px] opacity-70">
                <TerminalIcon className="text-code size-3" />
              </div>
              <TabsList className="rounded-none bg-transparent p-0">
                {availableCommands.map(([key]) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="data-[state=active]:border-border h-7 rounded-sm border border-transparent pt-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    {key}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            <CopyButton
              value={commands[packageManager] || ""}
              className="size-7 opacity-70 hover:opacity-100 focus-visible:opacity-100"
              tooltip="Copy command"
            />
          </div>
          <div className="no-scrollbar overflow-x-auto">
            {availableCommands.map(([key, command]) => (
              <TabsContent key={key} value={key} className="mt-0">
                <div
                  className={cn(
                    "relative py-4",
                    !useThemeBackground && "bg-surface"
                  )}
                  style={
                    useThemeBackground
                      ? {
                          backgroundColor: selectedTheme.plain?.backgroundColor,
                        }
                      : undefined
                  }
                >
                  <Highlight
                    theme={selectedTheme}
                    code={command || ""}
                    language="bash"
                  >
                    {({
                      className: highlightClassName,
                      style,
                      tokens,
                      getLineProps,
                      getTokenProps,
                    }) => (
                      <pre
                        className={`${highlightClassName} w-full overflow-x-auto px-4 font-mono text-sm leading-relaxed font-medium`}
                        style={{
                          ...style,
                          backgroundColor: useThemeBackground
                            ? selectedTheme.plain?.backgroundColor
                            : "transparent",
                          fontSize: className?.includes("text-lg")
                            ? "1.125rem"
                            : className?.includes("text-base")
                              ? "1rem"
                              : undefined,
                        }}
                      >
                        {tokens.map((line, i) => (
                          <div key={i} {...getLineProps({ line })}>
                            {line.map((token, key) => (
                              <span key={key} {...getTokenProps({ token })} />
                            ))}
                          </div>
                        ))}
                      </pre>
                    )}
                  </Highlight>
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    )
  }

  // If we have code to highlight, show the syntax highlighted version
  if (actualCode) {
    return (
      <div
        className={cn(
          "border-border pointer-events-auto w-full max-w-full overflow-x-auto overflow-y-hidden rounded-sm border",
          className
        )}
      >
        {filename && (
          <div
            className={cn(
              "flex items-center justify-between border-b",
              !useThemeBackground && "bg-surface"
            )}
            style={
              useThemeBackground
                ? {
                    backgroundColor: selectedTheme.plain?.backgroundColor,
                  }
                : undefined
            }
          >
            <div className="flex items-center gap-2 px-3 py-1">
              <span className="text-sm font-medium">{filename}</span>
            </div>
            <CopyButton
              value={actualCode}
              className="mr-3"
              tooltip="Copy code"
            />
          </div>
        )}

        <div
          className={cn(
            "relative max-h-[calc(530px-44px)] w-full py-4",
            !useThemeBackground && "bg-surface"
          )}
          style={
            useThemeBackground
              ? {
                  backgroundColor: selectedTheme.plain?.backgroundColor,
                }
              : undefined
          }
        >
          {!filename && (
            <div className="absolute top-1 right-1">
              <CopyButton value={actualCode} tooltip="Copy code" />
            </div>
          )}

          <Highlight
            theme={selectedTheme}
            code={actualCode.trim()}
            language={actualLanguage}
          >
            {({
              className: highlightClassName,
              style,
              tokens,
              getLineProps,
              getTokenProps,
            }) => (
              <pre
                className={`${highlightClassName} thin-scrollbar max-h-[calc(530px-88px)] w-full overflow-x-auto overflow-y-auto font-mono text-sm leading-relaxed font-medium`}
                style={{
                  ...style,
                  backgroundColor: useThemeBackground
                    ? selectedTheme.plain?.backgroundColor
                    : "transparent",
                  fontSize: className?.includes("text-lg")
                    ? "1.125rem"
                    : className?.includes("text-base")
                      ? "1rem"
                      : undefined,
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
                    className="flex items-center px-4 py-px"
                  >
                    {showLineNumbers && (
                      <span
                        className="mr-4 flex items-center text-right text-sm select-none"
                        style={{
                          color:
                            selectedTheme.plain?.backgroundColor ===
                              "#FFFFFF" ||
                            selectedTheme.plain?.backgroundColor === "#FAFAFA"
                              ? "#999999"
                              : "#757575",
                          minWidth: "1.5rem",
                          fontSize: className?.includes("text-lg")
                            ? "1.125rem"
                            : className?.includes("text-base")
                              ? "1rem"
                              : undefined,
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

  // Return null if no content
  return null
}
