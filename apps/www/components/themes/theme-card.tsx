"use client"

import type { ThemeData } from "@/lib/theme-data"
import { useThemeConfig } from "@/components/active-theme"
import { Button } from "@/registry/delta-ui/ui/button"

import { ThemeCodeDialog } from "./theme-code-dialog"

interface ThemeCardProps {
  theme: ThemeData
}

export function ThemeCard({ theme }: ThemeCardProps) {
  const { setActiveTheme } = useThemeConfig()

  const handleTryTheme = () => {
    setActiveTheme(theme.value)
  }

  return (
    <div className="group relative rounded-lg border p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-col space-y-4">
        <img
          src={theme.previewImage}
          alt={`${theme.name} theme preview`}
          className="aspect-video w-full object-cover"
        />
        <div className="space-y-2">
          <h3 className="font-semibold">{theme.name}</h3>
          <p className="text-muted-foreground text-sm">{theme.description}</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" className="flex-1" onClick={handleTryTheme}>
            Try it out
          </Button>
          <ThemeCodeDialog themeName={theme.name} themeCSS={theme.css} />
        </div>
      </div>
    </div>
  )
}
