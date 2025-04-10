"use client"

import { DateInput } from "@/registry/ui/date-input"

export default function DateInputBasicDemo() {
  return (
    <div className="flex flex-col space-y-4 max-w-md mx-auto">
      <DateInput
        label="Event Date"
        name="event-date"
        description="Select the date of your event"
        placeholder="Select a date"
        minDate={new Date()}
      />
    </div>
  )
}
