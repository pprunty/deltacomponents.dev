import * as React from "react"

import { cn } from "@/lib/utils"

export function Steps({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className="[&>h3]:step steps mb-12 ml-4 border-l pl-8 [counter-reset:step]"
      {...props}
    />
  )
}

export function Step({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn(
        "font-heading font-medium mt-8 scroll-m-20 text-lg tracking-tight",
        className
      )}
      {...props}
    />
  )
}