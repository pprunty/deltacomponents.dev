import { Admonition } from "@/delta/components/admonition"
import { Info, LightbulbFilament, Warning, X } from '@phosphor-icons/react/dist/ssr'

export default function AdmonitionDemo() {
  return (
    <div className="space-y-8">
      {/* Basic Variants */}
      <div className="space-y-4">
        <Admonition type="info">
          This is an informational message that provides additional context or details.
        </Admonition>
        <Admonition type="tip">
          This is a tip message to help guide users with best practices and suggestions.
        </Admonition>
        <Admonition type="warning">
          This is a warning message that alerts users to potential issues or important considerations.
        </Admonition>
        <Admonition type="danger">
          This is a danger message indicating that something went wrong or needs immediate attention.
        </Admonition>
      </div>

      {/* With Titles */}
      <div className="space-y-4">
        <Admonition type="info" title="Did you know?">
          You can add titles to your admonitions to provide additional context and make them more informative.
        </Admonition>
        <Admonition type="tip" title="Pro Tip!">
          Your changes have been saved successfully. The system is now up to date.
        </Admonition>
        <Admonition type="warning" title="Important Notice">
          Please review these changes carefully before proceeding with the next steps.
        </Admonition>
        <Admonition type="danger" title="Action Required">
          We encountered an issue processing your request. Please try again or contact support.
        </Admonition>
      </div>

      {/* With Note Type */}
      <div className="space-y-4">
        <Admonition type="note" title="Documentation Note">
          The note type is perfect for documentation and additional information that doesn't fit the other categories.
        </Admonition>
        <Admonition type="note">
          Notes can also be used without titles for simpler messages and annotations.
        </Admonition>
      </div>
    </div>
  )
}
