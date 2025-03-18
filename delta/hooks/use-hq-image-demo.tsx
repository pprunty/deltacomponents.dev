"use client"

import { useHqImage } from "@/delta/hooks/use-hq-image"
import { useState } from "react"

export default function UseHQImageDemo() {
  const { image, refreshImage } = useHqImage()
  const [loading, setLoading] = useState(true)

  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-semibold">Random High-Quality Image</h2>

      <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border">
        {loading && <div className="absolute inset-0 animate-pulse bg-muted/80"></div>}
        <img
          src={image.url || "/placeholder.svg"}
          alt={image.title}
          className={`w-full h-full object-cover ${loading ? "opacity-0" : "opacity-100 transition-opacity duration-300"}`}
          onLoad={() => setLoading(false)}
        />
      </div>

      <div className="text-center">
        <h3 className="text-lg font-medium text-foreground">{image.title}</h3>
        <p className="text-sm text-muted-foreground">By {image.author}</p>
        <a
          href={image.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline mt-1 inline-block"
        >
          View on Unsplash
        </a>
      </div>

      <button
        onClick={() => {
          setLoading(true)
          refreshImage()
        }}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
      >
        Get New Image
      </button>
    </div>
  )
}

