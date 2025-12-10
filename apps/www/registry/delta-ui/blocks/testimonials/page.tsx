"use client"

import { Testimonials } from "@/registry/delta-ui/blocks/testimonials/components/testimonials"

export default function TestimonialsPage() {
  return (
    <div className="bg-background min-h-screen w-full flex items-center justify-center">
      <div className="mx-auto max-w-7xl p-6 w-full">
        <div className="space-y-8">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              What our customers are saying
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg">
              Hear from developers and teams who are building the future with
              our tools.
            </p>
          </div>

          <Testimonials />
        </div>
      </div>
    </div>
  )
}
