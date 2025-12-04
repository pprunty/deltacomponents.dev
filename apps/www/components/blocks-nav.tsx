"use client"

import { useRouter, usePathname } from "next/navigation"

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/registry/delta-ui/delta/tabs"
import { registryCategories } from "@/registry/registry-categories"

export function BlocksNav() {
  const router = useRouter()
  const pathname = usePathname()

  // Determine current value based on pathname
  const currentValue =
    pathname === "/blocks"
      ? "featured"
      : pathname.startsWith("/blocks/")
        ? pathname.split("/blocks/")[1]
        : "featured"

  const handleValueChange = (value: string) => {
    const href = value === "featured" ? "/blocks" : `/blocks/${value}`
    router.push(href)
  }

  const visibleCategories = registryCategories.filter(
    (category) => !category.hidden
  )

  return (
    <div className="w-full">
      <Tabs
        value={currentValue}
        onValueChange={handleValueChange}
        variant="default"
        size="lg"
      >
        <TabsList className="gap-1 bg-transparent p-0">
          {visibleCategories.map((category) => (
            <TabsTrigger
              key={category.slug}
              value={category.slug}
              className="data-[state=active]:[&>div]:bg-muted"
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
}
