"use client"

import ScrambleText from "@/registry/animations/scramble-text"

export default function ScrambleTextDemo() {
  return (
    <div className="flex items-center justify-center">
      <ScrambleText
        text="Welcome to Delta Components"
        className="text-4xl font-bold"
        scrambledClassName="text-4xl font-bold"
        scrambleSpeed={100}
        scrambledLetterCount={3}
      />
    </div>
  )
}
