export const siteConfig = {
  name: "Delta Components UI",
  url: "https://deltacomponents.dev",
  ogImage: "https://deltacomponents.dev/og.jpg",
  description:
    "A collection of Open Source components that make the difference in your user experience.",
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
    "Delta Components",
    "UI Components",
    "Agent Components",
  ],
  authors: [
    {
      name: "pprunty",
      url: "https://patrickprunty.com",
    },
  ],
  creator: "pprunty",
  links: {
    twitter: "https://x.com/pprunty_",
    x: "https://patrickprunty.com",
    github: "https://github.com/pprunty/deltacomponents.dev",
  },
  navItems: [
    {
      href: "/docs",
      label: "Docs",
    },
    {
      href: "/docs/components",
      label: "Components",
    },
    {
      href: "/blocks",
      label: "Blocks",
    },
    {
      href: "/themes",
      label: "Themes",
      badge: "new",
    },
    {
      href: "/learning",
      label: "Learn",
      badge: "coming soon",
      disabled: process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production",
      hide: false,
    },
    {
      href: "/templates",
      label: "Templates",
      badge: "coming soon",
      disabled: process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production",
      hide: false,
    },
  ],
  utm: {
    main: "https://deltacomponents.dev?utm_source=ui_delta&utm_medium=web&utm_campaign=growth_experiments_ui_components",
    agents:
      "https://deltacomponents.dev/agents?utm_source=ui_delta&utm_medium=web&utm_campaign=growth_experiments_ui_components",
    sales:
      "https://deltacomponents.dev/contact-sales?utm_source=ui_delta&utm_medium=web&utm_campaign=growth_experiments_ui_components",
  },
}

export const THEME_META_COLORS = {
  default: { light: "#ffffff", dark: "#252525" },
  dublin: { light: "#f5f6eb", dark: "#0b0d6a" },
  kerry: { light: "#fcfcfc", dark: "#1f311f" },
  galway: { light: "#faf9f5", dark: "#444240" },
  kilkenny: { light: "#ffffff", dark: "#161616" },
  wexford: { light: "#f8eec9", dark: "#282828" },
}
