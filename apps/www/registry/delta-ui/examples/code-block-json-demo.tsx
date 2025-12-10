"use client"

import * as React from "react"
import { CodeBlock } from "@/registry/delta-ui/delta/code-block"
import { Button } from "@/registry/delta-ui/ui/button"

const jsonData = `{
  "user": {
    "id": "usr_2nQz7kX9pLm4",
    "email": "sarah.chen@acme.com",
    "name": "Sarah Chen",
    "role": "senior_engineer",
    "permissions": ["read", "write", "deploy"],
    "metadata": {
      "department": "platform",
      "team": "infrastructure",
      "timezone": "America/Los_Angeles"
    }
  },
  "session": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresAt": "2024-12-31T23:59:59Z",
    "refreshToken": "rt_9xKmP3vN8qL2",
    "scopes": ["api:read", "api:write", "admin:users"]
  },
  "preferences": {
    "theme": "dark",
    "notifications": {
      "email": true,
      "slack": true,
      "digest": "daily"
    },
    "editor": {
      "tabSize": 2,
      "formatOnSave": true
    }
  }
}`

export default function CodeBlockJsonDemo() {
  const [showScrollbar, setShowScrollbar] = React.useState(true)

  return (
    <div className="w-full max-w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-sm">
          Scrollbar: {showScrollbar ? "Visible" : "Hidden"}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowScrollbar(!showScrollbar)}
        >
          Toggle Scrollbar
        </Button>
      </div>
      <CodeBlock
        code={jsonData}
        language="json"
        filename="user-session.json"
        showLineNumbers={true}
        scrollbar={showScrollbar}
      />
    </div>
  )
}
