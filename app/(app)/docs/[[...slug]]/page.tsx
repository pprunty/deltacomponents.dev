import { Suspense } from "react"
import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { allDocs } from "contentlayer/generated"

import { siteConfig } from "@/config/site"
import { getTableOfContents } from "@/lib/toc"
import { absoluteUrl, cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Mdx } from "@/components/mdx-components"
import { DashboardTableOfContents } from "@/components/toc"

import "@/styles/mdx.css"

import Link from "next/link"

import { Contribute } from "@/components/contribute"
import { DocsPagination } from "@/components/pagination"
import { SimilarComponents } from "@/components/similar-components"

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
          url: `${siteConfig.url}/og/og.webp`,
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

  // Regex to match patterns like "category/component" but not just "category"
  // This will match URLs like: /docs/components/button, /docs/inputs/date-input, etc.
  const twoLevelPathRegex = /^([^/]+)\/([^/]+)$/

  if (twoLevelPathRegex.test(slugPath)) {
    const matches = slugPath.match(twoLevelPathRegex)
    if (matches) {
      componentName = matches[2]
    }
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div
          className={cn(
            "flex flex-col xl:flex-row gap-8",
            doc.toc ? "min-[1424px]:justify-center" : "justify-center"
          )}
        >
          <main
            className={cn(
              "min-w-0 w-full",
              doc.toc
                ? "max-w-2xl min-[1424px]:max-w-3xl min-[1424px]:mx-auto"
                : "max-w-3xl mx-auto"
            )}
          >
            <div className="sm:py-4">
              <div className="mb-4 flex items-center space-x-1 text-sm leading-none text-muted-foreground">
                <div className="truncate">Docs</div>
              </div>
              <div className="space-y-2">
                <h1 className="font-heading font-medium scroll-m-20 text-4xl lg:text-3xl font-bold tracking-tight text-pretty">
                  {doc.title}
                </h1>
                {doc.description && (
                  <p className="text-base text-muted-foreground text-pretty">
                    {doc.description}
                  </p>
                )}
              </div>

              <div className="pt-4">
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
          </main>
          {doc.toc && (
            <aside className="hidden xl:block w-70 shrink-0">
              <div className="sticky top-14 py-6">
                <ScrollArea
                  className={cn(
                    "bg-background",
                    isLargeToc ? "max-h-screen" : "max-h-[calc(100vh-8rem)]"
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

                    {/* Twitter follow card - within same container */}
                    <div className="rounded-sm border border-border px-4 py-3 hover:bg-accent transition-colors">
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
                          <span className="text-sm font-medium">
                            Follow me on 𝕏
                          </span>
                          <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                            @pprunty_
                          </span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </aside>
          )}
        </div>
      </div>
    </>
  )
}
