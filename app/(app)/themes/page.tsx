import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Themes",
  description: "Beautiful themes and design systems.",
}

export default function ThemesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6">
      <div className="sm:py-4">
        <div className="mb-4 flex items-center space-x-1 text-sm leading-none text-muted-foreground">
          <div className="truncate">Docs</div>
        </div>
        <div className="space-y-2">
          <h1 className="font-heading font-medium scroll-m-20 text-4xl lg:text-3xl font-bold tracking-tight text-pretty">
            Themes
          </h1>
          <p className="text-base text-muted-foreground text-pretty">
            Beautiful themes and design systems.
          </p>
        </div>
        <div className="pt-4">
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
            <p className="text-muted-foreground max-w-md">
              We&apos;re preparing a collection of beautiful themes and design
              systems. Check back soon for more!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
