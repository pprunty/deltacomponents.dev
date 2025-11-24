"use client"

import * as React from "react"

import { XCard } from "@/registry/delta-ui/delta/x-card"

const tweetIds = [
  "1519480761749016577",
  "896523232098078720",
  "1006238175247794176",
  "1942735295432077552",
  "1984647955840975189",
]

export default function XInteractiveDemo() {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [key, setKey] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % tweetIds.length)
      setKey((prevKey) => prevKey + 1) // Force re-render of XCard
    }, 5000) // Change every 5 seconds to allow loading

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex h-full w-full items-center justify-center py-8">
      <XCard key={key} id={tweetIds[currentIndex]} size="medium" />
    </div>
  )
}
