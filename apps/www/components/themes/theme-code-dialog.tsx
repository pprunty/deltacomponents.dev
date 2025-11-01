"use client"

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
  themeCSS: string
}

export function ThemeCodeDialog({ themeName, themeCSS }: ThemeCodeDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="flex-1">
          &#123; &#125; Code
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100vh-4rem)] w-[calc(100vw-2rem)] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{themeName} Theme</DialogTitle>
          <DialogDescription>
            Install and configure the {themeName} theme in your project.
          </DialogDescription>
        </DialogHeader>
        <div className="min-w-0 space-y-6">
          <div>
            <h4 className="mb-2 text-sm font-medium">Install using CLI</h4>
            <CodeBlock
              npm={`npx shadcn@latest add https://deltacomponents.dev/r/themes/${themeName.toLowerCase()}.json`}
              yarn={`yarn dlx shadcn@latest add https://deltacomponents.dev/r/themes/${themeName.toLowerCase()}.json`}
              pnpm={`pnpm dlx shadcn@latest add https://deltacomponents.dev/r/themes/${themeName.toLowerCase()}.json`}
              bun={`bunx shadcn@latest add https://deltacomponents.dev/r/themes/${themeName.toLowerCase()}.json`}
              defaultPackageManager="npm"
            />
          </div>
          <div>
            <h4 className="mb-2 text-sm font-medium">
              Copy and paste this CSS into your project to use the {themeName}{" "}
              theme.
            </h4>
            <CodeBlock
              code={themeCSS}
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
