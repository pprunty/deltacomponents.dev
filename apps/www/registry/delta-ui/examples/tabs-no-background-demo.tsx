"use client"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/delta-ui/ui/tabs"

export default function TabsNoBackgroundDemo() {
  return (
    <Tabs defaultValue="account" variant="default">
      {/* Override container to have no background */}
      <TabsList className="gap-1 bg-transparent p-0">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
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
