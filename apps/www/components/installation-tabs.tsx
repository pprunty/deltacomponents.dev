"use client"

import * as React from "react"
import { TerminalIcon } from "lucide-react"

import { useConfig } from "@/hooks/use-config"
import { Step, Steps } from "@/components/steps"
import {
  Tabs as DeltaTabs,
  TabsContent as DeltaTabsContent,
  TabsList as DeltaTabsList,
  TabsTrigger as DeltaTabsTrigger,
} from "@/registry/delta-ui/delta/tabs"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/delta-ui/ui/tabs"

interface InstallationTabsProps {
  name: string
  dependencies?: string[]
  componentSourceElement: React.ReactNode
}

export function InstallationTabs({
  name,
  dependencies,
  componentSourceElement,
}: InstallationTabsProps) {
  const [tab, setTab] = React.useState("cli")
  const [config, setConfig] = useConfig()
  const packageManager = config.packageManager || "pnpm"

  return (
    <div className="group relative mt-4 mb-12 flex flex-col gap-2">
      <DeltaTabs
        defaultValue="cli"
        value={tab}
        onValueChange={setTab}
        className="w-full"
        variant="underline"
        size="lg"
      >
        <DeltaTabsList className="mb-4 w-full">
          <DeltaTabsTrigger value="cli" className="font-medium">
            CLI
          </DeltaTabsTrigger>
          <DeltaTabsTrigger value="manual" className="font-medium">
            Manual
          </DeltaTabsTrigger>
        </DeltaTabsList>

        <DeltaTabsContent value="cli" className="relative">
          <figure
            data-rehype-pretty-code-figure=""
            className="[&>pre]:max-h-96"
          >
            <Tabs
              value={packageManager}
              className="gap-0"
              onValueChange={(value) => {
                setConfig({
                  ...config,
                  packageManager: value as "pnpm" | "npm" | "yarn" | "bun",
                })
              }}
            >
              <div className="border-border/50 flex items-center gap-2 border-b px-3 py-1">
                <div className="bg-foreground flex size-4 items-center justify-center rounded-[1px] opacity-70">
                  <TerminalIcon className="text-code size-3" />
                </div>
                <TabsList className="rounded-none bg-transparent p-0">
                  {["pnpm", "npm", "yarn", "bun"].map((pm) => (
                    <TabsTrigger
                      key={pm}
                      value={pm}
                      className="data-[state=active]:border-primary h-7 rounded-none border-0 pt-0.5 data-[state=active]:border-b-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                    >
                      {pm}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              <div className="no-scrollbar overflow-x-auto">
                {["pnpm", "npm", "yarn", "bun"].map((pm) => (
                  <TabsContent key={pm} value={pm}>
                    <pre className="no-scrollbar min-w-0 overflow-x-auto px-4 py-3 outline-none">
                      <code>{`${pm} dlx shadcn@latest add https://deltacomponents.dev/r/${name}.json`}</code>
                    </pre>
                  </TabsContent>
                ))}
              </div>
            </Tabs>
          </figure>
        </DeltaTabsContent>

        <DeltaTabsContent value="manual" className="relative">
          <Steps>
            {dependencies && dependencies.length > 0 && (
              <>
                <Step>Install the following dependencies:</Step>
                <figure
                  data-rehype-pretty-code-figure=""
                  className="mb-6 [&>pre]:max-h-96"
                >
                  <Tabs
                    value={packageManager}
                    className="gap-0"
                    onValueChange={(value) => {
                      setConfig({
                        ...config,
                        packageManager: value as
                          | "pnpm"
                          | "npm"
                          | "yarn"
                          | "bun",
                      })
                    }}
                  >
                    <div className="border-border/50 flex items-center gap-2 border-b px-3 py-1">
                      <div className="bg-foreground flex size-4 items-center justify-center rounded-[1px] opacity-70">
                        <TerminalIcon className="text-code size-3" />
                      </div>
                      <TabsList className="rounded-none bg-transparent p-0">
                        {["pnpm", "npm", "yarn", "bun"].map((pm) => (
                          <TabsTrigger
                            key={pm}
                            value={pm}
                            className="data-[state=active]:border-primary h-7 rounded-none border-0 pt-0.5 data-[state=active]:border-b-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                          >
                            {pm}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </div>
                    <div className="no-scrollbar overflow-x-auto">
                      {["pnpm", "npm", "yarn", "bun"].map((pm) => (
                        <TabsContent key={pm} value={pm}>
                          <pre className="no-scrollbar min-w-0 overflow-x-auto px-4 py-3.5 outline-none">
                            <code>{`${pm} install ${dependencies.join(" ")}`}</code>
                          </pre>
                        </TabsContent>
                      ))}
                    </div>
                  </Tabs>
                </figure>
              </>
            )}

            <Step>Copy and paste the following code into your project.</Step>

            <div className="mb-6">{componentSourceElement}</div>

            <Step>Update the import paths to match your project setup.</Step>
          </Steps>
        </DeltaTabsContent>
      </DeltaTabs>
    </div>
  )
}
