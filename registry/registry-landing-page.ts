import type { Registry } from "@/registry/schema"

export const landingPage: Registry = [
  {
    name: "highlighter",
    type: "registry:component",
    tags: ["highlight", "text", "landing", "animation", "component"],
    registryDependencies: [],
    files: [
      {
        path: "landing-page/highlighter.tsx",
        type: "registry:component",
      },
    ],
  },
]
