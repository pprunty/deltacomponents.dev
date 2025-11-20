import { type Registry } from "shadcn/schema"

export const blocks: Registry["items"] = [
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
    name: "perspective-carousel",
    description: "PerspectiveCarousel block",
    type: "registry:block",
    registryDependencies: [],
    files: [
      {
        path: "blocks/perspective-carousel/page.tsx",
        type: "registry:page",
        target: "app/perspective-carousel/page.tsx",
      },
      {
        path: "blocks/perspective-carousel/components/perspective-carousel.tsx",
        type: "registry:component",
        target: "components/perspective-carousel.tsx",
      },
    ],
    meta: {
      iframeHeight: "800px",
      container: " ",
      mobile: "component",
    },
    categories: ["featured"],
  },
  {
    name: "bottom-mobile-nav",
    description: "BottomMobileNav block",
    type: "registry:block",
    registryDependencies: [],
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
    ],
    meta: {
      iframeHeight: "800px",
      container: "",
      mobile: "component",
    },
    categories: ["layout"],
  },
]
