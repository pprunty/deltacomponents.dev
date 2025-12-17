"use client"

import { Terminal } from "lucide-react"

import { Admonition } from "@/registry/delta-ui/delta/admonition"

export default function AdmonitionCustomIconDemo() {
  return (
    <div className="w-full space-y-6">
      <Admonition type="note" icon={Terminal} title="Terminal Command">
        Run npx shadcn@latest init to get started.
      </Admonition>
    </div>
  )
}
