"use client"

import React, { useState } from "react"
import { RetroVideoPlayer } from "../components/retro-video-player"
import { Button } from "@/components/ui/button"

export default function RetroVideoPlayerDemo() {
  const [showPlayer, setShowPlayer] = useState(false)
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col items-center justify-center">
        <Button 
          onClick={() => setShowPlayer(true)}
          className="mt-4"
        >
          Open Video Player
        </Button>
      </div>
      
      {/* Player overlay */}
      {showPlayer && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-[9998]">
          <div className="pointer-events-auto">
            <RetroVideoPlayer
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              title="Video Player"
              defaultWidth={400}
              defaultHeight={300}
              onClose={() => setShowPlayer(false)}
              muted={false}
            />
          </div>
        </div>
      )}
    </div>
  )
}
