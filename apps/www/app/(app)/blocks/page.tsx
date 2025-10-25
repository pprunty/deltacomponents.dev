import Link from "next/link"

import { BlockDisplay } from "@/components/block-display"
import { Button } from "@/registry/delta-ui/ui/button"

// Import all available blocks
import blocksData from "@/registry/__blocks__.json"

export default async function BlocksPage() {
  // Get all block names from the registry
  const allBlocks = blocksData.map((block) => block.name)

  return (
    <div>
      {allBlocks.map((block) => (
        <div key={block} className="container py-8 first:pt-6 md:py-12">
          <BlockDisplay name={block} />
        </div>
      ))}
      <div className="container-wrapper">
        <div className="container flex justify-center py-6">
          <Button asChild variant="outline">
            <Link href="/blocks/sidebar">Browse all blocks</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
