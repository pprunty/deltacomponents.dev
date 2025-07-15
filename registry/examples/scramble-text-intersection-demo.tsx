"use client"

import React from "react"

import ScrambleText from "@/delta/scramble-text"

export default function ScrambleTextIntersectionDemo() {
  return (
    <div className="h-[80vh] flex items-center justify-center">
      <ScrambleText
        text="Scroll to see me scramble every time"
        className="text-2xl font-bold text-center"
        useIntersectionObserver={true}
        retriggerOnIntersection={true}
        speed={120}
      />
    </div>
  )
}
