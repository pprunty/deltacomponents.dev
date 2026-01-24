"use client"

import { MapboxPointer } from "@/registry/delta-ui/delta/mapbox-pointer"

export default function MapboxGridBlockPage() {
  return (
    <div className="bg-background flex min-h-screen w-full items-center justify-center">
      <div className="mx-auto w-full max-w-7xl p-6">
        <div className="space-y-8">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Where we're cooking
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg">
              Building the future from three world-class innovation hubs
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* New York City */}
            <div className="space-y-3">
              <MapboxPointer
                latitude={40.7128}
                longitude={-74.006}
                zoom={11}
                markerColor="#679BFF"
                className="aspect-square w-full"
                label="New York City, USA"
                interactive={false}
              />
            </div>

            {/* SF Bay Area */}
            <div className="space-y-3">
              <MapboxPointer
                latitude={37.7749}
                longitude={-122.4194}
                zoom={11}
                markerColor="#679BFF"
                className="aspect-square w-full"
                label="San Francisco, USA"
                interactive={false}
              />
            </div>

            {/* London */}
            <div className="space-y-3">
              <MapboxPointer
                latitude={51.5074}
                longitude={-0.1278}
                zoom={11}
                markerColor="#679BFF"
                className="aspect-square w-full"
                label="London, United Kingdom"
                interactive={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
