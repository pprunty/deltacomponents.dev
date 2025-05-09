"use client"

import * as React from "react"
import {
  CheckIcon,
  MoonIcon,
  PaletteIcon,
  RepeatIcon,
  SunIcon,
} from "lucide-react"
import { useTheme } from "next-themes"

import { baseColors } from "@/config/colors"
import { cn } from "@/lib/utils"
import { getThemeBackgroundColor, useMetaColor } from "@/hooks/use-meta-color"
import { Button } from "@/components/ui/button"
import { DialogTitle } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"

import { useThemeConfig } from "./active-theme"

interface ThemeCustomizerProps {
  theme?: string
}

export function ThemeCustomizer({ theme }: ThemeCustomizerProps = {}) {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const { setMetaColor } = useMetaColor()
  const { setActiveTheme } = useThemeConfig()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // If a specific theme is provided, we'll just show the dark/light toggle
  const isThemeSpecified = !!theme
  const triggerIcon = isThemeSpecified ? (
    resolvedTheme === "dark" ? (
      <MoonIcon />
    ) : (
      <SunIcon />
    )
  ) : (
    <PaletteIcon />
  )

  // Set the specific theme if provided - only once
  React.useEffect(() => {
    if (theme && mounted) {
      setActiveTheme(theme)

      // Set the meta color based on the provided theme and current mode
      const isDark = resolvedTheme === "dark"
      const bgColor = getThemeBackgroundColor(theme, isDark)
      setMetaColor(bgColor)
    }
  }, [theme, mounted, setActiveTheme, resolvedTheme, setMetaColor])

  // Update meta color when dark/light mode changes for the current theme
  React.useEffect(() => {
    if (mounted && theme) {
      const isDark = resolvedTheme === "dark"
      const bgColor = getThemeBackgroundColor(theme, isDark)
      setMetaColor(bgColor)
    }
  }, [resolvedTheme, mounted, theme, setMetaColor])

  const handleThemeToggle = () => {
    if (isThemeSpecified) {
      const newMode = resolvedTheme === "dark" ? "light" : "dark"
      setTheme(newMode)
    }
  }

  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="ghost"
            className="md:hidden"
            size="icon"
            onClick={isThemeSpecified ? handleThemeToggle : undefined}
          >
            {triggerIcon}
          </Button>
        </DrawerTrigger>
        {!isThemeSpecified && (
          <DrawerContent>
            <DialogTitle className="sr-only">Theme Customizer</DialogTitle>
            <Customizer />
          </DrawerContent>
        )}
      </Drawer>
      <div className="hidden items-center md:flex">
        {isThemeSpecified ? (
          <Button variant="ghost" size="icon" onClick={handleThemeToggle}>
            {triggerIcon}
          </Button>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <PaletteIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="z-999 w-[340px] rounded-[12px] p-6"
              sideOffset={10}
            >
              <Customizer />
            </PopoverContent>
          </Popover>
        )}
      </div>
    </>
  )
}

export function Customizer() {
  const { activeTheme, setActiveTheme } = useThemeConfig()
  const [mounted, setMounted] = React.useState(false)
  const { setTheme, resolvedTheme: theme } = useTheme()
  const { setMetaColor } = useMetaColor()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Updates meta color when activeTheme or light/dark mode changes
  React.useEffect(() => {
    if (mounted && activeTheme) {
      const isDark = theme === "dark"
      const bgColor = getThemeBackgroundColor(activeTheme, isDark)
      setMetaColor(bgColor)
    }
  }, [activeTheme, theme, mounted, setMetaColor])

  const handleThemeChange = (themeName: string) => {
    setActiveTheme(themeName)
  }

  return (
    <div className="w-full p-2 md:p-0">
      <div className="flex items-start pt-4 md:pt-0">
        <div className="space-y-1 pr-2">
          <div className="font-semibold leading-none tracking-tight">
            Customize
          </div>
          <div className="text-xs text-muted-foreground">
            Pick a style and color for the website.
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto rounded-[0.5rem]"
          onClick={() => setTheme("system")}
        >
          <RepeatIcon />
          <span className="sr-only">Reset</span>
        </Button>
      </div>
      <div className="flex flex-1 flex-col space-y-4 md:space-y-6">
        <div className="space-y-1.5">
          <Label className="text-xs">Color</Label>
          <div className="flex flex-col gap-2">
            {baseColors.map((color) => {
              const isActive = activeTheme === color.name

              return mounted ? (
                <Button
                  variant={"outline"}
                  size="sm"
                  key={color.name}
                  onClick={() => handleThemeChange(color.name)}
                  className={cn(
                    "justify-start",
                    isActive && "border-2 border-primary dark:border-primary"
                  )}
                  style={
                    {
                      "--theme-primary": `${
                        color?.activeColor[theme === "dark" ? "dark" : "light"]
                      }`,
                    } as React.CSSProperties
                  }
                >
                  <span
                    className={cn(
                      "mr-1 flex size-5 shrink-0 -translate-x-1 items-center justify-center rounded-full bg-[var(--theme-primary)]"
                    )}
                  >
                    {isActive && <CheckIcon className="size-4 text-white" />}
                  </span>
                  {color.label}
                </Button>
              ) : (
                <Skeleton className="h-8 w-full" key={color.name} />
              )
            })}
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Mode</Label>
          <div className="grid grid-cols-3 gap-2">
            {mounted ? (
              <>
                <Button
                  variant={"outline"}
                  size="sm"
                  onClick={() => setTheme("light")}
                  className={cn(theme !== "dark" && "border-2 border-primary")}
                >
                  <SunIcon className="mr-1 -translate-x-1" />
                  Light
                </Button>
                <Button
                  variant={"outline"}
                  size="sm"
                  onClick={() => setTheme("dark")}
                  className={cn(
                    theme === "dark" &&
                      "border-2 border-primary dark:border-primary"
                  )}
                >
                  <MoonIcon className="mr-1 -translate-x-1" />
                  Dark
                </Button>
              </>
            ) : (
              <>
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
