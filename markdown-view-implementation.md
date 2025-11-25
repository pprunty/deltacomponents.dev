# View as Markdown Implementation Guide

This document explains how to implement a "View as Markdown" functionality in a Next.js project using Fumadocs, allowing users to view documentation pages as raw markdown that's suitable for AI/LLM consumption.

## Overview

The implementation consists of three main components:

1. **Next.js Rewrite Configuration** - Intercepts `.md` requests
2. **LLM Route Handler** - Serves raw markdown content  
3. **UI Component** - Provides the "View as Markdown" button

## 1. Next.js Configuration

Add a rewrite rule to `next.config.mjs` to intercept markdown requests:

```javascript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... other config
  rewrites() {
    return [
      {
        source: "/docs/:path*.md",
        destination: "/llm/:path*",
      },
    ]
  },
}

export default nextConfig
```

**How it works**: When someone requests `/docs/setup.md`, Next.js internally routes to `/llm/setup`.

## 2. LLM Route Handler

Create the route handler at `app/(app)/llm/[[...slug]]/route.ts`:

```typescript
// app/(app)/llm/[[...slug]]/route.ts
import { notFound } from "next/navigation"
import { NextResponse, type NextRequest } from "next/server"

import { processMdxForLLMs, getActiveStyle } from "@/lib/llm"
import { source } from "@/lib/source"

export const revalidate = false

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  const [{ slug }, activeStyle] = await Promise.all([params, getActiveStyle()])

  const page = source.getPage(slug)

  if (!page) {
    notFound()
  }

  const processedContent = processMdxForLLMs(
    await page.data.getText("raw"),
    activeStyle.name
  )

  return new NextResponse(processedContent, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  })
}

export function generateStaticParams() {
  return source.generateParams()
}
```

## 3. MDX Processing Library

Create `lib/llm.ts` to process MDX content for LLMs:

```typescript
// lib/llm.ts
import fs from "fs"
import path from "path"

import { registry } from "@/registry"

type Style = {
  name: string
}

export function processMdxForLLMs(content: string, style: Style["name"] = "default") {
  // Replace ComponentPreview tags with actual component source code
  const componentPreviewRegex = /<ComponentPreview[\s\S]*?name="([^"]+)"[\s\S]*?\/>/g

  return content.replace(componentPreviewRegex, (match, name) => {
    // Find the component in the registry, with safe access
    if (!registry?.items) {
      // Silently skip during build time when registry isn't loaded
      return match
    }
    
    const component = registry.items.find(item => item.name === name)
    
    if (!component?.files) return match

    // Get the main component file
    const mainFile = component.files.find(file => 
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
          path.join(process.cwd(), "apps/www/registry", mainFile.path)
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
```

## 4. UI Component with Copy Functionality

Create or update `components/docs-copy-page.tsx`:

```typescript
// components/docs-copy-page.tsx
"use client"

import { IconCheck, IconChevronDown, IconCopy } from "@tabler/icons-react"

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { siteConfig } from "@/lib/config"
import { Button } from "@/registry/delta-ui/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/delta-ui/ui/dropdown-menu"
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/delta-ui/ui/popover"
import { Separator } from "@/registry/delta-ui/ui/separator"

function getPromptUrl(baseURL: string, url: string) {
  const fullUrl = url || `${siteConfig.url}/docs`
  return `${baseURL}?q=${encodeURIComponent(
    `I'm looking at this Delta Components UI documentation and custom shadcn/ui registry: ${fullUrl}.
Help me understand how to use it. Be ready to explain concepts, give examples, or help debug based on it.
  `
  )}`
}

const menuItems = {
  markdown: (url: string) => {
    // Get the current origin to use the correct port
    const currentOrigin = typeof window !== 'undefined' ? window.location.origin : ''
    // Extract the path from the provided URL and append .md
    const urlPath = url.replace(/^https?:\/\/[^\/]+/, '') || '/docs'
    const markdownUrl = `${currentOrigin}${urlPath}.md`
    
    return (
      <a href={markdownUrl} target="_blank" rel="noopener noreferrer">
        <svg strokeLinejoin="round" viewBox="0 0 22 16">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.5 2.25H2.5C1.80964 2.25 1.25 2.80964 1.25 3.5V12.5C1.25 13.1904 1.80964 13.75 2.5 13.75H19.5C20.1904 13.75 20.75 13.1904 20.75 12.5V3.5C20.75 2.80964 20.1904 2.25 19.5 2.25ZM2.5 1C1.11929 1 0 2.11929 0 3.5V12.5C0 13.8807 1.11929 15 2.5 15H19.5C20.8807 15 22 13.8807 22 12.5V3.5C22 2.11929 20.8807 1 19.5 1H2.5ZM3 4.5H4H4.25H4.6899L4.98715 4.82428L7 7.02011L9.01285 4.82428L9.3101 4.5H9.75H10H11V5.5V11.5H9V7.79807L7.73715 9.17572L7 9.97989L6.26285 9.17572L5 7.79807V11.5H3V5.5V4.5ZM15 8V4.5H17V8H19.5L17 10.5L16 11.5L15 10.5L12.5 8H15Z"
            fill="currentColor"
          />
        </svg>
        View as Markdown
      </a>
    )
  },
  v0: (url: string) => (
    <a
      href={getPromptUrl("https://v0.dev", url)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {/* V0 SVG icon */}
      <span>Open in v0</span>
    </a>
  ),
  chatgpt: (url: string) => (
    <a
      href={getPromptUrl("https://chatgpt.com", url)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {/* ChatGPT SVG icon */}
      Open in ChatGPT
    </a>
  ),
  claude: (url: string) => (
    <a
      href={getPromptUrl("https://claude.ai/new", url)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {/* Claude SVG icon */}
      Open in Claude
    </a>
  ),
}

export function DocsCopyPage({ page, url }: { page: string; url: string }) {
  const { copyToClipboard, isCopied } = useCopyToClipboard()

  const trigger = (
    <Button
      variant="secondary"
      size="sm"
      className="peer -ml-0.5 size-8 shadow-none md:size-7 md:text-[0.8rem]"
    >
      <IconChevronDown className="rotate-180 sm:rotate-0" />
    </Button>
  )

  return (
    <Popover>
      <div className="bg-secondary group/buttons relative flex rounded-lg *:[[data-slot=button]]:focus-visible:relative *:[[data-slot=button]]:focus-visible:z-10">
        <PopoverAnchor />
        <Button
          variant="secondary"
          size="sm"
          className="h-8 shadow-none md:h-7 md:text-[0.8rem]"
          onClick={() => copyToClipboard(page)}
        >
          {isCopied ? <IconCheck /> : <IconCopy />}
          Copy Page
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="hidden sm:flex">
            {trigger}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="shadow-none">
            {Object.entries(menuItems).map(([key, value]) => (
              <DropdownMenuItem key={key} asChild>
                {value(url)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator
          orientation="vertical"
          className="!bg-foreground/10 absolute top-0 right-8 z-0 !h-8 peer-focus-visible:opacity-0 sm:right-7 sm:!h-7"
        />
        <PopoverTrigger asChild className="flex sm:hidden">
          {trigger}
        </PopoverTrigger>
        <PopoverContent
          className="bg-background/70 dark:bg-background/60 w-52 !origin-center rounded-lg p-1 shadow-sm backdrop-blur-sm"
          align="start"
        >
          {Object.entries(menuItems).map(([key, value]) => (
            <Button
              variant="ghost"
              size="lg"
              asChild
              key={key}
              className="*:[svg]:text-muted-foreground w-full justify-start text-base font-normal"
            >
              {value(url)}
            </Button>
          ))}
        </PopoverContent>
      </div>
    </Popover>
  )
}
```

## 5. Copy to Clipboard Hook

Create `hooks/use-copy-to-clipboard.ts`:

```typescript
// hooks/use-copy-to-clipboard.ts
"use client"

import * as React from "react"

export function useCopyToClipboard({
  timeout = 2000,
  onCopy,
}: {
  timeout?: number
  onCopy?: () => void
} = {}) {
  const [isCopied, setIsCopied] = React.useState(false)

  const copyToClipboard = (value: string) => {
    if (typeof window === "undefined" || !navigator.clipboard.writeText) {
      return
    }

    if (!value) return

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true)

      if (onCopy) {
        onCopy()
      }

      if (timeout !== 0) {
        setTimeout(() => {
          setIsCopied(false)
        }, timeout)
      }
    }, console.error)
  }

  return { isCopied, copyToClipboard }
}
```

## 6. Using the Component in Pages

**CRITICAL**: Pass raw markdown content, not React components.

### Docs Page Implementation

```typescript
// app/(app)/docs/[[...slug]]/page.tsx
export default async function Page(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) {
    notFound()
  }

  const doc = page.data
  const MDX = doc.body
  const neighbours = await findNeighbour(source.pageTree, page.url)
  
  // ✅ IMPORTANT: Get raw content for copy functionality
  const rawContent = await page.data.getText("raw")

  return (
    <div>
      {/* Page content */}
      <h1>{doc.title}</h1>
      
      {/* Navigation with copy functionality */}
      <DocsCopyPage
        page={rawContent} // ✅ Pass raw markdown, not doc.content
        url={absoluteUrl(page.url)}
      />
      
      {/* Rest of the page */}
    </div>
  )
}
```

### Key Points for Integration:

1. **Raw Content**: Always pass `await page.data.getText("raw")` to the `page` prop
2. **URL Format**: Pass the absolute URL for the current page
3. **Async Component**: Make your page component async to use `await`

## How It Works

### Request Flow:
1. User clicks "View as Markdown" → Opens `/docs/setup.md`
2. Next.js rewrite intercepts `.md` request → Routes to `/llm/setup`
3. LLM route handler:
   - Gets the page using Fumadocs source
   - Extracts raw markdown content with `getText("raw")`
   - Processes MDX (replaces component previews with code)
   - Returns processed content with `text/markdown` content type
4. Browser displays clean markdown suitable for AI consumption

### Copy Functionality:
1. User clicks "Copy Page" button
2. Component receives raw markdown content via `page` prop
3. `useCopyToClipboard` hook copies content to clipboard
4. Icon changes to checkmark for visual feedback

## Benefits

- **AI-Friendly**: Clean markdown output perfect for LLMs
- **Component Expansion**: `<ComponentPreview>` tags replaced with actual code
- **Dynamic Port Detection**: Works with any development port
- **Dual Functionality**: Both copy and view features in one component
- **Static Generation**: All routes pre-generated for performance

## Troubleshooting

### Common Issues:

1. **Copy not working**: Ensure you're passing `rawContent` not `doc.content`
2. **Wrong port**: Verify `window.location.origin` is used in markdown URL
3. **Component not found**: Check registry path in `processMdxForLLMs`
4. **Build errors**: Ensure all async/await syntax is correct in page components

This implementation provides a complete solution for both viewing and copying markdown content in a Fumadocs-based Next.js application.