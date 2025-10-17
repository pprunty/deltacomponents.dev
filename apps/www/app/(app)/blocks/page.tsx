import Link from "next/link"

import { BlockDisplay } from "@/components/block-display"
import { Button } from "@/registry/shadcn/button"

const FEATURED_BLOCKS = ["testimonials"]

export default async function BlocksPage() {
  return (
    <div>
      {FEATURED_BLOCKS.map((block) => (
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
