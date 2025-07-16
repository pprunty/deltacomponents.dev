"use client"

import React from "react"
import Admonition from "@/delta/admonition"

export default function AdmonitionTypesDemo() {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 p-4">
      <Admonition type="note" title="Note">
        This is a note admonition for general information.
      </Admonition>

      <Admonition type="info" title="Info">
        This is an info admonition for informational content.
      </Admonition>

      <Admonition type="tip" title="Tip">
        This is a tip admonition for helpful suggestions.
      </Admonition>

      <Admonition type="success" title="Success">
        This is a success admonition for positive outcomes.
      </Admonition>

      <Admonition type="warning" title="Warning">
        This is a warning admonition for cautionary information.
      </Admonition>

      <Admonition type="caution" title="Caution">
        This is a caution admonition for important warnings.
      </Admonition>

      <Admonition type="danger" title="Danger">
        This is a danger admonition for critical alerts.
      </Admonition>
    </div>
  )
}
