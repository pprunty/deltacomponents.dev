import type { Metadata } from "next"

import { getAllBlockIds } from "@/lib/blocks"
import { BlockDisplay } from "@/components/block-display"

const title = "Blocks"
const description =
  "Production-ready blocks and page sections built with shadcn/ui. Copy-paste full-page layouts, chat interfaces, sidebars, and navigation components—own the code."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://deltacomponents.dev/blocks",
  },
  openGraph: {
    title: `${title} | Delta Components UI`,
    description,
    url: "https://deltacomponents.dev/blocks",
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

export default async function BlocksPage() {
  const allBlocks = await getAllBlockIds(["registry:block"])

  return (
    <div>
      {allBlocks.map((block) => (
        <div key={block} className="container py-8 first:pt-6 md:py-12">
          <BlockDisplay name={block} defaultViewSize={undefined} />
        </div>
      ))}
    </div>
  )
}
