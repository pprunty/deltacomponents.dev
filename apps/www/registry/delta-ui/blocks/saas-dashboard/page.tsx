import { AppSidebar } from "@/registry/delta-ui/blocks/saas-dashboard/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/delta-ui/ui/breadcrumb"
import { SidebarInset, SidebarProvider } from "@/registry/delta-ui/ui/sidebar"

export default function Page() {
  return (
    <div className="bg-sidebar flex h-screen w-full flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <SidebarProvider
          className="min-h-0 !pr-0"
          style={
            {
              "--sidebar-width": "15.25rem",
              "--sidebar-width-mobile": "15.25rem",
            } as React.CSSProperties
          }
        >
          <AppSidebar />
          <div className="flex flex-1 overflow-hidden py-3 sm:pr-3">
            <SidebarInset
              className="flex flex-1 flex-col overscroll-none rounded-sm border md:shadow-[0_1px_2px_0_rgba(0,0,0,0.03),0_1px_3px_0_rgba(0,0,0,0.04)] dark:md:shadow-[0_1px_2px_0_rgba(0,0,0,0.2),0_1px_3px_0_rgba(0,0,0,0.15)]"
              style={{
                WebkitOverflowScrolling: "auto",
                overscrollBehavior: "none",
              }}
            >
              <header className="flex h-16 shrink-0 items-center gap-2 overscroll-none border-b">
                <div className="flex items-center gap-2 px-4">
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">
                          Building Your Application
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </header>
              <div
                className="flex flex-1 flex-col gap-4 overflow-y-auto overscroll-none p-4 pb-8 [scrollbar-color:rgb(163_163_163_/_0.5)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[rgb(163_163_163_/_0.5)] hover:[&::-webkit-scrollbar-thumb]:bg-[rgb(163_163_163_/_0.7)] [&::-webkit-scrollbar-track]:bg-transparent"
                style={{
                  WebkitOverflowScrolling: "auto",
                  overscrollBehavior: "none",
                }}
              >
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                  <div className="bg-muted/50 aspect-video rounded-xl" />
                  <div className="bg-muted/50 aspect-video rounded-xl" />
                  <div className="bg-muted/50 aspect-video rounded-xl" />
                </div>
                <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                  <div className="bg-muted/50 aspect-square rounded-xl" />
                  <div className="bg-muted/50 aspect-square rounded-xl" />
                </div>
                <div className="bg-muted/50 h-[400px] rounded-xl" />
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                  <div className="bg-muted/50 aspect-video rounded-xl" />
                  <div className="bg-muted/50 aspect-video rounded-xl" />
                  <div className="bg-muted/50 aspect-video rounded-xl" />
                  <div className="bg-muted/50 aspect-video rounded-xl" />
                </div>
                <div className="bg-muted/50 h-[600px] rounded-xl" />
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </div>
  )
}
