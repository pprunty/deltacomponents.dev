"use client"

import { useState } from "react"

import { CambioImage } from "@/registry/delta-ui/delta/cambio-image"
import { ToggleGroup, ToggleGroupItem } from "@/registry/delta-ui/ui/toggle-group"

type MotionPreset = "snappy" | "smooth" | "bouncy" | "reduced"

export default function CambioImageMotionPresetDemo() {
  const [motionPreset, setMotionPreset] = useState<MotionPreset>("snappy")

  return (
    <div className="flex flex-col items-center gap-8">
      <ToggleGroup
        type="single"
        value={motionPreset}
        onValueChange={(value) => {
          if (value) setMotionPreset(value as MotionPreset)
        }}
        variant="outline"
      >
        <ToggleGroupItem value="snappy">Snappy</ToggleGroupItem>
        <ToggleGroupItem value="smooth">Smooth</ToggleGroupItem>
        <ToggleGroupItem value="bouncy">Bouncy</ToggleGroupItem>
        <ToggleGroupItem value="reduced">Reduced</ToggleGroupItem>
      </ToggleGroup>

      <div className="w-[300px]">
        <CambioImage
          src="/images/fxwzxr1ueaacbrr.jpg"
          alt="Colorful impressionist landscape painting with trees and figures"
          width={1200}
          height={1200}
          motion={motionPreset}
          dismissOnImageClick
          dismissOnScroll
        />
      </div>
    </div>
  )
}
