"use client"

import Link from "next/link"
import { Button } from "@/registry/delta-ui/ui/button"
import Image from "next/image"

export default function DocsNotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-6">
      <div className="relative z-30 flex flex-col items-center gap-8 text-center">
        <div className="space-y-6 rounded-lg bg-background/80 p-4 backdrop-blur-sm">
          <Image
            src="/images/Pokeeball.webp"
            alt="Poké Ball"
            width={120}
            height={120}
            className="mx-auto"
            priority
            quality={100}
          />
          <h1 className="z-30 text-3xl md:text-6xl font-heading">docs page not found or moved</h1>
        </div>
        <Button asChild size="lg" className="mt-4">
          <Link href="/docs">Return to Docs</Link>
        </Button>
      </div>
    </main>
  )
}