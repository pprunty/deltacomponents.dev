"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface FooterLink {
  href: string
  label: string
  external?: boolean
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
  sections?: FooterSection[]
  socialLinks?: FooterLink[]
  copyright?: string
  brandName?: string
  brandHref?: string
}

export default function Footer({
  className,
  sections = [
    {
      title: "Product",
      links: [
        { href: "/features", label: "Features" },
        { href: "/pricing", label: "Pricing" },
        { href: "/documentation", label: "Documentation" },
        { href: "/support", label: "Support" },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "/about", label: "About" },
        { href: "/blog", label: "Blog" },
        { href: "/careers", label: "Careers" },
        { href: "/contact", label: "Contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { href: "/privacy", label: "Privacy Policy" },
        { href: "/terms", label: "Terms of Service" },
        { href: "/cookies", label: "Cookie Policy" },
      ],
    },
  ],
  socialLinks = [
    { href: "https://twitter.com", label: "Twitter", external: true },
    { href: "https://github.com", label: "GitHub", external: true },
    { href: "https://linkedin.com", label: "LinkedIn", external: true },
  ],
  copyright,
  brandName = "Your Brand",
  brandHref = "/",
  ...props
}: FooterProps) {
  const currentYear = new Date().getFullYear()
  const defaultCopyright = `© ${currentYear} ${brandName}. All rights reserved.`

  return (
    <footer className={cn("border-t bg-background", className)} {...props}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <a
              href={brandHref}
              className="text-xl font-bold text-foreground hover:text-muted-foreground transition-colors"
            >
              {brandName}
            </a>
            <p className="text-sm text-muted-foreground max-w-xs">
              Building the future with innovative solutions and exceptional
              experiences.
            </p>
          </div>

          {/* Navigation Sections */}
          {sections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      {...(link.external && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <p className="text-sm text-muted-foreground">
            {copyright || defaultCopyright}
          </p>

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div className="flex items-center space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={link.label}
                  {...(link.external && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                >
                  <span className="text-sm">{link.label}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
