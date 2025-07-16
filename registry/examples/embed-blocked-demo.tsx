"use client"

import React from "react"
import { Embed } from "@/delta/embed"

export default function EmbedBlockedDemo() {
  return (
    <div className="flex flex-col w-full py-8">
      <Embed src="https://google.com" title="Google Homepage" height={400} />
    </div>
  )
}
