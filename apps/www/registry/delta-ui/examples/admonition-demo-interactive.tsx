"use client"

import { useEffect, useState } from "react"

import { Admonition } from "@/registry/delta-ui/delta/admonition"

const admonitionTypes = [
  {
    type: "note",
    title: "Note",
    content:
      "This is a note admonition. Use it to provide additional information that users should be aware of.",
  },
  {
    type: "tip",
    title: "Pro Tip",
    content:
      "This is a tip admonition. Perfect for sharing helpful advice or best practices.",
  },
  {
    type: "info",
    title: "Information",
    content:
      "This is an info admonition. Great for providing contextual information.",
  },
  {
    type: "warning",
    title: "Warning",
    content:
      "This is a warning admonition. Use it to alert users about potential issues or important considerations.",
  },
  {
    type: "danger",
    title: "Danger",
    content:
      "This is a danger admonition. Use it for critical warnings that users must pay attention to.",
  },
  {
    type: "success",
    title: "Success",
    content:
      "This is a success admonition. Great for confirming successful actions or positive outcomes.",
  },
  {
    type: "caution",
    title: "Caution",
    content:
      "This is a caution admonition. Use it for important warnings that require user attention.",
  },
]

export default function AdmonitionDemoInteractive() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % admonitionTypes.length)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const currentAdmonition = admonitionTypes[currentIndex]

  return (
    <div className="max-w-md">
      <Admonition
        type={currentAdmonition.type as any}
        title={currentAdmonition.title}
      >
        {currentAdmonition.content}
      </Admonition>
    </div>
  )
}
