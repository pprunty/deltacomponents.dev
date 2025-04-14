"use client"

import { Admonition } from "@/delta/components/admonition"

export default function AdmonitionSolidDemo() {
  return (
    <div className="space-y-4">
      <Admonition type="note" solid>
        This is a note with a solid background. Use it for general information that doesn't fit other categories.
      </Admonition>

      <Admonition type="tip" solid>
        This is a tip with a solid background. Great for sharing helpful suggestions and best practices.
      </Admonition>

      <Admonition type="info" solid>
        This is an info message with a solid background. Perfect for providing additional context or details.
      </Admonition>

      <Admonition type="warning" solid>
        This is a warning with a solid background. Use it to alert users about potential issues or important considerations.
      </Admonition>

      <Admonition type="danger" solid>
        This is a danger message with a solid background. Ideal for critical issues that require immediate attention.
      </Admonition>
    </div>
  )
}
