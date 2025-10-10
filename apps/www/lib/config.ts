export const siteConfig = {
  name: "Delta Components UI",
  url: "https://ui.delta.io",
  ogImage: "https://ui.delta.io/og.jpg",
  description:
    "A collection of Open Source agent and audio components that you can customize, extend, and build on.",
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
      href: "/templates",
      label: "Templates",
      badge: "new",
      hide: process.env.NODE_ENV === "production",
    },
    {
      href: "/themes",
      label: "Themes",
    },
  ],
  utm: {
    main: "https://delta.io?utm_source=ui_delta&utm_medium=web&utm_campaign=growth_experiments_ui_components",
    agents:
      "https://delta.io/agents?utm_source=ui_delta&utm_medium=web&utm_campaign=growth_experiments_ui_components",
    sales:
      "https://delta.io/contact-sales?utm_source=ui_delta&utm_medium=web&utm_campaign=growth_experiments_ui_components",
  },
}

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#13120a",
}
