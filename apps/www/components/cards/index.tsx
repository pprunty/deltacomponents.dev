import AdmonitionDemoInteractive from "@/registry/delta-ui/examples/admonition-demo-interactive"
import CambioImageIconsExpandDemo from "@/registry/delta-ui/examples/cambio-image-icons-expand-demo"
import CardDeckDemoInteractive from "@/registry/delta-ui/examples/card-deck-demo-interactive"
import ChatDemo from "@/registry/delta-ui/examples/chat-demo"
import CodeBlockInteractiveDemo from "@/registry/delta-ui/examples/code-block-interactive-demo"
import MapboxPointerDemo from "@/registry/delta-ui/examples/mapbox-pointer-demo"
import { MarqueeDemo } from "@/registry/delta-ui/examples/marquee-demo"
import InputOTPPill from "@/registry/delta-ui/examples/input-otp-pill-demo"
import { ProductCardDemo } from "@/registry/delta-ui/examples/product-card-demo"
import QrcodeDemoInteractive from "@/registry/delta-ui/examples/qrcode-demo-interactive"
import { ScrollFadeEffectDemo } from "@/registry/delta-ui/examples/scroll-fade-effect-demo"
import { TabsBackgroundDemo } from "@/registry/delta-ui/examples/tabs-background-demo"
import XCardBasicDemo from "@/registry/delta-ui/examples/x-card-basic-demo"

export function CardsDemo() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="flex min-h-[200px] items-center justify-center rounded-lg border p-4">
        <AdmonitionDemoInteractive />
      </div>

      <div className="flex min-h-[200px] items-center justify-center rounded-lg border p-4 sm:col-span-2">
        <CardDeckDemoInteractive />
      </div>

      <div className="flex min-h-[200px] items-center justify-center rounded-lg border p-4">
        <MapboxPointerDemo />
      </div>

      <div className="flex min-h-[200px] items-center justify-center rounded-lg border p-4">
        <QrcodeDemoInteractive />
      </div>

      <div className="flex min-h-[200px] items-center justify-center rounded-lg border p-4">
        <ProductCardDemo />
      </div>

      <div className="flex min-h-[200px] items-center justify-center rounded-lg border p-4">
        <InputOTPPill />
      </div>

      <div className="flex min-h-[200px] items-center justify-center rounded-lg border p-4">
        <TabsBackgroundDemo />
      </div>

      <div className="flex min-h-[200px] items-center justify-center rounded-lg border p-4">
        <XCardBasicDemo />
      </div>

      <div className="flex min-h-[200px] items-center justify-center rounded-lg border p-4 sm:col-span-2">
        <CodeBlockInteractiveDemo />
      </div>

      <div className="flex min-h-[200px] items-center justify-center rounded-lg border p-4">
        <ChatDemo />
      </div>

      <div className="flex min-h-[200px] items-center justify-center rounded-lg border p-4">
        <CambioImageIconsExpandDemo />
      </div>

      <div className="flex min-h-[200px] items-center justify-center rounded-lg border p-4">
        <MarqueeDemo />
      </div>

      <div className="flex min-h-[200px] items-center justify-center rounded-lg border p-4">
        <ScrollFadeEffectDemo />
      </div>
    </div>
  )
}
