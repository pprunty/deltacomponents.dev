import { type Registry } from "shadcn/schema"

export const blocks: Registry["items"] = [
  {
    name: "ai-chat-sidebar",
    description: "A collapsible sidebar component for AI chat applications",
    type: "registry:block",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "https://deltacomponents.dev/r/scroll-fade-effect.json",
    ],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "blocks/ai-chat-sidebar/components/app-sidebar.tsx",
        type: "registry:component",
        target: "components/app-sidebar.tsx",
      },
      {
        path: "blocks/ai-chat-sidebar/page.tsx",
        type: "registry:page",
        target: "app/page.tsx",
      },
    ],
    meta: {
      iframeHeight: "800px",
      container: "w-full h-screen",
      mobile: "component",
    },
    categories: ["ai-elements"],
  },
  {
    name: "testimonials",
    description: "Customer testimonials grid",
    type: "registry:block",
    registryDependencies: [],
    files: [
      {
        path: "blocks/testimonials/page.tsx",
        type: "registry:page",
        target: "app/testimonials/page.tsx",
      },
      {
        path: "blocks/testimonials/components/testimonials.tsx",
        type: "registry:component",
        target: "components/testimonials.tsx",
      },
    ],
    meta: {
      iframeHeight: "800px",
      container:
        "w-full bg-background min-h-svh flex items-center justify-center",
      mobile: "component",
    },
    categories: ["landing-page"],
  },
  {
    name: "interactive-feature-showcase",
    description: "InteractiveFeatureShowcase block",
    type: "registry:block",
    registryDependencies: [],
    files: [
      {
        path: "blocks/interactive-feature-showcase/page.tsx",
        type: "registry:page",
        target: "app/interactive-feature-showcase/page.tsx",
      },
      {
        path: "blocks/interactive-feature-showcase/components/interactive-feature-showcase.tsx",
        type: "registry:component",
        target: "components/interactive-feature-showcase.tsx",
      },
    ],
    meta: {
      iframeHeight: "800px",
      container: "w-full",
      mobile: "component",
    },
    categories: ["landing-page"],
  },
  {
    name: "chatbot-window",
    description: "Resizable AI chatbot interface with collapsible sidebar",
    type: "registry:block",
    registryDependencies: [
      "button",
      "avatar",
      "select",
      "textarea",
      "resizable",
    ],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "blocks/chatbot-window/page.tsx",
        type: "registry:page",
        target: "app/chatbot-window/page.tsx",
      },
      {
        path: "blocks/chatbot-window/components/chatbot-window.tsx",
        type: "registry:component",
        target: "components/chatbot-window.tsx",
      },
    ],
    meta: {
      iframeHeight: "800px",
      container: "w-full h-screen",
      mobile: "component",
    },
    categories: ["ai-elements", "featured"],
  },
  {
    name: "bottom-mobile-nav",
    description: "BottomMobileNav block",
    type: "registry:block",
    registryDependencies: [],
    dependencies: ["phosphor-react"],
    files: [
      {
        path: "blocks/bottom-mobile-nav/page.tsx",
        type: "registry:page",
        target: "app/bottom-mobile-nav/page.tsx",
      },
      {
        path: "blocks/bottom-mobile-nav/components/bottom-mobile-nav.tsx",
        type: "registry:component",
        target: "components/bottom-mobile-nav.tsx",
      },
      {
        path: "blocks/bottom-mobile-nav/components/sidebar.tsx",
        type: "registry:component",
        target: "components/sidebar.tsx",
      },
    ],
    meta: {
      iframeHeight: "800px",
      container: "",
      mobile: "component",
    },
    categories: ["layout"],
  },
  {
    name: "mapbox-grid-block",
    description:
      "Three-column grid showcasing global locations with Mapbox maps",
    type: "registry:block",
    registryDependencies: ["mapbox-pointer"],
    files: [
      {
        path: "blocks/mapbox-grid-block/page.tsx",
        type: "registry:page",
        target: "app/mapbox-grid-block/page.tsx",
      },
    ],
    meta: {
      iframeHeight: "800px",
      container:
        "w-full bg-background min-h-svh flex items-center justify-center",
      mobile: "component",
    },
    categories: ["landing-page"],
  },
  {
    name: "admin-inset-layout",
    description: "Admin dashboard layout with inset sidebar",
    type: "registry:block",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "collapsible",
      "dropdown-menu",
      "avatar",
      "button",
      "dialog",
      "command",
      "https://deltacomponents.dev/r/scroll-fade-effect.json",
    ],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "blocks/admin-inset-layout/page.tsx",
        type: "registry:page",
        target: "app/admin-inset-layout/page.tsx",
      },
      {
        path: "blocks/admin-inset-layout/components/app-sidebar.tsx",
        type: "registry:component",
        target: "components/app-sidebar.tsx",
      },
      {
        path: "blocks/admin-inset-layout/components/app-header.tsx",
        type: "registry:component",
        target: "components/app-header.tsx",
      },
      {
        path: "blocks/admin-inset-layout/components/nav-main.tsx",
        type: "registry:component",
        target: "components/nav-main.tsx",
      },
      {
        path: "blocks/admin-inset-layout/components/nav-projects.tsx",
        type: "registry:component",
        target: "components/nav-projects.tsx",
      },
      {
        path: "blocks/admin-inset-layout/components/nav-resources.tsx",
        type: "registry:component",
        target: "components/nav-resources.tsx",
      },
      {
        path: "blocks/admin-inset-layout/components/nav-secondary.tsx",
        type: "registry:component",
        target: "components/nav-secondary.tsx",
      },
      {
        path: "blocks/admin-inset-layout/components/nav-user.tsx",
        type: "registry:component",
        target: "components/nav-user.tsx",
      },
      {
        path: "blocks/admin-inset-layout/components/search-command.tsx",
        type: "registry:component",
        target: "components/search-command.tsx",
      },
    ],
    meta: {
      iframeHeight: "800px",
      container: "",
      mobile: "component",
    },
    categories: ["layout"],
  },
  {
    name: "saas-header-layout",
    description: "SaaS header layout with navigation menu",
    type: "registry:block",
    registryDependencies: ["button", "navigation-menu"],
    files: [
      {
        path: "blocks/saas-header-layout/page.tsx",
        type: "registry:page",
        target: "app/saas-header-layout/page.tsx",
      },
      {
        path: "blocks/saas-header-layout/components/site-header.tsx",
        type: "registry:component",
        target: "components/site-header.tsx",
      },
      {
        path: "blocks/saas-header-layout/components/site-layout.tsx",
        type: "registry:component",
        target: "components/site-layout.tsx",
      },
    ],
    meta: {
      iframeHeight: "600px",
      container: "",
      mobile: "component",
    },
    categories: ["featured", "layout"],
  },
  {
    name: "saas-dashboard",
    description: "SaaS dashboard with inset sidebar and navigation",
    type: "registry:block",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "collapsible",
      "dropdown-menu",
      "avatar",
      "button",
      "dialog",
      "command",
      "https://deltacomponents.dev/r/scroll-fade-effect.json",
    ],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "blocks/saas-dashboard/page.tsx",
        type: "registry:page",
        target: "app/saas-dashboard/page.tsx",
      },
      {
        path: "blocks/saas-dashboard/components/app-sidebar.tsx",
        type: "registry:component",
        target: "components/app-sidebar.tsx",
      },
      {
        path: "blocks/saas-dashboard/components/nav-main.tsx",
        type: "registry:component",
        target: "components/nav-main.tsx",
      },
      {
        path: "blocks/saas-dashboard/components/nav-projects.tsx",
        type: "registry:component",
        target: "components/nav-projects.tsx",
      },
      {
        path: "blocks/saas-dashboard/components/nav-resources.tsx",
        type: "registry:component",
        target: "components/nav-resources.tsx",
      },
      {
        path: "blocks/saas-dashboard/components/nav-secondary.tsx",
        type: "registry:component",
        target: "components/nav-secondary.tsx",
      },
      {
        path: "blocks/saas-dashboard/components/nav-user.tsx",
        type: "registry:component",
        target: "components/nav-user.tsx",
      },
      {
        path: "blocks/saas-dashboard/components/search-command.tsx",
        type: "registry:component",
        target: "components/search-command.tsx",
      },
    ],
    meta: {
      iframeHeight: "800px",
      container: "",
      mobile: "component",
    },
    categories: ["dashboard"],
  },
]
