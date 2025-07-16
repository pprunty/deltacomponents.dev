"use client"

import * as React from "react"
import ScrollProgress from "@/delta/scroll-progress"

// Demo Component
export default function ScrollProgressDemo() {
  return (
    <div className="overflow-y-auto ">
      <ScrollProgress />
      You can see the scroll progress bar at the bottom of the page.
    </div>
  )
}
