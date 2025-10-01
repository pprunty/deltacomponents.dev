import { promises as fs } from "fs"
import path from "path"

interface DeleteComponentOptions {
  name: string
  category: string
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
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("")
}

function toTitleCase(str: string): string {
  return str
    .split(/[-_\s]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
}

async function deleteComponent({ name, category }: DeleteComponentOptions) {
  const componentName = toPascalCase(name)
  const fileName = toKebabCase(name)
  const titleName = toTitleCase(name)

  console.log(`🗑️  Deleting component: ${componentName} (${fileName})`)

  const deletedFiles: string[] = []
  const errors: string[] = []

  // Delete component file
  try {
    const componentPath = path.join(
      process.cwd(),
      "registry",
      category,
      `${fileName}.tsx`
    )
    await fs.unlink(componentPath)
    deletedFiles.push(`registry/${category}/${fileName}.tsx`)
  } catch (error) {
    errors.push(`Failed to delete component file: ${error}`)
  }

  // Delete demo files (there might be multiple)
  try {
    const examplesDir = path.join(process.cwd(), "registry/examples")
    const exampleFiles = await fs.readdir(examplesDir)

    for (const file of exampleFiles) {
      if (file.startsWith(`${fileName}-`) && file.endsWith(".tsx")) {
        try {
          await fs.unlink(path.join(examplesDir, file))
          deletedFiles.push(`registry/examples/${file}`)
        } catch (error) {
          errors.push(`Failed to delete example file ${file}: ${error}`)
        }
      }
    }
  } catch (error) {
    errors.push(`Failed to read examples directory: ${error}`)
  }

  // Delete MDX documentation
  try {
    const mdxPath = path.join(
      process.cwd(),
      "content/docs",
      category,
      `${fileName}.mdx`
    )
    await fs.unlink(mdxPath)
    deletedFiles.push(`content/docs/${category}/${fileName}.mdx`)
  } catch (error) {
    errors.push(`Failed to delete MDX file: ${error}`)
  }

  // Delete public registry JSON files
  try {
    const publicRegistryDir = path.join(process.cwd(), "public/r")
    const registryFiles = [`${fileName}.json`, `${fileName}-demo.json`]

    for (const file of registryFiles) {
      try {
        const filePath = path.join(publicRegistryDir, file)
        await fs.unlink(filePath)
        deletedFiles.push(`public/r/${file}`)
      } catch (error) {
        // Ignore if file doesn't exist
      }
    }

    // Also check for other demo files
    const allFiles = await fs.readdir(publicRegistryDir)
    for (const file of allFiles) {
      if (file.startsWith(`${fileName}-`) && file.endsWith(".json")) {
        try {
          await fs.unlink(path.join(publicRegistryDir, file))
          deletedFiles.push(`public/r/${file}`)
        } catch (error) {
          errors.push(`Failed to delete registry file ${file}: ${error}`)
        }
      }
    }
  } catch (error) {
    errors.push(`Failed to clean up public registry files: ${error}`)
  }

  // Remove from category registry file
  try {
    const categoryRegistryPath = path.join(
      process.cwd(),
      "registry",
      `registry-${category}.ts`
    )

    let categoryRegistryContent = await fs.readFile(
      categoryRegistryPath,
      "utf-8"
    )

    // Find and remove the component entry
    const entryRegex = new RegExp(
      `\\s*{[^}]*name:\\s*["']${fileName}["'][^}]*},?\\s*`,
      "g"
    )

    const originalContent = categoryRegistryContent
    categoryRegistryContent = categoryRegistryContent.replace(entryRegex, "")

    if (originalContent !== categoryRegistryContent) {
      await fs.writeFile(categoryRegistryPath, categoryRegistryContent)
      console.log(`✅ Removed from registry-${category}.ts`)
    } else {
      errors.push(`Component not found in registry-${category}.ts`)
    }
  } catch (error) {
    errors.push(`Failed to update category registry: ${error}`)
  }

  // Remove from examples registry
  try {
    const examplesRegistryPath = path.join(
      process.cwd(),
      "registry",
      "registry-examples.ts"
    )

    let examplesRegistryContent = await fs.readFile(
      examplesRegistryPath,
      "utf-8"
    )

    // Find and remove all demo entries for this component
    const demoEntryRegex = new RegExp(
      `\\s*{[^}]*name:\\s*["']${fileName}-[^"']*["'][^}]*},?\\s*`,
      "g"
    )

    const originalContent = examplesRegistryContent
    examplesRegistryContent = examplesRegistryContent.replace(
      demoEntryRegex,
      ""
    )

    if (originalContent !== examplesRegistryContent) {
      await fs.writeFile(examplesRegistryPath, examplesRegistryContent)
      console.log(`✅ Removed demo entries from registry-examples.ts`)
    }
  } catch (error) {
    errors.push(`Failed to update examples registry: ${error}`)
  }

  // Remove from docs navigation
  try {
    const docsConfigPath = path.join(process.cwd(), "config/docs.ts")
    let docsContent = await fs.readFile(docsConfigPath, "utf-8")

    // Find and remove the navigation entry
    const navEntryRegex = new RegExp(
      `\\s*{[^}]*title:\\s*["'][^"']*["'][^}]*href:\\s*["'][^"']*${fileName}["'][^}]*},?\\s*`,
      "g"
    )

    const originalDocsContent = docsContent
    docsContent = docsContent.replace(navEntryRegex, "")

    if (originalDocsContent !== docsContent) {
      await fs.writeFile(docsConfigPath, docsContent)
      console.log(`✅ Removed from docs navigation`)
    } else {
      console.log(
        `ℹ️ Navigation entry not found in docs.ts (may need manual cleanup)`
      )
    }
  } catch (error) {
    errors.push(`Failed to update docs navigation: ${error}`)
  }

  // Check if we need to remove the category from main registry index
  try {
    const categoryRegistryPath = path.join(
      process.cwd(),
      "registry",
      `registry-${category}.ts`
    )

    const categoryRegistryContent = await fs.readFile(
      categoryRegistryPath,
      "utf-8"
    )

    // Check if the category registry is now empty (only has the header and empty array)
    const isEmpty = !categoryRegistryContent.includes("name:")

    if (isEmpty) {
      console.log(
        `⚠️  Category ${category} registry is now empty. Consider removing it from the main index.`
      )
    }
  } catch (error) {
    // Category registry might have been deleted or doesn't exist
  }

  // Print results
  console.log("\n📝 Summary:")
  if (deletedFiles.length > 0) {
    console.log("✅ Deleted files:")
    deletedFiles.forEach((file) => console.log(`   - ${file}`))
  }

  if (errors.length > 0) {
    console.log("\n❌ Errors:")
    errors.forEach((error) => console.log(`   - ${error}`))
  }

  console.log("\n📝 Next steps:")
  console.log("1. Run the build-registry script to update the registry:")
  console.log("   pnpm build-registry")
  console.log(
    "\n2. If needed, manually check config/docs.ts for any remaining references"
  )

  if (errors.length > 0) {
    console.log(
      "\n⚠️  Some operations failed. Please check the errors above and clean up manually if needed."
    )
  } else {
    console.log("\n🎉 Component deleted successfully!")
  }
}

// Parse command line arguments
const args = process.argv.slice(2)
if (args.length < 2) {
  console.log("Usage: pnpm delete-component <name> <category>")
  console.log("\nExample:")
  console.log("  pnpm delete-component button components")
  console.log("  pnpm delete-component date-input inputs")
  process.exit(1)
}

const [name, category] = args

deleteComponent({ name, category })
