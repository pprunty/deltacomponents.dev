"use client"

import { Badge } from "@/components/ui/badge"
import { FloatingObject } from "@/registry/animations/floating-object"

export default function FloatingObjectDemo() {
  return (
    <div className="w-full bg-background p-8">
      <div className="mx-auto">
        {/* Main floating image showcase */}
        <div className="relative h-96 bg-card border border-border rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-muted/20">
            <FloatingObject
              pattern="random-directions"
              intensity="medium"
              speed="slow"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <div className="relative">
                <img
                  src="/images/pp.png"
                  alt="Floating demonstration image"
                  className="w-30 h-30 rounded-full border-4 border-primary/20 shadow-lg bg-card"
                />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full animate-pulse" />
              </div>
            </FloatingObject>
          </div>

          {/* Compass directions overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-muted-foreground text-sm">
              N
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-muted-foreground text-sm">
              E
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-muted-foreground text-sm">
              S
            </div>
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-muted-foreground text-sm">
              W
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
