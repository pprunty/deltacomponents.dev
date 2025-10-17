"use client"

import { useEffect, useState } from "react"
import { PrismTheme } from "prism-react-renderer"

import { CodeBlock } from "@/registry/delta-ui/delta/code-block"

// 5 Popular Prism Themes
const atomDarkTheme: PrismTheme = {
  plain: {
    color: "#c5c8c6",
    backgroundColor: "#1d1f21",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: {
        color: "#7C7C7C",
      },
    },
    {
      types: ["namespace"],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ["string", "attr-value"],
      style: {
        color: "#A8FF60",
      },
    },
    {
      types: ["punctuation", "operator"],
      style: {
        color: "#6C6C6C",
      },
    },
    {
      types: [
        "entity",
        "url",
        "symbol",
        "number",
        "boolean",
        "variable",
        "constant",
        "property",
        "regex",
        "inserted",
      ],
      style: {
        color: "#AE81FF",
      },
    },
    {
      types: ["atrule", "keyword", "attr-name", "selector"],
      style: {
        color: "#FF6C6B",
      },
    },
    {
      types: ["function", "deleted", "tag"],
      style: {
        color: "#A8FF60",
      },
    },
    {
      types: ["function-variable"],
      style: {
        color: "#6196CC",
      },
    },
    {
      types: ["tag", "selector", "keyword"],
      style: {
        color: "#FF6C6B",
      },
    },
  ],
}

const draculaTheme: PrismTheme = {
  plain: {
    color: "#F8F8F2",
    backgroundColor: "#282A36",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: {
        color: "#6272A4",
      },
    },
    {
      types: ["namespace"],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ["string", "attr-value"],
      style: {
        color: "#F1FA8C",
      },
    },
    {
      types: ["punctuation", "operator"],
      style: {
        color: "#F8F8F2",
      },
    },
    {
      types: [
        "entity",
        "url",
        "symbol",
        "number",
        "boolean",
        "variable",
        "constant",
        "property",
        "regex",
        "inserted",
      ],
      style: {
        color: "#BD93F9",
      },
    },
    {
      types: ["atrule", "keyword", "attr-name", "selector"],
      style: {
        color: "#FF79C6",
      },
    },
    {
      types: ["function", "deleted", "tag"],
      style: {
        color: "#50FA7B",
      },
    },
    {
      types: ["function-variable"],
      style: {
        color: "#8BE9FD",
      },
    },
    {
      types: ["tag", "selector", "keyword"],
      style: {
        color: "#FF79C6",
      },
    },
  ],
}

const nightOwlTheme: PrismTheme = {
  plain: {
    color: "#d6deeb",
    backgroundColor: "#011627",
  },
  styles: [
    {
      types: ["comment", "prolog", "cdata"],
      style: {
        color: "#637777",
        fontStyle: "italic",
      },
    },
    {
      types: ["punctuation"],
      style: {
        color: "#c792ea",
      },
    },
    {
      types: ["namespace"],
      style: {
        color: "#b2ccd6",
      },
    },
    {
      types: ["deleted"],
      style: {
        color: "#EF535090",
        fontStyle: "italic",
      },
    },
    {
      types: ["symbol", "property"],
      style: {
        color: "#80CBC4",
      },
    },
    {
      types: ["tag", "operator", "keyword"],
      style: {
        color: "#7fdbca",
      },
    },
    {
      types: ["boolean"],
      style: {
        color: "#ff5874",
      },
    },
    {
      types: ["number"],
      style: {
        color: "#F78C6C",
      },
    },
    {
      types: ["constant", "function", "builtin", "char"],
      style: {
        color: "#82AAFF",
      },
    },
    {
      types: ["selector", "doctype"],
      style: {
        color: "#c792ea",
        fontStyle: "italic",
      },
    },
    {
      types: ["class-name"],
      style: {
        color: "#FFCB8B",
      },
    },
    {
      types: ["tag"],
      style: {
        color: "#7fdbca",
      },
    },
    {
      types: ["attr-name"],
      style: {
        color: "#7fdbca",
      },
    },
    {
      types: ["attr-value"],
      style: {
        color: "#addb67",
      },
    },
    {
      types: ["string", "url"],
      style: {
        color: "#addb67",
      },
    },
    {
      types: ["variable"],
      style: {
        color: "#d6deeb",
      },
    },
    {
      types: ["inserted"],
      style: {
        color: "#addb67",
        fontStyle: "italic",
      },
    },
  ],
}

const githubLightTheme: PrismTheme = {
  plain: {
    color: "#24292e",
    backgroundColor: "#ffffff",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: {
        color: "#6a737d",
        fontStyle: "italic",
      },
    },
    {
      types: ["namespace"],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ["string", "attr-value"],
      style: {
        color: "#032f62",
      },
    },
    {
      types: ["punctuation", "operator"],
      style: {
        color: "#24292e",
      },
    },
    {
      types: [
        "entity",
        "url",
        "symbol",
        "number",
        "boolean",
        "variable",
        "constant",
        "property",
        "regex",
        "inserted",
      ],
      style: {
        color: "#005cc5",
      },
    },
    {
      types: ["atrule", "keyword", "attr-name", "selector"],
      style: {
        color: "#d73a49",
      },
    },
    {
      types: ["function", "deleted", "tag"],
      style: {
        color: "#6f42c1",
      },
    },
    {
      types: ["function-variable"],
      style: {
        color: "#e36209",
      },
    },
    {
      types: ["tag", "selector", "keyword"],
      style: {
        color: "#d73a49",
      },
    },
  ],
}

const prismLightTheme: PrismTheme = {
  plain: {
    color: "#000",
    backgroundColor: "#f5f2f0",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: {
        color: "#708090",
        fontStyle: "italic",
      },
    },
    {
      types: ["namespace"],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ["string", "attr-value"],
      style: {
        color: "#690",
      },
    },
    {
      types: ["punctuation", "operator"],
      style: {
        color: "#999999",
      },
    },
    {
      types: [
        "entity",
        "url",
        "symbol",
        "number",
        "boolean",
        "variable",
        "constant",
        "property",
        "regex",
        "inserted",
      ],
      style: {
        color: "#905",
      },
    },
    {
      types: ["atrule", "keyword", "attr-name", "selector"],
      style: {
        color: "#07a",
      },
    },
    {
      types: ["function", "deleted", "tag"],
      style: {
        color: "#DD4A68",
      },
    },
    {
      types: ["function-variable"],
      style: {
        color: "#e90",
      },
    },
    {
      types: ["tag", "selector", "keyword"],
      style: {
        color: "#07a",
      },
    },
  ],
}

const solarizedLightTheme: PrismTheme = {
  plain: {
    color: "#657b83",
    backgroundColor: "#fdf6e3",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: {
        color: "#93a1a1",
        fontStyle: "italic",
      },
    },
    {
      types: ["namespace"],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ["string", "attr-value"],
      style: {
        color: "#2aa198",
      },
    },
    {
      types: ["punctuation", "operator"],
      style: {
        color: "#586e75",
      },
    },
    {
      types: [
        "entity",
        "url",
        "symbol",
        "number",
        "boolean",
        "variable",
        "constant",
        "property",
        "regex",
        "inserted",
      ],
      style: {
        color: "#2aa198",
      },
    },
    {
      types: ["atrule", "keyword", "attr-name", "selector"],
      style: {
        color: "#859900",
      },
    },
    {
      types: ["function", "deleted", "tag"],
      style: {
        color: "#268bd2",
      },
    },
    {
      types: ["function-variable"],
      style: {
        color: "#b58900",
      },
    },
    {
      types: ["tag", "selector", "keyword"],
      style: {
        color: "#859900",
      },
    },
    {
      types: ["important", "bold"],
      style: {
        fontWeight: "bold",
      },
    },
    {
      types: ["italic"],
      style: {
        fontStyle: "italic",
      },
    },
  ],
}

const themes = [
  { name: "GitHub Light", theme: githubLightTheme },
  { name: "Prism Light", theme: prismLightTheme },
  { name: "Solarized Light", theme: solarizedLightTheme },
  { name: "Atom Dark", theme: atomDarkTheme },
  { name: "Dracula", theme: draculaTheme },
  { name: "Night Owl", theme: nightOwlTheme },
]

const goCode = `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`

export default function CodeBlockInteractiveDemo() {
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentThemeIndex((prev) => (prev + 1) % themes.length)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const currentTheme = themes[currentThemeIndex]

  return (
    <div className="w-full max-w-md">
      <CodeBlock
        code={goCode}
        language="go"
        showLineNumbers={true}
        adaptiveTheme={{
          dark: currentTheme.theme,
          light: currentTheme.theme,
        }}
      />
    </div>
  )
}
