import type React from "react"
 // This file will serve as our component registry

 // Import components directly
 import ShareButtonDemo from "@/delta/components/share-button-demo"
import AccordionDemo from "@/delta/components/accordion-demo"
import AccordionNeobrutalismDemo from "@/delta/examples/accordion-neobrutalism-demo"

 // Create a registry object that maps component names to their implementations
 export const registry: Record<string, { component: React.ComponentType }> = {
   "share-button": {
    component: ShareButtonDemo,
  },
 ,
  "accordion": {
    component: AccordionDemo,
  },
  "accordion-neobrutalism": {
    component: AccordionNeobrutalismDemo,
  },}
 