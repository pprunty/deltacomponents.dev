import { FeedbackDialog } from "@/registry/delta-ui/components/feedback-dialog"

export default function FeedbackDialogExample() {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">FeedbackDialog Demo</h3>
        <p className="text-sm text-muted-foreground">
          Interactive example of the FeedbackDialog component
        </p>
      </div>
      <FeedbackDialog>
        Demo content for FeedbackDialog
      </FeedbackDialog>
    </div>
  )
}
