export const siteConfig = {
  name: "Delta Components UI",
  url: "https://deltacomponents.dev",
  ogImage: "https://deltacomponents.dev/og.jpg",
  description:
    "A collection of Open Source agent and audio components that you can customize, extend, and build on.",
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
    x: "https://x.com/pprunty_",
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
      disabled: false, // Set to true when ready to disable in production
    },
    {
      href: "/templates",
      label: "Templates",
      badge: "coming soon",
      disabled: false, // Set to true when ready to disable in production
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

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#13120a",
}
