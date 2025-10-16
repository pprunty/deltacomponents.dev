"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { ScrollArea, ScrollBar } from "@/registry/delta-ui/ui/scroll-area"
import { registryCategories } from "@/registry/registry-categories"

export function BlocksNav() {
  const pathname = usePathname()

  return (
    <div className="w-full">
      <ScrollArea className="w-full overflow-x-auto">
        <div className="flex items-center w-max">
          {registryCategories.map((category) => (
            <BlocksNavLink
              key={category.slug}
              category={category}
              isActive={
                category.slug === "featured"
                  ? pathname === "/blocks"
                  : pathname === `/blocks/${category.slug}`
              }
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  )
}

function BlocksNavLink({
  category,
  isActive,
}: {
  category: (typeof registryCategories)[number]
  isActive: boolean
}) {
  if (category.hidden) {
    return null
  }

  const href = category.slug === "featured" ? "/blocks" : `/blocks/${category.slug}`

  return (
    <Link
      href={href}
      key={category.slug}
      className="flex h-7 shrink-0 items-center justify-center whitespace-nowrap px-4 text-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[active=true]:text-primary"
      data-active={isActive}
    >
      {category.name}
    </Link>
  )
}