"use client"

import { DateInput } from "@/delta/date-input"

export default function DateInputDemo() {
  return (
    <div className="w-full min-w-[320px] max-w-md mx-auto p-4">
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
