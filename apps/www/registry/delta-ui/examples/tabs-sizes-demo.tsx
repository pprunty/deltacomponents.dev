"use client"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/delta-ui/ui/tabs"

export default function TabsSizesDemo() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-8">
      {/* Small size */}
      <div className="space-y-2">
        <p className="text-muted-foreground text-xs">Small (sm)</p>
        <Tabs defaultValue="account" variant="underline" size="sm">
          <TabsList className="w-fit">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <div className="relative min-h-[60px]">
            <TabsContent value="account" className="absolute inset-x-0 top-0">
              <p className="text-muted-foreground text-sm">
                Small size tabs for compact layouts.
              </p>
            </TabsContent>
            <TabsContent value="password" className="absolute inset-x-0 top-0">
              <p className="text-muted-foreground text-sm">
                Change your password here.
              </p>
            </TabsContent>
            <TabsContent value="settings" className="absolute inset-x-0 top-0">
              <p className="text-muted-foreground text-sm">
                Configure your settings.
              </p>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Default size */}
      <div className="space-y-2">
        <p className="text-muted-foreground text-xs">Default</p>
        <Tabs defaultValue="account" variant="underline" size="default">
          <TabsList className="w-fit">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <div className="relative min-h-[60px]">
            <TabsContent value="account" className="absolute inset-x-0 top-0">
              <p className="text-muted-foreground text-sm">
                Default size tabs for standard layouts.
              </p>
            </TabsContent>
            <TabsContent value="password" className="absolute inset-x-0 top-0">
              <p className="text-muted-foreground text-sm">
                Change your password here.
              </p>
            </TabsContent>
            <TabsContent value="settings" className="absolute inset-x-0 top-0">
              <p className="text-muted-foreground text-sm">
                Configure your settings.
              </p>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Large size */}
      <div className="space-y-2">
        <p className="text-muted-foreground text-xs">Large (lg)</p>
        <Tabs defaultValue="account" variant="underline" size="lg">
          <TabsList className="w-fit">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <div className="relative min-h-[60px]">
            <TabsContent value="account" className="absolute inset-x-0 top-0">
              <p className="text-muted-foreground text-sm">
                Large size tabs for prominent navigation.
              </p>
            </TabsContent>
            <TabsContent value="password" className="absolute inset-x-0 top-0">
              <p className="text-muted-foreground text-sm">
                Change your password here.
              </p>
            </TabsContent>
            <TabsContent value="settings" className="absolute inset-x-0 top-0">
              <p className="text-muted-foreground text-sm">
                Configure your settings.
              </p>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
