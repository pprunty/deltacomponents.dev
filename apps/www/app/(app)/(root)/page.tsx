import { Metadata } from "next"
import Link from "next/link"

import { Announcement } from "@/components/announcement"
import { CardsDemo } from "@/components/cards"
import { ComponentGrid } from "@/components/component-grid"
import { ExamplesNav } from "@/components/examples-nav"
import { Icons } from "@/components/icons"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { PageNav } from "@/components/page-nav"
import { ThemeSelector } from "@/components/theme-selector"
import { Button } from "@/registry/delta-ui/ui/button"

const title = "Delta Components UI"
const description =
  "High-performance components registry built on top of shadcn/ui. From AI chat interfaces to interactive media. Copy, paste, and own the code."

export const dynamic = "force-static"
export const revalidate = false

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  openGraph: {
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          title
        )}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          title
        )}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
}

export default function IndexPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, transparent 0%, transparent 25%, hsl(var(--background) / 0.5) 50%, hsl(var(--background) / 0.8) 70%, hsl(var(--background) / 0.95) 85%, hsl(var(--background)) 95%)",
          }}
        />
        <PageHeader className="relative z-10">
          <Announcement />
          <div className="flex flex-col items-center gap-6 pt-6">
            <Icons.logo className="size-12" />
            <PageHeaderHeading className="max-w-3xl sm:max-w-2xl">
              {/* Mobile heading */}
              <span className="sm:hidden">
                The Difference in your Design System
              </span>
              {/* Desktop heading */}
              <span className="hidden sm:flex flex-wrap items-baseline justify-center gap-2 sm:gap-3">
                <span className="leading-[0.95]">
                  Delta Components
                </span>
                <span className="font-normal opacity-90">
                  UI
                </span>
              </span>
            </PageHeaderHeading>
          </div>
          <PageHeaderDescription>{description}</PageHeaderDescription>
          <PageActions>
            <Button asChild size="sm">
              <Link href="/docs">Get Started</Link>
            </Button>
            <Button asChild size="sm" variant="ghost">
              <Link href="/docs/components">View Components</Link>
            </Button>
          </PageActions>
          <div className="md:hidden mt-8 w-full">
            <ComponentGrid />
          </div>
        </PageHeader>
      </div>
      <PageNav className="hidden md:flex">
        <ExamplesNav className="[&>a:first-child]:text-primary flex-1 overflow-hidden" />
        <ThemeSelector className="mr-4 hidden md:flex" />
      </PageNav>
      <div className="container-wrapper section-soft flex-1 pb-6">
        <div className="container overflow-hidden">
          <section className="theme-container hidden md:block">
            <CardsDemo />
          </section>
        </div>
      </div>
    </div>
  )
}
