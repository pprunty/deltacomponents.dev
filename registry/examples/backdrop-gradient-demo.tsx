import React from "react"
import BlurOverlay from "@/delta/backdrop-gradient"

export default function BackdropGradientDemo() {
  const sampleImage = "/images/desk.webp" // replace with your image path or URL

  return (
    <div className="min-h-screen flex items-center justify-center w-full h-full">
      <div className="w-full max-w-md h-[600px]">
        <BlurOverlay src={sampleImage} alt="Sample landscape" />
      </div>
    </div>
  )
}
