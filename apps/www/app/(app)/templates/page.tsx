import { Metadata } from "next"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Button } from "@/registry/shadcn/button"

export const metadata: Metadata = {
  title: "Templates",
  description:
    "Ready-to-use templates built with Delta Components UI components.",
}

export default function TemplatesPage() {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Templates</PageHeaderHeading>
        <PageHeaderDescription>
          Ready-to-use templates built with Delta Components UI components. Copy
          and paste into your apps.
        </PageHeaderDescription>
      </PageHeader>
      <div className="container-wrapper section-soft flex-1 md:py-12">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group relative rounded-lg border p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex flex-col space-y-4">
                <div className="bg-muted aspect-video w-full rounded-md" />
                <div className="space-y-2">
                  <h3 className="font-semibold">Chat Interface</h3>
                  <p className="text-muted-foreground text-sm">
                    A complete chat interface with audio playback and voice
                    controls.
                  </p>
                </div>
                <Button size="sm" className="w-fit">
                  Coming Soon
                </Button>
              </div>
            </div>
            <div className="group relative rounded-lg border p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex flex-col space-y-4">
                <div className="bg-muted aspect-video w-full rounded-md" />
                <div className="space-y-2">
                  <h3 className="font-semibold">Voice Dashboard</h3>
                  <p className="text-muted-foreground text-sm">
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
                <div className="bg-muted aspect-video w-full rounded-md" />
                <div className="space-y-2">
                  <h3 className="font-semibold">Audio Playground</h3>
                  <p className="text-muted-foreground text-sm">
                    Interactive playground for testing voice settings and
                    parameters.
                  </p>
                </div>
                <Button size="sm" className="w-fit">
                  Coming Soon
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
