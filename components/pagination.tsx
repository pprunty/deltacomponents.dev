"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

import { docsConfig } from "@/config/docs"
import { cn } from "@/lib/utils"

interface DocsPaginationProps {
  className?: string
}

export function DocsPagination({ className }: DocsPaginationProps) {
  const pathname = usePathname()
  
  // Create a flat array of all navigation items with their hrefs
  const flattenedLinks = docsConfig.sidebarNav.flatMap(section => 
    section.items.map(item => ({
      title: item.title,
      href: item.href as string,
      section: section.title
    }))
  )
  
  // Find the current page index
  const currentPageIndex = flattenedLinks.findIndex(
    item => item.href === pathname
  )
  
  const prevPage = currentPageIndex > 0 ? flattenedLinks[currentPageIndex - 1] : null
  const nextPage = currentPageIndex < flattenedLinks.length - 1 
    ? flattenedLinks[currentPageIndex + 1] 
    : null

  if (!prevPage && !nextPage) {
    return null
  }

  return (
    <div className={cn("mt-16 py-12 border-t border-border flex justify-between", className)}>
      {prevPage ? (
        <Link href={prevPage.href} className="group flex flex-col items-start">
          <span className="mb-1 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-200">
            Previous Page
          </span>
          <div className="flex items-center text-sm font-medium text-foreground group-hover:text-foreground transition-colors duration-200">
            <ArrowLeftIcon className="mr-1.5 h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
            {prevPage.title}
          </div>
        </Link>
      ) : (
        <div />
      )}
      
      {nextPage ? (
        <Link href={nextPage.href} className="group flex flex-col items-end">
          <span className="mb-1 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-200">
            Next Page
          </span>
          <div className="flex items-center text-sm font-medium text-foreground group-hover:text-foreground transition-colors duration-200">
            {nextPage.title}
            <ArrowRightIcon className="ml-1.5 h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
          </div>
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
} 