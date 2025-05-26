"use client"

import CodeBlock from "@/registry/media/code-block"

export default function CodeBlockDemo() {
  const code = `def calculate_factorial(n):
    if n < 0:
        raise ValueError("Factorial is not defined for negative numbers")
    if n == 0 or n == 1:
        return 1
    return n * calculate_factorial(n - 1)

def main():
    try:
        number = int(input("Enter a number: "))
        result = calculate_factorial(number)
        print(f"The factorial of {number} is {result}")
    except ValueError as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()`

  return (
    <div className="w-full py-4">
      <CodeBlock
        code={code}
        language="python"
        showLineNumbers
        showCopyButton
        showExpandButton
      />
    </div>
  )
}
