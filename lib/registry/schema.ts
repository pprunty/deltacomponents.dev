export type ComponentPreview = {
  name: string
  description: string
  dependencies: string[]
  registryDependencies: string[]
  files: string[]
  type: "components" | "examples"
  category: string
  subcategory: string
  example: string
  style: "default" | "neobrutalism"
} 