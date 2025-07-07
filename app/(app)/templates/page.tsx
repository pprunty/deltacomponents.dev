export default function TemplatesPage() {
  return (
    <div className="container relative py-6 lg:py-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
          <div className="flex-1 space-y-4">
            <h1 className="inline-block font-black text-4xl lg:text-5xl">
              Templates
            </h1>
            <p className="text-xl text-muted-foreground">
              Pre-built templates and complete applications using Delta
              Components.
            </p>
          </div>
        </div>
        <hr className="my-8" />
        <div className="flex flex-col items-center justify-center space-y-4 py-16">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">Coming Soon</h2>
            <p className="text-muted-foreground max-w-[600px]">
              We&apos;re working on a collection of beautiful templates and
              starter projects that showcase Delta Components in real-world
              applications. Stay tuned!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
