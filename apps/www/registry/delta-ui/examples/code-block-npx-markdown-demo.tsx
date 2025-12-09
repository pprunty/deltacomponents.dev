import { CodeBlock } from "@/registry/delta-ui/delta/code-block"

const npxMarkdownCode = `\`\`\`npx
shadcn@latest add button
\`\`\``

export default function CodeBlockNpxMarkdownDemo() {
  return <CodeBlock code={npxMarkdownCode} />
}
