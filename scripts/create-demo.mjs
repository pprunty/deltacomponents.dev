#!/usr/bin/env node
import { promises as fs } from "fs"
import path from "path"
import { fileURLToPath } from "url"

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.join(__dirname, "..")

// Site URL for constructing full dependency URLs
const SITE_URL = "https://deltacomponents.dev" // This should match your site URL in config/site.ts

// Parse command line arguments
const args = process.argv.slice(2)
if (args.length < 2) {
  console.error("Usage: node create-demo.mjs <component-name> <demo-name>")
  console.error("Example: node create-demo.mjs tabs spotify")
  process.exit(1)
}

const componentName = args[0]
const demoSuffix = args[1]
const demoName = `${componentName}-${demoSuffix}-demo`

// Helper function to find a component file in any subdirectory of registry
async function findComponentFile(componentName) {
  // Define potential subdirectories to search
  const subdirs = [
    "components",
    "blocks",
    "inputs",
    "animations",
    "hooks",
    "landing-page",
    "media",
  ]

  for (const subdir of subdirs) {
    const componentPath = path.join(
      rootDir,
      "registry",
      subdir,
      `${componentName}.tsx`
    )
    try {
      await fs.access(componentPath)
      // Component found
      return { path: componentPath, category: subdir }
    } catch (err) {
      // Component not found in this directory, continue searching
    }
  }

  // If we get here, the component was not found in any of the subdirectories
  return null
}

async function main() {
  try {
    // Try to read site URL from config if available
    try {
      const siteConfigPath = path.join(rootDir, "config/site.ts")
      const siteConfigContent = await fs.readFile(siteConfigPath, "utf8")
      const urlMatch = siteConfigContent.match(/url:\s*["']([^"']+)["']/)
      if (urlMatch && urlMatch[1]) {
        // If URL is found in config, update the global SITE_URL
        SITE_URL = urlMatch[1]
      }
    } catch (error) {
      console.warn("Could not read site config, using default URL:", SITE_URL)
    }

    // Find the component in registry subdirectories
    const component = await findComponentFile(componentName)

    if (!component) {
      console.error(
        `Component ${componentName}.tsx does not exist in any registry subdirectory!`
      )
      process.exit(1)
    }

    console.info(
      `Found component ${componentName}.tsx in registry/${component.category}`
    )

    // Create example file
    const exampleDir = path.join(rootDir, "registry", "examples")
    const examplePath = path.join(exampleDir, `${demoName}.tsx`)

    // Check if demo already exists
    try {
      await fs.access(examplePath)
      console.error(`Demo file ${demoName}.tsx already exists!`)
      process.exit(1)
    } catch (err) {
      // This is expected, proceed
    }

    // Read the component file to analyze its structure
    const componentContent = await fs.readFile(component.path, "utf8")

    // Generate demo file content based on component analysis
    const demoContent = await generateDemoContent(
      componentName,
      demoSuffix,
      componentContent,
      component.category
    )
    await fs.writeFile(examplePath, demoContent)
    console.log(`✅ Created demo file: ${examplePath}`)

    // Update registry-examples.ts
    await updateExamplesRegistry(componentName, demoName)
    console.log(`✅ Updated registry-examples.ts`)

    // Update docs MDX file
    await updateComponentDocs(componentName, demoName, component.category)
    console.log(`✅ Updated component docs for ${componentName}`)

    console.log(`\n🎉 Successfully created demo ${demoName}!`)
  } catch (error) {
    console.error(`❌ Error creating demo: ${error.message}`)
    process.exit(1)
  }
}

async function generateDemoContent(
  componentName,
  demoSuffix,
  componentContent,
  category
) {
  // Convert component name to PascalCase properly handling kebab-case
  const ComponentName = kebabToPascalCase(componentName)

  // Create capitalized demo name for the function
  const DemoName = `${ComponentName}${capitalizeFirstLetter(demoSuffix)}Demo`

  // Generate a simple, generic demo template
  return `"use client"

import React from "react";
${
  componentName.includes("-") || componentContent.includes("export default")
    ? `import ${ComponentName} from "@/registry/${category}/${componentName}";`
    : `import { ${ComponentName} } from "@/registry/${category}/${componentName}";`
}

export default function ${DemoName}() {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 p-4">
      <h2 className="text-2xl font-bold">${ComponentName} ${capitalizeFirstLetter(demoSuffix)} Demo</h2>
      
      <div className="p-6 border rounded-lg">
        {/* Component usage goes here */}
        <p className="text-muted-foreground mb-4">Add your custom ${demoSuffix} demo for the ${ComponentName} component below:</p>
        
        <${ComponentName}>
          {/* Component content goes here */}
        </${ComponentName}>
      </div>
    </div>
  );
}
`
}

async function updateExamplesRegistry(componentName, demoName) {
  const registryPath = path.join(rootDir, "registry", "registry-examples.ts")
  const registryContent = await fs.readFile(registryPath, "utf8")

  // Find the position to insert the new example
  const lastItemPos = registryContent.lastIndexOf("}")
  if (lastItemPos === -1) {
    throw new Error("Could not parse registry-examples.ts")
  }

  // Define special dependencies for specific components
  let dependencies = [componentName]

  // Special cases for specific component demos
  if (componentName === "tabs" && demoName.includes("spotify")) {
    dependencies.push("x-scrollable")
  }

  // Create the new example entry with full URLs for dependencies
  const formattedDependencies = dependencies
    .map((dep) => `"${SITE_URL}/r/${dep}.json"`)
    .join(", ")

  const newExampleEntry = `  {
    name: "${demoName}",
    type: "registry:block",
    registryDependencies: [${formattedDependencies}],
    files: [
      {
        path: "examples/${demoName}.tsx",
        type: "registry:block",
      },
    ],
  },`

  // Insert the new example
  const updatedContent =
    registryContent.slice(0, lastItemPos) +
    newExampleEntry +
    registryContent.slice(lastItemPos)

  await fs.writeFile(registryPath, updatedContent)
}

async function updateComponentDocs(componentName, demoName, category) {
  // Check different possible locations for the docs file
  const possiblePaths = [
    // Standard component docs
    path.join(rootDir, "content", "docs", "components", `${componentName}.mdx`),
    // Category-specific docs
    path.join(rootDir, "content", "docs", category, `${componentName}.mdx`),
    // Special case for blocks
    path.join(rootDir, "content", "docs", "blocks", `${componentName}.mdx`),
  ]

  let docsPath = null

  // Try each possible path until we find one that exists
  for (const p of possiblePaths) {
    try {
      await fs.access(p)
      docsPath = p
      break
    } catch (err) {
      // File doesn't exist, try the next path
    }
  }

  if (!docsPath) {
    console.warn(
      `Warning: Could not find docs file for ${componentName}. Tried paths: ${possiblePaths.join(", ")}`
    )
    return
  }

  try {
    // Read the docs file
    const docsContent = await fs.readFile(docsPath, "utf8")

    // Add the new component preview at the end of the file
    const updatedContent =
      docsContent.trim() + '\n\n<ComponentPreview name="' + demoName + '" />\n'

    await fs.writeFile(docsPath, updatedContent)
    console.log(`✅ Updated docs file: ${docsPath}`)
  } catch (err) {
    console.warn(
      `Warning: Could not update docs for ${componentName}: ${err.message}`
    )
  }
}

// Helper function to convert kebab-case to PascalCase for component names
function kebabToPascalCase(string) {
  return string
    .split("-")
    .map((part) => capitalizeFirstLetter(part))
    .join("")
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// Run the script
main()
