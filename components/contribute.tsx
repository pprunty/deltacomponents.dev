"use client"

import * as React from "react"
import Link from "next/link"
import {
  BugIcon,
  LightbulbIcon,
  MailIcon,
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
        text: "Share feedback",
        icon: MailIcon,
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
      <div className="space-y-2">
        <p className="font-medium text-xs md:text-sm">Contribute</p>
        <ul className="m-0 list-none">
          {contributeLinks.map((link, index) => (
            <li key={index} className="mt-0 pt-2">
              {link.href ? (
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs md:text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <link.icon className="mr-2 size-3.5" />
                  {link.text}
                </Link>
              ) : (
                <button
                  onClick={link.onClick}
                  className="inline-flex items-center text-xs md:text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <link.icon className="mr-2 size-3.5" />
                  {link.text}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      <FeedbackDialog open={feedbackOpen} onOpenChange={setFeedbackOpen} />
    </>
  )
}
