'use client';

import CodeBlock from '@/delta/components/code-block';

export default function CodeBlockThemesDemo() {
  const pythonCode = `def hello_world():
    print("Hello, World!")

hello_world()`;

  const javascriptCode = `function helloWorld() {
  console.log("Hello, World!");
}

helloWorld();`;

  const typescriptCode = `function helloWorld(): void {
  console.log("Hello, World!");
}

helloWorld();`;

  const javaCode = `public class HelloWorld {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}`;

  const goCode = `package main

import "fmt"

func main() {
  fmt.Println("Hello, World!")
}`;

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Python - GitHub Theme</h3>
        <CodeBlock
          code={pythonCode}
          language="python"
          showLineNumbers
          showCopyButton
          showExpandButton
          maxHeight="200px"
          theme="github"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">
          JavaScript - Vitesse Theme
        </h3>
        <CodeBlock
          code={javascriptCode}
          language="javascript"
          showLineNumbers
          showCopyButton
          showExpandButton
          maxHeight="200px"
          theme="vitesse"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">
          TypeScript - Gruvbox Theme
        </h3>
        <CodeBlock
          code={typescriptCode}
          language="typescript"
          showLineNumbers
          showCopyButton
          showExpandButton
          maxHeight="200px"
          theme="gruvbox"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Java - Plastic Theme</h3>
        <CodeBlock
          code={javaCode}
          language="java"
          showLineNumbers
          showCopyButton
          showExpandButton
          maxHeight="200px"
          theme="plastic"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Go - Default Theme</h3>
        <CodeBlock
          code={goCode}
          language="go"
          showLineNumbers
          showCopyButton
          showExpandButton
          maxHeight="200px"
          theme="default"
        />
      </div>
    </div>
  );
}
