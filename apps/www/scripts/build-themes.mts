#!/usr/bin/env tsx

import { promises as fs } from "fs"
import path from "path"

interface ThemeConfig {
  name: string
  description: string
  cssPath: string
}

const THEMES: ThemeConfig[] = [
  {
    name: "solarized",
    description: "A precision colors scheme for machines and people",
    cssPath: "styles/themes/solarized.css"
  },
  {
    name: "neobrutalism", 
    description: "Bold, high-contrast design with thick borders and vibrant colors inspired by brutalist architecture",
    cssPath: "styles/themes/neobrutalism.css"
  },
  {
    name: "claymorphism",
    description: "A soft, organic design aesthetic with subtle gradients and clay-like textures", 
    cssPath: "styles/themes/claymorphism.css"
  }
]

async function buildThemeRegistry() {
  const themesDir = path.join(process.cwd(), "public/r/themes")
  
  // Ensure themes directory exists
  await fs.mkdir(themesDir, { recursive: true })
  
  for (const theme of THEMES) {
    try {
      // Read CSS file
      const cssPath = path.join(process.cwd(), theme.cssPath)
      const cssContent = await fs.readFile(cssPath, "utf-8")
      
      // Create theme registry JSON
      const themeRegistry = {
        name: theme.name,
        type: "registry:theme",
        description: theme.description,
        homepage: "https://deltacomponents.dev",
        files: [
          {
            path: `themes/${theme.name}.css`,
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
      
      // Add neobrutalism-specific shadow config
      if (theme.name === "neobrutalism") {
        themeRegistry.tailwind.config.theme.extend.borderRadius = {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)"
        }
        themeRegistry.tailwind.config.theme.extend.boxShadow = {
          xs: "var(--shadow-xs)",
          sm: "var(--shadow-sm)",
          DEFAULT: "var(--shadow)",
          md: "var(--shadow-md)",
          lg: "var(--shadow-lg)",
          xl: "var(--shadow-xl)",
          "2xl": "var(--shadow-2xl)"
        }
      }
      
      // Write theme registry file
      const outputPath = path.join(themesDir, `${theme.name}.json`)
      await fs.writeFile(outputPath, JSON.stringify(themeRegistry, null, 2), "utf-8")
      
      console.log(`✓ Generated ${theme.name}.json`)
      
    } catch (error) {
      console.error(`✗ Failed to generate ${theme.name}.json:`, error)
    }
  }
  
  console.log(`\n✓ Theme registry generated in public/r/themes/`)
  console.log(`\nUsers can now install themes with:`)
  for (const theme of THEMES) {
    console.log(`  pnpm dlx shadcn@latest add https://deltacomponents.dev/r/themes/${theme.name}.json`)
  }
}

buildThemeRegistry().catch(console.error)