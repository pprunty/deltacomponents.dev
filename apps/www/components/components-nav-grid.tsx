import Link from "next/link"
import { cn } from "@/lib/utils"

export function ComponentsNavGrid() {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      <Link
        href="/docs/components"
        className={cn(
          "bg-surface text-surface-foreground hover:bg-surface/80 flex w-full flex-col items-start rounded-xl transition-colors p-4 sm:p-4 text-sm"
        )}
      >
        <div className="font-medium">UI Components</div>
        <div className="text-muted-foreground">
          <span className="leading-relaxed">
            Basic UI components like buttons, inputs, and cards
          </span>
        </div>
      </Link>
      <Link
        href="/docs/components/voice-button"
        className={cn(
          "bg-surface text-surface-foreground hover:bg-surface/80 flex w-full flex-col items-start rounded-xl transition-colors p-4 sm:p-4 text-sm"
        )}
      >
        <div className="font-medium">Voice Components</div>
        <div className="text-muted-foreground">
          <span className="leading-relaxed">
            Voice interaction components for audio interfaces
          </span>
        </div>
      </Link>
      <Link
        href="/docs/components/audio-player"
        className={cn(
          "bg-surface text-surface-foreground hover:bg-surface/80 flex w-full flex-col items-start rounded-xl transition-colors p-4 sm:p-4 text-sm"
        )}
      >
        <div className="font-medium">Audio Components</div>
        <div className="text-muted-foreground">
          <span className="leading-relaxed">
            Audio playback and visualization components
          </span>
        </div>
      </Link>
      <Link
        href="/blocks"
        className={cn(
          "bg-surface text-surface-foreground hover:bg-surface/80 flex w-full flex-col items-start rounded-xl transition-colors p-4 text-sm"
        )}
      >
        <div className="font-medium">Blocks</div>
        <div className="text-muted-foreground">
          <span className="leading-relaxed">
            Pre-built page sections and complete layouts
          </span>
        </div>
      </Link>
    </div>
  )
}