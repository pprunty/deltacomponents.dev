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
      title: "Component Showcase",
      href: "/docs/components"
    },
    {
      title: "Getting Started",
      href: "/docs/introduction",
    },
    {
      title: "Blocks",
      href: "/docs/blocks/smart-form",
    },
    {
      title: "Components",
      href: "/docs/components/tabs",
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
  ],
  sidebarNav: [
    {
      title: "Getting Started",
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
          title: "Changelog",
          href: "/docs/changelog",
          items: [],
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
          title: "Drawer",
          href: "/docs/components/drawer",
          items: [],
        },
        {
          title: "Modal",
          href: "/docs/components/modal",
          items: [],
        },
        {
          title: "Tabs",
          href: "/docs/components/tabs",
          items: [],
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
        },
        {
          title: "Code Block",
          href: "/docs/media/code-block",
          items: [],
        },
        {
          title: "Retro Video Player",
          href: "/docs/media/retro-video-player",
          items: [],
          label: "Beta",
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
    {
      title: "Animations",
      items: [
        {
          title: "Scramble Text",
          href: "/docs/animations/scramble-text",
          label: "New",
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
  docsConfig.sidebarNav.forEach(section => {
    // Skip the "Getting Started" section as it doesn't contain components
    if (section.title === "Getting Started") return
    
    // Format the category name for URL path (lowercase, replace spaces with hyphens)
    const categoryPath = section.title.toLowerCase().replace(/ /g, "-")
    
    // Process each item in this section
    section.items.forEach(item => {
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

