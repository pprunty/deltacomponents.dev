"use client"

import * as React from "react"
import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPopup,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/registry/delta-ui/delta/navigation-menu"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Navigation Menu",
    href: "/docs/components/navigation-menu",
    description: "A collection of links for navigating websites.",
  },
  {
    title: "Chat",
    href: "/docs/components/chat",
    description: "AI chat interface with streaming responses.",
  },
  {
    title: "Code Block",
    href: "/docs/components/code-block",
    description: "Syntax highlighted code with copy functionality.",
  },
  {
    title: "Tabs",
    href: "/docs/components/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "QR Code",
    href: "/docs/components/qrcode",
    description: "Generate customizable QR codes with various styling options.",
  },
  {
    title: "Card Deck",
    href: "/docs/components/card-deck",
    description:
      "Interactive card deck component with swipe and drag functionality.",
  },
]

const overviewLinks = [
  {
    title: "Quick Start",
    description: "Install and assemble your first component.",
    href: "/docs",
  },
  {
    title: "Setup",
    description: "Learn how to set up Delta Components in your project.",
    href: "/docs/setup",
  },
  {
    title: "Usage",
    description: "See what's new in the latest versions.",
    href: "/docs/usage",
  },
]

export default function NavigationMenuDemo() {
  return (
    <div className="bg-background flex min-h-[400px] items-center justify-center px-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Overview</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[90vw] max-w-[400px] gap-2 md:w-[400px]">
                {overviewLinks.map((link) => (
                  <ListItem
                    key={link.title}
                    href={link.href}
                    title={link.title}
                  >
                    {link.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[90vw] max-w-[600px] gap-4 md:w-[600px] md:grid-cols-2">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              render={
                <Link href="/docs" className={navigationMenuTriggerStyle()} />
              }
            >
              Documentation
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuPositioner>
          <NavigationMenuPopup />
        </NavigationMenuPositioner>
      </NavigationMenu>
    </div>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink render={<Link href={href} />}>
        <div className="text-sm leading-none font-medium">{title}</div>
        <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
          {children}
        </p>
      </NavigationMenuLink>
    </li>
  )
}
