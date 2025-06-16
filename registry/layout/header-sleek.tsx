"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface HeaderSleekProps extends React.HTMLAttributes<HTMLDivElement> {
  leftNavItems?: { href: string; label: string }[]
  rightNavItems?: { href: string; label: string }[]
  buttonText?: string
  onButtonClick?: () => void
  activeHref?: string
}

export default function HeaderSleek({
  className,
  leftNavItems = [
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
  ],
  rightNavItems = [
    { href: "/contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
  ],
  buttonText = "Get Started",
  onButtonClick,
  activeHref,
  ...props
}: HeaderSleekProps) {
  return (
    <header
      className={cn(
        "fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/10 dark:bg-black/10 backdrop-blur-2xl rounded-xl shadow-lg border border-white/20",
        className
      )}
      {...props}
    >
      <div className="px-8 py-6">
        <div className="flex items-center justify-center gap-8 h-10">
          {/* Left Navigation */}
          {leftNavItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-text={item.label}
              className={cn(
                "text-md transition-colors hover:text-primary inline-flex font-normal border-box after:content-[attr(data-text)] after:font-black after:pointer-none after:overflow-hidden after:select-none after:invisible after:h-0 duration-300 transition-all hover:font-semibold flex-col ease-out",
                activeHref === item.href &&
                  "underline decoration-2 underline-offset-4"
              )}
            >
              {item.label}
            </a>
          ))}

          {/* Center Button */}
          <button
            onClick={onButtonClick}
            className="bg-foreground text-background hover:bg-foreground/90 px-6 py-2 rounded-full font-medium text-sm transition-colors"
          >
            {buttonText}
          </button>

          {/* Right Navigation */}
          {rightNavItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-text={item.label}
              className={cn(
                "text-md transition-colors hover:text-primary inline-flex font-normal border-box after:content-[attr(data-text)] after:font-black after:pointer-none after:overflow-hidden after:select-none after:invisible after:h-0 duration-300 transition-all hover:font-semibold flex-col ease-out",
                activeHref === item.href &&
                  "underline decoration-2 underline-offset-4"
              )}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
