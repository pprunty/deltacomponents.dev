"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/registry/delta-ui/delta/tabs"

export function TabsDemo() {
  return (
    <Tabs defaultValue="account" variant="underline">
      < TabsList >
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList >
      <div className="relative min-h-[60px]">
        <TabsContent value="account" className="absolute inset-x-0 top-0">
          <p className="text-sm text-muted-foreground">Manage your account settings.</p>
        </TabsContent>
        <TabsContent value="password" className="absolute inset-x-0 top-0">
          <p className="text-sm text-muted-foreground">Change your password here.</p>
        </TabsContent>
        <TabsContent value="settings" className="absolute inset-x-0 top-0">
          <p className="text-sm text-muted-foreground">Configure your preferences.</p>
        </TabsContent>
      </div>
    </Tabs >
  )
}
