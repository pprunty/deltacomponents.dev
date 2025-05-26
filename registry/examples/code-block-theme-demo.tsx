"use client"

import React, { useState } from "react"

import CodeBlock, { ThemeOption } from "@/registry/media/code-block"

export default function CodeBlockThemeDemo() {
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>("vitesse")

  const tsCode = `// TypeScript example with generics
function identity<T>(arg: T): T {
  return arg;
}

// Usage with type inference
const output = identity("myString");
// const output: string

// Usage with explicit type parameter
const numOutput = identity<number>(42);
// const numOutput: number

interface User {
  id: number;
  name: string;
}

// Function with multiple type parameters
function process<T, U>(value: T, handler: (x: T) => U): U {
  return handler(value);
}

const user: User = { id: 1, name: "Alice" };
const userName = process(user, (u) => u.name);
// const userName: string`

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTheme(e.target.value as ThemeOption)
  }

  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <label htmlFor="theme-select">Theme:</label>{" "}
        <select
          id="theme-select"
          value={selectedTheme}
          onChange={handleThemeChange}
        >
          <option value="vitesse">Vitesse</option>
          <option value="github">GitHub</option>
          <option value="gruvbox">Gruvbox</option>
          <option value="plastic">Plastic</option>
          <option value="default">Default</option>
        </select>
      </div>

      <CodeBlock
        code={tsCode}
        language="typescript"
        theme={selectedTheme}
        showLineNumbers
        showCopyButton
        highlightLines={[2, 3, 4, 15, 16, 17, 18]}
        border
      />
    </div>
  )
}
