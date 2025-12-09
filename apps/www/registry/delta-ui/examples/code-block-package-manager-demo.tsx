import { CodeBlock } from "@/registry/delta-ui/delta/code-block"

export default function CodeBlockPackageManagerDemo() {
  return (
    <CodeBlock
      npm="npx shadcn@latest add button"
      yarn="npx shadcn@latest add button"
      pnpm="pnpm dlx shadcn@latest add button"
      bun="bunx --bun shadcn@latest add button"
      defaultPackageManager="npm"
    />
  )
}
