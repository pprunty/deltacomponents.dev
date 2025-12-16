"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { TerminalIcon } from "lucide-react"
import { Highlight } from "prism-react-renderer"
import type { PrismTheme } from "prism-react-renderer"

import { cn } from "@/lib/utils"
import { getIconForFile } from "@/registry/delta-ui/delta/code-block-icons"
import { CopyButton } from "@/registry/delta-ui/delta/copy-button"
import { Button } from "@/registry/delta-ui/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/delta-ui/ui/collapsible"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/delta-ui/ui/tabs"

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
  expandable?: boolean
  defaultExpanded?: boolean
  collapsedHeight?: string
}

const monoFontFamily =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'

function parseMarkdownCodeBlock(input: string): {
  code: string
  language: string | null
} {
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
  expandable = false,
  defaultExpanded = false,
  collapsedHeight = "12rem",
}: CodeBlockProps) {
  const [packageManager, setPackageManager] = React.useState<PackageManager>(
    defaultPackageManager
  )
  const [isDark, setIsDark] = useState(false)
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

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

  const selectedTheme = adaptiveTheme
    ? isDark
      ? adaptiveTheme.dark
      : adaptiveTheme.light
    : theme || (isDark ? defaultTheme : lightTheme)

  const packageManagerFromMarkdown = code
    ? detectPackageManagerFromMarkdown(code)
    : null

  const parsedMarkdown = code ? parseMarkdownCodeBlock(code) : null
  const actualCode = css || (parsedMarkdown?.code ?? code)
  const actualLanguage = css
    ? "css"
    : parsedMarkdown?.language
      ? resolveLanguage(parsedMarkdown.language)
      : defaultLanguage || language

  const codeBlockBgColor = useThemeBackground
    ? selectedTheme.plain?.backgroundColor
    : "var(--color-surface)"

  console.log("[v0] codeBlockBgColor:", codeBlockBgColor)
  console.log("[v0] useThemeBackground:", useThemeBackground)
  console.log(
    "[v0] selectedTheme.plain?.backgroundColor:",
    selectedTheme.plain?.backgroundColor
  )

  if (packageManagerFromMarkdown) {
    const { command, manager } = packageManagerFromMarkdown
    const allCommands = convertNpxToPackageManagers(command)

    return (
      <div
        className={cn(
          "bg-card text-card-foreground overflow-hidden rounded-lg border",
          className
        )}
        data-slot="tabs"
      >
        <Tabs
          value={packageManager}
          className="gap-0"
          onValueChange={(value) => setPackageManager(value as PackageManager)}
          defaultValue={manager}
        >
          <div
            className={cn(
              "flex items-center justify-between border-b px-3 py-2",
              !useThemeBackground && "bg-surface"
            )}
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
                className="text-muted-foreground size-4"
                style={
                  useThemeBackground
                    ? { color: selectedTheme.plain?.color, opacity: 0.7 }
                    : undefined
                }
              />
              <TabsList className="h-auto rounded-none bg-transparent p-0">
                {(["npm", "yarn", "pnpm", "bun"] as PackageManager[]).map(
                  (key) => (
                    <TabsTrigger
                      key={key}
                      value={key}
                      className={cn(
                        "text-muted-foreground data-[state=active]:text-foreground h-7 rounded-md px-2.5 font-medium transition-colors data-[state=active]:bg-transparent data-[state=active]:shadow-none",
                        textClassName
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
                  )
                )}
              </TabsList>
            </div>
            <CopyButton
              value={allCommands[packageManager] || allCommands[manager]}
              className="size-7"
              variant="secondary"
              iconColor={
                useThemeBackground ? selectedTheme.plain?.color : undefined
              }
            />
          </div>
          <div className={cn("overflow-x-auto", !scrollbar && "no-scrollbar")}>
            {(["npm", "yarn", "pnpm", "bun"] as PackageManager[]).map((key) => (
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
                    code={allCommands[key]}
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
                        className={cn(
                          highlightClassName,
                          "w-full overflow-x-auto px-4 leading-relaxed font-normal",
                          textClassName
                        )}
                        style={{
                          ...style,
                          fontFamily: monoFontFamily,
                          backgroundColor: useThemeBackground
                            ? selectedTheme.plain?.backgroundColor
                            : "transparent",
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
      <div
        className={cn(
          "bg-card text-card-foreground overflow-hidden rounded-lg border",
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
              "flex items-center justify-between border-b px-3 py-2",
              !useThemeBackground && "bg-surface"
            )}
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
                className="text-muted-foreground size-4"
                style={
                  useThemeBackground
                    ? { color: selectedTheme.plain?.color, opacity: 0.7 }
                    : undefined
                }
              />
              <TabsList className="h-auto rounded-none bg-transparent p-0">
                {availableCommands.map(([key]) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className={cn(
                      "text-muted-foreground data-[state=active]:text-foreground h-7 rounded-md px-2.5 font-medium transition-colors data-[state=active]:bg-transparent data-[state=active]:shadow-none",
                      textClassName
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
              iconColor={
                useThemeBackground ? selectedTheme.plain?.color : undefined
              }
            />
          </div>
          <div className={cn("overflow-x-auto", !scrollbar && "no-scrollbar")}>
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
                        className={cn(
                          highlightClassName,
                          "w-full overflow-x-auto px-4 leading-relaxed font-normal",
                          textClassName
                        )}
                        style={{
                          ...style,
                          fontFamily: monoFontFamily,
                          backgroundColor: useThemeBackground
                            ? selectedTheme.plain?.backgroundColor
                            : "transparent",
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
    const codeBlockContent = (
      <div
        className={cn(
          "border-border pointer-events-auto w-full max-w-full overflow-hidden rounded-lg border",
          className
        )}
        style={{ "--code-block-bg": codeBlockBgColor } as React.CSSProperties}
      >
        {filename && (
          <figcaption
            className={cn(
              "flex items-center justify-between border-b px-4 py-2.5 [&_svg]:size-4",
              !useThemeBackground && "bg-surface"
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
            <div
              className={cn(
                "text-foreground/75 flex items-center gap-2",
                textClassName
              )}
            >
              {getIconForFile(filename)}
              <span className="font-medium tracking-tight">{filename}</span>
            </div>
            <div className="flex items-center gap-2">
              {expandable && (
                <>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "text-muted-foreground hover:text-foreground h-auto p-0 font-medium tracking-tight hover:bg-transparent",
                        textClassName
                      )}
                      style={{ fontFamily: monoFontFamily }}
                    >
                      {isExpanded ? "Collapse" : "Expand"}
                    </Button>
                  </CollapsibleTrigger>
                  <span className="text-muted-foreground/50">|</span>
                </>
              )}
              <CopyButton
                value={actualCode}
                iconColor={
                  useThemeBackground ? selectedTheme.plain?.color : undefined
                }
              />
            </div>
          </figcaption>
        )}

        <div className="relative">
          {!filename && (
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-end">
              <div className="pointer-events-auto flex items-center gap-2 p-3">
                {expandable && (
                  <>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "text-muted-foreground hover:text-foreground h-auto p-0 font-semibold tracking-tight hover:bg-transparent",
                          textClassName
                        )}
                        style={{ fontFamily: monoFontFamily }}
                      >
                        {isExpanded ? "Collapse" : "Expand"}
                      </Button>
                    </CollapsibleTrigger>
                    <span className="text-muted-foreground/50">|</span>
                  </>
                )}
                <CopyButton
                  value={actualCode}
                  iconColor={
                    useThemeBackground ? selectedTheme.plain?.color : undefined
                  }
                />
              </div>
            </div>
          )}

          {expandable ? (
            <CollapsibleContent
              forceMount
              className={cn(
                "relative w-full overflow-auto transition-all",
                !scrollbar && "no-scrollbar"
              )}
              style={{
                backgroundColor: "var(--code-block-bg)",
                maxHeight: isExpanded ? "none" : collapsedHeight,
              }}
            >
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
                    className={cn(
                      highlightClassName,
                      "min-w-0 py-3.5 outline-none",
                      "leading-6 font-normal",
                      textClassName
                    )}
                    style={{
                      ...style,
                      fontFamily: monoFontFamily,
                      backgroundColor: "transparent",
                      MozOsxFontSmoothing: "grayscale",
                    }}
                  >
                    {tokens.map((line, i) => (
                      <div
                        key={i}
                        {...getLineProps({ line })}
                        className="flex min-h-[24px]"
                      >
                        {showLineNumbers && (
                          <span
                            className={cn(
                              "sticky left-0 z-10 flex-none text-right font-medium tabular-nums select-none",
                              textClassName
                            )}
                            style={{
                              fontFamily: monoFontFamily,
                              color: selectedTheme.plain?.color
                                ? `color-mix(in srgb, ${selectedTheme.plain.color} 35%, transparent)`
                                : "rgba(128, 128, 128, 0.35)",
                              backgroundColor: "var(--code-block-bg)",
                              width: "4rem",
                              paddingLeft: "1.5rem",
                              paddingRight: "1.5rem",
                            }}
                          >
                            {i + 1}
                          </span>
                        )}
                        <span
                          className={cn(
                            "flex-1 pr-6 whitespace-pre",
                            !showLineNumbers && "pl-6"
                          )}
                        >
                          {line.map((token, key) => (
                            <span key={key} {...getTokenProps({ token })} />
                          ))}
                        </span>
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
            </CollapsibleContent>
          ) : (
            <div
              className={cn(
                "relative max-h-[450px] w-full overflow-auto",
                !scrollbar && "no-scrollbar"
              )}
              style={{ backgroundColor: "var(--code-block-bg)" }}
            >
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
                    className={cn(
                      highlightClassName,
                      "min-w-0 py-3.5 outline-none",
                      "leading-6 font-normal",
                      textClassName
                    )}
                    style={{
                      ...style,
                      fontFamily: monoFontFamily,
                      backgroundColor: "transparent",
                      MozOsxFontSmoothing: "grayscale",
                    }}
                  >
                    {tokens.map((line, i) => (
                      <div
                        key={i}
                        {...getLineProps({ line })}
                        className="flex min-h-[24px]"
                      >
                        {showLineNumbers && (
                          <span
                            className={cn(
                              "sticky left-0 z-10 flex-none text-right font-medium tabular-nums select-none",
                              textClassName
                            )}
                            style={{
                              fontFamily: monoFontFamily,
                              color: selectedTheme.plain?.color
                                ? `color-mix(in srgb, ${selectedTheme.plain.color} 35%, transparent)`
                                : "rgba(128, 128, 128, 0.35)",
                              backgroundColor: "var(--code-block-bg)",
                              width: "4rem",
                              paddingLeft: "1.5rem",
                              paddingRight: "1.5rem",
                            }}
                          >
                            {i + 1}
                          </span>
                        )}
                        <span
                          className={cn(
                            "flex-1 pr-6 whitespace-pre",
                            !showLineNumbers && "pl-6"
                          )}
                        >
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
          )}

          {expandable && !isExpanded && (
            <CollapsibleTrigger
              className="absolute inset-x-0 bottom-0 z-20 flex h-24 items-end justify-center rounded-b-lg pb-3 text-sm"
              style={{
                background: `linear-gradient(to bottom, transparent 0%, ${useThemeBackground && selectedTheme.plain?.backgroundColor ? selectedTheme.plain.backgroundColor : "var(--surface)"} 60%, ${useThemeBackground && selectedTheme.plain?.backgroundColor ? selectedTheme.plain.backgroundColor : "var(--surface)"} 100%)`,
                color: selectedTheme.plain?.color,
              }}
            >
              <span className="text-muted-foreground hover:text-foreground text-base font-normal transition-colors">
                Expand
              </span>
            </CollapsibleTrigger>
          )}
        </div>
      </div>
    )

    if (expandable) {
      return (
        <Collapsible
          open={isExpanded}
          onOpenChange={setIsExpanded}
          className="group/collapsible relative"
        >
          {codeBlockContent}
        </Collapsible>
      )
    }

    return codeBlockContent
  }

  return null
}
