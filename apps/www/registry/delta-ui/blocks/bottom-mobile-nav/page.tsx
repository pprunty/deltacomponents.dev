"use client"

import type React from "react"
import { Heart, House, MagnifyingGlass, User } from "phosphor-react"

import { BottomMobileNav } from "./components/bottom-mobile-nav"
import { Sidebar } from "./components/sidebar"

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
function Layout({ children, sidebarClassName, bottomNavClassName, centerButton }: LayoutProps) {
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
      <main className="pb-20 md:ml-20 md:pb-8">{children}</main>

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
      <div className="mx-auto flex w-full max-w-lg flex-col gap-4 p-4">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </p>
        <p>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        </p>
        <p>
          Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
        </p>
        <p>
          Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.
        </p>
        <p>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
        </p>
        <p>
          Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
        </p>
      </div>
    </Layout>
  )
}
