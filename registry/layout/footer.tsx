"use client"

import type React from "react"

// Internal configuration - can be overridden via props
const defaultConfig = {
  companyName: "Your Company",
  companyDescription:
    "Building the future with innovative solutions and exceptional experiences.",
  logoPath: "/icon.webp",
  logoAlt: "Your Logo",
}

// Footer routes configuration - can be overridden via props
export interface FooterLink {
  href: string
  label: string
}

export interface FooterSections {
  [key: string]: FooterLink[]
}

const defaultFooterRoutes: FooterSections = {
  Product: [
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/documentation", label: "Documentation" },
    { href: "/support", label: "Support" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookies", label: "Cookie Policy" },
  ],
  Resources: [
    { href: "/help", label: "Help Center" },
    { href: "/community", label: "Community" },
    { href: "/guides", label: "Guides" },
  ],
}

interface FooterProps {
  logo?: string
  companyName?: string
  companyDescription?: string
  logoPath?: string
  logoAlt?: string
  links?: FooterSections
  hideOnMobile?: boolean
}

const Footer: React.FC<FooterProps> = ({
  logo = defaultConfig.logoAlt,
  companyName = defaultConfig.companyName,
  companyDescription = defaultConfig.companyDescription,
  logoPath = defaultConfig.logoPath,
  logoAlt = defaultConfig.logoAlt,
  links = defaultFooterRoutes,
  hideOnMobile = false,
}) => {
  const linkSections = Object.entries(links)

  return (
    <footer
      className={`bg-background border-t border-border mb-[5rem] sm:mb-2 text-foreground ${
        hideOnMobile ? "hidden sm:block" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* On mobile: Stack everything vertically */}
        {/* On desktop: Company info on left, nav sections on right */}
        <div className="block lg:flex lg:flex-row lg:gap-12">
          {/* Company info section */}
          <div className="mb-8 lg:mb-0 lg:w-1/4 lg:flex-shrink-0">
            <a href="/" className="inline-block">
              <img
                src={logoPath}
                alt={logoAlt}
                width={120}
                height={60}
                className="rounded-lg"
              />
            </a>
            <h1 className="text-lg font-bold mt-4 mb-2">{companyName}</h1>
            <p className="text-sm text-muted-foreground">
              {companyDescription}
            </p>
            <p className="text-xs font-mono text-muted-foreground font-medium mt-4">
              © {new Date().getFullYear()} {companyName}
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
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
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
