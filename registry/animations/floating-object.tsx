"use client"

import type { ReactNode } from "react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface FloatingObjectProps {
  children: ReactNode
  pattern?: "float" | "circular" | "random-directions"
  intensity?: "subtle" | "medium" | "strong"
  speed?: "slow" | "medium" | "fast"
  direction?: "clockwise" | "counterclockwise"
  className?: string
}

export function FloatingObject({
  children,
  pattern = "float",
  intensity = "medium",
  speed = "medium",
  direction = "clockwise",
  className,
}: FloatingObjectProps) {
  const [randomPath, setRandomPath] = useState<Array<{ x: number; y: number }>>(
    []
  )

  // Define intensity levels for movement radius
  const intensityMap = {
    subtle: { radius: 15, float: { x: 3, y: 2, rotate: 1 } },
    medium: { radius: 25, float: { x: 6, y: 4, rotate: 2 } },
    strong: { radius: 40, float: { x: 10, y: 8, rotate: 3 } },
  }

  // Define speed levels for animation duration
  const speedMap = {
    slow: 8,
    medium: 5,
    fast: 3,
  }

  const movement = intensityMap[intensity]
  const duration = speedMap[speed]

  // Generate random directional path
  useEffect(() => {
    if (pattern === "random-directions") {
      const generateRandomPath = () => {
        const directions = [
          { x: 0, y: -movement.radius }, // North
          { x: movement.radius * 0.7, y: -movement.radius * 0.7 }, // Northeast
          { x: movement.radius, y: 0 }, // East
          { x: movement.radius * 0.7, y: movement.radius * 0.7 }, // Southeast
          { x: 0, y: movement.radius }, // South
          { x: -movement.radius * 0.7, y: movement.radius * 0.7 }, // Southwest
          { x: -movement.radius, y: 0 }, // West
          { x: -movement.radius * 0.7, y: -movement.radius * 0.7 }, // Northwest
        ]

        // Create a path with 6-8 random waypoints
        const pathLength = 6 + Math.floor(Math.random() * 3)
        const path = [{ x: 0, y: 0 }] // Start at center

        for (let i = 0; i < pathLength; i++) {
          const randomDirection =
            directions[Math.floor(Math.random() * directions.length)]
          // Add some randomness to the exact position
          const randomX =
            randomDirection.x + (Math.random() - 0.5) * movement.radius * 0.3
          const randomY =
            randomDirection.y + (Math.random() - 0.5) * movement.radius * 0.3
          path.push({ x: randomX, y: randomY })
        }

        path.push({ x: 0, y: 0 }) // Return to center
        return path
      }

      setRandomPath(generateRandomPath())
    }
  }, [pattern, movement.radius])

  // Circular motion animation
  if (pattern === "circular") {
    const multiplier = direction === "clockwise" ? 1 : -1

    return (
      <motion.div
        className={className}
        animate={{
          x: [0, movement.radius, 0, -movement.radius, 0],
          y: [
            0,
            movement.radius * multiplier,
            0,
            -movement.radius * multiplier,
            0,
          ],
        }}
        transition={{
          duration: duration,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
        style={{
          willChange: "transform",
        }}
      >
        {children}
      </motion.div>
    )
  }

  // Random directional movement
  if (pattern === "random-directions" && randomPath.length > 0) {
    const xPath = randomPath.map((point) => point.x)
    const yPath = randomPath.map((point) => point.y)

    return (
      <motion.div
        className={className}
        animate={{
          x: xPath,
          y: yPath,
          rotate: [0, 5, -5, 3, -3, 0],
        }}
        transition={{
          duration: duration * 2, // Slower for more deliberate movement
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
        style={{
          willChange: "transform",
        }}
        onAnimationComplete={() => {
          // Generate new random path when animation completes
          setTimeout(() => {
            const directions = [
              { x: 0, y: -movement.radius }, // North
              { x: movement.radius * 0.7, y: -movement.radius * 0.7 }, // Northeast
              { x: movement.radius, y: 0 }, // East
              { x: movement.radius * 0.7, y: movement.radius * 0.7 }, // Southeast
              { x: 0, y: movement.radius }, // South
              { x: -movement.radius * 0.7, y: movement.radius * 0.7 }, // Southwest
              { x: -movement.radius, y: 0 }, // West
              { x: -movement.radius * 0.7, y: -movement.radius * 0.7 }, // Northwest
            ]

            const pathLength = 6 + Math.floor(Math.random() * 3)
            const path = [{ x: 0, y: 0 }]

            for (let i = 0; i < pathLength; i++) {
              const randomDirection =
                directions[Math.floor(Math.random() * directions.length)]
              const randomX =
                randomDirection.x +
                (Math.random() - 0.5) * movement.radius * 0.3
              const randomY =
                randomDirection.y +
                (Math.random() - 0.5) * movement.radius * 0.3
              path.push({ x: randomX, y: randomY })
            }

            path.push({ x: 0, y: 0 })
            setRandomPath(path)
          }, Math.random() * 2000) // Random delay before generating new path
        }}
      >
        {children}
      </motion.div>
    )
  }

  // Default floating pattern (original)
  return (
    <motion.div
      className={className}
      animate={{
        x: [0, movement.float.x, -movement.float.x, movement.float.x, 0],
        y: [0, -movement.float.y, movement.float.y, -movement.float.y, 0],
        rotate: [
          0,
          movement.float.rotate,
          -movement.float.rotate,
          movement.float.rotate,
          0,
        ],
      }}
      transition={{
        duration: duration,
        ease: "easeInOut",
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
      }}
      style={{
        willChange: "transform",
      }}
    >
      {children}
    </motion.div>
  )
}
