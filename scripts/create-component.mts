import { promises as fs } from "fs"
import path from "path"
import { execSync } from "child_process"

type RegistryType =
  | "registry:component"
  | "registry:hook"
  | "registry:block"
  | "registry:ui"
  | "registry:page"
  | "registry:file"
  | "registry:style"
  | "registry:theme"

interface CreateComponentOptions {
  name: string
  category: string
  type: RegistryType
}

// Utility functions for case conversion
function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase()
}

function toPascalCase(str: string): string {
  return str
    .split(/[-_\s]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("")
}

function toTitleCase(str: string): string {
  return str
    .split(/[-_\s]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
}

const TEMPLATES = {
  component: `"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface {{name}}Props extends React.HTMLAttributes<HTMLDivElement> {
  // Add your props here
}

export function {{name}}({
  className,
  ...props
}: {{name}}Props) {
  return (
    <div
      className={cn("", className)}
      {...props}
    />
  )
}
`,

  example: `"use client"

import * as React from "react"
import { {{name}} } from "@/registry/{{category}}/{{filename}}"

export function {{name}}Demo() {
  return (
    <div className="flex flex-col gap-4">
      <{{name}} />
    </div>
  )
}
`,

  mdx: `---
title: {{title}}
description: Description goes here
---

<ComponentPreview name="{{filename}}-demo" />

## Installation

<Tabs defaultValue="cli">

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>

<TabsContent value="cli">

\`\`\`bash
npx shadcn@latest add https://deltacomponents.dev/r/{{filename}}
\`\`\`

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Install the following dependencies:</Step>

\`\`\`bash
npm install [dependencies]
\`\`\`

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="{{filename}}" />

</Steps>

</TabsContent>

</Tabs>

## Usage

\`\`\`tsx
"use client"

import * as React from "react"
import { {{name}} } from "@/registry/{{category}}/{{filename}}"

export function Component() {
  return <{{name}} />
}
\`\`\`

## API Reference

### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| prop | type | description |
`,

  categoryRegistry: `import type { Registry } from "@/registry/schema"

export const {{category}}: Registry = [
  {
    name: "{{filename}}",
    type: "{{type}}",
    registryDependencies: [],
    files: [
      {
        path: "{{category}}/{{filename}}.tsx",
        type: "{{type}}",
      },
    ],
  },
]
`
}

async function createComponent({ name, category, type }: CreateComponentOptions) {
  // Convert component name to PascalCase and filename to kebab-case
  const componentName = toPascalCase(name)
  const fileName = toKebabCase(name)
  const titleName = toTitleCase(name)

  // Create component directory if it doesn't exist
  const componentDir = path.join(process.cwd(), "registry", category)
  await fs.mkdir(componentDir, { recursive: true })

  // Create component file
  const componentPath = path.join(componentDir, `${fileName}.tsx`)
  const componentContent = TEMPLATES.component.replace(/{{name}}/g, componentName)
  await fs.writeFile(componentPath, componentContent)

  // Create example file
  const examplePath = path.join(process.cwd(), "registry/examples", `${fileName}-demo.tsx`)
  const exampleContent = TEMPLATES.example
    .replace(/{{name}}/g, componentName)
    .replace(/{{category}}/g, category)
    .replace(/{{filename}}/g, fileName)
  await fs.writeFile(examplePath, exampleContent)

  // Update registry-examples.ts
  const examplesRegistryPath = path.join(process.cwd(), "registry", "registry-examples.ts")
  let examplesRegistryContent = ""

  try {
    // Try to read existing registry file
    examplesRegistryContent = await fs.readFile(examplesRegistryPath, "utf-8")
    
    // Check if example already exists in registry
    const exampleExists = examplesRegistryContent.includes(`name: "${fileName}-demo"`)
    
    if (!exampleExists) {
      // Add new example to existing registry
      const newExampleEntry = `  {
    name: "${fileName}-demo",
    type: "registry:example",
    files: [
      {
        path: "examples/${fileName}-demo.tsx",
        type: "registry:example",
      },
    ],
  },`
      
      examplesRegistryContent = examplesRegistryContent.replace(
        /export const examples: Registry = \[/,
        `export const examples: Registry = [${newExampleEntry}`
      )
      
      await fs.writeFile(examplesRegistryPath, examplesRegistryContent)
    } else {
      console.log(`\nℹ️ Example "${fileName}-demo" already exists in registry-examples.ts`)
    }
  } catch (error) {
    console.error("Error updating registry-examples.ts:", error)
  }

  // Create docs directory if it doesn't exist
  const docsDir = path.join(process.cwd(), "content/docs", category)
  await fs.mkdir(docsDir, { recursive: true })

  // Create MDX documentation
  const mdxPath = path.join(docsDir, `${fileName}.mdx`)
  const mdxContent = TEMPLATES.mdx
    .replace(/{{name}}/g, componentName)
    .replace(/{{title}}/g, titleName)
    .replace(/{{category}}/g, category)
    .replace(/{{filename}}/g, fileName)
    .replace(/{{type}}/g, type)
  await fs.writeFile(mdxPath, mdxContent)

  // Create or update category registry file
  const categoryRegistryPath = path.join(process.cwd(), "registry", `registry-${category}.ts`)
  let categoryRegistryContent = ""

  try {
    // Try to read existing registry file
    categoryRegistryContent = await fs.readFile(categoryRegistryPath, "utf-8")
    
    // Check if component already exists in registry
    const componentExists = categoryRegistryContent.includes(`name: "${fileName}"`)
    
    if (!componentExists) {
      // Add new component to existing registry
      const newRegistryEntry = `  {
    name: "${fileName}",
    type: "${type}",
    registryDependencies: [],
    files: [
      {
        path: "${category}/${fileName}.tsx",
        type: "${type}",
      },
    ],
  },`
      
      categoryRegistryContent = categoryRegistryContent.replace(
        /export const \w+: Registry = \[/,
        `export const ${category}: Registry = [${newRegistryEntry}`
      )
      
      await fs.writeFile(categoryRegistryPath, categoryRegistryContent)
    } else {
      console.log(`\nℹ️ Component "${fileName}" already exists in registry-${category}.ts`)
    }
  } catch {
    // Create new registry file if it doesn't exist
    categoryRegistryContent = TEMPLATES.categoryRegistry
      .replace(/{{category}}/g, category)
      .replace(/{{filename}}/g, fileName)
      .replace(/{{type}}/g, type)
    
    await fs.writeFile(categoryRegistryPath, categoryRegistryContent)
  }

  // Update main registry index
  const indexPath = path.join(process.cwd(), "registry/index.tsx")
  let indexContent = await fs.readFile(indexPath, "utf-8")

  // Check if category is already imported
  if (!indexContent.includes(`import { ${category} } from "@/registry/registry-${category}"`)) {
    // Add import
    indexContent = indexContent.replace(
      /import type { Registry } from "@\/registry\/schema"/,
      `import type { Registry } from "@/registry/schema"
import { ${category} } from "@/registry/registry-${category}"`
    )

    // Add to registry array
    indexContent = indexContent.replace(
      /export const registry: Registry = \[\.\.\.hooks/,
      `export const registry: Registry = [...hooks, ...${category}`
    )
    
    await fs.writeFile(indexPath, indexContent)
  }

  // Print instructions for updating docs-nav.tsx
  console.log("\n📝 Next steps:")
  console.log("1. Update the docs navigation by adding the following to config/docs.ts:")
  console.log(`   - Add "${titleName}" to the sidebarNav under the "${category}" section`)
  console.log(`   - The href should be "/docs/${category}/${fileName}"`)
  console.log("\n2. Run the build-registry script to update the registry:")
  console.log("   pnpm build-registry")
}

// Parse command line arguments
const args = process.argv.slice(2)
if (args.length < 2) {
  console.log("Usage: pnpm create-component <name> <category> [type]")
  console.log("\nAvailable types:")
  console.log("  registry:component (default)")
  console.log("  registry:hook")
  console.log("  registry:block")
  console.log("  registry:ui")
  console.log("  registry:page")
  console.log("  registry:file")
  console.log("  registry:style")
  console.log("  registry:theme")
  process.exit(1)
}

const [name, category, type = "registry:component"] = args

// Validate type
const validTypes: RegistryType[] = [
  "registry:component",
  "registry:hook",
  "registry:block",
  "registry:ui",
  "registry:page",
  "registry:file",
  "registry:style",
  "registry:theme",
]

if (!validTypes.includes(type as RegistryType)) {
  console.error(`Invalid type: ${type}`)
  console.log("\nAvailable types:")
  validTypes.forEach((t) => console.log(`  ${t}`))
  process.exit(1)
}

createComponent({ name, category, type: type as RegistryType }) 