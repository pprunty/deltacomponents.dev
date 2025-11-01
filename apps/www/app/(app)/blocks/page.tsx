import Link from "next/link"

import { BlockDisplay } from "@/components/block-display"
// Import all available blocks
import blocksData from "@/registry/__blocks__.json"
import { Button } from "@/registry/delta-ui/ui/button"

export default async function BlocksPage() {
  // Get all block names from the registry
  const allBlocks = blocksData.map((block) => block.name)

  return (
    <div>
      {allBlocks.map((block) => (
        <div key={block} className="container py-8 first:pt-6 md:py-12">
          <BlockDisplay
            name={block}
            defaultViewSize={block === "bottom-mobile-nav" ? "30" : undefined}
          />
        </div>
      ))}
    </div>
  )
}
