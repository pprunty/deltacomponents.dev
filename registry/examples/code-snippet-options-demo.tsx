"use client"

import React, { useState } from "react"

import { CodeSnippet } from "@/registry/media/code-snippet"

export default function CodeSnippetOptionsDemo() {
  const [showTitle, setShowTitle] = useState(true)
  const [showBorder, setShowBorder] = useState(true)
  const [showLineNumbers, setShowLineNumbers] = useState(true)

  const code = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Calculate the 10th Fibonacci number
const result = fibonacci(10);
console.log(\`Fibonacci(10) = \${result}\`);

// More efficient iterative approach
function fibonacciIterative(n) {
  let a = 0, b = 1, temp;
  for (let i = 2; i <= n; i++) {
    temp = a + b;
    a = b;
    b = temp;
  }
  return n === 0 ? a : b;
}`

  return (
    <div className="w-full py-4">
      <div className="space-y-4">
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showTitle}
              onChange={(e) => setShowTitle(e.target.checked)}
            />
            Show Title
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showBorder}
              onChange={(e) => setShowBorder(e.target.checked)}
            />
            Show Border
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showLineNumbers}
              onChange={(e) => setShowLineNumbers(e.target.checked)}
            />
            Show Line Numbers
          </label>
        </div>

        <CodeSnippet
          title={showTitle ? "fibonacci.js" : undefined}
          code={code}
          language="javascript"
          border={showBorder}
          showLineNumbers={showLineNumbers}
        />
      </div>
    </div>
  )
}
