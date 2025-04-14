import { Admonition } from "@/delta/components/admonition"

export default function AdmonitionBasicDemo() {
  return (
    <div className="space-y-4">
      <Admonition type="info">
        This is an informational message that provides additional context or details.
      </Admonition>
      <Admonition type="note">
        Here's an important note about this feature.
      </Admonition>
    </div>
  )
}