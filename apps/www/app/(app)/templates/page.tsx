import { Metadata } from "next"

import { Button } from "@/registry/delta-ui/ui/button"

export const metadata: Metadata = {
  title: "Templates",
  description: "Ready-to-use templates built with Delta Components UI components.",
}

export default function TemplatesPage() {
  return (
    <div className="container py-6 md:py-8 lg:py-12">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
            Templates
          </h1>
          <p className="text-xl text-muted-foreground">
            Ready-to-use templates built with ElevenLabs UI components. Copy and paste into your apps.
          </p>
        </div>
      </div>
      <hr className="my-8" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="group relative rounded-lg border p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex flex-col space-y-4">
            <div className="aspect-video w-full rounded-md bg-muted" />
            <div className="space-y-2">
              <h3 className="font-semibold">Chat Interface</h3>
              <p className="text-sm text-muted-foreground">
                A complete chat interface with audio playback and voice controls.
              </p>
            </div>
            <Button size="sm" className="w-fit">
              Coming Soon
            </Button>
          </div>
        </div>
        <div className="group relative rounded-lg border p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex flex-col space-y-4">
            <div className="aspect-video w-full rounded-md bg-muted" />
            <div className="space-y-2">
              <h3 className="font-semibold">Voice Dashboard</h3>
              <p className="text-sm text-muted-foreground">
                Analytics dashboard for voice generation and usage metrics.
              </p>
            </div>
            <Button size="sm" className="w-fit">
              Coming Soon
            </Button>
          </div>
        </div>
        <div className="group relative rounded-lg border p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex flex-col space-y-4">
            <div className="aspect-video w-full rounded-md bg-muted" />
            <div className="space-y-2">
              <h3 className="font-semibold">Audio Playground</h3>
              <p className="text-sm text-muted-foreground">
                Interactive playground for testing voice settings and parameters.
              </p>
            </div>
            <Button size="sm" className="w-fit">
              Coming Soon
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}