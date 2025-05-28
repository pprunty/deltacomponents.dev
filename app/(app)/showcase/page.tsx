import ShowcaseClient from "./client"

// Disable static generation for this page since it contains client components
export const dynamic = "force-dynamic"

export default function ShowcasePage() {
  return <ShowcaseClient />
}
