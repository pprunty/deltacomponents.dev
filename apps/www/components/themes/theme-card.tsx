"use client"

import type { ThemeData } from "@/lib/theme-data"
import { useThemeConfig } from "@/components/active-theme"
import { Button } from "@/registry/delta-ui/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/delta-ui/ui/card"

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
    <Card className="group relative h-full">
      <CardContent>
        <img
          src={theme.previewImage}
          alt={`${theme.name} theme preview`}
          className="aspect-video w-full object-cover"
        />
      </CardContent>
      <CardHeader>
        <CardTitle className="text-lg md:text-xl font-heading">{theme.name}</CardTitle>
        <CardDescription className="text-base md:text-[17px]">
          {theme.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="gap-2">
        <Button size="default" className="flex-1" onClick={handleTryTheme}>
          Try it out
        </Button>
        <ThemeCodeDialog themeName={theme.name} themeValue={theme.value} />
      </CardFooter>
    </Card>
  )
}
