"use client"

import * as React from "react"
import Link from "next/link"
import {
  BugIcon,
  LightbulbIcon,
  MessageSquareIcon,
  PencilIcon,
  type LucideProps,
} from "lucide-react"

import { getGithubFileUrl, getGitHubIssueUrl } from "@/lib/github"
import { FeedbackDialog } from "@/components/feedback-dialog"

interface ContributeProps {
  slug: string
}

interface ContributeLink {
  text: string
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >
  href?: string
  onClick?: () => void
}

export function Contribute({ slug }: ContributeProps) {
  const [feedbackOpen, setFeedbackOpen] = React.useState(false)

  // Extract component name from slug (e.g., "/docs/components/button" -> "button")
  const componentName = React.useMemo(() => {
    const parts = slug.split("/")
    return parts[parts.length - 1] || ""
  }, [slug])

  const contributeLinks = React.useMemo<ContributeLink[]>(() => {
    return [
      {
        text: "Report an issue",
        icon: BugIcon,
        href: getGitHubIssueUrl({
          title: `[bug]: ${slug === "/docs" ? "/docs/index" : slug}`,
          labels: ["bug", "documentation"],
          template: "bug_report.md",
        }),
      },
      {
        text: "Request a feature",
        icon: LightbulbIcon,
        href: getGitHubIssueUrl({
          title: `[feat]: ${slug === "/docs" ? "/docs/index" : slug}`,
          labels: ["enhancement"],
          template: "feature_request.md",
        }),
      },
      {
        text: "Provide feedback",
        icon: MessageSquareIcon,
        onClick: () => setFeedbackOpen(true),
      },
      {
        text: "Edit this page",
        icon: PencilIcon,
        href: getGithubFileUrl(slug),
      },
    ]
  }, [slug])

  return (
    <>
      <div className="flex flex-col gap-2 px-6 pt-0 pb-4 text-sm">
        <p className="text-muted-foreground bg-background sticky top-0 h-6 text-xs">
          Contribute
        </p>
        <div className="flex flex-col gap-2">
          {contributeLinks.map((link, index) =>
            link.onClick ? (
              <button
                key={index}
                onClick={link.onClick}
                className="text-muted-foreground hover:text-foreground flex items-center text-left text-[0.8rem] no-underline transition-colors"
              >
                <link.icon className="mr-2 size-3.5" />
                {link.text}
              </button>
            ) : (
              <Link
                key={index}
                href={link.href!}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground flex items-center text-[0.8rem] no-underline transition-colors"
              >
                <link.icon className="mr-2 size-3.5" />
                {link.text}
              </Link>
            )
          )}
        </div>
      </div>
      <FeedbackDialog
        open={feedbackOpen}
        onOpenChange={setFeedbackOpen}
        defaultComponent={componentName}
      />
    </>
  )
}
