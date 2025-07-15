"use client"

import * as React from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

import "./font-transform.css"

// Font classes matching the exact order and selection from the older version
const fontClasses = [
  // Professional fonts (matching the older version order)
  "font-inter",
  "font-roboto",
  "font-poppins",
  "font-montserrat",
  "font-playfair",
  "font-merriweather",
  "font-jetbrains",
  "font-source-code",
  "font-ibm-plex",

  // Abstract/distinctive fonts (matching the older version order)
  "font-orbitron",
  "font-righteous",
  "font-fredoka",
  "font-bungee",
  "font-monoton",
  "font-creepster",
  "font-fascinate",
  "font-griffy",
  "font-megrim",
  "font-wallpoet",
  "font-zeyada",
  "font-shrikhand",
  "font-vampiro",
  "font-butcherman",
  "font-nosifer",
  "font-eater",
  "font-lacquer",
  "font-pirata",
  "font-snowburst",
  "font-chela",
]

interface FontTransformProps {
  children: string
  className?: string
  hoverDuration?: number
}

const FontTransform = React.forwardRef<HTMLDivElement, FontTransformProps>(
  ({ children, className, hoverDuration = 2000, ...props }, ref) => {
    const characters = children.split("")
    const [characterStates, setCharacterStates] = React.useState<
      Array<{ isTransformed: boolean; fontClass: string }>
    >(() => characters.map(() => ({ isTransformed: false, fontClass: "" })))
    const timeoutRefs = React.useRef<(NodeJS.Timeout | null)[]>([])
    const [isMobile, setIsMobile] = React.useState(false)

    // Mobile detection
    React.useEffect(() => {
      const checkMobile = () => {
        const isTouchDevice =
          "ontouchstart" in window || navigator.maxTouchPoints > 0
        const isSmallScreen = window.matchMedia("(max-width: 768px)").matches
        setIsMobile(isTouchDevice || isSmallScreen)
      }

      checkMobile()
      window.addEventListener("resize", checkMobile)
      return () => window.removeEventListener("resize", checkMobile)
    }, [])

    // Initialize timeout refs array
    React.useEffect(() => {
      timeoutRefs.current = new Array(characters.length).fill(null)
    }, [characters.length])

    const handleCharacterHover = (index: number) => {
      // Disable on mobile devices
      if (isMobile) return

      // Clear any existing timeout for this character
      if (timeoutRefs.current[index]) {
        clearTimeout(timeoutRefs.current[index]!)
      }

      // Get a random font that's different from the current one
      const currentFontClass = characterStates[index].fontClass
      let randomFont
      do {
        randomFont = fontClasses[Math.floor(Math.random() * fontClasses.length)]
      } while (randomFont === currentFontClass && fontClasses.length > 1)

      // Update character state
      setCharacterStates((prev) => {
        const newStates = [...prev]
        newStates[index] = { isTransformed: true, fontClass: randomFont }
        return newStates
      })

      // Set timeout to revert font after specified duration
      timeoutRefs.current[index] = setTimeout(() => {
        setCharacterStates((prev) => {
          const newStates = [...prev]
          newStates[index] = { isTransformed: false, fontClass: "" }
          return newStates
        })
        timeoutRefs.current[index] = null
      }, hoverDuration)
    }

    return (
      <motion.div
        ref={ref}
        className={cn(
          "inline-flex flex-wrap items-baseline leading-relaxed",
          className
        )}
        style={{
          textAlign: "justify",
          textJustify: "inter-character",
        }}
        layout
        transition={{
          layout: {
            type: "spring",
            stiffness: 400,
            damping: 30,
            duration: 0.3,
          },
        }}
        {...props}
      >
        {characters.map((char, index) => {
          const state = characterStates[index]

          return (
            <motion.span
              key={index}
              className={cn(
                "inline-block cursor-default relative",
                char === " " ? "w-[0.25em]" : "",
                state.isTransformed ? state.fontClass : ""
              )}
              layout
              initial={{ scale: 1 }}
              animate={{
                scale: state.isTransformed ? 1.1 : 1,
              }}
              transition={{
                layout: {
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                  duration: 0.3,
                },
                scale: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  duration: 0.3,
                },
              }}
              style={{
                minWidth: char === " " ? "0.25em" : "auto",
                display: "inline-block",
                textAlign: "center",
              }}
              onMouseEnter={() => handleCharacterHover(index)}
              whileHover={
                !isMobile
                  ? {
                      scale: state.isTransformed ? 1.15 : 1.05,
                      transition: { duration: 0.1 },
                    }
                  : {}
              }
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          )
        })}
      </motion.div>
    )
  }
)

FontTransform.displayName = "FontTransform"

export { FontTransform }
