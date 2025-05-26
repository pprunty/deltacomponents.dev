import { NextResponse } from "next/server"

import { siteConfig } from "@/config/site"

export const revalidate = 3600 // Revalidate every hour

export async function GET() {
  try {
    // Extract owner and repo from the GitHub URL
    const githubUrl = siteConfig.links.github
    const urlParts = githubUrl.split("/")
    const owner = urlParts[urlParts.length - 2]
    const repo = urlParts[urlParts.length - 1]

    // Fetch releases from GitHub API
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/releases`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          // Add token if you have one to avoid rate limiting
          // 'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        },
        next: { revalidate },
      }
    )

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`)
    }

    const releases = await response.json()

    // Format the releases for display in MDX
    const changelogContent = releases.map((release: any) => {
      const publishDate = new Date(release.published_at)
      const date = publishDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      })

      return {
        version: release.tag_name,
        date,
        title: release.name || release.tag_name,
        body: release.body || "No description provided",
        url: release.html_url,
      }
    })

    return NextResponse.json(changelogContent)
  } catch (error) {
    console.error("Error fetching changelog:", error)
    return NextResponse.json(
      { error: "Failed to fetch changelog" },
      { status: 500 }
    )
  }
}
