"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/registry/delta-ui/delta/tabs"

export function TabsEntranceVariantDemo() {
  return (
    <div className="space-y-8">
      {/* Default animation (opacity only) */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Default (opacity only)</p>
        <Tabs defaultValue="account" variant="underline">
          <TabsList className="w-fit">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <div className="relative min-h-[80px]">
            <TabsContent value="account" className="absolute inset-x-0 top-0">
              <p className="text-sm text-muted-foreground">Manage your account settings and preferences.</p>
            </TabsContent>
            <TabsContent value="password" className="absolute inset-x-0 top-0">
              <p className="text-sm text-muted-foreground">Change your password here.</p>
            </TabsContent>
            <TabsContent value="settings" className="absolute inset-x-0 top-0">
              <p className="text-sm text-muted-foreground">Configure your application settings.</p>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Y transform animation override */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">With Y transform (animateY=8)</p>
        <Tabs defaultValue="account" variant="underline">
          <TabsList className="w-fit">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <div className="relative min-h-[80px]">
            <TabsContent value="account" className="absolute inset-x-0 top-0" animateY={8}>
              <p className="text-sm text-muted-foreground">Manage your account settings and preferences.</p>
            </TabsContent>
            <TabsContent value="password" className="absolute inset-x-0 top-0" animateY={8}>
              <p className="text-sm text-muted-foreground">Change your password here.</p>
            </TabsContent>
            <TabsContent value="settings" className="absolute inset-x-0 top-0" animateY={8}>
              <p className="text-sm text-muted-foreground">Configure your application settings.</p>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Slower animation with Y transform */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Slower animation (animateY=12, duration=0.4)</p>
        <Tabs defaultValue="account" variant="underline">
          <TabsList className="w-fit">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <div className="relative min-h-[80px]">
            <TabsContent
              value="account"
              className="absolute inset-x-0 top-0"
              animateY={12}
              animationDuration={0.4}
            >
              <p className="text-sm text-muted-foreground">Manage your account settings and preferences.</p>
            </TabsContent>
            <TabsContent
              value="password"
              className="absolute inset-x-0 top-0"
              animateY={12}
              animationDuration={0.4}
            >
              <p className="text-sm text-muted-foreground">Change your password here.</p>
            </TabsContent>
            <TabsContent
              value="settings"
              className="absolute inset-x-0 top-0"
              animateY={12}
              animationDuration={0.4}
            >
              <p className="text-sm text-muted-foreground">Configure your application settings.</p>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
