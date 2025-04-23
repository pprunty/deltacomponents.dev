"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { SocialIcons } from "./social-icons"

// Define the FooterSections type
interface FooterLink {
  href: string
  label: string
}

type FooterSections = Record<string, FooterLink[]>

// Hardcoded footerRoutes
const footerRoutes: FooterSections = {
  Products: [
    { href: "/components", label: "Components" },
    { href: "/templates", label: "Templates" },
    { href: "/pricing", label: "Pricing" },
    { href: "/customers", label: "Customers" },
  ],
  Resources: [
    { href: "/docs", label: "Documentation" },
    { href: "/blog", label: "Blog" },
    { href: "/guides", label: "Guides" },
    { href: "/help", label: "Help Center" },
  ],
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
    { href: "/press", label: "Press" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookies", label: "Cookie Policy" },
    { href: "/security", label: "Security" },
  ],
}

// Hardcoded config
const config = {
  companyName: "Delta Components",
  companyDescription: "A collection of modern, accessible, and customizable React components built on top of shadcn/ui. Free & Open Source.",
}

interface FooterProps {
  logo?: string
  companyName?: string
  links?: FooterSections
  hideOnMobile?: boolean
  border?: boolean
  className?: string
}

const Footer: React.FC<FooterProps> = ({
  logo = "Your Logo",
  links = footerRoutes, // Use the hardcoded footerRoutes as default
  hideOnMobile = false,
  border = true,
  className = "",
}) => {
  const linkSections = Object.entries(links)

  return (
    <footer
      className={`bg-background ${border ? 'border-t border-border' : ''} mb-[5rem] sm:mb-2 text-foreground ${hideOnMobile ? "hidden sm:block" : ""} ${className}`}
    >
      <div className="mx-auto w-full px-6 py-12">
        {/* On mobile: Stack everything vertically */}
        {/* On desktop: Company info on left, nav sections on right */}
        <div className="block lg:flex lg:flex-row lg:gap-12">
          {/* Company info section */}
          <div className="mb-8 lg:mb-0 lg:w-1/4 lg:flex-shrink-0">
            <Link href="/" className="inline-block">
              <Image src="/icons/512x512.svg" alt={logo} width={100} height={60} className="rounded-2xl dark:invert" />
            </Link>
            <h1 className="text-2xl font-bold mt-4 mb-2">{config.companyName}</h1>
            <p className="text-sm text-muted-foreground">{config.companyDescription}</p>
            <SocialIcons
              platforms={["github", "twitter", "linkedin", "instagram"]}
              containerClassName="flex space-x-4 mt-4 social-link no-after"
              linkClassName="text-muted-foreground hover:text-foreground transition-colors [&>svg]:w-5 [&>svg]:h-5"
            />
            <p className="text-xs font-mono text-muted-foreground font-medium mt-4">
              © {new Date().getFullYear()} {config.companyName}
            </p>
          </div>

          {/* Links section - two columns on mobile, side by side on desktop */}
          <div className="grid grid-cols-2 gap-8 lg:flex-grow lg:grid-cols-4">
            {linkSections.map(([section, sectionLinks]) => (
              <div key={section}>
                <h3 className="text-sm font-semibold mb-4">{section}</h3>
                <ul className="sm:space-y-2 space-y-1">
                  {sectionLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
