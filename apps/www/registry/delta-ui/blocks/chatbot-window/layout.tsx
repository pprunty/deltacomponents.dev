export default function ChatbotWindowLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen w-full">
      {children}
    </div>
  )
}