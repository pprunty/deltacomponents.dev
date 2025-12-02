"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/delta-ui/ui/tabs"
import { CopyButton } from "./copy-button"

interface CodeBlockCommandProps {
  __npm__: string
  __yarn__: string
  __pnpm__: string
  __bun__: string
}

export function CodeBlockCommand({
  __npm__,
  __yarn__,
  __pnpm__,
  __bun__,
}: CodeBlockCommandProps) {
  const [activeTab, setActiveTab] = useState("bun") // Default to bun since this project uses bun

  const commands = {
    npm: __npm__,
    yarn: __yarn__,
    pnpm: __pnpm__,
    bun: __bun__,
  }

  return (
    <div className="relative border border-border rounded-lg overflow-hidden w-full max-w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between px-4 py-2 bg-muted/40 border-b border-border">
          <TabsList className="h-8 bg-background/50">
            <TabsTrigger value="bun" className="text-sm font-medium">
              bun
            </TabsTrigger>
            <TabsTrigger value="npm" className="text-sm font-medium">
              npm
            </TabsTrigger>
            <TabsTrigger value="yarn" className="text-sm font-medium">
              yarn
            </TabsTrigger>
            <TabsTrigger value="pnpm" className="text-sm font-medium">
              pnpm
            </TabsTrigger>
          </TabsList>
          <CopyButton value={commands[activeTab as keyof typeof commands]} className="relative right-0 top-0 text-muted-foreground hover:text-foreground" />
        </div>
        {Object.entries(commands).map(([key, command]) => (
          <TabsContent key={key} value={key} className="mt-0">
            <pre className="overflow-x-auto p-4 bg-card text-card-foreground border-0 rounded-none min-w-0 w-full max-w-full">
              <code className="font-mono text-sm">{command}</code>
            </pre>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

CodeBlockCommand.displayName = "CodeBlockCommand"