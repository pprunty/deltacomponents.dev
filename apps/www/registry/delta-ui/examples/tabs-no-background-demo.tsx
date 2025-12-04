"use client"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/delta-ui/delta/tabs"

export function TabsNoBackgroundDemo() {
  return (
    <Tabs defaultValue="account" variant="default" size="lg">
      {/* Override container to have no background */}
      <TabsList className="gap-1 bg-transparent p-0">
        {/* Override active tab to use bg-muted instead of bg-background */}
        <TabsTrigger
          value="account"
          className="data-[state=active]:[&>div]:bg-muted"
        >
          Account
        </TabsTrigger>
        <TabsTrigger
          value="password"
          className="data-[state=active]:[&>div]:bg-muted"
        >
          Password
        </TabsTrigger>
        <TabsTrigger
          value="settings"
          className="data-[state=active]:[&>div]:bg-muted"
        >
          Settings
        </TabsTrigger>
      </TabsList>
      <div className="relative min-h-[80px]">
        <TabsContent value="account" className="absolute inset-x-0 top-0">
          <p className="text-muted-foreground text-sm">
            Manage your account settings and preferences.
          </p>
        </TabsContent>
        <TabsContent value="password" className="absolute inset-x-0 top-0">
          <p className="text-muted-foreground text-sm">
            Change your password here.
          </p>
        </TabsContent>
        <TabsContent value="settings" className="absolute inset-x-0 top-0">
          <p className="text-muted-foreground text-sm">
            Configure your application settings.
          </p>
        </TabsContent>
      </div>
    </Tabs>
  )
}
