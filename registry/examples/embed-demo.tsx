"use client"

import * as React from "react"

import { Embed } from "@/delta/embed"

export default function EmbedDemo() {
  return (
    <div className="flex flex-col w-full py-8">
      <Embed
        src="https://patrickprunty.com"
        title="Patrick Prunty - Personal Website"
        height={600}
        allowFullScreen={true}
      />
    </div>
  )
}
