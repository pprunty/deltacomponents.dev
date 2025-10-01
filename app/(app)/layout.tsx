import { SiteHeader } from "@/components/site-header"

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="w-full md:flex md:flex-1 md:flex-col">
      <SiteHeader />
      <div className="w-full">{children}</div>
    </div>
  )
}
