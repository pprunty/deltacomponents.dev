import { ScrollFadeEffect } from "@/registry/delta-ui/delta/scroll-fade-effect"

export default function ScrollFadeEffectDemo() {
  return (
    <div className="flex gap-8">
      {/* Vertical scroll example */}
      <div className="flex-1">
        <h3 className="mb-4 text-sm font-medium">Vertical Scroll</h3>
        <div className="rounded-lg border">
          <ScrollFadeEffect className="h-72">
            <div className="space-y-4 p-4">
              {Array.from({ length: 20 }).map((_, i) => (
                <p key={i} className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              ))}
            </div>
          </ScrollFadeEffect>
        </div>
      </div>

      {/* Horizontal scroll example */}
      <div className="flex-1">
        <h3 className="mb-4 text-sm font-medium">Horizontal Scroll</h3>
        <div className="rounded-lg border">
          <ScrollFadeEffect orientation="horizontal" className="w-full">
            <div className="flex gap-4 p-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-muted flex h-32 w-32 flex-shrink-0 items-center justify-center rounded-lg"
                >
                  <span className="text-sm font-medium">Item {i + 1}</span>
                </div>
              ))}
            </div>
          </ScrollFadeEffect>
        </div>
      </div>
    </div>
  )
}
