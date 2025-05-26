"use client"

import * as React from "react"

import Admonition from "@/registry/components/admonition"

export default function AdmonitionDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Admonition type="note" title="Note">
        This is a note admonition with some important information that users
        should be aware of
      </Admonition>
    </div>
  )
}
