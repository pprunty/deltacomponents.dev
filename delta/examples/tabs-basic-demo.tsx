import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/delta/components/tabs"

export default function TabsBasicDemo() {
  return (
    <Tabs defaultValue="account">
      <TabsList showBottomBorder>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="p-4 rounded-lg border border-border my-4">
          <h3 className="text-lg font-medium">Account Settings</h3>
          <p className="text-sm text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="p-4 rounded-lg border border-border my-4">
          <h3 className="text-lg font-medium">Password Settings</h3>
          <p className="text-sm text-muted-foreground">
            Change your password and security settings.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="notifications">
        <div className="p-4 rounded-lg border border-border my-4">
          <h3 className="text-lg font-medium">Notification Settings</h3>
          <p className="text-sm text-muted-foreground">
            Configure your notification preferences.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  )
} 