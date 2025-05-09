import { cn } from "@/lib/utils"
import { Navigation } from "./navigation"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col w-[280px] border-r border-border bg-background",
        "fixed top-0 h-screen pt-16",
        className,
      )}
    >
      {/* Main navigation with scrollable content */}
      <div className="grow overflow-y-auto px-3 relative">
        {/* @ts-expect-error Server Component */}
        <Navigation variant="sidebar" />
      </div>
    </aside>
  )
}
