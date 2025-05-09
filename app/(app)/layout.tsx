import { SiteFooter } from "@/components/site-footer"

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="border-grid flex flex-1 flex-col">
      <main className="container-wrapper flex flex-1 flex-col">{children}</main>
    </div>
  )
}
