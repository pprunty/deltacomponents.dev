import type { Metadata } from "next"

import { BlockDisplay } from "@/components/block-display"
// Import all available blocks
import blocksData from "@/registry/__blocks__.json"

export const metadata: Metadata = {
  title: "Blocks - Pre-built shadcn Components | Delta Components",
  description:
    "Production-ready shadcn blocks and page sections. Copy-paste full-page layouts, chat interfaces, sidebars, and navigation components built with shadcn/ui and Tailwind CSS.",
  alternates: {
    canonical: "https://deltacomponents.dev/blocks",
  },
  openGraph: {
    title: "shadcn Blocks - Delta Components",
    description:
      "Production-ready blocks and page sections built with shadcn/ui",
    url: "https://deltacomponents.dev/blocks",
  },
}

export default async function BlocksPage() {
  // Get all block names from the registry
  const allBlocks = blocksData.map((block) => block.name)

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
