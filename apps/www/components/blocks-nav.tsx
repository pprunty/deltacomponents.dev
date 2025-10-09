"use client"

import { useTransition } from "react"
import { usePathname, useRouter } from "next/navigation"

import { Skeleton } from "@/registry/delta-ui/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/registry/delta-ui/ui/tabs"
import { registryCategories } from "@/registry/registry-categories"

export function BlocksNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  // Build all categories - use registry categories directly, map featured to empty string
  const allCategories = registryCategories.filter((cat) => !cat.hidden)

  // Get current value based on pathname
  const getCurrentValue = () => {
    if (pathname === "/blocks") return "featured"
    const categorySlug = pathname.replace("/blocks/", "")
    return categorySlug
  }

  const handleValueChange = (value: string) => {
    const href = value === "featured" ? "/blocks" : `/blocks/${value}`
    startTransition(() => {
      router.push(href)
    })
  }

  return (
    <div className="mb-4 w-full pt-6">
      <Tabs
        value={getCurrentValue()}
        onValueChange={handleValueChange}
        className="w-full"
      >
        <TabsList
          showBottomBorder
          className="h-auto w-full justify-start gap-0 bg-transparent p-0"
        >
          {allCategories.map((category) => (
            <TabsTrigger
              key={category.slug}
              value={category.slug}
              className="data-[state=active]:border-primary rounded-none border-0 border-b-2 border-transparent bg-transparent px-4 py-2 text-base data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              disabled={isPending}
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
}

export function BlocksSkeleton() {
  return (
    <div className="flex flex-col gap-12 md:gap-24">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-[400px] w-full rounded-xl" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      ))}
    </div>
  )
}
