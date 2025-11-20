import { source } from "@/lib/source"
import { ComponentCard } from "@/components/component-card"
import { Index } from "@/registry/__index__"

export function ComponentGrid() {
  const components = source.pageTree.children.find(
    (page) => page.$id === "components"
  )

  if (components?.type !== "folder") {
    return
  }

  const list = components.children.filter(
    (component) => {
      if (component.type !== "page") return false
      
      // Extract component name from URL or $id
      const componentName = component.url?.split('/').pop() || component.$id?.replace('.mdx', '')
      const componentMeta = componentName ? Index[componentName]?.meta : null
      
      // Hide components that are disabled in production
      const isDisabledInProd = componentMeta?.disabled && (process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production")
      
      // Also check for hide flag from MDX frontmatter
      const isHiddenInProd = (component as { hide?: boolean }).hide && (process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production")
      
      return !isDisabledInProd && !isHiddenInProd
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
