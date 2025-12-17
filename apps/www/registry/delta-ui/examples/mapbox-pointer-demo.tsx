"use client"

import {
  MapboxPointer,
  MapboxPointerLabel,
} from "@/registry/delta-ui/delta/mapbox-pointer"

export default function MapboxPointerDemo() {
  return (
    <div className="mx-auto w-full max-w-lg">
      <MapboxPointer
        latitude={37.7749}
        longitude={-122.4194}
        zoom={10}
        clickForDirections={false}
        interactive={false}
        className="h-96 sm:h-[32rem]"
      >
        <MapboxPointerLabel
          label="San Francisco, CA"
          href="https://en.wikipedia.org/wiki/San_Francisco"
        />
      </MapboxPointer>
    </div>
  )
}
