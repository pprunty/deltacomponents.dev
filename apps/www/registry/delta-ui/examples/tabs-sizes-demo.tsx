"use client"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/delta-ui/delta/tabs"

export function TabsSizeDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-2">
        <p className="text-sm font-medium">Small</p>
        <Tabs defaultValue="account" variant="default" size="sm">
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
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Default</p>
        <Tabs defaultValue="account" variant="default" size="default">
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
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Large</p>
        <Tabs defaultValue="account" variant="default" size="lg">
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
      </div>
    </div>
  )
}
