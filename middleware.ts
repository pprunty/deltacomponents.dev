import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Skip download tracking in development environments
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.next()
  }

  // Track downloads for registry JSON files
  if (
    request.nextUrl.pathname.startsWith("/r/") &&
    request.nextUrl.pathname.endsWith(".json")
  ) {
    // Extract component name from path like /r/toast.json
    const filename = request.nextUrl.pathname.split("/").pop()
    const componentName = filename?.replace(".json", "")

    if (componentName && componentName !== "index") {
      // Track download asynchronously without blocking the response
      fetch(`${request.nextUrl.origin}/api/analytics/download`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ component: componentName }),
      }).catch((error) => {
        console.error("Failed to track download:", error)
      })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/r/:path*.json",
}
