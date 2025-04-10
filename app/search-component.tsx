"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useCallback, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

interface SearchComponentProps {
  className?: string
}

export function SearchComponent({ className }: SearchComponentProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get("search") || "")

  // Create query string
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  // Update URL when search changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (search) {
        router.push(`/?${createQueryString("search", search)}`)
      } else {
        router.push("/")
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [search, createQueryString, router])

  return (
    <div className={cn("w-full max-w-3xl mx-auto", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search components..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        />
      </div>
    </div>
  )
} 