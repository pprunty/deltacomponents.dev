#!/usr/bin/env tsx

import { promises as fs } from "fs"
import path from "path"

import { THEME_DATA } from "../lib/theme-data"

interface ThemeConfig {
  slug: string
  name: string
  description: string
  cssPath: string
}

const THEMES: ThemeConfig[] = THEME_DATA.map((theme) => ({
  slug: theme.value,
  name: theme.name,
  description: theme.description,
  cssPath: path.join("styles", "themes", `${theme.value}.css`)
}))

async function buildThemeRegistry() {
  const themesDir = path.join(process.cwd(), "public/r/themes")
  const generated: string[] = []
  
  // Ensure themes directory exists
  await fs.mkdir(themesDir, { recursive: true })
  
  for (const theme of THEMES) {
    try {
      // Read CSS file
      const cssPath = path.join(process.cwd(), theme.cssPath)
      const cssContent = await fs.readFile(cssPath, "utf-8")
      
      // Create theme registry JSON
      const themeRegistry = {
        name: theme.slug,
        type: "registry:theme",
        description: theme.description,
        homepage: "https://deltacomponents.dev",
        meta: {
          displayName: theme.name
        },
        files: [
          {
            path: `themes/${theme.slug}.css`,
            content: cssContent,
            type: "registry:theme"
          }
        ],
        tailwind: {
          config: {
            theme: {
              extend: {
                colors: {
                  background: "hsl(var(--background))",
                  foreground: "hsl(var(--foreground))",
                  card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))"
                  },
                  popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))"
                  },
                  primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))"
                  },
                  secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))"
                  },
                  muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))"
                  },
                  accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))"
                  },
                  destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))"
                  },
                  border: "hsl(var(--border))",
                  input: "hsl(var(--input))",
                  ring: "hsl(var(--ring))",
                  chart: {
                    "1": "hsl(var(--chart-1))",
                    "2": "hsl(var(--chart-2))",
                    "3": "hsl(var(--chart-3))",
                    "4": "hsl(var(--chart-4))",
                    "5": "hsl(var(--chart-5))"
                  }
                }
              }
            }
          }
        }
      }

      // Write theme registry file
      const outputPath = path.join(themesDir, `${theme.slug}.json`)
      await fs.writeFile(outputPath, JSON.stringify(themeRegistry, null, 2), "utf-8")
      
      generated.push(theme.slug)
      console.log(`✓ Generated ${theme.slug}.json`)
      
    } catch (error) {
      console.error(`✗ Failed to generate ${theme.slug}.json:`, error)
    }
  }
  
  if (generated.length) {
    console.log(`\n✓ Theme registry generated in public/r/themes/`)
    console.log(`\nUsers can now install themes with:`)
    for (const slug of generated) {
      console.log(`  pnpm dlx shadcn@latest add https://deltacomponents.dev/r/themes/${slug}.json`)
    }
  } else {
    console.warn("\n⚠️  No themes were generated. Ensure stylesheets exist in styles/themes/")
  }
}

buildThemeRegistry().catch(console.error)
