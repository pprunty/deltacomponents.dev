"use client"

import { ComponentPreview } from "./component-preview"
import { useSearchParams } from "next/navigation"
import { CategoryType } from "@/lib/registry"
import { Badge } from "@/components/badge"
import { Suspense } from "react"

interface ComponentShowcaseProps {
  categories: CategoryType[]
}

// Inner component using useSearchParams
function ComponentShowcaseInner({ categories }: ComponentShowcaseProps) {
  const searchParams = useSearchParams()
  const search = searchParams.get("search")?.toLowerCase() || ""

  // Filter components based on search
  const filteredCategories = categories.map(category => ({
    ...category,
    items: category.items.filter(component => {
      if (!search) return true
      return (
        component.name.toLowerCase().includes(search) ||
        component.description.toLowerCase().includes(search) ||
        component.category?.toLowerCase().includes(search)
      )
    })
  })).filter(category => category.items.length > 0)

  return (
    <div className="space-y-8">
      {filteredCategories.map((category) => (
        <div key={category.title} className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">{category.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.items.map((component) => (
              <ComponentPreview
                key={component.name}
                title={component.title}
                name={component.name}
                badge={component.badge ? (
                  Array.isArray(component.badge) ? (
                    <div className="flex gap-1">
                      {component.badge.map((badge, index) => (
                        <Badge key={index} variant={badge as 'new' | 'beta'}>
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <Badge variant={component.badge as 'new' | 'beta'}>
                      {component.badge}
                    </Badge>
                  )
                ) : null}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// Wrapper component with Suspense
export function ComponentShowcase(props: ComponentShowcaseProps) {
  return (
    <Suspense fallback={<div className="space-y-8">Loading components...</div>}>
      <ComponentShowcaseInner {...props} />
    </Suspense>
  )
} 