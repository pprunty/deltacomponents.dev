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
      <InstallationTabs
        name={name}
        dependencies={dependencies}
        componentSourceElement={<ComponentSource name={name} title={title} />}
      />
    </div>
  )
}
