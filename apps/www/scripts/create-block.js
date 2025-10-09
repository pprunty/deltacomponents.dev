#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const args = process.argv.slice(2)
const blockName = args[0]
const category = args[1] || 'featured'

if (!blockName) {
  console.error('Usage: node scripts/create-block.js <block-name> [category]')
  console.error('Categories: featured, agents, audio, landing-page')
  process.exit(1)
}

const kebabCase = blockName.toLowerCase().replace(/\s+/g, '-')
const pascalCase = kebabCase.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')

// Block page template
const blockPageTemplate = `"use client"

import { ${pascalCase} } from "@/registry/delta-ui/blocks/${kebabCase}/components/${kebabCase}"

export default function ${pascalCase}Page() {
  return (
    <div className="min-h-screen w-full bg-background p-6">
      <div className="mx-auto max-w-7xl">
        <${pascalCase} />
      </div>
    </div>
  )
}
`

// Block component template
const blockComponentTemplate = `"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface ${pascalCase}Props extends React.HTMLAttributes<HTMLDivElement> {
  // Add your props here
}

export function ${pascalCase}({ className, ...props }: ${pascalCase}Props) {
  return (
    <div
      className={cn("w-full", className)}
      {...props}
    >
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">${pascalCase}</h1>
          <p className="text-muted-foreground">
            ${pascalCase} block component for your application.
          </p>
        </div>
        
        <div className="rounded-lg border p-8">
          <p className="text-center text-muted-foreground">
            ${pascalCase} content goes here. Customize this component to match your needs.
          </p>
        </div>
      </div>
    </div>
  )
}
`

// Create block directory structure
const blockDir = path.join(__dirname, '..', 'registry', 'delta-ui', 'blocks', kebabCase)
const componentsDir = path.join(blockDir, 'components')

if (!fs.existsSync(blockDir)) {
  fs.mkdirSync(blockDir, { recursive: true })
}

if (!fs.existsSync(componentsDir)) {
  fs.mkdirSync(componentsDir, { recursive: true })
}

// Create page.tsx
const pageFile = path.join(blockDir, 'page.tsx')
if (fs.existsSync(pageFile)) {
  console.error(`Block ${pageFile} already exists`)
  process.exit(1)
}

fs.writeFileSync(pageFile, blockPageTemplate)
console.log(`✅ Created block page: ${pageFile}`)

// Create component file
const componentFile = path.join(componentsDir, `${kebabCase}.tsx`)
if (fs.existsSync(componentFile)) {
  console.error(`Component ${componentFile} already exists`)
  process.exit(1)
}

fs.writeFileSync(componentFile, blockComponentTemplate)
console.log(`✅ Created block component: ${componentFile}`)

// Update registry-blocks.ts
const registryBlocksPath = path.join(__dirname, '..', 'registry', 'registry-blocks.ts')
if (fs.existsSync(registryBlocksPath)) {
  const registryContent = fs.readFileSync(registryBlocksPath, 'utf8')
  
  // Check if block is already in registry
  if (!registryContent.includes(`name: "${kebabCase}"`)) {
    // Create new block entry
    const newEntry = `  {
    name: "${kebabCase}",
    description: "${pascalCase} block",
    type: "registry:block",
    registryDependencies: [],
    files: [
      {
        path: "blocks/${kebabCase}/page.tsx",
        type: "registry:page",
        target: "app/${kebabCase}/page.tsx",
      },
      {
        path: "blocks/${kebabCase}/components/${kebabCase}.tsx",
        type: "registry:component",
        target: "components/${kebabCase}.tsx",
      },
    ],
    meta: {
      iframeHeight: "600px",
      container: "w-full p-6",
      mobile: "component",
    },
    categories: ["${category}"],
  },`
    
    // Insert before the closing bracket
    const insertBefore = ']'
    const insertIndex = registryContent.lastIndexOf(insertBefore)
    const updatedContent = registryContent.slice(0, insertIndex) + newEntry + '\n' + registryContent.slice(insertIndex)
    
    fs.writeFileSync(registryBlocksPath, updatedContent)
    console.log(`✅ Updated registry: ${registryBlocksPath}`)
  } else {
    console.log(`⚠️  Block already exists in registry: ${kebabCase}`)
  }
}

console.log(`\n🎉 Block "${kebabCase}" created successfully!`)
console.log(`\nNext steps:`)
console.log(`1. Edit the block page: ${pageFile}`)
console.log(`2. Edit the block component: ${componentFile}`)
console.log(`3. Update the registry entry in: ${registryBlocksPath}`)
console.log(`4. Run: npm run registry:build to rebuild the registry`)
console.log(`5. Run: npm run dev to see your changes`)
console.log(`\nThe block will be available at: /blocks/${category}`)