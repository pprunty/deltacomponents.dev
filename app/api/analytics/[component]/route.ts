import { NextRequest, NextResponse } from "next/server"

import redis from "@/app/redis"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ component: string }> }
) {
  try {
    const { component } = await params

    if (!component || typeof component !== "string") {
      return NextResponse.json(
        { error: "Invalid component name" },
        { status: 400 }
      )
    }

    // Sanitize component name to prevent Redis injection
    const sanitizedComponent = component.replace(/[^a-zA-Z0-9-_]/g, "")

    if (!sanitizedComponent) {
      return NextResponse.json(
        { error: "Invalid component name" },
        { status: 400 }
      )
    }

    const viewsKey = `delta-views:${sanitizedComponent}`
    const downloadsKey = `delta-downloads:${sanitizedComponent}`

    // Get both counts in parallel
    const [views, downloads] = await Promise.all([
      redis.get(viewsKey),
      redis.get(downloadsKey),
    ])

    return NextResponse.json({
      component: sanitizedComponent,
      views: views || 0,
      downloads: downloads || 0,
    })
  } catch (error) {
    console.error("Error retrieving analytics:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
