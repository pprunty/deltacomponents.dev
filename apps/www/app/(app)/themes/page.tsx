import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Themes",
  description: "Beautiful themes and color schemes for Delta Components and shadcn/ui components.",
}

import { ThemesPageClient } from "./themes-client"

export default function ThemesPage() {
  return <ThemesPageClient />
}