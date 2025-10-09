import * as React from "react"

import { ComponentSource } from "@/components/component-source"
import { InstallationTabs } from "@/components/installation-tabs"

interface InstallationProps {
  /** The name of the component */
  name: string
  /** Optional dependencies to install */
  dependencies?: string[]
  /** File path for the component source */
  title?: string
}

export function Installation({
  name,
  dependencies,
  title = `components/ui/${name}.tsx`,
}: InstallationProps) {
  return (
    <div className="installation-section">
      <h2 className="font-heading mt-8 scroll-m-28 text-xl font-medium tracking-tight first:mt-0 lg:mt-8 [&+p]:!mt-4 *:[code]:text-xl">
        Installation
      </h2>
      
      <InstallationTabs
        name={name}
        dependencies={dependencies}
        componentSourceElement={<ComponentSource name={name} title={title} />}
      />
    </div>
  )
}