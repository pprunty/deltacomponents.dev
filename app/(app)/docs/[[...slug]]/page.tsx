import { Suspense } from "react"
import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { allDocs } from "contentlayer/generated"
import { ChevronRightIcon, ExternalLinkIcon } from "lucide-react"

import { siteConfig } from "@/config/site"
import { getTableOfContents } from "@/lib/toc"
import { absoluteUrl, cn } from "@/lib/utils"
import { Mdx } from "@/components/mdx-components"
import { DashboardTableOfContents } from "@/components/toc"

import "@/styles/mdx.css"

import Link from "next/link"

import { badgeVariants } from "@/components/ui/badge"
import { Contribute } from "@/components/contribute"
import { DocsPagination } from "@/components/pagination"
import { SimilarComponents } from "@/components/similar-components"
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
          url: siteConfig.ogImage,
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
      images: [siteConfig.ogImage],
      creator: "@pprunty_",
    },
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
      <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
        <div className="mx-auto w-full min-w-0 max-w-3xl">
          <div className="mb-4 flex items-center space-x-1 text-sm leading-none text-muted-foreground">
            <div className="truncate">Docs</div>
            <ChevronRightIcon className="size-3.5" />
            <div className="text-foreground">{doc.title}</div>
          </div>
          <div className="space-y-2">
            <ScrambleText
              text={doc.title}
              className={cn(
                "h-10 w-fit scroll-m-20 text-3xl font-bold tracking-tight"
              )}
              speed={80}
            />
            {doc.description && <p className="text-base">{doc.description}</p>}
          </div>
          {doc.links ? (
            <div className="flex items-center space-x-2 pt-4">
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
        <div className="hidden text-sm xl:block">
          <div className="sticky top-20 h-[calc(100vh-3.5rem)] pt-1">
            <div className="no-scrollbar h-full space-y-4 overflow-auto pb-10">
              {doc.toc && (
                <Suspense fallback={<div>Loading table of contents...</div>}>
                  <DashboardTableOfContents toc={toc} />
                </Suspense>
              )}
              <Suspense fallback={<div>Loading contribute links...</div>}>
                <Contribute slug={doc.slug} />
              </Suspense>

              {/* Twitter follow card */}
              <div className="mt-4 rounded-lg border border-border p-4">
                <Link
                  href="https://twitter.com/pprunty_"
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
        </div>
      </main>
    </>
  )
}
