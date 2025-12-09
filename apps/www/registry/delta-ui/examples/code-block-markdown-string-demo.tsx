import { CodeBlock } from "@/registry/delta-ui/delta/code-block"

const markdownCode = `\`\`\`py
def greet(name: str) -> str:
    """Return a greeting message."""
    return f"Hello, {name}!"

if __name__ == "__main__":
    message = greet("World")
    print(message)
\`\`\``

export default function CodeBlockMarkdownStringDemo() {
  return <CodeBlock code={markdownCode} filename="greet.py" />
}
