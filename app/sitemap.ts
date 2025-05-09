import { MetadataRoute } from "next"
import { docsConfig } from "@/config/docs"

function getUrlsFromNav(items: typeof docsConfig.sidebarNav): string[] {
  const urls: string[] = []

  // Add main navigation items
  docsConfig.mainNav.forEach((item) => {
    if (item.href) {
      urls.push(item.href)
    }
  })

  // Add sidebar navigation items
  items.forEach((section) => {
    section.items?.forEach((item) => {
      if (item.href) {
        urls.push(item.href)
      }
      // Recursively add nested items
      if (item.items) {
        item.items.forEach((nestedItem) => {
          if (nestedItem.href) {
            urls.push(nestedItem.href)
          }
        })
      }
    })
  })

  return urls
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://deltacomponents.dev.com"

  const urls = getUrlsFromNav(docsConfig.sidebarNav)

  return urls.map((url) => ({
    url: `${baseUrl}${url}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: url === "/" ? 1 : 0.8,
  }))
}