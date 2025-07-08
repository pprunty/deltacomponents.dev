"use client"

import React from "react"
import type { IconProps } from "@phosphor-icons/react"
import {
  Heart,
  House,
  Info,
  MagnifyingGlass,
  User,
} from "@phosphor-icons/react"

import BottomBar from "@/registry/layout/bottom-bar"

interface Route {
  href: string
  label: string
  icon: React.ForwardRefExoticComponent<IconProps>
}

const demoRoutes: Route[] = [
  {
    href: "#home",
    label: "Home",
    icon: House,
  },
  {
    href: "#search",
    label: "Search",
    icon: MagnifyingGlass,
  },
  {
    href: "#about",
    label: "About",
    icon: Info,
  },
  {
    href: "#favorites",
    label: "Favorites",
    icon: Heart,
  },
  {
    href: "#profile",
    label: "Profile",
    icon: User,
  },
]

export default function BottomBarDemo() {
  return (
    <div className="relative h-auto">
      <div className="h-full">
        <div className="min-h-full">
          {/* Home Section */}
          <section
            id="home"
            className="h-96 px-6 py-8 flex flex-col justify-center"
          >
            <h2 className="text-2xl font-bold mb-4">Welcome Home</h2>
            <p className="text-base text-muted-foreground mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="text-base text-muted-foreground mb-4">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur.
            </p>
            <p className="text-sm text-muted-foreground">
              Use the bottom navigation to explore different sections.
            </p>
          </section>

          {/* Search Section */}
          <section
            id="search"
            className="h-96 px-6 py-8 flex flex-col justify-center bg-muted/20"
          >
            <h2 className="text-2xl font-bold mb-4">Search & Discovery</h2>
            <p className="text-base text-muted-foreground mb-4">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam.
            </p>
            <p className="text-base text-muted-foreground mb-4">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores.
            </p>
            <p className="text-sm text-muted-foreground">
              This search section demonstrates organized content navigation.
            </p>
          </section>

          {/* About Section */}
          <section
            id="about"
            className="h-96 px-6 py-8 flex flex-col justify-center"
          >
            <h2 className="text-2xl font-bold mb-4">About Us</h2>
            <p className="text-base text-muted-foreground mb-4">
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit, sed quia non numquam eius modi.
            </p>
            <p className="text-base text-muted-foreground mb-4">
              Ut enim ad minima veniam, quis nostrum exercitationem ullam
              corporis suscipit laboriosam, nisi ut aliquid ex ea commodi.
            </p>
            <p className="text-sm text-muted-foreground">
              The bottom bar highlights the current section automatically.
            </p>
          </section>

          {/* Favorites Section */}
          <section
            id="favorites"
            className="h-96 px-6 py-8 flex flex-col justify-center bg-muted/20"
          >
            <h2 className="text-2xl font-bold mb-4">Your Favorites</h2>
            <p className="text-base text-muted-foreground mb-4">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti.
            </p>
            <p className="text-base text-muted-foreground mb-4">
              Similique sunt in culpa qui officia deserunt mollitia animi, id
              est laborum et dolorum fuga.
            </p>
            <p className="text-sm text-muted-foreground">
              Save your favorite content and access it quickly here.
            </p>
          </section>

          {/* Profile Section */}
          <section
            id="profile"
            className="h-96 px-6 py-8 flex flex-col justify-center"
          >
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>
            <p className="text-base text-muted-foreground mb-4">
              Temporibus autem quibusdam et aut officiis debitis aut rerum
              necessitatibus saepe eveniet ut et voluptates repudiandae.
            </p>
            <p className="text-base text-muted-foreground mb-4">
              Ut aut reiciendis voluptatibus maiores alias consequatur aut
              perferendis doloribus asperiores repellat.
            </p>
            <p className="text-sm text-muted-foreground">
              Manage your profile settings and preferences here.
            </p>
          </section>
        </div>
      </div>
      <BottomBar routes={demoRoutes} showLabels={true} />
    </div>
  )
}
