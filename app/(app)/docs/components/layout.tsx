import React from "react"

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex min-h-screen flex-col items-center">
      <div className="w-full max-w-[1400px] md:px-6 lg:px-8">{children}</div>
    </section>
  )
}
