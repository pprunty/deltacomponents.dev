import { Metadata } from "next"

import { Button } from "@/registry/delta-ui/ui/button"

export const metadata: Metadata = {
  title: "Themes",
  description: "Beautiful themes and color schemes for Delta Components UI components.",
}

export default function ThemesPage() {
  return (
    <div className="container py-6 md:py-8 lg:py-12">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
            Themes
          </h1>
          <p className="text-xl text-muted-foreground">
            Beautiful themes and color schemes for ElevenLabs UI components. Customize your app&apos;s appearance.
          </p>
        </div>
      </div>
      <hr className="my-8" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="group relative rounded-lg border p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex flex-col space-y-4">
            <div className="aspect-video w-full rounded-md bg-gradient-to-br from-blue-500 to-purple-600" />
            <div className="space-y-2">
              <h3 className="font-semibold">Ocean Blue</h3>
              <p className="text-sm text-muted-foreground">
                A calming blue theme inspired by ocean depths.
              </p>
            </div>
            <Button size="sm" className="w-fit">
              Coming Soon
            </Button>
          </div>
        </div>
        <div className="group relative rounded-lg border p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex flex-col space-y-4">
            <div className="aspect-video w-full rounded-md bg-gradient-to-br from-emerald-500 to-teal-600" />
            <div className="space-y-2">
              <h3 className="font-semibold">Forest Green</h3>
              <p className="text-sm text-muted-foreground">
                A natural green theme inspired by lush forests.
              </p>
            </div>
            <Button size="sm" className="w-fit">
              Coming Soon
            </Button>
          </div>
        </div>
        <div className="group relative rounded-lg border p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex flex-col space-y-4">
            <div className="aspect-video w-full rounded-md bg-gradient-to-br from-orange-500 to-red-600" />
            <div className="space-y-2">
              <h3 className="font-semibold">Sunset Orange</h3>
              <p className="text-sm text-muted-foreground">
                A warm orange theme inspired by beautiful sunsets.
              </p>
            </div>
            <Button size="sm" className="w-fit">
              Coming Soon
            </Button>
          </div>
        </div>
        <div className="group relative rounded-lg border p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex flex-col space-y-4">
            <div className="aspect-video w-full rounded-md bg-gradient-to-br from-slate-700 to-slate-900" />
            <div className="space-y-2">
              <h3 className="font-semibold">Midnight Dark</h3>
              <p className="text-sm text-muted-foreground">
                A sophisticated dark theme for professional applications.
              </p>
            </div>
            <Button size="sm" className="w-fit">
              Coming Soon
            </Button>
          </div>
        </div>
        <div className="group relative rounded-lg border p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex flex-col space-y-4">
            <div className="aspect-video w-full rounded-md bg-gradient-to-br from-pink-500 to-rose-600" />
            <div className="space-y-2">
              <h3 className="font-semibold">Rose Pink</h3>
              <p className="text-sm text-muted-foreground">
                A vibrant pink theme for creative and modern interfaces.
              </p>
            </div>
            <Button size="sm" className="w-fit">
              Coming Soon
            </Button>
          </div>
        </div>
        <div className="group relative rounded-lg border p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex flex-col space-y-4">
            <div className="aspect-video w-full rounded-md bg-gradient-to-br from-violet-500 to-purple-600" />
            <div className="space-y-2">
              <h3 className="font-semibold">Royal Purple</h3>
              <p className="text-sm text-muted-foreground">
                An elegant purple theme with a touch of luxury.
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