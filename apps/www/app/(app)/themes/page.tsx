import type { Metadata } from "next"

import { ThemesPageClient } from "./themes-client"

export const metadata: Metadata = {
  title: "shadcn Themes - Beautiful Color Schemes | Delta Components",
  description:
    "Carefully crafted shadcn/ui themes and color schemes. 6 custom themes with light/dark modes for Delta Components and shadcn components. Preview, customize, and install with one click. Free and open source.",
  alternates: {
    canonical: "https://deltacomponents.dev/themes",
  },
  openGraph: {
    title: "shadcn Themes - Delta Components",
    description:
      "Beautiful color schemes for shadcn/ui. Install custom themes with one command.",
    url: "https://deltacomponents.dev/themes",
  },
}

export default function ThemesPage() {
  return <ThemesPageClient />
}
