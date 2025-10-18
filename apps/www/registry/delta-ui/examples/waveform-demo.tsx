"use client"

import { useState } from "react"

import { ScrollingWaveform, Waveform } from "@/registry/delta-ui/delta/waveform"
import { Button } from "@/registry/delta-ui/ui/button"

export default function WaveformDemo() {
  const [isScrolling, setIsScrolling] = useState(true)

  // Static waveform data
  const staticData = Array.from({ length: 50 }, () => Math.random() * 0.8)

  return (
    <div className="mx-auto w-full max-w-2xl p-6">
      <div className="space-y-6">
        <div>
          <h2 className="mb-2 text-2xl font-bold">Waveform Demo</h2>
          <p className="text-muted-foreground">
            Interactive waveform components with scrolling and static modes.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Button
              variant={isScrolling ? "default" : "outline"}
              size="sm"
              onClick={() => setIsScrolling(true)}
            >
              Scrolling
            </Button>
            <Button
              variant={!isScrolling ? "default" : "outline"}
              size="sm"
              onClick={() => setIsScrolling(false)}
            >
              Static
            </Button>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="mb-4 text-lg font-semibold">
              {isScrolling ? "Scrolling Waveform" : "Static Waveform"}
            </h3>

            <div className="h-24 rounded bg-gray-50 dark:bg-gray-900">
              {isScrolling ? (
                <ScrollingWaveform
                  height="h-full"
                  barWidth={4}
                  barGap={2}
                  speed={50}
                  fadeEdges={true}
                  barCount={25}
                  className="opacity-90"
                />
              ) : (
                <Waveform
                  height="h-full"
                  barWidth={4}
                  barGap={2}
                  fadeEdges={true}
                  data={staticData}
                  className="opacity-90"
                />
              )}
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="mb-4 text-lg font-semibold">Different Styles</h3>

            <div className="space-y-4">
              <div>
                <p className="text-muted-foreground mb-2 text-sm">Thin bars</p>
                <div className="h-16 rounded bg-gray-50 dark:bg-gray-900">
                  <ScrollingWaveform
                    height="h-full"
                    barWidth={2}
                    barGap={1}
                    speed={30}
                    amplitude={0.6}
                  />
                </div>
              </div>

              <div>
                <p className="text-muted-foreground mb-2 text-sm">
                  Wide bars with fade
                </p>
                <div className="h-16 rounded bg-gray-50 dark:bg-gray-900">
                  <ScrollingWaveform
                    height="h-full"
                    barWidth={6}
                    barGap={3}
                    speed={40}
                    fadeEdges={true}
                    amplitude={0.9}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
