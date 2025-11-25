"use client"

import React, { memo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { House, MagnifyingGlass, Heart, User, Plus } from "phosphor-react"

import Image from "next/image"
import { Icons } from "@/components/icons"
import { BottomMobileNav } from "@/registry/delta-ui/blocks/bottom-mobile-nav/components/bottom-mobile-nav"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/delta-ui/ui/tooltip"

// Routes configuration - shared between mobile and desktop nav
const routes = [
  {
    href: "#",
    label: "Home",
    icon: House,
  },
  {
    href: "#search",
    label: "Search",
    icon: MagnifyingGlass,
  },
  {
    href: "#love",
    label: "Love",
    icon: Heart,
  },
  {
    href: "#profile",
    label: "Profile",
    icon: User,
  },
]

// Desktop Sidebar Component
const Sidebar = memo(function Sidebar() {
  const pathname = usePathname()

  return (
    <nav className="bg-background/80 fixed top-0 left-0 z-50 hidden h-screen w-20 flex-col items-center border-r py-3 backdrop-blur-lg md:flex">
      {/* Top: Logo section */}
      <div className="mb-8">
        <Icons.logo className="size-6" />
      </div>

      {/* Middle: main nav icons (centered vertically) */}
      <div className="flex flex-1 flex-col items-center justify-center space-y-6">
        {routes.slice(0, 2).map(({ href, icon: Icon, label }, index) => {
          const isActive = index === 0 // Make first item (Home) active by default
          return (
            <Tooltip key={href}>
              <TooltipTrigger asChild>
                <Link
                  href={href}
                  className={`rounded-lg px-4 py-3 transition-colors duration-300 ${
                    isActive
                      ? "text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  } `}
                >
                  {Icon && <Icon className="h-6 w-6" weight={isActive ? "fill" : "regular"} />}
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="[&_.bg-foreground.fill-foreground]:hidden"
              >
                {label}
              </TooltipContent>
            </Tooltip>
          )
        })}
        
        {/* CTA Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => console.log('Sidebar CTA clicked')}
              className="rounded-lg px-4 py-3 transition-colors duration-300 bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Plus className="h-6 w-6" weight="regular" />
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            className="[&_.bg-foreground.fill-foreground]:hidden"
          >
            Add
          </TooltipContent>
        </Tooltip>
        
        {routes.slice(2).map(({ href, icon: Icon, label }, index) => {
          const isActive = false // Bottom items not active by default
          return (
            <Tooltip key={href}>
              <TooltipTrigger asChild>
                <Link
                  href={href}
                  className={`rounded-lg px-4 py-3 transition-colors duration-300 ${
                    isActive
                      ? "text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  } `}
                >
                  {Icon && <Icon className="h-6 w-6" weight={isActive ? "fill" : "regular"} />}
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="[&_.bg-foreground.fill-foreground]:hidden"
              >
                {label}
              </TooltipContent>
            </Tooltip>
          )
        })}
      </div>

      {/* Bottom: placeholder for settings or additional actions */}
      <div className="mt-auto">
        {/* You can add theme switcher or other controls here */}
      </div>
    </nav>
  )
})

Sidebar.displayName = "Sidebar"

export default function BottomMobileNavPage() {
  return (
    <div className="min-h-screen">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="md:ml-20">
        <div className="bg-background min-h-screen w-full">
          {/* Content container */}
          <div className="max-w-2xl mx-auto px-6 py-8 text-left space-y-8">
            <h1 className="font-heading text-4xl font-bold mb-6">BottomMobileNav</h1>
            
            <p className="text-muted-foreground text-lg leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            <div className="w-full rounded-lg overflow-hidden">
              <Image
                src="/images/monet.JPG"
                alt="Monet painting"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
            </p>

            <div className="w-full rounded-lg overflow-hidden">
              <Image
                src="/images/tube.JPG"
                alt="Tube station"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            </p>

            <div className="w-full rounded-lg overflow-hidden">
              <Image
                src="/images/Location-Graphic_final-design_2-1.webp"
                alt="Location graphic design"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.
            </p>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomMobileNav
        routes={routes}
        labels={false}
        className="bg-background/80 backdrop-blur-lg"
        centerButton={{
          onClick: () => console.log('Center button clicked'),
          label: 'Add'
        }}
      />
    </div>
  )
}
