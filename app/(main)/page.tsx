import Link from "next/link"
import { ArrowUpRight, ArrowRight } from "@phosphor-icons/react/dist/ssr"
import { DotPattern } from "@/components/dot-pattern"
import { cn } from "@/lib/utils"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background Dot Pattern */}

      {/* Content container */}
      <div className="max-w-xs w-full flex flex-col items-center relative z-10 animate-fadeIn">
        {/* Logo */}
        <svg
          className="w-14 h-14 fill-foreground dark:fill-foreground transition-colors duration-300 mb-8"
          viewBox="0 0 282 308"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M280.438 295.396L152.117 5.66075C151.645 3.87252 150.584 2.32152 149.12 1.29292C147.665 0.264327 145.896 -0.172778 144.147 0.0619372H120.258C118.509 -0.172778 116.74 0.264327 115.285 1.29292C113.821 2.32152 112.76 3.87252 112.288 5.66075L0.780777 295.396C0.171502 296.774 -0.0839596 298.294 0.0241376 299.81C0.132235 301.327 0.603995 302.788 1.40981 304.052C2.2058 305.318 3.30641 306.345 4.58392 307.034C5.87126 307.725 7.30596 308.054 8.75053 307.993H272.92C279.111 307.993 284.86 300.528 280.438 295.396ZM122.469 127.434L177.775 250.605C178.384 252.07 178.65 253.664 178.551 255.257C178.453 256.85 177.991 258.395 177.215 259.765C176.429 261.133 175.358 262.286 174.07 263.128C172.783 263.969 171.329 264.475 169.815 264.602H68.037C66.4941 264.493 64.9807 264.019 63.6246 263.213C62.2685 262.408 61.1089 261.293 60.2146 259.951C59.3204 258.607 58.7307 257.07 58.4752 255.454C58.2197 253.836 58.318 252.18 58.7504 250.605L106.539 127.434C107.266 125.856 108.397 124.525 109.802 123.594C111.207 122.663 112.838 122.169 114.499 122.169C116.17 122.169 117.791 122.663 119.206 123.594C120.612 124.525 121.741 125.856 122.469 127.434Z" />
        </svg>

        {/* Navigation buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <Link 
            href="/docs/introduction"
            prefetch
            className={cn(
              "text-[13px] font-medium tracking-wider px-6 py-3 rounded-full",
              "bg-primary text-primary-foreground border border-primary",
              "inline-flex items-center justify-center",
              "hover:bg-primary/90",
            )}
          >
            Documentation
            <ArrowRight size={14} className="ml-2 transition-transform duration-150 group-hover:translate-x-0.5" />
          </Link>
          
          <Link 
            href="https://github.com/pprunty/deltacomponents.dev"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "text-[13px] font-medium tracking-wider px-6 py-3 rounded-full",
              "bg-background text-foreground border border-border",
              "inline-flex items-center justify-center",
              "hover:bg-secondary",
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              className="text-foreground mr-2"
            >
              <path
                fill="currentColor"
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
              />
            </svg>
            GitHub
          </Link>
        </div>

        {/* Attribution with improved hover effect */}
        <div className="w-full flex justify-end items-center text-xs text-muted-foreground/70">
          <span>BY</span>
          <a 
            href="https://patrickprunty.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-1 ml-1 font-medium transition-colors duration-150 hover:text-primary"
          >
            <span className="underline">PATRICK PRUNTY</span>
            <ArrowUpRight
              size={16}
              weight="bold"
              className="ml-1 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </div>
  )
}
