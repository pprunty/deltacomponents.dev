"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { SidebarNavItem } from "@/types/nav"
import { type DocsConfig } from "@/config/docs"
import { cn } from "@/lib/utils"

export function DocsNav({ config }: { config: DocsConfig }) {
  const pathname = usePathname()

  const items = config.sidebarNav

  // Calculate and memoize the count of items for each category
  const categoryCounts = React.useMemo(() => {
    return items.map((category) => {
      // Count only enabled items with href and not hidden
      const count =
        category.items?.filter(
          (item) => item.href && !item.disabled && !item.hide
        ).length || 0
      return count
    })
  }, [items])

  return items.length ? (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col gap-1">
          <h4 className="rounded-md px-2 py-1 text-sm md:text-[15px] font-semibold text-foreground">
            {item.title}
            {categoryCounts[index] > 0 &&
              item.title.toLowerCase() !== "getting started" && (
                <span className="align-super text-xs text-muted-foreground ml-1">
                  ({categoryCounts[index]})
                </span>
              )}
          </h4>
          {item?.items?.length && (
            <DocsNavItems
              items={item.items.filter((i) => !i.hide)}
              pathname={pathname}
            />
          )}
        </div>
      ))}
    </div>
  ) : null
}

function DocsNavItems({
  items,
  pathname,
}: {
  items: SidebarNavItem[]
  pathname: string | null
}) {
  // Helper function to get label style based on label text
  const getLabelStyle = (label: string) => {
    switch (label.toLowerCase()) {
      case "new":
        return "bg-[#adfa1d] text-[#000000]" // Bright green for "New"
      case "beta":
        return "bg-[#ff9800] text-white" // Orange for "Beta"
      case "updated":
        return "bg-[#2196f3] text-white" // Blue for "Updated"
      case "experimental":
        return "bg-[#9c27b0] text-white" // Purple for "Experimental"
      case "deprecated":
        return "bg-[#f44336] text-white" // Red for "Deprecated"
      default:
        return "bg-[#adfa1d] text-[#000000]" // Default is green
    }
  }

  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max gap-0.5 text-sm md:text-[15px]">
      {items
        .filter((item) => !item.hide)
        .map((item, index) =>
          item.href && !item.disabled ? (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "group flex h-8 w-full items-center rounded-lg px-2 font-normal text-muted-foreground underline-offset-2 hover:bg-primary/10",
                item.disabled && "cursor-not-allowed opacity-60",
                pathname === item.href &&
                  "bg-primary/10 font-medium text-primary"
              )}
              target={item.external ? "_blank" : ""}
              rel={item.external ? "noreferrer" : ""}
            >
              {item.title}
              {item.label && (
                <span
                  className={cn(
                    "ml-2 rounded-md px-1.5 py-0.5 text-xs leading-none no-underline group-hover:no-underline",
                    getLabelStyle(item.label)
                  )}
                >
                  {item.label}
                </span>
              )}
            </Link>
          ) : (
            <span
              key={index}
              className={cn(
                "flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline",
                item.disabled && "cursor-not-allowed opacity-60"
              )}
            >
              {item.title}
              {item.label && (
                <span
                  className={cn(
                    "ml-2 rounded-md px-1.5 py-0.5 text-xs leading-none no-underline group-hover:no-underline",
                    getLabelStyle(item.label)
                  )}
                >
                  {item.label}
                </span>
              )}
            </span>
          )
        )}
    </div>
  ) : null
}
