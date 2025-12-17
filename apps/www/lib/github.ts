import { siteConfig } from "@/lib/config"

export function getGithubFileUrl(slug: string) {
  const path = slug.replace(/^\/docs/, "")
  return `${siteConfig.links.github}/blob/main/apps/www/content/docs${path}.mdx`
}

export function getGitHubIssueUrl({
  title,
  labels,
  template,
}: {
  title: string
  labels: string[]
  template: string
}) {
  const url = new URL(`${siteConfig.links.github}/issues/new`)
  if (title) {
    url.searchParams.set("title", title)
  }
  if (labels) {
    url.searchParams.set("labels", labels.join(","))
  }
  if (template) {
    url.searchParams.set("template", template)
  }
  return url.toString()
}
