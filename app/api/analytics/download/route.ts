import { NextRequest, NextResponse } from "next/server"

import redis from "@/app/redis"

export async function POST(request: NextRequest) {
  try {
    const { component } = await request.json()

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

    const key = `delta-downloads:${sanitizedComponent}`

    // Skip incrementing in development environments, but still return current count
    if (process.env.NODE_ENV !== "production") {
      const currentCount = await redis.get(key)
      return NextResponse.json({
        success: true,
        component: sanitizedComponent,
        downloads: Number(currentCount) || 0,
      })
    }

    // Increment download count in production
    const newCount = await redis.incr(key)

    return NextResponse.json({
      success: true,
      component: sanitizedComponent,
      downloads: newCount,
    })
  } catch (error) {
    console.error("Error tracking download:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
