import fs from "fs"
import path from "path"
import { UnistNode, UnistTree } from "types/unist"
import { u } from "unist-builder"
import { visit } from "unist-util-visit"

import { Index } from "../__registry__"

export function rehypeComponent() {
  return async (tree: UnistTree) => {
    visit(tree, (node: UnistNode) => {
      // src prop overrides both name and fileName.
      const { value: srcPath } =
        (getNodeAttributeByName(node, "src") as {
          name: string
          value?: string
          type?: string
        }) || {}

      if (node.name === "ComponentSource") {
        const name = getNodeAttributeByName(node, "name")?.value as string
        const fileName = getNodeAttributeByName(node, "fileName")?.value as
          | string
          | undefined

        if (!name && !srcPath) {
          return null
        }

        try {
          let src: string

          if (srcPath) {
            src = path.join(process.cwd(), srcPath)
          } else {
            const component = Index[name]
            if (!component || !component.files || !Array.isArray(component.files) || component.files.length === 0) {
              console.warn(`Component ${name} not found in registry or has no files defined`)
              return null
            }
            
            src = fileName
              ? component.files.find((file: unknown) => {
                  if (typeof file === "string") {
                    return (
                      file.endsWith(`${fileName}.tsx`) ||
                      file.endsWith(`${fileName}.ts`)
                    )
                  }
                  return false
                }) || component.files[0]?.path
              : component.files[0]?.path
          }

          if (!src) {
            console.warn(`Source file not found for component ${name}`)
            return null
          }

          // Read the source file.
          const filePath = src
          let source = fs.readFileSync(filePath, "utf8")

          source = source.replaceAll(`@/registry/hooks/`, "@/hooks/")
          source = source.replaceAll("export default", "export")

          // Add code as children so that rehype can take over at build time.
          node.children?.push(
            u("element", {
              tagName: "pre",
              properties: {
                __src__: src,
              },
              children: [
                u("element", {
                  tagName: "code",
                  properties: {
                    className: ["language-tsx"],
                  },
                  children: [
                    {
                      type: "text",
                      value: source,
                    },
                  ],
                }),
              ],
            })
          )
        } catch (error) {
          console.error(error)
        }
      }
      if (node.name === "ComponentPreview") {
        const name = getNodeAttributeByName(node, "name")?.value as string

        if (!name) {
          return null
        }

        try {
          const component = Index[name]
          if (!component || !component.files || !Array.isArray(component.files) || component.files.length === 0) {
            console.warn(`Component ${name} not found in registry or has no files defined`)
            return null
          }
          
          const src = component.files[0]?.path

          if (!src) {
            console.warn(`Source file not found for component ${name}`)
            return null
          }

          // Read the source file.
          const filePath = src
          let source = fs.readFileSync(filePath, "utf8")

          source = source.replaceAll("@/registry/hooks/", "@/hooks/")
          source = source.replaceAll("export default", "export")

          // Add code as children so that rehype can take over at build time.
          node.children?.push(
            u("element", {
              tagName: "pre",
              properties: {
                __src__: src,
              },
              children: [
                u("element", {
                  tagName: "code",
                  properties: {
                    className: ["language-tsx"],
                  },
                  children: [
                    {
                      type: "text",
                      value: source,
                    },
                  ],
                }),
              ],
            })
          )
        } catch (error) {
          console.error(error)
        }
      }
    })
  }
}

function getNodeAttributeByName(node: UnistNode, name: string) {
  return node.attributes?.find((attribute) => attribute.name === name)
}
