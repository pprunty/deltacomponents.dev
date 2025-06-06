import type { Registry } from "@/registry/schema"

export const blocks: Registry = [
  {
    name: "smart-form",
    type: "registry:block",
    dependencies: ["zod", "utils"],
    registryDependencies: [
      "text-input",
      "checkbox-input",
      "select-input",
      "radio-input",
      "switch-input",
      "textarea-input",
      "date-input",
      "file-input",
      "otp-input",
      "tags-input",
    ],
    tags: [
      "form",
      "dynamic",
      "smart",
      "validation",
      "reactive",
      "data collection",
      "AI",
      "block",
    ],
    files: [
      {
        path: "blocks/smart-form.tsx",
        type: "registry:block",
      },
    ],
  },
]
