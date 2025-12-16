"use client"

import { Admonition } from "@/registry/delta-ui/delta/admonition"

export default function AdmonitionDismissibleDemo() {
  return (
    <Admonition 
  type="info" 
  title="New Feature" 
  dismissible 
  dismissKey="new-dashboard-feature-v1"
>
  We have updated the dashboard layout!
</Admonition>
  )
}
