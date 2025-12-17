"use client"

import {
  MapboxPointer,
  MapboxPointerLabel,
} from "@/registry/delta-ui/delta/mapbox-pointer"

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
        className="h-96"
      >
        <MapboxPointerLabel
          label="Dublin, Ireland"
          href="https://en.wikipedia.org/wiki/Dublin"
        />
      </MapboxPointer>
    </div>
  )
}
