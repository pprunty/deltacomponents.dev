import React from "react"

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full md:rounded-2xl md:bg-background md:border-border md:border">
      {children}
    </div>
  )
}
