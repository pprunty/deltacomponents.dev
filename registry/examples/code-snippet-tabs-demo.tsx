"use client"

import { useState } from "react"
import { CodeSnippet } from "@/delta/code-snippet"

export default function CodeSnippetTabsDemo() {
  const installationTabs = {
    npm: {
      code: "npm install @radix-ui/react-dialog lucide-react",
      language: "bash",
    },
    pnpm: {
      code: "pnpm add @radix-ui/react-dialog lucide-react",
      language: "bash",
    },
    yarn: {
      code: "yarn add @radix-ui/react-dialog lucide-react",
      language: "bash",
    },
    bun: {
      code: "bun add @radix-ui/react-dialog lucide-react",
      language: "bash",
    },
  } as const

  const [activeTab, setActiveTab] =
    useState<keyof typeof installationTabs>("npm")

  return (
    <div className="w-full py-4">
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-3">Package Installation</h3>
          <CodeSnippet
            code={installationTabs[activeTab].code}
            language="bash"
            showLineNumbers={false}
            tabs={installationTabs}
            activeTab={activeTab}
            onTabChange={(tab) =>
              setActiveTab(tab as keyof typeof installationTabs)
            }
          />
        </div>
      </div>
    </div>
  )
}
