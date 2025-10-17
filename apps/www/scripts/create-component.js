#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const args = process.argv.slice(2)
const componentName = args[0]
const componentType = args[1] || 'components' // ui, components, or blocks

if (!componentName) {
  console.error('Usage: node scripts/create-component.js <component-name> [ui|components|blocks]')
  process.exit(1)
}

if (!['ui', 'components', 'blocks'].includes(componentType)) {
  console.error('Component type must be one of: ui, components, blocks')
  process.exit(1)
}

const kebabCase = componentName.toLowerCase().replace(/\s+/g, '-')
const pascalCase = kebabCase.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')

// Component file template
const componentTemplate = `import * as React from "react"

import { cn } from "@/lib/utils"

interface ${pascalCase}Props extends React.HTMLAttributes<HTMLDivElement> {
  // Add your props here
}

export function ${pascalCase}({ className, ...props }: ${pascalCase}Props) {
  return (
    <div
      className={cn("", className)}
      {...props}
    >
      {/* Component content */}
    </div>
  )
}
`

// MDX documentation template
const docsTemplate = `---
title: ${pascalCase}
description: ${componentType === 'ui' ? 'A reusable UI component' : componentType === 'components' ? 'A complex component for Delta applications' : 'A pre-built block for rapid development'}.
---

<ComponentPreview name="${kebabCase}-demo" />

## Installation

<Installation name="${kebabCase}" />

## Usage

\`\`\`tsx
import { ${pascalCase} } from "@/components/ui/${kebabCase}"

export default function Example() {
  return (
    <${pascalCase}>
      Example content
    </${pascalCase}>
  )
}
\`\`\`

## API Reference

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| className | string | - | Additional CSS classes |
`

// Create component file
const componentDir = path.join(__dirname, '..', 'registry', 'delta-ui', componentType)
const componentFile = path.join(componentDir, `${kebabCase}.tsx`)

if (!fs.existsSync(componentDir)) {
  fs.mkdirSync(componentDir, { recursive: true })
}

if (fs.existsSync(componentFile)) {
  console.error(`Component ${componentFile} already exists`)
  process.exit(1)
}

fs.writeFileSync(componentFile, componentTemplate)
console.log(`✅ Created component: ${componentFile}`)

// Create documentation file
const docsDir = path.join(__dirname, '..', 'content', 'docs', 'components')
const docsFile = path.join(docsDir, `${kebabCase}.mdx`)

if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true })
}

if (fs.existsSync(docsFile)) {
  console.warn(`⚠️  Documentation file ${docsFile} already exists`)
} else {
  fs.writeFileSync(docsFile, docsTemplate)
  console.log(`✅ Created documentation: ${docsFile}`)
}

// Create example file for preview
const examplesDir = path.join(__dirname, '..', 'registry', 'delta-ui', 'examples')
const exampleFile = path.join(examplesDir, `${kebabCase}.tsx`)

// Generate appropriate example based on component type
let exampleTemplate
if (componentType === 'ui') {
  exampleTemplate = `import { ${pascalCase} } from "@/registry/delta-ui/delta/${kebabCase}"

export default function ${pascalCase}Example() {
  return (
    <div className="flex items-center justify-center p-8">
      <${pascalCase}>
        Example ${pascalCase} content
      </${pascalCase}>
    </div>
  )
}
`
} else if (componentType === 'components') {
  exampleTemplate = `import { ${pascalCase} } from "@/registry/delta-ui/components/${kebabCase}"

export default function ${pascalCase}Example() {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">${pascalCase} Demo</h3>
        <p className="text-sm text-muted-foreground">
          Interactive example of the ${pascalCase} component
        </p>
      </div>
      <${pascalCase}>
        Demo content for ${pascalCase}
      </${pascalCase}>
    </div>
  )
}
`
} else { // blocks
  exampleTemplate = `import { ${pascalCase} } from "@/registry/delta-ui/blocks/${kebabCase}"

export default function ${pascalCase}Example() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <${pascalCase} />
    </div>
  )
}
`
}

if (!fs.existsSync(examplesDir)) {
  fs.mkdirSync(examplesDir, { recursive: true })
}

if (!fs.existsSync(exampleFile)) {
  fs.writeFileSync(exampleFile, exampleTemplate)
  console.log(`✅ Created example: ${exampleFile}`)
}

// Create demo file for interactive examples
const demoFile = path.join(examplesDir, `${kebabCase}-demo.tsx`)

let demoTemplate
if (componentType === 'ui') {
  demoTemplate = `"use client"

import { useState } from "react"
import { ${pascalCase} } from "@/registry/delta-ui/delta/${kebabCase}"

export default function ${pascalCase}Demo() {
  const [state, setState] = useState(false)

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">${pascalCase} Demo</h2>
          <p className="text-muted-foreground">
            Interactive demonstration of the ${pascalCase} component with various configurations.
          </p>
        </div>

        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Basic Usage</h3>
          <${pascalCase}>
            Demo content for ${pascalCase}
          </${pascalCase}>
        </div>

        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Interactive Example</h3>
          <div className="space-y-4">
            <button 
              onClick={() => setState(!state)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm"
            >
              Toggle State: {state ? 'On' : 'Off'}
            </button>
            <${pascalCase} className={state ? "border-2 border-primary" : ""}>
              State-dependent ${pascalCase} content
            </${pascalCase}>
          </div>
        </div>
      </div>
    </div>
  )
}
`
} else if (componentType === 'components') {
  demoTemplate = `"use client"

import { useState } from "react"
import { ${pascalCase} } from "@/registry/delta-ui/components/${kebabCase}"

export default function ${pascalCase}Demo() {
  const [config, setConfig] = useState({
    variant: 'default',
    size: 'medium',
    disabled: false
  })

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">${pascalCase} Interactive Demo</h2>
          <p className="text-muted-foreground">
            Explore different configurations and features of the ${pascalCase} component.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Controls */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Configuration</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Variant</label>
                <select 
                  value={config.variant}
                  onChange={(e) => setConfig({...config, variant: e.target.value})}
                  className="w-full mt-1 p-2 border rounded-md"
                >
                  <option value="default">Default</option>
                  <option value="secondary">Secondary</option>
                  <option value="outline">Outline</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Size</label>
                <select 
                  value={config.size}
                  onChange={(e) => setConfig({...config, size: e.target.value})}
                  className="w-full mt-1 p-2 border rounded-md"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox"
                  checked={config.disabled}
                  onChange={(e) => setConfig({...config, disabled: e.target.checked})}
                  className="rounded"
                />
                <label className="text-sm font-medium">Disabled</label>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Preview</h3>
            <div className="border rounded-lg p-6 min-h-[200px] flex items-center justify-center">
              <${pascalCase} 
                variant={config.variant}
                size={config.size}
                disabled={config.disabled}
              >
                ${pascalCase} Demo Content
              </${pascalCase}>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
`
} else { // blocks
  demoTemplate = `"use client"

import { ${pascalCase} } from "@/registry/delta-ui/blocks/${kebabCase}"

export default function ${pascalCase}Demo() {
  return (
    <div className="w-full">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">${pascalCase} Block Demo</h2>
          <p className="text-muted-foreground">
            Full-featured demonstration of the ${pascalCase} block component.
          </p>
        </div>

        {/* Demo Section */}
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-muted p-4">
            <h3 className="font-semibold">Live Preview</h3>
          </div>
          <div className="p-0">
            <${pascalCase} />
          </div>
        </div>

        {/* Variations */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Variations</h3>
          <div className="grid gap-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Default Style</h4>
              <${pascalCase} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
`
}

if (!fs.existsSync(demoFile)) {
  fs.writeFileSync(demoFile, demoTemplate)
  console.log(`✅ Created demo: ${demoFile}`)
}

// Update registry files
function updateRegistryFiles() {
  // Update registry-ui.ts for UI components
  if (componentType === 'ui') {
    const registryUiPath = path.join(__dirname, '..', 'registry', 'registry-ui.ts')
    if (fs.existsSync(registryUiPath)) {
      const registryContent = fs.readFileSync(registryUiPath, 'utf8')
      
      // Check if component is already in registry
      if (!registryContent.includes(`name: "${kebabCase}"`)) {
        // Create new component entry
        const newEntry = `  {
    name: "${kebabCase}",
    type: "registry:ui",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "ui/${kebabCase}.tsx",
        type: "registry:ui",
      },
    ],
  },`
        
        // Insert after the opening bracket of the array
        const insertAfter = 'export const ui: Registry["items"] = ['
        const insertIndex = registryContent.indexOf(insertAfter) + insertAfter.length
        const updatedContent = registryContent.slice(0, insertIndex) + '\n' + newEntry + registryContent.slice(insertIndex)
        
        fs.writeFileSync(registryUiPath, updatedContent)
        console.log(`✅ Updated registry: ${registryUiPath}`)
      }
    }
  }

  // Update registry-examples.ts for all component types
  const registryExamplesPath = path.join(__dirname, '..', 'registry', 'registry-examples.ts')
  if (fs.existsSync(registryExamplesPath)) {
    const examplesContent = fs.readFileSync(registryExamplesPath, 'utf8')
    
    // Check if demo is already in registry
    if (!examplesContent.includes(`name: "${kebabCase}-demo"`)) {
      // Create new demo entry
      const newDemoEntry = `  {
    name: "${kebabCase}-demo",
    type: "registry:example",
    registryDependencies: ["https://deltacomponents.dev/r/${kebabCase}.json"],
    files: [
      {
        path: "examples/${kebabCase}-demo.tsx",
        type: "registry:example",
      },
    ],
  },`
      
      // Insert after the opening bracket of the array
      const insertAfter = 'export const examples: Registry["items"] = ['
      const insertIndex = examplesContent.indexOf(insertAfter) + insertAfter.length
      const updatedContent = examplesContent.slice(0, insertIndex) + '\n' + newDemoEntry + examplesContent.slice(insertIndex)
      
      fs.writeFileSync(registryExamplesPath, updatedContent)
      console.log(`✅ Updated registry: ${registryExamplesPath}`)
    }
  }
}

// Call the registry update function
updateRegistryFiles()

// Optionally update docs sidebar for components
if (componentType === 'components') {
  const sidebarPath = path.join(__dirname, '..', 'components', 'docs-sidebar.tsx')
  
  if (fs.existsSync(sidebarPath)) {
    const sidebarContent = fs.readFileSync(sidebarPath, 'utf8')
    
    // Check if component is already in sidebar
    if (!sidebarContent.includes(`/docs/components/${kebabCase}`)) {
      console.log(`\n📝 Manual action required:`)
      console.log(`   Add component to docs sidebar if needed:`)
      console.log(`   File: components/docs-sidebar.tsx`)
      console.log(`   Add to TOP_LEVEL_SECTIONS or component-specific navigation`)
    }
  }
}

console.log(`\n🎉 Component "${kebabCase}" created successfully!`)
console.log(`\nNext steps:`)
console.log(`1. Edit the component: ${componentFile}`)
console.log(`2. Update the documentation: ${docsFile}`)
console.log(`3. Update the example: ${exampleFile}`)
console.log(`4. Customize the demo: ${demoFile}`)
if (componentType === 'ui') {
  console.log(`5. Registry files have been automatically updated`)
  console.log(`6. Run: npm run registry:build to rebuild the registry`)
  console.log(`7. Run: npm run dev to see your changes`)
} else if (componentType === 'components') {
  console.log(`5. Add to sidebar navigation if it's a main component`)
  console.log(`6. Demo has been added to registry automatically`)
  console.log(`7. Run: npm run registry:build to rebuild the registry`)
  console.log(`8. Run: npm run dev to see your changes`)
} else {
  console.log(`5. Demo has been added to registry automatically`)
  console.log(`6. Run: npm run registry:build to rebuild the registry`)
  console.log(`7. Run: npm run dev to see your changes`)
}