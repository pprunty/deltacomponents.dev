"use client"

import * as React from "react"

import { ScrollFadeEffect } from "@/registry/delta-ui/delta/scroll-fade-effect"
import { Label } from "@/registry/delta-ui/ui/label"
import { Separator } from "@/registry/delta-ui/ui/separator"
import { Slider } from "@/registry/delta-ui/ui/slider"

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

export function ScrollFadeEffectSliderDemo() {
  const [intensity, setIntensity] = React.useState(64)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="intensity">Intensity</Label>
          <span className="text-muted-foreground text-sm">{intensity}px</span>
        </div>
        <Slider
          id="intensity"
          min={0}
          max={150}
          step={1}
          value={[intensity]}
          onValueChange={([value]) => setIntensity(value)}
        />
      </div>
      <div className="rounded-lg border">
        <ScrollFadeEffect intensity={intensity} className="h-72 w-48">
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
    </div>
  )
}
