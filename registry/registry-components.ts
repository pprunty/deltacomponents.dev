import type { Registry } from "@/registry/schema"

export const components: Registry = [
  {
    name: "progressive-blur",
    type: "registry:component",
    registryDependencies: [],
    files: [
      {
        path: "components/progressive-blur.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "marquee",
    type: "registry:component",
    registryDependencies: [],
    files: [
      {
        path: "components/marquee.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "dropdown-menu",
    type: "registry:component",
    dependencies: ["motion"],
    registryDependencies: [],
    tags: [
      "dropdown",
      "menu",
      "overlay",
      "popup",
      "animated",
      "accessible",
      "positioning",
      "component",
    ],
    files: [
      {
        path: "components/dropdown-menu.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "social-icons",
    type: "registry:component",
    registryDependencies: [],
    files: [
      {
        path: "components/social-icons.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "pricing-cards",
    type: "registry:component",
    registryDependencies: [],
    files: [
      {
        path: "components/pricing-cards.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "star-rating",
    type: "registry:component",
    tags: ["star", "rating", "feedback", "interactive", "component"],
    registryDependencies: [],
    files: [
      {
        path: "components/star-rating.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "retro-button",
    type: "registry:component",
    tags: ["button", "retro", "ui", "component"],
    registryDependencies: [],
    files: [
      {
        path: "components/retro-button.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "admonition",
    type: "registry:component",
    tags: ["admonition", "alert", "info", "component"],
    dependencies: ["lucide-react"],
    registryDependencies: [],
    files: [
      {
        path: "components/admonition.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "embed",
    type: "registry:component",
    tags: ["embed", "iframe", "media", "component"],
    dependencies: ["lucide-react"],
    registryDependencies: [],
    files: [
      {
        path: "components/embed.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "scroll-progress",
    type: "registry:component",
    tags: ["scroll", "progress", "indicator", "component"],
    dependencies: ["motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/scroll-progress.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "drawer",
    type: "registry:component",
    dependencies: ["vaul", "class-variance-authority"],
    registryDependencies: [],
    tags: [
      "overlay",
      "panel",
      "slide",
      "bottom sheet",
      "dialog",
      "mobile",
      "responsive",
      "component",
    ],
    files: [
      {
        path: "components/drawer.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "modal",
    type: "registry:component",
    dependencies: ["motion", "@phosphor-icons/react"],
    registryDependencies: [],
    tags: [
      "dialog",
      "popup",
      "overlay",
      "animated",
      "accessible",
      "responsive",
      "component",
    ],
    files: [
      {
        path: "components/modal.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "tabs",
    type: "registry:component",
    dependencies: [],
    registryDependencies: ["x-scrollable"],
    tags: [
      "navigation",
      "tabs",
      "interactive",
      "animated",
      "scrollable",
      "content switcher",
      "component",
    ],
    files: [
      {
        path: "components/tabs.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "x-scrollable",
    type: "registry:component",
    tags: [
      "scroll",
      "horizontal",
      "container",
      "utility",
      "layout",
      "component",
    ],
    registryDependencies: [],
    dependencies: [],
    files: [
      {
        path: "components/x-scrollable.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "toast",
    type: "registry:component",
    dependencies: ["sonner"],
    registryDependencies: [],
    tags: [
      "notification",
      "toast",
      "alert",
      "feedback",
      "themed",
      "positioning",
      "accessible",
      "component",
    ],
    files: [
      {
        path: "components/toast.tsx",
        type: "registry:component",
      },
    ],
  },
]
