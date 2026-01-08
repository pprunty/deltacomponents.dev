"use client"

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
} from "@/registry/delta-ui/delta/navigation-menu"
import { Button } from "@/registry/delta-ui/ui/button"

const navigation = [
  {
    name: "Components",
    href: "/components",
    sections: [
      {
        title: "Company",
        items: [
          { name: "About", description: "Meet the team", href: "/about" },
          { name: "Careers", description: "We're hiring", href: "/careers" },
        ],
      },
      {
        title: "Explore",
        items: [
          {
            name: "Developers",
            description: "Build on the Linear API",
            href: "/developers",
          },
          {
            name: "Security",
            description: "Safe, secure, and private",
            href: "/security",
          },
          { name: "Docs", description: "How to use Linear", href: "/docs" },
        ],
      },
      {
        title: "",
        items: [
          {
            name: "Switch to Linear",
            description: "Migration guide",
            href: "/migrate",
          },
          { name: "Download", description: "Get the app", href: "/download" },
          {
            name: "Quality",
            description: "Conversations on quality",
            href: "/quality",
          },
        ],
      },
    ],
  },
  {
    name: "Docs",
    href: "/docs",
    sections: [
      {
        title: "Getting Started",
        items: [
          {
            name: "Introduction",
            description: "Learn the basics",
            href: "/docs/intro",
          },
          {
            name: "Installation",
            description: "Set up your project",
            href: "/docs/install",
          },
        ],
      },
      {
        title: "Components",
        items: [
          {
            name: "Button",
            description: "Trigger actions and events",
            href: "/docs/button",
          },
          { name: "Card", description: "Display content", href: "/docs/card" },
          {
            name: "Input",
            description: "Capture user input",
            href: "/docs/input",
          },
        ],
      },
    ],
  },
  { name: "Blocks", href: "/blocks" },
  { name: "Themes", href: "/themes" },
]

export function SiteHeader() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 fixed top-0 right-0 left-0 z-[var(--layer-header)] border-b border-border backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-foreground flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <svg
            viewBox="0 0 282 308"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="size-6"
          >
            <path
              d="M280.438 295.396L152.117 5.66075C151.645 3.87252 150.584 2.32152 149.12 1.29292C147.665 0.264327 145.896 -0.172778 144.147 0.0619372H120.258C118.509 -0.172778 116.74 0.264327 115.285 1.29292C113.821 2.32152 112.76 3.87252 112.288 5.66075L0.780777 295.396C0.171502 296.774 -0.0839596 298.294 0.0241376 299.81C0.132235 301.327 0.603995 302.788 1.40981 304.052C2.2058 305.318 3.30641 306.345 4.58392 307.034C5.87126 307.725 7.30596 308.054 8.75053 307.993H272.92C279.111 307.993 284.86 300.528 280.438 295.396ZM122.469 127.434L177.775 250.605C178.384 252.07 178.65 253.664 178.551 255.257C178.453 256.85 177.991 258.395 177.215 259.765C176.429 261.133 175.358 262.286 174.07 263.128C172.783 263.969 171.329 264.475 169.815 263.213C62.2685 262.408 61.1089 261.293 60.2146 259.951C59.3204 258.607 58.7307 257.07 58.4752 255.454C58.2197 253.836 58.318 252.18 58.7504 250.605L106.539 127.434C107.266 125.856 108.397 124.525 109.802 123.594C111.207 122.663 112.838 122.169 114.499 122.169C116.17 122.169 117.791 122.663 119.206 123.594C120.612 124.525 121.741 125.856 122.469 127.434Z"
              fill="currentColor"
            />
          </svg>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navigation.map((item) =>
              item.sections ? (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuTrigger className="text-muted-foreground hover:text-foreground data-[popup-open]:text-foreground text-sm font-medium">
                    {item.name}
                  </NavigationMenuTrigger>
                  <NavigationMenuPositioner>
                    <NavigationMenuPopup>
                      <NavigationMenuContent>
                        <div className="bg-muted border-border rounded-lg border p-6">
                          <div className="grid w-[800px] grid-cols-3 gap-x-8 gap-y-6">
                            {item.sections.map((section, idx) => (
                              <div key={idx} className="space-y-3">
                                {section.title && (
                                  <div className="text-muted-foreground mb-3 text-xs font-medium">
                                    {section.title}
                                  </div>
                                )}
                                <div className="space-y-1">
                                  {section.items.map((subItem) => (
                                    <NavigationMenuLink
                                      key={subItem.href}
                                      href={subItem.href}
                                    >
                                      <div className="hover:bg-background/50 space-y-0.5 rounded-lg px-3 py-2.5 transition-colors">
                                        <div className="text-foreground text-sm font-medium">
                                          {subItem.name}
                                        </div>
                                        <div className="text-muted-foreground text-xs">
                                          {subItem.description}
                                        </div>
                                      </div>
                                    </NavigationMenuLink>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuPopup>
                  </NavigationMenuPositioner>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuLink
                    href={item.href}
                    className="bg-background text-muted-foreground hover:text-foreground inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium"
                  >
                    {item.name}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="hidden bg-transparent sm:inline-flex"
          >
            Sign in
          </Button>
          <Button size="sm">Sign Up</Button>
        </div>
      </div>
    </header>
  )
}