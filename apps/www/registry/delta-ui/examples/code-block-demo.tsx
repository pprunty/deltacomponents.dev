import { CodeBlock } from "@/registry/delta-ui/delta/code-block"

export default function CodeBlockDemo() {
  return (
    <CodeBlock
      code={`# Hello World in Python
def main():
    print("Hello, World!")

if __name__ == "__main__":
    main()`}
      language="python"
      showLineNumbers={false}
      className="border-0 rounded-xl"
    />
  )
}
