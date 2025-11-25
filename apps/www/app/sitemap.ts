import { MetadataRoute } from "next"

import { siteConfig } from "@/lib/config"
import { source } from "@/lib/source"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://deltacomponents.dev.com"

  // Get nav items
  const navUrls = siteConfig.navItems.map((item) => item.href)
  
  // Get all docs pages
  const docsUrls = source.getPages().map((page) => page.url)
  
  // Get markdown versions of docs pages (.md extension)
  const markdownUrls = docsUrls.map((url) => `${url}.md`)

  // Combine all URLs
  const allUrls = [...navUrls, ...docsUrls, ...markdownUrls]

  return allUrls.map((url) => ({
    url: `${baseUrl}${url}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: url === "/" ? 1 : 0.8,
  }))
}
