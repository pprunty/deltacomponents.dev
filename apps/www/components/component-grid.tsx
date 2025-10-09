import Image from "next/image"
import Link from "next/link"

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
        <Link key={component.$id} href={component.url} className="group">
          {list.indexOf(component) === 0 ? (
            <Card className="hover:hover:bg-accent/50 relative h-48 overflow-hidden border-0 p-0 transition-colors md:h-40">
              <video
                src="https://fancycomponents.b-cdn.net/demos/marquee-along-svg-path.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute top-2 right-2 rounded bg-black/40 px-2 py-1">
                <span className="text-[13px] font-medium text-white">
                  {component.name}
                </span>
              </div>
            </Card>
          ) : (
            <Card className="hover:hover:bg-accent/50 relative h-48 overflow-hidden border-0 p-0 transition-colors md:h-40">
              <Image
                src="/placeholder.jpeg"
                alt={String(component.name) || "Component"}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2 rounded bg-black/40 px-2 py-1">
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
