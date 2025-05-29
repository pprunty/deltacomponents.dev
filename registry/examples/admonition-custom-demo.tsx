"use client"

import React from "react"
import { Gift, Heart, Star, Zap } from "lucide-react"

import Admonition from "@/registry/components/admonition"

export default function AdmonitionCustomDemo() {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 p-4">
      <Admonition type="tip" title="Custom Heart Icon" icon={Heart}>
        This admonition uses a custom heart icon instead of the default tip
        icon.
      </Admonition>

      <Admonition type="success" title="Custom Star Icon" icon={Star}>
        This success admonition features a custom star icon.
      </Admonition>

      <Admonition type="warning" title="Custom Lightning Icon" icon={Zap}>
        This warning uses a lightning bolt icon for extra emphasis.
      </Admonition>

      <Admonition type="info" title="Custom Gift Icon" icon={Gift}>
        This info admonition uses a gift icon for a special announcement.
      </Admonition>
    </div>
  )
}
