"use client"

import * as React from "react"
import Footer from "@/delta/footer"

export default function FooterDemo() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Demo content above footer */}
      <div className="flex-1 flex items-center justify-center bg-muted">
        <p className="text-muted-foreground text-center">
          scroll down to see footer
        </p>
      </div>

      {/* Footer Demo */}
      <Footer companyName="Delta Components" />
    </div>
  )
}
