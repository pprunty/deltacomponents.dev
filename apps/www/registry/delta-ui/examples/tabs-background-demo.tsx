"use client"

import * as React from "react"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/delta-ui/delta/tabs"

export default function TabsBackgroundDemo() {
  const [activeTab, setActiveTab] = React.useState("account")

  return (
    <div className="flex w-full max-w-lg flex-col gap-8">
      <div className="space-y-2">
        <Tabs value={activeTab} onValueChange={setActiveTab} variant="default">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <div className="relative min-h-[80px]">
            <TabsContent
              value="account"
              className="bg-card absolute inset-x-0 top-0 rounded-lg border p-4"
            >
              <p className="text-muted-foreground text-sm">
                Make changes to your account here.
              </p>
            </TabsContent>

            <TabsContent
              value="password"
              className="bg-card absolute inset-x-0 top-0 rounded-lg border p-4"
            >
              <p className="text-muted-foreground text-sm">
                Change your password here.
              </p>
            </TabsContent>

            <TabsContent
              value="settings"
              className="bg-card absolute inset-x-0 top-0 rounded-lg border p-4"
            >
              <p className="text-muted-foreground text-sm">
                Manage your preferences.
              </p>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/*

      <div className="space-y-4">
        <p className="text-muted-foreground text-xs">Size variants</p>

        <div>
          <p className="text-muted-foreground mb-2 text-xs">Small (sm)</p>
          <Tabs defaultValue="tab1" size="sm">
            <TabsList>
              <TabsTrigger value="tab1">First</TabsTrigger>
              <TabsTrigger value="tab2">Second</TabsTrigger>
              <TabsTrigger value="tab3">Third</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div>
          <p className="text-muted-foreground mb-2 text-xs">Default</p>
          <Tabs defaultValue="tab1" size="default">
            <TabsList>
              <TabsTrigger value="tab1">First</TabsTrigger>
              <TabsTrigger value="tab2">Second</TabsTrigger>
              <TabsTrigger value="tab3">Third</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div>
          <p className="text-muted-foreground mb-2 text-xs">Large (lg)</p>
          <Tabs defaultValue="tab1" size="lg">
            <TabsList>
              <TabsTrigger value="tab1">First</TabsTrigger>
              <TabsTrigger value="tab2">Second</TabsTrigger>
              <TabsTrigger value="tab3">Third</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    */}
    </div>
  )
}
