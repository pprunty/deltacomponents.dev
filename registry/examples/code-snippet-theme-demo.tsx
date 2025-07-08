"use client"

import React, { useState } from "react"
import { PrismTheme } from "prism-react-renderer"

import { CodeSnippet } from "@/registry/media/code-snippet"
import lightTheme from "@/registry/media/light-theme.json"

export default function CodeSnippetThemeDemo() {
  const [useLight, setUseLight] = useState(false)

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

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={useLight}
            onChange={(e) => setUseLight(e.target.checked)}
          />
          Use Light Theme
        </label>
      </div>

      <CodeSnippet
        title="generics.ts"
        code={tsCode}
        language="typescript"
        theme={useLight ? (lightTheme as PrismTheme) : undefined}
      />
    </div>
  )
}
