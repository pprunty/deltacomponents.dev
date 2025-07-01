"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 md:px-4 hidden lg:flex items-end">
      <Link href="/" className="mr-8 flex items-center gap-3">
        <svg
          className="size-6 fill-foreground dark:fill-foreground transition-colors"
          width="26"
          height="26"
          viewBox="0 0 282 308"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M280.438 295.396L152.117 5.66075C151.645 3.87252 150.584 2.32152 149.12 1.29292C147.665 0.264327 145.896 -0.172778 144.147 0.0619372H120.258C118.509 -0.172778 116.74 0.264327 115.285 1.29292C113.821 2.32152 112.76 3.87252 112.288 5.66075L0.780777 295.396C0.171502 296.774 -0.0839596 298.294 0.0241376 299.81C0.132235 301.327 0.603995 302.788 1.40981 304.052C2.2058 305.318 3.30641 306.345 4.58392 307.034C5.87126 307.725 7.30596 308.054 8.75053 307.993H272.92C279.111 307.993 284.86 300.528 280.438 295.396ZM122.469 127.434L177.775 250.605C178.384 252.07 178.65 253.664 178.551 255.257C178.453 256.85 177.991 258.395 177.215 259.765C176.429 261.133 175.358 262.286 174.07 263.128C172.783 263.969 171.329 264.475 169.815 264.602H68.037C66.4941 264.493 64.9807 264.019 63.6246 263.213C62.2685 262.408 61.1089 261.293 60.2146 259.951C59.3204 258.607 58.7307 257.07 58.4752 255.454C58.2197 253.836 58.318 252.18 58.7504 250.605L106.539 127.434C107.266 125.856 108.397 124.525 109.802 123.594C111.207 122.663 112.838 122.169 114.499 122.169C116.17 122.169 117.791 122.663 119.206 123.594C120.612 124.525 121.741 125.856 122.469 127.434Z" />
        </svg>
        <h1 className="font-semibold text-2xl">Delta Components</h1>
      </Link>
      <nav className="flex items-end text-lg space-x-8">
        <Link
          href="/docs/introduction"
          data-text="Docs"
          className={cn(
            "transition-colors hover:text-primary inline-flex font-light border-box after:content-[attr(data-text)] after:font-black after:pointer-none after:overflow-hidden after:select-none after:invisible after:h-0 duration-300 transition-all hover:font-semibold flex-col ease-out",
            pathname.startsWith("/docs") && pathname !== "/docs/components"
              ? "text-primary font-medium"
              : "text-muted-foreground"
          )}
        >
          Docs
        </Link>
        <Link
          href="/docs/components"
          data-text="Showcase"
          className={cn(
            "transition-colors hover:text-primary inline-flex font-light border-box after:content-[attr(data-text)] after:font-black after:pointer-none after:overflow-hidden after:select-none after:invisible after:h-0 duration-300 transition-all hover:font-semibold flex-col ease-out",
            pathname === "/docs/components"
              ? "text-primary font-medium"
              : "text-muted-foreground"
          )}
        >
          Showcase
        </Link>
      </nav>
    </div>
  )
}
