export default function ChatbotWindowLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="no-scrollbar h-screen w-full">{children}</div>
}
