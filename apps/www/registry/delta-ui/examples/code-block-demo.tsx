import { CodeBlock } from "@/registry/delta-ui/ui/code-block"

export default function CodeBlockDemo() {
  return (
    <CodeBlock
      code={`# Hello World in Python
def main():
    print("Hello, World!")

if __name__ == "__main__":
    main()`}
      language="python"
      filename="hello.py"
      showLineNumbers={true}
    />
  )
}
