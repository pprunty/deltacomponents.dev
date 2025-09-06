import { cache, Suspense } from "react"
import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { allDocs } from "contentlayer/generated"
import { ChevronRightIcon, ExternalLinkIcon } from "lucide-react"

import { siteConfig } from "@/config/site"
import { getTableOfContents } from "@/lib/toc"
import { absoluteUrl, cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Mdx } from "@/components/mdx-components"
import { DashboardTableOfContents } from "@/components/toc"

import "@/styles/mdx.css"

import Link from "next/link"

import { badgeVariants } from "@/components/ui/badge"
import { AnalyticsDisplay } from "@/components/analytics-display"
import { Contribute } from "@/components/contribute"
import { DocsPagination } from "@/components/pagination"
import { SimilarComponents } from "@/components/similar-components"
import redis from "@/app/redis"
import ScrambleText from "@/registry/animations/scramble-text"

interface DocPageProps {
  params: {
    slug: string[]
  }
}

async function getDocFromParams({ params }: DocPageProps) {
  const slug = params.slug?.join("/") || ""
  const doc = allDocs.find((doc) => doc.slugAsParams === slug)

  if (!doc) {
    return null
  }

  return doc
}

export async function generateMetadata(props: {
  params: Promise<DocPageProps["params"]>
}): Promise<Metadata> {
  const params = await props.params
  const doc = await getDocFromParams({ params })

  if (!doc) {
    return {}
  }

  return {
    title: doc.title,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      url: absoluteUrl(doc.slug),
      images: [
        {
          url: "/icon.webp",
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
      images: ["/og/1200x6238-twitter.png"],
      creator: "@pprunty_",
    },
    // TODO: Add component-specific open graph images later
    // This would generate custom OG images based on component content
  }
}

export async function generateStaticParams(): Promise<
  DocPageProps["params"][]
> {
  return allDocs.map((doc) => ({
    slug: doc.slugAsParams.split("/"),
  }))
}

// Cache analytics data to avoid build errors while still allowing revalidation
const getCachedAnalytics = cache(async (componentName: string) => {
  try {
    const sanitizedComponent = componentName.replace(/[^a-zA-Z0-9-_]/g, "")
    const viewsKey = `delta-views:${sanitizedComponent}`
    const downloadsKey = `delta-downloads:${sanitizedComponent}`

    const [views, downloads] = await Promise.all([
      redis.get(viewsKey),
      redis.get(downloadsKey),
    ])

    return {
      views: Number(views) || 0,
      downloads: Number(downloads) || 0,
    }
  } catch (error) {
    console.error("Error fetching initial analytics:", error)
    // Return zero values during build/error to avoid blocking static generation
    return {
      views: 0,
      downloads: 0,
    }
  }
})

export const revalidate = 60 // Revalidate every 60 seconds for analytics updates

export default async function DocPage(props: {
  params: Promise<DocPageProps["params"]>
}) {
  const params = await props.params

  const doc = await getDocFromParams({ params })

  if (!doc) {
    notFound()
  }

  const toc = await getTableOfContents(doc.body.raw)

  // Count only TOC items that will be rendered (matching Tree component depth limit)
  const countRenderedTocItems = (items: any[], level: number = 1): number => {
    if (!items || level >= 3) return 0 // Match Tree component depth limit (level < 3)

    return items.reduce((count, item) => {
      let itemCount = 1 // Count this item

      // Count nested items only if they'll be rendered (level + 1 < 3)
      if (item.items && level + 1 < 3) {
        itemCount += countRenderedTocItems(item.items, level + 1)
      }

      return count + itemCount
    }, 0)
  }

  const tocItemCount = toc.items ? countRenderedTocItems(toc.items) : 0
  const isLargeToc = tocItemCount > 8 // Lower threshold for better UX

  const slugPath = doc.slugAsParams
  let componentName = null
  let initialAnalytics = null

  // Regex to match patterns like "category/component" but not just "category"
  // This will match URLs like: /docs/components/button, /docs/inputs/date-input, etc.
  const twoLevelPathRegex = /^([^/]+)\/([^/]+)$/

  if (twoLevelPathRegex.test(slugPath)) {
    const matches = slugPath.match(twoLevelPathRegex)
    if (matches) {
      componentName = matches[2]

      // Fetch initial analytics data server-side
      if (componentName) {
        initialAnalytics = await getCachedAnalytics(componentName)
      }
    }
  }

  return (
    <>
      <main
        className={cn(
          "justify-center w-full",
          doc.toc
            ? "xl:grid xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-4"
            : "flex justify-center"
        )}
      >
        <div
          className={cn(
            "mx-auto w-full min-w-0 md:rounded-2xl md:bg-background md:border-border md:border md:p-6",
            doc.toc ? "max-w-3xl" : "max-w-none"
          )}
        >
          <div className="mb-4 flex items-center space-x-1 text-sm leading-none text-muted-foreground">
            <div className="truncate">Docs</div>
            <ChevronRightIcon className="size-3.5" />
            <div className="text-foreground">{doc.title}</div>
          </div>
          <div className="space-y-2">
            <ScrambleText
              text={doc.title}
              className={cn(
                "h-10 w-fit scroll-m-20 text-4xl font-bold tracking-tight"
              )}
              speed={80}
            />
            {doc.description && (
              <p className="text-base text-muted-foreground">
                {doc.description}
              </p>
            )}
          </div>
          {/* Analytics display for component pages */}
          {componentName && (
            <div className="pt-4">
              <AnalyticsDisplay
                component={componentName}
                initialAnalytics={initialAnalytics}
              />
            </div>
          )}

          {doc.links ? (
            <div className="flex items-center space-x-2 pt-4">
              {componentName && (
                <span className="text-muted-foreground">Based on</span>
              )}
              {Object.entries(doc.links).map(([k, v]) => (
                <Link
                  key={k}
                  href={v as any}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    badgeVariants({ variant: "secondary" }),
                    "gap-1 no-after"
                  )}
                >
                  {k}
                  <ExternalLinkIcon className="size-3" />
                </Link>
              ))}
            </div>
          ) : null}
          <div className="pt-8">
            <Mdx code={doc.body.code} />
          </div>

          {/* Only show similar components section for component docs */}
          {componentName && (
            <div className="mt-6 pt-4">
              <Suspense
                fallback={
                  <div className="py-4">Loading similar components...</div>
                }
              >
                <SimilarComponents
                  currentComponent={componentName}
                  title="You might also like"
                  count={3}
                />
              </Suspense>
            </div>
          )}

          <Suspense
            fallback={
              <div className="mt-4 py-6 border-t border-border">
                Loading navigation...
              </div>
            }
          >
            <DocsPagination />
          </Suspense>
        </div>
        {doc.toc && (
          <div className="hidden text-sm xl:block">
            <div className="sticky top-4 pb-5 z-30 w-full shrink-0">
              <ScrollArea
                className={cn(
                  "rounded-2xl bg-background border-border border",
                  isLargeToc ? "max-h-screen" : "max-h-[calc(100vh-4rem)]"
                )}
              >
                <div className="p-4 lg:p-6 space-y-5">
                  {doc.toc && (
                    <Suspense
                      fallback={<div>Loading table of contents...</div>}
                    >
                      <DashboardTableOfContents toc={toc} />
                    </Suspense>
                  )}
                  <Suspense fallback={<div>Loading contribute links...</div>}>
                    <Contribute slug={doc.slug} />
                  </Suspense>
                </div>
              </ScrollArea>

              {/* Twitter follow card - beneath TOC border */}
              <div className="mt-6 rounded-2xl bg-background border-border border px-4 py-4 hover:bg-accent transition-colors">
                <Link
                  href="https://x.com/intent/follow?screen_name=pprunty_&original_referer=https://deltacomponents.dev"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 group no-after"
                >
                  <Image
                    src="/images/pp.png"
                    alt="Patrick Prunty"
                    width={42}
                    height={42}
                    className="rounded-md object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Follow me on 𝕏</span>
                    <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                      @pprunty_
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  )
}
