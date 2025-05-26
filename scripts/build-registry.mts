import { execSync } from "child_process"
import { randomUUID } from "crypto"
import { promises as fs } from "fs"
import path from "path"
import { fileURLToPath } from "url"
import * as ts from "typescript"

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.join(__dirname, "..")

// Get site URL from config - we need to read the file and extract the URL
// since we can't directly import TypeScript modules in Node.js scripts
async function getSiteURL(): Promise<string> {
  try {
    const siteConfigPath = path.join(rootDir, "config/site.ts")
    const siteConfigContent = await fs.readFile(siteConfigPath, "utf8")

    // Extract the URL using regex - this is a simple way to get the value
    const urlMatch = siteConfigContent.match(/url:\s*["']([^"']+)["']/)
    if (urlMatch && urlMatch[1]) {
      return urlMatch[1]
    }

    // Fallback to default URL if not found
    return "https://deltacomponents.dev"
  } catch (error) {
    console.warn("Could not read site config, using default URL", error)
    return "https://deltacomponents.dev"
  }
}

// We'll set this later in the buildRegistry function
let SITE_URL = "https://deltacomponents.dev"

// Define types
interface RegistryItemFile {
  path: string
  type: string
  target?: string
}

interface RegistryItem {
  name: string
  type: string
  files?: RegistryItemFile[]
  dependencies?: string[]
  devDependencies?: string[]
  registryDependencies?: string[]
  tags?: string[]
}

type Registry = RegistryItem[]

// Define the schema for the shadcn registry format
interface ShadcnRegistryItem {
  name: string
  type: string
  files: Array<{
    path: string
    type: string
  }>
  dependencies?: string[]
  devDependencies?: string[]
  registryDependencies?: string[]
}

interface ShadcnRegistry {
  $schema: string
  homepage: string
  name: string
  items: ShadcnRegistryItem[]
}

// Function to read registry files using TypeScript compiler
async function loadRegistryFile(filePath: string): Promise<Registry> {
  console.info(`📂 Reading registry file: ${filePath}`)

  try {
    // Read the file content
    const fullPath = path.join(rootDir, filePath)
    const content = await fs.readFile(fullPath, "utf8")

    // Create a temporary directory with a unique ID
    const tempDir = path.join(rootDir, ".temp", randomUUID())
    await fs.mkdir(tempDir, { recursive: true })

    // Create a simplified version of the file
    const simplifiedFilePath = path.join(tempDir, "registry-data.ts")

    // Extract the registry export name using regex
    const exportMatch = content.match(/export\s+const\s+(\w+)\s*:/m)
    if (!exportMatch) {
      throw new Error(`Could not find export in ${filePath}`)
    }

    const exportName = exportMatch[1]

    // Create a simplified file that can be transpiled and executed by Node
    const simplifiedContent = `
    // Simplified module
    export const ${exportName} = ${content.split("=")[1].trim()}
    export default ${exportName};
    `

    await fs.writeFile(simplifiedFilePath, simplifiedContent)

    // Transpile the TypeScript file to JavaScript
    const outputPath = path.join(tempDir, "registry-data.js")

    // Create a temporary tsconfig.json for the transpilation
    const tsconfigPath = path.join(tempDir, "tsconfig.json")
    const tsconfig = {
      compilerOptions: {
        target: "es2020",
        module: "commonjs",
        esModuleInterop: true,
        resolveJsonModule: true,
        moduleResolution: "node",
        outDir: tempDir,
      },
      include: [simplifiedFilePath],
      exclude: ["node_modules"],
    }

    await fs.writeFile(tsconfigPath, JSON.stringify(tsconfig, null, 2))

    // Compile the file using TypeScript
    try {
      execSync(`npx tsc --project ${tsconfigPath}`, {
        cwd: rootDir,
        stdio: "pipe",
      })
    } catch (error: unknown) {
      // Even if there are errors, try to continue if the output file exists
      const errorMessage =
        error instanceof Error ? error.message : String(error)
      console.warn(
        `Warning: TypeScript compilation had issues: ${errorMessage}`
      )
    }

    // Create a script to extract the data
    const extractorPath = path.join(tempDir, "extractor.js")
    const extractorContent = `
    const fs = require('fs');
    const path = require('path');
    try {
      // Try to load the data
      const fileData = require('./registry-data.js');
      const key = Object.keys(fileData).find(k => k !== 'default' && Array.isArray(fileData[k]));
      const data = key ? fileData[key] : (fileData.default || []);
      
      // Write the data to a JSON file
      fs.writeFileSync(path.join(__dirname, 'output.json'), JSON.stringify(data, null, 2));
    } catch (err) {
      console.error('Error loading registry data:', err);
      fs.writeFileSync(path.join(__dirname, 'output.json'), '[]');
    }
    `

    await fs.writeFile(extractorPath, extractorContent)

    // Run the extractor
    try {
      execSync(`node ${extractorPath}`, {
        cwd: tempDir,
        stdio: "pipe",
      })

      // Read the JSON output
      const outputData = await fs.readFile(
        path.join(tempDir, "output.json"),
        "utf8"
      )
      const registryData = JSON.parse(outputData) as Registry

      console.info(
        `✅ Successfully extracted ${registryData.length} items from ${filePath}`
      )

      // Clean up the temp directory
      await fs.rm(tempDir, { recursive: true, force: true }).catch((e) => {
        console.warn(
          `Warning: Could not clean up temp directory: ${e.message || e}`
        )
      })

      return registryData
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error)
      console.error(`❌ Error extracting registry data: ${errorMessage}`)

      // Try a fallback approach with direct file loading
      try {
        // Create a simple Node file to read the registry directly
        const fallbackPath = path.join(tempDir, "fallback.js")
        const fallbackContent = `
        const fs = require('fs');
        
        // Load the file content
        const content = \`${content.replace(/`/g, "\\`")}\`;
        
        // Extract just the array part using a more aggressive approach
        let startBracket = content.indexOf('[');
        let endBracket = content.lastIndexOf(']');
        
        if (startBracket !== -1 && endBracket !== -1) {
          let arrayContent = content.substring(startBracket, endBracket + 1);
          
          // Clean up TypeScript type annotations
          arrayContent = arrayContent
            .replace(/: [a-zA-Z_<>|\\[\\]]+/g, '')
            .replace(/\\/\\//g, '#####') // preserve comments temporarily
            .replace(/\/\\*[\\s\\S]*?\\*\\//g, '') // remove block comments
            .replace(/#####/g, '\\/\\/'); // restore line comments
          
          // Try to parse it
          try {
            const result = eval('(' + arrayContent + ')');
            fs.writeFileSync('fallback-output.json', JSON.stringify(result, null, 2));
          } catch (e) {
            console.error('Error parsing array content:', e);
            fs.writeFileSync('fallback-output.json', '[]');
          }
        } else {
          fs.writeFileSync('fallback-output.json', '[]');
        }
        `

        await fs.writeFile(fallbackPath, fallbackContent)

        // Execute the fallback
        execSync(`node ${fallbackPath}`, {
          cwd: tempDir,
          stdio: "pipe",
        })

        // Read the fallback output
        const fallbackData = await fs.readFile(
          path.join(tempDir, "fallback-output.json"),
          "utf8"
        )
        const fallbackRegistry = JSON.parse(fallbackData) as Registry

        console.info(
          `✅ Successfully extracted ${fallbackRegistry.length} items from ${filePath} (fallback method)`
        )

        // Clean up
        await fs.rm(tempDir, { recursive: true, force: true }).catch(() => {})

        return fallbackRegistry
      } catch (fallbackError: unknown) {
        const fallbackErrorMessage =
          fallbackError instanceof Error
            ? fallbackError.message
            : String(fallbackError)
        console.error(
          `❌ Fallback extraction also failed: ${fallbackErrorMessage}`
        )

        // Manual inspection of the files - helpful for debugging
        try {
          const files = await fs.readdir(tempDir)
          console.info(`Files in temp directory: ${files.join(", ")}`)

          if (files.includes("registry-data.js")) {
            const jsContent = await fs.readFile(
              path.join(tempDir, "registry-data.js"),
              "utf8"
            )
            console.info(
              `JS content (first 200 chars): ${jsContent.substring(0, 200)}...`
            )
          }
        } catch (e) {}

        return []
      }
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error(`❌ Error processing file ${filePath}: ${errorMessage}`)
    return []
  }
}

// Function to deduplicate registry items by name
function deduplicateRegistry(registry: Registry): Registry {
  const itemMap = new Map<string, RegistryItem>()

  for (const item of registry) {
    if (!item.name) continue
    itemMap.set(item.name, item)
  }

  return Array.from(itemMap.values())
}

/**
 * Ensures that demo components have the proper registry dependencies to their base components.
 * For example, "tabs-demo" should depend on "tabs".
 */
function ensureDemoDependencies(registry: Registry): Registry {
  // Create a set of all available component names for reference
  const availableComponents = new Set(registry.map((item) => item.name))

  // Process each registry item
  return registry.map((item) => {
    // Check if this is a demo component (name ends with -demo)
    if (item.name.endsWith("-demo")) {
      // Extract the base component name by removing the '-demo' suffix
      const baseComponentName = item.name.replace(/-demo$/, "")

      // Check if the base component exists
      if (availableComponents.has(baseComponentName)) {
        // Initialize registryDependencies array if it doesn't exist
        if (!item.registryDependencies) {
          item.registryDependencies = []
        }

        // Add the base component as a dependency if it's not already included
        if (!item.registryDependencies.includes(baseComponentName)) {
          console.info(
            `🔗 Adding ${baseComponentName} as dependency for ${item.name}`
          )
          item.registryDependencies.push(baseComponentName)
        }
      }
    }

    return item
  })
}

/**
 * Function to transform registry dependencies to full URLs if they are internal components
 */
function transformRegistryDependencies(
  registry: Registry,
  registryDependencies?: string[]
): string[] | undefined {
  if (!registryDependencies || registryDependencies.length === 0) {
    return undefined
  }

  // Create a set of available component names for quick lookup
  const availableComponents = new Set(registry.map((item) => item.name))

  // Transform each dependency
  return registryDependencies.map((dep) => {
    // If this is an internal component, use the full URL
    if (availableComponents.has(dep)) {
      return `${SITE_URL}/r/${dep}.json`
    }
    // Otherwise, keep it as is (for external dependencies like "button")
    return dep
  })
}

async function buildRegistry() {
  try {
    console.info("💽 Building registry...")

    // Get the site URL from config
    SITE_URL = await getSiteURL()
    console.info(`🌐 Using site URL: ${SITE_URL}`)

    // Dynamically load registry files
    console.info("📑 Loading registry files...")
    const registryFiles = [
      //       'registry/registry-hooks.ts',
      "registry/registry-inputs.ts",
      "registry/registry-examples.ts",
      "registry/registry-animations.ts",
      "registry/registry-components.ts",
      "registry/registry-blocks.ts",
      "registry/registry-landing-page.ts",
      "registry/registry-media.ts",
    ]

    const registryDataArray = await Promise.all(
      registryFiles.map((file) => loadRegistryFile(file))
    )

    // Combine all registries
    const combinedRegistry: Registry = registryDataArray.flat()

    // Deduplicate registry items
    let registry = deduplicateRegistry(combinedRegistry)

    // Ensure demo components have proper dependencies to their base components
    registry = ensureDemoDependencies(registry)

    // Group items by type for summary
    const byType: Record<string, Registry> = {}

    for (const item of registry) {
      const type = item.type.split(":")[1] || item.type
      if (!byType[type]) byType[type] = []
      byType[type].push(item)
    }

    // Log summary
    console.info(`📊 Registry summary:`)
    for (const [type, items] of Object.entries(byType)) {
      console.info(`- ${type}: ${items.length} items`)
    }

    console.info(`📋 Total registry items: ${registry.length}`)

    // 1. Create and update the __registry__/index.tsx file
    await generateRegistryIndex(registry)

    // 2. Create the shadcn registry format
    const shadcnRegistry: ShadcnRegistry = {
      $schema: "https://ui.shadcn.com/schema/registry.json",
      homepage: "https://deltacomponents.dev",
      name: "deltacomponents.dev",
      items: [],
    }

    // Map registry items to shadcn format
    for (const item of registry) {
      // Create a clone of the item without the tags property
      const shadcnItem: ShadcnRegistryItem = {
        name: item.name,
        type: item.type,
        files: [],
      }

      // Add dependencies if present
      if (item.dependencies && item.dependencies.length > 0) {
        shadcnItem.dependencies = item.dependencies
      }

      // Add devDependencies if present
      if (item.devDependencies && item.devDependencies.length > 0) {
        shadcnItem.devDependencies = item.devDependencies
      }

      // Add registryDependencies if present, transforming internal ones to full URLs
      if (item.registryDependencies && item.registryDependencies.length > 0) {
        shadcnItem.registryDependencies = transformRegistryDependencies(
          registry,
          item.registryDependencies
        )
      }

      // Process files
      if (item.files && item.files.length > 0) {
        shadcnItem.files = item.files.map((file) => {
          return {
            path: `registry/${file.path}`,
            type: file.type,
          }
        })
      }

      shadcnRegistry.items.push(shadcnItem)
    }

    // Ensure directory exists
    const outputDir = path.join(rootDir, "public/r")
    await fs.mkdir(outputDir, { recursive: true })

    // Write to index.json
    const outputPath = path.join(outputDir, "index.json")
    await fs.writeFile(outputPath, JSON.stringify(shadcnRegistry, null, 2))

    // Additionally, generate individual component JSON files
    for (const item of shadcnRegistry.items) {
      const componentJson = {
        $schema: "https://ui.shadcn.com/schema/registry-item.json",
        name: item.name,
        type: item.type,
        ...(item.dependencies && { dependencies: item.dependencies }),
        ...(item.devDependencies && { devDependencies: item.devDependencies }),
        ...(item.registryDependencies && {
          registryDependencies: item.registryDependencies,
        }),
        files: item.files,
      }

      const componentPath = path.join(outputDir, `${item.name}.json`)

      // Read the existing file content if it exists
      let existingContent: any = {}
      try {
        const existingFile = await fs.readFile(componentPath, "utf8")
        existingContent = JSON.parse(existingFile)
      } catch (e) {
        // File doesn't exist or is invalid, continue with empty object
      }

      // Merge with existing file to preserve file contents
      const mergedJson = {
        ...componentJson,
        files: componentJson.files.map((file) => {
          // Try to find the matching file in the existing content
          const existingFile = existingContent.files?.find(
            (f: any) => f.path === file.path
          )
          if (existingFile && existingFile.content) {
            return { ...file, content: existingFile.content }
          }
          return file
        }),
      }

      await fs.writeFile(componentPath, JSON.stringify(mergedJson, null, 2))
    }

    console.info(`✅ Registry built successfully: ${outputPath}`)
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error(`Error building registry: ${errorMessage}`)
    process.exit(1)
  }
}

/**
 * Generate the __registry__/index.tsx file with lazy-loaded components
 */
async function generateRegistryIndex(registry: Registry) {
  console.info(
    `🔨 Generating __registry__/index.tsx with ${registry.length} components...`
  )

  // Group components by type for reporting
  const byType: Record<string, string[]> = {}

  let indexContent = `/* eslint-disable */
//
// @ts-nocheck
// This file is autogenerated by scripts/build-registry.ts
// Do not edit this file directly.
import * as React from "react"

export const Index: Record<string, any> = {`

  for (const item of registry) {
    // Skip items without files
    if (!item.files || item.files.length === 0) {
      console.warn(`⚠️ Skipping item with no files: ${item.name}`)
      continue
    }

    // Keep track of types for reporting
    const type = item.type.split(":")[1] || item.type
    if (!byType[type]) {
      byType[type] = []
    }
    byType[type].push(item.name)

    // Format files for the index
    const formattedFiles = item.files.map((file) => {
      const filePath = `registry/${file.path}`
      return `{
        path: "${filePath}",
        type: "${file.type}",
        target: "",
      }`
    })

    // Determine registryDependencies format - use 'undefined' if not present
    const regDependencies =
      item.registryDependencies && item.registryDependencies.length > 0
        ? JSON.stringify(item.registryDependencies)
        : "undefined"

    // Format tags for the index - use empty array if not present to avoid error in similar-components.tsx
    const tags =
      item.tags && item.tags.length > 0 ? JSON.stringify(item.tags) : "[]"

    // Create import path WITHOUT file extension
    const importPath = item.files[0].path.replace(/\.(tsx|ts|jsx|js)$/, "")
    const fullImportPath = `@/registry/${importPath}`

    // Add the component to the index with tags
    indexContent += `
  "${item.name}": {
    name: "${item.name}",
    type: "${item.type}",
    registryDependencies: ${regDependencies},
    tags: ${tags},
    files: [
      ${formattedFiles.join(",\n      ")}
    ],
    component: React.lazy(() => import("${fullImportPath}")),
    source: "",
  },`
  }

  indexContent += `
}
`

  // Ensure the __registry__ directory exists
  const registryDir = path.join(rootDir, "__registry__")
  await fs.mkdir(registryDir, { recursive: true })

  // Write the index file
  const indexPath = path.join(registryDir, "index.tsx")
  await fs.writeFile(indexPath, indexContent)

  // Log components by type
  console.info(`📝 Components added to registry by type:`)
  for (const [type, components] of Object.entries(byType)) {
    console.info(`- ${type}: ${components.length} components`)
    // Log first few items
    if (components.length > 0) {
      const displayItems = components.slice(0, Math.min(5, components.length))
      console.info(
        `  Examples: ${displayItems.join(", ")}${components.length > 5 ? ", ..." : ""}`
      )
    }
  }

  console.info(`✅ Registry index updated: ${indexPath}`)
}

// Run the build
buildRegistry()
