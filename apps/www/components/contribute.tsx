import * as React from "react"
import Link from "next/link"
import {
  BugIcon,
  LightbulbIcon,
  PencilIcon,
  type LucideProps,
} from "lucide-react"

import { getGithubFileUrl, getGitHubIssueUrl } from "@/lib/github"

interface ContributeProps {
  slug: string
}

interface ContributeLink {
  text: string
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >
  href: string
}

export function Contribute({ slug }: ContributeProps) {
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
        text: "Edit this page",
        icon: PencilIcon,
        href: getGithubFileUrl(slug),
      },
    ]
  }, [slug])

  return (
    <div className="flex flex-col gap-2 px-6 pt-0 pb-4 text-sm">
      <p className="text-muted-foreground bg-background sticky top-0 h-6 text-xs">
        Contribute
      </p>
      <div className="flex flex-col gap-2">
        {contributeLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground flex items-center text-[0.8rem] no-underline transition-colors"
          >
            <link.icon className="mr-2 size-3.5" />
            {link.text}
          </Link>
        ))}
      </div>
    </div>
  )
}
