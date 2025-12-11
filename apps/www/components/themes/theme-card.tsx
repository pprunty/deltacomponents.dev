"use client"

import type { ThemeData } from "@/lib/theme-data"
import { useThemeConfig } from "@/components/active-theme"
import { Button } from "@/registry/delta-ui/ui/button"
import { Card } from "@/registry/delta-ui/ui/card"

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
    <Card className="group relative h-full p-6 transition-shadow hover:shadow-md">
      <div className="flex h-full flex-col gap-4">
        <img
          src={theme.previewImage}
          alt={`${theme.name} theme preview`}
          className="aspect-video w-full object-cover rounded-md"
        />
        <div className="flex-grow space-y-2">
          <h3 className="font-medium text-lg md:text-xl font-heading">{theme.name}</h3>
          <p className="text-muted-foreground text-base md:text-[17px]">{theme.description}</p>
        </div>
        <div className="mt-auto flex gap-2">
          <Button size="default" className="flex-1" onClick={handleTryTheme}>
            Try it out
          </Button>
          <ThemeCodeDialog themeName={theme.name} themeValue={theme.value} />
        </div>
      </div>
    </Card>
  )
}
