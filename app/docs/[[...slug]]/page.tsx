import { notFound } from "next/navigation"
import { Metadata } from "next"
import { getComponentByName } from "@/lib/registry"
import { componentRegistry } from "@/registry/mapping"
import { demoComponents } from "@/registry/demos"

// Import your MDX content
import * as ButtonDoc from "@/content/docs/button.mdx"
import * as CodeBlockDoc from "@/content/docs/code-block.mdx"
import * as NeobrutalismCardDoc from "@/content/docs/neobrutalism-card.mdx"
import * as TabsDoc from "@/content/docs/tabs.mdx"
import * as AdmonitionDoc from "@/content/docs/admonition.mdx"
import * as TweetDoc from "@/content/docs/tweet.mdx"
import * as TextInputDoc from "@/content/docs/text-input.mdx"
import * as SelectInputDoc from "@/content/docs/select-input.mdx"
import * as SmartFormDoc from "@/content/docs/smart-form.mdx"

interface DocPageProps {
  params: Promise<{
    slug: string[]
  }>
}

async function getDocFromParams(params: DocPageProps["params"]) {
  const resolvedParams = await params
  const slug = resolvedParams?.slug?.join("/") || ""
  const componentName = slug.split("/")[0]

  if (!componentName) {
    return null
  }

  const component = await getComponentByName(componentName)
  if (!component) {
    return null
  }

  const mdxContent = componentRegistry[componentName as keyof typeof componentRegistry]

  if (!mdxContent) {
    return null
  }

  return {
    component,
    content: mdxContent,
  }
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const doc = await getDocFromParams(params)

  if (!doc) {
    return {}
  }

  return {
    title: doc.component.title,
    description: doc.component.description,
  }
}

export default async function DocPage({ params }: DocPageProps) {
  const doc = await getDocFromParams(params)

  if (!doc) {
    notFound()
  }

  const MDXContent = doc.content

  return (
    <article className="container max-w-3xl py-6 lg:py-10">
      <MDXContent.default components={demoComponents} />
    </article>
  )
}
