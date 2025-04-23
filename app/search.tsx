"use client"

import type React from "react"
import { useState } from "react"
import { MagnifyingGlass } from "@phosphor-icons/react"

interface SearchProps {
  placeholder?: string
  onSearch?: (query: string) => void
  className?: string
}

export default function Search({
  placeholder = "Find Anything",
  onSearch,
  className = "",
}: SearchProps) {
  const [query, setQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(query)
    }
  }

  return (
    <form onSubmit={handleSearch} className={`w-full ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                    <MagnifyingGlass
                      size={13}
                      weight="bold"
                      className="text-muted-foreground"
                    />
        </div>
        <input
          type="search"
          className="flex h-8 w-full rounded-md border border-input bg-background pl-7 pr-2 py-1 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </form>
  )
}
