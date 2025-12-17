import type { Metadata } from "next"

import { ThemesPageClient } from "./themes-client"

const title = "Themes"
const description =
  "Beautiful color schemes for shadcn/ui. Custom themes with light/dark modes—preview, customize, and install with one click. Free and open source."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://deltacomponents.dev/themes",
  },
  openGraph: {
    title: `${title} | Delta Components UI`,
    description,
    url: "https://deltacomponents.dev/themes",
    images: [
      {
        url: `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Delta Components UI`,
    description,
    images: [
      {
        url: `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
}

export default function ThemesPage() {
  return <ThemesPageClient />
}
