import Link from "next/link"
import Image from "next/image"

import { source } from "@/lib/source"
import { Card } from "@/registry/delta-ui/ui/card"

export function ComponentGrid() {
  const components = source.pageTree.children.find(
    (page) => page.$id === "components"
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
        <Link
          key={component.$id}
          href={component.url}
          className="group"
        >
          {list.indexOf(component) === 0 ? (
            <Card className="relative h-48 md:h-40 transition-colors hover:bg-accent/50 border-0 overflow-hidden p-0">
              <video
                src="https://fancycomponents.b-cdn.net/demos/marquee-along-svg-path.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover absolute inset-0"
              />
              <div className="absolute top-2 right-2 bg-black/40 px-2 py-1 rounded">
                <span className="text-[13px] font-medium text-white">
                  {component.name}
                </span>
              </div>
            </Card>
          ) : (
            <Card className="relative h-48 md:h-40 transition-colors hover:bg-accent/50 border-0 overflow-hidden p-0">
              <Image
                src="/placeholder.jpeg"
                alt={String(component.name) || "Component"}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2 bg-black/40 px-2 py-1 rounded">
                <span className="text-[13px] font-medium text-white">
                  {component.name}
                </span>
              </div>
            </Card>
          )}
        </Link>
      ))}
    </div>
  )
}
