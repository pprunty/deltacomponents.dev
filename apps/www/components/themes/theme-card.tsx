"use client"

import { useTheme } from "next-themes"

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
  const { resolvedTheme } = useTheme()

  const handleTryTheme = () => {
    setActiveTheme(theme.value)
  }

  const isDark = resolvedTheme === "dark"
  const themeImageSrc = `/images/themes/${theme.value}-${isDark ? "dark" : "light"}.webp`

  return (
    <Card className="group relative h-full">
      <CardContent>
        <img
          src={themeImageSrc}
          alt={`${theme.name} theme preview`}
          className="aspect-video w-full object-cover"
        />
      </CardContent>
      <CardHeader>
        <CardTitle className="font-satoshi text-lg tracking-tighter">
          {theme.name}
        </CardTitle>
        <CardDescription className="text-base">
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
