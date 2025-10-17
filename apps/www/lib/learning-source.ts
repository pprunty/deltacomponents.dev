import { learning } from "@/.source"
import { loader } from "fumadocs-core/source"

export const learningSource: ReturnType<typeof loader> = loader({
  baseUrl: "/learning",
  source: learning.toFumadocsSource(),
})
