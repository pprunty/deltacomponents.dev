/* NOTE: to hide component in production: hide: process.env.NODE_ENV === "production" */
import type { MainNavItem, SidebarNavItem } from "@/types/nav"

export interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Components",
      href: "/docs/components",
    },
    {
      title: "Get Started",
      href: "/docs/introduction",
    },
    {
      title: "Blocks",
      href: "/docs/blocks/smart-form",
    },
    {
      title: "Media",
      href: "/docs/media/retro-video-player",
    },
    {
      title: "Landing Page",
      href: "/docs/landing-page/highlighter",
    },
    {
      title: "Inputs",
      href: "/docs/inputs/text-input",
    },
    {
      title: "Animations",
      href: "/docs/animations/scramble-text",
    },
    {
      title: "Layout",
      href: "/docs/layout/footer",
    },
  ],
  sidebarNav: [
    {
      title: "Get Started",
      items: [
        {
          title: "Introduction",
          href: "/docs/introduction",
          items: [],
        },
        {
          title: "Installation",
          href: "/docs/installation",
          items: [],
        },
        {
          title: "Components",
          href: "/docs/components",
          items: [],
        },
        {
          title: "llms.txt",
          href: "/llms.txt",
          items: [],
          label: "New",
        },
      ],
    },
    {
      title: "Blocks",
      items: [
        {
          title: "Smart Form (zod)",
          href: "/docs/blocks/smart-form",
          items: [],
        },
      ],
    },
    {
      title: "Components",
      items: [
        {
          title: "Admonition",
          href: "/docs/components/admonition",
          items: [],
        },
        {
          title: "Dropdown Menu",
          href: "/docs/components/dropdown-menu",
          items: [],
          label: "New",
        },
        {
          title: "Drawer",
          href: "/docs/components/drawer",
          items: [],
        },
        {
          title: "Embed",
          href: "/docs/components/embed",
          items: [],
        },
        {
          title: "Marquee",
          href: "/docs/components/marquee",
          items: [],
          label: "New",
        },
        {
          title: "Modal",
          href: "/docs/components/modal",
          items: [],
        },
        {
          title: "Progressive Blur",
          href: "/docs/components/progressive-blur",
          items: [],
          label: "New",
        },
        {
          title: "Scroll Progress",
          href: "/docs/components/scroll-progress",
          items: [],
        },
        {
          title: "Social Icons",
          href: "/docs/components/social-icons",
          items: [],
          hide: true,
        },
        {
          title: "Star Rating",
          href: "/docs/components/star-rating",
          items: [],
          hide: true,
        },
        {
          title: "Tabs",
          href: "/docs/components/tabs",
          items: [],
        },
        {
          title: "Toast",
          href: "/docs/components/toast",
          items: [],
          label: "New",
          hide: process.env.NODE_ENV === "production",
        },
        {
          title: "Pricing Cards",
          href: "/docs/components/pricing-cards",
          items: [],
          hide: true,
        },
      ],
    },
    {
      title: "Media",
      items: [
        {
          title: "Backdrop Gradient",
          href: "/docs/media/backdrop-gradient",
          items: [],
          label: "Beta",
          hide: true,
        },
        {
          title: "Code Snippet",
          href: "/docs/media/code-snippet",
          items: [],
        },
        {
          title: "LaTeX",
          href: "/docs/media/latex",
          items: [],
        },
        {
          title: "Retro Video Player",
          href: "/docs/media/retro-video-player",
          items: [],
          label: "Beta",
          hide: process.env.NODE_ENV === "production",
        },
        {
          title: "Spotify",
          href: "/docs/media/spotify",
          items: [],
        },
        {
          title: "QR Code",
          href: "/docs/media/qr-code",
          items: [],
        },
        {
          title: "Cambio Image",
          href: "/docs/media/cambio-image",
          items: [],
          label: "New",
        },
        {
          title: "YouTube",
          href: "/docs/media/youtube",
          items: [],
        },
      ],
    },
    {
      title: "Landing Page",
      items: [
        {
          title: "Highlighter Text",
          href: "/docs/landing-page/highlighter",
          items: [],
          label: "New",
        },
        {
          title: "Mouse String Connection",
          href: "/docs/landing-page/mouse-string-connection",
          items: [],
          label: "New",
        },
      ],
    },
    {
      title: "Animations",
      items: [
        {
          title: "Scramble Text",
          href: "/docs/animations/scramble-text",
          items: [],
        },
        {
          title: "Floating Object",
          href: "/docs/animations/floating-object",
          label: "Beta",
          items: [],
        },
        {
          title: "Font Transform",
          href: "/docs/animations/font-transform",
          items: [],
        },
        {
          title: "Animate In",
          href: "/docs/animations/animate-in",
          label: "Beta",
          items: [],
        },
      ],
    },
    {
      title: "Layout",
      items: [
        {
          title: "Footer (Simple)",
          href: "/docs/layout/footer",
          items: [],
          hide: process.env.NODE_ENV === "production",
        },
        {
          title: "Header (Sleek)",
          href: "/docs/layout/header-sleek",
          items: [],
          label: "Beta",
          hide: process.env.NODE_ENV === "production",
        },
        {
          title: "Bottom Bar",
          href: "/docs/layout/bottom-bar",
          items: [],
          label: "New",
        },
      ],
    },
    {
      title: "Inputs",
      items: [
        {
          title: "Checkbox Input",
          href: "/docs/inputs/checkbox-input",
          items: [],
        },
        {
          title: "Date Input",
          href: "/docs/inputs/date-input",
          items: [],
        },
        {
          title: "File Input",
          href: "/docs/inputs/file-input",
          items: [],
        },
        {
          title: "OTP Input",
          href: "/docs/inputs/otp-input",
          items: [],
        },
        {
          title: "Radio Input",
          href: "/docs/inputs/radio-input",
          items: [],
        },
        {
          title: "Select Input",
          href: "/docs/inputs/select-input",
          items: [],
        },
        {
          title: "Switch Input",
          href: "/docs/inputs/switch-input",
          items: [],
        },
        {
          title: "Tags Input",
          href: "/docs/inputs/tags-input",
          items: [],
        },
        {
          title: "Text Input",
          href: "/docs/inputs/text-input",
          items: [],
        },
        {
          title: "Textarea Input",
          href: "/docs/inputs/textarea-input",
          items: [],
        },
      ],
    },
  ],
}

/**
 * Creates a mapping of component names to their corresponding category paths
 * This avoids recomputing the category for each component lookup
 */
export function createComponentToCategory(): Record<string, string> {
  const mapping: Record<string, string> = {}

  // Process each section in the sidebar navigation
  docsConfig.sidebarNav.forEach((section) => {
    // Skip the "Get Started" section as it doesn't contain components
    if (section.title === "Get Started") return

    // Format the category name for URL path (lowercase, replace spaces with hyphens)
    const categoryPath = section.title.toLowerCase().replace(/ /g, "-")

    // Process each item in this section
    section.items.forEach((item) => {
      if (item.href) {
        // Extract the component name from the href
        // The format is typically /docs/category/component-name
        const parts = item.href.split("/")
        const componentName = parts[parts.length - 1]

        // Add to the mapping
        mapping[componentName] = categoryPath
      }
    })
  })

  return mapping
}

// Create the mapping once at import time for efficiency
export const componentToCategory = createComponentToCategory()
