"use client"

import React from "react"

import { docsConfig } from "@/config/docs"
import ScrambleText from "@/registry/animations/scramble-text"

export function ChangingScrambleText() {
  const hooks = React.useMemo(() => {
    // Provide a fallback set of hook names
    const defaultHooks = [
      "useBoolean",
      "useToggle",
      "useCopyToClipboard",
      "useUnmount",
      "useDebounceCallback",
      "useIsomorphicLayoutEffect",
      "useInterval",
      "useTimeout",
      "useDocumentTitle",
      "useCounter",
      "useMousePosition",
    ]

    // Safely try to get hooks from the config
    try {
      const hooksSection = docsConfig.sidebarNav.find(
        (nav) => nav.title.toLocaleLowerCase() === "hooks"
      )

      // If the hooks section exists and has items, use them
      if (hooksSection && hooksSection.items) {
        return hooksSection.items.map((hook) => hook.title)
      }

      return defaultHooks
    } catch (error) {
      console.warn("Error loading hooks from config, using defaults", error)
      return defaultHooks
    }
  }, [])

  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min)
  }

  const getRandomText = React.useCallback(() => {
    const int = getRandomInt(0, hooks.length)
    return hooks[int]
  }, [hooks])

  const [text, setText] = React.useState(getRandomText())
  const scrambleTextRef = React.useRef<any>(null)

  React.useEffect(() => {
    const textInterval = setInterval(() => {
      const sample = getRandomText()
      setText(sample)
      // Trigger animation when text changes
      if (scrambleTextRef.current) {
        scrambleTextRef.current.reset()
        scrambleTextRef.current.start()
      }
    }, 3000)

    return () => clearInterval(textInterval)
  }, [getRandomText])

  return (
    <ScrambleText
      text={text}
      scrambleSpeed={80}
      className="h-7 text-2xl font-bold md:h-10 md:text-4xl"
    />
  )
}
