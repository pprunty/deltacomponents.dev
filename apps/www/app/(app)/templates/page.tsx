import { Metadata } from "next"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { TemplateGrid } from "@/components/templates/template-grid"

export const metadata: Metadata = {
  title: "Templates",
  description:
    "Ready-to-use templates built with Delta Components UI components.",
}

export default function TemplatesPage() {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Templates</PageHeaderHeading>
        <PageHeaderDescription>
          Ready-to-use templates built with Delta Components UI components. Choose from Blog, AI Chat Interface, Dashboard, and Landing Page templates. Copy the install command and customize for your needs.
        </PageHeaderDescription>
      </PageHeader>
      <div className="container-wrapper section-soft flex-1 md:py-12">
        <div className="container">
          <TemplateGrid />
        </div>
      </div>
    </>
  )
}
