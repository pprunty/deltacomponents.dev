"use client"

import Image from "next/image"
import Link from "next/link"

import { Button } from "@/registry/delta-ui/ui/button"

export default function DocsNotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-6">
      <div className="relative z-30 flex flex-col items-center gap-8 text-center">
        <div className="bg-background/80 space-y-6 rounded-lg p-4 backdrop-blur-sm">
          <Image
            src="/images/stock/Pokeeball.webp"
            alt="Poké Ball"
            width={120}
            height={120}
            className="mx-auto"
            priority
            quality={100}
          />
          <h1 className="font-heading z-30 text-3xl md:text-6xl">
            docs page not found or moved
          </h1>
        </div>
        <Button asChild size="lg" className="mt-4">
          <Link href="/docs">Return to Docs</Link>
        </Button>
      </div>
    </main>
  )
}
