import { CodeBlock } from "@/registry/delta-ui/delta/code-block"

export default function CodeBlockExample() {
  return (
    <div className="flex items-center justify-center p-8">
      {/* @ts-expect-error - CodeBlock props are optional but children not supported */}
      <CodeBlock>Example CodeBlock content</CodeBlock>
    </div>
  )
}
