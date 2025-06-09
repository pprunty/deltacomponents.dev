import type { Registry } from "@/registry/schema"

export const layout: Registry = [
  {
    name: "footer",
    type: "registry:component",
    registryDependencies: [],
    files: [
      {
        path: "layout/footer.tsx",
        type: "registry:component",
      },
    ],
  },
]
