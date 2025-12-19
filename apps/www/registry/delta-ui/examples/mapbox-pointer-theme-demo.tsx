"use client"

import {
  MapboxPointer,
  MapboxPointerLabel,
} from "@/registry/delta-ui/delta/mapbox-pointer"

export default function MapboxPointerThemeDemo() {
  return (
    <div className="mx-auto w-full max-w-lg space-y-4">
      <MapboxPointer
        latitude={40.7128}
        longitude={-74.006}
        zoom={12}
        themeAware={true}
        interactive={true}
        className="h-96 sm:h-[32rem]"
      >
        <MapboxPointerLabel
          label="New York City"
          href="https://en.wikipedia.org/wiki/New_York_City"
        />
      </MapboxPointer>
    </div>
  )
}
