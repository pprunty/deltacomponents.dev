import { readFileSync } from "fs"
import { join } from "path"
import { NextRequest } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ theme: string }> }
) {
  try {
    const { theme } = await params

    // Read the CSS file from the filesystem
    const cssPath = join(process.cwd(), "styles/themes", `${theme}.css`)
    const cssContent = readFileSync(cssPath, "utf-8")

    // Parse the CSS content to extract light and dark theme variables
    const formattedCSS = formatThemeCSS(cssContent, theme)

    return Response.json({ css: formattedCSS })
  } catch (error) {
    const { theme } = await params
    console.error(`Error reading theme ${theme}:`, error)
    return Response.json({ error: "Theme not found" }, { status: 404 })
  }
}

function formatThemeCSS(cssContent: string, themeName: string): string {
  // Extract light theme variables
  const lightMatch = cssContent.match(
    new RegExp(`html\\[data-theme="${themeName}"\\]\\s*{([^}]+)}`, "s")
  )

  // Extract dark theme variables
  const darkMatch = cssContent.match(
    new RegExp(`html\\[data-theme="${themeName}"\\]\\.dark\\s*{([^}]+)}`, "s")
  )

  if (!lightMatch) {
    throw new Error("Light theme variables not found")
  }

  // Clean and format the CSS variables
  const lightVars = cleanAndFormatVariables(lightMatch[1])
  const darkVars = darkMatch ? cleanAndFormatVariables(darkMatch[1]) : ""

  // Build the formatted CSS string
  let formattedCSS = ":root {\n"
  formattedCSS += lightVars
  formattedCSS += "}\n"

  if (darkVars) {
    formattedCSS += "\n.dark {\n"
    formattedCSS += darkVars
    formattedCSS += "}\n"
  }

  return formattedCSS
}

function cleanAndFormatVariables(cssBlock: string): string {
  const lines = cssBlock
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && line.startsWith("--"))
    .map((line) => (line.endsWith(";") ? line : line + ";"))
    .map((line) => `  ${line}`)

  return lines.join("\n") + (lines.length > 0 ? "\n" : "")
}
