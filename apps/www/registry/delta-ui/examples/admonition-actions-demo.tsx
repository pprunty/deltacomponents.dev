"use client"

import { toast } from "sonner"

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
          onClick: () =>
            toast.success("Update started", {
              description: "Your application is being updated...",
            }),
        },
        {
          label: "Learn More",
          variant: "secondary",
          onClick: () =>
            toast.info("Documentation", {
              description: "Opening security update documentation...",
            }),
        },
      ]}
    >
      A critical security update is available. We recommend updating as soon as
      possible.
    </Admonition>
  )
}
