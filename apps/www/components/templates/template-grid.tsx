"use client"

import { useState } from "react"
import { TEMPLATE_DATA, TEMPLATE_CATEGORIES, type TemplateCategory } from "@/lib/template-data"
import { Button } from "@/registry/delta-ui/ui/button"
import { TemplateCard } from "./template-card"

export function TemplateGrid() {
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory>("all")

  const filteredTemplates = selectedCategory === "all" 
    ? TEMPLATE_DATA 
    : TEMPLATE_DATA.filter(template => template.category === selectedCategory)

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {TEMPLATE_CATEGORIES.map((category) => (
          <Button
            key={category.value}
            variant={selectedCategory === category.value ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.value)}
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => (
          <TemplateCard key={template.value} template={template} />
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No templates found for this category.</p>
        </div>
      )}
    </div>
  )
}