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
]
