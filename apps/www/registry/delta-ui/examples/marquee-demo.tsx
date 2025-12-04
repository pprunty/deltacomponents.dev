import { DotGothic16 } from "next/font/google"

import { Marquee } from "@/registry/delta-ui/delta/marquee"

const dotGothic = DotGothic16({
  weight: "400",
  subsets: ["latin", "latin-ext"],
})

const koreanPhrases = [
  "안녕하세요",
  "환영합니다",
  "사랑해요",
  "감사합니다",
  "행복하세요",
  "좋은 하루",
  "화이팅",
  "멋있어요",
]

export function MarqueeDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Marquee speed={40} gap={60} className="bg-black py-8" fadeIntensity={10}>
        {koreanPhrases.map((phrase, index) => (
          <span
            key={index}
            className={`${dotGothic.className} text-red-500`}
            style={{
              fontSize: "64px", // 4rem - multiple of 16px for crisp pixels
              WebkitFontSmoothing: "none",
              MozOsxFontSmoothing: "unset",
              imageRendering: "pixelated",
            }}
          >
            {phrase}
          </span>
        ))}
      </Marquee>
    </div>
  )
}
