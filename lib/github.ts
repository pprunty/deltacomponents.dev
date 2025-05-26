interface GitHubIssueUrlParams {
  title?: string
  body?: string
  labels?: string[]
  template?: string
}

export function getGitHubIssueUrl(params: GitHubIssueUrlParams): string {
  const baseUrl = `https://github.com/pprunty/deltacomponents.dev/issues/new`
  const urlParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => urlParams.append(key, item))
    } else if (value !== undefined) {
      urlParams.append(key, value.toString())
    }
  })

  return `${baseUrl}?${urlParams.toString()}`
}

export function getGithubFileUrl(slug: string) {
  return `https://github.com/pprunty/deltacomponents.dev/blob/main/content${slug === "/docs" ? "/docs/index" : slug}.mdx`
}
