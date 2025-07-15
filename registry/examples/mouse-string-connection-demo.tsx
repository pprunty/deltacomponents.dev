"use client"

import { Button } from "@/components/ui/button"
import MouseStringConnection from "@/delta/mouse-string-connection"

export default function MouseStringConnectionDemo() {
  return (
    <div className="bg-background text-foreground flex flex-col items-center justify-center px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-5xl font-medium mb-4">Something you really want</h1>
        <p className="text-muted-foreground text-lg mb-12">
          {"You can't live without this product. I'm sure of it."}
        </p>

        <div className="flex justify-center">
          <MouseStringConnection
            strokeWidth={1}
            dashArray={[10, 4]}
            curveIntensity={0.5}
          >
            <Button size="lg">Get Started</Button>
          </MouseStringConnection>
        </div>
      </div>
    </div>
  )
}
