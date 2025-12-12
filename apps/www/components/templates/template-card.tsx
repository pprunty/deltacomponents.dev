"use client"

import { ExternalLink } from "lucide-react"

import type { TemplateData } from "@/lib/template-data"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/delta-ui/ui/badge"
import { Button } from "@/registry/delta-ui/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/delta-ui/ui/card"

interface TemplateCardProps {
  template: TemplateData
}

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <Card className="group relative h-full">
      <CardContent className="relative">
        <div className="bg-muted flex aspect-video w-full items-center justify-center">
          <span className="text-muted-foreground text-sm">Preview Image</span>
        </div>
        <Badge
          className="absolute top-2 right-2 capitalize"
          variant={template.category === "ai-chat" ? "default" : "secondary"}
        >
          {template.category === "ai-chat" ? "AI Chat" : template.category}
        </Badge>
      </CardContent>
      <CardHeader>
        <CardTitle className="text-lg md:text-xl font-heading">{template.name}</CardTitle>
        <CardDescription className="text-base md:text-[17px]">
          {template.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
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
      </CardContent>
      <CardFooter className="gap-2">
        {template.demoUrl && (
          <Button size="default" variant="outline" className="flex-1" asChild>
            <a
              href={template.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Preview
            </a>
          </Button>
        )}
        <Button
          size="default"
          className={cn("flex-1", !template.demoUrl && "w-full")}
          asChild
        >
          <a
            href={template.vercelDeployUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="mr-2 h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M24 22.525H0l12-21.05 12 21.05z" />
            </svg>
            Deploy
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
