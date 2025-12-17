import type { Metadata } from "next"

import { ThemesPageClient } from "./themes-client"

export const metadata: Metadata = {
  title: "Beautiful Themes for Modern UIs",
  description:
    "Carefully crafted color schemes for Delta and shadcn/ui components. Preview, customize, and apply with a single click. Open Source. Free forever.",
}

export default function ThemesPage() {
  return <ThemesPageClient />
}
