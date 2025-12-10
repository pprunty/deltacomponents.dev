"use client"

import React, { memo } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart, House, MagnifyingGlass, Plus, User } from "phosphor-react"

import { BottomMobileNav } from "@/registry/delta-ui/blocks/bottom-mobile-nav/components/bottom-mobile-nav"
import { Sidebar } from "@/registry/delta-ui/blocks/bottom-mobile-nav/components/sidebar"

// Layout Component Props Interface
interface LayoutProps {
  children: React.ReactNode
  sidebarClassName?: string
  bottomNavClassName?: string
  centerButton?: {
    onClick: () => void
    label: string
  }
}

// Layout Component (moved from layout.tsx)
function Layout({
  children,
  sidebarClassName,
  bottomNavClassName,
  centerButton,
}: LayoutProps) {
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

  return (
    <div className="min-h-screen">
      {/* Desktop Sidebar */}
      <Sidebar routes={routes} className={sidebarClassName} />

      {/* Main Content */}
      <main className="md:ml-20">{children}</main>

      {/* Mobile Bottom Navigation */}
      <BottomMobileNav
        routes={routes}
        labels={false}
        className={`bg-background/80 backdrop-blur-lg ${bottomNavClassName || ""}`}
        centerButton={centerButton}
      />
    </div>
  )
}

export default function BottomMobileNavPage() {
  return (
    <Layout
      bottomNavClassName="bg-background/80 backdrop-blur-lg"
      centerButton={{
        onClick: () => console.log("Center button clicked"),
        label: "Add",
      }}
    >
      <div className="bg-background min-h-screen w-full">
        {/* Content container */}
        <div className="mx-auto max-w-2xl space-y-8 px-6 py-8 text-left">
          <h1 className="font-heading mb-6 text-4xl font-bold">
            BottomMobileNav
          </h1>

          <p className="text-muted-foreground text-lg leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>

          <div className="w-full overflow-hidden rounded-lg">
            <Image
              src="/images/stock/monet.JPG"
              alt="Monet painting"
              width={800}
              height={600}
              className="h-auto w-full object-cover"
            />
          </div>

          <p className="text-muted-foreground text-lg leading-relaxed">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum. Sed ut perspiciatis unde omnis iste natus error
            sit voluptatem accusantium doloremque laudantium.
          </p>

          <div className="w-full overflow-hidden rounded-lg">
            <Image
              src="/images/stock/tube.JPG"
              alt="Tube station"
              width={800}
              height={600}
              className="h-auto w-full object-cover"
            />
          </div>

          <p className="text-muted-foreground text-lg leading-relaxed">
            Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et
            quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
            voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
            consequuntur magni dolores eos qui ratione voluptatem sequi
            nesciunt.
          </p>

          <div className="w-full overflow-hidden rounded-lg">
            <Image
              src="/images/stock/Location-Graphic_final-design_2-1.webp"
              alt="Location graphic design"
              width={800}
              height={600}
              className="h-auto w-full object-cover"
            />
          </div>

          <p className="text-muted-foreground text-lg leading-relaxed">
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit, sed quia non numquam eius modi tempora
            incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut
            enim ad minima veniam, quis nostrum exercitationem ullam corporis
            suscipit laboriosam.
          </p>
        </div>
      </div>
    </Layout>
  )
}
