import { ReactNode } from 'react'

interface DocsLayoutProps {
  children: ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="container relative max-w-3xl py-6 lg:py-10">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        {children}
      </div>
    </div>
  )
}
