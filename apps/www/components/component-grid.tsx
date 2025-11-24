import { source } from "@/lib/source"
import { ComponentCard } from "@/components/component-card"

export function ComponentGrid() {
  const components = source.pageTree.children.find(
    (page) => page.$id === "root:components"
  )

  if (components?.type !== "folder") {
    return
  }

  const list = components.children.filter(
    (component) => component.type === "page"
  )

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {list.map((component) => (
        <ComponentCard key={component.$id} component={component} />
      ))}
    </div>
  )
}