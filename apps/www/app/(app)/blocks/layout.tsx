import { Metadata } from "next"
import Link from "next/link"

import { Announcement } from "@/components/announcement"
import { BlocksNav } from "@/components/blocks-nav"
import { Icons } from "@/components/icons"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Button } from "@/registry/delta-ui/ui/button"

const title = "Production-Ready UI Blocks"
const description =
  "Pre-built sections for landing pages, AI interfaces, and layouts. Each block is production-ready and fully customizable. Copy the code, drop it in your project, and ship faster."

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

export default function BlocksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <PageHeader>
        <Announcement />
        <PageHeaderHeading>{title}</PageHeaderHeading>
        <PageHeaderDescription>{description}</PageHeaderDescription>
        <PageActions>
          <Button asChild size="sm">
            <a href="#blocks">Browse Blocks</a>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <a
              href="https://github.com/pprunty/deltacomponents.dev/issues/new?assignees=&labels=block-request%2Cenhancement&projects=&template=block_request.md&title=%5Bblock%5D%3A+"
              target="_blank"
              rel="noopener noreferrer"
            >
              Request a Block
            </a>
          </Button>
        </PageActions>
      </PageHeader>
      <div id="blocks" className="border-grid scroll-mt-24">
        <div className="container-wrapper">
          <div className="container flex items-center py-4">
            <BlocksNav />
          </div>
        </div>
      </div>
      <div className="container-wrapper flex-1">{children}</div>
    </>
  )
}
