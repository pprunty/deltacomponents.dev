import AdmonitionDemoInteractive from "@/registry/delta-ui/examples/admonition-demo-interactive"
import CardDeckDemoInteractive from "@/registry/delta-ui/examples/card-deck-demo-interactive"
import OrbDemo from "@/registry/delta-ui/examples/orb-demo"
import WaveformDemo from "@/registry/delta-ui/examples/waveform-demo"

export function CardsDemo() {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div className="rounded-lg border p-4 flex items-center justify-center min-h-[200px]">
        <AdmonitionDemoInteractive />
      </div>
      
      <div className="rounded-lg border p-4 flex items-center justify-center min-h-[200px] sm:col-span-2">
        <CardDeckDemoInteractive />
      </div>
      
      <div className="rounded-lg border p-4 flex items-center justify-center min-h-[200px]">
        <OrbDemo small />
      </div>
      
      <div className="rounded-lg border p-4 flex items-center justify-center min-h-[200px]">
        <WaveformDemo />
      </div>
    </div>
  )
}
