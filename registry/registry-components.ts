import type { Registry } from "@/registry/schema"

export const components: Registry = [
  {
    name: "drawer",
    type: "registry:component",
    dependencies: ["vaul", "class-variance-authority"],
    registryDependencies: [],
    tags: ["overlay", "panel", "slide", "bottom sheet", "dialog", "mobile", "responsive"],
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
    dependencies: ["framer-motion", "@phosphor-icons/react"],
    registryDependencies: [],
    tags: ["dialog", "popup", "overlay", "animated", "accessible", "responsive"],
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
    tags: ["navigation", "tabs", "interactive", "animated", "scrollable", "content switcher"],
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
    dependencies: [],
    registryDependencies: [],
    tags: ["scroll", "horizontal", "container", "utility", "overflow", "layout"],
    files: [
      {
        path: "components/x-scrollable.tsx",
        type: "registry:component",
      },
    ],
  },
]
