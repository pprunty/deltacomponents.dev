import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { GridPattern } from "@/components/grid-pattern"

export default function Home() {
  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden">
      <div className="z-10 flex flex-col items-center space-y-6 px-6">
        <svg
          className="size-16 fill-foreground dark:fill-foreground transition-colors duration-150 ease-in-out mb-8"
          width="26"
          height="26"
          viewBox="0 0 282 308"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M280.438 295.396L152.117 5.66075C151.645 3.87252 150.584 2.32152 149.12 1.29292C147.665 0.264327 145.896 -0.172778 144.147 0.0619372H120.258C118.509 -0.172778 116.74 0.264327 115.285 1.29292C113.821 2.32152 112.76 3.87252 112.288 5.66075L0.780777 295.396C0.171502 296.774 -0.0839596 298.294 0.0241376 299.81C0.132235 301.327 0.603995 302.788 1.40981 304.052C2.2058 305.318 3.30641 306.345 4.58392 307.034C5.87126 307.725 7.30596 308.054 8.75053 307.993H272.92C279.111 307.993 284.86 300.528 280.438 295.396ZM122.469 127.434L177.775 250.605C178.384 252.07 178.65 253.664 178.551 255.257C178.453 256.85 177.991 258.395 177.215 259.765C176.429 261.133 175.358 262.286 174.07 263.128C172.783 263.969 171.329 264.475 169.815 264.602H68.037C66.4941 264.493 64.9807 264.019 63.6246 263.213C62.2685 262.408 61.1089 261.293 60.2146 259.951C59.3204 258.607 58.7307 257.07 58.4752 255.454C58.2197 253.836 58.318 252.18 58.7504 250.605L106.539 127.434C107.266 125.856 108.397 124.525 109.802 123.594C111.207 122.663 112.838 122.169 114.499 122.169C116.17 122.169 117.791 122.663 119.206 123.594C120.612 124.525 121.741 125.856 122.469 127.434Z" />
        </svg>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            variant="outline"
            className="bg-muted transition-transform duration-150 ease-in-out active:scale-[0.98]"
            asChild
          >
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              Support on GitHub
            </Link>
          </Button>
          <Button
            className="transition-transform duration-150 ease-in-out active:scale-[0.98]"
            asChild
          >
            <Link href="/docs/introduction">Explore the docs</Link>
          </Button>
        </div>
        <Link
          href="https://patrickprunty.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 text-sm font-mono font-medium tracking-wider uppercase text-muted-foreground hover:text-foreground"
        >
          BY PATRICK PRUNTY
        </Link>
      </div>
      <GridPattern />
    </div>
  )
}
