interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return <div className="flex flex-1 flex-col w-full">{children}</div>
}
