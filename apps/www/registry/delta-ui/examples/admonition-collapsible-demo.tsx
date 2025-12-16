"use client"

import { Admonition } from "@/registry/delta-ui/delta/admonition"

export default function AdmonitionCollapsibleDemo() {
  return (
    <Admonition type="note" title="API Documentation" collapsible>
      <div className="space-y-2">
        <p>This API endpoint accepts the following parameters:</p>
        <ul className="ml-4 list-disc space-y-1">
          <li>
            <strong>userId</strong>: string (required) - The unique identifier
            for the user
          </li>
          <li>
            <strong>includeMetadata</strong>: boolean (optional) - Whether to
            include additional metadata
          </li>
          <li>
            <strong>format</strong>: string (optional) - Response format: json,
            xml, or csv
          </li>
        </ul>
      </div>
    </Admonition>
  )
}
