"use client"

import { DotPattern } from "./dot-pattern"
import { cn } from "@/lib/utils"

interface GridPatternProps {
  className?: string;
}

export function GridPattern({ className }: GridPatternProps) {
  return (
    <DotPattern glow={true} className={cn("[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]", className)} />
  )
}
