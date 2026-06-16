"use client"

import { Component, type ReactNode } from "react"
import { Tweet } from "react-tweet"

import { cn } from "@/lib/utils"

type XCardSize =
  | "xs"
  | "extra-small"
  | "sm"
  | "small"
  | "default"
  | "lg"
  | "large"
  | "xl"
  | "extra-large"

interface XCardProps {
  id: string
  caption?: ReactNode
  className?: string
  size?: XCardSize
}

interface TweetBoundaryProps {
  children: ReactNode
}

interface TweetBoundaryState {
  hasError: boolean
}

/**
 * Error boundary isolating render failures from the embedded tweet.
 *
 * `react-tweet` renders third-party data and can throw at render time when the
 * upstream syndication payload changes shape. Without a boundary, that throw
 * propagates to the nearest route-level boundary and blanks the whole page.
 * This contains the failure to a single inline notice instead.
 */
class TweetBoundary extends Component<
  TweetBoundaryProps,
  TweetBoundaryState
> {
  constructor(props: TweetBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): TweetBoundaryState {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="border-border bg-muted/30 text-muted-foreground my-3 w-full rounded-lg border px-4 py-6 text-center text-sm">
          This post couldn&apos;t be loaded.
        </div>
      )
    }

    return this.props.children
  }
}

function normalizeSize(
  size: XCardSize
): "xs" | "small" | "default" | "large" | "xl" {
  if (size === "xs" || size === "extra-small") return "xs"
  if (size === "sm") return "small"
  if (size === "lg") return "large"
  if (size === "xl" || size === "extra-large") return "xl"
  return size as "small" | "default" | "large"
}

export function XCard({
  id,
  caption,
  className,
  size = "default",
}: XCardProps) {
  const normalizedSize = normalizeSize(size)

  const sizeClasses = {
    xs: "max-w-xs scale-75",
    small: "max-w-sm scale-90",
    default: "max-w-xl",
    large: "max-w-2xl scale-110",
    xl: "max-w-3xl scale-125",
  }

  return (
    <div className={cn("x-card my-6", sizeClasses[normalizedSize], className)}>
      <div className="flex justify-center">
        <TweetBoundary>
          <Tweet id={id} />
        </TweetBoundary>
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
