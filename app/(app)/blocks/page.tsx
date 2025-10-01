import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blocks",
  description: "Building blocks for your next project.",
}

export default function BlocksPage() {
  return (
    <div className="container max-w-6xl lg:py-8">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
            Blocks
          </h1>
          <p className="text-xl text-muted-foreground">
            Building blocks for your next project.
          </p>
        </div>
      </div>
      <hr className="my-8" />
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
        <p className="text-muted-foreground max-w-md">
          We&apos;re working on curating a collection of beautiful building
          blocks for your projects. Stay tuned for updates!
        </p>
      </div>
    </div>
  )
}
