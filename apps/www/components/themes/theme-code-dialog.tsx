"use client"

import { useEffect, useState } from "react"
import { CodeBlock } from "@/registry/delta-ui/delta/code-block"
import { Button } from "@/registry/delta-ui/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/delta-ui/ui/dialog"

interface ThemeCodeDialogProps {
  themeName: string
  themeValue: string
}

export function ThemeCodeDialog({ themeName, themeValue }: ThemeCodeDialogProps) {
  const [themeCSS, setThemeCSS] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  const fetchThemeCSS = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/themes/${themeValue}`)
      if (response.ok) {
        const data = await response.json()
        setThemeCSS(data.css)
      } else {
        setThemeCSS('/* Theme CSS could not be loaded */')
      }
    } catch (error) {
      console.error('Failed to fetch theme CSS:', error)
      setThemeCSS('/* Theme CSS could not be loaded */')
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleOpenChange = (open: boolean) => {
    if (open && !themeCSS) {
      fetchThemeCSS()
    }
  }
  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="flex-1">
          &#123; &#125; Code
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100vh-2rem)] w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{themeName}</DialogTitle>
          <DialogDescription>
            Choose one of the installation methods below.
          </DialogDescription>
        </DialogHeader>
        <div className="min-w-0 space-y-6">
          <div>
            <h4 className="mb-2 font-medium">CLI</h4>
            <CodeBlock
              npm={`npx shadcn@latest add https://deltacomponents.dev/r/themes/${themeValue}.json`}
              yarn={`npx shadcn@latest add https://deltacomponents.dev/r/themes/${themeValue}.json`}
              pnpm={`pnpm dlx shadcn@latest add https://deltacomponents.dev/r/themes/${themeValue}.json`}
              bun={`bunx shadcn@latest add https://deltacomponents.dev/r/themes/${themeValue}.json`}
              defaultPackageManager="npm"
            />
          </div>
          <div>
            <h4 className="mb-2 font-medium">Manual</h4>
            <p className="text-muted-foreground mb-2 text-sm">
              Copy and paste into your <code className="bg-muted rounded px-1 py-0.5">globals.css</code> or <code className="bg-muted rounded px-1 py-0.5">App.css</code> file, replacing the <code className="bg-muted rounded px-1 py-0.5">:root</code> and <code className="bg-muted rounded px-1 py-0.5">.dark</code> blocks.
            </p>
            <CodeBlock
              code={isLoading ? '/* Loading theme CSS... */' : themeCSS}
              language="css"
              className="max-h-[300px] min-w-0"
              filename="globals.css"
              showLineNumbers={false}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
