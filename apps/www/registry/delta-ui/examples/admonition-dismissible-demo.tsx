"use client"

import { Admonition } from "@/registry/delta-ui/delta/admonition"

export default function AdmonitionDismissibleDemo() {
  return (
    <Admonition
      type="info"
      title="Quick Tip"
      dismissible
      dismissKey="quick-tip"
    >
      You can dismiss this message. Try refreshing the page - it will stay
      dismissed!
    </Admonition>
  )
}
