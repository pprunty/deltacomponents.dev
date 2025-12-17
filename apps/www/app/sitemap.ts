import { MetadataRoute } from "next"

import { siteConfig } from "@/lib/config"
import { source } from "@/lib/source"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || siteConfig.url

  // Get nav items
  const navUrls = siteConfig.navItems
    .filter((item) => !item.disabled && !item.hide)
    .map((item) => item.href)

  // Get all docs pages
  const docsUrls = source.getPages().map((page) => page.url)

  // Get markdown versions of docs pages (.md extension)
  const markdownUrls = docsUrls.map((url) => `${url}.md`)

  // Combine all URLs, ensuring we include the homepage
  const allUrls = ["/", ...navUrls, ...docsUrls, ...markdownUrls]

  // Remove duplicates
  const uniqueUrls = Array.from(new Set(allUrls))

  return uniqueUrls.map((url) => {
    // Determine priority based on URL
    let priority = 0.5
    if (url === "/") priority = 1.0
    else if (url === "/docs" || url === "/docs/components") priority = 0.9
    else if (url.startsWith("/docs/components/")) priority = 0.8
    else if (url.startsWith("/docs")) priority = 0.7
    else if (url.startsWith("/blocks") || url === "/themes") priority = 0.8

    // Determine change frequency
    let changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" =
      "weekly"
    if (url === "/") changeFrequency = "daily"
    else if (url.startsWith("/docs/components/")) changeFrequency = "weekly"
    else if (url.startsWith("/blocks")) changeFrequency = "weekly"

    return {
      url: `${baseUrl}${url}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    }
  })
}
