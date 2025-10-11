import { MetadataRoute } from "next"

import { siteConfig } from "@/lib/config"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://deltacomponents.dev.com"

  const urls = siteConfig.navItems.map(item => item.href)

  return urls.map((url) => ({
    url: `${baseUrl}${url}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: url === "/" ? 1 : 0.8,
  }))
}