import type { Registry } from "@/registry/schema"

export const layout: Registry = [
  {
    name: "header-sleek",
    type: "registry:component",
    registryDependencies: [],
    files: [
      {
        path: "layout/header-sleek.tsx",
        type: "registry:component",
      },
    ],
  },
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
  {
    name: "bottom-bar",
    type: "registry:component",
    registryDependencies: [],
    files: [
      {
        path: "layout/bottom-bar.tsx",
        type: "registry:component",
      },
    ],
    dependencies: ["@phosphor-icons/react", "clsx", "motion"],
  },
]
