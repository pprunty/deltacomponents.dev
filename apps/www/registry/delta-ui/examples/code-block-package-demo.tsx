import { CodeBlock } from "@/registry/delta-ui/delta/code-block"

export default function CodeBlockPackageDemo() {
  return (
    <CodeBlock
      npm="npm install @radix-ui/react-dropdown-menu"
      yarn="yarn add @radix-ui/react-dropdown-menu"
      pnpm="pnpm add @radix-ui/react-dropdown-menu"
      bun="bun add @radix-ui/react-dropdown-menu"
      defaultPackageManager="npm"
      language="bash"
    />
  )
}
