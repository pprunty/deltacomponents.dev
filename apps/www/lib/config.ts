export const siteConfig = {
  name: "Delta Components UI",
  url: "https://deltacomponents.dev",
  ogImage: "https://deltacomponents.dev/og.jpg",
  description:
    "Custom shadcn registry with production-ready React components. Built on shadcn/ui, featuring advanced components for AI chat, interactive media, and modern UX patterns. Copy, paste, and own the code.",
  showComponentBetaBadges: true,
  keywords: [
    "shadcn",
    "shadcn ui",
    "shadcn registry",
    "custom shadcn registry",
    "shadcn components",
    "delta components",
    "delta shadcn",
    "react components",
    "tailwind components",
    "ui components",
    "ai components",
    "chat components",
    "Next.js",
    "React",
    "Tailwind CSS",
    "TypeScript",
    "Radix UI",
    "copy paste components",
    "open source components",
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
      disabled:
        process.env.VERCEL_ENV === "production" ||
        process.env.NODE_ENV === "production",
      hide: false,
    },
    {
      href: "/templates",
      label: "Templates",
      badge: "coming soon",
      disabled:
        process.env.VERCEL_ENV === "production" ||
        process.env.NODE_ENV === "production",
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
  dublin: { light: "#f5f6eb", dark: "#0b0d6a" },
  kerry: { light: "#fcfcfc", dark: "#010600" },
  galway: { light: "#faf9f5", dark: "#262624" },
  kilkenny: { light: "#d6d3ce", dark: "#1a1918" },
  wexford: { light: "#ede3c0", dark: "#32302f" },
  limerick: { light: "#f9f7f1", dark: "#201a13" },
}
