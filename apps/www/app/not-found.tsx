"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/registry/delta-ui/ui/button"

export default function NotFound() {
  const router = useRouter()

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push("/")
    }
  }

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
            quality={75}
          />
          <h1 className="font-satoshi z-30 text-3xl md:text-6xl">
            page not found or moved
          </h1>
        </div>
        <div className="mt-4 flex gap-4">
          <Button size="lg" variant="outline" onClick={handleGoBack}>
            Go Back
          </Button>
          <Button asChild size="lg">
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
