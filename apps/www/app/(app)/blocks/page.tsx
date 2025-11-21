import Link from "next/link"
import type { Metadata } from "next"
import { BlockDisplay } from "@/components/block-display"
// Import all available blocks
import blocksData from "@/registry/__blocks__.json"
import { Button } from "@/registry/delta-ui/ui/button"

export const metadata: Metadata = {
  title: "Blocks",
  description: "Pre-built page sections and layouts using Delta Components.",
}

export default async function BlocksPage() {
  // Get all block names from the registry
  const allBlocks = blocksData.map((block) => block.name)

  return (
    <div>
      {allBlocks.map((block) => (
        <div key={block} className="container py-8 first:pt-6 md:py-12">
          <BlockDisplay
            name={block}
            defaultViewSize={undefined}
          />
        </div>
      ))}
    </div>
  )
}
