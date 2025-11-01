"use client"

import { type ReactNode } from "react"
import { Tweet } from "react-tweet"

import { cn } from "@/lib/utils"

interface XCardProps {
  id: string
  caption?: ReactNode
  className?: string
  size?: "small" | "medium" | "large"
}

export function XCard({ id, caption, className, size = "medium" }: XCardProps) {
  const sizeClasses = {
    small: "max-w-sm scale-90",
    medium: "max-w-xl",
    large: "max-w-2xl scale-110",
  }

  return (
    <div className={cn("x-card my-6", sizeClasses[size], className)}>
      <div className="flex justify-center">
        <Tweet id={id} />
      </div>
      {caption && (
        <div className="text-muted-foreground mt-4 text-center text-sm">
          {caption}
        </div>
      )}
      <style jsx>{`
        .x-card .react-tweet-theme {
          --tweet-container-margin: 0;
          --tweet-font-family: inherit;
          --tweet-font-color: hsl(var(--foreground));
          --tweet-bg-color: hsl(var(--card));
          --tweet-bg-color-hover: hsl(var(--card));
          --tweet-color-blue-secondary: hsl(var(--muted-foreground));
          --tweet-color-blue-secondary-hover: hsl(var(--accent));
          --tweet-font-color-secondary: hsl(var(--muted-foreground));
          --tweet-quoted-bg-color-hover: hsl(var(--muted) / 0.3);
          --tweet-border: 1px solid hsl(var(--border));
          --tweet-skeleton-gradient: linear-gradient(
            270deg,
            hsl(var(--muted)),
            hsl(var(--muted) / 0.8),
            hsl(var(--muted) / 0.8),
            hsl(var(--muted))
          );
          --tweet-color-red-primary: hsl(var(--destructive));
          --tweet-color-red-primary-hover: hsl(var(--destructive) / 0.1);
          --tweet-color-green-primary: hsl(var(--chart-2));
          --tweet-color-green-primary-hover: hsl(var(--chart-2) / 0.1);
          --tweet-twitter-icon-color: hsl(var(--foreground));
          --tweet-verified-old-color: hsl(var(--muted-foreground));
          --tweet-verified-blue-color: hsl(var(--primary));
        }

        .x-card .react-tweet-theme p {
          font-size: inherit;
          line-height: 1.3rem;
        }

        .x-card .react-tweet-theme p a {
          @apply border-border hover:border-foreground border-b transition-[border-color];
        }

        .x-card .react-tweet-theme p a:hover {
          text-decoration: none;
        }
      `}</style>
    </div>
  )
}
