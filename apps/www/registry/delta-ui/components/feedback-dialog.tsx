"use client"

import { useState } from "react"
import { z } from "zod"

import { BLOCKS_NAV_ITEMS } from "@/lib/navigation"
import { Index } from "@/registry/__index__"
import { Button } from "@/registry/delta-ui/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/registry/delta-ui/ui/dialog"
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/registry/delta-ui/ui/native-select"

// Validation schema
const feedbackSchema = z.object({
  component: z.string().min(1, "Please select a component or category"),
  feedback: z.string().min(1, "Please provide your feedback"),
  mood: z
    .enum(["sad", "neutral", "happy"])
    .nullable()
    .refine((val) => val !== null, {
      message: 'Please select "sad", "neutral" or "happy" from emoji options',
    }),
})

interface FeedbackDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultComponent?: string
}

// Helper function to transform kebab-case to Title Case
function toTitleCase(str: string): string {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function FeedbackDialog({
  open,
  onOpenChange,
  defaultComponent,
}: FeedbackDialogProps) {
  const [feedback, setFeedback] = useState("")
  const [selectedMood, setSelectedMood] = useState<
    "sad" | "neutral" | "happy" | null
  >(null)
  const [selectedComponent, setSelectedComponent] = useState(
    defaultComponent || ""
  )
  const [errors, setErrors] = useState<{
    component?: string
    feedback?: string
    mood?: string
  }>({})

  // Get all component names from the registry, filtered by type
  const uiComponents = Object.entries(Index)
    .filter(([_, item]) => item.type === "registry:ui")
    .map(([name]) => name)
    .sort()

  const blocks = BLOCKS_NAV_ITEMS.map((item) => item.name)

  // General feedback categories
  const generalCategories = [
    "Documentation",
    "Website",
    "Installation",
    "Theming",
    "Other",
  ]

  const handleSubmit = () => {
    // Validate form
    const result = feedbackSchema.safeParse({
      component: selectedComponent,
      feedback: feedback,
      mood: selectedMood,
    })

    if (!result.success) {
      // Extract and set errors
      const fieldErrors: {
        component?: string
        feedback?: string
        mood?: string
      } = {}
      result.error.issues.forEach((error) => {
        const field = error.path[0] as "component" | "feedback" | "mood"
        fieldErrors[field] = error.message
      })
      setErrors(fieldErrors)
      return
    }

    // Clear errors and submit
    setErrors({})
    console.log({
      feedback,
      mood: selectedMood,
      component: selectedComponent,
    })
    onOpenChange(false)
    setFeedback("")
    setSelectedMood(null)
    setSelectedComponent(defaultComponent || "")
  }

  const handleCancel = () => {
    onOpenChange(false)
    setFeedback("")
    setSelectedMood(null)
    setSelectedComponent(defaultComponent || "")
    setErrors({})
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-[496px]" showCloseButton={true}>
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-start gap-4 self-stretch">
          <div className="flex w-full flex-col gap-2">
            <label
              htmlFor="component-select"
              className="text-foreground text-sm font-medium"
            >
              Component
            </label>
            <div className="[&>div]:!w-full">
              <NativeSelect
                id="component-select"
                value={selectedComponent}
                onChange={(e) => {
                  setSelectedComponent(e.target.value)
                  setErrors((prev) => ({ ...prev, component: undefined }))
                }}
              >
                <NativeSelectOption value="">
                  Select a component
                </NativeSelectOption>

                <NativeSelectOptGroup label="General">
                  {generalCategories.map((category) => (
                    <NativeSelectOption key={category} value={category}>
                      {category}
                    </NativeSelectOption>
                  ))}
                </NativeSelectOptGroup>

                {uiComponents.length > 0 && (
                  <NativeSelectOptGroup label="UI Components">
                    {uiComponents.map((name) => (
                      <NativeSelectOption key={name} value={name}>
                        {toTitleCase(name)}
                      </NativeSelectOption>
                    ))}
                  </NativeSelectOptGroup>
                )}

                {blocks.length > 0 && (
                  <NativeSelectOptGroup label="Blocks">
                    {blocks.map((name) => (
                      <NativeSelectOption key={name} value={name}>
                        {name}
                      </NativeSelectOption>
                    ))}
                  </NativeSelectOptGroup>
                )}
              </NativeSelect>
            </div>
            {errors.component && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.component}
              </p>
            )}
          </div>

          <div className="flex w-full flex-col gap-2">
            <label
              htmlFor="feedback-textarea"
              className="text-foreground text-sm font-medium"
            >
              How was your experience?
            </label>
            <textarea
              id="feedback-textarea"
              placeholder="Share your thoughts..."
              value={feedback}
              onChange={(e) => {
                setFeedback(e.target.value)
                setErrors((prev) => ({ ...prev, feedback: undefined }))
              }}
              className="bg-muted text-foreground border-border placeholder:text-muted-foreground focus:ring-ring h-[108px] w-full resize-none self-stretch rounded-md border px-2 py-3 text-sm focus:border-transparent focus:ring-2"
            />
            {errors.feedback && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.feedback}
              </p>
            )}
            {errors.mood && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.mood}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between self-stretch">
            <div className="border-border bg-background flex items-center gap-1 rounded-md border p-1">
              <button
                type="button"
                onClick={() => {
                  setSelectedMood("sad")
                  setErrors((prev) => ({ ...prev, mood: undefined }))
                }}
                className={`flex h-7 w-7 items-center justify-center rounded-[3px] p-1 transition-colors ${
                  selectedMood === "sad"
                    ? "bg-accent"
                    : "bg-background hover:bg-accent"
                }`}
                aria-label="Sad feedback"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Feedback Negative">
                    <path
                      id="Union"
                      d="M10 1.84961C14.5011 1.84961 18.1504 5.49888 18.1504 10C18.1504 14.5011 14.5011 18.1504 10 18.1504C5.49888 18.1504 1.84961 14.5011 1.84961 10C1.84961 5.49888 5.49888 1.84961 10 1.84961ZM10 3.15039C6.21685 3.15039 3.15039 6.21685 3.15039 10C3.15039 13.7831 6.21685 16.8496 10 16.8496C13.7831 16.8496 16.8496 13.7831 16.8496 10C16.8496 6.21685 13.7831 3.15039 10 3.15039ZM10 10.8496C11.1165 10.8496 11.9976 11.2974 12.585 11.7246C12.8799 11.9391 13.1088 12.1528 13.2646 12.3154C13.3428 12.397 13.4036 12.4667 13.4463 12.5176C13.4676 12.543 13.4838 12.5645 13.4961 12.5801C13.5022 12.5877 13.5078 12.5936 13.5117 12.5986C13.5136 12.6011 13.5152 12.6037 13.5166 12.6055C13.5173 12.6064 13.518 12.6077 13.5186 12.6084L13.5195 12.6094C13.5197 12.6096 13.52 12.61 13 13L13.5195 12.6104L13.9102 13.1299L12.8701 13.9102L12.4805 13.3896V13.3906L12.4814 13.3916V13.3926C12.481 13.392 12.48 13.3898 12.4775 13.3867C12.4725 13.3804 12.4632 13.369 12.4502 13.3535C12.4241 13.3224 12.3818 13.2749 12.3252 13.2158C12.2115 13.0972 12.0419 12.9358 11.8213 12.7754C11.3774 12.4526 10.7584 12.1504 10 12.1504C9.24159 12.1504 8.62255 12.4526 8.17871 12.7754C7.95813 12.9358 7.78849 13.0972 7.6748 13.2158C7.61823 13.2749 7.57594 13.3224 7.5498 13.3535C7.5368 13.369 7.52748 13.3804 7.52246 13.3867L7.51855 13.3926V13.3916L7.51953 13.3906C7.51955 13.3906 7.51963 13.3905 7.51855 13.3896L7.12988 13.9102L6.08984 13.1299L6.48047 12.6104L7 13L6.48047 12.6094L6.48145 12.6084C6.482 12.6077 6.48271 12.6064 6.4834 12.6055C6.48476 12.6037 6.48638 12.6011 6.48828 12.5986C6.49216 12.5936 6.49784 12.5877 6.50391 12.5801C6.51625 12.5645 6.53239 12.543 6.55371 12.5176C6.59642 12.4667 6.65717 12.397 6.73535 12.3154C6.89117 12.1528 7.12009 11.9391 7.41504 11.7246C8.00245 11.2974 8.88352 10.8496 10 10.8496ZM8.4082 8.40039H7.09961V7.09961H8.4082V8.40039ZM12.9082 8.40039H11.5996V7.09961H12.9082V8.40039Z"
                      fill="currentColor"
                    ></path>
                  </g>
                </svg>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedMood("neutral")
                  setErrors((prev) => ({ ...prev, mood: undefined }))
                }}
                className={`flex h-7 w-7 items-center justify-center rounded-[3px] p-1 transition-colors ${
                  selectedMood === "neutral"
                    ? "bg-accent"
                    : "bg-background hover:bg-accent"
                }`}
                aria-label="Neutral feedback"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Feedback Neutral">
                    <path
                      id="Union"
                      d="M10 1.84961C14.5011 1.84961 18.1504 5.49888 18.1504 10C18.1504 14.5011 14.5011 18.1504 10 18.1504C5.49888 18.1504 1.84961 14.5011 1.84961 10C1.84961 5.49888 5.49888 1.84961 10 1.84961ZM10 3.15039C6.21685 3.15039 3.15039 6.21685 3.15039 10C3.15039 13.7831 6.21685 16.8496 10 16.8496C13.7831 16.8496 16.8496 13.7831 16.8496 10C16.8496 6.21685 13.7831 3.15039 10 3.15039ZM13.6504 12.9004H6.34961V11.5996H13.6504V12.9004ZM8.4082 8.40039H7.09961V7.09961H8.4082V8.40039ZM12.9082 8.40039H11.5996V7.09961H12.9082V8.40039Z"
                      fill="currentColor"
                    ></path>
                  </g>
                </svg>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedMood("happy")
                  setErrors((prev) => ({ ...prev, mood: undefined }))
                }}
                className={`flex h-7 w-7 items-center justify-center rounded-[3px] p-1 transition-colors ${
                  selectedMood === "happy"
                    ? "bg-accent"
                    : "bg-background hover:bg-accent"
                }`}
                aria-label="Happy feedback"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Feedback Positive">
                    <path
                      id="Union"
                      d="M10 1.84961C14.5011 1.84961 18.1504 5.49888 18.1504 10C18.1504 14.5011 14.5011 18.1504 10 18.1504C5.49888 18.1504 1.84961 14.5011 1.84961 10C1.84961 5.49888 5.49888 1.84961 10 1.84961ZM10 3.15039C6.21685 3.15039 3.15039 6.21685 3.15039 10C3.15039 13.7831 6.21685 16.8496 10 16.8496C13.7831 16.8496 16.8496 13.7831 16.8496 10C16.8496 6.21685 13.7831 3.15039 10 3.15039ZM13.9102 11.3701L13.5195 11.8896L13 11.5L13.5195 11.8906L13.5186 11.8916C13.518 11.8923 13.5173 11.8936 13.5166 11.8945C13.5152 11.8963 13.5136 11.8989 13.5117 11.9014C13.5078 11.9064 13.5022 11.9123 13.4961 11.9199C13.4838 11.9355 13.4676 11.957 13.4463 11.9824C13.4036 12.0333 13.3428 12.103 13.2646 12.1846C13.1088 12.3472 12.8799 12.5609 12.585 12.7754C11.9976 13.2026 11.1165 13.6504 10 13.6504C8.88352 13.6504 8.00245 13.2026 7.41504 12.7754C7.12009 12.5609 6.89117 12.3472 6.73535 12.1846C6.65717 12.103 6.59642 12.0333 6.55371 11.9824C6.53239 11.957 6.51625 11.9355 6.50391 11.9199C6.49784 11.9123 6.49216 11.9064 6.48828 11.9014C6.48638 11.8989 6.48476 11.8963 6.4834 11.8945C6.48271 11.8936 6.482 11.8923 6.48145 11.8916L6.48047 11.8906C6.48031 11.8904 6.48 11.89 7 11.5L6.48047 11.8896L6.08984 11.3701L7.12988 10.5898L7.51855 11.1104L7.51953 11.1094L7.51855 11.1084V11.1074C7.519 11.108 7.52004 11.1102 7.52246 11.1133C7.52748 11.1196 7.5368 11.131 7.5498 11.1465C7.57594 11.1776 7.61823 11.2251 7.6748 11.2842C7.78849 11.4028 7.95813 11.5642 8.17871 11.7246C8.62255 12.0474 9.24159 12.3496 10 12.3496C10.7584 12.3496 11.3774 12.0474 11.8213 11.7246C12.0419 11.5642 12.2115 11.4028 12.3252 11.2842C12.3818 11.2251 12.4241 11.1776 12.4502 11.1465C12.4632 11.131 12.4725 11.1196 12.4775 11.1133L12.4814 11.1074V11.1084L12.4805 11.1094V11.1104L12.8701 10.5898L13.9102 11.3701ZM8.4082 8.40039H7.09961V7.09961H8.4082V8.40039ZM12.9082 8.40039H11.5996V7.09961H12.9082V8.40039Z"
                      fill="currentColor"
                    ></path>
                  </g>
                </svg>
              </button>
            </div>

            <div className="flex space-x-2">
              <Button
                type="button"
                variant="secondary"
                onClick={handleCancel}
                className="bg-muted hover:bg-muted/80 text-foreground"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSubmit}
                className="bg-foreground hover:bg-foreground/90 text-background"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
