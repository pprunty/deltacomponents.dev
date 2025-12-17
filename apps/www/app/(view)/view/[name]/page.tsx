import * as React from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { z } from "zod"

import { siteConfig } from "@/lib/config"
import { getRegistryComponent, getRegistryItem } from "@/lib/registry"
import { registryItemSchema } from "@/lib/schema"
import { absoluteUrl, cn } from "@/lib/utils"
import { BlockDisplay } from "@/components/block-display"

export const revalidate = false
export const dynamic = "force-static"
export const dynamicParams = false

const getCachedRegistryItem = React.cache(async (name: string) => {
  return await getRegistryItem(name)
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    name: string
  }>
}): Promise<Metadata> {
  const { name } = await params
  const { Index } = await import("@/registry/__index__")
  const index = z.record(z.string(), registryItemSchema).parse(Index)
  const block = index[name]

  if (!block) {
    return {}
  }

  const title = block.name
  const description = block.description

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: absoluteUrl(`/view/${block.name}`),
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
      title,
      description,
      images: [siteConfig.ogImage],
      creator: "@pprunty",
    },
  }
}

export async function generateStaticParams() {
  const { Index } = await import("@/registry/__index__")
  const index = z.record(z.string(), registryItemSchema).parse(Index)

  return Object.values(index)
    .filter(
      (block) =>
        [
          "registry:block",
          "registry:component",
          "registry:example",
          "registry:internal",
          "registry:ui",
        ].includes(block.type) && !block.meta?.hide
    )
    .map((block) => ({
      name: block.name,
    }))
}

export default async function BlockPage({
  params,
}: {
  params: Promise<{
    name: string
  }>
}) {
  const { name } = await params
  const item = await getCachedRegistryItem(name)
  const Component = getRegistryComponent(name)

  if (!item || !Component) {
    return notFound()
  }

  return (
    <div
      className={cn(
        "bg-background flex min-h-screen items-center justify-center",
        item.meta?.container
      )}
    >
      <Component />
    </div>
  )
}
