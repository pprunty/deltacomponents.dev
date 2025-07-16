"use client"

import { useEffect, useRef } from "react"
import ScrambleText, { ScrambleTextHandle } from "@/delta/scramble-text"

export default function ScrambleTextAlbumsDemo() {
  const tracks = [
    "1. BLOOD. - 1:58",
    "2. DNA. - 3:05",
    "3. YAH. - 2:40",
    "4. ELEMENT. - 3:28",
    "5. FEEL. - 3:34",
    "6. LOYALTY. (feat. Rihanna) - 3:47",
    "7. PRIDE. - 4:35",
    "8. HUMBLE. - 2:57",
    "9. LUST. - 5:07",
    "10. LOVE. (feat. Zacari) - 3:33",
    "11. XXX. (feat. U2) - 4:14",
    "12. FEAR. - 7:40",
    "13. GOD. - 4:08",
    "14. DUCKWORTH. - 4:08",
  ]

  const scrambleRefs = useRef<(ScrambleTextHandle | null)[]>([])

  useEffect(() => {
    tracks.forEach((_, index) => {
      const delay = index * 50
      setTimeout(() => {
        scrambleRefs.current[index]?.start()
      }, delay)
    })
  }, [])

  return (
    <div className="w-full h-full flex flex-col text-sm md:text-lg lg:text-lg xl:text-xl justify-start items-start bg-background text-foreground font-normal overflow-hidden py-16 px-8 sm:px-16 md:px-20 lg:px-24 text-left">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">DAMN.</h2>
        <p className="text-muted-foreground">Kendrick Lamar • 2017</p>
      </div>
      {tracks.map((track, index) => (
        <ScrambleText
          key={index}
          ref={(el) => {
            scrambleRefs.current[index] = el
          }}
          text={track}
          speed={120}
          autoStart={false}
          className="mb-1"
        />
      ))}
    </div>
  )
}
