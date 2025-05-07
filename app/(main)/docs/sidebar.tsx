import { cn } from "@/lib/utils"
import Search from './search';
import { Navigation } from "./navigation"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col w-[280px] border-r border-border bg-background",
        "fixed top-0 h-screen",
        className,
      )}
    >
      {/* Search section */}
      <div className="bg-inherit z-10 pt-16 pb-4">
        <div className="flex flex-col px-3">
          <div className="mb-4">
            <Search mobileOnly={false} />
          </div>
        </div>
        <div className="h-px w-full border-t border-border"></div>
      </div>

      {/* Main navigation with scrollable content */}
      <div className="grow overflow-y-auto px-3 relative">
        {/* @ts-expect-error Server Component */}
        <Navigation variant="sidebar" />
      </div>
    </aside>
  )
}
