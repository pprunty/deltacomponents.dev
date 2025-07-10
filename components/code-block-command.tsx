"use client"

import * as React from "react"

import { NpmCommands } from "@/types/unist"
import { useConfig } from "@/hooks/use-config"
import { CodeSnippet } from "@/registry/media/code-snippet"

export function CodeBlockCommand({
  __npmCommand__,
  __yarnCommand__,
  __pnpmCommand__,
  __bunCommand__,
}: React.ComponentProps<"pre"> & NpmCommands) {
  const [config, setConfig] = useConfig()

  const packageManager = config.packageManager
  const tabs = React.useMemo(() => {
    return {
      pnpm: { code: __pnpmCommand__ || "", language: "bash" },
      npm: { code: __npmCommand__ || "", language: "bash" },
      yarn: { code: __yarnCommand__ || "", language: "bash" },
      bun: { code: __bunCommand__ || "", language: "bash" },
    }
  }, [__npmCommand__, __pnpmCommand__, __yarnCommand__, __bunCommand__])

  return (
    <div className="mt-6">
      <CodeSnippet
        code={tabs[packageManager].code}
        language="bash"
        showLineNumbers={false}
        className="max-h-[650px]"
        tabs={tabs}
        activeTab={packageManager}
        onTabChange={(tab) => {
          setConfig({
            ...config,
            packageManager: tab as "pnpm" | "npm" | "yarn" | "bun",
          })
        }}
      />
    </div>
  )
}
