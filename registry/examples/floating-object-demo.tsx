"use client"

import { Badge } from "@/components/ui/badge"
import { FloatingObject } from "@/delta/floating-object"

export default function FloatingObjectDemo() {
  return (
    <div className="w-full">
      <div className="mx-auto">
        {/* Main floating image showcase */}
        <div className="relative h-96 overflow-hidden">
          <div className="absolute inset-0">
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
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-30 md:h-30 rounded-full border-4 border-primary/20 shadow-lg"
                />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full animate-pulse" />
              </div>
            </FloatingObject>
          </div>
        </div>
      </div>
    </div>
  )
}
