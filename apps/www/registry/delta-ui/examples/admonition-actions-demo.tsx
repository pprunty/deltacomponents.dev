"use client"

import { Admonition } from "@/registry/delta-ui/delta/admonition"

export default function AdmonitionActionsDemo() {
  return (
    <Admonition
      type="warning"
      title="Update Required"
      actions={[
        {
          label: "Update Now",
          variant: "primary",
          onClick: () => alert("Starting update..."),
        },
        {
          label: "Learn More",
          variant: "secondary",
          onClick: () => alert("Opening documentation..."),
        },
      ]}
    >
      A critical security update is available. We recommend updating as soon as
      possible.
    </Admonition>
  )
}
