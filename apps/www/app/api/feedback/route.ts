import { NextResponse } from "next/server"

import redis from "@/lib/redis"

const FEEDBACK_KEY = "deltacomponents:feedback"

interface FeedbackItem {
  id: string
  component: string
  feedback: string
  mood: "sad" | "neutral" | "happy"
  timestamp: string
  userAgent?: string
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { component, feedback, mood } = body

    // Validate required fields
    if (!component || !feedback || !mood) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Validate mood value
    if (!["sad", "neutral", "happy"].includes(mood)) {
      return NextResponse.json({ error: "Invalid mood value" }, { status: 400 })
    }

    // Create feedback item
    const feedbackItem: FeedbackItem = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      component,
      feedback,
      mood,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get("user-agent") || undefined,
    }

    // Get existing feedback array
    const existingFeedback = await redis.get<FeedbackItem[]>(FEEDBACK_KEY)
    const feedbackArray = existingFeedback || []

    // Add new feedback to the array
    feedbackArray.push(feedbackItem)

    // Store updated feedback array
    await redis.set(FEEDBACK_KEY, feedbackArray)

    return NextResponse.json(
      { success: true, id: feedbackItem.id },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error storing feedback:", error)
    return NextResponse.json(
      { error: "Failed to store feedback" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const feedback = await redis.get<FeedbackItem[]>(FEEDBACK_KEY)
    return NextResponse.json({ feedback: feedback || [] })
  } catch (error) {
    console.error("Error retrieving feedback:", error)
    return NextResponse.json(
      { error: "Failed to retrieve feedback" },
      { status: 500 }
    )
  }
}
