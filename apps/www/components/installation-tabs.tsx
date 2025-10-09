"use client"

import * as React from "react"
import { TerminalIcon } from "lucide-react"

import { useConfig } from "@/hooks/use-config"
import {
  Tabs as PackageManagerTabs,
  TabsContent as PackageManagerTabsContent,
  TabsList as PackageManagerTabsList,
  TabsTrigger as PackageManagerTabsTrigger,
} from "@/components/ui/tabs"
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
    <Tabs
      defaultValue="cli"
      value={tab}
      onValueChange={setTab}
      className="w-full py-4"
    >
      <TabsList
        variant="underlined"
        showBottomBorder
        showActiveIndicator
        className="mb-4 w-full"
        size="md"
      >
        <TabsTrigger value="cli" className="font-medium">
          CLI
        </TabsTrigger>
        <TabsTrigger value="manual" className="font-medium">
          Manual
        </TabsTrigger>
      </TabsList>

      <TabsContent value="cli" className="relative">
        <figure data-rehype-pretty-code-figure="" className="[&>pre]:max-h-96">
          <PackageManagerTabs
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
              <PackageManagerTabsList className="rounded-none bg-transparent p-0">
                {["pnpm", "npm", "yarn", "bun"].map((pm) => (
                  <PackageManagerTabsTrigger
                    key={pm}
                    value={pm}
                    className="data-[state=active]:bg-accent data-[state=active]:border-input h-7 border border-transparent pt-0.5 data-[state=active]:shadow-none"
                  >
                    {pm}
                  </PackageManagerTabsTrigger>
                ))}
              </PackageManagerTabsList>
            </div>
            <div className="no-scrollbar overflow-x-auto">
              {["pnpm", "npm", "yarn", "bun"].map((pm) => (
                <PackageManagerTabsContent key={pm} value={pm}>
                  <pre className="no-scrollbar min-w-0 overflow-x-auto px-4 outline-none">
                    <code>{`${pm} dlx @delta/agents-cli@latest components add ${name}`}</code>
                  </pre>
                </PackageManagerTabsContent>
              ))}
            </div>
          </PackageManagerTabs>
        </figure>
      </TabsContent>

      <TabsContent value="manual" className="relative">
        <div className="[&>h3]:step steps mb-12 [counter-reset:step] *:[h3]:first:!mt-0">
          {dependencies && dependencies.length > 0 && (
            <>
              <h3 className="font-heading mt-4 scroll-m-32 text-xl font-medium tracking-tight">
                1. Install the following dependencies:
              </h3>
              <figure
                data-rehype-pretty-code-figure=""
                className="[&>pre]:max-h-96"
              >
                <PackageManagerTabs
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
                    <PackageManagerTabsList className="rounded-none bg-transparent p-0">
                      {["pnpm", "npm", "yarn", "bun"].map((pm) => (
                        <PackageManagerTabsTrigger
                          key={pm}
                          value={pm}
                          className="data-[state=active]:bg-accent data-[state=active]:border-input h-7 border border-transparent pt-0.5 data-[state=active]:shadow-none"
                        >
                          {pm}
                        </PackageManagerTabsTrigger>
                      ))}
                    </PackageManagerTabsList>
                  </div>
                  <div className="no-scrollbar overflow-x-auto">
                    {["pnpm", "npm", "yarn", "bun"].map((pm) => (
                      <PackageManagerTabsContent key={pm} value={pm}>
                        <pre className="no-scrollbar min-w-0 overflow-x-auto px-4 py-3.5 outline-none">
                          <code>{`${pm} install ${dependencies.join(" ")}`}</code>
                        </pre>
                      </PackageManagerTabsContent>
                    ))}
                  </div>
                </PackageManagerTabs>
              </figure>
            </>
          )}

          <h3 className="font-heading mt-4 scroll-m-32 text-xl font-medium tracking-tight">
            {dependencies && dependencies.length > 0 ? "2" : "1"}. Copy and
            paste the following code into your project.
          </h3>

          {componentSourceElement}

          <h3 className="font-heading mt-4 scroll-m-32 text-xl font-medium tracking-tight">
            {dependencies && dependencies.length > 0 ? "3" : "2"}. Update the
            import paths to match your project setup.
          </h3>
        </div>
      </TabsContent>
    </Tabs>
  )
}
