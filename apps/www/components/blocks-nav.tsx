"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { registryCategories } from "@/registry/registry-categories"
import { ScrollArea, ScrollBar } from "@/registry/shadcn/scroll-area"

export function BlocksNav() {
  const pathname = usePathname()

  return (
    <div className="w-full">
      <ScrollArea className="w-full overflow-x-auto">
        <div className="flex w-max items-center">
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

  const href =
    category.slug === "featured" ? "/blocks" : `/blocks/${category.slug}`

  return (
    <Link
      href={href}
      key={category.slug}
      className="text-muted-foreground hover:text-foreground data-[active=true]:text-primary flex h-7 shrink-0 items-center justify-center px-4 text-center text-sm font-medium whitespace-nowrap transition-colors"
      data-active={isActive}
    >
      {category.name}
    </Link>
  )
}
