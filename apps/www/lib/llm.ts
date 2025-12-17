import fs from "fs"
import path from "path"
import { registry } from "@/registry"

type Style = {
  name: string
}

export function processMdxForLLMs(
  content: string,
  style: Style["name"] = "default"
) {
  // Replace ComponentPreview tags with actual component source code
  const componentPreviewRegex =
    /<ComponentPreview[\s\S]*?name="([^"]+)"[\s\S]*?\/>/g

  return content.replace(componentPreviewRegex, (match, name) => {
    // Find the component in the registry, with safe access
    if (!registry?.items) {
      // Silently skip during build time when registry isn't loaded
      return match
    }

    const component = registry.items.find((item) => item.name === name)

    if (!component?.files) return match

    // Get the main component file
    const mainFile = component.files.find(
      (file) =>
        file.type === "registry:component" ||
        file.type === "registry:example" ||
        file.path.includes(name)
    )

    if (!mainFile?.path) return match

    try {
      // Construct the full path to the component file
      const fullPath = path.join(process.cwd(), "registry", mainFile.path)

      // Check if file exists
      if (!fs.existsSync(fullPath)) {
        // Try alternative paths
        const altPaths = [
          path.join(process.cwd(), mainFile.path),
          path.join(process.cwd(), "apps/www", mainFile.path),
          path.join(process.cwd(), "apps/www/registry", mainFile.path),
        ]

        let source = ""
        for (const altPath of altPaths) {
          if (fs.existsSync(altPath)) {
            source = fs.readFileSync(altPath, "utf8")
            break
          }
        }

        if (!source) return match

        // Clean up the source code for better LLM consumption
        source = cleanupComponentSource(source)

        return `\`\`\`tsx\n${source}\n\`\`\``
      }

      let source = fs.readFileSync(fullPath, "utf8")
      source = cleanupComponentSource(source)

      return `\`\`\`tsx\n${source}\n\`\`\``
    } catch (error) {
      console.warn(`Failed to read component file for ${name}:`, error)
      return match
    }
  })
}

function cleanupComponentSource(source: string): string {
  // Replace registry paths with component paths for better readability
  source = source.replaceAll(`@/registry/delta-ui/`, "@/components/")
  source = source.replaceAll(`@/registry/new-york-v4/`, "@/components/")

  // Convert default exports to named exports for consistency
  if (source.includes("export default")) {
    source = source.replaceAll("export default", "export")
  }

  return source
}

export function getActiveStyle(): Style {
  // For this implementation, we'll use a default style
  // This can be extended to support multiple styles in the future
  return { name: "default" }
}
