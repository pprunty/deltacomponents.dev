import type { Metadata } from "next"
import { ThemesPageClient } from "./themes-client"

export const metadata: Metadata = {
  title: "Themes - Delta Components",
  description: "Beautiful themes and color schemes for Delta Components and shadcn/ui components.",
}

export default function ThemesPage() {
  return <ThemesPageClient />
}