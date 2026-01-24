import * as React from "react"

import { ScrollFadeEffect } from "@/registry/delta-ui/delta/scroll-fade-effect"
import { Separator } from "@/registry/delta-ui/ui/separator"

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

export function ScrollFadeEffectDemo() {
  return (
    <div className="rounded-lg border">
      <ScrollFadeEffect className="h-72 w-48">
        <div className="p-4">
          <h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>
          {tags.map((tag) => (
            <React.Fragment key={tag}>
              <div className="text-sm">{tag}</div>
              <Separator className="my-2" />
            </React.Fragment>
          ))}
        </div>
      </ScrollFadeEffect>
    </div>
  )
}
