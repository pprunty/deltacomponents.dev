import type { PrismTheme } from "prism-react-renderer"

import { CodeBlock } from "@/registry/delta-ui/delta/code-block"

const draculaLight: PrismTheme = {
  plain: {
    color: "#282a36",
    backgroundColor: "#f8f8f2",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: {
        color: "#6272a4",
        fontStyle: "italic",
      },
    },
    {
      types: ["punctuation"],
      style: {
        color: "#282a36",
      },
    },
    {
      types: ["property", "tag", "constant", "symbol", "deleted"],
      style: {
        color: "#d6336c",
      },
    },
    {
      types: ["boolean", "number"],
      style: {
        color: "#7c3aed",
      },
    },
    {
      types: ["selector", "attr-name", "string", "char", "builtin", "inserted"],
      style: {
        color: "#0d9488",
      },
    },
    {
      types: ["operator", "entity", "url", "variable"],
      style: {
        color: "#282a36",
      },
    },
    {
      types: ["atrule", "attr-value", "function", "class-name"],
      style: {
        color: "#ca8a04",
      },
    },
    {
      types: ["keyword"],
      style: {
        color: "#d6336c",
      },
    },
    {
      types: ["regex", "important"],
      style: {
        color: "#ea580c",
      },
    },
  ],
}

const draculaDark: PrismTheme = {
  plain: {
    color: "#f8f8f2",
    backgroundColor: "#282a36",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: {
        color: "#6272a4",
        fontStyle: "italic",
      },
    },
    {
      types: ["punctuation"],
      style: {
        color: "#f8f8f2",
      },
    },
    {
      types: ["property", "tag", "constant", "symbol", "deleted"],
      style: {
        color: "#ff79c6",
      },
    },
    {
      types: ["boolean", "number"],
      style: {
        color: "#bd93f9",
      },
    },
    {
      types: ["selector", "attr-name", "string", "char", "builtin", "inserted"],
      style: {
        color: "#50fa7b",
      },
    },
    {
      types: ["operator", "entity", "url", "variable"],
      style: {
        color: "#f8f8f2",
      },
    },
    {
      types: ["atrule", "attr-value", "function", "class-name"],
      style: {
        color: "#f1fa8c",
      },
    },
    {
      types: ["keyword"],
      style: {
        color: "#ff79c6",
      },
    },
    {
      types: ["regex", "important"],
      style: {
        color: "#ffb86c",
      },
    },
  ],
}
const pythonCode = `def fibonacci(n: int) -> list[int]:
    """Generate Fibonacci sequence up to n numbers. This is a long comment to test horizontal scrolling behavior in the code block component."""
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    
    sequence = [0, 1]
    while len(sequence) < n:
        sequence.append(sequence[-1] + sequence[-2])  # Add the sum of the last two numbers to the sequence list for Fibonacci calculation
    
    return sequence

def fibonacci_recursive(n: int, memo: dict[int, int] | None = None) -> int:
    """Calculate the nth Fibonacci number using memoization for better performance in recursive calls."""
    if memo is None:
        memo = {}
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fibonacci_recursive(n - 1, memo) + fibonacci_recursive(n - 2, memo)
    return memo[n]

if __name__ == "__main__":
    result = fibonacci(10)
    print(f"Fibonacci sequence: {result}")  # Output: Fibonacci sequence: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34] for the first 10 numbers`

export default function CodeBlockPythonDemo() {
  return (
    <CodeBlock
      code={pythonCode}
      language="python"
      filename="fibonacci.py"
      adaptiveTheme={{
        light: draculaLight,
        dark: draculaDark,
      }}
      useThemeBackground
    />
  )
}
