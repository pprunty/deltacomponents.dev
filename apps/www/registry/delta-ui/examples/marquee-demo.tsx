"use client"

import { motion } from "motion/react"

import { Marquee } from "@/registry/delta-ui/delta/marquee"

const albums = [
  {
    src: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/54/28/14/54281424-eece-0935-299d-fdd2ab403f92/24UM1IM28978.rgb.jpg/600x600bb.jpg",
    alt: "GNX - Kendrick Lamar",
  },
  {
    src: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/ed/d5/5e/edd55e84-e47f-b2c7-0a6a-18f5ca2c75a9/3432.jpg/600x600bb.jpg",
    alt: "Flume - Flume",
  },
  {
    src: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/93/d5/3e/93d53e93-6873-58fb-4e86-7d9042a665b2/191404153574.png/600x600bb.jpg",
    alt: "Romance (Deluxe Edition) - Fontaines D.C.",
  },
  {
    src: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/49/86/18/49861852-877b-0992-fa27-58b25fa032b5/196589805232.jpg/600x600bb.jpg",
    alt: "The Dark Side of the Moon (50th Anniversary) - Pink Floyd",
  },
  {
    src: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/19/c5/96/19c59650-a48d-6cf8-c925-0a77a3cc66c6/720841204596_Cover.jpg/600x600bb.jpg",
    alt: "Shuffering & Shmiling - Fela Kuti",
  },
]

export function MarqueeDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Marquee
        className="flex min-h-screen items-center justify-center"
        direction="left"
        slowdownOnHover
        showFade
        slowDownFactor={0.2}
      >
        {albums.map((album, index) => (
          <motion.img
            key={index}
            src={album.src || "/placeholder.svg"}
            alt={album.alt}
            className="mx-2 aspect-square w-[100px] cursor-pointer rounded-md sm:mx-3 sm:w-[100px] md:w-[120px]"
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          />
        ))}
      </Marquee>
    </div>
  )
}
