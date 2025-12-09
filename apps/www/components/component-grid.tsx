import { source } from "@/lib/source"
import { ComponentCard } from "@/components/component-card"
import { Index } from "@/registry/__index__"

export function ComponentGrid() {
  const components = source.pageTree.children.find(
    (page) => page.$id === "root:components"
  )

  if (components?.type !== "folder") {
    return null
  }

  // Check if in production
  const isProduction = process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production"

  const list = components.children.filter(
    (component) => {
      if (component.type !== "page") return false

      // Check if component should be hidden
      const componentName = component.url.split('/').pop()
      const componentMeta = componentName ? Index[componentName]?.meta : null
      const shouldHide = componentMeta?.hide && isProduction

      return !shouldHide
    }
  )

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {list.map((component) => (
        <ComponentCard key={component.$id} component={component} />
      ))}
    </div>
  )
}