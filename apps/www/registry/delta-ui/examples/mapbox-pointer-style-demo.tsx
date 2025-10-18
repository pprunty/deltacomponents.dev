"use client"

import { MapboxPointer } from "@/registry/delta-ui/delta/mapbox-pointer"

export default function MapboxPointerStyleDemo() {
  // Dublin, Ireland coordinates
  const latitude = 53.3498
  const longitude = -6.2603

  return (
    <div className="w-full">
      <MapboxPointer
        latitude={latitude}
        longitude={longitude}
        zoom={12.8}
        style="navigation-night-v1"
        interactive={true}
        label="Dublin, Ireland"
        labelHref="https://en.wikipedia.org/wiki/Dublin"
        className="h-96"
      />
    </div>
  )
}
