"use client"

import { MapboxPointer } from "@/registry/delta-ui/delta/mapbox-pointer"

export default function MapboxPointerDemo() {
  return (
    <div className="w-full">
        <MapboxPointer
        latitude={53.342825}
        longitude={-6.257311}
        zoom={13}
        clickForDirections={false}
        label="Dublin, Ireland"
        interactive={false}
        labelHref="https://en.wikipedia.org/wiki/Dublin"
        className="h-64 sm:h-96"
      />
    </div>
  )
}
