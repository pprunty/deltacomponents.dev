export const siteConfig = {
  name: "Delta Components",
  url: "https://deltacomponents.dev",
  ogImage: "https://deltacomponents.dev/icon.webp",
  description:
    "A collection of modern, high-performance, and customizable React components.",
  links: {
    twitter: "https://twitter.com/pprunty_",
    github: "https://github.com/pprunty/deltacomponents.dev",
  },
  showTemplates: process.env.NODE_ENV !== "production",
}

export type SiteConfig = typeof siteConfig

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
}
