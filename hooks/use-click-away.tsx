"use client"

import { useEffect, type RefObject } from "react"

type RefType = RefObject<HTMLElement | null>

export function useClickAway(refs: RefType | RefType[], callback: () => void) {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const refsArray = Array.isArray(refs) ? refs : [refs]

      // Check if the click was outside all refs
      const isOutside = refsArray.every((ref) => {
        return ref.current && !ref.current.contains(event.target as Node)
      })

      if (isOutside) {
        callback()
      }
    }

    document.addEventListener("mousedown", handleClick)

    return () => {
      document.removeEventListener("mousedown", handleClick)
    }
  }, [refs, callback])
}
