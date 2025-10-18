"use client"

import { useState } from "react"
import { CheckIcon, ClipboardIcon } from "lucide-react"

import { copyToClipboardWithMeta } from "@/components/copy-button"
import { getIconForLanguageExtension } from "@/components/icons"
import { Button } from "@/registry/delta-ui/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/delta-ui/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/delta-ui/ui/tooltip"

interface ThemeCodeDialogProps {
  themeName: string
  themeCSS: string
}

export function ThemeCodeDialog({ themeName, themeCSS }: ThemeCodeDialogProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyCode = () => {
    copyToClipboardWithMeta(themeCSS, {
      name: "copy_theme_code",
      properties: {
        theme: themeName.toLowerCase().replace(/\s+/g, "_"),
      },
    })
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="flex-1">
          &#123; &#125; Code
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[calc(100vw-3rem)] max-w-2xl">
        <DialogHeader>
          <DialogTitle>{themeName} Theme Code</DialogTitle>
          <DialogDescription>
            Copy and paste this CSS into your project to use the {themeName}{" "}
            theme.
          </DialogDescription>
        </DialogHeader>
        <div className="relative overflow-x-auto">
          <figcaption
            data-rehype-pretty-code-title=""
            className="text-code-foreground [&_svg]:text-code-foreground bg-muted flex items-center gap-2 rounded-t-md border-b px-3 py-2 [&_svg]:size-4 [&_svg]:opacity-70"
            data-language="css"
          >
            {getIconForLanguageExtension("css")}
            globals.css
          </figcaption>
          <pre className="bg-muted max-h-[400px] overflow-auto rounded-md rounded-t-none p-4 text-sm">
            <code>{themeCSS}</code>
          </pre>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-1.5 right-2 z-10 size-7 opacity-70 hover:opacity-100 focus-visible:opacity-100"
                onClick={handleCopyCode}
              >
                <span className="sr-only">Copy</span>
                {copied ? <CheckIcon /> : <ClipboardIcon />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {copied ? "Copied" : "Copy to Clipboard"}
            </TooltipContent>
          </Tooltip>
        </div>
      </DialogContent>
    </Dialog>
  )
}
