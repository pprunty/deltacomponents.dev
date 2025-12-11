import { Metadata } from "next"
import Link from "next/link"

import { Announcement } from "@/components/announcement"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { TemplateGrid } from "@/components/templates/template-grid"
import { Button } from "@/registry/delta-ui/ui/button"

const title = "Production-Ready Templates"
const description =
  "Complete starter templates for your next project. Built with Delta Components and ready to deploy. Copy, paste, and ship faster."

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          title
        )}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          title
        )}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
}

export default function TemplatesPage() {
  return (
    <>
      <PageHeader>
        <Announcement />
        <PageHeaderHeading>{title}</PageHeaderHeading>
        <PageHeaderDescription>{description}</PageHeaderDescription>
        <PageActions>
          <Button asChild size="sm">
            <a href="#templates">Browse Templates</a>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/docs">Documentation</Link>
          </Button>
        </PageActions>
      </PageHeader>
      <div id="templates" className="container-wrapper section-soft flex-1 md:py-12">
        <div className="container">
          <TemplateGrid />
        </div>
      </div>
    </>
  )
}
