"use client"

import * as React from "react"
import { Spotify } from "@/delta/spotify"

export default function SpotifyDemo() {
  return (
    <div className="flex flex-col w-full">
      <div>
        <div className="mb-2 font-medium">Single Track Example:</div>
        {/* Aphex Twin - #3 */}
        <Spotify id="7glKwbR1DyuIuE6XvZvJbQ" type="track" />
      </div>
      <div>
        <div className="mb-2 font-medium">Playlist Example:</div>
        {/* Prrty ·Patrick Prunty playlist */}
        <Spotify id="0o4lcEBqO40818rPGqIHz0" type="playlist" />
      </div>
    </div>
  )
}
