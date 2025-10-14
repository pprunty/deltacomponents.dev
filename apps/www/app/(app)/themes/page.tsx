"use client"

import { useState } from "react"
import { CheckIcon, ClipboardIcon } from "lucide-react"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
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
import { useThemeConfig } from "@/components/active-theme"
import { getIconForLanguageExtension } from "@/components/icons"
import { copyToClipboardWithMeta } from "@/components/copy-button"

// Note: metadata export removed for client component
// export const metadata: Metadata = {
//   title: "Themes",
//   description:
//     "Beautiful themes and color schemes for Delta and shadcn components, created using tweakcn. Customize your app's appearance.",
// }

const claymorphismThemeCode = `/* Claymorphism Theme */
:root {
  --background: oklch(0.9721 0.0158 110.5501);
  --foreground: oklch(0.5066 0.2501 271.8903);
  --card: oklch(0.9721 0.0158 110.5501);
  --card-foreground: oklch(0.5066 0.2501 271.8903);
  --popover: oklch(0.9721 0.0158 110.5501);
  --popover-foreground: oklch(0.5066 0.2501 271.8903);
  --primary: oklch(0.5066 0.2501 271.8903);
  --primary-foreground: oklch(1.0000 0 0);
  --secondary: oklch(1.0000 0 0);
  --secondary-foreground: oklch(0.5066 0.2501 271.8903);
  --muted: oklch(0.9189 0.0147 106.6853);
  --muted-foreground: oklch(0.5066 0.2501 271.8903);
  --accent: oklch(0.9168 0.0214 109.7161);
  --accent-foreground: oklch(0.4486 0.2266 271.5512);
  --destructive: oklch(0.6290 0.1902 23.0704);
  --destructive-foreground: oklch(1.0000 0 0);
  --border: oklch(0.5066 0.2501 271.8903);
  --input: oklch(0.5066 0.2501 271.8903);
  --ring: oklch(0.4680 0.2721 279.6007);
  --chart-1: oklch(0.5066 0.2501 271.8903);
  --chart-2: oklch(0.5499 0.2197 264.4382);
  --chart-3: oklch(0.7187 0 0);
  --chart-4: oklch(0.9189 0 0);
  --chart-5: oklch(0.5590 0 0);
  --sidebar: oklch(0.9721 0.0158 110.5501);
  --sidebar-foreground: oklch(0.5066 0.2501 271.8903);
  --sidebar-primary: oklch(0.5066 0.2501 271.8903);
  --sidebar-primary-foreground: oklch(1.0000 0 0);
  --sidebar-accent: oklch(0.9168 0.0214 109.7161);
  --sidebar-accent-foreground: oklch(0.4486 0.2266 271.5512);
  --sidebar-border: oklch(0.4486 0.2266 271.5512);
  --sidebar-ring: oklch(0.4486 0.2266 271.5512);
  --surface: oklch(0.95 0.018 112);
  --surface-foreground: oklch(0.35 0.04 175);
  --code: oklch(0.92 0.022 108);
  --code-foreground: oklch(0.4 0.045 170);
  --code-highlight: oklch(0.88 0.028 118);
  --code-number: oklch(0.58 0.06 165);
  --selection: oklch(0.72 0.1 75);
  --selection-foreground: oklch(0.95 0.01 70);
  --font-sans: Geist Mono, sans-serif;
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --radius: 0rem;
  --shadow-2xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-sm: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow-md: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10);
  --shadow-lg: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10);
  --shadow-xl: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10);
  --shadow-2xl: 0 1px 3px 0px hsl(0 0% 0% / 0.25);
  --tracking-normal: 0em;
  --spacing: 0.25rem;
}

.dark {
  --background: oklch(0.12 0.015 240);
  --foreground: oklch(0.92 0.01 120);
  --card: oklch(0.18 0.02 230);
  --card-foreground: oklch(0.88 0.015 110);
  --popover: oklch(0.22 0.025 225);
  --popover-foreground: oklch(0.9 0.012 105);
  --primary: oklch(0.75 0.12 85);
  --primary-foreground: oklch(0.1 0.02 240);
  --secondary: oklch(0.25 0.03 220);
  --secondary-foreground: oklch(0.85 0.02 100);
  --muted: oklch(0.2 0.025 235);
  --muted-foreground: oklch(0.65 0.025 140);
  --accent: oklch(0.35 0.04 210);
  --accent-foreground: oklch(0.82 0.025 95);
  --destructive: oklch(0.65 0.18 25);
  --destructive-foreground: oklch(0.95 0.01 20);
  --border: oklch(0.3 0.03 225);
  --input: oklch(0.32 0.035 220);
  --ring: oklch(0.68 0.09 80);
  --chart-1: oklch(0.7 0.11 75);
  --chart-2: oklch(0.66 0.09 85);
  --chart-3: oklch(0.62 0.07 95);
  --chart-4: oklch(0.58 0.05 105);
  --chart-5: oklch(0.54 0.03 115);
  --sidebar: oklch(0.16 0.02 235);
  --sidebar-foreground: oklch(0.86 0.018 108);
  --sidebar-primary: oklch(0.72 0.1 82);
  --sidebar-primary-foreground: oklch(0.12 0.015 238);
  --sidebar-accent: oklch(0.28 0.035 215);
  --sidebar-accent-foreground: oklch(0.8 0.03 100);
  --sidebar-border: oklch(0.26 0.03 228);
  --sidebar-ring: oklch(0.65 0.08 77);
  --surface: oklch(0.14 0.018 242);
  --surface-foreground: oklch(0.75 0.03 130);
  --code: oklch(0.16 0.02 238);
  --code-foreground: oklch(0.72 0.025 125);
  --code-highlight: oklch(0.2 0.025 232);
  --code-number: oklch(0.68 0.04 135);
  --selection: oklch(0.7 0.09 80);
  --selection-foreground: oklch(0.08 0.01 245);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-surface: var(--surface);
  --color-surface-foreground: var(--surface-foreground);
  --color-code: var(--code);
  --color-code-foreground: var(--code-foreground);
  --color-code-highlight: var(--code-highlight);
  --color-code-number: var(--code-number);
  --color-selection: var(--selection);
  --color-selection-foreground: var(--selection-foreground);
  
  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --font-serif: var(--font-serif);
  
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}`;

const solarizedThemeCode = `/* Solarized Theme */
:root {
  /* Solarized Light Colors */
  --solarized-base03: #002b36;
  --solarized-base02: #073642;
  --solarized-base01: #586e75;
  --solarized-base00: #657b83;
  --solarized-base0: #839496;
  --solarized-base1: #93a1a1;
  --solarized-base2: #eee8d5;
  --solarized-base3: #fdf6e3;
  --solarized-yellow: #b58900;
  --solarized-orange: #cb4b16;
  --solarized-red: #dc322f;
  --solarized-magenta: #d33682;
  --solarized-violet: #6c71c4;
  --solarized-blue: #268bd2;
  --solarized-cyan: #2aa198;
  --solarized-green: #859900;

  /* Light mode mappings */
  --background: var(--solarized-base3);
  --foreground: var(--solarized-base00);
  --card: var(--solarized-base3);
  --card-foreground: var(--solarized-base00);
  --popover: var(--solarized-base3);
  --popover-foreground: var(--solarized-base00);
  --primary: var(--solarized-blue);
  --primary-foreground: var(--solarized-base3);
  --secondary: var(--solarized-base2);
  --secondary-foreground: var(--solarized-base01);
  --muted: var(--solarized-base2);
  --muted-foreground: var(--solarized-base01);
  --accent: var(--solarized-cyan);
  --accent-foreground: var(--solarized-base3);
  --destructive: var(--solarized-red);
  --destructive-foreground: var(--solarized-base3);
  --border: var(--solarized-base1);
  --input: var(--solarized-base2);
  --ring: var(--solarized-blue);
  --chart-1: var(--solarized-blue);
  --chart-2: var(--solarized-green);
  --chart-3: var(--solarized-yellow);
  --chart-4: var(--solarized-orange);
  --chart-5: var(--solarized-red);
}

.dark {
  /* Dark mode mappings */
  --background: var(--solarized-base03);
  --foreground: var(--solarized-base0);
  --card: var(--solarized-base02);
  --card-foreground: var(--solarized-base0);
  --popover: var(--solarized-base02);
  --popover-foreground: var(--solarized-base0);
  --primary: var(--solarized-blue);
  --primary-foreground: var(--solarized-base03);
  --secondary: var(--solarized-base02);
  --secondary-foreground: var(--solarized-base1);
  --muted: var(--solarized-base02);
  --muted-foreground: var(--solarized-base01);
  --accent: var(--solarized-cyan);
  --accent-foreground: var(--solarized-base03);
  --destructive: var(--solarized-red);
  --destructive-foreground: var(--solarized-base3);
  --border: var(--solarized-base01);
  --input: var(--solarized-base02);
  --ring: var(--solarized-blue);
  --chart-1: var(--solarized-blue);
  --chart-2: var(--solarized-green);
  --chart-3: var(--solarized-yellow);
  --chart-4: var(--solarized-orange);
  --chart-5: var(--solarized-red);
}`;

export default function ThemesPage() {
  const { setActiveTheme } = useThemeConfig()
  const [copied, setCopied] = useState(false)

  const handleTryTheme = () => {
    setActiveTheme("claymorphism")
  }

  const handleTrySolarizedTheme = () => {
    setActiveTheme("solarized")
  }

  const handleResetToDefault = () => {
    setActiveTheme("default")
  }

  const handleCopyCode = () => {
    copyToClipboardWithMeta(claymorphismThemeCode, {
      name: "copy_theme_code",
      properties: {
        theme: "claymorphism",
      },
    })
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCopySolarizedCode = () => {
    copyToClipboardWithMeta(solarizedThemeCode, {
      name: "copy_theme_code",
      properties: {
        theme: "solarized",
      },
    })
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Themes</PageHeaderHeading>
        <PageHeaderDescription>
          Beautiful themes and color schemes for Delta and{" "}
          <a href="https://ui.shadcn.com" className="underline">
            shadcn
          </a>{" "}
          components, created using{" "}
          <a href="https://tweakcn.com" className="underline">
            tweakcn
          </a>
          . Customize your app&apos;s appearance.
        </PageHeaderDescription>
      </PageHeader>
      <div className="container-wrapper section-soft flex-1 md:py-12">
        <div className="container">
          <div className="mb-6">
            <Button onClick={handleResetToDefault} variant="outline">
              Reset to Default Theme
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group relative rounded-lg border p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex flex-col space-y-4">
                <img 
                  src="/images/themes/claymorphism.png" 
                  alt="Claymorphism theme preview"
                  className="aspect-video w-full object-cover"
                />
                <div className="space-y-2">
                  <h3 className="font-semibold">Claymorphism</h3>
                  <p className="text-muted-foreground text-sm">
                    A modern design approach with soft, clay-like elements and subtle shadows.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1" onClick={handleTryTheme}>
                    Try it out
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" className="flex-1">
                        &#123; &#125; Code
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Claymorphism Theme Code</DialogTitle>
                        <DialogDescription>
                          Copy and paste this CSS into your project to use the Claymorphism theme.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="relative overflow-x-auto">
                        <figcaption
                          data-rehype-pretty-code-title=""
                          className="text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 border-b px-3 py-2 bg-muted rounded-t-md [&_svg]:size-4 [&_svg]:opacity-70"
                          data-language="css"
                        >
                          {getIconForLanguageExtension("css")}
                          globals.css
                        </figcaption>
                        <pre className="max-h-[400px] overflow-auto rounded-t-none rounded-md bg-muted p-4 text-sm">
                          <code>{claymorphismThemeCode}</code>
                        </pre>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              variant="ghost"
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
                </div>
              </div>
            </div>

            <div className="group relative rounded-lg border p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex flex-col space-y-4">
                <img 
                  src="/images/themes/solarized.png" 
                  alt="Solarized theme preview"
                  className="aspect-video w-full object-cover"
                />
                <div className="space-y-2">
                  <h3 className="font-semibold">Solarized</h3>
                  <p className="text-muted-foreground text-sm">
                    A sixteen color palette designed for use with terminal and gui applications.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1" onClick={handleTrySolarizedTheme}>
                    Try it out
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" className="flex-1">
                        &#123; &#125; Code
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Solarized Theme Code</DialogTitle>
                        <DialogDescription>
                          Copy and paste this CSS into your project to use the Solarized theme.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="relative overflow-x-auto">
                        <figcaption
                          data-rehype-pretty-code-title=""
                          className="text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 border-b px-3 py-2 bg-muted rounded-t-md [&_svg]:size-4 [&_svg]:opacity-70"
                          data-language="css"
                        >
                          {getIconForLanguageExtension("css")}
                          globals.css
                        </figcaption>
                        <pre className="max-h-[400px] overflow-auto rounded-t-none rounded-md bg-muted p-4 text-sm">
                          <code>{solarizedThemeCode}</code>
                        </pre>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="absolute top-1.5 right-2 z-10 size-7 opacity-70 hover:opacity-100 focus-visible:opacity-100"
                              onClick={handleCopySolarizedCode}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
