"use client"

import * as React from "react"

import StarRating from "@/registry/components/star-rating"

export default function StarRatingDemo() {
  const [value, setValue] = React.useState(3)
  const handleInteractiveChange = (val: number) => {
    setValue(val)
    alert("this would usually call backend api to update vote")
  }
  return (
    <div className="flex flex-col gap-6 max-w-xs">
      <div>
        <div className="mb-2 font-medium">Read-only (locked):</div>
        <StarRating initialValue={4} locked />
      </div>
      <div>
        <div className="mb-2 font-medium">Fractional (locked, showScore):</div>
        <StarRating initialValue={4.2} locked showScore />
      </div>
      <div>
        <div className="mb-2 font-medium">Interactive:</div>
        <StarRating
          initialValue={value}
          locked={false}
          onChange={handleInteractiveChange}
          showScore
        />
        <div className="mt-2 text-sm text-muted-foreground">
          Selected: {value} star{value !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  )
}
