import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/delta/components/tabs"

export default function TabsFeaturesDemo() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-2">Scrollable Tabs</h3>
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
            <TabsTrigger value="tab4">Tab 4</TabsTrigger>
            <TabsTrigger value="tab5">Tab 5</TabsTrigger>
            <TabsTrigger value="tab6">Tab 6</TabsTrigger>
            <TabsTrigger value="tab7">Tab 7</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Disabled Tabs</h3>
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password" disabled>Password</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Custom Indicators</h3>
        <Tabs defaultValue="account">
          <TabsList
            showHoverEffect={true}
            showActiveIndicator={true}
            activeIndicatorPosition="top"
            activeIndicatorClassName="bg-primary"
            hoverIndicatorClassName="bg-primary/20"
          >
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
} 