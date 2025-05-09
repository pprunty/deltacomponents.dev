import fs from "fs"
import path from "path"
import { NextResponse } from "next/server"
import { Index } from "@/__registry__"

// Set runtime and caching options for Vercel
export const runtime = "nodejs"
export const revalidate = 3600 // Revalidate cache every hour

/**
 * GET handler for the source code API
 * Fetches the source code of a component demo file
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    // Support both ?component= and ?path= formats
    const componentName = searchParams.get("component")
    const filePath = searchParams.get("path")

    // Handle path parameter format (used by component preview)
    if (filePath) {
      const absolutePath = path.join(process.cwd(), filePath)

      if (!fs.existsSync(absolutePath)) {
        return NextResponse.json(
          { error: `File not found: ${filePath}` },
          { status: 404 }
        )
      }

      const code = fs.readFileSync(absolutePath, "utf8")

      // Return the code in the 'source' field as expected by component-preview
      const response = {
        source: code,
        path: filePath,
      }

      return NextResponse.json(response, {
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      })
    }

    // Handle component parameter format
    if (!componentName) {
      return NextResponse.json(
        { error: "Component name or path is required" },
        { status: 400 }
      )
    }

    // Ensure we're looking for the demo version
    const demoName = componentName.endsWith("-demo")
      ? componentName
      : `${componentName}-demo`

    // Look up the component in the registry
    const registryItem = Index[demoName]

    if (
      !registryItem ||
      !registryItem.files ||
      registryItem.files.length === 0
    ) {
      return NextResponse.json(
        { error: `Component demo "${demoName}" not found in registry` },
        { status: 404 }
      )
    }

    // Get the file path from the registry
    const registryFilePath = registryItem.files[0]?.path

    if (!registryFilePath) {
      return NextResponse.json(
        { error: "File path not found for component" },
        { status: 404 }
      )
    }

    // Convert to absolute path
    const absolutePath = path.join(process.cwd(), registryFilePath)

    // Check if the file exists
    if (!fs.existsSync(absolutePath)) {
      return NextResponse.json(
        { error: `File not found: ${registryFilePath}` },
        { status: 404 }
      )
    }

    // Read the file contents
    const code = fs.readFileSync(absolutePath, "utf8")

    // Return the code in the 'source' field as expected by component-preview
    const response = {
      source: code,
      path: registryFilePath,
    }

    // Return the code with cache headers
    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    })
  } catch (error) {
    // Log the error to the console
    console.error("Failed to fetch source code:", error)

    return NextResponse.json(
      { error: "Failed to fetch source code" },
      { status: 500 }
    )
  }
}
