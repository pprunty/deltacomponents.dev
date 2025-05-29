import type { Registry } from "@/registry/schema"

export const landingPage: Registry = [
  {
    name: "mouse-string-connection",
    type: "registry:component",
    registryDependencies: [],
    files: [
      {
        path: "landing-page/mouse-string-connection.tsx",
        type: "registry:component",
      },
    ],
  },
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
