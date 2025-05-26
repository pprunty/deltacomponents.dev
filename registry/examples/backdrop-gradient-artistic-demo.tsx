"use client"

import React from "react"

import BackdropGradient from "@/registry/media/backdrop-gradient"

export default function BackdropGradientArtisticDemo() {
  // Replace with an appropriate image for the demo
  const demoImage = "/images/desk.webp"

  return (
    <div className="min-h-[400px] flex items-center justify-center w-full h-full">
      <div className="w-full max-w-md h-[400px]">
        <BackdropGradient
          src={demoImage}
          alt="Artistic backdrop example"
          className="artistic-style"
        />
      </div>
    </div>
  )
}
