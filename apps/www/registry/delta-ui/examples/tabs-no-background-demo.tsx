"use client"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/delta-ui/delta/tabs"

export function TabsNoBackgroundDemo() {
  return (
    <Tabs defaultValue="account" variant="ghost">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <div className="relative min-h-[60px]">
        <TabsContent value="account" className="absolute inset-x-0 top-0">
          <p className="text-muted-foreground text-sm">
            Manage your account settings.
          </p>
        </TabsContent>
        <TabsContent value="password" className="absolute inset-x-0 top-0">
          <p className="text-muted-foreground text-sm">
            Change your password here.
          </p>
        </TabsContent>
        <TabsContent value="settings" className="absolute inset-x-0 top-0">
          <p className="text-muted-foreground text-sm">
            Configure your preferences.
          </p>
        </TabsContent>
      </div>
    </Tabs>
  )
}
