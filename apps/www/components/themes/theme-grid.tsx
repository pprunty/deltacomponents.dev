"use client"

import { THEME_DATA } from "@/lib/theme-data"
import { ThemeCard } from "./theme-card"

export function ThemeGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {THEME_DATA.map((theme) => (
        <ThemeCard key={theme.value} theme={theme} />
      ))}
    </div>
  )
}