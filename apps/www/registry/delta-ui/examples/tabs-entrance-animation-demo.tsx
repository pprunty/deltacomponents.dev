"use client"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/delta-ui/delta/tabs"

export default function TabsEntranceAnimationDemo() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-8">
      {/* Default animation (opacity only) */}
      <div className="space-y-2">
        <p className="text-muted-foreground text-xs">Default (opacity only)</p>
        <Tabs defaultValue="account" variant="underline">
          <TabsList className="w-fit">
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
      </div>

      {/* Y transform animation */}
      <div className="space-y-2">
        <p className="text-muted-foreground text-xs">
          With Y transform animation
        </p>
        <Tabs defaultValue="account" variant="underline">
          <TabsList className="w-fit">
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
      </div>

      {/* Slower animation */}
      <div className="space-y-2">
        <p className="text-muted-foreground text-xs">Slower animation</p>
        <Tabs defaultValue="account" variant="underline">
          <TabsList className="w-fit">
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
      </div>
    </div>
  )
}
