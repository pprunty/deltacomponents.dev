"use client"

import { useState } from "react"
import { PrismTheme } from "prism-react-renderer"

import { CodeBlock } from "@/registry/delta-ui/delta/code-block"
import { Switch } from "@/registry/delta-ui/ui/switch"

// Custom C++ theme - Dark variant
const cppTheme: PrismTheme = {
  plain: {
    color: "#e6e6fa",
    backgroundColor: "#1a1a2e",
  },
  styles: [
    {
      types: ["comment"],
      style: {
        color: "#6a7b9a",
        fontStyle: "italic",
      },
    },
    {
      types: ["keyword", "operator"],
      style: {
        color: "#bb86fc",
        fontWeight: "bold",
      },
    },
    {
      types: ["string", "char"],
      style: {
        color: "#98d982",
      },
    },
    {
      types: ["number"],
      style: {
        color: "#f39c12",
      },
    },
    {
      types: ["function", "method"],
      style: {
        color: "#61dafb",
      },
    },
    {
      types: ["class-name", "type"],
      style: {
        color: "#ffd700",
        fontWeight: "500",
      },
    },
    {
      types: ["punctuation", "symbol"],
      style: {
        color: "#c5c8c6",
      },
    },
    {
      types: ["preprocessor", "directive"],
      style: {
        color: "#ff79c6",
      },
    },
    {
      types: ["namespace", "scope"],
      style: {
        color: "#8be9fd",
      },
    },
  ],
}

// Light theme variant for C++
const cppLightTheme: PrismTheme = {
  plain: {
    color: "#2d3748",
    backgroundColor: "#f7fafc",
  },
  styles: [
    {
      types: ["comment"],
      style: {
        color: "#718096",
        fontStyle: "italic",
      },
    },
    {
      types: ["keyword", "operator"],
      style: {
        color: "#805ad5",
        fontWeight: "bold",
      },
    },
    {
      types: ["string", "char"],
      style: {
        color: "#38a169",
      },
    },
    {
      types: ["number"],
      style: {
        color: "#d69e2e",
      },
    },
    {
      types: ["function", "method"],
      style: {
        color: "#3182ce",
      },
    },
    {
      types: ["class-name", "type"],
      style: {
        color: "#b7791f",
        fontWeight: "500",
      },
    },
    {
      types: ["punctuation", "symbol"],
      style: {
        color: "#4a5568",
      },
    },
    {
      types: ["preprocessor", "directive"],
      style: {
        color: "#e53e3e",
      },
    },
    {
      types: ["namespace", "scope"],
      style: {
        color: "#319795",
      },
    },
  ],
}

const goCode = `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`

export default function CodeBlockThemeDemo() {
  const [options, setOptions] = useState<string[]>(["line-numbers"])

  const showLineNumbers = options.includes("line-numbers")
  const showHeader = options.includes("header")
  const useThemeBackground = options.includes("theme-background")
  const useCustomStyling = options.includes("custom-styling")

  const customClassName = useCustomStyling ? "text-lg border-none rounded-[1rem]" : ""

  const toggleOption = (option: string) => {
    setOptions((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    )
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-wrap items-center justify-center gap-6">
        <label className="flex items-center gap-2.5 cursor-pointer">
          <Switch
            checked={showLineNumbers}
            onCheckedChange={() => toggleOption("line-numbers")}
          />
          <span className="text-sm font-medium">Line Numbers</span>
        </label>
        <label className="flex items-center gap-2.5 cursor-pointer">
          <Switch
            checked={showHeader}
            onCheckedChange={() => toggleOption("header")}
          />
          <span className="text-sm font-medium">Header</span>
        </label>
        <label className="flex items-center gap-2.5 cursor-pointer">
          <Switch
            checked={useThemeBackground}
            onCheckedChange={() => toggleOption("theme-background")}
          />
          <span className="text-sm font-medium">Background</span>
        </label>
        <label className="flex items-center gap-2.5 cursor-pointer">
          <Switch
            checked={useCustomStyling}
            onCheckedChange={() => toggleOption("custom-styling")}
          />
          <span className="text-sm font-medium">Custom Styling</span>
        </label>
      </div>

      <div className="w-full max-w-full">
        <CodeBlock
          code={goCode}
          language="go"
          filename={showHeader ? "hello.go" : undefined}
          showLineNumbers={showLineNumbers}
          useThemeBackground={useThemeBackground}
          className={customClassName}
          adaptiveTheme={{
            dark: cppTheme,
            light: cppLightTheme,
          }}
        />
      </div>
    </div>
  )
}
