"use client"

import ScrambleIn from "@/registry/ui/scramble-in"

export default function ScrambleInBasicDemo() {
  return (
    <div className="flex items-center justify-center p-4">
      <ScrambleIn 
        text="Welcome to Delta Components"
        className="text-3xl font-bold"
        scrambledClassName="text-3xl font-bold"
        scrambleSpeed={50}
        scrambledLetterCount={3}
      />
    </div>
  )
}
