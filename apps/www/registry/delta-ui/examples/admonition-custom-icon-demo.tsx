"use client"

import { Rocket } from "lucide-react"

import { Admonition } from "@/registry/delta-ui/delta/admonition"

export default function AdmonitionCustomIconDemo() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Admonition type="info" title="Rocket Launch" icon={Rocket}>
        This is a note admonition with a custom Rocket icon. Try selecting the
        text to see the matching highlight color!
      </Admonition>
    </div>
  )
}
