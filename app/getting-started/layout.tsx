import { ReactNode } from "react"

interface GettingStartedLayoutProps {
  children: ReactNode
}

export default function GettingStartedLayout({ children }: GettingStartedLayoutProps) {
  return (
    <div className="container mx-auto py-8 md:py-12">
      <div className="prose prose-neutral dark:prose-invert max-w-none text-left mx-auto" style={{ maxWidth: "65ch" }}>
        {children}
      </div>
    </div>
  )
} 