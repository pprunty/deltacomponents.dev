"use client"

import { ExternalLink } from "lucide-react"
import type { TemplateData } from "@/lib/template-data"
import { Button } from "@/registry/delta-ui/ui/button"
import { Badge } from "@/registry/delta-ui/ui/badge"
import { cn } from "@/lib/utils"

interface TemplateCardProps {
  template: TemplateData
}

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <div className="group relative rounded-lg border p-6 shadow-none transition-shadow hover:shadow-md h-full">
      <div className="flex flex-col space-y-4 h-full">
        <div className="relative overflow-hidden rounded-md">
          <div className="bg-muted aspect-video w-full rounded-md flex items-center justify-center">
            <span className="text-muted-foreground text-sm">Preview Image</span>
          </div>
          <Badge 
            className="absolute top-2 right-2 capitalize" 
            variant={template.category === "ai-chat" ? "default" : "secondary"}
          >
            {template.category === "ai-chat" ? "AI Chat" : template.category}
          </Badge>
        </div>
        
        <div className="space-y-2 flex-grow">
          <h3 className="font-semibold">{template.name}</h3>
          <p className="text-muted-foreground text-sm">{template.description}</p>
        </div>

        <div className="space-y-3 mt-auto">
          <div className="flex flex-wrap gap-1">
            {template.features.slice(0, 3).map((feature) => (
              <Badge key={feature} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
            {template.features.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{template.features.length - 3} more
              </Badge>
            )}
          </div>

          <div className="flex gap-2">
            {template.demoUrl && (
              <Button size="sm" variant="outline" className="flex-1" asChild>
                <a href={template.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-3 w-3" />
                  Preview
                </a>
              </Button>
            )}
            <Button 
              size="sm" 
              className={cn("flex-1", !template.demoUrl && "w-full")}
              asChild
            >
              <a href={template.vercelDeployUrl} target="_blank" rel="noopener noreferrer">
                <svg className="mr-2 h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 22.525H0l12-21.05 12 21.05z" />
                </svg>
                Deploy
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}