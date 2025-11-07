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
  default: { light: "#ffffff", dark: "#0a0a0a" },
  dublin: { light: "#f6f7eb", dark: "#02060a" },
  clare: { light: "#fdf6e3", dark: "#002b36" },
  neobrutalism: { light: "#fefefe", dark: "#000000" },
  kerry: { light: "#fafafa", dark: "#030800" },
  cork: { light: "#dde8e8", dark: "#02060a" },
  galway: { light: "#faf9f5", dark: "#262624" },
}
