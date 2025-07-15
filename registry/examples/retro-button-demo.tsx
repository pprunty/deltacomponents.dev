"use client"

import React, { useState } from "react"
import { Settings } from "lucide-react"

import RetroButton from "@/delta/retro-button"

// Demo component to showcase all variants and features
export default function RetroButtonDemo() {
  const [clickCount, setClickCount] = useState(0)

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-80">
      <RetroButton size="md" icon={Settings} />
    </div>
  )
}
