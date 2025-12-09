"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { TerminalIcon } from "lucide-react"
import { Highlight } from "prism-react-renderer"
import type { PrismTheme } from "prism-react-renderer"

import { cn } from "@/lib/utils"
import { CopyButton } from "@/registry/delta-ui/delta/copy-button"
import { getIconForFile } from "@/registry/delta-ui/delta/code-block-icons"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/delta-ui/ui/tabs"

type PackageManager = "npm" | "yarn" | "pnpm" | "bun"

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
    backgroundColor: "#ffffff",
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
  npm?: string
  yarn?: string
  pnpm?: string
  bun?: string
  defaultPackageManager?: PackageManager
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
  useThemeBackground?: boolean
  className?: string
  textClassName?: string
  scrollbar?: boolean
}

const monoFontFamily =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'

function parseMarkdownCodeBlock(input: string): { code: string; language: string | null } {
  const markdownRegex = /^```(\w+)?\n?([\s\S]*?)```$/
  const match = input.trim().match(markdownRegex)

  if (match) {
    return {
      language: match[1] || null,
      code: match[2]?.trim() || "",
    }
  }

  return { code: input, language: null }
}

const languageAliases: Record<string, string> = {
  py: "python",
  js: "javascript",
  ts: "typescript",
  tsx: "tsx",
  jsx: "jsx",
  rb: "ruby",
  rs: "rust",
  sh: "bash",
  shell: "bash",
  yml: "yaml",
  md: "markdown",
}

const packageManagerCommands: Record<string, PackageManager> = {
  npx: "npm",
  npm: "npm",
  yarn: "yarn",
  pnpm: "pnpm",
  bunx: "bun",
  bun: "bun",
}

function resolveLanguage(lang: string): string {
  return languageAliases[lang.toLowerCase()] || lang.toLowerCase()
}

function detectPackageManagerFromMarkdown(input: string): {
  isPackageManager: boolean
  command: string
  manager: PackageManager
} | null {
  const parsed = parseMarkdownCodeBlock(input)
  if (!parsed.language) return null

  const lang = parsed.language.toLowerCase()
  const manager = packageManagerCommands[lang]

  if (manager) {
    return {
      isPackageManager: true,
      command: parsed.code,
      manager,
    }
  }

  return null
}

function convertNpxToPackageManagers(npxCommand: string): {
  npm: string
  yarn: string
  pnpm: string
  bun: string
} {
  // Handle patterns like "npx shadcn@latest add button" or just "shadcn@latest add button"
  let command = npxCommand.trim()

  // Remove leading "npx " if present
  if (command.startsWith("npx ")) {
    command = command.slice(4)
  }

  return {
    npm: `npx ${command}`,
    yarn: `yarn dlx ${command}`,
    pnpm: `pnpm dlx ${command}`,
    bun: `bunx ${command}`,
  }
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
  textClassName = "text-[14px]",
  scrollbar = true,
}: CodeBlockProps) {
  const [packageManager, setPackageManager] = React.useState<PackageManager>(defaultPackageManager)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }

    checkDarkMode()

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

  const commands = React.useMemo(() => {
    return {
      npm,
      yarn,
      pnpm,
      bun,
    }
  }, [npm, yarn, pnpm, bun])

  const availableCommands = Object.entries(commands).filter(([, command]) => command)

  const selectedTheme = adaptiveTheme
    ? isDark
      ? adaptiveTheme.dark
      : adaptiveTheme.light
    : theme || (isDark ? defaultTheme : lightTheme)

  const packageManagerFromMarkdown = code ? detectPackageManagerFromMarkdown(code) : null

  const parsedMarkdown = code ? parseMarkdownCodeBlock(code) : null
  const actualCode = css || (parsedMarkdown?.code ?? code)
  const actualLanguage = css
    ? "css"
    : parsedMarkdown?.language
      ? resolveLanguage(parsedMarkdown.language)
      : defaultLanguage || language

  if (packageManagerFromMarkdown) {
    const { command, manager } = packageManagerFromMarkdown
    const allCommands = convertNpxToPackageManagers(command)

    return (
      <div className={cn("bg-card text-card-foreground overflow-hidden rounded-lg border", className)} data-slot="tabs">
        <Tabs
          value={packageManager}
          className="gap-0"
          onValueChange={(value) => setPackageManager(value as PackageManager)}
          defaultValue={manager}
        >
          <div
            className={cn("flex items-center justify-between border-b px-3 py-2", !useThemeBackground && "bg-surface")}
            style={
              useThemeBackground
                ? {
                  backgroundColor: selectedTheme.plain?.backgroundColor,
                  color: selectedTheme.plain?.color,
                }
                : undefined
            }
          >
            <div className="flex items-center gap-2.5">
              <TerminalIcon
                className="size-4 text-muted-foreground"
                style={useThemeBackground ? { color: selectedTheme.plain?.color, opacity: 0.7 } : undefined}
              />
              <TabsList className="h-auto rounded-none bg-transparent p-0">
                {(["npm", "yarn", "pnpm", "bun"] as PackageManager[]).map((key) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className={cn(
                      "text-muted-foreground data-[state=active]:text-foreground h-7 rounded-md px-2.5 font-medium transition-colors data-[state=active]:bg-transparent data-[state=active]:shadow-none",
                      textClassName,
                    )}
                    style={{
                      fontFamily: monoFontFamily,
                      ...(useThemeBackground
                        ? {
                          color: selectedTheme.plain?.color,
                          opacity: 0.7,
                        }
                        : {}),
                    }}
                  >
                    {key}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            <CopyButton
              value={allCommands[packageManager] || allCommands[manager]}
              className="size-7"
              variant="secondary"
              iconColor={useThemeBackground ? selectedTheme.plain?.color : undefined}
            />
          </div>
          <div className={cn("overflow-x-auto", !scrollbar && "no-scrollbar")}>
            {(["npm", "yarn", "pnpm", "bun"] as PackageManager[]).map((key) => (
              <TabsContent key={key} value={key} className="mt-0">
                <div
                  className={cn("relative py-4", !useThemeBackground && "bg-surface")}
                  style={
                    useThemeBackground
                      ? {
                        backgroundColor: selectedTheme.plain?.backgroundColor,
                      }
                      : undefined
                  }
                >
                  <Highlight theme={selectedTheme} code={allCommands[key]} language="bash">
                    {({ className: highlightClassName, style, tokens, getLineProps, getTokenProps }) => (
                      <pre
                        className={cn(
                          highlightClassName,
                          "w-full overflow-x-auto px-4 font-medium leading-relaxed antialiased",
                          textClassName,
                        )}
                        style={{
                          ...style,
                          fontFamily: monoFontFamily,
                          backgroundColor: useThemeBackground ? selectedTheme.plain?.backgroundColor : "transparent",
                          WebkitFontSmoothing: "antialiased",
                          MozOsxFontSmoothing: "grayscale",
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

  if (availableCommands.length > 0) {
    return (
      <div className={cn("bg-card text-card-foreground overflow-hidden rounded-lg border", className)} data-slot="tabs">
        <Tabs
          value={packageManager}
          className="gap-0"
          onValueChange={(value) => setPackageManager(value as PackageManager)}
        >
          <div
            className={cn("flex items-center justify-between border-b px-3 py-2", !useThemeBackground && "bg-surface")}
            style={
              useThemeBackground
                ? {
                  backgroundColor: selectedTheme.plain?.backgroundColor,
                  color: selectedTheme.plain?.color,
                }
                : undefined
            }
          >
            <div className="flex items-center gap-2.5">
              <TerminalIcon
                className="size-4 text-muted-foreground"
                style={useThemeBackground ? { color: selectedTheme.plain?.color, opacity: 0.7 } : undefined}
              />
              <TabsList className="h-auto rounded-none bg-transparent p-0">
                {availableCommands.map(([key]) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className={cn(
                      "text-muted-foreground data-[state=active]:text-foreground h-7 rounded-md px-2.5 font-medium transition-colors data-[state=active]:bg-transparent data-[state=active]:shadow-none",
                      textClassName,
                    )}
                    style={{
                      fontFamily: monoFontFamily,
                      ...(useThemeBackground
                        ? {
                          color: selectedTheme.plain?.color,
                          opacity: 0.7,
                        }
                        : {}),
                    }}
                  >
                    {key}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            <CopyButton
              value={commands[packageManager] || ""}
              className="size-7"
              variant="secondary"
              iconColor={useThemeBackground ? selectedTheme.plain?.color : undefined}
            />
          </div>
          <div className={cn("overflow-x-auto", !scrollbar && "no-scrollbar")}>
            {availableCommands.map(([key, command]) => (
              <TabsContent key={key} value={key} className="mt-0">
                <div
                  className={cn("relative py-4", !useThemeBackground && "bg-surface")}
                  style={
                    useThemeBackground
                      ? {
                        backgroundColor: selectedTheme.plain?.backgroundColor,
                      }
                      : undefined
                  }
                >
                  <Highlight theme={selectedTheme} code={command || ""} language="bash">
                    {({ className: highlightClassName, style, tokens, getLineProps, getTokenProps }) => (
                      <pre
                        className={cn(
                          highlightClassName,
                          "w-full overflow-x-auto px-4 font-medium leading-relaxed antialiased",
                          textClassName,
                        )}
                        style={{
                          ...style,
                          fontFamily: monoFontFamily,
                          backgroundColor: useThemeBackground ? selectedTheme.plain?.backgroundColor : "transparent",
                          WebkitFontSmoothing: "antialiased",
                          MozOsxFontSmoothing: "grayscale",
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

  if (actualCode) {
    return (
      <div
        className={cn(
          "border-border pointer-events-auto w-full max-w-full overflow-hidden rounded-lg border",
          className,
        )}
      >
        {filename && (
          <figcaption
            className={cn(
              "flex items-center justify-between border-b px-4 py-2.5 [&_svg]:size-4",
              !useThemeBackground && "bg-surface",
            )}
            style={{
              fontFamily: monoFontFamily,
              ...(useThemeBackground
                ? {
                  backgroundColor: selectedTheme.plain?.backgroundColor,
                  color: selectedTheme.plain?.color,
                }
                : {}),
            }}
          >
            <div className={cn("flex items-center gap-2 text-muted-foreground", textClassName)}>
              {getIconForFile(filename)}
              <span className="font-medium tracking-tight">{filename}</span>
            </div>
            <CopyButton value={actualCode} iconColor={useThemeBackground ? selectedTheme.plain?.color : undefined} />
          </figcaption>
        )}

        <div className="relative">
          {!filename && (
            <div className="pointer-events-none sticky top-0 right-0 z-10 flex h-0 justify-end">
              <div className="pointer-events-auto p-2">
                <CopyButton
                  value={actualCode}
                  iconColor={useThemeBackground ? selectedTheme.plain?.color : undefined}
                />
              </div>
            </div>
          )}

          <div
            className={cn(
              "relative max-h-[450px] w-full",
              !useThemeBackground && "bg-surface",
              scrollbar ? "overflow-y-auto" : "overflow-y-auto no-scrollbar",
            )}
            style={
              useThemeBackground
                ? {
                  backgroundColor: selectedTheme.plain?.backgroundColor,
                }
                : undefined
            }
          >
            <Highlight theme={selectedTheme} code={actualCode.trim()} language={actualLanguage}>
              {({ className: highlightClassName, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                  className={cn(
                    highlightClassName,
                    "min-w-0 py-3.5 outline-none",
                    "font-medium leading-6 antialiased",
                    scrollbar ? "overflow-x-auto" : "overflow-x-auto no-scrollbar",
                    textClassName,
                  )}
                  style={{
                    ...style,
                    fontFamily: monoFontFamily,
                    backgroundColor: useThemeBackground ? selectedTheme.plain?.backgroundColor : "transparent",
                    WebkitFontSmoothing: "antialiased",
                    MozOsxFontSmoothing: "grayscale",
                  }}
                >
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line })} className="flex min-h-[24px] items-center">
                      {showLineNumbers && (
                        <span
                          className={cn(
                            "mr-8 inline-block w-6 flex-shrink-0 pl-6 text-right font-medium tabular-nums select-none",
                            textClassName,
                          )}
                          style={{
                            fontFamily: monoFontFamily,
                            color: selectedTheme.plain?.color,
                            opacity: 0.35,
                          }}
                        >
                          {i + 1}
                        </span>
                      )}
                      <span className={cn("flex-1 whitespace-pre pr-6", !showLineNumbers && "pl-6")}>
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
      </div>
    )
  }

  return null
}
