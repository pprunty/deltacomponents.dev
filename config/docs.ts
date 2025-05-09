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
      title: "Inputs",
      href: "/docs/inputs/text-input",
    },
    {
      title: "Blocks",
      href: "/docs/blocks/smart-form",
    },
    {
      title: "Animations",
      href: "/docs/animations/scramble-text",
    },
    {
      title: "Components",
      href: "/docs/components/tabs",
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
          title: "Tabs",
          href: "/docs/components/tabs",
          items: [],
        },
        {
          title: "Modal",
          href: "/docs/components/modal",
          items: [],
        },
        {
          title: "Drawer",
          href: "/docs/components/drawer",
          items: [],
        },
        {
          title: "Code Block",
          href: "/docs/components/code-block",
          items: [],
        },
        {
          title: "Retro Video Player",
          href: "/docs/components/retro-video-player",
          items: [],
          label: "Beta",
        },
      ],
    },
    {
      title: "Inputs",
      items: [
        {
          title: "Text Input",
          href: "/docs/inputs/text-input",
          items: [],
        },
        {
          title: "OTP Input",
          href: "/docs/inputs/otp-input",
          items: [],
        },
        {
          title: "File Input",
          href: "/docs/inputs/file-input",
          items: [],
        },
        {
          title: "Tags Input",
          href: "/docs/inputs/tags-input",
          items: [],
        },
        {
          title: "Textarea Input",
          href: "/docs/inputs/textarea-input",
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
          title: "Checkbox Input",
          href: "/docs/inputs/checkbox-input",
          items: [],
        },
        {
          title: "Radio Input",
          href: "/docs/inputs/radio-input",
          items: [],
        },
        {
          title: "Date Input",
          href: "/docs/inputs/date-input",
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
